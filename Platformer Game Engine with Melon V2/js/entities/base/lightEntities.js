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
            radius: 1,
            angle: Math.PI,
            samples: 1,
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
        this.alwaysUpdate = true;
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
        this.pos = game.playerPos;
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