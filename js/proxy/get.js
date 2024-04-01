// const origin = {
//   name: "MIKE",
// };

// const proxy = new Proxy(origin, {
//   get(target, prop, receiver) {
//     if ("string" === typeof prop && prop.startsWith("on")) {
//       if (/...not exist/) {
//         return function () {
//           console.warn(`${prop} does not exist.`);
//         };
//       }
//     }
//     return Reflect.get(target, prop, receiver);
//   },
// });

// console.log(proxy.onss);

// const origin = Object.create(Object.prototype, {
//   name: {
//     value: "Mike",
//     configurable: false,
//     writable: false,
//   },
// });

// const proxy = new Proxy(origin, {
//   get(target, prop, receiver) {
//     if (prop === "name") {
//       return "Kate";
//     }
//     return Reflect.get(target, prop, receiver);
//   },
// });

// console.log(proxy.name);

// const origin = Object.create(Object.prototype, {
//   name: {
//     set() {},
//     configurable: false,
//     writable: false,
//   },
// });

// const proxy = new Proxy(origin, {
//   get(target, prop, receiver) {
//     if (prop === "name") {
//       return "Kate";
//     }
//     return Reflect.get(target, prop, receiver);
//   },
// });

// console.log(proxy.name);

const originSet = new Set([1, 2]);

const proxySet = new Proxy(originSet, {
  get(target, p, receiver) {
    if (p === "delete") {
      return function (key) {
        if (key === 1) {
          return false;
        }
        return target.delete(key);
      };
    }
    return Reflect.get(target, p, receiver);
  },
});

proxySet.delete(1);
proxySet.delete(2);

console.log(originSet);
