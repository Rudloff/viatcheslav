/*jslint node: true*/
'use strict';
var electron = require('electron'),
    widevine = require('electron-widevinecdm'),
    os = require('os'),
    molotovAgent = {
        app_id: electron.app.getName(),
        app_build: 1,
        app_version_name: electron.app.getVersion(),
        type: 'desktop',
        os: process.platform,
        os_version: os.type(),
        manufacturer: os.type(),
        model: os.type(),
        brand: os.type(),
        serial: 'foo'
    };

function addHeaders(details, callback) {
    details.requestHeaders['X-Molotov-Agent'] = JSON.stringify(molotovAgent);
    details.requestHeaders.DNT = '1';
    callback({cancel: false, requestHeaders: details.requestHeaders});
}

function createWindow() {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders(addHeaders);

    var mainWindow = new electron.BrowserWindow(
        {
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
