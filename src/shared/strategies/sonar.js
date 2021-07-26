import APP_ROOT_PATH from 'app-root-path';
let utility = import(`file:\\\\${APP_ROOT_PATH.path}\\src\\shared\\utility.js`).catch((e) => console.error(e)) //{ TILE_SIZE, CARDINAL_POINTS, CardinalPointToDeg, getVectorApex }

export default class Sonar
{
	static INITIAL_RADIUS   = utility.TILE_SIZE / 2;
	static RADIUS_INCREMENT = utility.TILE_SIZE / 2;

	constructor(entity)
    {
		if (typeof entity != Phaser.GameObjects.GameObject) throw new Error("NOT a GameObject");
		this.pos = entity;
	} // constructor()

	execute(filter_fn, radius = Sonar.INITIAL_RADIUS, increment_until_found = true)
	{
		let object_infos = [];
		while (object_infos.length == 0 || ! increment_until_found)
		{
			utility.CARDINAL_POINTS.map((cardinal_name) => {
				let angle = utility.CardinalPointToDeg(cardinal_name);
				let apex = utility.getVectorApex(radius, angle)
				let res = filter_fn(apex);
				if(res != undefined && res != {})  object_infos.push(res);
			});
			radius += Sonar.RADIUS_INCREMENT;
		}
		return object_infos;
	} // execute()

	static Test() { console.log("Sonar test"); return true;} // test()
} // Sonar class */