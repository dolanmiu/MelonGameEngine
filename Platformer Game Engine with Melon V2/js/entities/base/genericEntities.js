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
        var cameraFollowEntities = [];
        if (settings.entities) {
            var cfe = settings.entities.split(/[\s,]+/);
            this.cameraFollowPos = [];
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

        if (settings.deadZone) {
            this.deadZone = settings.deadZone;
            me.game.viewport.follow(cameraFollowEntities[0], axis);
            me.game.viewport.setDeadzone(settings.deadZone, settings.deadZone);
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