/**
 * Map 的妙用——两数求和问题
 * 
 * 
 * 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例: 给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 * 
 * 几乎所有的求和问题，都可以转化为求差问题。
 * 
 * 我们可以在遍历数组的过程中，增加一个 Map 来记录已经遍历过的数字及其对应的索引值。
 * 然后每遍历到一个新数字的时候，都回到 Map 里去查询 targetNum 与该数的差值是否已经在前面的数字中出现过了。
 * 若出现过，那么答案已然显现，我们就不必再往下走了。
 * @param {number[]} nums
 * @param {number} target
 */
const twoSum = function (nums, target) {
  //   // 这里使用对象模拟map的能力
  //   const diffs = {};
  //   // 缓存数组长度
  //   const len = nums.length;
  //   // 遍历数组
  //   for (let i = 0; i < len; i++) {
  //     // 判断当前值对应的target差值是否存在(是否已经遍历过)
  //     if (diffs[target - nums[i]] !== undefined) {
  //       // 若有差值，那么获得答案
  //       return [diffs[target - nums[i]], i];
  //     }
  //     // 若没有对应差值，则记录当前值
  //     diffs[nums[i]] = i;
  //   }

  const diffs = new Map();

  // 缓存数组长度
  const len = nums.length;
  // 遍历数组
  for (let i = 0; i < len; i++) {
    // 判断当前值对应的target差值是否存在(是否已经遍历过)
    if (diffs.has(target - nums[i])) {
      // 若有差值，那么获得答案
      return [diffs.get(target - nums[i]), i];
    }
    // 若没有对应差值，则记录当前值
    diffs.set(nums[i], i);
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
