/**
 * @fileOverview Library to make fighter games
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Default Fightng pawn for players
 * @constructor
 * @extends MainPlayer
 */
game.FighterPawn = game.MainPlayer.extend({
    /**
     * Initialises the object
     * @param {integer} x The x location of the object.
     * @param {integer} y The  y location of the object.
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(300, 300);
        this.collidable = true;
        if (!settings.left) {
            settings.left = "left";
        }

        if (!settings.right) {
            settings.right = "right";
        }

        if (!settings.jump) {
            settings.jump = "up";
        }

        if (!settings.attack) {
            settings.attack1 = "m";
        }

        this.bindKey(settings.left, "left");
        this.bindKey(settings.right, "right");
        this.bindKey(settings.jump, "jump");
        this.bindKey(settings.attack, "attack", true);
        /** @type {integer} */
        this.percentageDamage = 0;
        /** @type {boolean} */
        this.isAttacking = false;
        /** @type {boolean} */
        this.disabled = false;
        /** @type {float} */
        this.disableTimer = me.timer.getTime();
        /** @type {float} */
        this.timeSnap = me.timer.getTime();
        /** @type {integer} */
        this.currentLives = this.maxLives;
    },

    /**
     * Updates the object evey tick
     * @return {void}
     */
    update: function () {
        if (this.checkKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x = -7 * me.timer.tick;
        } else if (this.checkKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x = 7 * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (this.checkKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value, gravity will then do the rest
                this.vel.y = -25 * me.timer.tick;
                this.jumping = true;
            }
        }

        if (this.checkKeyPressed('attack')) {
            this.isAttacking = true;
            this.timeSnap = me.timer.getTime();
        }

        this.checkTimes();

        if (this.disabled) {
            if (this.flyHitDirection) {
                this.vel.x -= (this.percentageDamage / 100) * me.timer.tick;
            } else {
                this.vel.x += (this.percentageDamage / 100) * me.timer.tick;
            }
        }

        if (this.pos.y > 1000) {
            this.pos.x = 1500;
            this.pos.y = 200;
            this.vel.y = 0;
            this.currentLives--;
            if (this.currentLives == 0) {
                me.state.change(me.state.GAMEOVER);
            }
        }

        var res = me.game.collide(this);
        if (res) {
            switch (res.obj.type) {

                case "mainPlayer": {
                    if (!this.isAttacking && !res.obj.isAttacking) {
                        break;
                    }
                    if (!this.isAttacking) {
                        this.disabled = true;
                        this.disableTimer = me.timer.getTime();
                        this.flyHitDirection = res.obj.lastflipX;
                        this.hurt();
                    }
                    break;
                }

                case "finishLine": {
                    me.state.change(me.state.LEVELSELECT);
                }
                default: break;
            }
        }

        this.parent();
    },

    /**
     * Checks the if disable and attacking times need to be reset. Resets if need to.
     */
    checkTimes: function () {
        if (me.timer.getTime() > this.timeSnap + 1) {
            this.isAttacking = false;
        }

        if (me.timer.getTime() > this.disableTimer + 500) {
            this.disabled = false;
        }
    },

    /**
     * Inflict damage upon the player
     * @return {void}
     */
    hurt: function () {
        this.percentageDamage += 100;
        this.vel.y -= (this.percentageDamage / 100) * me.timer.tick;
    },
});