
/************************************************************************************/
/*																					*/
/*		a player entity																*/
/*																					*/
/************************************************************************************/
game.PlayerEntity = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        settings.image = "playerSprite";
        this.maxLives = settings.maxLives;
        this.currentLives = this.maxLives;
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(8, 60, -1, 0);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 30);

        // set the display to follow our position on one axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);
        this.alwaysUpdate = true;
        this.canBreakTile = true;
        this.anchorPoint.set(0.5, 1.0);
    },

    update: function () {
        me.game.HUD.setItemValue("lives", this.currentLives);
        //me.game.viewport.move(this.pos.x, this.pos.y);
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value, gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                this.jumping = true;
            }

        }

        this.updateMovement();

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
                        // jump
                        this.vel.y -= this.maxVel.y * me.timer.tick;
                    } else {
                        this.hurt();
                    }
                    break;
                }

                case "spikeObject": {
                    // jump & die
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

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0 || (this.renderable && this.renderable.isFlickering())) {
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

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
 * a coin (collectable) entiry
 */
game.CoinEntity = me.CollectableEntity.extend({
    /** 
	 * constructor
	 */
    init: function (x, y, settings) {
        // add the coin sprite as renderable
        settings.image = "coin";

        // call the parent constructor
        this.parent(x, y, settings);

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    },

    update: function () {
        this.updateMovement();
    },

    onCollision: function () {
        // do something when collide
        me.audio.play("cling", false);
        // give some score
        me.game.HUD.updateItemValue("score", 250);

        //avoid further collision and delete it
        this.collidable = false;
        me.game.remove(this);
    }

});

/**
 * An enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
game.PathEnemyEntity = me.ObjectEntity.extend({
    /**
	 * constructor
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

    onCollision: function (res, obj) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(45, function () { me.game.remove(self) });
            this.collidable = false;
            me.game.remove(this);
            me.audio.play("enemykill", false);
            me.game.HUD.updateItemValue("score", 150);
        }
    },
});

game.PathEnemyWaitEntity = game.PathEnemyEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
    },

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
 */
game.FlyEnemyEntity = game.PathEnemyEntity.extend({
    /**
	 * constructor
	 */
    init: function (x, y, settings) {
        // parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;
    }
});

/**
 *
 *
 */
game.FlyEnemyWaitEntity = game.PathEnemyWaitEntity.extend({
    /**
	 * constructor
	 */
    init: function (x, y, settings) {
        // parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;
    }
});

game.ExclaimBox = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.collisionBox = new me.Rect(new me.Vector2d(x, y), settings.width, settings.height);
        this.updateColRect(-1, settings.width + 10, 0, settings.height + 10);
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

    boxBounceUp: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y - 5 }, 50).onComplete(this.boxBounceDown.bind(this));
        tween.start();
    },

    boxBounceDown: function () {
        var tween = new me.Tween(this.pos).to({ y: this.startY }, 100);
        tween.start();
    }
});

game.FinishLine = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.type = "finishLine";
        this.parent(x, y, settings);
    },

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

    update: function () {
        if (this.inViewport && this.levelFinishGUI == null) {
            this.levelFinishGUI = new game.LevelFinishGUI();
            me.game.HUD.addItem("levelFinishGUI", this.levelFinishGUI);
        }
    },

    draw: function (context) {
        if (this.levelComplete) {
            this.levelFinishGUI.show(context);
        }
        this.parent(context);
    }
});

game.FloatingFinish = game.FinishLine.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.bounceUp();
        this.startY = y;
        this.timer = me.timer.getTime();
        this.bounceUpTween;
        this.bounceDownTween = new me.Tween(this.pos).to({ y: this.startY }, 2000).onComplete(this.bounceUp.bind(this));
    },

    update: function () {
        if (me.timer.getTime() >= this.timer + 100) {
            var spark = new game.Sparks(this.pos.x + this.width / 2, this.pos.y + this.height / 2, new me.Vector2d(2, 2), new me.Vector2d(-1, 1), new me.Vector2d(-1, 1));
            me.game.add(spark, this.z);
            me.game.sort();
            this.timer = me.timer.getTime();
        }
        this.parent();
    },

    onCollision: function () {
        this.collidable = false;
        this.bounceDownTween.stop();
        this.bounceUpTween.stop();
        this.pullBack();
    },

    pullBack: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y + 50 }, 1000).onComplete(this.blastOff.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    },

    blastOff: function () {
        var tween = new me.Tween(this.pos).to({ y: -100 }, 700);
        tween.easing(me.Tween.Easing.Exponential.EaseIn);
        tween.start();
        me.game.viewport.fadeIn("#FFFFFF", 1000, function () {
            me.state.change(me.state.LEVELSELECT);
        });
    },

    bounceUp: function () {
        this.bounceUpTween = new me.Tween(this.pos).to({ y: this.pos.y - 15 }, 2000).onComplete(this.bounceDown.bind(this));
        this.bounceUpTween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        this.bounceUpTween.start();
    },

    bounceDown: function () {
        this.bounceDownTween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        this.bounceDownTween.start();
    }
});

/**
 * not part of this class
 */
/*game.LevelSelectorWidget = me.GUI_Object.extend({
    init: function (x, y, settings) {
        settings.image = "coin";
        settings.spritewidth = 35;
        settings.spriteheight = 35;
        this.levels = settings.levels.split(" ");
        this.currentLevel = this.levels[0];
        this.font = new me.BitmapFont("atascii", { x: 24 });

        this.levelButtons = [];
        for (var i = 0; i < this.levels.length; i++) {
            this.levelButtons[i] = new game.LevelButton(x, y);
            me.game.add((this.levelButtons[i]));
        }
        // parent constructor
        this.parent(x, y, settings);
    },

    onClick: function () {
        
        // don't propagate the event
        return true;
    },

    draw: function (context, x, y) {
        //this.font.draw(context, this.currentLevel + "fdgs", window.screen.width / 5, window.screen.height / 4);
        for (var i = 0; i < this.levels.length; i++) {
            this.font.draw(context, this.levels[i], this.pos.x + (i * 30), this.pos.y);
        }
        this.parent(context, x, y);
    },

});*/