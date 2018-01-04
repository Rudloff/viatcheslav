/*jslint node: true*/
'use strict';
var electron = require('electron'),
    widevine = require('electron-widevinecdm'),
    os = require('os'),
    mainWindow;

widevine.load(electron.app);

function createWindow() {
    var molotovAgent = {
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
    electron.session.defaultSession.webRequest.onBeforeSendHeaders(function (details, callback) {
        details.requestHeaders['X-Molotov-Agent'] = JSON.stringify(molotovAgent);
        details.requestHeaders.DNT = '1';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });

    mainWindow = new electron.BrowserWindow(
        {
            webPreferences: {
                plugins: true
            }
        }
    );

    mainWindow.loadURL('https://app.molotov.tv/home');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

if (electron.app) {
    electron.app.on('ready', createWindow);

    electron.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron.app.quit();
        }
    });

    electron.app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });

} else {
    throw "Can't find Electron";
}
