

var SpriteInScene = AnimSprite.extend({
//var SpriteInScene = cc.Sprite.extend({
	ctor: function() {
		this.coords = cc.p(0,0);
		this._super("res/plain.png");
		this.setPosition(util.posFromXY(0, 0));
	},
	
	getX: function() {
		return this.coords.x;
	},

	getY: function() {
		return this.coords.y;
	},

	setXY: function(x,y) {
		this.coords.x=x;
		this.coords.y=y;
		this.setPosition(util.posFromXY(x, y));
	},
	
	updateCoordsFromPos: function() {
		var p=this.getPosition();
		this.coords=util.coordsFromPos(p);
	},
	
	getCoords: function() {
		return util.coordsFromPos(this.getPosition());
	},
	
	
});


var Character = SpriteInScene.extend({
	ctor: function(label,side,life) {
		console.log("character -------");
		this._super();
		this.setAnchorPoint(cc.p(.5,0));
		
		this.label=label;
		this.life=life;
		this.label.setString(""+this.life);
		
		this.side=side;
		console.log("side: "+this.side);
		this.projectiles = [0,1,2];
		
		this.target=null;
		
	},
	
	setTarget: function(tg) {
		this.target=tg;
	},
	
	
	move_step: function(dirxmov) {
		if (this.life<=0) return;
		this.moving=true;
		this.moving_target=cc.p(this.getX()+dirxmov*Params.step_x_size,0);
		var target_pos = util.posFromCoords(this.moving_target);
		//console.log("d "+dirxmov+" tg: "+this.moving_target.x+" p "+target_pos.x);
		this.runAction(cc.sequence( cc.moveTo(Params.step_delta_t,target_pos) , cc.callFunc(this.event_move_end,this)));
		this.runAnim(this.get_target_dir()>0?"step_lookright":"step_lookleft");
	},
	
	move_revernce: function() {
		console.log("reverence");
		this.moving=true;
		this.runAction(cc.sequence( cc.DelayTime.create(2) , cc.callFunc(this.event_move_end,this)));
		this.runAnim("reverence");		
	},
	
	hit: function(i) {
		if (this.life<=0) return;
		var dirxlook=this.get_target_dir();
		this.moving=true;
		this.runAction(cc.sequence( cc.DelayTime.create(.5), cc.callFunc(this.event_move_end,this)));
		if (i==1) {
			this.runAnim((dirxlook>0)?"hit1_right":"hit1_left");
			this.hitting=true;
			this.hitting_i=1;
			this.runAction(cc.sequence( cc.DelayTime.create(.1), cc.callFunc(this.do_hit1_damage,this)));
		} else if (i==2) {
			this.runAnim((dirxlook>0)?"hit2_right":"hit2_left");
			this.hitting=true;
			this.hitting_i=2;
			this.runAction(cc.sequence( cc.DelayTime.create(.1), cc.callFunc(this.do_hit2_damage,this)));
		} else if (i==3) {
			this.runAnim((dirxlook>0)?"fire_right":"fire_left");
			this.hitting=true;
			this.hitting_i=3;
			var f = new Projectile(this.target);
			var tipo=util.randomPick(this.projectiles);
			f.launch(tipo,cc.p(this.coords.x-0,this.coords.y+((tipo==2)?20:80)),cc.p(dirxlook>0?Params.projectile_v:-Params.projectile_v,0));
		}	
		
	},
	
	do_hit1_damage: function() {
		if (!this.hitting) return;
		if (this.target) {
			var d=this.get_target_distance();
			//console.log("d="+d);
			if (d<110) {
				cc.audioEngine.playEffect("res/sarten_3.mp3");					
				this.target.receive_hit(1);
			}
		}
	},
	
	do_hit2_damage: function() {
		if (!this.hitting) return;
		if (this.target) {
			var d=this.get_target_distance();
			//console.log("d="+d);
			if (d<110) {
				cc.audioEngine.playEffect("res/zanahoria.mp3");					
				this.target.receive_hit(4);
			}
		}
	},

	
	event_move_end: function() {
		if (this.moving)
			if (this.moving_target)
				this.coords=this.moving_target;
		this.moving=false;
		this.hitting=false;
	},
	
	get_target_dir: function() {
		var targetdir=0;
		if (this.target) {
			targetdir=(this.target.coords.x>this.coords.x)?1:-1;
		}
		return targetdir;
	},
	
	get_target_distance: function() {
		var targetd=0;
		if (this.target)
			targetd=Math.abs(this.target.coords.x-this.coords.x);
		return targetd;
	},

	
	receive_hit: function(damage) {
		if (this.life<=0) return;
		this.stopAllActions();
		this.updateCoordsFromPos();
		this.hitting=false;
		this.moving=false;
//		console.log("received hit");
		this.life -= damage;
		if (this.life<=0) this.life=0;
		this.label.setString(""+this.life);
		if (this.life>0) { 
			this.runAction(cc.sequence( cc.DelayTime.create(.8), cc.callFunc(this.event_move_end,this)));
			this.runAnim(this.get_target_dir()>0?"damage_right":"damage_left");
		} else {
			this.die();
		}
	},
	
	die: function() {
		this.runAnim(this.get_target_dir()>0?"die_right":"die_left");
		Scene.thescene.has_died(this.side);

	},
	
	get_animinfo: function() {
		console.log("character getaniminfo called");
		var animinfo = {
				//file: 'res/player.png',
				deltat: Params.step_delta_f,// GameSprite.delta_t/5,
				frame: cc.rect(3*192,0,192,128),
				anim: {
					step_lookright: {frames: [cc.rect(0,0,192,128),cc.rect(192,0,192,128),cc.rect(2*192,0,192,128),cc.rect(3*192,0,192,128)]},
					step_lookleft: {frames: [cc.rect(0,128,192,128),cc.rect(192,128,192,128),cc.rect(2*192,128,192,128),cc.rect(3*192,128,192,128)]},
					hit1_right: {frames: [cc.rect(0,256,192,128),cc.rect(192,256,192,128),cc.rect(192,256,192,128),cc.rect(192,256,192,128),cc.rect(3*192,0,192,128)]},
					hit1_left: {frames: [cc.rect(0,384,192,128),cc.rect(192,384,192,128),cc.rect(192,384,192,128),cc.rect(192,384,192,128),cc.rect(3*192,128,192,128)]},
					hit2_right: {frames: [cc.rect(2*192,256,192,128),cc.rect(3*192,256,192,128),cc.rect(3*192,256,192,128),cc.rect(3*192,256,192,128),cc.rect(3*192,0,192,128)]},
					hit2_left: {frames: [cc.rect(2*192,384,192,128),cc.rect(3*192,384,192,128),cc.rect(3*192,384,192,128),cc.rect(3*192,384,192,128),cc.rect(3*192,128,192,128)]},
					fire_right: {frames: [cc.rect(0,512,192,128),cc.rect(192,512,192,128),cc.rect(192,512,192,128),cc.rect(192,512,192,128),cc.rect(3*192,0,192,128)]},
					fire_left: {frames: [cc.rect(0,640,192,128),cc.rect(192,640,192,128),cc.rect(192,640,192,128),cc.rect(192,640,192,128),cc.rect(3*192,128,192,128)]},
					damage_right: {frames: [cc.rect(2*192,512,192,128),cc.rect(2*192,512,192,128),cc.rect(3*192,0,192,128)]},
					damage_left: {frames: [cc.rect(2*192,640,192,128),cc.rect(2*192,640,192,128),cc.rect(3*192,128,192,128)]},
					die_right: {frames: [cc.rect(2*192,512,192,128),cc.rect(2*192,512,192,128),cc.rect(3*192,512,192,128)]},
					die_left: {frames: [cc.rect(2*192,640,192,128),cc.rect(2*192,640,192,128),cc.rect(3*192,640,192,128)]},
					reverence: {frames: [cc.rect(0,6*128,192,128),cc.rect(192,6*128,192,128),cc.rect(2*192,6*128,192,128),cc.rect(192,6*128,192,128),cc.rect(0,6*128,192,128)]},
				},
		};
		return animinfo;
	},

});

