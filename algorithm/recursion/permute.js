/**
 * 
 * 
 15章
关键套路初相见：全排列问题 
题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。

  

示例：   
输入: [1,2,3]
输出: [
[1,2,3],
[1,3,2],
[2,1,3],
[2,3,1],
[3,1,2],
[3,2,1]
]
 * @param {*} nums 
 * @returns 
 */
const permute = function (nums) {
  const len = nums.length;
  // curr变量用来记录当前的排列内容
  const curr = [];
  // res用来记录所有的排列顺序
  const res = [];
  // visited 用来避免重复使用同一个数字
  const visited = {};
  // 定义dfs函数，入参是坑位的索引（从0开始计数）
  function dfs(nth) {
    // 若遍历到了不存在的坑位（第len+1个），则触碰递归边界返回
    if (nth === len) {
      // 此时前len个坑位已经填满，将对应的排列记录下来
      res.push(curr.slice());
      return;
    }
    // 检查手里剩下的数字有哪些
    for (let i = 0; i < len; i++) {
      // 若nums[i]之前没被其他的坑位用过，则可以理解为‘这个数字剩下了’
      if (!visited[nums[i]]) {
        // 给nums[i]打个已经用过的标
        visited[nums[i]] = 1;
        // 将nums[i]推入当前列
        curr.push(nums[i]);
        // 基于之歌排列继续往下一个坑位走去
        dfs(nth + 1);
        // nums[i]让出当前坑位
        curr.pop();
        // 下掉’已用过‘标识
        visited[nums[i]] = 0;
      }
    }
  }
  dfs(0);
  return res;
};

console.log(permute([1, 2, 3]));
