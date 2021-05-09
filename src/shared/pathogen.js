import { Game } from 'phaser';
import {V2,randInt, getVectorApex}        from '../shared/utility'

export default class Pathogen
{
    static MAX_PATHOGEN = 10;
    static SPEED = 250;
    static SPAWN_RADIUS = 100;
    static MAX_HP = 13;
    static SPIKE_COUNT = 12;
    static SPIKE_ANGLE_STEP =  Math.PI * 2 / Pathogen.SPIKE_COUNT;
    static Pathogens = [];

    constructor(scene)
    {
        this.id     = Pathogen.Pathogens.length;
        this.hook   = 'NONE'; 
        this.scene  = scene;
        this.hp     = Pathogen.MAX_HP;
        this.name   = 'container_pathogen_' + this.id
        let VP_SIZE = scene.getVPSize()
        this.origin = V2(VP_SIZE.x /2 + randInt(0,Pathogen.SPAWN_RADIUS), VP_SIZE.y /2 + randInt(0,Pathogen.SPAWN_RADIUS));
        this.pathogen_ent   = scene.add.image(30,30, 'virus');
        this.pathogen_ent.setOrigin(0.5,0.5)
        this.pathogen_ent.setData({'pathogen_instance': this, 'kill': this.kill, 'hp' : this.hp});
        this.slots  = 1;
        
        // THIS.CONTAINER
        this.container      = scene.add.container(this.origin.x, this.origin.y);
        this.container.add(this.pathogen_ent);
        this.container.name = this.name
            // PHYSICS INIT FOR CONTAINER
            scene.physics.add.existing( this.container, false);
            this.container.body.setCollideWorldBounds(true, 1, 1);
            this.container.body.setMaxSpeed(50)
            // PHYSICS INIT FOR CONTAINER
        // THIS.CONTAINER
        Pathogen.Pathogens.push(this);

    }// constructor

    onHit = () =>
    {
        this.hp  = this.pathogen_ent.getData('hp') - 1;
        this.pathogen_ent.setData('hp', this.hp);
        this.slots += 1;
        let hook_angle = Pathogen.SPIKE_ANGLE_STEP * this.slots
        let spike_apex = getVectorApex(30, hook_angle);
        let Ab_Hooked = this.scene.add.sprite(spike_apex.x + 30 ,spike_apex.y + 30, 'Ab')
        this.scene.tweens.add ({targets: Ab_Hooked, angle: Phaser.Math.RadToDeg(hook_angle - Math.PI / 2), duration: 5});
        this.container.add(Ab_Hooked)
        if (this.hp == 0)
        {
            this.kill();
            this.spawn_timer = this.scene.time.addEvent({  
                delay: 3500,
                callback: this.delayedSpawn,
                callbackScope: this,
                loop: false
            });
        }
    }// onHit
    
    delayedSpawn()
    {
        this.spawn_timer.remove();
        Pathogen.Spawn(this.scene)
    }

    kill ()
    {
        if (this.id <Pathogen.Pathogens.length)
        {
            Pathogen.Pathogens.splice(this.id, 1)
        }
        this.container.destroy()  
    }// kill

    collide(o1, o2) {}
    
    static Spawn = (scene) =>
    {
        if (Pathogen.Pathogens.length == Pathogen.MAX_PATHOGEN){ Pathogen.Pathogens.shift().kill(this) };
        let pathogen = new Pathogen(scene)
    }

}// Pathogen