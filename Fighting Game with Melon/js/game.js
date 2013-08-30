var game = {
    // Run on page load.
    "onload": function () {
        // Initialize the video.
        this.screenWidth = 1024;
        var aspectRatio = window.screen.width / window.screen.height;
        this.screenHeight = this.screenWidth / aspectRatio;
        if (!me.video.init("screen", this.screenWidth, this.screenHeight, true, 'auto')) {
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        // Initialize the audio.
        me.audio.init("mp3");
        
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        //me.state.change(me.state.LOADING);
        game.loadEntities();
        game.loadStates();
    },

    // Run on game resources loaded.
    "loaded": function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.change(me.state.MENU);
        me.debug.renderHitBox = true;
    }
};

/************
 * Screens
 *
 ***********/

