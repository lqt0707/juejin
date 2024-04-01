const origin = {
  name: "MIKE",
};

const proxy = new Proxy(origin, {
  isExtensible() {
    return true;
  },
  preventExtensions() {
    return true;
  },
});

console.log(Reflect.preventExtensions(proxy));
