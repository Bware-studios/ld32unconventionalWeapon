
var Projectile = SpriteInScene.extend({
	ctor: function(tg) {
		this._super();
		this.v=cc.p(0,0);
		this.target=tg;
		this.setAnchorPoint(cc.p(.5,.5));
		this.load_anim_for_class(Projectile);
		this.fs = [];
		var animfileinfo = this.get_animfileinfo();
		if (this.fs.length==0) {
			this.fs.push(new cc.SpriteFrame(animfileinfo.name,cc.rect(0,0,64,64)));
			this.fs.push(new cc.SpriteFrame(animfileinfo.name,cc.rect(64,0,64,64)));
			this.fs.push(new cc.SpriteFrame(animfileinfo.name,cc.rect(128,0,64,64)));
		}
	},
	
	launch: function(tipo,pos,v) {
		this.setXY(pos.x,pos.y);
		this.v=v;
		this.rotating=false;
		Scene.thescene.back.addChild(this,100);
		this.scheduleUpdate();
		if (tipo!=2) this.setRotation(Math.random()*200);
		this.setSpriteFrame(this.fs[tipo]);
	},
	
	update: function(dt) {
		var p = this.getCoords();
		
		if (Math.abs(p.x-util.coordsFromPos(this.target.getPosition()).x)<32 && !this.rotating) {
			this.v.y+=Math.random()*500;
			this.rotating=true;
			this.target.receive_hit(2);
			cc.audioEngine.playEffect("res/hit2.wav",false);					
		}
		if (this.rotating) {
			var a=this.getRotation();
//			console.log("a "+a);c
			this.setRotation(a+this.v.x*.6*dt);
		}
		//console.log("u "+p.x+","+p.y);
		p.x=this.coords.x+this.v.x*dt;
		p.y=this.coords.y+this.v.y*dt;
		//console.log("u> "+p.x+","+p.y);
		if (p.x<-360 || p.x>360 || p.y<-50 || p.y>500 ) {
			this.removeFromParent();
		} else {
			this.setXY(p.x,p.y);
		}
	},
	
	
	get_animinfo: function() {
		console.log("projectile getaniminfo called");
		var animinfo = {
				//file: 'res/player.png',
				deltat: Params.step_delta_f,// GameSprite.delta_t/5,
				frame: cc.rect(0,0,64,64),
				anim: {
				},
		};
		return animinfo;
	},

	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/weapons.png',
		};
		return animfileinfo;
	},

	
});

