(function() {
var Screen, slide, init, wheight, setNumber, isEventSupported;
Screen = {
	INCALL: 0,
	DIALER: 1
};

isEventSupported = (function(){
    var TAGNAMES = {
      'select':'input','change':'input',
      'submit':'form','reset':'form',
      'error':'img','load':'img','abort':'img'
    }
    function isEventSupported(eventName) {
      var el = document.createElement(TAGNAMES[eventName] || 'div');
      eventName = 'on' + eventName;
      var isSupported = (eventName in el);
      if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
      }
      el = null;
      return isSupported;
    }
    return isEventSupported;
  })();

init = function() {
	var dialerRow;

	// Remove browser chrome
	window.scrollTo(0,1);

	wheight = $(window).height();
	dialerRow = wheight / 6;
	$("#main, #dialer, #incall").height(wheight);
	$("#slide_divs").height(wheight * 2);
	$("#dialer > .box").height(dialerRow);
	$(".box-text").css("line-height", (dialerRow - 2) + "px");
	
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

	actEvt = isEventSupported('touchend') ? "touchend" : "click";
	$("#call").bind(actEvt, function() {
		slide(Screen.INCALL);
	});
	
	$(".digit > div").bind(actEvt, function() {
		setNumber($(this).text());
	});
	
	$("#hangup").bind(actEvt, function() {
		slide(Screen.DIALER);
	});
});
}).call(this);