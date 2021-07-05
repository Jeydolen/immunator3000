import { TILE_SIZE, CARDINAL_POINTS, CardinalPointToDeg }	from '../shared/utility'
import UnitTest 	                                        from '../shared/unit_test'

export default class Sonar extends UnitTest
{
	static INITIAL_RADIUS   = TILE_SIZE / 2;
	static RADIUS_INCREMENT = TILE_SIZE / 2;

	constructor(entity)
    {
		super(entity);
		if (typeof entity != Phaser.GameObjects.GameObject)
		   throw new Error("NOT a GameObject");
		this.pos = entity
	} // constructor()

	execute(filter)
	{
		let object_infos = [];
		CARDINAL_POINTS.map( (cardinal_name) => {
			let angle = CardinalPointToDeg(cardinal_name);
		} );

		return object_infos
	} // execute()

	test()
	{
		console.log("Sonar test")
	} // test()
} // Sonar class