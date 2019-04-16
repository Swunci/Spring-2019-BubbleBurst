var BubbleBurst = BubbleBurst || {};

BubbleBurst.Game = function(){};


BubbleBurst.Game.prototype = {
    create: function(){
        //this.map = this.make.tilemap({ key: 'level1' });
        this.physics.world.setBounds(0,0, window.innerWidth, window.innerHeight);
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.health = 100;
        
        this.player.invincible = false;

        this.bubbles_1 = this.physics.add.group({
            key: 'bubble1',
            repeat: 15,
            setXY: {x:Phaser.Math.Between(0, window.innerWidth), y:Phaser.Math.Between(0, window.innerHeight)}
        });

        
        this.bubbles_1.children.iterate(function (child) {
            child.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
            child.setBounce(1).setCollideWorldBounds(true);
            child.setCircle(64, 0, 0);
        });
        var i;
        this.physics.add.collider(this.player, this.bubbles_1, this.collideBubble, null, this);

    },
    update: function(){
        cursors = this.input.keyboard.createCursorKeys();
        
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

    // Instead of making the player and bubbles collide, we should instead check if the player is overlapping with any bubbles
    // Because when the collisions happen the bubbles no longer are moving in the intercardinal directions
    collideBubble: function(player, bubble){
        if (this.player.invincible === false) {
            // If player is not invincible, do damage and make him invincible for 2 seconds
            this.player.health -= 1;
            window.alert("player's health:" + this.player.health);
            this.toggleInvincible();
            // Add an delayed event that makes the player vulnerable after 2 seconds
            // Code below doesn't work for some reason fix later
            //this.game.time.events.add(2000, this.toggleInvincible(), this);
        }
        // For now, touching bubbles will pop them
        bubble.destroy()
    },
    toggleInvincible: function() {    
        this.player.invincible = !this.player.invincible;}
}