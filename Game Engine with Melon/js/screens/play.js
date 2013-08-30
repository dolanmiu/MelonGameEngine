game.PlayScreen = game.PlayScreenAbstract.extend({
    init: function () {
        this.parent(true);
    },

    onResetEvent: function (level) {
        this.parent(level);
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.ESC, "pause", true);

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
    },

    onResetEvent: function () {
        me.game.disableHUD();
        me.levelDirector.loadLevel("levelSelectMap");
    },

    draw: function (context) {
        this.parent(context);
    }
});

game.Settings = me.ScreenObject.extend({
    init: function () {
        this.parent(this);
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("settingsMap");
    },
});

game.GameOver = game.GameOverAbstract.extend({
    onResetEvent: function () {
        this.parent();
        me.audio.play("cling");
    },
});