# Tosbur Web Application

The source code for the web application that powers Tosbur. The output of this application is consumed by the desktop application. This repository captures all of the state, styles and component behavior of the web application.

The desktop application loads this web app in its own render process through Electron's `BrowserWindow` module.

## Separation of web application and Electon Builder.

There are community boilerplate solutions that integrate electron-builder and a web application in a single project. While there may be some advantages to community solutions, there are downsides in maintainability (e.g, [the "recommended" boilerplate](https://www.electron.build/#boilerplates) uses [electron-webpack](https://github.com/electron-userland/electron-webpack#electron-webpack--), which is in maintenance mode, seeking a maintainer and recommends a [Vite-based solution](https://github.com/cawa-93/vite-electron-builder) instead). Another downside is that they can create unnecessary complexity.

We do not need complex setups for this to work well. Any tool that can build a web application will work. Vite is a good choice for its speed, simplicity and bundling features. We can develop this application separately, and mock the `window.tosbur` function calls. Mocks should be done anyway as a means of testing components and application behavior.

## How was this application created?

```bash
pnpx create-vite tosbur-web --template vue
```

### Running

```bash
pnpm dev
```
### Build

```bash
pnpm build
```

## How is this application imported into the Main application?

```javascript

// Main electron process (background.js)

win = new BrowserWindow({
  webPreferences: {
    preload: preloadPath
  }
});

// ...

if (process.env.WEBPACK_DEV_SERVER_URL) {
  // Load the url of the dev server if in development mode
  await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
} else {
  createProtocol('app');
  // Load the index.html when not in development
  win.loadURL('app://./index.html');
}
```