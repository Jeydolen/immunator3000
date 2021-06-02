import Pathogen from "./pathogen";
import { CardinalPointToDeg, CardinalPointToVPPos } from "./utility";

export default class Target
{
    constructor(scene, cardinal_name, id)
    {
        this.scene  = scene;
        this.origin = CardinalPointToVPPos(cardinal_name, 'target_arrow');
        this.id  = id;
        this.ent = scene.createEnt(true, () => scene.add.sprite(this.origin.x, this.origin.y, 'target_arrow'), this.id);
        this.ent.setData({pattern: 'arrow'});

        if (Pathogen.Pathogens.length != 0)
        {
            Pathogen.Pathogens.map ((virus_instance) => {this.scene.physics.add.collider(this.ent, virus_instance.container, 
                this.collide, null, this)})
        }

        this.scene.tweens.add ({targets: this.ent, angle: CardinalPointToDeg(cardinal_name), duration: 5});
        this.ent.body.updateFromGameObject()
    }// contructor()

    static Create(scene, cardinal_name, id)
    {
        return new Target(scene,cardinal_name)
    }// Create()

    collide(target_ent, virus_ent)
    {
        console.log('COLLIDE')
    }
}