(function() {
var Screen, slide, init, wheight, wwidth, setNumber, isEventSupported, validateInstall, Number;
Screen = {
	INCALL: 0,
	DIALER: 1,
	CONTACTS: 2
};

Number = Number || {};
Number.num = "";
Number.add = function(n) {
	Number.num += n;
	Number.format();
};

Number.del = function() {
	var n;
	n = Number.num;
	Number.num = n.substring(0, n.length - 2);
	Number.format();
};

Number.format = function() {
	var n, len, txt;
	n = Number.num;
	len = n.length;
	
	if(len <= 5) {
		txt = n;
	} else if(len > 5 && len < 8) {
		txt = n.substring(0, 3) + "-" + n.substring(3);
	} else if(len >= 8) {
		txt = "(" + n.substring(0, 3) + ") " + n.substring(3, 6) + "-" + n.substring(6);
	}
	
	$("#number").text(txt);
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
      return;
    }

    if(navigator.apps) {
      navigator.apps.amInstalled(function(d) {
        if(!d) {
          window.location = "install.html";
        }
      });
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
	
	$(".digit > div, #call, .hangup").each(function() {
		$(this).bind("touchstart", function() {
			$(this).addClass("selected");
		});
	});
	
	$(".digit > div, #call, .hangup").each(function() {
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
		Number.add($(this).text());
	});
	
	$("#hangup").bind(actEvt, function(e) {
		slide(Screen.DIALER);
	});
});
}).call(this)
