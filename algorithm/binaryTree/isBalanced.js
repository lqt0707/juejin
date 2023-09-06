/**
 * 16
 * 平衡二叉树的判定
题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树。
本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1: 给定二叉树 [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7

返回 true 。

示例 2: 给定二叉树 [1,2,2,3,3,null,null,4,4]

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4

返回 false 。
 * @param {*} root 
 * @returns 
 */
const isBalanced = function (root) {
    // Set up a flag, as long as there is an absolute value of height difference greater than 1,
    // the flag will be set to false
  let flag = true;
  // define recursive logic
  function dfs(root) {
    // If it is an empty tree, the height is recorded as 0;
    // if the flag is already false, then there is no need to go down, just return
    if (!root || !flag) {
      return 0;
    }
    // Calculate the height of the left subtree
    const left = dfs(root.left);
    // Calculate the height of the right subtree
    const right = dfs(root.right);
    // If the absolute value of the height difference between the left and right subtrees 
    // is greater than 1, the flag will fail
    if (Math.abs(left - right) > 1) {
      flag = false;
      // It doesn't matter what happens later,
      // return a value that does not affect the backtracking calculation
      return 0;
    }
    // return the height of the current subtree
    return Math.max(left, right) + 1;
  }
  // recursive entry
  dfs(root);
  // Return the value of the flag
  return flag;
};
