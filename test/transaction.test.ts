import { describe, expect, it } from 'vitest'
import type { IDBMigrations } from '../src';
import { IndexedDBDatabase, IndexedDBStore } from '../src'

describe('IndexedDB Transaction', async () => {

  describe('migration store(s)', () => {
    it('store and index', async () => {
      const migrations: IDBMigrations = [
        {
          version: 1,
          store: {
            name: 'aStore',
            keyPath: 'id',
            index: {
              name: 'ixTitle',
              keyPath: 'title',
              unique: true
            }
          },
        },
      ]
      const db = new IndexedDBDatabase()
      await db.open('iMigrationStore', 1, migrations)
      let store: IDBObjectStore|any = db.getStore('aStore', 'readonly')
      expect(store).instanceof(IndexedDBStore)
      expect(store).property('keyPath', 'id')
      expect(store.indexNames).contains('ixTitle')
      let ix = store.index('ixTitle')
      expect(ix.keyPath).toBe('title')
      expect(ix.unique).toBeTruthy()
      const transaction = store.transaction
      await transaction.abort()
      expect(transaction.finished).toBeTruthy()

      await db.close()

      migrations.push({
        version: 2,
        index: {
          store: 'aStore',
          name: 'ix2',
          keyPath: 'k2',
          unique: false,
        },
      })

      await db.open('iMigrationStore', 2, migrations)
      store = db.getStore('aStore')
      expect(store).instanceof(IndexedDBStore)
      ix = store.index('ix2')
      expect(ix.keyPath).toBe('k2')
      expect(ix.unique).toBeFalsy()
      store.transaction.abort()

      await db.delete()

      await db.open('iMigrationStore', 1)
      expect(db.objectStoreNames).length(0)
      await db.delete()
    })

    it('stores and indexes', async () => {
      const migrations: IDBMigrations = [
        {
          version: 1,
          stores: [
            {
              name: 'aStore',
              keyPath: 'id',
              index: {
                name: 'ixTitle',
                keyPath: 'title',
                unique: true,
              },
            },
            {
              name: 'aStore2',
              keyPath: 'id',
              index: {
                name: 'ixTitle',
                keyPath: 'title',
                unique: true,
              },
            },
          ],
        },
      ]
      const db = new IndexedDBDatabase()
      await db.open('iMigrationStores', 1, migrations)
      expect(db.objectStoreNames).length(2)
      let store: IDBObjectStore | any = db.getStore('aStore', 'readonly')
      expect(store).instanceof(IndexedDBStore)
      expect(store).property('keyPath', 'id')
      expect(store.indexNames).contains('ixTitle')
      let ix = store.index('ixTitle')
      expect(ix.keyPath).toBe('title')
      expect(ix.unique).toBeTruthy()
      store.transaction.abort()

      store = db.getStore('aStore2', 'readonly')
      expect(store).instanceof(IndexedDBStore)
      expect(store).property('keyPath', 'id')
      expect(store.indexNames).contains('ixTitle')
      ix = store.index('ixTitle')
      expect(ix.keyPath).toBe('title')
      expect(ix.unique).toBeTruthy()
      store.transaction.abort()

      await db.close()

      migrations.push({
        version: 2,
        indexes: [
          {
            store: 'aStore',
            name: 'ix2',
            keyPath: 'k2',
            unique: false,
          },
          {
            store: 'aStore2',
            name: 'ix2',
            keyPath: 'k2',
            unique: false,
          },
        ],
      })

      await db.open('iMigrationStores', 2, migrations)
      store = db.getStore('aStore')
      expect(store).instanceof(IndexedDBStore)
      ix = store.index('ix2')
      expect(ix.keyPath).toBe('k2')
      expect(ix.unique).toBeFalsy()
      store.transaction.abort()

      store = db.getStore('aStore2')
      expect(store).instanceof(IndexedDBStore)
      ix = store.index('ix2')
      expect(ix.keyPath).toBe('k2')
      expect(ix.unique).toBeFalsy()
      store.transaction.abort()

      await db.delete()

      await db.open('iMigrationStores', 1)
      expect(db.objectStoreNames).length(0)
    })
  })
})
