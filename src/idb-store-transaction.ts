import { IndexedDBBaseStore } from "./idb-base-store";
import { IDBErrors } from "./idb-error";
import { IndexedDBIndex } from "./idb-index";
import { handleError, reqToPromise } from "./idb-util";

/**
 * Represents a store for interacting with an IndexedDB object store.
 */
export class IndexedDBStore extends IndexedDBBaseStore {
  /**
   * Gets the index names associated with the object store.
   */
  public get indexNames(): DOMStringList {
    return this.store.indexNames
  }

  /**
   * Gets the transaction associated with the object store.
   */
  public get transaction(): IndexedDBTransaction {
    if (!this._transaction && this.store.transaction) {
      this._transaction = new IndexedDBTransaction(this._store.transaction)
    }
    return this._transaction
  }

  /**
   * Gets a value indicating whether the object store has an auto-incrementing key.
   */
  public get autoIncrement(): boolean {
    return this.store.autoIncrement
  }

  public get store(): IDBObjectStore {
    if (!this._store) {throw new IDBErrors.NotOpenedError("Store is not open")}
    return this._store
  }

  public get opened() : boolean {
    return !!this._store
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
    const store = this.store
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
    const store = this.store
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
    const store = this.store
    await reqToPromise(store.delete(key))
  }

  /**
   * Clears all values in the object store.
   * @returns A promise that resolves when the operation is complete.
   * @example
   * await store.clear();
   */
  async clear() {
    const store = this.store
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
    return new IndexedDBIndex(this.store.createIndex(name, keyPath, options))
  }

  /**
   * Deletes the specified index from the object store.
   * @param name - The name of the index to delete.
   * @example
   * store.deleteIndex('nameIndex');
   */
  deleteIndex(name: string) {
    this.store.deleteIndex(name)
  }

  /**
   * Retrieves the specified index from the object store.
   * @param name - The name of the index to retrieve.
   * @returns The retrieved IndexedDBIndex object.
   * @example
   * const index = store.index('nameIndex');
   */
  index(name: string) {
    return new IndexedDBIndex(this.store.index(name))
  }

  _close() {
    this._store = undefined
    this._transaction = undefined
  }
}

type CloseFn = (err?: Error) => void

interface IDBTransactionExOptions extends IDBTransactionOptions {
  onClose?: CloseFn
}

export class IndexedDBTransaction {
  private _transaction: IDBTransaction
  private _onClose?: CloseFn
  private _storeName: string | string[]
  private _mode: IDBTransactionMode
  private _stores: IndexedDBStore[]

  public get db() {
    return this._transaction?.db
  }

  public get mode() {
    return this._mode
  }

  public get storeName() {
    return this._storeName
  }

  public get finished() {
    return !this._transaction
  }

  public get transaction() {
    if (!this._transaction) {
      throw new IDBErrors.AlreadyEndError('Transaction is finished')
    }
    return this._transaction
  }

  constructor(
    db: IDBDatabase | IDBTransaction,
    storeName?: string | string[],
    mode?: IDBTransactionMode,
    options?: IDBTransactionExOptions
  ) {
    this.init(db, storeName, mode, options)
  }

  init(
    db: IDBDatabase | IDBTransaction,
    storeName?: string | string[],
    mode?: IDBTransactionMode,
    options?: IDBTransactionExOptions
  ) {
    if (!this._transaction) {
      this._stores = []

      const _close = this._close.bind(this)
      if (db instanceof IDBDatabase) {
        this._storeName = storeName
        this._mode = mode
        if (options && options.onClose) {
          this._onClose = options.onClose
        }
        const transaction = db.transaction(storeName, mode, options)
        this._transaction = transaction
        genTransactionEvents(transaction, _close)
      } else {
        this._transaction = db
        genTransactionEvents(db, _close)
      }
      return true
    }
  }

  async commit() {
    return <Promise<void>>new Promise((resolve, reject) => {
      genTransactionEvents(this.transaction, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
      this.transaction.commit()
    })
  }

  async abort() {
    return <Promise<void>>new Promise((resolve) => {
      this.transaction.addEventListener('abort', resolve as any)
      this.transaction.abort()
    })
  }

  public objectStore(name: string) {
    const store = this.transaction.objectStore(name)
    if (!store) {
      throw new IDBErrors.NotFoundError(`${name} store does not exist`)
    }
    const result = new IndexedDBStore(store, this)
    this._stores.push(result)
    return result
  }

  private _close(err?: Error) {
    if (!this._transaction) {
      return
    }

    this._transaction = undefined
    this._storeName = undefined
    this._mode = undefined
    if (this._onClose) {
      this._onClose(err)
    }

    for (const store of this._stores) {
      store._close()
    }
    this._stores = []
  }
}

function genTransactionEvents(transaction: IDBTransaction, callback: Function) {
  const complete = function () {
    unlisten()
    callback()
  }
  const error = function (event: Event) {
    unlisten()
    handleError(event)
    callback((event.target as IDBTransaction).error)
  }
  const abort = function () {
    unlisten()
    callback(new IDBErrors.AbortedError('Transaction aborted'))
  }
  const unlisten = function () {
    transaction.removeEventListener('complete', complete)
    transaction.removeEventListener('error', error)
    transaction.removeEventListener('abort', abort)
  }
  transaction.addEventListener('complete', complete)
  transaction.addEventListener('error', error)
  transaction.addEventListener('abort', abort)
}