/* Popup JS for HideImage Chrome Extension. */
console.log( 'Popup.js' );
chrome.browserAction.onClicked.addListener(function(tab) { 
	console.log( 'Test'+ Date() );
});

document.addEventListener('DOMContentLoaded', function() {
	console.log( 'Document is loading again! : [' + Date() +']');
	getCurrentTabUrl(function(url) {
		renderStatus('Hiding Images for: ' + url);
		console.log( 'getCurrentTabUrl' );
	});
});


function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

function getCurrentTabUrl(callback) {
	// Query filter to be passed to chrome.tabs.query - see
	// https://developer.chrome.com/extensions/tabs#method-query
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function(tabs) {
		// chrome.tabs.query invokes the callback with a list of tabs that match the
		// query. When the popup is opened, there is certainly a window and at least
		// one tab, so we can safely assume that |tabs| is a non-empty array.
		// A window can only have one active tab at a time, so the array consists of
		// exactly one tab.
		var tab = tabs[0];

		// A tab is a plain object that provides information about the tab.
		// See https://developer.chrome.com/extensions/tabs#type-Tab
		var url = tab.url;

		// tab.url is only available if the "activeTab" permission is declared.
		// If you want to see the URL of other tabs (e.g. after removing active:true
		// from |queryInfo|), then the "tabs" permission is required to see their
		// "url" properties.
		console.assert(typeof url == 'string', 'tab.url should be a string');

		callback(url);
	});

	// Most methods of the Chrome extension APIs are asynchronous. This means that
	// you CANNOT do something like this:
	//
	// var url;
	// chrome.tabs.query(queryInfo, function(tabs) {
	//   url = tabs[0].url;
	// });
	// alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

// (function() {
	// console.log( 'Starting JS Functions' );
	// if ( !window.counter ) {
		// window.counter = 1;
		// run('hidden');
		// console.log( 'Run hideImage: ' + window.counter );
	// }
	// else {
		// window.counter++;
		// if (window.counter % 2 == 0) {
			// run('visible');
			// console.log( 'Run hideImage(visible): ' + window.counter );
		// }
		// else {
			// run('hidden');
			// console.log( 'Run hideImage(hidden): ' + window.counter );
		// }
	// }

	// function run( param ) {
		// var images = document.getElementsByTagName('img');
		// var l = images.length;
		// for (var i = 0; i < l; i++) {
			// images[i].style.visibility = param;
		// }
	// }
// })();

// function renderStatus(statusText) {
	// document.getElementById('status').textContent = statusText;
// }