game.PlayScreen = game.PlayScreenAbstract.extend({
    init: function () {
        this.parent(true);
    },

    onResetEvent: function (level) {
        this.parent(level);
    },
});

game.TitleScreen = me.ScreenObject.extend({
    init: function () {
        this.parent();
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("menuMap");
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
        //me.audio.play("cling");
    },
});

game.loadStates = function () {
    me.state.set(me.state.GAMEOVER, new game.GameOver());
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.set(me.state.LEVELSELECT, new game.LevelSelect());
    me.state.set(me.state.SETTINGS, new game.Settings());

}