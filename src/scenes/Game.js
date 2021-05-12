import Phaser               from 'phaser'
import Pathogen             from '../shared/pathogen'
import Gun                  from '../shared/gun'

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
        this.load.image('gun',          'assets/cannon.png');
        this.load.image('Ab',           'assets/ab_bullet.png');
        this.load.image('virus_arrow',  'assets/virus_arrow.png');
        this.load.image('target_arrow', 'assets/target_arrow.png');
    } // preload()

    create()
    {
        this.virus  = Pathogen.Spawn(this);
        this.gun    = Gun.Create(this);
        this.input.on('pointerdown', this.gun.startFire, this.gun);
        this.input.on('pointerup',   this.gun.endFire,   this.gun);
        this.input.on(Phaser.Input.Events.POINTER_MOVE,this.gun.handlePointerMove, this.gun);
    } // create()

    update(){ this.gun.update()} // update()

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