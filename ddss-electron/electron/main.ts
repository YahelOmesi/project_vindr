import { app, BrowserWindow } from 'electron';
import handleMessages from './handlers/handleMessages';
import handleWindowAllClosed from './handlers/handleWindowAllClosed';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;
const preload = path.join(__dirname, 'preload.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

let mainWindow: BrowserWindow;
let winId = 1;

export const getMainWindowId = (): number => winId;

export default async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: preload,
    },
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  winId = mainWindow.id;

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(indexHtml);
  }

  mainWindow.show();
  mainWindow.focus();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function initApp(): void {
  app.on('ready', onReady);
  app.on('window-all-closed', handleWindowAllClosed);
  app.on('activate', onActive);
  handleMessages();
}

async function onReady(): Promise<void> {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
}

async function onActive(): Promise<void> {
  const mainWindow = BrowserWindow.fromId(getMainWindowId());
  if (mainWindow === null) {
    await onReady();
  }
}

initApp();
