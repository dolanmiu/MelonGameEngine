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