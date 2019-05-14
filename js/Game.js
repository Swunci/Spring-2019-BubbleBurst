var BubbleBurst = BubbleBurst || {};

BubbleBurst.Game = function(){};

////////////////////////////// Bullet Class that will fire at random directions \\\\\\\\\\
var SBullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function SBullet (scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sbullet');
        this.speed = 0.4;
        this.born = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(this.width, this.height, true);
    },

    
    fire : function(shooter, direction) {
        this.lifeState = 0;
        this.setPosition(shooter.x, shooter.y);

        if (direction === 'up') {
            var rand = Phaser.Math.Between(1, 2);
            if (rand == 1){
                this.xSpeed = 0.2 * Phaser.Math.Between(1, 5);
            }
            else{
                this.xSpeed = -0.2 * Phaser.Math.Between(1, 5);
            }
            this.ySpeed = -this.speed * Phaser.Math.Between(1, 5);
            this.rotation = 0;
            this.body.setSize(this.width, this.height, true);
        }
        else if (direction == 'down') {
            var rand = Phaser.Math.Between(1, 2);
            if (rand == 1){
                this.xSpeed = 0.2 * Phaser.Math.Between(1, 5);
            }
            else{
                this.xSpeed = -0.2 * Phaser.Math.Between(1, 5);
            }
            this.ySpeed = this.speed * Phaser.Math.Between(1, 5);
            this.rotation = 3.14159;
            this.body.setSize(this.width, this.height, true);
        }
        else if (direction == 'left') {
            this.xSpeed = -this.speed * Phaser.Math.Between(1, 5);
            var rand = Phaser.Math.Between(1, 2);
            if (rand == 1){
                this.ySpeed = 0.2 * Phaser.Math.Between(1, 5);
            }
            else{
                this.ySpeed = -0.2 * Phaser.Math.Between(1, 5);
            }
            this.rotation = -1.5708;
            this.body.setSize(this.height, this.width, true);
        }
        else {
            this.xSpeed = this.speed * Phaser.Math.Between(1, 5);
            var rand = Phaser.Math.Between(1, 2);
            if (rand == 1){
                this.ySpeed = 0.2 * Phaser.Math.Between(1, 5);
            }
            else{
                this.ySpeed = -0.2 * Phaser.Math.Between(1, 5);
            }
            this.rotation = 1.5708;
            this.body.setSize(this.height, this.width, true);
        }
    
        this.born = 0;
    },
  
    update: function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        
        // Slow the bullet down 
        if (this.lifeState > 300) {
            this.xSpeed = this.xSpeed*.98;
            this.ySpeed = this.ySpeed*.98;
        }
        this.born += delta;
        this.lifeState += delta;
        // How long the bullet will last before disappearing
        if (this.born > 1500)
        {
            this.destroy();
        }
    }
})

////////////////////////////////  Bullet class /////////////////////////////////////
var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(this.width, this.height, true);
    },

    fire : function(shooter, direction) {
        this.lifeState = 0;
        this.setPosition(shooter.x, shooter.y);

        if (direction === 'up') {
            this.xSpeed = 0;
            this.ySpeed = -this.speed;
            this.rotation = 0;
            this.body.setSize(this.width, this.height, true);
        }
        else if (direction == 'down') {
            this.xSpeed = 0;
            this.ySpeed = this.speed;
            this.rotation = 3.14159;
            this.body.setSize(this.width, this.height, true);
        }
        else if (direction == 'left') {
            this.xSpeed = -this.speed;
            this.ySpeed = 0;
            this.rotation = -1.5708;
            this.body.setSize(this.height, this.width, true);
        }
        else {
            this.xSpeed = this.speed;
            this.ySpeed = 0;
            this.rotation = 1.5708;
            this.body.setSize(this.height, this.width, true);
        }
    
        this.born = 0;
    },
  
    update: function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        
        // Slow the bullet down 
        if (this.lifeState > 300) {
            this.xSpeed = this.xSpeed*.98;
            this.ySpeed = this.ySpeed*.98;
        }
        this.born += delta;
        this.lifeState += delta;
        // How long the bullet will last before disappearing
        if (this.born > 1500)
        {
            this.destroy();
        }
    }

});

