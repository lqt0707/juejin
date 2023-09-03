// const maxSlidingWindow = function (nums, k) {
//   const len = nums.length;
//   const res = [];
//   let left = 0;
//   let right = k - 1;
//   while (right < len) {
//     const max = calMax(nums, left, right);
//     res.push(max);
//     left++;
//     right++;
//   }
//   return res;
// };

// function calMax(arr, left, right) {
//   if (!arr || !arr.length) {
//     return;
//   }

//   let maxNum = arr[left];
//   for (let i = left; i <= right; i++) {
//     if (arr[i] > maxNum) {
//       maxNum = arr[i];
//     }
//   }
//   return maxNum;
// }

const maxSlidingWindow = function (nums, k) {
  const len = nums.length;
  const res = [];
  const deque = [];
  for (let i = 0; i < len; i++) {
    // 当队尾元素小于当前元素
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      // 将队尾（索引）不断出队，直至队尾元素大于等于当前元素
      deque.pop();
    }

    // 入队是当前元素索引
    deque.push(i);
    // 当前队头元素的索引已经被排除在滑动窗口之外时
    while (deque.length && deque[0] <= i - k) {
      // 将队头索引出队
      deque.shift();
    }
    // 判断滑动窗口的状态,只有在被遍历的元素个数大于k的时候，才更新数组
    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }
  return res; 
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
