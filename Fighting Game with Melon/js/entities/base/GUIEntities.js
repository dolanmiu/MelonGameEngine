game.Button = me.GUI_Object.extend({

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

    move: function () {
        var v = d;
    },

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

game.Sprite = me.SpriteObject.extend({
    init: function (x, y, settings) {
        this.image = me.loader.getImage(settings.image);
        this.parent(x, y, this.image);
    },
});

game.BackgroundImage = game.Sprite.extend({
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

game.NormalLogo = game.Sprite.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var scaleFactor = (game.screenWidth / 3) / this.image.width;
        this.pos.x = (game.screenWidth / 2) - (this.image.width / 2);
        this.resize(scaleFactor);
        this.anchorPoint.set(0.5, 0);
    },
});

game.BobbingLogo = game.NormalLogo.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.boxBounceUp();
        this.startY = y;
    },

    boxBounceUp: function () {
        var tween = new me.Tween(this.pos).to({ y: this.pos.y - 5 }, 2000).onComplete(this.boxBounceDown.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    },

    boxBounceDown: function () {
        var tween = new me.Tween(this.pos).to({ y: this.startY }, 2000).onComplete(this.boxBounceUp.bind(this));
        tween.easing(me.Tween.Easing.Sinusoidal.EaseOut);
        tween.start();
    }
});

game.PlayButton = game.Button.extend({

    onClick: function () {
        me.state.change(me.state.LEVELSELECT);
    },
});

game.SettingsButton = game.Button.extend({

    onClick: function () {
        me.state.change(me.state.SETTINGS);
    },
});

game.AudioToggleButton = game.Button.extend({

    init: function (x, y, settings) {
        settings.text = "MUTE";
        this.parent(x, y, settings);
        this.muted = false;
    },

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

game.LevelButton = game.Button.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.level = settings.level;
        this.text = settings.level.toUpperCase();
    },

    onClick: function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.change(me.state.PLAY, this.level);
    },
});

game.HUDText = me.HUD_Item.extend({
    init: function (x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("atascii", { x: 24 });
        this.font.set("right", 1.6);
    },
});

/** 
 * a GUI object 
 * display score on screen
 */
game.ScoreObject = game.HUDText.extend({
    /** 
	 * constructor
	 */
    init: function (x, y) {
        // call the parent constructor
        this.parent(x, y);
    },

    /**
	 * draw the score
	 */
    draw: function (context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

game.LifeObject = me.HUD_Item.extend({

    init: function (x, y) {
        this.parent(x, y);
        this.font = new me.BitmapFont("lifeHeart", { x: 99 });
        this.font.set("left", 0.7);

    },

    /**
     * draw the lives
     */
    draw: function (context, x, y) {
        var text;
        for (var i = 0; i < this.value; i++) {
            text += "!";
        }
        context.globalAlpha = 1;
        this.font.draw(context, text, this.pos.x, this.pos.y);
    }
});

game.PauseGUI = me.HUD_Item.extend({

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

    show: function (context) {
        var text = "PAUSED";
        var size = this.font.measureText(context, text);
        var coords = me.game.viewport.screenToWorld(game.screenWidth / 2, game.screenHeight / 2);
        this.button.pos.x = coords.x - this.button.width / 2;
        this.button.draw(context);
        this.font.draw(context, text, coords.x - (size.width / 2), coords.y - (size.height / 2));
    }
});

game.LevelFinishGUI = me.HUD_Item.extend({

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

game.HUDItem = me.ObjectEntity.extend({

    init: function (x, y, settings) {
        if (!me.game.HUD) {
            me.game.addHUD(0, 0, game.screenWidth, game.screenHeight);
        }
        this.parent(x, y, settings);
    },
});

game.MiniMap = game.HUDItem.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.alwaysUpdate = true;

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
        }

        if (settings.score) {
            me.game.HUD.addItem("score", new game.ScoreObject(200, 10));

        }

        if (settings.lives) {
            me.game.HUD.addItem("lives", new game.LifeObject(0, 10));
        }*/
    },

    update: function () {
        me.game.HUD.updateItemValue("map", 0);
    },

    addEntity: function (entity) {
        this.miniMapHUD.entities.push(entity);
    }
});

game.PauseMenu = game.HUDItem.extend({

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.pauseGUI = new game.PauseGUI();
        me.game.HUD.addItem("pause", this.pauseGUI);
        me.input.bindKey(me.input.KEY.ESC, "pause", true);
    },

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
        return true;
    },

    draw: function (context) {
        if (this.paused) {
            this.pauseGUI.show(context);
            //var background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            //context.drawImage(background.canvas, 0, 0);
            // Render the main frameBuffer
            me.video.blitSurface();
        }
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ESC);
    }
});

game.MiniMapHUD = me.HUD_Item.extend({

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
        this.parent(context);
    },

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