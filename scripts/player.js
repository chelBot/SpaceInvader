Quintus.ActionPlatformerPlayer = function(Q) {
	Q.Sprite.extend("Player", {
		init: function(p){
			this._super(p, {
				sheet: "player",
				jumpSpeed: -350,
				speed: 100,
				isJumping: false
			});
			this.add("2d, platformerControls");
			
			var that = this;
			this.on("jump", function(){
       		 	if(!that.p.isJumping && that.p.vy < 0) {
          			that.p.isJumping = true;
          			Q.audio.play("jump.mp3");
        		}            
     		});
     		this.on("bump.bottom", function(){
        		that.p.isJumping = false;
      		});
		},
		step: function(dt){
			//A hacky solution to the 'collision layer problem'; Assume worst case scenario of 15 frames/sec. 
			//use tile length (21) to bound velocities. Not a great solution. 
			if(this.p.vy >= 300){
				this.p.vy = 300;
			}
			if(this.p.vx >= 300){
				this.p.vx = 300;
			}
		} 
	});
};