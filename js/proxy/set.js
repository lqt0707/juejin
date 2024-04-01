// const origin = {
//   name: "MIKE",
// };

// const proxy = new Proxy(origin, {
//   set(target, p, value) {
//     if ("name" === p) {
//       return false;
//     }
//     return Reflect.set(target, p, value);
//   },
// });

// proxy.name = "JACK";

// console.log(proxy.name);

// proxy.age = 18;

// console.log(proxy.age);

const origin = Object.create(Object.prototype, {
  name: {
    value: "MIKE",
    writable: false,
    configurable: false,
  },
});

const proxy = new Proxy(origin, {
  set(target, p, value) {
    if ("name" === p) {
      return true;
    }
    return Reflect.set(target, p, value);
  },
});

proxy.name = "MIKE";

proxy.name = "Kate";
