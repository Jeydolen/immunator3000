import {CardinalPointToVPPos, V2, CARDINAL_POINTS, randInt, CardinalPointToDeg}   from '../shared/utility'
import Bullet               from '../shared/bullet'
import Decorable            from '../shared/decorable';
import {FlashDecoration}    from '../shared/decoration';

export default class Gun extends Decorable
{
    constructor(scene)
    {
        super();
        this.scene      = scene;
        this.cardinal   = scene.membrane.gun_cardinal 
        this.setCardinal(this.cardinal,'gun');
        this.ent.setData({cardinal : this.cardinal})
        this.FireAngle  = Phaser.Math.DegToRad(CardinalPointToDeg(this.cardinal));
        this.scene.tweens.add ({targets: this.ent, angle: CardinalPointToDeg(this.cardinal), duration: 5});
       // this.addDecoration(new FlashDecoration(this));
    }// constructor

    static Create(scene){ return new Gun(scene) }// Create

    handlePointerMove(pointer)
    {
        
        let gun_pos = V2(this.ent.x, this.ent.y);
        let pointer_pos = V2(pointer.x, pointer.y);
        this.FireAngle = Phaser.Math.Angle.BetweenPoints(gun_pos,pointer_pos);

       // if ( this.FireAngle == Math.PI) { }
       // this.execute()
        this.scene.tweens.add ({targets: this.ent, angle: Phaser.Math.RadToDeg(this.FireAngle + Math.PI / 2), duration: 5});
    } // handlePointerMove()

    setCardinal(cardinal_name, sn) {
        this.origin = CardinalPointToVPPos(cardinal_name, sn);
        this.cardinal = cardinal_name;
        if(this.ent == undefined)  {this.ent = this.scene.createEnt(true, () => this.scene.add.sprite(this.origin.x, this.origin.y, sn), this.id);}
        else
        {
            this.ent.x =  this.origin.x
            this.ent.y = this.origin.y
            this.ent.body.updateFromGameObject()
        } 
    }


    startFire(){ this.timer = this.scene.time.addEvent({delay:75, callback:this.fire, callbackScope:this, loop:true}); }// startFire()
    endFire  (){ this.timer.remove() }// endFire()
    fire     (){ Bullet.Create(this.scene, this.FireAngle) } // fire()

}// Gun