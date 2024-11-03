import { showErrorAlert } from "./alert.js";

class Database {
  constructor(databaseName, databaseVersion, tableNames) {
    this.db = null;
    const request = globalThis.window.indexedDB.open(
      databaseName,
      databaseVersion
    );
    request.onerror = (event) => {
      showErrorAlert(
        "Error al intentar ingresar a la base de datos. Guardar y cargar pueden no funcionar correctamente"
      );
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
    };
    request.onupgradeneeded = (event) => {
      this.db = event.target.result;
      for (let tableName of Object.values(tableNames)) {
        this.db.createObjectStore(tableName, { keyPath: "id" });
      }
    };
  }

  add(objectStoreName, object) {
    const transaction = this.db.transaction(objectStoreName, "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);
    objectStore.put(object);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = (event) => {
        resolve(object);
      };
      transaction.onerror = (event) => {
        reject(event.target.error?.message);
      };
    });
  }

  get(objectStoreName, key) {
    const transaction = this.db.transaction(objectStoreName);
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event.target.error?.message);
      };
    });
  }

  getAll(objectStoreName) {
    const transaction = this.db.transaction(objectStoreName);
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.error?.message);
      };
    });
  }

  delete(objectStoreName, key) {
    const transaction = this.db.transaction(objectStoreName, "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event.target.error?.message);
      };
    });
  }
}

export { Database };
