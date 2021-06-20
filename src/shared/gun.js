import {CardinalPointToVPPos, V2, CARDINAL_POINTS, randInt, CardinalPointToDeg}   from '../shared/utility'
import Bullet           from '../shared/bullet'
import Decorable        from './decorable';
import FlashDecoration  from './decoration';

export default class Gun extends Decorable
{
    constructor(scene)
    {
        super();
        this.scene      = scene;
        this.cardinal   = CARDINAL_POINTS[randInt(0,3)]
        this.FireAngle  = Phaser.Math.DegToRad(CardinalPointToDeg(this.cardinal));
        let gun_pos     = CardinalPointToVPPos(this.cardinal,'gun');
        this.ent        = scene.createEnt(false,() => scene.add.sprite(gun_pos.x, gun_pos.y, 'gun'));     
        this.ent.setData({cardinal: this.cardinal});   
        this.scene.tweens.add ({targets: this.ent, angle: CardinalPointToDeg(this.cardinal), duration: 5});
        this.addDecoration(new FlashDecoration(this));
    }// constructor

    static Create(scene){ return new Gun(scene) }// Create

    handlePointerMove(pointer)
    {
        
        let gun_pos = V2(this.ent.x, this.ent.y);
        let pointer_pos = V2(pointer.x, pointer.y);
        this.FireAngle = Phaser.Math.Angle.BetweenPoints(gun_pos,pointer_pos);

       // if ( this.FireAngle == Math.PI) { }
        this.execute()
        this.scene.tweens.add ({targets: this.ent, angle: Phaser.Math.RadToDeg(this.FireAngle + Math.PI / 2), duration: 5});
    } // handlePointerMove()

    startFire(){ this.timer = this.scene.time.addEvent({delay:75, callback:this.fire, callbackScope:this, loop:true}); }// startFire()
    endFire  (){ this.timer.remove() }// endFire()
    fire     (){ Bullet.Create(this.scene, this.FireAngle) } // fire()

}// Gun