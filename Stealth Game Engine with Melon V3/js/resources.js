game.resources = [
	{ name: "forestMusic", type: "audio", src: "assets/bgm/", channel: 1 },
	{ name: "titleMusic", type: "audio", src: "assets/bgm/", channel: 1 },
	{ name: "atascii", type: "image", src: "assets/img/atascii.png" },
	{ name: "background", type: "image", src: "assets/img/background.png" },
	{ name: "coin", type: "image", src: "assets/img/coin.png" },
	{ name: "exclaimBox", type: "image", src: "assets/img/exclaimBox.png" },
	{ name: "finishStar", type: "image", src: "assets/img/finishStar.png" },
	{ name: "lifeHeart", type: "image", src: "assets/img/lifeHeart.png" },
	{ name: "mainScreenLogo", type: "image", src: "assets/img/mainScreenLogo.png" },
	{ name: "menuBackground", type: "image", src: "assets/img/menuBackground.jpg" },
	{ name: "metatiles35x35", type: "image", src: "assets/img/metatiles35x35.png" },
	{ name: "pback", type: "image", src: "assets/img/pback.png" },
	{ name: "playerSprite", type: "image", src: "assets/img/playerSprite.png" },
	{ name: "tileset", type: "image", src: "assets/img/tileset.png" },
	{ name: "flyEnemy", type: "image", src: "assets/img/enemies/flyEnemy.png" },
	{ name: "flyFly", type: "image", src: "assets/img/enemies/flyFly.png" },
	{ name: "flyNormal", type: "image", src: "assets/img/enemies/flyNormal.png" },
	{ name: "fly_dead", type: "image", src: "assets/img/enemies/fly_dead.png" },
	{ name: "slimeDead", type: "image", src: "assets/img/enemies/slimeDead.png" },
	{ name: "slimeNormal", type: "image", src: "assets/img/enemies/slimeNormal.png" },
	{ name: "slimeWalk", type: "image", src: "assets/img/enemies/slimeWalk.png" },
	{ name: "levelSelectMap", type: "tmx", src: "assets/map/levelSelectMap.tmx" },
	{ name: "map1", type: "tmx", src: "assets/map/map1.tmx" },
	{ name: "menuMap", type: "tmx", src: "assets/map/menuMap.tmx" },
    { name: "gameOverMap", type: "tmx", src: "assets/map/gameOverMap.tmx" },
	{ name: "settingsMap", type: "tmx", src: "assets/map/settingsMap.tmx" },
	{ name: "cling", type: "audio", src: "assets/sfx/", channel: 1 },
	{ name: "die", type: "audio", src: "assets/sfx/", channel: 1 },
	{ name: "enemykill", type: "audio", src: "assets/sfx/", channel: 1 },
	{ name: "jump", type: "audio", src: "assets/sfx/", channel: 1 },
];

game.loadEntities = function() {
	me.entityPool.add("Button", game.Button);
	me.entityPool.add("Sprite", game.Sprite);
	me.entityPool.add("BackgroundImage", game.BackgroundImage);
	me.entityPool.add("NormalLogo", game.NormalLogo);
	me.entityPool.add("BobbingLogo", game.BobbingLogo);
	me.entityPool.add("PlayButton", game.PlayButton);
	me.entityPool.add("SettingsButton", game.SettingsButton);
	me.entityPool.add("AudioToggleButton", game.AudioToggleButton);
	me.entityPool.add("LevelButton", game.LevelButton);
	me.entityPool.add("HUDText", game.HUDText);
	me.entityPool.add("ScoreObject", game.ScoreObject);
	me.entityPool.add("LifeObject", game.LifeObject);
	me.entityPool.add("PauseGUI", game.PauseGUI);
	me.entityPool.add("LevelFinishGUI", game.LevelFinishGUI);
	me.entityPool.add("ParticleEmitter", game.ParticleEmitter);
	me.entityPool.add("FireEmitter", game.FireEmitter);
	me.entityPool.add("WaterParticleEmitter", game.WaterParticleEmitter);
	me.entityPool.add("Particle", game.Particle);
	me.entityPool.add("VectorCircleParticle", game.VectorCircleParticle);
	me.entityPool.add("WaterParticle", game.WaterParticle);
	me.entityPool.add("Sparks", game.Sparks);
	me.entityPool.add("FireParticle", game.FireParticle);
	me.entityPool.add("PlatformPlayerEntity", game.PlatformPlayerEntity);
	me.entityPool.add("TopDownPlayerEntity", game.TopDownPlayerEntity);
	me.entityPool.add("CoinEntity", game.CoinEntity);
	me.entityPool.add("GameManager", game.GameManager);
	me.entityPool.add("PathEnemyEntity", game.PathEnemyEntity);
	me.entityPool.add("AStarPath", game.AStarPath);
	me.entityPool.add("TopDownEnemy", game.TopDownEnemy);
	me.entityPool.add("MiniMap", game.MiniMap);
	me.entityPool.add("DynamicLight", game.DynamicLight);
	me.entityPool.add("PauseMenu", game.PauseMenu);
	me.entityPool.add("DarkMask", game.DarkMask);

	me.entityPool.add("FighterPawn", game.FighterPawn);
	me.entityPool.add("FullScreenColour", game.FullScreenColour);
	me.entityPool.add("PathEnemyWaitEntity", game.PathEnemyWaitEntity);
	me.entityPool.add("FlyEnemyEntity", game.FlyEnemyEntity);
	me.entityPool.add("FlyEnemyWaitEntity", game.FlyEnemyWaitEntity);
	me.entityPool.add("ExclaimBox", game.ExclaimBox);
	me.entityPool.add("FinishLine", game.FinishLine);
	me.entityPool.add("FloatingFinish", game.FloatingFinish);
	me.entityPool.add("LevelSelectorWidget", game.LevelSelectorWidget);
	me.entityPool.add("Water", game.Water);
	me.entityPool.add("ScrollingText", game.ScrollingText);
	me.entityPool.add("TextBlock", game.TextBlock);
	me.entityPool.add("MultiCam", game.MultiCam);
	me.entityPool.add("HUDTextBlock", game.HUDTextBlock);
	me.entityPool.add("_HUDText", game._HUDText);
	me.entityPool.add("LivesCounter", game.LivesCounter);
	me.entityPool.add("StateButton", game.StateButton);
}
