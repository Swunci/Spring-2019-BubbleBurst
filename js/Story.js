var BubbleBurst = BubbleBurst || {};

BubbleBurst.Story = function(){};

BubbleBurst.Story.prototype = {
    create:function(){
        // Styling
        this.game.scene.backgroundColor = "#0f0";
        var style = { font: "bold 32px Arial", fill: "#fff", align: 'center'};
        var style2 = {fill:'#0f0', fontSize:'50px', align:'center'};

        // Story text
        text = this.add.text(window.innerWidth/2, window.innerHeight/2, 
                `Our main character, Toxic, is a mad scientist who has recently been experimenting
                \nwith some new chemicals that he had created from previous experiments. These new 
                \nchemicals he created were very deadly, but he was not satisfied with them, so he
                \nwanted to create an even more toxic solution.In the middle of his experiment, he
                \naccidently broke a sealed container of the solution and got the solution all over
                \nthe floor.He went to get some cleaning equipment from the closet and while he was
                \nlooking through the closet, the solution started bubbling and huge bubbles started
                \nto form from the solution. By the time, Toxic took out the equipment, his whole
                \nlab had been filled with these strange green bubbles. He grabs his water gun from
                \nthe closet and loads it up with a liquid that he had previously prepared to neutralize 
                \nthe toxic solution.`, style).setOrigin(0.5);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2).setOrigin(0.5);

        // Back Button
        this.backButton = this.add.text(window.innerWidth/2, window.innerHeight-50, 'Back', style2)
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => this.scene.start('MainMenu'));
    }
};