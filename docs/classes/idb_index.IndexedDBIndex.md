[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-index](../modules/idb_index.md) / IndexedDBIndex

# Class: IndexedDBIndex

[idb-index](../modules/idb_index.md).IndexedDBIndex

Represents a base store for interacting with an IndexedDB object store.

## Hierarchy

- [`IndexedDBBaseStore`](idb_base_store.IndexedDBBaseStore.md)

  ↳ **`IndexedDBIndex`**

## Table of contents

### Constructors

- [constructor](idb_index.IndexedDBIndex.md#constructor)

### Properties

- [\_store](idb_index.IndexedDBIndex.md#_store)

### Accessors

- [keyPath](idb_index.IndexedDBIndex.md#keypath)
- [multiEntry](idb_index.IndexedDBIndex.md#multientry)
- [name](idb_index.IndexedDBIndex.md#name)
- [objectStore](idb_index.IndexedDBIndex.md#objectstore)
- [unique](idb_index.IndexedDBIndex.md#unique)

### Methods

- [count](idb_index.IndexedDBIndex.md#count)
- [get](idb_index.IndexedDBIndex.md#get)
- [getAll](idb_index.IndexedDBIndex.md#getall)
- [getAllKeys](idb_index.IndexedDBIndex.md#getallkeys)
- [getMulti](idb_index.IndexedDBIndex.md#getmulti)
- [getMultiple](idb_index.IndexedDBIndex.md#getmultiple)
- [json](idb_index.IndexedDBIndex.md#json)
- [keys](idb_index.IndexedDBIndex.md#keys)
- [values](idb_index.IndexedDBIndex.md#values)

## Constructors

### constructor

• **new IndexedDBIndex**(`_store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_store` | `IDBIndex` |

#### Overrides

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[constructor](idb_base_store.IndexedDBBaseStore.md#constructor)

#### Defined in

[src/idb-index.ts:16](https://github.com/isdk/idb.js/blob/576c329/src/idb-index.ts#L16)

## Properties

### \_store

• `Protected` **\_store**: `IDBIndex`

The underlying IDBObjectStore or IDBIndex.

#### Inherited from

[IndexedDBBaseStore](idb_base_store.IndexedDBBaseStore.md).[_store](idb_base_store.IndexedDBBaseStore.md#_store)

#### Defined in

[src/idb-index.ts:16](https://github.com/isdk/idb.js/blob/576c329/src/idb-index.ts#L16)

## Accessors

### keyPath

• `get` **keyPath**(): `string` \| `string`[]

Gets the key path of the object store.

#### Returns

`string` \| `string`[]

#### Inherited from

IndexedDBBaseStore.keyPath

#### Defined in

[src/idb-base-store.ts:11](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L11)

___

### multiEntry

• `get` **multiEntry**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/idb-index.ts:4](https://github.com/isdk/idb.js/blob/576c329/src/idb-index.ts#L4)

___

### name

• `get` **name**(): `string`

Gets the name of the object store.

#### Returns

`string`

#### Inherited from

IndexedDBBaseStore.name

#### Defined in

[src/idb-base-store.ts:18](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L18)

___

### objectStore

• `get` **objectStore**(): `IDBObjectStore`

#### Returns

`IDBObjectStore`

#### Defined in

[src/idb-index.ts:8](https://github.com/isdk/idb.js/blob/576c329/src/idb-index.ts#L8)

___

### unique

• `get` **unique**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/idb-index.ts:12](https://github.com/isdk/idb.js/blob/576c329/src/idb-index.ts#L12)

## Methods

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

[src/idb-base-store.ts:149](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L149)

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

[src/idb-base-store.ts:35](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L35)

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

[src/idb-base-store.ts:48](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L48)

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

[src/idb-base-store.ts:61](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L61)

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

[src/idb-base-store.ts:89](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L89)

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

[src/idb-base-store.ts:138](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L138)

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

[src/idb-base-store.ts:162](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L162)

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

[src/idb-base-store.ts:181](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L181)

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

[src/idb-base-store.ts:193](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L193)
