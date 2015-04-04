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

