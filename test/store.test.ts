import { beforeEach, describe, expect, it } from 'vitest'
import { GDB, createStore, runBaseStoreTests } from './base-store'

describe('IndexedDB ObjectStore', async () => {
  let store

  runBaseStoreTests(createStore)

  beforeEach(async () => {
    store = await createStore()
  })

  describe('put', () => {
    it('simple value', async () => {
      let key = 'key1'
      let value: any = 'value1'
      await store.put(value, key)
      let result = await store.get(key)
      expect(result).toEqual(value)
      key = 'key2'
      value = 154
      await store.put(value, key)
      result = await store.get(key)
      expect(result).toEqual(value)
      key = 'key3'
      value = true
      await store.put(value, key)
      result = await store.get(key)
      expect(result).toEqual(value)
      key = 'key3'
      value = new Date()
      await store.put(value, key)
      result = await store.get(key)
      expect(result).toEqual(value)
    })

    it('complex value', async () => {
      const key = 'key1'
      const value: any = { a: 1.23, b: 2, c: 'hi', d: new Date() }
      await store.put(value, key)
      const result = await store.get(key)
      expect(result).toEqual(value)
    })

    it('inline key', async () => {
      const store = GDB.getStore('testKeyPath')
      const value: any = { id: 456, a: 1.23, b: 2, c: 'hi', d: new Date() }
      const key = await store.put(value)
      expect(key).toBe(456)
      const result = await store.get(key)
      expect(result).toEqual(value)
    })
  })
})
