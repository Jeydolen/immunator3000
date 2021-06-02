import Phaser               from 'phaser';
import Pathogen             from '../shared/pathogen';
import Gun                  from '../shared/gun';
import Membrane             from '../shared/membrane';
import { DEBUG }            from '../shared/utility';

export default class Game extends Phaser.Scene
{
    constructor(config)
    {
        super(config);
        this.config     = config;
    } // constructor()

    preload()
    {
        this.load.setBaseURL('https://localhost:8000/');
        this.load.image('gun',          'assets/gun.png');
        this.load.image('Ab',           'assets/ab_bullet.png');
        this.load.image('virus_arrow',  'assets/virus_arrow.png');
        this.load.image('target_arrow', 'assets/target_arrow_v2.png');
        this.load.image('phospholipid', 'assets/phospholipid.png');
        this.load.image("tileset",      "assets/tiles/tileset.png");
        this.load.tilemapTiledJSON('map',"assets/tiles/map2.json");
    } // preload()

    create()
    {
        const map       = this.make.tilemap({ key: "map"});
        const tileset   = map.addTilesetImage("tileset","tileset");
        const membraneLayer = map.createLayer("Membrane + cell", tileset)
        //membraneLayer.setCollisionByProperty({collides : true})

        this.virus      = Pathogen.Spawn(this);
        this.gun        = Gun.Create(this);
        this.membrane   = Membrane.Create(this)
        this.input.on('pointerdown', this.gun.startFire, this.gun);
        this.input.on('pointerup',   this.gun.endFire,   this.gun);
        this.input.on(Phaser.Input.Events.POINTER_MOVE,this.gun.handlePointerMove, this.gun);
        if (DEBUG)
            this.text = this.add.text(30,30, 'DEBUG')
    } // create()

    update(){if (DEBUG) this.text.text = "Math Fireangle " + Phaser.Math.RadToDeg(this.gun.FireAngle) }// update()

    createEnt(is_static, cb, name)
    {
        let entity = cb();
        this.physics.add.existing(entity, is_static);
        if (name != undefined) entity.name = name
        if ( ! is_static )
        {
            entity.body.setCollideWorldBounds(true, 1, 1);
            entity.body.setBounce(1,1);
        }
        return entity;
    } // createEnt()
}; // Game class