(function() {
var Screen, slide, init, wheight, setNumber;
Screen = {
	INCALL: 0,
	DIALER: 1
};

init = function() {
	wheight = $(window).height();
	$("#main, #dialer, #incall").height(wheight);
	$("#slide_divs").height(wheight * 2);
	$("#dialer > .box").height(wheight / 6);
	
	$(".in-num").height(wheight * 0.2);
	$("#hangup").height(wheight * 0.15);
	
	$(".digit > div, #call, #hangup").each(function() {
		$(this).bind("touchstart", function() {
			$(this).addClass("selected");
		});
	});
	
	$(".digit > div, #call, #hangup").each(function() {
		$(this).bind("touchend", function() {
			$(this).removeClass("selected");
		});
	});
}

slide = function(d) {
	var px, h;
	
	switch(d) {
		case Screen.INCALL:
			px = "-" + wheight + "px";
			break;
		case Screen.DIALER:
			px = "0px";
			break;
		default:
			console.log("Cannot slide to: " + d);
			px = "0px";
			break;
	}
	
	$("#slide_divs").css("-moz-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("-webkit-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("-o-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("transform","translate(0px, " + px + ")");
};

setNumber = function(num) {
	var txt = $.trim($("#number").text());
	
	if(txt.length === 3) {
		txt += "-";
	} else if(txt.length === 7) {
		txt = "(" + txt.replace("-", ") ") + "-";
	}
	
	$("#number").text(txt + num);
};

$(document).ready(function() {
	var actEvt;

	init();

	$("#call").click(function() {
		slide(Screen.INCALL);
	});
	
	actEvt = 'touchmove' in document.documentElement ? "touchend" : "click";
	$(".digit > div").bind(actEvt, function() {
		setNumber($(this).text());
	});
	
	$("#hangup").click(function() {
		// TODO hang up the phone.
		slide(Screen.DIALER);
	});
	
	$("#hangup").bind("touchend", function() {
		slide(Screen.DIALER);
	});
});
}).call(this);