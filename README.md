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

## Why this app

Molotov.tv could theoretically work in a normal web browser (with Widevine)
but for some reason, it requires a specific `X-Molotov-Agent` HTTP header to work
so we have to use an app that sends this header.

Except for this header and a few other tweaks, this app is just a wrapper for [app.molotov.tv](https://app.molotov.tv/home).
