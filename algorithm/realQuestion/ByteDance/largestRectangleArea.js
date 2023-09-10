/**
import getTarget from '../../../react-hooks/hooks/utils/getTarget';
 * 柱状图中的最大矩形
题目描述：给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。

 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。

示例:
输入: [2,1,5,6,2,3]
输出: 10

命题关键字：数学问题、模拟、单调栈
 * @param {number[]} heights
 * @return {number}
 */
// const largestRectangleArea = function (heights) {
//   // 判断边界条件
//   if (!heights || !heights.length) return 0;
//   // 初始化最大值
//   let max = -1;
//   // 缓存柱子长度
//   const len = heights.length;
//   // 遍历每根柱子
//   for (let i = 0; i < len; i++) {
//     // 如果遍历完了所有柱子，或者遇到了比前一个矮的柱子，则停止遍历，开始回头计算
//     if (i == len - 1 || heights[i] > heights[i + 1]) {
//       // 初始化前i个柱子中最矮的柱子
//       let minHeight = heights[i];
//       // “回头看”
//       for (let j = i; j >= 0; j--) {
//         // 若遇到比当前柱子更矮的柱子，则以更矮的柱子为高进行计算
//         minHeight = Math.min(minHeight, heights[j]);
//         //  计算当前柱子对应的最大宽度的矩形面积，并及时更新最大值
//         max = Math.max(max, minHeight * (i - j + 1));
//       }
//     }
//   }
//   // 返回结果
//   return max;
// };

/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  // 判断边界条件
  if (!heights || !heights.length) return 0;
  // 初始化最大值
  let max = -1;
  // 初始化栈
  const stack = [];
  // 缓存柱子高度的数量
  const len = heights.length;
  // 开始遍历
  for (let i = 0; i < len; i++) {
    // 如果栈已经为空或当前柱子大于等于前一个柱子的高度
    if (!stack.length || heights[i] >= heights[stack[stack.length - 1]]) {
      // 执行入栈操作
      stack.push(i);
    } else {
      // 矩形的右边界
      let right = i;
      // pop出作为计算目标存在的那个柱子
      let target = stack.pop();
      // 处理柱子高度相等的特殊情况
      while (
        stack.length &&
        heights[target] === heights[stack[stack.length - 1]]
      ) {
        // 若柱子高度相等，则反复pop
        target = stack.pop();
      }
      // 矩形的左边界
      let left = !stack.length ? -1 : stack[stack.length - 1];
      // 左右边界定宽，柱子定高，计算矩形面积
      max = Math.max(max, (right - left - 1) * heights[target]);
      // 这一步保证下一次循环从当前柱子往下走（因为当前柱子还没作为计算目标计算出结果）
      i--;
    }
  }
  // rightAdd是我们针对右边界为空这种情况，补上的一个假的右边界
  let rightAdd = stack[stack.length - 1] + 1;
  // 此时栈里是高度单调递增（不减）的柱子索引，这些柱子还没有参与计算，需要针对它们计算一遍
  while (stack.length) {
    // 取出栈顶元素作为计算目标
    let target = stack.pop();
    // 找到左边界
    let left = !stack.length ? -1 : stack[stack.length - 1];
    // 注意这里的右边界一定是rightAdd，想一想，为什么？
    max = Math.max(max, (rightAdd - left - 1) * heights[target]);
  }
  // 返回计算出的最大值
  return max;
};

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
