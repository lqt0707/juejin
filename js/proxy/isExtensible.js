const origin = {
  name: "MIKE",
};

const proxy = new Proxy(origin, {
  isExtensible(target) {
    return false;
  },
});

console.log(Object.isExtensible(proxy));

proxy.age = 16;

console.log(proxy.age);
