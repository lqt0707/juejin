/**
 * @param {number[]} nums
 * @param {number} target
 */
const twoSum = function (nums, target) {
  // 这里使用对象模拟map的能力
  const diffs = {};
  // 缓存数组长度
  const len = nums.length;
  // 遍历数组
  for (let i = 0; i < len; i++) {
    // 判断当前值对应的target差值是否存在(是否已经遍历过)
    if (diffs[target - nums[i]] !== undefined) {
      // 若有差值，那么获得答案
      return [diffs[target - nums[i]], i];
    }
    // 若没有对应差值，则记录当前值
    diffs[nums[i]] = i;
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
