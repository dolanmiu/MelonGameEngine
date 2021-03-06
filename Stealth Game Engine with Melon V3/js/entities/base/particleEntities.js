﻿/**
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