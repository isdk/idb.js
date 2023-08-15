// https://github.com/xuset/idb-kv-store/blob/master/index.js
// 这个搞复杂了,将页面通讯混在一起.内部结构也有不合理的地方.

// 定义键值对的类型
interface KeyValue { key: string; value: any }

class IdbKvStore {
  private dbName: string;
  private storeName: string;
  private version: number;
  private db: IDBDatabase | null;
  private transactions: IDBTransaction[] = [];

  constructor(dbName: string, storeName: string, version?: number) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.version = version || 0;
  }

  // 打开数据库
  public open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = (event) => {
        const err = (event.target as IDBOpenDBRequest).error;
        reject(err);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.db = db;
        resolve(db);
      };

      // 当创建一个新的数据库或者增加已存在的数据库的版本号
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // event.oldVersion
        // event.newVersion

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  // 关闭数据库
  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  // 开始一个事务
  public startTransaction(
    mode: IDBTransactionMode = "readonly"
  ): IDBTransaction {
    if (!this.db) {
      throw new Error("Database is not open");
    }

    const transaction = this.db.transaction(this.storeName, mode);
    this.transactions.push(transaction);

    transaction.onerror = () => {
      this.transactions = this.transactions.filter((t) => t !== transaction);
    };

    transaction.oncomplete = () => {
      this.transactions = this.transactions.filter((t) => t !== transaction);
    };

    return transaction;
  }

  // 存储一个键值对
  public put(keyValue: KeyValue, transaction?: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
      const t = transaction || this.startTransaction("readwrite");
      const store = t.objectStore(this.storeName);
      const request = store.put(keyValue.value, keyValue.key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to put value into store"));
      };
    });
  }

  // 获取指定键的值
  public get(key: string, transaction?: IDBTransaction): Promise<any> {
    return new Promise((resolve, reject) => {
      const t = transaction || this.startTransaction("readonly");
      const store = t.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        if (!transaction) {
          t.commit();
        }
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get value from store"));
      };
    });
  }

  // 删除指定键的值
  public delete(key: string, transaction?: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
      const t = transaction || this.startTransaction("readwrite");
      const store = t.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to delete value from store"));
      };
    });
  }
}

