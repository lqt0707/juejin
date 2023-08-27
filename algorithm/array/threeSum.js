/**
 * 三数求和问题
双指针法能处理的问题多到你想不到。不信来瞅瞅两数求和它儿子——三数求和问题！
俗话说，青出于蓝而胜于蓝，三数求和虽然和两数求和只差了一个字，但是思路却完全不同。

真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]


 * @param {*} nums 
 * @returns 
 */
const threeSum = function (nums) {
  // 用于存放结果数组
  let res = [];
  // 给nums排序
  nums = nums.sort((a, b) => {
    return a - b;
  });

  // 缓存数组长度
  const len = nums.length;
  // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针j
    let j = i + 1;
    // 右指针k
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--;
        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        // 得到目标数组组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]]);
        // 左右指针一起前进
        j++;
        k--;
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
