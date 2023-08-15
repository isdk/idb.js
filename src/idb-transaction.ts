import { IDBErrors } from './idb-error'
import { IndexedDBStore } from './idb-store'

type CloseFn = (err?: Error) => void

interface IDBTransactionExOptions extends IDBTransactionOptions {
  onClose?: CloseFn
}

export function handleError(cb: Function | Event, event?: Event) {
  if (cb instanceof Event) {
    event = cb
    cb = undefined
  }
  event.preventDefault()
  event.stopPropagation()
  if (typeof cb === 'function') {
    cb((event.target as any).error)
  }
}

export class IndexedDBTransaction {
  private _transaction: IDBTransaction
  private _onClose?: CloseFn
  private _storeName: string | string[]
  private _mode: IDBTransactionMode

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
      const complete = () => {
        unlisten()
        this._close()
      }
      const error = (event: Event) => {
        unlisten()
        handleError(event)
        this._close((event.target as IDBTransaction).error)
      }
      const abort = () => {
        unlisten()
        this._close(new IDBErrors.AbortedError('Transaction aborted'))
      }
      const unlisten = () => {
        const transaction = this._transaction
        transaction.removeEventListener('complete', complete)
        transaction.removeEventListener('error', error)
        transaction.removeEventListener('abort', abort)
      }

      if (db instanceof IDBDatabase) {
        this._storeName = storeName
        this._mode = mode
        if (options && options.onClose) {
          this._onClose = options.onClose
        }
        const transaction = db.transaction(storeName, mode, options)
        this._transaction = transaction
        transaction.addEventListener('complete', complete)
        transaction.addEventListener('error', error)
        transaction.addEventListener('abort', abort)
      } else {
        this._transaction = db
        db.addEventListener('complete', complete)
        db.addEventListener('error', error)
        db.addEventListener('abort', abort)
      }
      return true
    }
  }

  commit() {
    this.transaction.commit()
  }

  abort() {
    this.transaction.abort()
  }

  public objectStore(name: string) {
    const store = this.transaction.objectStore(name)
    if (!store) {
      throw new IDBErrors.NotFoundError(`${name} store does not exist`)
    }
    return new IndexedDBStore(store, this)
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
  }
}
