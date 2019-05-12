var BubbleBurst = BubbleBurst || {};

BubbleBurst.Win = function(){};

BubbleBurst.Win.prototype = {
    create : function() {
        // Styling
        this.game.scene.backgroundColor = "#0f0";
        var style = { font: "bold 70px Arial", fill: "#fff", align: 'center'};
        text = this.add.text(window.innerWidth/2, window.innerHeight/2, 'Winner Winner Chicken Dinner', style).setOrigin(0.5);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2).setOrigin(0.5);

        this.mainMenuButton = this.add.text(window.innerWidth/2, window.innerHeight/(3/2) , 'Main Menu', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.mainMenu())
    },

    mainMenu: function() {
        this.scene.stop('Game');
        this.scene.start('MainMenu');
    },
}