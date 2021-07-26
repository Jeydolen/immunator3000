import assert from 'assert';
import APP_ROOT_PATH from 'app-root-path';

export default UnitTest = class
{
	static REGISTERED_CLASSES = []
	constructor(arg) {console.log(arg); UnitTest.REGISTERED_CLASSES.push(arg) } // constructor()

	test() {console.log("UnitTest test")} // test()

	static Run(klass)
	{
		//UnitTest.REGISTERED_CLASSES.map( (klass) => new klass.test())
		import(`file://${APP_ROOT_PATH.path}/src/shared/config/unit_test.json`).then((json) => {
			let klasses = json.default;
			klasses.map( async (klass) => { 
				let k = import(`file://${APP_ROOT_PATH.path}/src/shared/${klass}`).then((k) => { console.dir(k); assert(k.default.Test()) }).catch( (e) => console.error(e)); 
			});
		}).catch((e) => console.error(e));
	} // Run()

} // UnitTest class

//UnitTest.Run();