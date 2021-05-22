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
        //this.target = Target.Create(scene, 'S', 'target_' + Membrane.Targets.length)
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

    drawLipids()
    {
        let asset_size = ASSET_SIZE['target_arrow']
        let dx=asset_size.x;
        let dy=0;
        let y=asset_size.x;
        let x=0;
        let angle = 0;
        console.log('Je suis en dehors de la boucle')
        for (let i=0; i < Membrane.MAX_TILES; i++)
        {
            let allow_draw = true;
            for (let k=0; k < Membrane.Targets.length; k++)
            {
                let target = Membrane.Targets[k];
                let x1 = Math.min(x,x+dx)
                let x2 = Math.max(x,x+dx)
                let y1 = Math.min(y,y+dx)
                let y2 = Math.max(y,y+dx)
                
                if (x1 >= target.ent.x && x2  <= target.ent.x+target.ent.width && 
                    y1 >= target.ent.y && y2 <= target.ent.y+target.ent.height) 
                {
                    allow_draw = false;
                    console.log(allow_draw)
                    x= target.ent.x+target.ent.width; 
                    y+=dy;
                    break;
                }
               console.log(allow_draw)
               break;
            }

            //if ( ! allow_draw){x= target.ent.x+target.ent.width; y+=dy; console.log(allow_draw);}
              
            let ent = this.scene.add.image(x,y, 'phospholipid');
            this.scene.tweens.add ({targets: ent, angle: angle, duration: 5});
           
           /// BORD RIGHT
            if (x >= VP_SIZE.x -asset_size.x && y == asset_size.x)
            {
                dx = 0;
                dy = asset_size.x;
                angle=90;
            }
            /// BORD DOWN
            else if (y >= VP_SIZE.y -asset_size.y && x >= VP_SIZE.x - asset_size.y)
            {
                dx = -asset_size.x;
                dy = 0;
                x=VP_SIZE.x -asset_size.y
                y=VP_SIZE.y -asset_size.x
                angle=0;  
            }
            /// BORD LEFT
            else if (x <= asset_size.x &&  y==VP_SIZE.y -asset_size.x)
            {
                dx = 0;
                dy = -asset_size.x;
                angle=-90;
                x=asset_size.x;
            }
            x+=dx;
            y+=dy;
            
        }
    }
}// Membrane