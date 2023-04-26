const { app, ipcMain } = require('electron');
const path = require('path');
const { menubar } = require('menubar');
const { autoUpdater } = require('electron-updater');
const { nativeTheme, systemPreferences } = require('electron');

const lightIcon = path.join(__dirname, 'Icon.png');
const darkIcon = path.join(__dirname, 'IconDark.png');
const currentIcon = lightIcon;

const mb = menubar({
  icon: path.join(__dirname, 'Icon.png'),
  preloadWindow: true,
  resizable: false,
  webPreferences: {
    nodeIntegration: true
  }
});

mb.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('avain-close', () => {
  app.quit();
});

mb.on('ready', () => {
  mb.on('hide', () => {
    mb.window.reload();
  });
});

const log = require('electron-log');

log.transports.file.level = 'debug';
autoUpdater.logger = log;

autoUpdater.checkForUpdatesAndNotify();
