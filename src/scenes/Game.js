import Phaser               from 'phaser'
import { V2}                from '../shared/utility'
import Bullet               from '../shared/bullet'
import Pathogen             from '../shared/pathogen'

export default class Game extends Phaser.Scene
{
    static VP_SIZE = V2(1024,768);

    constructor(config)
    {
        super(config);
        this.config     = config;
        this.bubbles    = [];
        this.FireAngle  = 0;
    } // constructor()

    preload()
    {
        this.load.setBaseURL('http://localhost:8000/')
        this.load.image('gun', 'assets/cannon.png');
        this.load.image('Ab', 'assets/ab_bullet.png');
        this.load.image('virus', 'assets/virus1.png');
        this.load.image('block_tileset', 'assets/block_tileset.png')
        this.load.atlas('particle_shapes', 'assets/particles/tileset.png', 'assets/particles/shapes.json');
        this.load.text('particle_effect', 'assets/particles/particle_effect.json');
    } // preload()

    getVPSize(){return Game.VP_SIZE;}// getVPSize

    create()
    {
        let gun_pos = CardinalPointToVPPos('N','gun');
        this.gun = this.createEnt(true,() => this.add.image(gun_pos.x, gun_pos.y, 'gun'));
        this.text =this.add.text(25,25,'Ab')
        this.virus = Pathogen.Spawn(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.startFire, this);
        this.input.on('pointerup', this.endFire, this);
        this.input.on(Phaser.Input.Events.POINTER_MOVE,this.handlePointerMove, this);
        this.add.particles('particle_shapes', this.cache.json.get('particle-effect'));
    } // create()

    update()
    {
        this.text.text = 'Bullet count : ' + Bullet.Bullets.length;
        this.gun.Angle = Phaser.Math.RadToDeg(this.FireAngle);
    } // update()

    createEnt(is_static, cb, name)
    {
        let entity = cb();
        this.physics.add.existing(entity, is_static);
        if (name != undefined)
            entity.name = name
        if ( ! is_static )
        {
            entity.body.setCollideWorldBounds(true, 1, 1);
            entity.body.setBounce(1,1);
        }
        return entity;
    } // createEnt()

    startFire()
    {
        this.timer = this.time.addEvent({
            delay: 500,
            callback: this.fire,
            callbackScope: this,
            loop: true
        });
    }// startFire

    endFire()
    {
        this.timer.remove()
    }// endFire

    handlePointerMove(pointer)
    {
        let gun_pos = new Phaser.Math.Vector2(this.gun.x, this.gun.y);
        let pointer_pos = new Phaser.Math.Vector2(pointer.x, pointer.y);
        this.FireAngle = Phaser.Math.Angle.BetweenPoints(gun_pos,pointer_pos);
        this.tweens.add ({targets: this.gun, angle: Phaser.Math.RadToDeg(this.FireAngle), duration: 5});
    } // handlePointerMove()

    handlePointerDown(pointer, currentlyUsed)
    {
        this.fire()
    } // handlePointerDown()

    fire()
    {
        Bullet.Create(this)
    } // fire()
}; // Game class

const ASSET_SIZE =
{
    "gun": V2(64,64),
    "Ab": V2(15,15),
    "virus": V2(60,60),
}

const CardinalPointToVPPos = (cardinal, sprite_name) =>
{ 
    switch(cardinal)
    {
        case 'N' : return V2(Game.VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2,                  ASSET_SIZE[sprite_name].y/2);
        case 'S' : return V2(Game.VP_SIZE.x/2 - ASSET_SIZE[sprite_name].x/2, Game.VP_SIZE.y - ASSET_SIZE[sprite_name].y/2);
        case 'W' : return V2(                 ASSET_SIZE[sprite_name].x/2, Game.VP_SIZE.y/2 - ASSET_SIZE[sprite_name].y/2);
        case 'E' : return V2(Game.VP_SIZE.x - ASSET_SIZE[sprite_name].x/2, Game.VP_SIZE.y /2- ASSET_SIZE[sprite_name].y/2);
        default:   return V2(0,0)
    }
}// CardinalPointToVPPos