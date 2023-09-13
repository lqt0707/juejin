/**
 * “粉刷房子”问题
题目描述: 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的矩阵来表示的。
例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。请你计算出粉刷完所有房子最少的花费成本。

注意： 所有花费均为正整数。

示例： 输入: [[17,2,17],[16,16,5],[14,3,19]]
输出: 10
解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
最少花费: 2 + 5 + 3 = 10。

命题关键字：动态规划、滚动数组
 * @param {*} costs 
 * @returns 
 */
/**
 * @param {number[][]} costs
 * @return {number}
 */
const minCost = function (costs) {
  // 处理边界情况
  if (!costs || !costs.length) return 0;
  // 缓存房子的个数
  const len = costs.length;
  // 开始更新状态
  for (let i = 1; i < len; i++) {
    // now表示粉刷到当前房子时对应的价格状态
    const now = costs[i];
    // prev表示粉刷到上一个房子时的价格状态
    const prev = costs[i - 1];
    // 更新当前状态下，刷三种油漆对应的三种最优价格
    now[0] += Math.min(prev[1], prev[2]);
    now[1] += Math.min(prev[0], prev[2]);
    now[2] += Math.min(prev[1], prev[0]);
  }
  // 返回粉刷到最后一个房子时，总价格的最小值
  return Math.min(costs[len - 1][0], costs[len - 1][1], costs[len - 1][2]);
};

console.log(minCost([
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19],
]));
