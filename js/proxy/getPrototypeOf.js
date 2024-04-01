const origin = {
  name: "MIKE",
};

Object.preventExtensions(origin);

const proxy = new Proxy(origin, {
  getPrototypeOf() {
    return Number.prototype;
  },
});

console.log(proxy instanceof Number);

proxy instanceof Number;
