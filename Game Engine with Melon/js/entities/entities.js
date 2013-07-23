/**
 * An Slime enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
game.SlimeEnemyEntity = game.PathEnemyEntity.extend({
    /**
	 * constructor
	 */
    init: function (x, y, settings) {
        // define this here instead of tiled
        settings.image = "slimeWalk";
        settings.spritewidth = 43;
        settings.spriteheight = 26;

        // call the parent constructor
        this.parent(x, y, settings);
    },
});

game.FlyEntity = game.FlyEnemyWaitEntity.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        settings.image = "flyEnemy";
        settings.spritewidth = 69;
        settings.spriteheight = 32;
        // parent constructor
        this.parent(x, y, settings);
    }
});

