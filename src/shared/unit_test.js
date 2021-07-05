const UnitTest = class
{
	constructor(arg)
    {
		this.arg = arg
	} // constructor()

	test()
	{
		console.log("UnitTest test")
	} // test()

	static Run(klass)
	{
		console.log("UnitTest Run")
	} // Run()
} // UnitTest class

UnitTest.Run();

exports.UnitTest = UnitTest