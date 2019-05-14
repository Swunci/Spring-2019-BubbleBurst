// load assets
var BubbleBurst = BubbleBurst || {};

BubbleBurst.Preload = function(){};

BubbleBurst.Preload.prototype = {
    preload: function(){
        this.load.image('gamelogo', 'assets/images/gamelogo.png');
        this.load.spritesheet('player','assets/images/player.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.image('bubble1', 'assets/images/bubble1.png');
        this.load.image('bubble2', 'assets/images/bubble2.png');
        this.load.image('bubble3', 'assets/images/bubble3.png');
        this.load.image('bubble4', 'assets/images/bubble4.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('healthbar', 'assets/images/healthbar.png');
        this.load.image('bg', 'assets/images/testbg.png');
        this.load.tilemapTiledJSON('level1', 'assets/tilemaps/testmap.json');
        this.load.image('level1tiles', 'assets/images/housetiles4x.png');
        this.load.audio('bubblepop', 'assets/sounds/bubblepop1.mp3');
        this.load.audio('shootingsound', 'assets/sounds/shootingsound1.mp3');


        
        this.load.tilemapTiledJSON('level2', 'assets/tilemaps/level2.json');
        this.load.image('tiles', 'assets/images/tileset.png');
        this.load.spritesheet('player_16', 'assets/images/player2_16.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.image('sbullet', 'assets/images/sbullet.png');

        this.load.tilemapTiledJSON('level3', 'assets/tilemaps/level3.json');
        this.load.audio('level2', 'assets/sounds/Etude in F minor.wav');
    },
    create: function(){
        this.scene.start('MainMenu');
    }
};