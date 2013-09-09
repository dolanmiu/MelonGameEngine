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

/**
 * @fileOverview Generic objects for games
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * The main protagonist in the game. Accepts control handling
 * @constructor
 * @extends me.ObjectEntity
 */
game.MainPlayer = me.ObjectEntity.extend({
    /**
     * Initialises the object
     * @param {integer} x The x location of the object.
     * @param {integer} y The  y location of the object.
     * @return {void}
     */
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        this.canBreakTile = true;

        if (settings.maxlives) {
            this.maxLives = settings.maxlives;
        }

        this.parent(x, y, settings);
        this.type = "mainPlayer";
        this.bindedKeys = [];
    },
    /**
     * Binds the key to a keyword for it to be used for accepting key presses
     * @param  {string} keyString The key in question
     * @param  {string} referance The referance for the key
     * @param  {boolean} lock True if you want a keypressed rather than a keydown
     * @return {void}
     */
    bindKey: function (keyString, referance, lock) {
        var upperKey = keyString.toUpperCase();
        var key = eval("me.input.KEY." + upperKey);
        me.input.bindKey(key, referance + this.GUID, lock);
        this.bindedKeys.push(key);
    },
    /**
     * Check if the key is pressed
     * @param  {string} keyReferance
     * @return {boolean}
     */
    checkKeyPressed: function (keyReferance) {
        if (me.input.isKeyPressed(keyReferance + this.GUID)) {
            return true;
        }
        return false;
    },
    /**
     * Updates the object once per tick
     * @return {boolean}
     */
    update: function () {
        this.updateMovement();

        if (this.vel.x != 0 || this.vel.y != 0 || (this.renderable && this.renderable.isFlickering())) {
            this.parent();
            return true;
        }
    },
    /**
     * The destroy event for the object
     * @return {void}
     */
    onDestroyEvent: function () {
        for (var i = 0; i < this.bindedKeys.length; i++) {
            me.input.unbindKey(this.bindedKeys[i]);
        }
    },
});

/**
 * Game Manager
 * Manages the little features and variables in a game.
 * @constructor
 * @extends me.ObjectEntity
 */
game.GameManager = me.ObjectEntity.extend({
    /**
     * Initialises the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        var visibility = new Visibility();
        this.isPersistant = true;
        this.parent(x, y, settings);
        this.alwaysUpdate = true;

        if (settings.music) {
            me.audio.stopTrack();
            me.audio.playTrack(settings.music);
        }
    },
    /**
     * Updates the object once per tick
     * @return {boolean}
     */
    update: function () {
        this.parent();
        return true;
    },
});

/**
 * Multi Cam
 * Powerful camera utility which supports focusing on 2 objects, smooth camera and more.
 * @constructor
 * @extends me.ObjectEntity
 */
game.MultiCam = me.ObjectEntity.extend({

    /**
     * Initialises the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        if (settings.entities) {
            var cfe = settings.entities.split(/[\s,]+/);
            this.cameraFollowPos = [];
            var cameraFollowEntities = [];
            for (var i = 0; i < cfe.length; i++) {
                var ents = me.game.getEntityByName(cfe[i]);
                for (var j = 0; j < ents.length; j++) {
                    cameraFollowEntities.push(ents[j]);
                }
            }
            for (var i = 0; i < cameraFollowEntities.length; i++) {
                this.cameraFollowPos.push(cameraFollowEntities[i].pos);
            }
            me.game.viewport.setDeadzone(0, 0);
        }

        this.parent(x, y, settings);
        var axis;
        if (settings.axis) {
            axis = eval("me.game.viewport.AXIS." + settings.axis.toUpperCase());
        } else {
            axis = eval("me.game.viewport.AXIS.BOTH");
        }
        me.game.viewport.follow(this.pos, axis);

        if (settings.smooth) {
            this.smooth = true;
            this.smoothSpeed = settings.smooth;
        }
    },

    /**
     * Updates the object once per tick
     * @return {boolean}
     */
    update: function () {
        var middlePoint = Helper.getMiddlePoint(this.cameraFollowPos);

        if (this.smooth) {
            delta = new me.Vector2d(middlePoint.x - this.pos.x, middlePoint.y - this.pos.y);
            this.pos.x += delta.x / this.smoothSpeed;
            this.pos.y += delta.y / this.smoothSpeed;
        } else {
            this.pos.x = middlePoint.x;
            this.pos.y = middlePoint.y;
        }

        /*this.furthestDistances = Helper.findFurthestPoints(this.cameraFollowPos, middlePoint);
        if (this.oldZoom == null) {
            this.oldZoom = (this.furthestDistances[0].x - this.furthestDistances[1].x);
        }

        var firstPointOnScreen = me.game.viewport.worldToScreen(this.furthestDistances[0].x, this.furthestDistances[0].y);
        var secondPointOnScreen = me.game.viewport.worldToScreen(this.furthestDistances[1].x, this.furthestDistances[1].y);
        if (firstPointOnScreen.x > 500) {

            this.furthestDistance = this.furthestDistances[0].x - this.furthestDistances[1].x;

            this.zoomDelta = (this.oldZoom / this.furthestDistance);

            this.oldZoom = this.furthestDistance;

            me.video.scale(me.video.getScreenContext(), this.zoomDelta);
        }
        */
       return true;
    },
});

/**
 * Binary Heap
 * A data structure
 * @constructor
 * @extends Object
 */
BinaryHeap = Object.extend({
    /**
     * Initialises the object
     * @param  {ScoreFunction} scoreFunction
     */
    init: function(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    },
    /**
     * Push an element into the BinaryHeap
     * @param  {Node} element
     * @return {void}
     */
    push: function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    /**
     * Pop an element from Binaryheap
     * @return {Node}
     */
    pop: function () {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    /**
     * Remove node from BinaryHeap
     * @param  {Node} node
     * @return {void}
     */
    remove: function (node) {
        var len = this.content.length;
        // To remove a value, we must search through the array to find
        // it.
        for (var i = 0; i < len; i++) {
            if (this.content[i] == node) {
                // When it is found, the process seen in 'pop' is repeated
                // to fill up the hole.
                var end = this.content.pop();
                if (i != len - 1) {
                    this.content[i] = end;
                    if (this.scoreFunction(end) < this.scoreFunction(node))
                        this.sinkDown(i);
                    else
                        this.bubbleUp(i);
                }
                return;
            }
        }
        throw new Error("Node not found.");
    },

    /**
     * Return the size of the BinaryHeap
     * @return {integer}
     */
    size: function () {
        return this.content.length;
    },

    rescoreElement: function (node) {
        this.sinkDown(this.content.indexOf(node));
    },

    /**
     * Move node down in order of the BinaryHeap
     * @param  {Node} n
     * @return {void}
     */
    sinkDown: function (n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];
        // When at 0, an element can not sink any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
                // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },

    /**
     * Raise node up in order of BinaryHeap
     * @param  {Node} n
     * @return {void}
     */
    bubbleUp: function (n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) * 2, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N],
                    child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap != null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
                // Otherwise, we are done.
            else {
                break;
            }
        }
    }
});

/**
 * @fileOverview Objects for the Graphical User Interface
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Button
 * A button for all your needs
 * @constructor
 * @extends me.GUI_Object
 */
game.Button = me.GUI_Object.extend({

    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.colour = settings.colour;
        settings.spritewidth = settings.width;
        settings.spriteheight = settings.height;
        this.font = new me.BitmapFont("atascii", { x: 24 });
        this.text = settings.text;
        this.parent(x, y, settings);
        this.centreX = settings.centreX;
        this.centreY = settings.centreY
    },

    /**
     * Draw the object on screen
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    draw: function (context, x, y) {
        var size = this.font.measureText(context, this.text);
        var trueSize = this.font.measureText(context, this.text);
        context.fillStyle = this.colour;

        if (this.width > size.width) {
            size.width = this.width;
        }

        if (this.height > size.height) {
            size.height = this.height;
        }

        this.width = size.width;
        this.height = size.height;

        if (this.centreX == true) {
            this.pos.x = game.screenWidth / 2 - size.width / 2;
        }

        if (this.centreY == true) {
            this.pos.y = game.screenHeight / 2 - size.height / 2;
        }

        context.fillRect(this.pos.x, this.pos.y, size.width, size.height);
        this.font.draw(context, this.text, this.pos.x + size.width / 2 - trueSize.width / 2, this.pos.y + size.height / 2 - trueSize.height / 2);
    },
});

/**
 * Sprite
 * A sprite object which loads an image
 * @constructor
 * @extends me.SpriteObject
 */
game.Sprite = me.SpriteObject.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.image = me.loader.getImage(settings.image);
        this.parent(x, y, this.image);
    },
});

/**
 * Background Image
 * An image which automatically centres and fits to screens. Primarily used in menus. Parallax backgrounds is done in Tiled.
 * @constructor
 * @extends game.Sprite
 */
game.BackgroundImage = game.Sprite.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var scaleFactor;
        if (this.image.width > this.image.height) {
            scaleFactor = game.screenHeight / this.image.height;
        } else {
            scaleFactor = game.screenWidth / this.image.width;
        }

        if (scaleFactor * this.image.width < game.screenWidth) {
            scaleFactor = game.screenWidth / this.image.width;
        }

        if (scaleFactor * this.image.height < game.screenHeight) {
            scaleFactor = game.screenHeight / this.image.height;
        }

        this.pos.x = (game.screenWidth / 2) - (this.image.width / 2);
        this.pos.y = (game.screenHeight / 2) - (this.image.height / 2);
        this.resize(scaleFactor);
    },
});

/**
 * Normal Logo
 * The game logo
 * @constructor
 * @extends game.Sprite
 */
game.NormalLogo = game.Sprite.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var scaleFactor = (game.screenWidth / 3) / this.image.width;
        this.pos.x = (game.screenWidth / 2) - (this.image.width / 2);
        this.resize(scaleFactor);
        this.anchorPoint.set(0.5, 0);
    },
});

/**
 * Bobbing Logo
 * Animated logo which bobs up and down
 * @constructor
 * @extends game.NormalLogo
 */
game.BobbingLogo = game.NormalLogo.extend({

    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.boxBounceUp();
        this.startY = y;
    },

    /**
     * Moves the logo upwards
     * @return {void}
     */
    boxBounceUp: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y - 5 }, 2000).onComplete(this.boxBounceDown.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    },

    /**
     * Moves the logo downwards
     */
    boxBounceDown: function () {
        var tween = new me.Tween(this.pos).to({ y: this.startY }, 2000).onComplete(this.boxBounceUp.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    }
});

/**
 * Play Button
 * Button which changes the state to LEVELSELECT
 * @constructor
 * @extends game.Button
 */
game.PlayButton = game.Button.extend({
    /**
     * The click event for this button
     * @return {void}
     */
    onClick: function () {
        me.state.change(me.state.LEVELSELECT);
    },
});

/**
 * Settings button
 * Changes the state to SETTINGS
 * @constructor
 * @extends game.Button
 */
game.SettingsButton = game.Button.extend({
    /**
     * The click event for this button
     */
    onClick: function () {
        me.state.change(me.state.SETTINGS);
    },
});

/**
 * Audio Toggle Button
 * Toggles the audio mute for the game
 * @constructor
 * @extends game.Button
 */
game.AudioToggleButton = game.Button.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        settings.text = "MUTE";
        this.parent(x, y, settings);
        this.muted = false;
    },

    /**
     * The click event for this object
     * @return {void}
     */
    onClick: function () {
        if (this.muted) {
            me.audio.unmuteAll();
            this.muted = false;
            this.text = "MUTE";
        } else {
            me.audio.muteAll();
            this.muted = true;
            this.text = "UNMUTE";
        }
    },
});

/**
 * Level Button
 * Transports the player to a level specified by the 'text' property
 * @constructor
 * @extends game.Button
 */
game.LevelButton = game.Button.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.level = settings.level;
        this.text = settings.level.toUpperCase();
    },

    /**
     * Click event for this button
     * @return {void}
     */
    onClick: function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.change(me.state.PLAY, this.level);
    },
});

/**
 * HUD Text
 * Text on the HUD. Floats on screen during gameplay.
 * @constructor
 * @extends me.HUD_Item
 */
game.HUDText = me.HUD_Item.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {string} fontName
     * @param  {string} alignment
     * @param  {float} scale
     * @return {void}
     */
    init: function (x, y, fontName, alignment, scale) {
        this.parent(x, y);
        if (fontName) {
            this.font = new me.BitmapFont(fontName, { x: 24 });

        } else {
            this.font = new me.BitmapFont("atascii", { x: 24 });
        }
        if (alignment && scale) {
            this.font.set(alignment, scale);
        } else {
            this.font.set("right", 1.6);
        }
    },
});

/**
 * Score Object
 * An object which handles displaying score on screen.
 * @constructor
 * @extends game.HUDText
 */
