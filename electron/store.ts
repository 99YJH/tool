import Store from 'electron-store'

interface StoreSchema {
  inputText: string
  theme: string
}

let store: Store<StoreSchema> | null = null

export function initStore() {
  store = new Store<StoreSchema>({
    name: 'app-data',
    defaults: {
      inputText: '',
      theme: 'system',
    },
  })
}

export function getStoreValue(key: string): any {
  if (!store) {
    throw new Error('Store not initialized')
  }
  return store.get(key)
}

export function setStoreValue(key: string, value: any): void {
  if (!store) {
    throw new Error('Store not initialized')
  }
  store.set(key, value)
}
