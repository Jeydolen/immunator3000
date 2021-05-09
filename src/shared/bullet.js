import Pathogen from '../shared/pathogen';
import {V2,randInt, getVectorApex}        from '../shared/utility';

export default class Bullet
{
    static MAX_BULLETS = 1000;
    static GUN_SIZE = 35;
    static FIRE_SPEED = 250;
    static Bullets = [];
    static STATES = { 'FREE' : 'free', 'HOOKED' : 'hooked', 'DEAD' : 'dead', 'NONE' : 'none' }

    constructor(scene)
    {
        this.id = Bullet.Bullets.length;
        this.target = 'NONE';
        this.scene = scene;
        this.name = 'bullet_' + this.id;
        this.bullet_origin   = getVectorApex(Bullet.GUN_SIZE, scene.FireAngle);
        this.bullet_velocity = getVectorApex(Bullet.FIRE_SPEED, scene.FireAngle);
        this.bullet_ent      = scene.createEnt(false, () => scene.add.image(scene.gun.x + this.bullet_origin.x,
                                                                            scene.gun.y + this.bullet_origin.y,'Ab'), this.name);
        this.bullet_ent.setData('bullet_instance', this);
        this.bullet_ent.body.setVelocity(this.bullet_velocity.x, this.bullet_velocity.y);
        this.bullet_ent.body.setMass(1)
        this.bullet_ent.state = Bullet.STATES['FREE'];
        this.createColliders();
        scene.tweens.add ({targets: this.bullet_ent, angle: Phaser.Math.RadToDeg(scene.FireAngle + Math.PI / 2), duration: 5});

        this.timer = scene.time.addEvent({  
            delay: 3500,
            callback: this.kill,
            callbackScope: this,
            loop: false
        });
        Bullet.Bullets.push(this); 
    }

    static Create = (scene) =>
    {
        if (Bullet.Bullets.length == Bullet.MAX_BULLETS){ Bullet.Bullets.shift().kill() };
        let bullet = new Bullet(scene)
    }

    kill()
    { 
        console.log ('Bullet kill')
        this.timer.remove()
        if ( this.id < Bullet.Bullets.length ){ let supprEl = Bullet.Bullets.splice(this.id, 1) }
        this.bullet_ent.destroy()  
    }// kill

    createColliders()
    {
        Pathogen.Pathogens.map ( (virus_instance) => {this.scene.physics.add.collider(this.bullet_ent, virus_instance.container, 
                                                                                      this.collide, null, this)})
    }

    collide(bullet_entity, pathogen_container_entity)
    {
        if ( bullet_entity.state == Bullet.STATES['HOOKED'] )
            return;
    
        Pathogen.Pathogens.map( (instance) => 
        { 
            if (instance.name == pathogen_container_entity.name)
            {   
                bullet_entity.state = Bullet.STATES['HOOKED'];
                instance.onHit()
                bullet_entity.state = Bullet.STATES['DEAD'];
                this.kill()
            }
        })
    }

}// Bullet