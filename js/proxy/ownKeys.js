// const origin = Object.create(Object.prototype, {
//   name: {
//     value: "Mike",
//     writable: false,
//     enumerable: true,
//     configurable: false,
//   },
//   age: {
//     value: 18,
//     writable: false,
//     enumerable: true,
//     configurable: true,
//   },
// });

// const proxy = new Proxy(origin, {
//   ownKeys() {
//     return ["age"];
//   },
// });

// console.log(Object.keys(proxy));

const origin = Object.create(Object.prototype, {
  name: {
    value: "Mike",
    writable: false,
    enumerable: true,
    configurable: true,
  },
});

Reflect.preventExtensions(origin);

const proxy = new Proxy(origin, {
  ownKeys() {
    return ["age"];
  },
});

console.log(Object.keys(proxy));
