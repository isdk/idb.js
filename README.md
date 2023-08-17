# Simple IndexedDB Wrapper  

This is a TypeScript/JavaScript wrapper library for IndexedDB, providing a simplified and convenient API for working with IndexedDB databases.

## Features  

- Easy-to-use methods for performing common IndexedDB operations, such as adding, retrieving, updating, and deleting data. 
- Support for creating and deleting indexes to enhance data querying and retrieval. 
- Abstraction of transactions and object stores, simplifying the management of database transactions. 
- Promisified methods for asynchronous operations, allowing for better control flow and error handling. 
- Migrations support for managing database schema changes.

## Getting Started  

### Installation  

You can install the library via npm:

```bash 
npm install @isdk/idb
```

### Usage

To use the IndexedDB wrapper in your project, import the necessary classes and functions:



```js
import { IndexedDBDatabase, IndexedDBIndex, IndexedDBStore, IndexedDBTransaction } from  '@isdk/idb'; 
```

Create an instance of IndexedDBDatabase to interact with a database and manage migrations:

```js
const database = new IndexedDBDatabase();
// Open the database
await database.open(dbName, version, migrations);

```

The `dbName` parameter is the name of the database, `version` is the desired version of the database, and `migrations` is an array of migration objects.

Migration using callback functions

```js
const migrations = [
  {
    version: 1,
    upgrade(db, transaction) {
      const objectStore = db.createObjectStore('books', { keyPath: 'id' });
      objectStore.createIndex('title', 'title', { unique: false });
    },
    rollback(db, transaction) {
      db.deleteObjectStore('books');
    }
  },
  {
    version: 2,
    upgrade(db, transaction) {
      const objectStore = transaction.objectStore('books');
      objectStore.createIndex('author', 'author', { unique: false });
    },
    rollback(db, transaction) {
      const objectStore = transaction.objectStore('books');
      objectStore.deleteIndex('author');
    }
  }
];
```

Migration using `stores`

```js
const migrations = [
  { 
    version: 1, 
    stores: [
      {
        name: 'books', keyPath: 'id', 
        indexes: [
          {name: 'title', keyPath: 'title', options: {unique: false}}
        ] 
      }
    ],
  },
  {
    version: 2, 
    // add indexes to exists store
    indexes: [
      {
        store: 'books',
        name: 'ixCategory',
        keyPath: 'category', options: {unique: false}
      }
    ]
  }
];
```

Mixed migration using both callback functions and stores

```js
const migrations = [
  {
    version: 1,
    stores: 'books',
    upgrade: (db, transaction) => transaction.objectStore('books').createIndex('title', 'title', { unique: false })
  }
];
```

Perform operations on the database using the provided methods:


```js
const database = new IndexedDBDatabase();

// Open the database
await database.open(dbName, version, migrations);

// get an object store
const store = database.getObjectStore(storeName);

// Perform operations on the object store
await store.add(key, value);
const data = await store.get(key);
await store.set(key, updatedValue);
await store.remove(key);
```

For more detailed examples and usage instructions, please refer to the API documentation section.

## API Documentation

Detailed API documentation and examples can be found in the docs folder.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

