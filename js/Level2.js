var BubbleBurst = BubbleBurst || {};

BubbleBurst.Level2 = function(){};

////////////////////////////////////////// new bullet class /////////////////////////////////
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


////////////////////////// Smallest Bubble Class \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
        // set the level to 2 \\
        this.game.level = 2;

        this.physics.world.setBounds(0, 0, 1920, 960);
        this.cameras.main.setBounds(0, 0, 1920, 960);
        this.cameras.main.setZoom(1);

        this.map2 = this.make.tilemap({key : 'level2'});
        var tiles2 = this.map2.addTilesetImage('tiles2', 'tiles');
        this.floor = this.map2.createStaticLayer('floor', tiles2);
        this.wall = this.map2.createStaticLayer('wall', tiles2);
        
        this.map2.setCollisionBetween(1, 20000, true, 'wall');
        

        ////////////////////////////////// Player variables and stuff here //////////////////////////////
        this.bubblesKilled = 0;
        this.numOfBigBubbles = 20;
        this.enemies = this.numOfBigBubbles * 4;

        this.player = this.physics.add.sprite(300, 300, 'player_16');
        this.player.setCollideWorldBounds(true);
        this.fullHealth = 100;
        this.player.health = this.fullHealth;
        this.player.invincible = false;
        this.invincibilityTime = 1000;

        this.cameras.main.startFollow(this.player);
        this.healthbar = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/(10/9.5), 'healthbar').setScrollFactor(0); 

        if (this.cameras.main.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }

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

        /////////////////////        Colliders              ////////////////////
        this.playerMediumBubbleCollider = this.physics.add.collider(this.player, this.mediumBubbles, this.collideMediumBubble, null, this);
        this.playerSmallBubbleCollider = this.physics.add.collider(this.player, this.smallBubbles, this.collideSmallBubble, null, this);
        this.playerSmallestBubbleCollider = this.physics.add.collider(this.player, this.smallestBubbles, this.collideSmallestBubble, null, this);
        this.physics.add.collider(this.player, this.wall, null, null, this);
        this.physics.add.collider(this.smallestBubbles, this.wall, null, null, this);
        this.physics.add.collider(this.mediumBubbles, this.wall, null, null, this);
        this.physics.add.collider(this.smallBubbles, this.wall, null, null, this);

        ////////////////////       Bullet varibles/mechanics        /////////////////

        this.playerBullets = this.physics.add.group({ classType: SBullet, runChildUpdate: true });
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
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
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
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
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
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
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
                    this.physics.add.collider(this.smallestBubbles, bullet, this.collideBulletSmallestBubble, null, this);
                    this.physics.add.collider(this.mediumBubbles, bullet, this.collideBulletMediumBubble, null, this);
                    this.physics.add.collider(this.smallBubbles, bullet, this.collideBulletSmallBubble, null, this);
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
            this.scene.pause('Level2');
            this.EscKey.isDown = false;
        }
        
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

    collideMediumBubble : function(){
        if (!this.player.invincible){
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
        this.physics.world.removeCollider(this.playerSmallestBubbleCollider);
        this.physics.world.removeCollider(this.playerMediumBubbleCollider);
        this.physics.world.removeCollider(this.playerSmallBubbleCollider);
        this.player.alpha = 0.25;
    },

    turnMortal : function() {
        this.player.invincible = false;
        this.playerSmallestBubbleCollider = this.physics.add.collider(this.player, this.smallestBubbles, this.collideSmallestBubble, null, this);
        this.playerMediumBubbleCollider = this.physics.add.collider(this.player, this.mediumBubbles, this.collideMediumBubble, null, this);
        this.playerSmallBubbleCollider = this.physics.add.collider(this.player, this.smallBubbles, this.collideSmallBubble, null, this);
        this.player.alpha = 1;
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
        this.spawnSmallestBubbles(bubble.x, bubble.y);
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

    
    gameOver : function() {
        this.cameras.main.fade(2000,0,0,0);
        //this.minimap.fade(2000,0,0,0);
        this.time.delayedCall(1900, function() {
            this.scene.start('GameOver');
        }, [], this);
    },

    win : function() {
        this.scene.start('Win');
    }
    
}