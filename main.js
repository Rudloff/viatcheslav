/*jslint node: true*/
'use strict';
var electron = require('electron'),
    widevine = require('electron-widevinecdm');

/**
 * Add the X-Molotov-Agent header required by Molotov.tv.
 * We also add a DNT header hoping this can disable some tracking.
 * @param {Object}   details  Request details
 * @param {Function} callback Function called with the new headers
 * @return {Void}
 */
function addHeaders(details, callback) {
    details.requestHeaders['X-Molotov-Agent'] = JSON.stringify({app_build: 1});
    details.requestHeaders.DNT = '1';
    callback({cancel: false, requestHeaders: details.requestHeaders});
}

/**
 * Create the main window.
 * @return {Void}
 */
function createWindow() {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders(addHeaders);

    var mainWindow = new electron.BrowserWindow(
        {
            icon: __dirname + '/icon.png',
            webPreferences: {
                plugins: true
            }
        }
    );

    mainWindow.loadURL('https://app.molotov.tv/home');
}

if (electron.app) {
    widevine.load(electron.app);

    electron.app.on('ready', createWindow);
} else {
    throw "Can't find Electron";
}
