const TreeNode = require("./TreeNode");

/**
 * 将排序数组转化为二叉搜索树
题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例: 给定有序数组: [-10,-3,0,5,9],
一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
 * @param {*} nums 
 * @returns 
 */
const sortedArrayToBST = function (nums) {
  // handle boundary conditions
  if (!nums.length) {
    return null;
  }
  // The root node is the result of recursively "lifting" the array
  const root = buildBST(0, nums.length - 1);
  // Define the binary tree construction function,
  // the input parameter is the index range of the subsequence
  function buildBST(low, high) {
    // When low > high,
    // it means that the current range of numbers has been recursively processed completely
    if (low > high) {
      return null;
    }
    // Divide into two, take out the middle element of the current subsequence
    const mid = Math.floor(low + (high - low) / 2);
    // Use the value of the middle element as the root node value of the current subtree
    const cur = new TreeNode(nums[mid]);
    // Recursively construct the left subtree, the range is divided into [low, mid)
    cur.left = buildBST(low, mid - 1);
    // Recursively construct the right subtree, the range is divided into [mid,high]
    cur.right = buildBST(mid + 1, high);
    // return current node
    return cur;
  }
  // return root node
  return root;
};
