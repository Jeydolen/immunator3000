//import path from 'path';

export default class UnitTest
{
	static REGISTERED_CLASSES = []
	constructor(arg) {console.log(arg); UnitTest.REGISTERED_CLASSES.push(arg) } // constructor()

	test() {console.log("UnitTest test")} // test()

	static Run(klass)
	{
		let ut_path = './config/unit_test.json';
		let k_path = './'
		console.log(ut_path)
		import(`${ut_path}`).then((json) => {
			let klasses = json.default;
			klasses.map( async (klass) => { 
				let k = import(`${k_path}/${klass}`).then((k) => { console.dir(k); k.default.Test(); }).catch( (e) => console.error(e)); 
			});
		}).catch((e) => console.error(e));
	} // Run()

} // UnitTest class

//UnitTest.Run();