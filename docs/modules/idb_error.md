[@isdk/idb](../README.md) / [Exports](../modules.md) / idb-error

# Module: idb-error

## Table of contents

### Classes

- [IDBError](../classes/idb_error.IDBError.md)

### Interfaces

- [IIDBErrors](../interfaces/idb_error.IIDBErrors.md)

### Variables

- [IDBErrors](idb_error.md#idberrors)

### Functions

- [createIDBError](idb_error.md#createidberror)

## Variables

### IDBErrors

• `Const` **IDBErrors**: [`IIDBErrors`](../interfaces/idb_error.IIDBErrors.md)

#### Defined in

[src/idb-error.ts:12](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L12)

## Functions

### createIDBError

▸ **createIDBError**(`aType`, `aErrorCode`, `ParentErrorClass?`): typeof [`IDBError`](../classes/idb_error.IDBError.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `aType` | `string` | `undefined` |
| `aErrorCode` | `number` | `undefined` |
| `ParentErrorClass` | typeof [`IDBError`](../classes/idb_error.IDBError.md) | `IDBError` |

#### Returns

typeof [`IDBError`](../classes/idb_error.IDBError.md)

#### Defined in

[src/idb-error.ts:34](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L34)
