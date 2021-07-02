import Pathogen from "./pathogen";
import { CardinalPointToDeg, CardinalPointToVPPos } from "./utility";

export default class Target
{
    constructor(scene, cardinal_name, id)
    {
        this.scene  = scene;
        this.setCardinal(cardinal_name, 'target_arrow')
        this.id  = id;
        
        this.ent.setData({pattern: 'arrow', cardinal : this.cardinal});

        if(Pathogen.Pathogens.length != 0){Pathogen.Pathogens.map((virus_instance) => {this.scene.physics.add.collider(this.ent,virus_instance.container,this.collide,null,this)})}

        this.scene.tweens.add ({targets: this.ent, angle: CardinalPointToDeg(cardinal_name), duration: 5});
    }// contructor()

    setCardinal(cardinal_name, sn) 
    {
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

    static Create(scene, cardinal_name, id)
    {
        return new Target(scene,cardinal_name)
    }// Create()

    collide(target_ent, virus_ent)
    {
        console.log('COLLIDE')
    }
}