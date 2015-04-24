
var TextScene = cc.Scene.extend({
	ctor:function(tsceneinfo) {
		this._super();

		
		if (tsceneinfo) {
			this.tsceneinfo=tsceneinfo;
		} else {
			this.tsceneinfo=Params.gamehistory.start;
		}
		
		
		this.backgr=new cc.LayerGradient(cc.color(255,255,255,255),cc.color(255,255,255,255));
		this.addChild(this.backgr);
		this.back=new cc.Sprite("res/pergamino.png");
		this.back.setAnchorPoint(cc.p(0.5,0.5));
		this.back.setPosition(cc.p(320,240));

		this.backgr.addChild(this.back,1);

		var back2=false;
		if (this.tsceneinfo.monktomonk) {
			back2=new cc.Sprite("res/monk-monk.png");
		}
		if (this.tsceneinfo.monktoalien) {
			back2=new cc.Sprite("res/monk-alien.png");
		}
		if (back2) {
			back2.setPosition(320,-20);
			back2.setAnchorPoint(cc.p(.5,0));
			this.back.addChild(back2);
		}
		

		var back3=false;
		if (this.tsceneinfo.lose) {
			back3=new cc.Sprite("res/looser.png");
		}
		if (this.tsceneinfo.win) {
			back3=new cc.Sprite("res/win.png");
		}
		if (back3) {
			back3.setPosition(100,0);
			back3.setAnchorPoint(cc.p(.5,0));
			this.back.addChild(back3);
		}

		var back4=false;
		if (this.tsceneinfo.winfinish) {
			back4=new cc.Sprite("res/presentacion.png");
			console.log("back4--");
			back4.setPosition(540,0);
			back4.setAnchorPoint(cc.p(.5,0));
			this.back.addChild(back4);
		}
		
		
		var t1=new cc.LabelTTF("","Marker Felt",this.tsceneinfo.tsize);
		t1.setPosition(cc.p(320,300));
		t1.setDimensions(480,1000);
		t1.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		t1.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		t1.setColor(cc.color(0,0,0,255));
		t1.setString(this.tsceneinfo.text);
		this.back.addChild(t1,200);


		if (!this.tsceneinfo.next) {
			t1=new cc.LabelTTF("","Marker Felt",this.tsceneinfo.tsize);
			t1.setPosition(cc.p(320,200));
			t1.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
			t1.setColor(cc.color(255,0,0,255));
			t1.setString("cursor arrows : move    z : attack");
			this.back.addChild(t1,200);
			
			if (this.tsceneinfo.combatparams.allowhit2) {
				t1=new cc.LabelTTF("","Marker Felt",this.tsceneinfo.tsize);
				t1.setPosition(cc.p(320,150));
				t1.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
				t1.setColor(cc.color(255,0,0,255));
				if (this.tsceneinfo.combatparams.allowhit3) {
					t1.setString("x : advanced attack     c : project attack");
				} else {
					t1.setString("x : advanced attack");
				}
				this.back.addChild(t1,200);
			}
		}

		t1=new cc.LabelTTF("","Marker Felt",this.tsceneinfo.tsize);
		t1.setPosition(cc.p(320,100));
		t1.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		t1.setColor(cc.color(0,0,255,255));
		t1.setString("any key to continue");
		this.back.addChild(t1,200);

		
		this.anykeypressed = false;
		
		var parent = this;
		this.any_key_listener = cc.EventListener.create({
			event:cc.EventListener.KEYBOARD,
			onKeyPressed:function(kc,e) {
				//parent.onKeyPressed(kc,e);
				parent.anykey_pressed();
			},
			onKeyReleased:function(kc,e) {
				//parent.onKeyReleased(kc,e);
				parent.anykey_released();
			}
		});
		cc.eventManager.addListener(this.any_key_listener,1000);
		
		cc.audioEngine.stopMusic();
		cc.audioEngine.playMusic("res/MenuLD32.mp3", true);
		
	},
	
	anykey_pressed: function() {
		this.anykeypressed = true;
	},

	anykey_released: function() {
		if ( !this.anykeypressed ) return;
		cc.eventManager.removeListener(this.any_key_listener);
		if (this.tsceneinfo.next) {
			var newinfo = Params.gamehistory[this.tsceneinfo.next];
			cc.director.runScene(new TextScene(newinfo));
		} else { // next es un combate
			var wininfo = Params.gamehistory[this.tsceneinfo.nextwin];
			var lostinfo = Params.gamehistory[this.tsceneinfo.nextlost];
			var gs = new Scene();
			gs.set_nextscenes(wininfo,lostinfo);
			gs.set_combatparams(this.tsceneinfo.combatparams);
			gs.start_from_history();
			cc.director.runScene(gs);
		}
	},
	
});
