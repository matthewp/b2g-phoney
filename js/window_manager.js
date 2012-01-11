(function() {
'use strict';

var Screen = {
	INCALL: 0,
	DIALER: 1,
	CONTACTS: 2
};


var WindowManager = {
	slide: function(d) {
		var wpx, hpx, h;
		
		wpx = "0px";
		hpx = "0px";
		
		switch(d) {
			case Screen.INCALL:
				hpx = "-" + wheight + "px";
				break;
			case Screen.DIALER:
				hpx = "0px";
				break;
			case Screen.CONTACTS:
				wpx = "-" + wwidth + "px";
				break;
			default:
				console.log("Cannot slide to: " + d);
				wpx = "0px";
				hpx = "0px";
				break;
		}
		
		$("#slide_divs").css("-moz-transform","translate(" + wpx + ", " + hpx + ")");
		$("#slide_divs").css("-webkit-transform","translate(" + wpx + ", " + hpx + ")");
		$("#slide_divs").css("-o-transform","translate(" + wpx + ", " + hpx + ")");
		$("#slide_divs").css("transform","translate(" + wpx + ", " + hpx + ")");
	}
};

this.Screen = Screen;
this.WindowManager = WindowManager;

}).call(this);
