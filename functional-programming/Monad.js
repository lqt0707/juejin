const Monad = (x) => ({
  map: (f) => Monad(f(x)),
  valueOf: () => x,
  inspect: () => `Monad(${x})`,
  // 新增一个主动打开盒子的方法flatMap
  flatMap: (f) => f(x),
});

// class Monad {
//   constructor(x) {
//     this.val = x;
//   }

//   map(f) {
//     return Monad.of(f(this.val));
//   }

//   // 解决嵌套盒子拿不出值的问题
//   flatMap(f) {
//     return this.map(f).valueOf();
//   }

//   valueOf() {
//     return this.val;
//   }
// }

// Monad.of = function (val) {
//   return new Monad(val);
// };

// const monad = Monad.of(1);
// const nestedMonad = Monad.of(monad);

// // 输出 Monad {val: 1}，符合“不嵌套”的预期
// console.log(nestedMonad.flatMap((x) => x));
