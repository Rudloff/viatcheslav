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

In order to play DRM-protected videos, we need the Widevine plugin but because it is not FOSS we can't include it in the repository.
The Electron documentation has [an article that explains how to get the Widevine plugin](https://github.com/electron/electron/blob/master/docs/tutorial/using-widevine-cdm-plugin.md).

You then need to run Viatcheslav like this:

```bash
WIDEVINE_PATH=/path/to/widevinecdmadapter.plugin WIDEVINE_VERSION=wivedine.version npm start
```

If you are on an x86_64 GNU/Linux system, you can also use these commands to automattically download and use Widevine:

```bash
npm run linux-setup
npm run linux-run
```
