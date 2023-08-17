[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-database](../modules/idb_database.md) / IndexedDBDatabase

# Class: IndexedDBDatabase

[idb-database](../modules/idb_database.md).IndexedDBDatabase

Represents an IndexedDB database.

## Table of contents

### Constructors

- [constructor](idb_database.IndexedDBDatabase.md#constructor)

### Properties

- [\_db](idb_database.IndexedDBDatabase.md#_db)
- [\_openning](idb_database.IndexedDBDatabase.md#_openning)

### Accessors

- [db](idb_database.IndexedDBDatabase.md#db)
- [name](idb_database.IndexedDBDatabase.md#name)
- [objectStoreNames](idb_database.IndexedDBDatabase.md#objectstorenames)
- [opened](idb_database.IndexedDBDatabase.md#opened)
- [version](idb_database.IndexedDBDatabase.md#version)

### Methods

- [close](idb_database.IndexedDBDatabase.md#close)
- [delete](idb_database.IndexedDBDatabase.md#delete)
- [getStore](idb_database.IndexedDBDatabase.md#getstore)
- [open](idb_database.IndexedDBDatabase.md#open)
- [transaction](idb_database.IndexedDBDatabase.md#transaction)
- [delete](idb_database.IndexedDBDatabase.md#delete-1)

## Constructors

### constructor

• **new IndexedDBDatabase**()

Constructs a new instance of IndexedDBDatabase.

#### Defined in

[src/idb-database.ts:54](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L54)

## Properties

### \_db

• `Private` **\_db**: `IDBDatabase`

#### Defined in

[src/idb-database.ts:12](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L12)

___

### \_openning

• `Private` **\_openning**: `boolean`

#### Defined in

[src/idb-database.ts:13](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L13)

## Accessors

### db

• `get` **db**(): `IDBDatabase`

#### Returns

`IDBDatabase`

#### Defined in

[src/idb-database.ts:36](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L36)

___

### name

• `get` **name**(): `string`

Gets the name of the database.

#### Returns

`string`

#### Defined in

[src/idb-database.ts:18](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L18)

___

### objectStoreNames

• `get` **objectStoreNames**(): `DOMStringList`

Gets the names of the object stores in the database.

#### Returns

`DOMStringList`

#### Defined in

[src/idb-database.ts:25](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L25)

___

### opened

• `get` **opened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/idb-database.ts:43](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L43)

___

### version

• `get` **version**(): `number`

Gets the version of the database.

#### Returns

`number`

#### Defined in

[src/idb-database.ts:32](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L32)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/idb-database.ts:145](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L145)

___

### delete

▸ **delete**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/idb-database.ts:158](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L158)

___

### getStore

▸ **getStore**(`name`, `mode?`, `options?`): [`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `mode` | `IDBTransactionMode` | `'readwrite'` |
| `options?` | `IDBTransactionOptions` | `undefined` |

#### Returns

[`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)

#### Defined in

[src/idb-database.ts:133](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L133)

___

### open

▸ **open**(`dbName`, `version?`, `migrations?`): `Promise`<`IDBDatabase`\>

Opens the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dbName` | `string` | The optional name of the database. |
| `version?` | `number` | The optional version of the database. |
| `migrations?` | [`MingrationFn`](../modules/idb_migration.md#mingrationfn) \| [`IDBMigrations`](../modules/idb_migration.md#idbmigrations) | The optional migrations to be applied during database upgrades. |

#### Returns

`Promise`<`IDBDatabase`\>

A Promise that resolves to the opened IDBDatabase.

#### Defined in

[src/idb-database.ts:63](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L63)

___

### transaction

▸ **transaction**(`name`, `mode?`, `options?`): [`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `string`[] |
| `mode?` | `IDBTransactionMode` |
| `options?` | `IDBTransactionOptions` |

#### Returns

[`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md)

#### Defined in

[src/idb-database.ts:164](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L164)

___

### delete

▸ `Static` **delete**(`name`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/idb-database.ts:47](https://github.com/isdk/idb.js/blob/4346aae/src/idb-database.ts#L47)
