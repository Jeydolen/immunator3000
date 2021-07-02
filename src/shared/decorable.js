export default class Decorable
{
	constructor()
	{
		this.decorations = []
	}

	addDecoration(decoration){this.decorations.push(decoration)}
	execute(obj){this.decorations.map( (decoration) => {decoration.execute(obj)})}
}