/* the in game stuff*/
game.PlayScreen = me.ScreenObject.extend({

    init: function () {
        this.parent(true);
        me.entityPool.add("CoinEntity", game.CoinEntity);
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("SlimeEntity", game.SlimeEnemyEntity);
        me.entityPool.add("FlyEntity", game.FlyEntity);
        me.entityPool.add("exclaimBox", game.ExclaimBox);
        me.entityPool.add("water", game.Water);
        me.entityPool.add("finishLine", game.FloatingFinish);
        me.entityPool.add("fire", game.FireEmitter);
    },

    onResetEvent: function (level) {
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.ESC, "pause", true);
        me.state.set(me.state.GAMEOVER, new game.GameOver());

        // stuff to reset on state change
        // load a level
        me.levelDirector.loadLevel(level);
        // add HUD items
        me.game.addHUD(0, 0, game.screenWidth, game.screenHeight);
        me.game.HUD.addItem("score", new game.ScoreObject(200, 10));
        me.game.HUD.addItem("lives", new game.LifeObject(0, 10));
        this.pauseGUI = new game.PauseGUI();
        me.game.HUD.addItem("pause", this.pauseGUI);
        //this.levelFinishGUI = new game.LevelFinishGUI();
        //me.game.HUD.addItem("levelFinishGUI", this.levelFinishGUI);

        // play some music
        me.audio.stopTrack();
        me.audio.playTrack("forestMusic");
    },

    update: function () {
        this.paused = false;
        if (me.input.isKeyPressed('pause')) {
            me.state.pause();
            this.paused = true;
            var resume_loop = setInterval(function check_resume() {
                if (me.input.isKeyPressed('pause')) {
                    clearInterval(resume_loop);
                    me.state.resume();
                }
            }, 100);
        }
        return true;
    },

    draw: function (context) {
        if (this.paused) {
            this.pauseGUI.show(context);
            //var background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            //context.drawImage(background.canvas, 0, 0);
            // Render the main frameBuffer
            me.video.blitSurface();
        }
    },
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.X);
        me.input.unbindKey(me.input.KEY.ESC);
    }

});

game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function () {
        me.state.set(me.state.LEVELSELECT, new game.LevelSelect());
        me.state.set(me.state.SETTINGS, new game.Settings());

        this.parent(true);

        // title screen image
        this.title = null;

        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;

        this.scroller = "A COOL GAME BY DOLAN       ";
        this.scrollerpos = 600;
        me.entityPool.add("background", game.BackgroundImage);
        me.entityPool.add("playButton", game.PlayButton);
        me.entityPool.add("settingsButton", game.SettingsButton);
        me.entityPool.add("mainLogo", game.BobbingLogo);
        me.entityPool.add("audio", game.AudioToggleButton);
    },

    // reset function
    onResetEvent: function () {
        me.levelDirector.loadLevel("menuMap");
        if (this.title == null) {
            //this.title = me.loader.getImage("menuBackground");
            //this.title.style.width = '100%'
            // font to display the menu items
            this.font = new me.BitmapFont("atascii", { x: 24 });

            // set the scroller
            this.scrollerfont = new me.BitmapFont("atascii", { x: 24 });

        }

        this.scrollerpos = 640;
        this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.audio.playTrack("titleMusic");
    },

    scrollover: function () {
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    update: function () {
        if (me.input.isKeyPressed('enter')) {
            //me.state.change(me.state.LEVELSELECT);
        }
        return true;
    },

    draw: function (context) {
        //me.video.clearSurface(context, 'black');
        //context.drawImage(this.title, 0, 0);

        this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
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

game.LevelSelect = me.ScreenObject.extend({

    init: function () {
        this.parent(this);
        this.levelButtonName = "levelButton";
        me.entityPool.add(this.levelButtonName, game.LevelButton);
        //this.addAsObject = true;
    },

    onResetEvent: function () {
        me.game.disableHUD();
        me.levelDirector.loadLevel("levelSelectMap");
        var buttonList = this.findButtons(this.levelButtonName);
        this.sortButtons(buttonList);
    },

    findButtons: function (buttonName) {
        var buttonList = [];
        var objectGroups = me.game.currentLevel.objectGroups;
        for (var i = 0; i < objectGroups.length; i++) {
            var objectsInGroup = objectGroups[i].objects;
            for (var j = 0; j < objectsInGroup.length; j++) {
                var object = objectsInGroup[j];
                if (object.name == buttonName) {
                    buttonList.push(object);
                }
            }
        }
        return buttonList;
    },

    sortButtons: function(buttonList) {
        buttonList[0].x = game.screenWidth;
        me.game.sort();
    },

    draw: function (context) {
        this.parent(context);
    }
});

game.Settings = me.ScreenObject.extend({

    init: function () {
        this.parent(this);
        //me.entityPool.add("background", game.BackgroundImage);
        me.entityPool.add("slider", game.SoundSlider);
        me.entityPool.add("audioToggleButton", game.AudioToggleButton);
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("settingsMap");
    },

    update: function () {

    },
});

game.GameOver = me.ScreenObject.extend({

    init: function () {
        this.parent(true);
        this.font = null;
    },

    onResetEvent: function () {
        if (this.font == null) {
            this.font = new me.BitmapFont("atascii", { x: 24 });
        }
        me.game.disableHUD();
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        me.audio.play("cling");
    },

    update: function () {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
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