/**
 * 
 * Immutability 实践的直接目的是什么？

简单来说，是为了解决数据内容变化与数据引用变化不同步的问题。
Immer.js 核心produce简单实现
 * @param {*} base 
 * @param {*} recipe 
 * @returns 
 */
function produce(base, recipe) {
  // 预定一个copy副本
  let copy;
  // 定义base对象的proxy handler
  const baseHandler = {
    set(obj, key, value) {
      // 先检查copy是否存在，如果不存在，创建copy
      if (!copy) {
        copy = { ...base };
      }
      // 如果copy存在，修改copy，而不是base
      copy[key] = value;
      return true;
    },
  };

  // 被proxy包装后的base记为draft
  const draft = new Proxy(base, baseHandler);
  // 将draft作为入参传入recipe
  recipe(draft);
  // 返回一个被“冻结”的 copy，如果 copy 不存在，表示没有执行写操作，返回 base 即可
  // “冻结”是为了避免意外的修改发生，进一步保证数据的纯度
  return Object.freeze(copy || base);
}

// 这是我的源对象
const baseObj = {
    a: 1,
    b: {
      name: "修言"
    }
  }
  
  // 这是一个执行写操作的 recipe
  const changeA = (draft) => {
    draft.a = 2
  }
  
  
  // 这是一个不执行写操作、只执行读操作的 recipe
  const doNothing = (draft) => {
    console.log("doNothing function is called, and draft is", draft)
  }
  
  // 借助 produce，对源对象应用写操作，修改源对象里的 a 属性
  const changedObjA = produce(baseObj, changeA)
  
  // 借助 produce，对源对象应用读操作
  const doNothingObj = produce(baseObj, doNothing)
  
  // 顺序输出3个对象，确认写操作确实生效了
  console.log(baseObj)
  console.log(changedObjA)
  console.log(doNothingObj)
  
  // 【源对象】 和 【借助 produce 对源对象执行过读操作后的对象】 还是同一个对象吗？
  // 答案为 true
  console.log(baseObj === doNothingObj)
  // 【源对象】 和 【借助 produce 对源对象执行过写操作后的对象】 还是同一个对象吗？
  // 答案为 false
  console.log(baseObj === changedObjA)
  // 源对象里没有被执行写操作的 b 属性，在 produce 执行前后是否会发生变化？
  // 输出为 true，说明不会发生变化
  console.log(baseObj.b === changedObjA.b)
  