import { IDBIterator } from "./idb-iterator"
import { reqToPromise } from "./idb-util"

/**
 * Represents a base store for interacting with an IndexedDB object store.
 */
export class IndexedDBBaseStore {
  /**
   * Gets the key path of the object store.
   */
  public get keyPath(): string | string[] {
    return this._store.keyPath
  }

  /**
   * Gets the name of the object store.
   */
  public get name(): string {
    return this._store.name
  }

  /**
   * Constructs a new IndexedDBBaseStore.
   * @param _store - The underlying IDBObjectStore or IDBIndex.
   */
  constructor(protected _store: any) {}

  /**
   * Retrieves the value associated with the specified key.
   * @param key - The key to retrieve the value for.
   * @returns A promise that resolves to the retrieved value.
   * @example
   * const value = await baseStore.get(1);
   */
  async get<T>(key: IDBValidKey) {
    const store = this._store
    return <Promise<T>>reqToPromise(store.get(key))
  }

  /**
   * Retrieves all values in the object store that match the specified query.
   * @param query - The query to match records against. Optional.
   * @param count - The maximum number of records to retrieve. Optional.
   * @returns A promise that resolves to an array of matching values.
   * @example
   * const values = await baseStore.getAll('John');
   */
  async getAll(query?: IDBValidKey | IDBKeyRange, count?: number) {
    const store = this._store
    return <Promise<any[]>>reqToPromise(store.getAll(query, count))
  }

  /**
   * Retrieves all keys in the object store that match the specified query.
   * @param query - The query to match keys against. Optional.
   * @param count - The maximum number of keys to retrieve. Optional.
   * @returns A promise that resolves to an array of matching keys.
   * @example
   * const keys = await baseStore.getAllKeys('John');
   */
  async getAllKeys(query?: IDBValidKey | IDBKeyRange, count?: number) {
    const store = this._store
    if (store.getAllKeys) {
      return <Promise<any[]>>reqToPromise(store.getAllKeys(query, count))
    } else {
      const it = new IDBIterator(store, query)
      const result = [] as any[]
      let i = 0

      for await (const kv of it) {
        result.push(kv.key)
        i++
        if (i === count) {
          break
        }
      }
      return result
    }
  }

  /**
   * Retrieves multiple values associated with the specified keys.
   * @param keys - The keys of the values to retrieve.
   * @returns A promise that resolves to an array of retrieved values.
   * @alias getMultiple
   * @example
   * const values = await baseStore.getMulti(['key1', 'key2']);
   */
  async getMulti(keys: string[]): Promise<any[]> {
    const store = this._store
    const sortedKeys = keys.slice().sort()

    const resultsMap: any = {}
    let i = 0
    function _itNext(cursor: IDBCursorWithValue) {
      if (cursor) {
        const key = cursor.key
        while (key > sortedKeys[i]) {
          // The cursor has passed beyond this key. Check next.
          ++i
          if (i === sortedKeys.length) {
            // There is no next. Stop searching.
            return true
          }
        }
        if (key === sortedKeys[i]) {
          // The current cursor value should be included and we should continue
          // a single step in case next item has the same key or possibly our
          // next key in sortedKeys.
          cursor.continue()
        } else {
          // cursor.key not yet at sortedKeys[i]. Forward cursor to the next key to hunt for.
          cursor.continue(sortedKeys[i])
        }
      } else {
        // No more keys.
        return true
      }
    }

    const it = new IDBIterator(store, _itNext)

    for await (const kv of it) {
      resultsMap[kv.key as any] = kv.value
    }

    return keys.map((k) => resultsMap[k as any])
  }

  /**
   * Retrieves multiple values associated with the specified keys.
   * @param keys - The keys of the values to retrieve.
   * @returns A promise that resolves to an array of retrieved values.
   * @alias getMulti
   * @example
   * const values = await baseStore.getMultiple(['key1', 'key2']);
   */
  async getMultiple(keys: string[]): Promise<any[]> {
    return this.getMulti(keys)
  }

  /**
   * Retrieves the count of records in the object store that match the specified query.
   * @param query - The query to match records against. Optional.
   * @returns A promise that resolves to the count of matching records.
   * @example
   * const count = await baseStore.count('John');
   */
  async count(query?: IDBValidKey | IDBKeyRange) {
    const store = this._store
    return <Promise<number>>reqToPromise(store.count(query))
  }

  /**
   * Retrieves all values in the object store that match the specified query and returns them in a JSON object.
   * @param query - The query to match records against. Optional.
   * @param count - The maximum number of values to retrieve. Optional.
   * @returns A promise that resolves to a JSON object containing the matching values.
   * @example
   * const json = await baseStore.json('John');
   */
  async json(query?: IDBValidKey | IDBKeyRange, count?: number) {
    const store = this._store
    const it = new IDBIterator(store, query, count)
    const result = {}

    for await (const kv of it) {
      result[kv.key as any] = kv.value
    }
    return result
  }

  /**
   * Retrieves all keys in the object store that match the specified query and returns them in an array.
   * @param query - The query to match keys against. Optional.
   * @param count - The maximum number of keys to retrieve. Optional.
   * @returns A promise that resolves to an array of matching keys.
   * @example
   * const keys = await baseStore.keys('John');
   */
  async keys(query?: IDBValidKey | IDBKeyRange, count?: number) {
    return this.getAllKeys(query, count)
  }

  /**
   * Retrieves all values in the object store that match the specified query and returns them in an array.
   * @param query - The query to match records against. Optional.
   * @param count - The maximum number of values to retrieve. Optional.
   * @returns A promise that resolves to an array of matching values.
   * @example
   * const values = await baseStore.values('John');
   */
  async values(query?: IDBValidKey | IDBKeyRange, count?: number) {
    const store = this._store
    const it = new IDBIterator(store, query, count)
    const result = []

    for await (const kv of it) {
      result.push(kv.value)
    }
    return result
  }
}
