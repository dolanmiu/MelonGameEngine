/* the in game stuff*/
game.PlayScreenAbstract = me.ScreenObject.extend({

    onResetEvent: function (level) {
        if (this.level == null) {
            this.level = level;
        }
        me.levelDirector.loadLevel(this.level);
    },
});

game.GameOverAbstract = me.ScreenObject.extend({
    onResetEvent: function () {
        me.game.disableHUD();
    },
});