var PlayerCharacter = Character.extend({
	ctor: function(label,side,life,allow_hit2,allow_hit3) {
		console.log('player -------');
		this._super(label,side,life);
		this.load_anim_for_class(PlayerCharacter);
		this.moving=false;
		
		this.allow_hit2=allow_hit2; console.log("allow_hit2 : "+this.allow_hit2);
		this.allow_hit3=allow_hit3; console.log("allow_hit3 : "+this.allow_hit3);
		Control.thecontrol.addListener(this);
		Control.thecontrol.sendAtStart();
		
		this.projectiles = [0,1];
		
		this.runAction(cc.sequence( cc.DelayTime.create(util.randomFloat(.5, .8)), cc.callFunc(this.move_revernce,this)));
	},
	
	controlStateChanged:function(cstate) {
		//console.log('control changed');
		this.control_axis_x=cstate[Control.AXIS_X];
		//this.control_axis_y=cstate[Control.AXIS_Y];
		this.control_fire=cstate[Control.MOV_FIRE];
		this.control_fire2=cstate[Control.MOV_FIRE2];
		this.control_fire3=cstate[Control.MOV_FIRE3];
		if (!this.moving && this.control_fire3) this.fire(3);
		if (!this.moving && this.control_fire2) this.fire(2);
		if (!this.moving && this.control_fire) this.fire(1);

		if (this.moving) return;
		this.control_move();
	},

	control_move: function() {
		if (this.life<=0) return;

		if (Math.abs(this.control_axis_x)>0) {
			this.move_step(this.control_axis_x);
		}
	},
	
	fire: function(i) {
		if (i==2 && !this.allow_hit2) return;
		if (i==3 && !this.allow_hit3) return;
		this.hit(i);		
	},
	
	event_move_end: function() {
		this._super();
		//console.log("end");
		this.control_move();
	},

	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/player.png',
		};
		return animfileinfo;
	},


	
	
});