game.ScoreObject = game.HUDText.extend({
    /**
     * Initialise the object
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    init: function (x, y) {
        // call the parent constructor
        this.parent(x, y);
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    draw: function (context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

/**
 * Life Object
 * An object which handles displaying life on screen. Shows hearts as number of lives.
 * @constructor
 * @extends game.HUDText
 */
game.LifeObject = game.HUDText.extend({
    /**
     * Initialise Object
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    init: function (x, y) {
        this.parent(x, y, "lifeHeart", "left", 0.7);
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    draw: function (context, x, y) {
        context.save();
        var text;
        for (var i = 0; i < this.value; i++) {
            text += "!";
        }
        context.globalAlpha = 1;
        this.font.draw(context, text, this.pos.x, this.pos.y);
        context.restore();
        this.parent(context);
    }
});

/**
 * Pause GUI
 * Pause menu which comes after being paused
 * @constructor
 * @extends me.HUD_Item
 */
game.PauseGUI = me.HUD_Item.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    init: function (x, y) {
        this.font = new me.BitmapFont("atascii", { x: 24 });
        var settings = {};
        settings.width = 100;
        settings.height = 50;
        settings.colour = "black";
        settings.text = "LEVEL SELECT";
        this.button = new game.PlayButton(100, game.screenHeight / 3, settings);
        me.game.add(this.button);
        me.game.sort();
        this.parent(x, y);
    },

    /**
     * Display the pause menu
     * @param  {Context2d} context
     * @return {void}
     */
    show: function (context) {
        var text = "PAUSED";
        var size = this.font.measureText(context, text);
        var coords = me.game.viewport.screenToWorld(game.screenWidth / 2, game.screenHeight / 2);
        this.button.pos.x = coords.x - this.button.width / 2;
        this.button.draw(context);
        this.font.draw(context, text, coords.x - (size.width / 2), coords.y - (size.height / 2));
    }
});

/**
 * Level Finish GUI
 * The level finish menu which displays after finishing a level
 * @constructor
 * @extends me.HUD_Item
 */
game.LevelFinishGUI = me.HUD_Item.extend({
    /**
     * Initialise Object
     * @return {void}
     */
    init: function () {
        this.font = new me.BitmapFont("atascii", { x: 24 });
        var settings = {};
        settings.width = 100;
        settings.height = 50;
        settings.colour = "black";
        settings.text = "BACK";
        this.backButton = new game.PlayButton(100, game.screenHeight / 3, settings);
        me.game.add(this.backButton);
        me.game.sort();
    },

    /**
     * Display the Level Finish menu
     * @param  {Context2d} context
     * @return {void}
     */
    show: function (context) {
        // Draw rectangle
        var text = "LEVEL COMPLETE!";
        var size = this.font.measureText(context, text);
        var coords = me.game.viewport.screenToWorld(game.screenWidth / 2, game.screenHeight / 2);
        //context.fillStyle = "rgba(0, 0, 0, 0.8)";
        //context.fillRect(coords.x + 20, coords.y + 20, 500, 500);
        this.backButton.pos.x = coords.x - this.backButton.width / 2;
        this.backButton.draw(context);
        this.font.draw(context, text, coords.x - (size.width / 2), coords.y - (size.height / 2));
    }
});

/**
 * HUD Item
 * An Item displayed on the HUD. Used in Tiled as it is an object entity
 * @constructor
 * @extends me.ObjectEntity
 */
game.HUDItem = me.ObjectEntity.extend({
    /**
     * Initialise Object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        if (!me.game.HUD) {
            me.game.addHUD(0, 0, game.screenWidth, game.screenHeight);
        }
        this.alwaysUpdate = true;
        this.parent(x, y, settings);
    },
});

/**
 * Mini map
 * Enemies and allys shown on a map
 * @constructor
 * @extends game.HUDItem
 */
game.MiniMap = game.HUDItem.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var dimensionsRect = new me.Rect(new me.Vector2d(x, y), settings.width, settings.height);
        var entitesToTrack;
        if (settings.trackedentities) {
            entitesToTrack = settings.trackedentities.split(',');
        }
        for (var i = 0; i < entitesToTrack.length; i++) {
            entitesToTrack[i] = entitesToTrack[i].trim();
        }

        var focusedEntity = settings.focusedentity.trim();
        this.miniMapHUD = new game.MiniMapHUD(dimensionsRect, entitesToTrack, focusedEntity);
        me.game.HUD.addItem("map", this.miniMapHUD);

        /*if (settings.minimap) {
            var mapAttributes = settings.minimap.trim().split(':');
            var dimensions = mapAttributes[0].split(',');
            for (var i = 0; i < dimensions.length; i++) {
                dimensions[i] = +dimensions[i];
            }

            var entitesToTrack = mapAttributes[1].split(',');
            for (var i = 0; i < entitesToTrack.length; i++) {
                entitesToTrack[i] = entitesToTrack[i].trim();
            }

            var dimensionsRect = new me.Rect(new me.Vector2d(dimensions[0], dimensions[1]), dimensions[2], dimensions[3]);
            var focusedEntity = mapAttributes[2].trim();
            me.game.HUD.addItem("map", new game.MiniMapHUD(dimensionsRect, entitesToTrack, focusedEntity));
        }*/
    },

    /**
     * Update the object
     * @return {void}
     */
    update: function () {
        me.game.HUD.updateItemValue("map", 0);
    },
});

/**
 * HUD Text
 * Creates text shown on the HUD. the HUDText object creates this. Tiled cannot place HUD_Items on screen.
 * @constructor
 * @extends game.HUDText
 */
game._HUDText = game.HUDText.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {string[]} texts
     * @return {void}
     */
    init: function (x, y, texts) {
        this.parent(x, y);

        this.text1 = "";
        this.text2 = "";
        if (texts[0]) {
            this.text1 = texts[0];
        }

        if (texts[1]) {
            this.text2 = texts[1];
        }
    },

    /**
     * Draw the object on screen
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    draw: function (context, x, y) {
        var text = this.text1 + this.value + this.text2;
        this.font.draw(context, text, this.pos.x + x, this.pos.y + y);
        this.parent(context);
    }

});

/**
 * HUD Text Block
 * A text block which displays a value. A value can be hooked onto this object.
 * @constructor
 * @extends me.SpriteObject
 */
game.HUDTextBlock = game.HUDItem.extend({
   /**
    * Initialise object
    * @param  {integer} x
    * @param  {integer} y
    * @param  {me.ObjectSettings} settings
    * @return {void}
    */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var text;
        if (settings.text) {
            text = settings.text.split("'value'");
        }

        this.HUDWidget = new game._HUDText(x, y, text);
        if (!settings.tag) {
            throw "This object needs a unique tag property.";
        }
        this.tag = settings.tag + this.GUID;
        me.game.HUD.addItem(this.tag, this.HUDWidget);

        if (settings.object) {
            var objs = me.game.getEntityByName(settings.object);
            if (objs.length > 1 && isNaN(settings.number)) {
                throw "More than one instance of " + settings.object + "! Specify a number";
            }

            if (objs.length > 1 && !isNaN(settings.number)) {
                this.objectTracked = objs[settings.number];
            }

            if (objs.length == 1) {
                this.objectTracked = objs[0];
            }
        }

        if (settings.valuefrom) {
            this.valueFrom = settings.valuefrom;
        }
    },

    /**
     * Update the object
     * @return {void}
     */
    update: function () {
        this.value = eval("this.objectTracked." + this.valueFrom);
        me.game.HUD.setItemValue(this.tag, this.value);
    },
});

/**
 * Lives Counter
 * Count the lives of the player
 * @constructor
 * @extends game.HUDItem
 */
game.LivesCounter = game.HUDItem.extend({
    /**
     * Initialise Object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.livesHUD = new game.LifeObject(x, y);
        var text = settings.text;

        this.tag = "lives" + this.GUID;
        me.game.HUD.addItem(this.tag, this.livesHUD);

        if (settings.object) {
            var objs = me.game.getEntityByName(settings.object);
            if (objs.length > 1 && isNaN(settings.number)) {
                throw "More than one instance of " + settings.object + "! Specify a number";
            }

            if (objs.length > 1 && !isNaN(settings.number)) {
                this.objectTracked = objs[settings.number];
            }

            if (objs.length == 1) {
                this.objectTracked = objs[0];
            }
        }

        if (settings.valuefrom) {
            this.valueFrom = settings.valuefrom;
        }
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        this.value = eval("this.objectTracked." + this.valueFrom);
        me.game.HUD.setItemValue(this.tag, this.value);
    },
});

/**
 * Score Counter
 * Keep count of the score of the player
 * @constructor
 * @extends game.HUD_Item
 */
game.ScoreCounter = game.HUDItem.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.scoreHUD = new game.ScoreObject(200, 10);
        me.game.HUD.addItem("score", this.scoreHUD);
    },

    /**
     * Update the object
     * @return {void}
     */
    update: function () {
        //me.game.HUD.updateItemValue("score", this.value);
    },
});

/**
 * Pause Menu
 * The HUDItem for the pause menu interface
 * @constructor
 * @extends game.HUDItem
 */
game.PauseMenu = game.HUDItem.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.pauseGUI = new game.PauseGUI();
        //me.game.HUD.addItem("pause", this.pauseGUI);
        me.input.bindKey(me.input.KEY.ESC, "pause", true);
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        this.paused = false;
        if (me.input.isKeyPressed('pause')) {
            me.state.pause();
            this.paused = true;
            var resume_loop = setInterval(function check_resume() {
                if (me.input.isKeyPressed('pause')) {
                    clearInterval(resume_loop);
                    me.state.resume();
                }
            }, 100);
        }
        this.parent();
    },

    /**
     * Draw object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        if (this.paused) {
            this.pauseGUI.show(context);
            //var background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            //context.drawImage(background.canvas, 0, 0);
            // Render the main frameBuffer
            me.video.blitSurface();
        }
    },

    /**
     * Destroy event of object
     * @return {void}
     */
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ESC);
    }
});

/**
 * Mini Map HUD
 * The HUD Item for the Mini Map object
 * @constructor
 * @extends me.HUD_Item
 */
game.MiniMapHUD = me.HUD_Item.extend({
    /**
     * Initialise object
     * @param  {me.Rect} rect
     * @param  {me.ObjectEntity[]} entitiesTracked
     * @param  {me.ObjectEntity} focusedEntity
     * @return {void}
     */
    init: function (rect, entitiesTracked, focusedEntity) {
        this.focusedEntity = me.game.getEntityByName(focusedEntity)[0];
        this.rect = rect;
        this.centrePoint = new me.Vector2d((this.rect.left + this.rect.right) / 2, (this.rect.top + this.rect.bottom) / 2);

        this.entities = [];
        /*for (var i = 0; i < entitiesTracked.length; i++) {
            this.entities = this.entities.concat(me.game.getEntityByName(entitiesTracked[i]));
        }*/

        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].name == focusedEntity.toLowerCase()) {
                this.entities.splice(i, 1);
            }
        }
        this.collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
        this.parent(rect.left, rect.top);
    },

    /**
     * Draw the minimap
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        context.beginPath();
        context.rect(this.pos.x, this.pos.y, this.rect.width, this.rect.height);
        context.clip();
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(this.pos.x, this.pos.y, this.rect.width, this.rect.height);

        var xOffset = this.centrePoint.x - (this.focusedEntity.pos.x / me.game.currentLevel.tilewidth);
        var yOffset = this.centrePoint.y - (this.focusedEntity.pos.y / me.game.currentLevel.tileheight);

        context.fillStyle = "#FFFFFF";
        context.fillRect(this.focusedEntity.pos.x / me.game.currentLevel.tilewidth + xOffset, this.focusedEntity.pos.y / me.game.currentLevel.tileheight + yOffset, 1, 1);

        for (var j = 0; j < this.entities.length; j++) {
            var x = this.entities[j].pos.x / me.game.currentLevel.tilewidth + xOffset;
            var y = this.entities[j].pos.y / me.game.currentLevel.tileheight + yOffset;
            context.fillStyle = "#FFF000";
            context.fillRect(x, y, 1, 1);
            if (this.entities[j].faceDirection) {
                this.drawVisionCone(context, x, y, this.entities[j].faceDirection, this.entities[j].state.colour);
            }
        }

        for (var i = 0; i < this.collisionLayer.length; i++) {
            for (var j = 0; j < this.collisionLayer[i].length; j++) {
                if (this.collisionLayer[i][j] != null) {
                    context.fillStyle = "#FFF000";
                    context.fillRect(i + xOffset, j + yOffset, 1, 1);
                }
            }
        }
        context.restore();
    },

    /**
     * Draw the vision cone for the entities
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @param  {float} a
     * @param  {string} colour
     * @return {void}
     */
    drawVisionCone: function (context, x, y, a, colour) {
        var grd = context.createRadialGradient(x, y, 0, x, y, 80);
        grd.addColorStop(0, "rgba(" + colour + ",0.6)");
        grd.addColorStop(1, "rgba(" + colour + ",0)");
        context.beginPath();
        context.arc(x, y, 70, a - 1, a + 1, false);
        context.lineTo(x, y);
        context.closePath();
        context.fillStyle = grd;
        context.fill();
    },
});

/**
 * Scrolling text
 * Scrolling text across the screen.
 * @constructor
 * @extends me.ObjectEntity
 */
game.ScrollingText = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        var font = "atascii";
        if (settings.font) {
            font = settings.font;
        }
        this.scrollerfont = new me.BitmapFont(font, { x: 24 });
        this.scrollertween = null;
        if (settings.text) {
            this.text = settings.text;
        } else {
            this.text = "ADD SOME TEXT TO THE TEXT PROPERTY!      "
        }
        this.scrollerpos = game.screenWidth;

        this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
        this.parent(x, y, settings);
    },

    /**
     * Scroll over text tween
     * @return {void}
     */
    scrollover: function () {
        this.scrollerpos = game.screenWidth;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    /**
     * Draw the screolling text
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        this.scrollerfont.draw(context, this.text, this.scrollerpos, this.pos.y);
    },
});

/**
 * Text Block
 * Create a text block to contain text on screen
 * @constructor
 * @extends me.ObjectEntity
 */
game.TextBlock = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.text = settings.text;
        var font = "atascii";
        if (settings.font) {
            font = settings.font;
        }
        this.font = new me.BitmapFont(font, { x: 24 });

        this.text = "ENTER TEXT HERE";
        if (settings.text) {
            this.text = settings.text;
        }

        this.fontPosX = x;
        this.fontPosY = y;
        if (settings.centrex == true) {
            this.centreX = true;
        }

        if (settings.centrey == true) {
            this.centreY = true;
        }

        this.parent(x, y, settings);
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        var size = this.font.measureText(context, this.text);
        if (this.centreX) {
            this.fontPosX = game.screenWidth / 2 - (size.width / 2);
        }

        if (this.centreY) {
            this.fontPosY = game.screenHeight / 2 - (size.height / 2);
        }

        this.font.draw(context, this.text, this.fontPosX, this.fontPosY);
    }
});

/**
 * Full Screen Colour
 * Fill a screen with one solid colour
 * @constructor
 * @extends me.ObjectEntity
 */
game.FullScreenColour = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.colour = settings.colour;
    },

    /**
     * Draw object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        me.video.clearSurface(context, this.colour);
    }
});

//game.ScrollingText = 

/**
 * not part of this class
 */
/*gameLevelSelectorWidget = me.GUI_Object.extend({
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

/**
 * @fileOverview Lights for the games
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Dynamic Ray Cast Light
 * Light made by using the sweep function and ray casting
 * @constructor
 * @extends me.ObjectEntity
 */
