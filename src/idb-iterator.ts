/**
 * Represents a record in IndexedDB with a key and value.
 * @template T - The type of the value.
 */
export interface IDBRecordType<T> {
  key: IDBValidKey;
  value: T;
}

/**
 * A function type that represents a callback for each record during iteration.
 * @param {IDBCursorWithValue} [cursor] - can not move to next if cursor not exists
 * @return stopped when return true
 * You should execute cursor.continue() in it
 */
export type OnNextFn = (
  cursor?: IDBCursorWithValue
) => boolean | undefined | Promise<boolean | undefined>;

export interface IDBIteratorOptions {
  /**
   * the next callback function
   */
  onNext?: OnNextFn
  /**
   * the max item count of the IDBIterator
   */
  count?: number
}

/**
 * Represents an asynchronous iterator for iterating over the records in an IndexedDB object store or index.
 * @template T - The type of the record's value being iterated.
 *
 * @example
 *
 * const customersStore = db.transaction("customers", "readwrite").objectStore("customers");
 * // List all customers:
 * const allCustomers = new IDBIterator(customersStore);
 * for await (let customer of allCustomers) {
 *  console.log("Customer", customer);
 * }
 *
 * // List Donnas:
 * const customersCalledDonna = new IDBIterator(
 *   customersStore.index("name"),
 *   IDBKeyRange.only("Donna")
 * );
 * for await (let customer of customersCalledDonna) {
 *  console.log("Customer called 'Donna'", customer.value, customer.key);
 * }
 *
 */
export class IDBIterator<T> implements AsyncIterableIterator<IDBRecordType<T>> {
  private onNext: OnNextFn
  private keyRange: IDBKeyRange | IDBValidKey
  private cursorRequest: IDBRequest
  private cursor: IDBCursorWithValue
  private curResolve: (result?: IteratorResult<IDBRecordType<T>>) => void
  private curReject: (err: Error) => void
  private count: number
  private maxCount?: number

  /**
   * Constructs an instance of IDBIterator.
   * @param {IDBObjectStore | IDBIndex} objectStore - The IndexedDB object store or index to iterate over.
   * @param {IDBKeyRange} [keyRange] - The key range used to filter the records. Default is null.
   * @param {OnNextFn|IDBIteratorOptions|number} [options] - the custom next callback function or max count or IDBIteratorOptions
   */
  constructor(
    private objectStore: IDBObjectStore | IDBIndex,
    keyRange?: IDBKeyRange | IDBValidKey | OnNextFn,
    onNext?: OnNextFn | IDBIteratorOptions | number,
  ) {
    if (typeof keyRange === 'function') {
      onNext = keyRange
      keyRange = undefined
    } else {
      this.keyRange = keyRange
    }

    if (typeof onNext === 'function') {
      this.onNext = onNext
    } else if (typeof onNext === 'number') {
      this.maxCount = onNext
    } else if (onNext) {
      if (onNext.onNext) {
        this.onNext = onNext.onNext
      }
      if (onNext.count) {
        this.maxCount = onNext.count
      }
    }
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<IDBRecordType<T>> {
    return this
  }

  /**
   * Advances the iterator to the next record and returns a promise that resolves to the next iterator result.
   * @returns A promise that resolves to the next iterator result.
   */
  public next(): Promise<IteratorResult<IDBRecordType<T>>> {
    return new Promise<IteratorResult<IDBRecordType<T>>>((resolve, reject) => {
      // We need to store the resolver as an instance variable, since else the
      // success callback would always try to resolve the promise of the first
      // next() call only:
      this.curResolve = resolve
      this.curReject = reject

      if (!this.cursorRequest) {
        // Initial request -> Open the cursor and listen for subsequent success events:
        const req = this.objectStore.openCursor(this.keyRange)
        this.cursorRequest = req
        this.count = 0
        req.onsuccess = (e) => {
          const cursor = <IDBCursorWithValue>(<IDBRequest>e.target).result
          if (cursor && (!this.maxCount || this.count < this.maxCount)) {
            ++this.count
            this.cursor = cursor
            this.curResolve({
              value: { key: this.cursor.key, value: this.cursor.value },
              done: false,
            })
          } else {
            // We have reached the end:
            this.cleanup()
            this.curResolve({ value: undefined, done: true })
          }
        }
        req.onerror = (event) => {
          this.cleanup()
          this.curReject((<IDBRequest>event.target).error)
        }
      } else {
        this._next(this.cursor)
      }
    })
  }

  private cleanup() {
    if (this.cursorRequest) {
      this.cursorRequest.onerror = null
      this.cursorRequest.onsuccess = null
    }
    this.cursor = undefined
    this.cursorRequest = undefined
  }

  private async _next(cursor?: IDBCursorWithValue) {
    if (typeof this.onNext === 'function') {
      const stopped = await this.onNext(cursor)
      if (stopped) {
        this.cleanup()
        this.curResolve({ value: undefined, done: true })
      }
    } else {
      if (cursor) {
        // 2nd request or later -> continue (Still, the above success
        // listener will be called when the cursor has been moved forward):
        cursor.continue()
      }
    }
  }
}
