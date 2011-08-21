(function() {
var dir, slide, init, wheight, setNumber;
dir = {
	up: 0,
	down: 1
};

init = function() {
	wheight = $(window).height();
	$("#main, #dialer, #incall").height(wheight);
	$("#slide_divs").height(wheight * 2);
	$("#dialer > .box").height(wheight / 6);
}

slide = function(d) {
	var px, h;
	px = d === dir.up ? "-" + wheight + "px" : "0px";
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
	init();

	$("#call").click(function() {
		slide(dir.up);
	});
	
	$(".digit > div").click(function() {
		setNumber($(this).text());
	});
});
}).call(this);