game.DynamicRayCastLight = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.visibility = new Visibility();
        this.parent(x, y, settings);

        if (!me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes) {
            me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes = this.createCollisionBoxes();
        }
        var boxes = me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes;
        var size;
        if (me.game.currentLevel.width > me.game.currentLevel.height) {
            size = me.game.currentLevel.width;
        } else {
            size = me.game.currentLevel.height;
        }
        this.visibility.loadMap(size, 0, boxes, []);
        this.visibility.setLightLocation(this.pos.x, this.pos.y);
        this.visibility.sweep(Math.PI);
    },

    /**
     * Create collision boxes for light
     * @return {Object[]} boxes
     */
    createCollisionBoxes: function () {
        var boxes = [];
        var collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
        for (var i = 0; i < collisionLayer.length; i++) {
            for (var j = 0; j < collisionLayer.length; j++) {
                if (collisionLayer[i][j]) {
                    var box = collisionLayer[i][j];
                    var boxObj = new Object();
                    boxObj.r = box.height / 2
                    boxObj.x = box.pos.x + boxObj.r;
                    boxObj.y = box.pos.y + boxObj.r;

                    boxes.push(boxObj);
                }
            }
        }
        return boxes;
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        this.parent();
    },

    /**
     * Update the light position
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    updatePos: function (x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.visibility.setLightLocation(this.pos.x, this.pos.y);
        this.visibility.sweep(Math.PI);
    },

    /**
     * Draw the light
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        context.fillStyle = LightDrawEffects.CandleFill(context, this.pos.x, this.pos.y, 1000);
        context.beginPath();
        context.moveTo(this.visibility.center.x, this.visibility.center.y);
        for (var i = 0; i < this.visibility.output.length; i++) {
            context.lineTo(this.visibility.output[i].x, this.visibility.output[i].y);
        }
        context.closePath();
        context.fill();
        context.restore();
        this.parent(context);

        //var path = this.computeVisibleAreaPaths(this.pos, this.visibility.output);
        //this.drawSegments(context, path, null, this.visibility, this.pos, me.game.currentLevel.width);
    },

    /**
     * Draw the individual triangular segments for the light
     * @param  {Context2d} g
     * @param  {me.Vector2d[]} path
     * @param  {string} option
     * @param  {Visiblity} visibility
     * @param  {me.Vector2d} center
     * @param  {float} size
     * @return {void}
     */
    drawSegments: function (g, path, option, visibility, center, size) {
        /*var maxAngle = Math.PI;

        g.save();
        g.strokeStyle = 'hsl(30, 10%, 50%)';
        g.lineWidth = 2;
        var i = visibility.segments.iterator();
        while (i.hasNext()) {
            var segment = i.next();
            g.beginPath();
            g.moveTo(segment.p1.x, segment.p1.y);
            g.lineTo(segment.p2.x, segment.p2.y);
            g.stroke();
        }

        g.strokeStyle = 'hsl(30, 0%, 100%)';  // first one
        g.lineWidth = 3;
        var i = visibility.open.iterator();
        while (i.hasNext()) {
            var segment = i.next();
            g.beginPath();
            g.moveTo(segment.p1.x, segment.p1.y);
            g.lineTo(segment.p2.x, segment.p2.y);
            g.stroke();
            g.strokeStyle = 'hsl(30, 0%, 0%)';  // remaining segments
        }
        g.restore();*/
        g.save();

        g.beginPath();
        this.interpretSvg(g, path);
        g.clip();

        var angles = [];
        if (option == 'endpoints') {
            angles = getEndpointAngles();
        } else {
            // A fixed set of angles
            var numAngles = 60;
            for (var i = 0; i < numAngles; i++) {
                angles.push(2 * Math.PI * i / numAngles);
            }
        }

        g.strokeStyle = 'hsla(30, 100%, 70%, 0.3)';
        g.lineWidth = 2;
        g.beginPath();
        angles.forEach(function (angle) {
            g.moveTo(center.x, center.y);
            g.lineTo(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
        });
        g.stroke();

        g.restore();
    },

    /**
     * Compute the visible area points
     * @param  {me.Vector2d} center
     * @param  {path[]} output
     * @return {object[]}
     */
    computeVisibleAreaPaths: function (center, output) {
        var path1 = [];
        var path2 = [];
        var path3 = [];

        for (var i = 0; i < output.length; i += 2) {
            var p1 = output[i];
            var p2 = output[i + 1];
            if (isNaN(p1.x) || isNaN(p1.y) || isNaN(p2.x) || isNaN(p2.y)) {
                // These are collinear points that Visibility.hx
                // doesn't output properly. The triangle has zero area
                // so we can skip it.
                continue;
            }

            path1.push("L", p1.x, p1.y, "L", p2.x, p2.y);
            path2.push("M", center.x, center.y, "L", p1.x, p1.y, "M", center.x, center.y, "L", p2.x, p2.y);
            path3.push("M", p1.x, p1.y, "L", p2.x, p2.y);
        }

        return { floor: path1, triangles: path2, walls: path3 };
    },

    interpretSvg: function (g, path) {
        for (var i = 0; i < path.length; i++) {
            if (path[i] == 'M') { g.moveTo(path[i + 1], path[i + 2]); i += 2; }
            if (path[i] == 'L') { g.lineTo(path[i + 1], path[i + 2]); i += 2; }
        }
    }
});

/**
 * Dynamic Light
 * Light made using Illuminated.js
 * @constructor
 * @extends me.ObjectEntity
 */
game.DynamicLight = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        if (!settings.angle) {
            settings.angle = Math.PI;
        }
        this.light = new illuminated.Lamp({
            position: new illuminated.Vec2(x, y),
            distance: 200,
            radius: 2,
            angle: Math.PI,
            samples: 2,
            roughness: settings.roughness
        });
        this.angle = settings.angle;

        if (!me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes) {
            //me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes = this.createCollisionBoxes();
            me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes = Light.TraceLevel();
        }
        this.obj = me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes;

        this.lighting = new illuminated.Lighting({
            light: this.light,
            objects: this.obj
        });
        this.parent(x, y, settings);
    },

    /**
     * Create collision boxes used to calculate light obstruction
     * @return {illuminated.Rectangle[]}
     */
    createCollisionBoxes: function () {
        var boxes = [];
        var collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
        for (var i = 0; i < collisionLayer.length; i++) {
            for (var j = 0; j < collisionLayer.length; j++) {
                if (collisionLayer[i][j]) {
                    var box = collisionLayer[i][j];
                    var boxObj = new illuminated.RectangleObject({
                        topleft: new illuminated.Vec2(box.left, box.top),
                        bottomright: new illuminated.Vec2(box.right, box.bottom)
                    });
                    boxes.push(boxObj);
                }
            }
        }
        return boxes;
    },

    /**
     * Update the object
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    update: function (x, y) {
        if (me.game.DarkMask) {
            if (!_.contains(me.game.DarkMask.lights, this.light)) {
                var lights = me.game.getEntityByName("DynamicLight");
                me.game.DarkMask.lights.push(this.light);
            }
        }
        this.lighting.compute(me.game.currentLevel.width, me.game.currentLevel.height);
        this.light.position = new illuminated.Vec2(x, y);
        this.light.angle = this.angle;
        this.parent();
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        context.globalCompositeOperation = "lighter";
        context.fillStyle = "black";
        context.fillRect(0, 0, me.game.currentLevel.width, me.game.currentLevel.height);
        this.lighting.render(context);
        context.restore();
        /*var points = me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes[0].points;
        context.fillStyle = '#f00';
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
        context.fill();*/
    },
});

/**
 * Dark Mask
 * Create a shadowy area where there is absence of light
 * @constructor
 * @extends me.ObjectEntity
 */
game.DarkMask = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var opacity = parseFloat(settings.opacity);
        me.game.DarkMask = new illuminated.DarkMask({ color: 'rgba(0,0,0,' + opacity + ')' });
    },

    /**
     * Update the object
     * @return {void}
     */
    update: function () {
        me.game.DarkMask.compute(me.game.currentLevel.width, me.game.currentLevel.width);
        this.parent();
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        me.game.DarkMask.render(context);
    },
});

/**
 * @fileOverview Particle effects for the games
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Particle Emitter
 * A particle factory creating particles per unit time
 * @constructor
 * @extends me.ObjectEntity
 */
game.ParticleEmitter = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.collidable = false;
        this.gravity = 0;
        this.timer = me.timer.getTime();
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        if (me.timer.getTime() >= this.timer + 100) {
            this.emit(1);
            this.timer = me.timer.getTime();
        }
        //this.updateMovement();
    },

    /**
     * Get a random number from a range
     * @param  {float} min number
     * @param  {float} max number
     * @return {float}
     */
    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Emit a particle from the emitter
     * @param  {interger} amount
     * @return {void}
     */
    emit: function (amount) {
        for (var i = 0; i < amount; i++) {
            this.addParticle();
        }
    },

    /**
     * Add a particle to the particle emitter
     * @param {game.Particle} particle
     */
    addParticle: function (particle) {
        me.game.add(particle, this.z);
        me.game.sort();
    }
});

/**
 * Fire Emitter
 * Fire particle factory, emitting particles per unit time
 * @constructor
 * @extends game.ParticleEmitter
 */
game.FireEmitter = game.ParticleEmitter.extend({
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
     * Add a particle to the parent's particle pool 
     */
    addParticle: function () {
        var particle = new game.FireParticle(this.pos.x + this.width / 2, this.pos.y + this.height, new me.Vector2d(1, -1), new me.Vector2d(-0.4, 0.4), new me.Vector2d(0.5, 1));
        this.parent(particle);
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        var grd = context.createRadialGradient(this.pos.x + this.width / 2, this.pos.y + this.height / 2, 5, this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.getRandom(0.9, 1) * 90);
        var intensity = this.getRandom(0.8, 1) * 0.5;
        grd.addColorStop(0, "rgba(237,146,0," + intensity + ")");
        grd.addColorStop(1, "rgba(237,146,0,0)");
        //context.fillRect(10, 10, 150, 100);
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, 100, 0, 2 * Math.PI, false);
        context.fillStyle = grd;
        context.fill();
        context.restore();
        this.parent(context);
    },
});

/**
 * Water Particle Emitter
 * Water particle factory. Creates particles per unit time.
 * @constructor
 * @extends game.ParticleEmitter
 */
game.WaterParticleEmitter = game.ParticleEmitter.extend({
    /**
     * Add particle to the parent's particle pool
     */
    addParticle: function () {
        var particle = new game.WaterParticle(this.pos.x, this.pos.y, new me.Vector2d(5, -10), new me.Vector2d(-0.5, 0.5), new me.Vector2d(0.5, 1));
        this.parent(particle);
    }
});

/**
 * Particle
 * A basic particle
 * @constructor
 * @extends me.ObjectEntity
 */
game.Particle = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @param  {me.Vector2d} direction
     * @param  {float} randX
     * @param  {float} randY
     * @return {void}
     */
    init: function (x, y, settings, direction, randX, randY) {
        this.parent(x, y, settings);
        this.direction = direction;
        this.randX = randX;
        this.randY = randY;
        this.gravity = 0.4;
        this.timeTracker = me.timer.getTime();
        this.startX = x,
        this.startY = y;
        this.fire();
        this.lifeTime = 1000;
    },

    /**
     * Make the particle move by giving it a velocity
     * @return {void}
     */
    fire: function () {
        this.vel.x = this.direction.x * this.getRandom(this.randX.x, this.randX.y) * me.timer.tick;
        this.vel.y = this.direction.y * this.getRandom(this.randY.x, this.randY.y) * me.timer.tick;
    },

    /**
     * Get random number from a range
     * @param  {float} min
     * @param  {float} max
     * @return {float}
     */
    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Update the object
     * @return {void}
     */
    update: function () {
        this.updateMovement();
        if (me.timer.getTime() >= this.timeTracker + this.lifeTime) {
            /*this.pos.x = this.startX;
            this.pos.y = this.startY;
            this.fire();
            this.timeTracker = me.timer.getTime();*/
            me.game.remove(this);
        }

        if (this.vel.x != 0 || this.vel.y != 0 || (this.renderable && this.renderable.isFlickering())) {
            this.parent();
            return true;
        }
    },

    /**
     * Convert hex colour to rgb colour
     * @param  {string} hex
     * @return {string}
     */
    hexToRgb: function(hex) {
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return r + "," + g + "," + b;
    }
});

/**
 * Vector Circle Particle
 * Bitmaps consume a lot of memory. Vectors are crisp and saves memory
 * @constructor
 * @extends game.Particle
 */
game.VectorCircleParticle = game.Particle.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.Vector2d} direction
     * @param  {float} randX
     * @param  {float} randY
     * @return {void}
     */
    init: function (x, y, direction, randX, randY) {
        settings = {};
        this.parent(x, y, settings, direction, randX, randY);
        this.alpha = 0.7;
    },

    /**
     * Draw the object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        var rgbColour = this.hexToRgb(this.colour);
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(' + rgbColour + "," + this.alpha + ")";
        context.fill();
        context.restore();
    },
});

/**
 * Water Particle
 * A vector water particle
 * @constructor
 * @extends game.VectorCircleParticle
 */
game.WaterParticle = game.VectorCircleParticle.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.Vector2d} direction
     * @param  {float} randX
     * @param  {float} randY
     * @return {void}
     */
    init: function (x, y, direction, randX, randY) {
        this.parent(x, y, direction, randX, randY);
        this.setVelocity(30, 10);
        this.radius = Math.random() * 10;
        this.colour = '499589';
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        var res = me.game.collide(this);
        if (res) {
            switch (res.obj.type) {
                case me.game.WATER: {
                    me.game.remove(this);
                    break;
                }
                default: break;
            }
        }
        this.parent();
    },
});

/**
 * Sparks Particle
 * A vactor sparks particle
 * @constructor
 * @extends game.VectorCircleParticle
 */
game.Sparks = game.VectorCircleParticle.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.Vector2d} direction
     * @param  {float} randX
     * @param  {float} randY
     * @return {void}
     */
    init: function (x, y, direction, randX, randY) {
        this.parent(x, y, direction, randX, randY);
        this.setVelocity(30, 30);
        this.gravity = 0.1;
        this.radius = Math.random() * 7;
        this.colour = 'F7ED63';
        this.collidable = false;
        this.lifeTime = 600;
        this.alpha = 0.4;
    },
});

/**
 * Fire Particle
 * A vector fire particle
 * @constructor
 * @extends game.VectorCircleParticle
 */
game.FireParticle = game.VectorCircleParticle.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.Vector2d} direction
     * @param  {float} randX
     * @param  {float} randY
     * @return {void}
     */
    init: function (x, y, direction, randX, randY) {
        this.parent(x, y, direction, randX, randY);
        this.setVelocity(30, 1);
        this.gravity = -1;
        this.radius = this.getRandom(0.4, 1) * 7;
        this.colour = 'E89F00';
        this.collidable = false;
        this.lifeTime = 600;
        this.alpha = 0.4;
    },
});

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
        // call the constructor
        this.parent(x, y, settings);
        this.updateColRect(8, 60, -1, 0);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 30);

        // set the display to follow our position on one axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);

        this.anchorPoint.set(0.5, 1.0);
        this.bindKey("left", "left");
        this.bindKey("right", "right");
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        me.game.HUD.setItemValue("lives", this.currentLives);
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick * 35 / me.sys.fps;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick * 35 / me.sys.fps;
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
        me.game.HUD.updateItemValue("score", 250);

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
            me.game.HUD.updateItemValue("score", 150);
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

