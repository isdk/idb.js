[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-error](../modules/idb_error.md) / IDBError

# Class: IDBError

[idb-error](../modules/idb_error.md).IDBError

## Hierarchy

- `CommonError`

  ↳ **`IDBError`**

## Table of contents

### Constructors

- [constructor](idb_error.IDBError.md#constructor)

### Properties

- [code](idb_error.IDBError.md#code)
- [message](idb_error.IDBError.md#message)
- [name](idb_error.IDBError.md#name)
- [stack](idb_error.IDBError.md#stack)
- [Aborted](idb_error.IDBError.md#aborted)
- [AlreadyEnd](idb_error.IDBError.md#alreadyend)
- [AlreadyOpened](idb_error.IDBError.md#alreadyopened)
- [Blocked](idb_error.IDBError.md#blocked)
- [Corruption](idb_error.IDBError.md#corruption)
- [IO](idb_error.IDBError.md#io)
- [InvalidArgument](idb_error.IDBError.md#invalidargument)
- [InvalidFormat](idb_error.IDBError.md#invalidformat)
- [InvalidType](idb_error.IDBError.md#invalidtype)
- [NotFound](idb_error.IDBError.md#notfound)
- [NotOpened](idb_error.IDBError.md#notopened)
- [NotSupported](idb_error.IDBError.md#notsupported)
- [Ok](idb_error.IDBError.md#ok)
- [Opening](idb_error.IDBError.md#opening)
- [createError](idb_error.IDBError.md#createerror)
- [isAborted](idb_error.IDBError.md#isaborted)
- [isAlreadyEnd](idb_error.IDBError.md#isalreadyend)
- [isAlreadyOpened](idb_error.IDBError.md#isalreadyopened)
- [isBlocked](idb_error.IDBError.md#isblocked)
- [isOpening](idb_error.IDBError.md#isopening)

### Methods

- [corruption](idb_error.IDBError.md#corruption-1)
- [iO](idb_error.IDBError.md#io-1)
- [invalidArgument](idb_error.IDBError.md#invalidargument-1)
- [invalidFormat](idb_error.IDBError.md#invalidformat-1)
- [invalidType](idb_error.IDBError.md#invalidtype-1)
- [notFound](idb_error.IDBError.md#notfound-1)
- [notOpened](idb_error.IDBError.md#notopened-1)
- [notSupported](idb_error.IDBError.md#notsupported-1)
- [ok](idb_error.IDBError.md#ok-1)
- [createErrorClass](idb_error.IDBError.md#createerrorclass)
- [isCorruption](idb_error.IDBError.md#iscorruption)
- [isIO](idb_error.IDBError.md#isio)
- [isInvalidArgument](idb_error.IDBError.md#isinvalidargument)
- [isInvalidFormat](idb_error.IDBError.md#isinvalidformat)
- [isInvalidType](idb_error.IDBError.md#isinvalidtype)
- [isNotFound](idb_error.IDBError.md#isnotfound)
- [isNotOpened](idb_error.IDBError.md#isnotopened)
- [isNotSupported](idb_error.IDBError.md#isnotsupported)
- [isOk](idb_error.IDBError.md#isok)

## Constructors

### constructor

• **new IDBError**(`msg?`, `errno?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | `string` |
| `errno?` | `number` |

#### Inherited from

CommonError.constructor

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:44

## Properties

### code

• **code**: `number`

the error code

#### Inherited from

CommonError.code

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/abstract-error.d.ts:15

___

### message

• **message**: `string`

#### Inherited from

CommonError.message

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

CommonError.name

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

CommonError.stack

#### Defined in

node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1069

___

### Aborted

▪ `Static` **Aborted**: `number`

#### Defined in

[src/idb-error.ts:31](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L31)

___

### AlreadyEnd

▪ `Static` **AlreadyEnd**: `number`

#### Defined in

[src/idb-error.ts:30](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L30)

___

### AlreadyOpened

▪ `Static` **AlreadyOpened**: `number`

#### Defined in

[src/idb-error.ts:27](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L27)

___

### Blocked

▪ `Static` **Blocked**: `number`

#### Defined in

[src/idb-error.ts:29](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L29)

___

### Corruption

▪ `Static` **Corruption**: `number`

#### Inherited from

CommonError.Corruption

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:36

___

### IO

▪ `Static` **IO**: `number`

#### Inherited from

CommonError.IO

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:39

___

### InvalidArgument

▪ `Static` **InvalidArgument**: `number`

#### Inherited from

CommonError.InvalidArgument

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:38

___

### InvalidFormat

▪ `Static` **InvalidFormat**: `number`

#### Inherited from

CommonError.InvalidFormat

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:42

___

### InvalidType

▪ `Static` **InvalidType**: `number`

#### Inherited from

CommonError.InvalidType

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:41

___

### NotFound

▪ `Static` **NotFound**: `number`

#### Inherited from

CommonError.NotFound

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:35

___

### NotOpened

▪ `Static` **NotOpened**: `number`

#### Inherited from

CommonError.NotOpened

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:40

___

### NotSupported

▪ `Static` **NotSupported**: `number`

#### Inherited from

CommonError.NotSupported

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:37

___

### Ok

▪ `Static` **Ok**: `number`

#### Inherited from

CommonError.Ok

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:34

___

### Opening

▪ `Static` **Opening**: `number`

#### Defined in

[src/idb-error.ts:28](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L28)

___

### createError

▪ `Static` **createError**: (`aType`: `string`, `aErrorCode`: `number`, `ParentErrorClass?`: typeof [`IDBError`](idb_error.IDBError.md)) => typeof [`IDBError`](idb_error.IDBError.md)

#### Type declaration

▸ (`aType`, `aErrorCode`, `ParentErrorClass?`): typeof [`IDBError`](idb_error.IDBError.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `aType` | `string` |
| `aErrorCode` | `number` |
| `ParentErrorClass?` | typeof [`IDBError`](idb_error.IDBError.md) |

##### Returns

typeof [`IDBError`](idb_error.IDBError.md)

#### Defined in

[src/idb-error.ts:15](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L15)

___

### isAborted

▪ `Static` **isAborted**: (`err`: [`IDBError`](idb_error.IDBError.md)) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`IDBError`](idb_error.IDBError.md) |

##### Returns

`boolean`

#### Defined in

[src/idb-error.ts:25](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L25)

___

### isAlreadyEnd

▪ `Static` **isAlreadyEnd**: (`err`: [`IDBError`](idb_error.IDBError.md)) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`IDBError`](idb_error.IDBError.md) |

##### Returns

`boolean`

#### Defined in

[src/idb-error.ts:24](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L24)

___

### isAlreadyOpened

▪ `Static` **isAlreadyOpened**: (`err`: [`IDBError`](idb_error.IDBError.md)) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`IDBError`](idb_error.IDBError.md) |

##### Returns

`boolean`

#### Defined in

[src/idb-error.ts:21](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L21)

___

### isBlocked

▪ `Static` **isBlocked**: (`err`: [`IDBError`](idb_error.IDBError.md)) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`IDBError`](idb_error.IDBError.md) |

##### Returns

`boolean`

#### Defined in

[src/idb-error.ts:23](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L23)

___

### isOpening

▪ `Static` **isOpening**: (`err`: [`IDBError`](idb_error.IDBError.md)) => `boolean`

#### Type declaration

▸ (`err`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | [`IDBError`](idb_error.IDBError.md) |

##### Returns

`boolean`

#### Defined in

[src/idb-error.ts:22](https://github.com/isdk/idb.js/blob/6598250/src/idb-error.ts#L22)

## Methods

### corruption

▸ **corruption**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.corruption

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:48

___

### iO

▸ **iO**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.iO

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:51

___

### invalidArgument

▸ **invalidArgument**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.invalidArgument

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:50

___

### invalidFormat

▸ **invalidFormat**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.invalidFormat

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:54

___

### invalidType

▸ **invalidType**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.invalidType

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:53

___

### notFound

▸ **notFound**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.notFound

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:47

___

### notOpened

▸ **notOpened**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.notOpened

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:52

___

### notSupported

▸ **notSupported**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.notSupported

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:49

___

### ok

▸ **ok**(): `boolean`

#### Returns

`boolean`

#### Inherited from

CommonError.ok

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:46

___

### createErrorClass

▸ `Static` **createErrorClass**(`aType`, `aErrorCode`, `ParentErrorClass?`): typeof `CommonError`

Create an Error Class

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aType` | `string` | the error type(class) name |
| `aErrorCode` | `number` | the error code, should be greater than 0. |
| `ParentErrorClass?` | typeof `CommonError` | the parent error class. defaults to CommonError |

#### Returns

typeof `CommonError`

the new Error Class

#### Inherited from

CommonError.createErrorClass

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:22

___

### isCorruption

▸ `Static` **isCorruption**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isCorruption

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:26

___

### isIO

▸ `Static` **isIO**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isIO

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:29

___

### isInvalidArgument

▸ `Static` **isInvalidArgument**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isInvalidArgument

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:28

___

### isInvalidFormat

▸ `Static` **isInvalidFormat**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isInvalidFormat

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:32

___

### isInvalidType

▸ `Static` **isInvalidType**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isInvalidType

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:31

___

### isNotFound

▸ `Static` **isNotFound**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isNotFound

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:25

___

### isNotOpened

▸ `Static` **isNotOpened**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isNotOpened

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:30

___

### isNotSupported

▸ `Static` **isNotSupported**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isNotSupported

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:27

___

### isOk

▸ `Static` **isOk**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `CommonError` |

#### Returns

`boolean`

#### Inherited from

CommonError.isOk

#### Defined in

node_modules/.pnpm/abstract-error@2.0.0-alpha.4/node_modules/abstract-error/lib/common-error.d.ts:24
