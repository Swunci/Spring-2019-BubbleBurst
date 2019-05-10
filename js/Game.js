var BubbleBurst = BubbleBurst || {};

BubbleBurst.Game = function(){};

////////////////////////////////  Bullet class /////////////////////////////////////
var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(this.width, this.height, true);
    },

    fire : function(shooter, direction) {
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
    
    // Not sure if this even does anything
    update: function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

////////////////////////////////  End of Bullet class  ///////////////////////////////////


BubbleBurst.Game.prototype = {
    create: function(){

        ////////            TODO          //////////
        /*
            - Mechanics
            {
                -When bullet collides with bubbles, need to split into 2 smaller bubbles
                -Making player invincible for 2 seconds
                -Add delay between player shooting
                -Add delay for reloading
                -Shrinking player when he takes damage
                -Need to implement an overlap function instead of collision 
                 because we don't want the bubbles to change directions when colliding with player
                -Pausing game
            }

            - Graphics
            {
                -Need level maps
                -Character sprite
            }

            - Sound
            {
                - Shooting
                - Background music
                - Winning music
                - Deathing music
                - Taking damage
                - Popping bubbles
            }
            
            - AI
            {
                -Randomize the direction the two bubbles go when the larger bubble is popped
                -Randomize the speed of each bubble
                -Smallest bubbles go faster (random number between like 80(?)-100(?))
                -Medium bubbles have speed between (60(?)-70(?))
                -Big bubbles are the slowest (20-40)
            }

            - Bugs?
            {
                -Need to fix scaling problem, changing size of window cuts off the game window
                -Don't know why delayedEvent doesn't work properly to toggleInvincibility
            }
        */

        /////////////////////////////////// Global variables ///////////////////////////////////////////
        //this.map = this.make.tilemap({ key: 'level1' });
        this.physics.world.setBounds(0,0, 1920 * 2, 1080 * 2);
        this.cameras.main.setBounds(0,0, 1920 * 2, 1080 * 2);
        this.add.image(0,0, 'bg').setOrigin(0);
        this.add.image(1920, 0, 'bg').setOrigin(0);
        this.add.image(0, 1080, 'bg').setOrigin(0);
        this.add.image(1920, 1080, 'bg').setOrigin(0);


        // Player stats and stuff
    
        this.player = this.physics.add.sprite(1920, 1080, 'player');
        this.player.setCollideWorldBounds(true);
        this.fullHealth = 20;
        this.player.health = this.fullHealth;
        this.player.invincible = false;


        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        // add health bar
        this.healthbar = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/(10/9), 'healthbar').setScrollFactor(0);
        this.healthbar.setScrollFactor(0);
        if (this.cameras.main.deadzone)
        {
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }

        // Bubble stats and stuff
        /*this.bubbles_1 = this.physics.add.group({
            key: 'bubble1',
            repeat: 15,
            setXY: {x:Phaser.Math.Between(0, window.innerWidth), y:Phaser.Math.Between(0, window.innerHeight)}
        });*/

        /*this.bubbles_1.children.iterate(function (child) {
            child.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
            child.setBounce(1).setCollideWorldBounds(true);
            child.setCircle(64, 0, 0);
        });*/

        this.bigBubbles = this.physics.add.group(
            {
                key: 'bubble1',
                repeat: 10,
            }
        );
        var rect = new Phaser.Geom.Rectangle(0, 0, 1920 * 2, 1080 * 2);

        //  Randomly position the sprites within the rectangle
        Phaser.Actions.RandomRectangle(this.bigBubbles.getChildren(), rect);
        

        var counter = 0;
        this.bigBubbles.children.iterate(function (child) {
            if (counter % 4 == 0) {
                child.setVelocity(500, 500);
            }
            else if (counter % 4 == 1) {
                child.setVelocity(500, -500);
            }
            else if (counter % 4 == 2) {
                child.setVelocity(-500, 500);
            }
            else {
                child.setVelocity(-500, -500);
            }
            child.setBounce(1).setCollideWorldBounds(true);
            child.setCircle(64, 0, 0);
            counter++;
        });

        this.playerCollider = this.physics.add.collider(this.player, this.bigBubbles, this.collideBubble, null, this);

        // Create the bullets here
        this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //////////////////////////////// Functions for each control key ////////////////////////////////////////////
        
        moveKeys = this.input.keyboard.addKeys({
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
            
            if (!this.player.invincible) {
                // Get bullets and set direction 
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'up';

                // Idk why bullet is a boolean
                if (bullet) {

                    bullet.fire(this.player, direction);

                    // Add collision between bubbles and bullet and a callback function to handle what happens
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBullet);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_S', function (event) {
            if (this.player.active === false) {
                return;
            }
            if (!this.player.invincible) {
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'down';
                if (bullet) {
                    bullet.rotation = 0;
                    bullet.fire(this.player, direction);
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBullet);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_A', function (event) {
           if (this.player.active === false) {
            return;
            }
            if (!this.player.invincible) {
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'left';
                if (bullet) {
                    bullet.fire(this.player, direction);
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBullet);
                }
            }
        }, this);

        this.input.keyboard.on('keydown_D', function (event) {
            if (this.player.active === false) {
                return;
            }
            if (!this.player.invincible) {
                var bullet = this.playerBullets.get().setActive(true).setVisible(true);
                var direction = 'right';
                if (bullet) {
                    bullet.fire(this.player, direction);
                    this.physics.add.collider(this.bigBubbles, bullet, this.collideBullet);
                }
            }
        }, this);

        
        this.EscKey = this.input.keyboard.addKey('ESC');
         /////////////////////////////////////////////////////////////////////////////////////////
    },

    update: function(){
        cursors = this.input.keyboard.createCursorKeys();

        // the player is dead
        if (this.player.health <= 0){
            window.alert('DEAD, return to main menu after 3 seconds');
            var now = new Date().getTime();
            while ( new Date().getTime() < now + 3000 ){
                // do nothing, wait for three seconds and return to main menu
            }
            this.scene.start('MainMenu');
        }

        // Add event handler to ESC key
        if (this.EscKey.isDown){
            this.scene.launch('Esc');
            this.scene.pause('Game');
            this.EscKey.isDown = false;
        }

        if (cursors.left.isDown){ 
            this.player.setVelocityX(-500);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(500);
        }
        else{
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown){
            this.player.setVelocityY(-500);
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(500);
        }
        else{
            this.player.setVelocityY(0);
        }
    },

    collideBubble: function(){
        if (!this.player.invincible) {
            // If player is not invincible, do damage and make him invincible for 2 seconds
            this.player.health -= 1;
            
            // modify the health bar
            this.healthbar.displayWidth = this.healthbar.width * this.player.health / this.fullHealth;

            this.toggleInvincible();
            // Add an delayed event that makes the player vulnerable after 2 seconds
            this.time.delayedCall(2000, this.toggleInvincible, [], this);
        }
    },

    toggleInvincible : function() {
        this.player.invincible = !this.player.invincible;
        if (this.player.invincible) {
            this.physics.world.removeCollider(this.playerCollider);
        }
        else {
            this.playerCollider = this.physics.add.collider(this.player, this.bigBubbles, this.collideBubble, null, this);
        }
    },

    mortal : function() {
        alert("2 secs passed");
        this.player.invincible = !this.player.invincible;
    },

    collideBullet: function(bubble, bullet){
        var x = bubble.x;
        var y = bubble.y;
        bubble.destroy();
        bullet.destroy();
    }
}