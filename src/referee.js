
var Referee = SpriteInScene.extend({
	ctor: function() {
		this._super();
		this.load_anim_for_class(Referee);
		this.setAnchorPoint(cc.p(.5,0));
	},
	
	
	get_animfileinfo: function() {
		var animfileinfo = {
				name: 'res/other.png',
		};
		return animfileinfo;
	},

	get_animinfo: function() {
		console.log("character getaniminfo called");
		var animinfo = {
				//file: 'res/player.png',
				deltat: .3,// GameSprite.delta_t/5,
				frame: cc.rect(0,0,192,128),
				anim: {
					stay: {frames:[cc.rect(0,0,192,128)]},
					win_left: {frames: [cc.rect(0,0,192,128),cc.rect(192,0,192,128),cc.rect(2*192,0,192,128)]},
					win_right: {frames: [cc.rect(0,0,192,128),cc.rect(3*192,0,192,128),cc.rect(4*192,0,192,128)]},
				},
		};
		return animinfo;
	},

	
});

