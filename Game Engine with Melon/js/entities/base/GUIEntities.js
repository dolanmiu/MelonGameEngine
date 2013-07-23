game.Button = me.GUI_Object.extend({

    init: function (x, y, settings) {
        this.colour = settings.colour;
        settings.spritewidth = settings.width;
        settings.spriteheight = settings.height;
        this.font = new me.BitmapFont("atascii", { x: 24 });
        this.text = settings.text;
        this.parent(x, y, settings);
        this.centreX = settings.centreX;
        this.centreY = settings.centreY
    },

    move: function() {
        var v = d;
    },

    draw: function (context, x, y) {
        var size = this.font.measureText(context, this.text);
        var trueSize = this.font.measureText(context, this.text);
        context.fillStyle = this.colour;

        if (this.width > size.width) {
            size.width = this.width;
        }

        if (this.height > size.height) {
            size.height = this.height;
        }

        this.width = size.width;
        this.height = size.height;

        if (this.centreX == true) {
            this.pos.x = game.screenWidth / 2 - size.width / 2;
        }

        if (this.centreY == true) {
            this.pos.y = game.screenHeight / 2 - size.height / 2;
        }

        context.fillRect(this.pos.x, this.pos.y, size.width, size.height);
        this.font.draw(context, this.text, this.pos.x + size.width / 2 - trueSize.width / 2, this.pos.y + size.height / 2 - trueSize.height / 2);
    },
});

game.Sprite = me.SpriteObject.extend({
    init: function (x, y, settings) {
        this.image = me.loader.getImage(settings.image);
        this.parent(x, y, this.image);
    },
});

game.BackgroundImage = game.Sprite.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var scaleFactor;
        if (this.image.width > this.image.height) {
            scaleFactor = game.screenWidth / this.image.width;
        } else {
            scaleFactor = game.screenWidth / this.image.height;
        }
        this.pos.x = (game.screenWidth / 2) - (this.image.width / 2);
        this.pos.y = (game.screenHeight / 2) - (this.image.height / 2);
        this.resize(scaleFactor);
    },
});

game.NormalLogo = game.Sprite.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var scaleFactor = (game.screenWidth / 3) / this.image.width;
        this.pos.x = (game.screenWidth / 2) - (this.image.width / 2);
        this.resize(scaleFactor);
        this.anchorPoint.set(0.5, 0);
    },
});

game.BobbingLogo = game.NormalLogo.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.boxBounceUp();
        this.startY = y;
    },

    boxBounceUp: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y - 5 }, 2000).onComplete(this.boxBounceDown.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    },

    boxBounceDown: function () {
        var tween = new me.Tween(this.pos).to({ y: this.startY }, 2000).onComplete(this.boxBounceUp.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    }
});

game.PlayButton = game.Button.extend({

    onClick: function () {
        me.state.change(me.state.LEVELSELECT);
    },
});

game.SettingsButton = game.Button.extend({

    onClick: function () {
        me.state.change(me.state.SETTINGS);
    },
});

game.AudioToggleButton = game.Button.extend({

    init: function (x, y, settings) {
        settings.text = "MUTE";
        this.parent(x, y, settings);
        this.muted = false;
    },

    onClick: function () {
        if (this.muted) {
            me.audio.unmuteAll();
            this.muted = false;
            this.text = "MUTE";
        } else {
            me.audio.muteAll();
            this.muted = true;
            this.text = "UNMUTE";
        }
    },
});

game.LevelButton = game.Button.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.level = settings.level;
        this.text = settings.level.toUpperCase();
    },

    onClick: function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.change(me.state.PLAY, this.level);
    },
});

game.HUDText = me.HUD_Item.extend({
    init: function (x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("atascii", { x: 24 });
        this.font.set("right", 1.6);
    },
});

/** 
 * a GUI object 
 * display score on screen
 */
game.ScoreObject = game.HUDText.extend({
    /** 
	 * constructor
	 */
    init: function (x, y) {
        // call the parent constructor
        this.parent(x, y);
    },

    /**
	 * draw the score
	 */
    draw: function (context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

game.LifeObject = me.HUD_Item.extend({

    init: function (x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("lifeHeart", { x: 99 });
        this.font.set("left", 0.7);
        //this.lifeHeart = new me.SpriteObject(x, y, me.loader.getImage("lifeHeart"));
        //this.lifeHeart.resize((game.screenWidth / 20) / this.lifeHeart.width);
    },

    /**
     * draw the lives
     */
    draw: function (context, x, y) {
        var text;
        for (var i = 0; i < this.value; i++) {
            text += "!";
        }
        context.globalAlpha = 1;
        //this.lifeHeart.draw(context);
        this.font.draw(context, text, this.pos.x, this.pos.y);
    }
});

game.PauseGUI = me.HUD_Item.extend({

    init: function (x, y) {
        this.font = new me.BitmapFont("atascii", { x: 24 });
        var settings = {};
        settings.width = 100;
        settings.height = 50;
        settings.colour = "black";
        settings.text = "LEVEL SELECT";
        this.button = new game.PlayButton(100, game.screenHeight / 3, settings);
        me.game.add(this.button);
        me.game.sort();
        this.parent(x, y);
    },

    show: function (context) {
        var text = "PAUSED";
        var size = this.font.measureText(context, text);
        var coords = me.game.viewport.screenToWorld(game.screenWidth / 2, game.screenHeight / 2);
        this.button.pos.x = coords.x - this.button.width / 2;
        this.button.draw(context);
        this.font.draw(context, text, coords.x - (size.width / 2), coords.y - (size.height / 2));
    }
});

game.LevelFinishGUI = me.HUD_Item.extend({

    init: function () {
        this.font = new me.BitmapFont("atascii", { x: 24 });
        var settings = {};
        settings.width = 100;
        settings.height = 50;
        settings.colour = "black";
        settings.text = "BACK";
        this.backButton = new game.PlayButton(100, game.screenHeight / 3, settings);
        me.game.add(this.backButton);
        me.game.sort();
    },

    show: function (context) {
        // Draw rectangle
        var text = "LEVEL COMPLETE!";
        var size = this.font.measureText(context, text);
        var coords = me.game.viewport.screenToWorld(game.screenWidth / 2, game.screenHeight / 2);
        //context.fillStyle = "rgba(0, 0, 0, 0.8)";
        //context.fillRect(coords.x + 20, coords.y + 20, 500, 500);
        this.backButton.pos.x = coords.x - this.backButton.width / 2;
        this.backButton.draw(context);
        this.font.draw(context, text, coords.x - (size.width / 2), coords.y - (size.height / 2));
    }
});
