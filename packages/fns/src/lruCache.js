class LRUCache {
  constructor(capacity = 1000) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  set(key, val) {
    if (this.cache.size >= this.capacity) {
      this.cache.delete(this.first());
    }
    this.cache.delete(key);
    this.cache.set(key, val);
  }

  has(key) {
    return this.cache.has(key);
  }

  first() {
    return this.cache.keys().next().value;
  }
}

export default LRUCache;
