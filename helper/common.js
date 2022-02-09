function deepClone(obj = new Object(), map = new WeakMap()) {
  if (obj == null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (map.has(obj)) return map.get(obj);

  let o = new obj.constructor();
  map.set(obj, o);

  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      o[k] = deepClone(obj[k], map);
    }
  }
  return o;
}

window.deepClone = deepClone;
