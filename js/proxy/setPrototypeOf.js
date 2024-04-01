const origin = {
  name: "MIKE",
};

Object.preventExtensions(origin);

const proxy = new Proxy(origin, {
  setPrototypeOf() {
    return true;
  },
});

console.log(Reflect.setPrototypeOf(proxy, Reflect.getPrototypeOf(origin)));

console.log(Reflect.setPrototypeOf(proxy, null));
