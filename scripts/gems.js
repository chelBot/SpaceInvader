Quintus.Gems = function(Q){
	Q.component("commonToken", {
		added : function() {
			var entity = this.entity;
			entity.on("bump.top", function(collision) {
				if(collision.obj.isA("Player")){
					//*******why p here?********
					Q.audio.play("coin.mp3");
					collision.obj.p.vy = -800;
					this.destroy();
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