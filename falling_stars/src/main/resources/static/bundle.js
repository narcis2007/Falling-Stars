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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ExternalResourceLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWebsiteContent; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Narcis2007 on 13.02.2017.
 */

function getBrowser() {
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) return "Opera";
    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined') return "Firefox";
    // Safari 3.0+
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    }(!window['safari'] || safari.pushNotification)) return "Safari";
    // Internet Explorer 6-11

    if (false || !!document.documentMode) return "Internet Explorer";
    // Edge 20+
    if (!(false || !!document.documentMode) && !!window.StyleMedia) return "Edge";
    // Chrome 1+
    if (!!window.chrome && !!window.chrome.webstore) return "Chrome";
    // Blink engine detection
    if ((isChrome || isOpera) && !!window.CSS) return "Blink";
    return "Unknown";
}

function getWebsiteContent() {

    var body = document.body;
    return body.textContent || body.innerText;
}

var ExternalResourceLoader = function () {
    function ExternalResourceLoader(finalCallback) {
        _classCallCheck(this, ExternalResourceLoader);

        this.loaders = [];
        console.log(finalCallback);
        this.finalCallBack = finalCallback;
    }

    _createClass(ExternalResourceLoader, [{
        key: 'pushScript',
        value: function pushScript(src) {
            console.log('push ' + src);
            this.loaders.push(function () {
                this.loadScript(src, this.load.bind(this));
            }.bind(this));
        }
    }, {
        key: 'pushStyle',
        value: function pushStyle(href) {
            console.log('push ' + href);
            this.loaders.push(function () {
                this.loadStyle(href, this.load.bind(this));
            }.bind(this));
        }
    }, {
        key: 'load',
        value: function load() {
            console.log("load");
            console.log(this.loaders);
            if (this.loaders.length > 0) {
                console.log('load script: ');
                console.log(this.loaders);
                this.loaders.shift()();
            } else {
                this.finalCallBack();
            }
        }
    }, {
        key: 'loadScript',
        value: function loadScript(src, callback) {
            // avoid duplicates
            for (var i = 0; i < document.scripts.length; i++) {
                if (document.scripts[i].src == src) {
                    return;
                }
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = src;
            script.async = 'async';
            if (callback) {
                script.onreadystatechange = function () {
                    if (this.readyState == 'complete') callback(); //the whole script is wrapped in this function
                };
                script.onload = callback;
            }
            head.appendChild(script);
        }
    }, {
        key: 'loadStyle',
        value: function loadStyle(href, callback) {
            // avoid duplicates
            for (var i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].href == href) {
                    return;
                }
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.async = 'async';
            link.href = href;
            if (callback) {
                link.onreadystatechange = function () {
                    if (this.readyState == 'complete') callback(); //the whole script is wrapped in this function
                };
                link.onload = callback;
            }
            head.appendChild(link);
        }
    }]);

    return ExternalResourceLoader;
}();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateAdds", function() { return generateAdds; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation__ = __webpack_require__(5);
/**
 * Created by Narcis2007 on 16.10.2016.
 */





var percentage = 100;

var matchText = function matchText(node, regex, callback, excludeElements) {

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas', 'a']);
    var child = node.firstChild;

    while (child) {
        switch (child.nodeType) {
            case 1:
                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) break;
                var nodeComputedStyle = window.getComputedStyle(node, null);
                if (nodeComputedStyle.getPropertyValue("overflow") != "hidden") matchText(child, regex, callback, excludeElements);
                break;
            case 3:
                var bk = 0;
                if (Math.random() * 100 < percentage) {
                    child.data.replace(regex, function (all) {
                        var args = [].slice.call(arguments),
                            offset = args[args.length - 2],
                            newTextNode = child.splitText(offset + bk),
                            tag;

                        bk -= child.data.length + all.length;

                        newTextNode.data = newTextNode.data.substr(all.length);
                        tag = callback.apply(window, [child].concat(args));

                        child.parentNode.insertBefore(tag, newTextNode);
                        child = newTextNode;
                    });
                }

                regex.lastIndex = 0;
                break;
        }

        child = child.nextSibling;
    }

    return node;
};

