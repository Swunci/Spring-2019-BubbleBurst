var BubbleBurst = BubbleBurst || {};

BubbleBurst.MainMenu = function(){};

BubbleBurst.MainMenu.prototype = {
    preload:function(){
        // set the background color
        this.game.scene.backgroundColor = "#000";

        // load game logo 
        this.gamelogo = this.add.image(window.innerWidth/2, window.innerHeight/2,'gamelogo');

        // button style
        styles = {fill:'#0f0', fontSize:'25px', align:'center'};

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
        this.scene.start('Game');
    },
    strarLevel2: function(){

    },
    startLevel3: function(){

    },
    showControls: function(){
        this.startButton.destroy();
        this.controlsButton.destroy();
        this.backgroundStoryButton.destroy();

        this.w = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3, 'UP: W', styles)
        .setInteractive()
        .setOrigin(0.5)
      //  .on('pointerdown', () => this.startLevel1())

        this.s = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 50, 'DOWN: S', styles)
        .setInteractive()
        .setOrigin(0.5)
      //  .on('pointerdown', () => this.startLevel1())

        this.d = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 100, 'RIGHT: D', styles)
        .setInteractive()
        .setOrigin(0.5)
      //  .on('pointerdown', () => this.startLevel1())

        this.a = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 150, 'LEFT: A', styles)
        .setInteractive()
        .setOrigin(0.5)
     //   .on('pointerdown', () => this.startLevel1())

        this.controlBackButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 200, 'Back', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.controlBack())

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

        this.backStory1 = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 10, 'Our main character, Toxic, is a mad scientist who has recently been experimenting with some new chemicals that he had created from previous experiments. These new chemicals he created were very deadly,', paragraph)
        .setOrigin(0.5)
        // this.backStory.wordWrap = true;
        // this.backStory.wordWrapWidth = window.innerWidth -50;

        this.backStory2 = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 50, 'but he was not satisfied with them, so he wanted to create an even more toxic solution. In the middle of his experiment, he accidently broke a sealed container of the solution and got the solution all over the floor.', paragraph)
        .setOrigin(0.5)

        this.backStory3 = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 90, 'He went to get some cleaning equipment from the closet and while he was looking through the closet, the solution started bubbling and huge bubbles started to form from the solution. By the time, Toxic took out the equipment, ', paragraph)
        .setOrigin(0.5)
        this.backStory4 = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 130, 'his whole lab had been filled with these strange green bubbles. He grabs his water gun from the closet and loads it up with a liquid that he had previously prepared to neutralize the toxic solution. ', paragraph)
        .setOrigin(0.5)

        this.backStory5 = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 170, 'He notices that the laboratory is also filled with some sort of toxic gas that is impairing his motor skills.', paragraph)
        .setOrigin(0.5)

        this.storyBackButton = this.add.text(window.innerWidth/2, window.innerHeight/4 * 3 + 200, 'Back', styles)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.storyBack())
        
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
