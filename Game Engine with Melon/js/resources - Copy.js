game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "assets/img/example.png"},
	 */
	{name: "tileset",		type:"image",	src: "assets/img/tileset.png"},
	{name: "atascii",		type:"image",	src: "assets/img/atascii.png"},
	{ name: "background", type: "image", src: "assets/img/background.png" },
    { name: "pback", type: "image", src: "assets/img/pback.png" },
	{ name: "coin", type: "image", src: "assets/img/coin.png" },

    { name: "slimeWalk", type: "image", src: "assets/img/enemies/slimeWalk.png" },
    { name: "slimeDead", type: "image", src: "assets/img/enemies/slimeDead.png" },
    { name: "flyNormal", type: "image", src: "assets/img/enemies/flyNormal.png" },
    { name: "flyFly", type: "image", src: "assets/img/enemies/flyFly.png" },
    { name: "flyEnemy", type: "image", src: "assets/img/enemies/flyEnemy.png" },
    { name: "playerSprite", type: "image", src: "assets/img/playerSprite.png" },
    { name: "exclaimBox", type: "image", src: "assets/img/exclaimBox.png" },
    { name: "menuBackground", type: "image", src: "assets/img/menuBackground.jpg" },
    { name: "mainScreenLogo", type: "image", src: "assets/img/mainScreenLogo.png" },
    { name: "finishStar", type: "image", src: "assets/img/finishStar.png" },
    { name: "lifeHeart", type: "image", src: "assets/img/lifeHeart.png" },

	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "assets/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "assets/map/example01.json"},
 	 */
	{name: "map1",			type: "tmx",	src: "assets/map/map1.tmx"},
	{ name: "map2", type: "tmx", src: "assets/map/map2.tmx" },
    { name: "levelSelectMap", type: "tmx", src: "assets/map/levelSelectMap.tmx" },
    { name: "menuMap", type: "tmx", src: "assets/map/menuMap.tmx" },
    { name: "settingsMap", type: "tmx", src: "assets/map/settingsMap.tmx" },


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "assets/bgm/", channel : 1},
	 */	
    { name: "titleMusic", type: "audio", src: "assets/bgm/", channel: 1 },
    { name: "forestMusic", type: "audio", src: "assets/bgm/", channel: 1 },

	
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "assets/sfx/", channel : 2}
	 */
	{name: "cling",			type: "audio",	src: "assets/sfx/",	channel : 2},
	{name: "die",			type: "audio",	src: "assets/sfx/",	channel : 1},
	{name: "enemykill",		type: "audio",	src: "assets/sfx/",	channel : 1},
	{name: "jump",			type: "audio",	src: "assets/sfx/",	channel : 2},

	
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "json", src: "assets/img/example_tps.json"},
	 */
	// texturePacker
	//{name: "texture",		type: "json",	src: "assets/img/texture.json"},
	//{name: "texture",		type: "image",	src: "assets/img/texture.png"}
	// ShoeBox
	//{name: "texture",		type: "json",	src: "assets/gfx/shoebox.json"},
	//{name: "texture",		type:"image",	src: "assets/gfx/shoebox.png"}
	 
];

game.loadEntities = function() {

    me.entityPool.add("CoinEntity", game.CoinEntity);
    me.entityPool.add("PlatformPlayerEntity", game.PlatformPlayerEntity);
    me.entityPool.add("SlimeEnemyEntity", game.SlimeEnemyEntity);
    me.entityPool.add("FlyEntity", game.FlyEntity);
    me.entityPool.add("ExclaimBox", game.ExclaimBox);
    me.entityPool.add("Water", game.Water);
    me.entityPool.add("FloatingFinish", game.FloatingFinish);
    me.entityPool.add("FireEmitter", game.FireEmitter);

    me.entityPool.add("BackgroundImage", game.BackgroundImage);
    me.entityPool.add("playButton", game.PlayButton);
    me.entityPool.add("settingsButton", game.SettingsButton);
    me.entityPool.add("BobbingLogo", game.BobbingLogo);
    me.entityPool.add("audio", game.AudioToggleButton);

    me.entityPool.add("levelButton", game.LevelButton);

    me.entityPool.add("slider", game.SoundSlider);
    me.entityPool.add("audioToggleButton", game.AudioToggleButton);
}