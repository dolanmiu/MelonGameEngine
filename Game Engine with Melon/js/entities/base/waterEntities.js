game.Water = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.columns = [];
        this.Dampening = 0.025;
        this.Tension = 0.025;
        this.Spread = 0.25;
        this.WaveHeightStart = 100;
        this.type = me.game.WATER;
        //this.amountofColumns = Math.round(this.width / 1.75);
        this.amountofColumns = 80;
        for (var i = 0; i < this.amountofColumns; i++) {
            this.columns[i] = new this.column();
            this.columns[i].Height = this.WaveHeightStart;
            this.columns[i].TargetHeight = this.WaveHeightStart;
            this.columns[i].Speed = 0;
        }
        this.splash(40, 10);
    },

    update: function () {
        this.doWave();
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
                default: break;
            }
            this.inWater = false;
        } else {
            this.inWater = true;
        }
    },

    onCollision: function (res, obj) {
        var position = obj.pos.x - this.pos.x;
        if (obj.vel.length() != 0 && position > 0) {
            var columnNumber = position / this.width * this.amountofColumns;
            this.splash(Math.round(columnNumber), obj.vel.length());
        }

        var splashParticles = 10;
        var v = obj.vel.length();
        if (!this.inWater && obj.vel.length() > 4) {
            for (var i = 0; i < splashParticles; i++) {
                var droplet = new game.WaterParticle(obj.pos.x + obj.width / 2, this.pos.y, new me.Vector2d(5, -obj.vel.length() / 2), new me.Vector2d(-0.5, 0.5), new me.Vector2d(0.5, 1));
                me.game.add(droplet, this.z);
                me.game.sort();
            }
        }
    },

    draw: function (context, x, y) {
        this.drawWave(context, 0);
        this.parent(context, x, y);
    },

    splash: function (index, speed) {
        if (index >= 0 && index < this.columns.length) {
            this.columns[index].Speed = speed;
        }
    },

    doWave: function (e) {

        var i;
        for (i = 0; i < this.columns.length; i++) {
            this.columns[i].Update(this.Dampening, this.Tension);
        }

        var leftDeltas = new Array(this.columns.length);
        var rightDeltas = new Array(this.columns.length);

        for (var j = 0; j < 8; j++) {
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

    drawWave: function (ctx, offset) {
        if (ctx) {
            var context = ctx;
            //context.clearRect(0, 0, context.width, context.height);
            //context.lineWidth = 4;

            var lingrad = context.createLinearGradient(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 100);
            lingrad.addColorStop(0, '#499589');
            lingrad.addColorStop(1, '#000000');
            context.globalAlpha = 0.7;
            context.fillStyle = lingrad;
            context.strokeStyle = '#979f9f';

            context.beginPath();
            context.moveTo(this.pos.x, this.pos.y + offset);
            for (var i = 0; i < this.columns.length; i++) {
                context.lineTo(this.pos.x + i * (this.width / 80), this.columns[i].Height + this.pos.y - 100 + offset);
            }
            context.lineTo(this.pos.x + this.width, this.pos.y + this.height);
            context.lineTo(this.pos.x, this.pos.y + this.height);
            //context.lineTo(this.pos.x, this.columns[this.columns.length - 1].Height + offset);
            context.stroke();
            context.fill();
        }
    },

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

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();




