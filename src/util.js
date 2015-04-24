
var util = function(){};

util.posFromXY= function(x,y) {
	return cc.p(x+Params.center_pos, y+Params.floor_pos);
};

util.posFromCoords= function(p) {
	return cc.p(p.x+Params.center_pos, p.y+Params.floor_pos);
};

util.coordsFromPos= function(p) {
	return cc.p(p.x-Params.center_pos, p.y-Params.floor_pos);
};


util.randomInt=function(min,max) {
	var r=Math.random();
	var i=Math.floor(r*1000000)%(max-min)+min;
	return i;
};

util.randomFloat=function(min,max) {
	var r=Math.random();
	var f=r*(max-min)+min;
	return f;
};

util.randomP=function() {
	return Math.random();
};


util.randomPick=function(a) {
	var r=Math.random();
	var i=Math.floor(r*1000000)%a.length;
	return a[i];
};
