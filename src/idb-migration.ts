/*
The operations of creating and deleting object stores can only be performed within the onupgradeneeded event handler of IndexedDB.

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

const migrations = [
  {
    version: 1,
    names: 'books
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

const migrations = [
  {
    version: 1,
    stores: [
      {
        name: 'books',
        keyPath: 'id',
        indexes: [
          { name: 'titleIndex', keyPath: 'title', options: { unique: false } }
        ]
      },
      {
        name: 'authors',
        keyPath: 'id',
        indexes: [
          { name: 'nameIndex', keyPath: 'name', options: { unique: true } },
          { name: 'countryIndex', keyPath: 'country', options: { unique: false } }
        ]
      }
    ]
  }
];
*/

export type MingrationFn = (
  db: IDBDatabase,
  transaction: IDBTransaction,
  evt?: IDBVersionChangeEvent
) => void | Promise<void>

export interface IDBMigrationObjectStoreOptions extends IDBObjectStoreParameters {
  name: string
  indexes?: IDBMigrationIndex[] | IDBMigrationIndex | null
  index?: IDBMigrationIndex | null
}

export type IDBMigrationObjectStore = IDBMigrationObjectStoreOptions | string

export interface IDBMigrationIndex extends IDBIndexParameters {
  /**
   * the index name
   */
  name: string
  keyPath: string | string[]
  /**
   * the index belongs to the store name
   */
  store?: string
}

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
   * the object store(s) to create
   */
  stores?: IDBMigrationObjectStore | IDBMigrationObjectStore[] | null
  store?: IDBMigrationObjectStore | null

  /**
   * the index(es) added to exists object store
   */
  index?: IDBMigrationIndex | null
  indexes?: IDBMigrationIndex[] | null
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
 * ], 1, 2, db, transaction)
 * @example
 * await upgrade([
 *   {
 *     version: 1,
 *     stores: [{
 *      name: 'books',
 *      keyPath: 'id',
 *      indexes: [{
 *        name: "title", keyPath: "title", unique: false
 *      }]
 *     }],
 *   },
 *   {
 *     version: 2,
 *     store: {
 *       name: 'books',
 *       index: {name: 'author', keyPath: 'author', unique: false}
 *     }
 *   }
 * ], 1, 2, db, transaction)
 */
export async function upgrade(
  mingrations: IDBMigrations,
  oldVersion: number,
  newVersion: number,
  db: IDBDatabase,
  transaction: IDBTransaction,
) {
  mingrations = sortMigrations(mingrations)
  for (let i = 0; i < mingrations.length; i++) {
    const migration = mingrations[i]
    if (migration.version > oldVersion && migration.version <= newVersion) {
      let stores = migration.stores || migration.store
      if (stores) {
        if (!Array.isArray(stores)) {
          stores = [stores]
        }
        for (const store of stores) {
          createObjectStore(store, db, transaction)
        }
      }

      let indexes = migration.indexes || migration.index
      if (indexes) {
        if (!Array.isArray(indexes)) {
          indexes = [indexes]
        }
        for (const index of indexes) {
          createIndex(index, db, transaction)
        }
      }

      migration.upgrade && (await migration.upgrade(db, transaction))
    }
  }
}

/**
 * Rolls back the database by executing the rollback functions of the applicable migrations.
 * Note: IndexedDB do not support rollback.
 * 
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
  transaction: IDBTransaction,
) {
  mingrations = sortMigrations(mingrations, true)
  for (let i = 0; i < mingrations.length; i++) {
    const migration = mingrations[i]
    if (migration.version > oldVersion && migration.version <= newVersion) {
      migration.rollback && (await migration.rollback(db, transaction))

      let stores = migration.stores || migration.store
      if (stores) {
        if (!Array.isArray(stores)) {
          stores = [stores]
        }
        for (const store of stores) {
          if (typeof store === 'string') {
            db.deleteObjectStore(store)
          } else if (store?.name) {
            db.deleteObjectStore(store.name)
          }
        }
      }

      let indexes = migration.indexes || migration.index
      if (indexes) {
        if (!Array.isArray(indexes)) {
          indexes = [indexes]
        }
        for (const index of indexes) {
          if (index.store) {
            if (db.objectStoreNames.contains(index.store)) {
              const objStore = transaction.objectStore(index.store)
              objStore.deleteIndex(index.name)
            }
          }
        }
      }
    }
  }
}

function createObjectStore(store: IDBMigrationObjectStore, db: IDBDatabase, transaction: IDBTransaction) {
  if (typeof store === 'string') {
    if (!db.objectStoreNames.contains(store)) {
      db.createObjectStore(store)
    }
  } else if (store?.name) {
    const name = store.name
    const objStore = db.objectStoreNames.contains(name)
      ? transaction.objectStore(name)
      : db.createObjectStore(name, store)
    let indexes = store.indexes || store.index
    if (indexes) {
      if (!Array.isArray(indexes)) {
        indexes = [indexes]
      }
      for (const index of indexes) {
        createIndex(index, db, transaction, objStore)
      }
    }
  }
}

function createIndex(
  index: IDBMigrationIndex,
  db: IDBDatabase,
  transaction: IDBTransaction,
  objStore?: IDBObjectStore
) {
  if (!objStore) {objStore = transaction.objectStore(index.store)}
  const ixName = index.name
  if (objStore.indexNames.contains(ixName)) {
    objStore.deleteIndex(ixName)
  }
  objStore.createIndex(ixName, index.keyPath, index)
}
