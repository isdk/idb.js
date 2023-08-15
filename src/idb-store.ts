import { IndexedDBBaseStore } from "./idb-base-store";
import { IndexedDBIndex } from "./idb-index";
import { IndexedDBTransaction } from "./idb-transaction";
import { reqToPromise } from "./idb-util";

/**
 * Represents a store for interacting with an IndexedDB object store.
 */
export class IndexedDBStore extends IndexedDBBaseStore {
  /**
   * Gets the index names associated with the object store.
   */
  public get indexNames(): DOMStringList {
    return this._store.indexNames
  }

  /**
   * Gets the transaction associated with the object store.
   */
  public get transaction(): IndexedDBTransaction {
    if (!this._transaction && this._store.transaction) {
      this._transaction = new IndexedDBTransaction(this._store.transaction)
    }
    return this._transaction
  }

  /**
   * Gets a value indicating whether the object store has an auto-incrementing key.
   */
  public get autoIncrement(): boolean {
    return this._store.autoIncrement
  }

  /**
   * Constructs a new IndexedDBStore.
   * @param _store - The underlying IDBObjectStore.
   */
  constructor(
    protected _store: IDBObjectStore,
    private _transaction?: IndexedDBTransaction
  ) {
    super(_store)
  }

  /**
   * Sets the value associated with the specified key.
   * @param key - The key to set the value for.
   * @param value - The value to set.
   * @example
   * await store.set(1, { name: 'John', age: 30 });
   */
  async set(key: IDBValidKey, value: any) {
    return this.put(value, key)
  }

  /**
   * Puts the value associated with the specified key.
   * @param value - The value to put.
   * @param key - The key to put the value for. Optional.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * await store.put({ name: 'John', age: 30 }, 1);
   */
  async put(value: any, key?: IDBValidKey) {
    const store = this._store
    return <Promise<IDBValidKey>>reqToPromise(store.put(value, key))
  }

  /**
   * Adds the value associated with the specified key.
   * @param value - The value to add.
   * @param key - The key to add the value for. Optional.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * await store.add({ name: 'John', age: 30 }, 1);
   */
  async add(value: any, key?: IDBValidKey) {
    const store = this._store
    return <Promise<IDBValidKey>>(
      reqToPromise(key !== undefined ? store.add(value, key) : store.add(value))
    )
  }

  /**
   * Removes the value associated with the specified key.
   * @param key - The key to remove the value for.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * await store.remove(1);
   */
  async remove(key: IDBValidKey) {
    const store = this._store
    await reqToPromise(store.delete(key))
  }

  /**
   * Clears all values in the object store.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * await store.clear();
   */
  async clear() {
    const store = this._store
    await reqToPromise(store.clear())
  }

  /**
   * Creates an index on the object store.
   * @param name - The name of the index.
   * @param keyPath - The key path of the index.
   * @param options - The options for creating the index. Optional.
   * @returns The created IndexedDBIndex object.
   * @example
   * const index = store.createIndex('nameIndex', 'name');
   */
  createIndex(
    name: string,
    keyPath: string | string[],
    options?: IDBIndexParameters
  ) {
    return new IndexedDBIndex(this._store.createIndex(name, keyPath, options))
  }

  /**
   * Deletes the specified index from the object store.
   * @param name - The name of the index to delete.
   * @example
   * store.deleteIndex('nameIndex');
   */
  deleteIndex(name: string) {
    this._store.deleteIndex(name)
  }

  /**
   * Retrieves the specified index from the object store.
   * @param name - The name of the index to retrieve.
   * @returns The retrieved IndexedDBIndex object.
   * @example
   * const index = store.index('nameIndex');
   */
  index(name: string) {
    return new IndexedDBIndex(this._store.index(name))
  }
}