function onClick(advertisementId) {
    console.log("link clicked " + advertisementId);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {

                var response = JSON.parse(xmlhttp.responseText);
                console.log(response);
                if (response.goalReached == true) location.reload(); //temporary solution, I have to figure out how to revert the links generated after a script config reload
            } else {
                console.log(xmlhttp);
            }
        }
    };
    var data = {
        advertisementId: advertisementId,
        browser: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getBrowser */])(), websiteName: fallingScript.getAttribute("data-website")
    };
    xmlhttp.open("POST", config.clickCountUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function generateAdds(config) {
    percentage = config.percentage;
    console.log("generateAdds");
    console.log("about to replace words");
    var footnotesDiv = document.createElement("div");
    footnotesDiv.classList.add("footnotes");
    var footnotesList = document.createElement("ol");

    footnotesDiv.appendChild(footnotesList);

    var advertisements = config.advertisements;
    for (var i = 0; i < advertisements.length; i++) {
        var searchTerm = advertisements[i].text;
        for (var j = 0; j < config.elements.length; j++) {
            matchText(config.elements[j], new RegExp("\\b" + searchTerm + "\\b", "g"), function (node, match, offset) {
                var advertisementId = advertisements[i].id;
                console.log("advertisementId " + advertisementId);
                var url = advertisements[i].url;
                console.log("url " + url);

                var link = document.createElement("a");
                link.href = url;
                link.classList.add(config.defaultUrlClassName);
                link.classList.add("tlt");
                link.textContent = match;
                link.target = "_blank";
                link.setAttribute("advertisementId", advertisementId);

                if (!config.follow) {
                    link.rel = "nofollow"; //very important for SEO, it doesn't affect google page rank
                }

                var footnoteSpan = document.createElement("span");
                footnoteSpan.setAttribute('rel', 'footnote');
                footnoteSpan.setAttribute('href', '#fn:' + advertisementId);
                footnoteSpan.id = "fnref:" + advertisementId;
                footnoteSpan.appendChild(link);

                if (!document.getElementById("fn:" + advertisementId)) {
                    var innerIframe = document.createElement("iframe");
                    innerIframe.classList.add("frame");
                    innerIframe.src = url;
                    var footnoteListElement = document.createElement("li");
                    footnoteListElement.classList.add("footnote");
                    footnoteListElement.id = "fn:" + advertisementId;
                    footnoteListElement.appendChild(innerIframe);
                    footnotesList.appendChild(footnoteListElement);
                }
                var span = document.createElement("span");
                span.onclick = function () {
                    onClick(advertisementId);
                };

                span.appendChild(footnoteSpan);

                return span;
            });
        }
    }
    document.body.appendChild(footnotesDiv);
    $.bigfoot({
        deleteOnUnhover: true,
        hoverDelay: 5000,
        activateOnHover: true,
        actionOriginalFN: "hide", //actionOriginalFN must be hide or ignore if useFootnoteOnlyOnce=true
        useFootnoteOnlyOnce: false
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__animation__["a" /* default */])(config);
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSiteConfiguration", function() { return loadSiteConfiguration; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/**
 * Created by Narcis2007 on 13.02.2017.
 */

 //TODO: make a class for this
//https://falling-stars.cfapps.io
var config = {
    defaultSearchTag: "body",
    percentage: 20,
    follow: false,
    defaultUrlClassName: "link",
    elements: [],
    siteConfigUrl: "https://falling-stars.cfapps.io/api/fallingScript",
    clickCountUrl: "https://falling-stars.cfapps.io/api/clickDetails/",
    inAnimation: null,
    outAnimation: null
};

function loadSiteConfiguration() {
    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();

        var fallingScript = document.getElementById("fallingScript");
        var data = { content: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* getWebsiteContent */])(), website: fallingScript.getAttribute("data-website") };
        xmlhttp.open("POST", config.siteConfigUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Cache-Control", "max-age=2592000");
        xmlhttp.setRequestHeader("Pragma", "max-age=2592000");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {

                    var siteConfiguration = JSON.parse(xmlhttp.responseText);
                    console.log(siteConfiguration);
                    initializeElements(siteConfiguration);
                    resolve(siteConfiguration);
                } else {
                    console.log(xmlhttp);
                }
            }
        };

        xmlhttp.send(JSON.stringify(data));
    });
}

