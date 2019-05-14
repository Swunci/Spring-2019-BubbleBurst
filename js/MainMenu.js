var BubbleBurst = BubbleBurst || {};

BubbleBurst.MainMenu = function(){};

BubbleBurst.MainMenu.prototype = {
    preload:function(){
        // set the background color
        this.game.scene.backgroundColor = "#000";

        // load game logo 
        this.gamelogo = this.add.image(window.innerWidth/2, window.innerHeight/2,'gamelogo');

        // button style
        styles = {fill:'#0f0', fontSize:'50px', align:'center'};

        paragraph = {fill:'#0f0', fontSize:'15px', align:'center'};
    },
    create: function(){
        // add start button
        this.startButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3, 'Start', styles)
        .setInteractive()
        .setOrigin(0.5)
        // add controls button
        this.controlsButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 75, 'Controls', styles)
        .setInteractive()
        .setOrigin(0.5)
        // background story button
        this.backgroundStoryButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 150, 'Background Story', styles)
        .setInteractive()
        .setOrigin(0.5)

        this.startButton.on('pointerdown', () => this.start());
        this.controlsButton.on('pointerdown', () => this.showControls());
        this.backgroundStoryButton.on('pointerdown', () => this.showStory());
    },
    start: function(){
        this.startButton.destroy();
        this.controlsButton.destroy();
        this.backgroundStoryButton.destroy();

        this.level1Button = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3, 'Level 1', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.startLevel1())
        this.level2Button = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 50, 'Level 2', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.startLevel2())
        this.level3Button = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 100, 'Level 3', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.startLevel3())

        this.quitButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 150, 'Quit', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.quitChoosing())


    },

    quitChoosing: function(){
        this.level1Button.destroy();
        this.level2Button.destroy();
        this.level3Button.destroy();
        this.quitButton.destroy();
        this.create();

    },

    startLevel1: function(){
        this.scene.start('Game', 1);
    },

    startLevel2: function(){
        this.scene.start('Game', 2);
    },

    startLevel3: function(){
        this.scene.start('Game', 3);
    },

    showControls: function(){
        this.startButton.destroy();
        this.controlsButton.destroy();
        this.backgroundStoryButton.destroy();
        this.scene.start('Controls');
    },

    controlBack: function(){
        this.w.destroy();
        this.a.destroy();
        this.s.destroy();
        this.d.destroy();
        this.controlBackButton.destroy();
        this.create();
    },

    showStory: function(){
        this.startButton.destroy();
        this.controlsButton.destroy();
        this.backgroundStoryButton.destroy();
        this.scene.start('Story');  
    },

    storyBack: function(){
        this.backStory1.destroy();
        this.backStory2.destroy();
        this.backStory3.destroy();
        this.backStory4.destroy();
        this.backStory5.destroy();
        this.storyBackButton.destroy();
        this.create();
    },

}
