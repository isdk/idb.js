[@isdk/idb](../README.md) / [Exports](../modules.md) / [idb-migration](../modules/idb_migration.md) / IDBMigration

# Interface: IDBMigration

[idb-migration](../modules/idb_migration.md).IDBMigration

Represents a migration for an IndexedDB database.

## Table of contents

### Properties

- [index](idb_migration.IDBMigration.md#index)
- [indexes](idb_migration.IDBMigration.md#indexes)
- [rollback](idb_migration.IDBMigration.md#rollback)
- [store](idb_migration.IDBMigration.md#store)
- [stores](idb_migration.IDBMigration.md#stores)
- [upgrade](idb_migration.IDBMigration.md#upgrade)
- [version](idb_migration.IDBMigration.md#version)

## Properties

### index

• `Optional` **index**: [`IDBMigrationIndex`](idb_migration.IDBMigrationIndex.md)

the index(es) added to exists object store

#### Defined in

[src/idb-migration.ts:121](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L121)

___

### indexes

• `Optional` **indexes**: [`IDBMigrationIndex`](idb_migration.IDBMigrationIndex.md)[]

#### Defined in

[src/idb-migration.ts:122](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L122)

___

### rollback

• `Optional` **rollback**: [`MingrationFn`](../modules/idb_migration.md#mingrationfn)

The function to be called during a rollback from this version.

#### Defined in

[src/idb-migration.ts:111](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L111)

___

### store

• `Optional` **store**: [`IDBMigrationObjectStore`](../modules/idb_migration.md#idbmigrationobjectstore)

#### Defined in

[src/idb-migration.ts:116](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L116)

___

### stores

• `Optional` **stores**: [`IDBMigrationObjectStore`](../modules/idb_migration.md#idbmigrationobjectstore) \| [`IDBMigrationObjectStore`](../modules/idb_migration.md#idbmigrationobjectstore)[]

the object store(s) to create

#### Defined in

[src/idb-migration.ts:115](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L115)

___

### upgrade

• `Optional` **upgrade**: [`MingrationFn`](../modules/idb_migration.md#mingrationfn)

The function to be called during an upgrade to this version.

#### Defined in

[src/idb-migration.ts:107](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L107)

___

### version

• **version**: `number`

The version of the migration.

#### Defined in

[src/idb-migration.ts:103](https://github.com/isdk/idb.js/blob/576c329/src/idb-migration.ts#L103)
