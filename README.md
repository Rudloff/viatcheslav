# Viatcheslav
Viatcheslav is an open source client for Molotov.tv based on Electron.

## Install
```bash
npm install
```

## Run
```bash
npm start
```

### Video playback
In order to play DRM-protected videos, we need the Winedevine plugin but because it is not FOSS we can't include it in the repository.
The Electron documentation has [an article that explain how to get the Widevine plugin](https://github.com/electron/electron/blob/master/docs/tutorial/using-widevine-cdm-plugin.md).

You then need to run Viatcheslav like this:
```bash
WIDEVINE_PATH=/path/to/widevinecdmadapter.plugin WIDEVINE_VERSION=wivedine.version npm start
```
