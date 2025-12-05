import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { isDev } from './utils'
import { initStore, getStoreValue, setStoreValue } from './store'
import { checkForUpdates, initUpdater } from './updater'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'default',
    show: false,
  })

  const startURL = isDev()
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../out/index.html')}`

  mainWindow.loadURL(startURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()

    if (isDev()) {
      mainWindow?.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  initStore()

  createWindow()

  if (!isDev()) {
    initUpdater(mainWindow!)

    setTimeout(() => {
      checkForUpdates()
    }, 5000)
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('store:set', async (_event, key: string, value: any) => {
  setStoreValue(key, value)
  return true
})

ipcMain.handle('store:get', async (_event, key: string) => {
  return getStoreValue(key)
})

ipcMain.handle('app:getVersion', async () => {
  return app.getVersion()
})

ipcMain.handle('updater:checkForUpdates', async () => {
  if (!isDev()) {
    checkForUpdates()
  }
})