(function () {
    "use strict";
    var $_;
    var Visibility = function () {
        this.segments = new de.polygonal.ds.DLL();
        this.endpoints = new de.polygonal.ds.DLL();
        this.open = new de.polygonal.ds.DLL();
        this.center = { x: 0.0, y: 0.0 };
        this.output = new Array();
        this.demo_intersectionsDetected = [];
    };
    $hxExpose(Visibility, "Visibility");
    Visibility.__name__ = ["Visibility"];
    Visibility._endpoint_compare = function (a, b) {
        if (a.angle > b.angle) return 1;
        if (a.angle < b.angle) return -1;
        if (!a.begin && b.begin) return 1;
        if (a.begin && !b.begin) return -1;
        return 0;
    }
    Visibility.leftOf = function (s, p) {
        var cross = (s.p2.x - s.p1.x) * (p.y - s.p1.y) - (s.p2.y - s.p1.y) * (p.x - s.p1.x);
        return cross < 0;
    }
    Visibility.interpolate = function (p, q, f) {
        return { x: p.x * (1 - f) + q.x * f, y: p.y * (1 - f) + q.y * f };
    }
    Visibility.prototype = {
        loadEdgeOfMap: function (size, margin) {
            this.addSegment(margin, margin, margin, size - margin);
            this.addSegment(margin, size - margin, size - margin, size - margin);
            this.addSegment(size - margin, size - margin, size - margin, margin);
            this.addSegment(size - margin, margin, margin, margin);
        }
        , loadMap: function (size, margin, blocks, walls) {
            this.segments.clear(null);
            this.endpoints.clear(null);
            this.loadEdgeOfMap(size, margin);
            var _g = 0;
            while (_g < blocks.length) {
                var block = blocks[_g];
                ++_g;
                var x = block.x;
                var y = block.y;
                var r = block.r;
                this.addSegment(x - r, y - r, x - r, y + r);
                this.addSegment(x - r, y + r, x + r, y + r);
                this.addSegment(x + r, y + r, x + r, y - r);
                this.addSegment(x + r, y - r, x - r, y - r);
            }
            var _g = 0;
            while (_g < walls.length) {
                var wall = walls[_g];
                ++_g;
                this.addSegment(wall.p1.x, wall.p1.y, wall.p2.x, wall.p2.y);
            }
        }
        , addSegment: function (x1, y1, x2, y2) {
            var segment = null;
            var p1 = { begin: false, x: 0.0, y: 0.0, angle: 0.0, segment: segment, visualize: true };
            var p2 = { begin: false, x: 0.0, y: 0.0, angle: 0.0, segment: segment, visualize: false };
            segment = { p1: p1, p2: p2, d: 0.0 };
            p1.x = x1;
            p1.y = y1;
            p2.x = x2;
            p2.y = y2;
            p1.segment = segment;
            p2.segment = segment;
            segment.p1 = p1;
            segment.p2 = p2;
            this.segments.append(segment);
            this.endpoints.append(p1);
            this.endpoints.append(p2);
        }
        , setLightLocation: function (x, y) {
            this.center.x = x;
            this.center.y = y;
            var $it0 = this.segments.iterator();
            while ($it0.hasNext()) {
                var segment = $it0.next();
                var dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
                var dy = 0.5 * (segment.p1.y + segment.p2.y) - y;
                segment.d = dx * dx + dy * dy;
                segment.p1.angle = Math.atan2(segment.p1.y - y, segment.p1.x - x);
                segment.p2.angle = Math.atan2(segment.p2.y - y, segment.p2.x - x);
                var dAngle = segment.p2.angle - segment.p1.angle;
                if (dAngle <= -Math.PI) dAngle += 2 * Math.PI;
                if (dAngle > Math.PI) dAngle -= 2 * Math.PI;
                segment.p1.begin = dAngle > 0.0;
                segment.p2.begin = !segment.p1.begin;
            }
        }
        , _segment_in_front_of: function (a, b, relativeTo) {
            var A1 = Visibility.leftOf(a, Visibility.interpolate(b.p1, b.p2, 0.01));
            var A2 = Visibility.leftOf(a, Visibility.interpolate(b.p2, b.p1, 0.01));
            var A3 = Visibility.leftOf(a, relativeTo);
            var B1 = Visibility.leftOf(b, Visibility.interpolate(a.p1, a.p2, 0.01));
            var B2 = Visibility.leftOf(b, Visibility.interpolate(a.p2, a.p1, 0.01));
            var B3 = Visibility.leftOf(b, relativeTo);
            if (B1 == B2 && B2 != B3) return true;
            if (A1 == A2 && A2 == A3) return true;
            if (A1 == A2 && A2 != A3) return false;
            if (B1 == B2 && B2 == B3) return false;
            //this.demo_intersectionsDetected.push([a.p1, a.p2, b.p1, b.p2]);
            return false;
        }
        , sweep: function (maxAngle) {
            if (maxAngle == null) maxAngle = 999.0;
            this.output = [];
            //this.demo_intersectionsDetected = [];
            this.endpoints.sort(Visibility._endpoint_compare, true);
            this.open.clear(null);
            var beginAngle = 0.0;
            var _g = 0;
            while (_g < 2) {
                var pass = _g++;
                var $it0 = this.endpoints.iterator();
                while ($it0.hasNext()) {
                    var p = $it0.next();
                    if (pass == 1 && p.angle > maxAngle) break;
                    //if (!this.withinRenderRadius(p.x, p.y, 1000)) break;
                    var current_old = this.open._size == 0 ? null : this.open.head.val;
                    if (p.begin) {
                        var node = this.open.head;
                        while (node != null && this._segment_in_front_of(p.segment, node.val, this.center)) node = node.next;
                        if (node == null) this.open.append(p.segment); else this.open.insertBefore(node, p.segment);
                    } else {
                        this.open.remove(p.segment);
                    }

                    var current_new = this.open._size == 0 ? null : this.open.head.val;
                    if (current_old != current_new) {
                        if (pass == 1) this.addTriangle(beginAngle, p.angle, current_old);
                        beginAngle = p.angle;
                    }
                }
            }
        }

        , withinRenderRadius: function (x, y, radius) {
            var circle = Math.pow((x - this.center.x), 2) + Math.pow((y - this.center.y), 2);
            if (circle < Math.pow(radius, 2)) {
                return true;
            } else {
                return false;
            }
        }

        , lineIntersection: function (p1, p2, p3, p4) {
            var s = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
            return { x: p1.x + s * (p2.x - p1.x), y: p1.y + s * (p2.y - p1.y) };
        }
        , addTriangle: function (angle1, angle2, segment) {
            var p1 = this.center;
            var p2 = { x: this.center.x + Math.cos(angle1), y: this.center.y + Math.sin(angle1) };
            var p3 = { x: 0.0, y: 0.0 };
            var p4 = { x: 0.0, y: 0.0 };
            if (segment != null) {
                p3.x = segment.p1.x;
                p3.y = segment.p1.y;
                p4.x = segment.p2.x;
                p4.y = segment.p2.y;
            } else {
                // note: this code is unused in the current demo and
                // probably doesn't work the way you would want
                p3.x = this.center.x + Math.cos(angle1) * 500;
                p3.y = this.center.y + Math.sin(angle1) * 500;
                p4.x = this.center.x + Math.cos(angle2) * 500;
                p4.y = this.center.y + Math.sin(angle2) * 500;
            }
            var pBegin = this.lineIntersection(p3, p4, p1, p2);
            p2.x = this.center.x + Math.cos(angle2);
            p2.y = this.center.y + Math.sin(angle2);
            var pEnd = this.lineIntersection(p3, p4, p1, p2);
            this.output.push(pBegin);
            this.output.push(pEnd);
        }
        , __class__: Visibility
    }



    var de = {}
    de.polygonal = {}
    de.polygonal.ds = {}
    de.polygonal.ds.ArrayUtil = function () { }
    de.polygonal.ds.ArrayUtil.__name__ = ["de", "polygonal", "ds", "ArrayUtil"];
    de.polygonal.ds.ArrayUtil.alloc = function (x) {
        var a;
        a = new Array(x);
        return a;
    }
    de.polygonal.ds.ArrayUtil.prototype = {
        __class__: de.polygonal.ds.ArrayUtil
    }
    de.polygonal.ds.Cloneable = function () { }
    de.polygonal.ds.Cloneable.__name__ = ["de", "polygonal", "ds", "Cloneable"];
    de.polygonal.ds.Cloneable.prototype = {
        __class__: de.polygonal.ds.Cloneable
    }
    de.polygonal.ds.Hashable = function () { }
    de.polygonal.ds.Hashable.__name__ = ["de", "polygonal", "ds", "Hashable"];
    de.polygonal.ds.Hashable.prototype = {
        __class__: de.polygonal.ds.Hashable
    }
    de.polygonal.ds.Collection = function () { }
    de.polygonal.ds.Collection.__name__ = ["de", "polygonal", "ds", "Collection"];
    de.polygonal.ds.Collection.__interfaces__ = [de.polygonal.ds.Hashable];
    de.polygonal.ds.Collection.prototype = {
        __class__: de.polygonal.ds.Collection
    }
    de.polygonal.ds.DA = function (reservedSize, maxSize) {
        if (maxSize == null) maxSize = -1;
        if (reservedSize == null) reservedSize = 0;
        this._size = 0;
        this._iterator = null;
        this.maxSize = -1;
        if (reservedSize > 0) this._a = de.polygonal.ds.ArrayUtil.alloc(reservedSize); else this._a = new Array();
        this.key = de.polygonal.ds.HashKey._counter++;
        this.reuseIterator = false;
    };
    de.polygonal.ds.DA.__name__ = ["de", "polygonal", "ds", "DA"];
    de.polygonal.ds.DA.__interfaces__ = [de.polygonal.ds.Collection];
    de.polygonal.ds.DA.prototype = {
        set: function (i, x) {
            this._a[i] = x;
            if (i >= this._size) this._size++;
        }
        , pushBack: function (x) {
            this.set(this._size, x);
        }
        , removeAt: function (i) {
            var x = this._a[i];
            var k = this._size - 1;
            var p = i;
            while (p < k) this._a[p++] = this._a[p];
            this._size--;
            return x;
        }
        , free: function () {
            var NULL = null;
            var _g1 = 0, _g = this._a.length;
            while (_g1 < _g) {
                var i = _g1++;
                this._a[i] = NULL;
            }
            this._a = null;
            this._iterator = null;
        }
        , contains: function (x) {
            var found = false;
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                if (this._a[i] == x) {
                    found = true;
                    break;
                }
            }
            return found;
        }
        , remove: function (x) {
            if (this._size == 0) return false;
            var i = 0;
            var s = this._size;
            while (i < s) {
                if (this._a[i] == x) {
                    s--;
                    var p = i;
                    while (p < s) {
                        this._a[p] = this._a[p + 1];
                        ++p;
                    }
                    continue;
                }
                i++;
            }
            var found = this._size - s != 0;
            this._size = s;
            return found;
        }
        , clear: function (purge) {
            if (purge == null) purge = false;
            if (purge) {
                var NULL = null;
                var _g1 = 0, _g = this._a.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    this._a[i] = NULL;
                }
            }
            this._size = 0;
        }
        , iterator: function () {
            if (this.reuseIterator) {
                if (this._iterator == null) this._iterator = new de.polygonal.ds.DAIterator(this); else this._iterator.reset();
                return this._iterator;
            } else return new de.polygonal.ds.DAIterator(this);
        }
        , size: function () {
            return this._size;
        }
        , isEmpty: function () {
            return this._size == 0;
        }
        , toArray: function () {
            var a = de.polygonal.ds.ArrayUtil.alloc(this._size);
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                a[i] = this._a[i];
            }
            return a;
        }
        , toDA: function () {
            var a = new de.polygonal.ds.DA(this._size);
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                a.set(a._size, this._a[i]);
            }
            return a;
        }
        , clone: function (assign, copier) {
            if (assign == null) assign = true;
            var copy = new de.polygonal.ds.DA(this._size, this.maxSize);
            copy._size = this._size;
            if (assign) {
                var _g1 = 0, _g = this._size;
                while (_g1 < _g) {
                    var i = _g1++;
                    copy._a[i] = this._a[i];
                }
            } else if (copier == null) {
                var c = null;
                var _g1 = 0, _g = this._size;
                while (_g1 < _g) {
                    var i = _g1++;
                    c = this._a[i];
                    copy._a[i] = c.clone();
                }
            } else {
                var _g1 = 0, _g = this._size;
                while (_g1 < _g) {
                    var i = _g1++;
                    copy._a[i] = copier(this._a[i]);
                }
            }
            return copy;
        }
        , __get: function (i) {
            return this._a[i];
        }
        , __set: function (i, x) {
            this._a[i] = x;
        }
        , __cpy: function (i, j) {
            this._a[i] = this._a[j];
        }
        , __class__: de.polygonal.ds.DA
    }
    de.polygonal.ds.Itr = function () { }
    de.polygonal.ds.Itr.__name__ = ["de", "polygonal", "ds", "Itr"];
    de.polygonal.ds.Itr.prototype = {
        __class__: de.polygonal.ds.Itr
    }
    de.polygonal.ds.DAIterator = function (f) {
        this._f = f;
        {
            this._a = this._f._a;
            this._s = this._f._size;
            this._i = 0;
            this;
        }
    };
    de.polygonal.ds.DAIterator.__name__ = ["de", "polygonal", "ds", "DAIterator"];
    de.polygonal.ds.DAIterator.__interfaces__ = [de.polygonal.ds.Itr];
    de.polygonal.ds.DAIterator.prototype = {
        reset: function () {
            this._a = this._f._a;
            this._s = this._f._size;
            this._i = 0;
            return this;
        }
        , hasNext: function () {
            return this._i < this._s;
        }
        , next: function () {
            return this._a[this._i++];
        }
        , remove: function () {
            this._f.removeAt(--this._i);
            this._s--;
        }
        , __a: function (f) {
            return f._a;
        }
        , __size: function (f) {
            return f._size;
        }
        , __class__: de.polygonal.ds.DAIterator
    }
    de.polygonal.ds.DLL = function (reservedSize, maxSize) {
        if (maxSize == null) maxSize = -1;
        if (reservedSize == null) reservedSize = 0;
        this.maxSize = -1;
        this._reservedSize = reservedSize;
        this._size = 0;
        this._poolSize = 0;
        this._circular = false;
        this._iterator = null;
        if (reservedSize > 0) {
            var NULL = null;
            this._headPool = this._tailPool = new de.polygonal.ds.DLLNode(NULL, this);
        }
        this.head = this.tail = null;
        this.key = de.polygonal.ds.HashKey._counter++;
        this.reuseIterator = false;
    };
    de.polygonal.ds.DLL.__name__ = ["de", "polygonal", "ds", "DLL"];
    de.polygonal.ds.DLL.__interfaces__ = [de.polygonal.ds.Collection];
    de.polygonal.ds.DLL.prototype = {
        append: function (x) {
            var node = this._getNode(x);
            if (this.tail != null) {
                this.tail.next = node;
                node.prev = this.tail;
            } else this.head = node;
            this.tail = node;
            if (this._circular) {
                this.tail.next = this.head;
                this.head.prev = this.tail;
            }
            this._size++;
            return node;
        }
        , insertBefore: function (node, x) {
            var t = this._getNode(x);
            node._insertBefore(t);
            if (node == this.head) {
                this.head = t;
                if (this._circular) this.head.prev = this.tail;
            }
            this._size++;
            return t;
        }
        , unlink: function (node) {
            var hook = node.next;
            if (node == this.head) {
                this.head = this.head.next;
                if (this._circular) {
                    if (this.head == this.tail) this.head = null; else this.tail.next = this.head;
                }
                if (this.head == null) this.tail = null;
            } else if (node == this.tail) {
                this.tail = this.tail.prev;
                if (this._circular) this.head.prev = this.tail;
                if (this.tail == null) this.head = null;
            }
            node._unlink();
            this._putNode(node);
            this._size--;
            return hook;
        }
        , sort: function (compare, useInsertionSort) {
            if (useInsertionSort == null) useInsertionSort = false;
            if (this._size > 1) {
                if (this._circular) {
                    this.tail.next = null;
                    this.head.prev = null;
                }
                if (compare == null) this.head = useInsertionSort ? this._insertionSortComparable(this.head) : this._mergeSortComparable(this.head); else this.head = useInsertionSort ? this._insertionSort(this.head, compare) : this._mergeSort(this.head, compare);
                if (this._circular) {
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                }
            }
        }
        , free: function () {
            var NULL = null;
            var node = this.head;
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                var next = node.next;
                node.next = node.prev = null;
                node.val = NULL;
                node = next;
            }
            this.head = this.tail = null;
            var node1 = this._headPool;
            while (node1 != null) {
                var next = node1.next;
                node1.next = null;
                node1.val = NULL;
                node1 = next;
            }
            this._headPool = this._tailPool = null;
            this._iterator = null;
        }
        , contains: function (x) {
            var node = this.head;
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                if (node.val == x) return true;
                node = node.next;
            }
            return false;
        }
        , remove: function (x) {
            var s = this._size;
            if (s == 0) return false;
            var node = this.head;
            while (node != null) if (node.val == x) node = this.unlink(node); else node = node.next;
            return this._size < s;
        }
        , clear: function (purge) {
            if (purge == null) purge = false;
            if (purge || this._reservedSize > 0) {
                var node = this.head;
                var _g1 = 0, _g = this._size;
                while (_g1 < _g) {
                    var i = _g1++;
                    var next = node.next;
                    node.prev = null;
                    node.next = null;
                    this._putNode(node);
                    node = next;
                }
            }
            this.head = this.tail = null;
            this._size = 0;
        }
        , iterator: function () {
            if (this.reuseIterator) {
                if (this._iterator == null) {
                    if (this._circular) return new de.polygonal.ds.CircularDLLIterator(this); else return new de.polygonal.ds.DLLIterator(this);
                } else this._iterator.reset();
                return this._iterator;
            } else if (this._circular) return new de.polygonal.ds.CircularDLLIterator(this); else return new de.polygonal.ds.DLLIterator(this);
        }
        , size: function () {
            return this._size;
        }
        , isEmpty: function () {
            return this._size == 0;
        }
        , toArray: function () {
            var a = de.polygonal.ds.ArrayUtil.alloc(this._size);
            var node = this.head;
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                a[i] = node.val;
                node = node.next;
            }
            return a;
        }
        , toDA: function () {
            var a = new de.polygonal.ds.DA(this._size);
            var node = this.head;
            var _g1 = 0, _g = this._size;
            while (_g1 < _g) {
                var i = _g1++;
                a.set(a._size, node.val);
                node = node.next;
            }
            return a;
        }
        , clone: function (assign, copier) {
            if (assign == null) assign = true;
            if (this._size == 0) {
                var copy = new de.polygonal.ds.DLL(this._reservedSize, this.maxSize);
                if (this._circular) copy._circular = true;
                return copy;
            }
            var copy = new de.polygonal.ds.DLL();
            copy._size = this._size;
            if (assign) {
                var srcNode = this.head;
                var dstNode = copy.head = new de.polygonal.ds.DLLNode(this.head.val, copy);
                if (this._size == 1) {
                    copy.tail = copy.head;
                    if (this._circular) copy.tail.next = copy.head;
                    return copy;
                }
                var dstNode0;
                srcNode = srcNode.next;
                var _g1 = 1, _g = this._size - 1;
                while (_g1 < _g) {
                    var i = _g1++;
                    dstNode0 = dstNode;
                    var srcNode0 = srcNode;
                    dstNode = dstNode.next = new de.polygonal.ds.DLLNode(srcNode.val, copy);
                    dstNode.prev = dstNode0;
                    srcNode0 = srcNode;
                    srcNode = srcNode0.next;
                }
                dstNode0 = dstNode;
                copy.tail = dstNode.next = new de.polygonal.ds.DLLNode(srcNode.val, copy);
                copy.tail.prev = dstNode0;
            } else if (copier == null) {
                var srcNode = this.head;
                var c = this.head.val;
                var dstNode = copy.head = new de.polygonal.ds.DLLNode(c.clone(), copy);
                if (this._size == 1) {
                    copy.tail = copy.head;
                    if (this._circular) copy.tail.next = copy.head;
                    return copy;
                }
                var dstNode0;
                srcNode = srcNode.next;
                var _g1 = 1, _g = this._size - 1;
                while (_g1 < _g) {
                    var i = _g1++;
                    dstNode0 = dstNode;
                    var srcNode0 = srcNode;
                    c = srcNode.val;
                    dstNode = dstNode.next = new de.polygonal.ds.DLLNode(c.clone(), copy);
                    dstNode.prev = dstNode0;
                    srcNode0 = srcNode;
                    srcNode = srcNode0.next;
                }
                c = srcNode.val;
                dstNode0 = dstNode;
                copy.tail = dstNode.next = new de.polygonal.ds.DLLNode(c.clone(), copy);
                copy.tail.prev = dstNode0;
            } else {
                var srcNode = this.head;
                var dstNode = copy.head = new de.polygonal.ds.DLLNode(copier(this.head.val), copy);
                if (this._size == 1) {
                    copy.tail = copy.head;
                    if (this._circular) copy.tail.next = copy.head;
                    return copy;
                }
                var dstNode0;
                srcNode = srcNode.next;
                var _g1 = 1, _g = this._size - 1;
                while (_g1 < _g) {
                    var i = _g1++;
                    dstNode0 = dstNode;
                    var srcNode0 = srcNode;
                    dstNode = dstNode.next = new de.polygonal.ds.DLLNode(copier(srcNode.val), copy);
                    dstNode.prev = dstNode0;
                    srcNode0 = srcNode;
                    srcNode = srcNode0.next;
                }
                dstNode0 = dstNode;
                copy.tail = dstNode.next = new de.polygonal.ds.DLLNode(copier(srcNode.val), copy);
                copy.tail.prev = dstNode0;
            }
            if (this._circular) copy.tail.next = copy.head;
            return copy;
        }
        , _mergeSortComparable: function (node) {
            var h = node;
            var p, q, e, tail = null;
            var insize = 1;
            var nmerges, psize, qsize, i;
            while (true) {
                p = h;
                h = tail = null;
                nmerges = 0;
                while (p != null) {
                    nmerges++;
                    psize = 0;
                    q = p;
                    var _g = 0;
                    while (_g < insize) {
                        var i1 = _g++;
                        psize++;
                        q = q.next;
                        if (q == null) break;
                    }
                    qsize = insize;
                    while (psize > 0 || qsize > 0 && q != null) {
                        if (psize == 0) {
                            e = q;
                            q = q.next;
                            qsize--;
                        } else if (qsize == 0 || q == null) {
                            e = p;
                            p = p.next;
                            psize--;
                        } else if (p.val.compare(q.val) >= 0) {
                            e = p;
                            p = p.next;
                            psize--;
                        } else {
                            e = q;
                            q = q.next;
                            qsize--;
                        }
                        if (tail != null) tail.next = e; else h = e;
                        e.prev = tail;
                        tail = e;
                    }
                    p = q;
                }
                tail.next = null;
                if (nmerges <= 1) break;
                insize <<= 1;
            }
            h.prev = null;
            this.tail = tail;
            return h;
        }
        , _mergeSort: function (node, cmp) {
            var h = node;
            var p, q, e, tail = null;
            var insize = 1;
            var nmerges, psize, qsize, i;
            while (true) {
                p = h;
                h = tail = null;
                nmerges = 0;
                while (p != null) {
                    nmerges++;
                    psize = 0;
                    q = p;
                    var _g = 0;
                    while (_g < insize) {
                        var i1 = _g++;
                        psize++;
                        q = q.next;
                        if (q == null) break;
                    }
                    qsize = insize;
                    while (psize > 0 || qsize > 0 && q != null) {
                        if (psize == 0) {
                            e = q;
                            q = q.next;
                            qsize--;
                        } else if (qsize == 0 || q == null) {
                            e = p;
                            p = p.next;
                            psize--;
                        } else if (cmp(q.val, p.val) >= 0) {
                            e = p;
                            p = p.next;
                            psize--;
                        } else {
                            e = q;
                            q = q.next;
                            qsize--;
                        }
                        if (tail != null) tail.next = e; else h = e;
                        e.prev = tail;
                        tail = e;
                    }
                    p = q;
                }
                tail.next = null;
                if (nmerges <= 1) break;
                insize <<= 1;
            }
            h.prev = null;
            this.tail = tail;
            return h;
        }
        , _insertionSortComparable: function (node) {
            var h = node;
            var n = h.next;
            while (n != null) {
                var m = n.next;
                var p = n.prev;
                var v = n.val;
                if (p.val.compare(v) < 0) {
                    var i = p;
                    while (i.prev != null) if (i.prev.val.compare(v) < 0) i = i.prev; else break;
                    if (m != null) {
                        p.next = m;
                        m.prev = p;
                    } else {
                        p.next = null;
                        this.tail = p;
                    }
                    if (i == h) {
                        n.prev = null;
                        n.next = i;
                        i.prev = n;
                        h = n;
                    } else {
                        n.prev = i.prev;
                        i.prev.next = n;
                        n.next = i;
                        i.prev = n;
                    }
                }
                n = m;
            }
            return h;
        }
        , _insertionSort: function (node, cmp) {
            var h = node;
            var n = h.next;
            while (n != null) {
                var m = n.next;
                var p = n.prev;
                var v = n.val;
                if (cmp(v, p.val) < 0) {
                    var i = p;
                    while (i.prev != null) if (cmp(v, i.prev.val) < 0) i = i.prev; else break;
                    if (m != null) {
                        p.next = m;
                        m.prev = p;
                    } else {
                        p.next = null;
                        this.tail = p;
                    }
                    if (i == h) {
                        n.prev = null;
                        n.next = i;
                        i.prev = n;
                        h = n;
                    } else {
                        n.prev = i.prev;
                        i.prev.next = n;
                        n.next = i;
                        i.prev = n;
                    }
                }
                n = m;
            }
            return h;
        }
        , _valid: function (node) {
            return node != null;
        }
        , _getNode: function (x) {
            if (this._reservedSize == 0 || this._poolSize == 0) return new de.polygonal.ds.DLLNode(x, this); else {
                var n = this._headPool;
                this._headPool = this._headPool.next;
                this._poolSize--;
                n.next = null;
                n.val = x;
                return n;
            }
        }
        , _putNode: function (x) {
            var val = x.val;
            if (this._reservedSize > 0 && this._poolSize < this._reservedSize) {
                this._tailPool = this._tailPool.next = x;
                var NULL = null;
                x.val = NULL;
                this._poolSize++;
            } else x._list = null;
            return val;
        }
        , __insertBefore: function (f, x) {
            f._insertBefore(x);
        }
        , __unlink: function (f) {
            f._unlink();
        }
        , __list: function (f, x) {
            f._list = x;
        }
        , __class__: de.polygonal.ds.DLL
    }
    de.polygonal.ds.DLLIterator = function (f) {
        this._f = f;
        {
            this._walker = this._f.head;
            this._hook = null;
            this;
        }
    };
    de.polygonal.ds.DLLIterator.__name__ = ["de", "polygonal", "ds", "DLLIterator"];
    de.polygonal.ds.DLLIterator.__interfaces__ = [de.polygonal.ds.Itr];
    de.polygonal.ds.DLLIterator.prototype = {
        reset: function () {
            this._walker = this._f.head;
            this._hook = null;
            return this;
        }
        , hasNext: function () {
            return this._walker != null;
        }
        , next: function () {
            var x = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            return x;
        }
        , remove: function () {
            this._f.unlink(this._hook);
        }
        , __class__: de.polygonal.ds.DLLIterator
    }
    de.polygonal.ds.CircularDLLIterator = function (f) {
        this._f = f;
        {
            this._walker = this._f.head;
            this._s = this._f._size;
            this._i = 0;
            this._hook = null;
            this;
        }
    };
    de.polygonal.ds.CircularDLLIterator.__name__ = ["de", "polygonal", "ds", "CircularDLLIterator"];
    de.polygonal.ds.CircularDLLIterator.__interfaces__ = [de.polygonal.ds.Itr];
    de.polygonal.ds.CircularDLLIterator.prototype = {
        reset: function () {
            this._walker = this._f.head;
            this._s = this._f._size;
            this._i = 0;
            this._hook = null;
            return this;
        }
        , hasNext: function () {
            return this._i < this._s;
        }
        , next: function () {
            var x = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            this._i++;
            return x;
        }
        , remove: function () {
            this._f.unlink(this._hook);
            this._i--;
            this._s--;
        }
        , __class__: de.polygonal.ds.CircularDLLIterator
    }
    de.polygonal.ds.DLLNode = function (x, list) {
        this.val = x;
        this._list = list;
    };
    de.polygonal.ds.DLLNode.__name__ = ["de", "polygonal", "ds", "DLLNode"];
    de.polygonal.ds.DLLNode.prototype = {
        hasNext: function () {
            return this.next != null;
        }
        , hasPrev: function () {
            return this.prev != null;
        }
        , _unlink: function () {
            var t = this.next;
            if (this.prev != null) this.prev.next = this.next;
            if (this.next != null) this.next.prev = this.prev;
            this.next = this.prev = null;
            return t;
        }
        , _insertAfter: function (node) {
            node.next = this.next;
            node.prev = this;
            if (this.next != null) this.next.prev = node;
            this.next = node;
        }
        , _insertBefore: function (node) {
            node.next = this;
            node.prev = this.prev;
            if (this.prev != null) this.prev.next = node;
            this.prev = node;
        }
        , __class__: de.polygonal.ds.DLLNode
    }
    de.polygonal.ds.HashKey = function () { }
    de.polygonal.ds.HashKey.__name__ = ["de", "polygonal", "ds", "HashKey"];
    de.polygonal.ds.HashKey.next = function () {
        return de.polygonal.ds.HashKey._counter++;
    }
    de.polygonal.ds.HashKey.prototype = {
        __class__: de.polygonal.ds.HashKey
    }
    var js = {}
    js.Boot = function () { }
    js.Boot.__name__ = ["js", "Boot"];
    js.Boot.__string_rec = function (o, s) {
        if (o == null) return "null";
        if (s.length >= 5) return "<...>";
        var t = typeof (o);
        if (t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
        switch (t) {
            case "object":
                if (o instanceof Array) {
                    if (o.__enum__ != null) {
                        if (o.length == 2) return o[0];
                        var str = o[0] + "(";
                        s += "\t";
                        var _g1 = 2, _g = o.length;
                        while (_g1 < _g) {
                            var i = _g1++;
                            if (i != 2) str += "," + js.Boot.__string_rec(o[i], s); else str += js.Boot.__string_rec(o[i], s);
                        }
                        return str + ")";
                    }
                    var l = o.length;
                    var i;
                    var str = "[";
                    s += "\t";
                    var _g = 0;
                    while (_g < l) {
                        var i1 = _g++;
                        str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
                    }
                    str += "]";
                    return str;
                }
                var tostr;
                try {
                    tostr = o.toString;
                } catch (e) {
                    return "???";
                }
                if (tostr != null && tostr != Object.toString) {
                    var s2 = o.toString();
                    if (s2 != "[object Object]") return s2;
                }
                var k = null;
                var str = "{\n";
                s += "\t";
                var hasp = o.hasOwnProperty != null;
                for (var k in o) {;
                    if (hasp && !o.hasOwnProperty(k)) {
                        continue;
                    }
                    if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
                        continue;
                    }
                    if (str.length != 2) str += ", \n";
                    str += s + k + " : " + js.Boot.__string_rec(o[k], s);
                }
                s = s.substring(1);
                str += "\n" + s + "}";
                return str;
            case "function":
                return "<function>";
            case "string":
                return o;
            default:
                return String(o);
        }
    }
    js.Boot.__interfLoop = function (cc, cl) {
        if (cc == null) return false;
        if (cc == cl) return true;
        var intf = cc.__interfaces__;
        if (intf != null) {
            var _g1 = 0, _g = intf.length;
            while (_g1 < _g) {
                var i = _g1++;
                var i1 = intf[i];
                if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
            }
        }
        return js.Boot.__interfLoop(cc.__super__, cl);
    }
    js.Boot.__instanceof = function (o, cl) {
        try {
            if (o instanceof cl) {
                if (cl == Array) return o.__enum__ == null;
                return true;
            }
            if (js.Boot.__interfLoop(o.__class__, cl)) return true;
        } catch (e) {
            if (cl == null) return false;
        }
        switch (cl) {
            case Int:
                return Math.ceil(o % 2147483648.0) === o;
            case Float:
                return typeof (o) == "number";
            case Bool:
                return o === true || o === false;
            case String:
                return typeof (o) == "string";
            case Dynamic:
                return true;
            default:
                if (o == null) return false;
                return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
        }
    }
    js.Boot.__init = function () {
        Array.prototype.copy = Array.prototype.slice;
        Array.prototype.insert = function (i, x) {
            this.splice(i, 0, x);
        };
        Array.prototype.remove = Array.prototype.indexOf ? function (obj) {
            var idx = this.indexOf(obj);
            if (idx == -1) return false;
            this.splice(idx, 1);
            return true;
        } : function (obj) {
            var i = 0;
            var l = this.length;
            while (i < l) {
                if (this[i] == obj) {
                    this.splice(i, 1);
                    return true;
                }
                i++;
            }
            return false;
        };
        Array.prototype.iterator = function () {
            return {
                cur: 0, arr: this, hasNext: function () {
                    return this.cur < this.arr.length;
                }, next: function () {
                    return this.arr[this.cur++];
                }
            };
        };
        if (String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
        String.prototype.charCodeAt = function (i) {
            var x = this.cca(i);
            if (x != x) return undefined;
            return x;
        };
        var oldsub = String.prototype.substr;
        String.prototype.substr = function (pos, len) {
            if (pos != null && pos != 0 && len != null && len < 0) return "";
            if (len == null) len = this.length;
            if (pos < 0) {
                pos = this.length + pos;
                if (pos < 0) pos = 0;
            } else if (len < 0) len = this.length + len - pos;
            return oldsub.apply(this, [pos, len]);
        };
        Function.prototype["$bind"] = function (o) {
            var f = function () {
                return f.method.apply(f.scope, arguments);
            };
            f.scope = o;
            f.method = this;
            return f;
        };
    }
    js.Boot.prototype = {
        __class__: js.Boot
    }
    js.Boot.__res = {}
    js.Boot.__init();
    {
        Math.__name__ = ["Math"];
        Math.NaN = Number["NaN"];
        Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
        Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
        ;
        Math.isFinite = function (i) {
            return isFinite(i);
        };
        Math.isNaN = function (i) {
            return isNaN(i);
        };
    }
    {
        String.prototype.__class__ = String;
        String.__name__ = ["String"];
        Array.prototype.__class__ = Array;
        Array.__name__ = ["Array"];
        var Int = { __name__: ["Int"] };
        var Dynamic = { __name__: ["Dynamic"] };
        var Float = Number;
        Float.__name__ = ["Float"];
        var Bool = Boolean;
        Bool.__ename__ = ["Bool"];
        var Class = { __name__: ["Class"] };
        var Enum = {};
        var Void = { __ename__: ["Void"] };
    }
    de.polygonal.ds.HashKey._counter = 0;
    ;
    function $hxExpose(src, path) {
        var o = window;
        var parts = path.split(".");
        for (var ii = 0; ii < parts.length - 1; ++ii) {
            var p = parts[ii];
            if (typeof o[p] == "undefined") o[p] = {};
            o = o[p];
        }
        o[parts[parts.length - 1]] = src;
    }
})()

