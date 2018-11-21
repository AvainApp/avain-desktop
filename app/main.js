const { app, ipcMain } = require('electron');
const path = require('path');
const menubar = require('menubar');
const { autoUpdater } = require('electron-updater');
const { systemPreferences } = require('electron');

const lightIcon = path.join(__dirname, 'Icon.png');
const darkIcon = path.join(__dirname, 'IconDark.png');
let currentIcon = lightIcon;

const mb = menubar({
  icon: path.join(__dirname, 'Icon.png'),
  preloadWindow: true,
  resizable: false
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
  mb.on('show', () => {
    mb.tray.setImage(darkIcon);
  });

  mb.on('hide', () => {
    mb.tray.setImage(currentIcon);
  });

  if (process.platform === 'darwin') {
    const setOSTheme = () => {
      const dark = systemPreferences.isDarkMode();

      if (dark) {
        currentIcon = darkIcon;
        mb.tray.setImage(currentIcon);
      } else {
        currentIcon = lightIcon;
        mb.tray.setImage(currentIcon);
      }
    };

    setOSTheme();

    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      setOSTheme
    );
  }
});

const log = require('electron-log');

log.transports.file.level = 'debug';
autoUpdater.logger = log;

autoUpdater.checkForUpdatesAndNotify();
