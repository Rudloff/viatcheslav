/*jslint node: true*/
'use strict';
var electron = require('electron');
var widevine = require('electron-widevinecdm');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var session = electron.session;
var os = require('os');

var mainWindow;

widevine.load(app);

function createWindow() {
    var molotovAgent = {
        app_id: app.getName(),
        app_build: 1,
        app_version_name: app.getVersion(),
        type: 'desktop',
        os: process.platform,
        os_version: os.type(),
        manufacturer: os.type(),
        model: os.type(),
        brand: os.type(),
        serial: 'foo'
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(function (details, callback) {
        details.requestHeaders['X-Molotov-Agent'] = JSON.stringify(molotovAgent);
        details.requestHeaders.DNT = '1';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });

    mainWindow = new BrowserWindow(
        {
            webPreferences: {
                plugins: true
            }
        }
    );

    mainWindow.loadURL('http://app.molotov.tv/home');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

if (app) {
    app.on('ready', createWindow);

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });

} else {
    throw "Can't find Electron";
}
