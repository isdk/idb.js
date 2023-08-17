[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-store-transaction](../modules/idb_store_transaction.md) / IndexedDBTransaction

# Class: IndexedDBTransaction

[idb-store-transaction](../modules/idb_store_transaction.md).IndexedDBTransaction

## Table of contents

### Constructors

- [constructor](idb_store_transaction.IndexedDBTransaction.md#constructor)

### Properties

- [\_mode](idb_store_transaction.IndexedDBTransaction.md#_mode)
- [\_onClose](idb_store_transaction.IndexedDBTransaction.md#_onclose)
- [\_storeName](idb_store_transaction.IndexedDBTransaction.md#_storename)
- [\_stores](idb_store_transaction.IndexedDBTransaction.md#_stores)
- [\_transaction](idb_store_transaction.IndexedDBTransaction.md#_transaction)

### Accessors

- [db](idb_store_transaction.IndexedDBTransaction.md#db)
- [finished](idb_store_transaction.IndexedDBTransaction.md#finished)
- [mode](idb_store_transaction.IndexedDBTransaction.md#mode)
- [storeName](idb_store_transaction.IndexedDBTransaction.md#storename)
- [transaction](idb_store_transaction.IndexedDBTransaction.md#transaction)

### Methods

- [\_close](idb_store_transaction.IndexedDBTransaction.md#_close)
- [abort](idb_store_transaction.IndexedDBTransaction.md#abort)
- [commit](idb_store_transaction.IndexedDBTransaction.md#commit)
- [init](idb_store_transaction.IndexedDBTransaction.md#init)
- [objectStore](idb_store_transaction.IndexedDBTransaction.md#objectstore)

## Constructors

### constructor

• **new IndexedDBTransaction**(`db`, `storeName?`, `mode?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `IDBDatabase` \| `IDBTransaction` |
| `storeName?` | `string` \| `string`[] |
| `mode?` | `IDBTransactionMode` |
| `options?` | `IDBTransactionExOptions` |

#### Defined in

[src/idb-store-transaction.ts:196](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L196)

## Properties

### \_mode

• `Private` **\_mode**: `IDBTransactionMode`

#### Defined in

[src/idb-store-transaction.ts:170](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L170)

___

### \_onClose

• `Private` `Optional` **\_onClose**: `CloseFn`

#### Defined in

[src/idb-store-transaction.ts:168](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L168)

___

### \_storeName

• `Private` **\_storeName**: `string` \| `string`[]

#### Defined in

[src/idb-store-transaction.ts:169](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L169)

___

### \_stores

• `Private` **\_stores**: [`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)[]

#### Defined in

[src/idb-store-transaction.ts:171](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L171)

___

### \_transaction

• `Private` **\_transaction**: `IDBTransaction`

#### Defined in

[src/idb-store-transaction.ts:167](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L167)

## Accessors

### db

• `get` **db**(): `IDBDatabase`

#### Returns

`IDBDatabase`

#### Defined in

[src/idb-store-transaction.ts:173](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L173)

___

### finished

• `get` **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/idb-store-transaction.ts:185](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L185)

___

### mode

• `get` **mode**(): `IDBTransactionMode`

#### Returns

`IDBTransactionMode`

#### Defined in

[src/idb-store-transaction.ts:177](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L177)

___

### storeName

• `get` **storeName**(): `string` \| `string`[]

#### Returns

`string` \| `string`[]

#### Defined in

[src/idb-store-transaction.ts:181](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L181)

___

### transaction

• `get` **transaction**(): `IDBTransaction`

#### Returns

`IDBTransaction`

#### Defined in

[src/idb-store-transaction.ts:189](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L189)

## Methods

### \_close

▸ `Private` **_close**(`err?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` |

#### Returns

`void`

#### Defined in

[src/idb-store-transaction.ts:261](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L261)

___

### abort

▸ **abort**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/idb-store-transaction.ts:244](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L244)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/idb-store-transaction.ts:232](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L232)

___

### init

▸ **init**(`db`, `storeName?`, `mode?`, `options?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `IDBDatabase` \| `IDBTransaction` |
| `storeName?` | `string` \| `string`[] |
| `mode?` | `IDBTransactionMode` |
| `options?` | `IDBTransactionExOptions` |

#### Returns

`boolean`

#### Defined in

[src/idb-store-transaction.ts:205](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L205)

___

### objectStore

▸ **objectStore**(`name`): [`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)

#### Defined in

[src/idb-store-transaction.ts:251](https://github.com/isdk/idb.js/blob/41b9e65/src/idb-store-transaction.ts#L251)
