(function () {
    var LoadingScreenFix = me.plugin.base.extend({
        version: "0.9.5",
        init: function () {
            this.patch(me.DefaultLoadingScreen, "onResetEvent", function () {
                this.logo1 = new me.Font('century gothic', 32, 'white', 'middle');
                this.logo2 = new me.Font('bold century gothic', 32, '#89b002', 'middle');
                this.loadPercent = 0;
                this.parent();
            });
        }
    });

    me.plugin.register(LoadingScreenFix, "LoadingScreenFix");
})();