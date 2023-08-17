[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-store-transaction](../modules/idb_store_transaction.md) / IndexedDBStore

# Class: IndexedDBStore

[idb-store-transaction](../modules/idb_store_transaction.md).IndexedDBStore

Represents a store for interacting with an IndexedDB object store.

## Hierarchy

- [`IndexedDBBaseStore`](idb_base_store.IndexedDBBaseStore.md)

  ↳ **`IndexedDBStore`**

## Table of contents

### Constructors

- [constructor](idb_store_transaction.IndexedDBStore.md#constructor)

### Properties

- [\_store](idb_store_transaction.IndexedDBStore.md#_store)
- [\_transaction](idb_store_transaction.IndexedDBStore.md#_transaction)

### Accessors

- [autoIncrement](idb_store_transaction.IndexedDBStore.md#autoincrement)
- [indexNames](idb_store_transaction.IndexedDBStore.md#indexnames)
- [keyPath](idb_store_transaction.IndexedDBStore.md#keypath)
- [name](idb_store_transaction.IndexedDBStore.md#name)
- [opened](idb_store_transaction.IndexedDBStore.md#opened)
- [store](idb_store_transaction.IndexedDBStore.md#store)
- [transaction](idb_store_transaction.IndexedDBStore.md#transaction)

### Methods

- [\_close](idb_store_transaction.IndexedDBStore.md#_close)
- [add](idb_store_transaction.IndexedDBStore.md#add)
- [clear](idb_store_transaction.IndexedDBStore.md#clear)
- [count](idb_store_transaction.IndexedDBStore.md#count)
- [createIndex](idb_store_transaction.IndexedDBStore.md#createindex)
- [deleteIndex](idb_store_transaction.IndexedDBStore.md#deleteindex)
- [get](idb_store_transaction.IndexedDBStore.md#get)
- [getAll](idb_store_transaction.IndexedDBStore.md#getall)
- [getAllKeys](idb_store_transaction.IndexedDBStore.md#getallkeys)
- [getMulti](idb_store_transaction.IndexedDBStore.md#getmulti)
- [getMultiple](idb_store_transaction.IndexedDBStore.md#getmultiple)
- [index](idb_store_transaction.IndexedDBStore.md#index)
- [json](idb_store_transaction.IndexedDBStore.md#json)
- [keys](idb_store_transaction.IndexedDBStore.md#keys)
- [put](idb_store_transaction.IndexedDBStore.md#put)
- [remove](idb_store_transaction.IndexedDBStore.md#remove)
- [set](idb_store_transaction.IndexedDBStore.md#set)
- [values](idb_store_transaction.IndexedDBStore.md#values)

## Constructors

### constructor

• **new IndexedDBStore**(`_store`, `_transaction?`)

Constructs a new IndexedDBStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_store` | `IDBObjectStore` | The underlying IDBObjectStore. |
| `_transaction?` | [`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md) | - |

#### Overrides

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[constructor](idb_base_store.IndexedDBBaseStore.md#constructor)

#### Defined in

[src/idb-store-transaction.ts:47](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L47)

## Properties

### \_store

• `Protected` **\_store**: `IDBObjectStore`

The underlying IDBObjectStore.

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[_store](idb_base_store.IndexedDBBaseStore.md#_store)

#### Defined in

[src/idb-store-transaction.ts:48](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L48)

___

### \_transaction

• `Private` `Optional` **\_transaction**: [`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md)

#### Defined in

[src/idb-store-transaction.ts:49](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L49)

## Accessors

### autoIncrement

• `get` **autoIncrement**(): `boolean`

Gets a value indicating whether the object store has an auto-incrementing key.

#### Returns

`boolean`

#### Defined in

[src/idb-store-transaction.ts:30](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L30)

___

### indexNames

• `get` **indexNames**(): `DOMStringList`

Gets the index names associated with the object store.

#### Returns

`DOMStringList`

#### Defined in

[src/idb-store-transaction.ts:13](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L13)

___

### keyPath

• `get` **keyPath**(): `string` \| `string`[]

Gets the key path of the object store.

#### Returns

`string` \| `string`[]

#### Inherited from

IndexedDBBaseStore.keyPath

#### Defined in

[src/idb-base-store.ts:11](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L11)

___

### name

• `get` **name**(): `string`

Gets the name of the object store.

#### Returns

`string`

#### Inherited from

IndexedDBBaseStore.name

#### Defined in

[src/idb-base-store.ts:18](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L18)

___

### opened

• `get` **opened**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/idb-store-transaction.ts:39](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L39)

___

### store

• `get` **store**(): `IDBObjectStore`

#### Returns

`IDBObjectStore`

#### Defined in

[src/idb-store-transaction.ts:34](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L34)

___

### transaction

• `get` **transaction**(): [`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md)

Gets the transaction associated with the object store.

#### Returns

[`IndexedDBTransaction`](idb_store_transaction.IndexedDBTransaction.md)

#### Defined in

[src/idb-store-transaction.ts:20](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L20)

## Methods

### \_close

▸ **_close**(): `void`

#### Returns

`void`

#### Defined in

[src/idb-store-transaction.ts:154](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L154)

___

### add

▸ **add**(`value`, `key?`): `Promise`<`IDBValidKey`\>

Adds the value associated with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The value to add. |
| `key?` | `IDBValidKey` | The key to add the value for. Optional. |

#### Returns

`Promise`<`IDBValidKey`\>

A promise that resolves when the operation is complete.

**`Example`**

```ts
await store.add({ name: 'John', age: 30 }, 1);
```

#### Defined in

[src/idb-store-transaction.ts:86](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L86)

___

### clear

▸ **clear**(): `Promise`<`void`\>

Clears all values in the object store.

#### Returns

`Promise`<`void`\>

A promise that resolves when the operation is complete.

**`Example`**

```ts
await store.clear();
```

#### Defined in

[src/idb-store-transaction.ts:111](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L111)

___

### count

▸ **count**(`query?`): `Promise`<`number`\>

Retrieves the count of records in the object store that match the specified query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match records against. Optional. |

#### Returns

`Promise`<`number`\>

A promise that resolves to the count of matching records.

**`Example`**

```ts
const count = await baseStore.count('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[count](idb_base_store.IndexedDBBaseStore.md#count)

#### Defined in

[src/idb-base-store.ts:149](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L149)

___

### createIndex

▸ **createIndex**(`name`, `keyPath`, `options?`): [`IndexedDBIndex`](idb_index.IndexedDBIndex.md)

Creates an index on the object store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the index. |
| `keyPath` | `string` \| `string`[] | The key path of the index. |
| `options?` | `IDBIndexParameters` | The options for creating the index. Optional. |

#### Returns

[`IndexedDBIndex`](idb_index.IndexedDBIndex.md)

The created IndexedDBIndex object.

**`Example`**

```ts
const index = store.createIndex('nameIndex', 'name');
```

#### Defined in

[src/idb-store-transaction.ts:125](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L125)

___

### deleteIndex

▸ **deleteIndex**(`name`): `void`

Deletes the specified index from the object store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the index to delete. |

#### Returns

`void`

**`Example`**

```ts
store.deleteIndex('nameIndex');
```

#### Defined in

[src/idb-store-transaction.ts:139](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L139)

___

### get

▸ **get**<`T`\>(`key`): `Promise`<`T`\>

Retrieves the value associated with the specified key.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `IDBValidKey` | The key to retrieve the value for. |

#### Returns

`Promise`<`T`\>

A promise that resolves to the retrieved value.

**`Example`**

```ts
const value = await baseStore.get(1);
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[get](idb_base_store.IndexedDBBaseStore.md#get)

#### Defined in

[src/idb-base-store.ts:35](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L35)

___

### getAll

▸ **getAll**(`query?`, `count?`): `Promise`<`any`[]\>

Retrieves all values in the object store that match the specified query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match records against. Optional. |
| `count?` | `number` | The maximum number of records to retrieve. Optional. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of matching values.

**`Example`**

```ts
const values = await baseStore.getAll('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[getAll](idb_base_store.IndexedDBBaseStore.md#getall)

#### Defined in

[src/idb-base-store.ts:48](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L48)

___

### getAllKeys

▸ **getAllKeys**(`query?`, `count?`): `Promise`<`any`[]\>

Retrieves all keys in the object store that match the specified query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match keys against. Optional. |
| `count?` | `number` | The maximum number of keys to retrieve. Optional. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of matching keys.

**`Example`**

```ts
const keys = await baseStore.getAllKeys('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[getAllKeys](idb_base_store.IndexedDBBaseStore.md#getallkeys)

#### Defined in

[src/idb-base-store.ts:61](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L61)

___

### getMulti

▸ **getMulti**(`keys`): `Promise`<`any`[]\>

Retrieves multiple values associated with the specified keys.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `string`[] | The keys of the values to retrieve. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of retrieved values.

**`Alias`**

getMultiple

**`Example`**

```ts
const values = await baseStore.getMulti(['key1', 'key2']);
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[getMulti](idb_base_store.IndexedDBBaseStore.md#getmulti)

#### Defined in

[src/idb-base-store.ts:89](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L89)

___

### getMultiple

▸ **getMultiple**(`keys`): `Promise`<`any`[]\>

Retrieves multiple values associated with the specified keys.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `string`[] | The keys of the values to retrieve. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of retrieved values.

**`Alias`**

getMulti

**`Example`**

```ts
const values = await baseStore.getMultiple(['key1', 'key2']);
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[getMultiple](idb_base_store.IndexedDBBaseStore.md#getmultiple)

#### Defined in

[src/idb-base-store.ts:138](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L138)

___

### index

▸ **index**(`name`): [`IndexedDBIndex`](idb_index.IndexedDBIndex.md)

Retrieves the specified index from the object store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the index to retrieve. |

#### Returns

[`IndexedDBIndex`](idb_index.IndexedDBIndex.md)

The retrieved IndexedDBIndex object.

**`Example`**

```ts
const index = store.index('nameIndex');
```

#### Defined in

[src/idb-store-transaction.ts:150](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L150)

___

### json

▸ **json**(`query?`, `count?`): `Promise`<{}\>

Retrieves all values in the object store that match the specified query and returns them in a JSON object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match records against. Optional. |
| `count?` | `number` | The maximum number of values to retrieve. Optional. |

#### Returns

`Promise`<{}\>

A promise that resolves to a JSON object containing the matching values.

**`Example`**

```ts
const json = await baseStore.json('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[json](idb_base_store.IndexedDBBaseStore.md#json)

#### Defined in

[src/idb-base-store.ts:162](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L162)

___

### keys

▸ **keys**(`query?`, `count?`): `Promise`<`any`[]\>

Retrieves all keys in the object store that match the specified query and returns them in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match keys against. Optional. |
| `count?` | `number` | The maximum number of keys to retrieve. Optional. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of matching keys.

**`Example`**

```ts
const keys = await baseStore.keys('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[keys](idb_base_store.IndexedDBBaseStore.md#keys)

#### Defined in

[src/idb-base-store.ts:181](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L181)

___

### put

▸ **put**(`value`, `key?`): `Promise`<`IDBValidKey`\>

Puts the value associated with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The value to put. |
| `key?` | `IDBValidKey` | The key to put the value for. Optional. |

#### Returns

`Promise`<`IDBValidKey`\>

A promise that resolves when the operation is complete.

**`Example`**

```ts
await store.put({ name: 'John', age: 30 }, 1);
```

#### Defined in

[src/idb-store-transaction.ts:73](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L73)

___

### remove

▸ **remove**(`key`): `Promise`<`void`\>

Removes the value associated with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `IDBValidKey` | The key to remove the value for. |

#### Returns

`Promise`<`void`\>

A promise that resolves when the operation is complete.

**`Example`**

```ts
await store.remove(1);
```

#### Defined in

[src/idb-store-transaction.ts:100](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L100)

___

### set

▸ **set**(`key`, `value`): `Promise`<`IDBValidKey`\>

Sets the value associated with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `IDBValidKey` | The key to set the value for. |
| `value` | `any` | The value to set. |

#### Returns

`Promise`<`IDBValidKey`\>

**`Example`**

```ts
await store.set(1, { name: 'John', age: 30 });
```

#### Defined in

[src/idb-store-transaction.ts:61](https://github.com/isdk/idb.js/blob/4346aae/src/idb-store-transaction.ts#L61)

___

### values

▸ **values**(`query?`, `count?`): `Promise`<`any`[]\>

Retrieves all values in the object store that match the specified query and returns them in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query?` | `IDBValidKey` \| `IDBKeyRange` | The query to match records against. Optional. |
| `count?` | `number` | The maximum number of values to retrieve. Optional. |

#### Returns

`Promise`<`any`[]\>

A promise that resolves to an array of matching values.

**`Example`**

```ts
const values = await baseStore.values('John');
```

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[values](idb_base_store.IndexedDBBaseStore.md#values)

#### Defined in

[src/idb-base-store.ts:193](https://github.com/isdk/idb.js/blob/4346aae/src/idb-base-store.ts#L193)
