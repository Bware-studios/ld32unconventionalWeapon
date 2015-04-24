
var Control = cc.Class.extend({
	ctor:function() {
		var parent = this;
		var key_listener = cc.EventListener.create({
			event:cc.EventListener.KEYBOARD,
			onKeyPressed:function(kc,e) {
				parent.onKeyPressed(kc,e);
			},
			onKeyReleased:function(kc,e) {
				parent.onKeyReleased(kc,e);
			}
		});
		cc.eventManager.addListener(key_listener,1000);
		this.listeners=[];
		this.controls_state=[0,0,0,0,0,0,0,0,0];
		console.log("control initiated");
	},

	onKeyPressed:function(kc,e) {
		//console.log('key '+kc+' pressed');
		if (kc==Control.KEY_UP) {
			this.controls_state[Control.MOV_UP]=1;
		} else if (kc==Control.KEY_DOWN) {
			this.controls_state[Control.MOV_DOWN]=1;
		} else if (kc==Control.KEY_LEFT) {
			this.controls_state[Control.MOV_LEFT]=1;
		} else if (kc==Control.KEY_RIGHT) {
			this.controls_state[Control.MOV_RIGHT]=1;
		} else if (kc==Control.KEY_FIRE) {
			this.controls_state[Control.MOV_FIRE]=1;
		} else if (kc==Control.KEY_FIRE2) {
			this.controls_state[Control.MOV_FIRE2]=1;
		} else if (kc==Control.KEY_FIRE3) {
			this.controls_state[Control.MOV_FIRE3]=1;
		}
		var x=this.controls_state[Control.MOV_RIGHT]-this.controls_state[Control.MOV_LEFT];		
		var y=this.controls_state[Control.MOV_DOWN]-this.controls_state[Control.MOV_UP];
		this.controls_state[Control.AXIS_X]=x;
		this.controls_state[Control.AXIS_Y]=y;
		for (var i=0 , nlisteners=this.listeners.length ; i<nlisteners ; i++ ) {
			this.listeners[i].controlStateChanged(this.controls_state);
		}
	},

	onKeyReleased:function(kc,e) {
		//console.log('key '+kc+' released');
		if (kc==Control.KEY_UP) {
			this.controls_state[Control.MOV_UP]=0;
		} else if (kc==Control.KEY_DOWN) {
			this.controls_state[Control.MOV_DOWN]=0;
		} else if (kc==Control.KEY_LEFT) {
			this.controls_state[Control.MOV_LEFT]=0;
		} else if (kc==Control.KEY_RIGHT) {
			this.controls_state[Control.MOV_RIGHT]=0;
		} else if (kc==Control.KEY_FIRE) {
			this.controls_state[Control.MOV_FIRE]=0;
		} else if (kc==Control.KEY_FIRE2) {
			this.controls_state[Control.MOV_FIRE2]=0;
		} else if (kc==Control.KEY_FIRE3) {
			this.controls_state[Control.MOV_FIRE3]=0;
		}
		var x=this.controls_state[Control.MOV_RIGHT]-this.controls_state[Control.MOV_LEFT];		
		var y=this.controls_state[Control.MOV_DOWN]-this.controls_state[Control.MOV_UP];
		this.controls_state[Control.AXIS_X]=x;
		this.controls_state[Control.AXIS_Y]=y;
		for (var i=0 , nlisteners=this.listeners.length ; i<nlisteners ; i++ ) {
			this.listeners[i].controlStateChanged(this.controls_state);
		}
	},

	addListener:function(listener) {
		console.log("listener added");
		this.listeners.push(listener);
	},

	// send controls to be called just after entering rooom 
	sendAtStart: function() {
		for (var i=0 , nlisteners=this.listeners.length ; i<nlisteners ; i++ ) {
			this.listeners[i].controlStateChanged(this.controls_state);
		}		
	},

	clearAllListeners: function() {
		this.listeners=[];
	},
	
});

Control.thecontrol = new Control();
Control.MOV_LEFT=0;
Control.MOV_RIGHT=1;
Control.MOV_UP=2;
Control.MOV_DOWN=3;
Control.AXIS_Y=4;
Control.AXIS_X=5;
Control.MOV_FIRE=6;
Control.MOV_FIRE2=7;
Control.MOV_FIRE3=8;


Control.KEY_LEFT=37;
Control.KEY_RIGHT=39;
Control.KEY_UP=38;
Control.KEY_DOWN=40;
Control.KEY_FIRE=90;
Control.KEY_FIRE2=88;
Control.KEY_FIRE3=67;

