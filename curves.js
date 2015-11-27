var ctx; // canvas contex
var timer = null; // refresh rate
var max = 360;
var m1 = max-1
var m2 = max/2;
var iXo = m2 / 2;
var iYo = m2 / 2;
var rad = 100;

var curve_num = 1;

lj = new Array();
for(i = 0;i < curve_num; i++) {
    lj[i] = new Object();
    lj[i].a = 1;
    lj[i].b = 1;
    lj[i].x_offset = 60 * i;
    lj[i].segs = new Array(); // Line segments
}

function init() {
    var canvas = document.getElementById("canvas");
    if(canvas.getContext) {
	ctx = canvas.getContext("2d");

	//Mousemove event 
	$(document).mousemove(function(e) {
	     a = Math.round(e.pageX/100);
	     b = Math.round(e.pageY/100);
	     for(i = 0;i < curve_num;i++) {
	 	lj[i].a = a;
	 	lj[i].b = b;
	     }
        });

	sf = Math.sin(Math.PI / m2);
	cf = Math.cos(Math.PI / m2);
	s = -sf;
	c = cf;
	for(i = 0;i < curve_num;i++) {
	    for(j = 0;j < m2;j++) {
		s1 = s*cf+c*sf;
		c = c*cf-s*sf;
		s = s1;
		lj[i].segs[j] = Math.round(rad*(1.0+s))+1.0;
		lj[i].segs[j+m2] = Math.round(rad*(1.0-s))+1.0;
	    }
	}
	// Start drawing
	if(!timer) timer = setInterval(draw, 30);
	
    } else { // Canvas not supported
    }
    

}

function draw() {
    ctx.clearRect(0, 0, 400, 400);
    for(i = 0; i < curve_num;i++) {
	Xo= lj[i].segs[iXo];
	Yo= lj[i].segs[iYo];

	ctx.strokeStyle = "#000"
	ctx.beginPath();
	ctx.moveTo(Xo + lj[i].x_offset, Yo);
	
	for(j = max; j > 0; j--) {
            iX = (iXo + lj[i].a) % max;
    	    iY = (iYo + lj[i].b) % m1;
            ctx.lineTo(lj[i].segs[iX] + lj[i].x_offset, lj[i].segs[iY]);
            iXo = iX;
	    iYo = iY;
	    Xo = lj[i].segs[iX];
	    Yo = lj[i].segs[iY];
	}


	ctx.stroke();
    }
}
