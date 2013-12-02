game.TopDownPlayerEntity = game.MainPlayer.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.gravity = 0;
        this.setVelocity(3, 3);
        this.bindKey("up", "up");
        this.bindKey("down", "down");
        this.bindKey("left", "left");
        this.bindKey("right", "right");
        //this.light = new game.DynamicLight(x, y, []);
        //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    update: function () {
        if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('up')) {
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }

        var collisionLayer = me.game.currentLevel.getLayerByName("collision");
        var x = (this.vel.x < 0) ? ~~(this.collisionBox.left + this.vel.x) : Math.ceil(this.collisionBox.right - 1 + this.vel.x);
        var y = ~~this.collisionBox.top + collisionLayer.tileheight * me.sys.scale.y;
        var xtile = collisionLayer.getTile(x, y);
        if (xtile && xtile.tileId == 197) {
            this.vel.x = 0;
        }
        this.parent();
        //this.light.update(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    },

    draw: function (context) {
        //this.light.draw(context);
        this.parent(context);
    }
});