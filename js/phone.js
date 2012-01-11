(function() {
var EventHandler, init, wheight, wwidth, setNumber, isEventSupported, validateInstall, Number;

Number = {
	num: "",

	add: function(n) {
		Number.num += n;
		Number.format();
	},

	del: function() {
		var n;
		n = Number.num;
		Number.num = n.substring(0, n.length - 2);
		Number.format();
	},

	format: function() {
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
		
		Numer._elem.innertText(txt);
	},

	init: function() {
		Number._elem = document.getElementById('number');
	}
};

var App = {
	init: function() {
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
	}
};

var Dialer = {
	handleEvent: function handleEvent(e) {

	},	

	init: function() {
		this.dialer = document.getElementById('dialer');

		var events = ('touchend' in window) ?
			['touchstart', 'touchend'] : ['mousedown', 'click'];

		events.forEach(function(evt) {
			this.dialer.addEventListener(evt, this, true);
		});
	}
};

window.addEventListener('load', function appLoad(e) {
	window.removeEventListener('load', appLoad);
	Number.init();
	Dialer.init();
	App.init();
});

$(document).ready(function() {
	var actEvt;

	init();

	if(window.mozTelephony) {
		alert("Telephony supported");
	} else { alert("Telephony not supported :("); }

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
