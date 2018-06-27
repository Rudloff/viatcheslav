/*jslint node: true*/
'use strict';
var electron = require('electron'),
    widevine = require('electron-widevinecdm'),
    mainWindow;

/**
 * Add the X-Molotov-Agent header required by Molotov.tv.
 * We also add a DNT header hoping this can disable some tracking.
 * @param {Object}   details  Request details
 * @param {Function} callback Function called with the new headers
 * @return {Void}
 */
function addHeaders(details, callback) {
    details.requestHeaders['X-Molotov-Agent'] = JSON.stringify({app_build: 3, app_id: 'electron_app'});
    details.requestHeaders.DNT = '1';
    callback({cancel: false, requestHeaders: details.requestHeaders});
}

/**
 * Inject CSS in the main window.
 * @return {Void}
 */
function addCss() {
    var size = mainWindow.getSize();
    mainWindow.webContents.insertCSS('#app { max-width: 100vw; }');

    // Hacky way to force the JS to recalculate the grid.
    mainWindow.setSize(size[0] + 1, size[1] + 1);
    mainWindow.setSize(size[0], size[1]);
}

/**
 * Create the main window.
 * @return {Void}
 */
function createWindow() {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders(addHeaders);

    mainWindow = new electron.BrowserWindow(
        {
            icon: 'icon.png',
            webPreferences: {
                plugins: true
            }
        }
    );

    mainWindow.webContents.on('did-finish-load', addCss);

    mainWindow.loadURL('https://app.molotov.tv/home');
}

if (electron.app) {
    widevine.load(electron.app);

    electron.app.on('ready', createWindow);
} else {
    throw "Can't find Electron";
}
