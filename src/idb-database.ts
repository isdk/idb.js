import { IDBErrors } from './idb-error'
import type { IDBMigrations, MingrationFn } from './idb-migration'
import { upgrade } from "./idb-migration";
import { IndexedDBTransaction } from './idb-store-transaction';
import { reqToPromise } from './idb-util';


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

  static async delete(name: string) {
    return reqToPromise(indexedDB.deleteDatabase(name))
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
    migrations?: IDBMigrations | MingrationFn,
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
        db.addEventListener('close', () => {
          this._db = undefined
        })
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
            migrations(db, transaction, event)
          } else {
            upgrade(
              migrations,
              event.oldVersion,
              event.newVersion,
              db,
              transaction,
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

  async close() {
    const db = this.db
    // this._db = undefined
    return <Promise<void>>new Promise((resolve) => {
      db.addEventListener('close', resolve as any)
      db.close()
      // setTimeout(()=>{
      //   this._db = undefined
      //   resolve()
      // }, 1000)
    })
  }

  async delete() {
    const name = this.name
    await this.close()
    return IndexedDBDatabase.delete(name)
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