////////////////////////////////  End of Bullet class  ///////////////////////////////////

////////////////////////////////    Bubble Classes     ///////////////////////////////////
class BigBubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
      super(scene, 0, 0, 'bubble1');
    }
    
    // Spawn at this location
    spawn(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    // Set direction and speed
    setVelocity(x, y) {
        super.setVelocity(x, y);
    }
  }

class MediumBubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
      super(scene, 0, 0, 'bubble2');
    }
    
    // Spawn at this location
    spawn(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    // Set direction and speed
    setVelocity(x, y) {
        super.setVelocity(x, y);
    }
  }

class SmallBubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
      super(scene, 0, 0, 'bubble3');
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

////////////////////////////////    End of Bubble Classes     ///////////////////////////////////

BubbleBurst.Game.prototype = {
    create: function(){

        ////////            TODO          //////////
        /*
            - Graphics
            {
                -Reload Animation
                -Need level maps
                -Character sprite
                -Add UI for how much ammo left in gun
            }

            - Sound
            {
                - Shooting
                - Background music
                - Winning music
                - Death music
                - Taking damage
            }
        
            - Bugs?
            {
                -Minimap no longer transparent when using a tiled map
            }
            
            - Other stuff to do
            {
                -Create a system for levels
                -Front page could look better
            }
            
        */

        /////////////////////////////////// Global variables ///////////////////////////////////////////
        
        ////////////// for level 1
        if (this.game.level == 1){
            this.physics.world.setBounds(0,0, 1920 * 2, 1920 * 2);
            this.cameras.main.setBounds(0,0, 1920 * 2, 1920 * 2);
            this.cameras.main.setZoom(.95);
        
            this.map = this.make.tilemap({key : 'level1'});
            //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
            var tiles = this.map.addTilesetImage('a', 'level1tiles');
            this.background = this.map.createStaticLayer('background', tiles);
            this.floor = this.map.createStaticLayer('Floor', tiles);
            this.background2 = this.map.createStaticLayer('background2', tiles);
            this.walls = this.map.createStaticLayer('Walls', tiles);
            this.minimap = this.cameras.add(20, 20, 250, 250).setZoom(0.1);
            this.minimap.setBounds(0,0, 1920 * 2, 1920 * 2);
            // minimap no longer transparent when using a tiled map
            // this.mini.alpha doesn't do anything
            this.minimap.alpha = .30;
            this.map.setCollisionBetween(1, 15000, true, 'Walls');
        }
        ///////////////////////////////////// LEVEL 2
        else if (this.game.level == 2){
            this.physics.world.setBounds(0, 0, 1920, 960);
            this.cameras.main.setBounds(0, 0, 1920, 960);
            this.cameras.main.setZoom(1);
    
            this.map = this.make.tilemap({key : 'level2'});
            var tiles2 = this.map.addTilesetImage('tiles2', 'tiles');
            this.floor = this.map.createStaticLayer('floor', tiles2);
            this.walls = this.map.createStaticLayer('wall', tiles2);
            this.minimap = this.cameras.add(20, 20, 250, 250).setZoom(0.25);
            this.minimap.setBounds(0,0, 1920, 960);
            this.minimap.alpha = .30;
            this.map.setCollisionBetween(1, 20000, true, 'wall');
        }

        


        
    
        ////////////////////////////////// Player variables and stuff here //////////////////////////////
        this.bubblesKiled = 0;
        this.numOfBigBubbles = 20;
        if (this.game.level == 2){
            this.numOfBigBubbles = 25;
        }
        this.enemies = this.numOfBigBubbles * 4;

        if (this.game.level == 1){
            this.player = this.physics.add.sprite(1920, 1080, 'player');
        }
        else if (this.game.level == 2){
            this.player = this.physics.add.sprite(300, 300, 'player_16');
        }
        this.player.setCollideWorldBounds(true);
        this.fullHealth = 100;
        this.player.health = this.fullHealth;
        this.player.invincible = false;
        this.invincibilityTime = 1000;

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.minimap.startFollow(this.player, true, 0.05, 0.05);
        this.healthbar = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/(10/9.5), 'healthbar').setScrollFactor(0); 

        //this.ammoSprite = this.physics.add.sprite(100, window.ineerHeight/(10/9.5), 'bullet').setSc
        if (this.cameras.main.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }
        if (this.minimap.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.minimap.deadzone.width, this.minimap.deadzone.height);
        }


        ////////////////////////        Bubbles variables    ///////////////////////////////

        this.bigBubbles = this.physics.add.group({ classType: BigBubble, runChildUpdate: false});
        this.mediumBubbles = this.physics.add.group({ classType: MediumBubble, runChildUpdate: false});
        this.smallBubbles = this.physics.add.group({ classType: SmallBubble, runChildUpdate: false});
        this.smallestBubbles = this.physics.add.group({ classType: SmallestBubble, runChildUpdate:false});


        this.bigBubbles.size = 64;
        this.mediumBubbles.size = 32;
        this.smallBubbles.size = 16;
        this.smallestBubbles.size = 8;

        this.bigBubbles.speed = 300;
        this.mediumBubbles.speed = 400;
        this.smallBubbles.speed = 500;
        this.smallestBubbles.speed = 550;

        this.bigBubbles.damage = 20;
        this.mediumBubbles.damage = 5;
        this.smallBubbles.damage = 2;
        this.smallestBubbles.damage = 2.5;


        //////////////////////      Bubble Spawn Location       /////////////////////////////////

        // spawn big bubbles
        //var rect = new Phaser.Geom.Rectangle(60, 60, 3500, 600);
        //var rect2 = new Phaser.Geom.Rectangle(60, 1440, 3500, 800);
        //var rect3 = new Phaser.Geom.Rectangle(1050, 3000, 1850, 600);
        //  Randomly position the sprites within the rectangle

        if (this.game.level == 1){
            for (var i = 0; i < this.numOfBigBubbles; i++) {
                // Give higher chance for spawning in the bigger room
                var counter = Phaser.Math.Between(0,3);
                var bubble = this.bigBubbles.get().setActive(true).setVisible(true);
                if (counter % 3 == 0) {
                    // Middle room
                    bubble.spawn(Phaser.Math.Between(60, 3500), Phaser.Math.Between(1440, 2040));
                }
                else if (counter % 3 == 1) {
                    // top room
                    bubble.spawn(Phaser.Math.Between(60, 3500), Phaser.Math.Between(60, 600));
                }
                else {
                    // lab
                    bubble.spawn(Phaser.Math.Between(1050, 1850), Phaser.Math.Between(3000, 3600));
                }
                this.randomizeDirection(bubble, this.bigBubbles.size, this.bigBubbles.speed);
            }
        }
        else if (this.game.level == 2){
            for (var i = 0; i < this.numOfBigBubbles; i++) {
                var counter = Phaser.Math.Between(0,3);
                var bubble = this.mediumBubbles.get().setActive(true).setVisible(true);
                if (counter % 3 == 0) {
                    // top left room
                    bubble.spawn(Phaser.Math.Between(80, 880), Phaser.Math.Between(80, 320));
                }
                else if (counter % 3 == 1) {
                    // bottom room
                    bubble.spawn(Phaser.Math.Between(80, 1800), Phaser.Math.Between(688, 896));
                }
                else {
                    // top right
                    bubble.spawn(Phaser.Math.Between(1344, 1800), Phaser.Math.Between(80, 320));
                }
                this.randomizeDirection(bubble, this.mediumBubbles.size, this.mediumBubbles.speed);
            }
        }
        
        /*this.bigBubbles.children.iterate(function (child) {
            this.randomizeDirection(child, this.bigBubbles.size, this.bigBubbles.speed);
        }, this);*/


        /////////////////////        Colliders              ////////////////////
        this.playerBigBubbleCollider = this.physics.add.collider(this.player, this.bigBubbles, this.collideBigBubble, null, this);
        this.playerMediumBubbleCollider = this.physics.add.collider(this.player, this.mediumBubbles, this.collideMediumBubble, null, this);
        this.playerSmallBubbleCollider = this.physics.add.collider(this.player, this.smallBubbles, this.collideSmallBubble, null, this);
        this.playerSmallestBubbleCollider = this.physics.add.collider(this.player, this.smallestBubbles, this.collideSmallestBubble, null, this);
        this.physics.add.collider(this.player, this.walls, null, null, this);
        this.physics.add.collider(this.bigBubbles, this.walls, null, null, this);
        this.physics.add.collider(this.mediumBubbles, this.walls, null, null, this);
        this.physics.add.collider(this.smallBubbles, this.walls, null, null, this);
        this.physics.add.collider(this.smallestBubbles, this.walls, null, null, this);

        ////////////////////       Bullet varibles/mechanics        /////////////////

        this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        if (this.game.level == 2){
            this.playerBullets = this.physics.add.group({ classType: SBullet, runChildUpdate: true });
        }
        this.shoot = true;
        this.shootingDelay = 100;

        this.reload = false;
        this.reloadDelay = 1000;
        this.maxBullets = 6;
        this.bulletsFired = 0;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //////////////////////////////// Functions for each control key ////////////////////////////////////////////
        
        this.moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    
        // W key
        this.input.keyboard.on('keydown_W', function (event) {

            // If player is dead
            if (this.player.active === false) {
                return;
            }

            
            if (!this.player.invincible && this.shoot && !this.reload) {
                // Delay the time between shots
                this.shoot = false;
                this.time.delayedCall(this.shootingDelay, this.canShoot, [], this);
                // Get bullets and set direction 
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'up';

                // Idk why bullet is a boolean 
                if (bullet) {

                    bullet.fire(this.player, direction);
                    this.sound.play('shootingsound');

                    // Add collision between bubbles and bullet and a callback function to handle what happens
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBulletBigBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    
                    this.physics.add.collider(bullet, this.walls, null, null, this);
                }

                // Increment bulletsFired
                this.bulletsFired++;
                // Check if there is no more ammo in the gun
                if (this.bulletsFired == this.maxBullets) {
                    this.reload = true;
                    this.time.delayedCall(this.reloadDelay, this.reloading, [], this);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_S', function (event) {
            if (this.player.active === false) {
                return;
            }
            if (!this.player.invincible && this.shoot && !this.reload) {
                this.shoot = false;
                this.time.delayedCall(this.shootingDelay, this.canShoot, [], this);
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'down';
                if (bullet) {
                    bullet.rotation = 0;
                    bullet.fire(this.player, direction);
                    this.sound.play('shootingsound');
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBulletBigBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    
                    this.physics.add.collider(bullet, this.walls, null, null, this);
                }
                this.bulletsFired++;
                if (this.bulletsFired == this.maxBullets) {
                    this.reload = true;
                    this.time.delayedCall(this.reloadDelay, this.reloading, [], this);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_A', function (event) {
           if (this.player.active === false) {
            return;
            }
            if (!this.player.invincible && this.shoot && !this.reload) {
                this.shoot = false;
                this.time.delayedCall(this.shootingDelay, this.canShoot, [], this);
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'left';
                if (bullet) {
                    bullet.fire(this.player, direction, this);
                    this.sound.play('shootingsound');
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBulletBigBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    
                    this.physics.add.collider(bullet, this.walls, null, null, this);
                }
                this.bulletsFired++;
                if (this.bulletsFired == this.maxBullets) {
                    this.reload = true;
                    this.time.delayedCall(this.reloadDelay, this.reloading, [], this);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_D', function (event) {
            if (this.player.active === false) {
                return;
            }
            if (!this.player.invincible && this.shoot && !this.reload) {
                this.shoot = false;
                this.time.delayedCall(this.shootingDelay, this.canShoot, [], this);
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'right';
                if (bullet) {
                    bullet.fire(this.player, direction);
                    this.sound.play('shootingsound');
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBulletBigBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    
                    this.physics.add.collider(bullet, this.walls, null, null, this);
                }
                this.bulletsFired++;
                if (this.bulletsFired == this.maxBullets) {
                    this.reload = true;
                    this.time.delayedCall(this.reloadDelay, this.reloading, [], this);
                }
            }
        }, this);

        
        this.EscKey = this.input.keyboard.addKey('ESC');
         /////////////////////////////////////////////////////////////////////////////////////////
    },

    update: function(){
        cursors = this.input.keyboard.createCursorKeys();
        if (this.bubblesKiled == this.enemies) {
            this.win();
            this.input.keyboard.resetKeys();
        }

        // the player is dead
        if (this.player.health <= 0){
            this.gameOver();
            this.input.keyboard.resetKeys();
        }

        // Add event handler to ESC key
        if (this.EscKey.isDown){
            this.scene.launch('Esc');
            this.scene.pause('Game');
            this.EscKey.isDown = false;
        }

        if (cursors.left.isDown){ 
            if(this.game.level == 2){
                this.player.setFrame(1);
            }
            this.player.setVelocityX(-300);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(300);
            if(this.game.level == 2){
                this.player.setFrame(2);
            }
        }
        else{
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown){
            this.player.setVelocityY(-300);
            if(this.game.level == 2){
                this.player.setFrame(3);
            }
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(300);
            if(this.game.level == 2){
                this.player.setFrame(0);
            }
        }
        else{
            this.player.setVelocityY(0);
        }
    },

    collideBigBubble : function(){
        if (!this.player.invincible) {
            // If player is not invincible, do damage and make him invincible for 2 seconds
            this.player.health -= this.bigBubbles.damage;
            
            // modify the health bar
            this.healthbar.displayWidth = this.healthbar.width * this.player.health / this.fullHealth;

            this.turnInvincible();

            // Add an delayed event that makes the player vulnerable after X seconds
            this.time.delayedCall(this.invincibilityTime, this.turnMortal, [], this);
        }
    },

    collideMediumBubble : function() {
        if (!this.player.invincible) {
            this.player.health -= this.mediumBubbles.damage;
            this.healthbar.displayWidth = this.healthbar.width * this.player.health / this.fullHealth;
            this.turnInvincible();
            this.time.delayedCall(this.invincibilityTime, this.turnMortal, [], this);
        }
    },

    collideSmallBubble : function() {
        if (!this.player.invincible) {
            this.player.health -= this.smallBubbles.damage;
            this.healthbar.displayWidth = this.healthbar.width * this.player.health / this.fullHealth;
            this.turnInvincible();
            this.time.delayedCall(this.invincibilityTime, this.turnMortal, [], this);
        }
    },

    
    collideSmallestBubble : function() {
        if (!this.player.invincible) {
            this.player.health -= this.smallestBubbles.damage;
            this.healthbar.displayWidth = this.healthbar.width * this.player.health / this.fullHealth;
            this.turnInvincible();
            this.time.delayedCall(this.invincibilityTime, this.turnMortal, [], this);
        }
    },

    turnInvincible : function() {
        this.player.invincible = true;
        this.physics.world.removeCollider(this.playerBigBubbleCollider);
        this.physics.world.removeCollider(this.playerMediumBubbleCollider);
        this.physics.world.removeCollider(this.playerSmallBubbleCollider);
        this.physics.world.removeCollider(this.playerSmallestBubbleCollider);
        this.player.alpha = 0.25;
    },

    turnMortal : function() {
        this.player.invincible = false;
        this.playerBigBubbleCollider = this.physics.add.collider(this.player, this.bigBubbles, this.collideBigBubble, null, this);
        this.playerMediumBubbleCollider = this.physics.add.collider(this.player, this.mediumBubbles, this.collideMediumBubble, null, this);
        this.playerSmallBubbleCollider = this.physics.add.collider(this.player, this.smallBubbles, this.collideSmallBubble, null, this);
        this.playerSmallestBubbleCollider = this.physics.add.collider(this.player, this.smallestBubbles, this.collideSmallestBubble, null, this);
        
        this.player.alpha = 1;
    },

    collideBulletBigBubble : function(bullet, bubble) {
        bubble.destroy();
        bullet.destroy();
        this.spawnMediumBubbles(bubble.x, bubble.y);
        this.sound.play('bubblepop');
    },

    collideBulletMediumBubble : function(bullet, bubble) {
        bubble.destroy();
        bullet.destroy();
        this.spawnSmallBubbles(bubble.x, bubble.y);
        this.sound.play('bubblepop');
    },

    collideBulletSmallBubble : function(bullet, bubble) {
        bubble.destroy();
        bullet.destroy();
        this.sound.play('bubblepop');
        if (this.game.level == 1){
            this.bubblesKiled++;
        }
        else if (this.game.level == 2){
            this.spawnSmallestBubbles(bubble.x, bubble.y);
        }
    },

    collideBulletSmallestBubble : function(bullet, bubble) {
        bubble.destroy();
        bullet.destroy();
        this.sound.play('bubblepop');
        this.bubblesKilled++;
    },

    canShoot : function() {
        this.shoot = true;
    },

    reloading : function() {
        this.reload = false;
        this.bulletsFired = 0;
    },

    spawnMediumBubbles : function(x, y) {
        var mediumBubble1 = this.mediumBubbles.get().setActive(true).setVisible(true);
        var mediumBubble2 = this.mediumBubbles.get().setActive(true).setVisible(true);
        mediumBubble1.body.setCircle(this.mediumBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        mediumBubble2.body.setCircle(this.mediumBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        mediumBubble1.spawn(x,y);
        mediumBubble2.spawn(x,y);
        this.randomizeDirection(mediumBubble1, this.mediumBubbles.size, this.mediumBubbles.speed);
        this.randomizeDirection(mediumBubble2, this.mediumBubbles.size, this.mediumBubbles.speed);
    },

    spawnSmallBubbles : function(x, y) {
        var smallBubble1 = this.smallBubbles.get().setActive(true).setVisible(true);
        var smallBubble2 = this.smallBubbles.get().setActive(true).setVisible(true);
        smallBubble1.body.setCircle(this.smallBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        smallBubble2.body.setCircle(this.smallBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        smallBubble1.spawn(x,y);
        smallBubble2.spawn(x,y);
        this.randomizeDirection(smallBubble1, this.smallBubbles.size, this.smallBubbles.speed);
        this.randomizeDirection(smallBubble2, this.smallBubbles.size, this.smallBubbles.speed);
    },

    
    spawnSmallestBubbles : function(x, y){
        var smallestBubble1 = this.smallestBubbles.get().setActive(true).setVisible(true);
        var smallestBubble2 = this.smallestBubbles.get().setActive(true).setVisible(true);
        smallestBubble1.body.setCircle(this.smallestBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        smallestBubble2.body.setCircle(this.smallestBubbles.size,0,0).setBounce(1).setCollideWorldBounds(true);
        smallestBubble1.spawn(x,y);
        smallestBubble2.spawn(x,y);
        this.randomizeDirection(smallestBubble1, this.smallestBubbles.size, this.smallestBubbles.speed);
        this.randomizeDirection(smallestBubble2, this.smallestBubbles.size, this.smallestBubbles.speed);
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

        // Will add collider with the obstacles in the map later
    },

    gameOver : function() {
        this.cameras.main.fade(2000,0,0,0);
        this.minimap.fade(2000,0,0,0);
        this.time.delayedCall(1900, function() {
            this.scene.start('GameOver');
        }, [], this);
    },

    win : function() {
        this.scene.start('Win');
    }
    
}