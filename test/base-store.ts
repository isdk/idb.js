import 'fake-indexeddb/auto'

import { beforeEach, describe, expect, test } from 'vitest'

import type { IndexedDBStore } from '../src';
import { IndexedDBDatabase } from '../src'

export const GDB = new IndexedDBDatabase()
let store


export async function createStore() {
  if (!GDB.opened) {
    await GDB.open('test', 1, (db) => {
      db.createObjectStore('test')
      db.createObjectStore('testKeyPath', { keyPath: 'id' })
    })
  }
  
  if (!store || !store.transaction || store.transaction.finished) {
    store = await GDB.getStore('test')
  }

  await store.clear()
  return store
}



export function runBaseStoreTests(createStoreInstance) {
  let store: IndexedDBStore 

  beforeEach(async () => {
    if (typeof createStoreInstance === 'function') {
      store = await createStoreInstance()
    }
    else {
      store = createStoreInstance
    }
  })

  test('name', async () => {
    expect(store.name).toBe('test')
  })

  test('keyPath', async () => {
    expect(store.keyPath).toBeNull()
  })

  describe('get', () => {
    test('get string', async () => {
      const key = 'key'
      const value = 'value'
      await store.put(value, key)

      const result = await store.get(key)
      expect(result).toEqual(value)
    })

    test('get object', async () => {
      const key = 1
      const value = { name: 'John', age: 30 }
      await store.put(value, key)

      const result = await store.get(key)

      expect(result).toEqual(value)
    })
  })

  test('getMulti', async () => {
    await store.put('string', 'str')
    await store.put(123, 'num')
    await store.put({a: 1, b:2, c: 'hi'}, 'obj')

    const result = await store.getMultiple(['str', 'num', 'obj'])
    expect(result).toEqual(['string', 123, { a: 1, b: 2, c: 'hi' }])
  })

  describe('getAllKeys', () => {
    test('defaults', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAllKeys()
      expect(result).toEqual(expect.arrayContaining(['str', 'num', 'obj']))
    })
    test('query', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAllKeys(IDBKeyRange.lowerBound('str1'))
      expect(result).toEqual(expect.arrayContaining(['str1', 'str2', 'test']))
    })
    test('count', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAllKeys(undefined, 2)
      expect(result).length(2)
    })
    test('query,count', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAllKeys(IDBKeyRange.lowerBound('str1'), 2)
      expect(result).toEqual(expect.arrayContaining(['str1', 'str2']))
    })
  })

  describe('getAll', () => {
    test('defaults', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAll()
      expect(result).toEqual(
        expect.arrayContaining(['string', 123, { a: 1, b: 2, c: 'hi' }])
      )
    })
    test('query', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAll(IDBKeyRange.lowerBound('str1'))
      expect(result).toEqual(
        expect.arrayContaining(['string1', 'string2', 'string2'])
      )
    })
    test('count', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAll(undefined, 2)
      expect(result).length(2)
    })
    test('query,count', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.getAll(IDBKeyRange.lowerBound('str1'), 2)
      expect(result).toEqual(expect.arrayContaining(['string1', 'string2']))
    })
  })

  describe('count', () => {
    test('defaults', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.count()
      expect(result).toEqual(3)
    })
    test('query', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.count(IDBKeyRange.lowerBound('str1'))
      expect(result).toEqual(3)
    })
  })

  describe('json', () => {
    test('defaults', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.json()
      expect(result).toEqual({
        str: 'string',
        num: 123,
        obj: { a: 1, b: 2, c: 'hi' },
      })
    })
    test('query', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.json(IDBKeyRange.lowerBound('str1'))
      expect(result).toEqual(
        {str1: 'string1', str2: 'string2', test: 'test1'},
      )
    })
    test('count', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.json(undefined, 2)
      expect(result).toEqual({
        obj: { a: 1, b: 2, c: 'hi' },
        num: 123,
      })
    })
    test('query,count', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.json(IDBKeyRange.lowerBound('str1'), 2)
      expect(result).toEqual({str1: 'string1', str2: 'string2'})
    })
  })

  describe('values', () => {
    test('defaults', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.values()
      expect(result).toEqual(
        expect.arrayContaining(['string', 123, { a: 1, b: 2, c: 'hi' }])
      )
    })
    test('query', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.values(IDBKeyRange.lowerBound('str1'))
      expect(result).toEqual(
        expect.arrayContaining(['string1', 'string2', 'string2'])
      )
    })
    test('count', async () => {
      await store.put('string', 'str')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.values(undefined, 2)
      expect(result).length(2)
    })
    test('query,count', async () => {
      await store.put('astring1', 'a')
      await store.put('string1', 'str1')
      await store.put('string2', 'str2')
      await store.put('test1', 'test')
      await store.put(123, 'num')
      await store.put({ a: 1, b: 2, c: 'hi' }, 'obj')

      const result = await store.values(IDBKeyRange.lowerBound('str1'), 2)
      expect(result).toEqual(expect.arrayContaining(['string1', 'string2']))
    })
  })

}
