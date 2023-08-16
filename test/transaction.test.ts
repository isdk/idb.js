import { describe, expect, it } from 'vitest'
import { IndexedDBDatabase, IndexedDBStore } from '../src'

describe('IndexedDB Transaction', async () => {

  describe('migration store(s)', () => {
    it('store', async () => {
      const db = new IndexedDBDatabase()
      await db.open('iMigrationStore', 1, [
        {
          version: 1,
          store: {
            name: 'migration',
            keyPath: 'id',
            index: {
              name: 'ixTitle',
              keyPath: 'title',
              unique: false
            }
          },
        },
      ])
      const store = db.getStore('migration')
      expect(store).instanceof(IndexedDBStore)
      expect(store.keyPath).toBe('id')
      expect(store.indexNames).contains('ixTitle')
      const ix = store.index('ixTitle')
      expect(ix.keyPath).toBe('title')
      expect(ix.unique).toBeFalsy()
    })

  })
})
