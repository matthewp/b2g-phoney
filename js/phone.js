(function() {
var EventHandler, init, wheight, wwidth, setNumber, isEventSupported, validateInstall, TeleNumber;

TeleNumber = {
	num: "",

	add: (function(n) {
		this.num += n;
		this.format();
	}).bind(this),

	del: (function() {
		var n;
		n = this.num;
		this.num = n.substring(0, n.length - 2);
		this.format();
	}).bind(this),

	format: (function() {
		var n, len, txt;
		n = this.num;
		len = n.length;
		
		if(len <= 5) {
			txt = n;
		} else if(len > 5 && len < 8) {
			txt = n.substring(0, 3) + "-" + n.substring(3);
		} else if(len >= 8) {
			txt = "(" + n.substring(0, 3) + ") " + n.substring(3, 6) + "-" + n.substring(6);
		}
		
		this._elem.innertText(txt);
	}).bind(this),

	init: (function() {
		this._elem = document.getElementById('number');
	}).bind(this)
};

// This code is evil. I am ashamed of setting style in JavaScript like this, it will be removed!
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

// A key represents a pressable button in the dialer.
function Key(elem) {
	this._key = elem.innerText;

	['click', 'touchend'].forEach(function(evt) {
		elem.addEventListener(evt, this, true);
	});
}

Key.prototype = {
	handleEvent: function handleEvent(e) {
		TeleNumber.add(this._key);
	}
};

// Handles the dialer screen.
// TODO Add event for call click.
var Dialer = {
	handleEvent: function handleEvent(e) {

	},	

	init: (function() {
		var elems = Array.prototype.slice.call(document.querySelectorAll(".digit > .box-text"));
		elems.forEach(function(elem) {
			new Key(elem);
		});
	}).bind(this)
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
