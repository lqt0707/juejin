/**
 * 栈问题进阶-每日温度问题
题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 * @param {*} T 
 * @returns 
 */
const dailyTemperatures = function name(T) {
  const len = T.length;
  const stack = [];
  const res = new Array(len).fill(0); //初始化数组，注意数组定长，站位为0
  for (let i = 0; i < len; i++) {
    // 若栈不为0，且存在打破递减趋势的温度值
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      // 将栈顶温度值对应的索引出栈
      const top = stack.pop() || 0;
      // 计算当前栈顶温度与第一个高于它的温度值的索引值，遍历的多少次
      res[top] = i - top;
    }
    // 存索引值
    stack.push(i);
  }
  return res;
};

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));