function initializeElements(siteConfiguration) {

    if (siteConfiguration.elements === null) {
        console.log("config elements null");
        siteConfiguration.elements = document.getElementsByTagName(config.defaultSearchTag);
    } else {
        var elements = [];
        for (var i = 0; i < siteConfiguration.elements.length; i++) {
            elements.push(document.getElementById(siteConfiguration.elements[i]));
        }
        siteConfiguration.elements = elements;
    }
}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adds__ = __webpack_require__(1);
/**
 * Created by Narcis2007 on 14.02.2017.
 */




if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://falling-stars.cfapps.io/sw.js');
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__config__["loadSiteConfiguration"])().then(function (config) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__adds__["generateAdds"])(config);
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/**
 * Created by Narcis2007 on 14.02.2017.
 */



var insertDependencies = function insertDependencies(callback) {

                var loader = new __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* ExternalResourceLoader */](callback);
                loader.pushStyle('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
                loader.pushScript('https://code.jquery.com/jquery-3.1.1.min.js');
                loader.pushScript('https://cdn.bootcss.com/lettering.js/0.7.0/jquery.lettering.min.js');
                loader.pushScript('https://cdnjs.cloudflare.com/ajax/libs/textillate/0.4.0/jquery.textillate.min.js');

                loader.load();
};

function textillate(config) {
                insertDependencies(function () {
                                var $JQuery = $.noConflict(true);

                                $JQuery('.tlt').textillate({
                                                // the default selector to use when detecting multiple texts to animate
                                                selector: '.tlt',

                                                // enable looping
                                                loop: true,

                                                // sets the minimum display time for each text before it is replaced
                                                minDisplayTime: 5000,

                                                // sets the initial delay before starting the animation
                                                // (note that depending on the in effect you may need to manually apply
                                                // visibility: hidden to the element before running this plugin)
                                                initialDelay: 0,

                                                // set whether or not to automatically start animating
                                                autoStart: true,

                                                // custom set of 'in' effects. This effects whether or not the
                                                // character is shown/hidden before or after an animation
                                                inEffects: [],

                                                // custom set of 'out' effects
                                                outEffects: [],

                                                // in animation settings
                                                in: {
                                                                // set the effect name
                                                                effect: config.inAnimation.name,

                                                                // set the delay factor applied to each consecutive character
                                                                delayScale: 1.5,

                                                                // set the delay between each character
                                                                delay: 50,

                                                                // set to true to animate all the characters at the same time
                                                                sync: false,

                                                                // randomize the character sequence
                                                                // (note that shuffle doesn't make sense with sync = true)
                                                                shuffle: false,

                                                                // reverse the character sequence
                                                                // (note that reverse doesn't make sense with sync = true)
                                                                reverse: false,

                                                                // callback that executes once the animation has finished
                                                                callback: function callback() {}
                                                },

                                                // out animation settings.
                                                out: {
                                                                effect: config.outAnimation.name,
                                                                delayScale: 1.5,
                                                                delay: 50,
                                                                sync: false,
                                                                shuffle: false,
                                                                reverse: false,
                                                                callback: function callback() {}
                                                },

                                                // callback that executes once textillate has finished
                                                callback: function callback() {},

                                                // set the type of token to animate (available types: 'char' and 'word')
                                                type: 'char'
                                                //function () {
                                                //     if (Math.random() * 100 < 50)
                                                //         return 'word';
                                                //     return 'char'
                                                // }()
                                });

                                $JQuery('.tlt').textillate('start');
                });
}

/* harmony default export */ __webpack_exports__["a"] = (textillate);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".visible {\r\n    display: block;\r\n    position: relative;\r\n    z-index: 100;\r\n}\r\na{\r\n    color:green;\r\n}\r\n\r\ndiv.iframe-link {\r\n    display: none;\r\n    width: 100%;\r\n}\r\na.iframe-link {\r\n    text-decoration:none;\r\n    position: fixed;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    width:500px;\r\n    height:500px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);