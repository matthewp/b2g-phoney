(function() {

function validateInstall() {
	console.log(location.hash);
	if(location.hash === '#test' && navigator.apps) {
		navigator.apps.amInstalled(function(d) {
			if(!d) {
				window.location = 'install.html';
			}
		});
	}
}

}).call(this);
