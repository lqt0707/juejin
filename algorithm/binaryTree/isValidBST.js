/**
 * 二叉搜索树的验证
题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
假设一个二叉搜索树具有如下特征：
节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例 1:
输入:

    2
   / \
  1   3

输出: true

示例 2:
输入:

    5
   / \
  1   4
     / \
    3   6

输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
根节点的值为 5 ，但是其右子节点值为 4 。
 * @param {*} root 
 * @returns 
 */
const isValidBST = function (root) {
  // define recursive function
  function dfs(root, minValue, maxValue) {
    // If it is an empty tree, it is legal
    if (!root) {
      return true;
    }
    // If the right child is not greater than the value of the root node,
    // or the left child is not less than the value of the root node, it is illegal
    if (root.val <= minValue || root.val >= maxValue) {
      return false;
    }
    // The left and right subtrees must all conform to the data
    // field size relationship of the binary search tree
    return (
      dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    );
  }
  // Initialize the minimum and maximum values to be very small or very large
  return dfs(root, -Infinity, Infinity);
};
