/**
 * 
 * 15
 * 限定组合问题：及时回溯，即为“剪枝”  
题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例: 输入: n = 4, k = 2
输出:
[
[2,4],
[3,4],
[2,3],
[1,2],
[1,3],
[1,4],
]



 * @param {*} n 
 * @param {*} k 
 * @returns 
 */
const combine = function (n, k) {
  const res = [];
  const subset = [];
  dfs(1);
  function dfs(index) {
    if (subset.length === k) {
      res.push(subset.slice());
      return;
    }
    // 从当前数字的值开始，遍历index+n之间的所有数字
    for (let i = index; i <= n; i++) {
      subset.push(i);
      dfs(i + 1);
      subset.pop();
    }
  }
  return res;
};

console.log(combine(4,2));
