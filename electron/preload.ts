import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  store: {
    get: (key: string) => ipcRenderer.invoke('store:get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('store:set', key, value),
  },

  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
  },

  updater: {
    checkForUpdates: () => ipcRenderer.invoke('updater:checkForUpdates'),
    onUpdateAvailable: (callback: (info: any) => void) => {
      ipcRenderer.on('update-available', (_event, info) => callback(info))
    },
    onUpdateDownloaded: (callback: () => void) => {
      ipcRenderer.on('update-downloaded', () => callback())
    },
    onDownloadProgress: (callback: (progress: any) => void) => {
      ipcRenderer.on('download-progress', (_event, progress) => callback(progress))
    },
    downloadUpdate: () => ipcRenderer.send('download-update'),
    quitAndInstall: () => ipcRenderer.send('quit-and-install'),
    cancelUpdate: () => ipcRenderer.send('cancel-update'),
  },
})
