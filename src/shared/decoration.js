export default class Decoration
{
	constructor(){}
	execute(obj){}
}

class FlashDecoration extends Decoration
{
	constructor(obj)
	{
		super(obj)
		this.flashed = false
		this.obj = obj
	}

	execute()
	{
		this.timer1 = this.obj.scene.time.addEvent({  
            delay: 300,
            callback: () => {
                if (this.flashed)   this.obj.ent.setTintFill(Phaser.Display.Color.GetColor(255, 255, 255))
                else                this.obj.ent.clearTint()
                this.flashed = !    this.flashed
            },
            callbackScope: this.obj,
            repeat : 10
		})
	}
}

exports.FlashDecoration = FlashDecoration;