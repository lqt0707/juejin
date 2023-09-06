// const findKthLargest = function (nums, k) {
//   const sorted = nums.sorted((a, b) => {
//     return b - a;
//   });
//   return sorted[k - 1];
// };

/**
 * 堆结构在排序中的应用——优先队列
在认识优先队列之前，我们先来看一道题：

题目描述：在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2: 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4

说明:
你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。


 * @param {*} nums 
 * @param {*} k 
 */
const findKthLargest = function (nums, k) {
  const heap = [];
  let n = 0;
  const len = nums.length;
  function createHeap() {
    for (let i = 0; i < k; i++) {
      insert(nums[i]);
    }
  }

  function updateHeap() {
    for (let i = k; i < len; i++) {
      if (nums[i] > heap[0]) {
        heap[0] = nums[i];
        downHeap(0, k);
      }
    }
  }

  function insert(x) {
    heap[n] = x;
    upHeap(0, n);
    n++;
  }

  function downHeap(low, high) {
    let i = low,
      j = i * 2 + 1;
    while (j <= high) {
        // If the right child is smaller than the left child,
        // use the right child to compare with the root node
      if (j + 1 <= high && heap[j + 1] < heap[j]) {
        j = j + 1;
      }
      // If the current node is larger than the child node,
      // exchange the positions of the two, and "arch up" the smaller node
      if (heap[i] > heap[j]) {
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
        i = j;
        j = j * 2 + 1;
      } else {
        break;
      }
    }
  }

  function upHeap(low, high) {
    let i = high;
    let j = Math.floor((i - 1) / 2);
    while (j >= low) {
        // If the current node is smaller than the parent node
      if (heap[j] > heap[i]) {
        // Swap the current node with the parent node, keeping the parent node the smaller one
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
        i = j;
        j = Math.floor((i - 1) / 2);
      } else {
        break;
      }
    }
  }

  createHeap();
  updateHeap();

  return heap[0];
};
