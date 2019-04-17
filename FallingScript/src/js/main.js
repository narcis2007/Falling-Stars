/**
 * Created by Narcis2007 on 14.02.2017.
 */

import {loadSiteConfiguration} from './config';
import {generateAdds} from './adds'


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://falling-stars.cfapps.io/sw.js');
}

loadSiteConfiguration()
    .then(function (config) {
        generateAdds(config);
    })

