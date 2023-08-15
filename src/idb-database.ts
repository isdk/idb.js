import { IDBErrors } from './idb-error'
import type { IDBMigrations, MingrationFn } from './idb-migration'
import { upgrade } from "./idb-migration";
import { IndexedDBTransaction } from './idb-transaction';


/**
 * Represents an IndexedDB database.
 */
export class IndexedDBDatabase {
  private _db: IDBDatabase
  private _openning: boolean

  /**
   * Gets the name of the database.
   */
  get name() {
    return this.db.name
  }

  /**
   * Gets the names of the object stores in the database.
   */
  get objectStoreNames() {
    return this.db.objectStoreNames
  }

  /**
   * Gets the version of the database.
   */
  get version() {
    return this.db.version
  }

  get db() {
    if (!this._db) {
      throw new IDBErrors.NotOpenedError('database not opened')
    }
    return this._db
  }

  get opened() {
    return this._db != null
  }

  /**
   * Constructs a new instance of IndexedDBDatabase.
   */
  constructor() {}

  /**
   * Opens the database.
   * @param dbName - The optional name of the database.
   * @param version - The optional version of the database.
   * @param migrations - The optional migrations to be applied during database upgrades.
   * @returns A Promise that resolves to the opened IDBDatabase.
   */
  public async open(
    dbName: string,
    version?: number,
    migrations?: IDBMigrations | MingrationFn
  ): Promise<IDBDatabase> {
    if (this._db) {
      throw new IDBErrors.AlreadyOpenedError(dbName + ' Database is already opened.')
    }
    if (this._openning) {
      return new Promise((resolve, reject) => {
        let count = 0
        const interval = setInterval(async () => {
          if (this._db) {
            clearInterval(interval)
            resolve(this._db)
          }
          ++count
          if (count > 100) {
            clearInterval(interval)
            reject(new IDBErrors.OpeningError(dbName + ' Database is opening.'))
          }
        }, 100)
      })
    }
    this._openning = true

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version)

      request.onerror = (event) => {
        const err = (event.target as IDBOpenDBRequest).error
        this._openning = undefined
        reject(err)
      }

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        this._db = db
        this._openning = undefined
        resolve(db)
      }

      request.onblocked = () => {
        this._openning = undefined
        reject(new IDBErrors.BlockedError(dbName + ' database is blocked'))
      }

      if (migrations) {
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result
          const transaction = (event.target as IDBOpenDBRequest).transaction
          if (typeof migrations === 'function') {
            migrations(db, transaction)
          } else {
            upgrade(
              migrations,
              event.newVersion,
              event.oldVersion,
              db,
              transaction
            )
          }
        }
      }
    })
  }

  getStore(
    name: string,
    mode: IDBTransactionMode = 'readwrite',
    options?: IDBTransactionOptions
  ) {
    if (!this.db.objectStoreNames.contains(name)) {
      throw new IDBErrors.NotFoundError(`${name} store does not exist`)
    }
    const trans = this.transaction(name, mode, options)
    return trans.objectStore(name)
  }

  /**
   * returns immediately and closes the connection in a separate thread.
   */
  close() {
    this.db.close()
    this._db = undefined
  }

  transaction(
    name: string | string[],
    mode?: IDBTransactionMode,
    options?: IDBTransactionOptions
  ) {
    const v = this.db.transaction(name, mode, options)
    return new IndexedDBTransaction(v)
  }
}
