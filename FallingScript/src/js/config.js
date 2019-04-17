/**
 * Created by Narcis2007 on 13.02.2017.
 */

import {getWebsiteContent} from './utils'; //TODO: make a class for this
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
}

function loadSiteConfiguration() {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();

        var fallingScript = document.getElementById("fallingScript");
        var data = {content: getWebsiteContent(), website: fallingScript.getAttribute("data-website")};
        xmlhttp.open("POST", config.siteConfigUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Cache-Control", "max-age=2592000");
        xmlhttp.setRequestHeader("Pragma", "max-age=2592000");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {

                    var siteConfiguration = JSON.parse(xmlhttp.responseText);
                    console.log(siteConfiguration);
                    initializeElements(siteConfiguration)
                    resolve(siteConfiguration);
                }
                else {
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
        var elements=[];
        for (var i = 0; i < siteConfiguration.elements.length; i++) {
            elements.push(document.getElementById(siteConfiguration.elements[i]));
        }
        siteConfiguration.elements = elements;
    }
}


export {loadSiteConfiguration}