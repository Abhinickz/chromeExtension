/* Popup JS for HideImage Chrome Extension. */
console.log( 'background.js:' );

document.addEventListener( 'DOMContentLoaded', function() {
	console.log( 'Document is loading again! : [' + Date() +']');
	getCurrentTabUrl( function( url ) {
		// renderStatus('Hiding Images for: ' + url);
		console.log( 'getCurrentTabUrl:' + url );
	});
});

chrome.commands.onCommand.addListener(function( command ) {
	console.log('onCommand event received for message: '+ command );
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	tab = chrome.tabs.query( queryInfo, function( tabs ) {
		var tab = tabs[0];
		console.log('Tab Information: '+ tab );
		console.dir( tab );
		return tab;
	});
	execute_content_js(tab);
});

chrome.browserAction.onClicked.addListener( function( tab ) { 
	// hideImage();
	console.dir( tab );
	console.log( 'onClicked:'+ tab.url );
	execute_content_js (tab.id);
});

function execute_content_js(tab_id){
	chrome.tabs.executeScript(tab_id, { file: "js/content.js" });
}

function getCurrentTabUrl( callback ) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query( queryInfo, function( tabs ) {
		var tab = tabs[0];
		var url = tab.url;
		console.assert( typeof url == 'string', 'tab.url should be a string' );
		callback(url);
	});
}

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
