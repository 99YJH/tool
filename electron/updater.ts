import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'

export function initUpdater(mainWindow: BrowserWindow) {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update-available', info)
  })

  autoUpdater.on('update-not-available', () => {
    console.log('No updates available')
  })

  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow.webContents.send('download-progress', progressObj)
  })

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded')
  })

  autoUpdater.on('error', (error) => {
    console.error('Update error:', error)
  })

  ipcMain.on('download-update', () => {
    autoUpdater.downloadUpdate()
  })

  ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall()
  })

  ipcMain.on('cancel-update', () => {
    mainWindow.close()
  })
}

export function checkForUpdates() {
  autoUpdater.checkForUpdates()
}
