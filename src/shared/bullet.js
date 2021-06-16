import Pathogen             from '../shared/pathogen';
import {getVectorApex}      from '../shared/utility';

export default class Bullet
{
    static MAX_BULLETS  = 1000;
    static GUN_SIZE     = 35;
    static FIRE_SPEED   = 250;
    static Bullets      = [];
    static STATES       = {'FREE' : 'free', 'HOOKED' : 'hooked', 'DEAD' : 'dead', 'NONE' : 'none'};

    constructor(scene, fire_angle)
    {
        this.scene = scene;
        let angle_offset =  Math.PI/2;
        this.fire_angle = fire_angle + angle_offset;
        this.id = Bullet.Bullets.length;
        this.target = 'NONE';
        this.name = 'bullet_' + this.id;
        this.bullet_origin   = getVectorApex(Bullet.GUN_SIZE, fire_angle);
        this.bullet_velocity = getVectorApex(Bullet.FIRE_SPEED, fire_angle);
        this.ent             = scene.createEnt(false, () =>  scene.add.sprite(  scene.gun.ent.x + this.bullet_origin.x,
                                                                                scene.gun.ent.y + this.bullet_origin.y,'Ab'), this.name);
        this.ent.setData('bullet_instance', this);
        this.ent.body.setVelocity(this.bullet_velocity.x, this.bullet_velocity.y);
        this.ent.body.setMass(1)
        this.ent.state = Bullet.STATES['FREE'];
        this.createColliders();
        scene.tweens.add ({targets: this.ent, angle: Phaser.Math.RadToDeg(fire_angle + angle_offset), duration: 1});

        this.timer = scene.time.addEvent({  
            delay: 3500,
            callback: this.kill,
            callbackScope: this,
            loop: false
        });
        Bullet.Bullets.push(this); 
    }

    static Create = (scene, fire_angle) =>
    {
        if (Bullet.Bullets.length == Bullet.MAX_BULLETS){ Bullet.Bullets.shift().kill() };
        let bullet = new Bullet(scene, fire_angle)
    }

    kill()
    { 
        this.timer.remove()
        if ( this.id < Bullet.Bullets.length ){ let supprEl = Bullet.Bullets.splice(this.id, 1) }
        this.ent.destroy()  
    }// kill

    createColliders()
    {
        Pathogen.Pathogens.map ( (virus_instance) => {this.scene.physics.add.collider(this.ent, virus_instance.container, 
                                                                                      this.collide, null, this)})
        this.scene.physics.add.collider(this.ent, this.scene.membraneLayer)
    }

    collide(entity, pathogen_container_entity)
    {
        if ( entity.state == Bullet.STATES['HOOKED'] )
            return;
    
        Pathogen.Pathogens.map( (instance) => 
        { 
            if (instance.name == pathogen_container_entity.name)
            {   
                entity.state = Bullet.STATES['HOOKED'];
                instance.onHit()
                entity.state = Bullet.STATES['DEAD'];
                this.kill()
            }
        })
    }

}// Bullet