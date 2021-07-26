import Phaser       from 'phaser';
import TitleScreen  from './scenes/TitleScreen'
import Game         from './scenes/Game'
import DebugScene   from './scenes/DebugScene'
import {DEBUG}      from './shared/utility';

const config = {
    width: 1200,
    height: 900,
    backgroundColor: DEBUG ?  '#FF2525':'#552525',
    type: Phaser.AUTO,
    physics: { default: 'arcade', arcade: {gravity: {x:0, y: 0}, debug: DEBUG }},
    disableContextMenu: true,
    scale: {zoom: 1}
} // config
  
const game = new Phaser.Game(config);
game.scene.add('titlescreen', TitleScreen);
game.scene.add('game', Game);
game.scene.add('debug', DebugScene);

if ( ! DEBUG) game.scene.start('game');
else game.scene.start('debug');