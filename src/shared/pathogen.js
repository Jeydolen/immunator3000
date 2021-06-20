import {V2, ASSET_SIZE, getVectorApex}        from '../shared/utility'
import Decorable                              from '../shared/decorable';
import {FlashDecoration}  from '../shared/decoration';

export default class Pathogen extends Decorable
{
    static MAX_PATHOGEN     = 10;
    static MAX_HP           = 13;
    static SPAWN_RADIUS     = 100;
    static SPIKE_COUNT      = 12;
    static SPIKE_ANGLE_STEP = Math.PI * 2 / Pathogen.SPIKE_COUNT;
    static SPEED            = 250;
    static Pathogens        = [];

    constructor(scene, type_name = "virus_arrow")
    {
        super(scene);
        this.id         = Pathogen.Pathogens.length;
        this.hook       = 'NONE'; 
        this.scene      = scene;
        this.type_name  = type_name
        this.hp         = Pathogen.MAX_HP;
        this.name       = 'container_pathogen_' + this.id
        this.origin     = this.getSpawnPos();
        // ITS A COUPLAGE
        this.addDecoration(new FlashDecoration(this))

        this.ent        = scene.add.image(this.getSize().x,this.getSize().y, this.type_name);
        this.slots      = 1;
        this.flashed    = false;
        this.ent.setOrigin(0.5,0.5)
        this.ent.setData({'pathogen_instance': this, 'kill': this.kill, 'hp' : this.hp, 'type_name':this.type_name});
        
        // THIS.CONTAINER
        this.container      = scene.add.container(this.origin.x, this.origin.y);
        this.container.add(this.ent);
        this.container.name = this.name
            // PHYSICS INIT FOR CONTAINER
            scene.physics.add.existing( this.container, false);
            this.container.body.setCollideWorldBounds(true, 1, 1);
            this.container.body.setMaxSpeed(50)
            scene.physics.add.collider(this.container, scene.membraneLayer, this.onMembraneCollide, null, this)
            // PHYSICS INIT FOR CONTAINER
        // THIS.CONTAINER
        Pathogen.Pathogens.push(this);

    }// constructor

    getSpawnPos()
    {
        let origin = V2(0,60);
        let tile1 = this.scene.map.getTileAtPoint(origin);
        /*while (tile1.index != -1 && tile1.index != 5)
        {
            tile1 = this.scene.map.getTileAtPoint(origin) 
            for (let i=0; i < 2; i++)
            {
                origin.x += 30;
                origin.y += 30;

            } 
           
        }*/
        return origin
    }

    getSize()   {return ASSET_SIZE[this.type_name]}
    getCenter() {return V2(this.getSize().x/2,this.getSize().y/2)}

    getCrown(radius) {
        let crown = [];
    
        CARDINAL_POINTS.map( (cardinal_name) => {
            if (cardinal_name != this.scene.gun.ent.getData('cardinal'))
            {
                let vector = CardinalPointToVPPos(cardinal_name, this.type_name)
                crown.push(V2(vector.x * radius, vector.y * radius))
            }
        })
        return crown
    }// getCrown()

    onHit = () =>
    {
        this.hp  = this.ent.getData('hp') - 1;
        this.ent.setData('hp', this.hp);
        this.slots += 1;
        let hook_angle  = Pathogen.SPIKE_ANGLE_STEP * this.slots
        let spike_apex  = getVectorApex(this.getCenter().x, hook_angle);
        let Ab_Hooked   = this.scene.add.sprite(spike_apex.x + this.getSize().x,spike_apex.y + this.getSize().y, 'Ab')
        this.scene.tweens.add({targets: Ab_Hooked, angle: Phaser.Math.RadToDeg(hook_angle - Math.PI / 2), duration: 5});
        this.container.add(Ab_Hooked)
        if (this.hp == 0)
        {
            this.kill();
            this.spawn_timer = this.scene.time.addEvent({ delay: 3500, callback: this.delayedSpawn, callbackScope: this, loop: false});
        }
    }// onHit

    onMembraneCollide = (virus_container_ent, membrane_layer) =>
    {
        this.execute()
        /*
        this.timer1 = this.scene.time.addEvent({  
            delay: 300,
            callback: () => {
                if (this.flashed)   this.ent.setTintFill(Phaser.Display.Color.GetColor(255, 255, 255))
                else                this.ent.clearTint()
                this.flashed = !    this.flashed
            },
            callbackScope: this,
            repeat : 10
        });*/
    }
    
    delayedSpawn()
    {
        this.spawn_timer.remove();
        Pathogen.Spawn(this.scene);
    }

    kill ()
    {
        if (this.id <Pathogen.Pathogens.length){Pathogen.Pathogens.splice(this.id, 1)}
        this.container.destroy()  
    }// kill
    
    static Spawn = (scene) =>
    {
        if (Pathogen.Pathogens.length == Pathogen.MAX_PATHOGEN){ Pathogen.Pathogens.shift().kill(this) };
        let pathogen = new Pathogen(scene)
    }

}// Pathogen