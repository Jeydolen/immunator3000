import Target from "./target";
import { ASSET_SIZE, CARDINAL_POINTS, V2, VP_SIZE } from "./utility";

export default class Membrane 
{
    static MAX_SLOTS = 4;
    static Targets = [];
    static MAX_TILES = 200;
    constructor (scene)
    {
        this.scene = scene;
        this.slot   = 0;
        this.spawnTargets();
        //this.drawLipids();
    }

    static Create(scene){return new Membrane(scene)}

    spawnTargets()
    {
        CARDINAL_POINTS.map( (cardinal_name) => {
            if (cardinal_name != this.scene.gun.ent.getData('cardinal'))
                this.target = Target.Create(this.scene, cardinal_name, 'target_' + Membrane.Targets.length);
            Membrane.Targets.push(this.target)
            console.log('PUSHED')
        })
    }

}// Membrane