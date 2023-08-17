[@isdk/idb](../README.md) / [Exports](../modules.md) / idb-migration

# Module: idb-migration

## Table of contents

### Interfaces

- [IDBMigration](../interfaces/idb_migration.IDBMigration.md)
- [IDBMigrationIndex](../interfaces/idb_migration.IDBMigrationIndex.md)
- [IDBMigrationObjectStoreOptions](../interfaces/idb_migration.IDBMigrationObjectStoreOptions.md)

### Type Aliases

- [IDBMigrationObjectStore](idb_migration.md#idbmigrationobjectstore)
- [IDBMigrations](idb_migration.md#idbmigrations)
- [MingrationFn](idb_migration.md#mingrationfn)

### Functions

- [rollback](idb_migration.md#rollback)
- [upgrade](idb_migration.md#upgrade)

## Type Aliases

### IDBMigrationObjectStore

Ƭ **IDBMigrationObjectStore**: [`IDBMigrationObjectStoreOptions`](../interfaces/idb_migration.IDBMigrationObjectStoreOptions.md) \| `string`

#### Defined in

[src/idb-migration.ts:82](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L82)

___

### IDBMigrations

Ƭ **IDBMigrations**: [`IDBMigration`](../interfaces/idb_migration.IDBMigration.md)[]

An array of IDBMigration objects.

#### Defined in

[src/idb-migration.ts:128](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L128)

___

### MingrationFn

Ƭ **MingrationFn**: (`db`: `IDBDatabase`, `transaction`: `IDBTransaction`, `evt?`: `IDBVersionChangeEvent`) => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (`db`, `transaction`, `evt?`): `void` \| `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `db` | `IDBDatabase` |
| `transaction` | `IDBTransaction` |
| `evt?` | `IDBVersionChangeEvent` |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[src/idb-migration.ts:70](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L70)

## Functions

### rollback

▸ **rollback**(`mingrations`, `oldVersion`, `newVersion`, `db`, `transaction`): `Promise`<`void`\>

Rolls back the database by executing the rollback functions of the applicable migrations.
Note: IndexedDB do not support rollback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mingrations` | [`IDBMigrations`](idb_migration.md#idbmigrations) | - |
| `oldVersion` | `number` | The old version of the database. |
| `newVersion` | `number` | The new version of the database. |
| `db` | `IDBDatabase` | The IDBDatabase object. |
| `transaction` | `IDBTransaction` | The IDBTransaction object. |

#### Returns

`Promise`<`void`\>

**`Example`**

```ts
await rollback([
  {
    version: 2,
    rollback: function(db, transaction) {
      const objectStore = transaction.objectStore('books')
      objectStore.deleteIndex('author')
    }
  },
  {
    version: 1,
    rollback: function(db, transaction) {
      db.deleteObjectStore('books')
    }
  }
], 1, 2, db, transaction)
```

#### Defined in

[src/idb-migration.ts:255](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L255)

___

### upgrade

▸ **upgrade**(`mingrations`, `oldVersion`, `newVersion`, `db`, `transaction`): `Promise`<`void`\>

Upgrades the database by executing the upgrade functions of the applicable migrations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mingrations` | [`IDBMigrations`](idb_migration.md#idbmigrations) | - |
| `oldVersion` | `number` | The old version of the database. |
| `newVersion` | `number` | The new version of the database. |
| `db` | `IDBDatabase` | The IDBDatabase object. |
| `transaction` | `IDBTransaction` | The IDBTransaction object. |

#### Returns

`Promise`<`void`\>

**`Example`**

```ts
await upgrade([
  {
    version: 1,
    upgrade: function(db, transaction) {
      const objectStore = db.createObjectStore('books', { keyPath: 'id' })
      objectStore.createIndex('title', 'title', { unique: false })
    },
    rollback: function(db, transaction) {
      db.deleteObjectStore('books')
    }
  },
  {
    version: 2,
    upgrade: function(db, transaction) {
      const objectStore = transaction.objectStore('books');
      objectStore.createIndex('author', 'author', { unique: false })
    },
    rollback: function(db, transaction) {
      const objectStore = transaction.objectStore('books')
      objectStore.deleteIndex('author')
    }
  }
], 1, 2, db, transaction)
```

**`Example`**

```ts
await upgrade([
  {
    version: 1,
    stores: [{
     name: 'books',
     keyPath: 'id',
     indexes: [{
       name: "title", keyPath: "title", unique: false
     }]
    }],
  },
  {
    version: 2,
    store: {
      name: 'books',
      index: {name: 'author', keyPath: 'author', unique: false}
    }
  }
], 1, 2, db, transaction)
```

#### Defined in

[src/idb-migration.ts:193](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L193)
