class Store {
  constructor(keyPrefix, storage) {
    this._keyPrefix = keyPrefix;
    this._storage = storage;
    this._storeKey = null;
  }

  setStoreKey(key) {
    this._storeKey = `${this._keyPrefix}_${key}`;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getItem(key) {
    try {
      const data = JSON.parse(this._storage.getItem(this._storeKey)) || {};
      return data[key];
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
      this._storeKey,
      JSON.stringify(items),
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value,
        }),
      ),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}

export default Store;
