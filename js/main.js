var BubbleBurst = BubbleBurst || {};

var config = {
    type : Phaser.Auto,
    width : window.innerWidth,
    height : window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0},
        }
    }
}

BubbleBurst.game = new Phaser.Game(config);

BubbleBurst.game.scene.add('Preload', BubbleBurst.Preload);
BubbleBurst.game.scene.add('MainMenu', BubbleBurst.MainMenu);
BubbleBurst.game.scene.add('Game', BubbleBurst.Game);
BubbleBurst.game.scene.add('Controls', BubbleBurst.Controls);
BubbleBurst.game.scene.add('Story', BubbleBurst.Story);
BubbleBurst.game.scene.add('Esc', BubbleBurst.Esc);
BubbleBurst.game.scene.add('GameOver', BubbleBurst.GameOver);
BubbleBurst.game.scene.add('Win', BubbleBurst.Win);
BubbleBurst.game.scene.add('Level2', BubbleBurst.Level2);
BubbleBurst.game.scene.start('Preload');