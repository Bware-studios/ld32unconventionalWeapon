
var OponentCharacter = Character.extend({
	ctor: function(label,side,life,allow_hit2,allow_hit3,behavior) {
		console.log('oponent -------');
		this._super(label,side,life);
		// coment to stop

		this.allow_hit2=allow_hit2;
		this.allow_hit3=allow_hit3;
		this.projectiles = [0,1];
		
		this.ps=[0.5, 0.2, 0.1,  0.6, 0.6, 0.4 ]; // acercarse ataquedistancia alejarse   alejarse pegarlight pegarfuerte
		if (behavior) this.ps=behavior;

		console.log("p hit1 "+this.ps[4]);
		
		this.runAction(cc.sequence( cc.DelayTime.create(util.randomFloat(0, .2)), cc.callFunc(this.move_revernce,this)));
	},


	decide_move: function() {
		if (this.life<=0) return;
		
		var d = this.get_target_distance();
		
		if (d>110) {
			if (util.randomP()<this.ps[0]) {
				this.move_step(this.get_target_dir());
				return;
			}
			
			if (this.allow_hit3) {
				if (util.randomP()<this.ps[1]) {
					this.hit(3);
					return;
				}
			}
			
			if (util.randomP()<this.ps[2]) {
				this.move_step(-this.get_target_dir());
				return;
			}
			
			this.wait(.1,.3);
			
		} else {
			
			if (util.randomP()<this.ps[3]) {
				this.move_step(-this.get_target_dir());
				return;
			}

			if (util.randomP()<this.ps[4]) {
				this.hit(1);
				return;
			}

			if (this.allow_hit2) {
				if (util.randomP()<this.ps[5]) {
					this.hit(2);
					return;
				}
			}

			this.wait(.05,.1);
			
		}
				
		//var r=util.randomInt(0, 4);
		//if (r==0) this.wait(1,3);
		//else if (r==1) this.move_step(this.get_target_dir());
		//else if (r==2) this.move_step(-this.get_target_dir());
		//else if (r==3) this.hit(util.randomInt(1,4));
		//else console.log('undefined move');
	},
	
	wait: function(t) {
//		console.log('waiting '+t);
		this.runAction(cc.sequence( cc.DelayTime.create(t), cc.callFunc(this.decide_move,this)));
	},
	
	event_move_end: function() {
		this._super();
		this.decide_move();
	},
	
});

var HumanOponent = OponentCharacter.extend({
	ctor: function(label,side,life,allow_hit2,allow_hit3,b) {
		this._super(label,side,life,allow_hit2,allow_hit3,b);
		this.load_anim_for_class(HumanOponent);
		this.projectiles = [0,1];
	},
	
	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/player.png',
		};
		return animfileinfo;
	},

});


var AlienOponent = OponentCharacter.extend({
	ctor: function(label,side,life,allow_hit2,allow_hit3,b) {
		this._super(label,side,life,allow_hit2,allow_hit3,b);
		this.load_anim_for_class(AlienOponent);
		this.projectiles = [2];
	},

	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/bad_1.png',
		};
		return animfileinfo;
	},

});

