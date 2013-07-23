game.PlayScreen = game.PlayScreenAbstract.extend({

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
        this.parent(level);
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.ESC, "pause", true);
        me.state.set(me.state.GAMEOVER, new game.GameOver());

        me.levelDirector.loadLevel(this.level);
        me.game.HUD.addItem("score", new game.ScoreObject(200, 10));
        me.game.HUD.addItem("lives", new game.LifeObject(0, 10));
        me.audio.stopTrack();
        me.audio.playTrack("forestMusic");
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.X);
        me.input.unbindKey(me.input.KEY.ESC);
    }
});

game.TitleScreen = game.TitleScreenAbstract.extend({

    init: function () {
        this.parent();
        this.scrollerfont = new me.BitmapFont("atascii", { x: 24 });
        this.scrollertween = null;

        this.scroller = "A COOL DEMO BY DOLAN       ";
        this.scrollerpos = 600;
        me.entityPool.add("background", game.BackgroundImage);
        me.entityPool.add("playButton", game.PlayButton);
        me.entityPool.add("settingsButton", game.SettingsButton);
        me.entityPool.add("mainLogo", game.BobbingLogo);
        me.entityPool.add("audio", game.AudioToggleButton);
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("menuMap");
        this.parent();
        this.scrollerpos = 640;
        this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
        me.audio.playTrack("titleMusic");
    },
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

game.GameOver = game.GameOverAbstract.extend({
    onResetEvent: function () {
        this.parent();
        me.audio.play("cling");
    },
});