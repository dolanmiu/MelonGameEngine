/**
 * @fileOverview Platformer entities
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Platformer Player Entity
 * A player used in platformers
 * @constructor
 * @extends game.MainPlayer
 */
game.PlatformPlayerEntity = game.MainPlayer.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.maxLives = settings.maxLives;
        this.currentLives = this.maxLives;
        this.score = 0;
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(8, 60, -1, 0);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 30);

        this.anchorPoint.set(0.5, 1.0);
        if (settings.left) {
            this.bindKey(settings.left, "left");
        } else {
            this.bindKey("left", "left");
        }
        
        if (settings.jump) {
            this.bindKey(settings.jump, "jump");
        } else {
            this.bindKey("x", "jump");
        }

        if (settings.right) {
            this.bindKey(settings.right, "right");
        } else {
            this.bindKey("right", "right");
        }
    },

    /**
     * Update object
     * @return {void}
     */
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

        // check if we fell into a hole
        if (!this.inViewport && (this.pos.y > me.video.getHeight())) {
            // if yes reset the game
            me.game.remove(this);
            me.game.viewport.fadeIn('#fff', 150, function () {
                me.audio.play("die", false);
                me.levelDirector.reloadLevel();
                me.game.viewport.fadeOut('#fff', 150);
            });
            return true;
        }

        // check for collisions
        var res = me.game.collide(this);

        if (res) {
            switch (res.obj.type) {
                case me.game.ENEMY_OBJECT: {
                    if ((res.y > 0) && this.falling) {
                        this.vel.y -= this.maxVel.y * me.timer.tick;
                    } else {
                        this.hurt();
                    }
                    break;
                }

                case "spikeObject": {
                    this.vel.y -= this.maxVel.y * me.timer.tick;
                    this.hurt();
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
     * This is called to cause damage to the player
     * @return {void}
     */
    hurt: function () {
        if (!this.renderable.flickering) {
            this.renderable.flicker(45);
            // flash the screen
            //me.game.viewport.shake(10, 200, me.game.viewport.AXIS.BOTH);
            //me.game.viewport.fadeIn("#FFFFFF", 75);
            me.audio.play("die", false);
            this.currentLives -= 1;
            if (this.currentLives <= 0) {
                me.game.viewport.fadeIn("#000000", 300, function () {
                    me.state.change(me.state.GAMEOVER);
                });

            }
        }
    }
});

/**
 * A coin collectable
 * @constructor
 * @extends me.CollectableEntity
 */
game.CoinEntity = me.CollectableEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        // add the coin sprite as renderable
        settings.image = "coin";

        // call the parent constructor
        this.parent(x, y, settings);

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        this.updateMovement();
    },

    /**
     * Collision event for the coin
     * @return {void}
     */
    onCollision: function () {
        // do something when collide
        me.audio.play("cling", false);
        // give some score
        //avoid further collision and delete it
        this.collidable = false;
        me.game.remove(this);
    }

});

/**
 * An enemy entity
 * follow a horizontal path defined by the box size in Tiled
 * @constructor
 * @extends me.ObjectEntity
 */
game.PathEnemyEntity = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;


        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
        this.anchorPoint.set(0.5, 1.0);
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    },

    /**
     * Collision event for object
     * @param  {me.Vector2d} res
     * @param  {me.ObjectEntity} obj
     * @return {void}
     */
    onCollision: function (res, obj) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(45, function () { me.game.remove(self) });
            this.collidable = false;
            me.game.remove(this);
            me.audio.play("enemykill", false);
            var player = me.game.getEntityByName("PlatformPlayerEntity");
            player[0].score += 150;
        }
    },
});

/**
 * An enemy entity who can wait for random period of time
 * follow a horizontal path defined by the box size in Tiled
 * @constructor
 * @extends game.PathEnemyEntity
 */
game.PathEnemyWaitEntity = game.PathEnemyEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
        var walkChance = Math.random();
        if (walkChance > 0.96) {
            if (this.alive) {
                if (this.walkLeft && this.pos.x <= this.startX) {
                    this.walkLeft = false;
                } else if (!this.walkLeft && this.pos.x >= this.endX) {
                    this.walkLeft = true;
                }
                // make it walk
                this.flipX(this.walkLeft);
                this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

            } else {
                this.vel.x = 0;
            }
        }
        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;

    }
});

/**
 * An Fly enemy entity
 * follow a horizontal path defined by the box size in Tiled
 * @constructor
 * @extends game.PathEnemyEntity
 */
game.FlyEnemyEntity = game.PathEnemyEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        // parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;
    }
});

/**
 * An Fly wait enemy entity
 * follow a horizontal path defined by the box size in Tiled
 * @constructor
 * @extends game.PathEnemyWaitEntity
 */
game.FlyEnemyWaitEntity = game.PathEnemyWaitEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        // parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;
    }
});

/**
 * Exclaimation box
 * Contains coins inside
 * @constructor
 * @extends me.ObjectEntity
 */
