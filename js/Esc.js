var BubbleBurst = BubbleBurst || {};

BubbleBurst.Esc = function(){};

BubbleBurst.Esc.prototype = {
    create:function(){
        // controls button
        this.controlsButton = this.add.text(window.innerWidth/2, window.innerHeight/10 * 2, 'Controls', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.controls())

        // main menu Button
        this.mainMenuButton = this.add.text(window.innerWidth/2, window.innerHeight/10 * 5 , 'Main Menu', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.mainMenu())

        // back button
        this.backButton = this.add.text(window.innerWidth/2, window.innerHeight/10 * 7, 'Back', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.back())
    },
    controls: function(){
        
        var style = { font: "bold 32px Arial", fill: "#fff", align: 'center'};
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 3, 'Controls', { font: "bold 64px Arial", fill: "#fff", align: 'center'}).setOrigin(0.5);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 4, 'UP Arrow Key    - Move up', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 5, 'Left Arrow Key  - Move left', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 6, 'Down Arrow Key  - Move down', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 7, 'Right Arrow Key - Move right', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 8, 'W - Shoot up', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 9, 'A - Shoot left', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 10, 'S - Shoot down', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, window.innerHeight/15 * 11, 'D - Shoot right', style).setOrigin(0.5);

        this.controlsButton.destroy();
        this.mainMenuButton.destroy();
        this.backButton.destroy();
        // Back Button
        this.backButton = this.add.text(window.innerWidth/2, window.innerHeight/15 * 12 , 'Back', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.scene.restart())
    },
    mainMenu: function(){
        this.scene.stop('Game');
        this.scene.start('MainMenu');
    },
    back:function(){
        this.game.scene.resume('Game');
        
        this.scene.stop();
    }
};