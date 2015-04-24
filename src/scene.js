

var Scene = cc.Scene.extend({
	ctor: function() {
		this._super();
		
		
//		this.back=new cc.LayerGradient(cc.color(255,255,255,255),cc.color(255,255,255,255));
		this.back=new cc.Sprite("res/Fondo.png");
		this.back.setAnchorPoint(cc.p(0.5,0.5));
		this.back.setPosition(cc.p(320,240));
		
		this.addChild(this.back);
		
		this.p1label=new cc.LabelTTF("111","Marker Felt",48);
		this.p1label.setColor(cc.color(0,0,0,255));
		this.p1label.setPosition(cc.p(100,400));
		this.back.addChild(this.p1label,200);

		this.olabel=new cc.LabelTTF("222","Marker Felt",48);
		this.olabel.setColor(cc.color(0,0,0,255));
		this.olabel.setPosition(cc.p(540,400));
		this.back.addChild(this.olabel,200);

		
		
		Scene.thescene=this;

		
		this.r1 = new Referee();
		this.back.addChild(this.r1,1);
		this.r1.setXY(10,50);

		//this.startRound();
	
	},
	
	set_nextscenes: function(win,lost) {
		this.next_scene_win = win;
		this.next_scene_lost = lost;
	},
	
	set_combatparams: function(cparams) {
		this.mlife=5;
		this.cparams=cparams;
		this.olife=cparams.olife;
		
	},

	start_from_history: function() {
		this.startRound();		
	},
	
	startRound: function() {
		cc.audioEngine.stopMusic();
		cc.audioEngine.playMusic("res/MelodiaLD32.mp3", true);
		cc.audioEngine.playEffect("res/gong.mp3");

		this.p1=new PlayerCharacter(this.p1label,1,this.mlife,this.cparams.allowhit2,this.cparams.allowhit3);
		this.back.addChild(this.p1,10);
		this.p1.setXY(-200,0);


		if (this.cparams.oponent) {
			this.o1=new AlienOponent(this.olabel,0,this.olife,this.cparams.oallowhit2,this.cparams.oallowhit3,this.cparams.behavior);
		} else {
			this.o1=new HumanOponent(this.olabel,0,this.olife,this.cparams.oallowhit2,this.cparams.oallowhit3,this.cparams.behavior);			
		}
		this.back.addChild(this.o1,10);
		this.o1.setXY(200,0);

		this.o1.setTarget(this.p1);
		this.p1.setTarget(this.o1);
		
		this.r1.runAnim("stay");
		
		
		
	},
	
	
	has_died: function(side) {
		this.runAction(cc.sequence( cc.DelayTime.create(1), cc.callFunc(this.finish,this)));
		this.winer=side;
	},
	
	finish: function() {
		this.r1.runAnim(this.winer>0?"win_right":"win_left");
		
		//		this.runAction(cc.sequence( cc.DelayTime.create(5), cc.callFunc(this.restart,this)));
		this.runAction(cc.sequence( cc.DelayTime.create(3), cc.callFunc(this.return_to_history,this)));
	},
	
	
	return_to_history: function() {
		if (this.winer>0) { // other wins
			cc.director.runScene(new TextScene(this.next_scene_lost));
		} else { // you win
			cc.director.runScene(new TextScene(this.next_scene_win));
		}
	},
	
// restart scene before the history screens	
	restart: function() {
		console.log("restart");
		this.p1.removeFromParent();
		this.o1.removeFromParent();
		Control.thecontrol.clearAllListeners();
		this.startRound();
	},
	
	
});


Scene.thescene = null;

