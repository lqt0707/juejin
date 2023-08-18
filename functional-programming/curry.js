//  curry函数借助Function.length读取函数元素
function curry(func, arity = func.length) {
  // 定义一个递归式 generateCurried
  function generateCurried(prevArgs) {
    return function curried(nextArg) {
      const args = [...prevArgs, nextArg];
      // 如案参数大了，调用func
      if (args.length >= arity) {
        return func(...args);
      } else {
        // 否则，返回一个新的函数
        return generateCurried(args);
      }
    };
  }

  return generateCurried([]);
}
function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(3));
