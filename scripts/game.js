
window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerFriend, Gems")
    .setup({
      width: 520,   //to fit devices with a screne resolution of 1280 x 720
      height: 380,
      scaleToFit: true
    }).controls().touch();

    Q.setImageSmoothing(true);
    Q.enableSound();

  

    Q.scene("level", function(stage){
      Q.stageTMX("underground.tmx", stage);
     
      player = Q("Player").first();
      stage.add("viewport").follow(player, {x: true, y: true});
    });

    //load assets
    Q.loadTMX("underground.tmx, sprites.json, sprites.png, jump.mp3, kill-enemy.mp3, coin.mp3", function(){   
      Q.compileSheets("sprites.png", "sprites.json");   
      Q.stageScene("level");
    });
});