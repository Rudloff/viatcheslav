/*jslint node: true*/
'use strict';
var electron = require('electron'),
    mainWindow;

/**
 * Add the X-Molotov-Agent header required by Molotov.tv.
 * We also add a DNT header hoping this can disable some tracking.
 * @param {Object}   details  Request details
 * @param {Function} callback Function called with the new headers
 * @return {Void}
 */
function addRequestHeaders(details, callback) {
    details.requestHeaders['X-Molotov-Agent'] = JSON.stringify({app_build: 3, app_id: 'electron_app'});
    details.requestHeaders.DNT = '1';
    callback({cancel: false, requestHeaders: details.requestHeaders});
}

/**
 * Add a Content-Security-Policy header in order to mitigate XSS attacks.
 * This also helps disabling some tracking.
 * @param {Object}   details  Request details
 * @param {Function} callback Function called with the new headers
 * @return {Void}
 */
function addResponseHeaders(details, callback) {
    details.responseHeaders['Content-Security-Policy'] = [
        "default-src 'self'; object-src 'none'; " +
                "font-src 'self' fonts.gstatic.com maxcdn.bootstrapcdn.com; " +
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com maxcdn.bootstrapcdn.com; " +
                "connect-src fapi.molotov.tv decision.molotov.tv *.akamaized.net lic.drmtoday.com; " +
                "img-src 'self' fusion.molotov.tv images.molotov.tv; " +
                "frame-src 'self' www.molotov.tv; " +
                "script-src 'self' 'unsafe-inline'; " +
                "media-src blob:"
    ];
    callback({cancel: false, responseHeaders: details.responseHeaders});
}

/**
 * Inject CSS in the main window.
 * @return {Void}
 */
function addCss() {
    // We need fix or Molotov CSS breaks.
    mainWindow.webContents.insertCSS('body, html { width: 100%; } ._2TXpJ { margin-top: -40px !important; } ._1TB-Z { display: none !important; } .qXpjY { height: 100% !important; margin-top: 0 !important; }');
}

/**
 * Create the main window.
 * @return {Void}
 */
function createWindow() {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders(addRequestHeaders);
    electron.session.defaultSession.webRequest.onHeadersReceived(addResponseHeaders);

    mainWindow = new electron.BrowserWindow(
        {
            icon: 'icon.png',
            webPreferences: {
                nodeIntegration: false,
                plugins: true,
                preload: __dirname + '/js/preload.js'
            }
        }
    );

    mainWindow.webContents.on('dom-ready', addCss);

    mainWindow.loadURL('https://app.molotov.tv/home');
}

if (electron.app) {
    electron.app.on('widevine-ready', createWindow);
} else {
    throw "Can't find Electron";
}
