
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
      Q.stageScene("startGame", 1, { label: "Collect all the Space Rubies. Try not to get stuck."});
    });

    //maybe move this to 'gems.js'
    Q.scene('endGame',function(stage){
      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
      }));
    
      var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play Again" }))         
      var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));
      // When the button is clicked, clear all the stages
      // and restart the game.
      button.on("click",function() {
        Q.clearStages();
        Q.stageScene('level');
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
    });

    //DRY it up.
    Q.scene('startGame', function(stage){
      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
      }));

      var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play"}))
      var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, size: 17, label: stage.options.label }));
      button.on("click", function(){
          container.destroy();
      });

      container.fit(20);
    });
   
});