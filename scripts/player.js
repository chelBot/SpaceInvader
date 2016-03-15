Quintus.ActionPlatformerPlayer = function(Q) {
	Q.Sprite.extend("Player", {
		init: function(p){
			this._super(p, {
				sheet: "player",
				jumpSpeed: -400,
				speed: 100,
				gravity: 1

			});
			this.add("2d, platformerControls");
		} 
	});
};