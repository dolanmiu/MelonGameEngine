game.PlayScreen = me.ScreenObject.extend({
	init: function () {
			this.parent(true);
	},

	onResetEvent: function (level) {
			this.parent(level);
	},

	onResetEvent: function () {
			me.levelDirector.loadLevel(this.level);
	},
});

game.TitleScreen = me.ScreenObject.extend({
	init: function () {
			this.parent();
			this.scrollerfont = new me.BitmapFont("atascii", { x: 24 });
			this.scrollertween = null;
			
			this.scroller = "A COOL DEMO BY DOLAN       ";
			this.scrollerpos = 600;
	},

	onResetEvent: function () {
			me.levelDirector.loadLevel(menuMap);
			this.parent();
			this.scrollerpos = 640;
			this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
			//me.audio.playTrack("titleMusic");
	},
});

game.LevelSelect = me.ScreenObject.extend({
	init: function () {
			this.parent(this);
	},

	onResetEvent: function () {
			me.game.disableHUD();
			me.levelDirector.loadLevel(levelSelectMap);
	},
});

game.Settings = me.ScreenObject.extend({
	init: function () {
			this.parent(this);
	},

	onResetEvent: function () {
			me.levelDirector.loadLevel("settingsMap");
	},
});

game.GameOver = me.ScreenObject.extend({
	onResetEvent: function () {
			this.parent();
			//me.audio.play("cling");
	},
});

game.NewScreen = me.ScreenObject.extend({
	onResetEvent: function () {
			me.levelDirector.loadLevel();
	},
});

game.NewScreen = me.ScreenObject.extend({});

game.NewScreen = me.ScreenObject.extend({});

game.NewScreen = me.ScreenObject.extend({});

game.NewScreen = me.ScreenObject.extend({});

game.loadStates = function () {
	me.state.set(me.state.PLAY, new game.PlayScreen());

	me.state.set(me.state.GAMEOVER, new game.GameOver());

}
