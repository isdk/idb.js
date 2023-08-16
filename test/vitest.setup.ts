import 'fake-indexeddb/auto'

/*
import { IDBDatabase, IDBVersionChangeEvent } from 'fake-indexeddb'

const FakeEvent = Object.getPrototypeOf(
  IDBVersionChangeEvent.prototype
).constructor

const close = IDBDatabase.prototype.close

IDBDatabase.prototype.close = function () {
  close.call(this)
  const interval = setInterval(() => {
    if (this._closed) {
      clearInterval(interval)
      const evt = new FakeEvent('close') // { type: 'close', initialized: true, eventPath: }
      this.dispatchEvent(evt)
    }
  }, 50)
}
*/
