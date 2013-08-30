game.MainPlayer = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.alwaysUpdate = true;
        this.canBreakTile = true;
        this.type = "mainPlayer";
        this.parent(x, y, settings);
        this.bindedKeys = [];
        this.bindKey("left", "left");
        this.bindKey("right", "right");
        me.game.playerPos = new me.Vector2d(0, 0);
    },

    bindKey: function (keyString, referance) {
        var upperKey = keyString.toUpperCase();
        var key = eval("me.input.KEY." + upperKey);
        me.input.bindKey(key, referance);
        this.bindedKeys.push(key);
    },

    update: function () {
        // update animation if necessary
        this.updateMovement();
        me.game.playerPos.x = this.pos.x + this.width / 2;
        me.game.playerPos.y = this.pos.y + this.height / 2;
        if (this.vel.x != 0 || this.vel.y != 0 || (this.renderable && this.renderable.isFlickering())) {
            this.parent();
            return true;
        }
        this.parent();
    },

    onDestroyEvent: function () {
        for (var i = 0; i < this.bindedKeys.length; i++) {
            me.input.unbindKey(this.bindedKeys[i]);
        }
    },

});

game.GameManager = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        var visibility = new Visibility();
        this.parent(x, y, settings);

        if (settings.music) {
            me.audio.stopTrack();
            me.audio.playTrack(settings.music);
        }

        if (settings.smoothCam) {
            //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        }
    },

    update: function () {
        //me.game.viewport.move(me.game.playerPos.x, me.game.playerPos.y);
        this.parent();
    }
});

BinaryHeap = Object.extend({
    init: function(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    },

    push: function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },

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

    size: function () {
        return this.content.length;
    },

    rescoreElement: function (node) {
        this.sinkDown(this.content.indexOf(node));
    },
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