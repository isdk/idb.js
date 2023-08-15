/*

创建与删除对象存储（Object Store）的操作只能在 IndexedDB 的 onupgradeneeded 事件处理程序中进行。

const migrations = [
  {
    version: 1,
    upgrade: function(db, transaction) {
      const objectStore = db.createObjectStore('books', { keyPath: 'id' });
      objectStore.createIndex('title', 'title', { unique: false });
    },
    rollback: function(db, transaction) {
      db.deleteObjectStore('books');
    }
  },
  {
    version: 2,
    upgrade: function(db, transaction) {
      const objectStore = transaction.objectStore('books');
      objectStore.createIndex('author', 'author', { unique: false });
    },
    rollback: function(db, transaction) {
      const objectStore = transaction.objectStore('books');
      objectStore.deleteIndex('author');
    }
  }
];
*/

export type MingrationFn = (db: IDBDatabase, transaction: IDBTransaction) => void | Promise<void>

/**
 * Represents a migration for an IndexedDB database.
 */
export interface IDBMigration {
  /**
   * The version of the migration.
   */
  version: number
  /**
   * The function to be called during an upgrade to this version.
   */
  upgrade?: MingrationFn
  /**
   * The function to be called during a rollback from this version.
   */
  rollback?: MingrationFn
  /**
   * the object store names instead of upgrade/rollback callback function
   */
  names?: string|string[]
}

/**
 * An array of IDBMigration objects.
 */
export type IDBMigrations = IDBMigration[]

/**
 * Sorts the migrations in ascending or descending order based on their version numbers.
 * @param migrations - The array of migrations to be sorted.
 * @param reverse - Specifies whether to sort in descending order. Default is false (ascending order).
 * @returns The sorted array of migrations.
 */
function sortMigrations(mingrations: IDBMigrations, reverse?: boolean): IDBMigrations {
  const cmp = reverse !== true ? (a, b) => a.version - b.version : (a, b) => b.version - a.version
  return mingrations.sort(cmp)
}

/**
 * Upgrades the database by executing the upgrade functions of the applicable migrations.
 * @param migrations - The array of migrations.
 * @param newVersion - The new version of the database.
 * @param oldVersion - The old version of the database.
 * @param db - The IDBDatabase object.
 * @param transaction - The IDBTransaction object.
 * @example
 * await upgrade([
 *   {
 *     version: 1,
 *     upgrade: function(db, transaction) {
 *       const objectStore = db.createObjectStore('books', { keyPath: 'id' })
 *       objectStore.createIndex('title', 'title', { unique: false })
 *     },
 *     rollback: function(db, transaction) {
 *       db.deleteObjectStore('books')
 *     }
 *   },
 *   {
 *     version: 2,
 *     upgrade: function(db, transaction) {
 *       const objectStore = transaction.objectStore('books');
 *       objectStore.createIndex('author', 'author', { unique: false })
 *     },
 *     rollback: function(db, transaction) {
 *       const objectStore = transaction.objectStore('books')
 *       objectStore.deleteIndex('author')
 *     }
 *   }
 * ], 2, 1, db, transaction)
 */
export async function upgrade(
  mingrations: IDBMigrations,
  newVersion: number,
  oldVersion: number,
  db: IDBDatabase,
  transaction: IDBTransaction
) {
  mingrations = sortMigrations(mingrations);
  for (let i = 0; i < mingrations.length; i++) {
    const migration = mingrations[i]
    if (
      migration.version > oldVersion &&
      migration.version <= newVersion
    ) {
      migration.upgrade && (await migration.upgrade(db, transaction))
      let names = migration.names
      if (names) {
        if (!Array.isArray(names)) {names = [names]}
        for (const name of migration.names) {
          if (!db.objectStoreNames.contains(name)) {db.createObjectStore(name)}
        }
      }
    }
  }
}

/**
 * Rolls back the database by executing the rollback functions of the applicable migrations.
 * @param migrations - The array of migrations.
 * @param oldVersion - The old version of the database.
 * @param newVersion - The new version of the database.
 * @param db - The IDBDatabase object.
 * @param transaction - The IDBTransaction object.
 * @example
 * await rollback([
 *   {
 *     version: 2,
 *     rollback: function(db, transaction) {
 *       const objectStore = transaction.objectStore('books')
 *       objectStore.deleteIndex('author')
 *     }
 *   },
 *   {
 *     version: 1,
 *     rollback: function(db, transaction) {
 *       db.deleteObjectStore('books')
 *     }
 *   }
 * ], 1, 2, db, transaction)
 */
export async function rollback(
  mingrations: IDBMigrations,
  oldVersion: number,
  newVersion: number,
  db: IDBDatabase,
  transaction: IDBTransaction
) {
  mingrations = sortMigrations(mingrations, true);
  for (let i = 0; i < mingrations.length; i++) {
    const migration = mingrations[i]
    if (
      migration.version > oldVersion &&
      migration.version <= newVersion
    ) {
      migration.rollback && (await migration.rollback(db, transaction))
      let names = migration.names
      if (names) {
        if (!Array.isArray(names)) {
          names = [names]
        }
        for (const name of migration.names) {
          db.deleteObjectStore(name)
        }
      }
    }
  }
}
