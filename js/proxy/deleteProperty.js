const origin = Object.create(Object.prototype, {
  name: {
    value: "Mike",
    configurable: true,
    writable: false,
    enumerable: true,
  },
});

Reflect.preventExtensions(origin);

const proxy = new Proxy(origin, {
  deleteProperty(target, p, receiver) {
    if ("name" === p) {
      return true;
    }
    return Reflect.set(target, p, receiver);
  },
});

delete proxy.name;

console.log(proxy.hasOwnProperty("name"));
