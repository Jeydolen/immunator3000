import {CardinalPointToVPPos, V2}   from '../shared/utility'
import Bullet                       from '../shared/bullet'

export default class Gun
{
    constructor(scene)
    {
        this.FireAngle  = 0;
        this.scene      = scene;
        let gun_pos     = CardinalPointToVPPos('N','gun');
        this.ent    = scene.createEnt(false,() => scene.add.sprite(gun_pos.x, gun_pos.y, 'gun'));        
    }// constructor

    static Create(scene){ return new Gun(scene) }// Create

    handlePointerMove(pointer)
    {
        let gun_pos = V2(this.ent.x, this.ent.y);
        let pointer_pos = V2(pointer.x, pointer.y);
        this.FireAngle = Phaser.Math.Angle.BetweenPoints(gun_pos,pointer_pos);
        this.scene.tweens.add ({targets: this.ent, angle: Phaser.Math.RadToDeg(this.FireAngle), duration: 5});
    } // handlePointerMove()

    update   (){ this.scene.gun.Angle = Phaser.Math.RadToDeg(this.FireAngle); }// update()
    startFire(){ this.timer = this.scene.time.addEvent({delay:75, callback:this.fire, callbackScope:this, loop:true}); }// startFire()
    endFire  (){ this.timer.remove() }// endFire()
    fire     (){ Bullet.Create(this.scene, this.FireAngle) } // fire()

}// Gun