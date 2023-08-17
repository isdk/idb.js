[@isdk/idb](../README.md) / [Exports](../modules.md) / idb-util

# Module: idb-util

## Table of contents

### Functions

- [handleError](idb_util.md#handleerror)
- [reqGenEvent](idb_util.md#reqgenevent)
- [reqToPromise](idb_util.md#reqtopromise)

## Functions

### handleError

▸ **handleError**(`cb`, `event?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `Function` \| `Event` |
| `event?` | `Event` |

#### Returns

`void`

#### Defined in

[src/idb-util.ts:18](https://github.com/isdk/idb.js/blob/4346aae/src/idb-util.ts#L18)

___

### reqGenEvent

▸ **reqGenEvent**(`req`, `resolve`, `reject`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IDBRequest`<`any`\> |
| `resolve` | `any` |
| `reject` | `any` |

#### Returns

`void`

#### Defined in

[src/idb-util.ts:1](https://github.com/isdk/idb.js/blob/4346aae/src/idb-util.ts#L1)

___

### reqToPromise

▸ **reqToPromise**(`req`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IDBRequest`<`any`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/idb-util.ts:12](https://github.com/isdk/idb.js/blob/4346aae/src/idb-util.ts#L12)
