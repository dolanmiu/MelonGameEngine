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