function Helper() {
}

Helper.multiply = function (val1, val2) {
    return (val1 * val2);
}

Helper.getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
}

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

function LightDrawEffects() {
}

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

function Light() {
}

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

Light.GetBox = function (x, y) {
    var collisionLayer = me.game.currentLevel.getLayerByName("collision").layerData;
    return collisionLayer[x][y];
}

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

function Visible() {
}

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

Visible.CCW = function (p1, p2, p3) {
    a = p1.y; b = p1.x;
    c = p2.y; d = p2.x;
    e = p3.y; f = p3.x;
    return (f - b) * (c - a) > (d - b) * (e - a);
}

Visible.CheckIntersection = function (p1, p2, p3, p4) {
    return (Visible.CCW(p1, p3, p4) != Visible.CCW(p2, p3, p4)) && (Visible.CCW(p1, p2, p3) != Visible.CCW(p1, p2, p4));
}

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

function AStar() {

}

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

AStar.heap = function () {
    return new BinaryHeap(function (node) {
        return node.f;
    });
}

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

AStar.manhattan = function (pos0, pos1) {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
}

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

AStar.GraphNode = Object.extend({

    init: function (x, y, type) {
        this.data = {};
        this.x = x;
        this.y = y;
        this.pos = { x: x * me.game.currentLevel.tilewidth, y: y * me.game.currentLevel.tilewidth };
        this.type = type; //1 = wall 0 = noWall
        this.cost;
        this.wait = 0;
    },

    toString: function () {
        return "[" + this.x + " " + this.y + "]";
    },

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

