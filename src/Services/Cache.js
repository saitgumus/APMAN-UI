const LRU = require("lru-cache");

export default class Cache {
  static lru = new LRU({ max: 100, maxAge: 1000 * 60 * 60 * 24 });

  static getParameter = (paramType) => {
    let key = "prm_" + paramType;
    if (Cache.lru.has(key)) {
      return Cache.lru.get(key);
    } else {
      return undefined;
    }
  };

  static setParameter(paramType, value) {
    let key = "prm_" + paramType;
    if (!Cache.lru.has(key)) {
      return Cache.lru.set(key, value);
    } else {
      return 0;
    }
  }
}
