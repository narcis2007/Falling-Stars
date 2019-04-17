var serviceWorkerOption = {
  "assets": [
    "/bundle.js"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Created by Narcis2007 on 13.07.2017.
 */

importScripts('https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js');

self.toolbox.router.post('/api/fallingScript', handleRequest, { origin: 'https://falling-stars.cfapps.io' });
// self.toolbox.router.get('/**', self.toolbox.cacheFirst);

function handleRequest(request) {

    // Open (or create) the database
    var open = indexedDB.open("FallingStarsDatabase", 1);

    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        var store = db.createObjectStore("AddsConfigStore", { keyPath: "path" });
        var index = store.createIndex('expirationTimestampIndex', 'expirationTimestamp');
    };

    return new Promise(function (resolve, reject) {
        open.onsuccess = function () {
            // Start a new transaction
            var db = open.result;
            var tx = db.transaction("AddsConfigStore", "readwrite");
            var store = tx.objectStore("AddsConfigStore");

            // Anything in the past:
            var range = IDBKeyRange.upperBound(Date.now());

            var getFromNetworkOrCache = function getFromNetworkOrCache() {
                // Query the data
                var getPath = store.get(request.referrer);

                getPath.onsuccess = function () {
                    if (getPath.result) {
                        resolve(new Response(getPath.result.responseData));
                        console.log(getPath.result.responseData);
                    } else {
                        global.fetch(request).then(function (response) {
                            var responseCopy = response.clone();

                            // Add some data
                            responseCopy.text().then(function (body) {
                                var tx2 = db.transaction("AddsConfigStore", "readwrite");
                                var store2 = tx2.objectStore("AddsConfigStore");
                                store2.put({ path: request.referrer, expirationTimestamp: Date.now() + SEVEN_DAYS, responseData: body });
                            });

                            resolve(response);
                        });
                    }
                    ;
                };
            };

            tx.objectStore('AddsConfigStore').index('expirationTimestampIndex').openCursor(range).onsuccess = function (e) {
                var cursor = e.target.result;
                if (!cursor) {
                    getFromNetworkOrCache();
                    return;
                }
                console.log('deleting: ' + cursor.key);
                cursor.delete();
                cursor.continue();
            };
        };
    }).then(function (result) {
        console.log("promised resolved");
        open.result.close(); //close db
        return result;
    });
}

var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);