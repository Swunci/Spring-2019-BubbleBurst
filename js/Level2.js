var BubbleBurst = BubbleBurst || {};

BubbleBurst.Level2 = function(){};


class SmallestBubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
      super(scene, 0, 0, 'bubble4');
    }
    
    spawn(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }


    setVelocity(x, y) {
        super.setVelocity(x, y);
    }
  }

BubbleBurst.Level2.prototype = {
    create: function(){
        this.physics.world.setBounds(0, 0, 1920, 960);
        this.cameras.main.setBounds(0, 0, 1920, 960);
        

        this.map2 = this.make.tilemap({key : 'level2'});
        var tiles2 = this.map2.addTilesetImage('tiles2', 'level2tiles');
        this.floor = this.map2.createStaticLayer('floor', tiles2);
        this.wall = this.map2.createStaticLayer('wall', tiles2);
        //this.cameras.main.setZoom(0.95);
        
        this.map2.setCollisionBetween(1, 10000, true, 'wall');

        //this.minimap = this.cameras.add(20, 20, 250, 250).setZoom(0.1);
        //this.minimap.setBounds(0,0, 1920, 960);
        //this.minimap.alpha = .75;
        

        ////////////////////////////////// Player variables and stuff here //////////////////////////////
        this.bubblesKiled = 0;
        this.numOfBigBubbles = 20;
        this.enemies = this.numOfBigBubbles * 4;

        this.player = this.physics.add.sprite(300, 300, 'player_16');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.wall, null, null, this);
        this.fullHealth = 100;
        this.player.health = this.fullHealth;
        this.player.invincible = false;
        this.invincibilityTime = 1000;

        this.cameras.main.startFollow(this.player);
        //this.minimap.startFollow(this.player);
        this.healthbar = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/(10/9.5), 'healthbar').setScrollFactor(0); 

        if (this.cameras.main.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }
        /*if (this.minimap.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.minimap.deadzone.width, this.minimap.deadzone.height);
        }*/

        ////////////////////////        Bubbles variables    ///////////////////////////////

        this.mediumBubbles = this.physics.add.group({ classType: MediumBubble, runChildUpdate: false});
        this.smallBubbles = this.physics.add.group({ classType: SmallBubble, runChildUpdate: false});
        this.smallestBubbles = this.physics.add.group({ classType: SmallestBubble, runChildUpdate:false});

        this.mediumBubbles.size = 32;
        this.smallBubbles.size = 16;
        this.smallestBubbles.size = 8;

        this.mediumBubbles.speed = 400;
        this.smallBubbles.speed = 500;
        this.smallestBubbles.speed = 550;

        this.mediumBubbles.damage = 10;
        this.smallBubbles.damage = 5;
        this.smallestBubbles.damage = 2.5;

        //////////////////////      Bubble Spawn Location       /////////////////////////////////

        for (var i = 0; i < this.numOfBigBubbles; i++) {
            // Give higher chance for spawning in the bigger room
            var counter = Phaser.Math.Between(0,3);
            var bubble = this.mediumBubbles.get().setActive(true).setVisible(true);
            if (counter % 3 == 0) {
                // Middle room
                bubble.spawn(Phaser.Math.Between(80, 880), Phaser.Math.Between(80, 320));
            }
            else if (counter % 3 == 1) {
                // top room
                bubble.spawn(Phaser.Math.Between(80, 880), Phaser.Math.Between(80, 320));
            }
            else {
                // lab
                bubble.spawn(Phaser.Math.Between(80, 880), Phaser.Math.Between(80, 320));
            }
            this.randomizeDirection(bubble, this.mediumBubbles.size, this.mediumBubbles.speed);
        }

        //////////////////////////////// Functions for each control key ////////////////////////////////////////////
        
        this.moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    },
    randomizeDirection : function(bubble, size, speed) {
        var counter = Phaser.Math.Between(0,3);
        if (counter % 4 == 0) {
            bubble.setVelocity(speed, speed);
        }
        else if (counter % 4 == 1) {
            bubble.setVelocity(speed, -speed);
        }
        else if (counter % 4 == 2) {
            bubble.setVelocity(-speed, speed);
        }
        else {
            bubble.setVelocity(-speed, -speed);
        }
        bubble.setBounce(1).setCollideWorldBounds(true);
        bubble.setCircle(size, 0, 0);

    },

    update: function(){
        cursors = this.input.keyboard.createCursorKeys();
    
        if (cursors.left.isDown){ 
            this.player.setVelocityX(-300);
            this.player.setFrame(1);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(300);
            this.player.setFrame(2);
        }
        else{
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown){
            this.player.setVelocityY(-300);
            this.player.setFrame(3);
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(300);
            this.player.setFrame(0);
        }
        else{
            this.player.setVelocityY(0);
        }
    },
}