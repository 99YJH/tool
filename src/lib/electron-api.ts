export interface ElectronAPI {
  store: {
    get: (key: string) => Promise<any>
    set: (key: string, value: any) => Promise<boolean>
  }
  app: {
    getVersion: () => Promise<string>
  }
  updater: {
    checkForUpdates: () => Promise<void>
    onUpdateAvailable: (callback: (info: any) => void) => void
    onUpdateDownloaded: (callback: () => void) => void
    onDownloadProgress: (callback: (progress: any) => void) => void
    downloadUpdate: () => void
    quitAndInstall: () => void
    cancelUpdate: () => void
  }
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}
