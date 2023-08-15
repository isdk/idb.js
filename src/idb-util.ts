export function reqGenEvent(req: IDBRequest, resolve, reject) {
  req.onsuccess = (event) => {
    resolve((event.target as any).result);
  };
  req.onerror = (event) => {
    event.preventDefault();
    event.stopPropagation();
    reject((event.target as any).error);
  };
}

export async function reqToPromise(req: IDBRequest) {
  return new Promise((resolve, reject) => {
    reqGenEvent(req, resolve, reject);
  });
}
