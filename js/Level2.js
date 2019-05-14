var BubbleBurst = BubbleBurst || {};

BubbleBurst.Level2 = function(){};




BubbleBurst.Level2.prototype = {
    create: function(){
        this.physics.world.setBounds(0, 0, 1536 * 2, 1536*2);
        this.cameras.main.setBounds(0, 0, 1536 * 2, 1536*2);
        //this.cameras.main.setZoom(.95);
        
        

        this.map2 = this.make.tilemap({key : 'test'});
        var tiles2 = this.map2.addTilesetImage('tiles2', 'tiles');
        this.floor = this.map2.createStaticLayer('floor', tiles2);
        this.wall = this.map2.createStaticLayer('wall', tiles2);
        
        this.map2.setCollisionBetween(1, 1000, true, 'wall');

        this.player = this.physics.add.sprite(300, 300, 'player_16');
        this.player.setCollideWorldBounds(true);
    }
}