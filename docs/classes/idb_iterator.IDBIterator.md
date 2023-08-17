[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-iterator](../modules/idb_iterator.md) / IDBIterator

# Class: IDBIterator<T\>

[idb-iterator](../modules/idb_iterator.md).IDBIterator

Represents an asynchronous iterator for iterating over the records in an IndexedDB object store or index.

**`Example`**

```ts
const customersStore = db.transaction("customers", "readwrite").objectStore("customers");
// List all customers:
const allCustomers = new IDBIterator(customersStore);
for await (let customer of allCustomers) {
 console.log("Customer", customer);
}

// List Donnas:
const customersCalledDonna = new IDBIterator(
  customersStore.index("name"),
  IDBKeyRange.only("Donna")
);
for await (let customer of customersCalledDonna) {
 console.log("Customer called 'Donna'", customer.value, customer.key);
}
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the record's value being iterated. |

## Implements

- `AsyncIterableIterator`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>\>

## Table of contents

### Constructors

- [constructor](idb_iterator.IDBIterator.md#constructor)

### Properties

- [count](idb_iterator.IDBIterator.md#count)
- [curReject](idb_iterator.IDBIterator.md#curreject)
- [curResolve](idb_iterator.IDBIterator.md#curresolve)
- [cursor](idb_iterator.IDBIterator.md#cursor)
- [cursorRequest](idb_iterator.IDBIterator.md#cursorrequest)
- [keyRange](idb_iterator.IDBIterator.md#keyrange)
- [maxCount](idb_iterator.IDBIterator.md#maxcount)
- [objectStore](idb_iterator.IDBIterator.md#objectstore)
- [onNext](idb_iterator.IDBIterator.md#onnext)

### Methods

- [[asyncIterator]](idb_iterator.IDBIterator.md#[asynciterator])
- [\_next](idb_iterator.IDBIterator.md#_next)
- [cleanup](idb_iterator.IDBIterator.md#cleanup)
- [next](idb_iterator.IDBIterator.md#next)

## Constructors

### constructor

• **new IDBIterator**<`T`\>(`objectStore`, `keyRange?`, `onNext?`)

Constructs an instance of IDBIterator.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objectStore` | `IDBObjectStore` \| `IDBIndex` | The IndexedDB object store or index to iterate over. |
| `keyRange?` | `IDBValidKey` \| `IDBKeyRange` \| [`OnNextFn`](../modules/idb_iterator.md#onnextfn) | The key range used to filter the records. Default is null. |
| `onNext?` | `number` \| [`IDBIteratorOptions`](../interfaces/idb_iterator.IDBIteratorOptions.md) \| [`OnNextFn`](../modules/idb_iterator.md#onnextfn) | - |

#### Defined in

[src/idb-iterator.ts:70](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L70)

## Properties

### count

• `Private` **count**: `number`

#### Defined in

[src/idb-iterator.ts:61](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L61)

___

### curReject

• `Private` **curReject**: (`err`: `Error`) => `void`

#### Type declaration

▸ (`err`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

##### Returns

`void`

#### Defined in

[src/idb-iterator.ts:60](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L60)

___

### curResolve

• `Private` **curResolve**: (`result?`: `IteratorResult`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>, `any`\>) => `void`

#### Type declaration

▸ (`result?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result?` | `IteratorResult`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>, `any`\> |

##### Returns

`void`

#### Defined in

[src/idb-iterator.ts:59](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L59)

___

### cursor

• `Private` **cursor**: `IDBCursorWithValue`

#### Defined in

[src/idb-iterator.ts:58](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L58)

___

### cursorRequest

• `Private` **cursorRequest**: `IDBRequest`<`any`\>

#### Defined in

[src/idb-iterator.ts:57](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L57)

___

### keyRange

• `Private` **keyRange**: `IDBValidKey` \| `IDBKeyRange`

#### Defined in

[src/idb-iterator.ts:56](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L56)

___

### maxCount

• `Private` `Optional` **maxCount**: `number`

#### Defined in

[src/idb-iterator.ts:62](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L62)

___

### objectStore

• `Private` **objectStore**: `IDBObjectStore` \| `IDBIndex`

The IndexedDB object store or index to iterate over.

#### Defined in

[src/idb-iterator.ts:71](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L71)

___

### onNext

• `Private` **onNext**: [`OnNextFn`](../modules/idb_iterator.md#onnextfn)

#### Defined in

[src/idb-iterator.ts:55](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L55)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterableIterator`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>\>

#### Returns

`AsyncIterableIterator`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>\>

#### Implementation of

AsyncIterableIterator.[asyncIterator]

#### Defined in

[src/idb-iterator.ts:96](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L96)

___

### \_next

▸ `Private` **_next**(`cursor?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cursor?` | `IDBCursorWithValue` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/idb-iterator.ts:151](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L151)

___

### cleanup

▸ `Private` **cleanup**(): `void`

#### Returns

`void`

#### Defined in

[src/idb-iterator.ts:142](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L142)

___

### next

▸ **next**(): `Promise`<`IteratorResult`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>, `any`\>\>

Advances the iterator to the next record and returns a promise that resolves to the next iterator result.

#### Returns

`Promise`<`IteratorResult`<[`IDBRecordType`](../interfaces/idb_iterator.IDBRecordType.md)<`T`\>, `any`\>\>

A promise that resolves to the next iterator result.

#### Implementation of

AsyncIterableIterator.next

#### Defined in

[src/idb-iterator.ts:104](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-iterator.ts#L104)
