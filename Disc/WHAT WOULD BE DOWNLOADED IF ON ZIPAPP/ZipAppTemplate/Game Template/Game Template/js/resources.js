game.resources = [
	{ name: "atascii", type: "image", src: "assets/img/atascii.png" },
	{ name: "mainScreenLogo", type: "image", src: "assets/img/mainScreenLogo.png" },
	{ name: "menuMap", type: "tmx", src: "assets/map/menuMap.tmx" },
	{ name: "metatiles35x35", type: "image", src: "assets/map/metatiles35x35.png" },
	{ name: "tileset", type: "image", src: "assets/map/tileset.png" },
];

game.loadEntities = function () {
	me.entityPool.add("FighterPawn", game.FighterPawn);
	me.entityPool.add("MainPlayer", game.MainPlayer);
	me.entityPool.add("GameManager", game.GameManager);
	me.entityPool.add("MultiCam", game.MultiCam);
	me.entityPool.add("Button", game.Button);
	me.entityPool.add("Sprite", game.Sprite);
	me.entityPool.add("BackgroundImage", game.BackgroundImage);
	me.entityPool.add("NormalLogo", game.NormalLogo);
	me.entityPool.add("BobbingLogo", game.BobbingLogo);
	me.entityPool.add("StateButton", game.StateButton);
	me.entityPool.add("PlayButton", game.PlayButton);
	me.entityPool.add("SettingsButton", game.SettingsButton);
	me.entityPool.add("AudioToggleButton", game.AudioToggleButton);
	me.entityPool.add("LevelButton", game.LevelButton);
	me.entityPool.add("HUDText", game.HUDText);
	me.entityPool.add("ScoreObject", game.ScoreObject);
	me.entityPool.add("LifeObject", game.LifeObject);
	me.entityPool.add("PauseGUI", game.PauseGUI);
	me.entityPool.add("LevelFinishGUI", game.LevelFinishGUI);
	me.entityPool.add("HUDItem", game.HUDItem);
	me.entityPool.add("MiniMap", game.MiniMap);
	me.entityPool.add("_HUDText", game._HUDText);
	me.entityPool.add("HUDTextBlock", game.HUDTextBlock);
	me.entityPool.add("LivesCounter", game.LivesCounter);
	me.entityPool.add("ScoreCounter", game.ScoreCounter);
	me.entityPool.add("PauseMenu", game.PauseMenu);
	me.entityPool.add("MiniMapHUD", game.MiniMapHUD);
	me.entityPool.add("ScrollingText", game.ScrollingText);
	me.entityPool.add("TextBlock", game.TextBlock);
	me.entityPool.add("FullScreenColour", game.FullScreenColour);
	me.entityPool.add("DynamicRayCastLight", game.DynamicRayCastLight);
	me.entityPool.add("DynamicLight", game.DynamicLight);
	me.entityPool.add("DarkMask", game.DarkMask);
	me.entityPool.add("ParticleEmitter", game.ParticleEmitter);
	me.entityPool.add("FireEmitter", game.FireEmitter);
	me.entityPool.add("WaterParticleEmitter", game.WaterParticleEmitter);
	me.entityPool.add("Particle", game.Particle);
	me.entityPool.add("VectorCircleParticle", game.VectorCircleParticle);
	me.entityPool.add("WaterParticle", game.WaterParticle);
	me.entityPool.add("Sparks", game.Sparks);
	me.entityPool.add("FireParticle", game.FireParticle);
	me.entityPool.add("PlatformPlayerEntity", game.PlatformPlayerEntity);
	me.entityPool.add("CoinEntity", game.CoinEntity);
	me.entityPool.add("PathEnemyEntity", game.PathEnemyEntity);
	me.entityPool.add("PathEnemyWaitEntity", game.PathEnemyWaitEntity);
	me.entityPool.add("FlyEnemyEntity", game.FlyEnemyEntity);
	me.entityPool.add("FlyEnemyWaitEntity", game.FlyEnemyWaitEntity);
	me.entityPool.add("ExclaimBox", game.ExclaimBox);
	me.entityPool.add("FinishLine", game.FinishLine);
	me.entityPool.add("FloatingFinish", game.FloatingFinish);
	me.entityPool.add("TopDownPlayerEntity", game.TopDownPlayerEntity);
	me.entityPool.add("AStarPath", game.AStarPath);
	me.entityPool.add("TopDownEntity", game.TopDownEntity);
	me.entityPool.add("TopDownEnemy", game.TopDownEnemy);
	me.entityPool.add("Water", game.Water);
}
