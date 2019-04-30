var BubbleBurst = BubbleBurst || {};

BubbleBurst.Controls = function(){};

BubbleBurst.Controls.prototype = {
    create:function(){
        // Styling
        // TODO
        // backgrond color doesn't change anything
        // maybe add background picture instead
        this.game.scene.backgroundColor = "#fff";
        var style = { font: "bold 32px Arial", fill: "#fff", align: 'center'};

        // Controls Text
        text = this.add.text(window.innerWidth/2, 300, 'Controls', { font: "bold 64px Arial", fill: "#fff", align: 'center'}).setOrigin(0.5);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text = this.add.text(window.innerWidth/2, 400, 'UP Arrow Key    - Move up', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 500, 'Left Arrow Key  - Move left', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 600, 'Down Arrow Key  - Move down', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 700, 'Right Arrow Key - Move right', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 800, 'W - Shoot up', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 900, 'A - Shoot left', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 1000, 'S - Shoot down', style).setOrigin(0.5);
        text = this.add.text(window.innerWidth/2, 1100, 'D - Shoot right', style).setOrigin(0.5);

        // Back Button
        this.backButton = this.add.text(window.innerWidth/2, 1200, 'Back', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.scene.start('MainMenu'))
    }
};