import { describe, expect, it } from 'vitest'
import type { IDBMigrations } from '../src';
import { IndexedDBDatabase, IndexedDBStore } from '../src'

function testStoreProps(store: IndexedDBStore, props: any) {
  expect(store).instanceof(IndexedDBStore)
  testProps(store, props)
}

function testProps(obj: any, props: any) {
  for (const [key, value] of Object.entries(props)) {
    expect(obj).property(key, value)
  }
}

describe('IndexedDB Transaction', async () => {

  describe('migration store(s)', () => {
    it('store and index', async () => {
      const dbName = 'iMigrationStore'
      const storeA = {
        name: 'aStore',
        keyPath: 'id',
      }
      const storeAIndex = {
        name: 'ixTitle',
        keyPath: 'title',
        unique: true,
      } 
      const migrations: IDBMigrations = [
        {
          version: 1,
          store: {
            ...storeA,
            index: storeAIndex,
          },
        },
      ]
      const db = new IndexedDBDatabase()
      await db.open(dbName, 1, migrations)
      let store: IDBObjectStore | any = db.getStore(storeA.name, 'readonly')
      testStoreProps(store, storeA)
      expect(store.indexNames).contains('ixTitle')
      let ix = store.index('ixTitle')
      testProps(ix, storeAIndex)

      const transaction = store.transaction
      await transaction.abort()
      expect(transaction.finished).toBeTruthy()

      await db.close()

      const storeAIndex2 = {
        name: 'ix2',
        keyPath: 'k2',
        unique: false,
      }

      migrations.push({
        version: 2,
        index: {
          store: storeA.name,
          ...storeAIndex2,
        },
      })

      await db.open(dbName, 2, migrations)
      store = db.getStore(storeA.name)
      testStoreProps(store, storeA)

      ix = store.index('ix2')
      testProps(ix, storeAIndex2)

      await store.transaction.abort()

      await db.delete()

      await db.open(dbName, 1)
      expect(db.objectStoreNames).length(0)
      await db.delete()
    })

    it('stores and indexes', async () => {
      const dbName = 'iMigrationStore'
      const store1 = {
        name: 'aStore',
        keyPath: 'id',
      }
      const store2 = {
        name: 'aStore2',
        keyPath: 'id',
      }
      const storeIndex = {
        name: 'ixTitle',
        keyPath: 'title',
        unique: true,
      }
      const migrations: IDBMigrations = [
        {
          version: 1,
          stores: [
            {
              ...store1,
              index: storeIndex,
            },
            {
              ...store2,
              index: storeIndex,
            },
          ],
        },
      ]
      const db = new IndexedDBDatabase()
      await db.open(dbName, 1, migrations)
      expect(db.objectStoreNames).length(2)
      let store: IDBObjectStore | any = db.getStore(store1.name, 'readonly')
      testStoreProps(store, store1)
      expect(store.indexNames).contains('ixTitle')
      let ix = store.index('ixTitle')
      testProps(ix, storeIndex)
      await store.transaction.abort()

      store = db.getStore(store2.name, 'readonly')
      testStoreProps(store, store2)
      expect(store.indexNames).contains('ixTitle')
      ix = store.index('ixTitle')
      testProps(ix, storeIndex)
      await store.transaction.abort()

      await db.close()

      const storeIndex2 = {
        name: 'ix2',
        keyPath: 'k2',
        unique: false,
      }
      migrations.push({
        version: 2,
        indexes: [
          {
            store: store1.name,
            ...storeIndex2,
          },
          {
            store: store2.name,
            ...storeIndex2,
          },
        ],
      })

      await db.open(dbName, 2, migrations)
      store = db.getStore(store1.name)
      expect(store).instanceof(IndexedDBStore)
      ix = store.index('ix2')
      testProps(ix, storeIndex2)
      await store.transaction.abort()

      store = db.getStore(store2.name)
      expect(store).instanceof(IndexedDBStore)
      ix = store.index('ix2')
      testProps(ix, storeIndex2)
      await store.transaction.abort()

      await db.delete()

      await db.open(dbName, 1)
      expect(db.objectStoreNames).length(0)

      await db.delete()
    })
  })
  it('callback', async () => {
    const dbName = 'iMigrationStore'
      const storeA = {
        name: 'aStore',
        keyPath: 'id',
      }
      const storeAIndex = {
        name: 'ixTitle',
        keyPath: 'title',
        unique: true,
      }
      const migrations: IDBMigrations = [
        {
          version: 1,
          upgrade(db) {
            const s = db.createObjectStore(storeA.name, storeA)
            s.createIndex(storeAIndex.name, storeAIndex.keyPath, storeAIndex)
          },
        },
      ]
      const db = new IndexedDBDatabase()
      await db.open(dbName, 1, migrations)
      let store: IDBObjectStore | any = db.getStore(storeA.name, 'readonly')
      testStoreProps(store, storeA)
      expect(store.indexNames).contains('ixTitle')
      let ix = store.index('ixTitle')
      testProps(ix, storeAIndex)

      const transaction = store.transaction
      await transaction.abort()
      expect(transaction.finished).toBeTruthy()

      await db.close()

      const storeAIndex2 = {
        name: 'ix2',
        keyPath: 'k2',
        unique: false,
      }

      migrations.push({
        version: 2,
        upgrade(db, transaction) {
          const s = transaction.objectStore(storeA.name)
          s.createIndex(storeAIndex2.name, storeAIndex2.keyPath, storeAIndex2)
        },
      })

      await db.open(dbName, 2, migrations)
      store = db.getStore(storeA.name)
      testStoreProps(store, storeA)

      ix = store.index('ix2')
      testProps(ix, storeAIndex2)

      await store.transaction.abort()

      await db.delete()

  })
})
