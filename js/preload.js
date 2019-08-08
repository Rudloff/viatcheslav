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

function mockFunction() {
    'use strict';

    return;
}

function getPlatform() {
    'use strict';
    return navigator.platform;
}

function getCurrentWindow() {
    'use strict';

    return {
        on: mockFunction,
        isFullScreen: mockFunction,
        isMaximized: mockFunction,
        isFocused: mockFunction,
        getManifestUri: mockFunction,
        reload: mockFunction
    };
}

window.molotov = {
    app: {
        platform: navigator.platform
    }
};

window.__os = {
    platform: getPlatform
};

window.__electron = {
    ipcRenderer: {
        send: mockFunction,
        on: mockFunction
    },
    remote: {
        getCurrentWindow: getCurrentWindow
    }
};

// This is a bit dirty but allows us to inject the div as soon as possible.
document.addEventListener('DOMSubtreeModified', fixScripts, false);
