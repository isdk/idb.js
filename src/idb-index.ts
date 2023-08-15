import { IndexedDBBaseStore } from "./idb-base-store"

export class IndexedDBIndex extends IndexedDBBaseStore {
  get multiEntry() {
    return this._store.multiEntry
  }

  get objectStore() {
    return this._store.objectStore
  }

  get unique() {
    return this._store.unique
  }

  constructor(protected _store: IDBIndex) {
    super(_store)
  }
}