/**
 * Helper static class
 * @static
 */
function Helper() {
}

/**
 * Multiply two values together
 * @param  {float} val1
 * @param  {float} val2
 * @return {float}
 */
Helper.multiply = function (val1, val2) {
    return (val1 * val2);
}
/**
 * Get a random number
 * @param  {float} min minimum number range
 * @param  {float} max maximum number range
 * @return {float}     the random number
 */
Helper.getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Rotates a point at an origin given an angle
 * @param  {me.Vector2d} origin The point which will the point will turn agasint
 * @param  {me.Vector2d} point  The point to be turned
 * @param  {float} angle  The angle in radians
 * @return {me.Vector2d}        rotated point
 */
Helper.rotatePoint = function (origin, point, angle) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);

    // translate point back to origin:
    point.x -= this.pos.x;
    point.y -= this.pos.y;

    // rotate point
    var xnew = point.x * c - point.y * s;
    var ynew = point.x * s + point.y * c;

    // translate point back:
    point.x = xnew + origin.x;
    point.y = ynew + origin.y;
    return point;
}

/**
 * Find the angle between two points
 * @param  {me.Vector2d} point1 First point
 * @param  {me.Vector2d} point2 Second point
 * @return {float}        angle in degrees
 */
Helper.findAngle = function (point1, point2) {
    var deltaY = point2.y - point1.y;
    var deltaX = point2.x - point1.x;

    var angleInDegrees = Math.atan(deltaY / deltaX);

    if (deltaY < 0 && deltaX < 0) {
        angleInDegrees = angleInDegrees + Math.PI;
    }

    if (deltaY < 0 && deltaX > 0) {
        angleInDegrees = Math.abs(angleInDegrees + (Math.PI * 2));
    }

    if (deltaY > 0 && deltaX < 0) {
        angleInDegrees = Math.abs(angleInDegrees + (Math.PI));
    }

    /*if (deltaY > 0 && deltaX > 0) {
        angleInDegrees = angleInDegrees + (Math.PI * 2);
    }*/

    return angleInDegrees;
}

