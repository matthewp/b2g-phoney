(function() {
var Screen, slide, init, wheight, wwidth, setNumber, isEventSupported, validateInstall;
Screen = {
	INCALL: 0,
	DIALER: 1,
	CONTACTS: 2
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

validateInstall = function() {
    console.log(location.hash);
    if(location.hash === "#test") {
        if(navigator.apps) {
            navigator.apps.amInstalled(function(d) {
                if(!d) {
                    window.location = "install.html";
                }
            });
        }
    }
};

init = function() {
	var dialerRow, editMaxSpace, editSpace, editBox;
	
	// Prompt the user to install this app, if they haven't already done so.
	validateInstall();

	// Remove browser chrome
	window.scrollTo(0,1);

	wheight = $(window).height();
	wwidth = $(window).width();
	
	$(".row").width(wwidth * 2);
	$(".section").width(wwidth);
	
	dialerRow = wheight / 6;
	$("#main, #dialer, #incall").height(wheight);
	$("#slide_divs").height(wheight * 2);
	$("#dialer > .box").height(dialerRow);
	$("#dialer > .box > div").width($("#dialer > .box").width());
	$(".box-text").css("line-height", (dialerRow - 2) + "px");
	
	// Begin number input area
	editMaxSpace = $("#dialer > .box:first-child").height();
	editSpace = editMaxSpace * 0.70;
	editBox = $(".number-edit");
	editBox.height(editSpace);
	editBox.css("margin-top", (editMaxSpace - editSpace) / 2 + "px");
	$("#number").css("font-size", editSpace * 0.70 + "px")
	// End number input area
	
	// Begin in-call area
	$(".in-num").height(wheight * 0.2);
	$("#hangup").height(wheight * 0.15);
	// End in-call area
	
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
};

slide = function(d) {
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
	
	$("#back").bind(actEvt, function(e) {
		slide(Screen.DIALER);
	});
	
	$(".digit > div").bind(actEvt, function() {
		setNumber($(this).text());
	});
	
	$("#hangup").bind(actEvt, function() {
		slide(Screen.DIALER);
	});
});
}).call(this);