game.ExclaimBox = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.collisionBox = new me.Rect(new me.Vector2d(x, y), settings.width, settings.height);
        this.updateColRect(-1, settings.width + 10, 0, settings.height + 20);
        //var collisionLayer = me.game.currentLevel.getLayerByName("collision");
        //var id = collisionLayer.getTileId(5, 5);
        //collisionLayer.setTile(x / collisionLayer.tilewidth, y / collisionLayer.tileheight, 1);
        var image = me.loader.getImage("exclaimBox");
        this.renderable = new me.AnimationSheet(0, 0, image, 70, 70);
        this.renderable.addAnimation("fresh", [0, 0]);
        this.renderable.addAnimation("used", [1, 1]);
        this.renderable.setCurrentAnimation("fresh");
        this.startY = this.pos.y;
    },

    /**
     * Collision event for the box
     * @param  {me.Vector2d} res
     * @param  {me.ObjectEntity} obj
     * @return {void}
     */
    onCollision: function (res, obj) {
        if (obj.falling) {
            this.collidable = false;
            this.renderable.setCurrentAnimation("used");
            this.boxBounceUp();
            var shot = new game.CoinEntity(this.pos.x + this.width / 4, this.pos.y - 20, { image: 'coin', width: 35, height: 35 });
            me.game.add(shot, this.z);
            me.game.sort();
        }

        if (res.y > 0) {
        }
    },

    /**
     * Tween the box up
     * @return {void}
     */
    boxBounceUp: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y - 5 }, 50).onComplete(this.boxBounceDown.bind(this));
        tween.start();
    },

    /**
     * Tween the box down to original place
     * @return {void}
     */
    boxBounceDown: function () {
        var tween = new me.Tween(this.pos).to({ y: this.startY }, 100);
        tween.start();
    }
});

/**
 * Finish Line
 * The goal of the level
 * @constructor
 * @extends me.ObjectEntity
 */
game.FinishLine = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */ 
    init: function (x, y, settings) {
        this.type = "finishLine";
        this.parent(x, y, settings);
    },

    /**
     * Collision event for the finish line
     * @return {void}
     */
    onCollision: function () {
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ESC);
        me.state.pause();
        this.levelComplete = true;
        var resume_loop = setInterval(function check_resume() {
            if (me.input.isKeyPressed('pause')) {
                clearInterval(resume_loop);
                me.state.resume();
                me.state.change(me.state.LEVELSELECT);
                me.input.unbindMouse(me.input.mouse.LEFT);
            }
        }, 100);
    },

    /**
     * Update the object at every tick
     * @return {void}
     */
    update: function () {
        if (this.inViewport && this.levelFinishGUI == null) {
            this.levelFinishGUI = new game.LevelFinishGUI();
            me.game.HUD.addItem("levelFinishGUI", this.levelFinishGUI);
        }
    },

    /**
     * Draw object on stage
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        if (this.levelComplete) {
            this.levelFinishGUI.show(context);
        }
        this.parent(context);
    }
});

/**
 * Floating finish line
 * Its like a finish line, but its animated
 * @constructor
 * @extends game.FinishLine
 */
game.FloatingFinish = game.FinishLine.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.bounceUp();
        this.startY = y;
        this.timer = me.timer.getTime();
        this.bounceUpTween;
        this.bounceDownTween = new me.Tween(this.pos).to({ y: this.startY }, 2000).onComplete(this.bounceUp.bind(this));
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        if (me.timer.getTime() >= this.timer + 100) {
            var spark = new game.Sparks(this.pos.x + this.width / 2, this.pos.y + this.height / 2, new me.Vector2d(2, 2), new me.Vector2d(-1, 1), new me.Vector2d(-1, 1));
            me.game.add(spark, this.z);
            me.game.sort();
            this.timer = me.timer.getTime();
        }
        this.parent();
    },

    /**
     * Collision event for the object
     * @return {void}
     */
    onCollision: function () {
        this.collidable = false;
        this.bounceDownTween.stop();
        this.bounceUpTween.stop();
        this.pullBack();
    },

    /**
     * Before blasting off into space, it needs to prepare by pulling back
     * @return {void}
     */
    pullBack: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y + 50 }, 1000).onComplete(this.blastOff.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    },

    /**
     * Tweens the object out of the screen upwards
     * @return {void}
     */
    blastOff: function () {
        var tween = new me.Tween(this.pos).to({ y: -100 }, 700);
        tween.easing(me.Tween.Easing.Exponential.EaseIn);
        tween.start();
        me.game.viewport.fadeIn("#FFFFFF", 1000, function () {
            me.state.change(me.state.LEVELSELECT);
        });
    },

    /**
     * Tweens/Bobs the object up
     * @return {void}
     */
    bounceUp: function () {
        this.bounceUpTween = new me.Tween(this.pos).to({ y: this.pos.y - 15 }, 2000).onComplete(this.bounceDown.bind(this));
        this.bounceUpTween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        this.bounceUpTween.start();
    },

    /**
     * Tweens/Bob the object down
     * @return {void}
     */
    bounceDown: function () {
        this.bounceDownTween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        this.bounceDownTween.start();
    }
});