/**
 * Get the middle point of a set of points
 * @param  {me.Vector2d[]} points A set of points
 * @return {me.Vector2d}        the middle point
 */
Helper.getMiddlePoint = function (points) {
    var totalX = 0;
    var totalY = 0;
    for (var i = 0; i < points.length; i++) {
        totalX += points[i].x;
        totalY += points[i].y;
    }


    var middleX = totalX / points.length;
    var middleY = totalY / points.length;

    return new me.Vector2d(middleX, middleY);
}

/**
 * Returns the list of points from furthest to closest to the centre point given a set of points
 * @param  {me.Vector2d[]} points      set of points
 * @param  {me.Vector2d} centrePoint centre point of referance
 * @return {me.Vector2d[]}             a sorted list of points from furthest to closest
 */
Helper.findFurthestPoints = function (points, centrePoint) {
    var output = [];
    var highestDistance = 0;
    while (output.length != points.length) {
        for (var i = 0; i < points.length; i++) {
            var distance = centrePoint.distance(points[i]);
            if (distance >= highestDistance && !output.contains(points[i])) {
                highestDistance = distance;
                output.push(points[i]);
            }
        }
    }
    return output;
}

/**
 * A static class for lighting effects
 * @static
 */
function LightDrawEffects() {
}

/**
 * Candlefill effect for lights
 * @param {Context2d} context the context to be drawn on
 * @param {integer} x       x axis
 * @param {integer} y       y axis
 * @param {float} size    the size of the radius of the candle light
 * @param {integer} red     red colour in it
 * @param {integer} green   green colour in it
 * @param {integer} blue    blue colour in it
 */
LightDrawEffects.CandleFill = function (context, x, y, size, red, green, blue) {
    var grd = context.createRadialGradient(x, y, 0, x, y, Helper.getRandom(0.9, 1) * size);
    var intensity = Helper.getRandom(0.7, 1) * 0.5;
    red = (red) ? red : 237;
    blue = (blue) ? blue : 146;
    green = (green) ? green : 0;
    grd.addColorStop(0, "rgba(237,146,0," + intensity + ")");
    grd.addColorStop(1, "rgba(237,146,0,0)");
    //grd.addColorStop(0, "rgba(" + red + "," + blue + "," + green + "," + intensity + ")");
    //grd.addColorStop(1, "rgba(" + red + "," + blue + "," + 0 + ",0)");
    return grd;
}

/**
 * Light static class
 * @static
 */
function Light() {
}

/**
 * This function traces the level to form a polygons for Illuminated.js to work
 * @return {illuminated.PolygonObject[]} A list of polygons which traces out the level
 */
Light.TraceLevel = function () {
    this.boxes = [];
    this.points = [];
    var stageSegments = [];
    var collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
    for (var i = 0; i < collisionLayer.length; i++) {
        for (var j = 0; j < collisionLayer.length; j++) {
            if (collisionLayer[i][j]) {
                var box = collisionLayer[i][j];
                if (!_.contains(this.boxes, box)) {
                    Light.RecursivePointAdder(box, collisionLayer);
                    var stageSegment = new illuminated.PolygonObject();

                    this.points = Light.SortPoints(this.points);
                    this.points = Light.ReducePoints(this.points);
                    stageSegment.points = this.points;
                    //var stageSegment = new illuminated.PolygonObject([ new illuminated.Vec2(10, 10), new illuminated.Vec2(100, 100), new illuminated.Vec2(50, 50) ]);
                    stageSegments.push(stageSegment);
                    this.points = [];
                }
            }
        }
    }
    return stageSegments;
}

/**
 * Part of the level trace algorithm
 * It reduces the number of verticies to represent a polygon
 * @param {illuminated.Vec2[]} points points for polygon
 */
Light.ReducePoints = function (points) {
    var newPoints = [];
    var anchorPoint = points[0];
    newPoints.push(points[0]);
    var anchorDirection = new illuminated.Vec2(points[1].x - anchorPoint.x, points[1].y - anchorPoint.y).normalize();

    for (var i = 1; i < points.length; i++) {
        var testAnchorDirection = new illuminated.Vec2(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y).normalize();
        if (testAnchorDirection.x != anchorDirection.x && testAnchorDirection.y != anchorDirection.y) {
            anchorPoint = points[i - 1];
            anchorDirection = new illuminated.Vec2(points[i].x - anchorPoint.x, points[i].y - anchorPoint.y).normalize();
            newPoints.push(points[i - 1]);
        }
    }
    return newPoints;
}

/**
 * Part of the level trace algorithm
 * @param {illuminated.Vec2[]} points points for polygon
 */
Light.SortPoints = function (points) {
    //go clockwise
    var sortedPoints = [];
    var currentPoint = points[0];
    while (currentPoint != startPoint) {
        var startPoint = points[0];
        var pointNeighbours = Light.FindNeighbourPoints(points, currentPoint);
        for (var j = 0; j < pointNeighbours.length; j++) {
            var valid = Light.ValidPoint(points, currentPoint, pointNeighbours[j]);
            if (valid) {
                sortedPoints.push(currentPoint);
                currentPoint = pointNeighbours[j];
            }
        }
    }
    return sortedPoints;
}

/**
 * Checks if the point is a valid point for the polygon
 * @param {illuminated.Vec2[]} points the polygon point list
 * @param {illuminated.Vec2} point1 first point
 * @param {illuminated.Vec2} point2 second point
 */
Light.ValidPoint = function (points, point1, point2) {
    var normalisedPointVector = new illuminated.Vec2(point2.x - point1.x, point2.y - point1.y).normalize();


    if (normalisedPointVector.x == 1 && normalisedPointVector.y == 0) { //going east
        var box1 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth, point1.y / me.game.currentLevel.tileheight);
        var box2 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth, (point1.y / me.game.currentLevel.tileheight) - 1);
    }

    if (normalisedPointVector.x == 0 && normalisedPointVector.y == -1) { //going north
        var box1 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth, (point1.y / me.game.currentLevel.tileheight) - 1);
        var box2 = Light.GetBox((point1.x / me.game.currentLevel.tilewidth) - 1, (point1.y / me.game.currentLevel.tileheight) - 1);

    }

    if (normalisedPointVector.x == 0 && normalisedPointVector.y == 1) { //going south
        var box1 = Light.GetBox((point1.x / me.game.currentLevel.tilewidth) - 1, point1.y / me.game.currentLevel.tileheight);
        var box2 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth, point1.y / me.game.currentLevel.tileheight);

    }

    if (normalisedPointVector.x == -1 && normalisedPointVector.y == 0) { //going west
        var box1 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth - 1, point1.y / me.game.currentLevel.tileheight - 1);
        var box2 = Light.GetBox(point1.x / me.game.currentLevel.tilewidth - 1, (point1.y / me.game.currentLevel.tileheight));
    }
    if (box1 && !box2) {
        return true;
    } else {
        return false;
    }
}

