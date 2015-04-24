
var AnimSprite = cc.Sprite.extend({

	ctor:function(filename,rect,rotated,size) {
		this._super(filename,rect,rotated);
		this.setAnchorPoint(cc.p(0.5,0.5));
		this.hasanims=false;
		
		//this.load_anim_for_class(AnimSprite);
	},

	load_anim_for_class: function(baseclass) {
		var animfileinfo=this.get_animfileinfo();
		console.log("filename "+animfileinfo.name);
		if (!"name" in animfileinfo) {
			console.log('no animation file present');
			this.hasanims=false;
		}
		this.hasanims=true;

		if (baseclass.anim_loaded==true) {
			this.setSpriteFrame(baseclass.firstframe);
			this.anim=baseclass.anim;
			return;
		}
		baseclass.anim_loaded=true;
		this.animclass=baseclass;
		baseclass.anim={};
//		this.anim={};
		// aqui cargar todas las animaciones llamamndo a metodos virtuales que digan los datos de la animacion
		if (!this.hasanims) return;
		
		var animinfo=this.get_animinfo();		
		var filename=animfileinfo.name;		
		console.log("filename "+filename);
		var anim_delta_t=animinfo.deltat;
		console.log('deltat '+anim_delta_t);
		console.log(animinfo.anim.length+' anims');
		for (i in animinfo.anim) {
			var oneaniminfo=animinfo.anim[i];
			var frames = oneaniminfo.frames.map(function(r) {return new cc.SpriteFrame(filename,r)});
			console.log('anim '+i+' '+frames.length+' frames');
			baseclass.anim[i] = new cc.Animation(frames,animinfo.deltat);
			if (baseclass.anim[i].retain) { baseclass.anim[i].retain(); }
//			this.anim[i]=baseclass.anim[i];
		}
		baseclass.firstframe=new cc.SpriteFrame(filename,animinfo.frame);
		if (baseclass.firstframe.retain) { baseclass.firstframe.retain(); }
		this.setSpriteFrame(baseclass.firstframe);
		this.anim=baseclass.anim;
	},


	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/sprites.png',
		};
		return animfileinfo;
	},
	
	get_animinfo: function() {
		console.log("default getaniminfo called");
		var animinfo = {
				deltat: GameSprite.delta_t/5,
				frame: cc.rect(384+0,0,64,64),
				anim: {
					move_up: {frames: [cc.rect(64,64,64,64),cc.rect(128,64,64,64),cc.rect(192,64,64,64),cc.rect(128,64,64,64),cc.rect(64,64,64,64)]},
					move_down: {frames: [cc.rect(384+0,0,64,64),cc.rect(384+64,0,64,64),cc.rect(0,64,64,64),cc.rect(384+64,0,64,64),cc.rect(384+0,0,64,64)]},
					move_right: {frames: [cc.rect(0,0,64,64),cc.rect(64,0,64,64),cc.rect(128,0,64,64),cc.rect(64,0,64,64),cc.rect(0,0,64,64)]},
					move_left: {frames: [cc.rect(192+0,0,64,64),cc.rect(192+64,0,64,64),cc.rect(192+128,0,64,64),cc.rect(192+64,0,64,64),cc.rect(192+0,0,64,64)]},
				},
		};
		return animinfo;
	},

	runAnim: function(animname) {
		if (this.hasanims) {
			this.runAction(cc.animate(this.anim[animname]));
		}
	},
	
});

AnimSprite.anim_loaded=false;




