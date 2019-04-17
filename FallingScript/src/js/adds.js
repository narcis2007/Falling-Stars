/**
 * Created by Narcis2007 on 16.10.2016.
 */

import css from '../css/style.css';
import {getBrowser} from './utils';
import textillate from './animation'


var percentage = 100;

var matchText = function (node, regex, callback, excludeElements) {

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas', 'a']);
    var child = node.firstChild;

    while (child) {
        switch (child.nodeType) {
            case 1:
                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
                    break;
                var nodeComputedStyle = window.getComputedStyle(node,null);
                if(nodeComputedStyle.getPropertyValue("overflow")!="hidden")
                    matchText(child, regex, callback, excludeElements);
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
                if (response.goalReached == true)
                    location.reload();//temporary solution, I have to figure out how to revert the links generated after a script config reload
            }
            else {
                console.log(xmlhttp);
            }
        }
    };
    var data = {
        advertisementId: advertisementId,
        browser: getBrowser(), websiteName: fallingScript.getAttribute("data-website")
    };
    xmlhttp.open("POST", config.clickCountUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
}

function generateAdds(config) {
    percentage = config.percentage;
    console.log("generateAdds");
    console.log("about to replace words");
    var footnotesDiv= document.createElement("div");
    footnotesDiv.classList.add("footnotes");
    var footnotesList= document.createElement("ol");


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
                    link.rel = "nofollow";//very important for SEO, it doesn't affect google page rank
                }

                var footnoteSpan = document.createElement("span");
                footnoteSpan.setAttribute('rel', 'footnote');
                footnoteSpan.setAttribute('href', '#fn:'+advertisementId);
                footnoteSpan.id="fnref:"+advertisementId;
                footnoteSpan.appendChild(link);



                if (!document.getElementById("fn:"+advertisementId)) {
                    var innerIframe=document.createElement("iframe");
                    innerIframe.classList.add("frame");
                    innerIframe.src=url;
                    var footnoteListElement=document.createElement("li");
                    footnoteListElement.classList.add("footnote");
                    footnoteListElement.id="fn:"+advertisementId;
                    footnoteListElement.appendChild(innerIframe);
                    footnotesList.appendChild(footnoteListElement);
                }
                var span= document.createElement("span");
                span.onclick=function(){onClick(advertisementId)};

                span.appendChild(footnoteSpan);

                return span;
            });
        }
    }
    document.body.appendChild(footnotesDiv);
    $.bigfoot({
        deleteOnUnhover: true,
        hoverDelay: 5000,
        activateOnHover:true,
        actionOriginalFN:"hide",//actionOriginalFN must be hide or ignore if useFootnoteOnlyOnce=true
        useFootnoteOnlyOnce:false
    });
    textillate(config);
}

export {generateAdds}