/**
 * Gets the collision box given the tile coordinates
 * @param {integer} x tile coordinate x
 * @param {integer} y tile coordinate y
 */
Light.GetBox = function (x, y) {
    var collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
    return collisionLayer[x][y];
}

/**
 * Part of the level trace algorithm
 * @param {illuminated.Rectangle} box  a collision box
 * @param {collisionLayer} grid [description]
 */
Light.RecursivePointAdder = function (box, grid) {
    if (_.contains(this.boxes, box)) return;
    var neighbours = Light.FreeNeighbors(grid, box);
    for (var i = 0; i < neighbours.length; i++) {
        if (neighbours[i] == 0) {
            this.points = Light.AddPoint(this.points, box.left, box.top);
            this.points = Light.AddPoint(this.points, box.right, box.top);
        }
        if (neighbours[i] == 1) {
            this.points = Light.AddPoint(this.points, box.right, box.top);
            this.points = Light.AddPoint(this.points, box.right, box.bottom);
        }
        if (neighbours[i] == 2) {
            this.points = Light.AddPoint(this.points, box.left, box.bottom);
            this.points = Light.AddPoint(this.points, box.right, box.bottom);
        }
        if (neighbours[i] == 3) {
            this.points = Light.AddPoint(this.points, box.left, box.top);
            this.points = Light.AddPoint(this.points, box.left, box.bottom);
        }
    }
    this.boxes.push(box);
    var neighbours = Light.Neighbors(grid, box);
    //if (neighbours.length == 1) {
    //    return;
    //}
    for (var i = 0; i < neighbours.length; i++) {
        Light.RecursivePointAdder(neighbours[i], grid);
    }
}

/**
 * Add a point to the points array
 * @param {illuminated.Vec2} points points array
 * @param {integer} x      x coordinate
 * @param {integer} y      y coordinate
 * @return {illuminated.Vec2[]} the appended list of points
 */
Light.AddPoint = function (points, x, y) {
    for (var i = 0; i < points.length; i++) {
        if (points[i].x == x && points[i].y == y) {
            return points;
        }
    }
    var point = new illuminated.Vec2(x, y);
    points.push(point);
    return points;
}

/**
 * Find neighbour points
 * @param {illuminated.Vec2[]} points The total number of points
 * @param {illuminated.Vec2} point  the point in question
 * @return {integer} integer specifying the direction
 */
Light.FindNeighbourPoints = function (points, point) {
    var ret = [];
    var west = Light.GetPointFromPoints(points, point, -1, 0);
    var east = Light.GetPointFromPoints(points, point, 1, 0);
    var north = Light.GetPointFromPoints(points, point, 0, -1);
    var south = Light.GetPointFromPoints(points, point, 0, 1);
    if (west) {
        ret.push(west);
    }
    if (east) {
        ret.push(east);
    }

    if (north) {
        ret.push(north);
    }

    if (south) {
        ret.push(south);
    }

    return ret;
}

/**
 * Get a point from a set of points and a point offsetted by x and y
 * @param {illuminated.Vec2[]} points  the array of points
 * @param {illuminated.Vec2} point   the point in question
 * @param {integer} xOffset how much is it offset by in the x-axis
 * @param {integer} yOffset how much is it offset by in the y-axis
 * @return {illuminated.Vec2} the point 
 */
Light.GetPointFromPoints = function (points, point, xOffset, yOffset) {
    var ret;
    var pointInQuestion = new illuminated.Vec2(point.x + (xOffset * me.game.currentLevel.tilewidth), point.y + (yOffset * me.game.currentLevel.tileheight));
    for (var i = 0; i < points.length; i++) {
        if (points[i].x == pointInQuestion.x & points[i].y == pointInQuestion.y) {
            ret = points[i];
            return ret;
        }
    }
    return null;
}

/**
 * Find spaces in a grid which are avaliable
 * @param {collisionlayer} grid the collision layer in question
 * @param {Node} node point in the collision layer
 */
Light.FreeNeighbors = function (grid, node) {
    var ret = [0, 1, 2, 3];
    var y = node.row;
    var x = node.col;

    if (grid[x - 1] && grid[x - 1][y]) {        // West
        ret = _.without(ret, 3);
    }

    if (grid[x + 1] && grid[x + 1][y]) {        // East
        ret = _.without(ret, 1);
    }

    if (grid[x] && grid[x][y + 1]) {        // South
        ret = _.without(ret, 2);
    }

    if (grid[x] && grid[x][y - 1]) {        // North
        ret = _.without(ret, 0);
    }
    return ret;
}

/**
 * Find the neighbours in a grid
 * @param {collisionlayer} grid the collision layer in question
 * @param {Node} node point in the collision layer
 */
Light.Neighbors = function (grid, node) {
    var ret = [];
    var y = node.row;
    var x = node.col;

    if (grid[x - 1] && grid[x - 1][y]) {        // West
        ret.push(grid[x - 1][y]);
    }

    if (grid[x + 1] && grid[x + 1][y]) {        // East
        ret.push(grid[x + 1][y]);
    }

    if (grid[x] && grid[x][y - 1]) {        // North
        ret.push(grid[x][y - 1]);
    }

    if (grid[x] && grid[x][y + 1]) {        // South
        ret.push(grid[x][y + 1]);
    }
    return ret;
}

/**
 * Static class for the ray casting light mechanics
 * @static
 */
function Visible() {
}

/**
 * Checks if two points can see each other
 * @param {me.Vector2d} point1 first point
 * @param {me.Vector2d} point2 second point
 * @return {boolean} true if can see, false if cant
 */
Visible.TwoPointsCanSee = function (point1, point2) {
    var obj = me.game.currentLevel.getLayerByName("collision").lightCollisionBoxes;

    for (var i = 0; i < obj.length; i++) {
        var segments = Visible.GetSegments(obj[i].points);
        for (var i = 0; i < segments.length; i++) {
            var intersect = Visible.CheckIntersection(segments[i].point1, segments[i].point2, point1, point2);
            if (intersect) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Finds the direction of the change in slope between the two edges described by the three points. Used in Checking intersection
 * @param {me.Vector2d} p1 first point
 * @param {me.Vector2d} p2 second point
 * @param {me.Vector2d} p3 third point
 * @return {boolean}
 */
Visible.CCW = function (p1, p2, p3) {
    a = p1.y; b = p1.x;
    c = p2.y; d = p2.x;
    e = p3.y; f = p3.x;
    return (f - b) * (c - a) > (d - b) * (e - a);
}

/**
 * Check if two lines intersect specified by 4 points
 * @param {me.Vector2d} p1 point1
 * @param {me.Vector2d} p2 point2
 * @param {me.Vector2d} p3 point3
 * @param {me.Vector2d} p4 point4
 * @return {boolean} true if intersect, false if not
 */
Visible.CheckIntersection = function (p1, p2, p3, p4) {
    return (Visible.CCW(p1, p3, p4) != Visible.CCW(p2, p3, p4)) && (Visible.CCW(p1, p2, p3) != Visible.CCW(p1, p2, p4));
}

/**
 * Get segments from a set of points
 * @param {me.Vector2d[]} points point array
 * @return {Object[]} the segments
 */
Visible.GetSegments = function (points) {
    var segments = [];
    for (var i = 0; i < points.length; i++) {
        var segment = new Object();
        segment.point1 = points[i];
        if (points[i + 1]) {
            segment.point2 = points[i + 1];
        } else {
            segment.point2 = points[0];
        }
        segments.push(segment);
    }
    return segments;
}

/**
 * AStar path finding static class
 * @static
 */
function AStar() {
}

/**
 * Create an AStar grid
 * @return {object} a 2d array of nodes
 */
AStar.createGrid = function () {
    var collisionLayer = me.game.currentLevel.getLayerByName("collision");
    var layerData = collisionLayer.layerData;
    var grid = [];
    for (var x = 0; x < layerData.length; x++) {
        grid[x] = [];
        for (var y = 0; y < layerData[x].length; y++) {
            var node = new AStar.GraphNode(x, y);
            node.f = 0;
            node.g = 0;
            node.h = 0;
            if (layerData[x][y] != null) {
                node.type = 1;
                node.cost = 1;
            } else {
                node.type = 0;
                node.cost = 0;
            }
            node.visited = false;
            node.closed = false;
            node.parent = null;
            grid[x][y] = node;
        }
    }
    return grid;
}

/**
 * Create a new BinaryHeap data structure
 * @return {BinaryHeap} binary heap data structure
 */
AStar.heap = function () {
    return new BinaryHeap(function (node) {
        return node.f;
    });
}

/**
 * Find a path between two points
 * @param  {me.Vector2d} startCoord start coordinate
 * @param  {me.Vector2d} endCoord   end coordinate
 * @param  {boolean} diagonal   is diagonal traveral possible?
 * @param  {AStar.heuristic} heuristic  Heuristic used for the path finding
 * @return {AStar.GraphNode[]}            list of nodes outlining a path
 */
AStar.search = function (startCoord, endCoord, diagonal, heuristic) {
    var grid = this.createGrid();
    var start = grid[startCoord.x][startCoord.y];
    var end = grid[endCoord.x][endCoord.y];
    heuristic = heuristic || this.manhattan;
    diagonal = !!diagonal;

    var openHeap = this.heap();

    openHeap.push(start);

    while (openHeap.size() > 0) {
        var currentNode = openHeap.pop();             // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        if (currentNode === end) {            // End case -- result has been found, return the traced path.
            var curr = currentNode;
            var ret = [];
            while (curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
        var neighbors = this.neighbors(grid, currentNode, diagonal);

        for (var i = 0, il = neighbors.length; i < il; i++) {
            var neighbor = neighbors[i];

            if (neighbor.closed || neighbor.isWall()) {
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = currentNode.g + neighbor.cost;
            var beenVisited = neighbor.visited;

            if (!beenVisited || gScore < neighbor.g) {
                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;

                if (!beenVisited) {
                    openHeap.push(neighbor);                        // Pushing to heap will put it in proper place based on the 'f' value.
                }
                else {
                    openHeap.rescoreElement(neighbor);                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                }
            }
        }
    }
    return [];
},

/**
 * Manhattan heuristic
 * @param  {me.Vector2d} pos0 first point
 * @param  {me.Vector2d} pos1 second point
 * @return {integer}      the heuristic value
 */
AStar.manhattan = function (pos0, pos1) {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
}

/**
 * Find neighbours of a node
 * @param  {AStar.GraphNode} grid      the grid of the map
 * @param  {AStar.GraphNode} node      the node in question
 * @param  {boolean} diagonals Allow for diagonals
 * @return {AStar.GraphNode}           neighbour nodes
 */
AStar.neighbors = function (grid, node, diagonals) {
    var ret = [];
    var x = node.x;
    var y = node.y;

    if (grid[x - 1] && grid[x - 1][y]) {        // West
        ret.push(grid[x - 1][y]);
    }

    if (grid[x + 1] && grid[x + 1][y]) {        // East
        ret.push(grid[x + 1][y]);
    }

    if (grid[x] && grid[x][y - 1]) {        // South
        ret.push(grid[x][y - 1]);
    }

    if (grid[x] && grid[x][y + 1]) {        // North
        ret.push(grid[x][y + 1]);
    }

    if (diagonals) {
        if (grid[x - 1] && grid[x - 1][y - 1]) {            // Southwest
            ret.push(grid[x - 1][y - 1]);
        }

        if (grid[x + 1] && grid[x + 1][y - 1]) {            // Southeast
            ret.push(grid[x + 1][y - 1]);
        }

        if (grid[x - 1] && grid[x - 1][y + 1]) {            // Northwest
            ret.push(grid[x - 1][y + 1]);
        }

        if (grid[x + 1] && grid[x + 1][y + 1]) {            // Northeast
            ret.push(grid[x + 1][y + 1]);
        }
    }
    return ret;
}

/**
 * A Graph node representing a point on the path finding graph
 * @constructor
 * @extends Object
 */
AStar.GraphNode = Object.extend({
    /**
     * Initialise the object
     * @param  {integer} x    the x position
     * @param  {integer} y    the y position
     * @param  {integer} type 0 for noWall, 1 for wall
     */
    init: function (x, y, type) {
        this.data = {};
        this.x = x;
        this.y = y;
        this.pos = { x: x * me.game.currentLevel.tilewidth, y: y * me.game.currentLevel.tilewidth };
        this.type = type; //1 = wall 0 = noWall
        this.cost;
        this.wait = 0;
    },

    /**
     * toString representation of the object
     * @return {string} the string representation
     */
    toString: function () {
        return "[" + this.x + " " + this.y + "]";
    },

    /**
     * Returns if this node is a wall or not
     * @return {Boolean} is it a wall
     */
    isWall: function () {
        if (this.type == 1) {
            return true;
        } else {
            return false;
        }
    },
});

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * @fileOverview Entities for top down view games
 * @author Dolan Miu</a>
 * @version 1.0;
 */

/**
 * Top Down Player Entity
 * Default top down player
 * @constructor
 * @extends me.MainPlayer
 */
game.TopDownPlayerEntity = game.MainPlayer.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
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

    /**
     * Update object
     * @return {void}
     */
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

    /**
     * Draw object
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        //this.light.draw(context);
        this.parent(context);
    }
});

/**
 * Path used for A-Star algorithm
 * @extends me.ObjectEntity
 */
game.AStarPath = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.id = settings.id;
        this.points = settings.points;
        var waitFull = [];
        this.wait = [];
        if (settings.wait != null) {
            waitFull = settings.wait.split(',');
        }
        for (var i = 0 ; i < waitFull.length; i++) {
            var times = waitFull[i].trim().split(' ');
            for (var j = 0; j < times.length; j++) {
                times[j] = +times[j];
            }
            this.wait.push(times);
        }
        this.parent(x, y, settings);
    },
    /**
     * Returns the absolute points from the relative points of the path polygon
     * @return {me.Vector2d[]}
     */
    getAbsolutePoints: function () {
        var absPoints = [];
        for (var i = 0; i < this.points.length; i++) {
            var point = { x: this.points[i].x + this.pos.x, y: this.points[i].y + this.pos.y };
            absPoints.push(point);
        }
        return absPoints;
    },

    /**
     * Get the tile coordiantes from world coordinates
     * @param  {me.Vector2d} point
     * @return {me.Vector2d}
     */
    getTileCoordinate: function (point) {
        return new me.Vector2d(Math.round(this.getAbsolutePoints()[point].x / me.game.currentLevel.tilewidth), Math.round(this.getAbsolutePoints()[point].y / me.game.currentLevel.tileheight));
    },

    /**
     * Get wait time from index
     * Each path may have points which have a wait time associated with it. Analogous to red lights on a road 
     * @param  {integer} index
     * @return {integer}
     */
    getWaitTimeFromIndex: function (index) {
        for (var i = 0; i < this.wait.length; i++) {
            if (this.wait[i][0] == index) {
                return this.wait[i][1];
            }
        }
        return 0;
    },
});

/**
 * An entity for top down games
 * @extends me.ObjectEntity
 */
game.TopDownEntity = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.gravity = 0;
        this.id = settings.id;
        this.parent(x, y, settings);
    },
});

