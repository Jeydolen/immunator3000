import Phaser       from 'phaser';
import TitleScreen  from './scenes/TitleScreen'
import Game         from './scenes/Game'
const config = {
    width: 1024,
    height: 768,
    type: Phaser.AUTO,
    physics: {default: 'arcade', arcade: {gravity: {x:0, y: 0}, debug: false}},
    disableContextMenu: true
}

const game = new Phaser.Game(config)
game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)
game.scene.start('game')