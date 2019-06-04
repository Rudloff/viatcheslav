/*jslint browser: true*/
/*global window*/

/**
 * Add HTML tag used by Molotov to inject scripts.
 *
 * @return {Void}
 */
function fixScripts() {
    'use strict';
    if (document.body) {
        document.removeEventListener('DOMSubtreeModified', fixScripts);

        var scripts = document.createElement('div');
        scripts.setAttribute('id', 'scripts');
        document.body.appendChild(scripts);
    }
}

window.molotov = {
    app: {
    }
};

// This is a bit dirty but allows us to inject the div as soon as possible.
document.addEventListener('DOMSubtreeModified', fixScripts, false);
