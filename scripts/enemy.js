Quintus.ActionPlatformerHelper = function(Q) {
	//custom component that can be added to classes
	Q.component("commonEnemy", {
		added : function() {
			var entity = this.entity;
			entity.on("bump.left, bump.right, bump.bottom", function(collision){
				if(collision.obj.isA("Player")){
					console.log("player died!");
				}
			});
			entity.on("bump.top", function(collision) {
				if(collision.obj.isA("Player")){
					//*******why p here?********
					Q.audio.play("coin.mp3");
					collision.obj.p.vy = -400;
					// this.destroy();
				}
			});

		}
	})


	Q.Sprite.extend("GroundEnemy", {
		init: function(p){
			this._super(p, {vx: -50, defaultDirection: "left"});
			this.add("2d, aiBounce, commonEnemy");
		},
		step: function(dt){
			var dirX = this.p.vx/ Math.abs(this.p.vx);
			var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
			var nextElement = Q.stage().locate(this.p.x + dirX*this.p.w/2 + dirX, this.p.y +this.p.h/2 + 1, Q.SPRITE_DEFAULT);
			var nextTile;

			if(nextElement instanceof Q.TileLayer){
				nextTile = true;
			}
			if(!nextTile && ground){
				// if(this.p.vx > 0){
				// 	if(this.p.defaultDirection == "right"){
				// 		this.p.flip = "x";
				// 	}
				// }
				// else{
				// 	if(this.p.defaultDirection == "left"){
				// 		this.p.flip = "x";
				// 	}
				// }

				this.p.vx = -this.p.vx;
			}

		}
	});

	Q.Sprite.extend("VerticalEnemy", {
		init: function(p){
			this._super(p, {vy: -100, rangeY: 40, gravity: 0});
			this.add("2d, commonEnemy");

			this.p.initialY = this.p.y;
			this.p.initialVY = this.p.vy;
			this.p.vyDir = this.p.vy / Math.abs(this.p.vy);

			this.on("bump.top, bump.bottom", function(collision){
				this.p.vy = -Math.abs(this.p.initialVY) * this.p.vyDir; 
				this.p.vyDir = this.p.vy/Math.abs(this.p.vy);
				
			});
		},
		step: function(dt){
			if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0){
				this.p.vy = -this.p.vy;
				this.p.vyDir *= -1;
			}
			else if (-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0){
				this.p.vy = -this.p.vy;
				this.p.vyDir += -1;
			}
			
			
		}
		
	});
};