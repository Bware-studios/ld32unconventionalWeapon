
var Params = function(){};

Params.scene_w = 640;
Params.scene_h = 480;
Params.floor_pos = 30;
Params.center_pos = 320;

Params.slow_factor=1.0; // 1.0 more to slow
Params.step_delta_t = .2 *Params.slow_factor;
Params.step_delta_f = .05 *Params.slow_factor;
Params.step_x_size = 30;

Params.projectile_v=500;



Params.gamehistory = {
		start: {
			text: "The Way of the Unconventional Weapon. A game by Bware studios for LD32",
			tsize: 20,
			next: "intro",
		},
		
		intro: {
			text: "On the far mountain of Haglirglar the Xadrufar Monks preserve the ancient arts of combat. Initiates are trained to master every known weapon. But only the bravest spirits of them can reach the highest of the skils and follow The Way of the Unconventional Weapon... because anyone can damage other with a sword but it takes the greatest inner power to defeat your enemies with just a carrot.",
			tsize: 20,
			next: "level1",
		},

		level1: {
			text: "To finish your training and prove your skills you must defeat Hi-Pan the master of advanced combat techniques in the ceremonial tatami",
			tsize: 24,
			combatparams: { olife: 8 , oponent:0 , allowhit2:0 , allowhit3:0 , oallowhit2:0 , oallowhit3:0 , behavior:[0.6, 0.2, 0.1,  0.8, 0.8, 0.4 ]  },
			//monktomonk: true,
			nextwin: "level1win",
			nextlost: "level1lost",
		},
		level1win: {
			text: "Your spirit is strong and so is your is your pan, advance to the next step",
			tsize: 24,
			win: true,
			next: "level2",
		},
		level1lost: {
			text: "You got and F in advanced combat techniques, sorry you better choose another career",
			tsize: 24,
			lose: true,
			next: "start",
		},


		level2: {
			text: "To gain the next level of enlightenment confront Hi-Zan the war vegetables master in the ceremonial tatami",
			tsize: 24,
			combatparams: { olife: 9 , oponent:0 , allowhit2:0 , allowhit3:0 , oallowhit2:1 , oallowhit3:0 , behavior:[0.6, 0.2, 0.1,  0.6, 0.0, 0.7 ]  },
			//monktomonk: true,
			nextwin: "level2win",
			nextlost: "level2lost",
		},
		level2win: {
			text: "Well done, focus your carrot-fu and progress to the next level",
			tsize: 24,
			win: true,
			next: "level3",
		},
		level2lost: {
			text: "Those, who can be defeated by carrot hits do not deserve the the way of the unconventional weapon",
			tsize: 24,
			lose: true,
			next: "start",
		},

		level3: {
			text: "Before being allowed the next piece of knowledge you will have to defeat Ha-Me the master thrower of things in the... guess? ... the ceremonial tatami",
			tsize: 24,
			combatparams: { olife: 10 , oponent:0 , allowhit2:1 , allowhit3:0 , oallowhit2:1 , oallowhit3:1 , behavior:[0.5, 0.5, 0.15,  0.7, 0.8, 0.8 ]    },
			//monktomonk: true,
			nextwin: "level3win",
			nextlost: "level3lost",
		},
		level3win: {
			text: "You are really a carrot-fu master",
			tsize: 24,
			win: true,
			next: "level4",
		},
		level3lost: {
			text: "Oooh we had such high hopes on you... go home... next initiate, please",
			tsize: 24,
			lose: true,
			next: "start",
		},

		
		level4: {
			text: "Well... it seems you presented just 6 copies of your application form for the unconventional objects throwing course, instead of the 7 copies needed... so you have to defeat Ni-Say the master of burocracy and course inscriptions or be expeled from the monastery. In the ceremonial tatami of course",
			tsize: 20,
			combatparams: { olife: 12 , oponent:0 , allowhit2:1 , allowhit3:1 , oallowhit2:1 , oallowhit3:1  , behavior:[0.5, 0.5, 0.15,  0.8, 0.8, 0.8 ]   },
			//monktomonk: true,
			nextwin: "level4win",
			nextlost: "level4lost",
		},
		level4win: {
			text: "Ok, you are allowed to continue",
			tsize: 24,
			win: true,
			next: "level5",
		},
		level4lost: {
			text: "Sorry... you may fill the correct number of forms in your next reincarnation",
			tsize: 24,
			lose: true,
			next: "start",
		},


		level5: {
			text: "You are now prepared to fight the ancient daemon of Bra-Inina-Jar an ancient being, probably an alien skilled in the most refined interestelar combat skills. Defeat him and you will graduate with honors in The Way of the Unconventional Weapon",
			tsize: 24,
			combatparams: { olife: 15 , oponent:1 , allowhit2:1 , allowhit3:1 , oallowhit2:1 , oallowhit3:1  , behavior:[0.6, 0.6, 0.15,  0.8, 0.7, 0.7 ] },
			//monktoalien: true,
			nextwin: "level5win",
			nextlost: "level5lost",
		},
		level5win: {
			text: "The wielder of this document has a degree in The Way of the Unconventional Weapon by the Monastery of Xadrufar",
			tsize: 24,
			win: true,
			winfinish: true,
			next: "start",
		},
		level5lost: {
			text: "You were so near... it is a shame... it looks he is who taught the monks the ancient knowledge of unconventional weapon fighting",
			tsize: 24,
			lose: true,
			next: "start",
		},

		
};


