import Phase from 'phaser'

export default class TitleScreen extends Phase.Scene
{
    preload()
    {

    }

    create()
    {
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let text = this.add.text (400,300, 'Repulsator 3000', style)
        text.setOrigin(0.5, 0.5)
    }
}