Quintus.Gems = function(Q){
	var count = 0;
	Q.component("commonToken", {
		added : function() {
			var entity = this.entity;
			entity.on("bump.top", function(collision) {
				if(collision.obj.isA("Player")){
					//*******why p here?********
					Q.audio.play("coin.mp3");
					collision.obj.p.vy = -800;
					this.destroy();
					count++;
					console.log(count);
				}
				if(count === 6){
					Q.stageScene("endGame",1, { label: "You Won!" });
				}
			});

		}
	});
	Q.Sprite.extend("Gem", {
		init: function(p){
			// this._super(p, {});
			// this.add("commonToken");
			this._super(p, {});
			this.add("2d, commonToken");
		}
	});
};
