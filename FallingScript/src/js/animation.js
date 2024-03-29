/**
 * Created by Narcis2007 on 14.02.2017.
 */


import {ExternalResourceLoader} from './utils'

let insertDependencies = function (callback) {

    var loader = new ExternalResourceLoader(callback);
    loader.pushStyle('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css')
    loader.pushScript('https://code.jquery.com/jquery-3.1.1.min.js')
    loader.pushScript('https://cdn.bootcss.com/lettering.js/0.7.0/jquery.lettering.min.js')
    loader.pushScript('https://cdnjs.cloudflare.com/ajax/libs/textillate/0.4.0/jquery.textillate.min.js')

    loader.load();
};


function textillate(config) {
    insertDependencies(
        function () {
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
                    callback: function () {
                    }
                },

                // out animation settings.
                out: {
                    effect: config.outAnimation.name,
                    delayScale: 1.5,
                    delay: 50,
                    sync: false,
                    shuffle: false,
                    reverse: false,
                    callback: function () {
                    }
                },

                // callback that executes once textillate has finished
                callback: function () {
                },

                // set the type of token to animate (available types: 'char' and 'word')
                type: 'char'
                //function () {
                //     if (Math.random() * 100 < 50)
                //         return 'word';
                //     return 'char'
                // }()
            });

            $JQuery('.tlt').textillate('start');
        }
    );
}

export default textillate;