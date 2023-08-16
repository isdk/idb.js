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
        if (err) {return reject(err)}
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
  const complete = function() {
    unlisten()
    callback()
  }
  const error = function(event: Event) {
    unlisten()
    handleError(event)
    callback((event.target as IDBTransaction).error)
  }
  const abort = function() {
    unlisten()
    callback(new IDBErrors.AbortedError('Transaction aborted'))
  }
  const unlisten = function() {
    transaction.removeEventListener('complete', complete)
    transaction.removeEventListener('error', error)
    transaction.removeEventListener('abort', abort)
  }
  transaction.addEventListener('complete', complete)
  transaction.addEventListener('error', error)
  transaction.addEventListener('abort', abort)
}