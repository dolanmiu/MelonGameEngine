game.TitleScreen = me.ScreenObject.extend({
    init: function () {
        this.parent();
    },

    onResetEvent: function () {
        me.levelDirector.loadLevel("menuMap");
    },
});



game.loadStates = function () {
}