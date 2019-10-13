# Viatcheslav

Viatcheslav is an open source client for Molotov.tv based on Electron.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
I don't use Molotov anymore and this app is hard to maintain because it easily breaks when Molotov changes something.

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

## Limitations

* Google and Facebook login don't work, you need to login with your e-mail and password.
* The fullscreen button does not work
    but you can use the F11 key to get the same result.
