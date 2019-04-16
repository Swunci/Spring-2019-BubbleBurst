var BubbleBurst = BubbleBurst || {};

BubbleBurst.Controls = function(){};

BubbleBurst.Controls.prototype = {
    create: function(){
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "phaser 2.4 text bounds", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    
        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 100, 800, 100);
    },
}