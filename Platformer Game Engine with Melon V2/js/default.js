(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();

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
        //me.debug.displayFPS;
        //me.debug.renderHitBox = true;
        game.playerPos = new me.Vector2d(0, 0);
    }
};
