function hideImage() {
	if ( !window.counter ) {
		window.counter = 1;
		run('hidden');
		console.log( 'Run hideImage: ' + window.counter );
	}
	else {
		window.counter++;
		if (window.counter % 2 == 0) {
			run('visible');
			console.log( 'Run hideImage(visible): ' + window.counter );
		}
		else {
			run('hidden');
			console.log( 'Run hideImage(hidden): ' + window.counter );
		}
	}

	function run( param ) {
		var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
			images[i].style.visibility = param;
		}
	}
}

hideImage();