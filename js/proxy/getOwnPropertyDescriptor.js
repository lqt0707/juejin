const origin = Object.create(Object.prototype, {
  name: {
    value: "Mike",
    writable: true,
    enumerable: true,
    configurable: false,
  },
});

Reflect.preventExtensions(origin);

const proxy = new Proxy(origin, {
  getOwnPropertyDescriptor(target, p) {
    if ("name" === p) {
      return {
        value: "Mike",
        writable: false,
        enumerable: true,
        configurable: false,
      };
    }
    return Reflect.getOwnPropertyDescriptor(target, p);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, "name"));
