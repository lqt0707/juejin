/**
范畴论对于函数式编程最关键的影响，就在于“复合”，或者说在于“函数的组合”
 * 
 *  Functor、Monad、Semigroup 和 Monoid
 * 从数学定义的角度来说， Functor（函子） 是一种能够将一个范畴映射到另一个范畴的东西。
 * @param {*} x 
 * @returns 
 */
const Box = (x) => ({
  map: (f) => Box(f(x)),
  valueOf: () => x,
});


function add4(num) {
  return num + 4;
}

function multiply3(num) {
  return num * 3;
}

function divide2(num) {
  return num / 2;
}

const newBox = Box(10).map(add4);
// 输出 14
console.log(newBox.valueOf());

// 值为 21
const computeBox = Box(10)
                      .map(add4)
                      .map(multiply3)
                      .map(divide2)  
                      .valueOf()
console.log(computeBox);