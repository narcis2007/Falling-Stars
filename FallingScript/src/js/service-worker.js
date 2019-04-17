/**
 * Created by Narcis2007 on 13.07.2017.
 */

importScripts('https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js');

self.toolbox.router.post('/api/fallingScript', handleRequest, {origin: 'https://falling-stars.cfapps.io'});
// self.toolbox.router.get('/**', self.toolbox.cacheFirst);

function handleRequest(request) {

    // Open (or create) the database
    var open = indexedDB.open("FallingStarsDatabase", 1);

    // Create the schema
    open.onupgradeneeded = function () {
        var db = open.result;
        var store = db.createObjectStore("AddsConfigStore", {keyPath: "path"});
        var index = store.createIndex('expirationTimestampIndex', 'expirationTimestamp');
    };

    return new Promise((resolve, reject) => {
        open.onsuccess = function () {
            // Start a new transaction
            var db = open.result;
            var tx = db.transaction("AddsConfigStore", "readwrite");
            var store = tx.objectStore("AddsConfigStore");


            // Anything in the past:
            var range = IDBKeyRange.upperBound(Date.now());

            var getFromNetworkOrCache = function(){
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
                                store2.put({path: request.referrer, expirationTimestamp: Date.now() + SEVEN_DAYS  , responseData: body});
                            });

                            resolve(response);
                        });
                    }
                    ;
                };
            }

            tx.objectStore('AddsConfigStore').index('expirationTimestampIndex').openCursor(range)
                .onsuccess = function(e) {
                var cursor = e.target.result;
                if (!cursor){
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
        open.result.close();//close db
        return result;
    });
}



var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;