game.FighterPawn = game.MainPlayer.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(3, 30);
        this.gravity = 10;
        if (!settings.left) {
            settings.left = "left";
        }

        if (!settings.right) {
            settings.right = "right";
        }

        if (!settings.jump) {
            settings.jump = "up";
        }

        if (!settings.attack1) {
            settings.attack1 = "m";
        }

        this.bindKey(settings.left, "left");
        this.bindKey(settings.right, "right");
        this.bindKey(settings.jump, "jump");
        this.bindKey(settings.attack1, "attack");
    },

    update: function () {
        if (this.checkKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick * 35 / me.sys.fps;
        } else if (this.checkKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick * 35 / me.sys.fps;
        } else {
            this.vel.x = 0;
        }
        if (this.checkKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value, gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                this.jumping = true;
            }
        }
        this.parent();
    },
});