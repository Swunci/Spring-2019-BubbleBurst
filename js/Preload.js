// load assets
var BubbleBurst = BubbleBurst || {};

BubbleBurst.Preload = function(){};

BubbleBurst.Preload.prototype = {
    preload: function(){
        this.load.image('gamelogo', 'assets/images/gamelogo.png');
        //this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
        this.load.spritesheet('player','assets/images/player.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.image('bubble1', 'assets/images/bubble1.png');
        this.load.image('bubble2', 'assets/images/bubble2.png');
        this.load.image('bubble3', 'assets/images/bubble3.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('healthbar', 'assets/images/healthbar.png');
    },
    create: function(){
        this.scene.start('MainMenu');
    }
};