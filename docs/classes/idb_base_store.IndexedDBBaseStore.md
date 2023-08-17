[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-base-store](../modules/idb_base_store.md) / IndexedDBBaseStore

# Class: IndexedDBBaseStore

[idb-base-store](../modules/idb_base_store.md).IndexedDBBaseStore

Represents a base store for interacting with an IndexedDB object store.

## Hierarchy

- **`IndexedDBBaseStore`**

  ↳ [`IndexedDBIndex`](idb_index.IndexedDBIndex.md)

  ↳ [`IndexedDBStore`](idb_store_transaction.IndexedDBStore.md)

## Table of contents

### Constructors

- [constructor](idb_base_store.IndexedDBBaseStore.md#constructor)

### Properties

- [\_store](idb_base_store.IndexedDBBaseStore.md#_store)

### Accessors

- [keyPath](idb_base_store.IndexedDBBaseStore.md#keypath)
- [name](idb_base_store.IndexedDBBaseStore.md#name)

### Methods

- [count](idb_base_store.IndexedDBBaseStore.md#count)
- [get](idb_base_store.IndexedDBBaseStore.md#get)
- [getAll](idb_base_store.IndexedDBBaseStore.md#getall)
- [getAllKeys](idb_base_store.IndexedDBBaseStore.md#getallkeys)
- [getMulti](idb_base_store.IndexedDBBaseStore.md#getmulti)
- [getMultiple](idb_base_store.IndexedDBBaseStore.md#getmultiple)
- [json](idb_base_store.IndexedDBBaseStore.md#json)
- [keys](idb_base_store.IndexedDBBaseStore.md#keys)
- [values](idb_base_store.IndexedDBBaseStore.md#values)

## Constructors

### constructor

• **new IndexedDBBaseStore**(`_store`)

Constructs a new IndexedDBBaseStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_store` | `any` | The underlying IDBObjectStore or IDBIndex. |

#### Defined in

[src/idb-base-store.ts:26](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L26)

## Properties

### \_store

• `Protected` **\_store**: `any`

The underlying IDBObjectStore or IDBIndex.

#### Defined in

[src/idb-base-store.ts:26](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L26)

## Accessors

### keyPath

• `get` **keyPath**(): `string` \| `string`[]

Gets the key path of the object store.

#### Returns

`string` \| `string`[]

#### Defined in

[src/idb-base-store.ts:11](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L11)

___

### name

• `get` **name**(): `string`

Gets the name of the object store.

#### Returns

`string`

#### Defined in

[src/idb-base-store.ts:18](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L18)

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

#### Defined in

[src/idb-base-store.ts:193](https://github.com/isdk/idb.js/blob/576c329/src/idb-base-store.ts#L193)
