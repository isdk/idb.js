[@isdk/idb](../README.md) / [Exports](../modules.md) / idb-iterator

# Module: idb-iterator

## Table of contents

### Classes

- [IDBIterator](../classes/idb_iterator.IDBIterator.md)

### Interfaces

- [IDBIteratorOptions](../interfaces/idb_iterator.IDBIteratorOptions.md)
- [IDBRecordType](../interfaces/idb_iterator.IDBRecordType.md)

### Type Aliases

- [OnNextFn](idb_iterator.md#onnextfn)

## Type Aliases

### OnNextFn

Ƭ **OnNextFn**: (`cursor?`: `IDBCursorWithValue`) => `boolean` \| `undefined` \| `Promise`<`boolean` \| `undefined`\>

#### Type declaration

▸ (`cursor?`): `boolean` \| `undefined` \| `Promise`<`boolean` \| `undefined`\>

A function type that represents a callback for each record during iteration.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cursor?` | `IDBCursorWithValue` | can not move to next if cursor not exists |

##### Returns

`boolean` \| `undefined` \| `Promise`<`boolean` \| `undefined`\>

stopped when return true
You should execute cursor.continue() in it

#### Defined in

[src/idb-iterator.ts:16](https://github.com/isdk/idb.js/blob/6598250/src/idb-iterator.ts#L16)
