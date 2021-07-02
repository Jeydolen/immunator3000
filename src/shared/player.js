import Gun from '../shared/gun';
import Membrane             from '../shared/membrane';
import {V2,CARDINAL_POINTS}        from '../shared/utility';
export default class Player
{
	constructor(scene)
	{
		this.scene = scene;
		this.gun   = Gun.Create(scene);
	}

	onKeyDown(event) {
		if(TRACKED_KEYS.indexOf(event.key) != -1)
		{
			let gun_cardinal 	 	= this.gun.cardinal; 
			let new_cardinal_index 	= null;
			switch(event.key)
			{
				case 'ArrowUp'  : case 'ArrowRight':  new_cardinal_index = (CARDINAL_POINTS.indexOf(gun_cardinal)+1); if (new_cardinal_index == 4) new_cardinal_index = 0;  break;
				case 'ArrowDown': case 'ArrowLeft' :  new_cardinal_index = (CARDINAL_POINTS.indexOf(gun_cardinal)-1); if (new_cardinal_index == -1) new_cardinal_index = 3;  break;
				default : new_cardinal_index = CARDINAL_POINTS.indexOf(gun_cardinal); break;
			}
			let new_cardinal_name = CARDINAL_POINTS[new_cardinal_index];
			Membrane.Targets.map( (target) =>
			{
				if(target.cardinal == new_cardinal_name) {
					
					target.setCardinal(gun_cardinal,'target_arrow');
				}
			})
			this.gun.setCardinal(new_cardinal_name, 'gun')

		}
	}
	static Create(scene){ return new Player(scene) }// Create
} 

const TRACKED_KEYS = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]