var BubbleBurst = BubbleBurst || {};

BubbleBurst.Game = function(){};


BubbleBurst.Game.prototype = {
    create: function(){
        //this.map = this.make.tilemap({ key: 'level1' });
        this.physics.world.setBounds(0,0, window.innerWidth, window.innerHeight);
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.health = 100;

        this.bubbles_1 = this.physics.add.group({
            key: 'bubble1',
            repeat: 15,
            setXY: {x:Phaser.Math.Between(0, window.innerWidth), y:Phaser.Math.Between(0, window.innerHeight)}
        });
        
        this.bubbles_1.children.iterate(function (child) {
            child.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
            child.setBounce(1).setCollideWorldBounds(true);
        });
        var i;
        this.physics.add.collider(this.player, this.bubbles_1, this.collideBubble, null, this);

    },
    update: function(){
        cursors = this.input.keyboard.createCursorKeys();
        
        if (cursors.left.isDown){
            this.player.setVelocityX(-100);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(100);
        }
        else{
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown){
            this.player.setVelocityY(-100);
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(100);
        }
        else{
            this.player.setVelocityY(0);
        }
        
    },
    collideBubble: function(player, bubble){
        this.player.health -= 1;
        window.alert("player's health:" + this.player.health);
    }
}