/**
 * Stealth Enemy in top down games
 * @extends me.TopDownEntity
 */
game.TopDownEnemy = game.TopDownEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        if (settings.speed == null) {
            this.speed = 200;
        } else {
            this.speed = 1 / settings.speed * 1000;
        }

        this.faceDirection = 0;
        this.parent(x, y, settings);
        this.timer = me.timer.getTime();

        this.STATES = {
            SUSPICIOUS: { value: 0, name: "Suspicious", colour: "235,204,68" },
            NEUTRAL: { value: 1, name: "Neutral", colour: "152,212,23" },
            ALERTED: { value: 2, name: "Alerted", colour: "224,27,27" }
        };

        this.state = this.STATES.NEUTRAL;

        var settings = [];
        settings.angle = 0.8;
        settings.roughness = 0.9;
        this.light = new game.DynamicLight(x, y, settings);
        if (me.game.getEntityByName("MiniMap")[0]) {
            var miniMap = me.game.getEntityByName("MiniMap")[0];
            miniMap.addEntity(this);
        }

    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        if (this.points == null) {
            this.points = this.createPointsFromPath();
            this.pathIndex = 0;
            this.moveWithPath();
        }

        if (me.timer.getTime() >= this.timer + 300) {
            //this.light.updateLightPos(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
            var canSee = Visible.TwoPointsCanSee(this.pos, me.game.playerPos);
            
            var withinAlertRadius = Math.pow(me.game.playerPos.x - this.pos.x, 2) + Math.pow(me.game.playerPos.y - this.pos.y, 2) < Math.pow(300, 2);
            var withinSuspiciousRadius = Math.pow(me.game.playerPos.x - this.pos.x, 2) + Math.pow(me.game.playerPos.y - this.pos.y, 2) < Math.pow(600, 2);

            this.angleOK = this.angleWithinRange(this.faceDirection, Math.PI / 2, this.pos, me.game.playerPos);
            if (canSee && this.state == this.STATES.NEUTRAL && withinSuspiciousRadius && this.angleOK) {
                this.spottedPlayerPos = new me.Vector2d(me.game.playerPos.x, me.game.playerPos.y);
                this.state = this.STATES.SUSPICIOUS;
            }

            if (canSee && withinAlertRadius && this.angleOK) {
                this.state = this.STATES.ALERTED;
                this.spottedPlayerPos = new me.Vector2d(me.game.playerPos.x, me.game.playerPos.y);
            }

            if ((this.state == this.STATES.ALERTED && !withinSuspiciousRadius) || (this.state == this.STATES.ALERTED && !canSee)) {
                this.state = this.STATES.NEUTRAL;
            }
            this.timer = me.timer.getTime();
        }
        this.parent();

        var faceVector = new me.Vector2d(Math.cos(this.faceDirection), Math.sin(this.faceDirection));
        this.light.angle = -this.faceDirection;
        this.light.update(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    },

    /**
     * Find the angle in which it can see
     * @param  {float} direction
     * @param  {float} dRange
     * @param  {me.Vector2d} point1
     * @param  {me.Vector2d} point2
     * @return {void}
     */
    angleWithinRange: function (direction, dRange, point1, point2) {
        var range = dRange / 2;
        var angle = Helper.findAngle(point1, point2);
        var innerRange = direction - range;
        var outerRange = direction + range;

        if (direction == Math.PI * 2) {
            if (angle >= 0 && angle < range) {
                return true;
            }
        }

        if (angle > innerRange  && angle < outerRange) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Draw the enemy
     * @param  {Context2d} context
     * @return {void}
     */
    draw: function (context) {
        context.save();
        this.light.draw(context);
        if (Visible.TwoPointsCanSee(this.pos, me.game.playerPos) && this.angleOK) {
        //if (this.angleOK) {
            context.beginPath();
            context.moveTo(this.pos.x, this.pos.y);
            context.lineTo(me.game.playerPos.x, me.game.playerPos.y);
            context.stroke();
        }
        context.restore();
        this.parent(context);
    },

    /**
     * Creates points from the path
     * @return {me.Vector2d[]}
     */
    createPointsFromPath: function () {
        var path = this.findPath();
        var points = [];
        for (var i = 0; i < path.points.length - 1; i++) {
            points = this.createPathPointList(path, points, i, i + 1);
        }
        points = this.createPathPointList(path, points, path.points.length - 1, 0);
        return points;
    },

    /**
     * Create path points from list
     * @param  {game.AStarPath} path
     * @param  {me.Vector2d[]} points
     * @param  {integer} index
     * @param  {integer} index2
     * @return {me.Vector2d[]} the point list
     */
    createPathPointList: function (path, points, index, index2) {
        var startVec = path.getTileCoordinate(index);
        var destVec = path.getTileCoordinate(index2);
        var point = AStar.search(startVec, destVec);

        var waitTime = path.getWaitTimeFromIndex(index);
        point[0].wait = waitTime;
        points = points.concat(point);
        return points;
    },

    /**
     * Finds the associated path for the enemy
     * @return {AStarPath}
     */
    findPath: function () {
        var paths = me.game.getEntityByName("AStarPath");
        var path;
        for (var i = 0; i < paths.length; i++) {
            if (paths[i].id == this.id) {
                path = paths[i];
            }
        }
        return path;
    },

    /**
     * Moves the enemy with the path
     * @return {void}
     */
    moveWithPath: function () {
        if (this.state == this.STATES.SUSPICIOUS) {
            var completed = this.goToPoint(this.spottedPlayerPos, 300);
            if (completed) {
                this.state = this.STATES.NEUTRAL;
                this.moveWithPath();
            }
        }

        if (this.state == this.STATES.NEUTRAL) {
            var currentTile = new me.Vector2d(this.pos.x / me.game.currentLevel.tilewidth, this.pos.y / me.game.currentLevel.tileheight).floor();
            if (currentTile.x != this.points[this.pathIndex].x || currentTile.y != this.points[this.pathIndex].y) {
                this.goToPoint(this.points[this.pathIndex].pos, 500);
            } else {
                if (this.pathIndex > this.points.length - 2) {
                    this.pathIndex = 0;
                } else {
                    this.pathIndex++
                }

                var tween = new me.Tween(this.pos).to(this.points[this.pathIndex].pos, this.speed).onComplete(this.moveWithPath.bind(this));
                this.faceDirection = this.setFaceDirection(this.pos, this.points[this.pathIndex].pos);
                tween.delay(this.points[this.pathIndex].wait);
                tween.start();
            }
        }

        if (this.state == this.STATES.ALERTED) {
            var completed = this.goToPoint(this.spottedPlayerPos, 500);
            if (completed) {
                var f = 0;
            }
        }
    },

    /**
     * Moves/Tweens enemy to a given point given the speed and a delay
     * @param  {me.Vector2d} point
     * @param  {float} speed
     * @param  {float} delay
     * @return {void}
     */
    goToPoint: function(point, speed, delay) {
        var startVec = new me.Vector2d(this.pos.x / me.game.currentLevel.tilewidth, this.pos.y / me.game.currentLevel.tileheight).floor();
        var destVec = new me.Vector2d(point.x / me.game.currentLevel.tilewidth, point.y / me.game.currentLevel.tileheight).floor();
        var points = AStar.search(startVec, destVec);
        if (points.length == 0) return true;
        var tween = new me.Tween(this.pos).to(points[0].pos, speed).onComplete(this.moveWithPath.bind(this));
        this.faceDirection = this.setFaceDirection(this.pos, points[0].pos);
        if (delay == null) delay = 0;
        tween.delay(delay);
        tween.start();
    },

    /**
     * Set the direction the enemy is facing
     * @param {me.Vector2d} position1
     * @param {me.Vector2d} position2
     * @return {float} the direction in radians
     */
    setFaceDirection: function (position1, position2) {
        var direction = 0;
        if (position1.y - position2.y < 0) {
            direction = Math.PI / 2;
        } else if (position1.y - position2.y > 0) {
            direction = Math.PI * 3 / 2;
        } else if (position1.x - position2.x < 0) {
            direction = Math.PI * 2;
        } else if (position1.x - position2.x > 0) {
            direction = Math.PI;
        }
        return direction;
    }
});

/**
 * Water rectangle
 * It creates a nice watery effect with built in physics and interaction
 * @constructor
 * @extends me.ObjectEntity
 */
game.Water = me.ObjectEntity.extend({
    /**
     * Initialise object
     * @param  {integer} x
     * @param  {integer} y
     * @param  {me.ObjectSettings} settings
     * @return {void}
     */
    init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.columns = [];
        this.Dampening = 0.025;
        this.Tension = 0.025;
        this.Spread = 0.25;
        this.WaveHeightStart = 0;
        this.type = me.game.WATER;
        this.amountofColumns = Math.round(this.width / 9);

        for (var i = 0; i < this.amountofColumns; i++) {
            this.columns[i] = new this.column();
            this.columns[i].Height = this.WaveHeightStart;
            this.columns[i].TargetHeight = this.WaveHeightStart;
            this.columns[i].Speed = 0;
        }
        //this.splash(40, 10);
    },

    /**
     * Update object
     * @return {void}
     */
    update: function () {
        this.doWave();
        var res = me.game.collide(this);
        if (res) {
            switch (res.obj.type) {
                case "mainPlayer": {
                    this.inWater = true;
                    break;
                }
                default: {
                    break;
                }
            }
            
        } else {
            this.inWater = false;
        }
        /*if (res) {
            if (res.obj.type == "mainPlayer") {
                this.inWater = true;
            } 
        }*/
    },

    /**
     * Collision event for the water
     * @param  {me.Vector2d} res
     * @param  {me.ObjectEntity} obj
     * @return {void}
     */
    onCollision: function (res, obj) {
        var position = obj.pos.x - this.pos.x;
        if (obj.vel.length() != 0 && position > 0) {
            var columnNumber = position / this.width * this.amountofColumns;
            this.splash(Math.round(columnNumber), obj.vel.length());
        }

        var splashParticles = 10;
        var v = obj.vel.length();
        if (!this.inWater && obj.vel.length() > 4 && obj.type == "mainPlayer") {
            for (var i = 0; i < splashParticles; i++) {
                var droplet = new game.WaterParticle(obj.pos.x + obj.width / 2, this.pos.y, new me.Vector2d(5, -obj.vel.length() / 2), new me.Vector2d(-0.5, 0.5), new me.Vector2d(0.5, 1));
                me.game.add(droplet, this.z);
                me.game.sort();
            }
        }
    },

    /** 
     * Draw method for water
     * @param  {Context2d} context
     * @param  {integer} x
     * @param  {integer} y
     * @return {void}
     */
    draw: function (context, x, y) {
        this.drawWave(context, 0);
        this.parent(context, x, y);
    },

    /**
     * Disturb the water by creating splash waves
     * @param  {integer} index the column number
     * @param  {float} speed
     * @return {void}
     */
    splash: function (index, speed) {
        if (index >= 0 && index < this.columns.length) {
            this.columns[index].Speed = speed / 2;
        }
    },

    /**
     * Calculate the water waves
     * @param  {event} e
     * @return {void}
     */
    doWave: function (e) {

        var i;
        for (i = 0; i < this.columns.length; i++) {
            this.columns[i].Update(this.Dampening, this.Tension);
        }

        var leftDeltas = new Array(this.columns.length);
        var rightDeltas = new Array(this.columns.length);

        for (var j = 0; j < 1; j++) {
            for (i = 0; i < this.columns.length; i++) {
                if (i > 0) {
                    leftDeltas[i] = this.Spread * (this.columns[i].Height - this.columns[i - 1].Height);
                    this.columns[i - 1].Speed += leftDeltas[i];
                }
                if (i < this.columns.length - 1) {
                    rightDeltas[i] = this.Spread * (this.columns[i].Height - this.columns[i + 1].Height);
                    this.columns[i + 1].Speed += rightDeltas[i];
                }
            }

            for (i = 0; i < this.columns.length; i++) {
                if (i > 0) {
                    this.columns[i - 1].Height += leftDeltas[i];
                }
                if (i < this.columns.Length - 1) {
                    this.columns[i + 1].Height += rightDeltas[i];
                }
            }
        }
    },

    /**
     * Draw the wavw
     * @param  {Context2d} context
     * @param  {integer} offset by how much pixels required in the y-axis
     * @return {void}
     */
    drawWave: function (context, offset) {
        if (context) {
            //context.lineWidth = 4;

            var lingrad = context.createLinearGradient(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height * 1.2);
            lingrad.addColorStop(0, 'rgba(73, 149, 137, 0.7)');
            lingrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
            //context.globalAlpha = 0.7;
            context.fillStyle = lingrad;
            //context.strokeStyle = '#979f9f';

            context.beginPath();
            context.moveTo(this.pos.x, this.pos.y + offset);
            for (var i = 0; i < this.columns.length; i++) {
                context.lineTo(this.pos.x + i * (this.width / this.amountofColumns), this.columns[i].Height + this.pos.y + offset);
            }
            context.lineTo(this.pos.x + this.width, this.columns[this.columns.length - 1].Height + this.pos.y + offset);
            context.lineTo(this.pos.x + this.width, this.pos.y + this.height);
            context.lineTo(this.pos.x, this.pos.y + this.height);
            //context.stroke();
            context.fill();
        }
    },

    /**
     * Create splash waves
     * @param  {event} event
     * @return {void}
     */
    doSplash: function(event) {
        event.preventDefault();
        var x;
        var y;
        var inputEvent;
        if (event.touches) {
            inputEvent = event.touches[0];
        } else {
            inputEvent = event;
        }
        var x = inputEvent.pageX;
        var y = inputEvent.pageY;
        var pc = x / this.drawCanvas.width;
        var newX = pc * columns.length;
        splash(newX | 0, 200);
    },

    /**
     * This is a single column. Columns are what the water is composed of.
     * @return {void}
     */
    column: function () {
        this.TargetHeight;
        this.Height;
        this.Speed;
        this.Update = function (dampening, tension) {
            var x = this.TargetHeight - this.Height;
            this.Speed += tension * x - this.Speed * dampening;
            this.Height += this.Speed;
        }
    }
});




