/**
 * Created by Narcis2007 on 13.02.2017.
 */

function getBrowser() {
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
        return "Opera";
// Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined')
        return "Firefox";
// Safari 3.0+
    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || safari.pushNotification))
        return "Safari";
// Internet Explorer 6-11

    if (false || !!document.documentMode)
        return "Internet Explorer";
// Edge 20+
    if (!(false || !!document.documentMode) && !!window.StyleMedia)
        return "Edge";
// Chrome 1+
    if (!!window.chrome && !!window.chrome.webstore)
        return "Chrome";
// Blink engine detection
    if ((isChrome || isOpera) && !!window.CSS)
        return "Blink";
    return "Unknown";
}

function getWebsiteContent() {

    var body = document.body;
    return body.textContent || body.innerText;
}

export class ExternalResourceLoader{

    constructor(finalCallback){
        this.loaders=[];
        console.log(finalCallback);
        this.finalCallBack=finalCallback;
    }

    pushScript(src){
        console.log('push '+src);
        this.loaders.push(function(){
            this.loadScript(src,this.load.bind(this));
        }.bind(this));
    }

    pushStyle(href){
        console.log('push '+href);
        this.loaders.push(function(){
            this.loadStyle(href,this.load.bind(this));
        }.bind(this));
    }

    load(){
        console.log("load");
        console.log(this.loaders);
        if(this.loaders.length>0){
            console.log('load script: ');
            console.log(this.loaders);
            this.loaders.shift()();
        }else{
            this.finalCallBack();
        }
    }

    loadScript(src, callback) {
        // avoid duplicates
        for (var i = 0; i < document.scripts.length; i++) {
            if (document.scripts[i].src == src) {
                return;
            }
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = src;
        script.async='async';
        if(callback){
            script.onreadystatechange= function () {
                if (this.readyState == 'complete')
                    callback();//the whole script is wrapped in this function
            }
            script.onload= callback;
        }
        head.appendChild(script);
    }

    loadStyle(href, callback) {
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
        link.async='async';
        link.href = href;
        if(callback){
            link.onreadystatechange= function () {
                if (this.readyState == 'complete')
                    callback();//the whole script is wrapped in this function
            }
            link.onload= callback;
        }
        head.appendChild(link);

    }
}

export {getBrowser, getWebsiteContent}