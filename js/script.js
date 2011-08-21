(function() {
var dir, slide;
dir = {
	up: 0,
	down: 1
};

slide = function(d) {
	var px;
	px = d === dir.up ? "-500px" : "0px";
	$("#slide_divs").css("-moz-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("-webkit-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("-o-transform","translate(0px, " + px + ")");
	$("#slide_divs").css("transform","translate(0px, " + px + ")");
};

$(document).ready(function() {
	$("#call").click(function() {
		slide(dir.up);
	});
});
}).call(this);