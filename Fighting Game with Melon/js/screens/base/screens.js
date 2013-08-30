/* the in game stuff*/
game.PlayScreenAbstract = me.ScreenObject.extend({

    onResetEvent: function (level) {
        if (this.level == null) {
            this.level = level;
        }
        me.state.set(me.state.GAMEOVER, new game.GameOver());
        // load a level
        me.levelDirector.loadLevel(this.level);
        // add HUD items
        //me.game.addHUD(0, 0, game.screenWidth, game.screenHeight);
        //this.levelFinishGUI = new game.LevelFinishGUI();
        //me.game.HUD.addItem("levelFinishGUI", this.levelFinishGUI);
    },
});

game.TitleScreenAbstract = me.ScreenObject.extend({
    // constructor
    init: function () {
        me.state.set(me.state.LEVELSELECT, new game.LevelSelect());
        me.state.set(me.state.SETTINGS, new game.Settings());

        this.parent(true);

        // title screen image
        this.title = null;

        this.font = new me.BitmapFont("atascii", { x: 24 });
    },

    // reset function
    onResetEvent: function () {
        if (this.title == null) {
            //this.title = me.loader.getImage("menuBackground");
            //this.title.style.width = '100%'
        }
       
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    scrollover: function () {
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    update: function () {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.LEVELSELECT);
        }
        return true;
    },

    draw: function (context) {
        //me.video.clearSurface(context, 'black');
        //context.drawImage(this.title, 0, 0);

        this.font.draw(context, "", 20, 240);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
        this.parent(context);
    },

    // destroy function
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);

        //just in case
        this.scrollertween.stop();
    }

});

game.GameOverAbstract = me.ScreenObject.extend({

    init: function () {
        this.parent(true);
        this.font = new me.BitmapFont("atascii", { x: 24 });
    },

    onResetEvent: function () {
        me.game.disableHUD();
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    update: function () {
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
    },

    draw: function (context) {
        this.parent(context);
        me.video.clearSurface(context, 'black');
        var text = "GAME OVER";
        var size = this.font.measureText(context, text);
        this.font.draw(context, text, game.screenWidth / 2 - (size.width / 2), game.screenHeight / 2 - (size.height / 2));
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});