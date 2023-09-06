const TreeNode = require("./TreeNode");
const buildBinaryTree = require("./buildBinaryTree");

/**
 * 
 * 平衡二叉树的构造
题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是平衡的。
如果有多种构造方法，请你返回任意一种。

示例：

 

输入：root = [1,null,2,null,3,null,4,null,null]
输出：[2,1,3,null,null,null,4]
解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。
提示：
树节点的数目在 1 到 10^4 之间。 树节点的值互不相同，且在 1 到 10^5 之间。


 * @param {*} root 
 * @returns 
 */
const balanceBST = function (root) {
  // Initialize in-order traversal sequence array
  const nums = [];
  // Define inorder to traverse the binary tree to get an ordered array
  function inorder(root) {
    if (!root) {
      return;
    }
    inorder(root.left);
    nums.push(root.val);
    inorder(root.right);
  }

  function buildAVL(low, high) {
    // If low > high, it is out of bounds,
    // indicating that the subtree corresponding to the current index range has been constructed
    if (low > high) {
      return null;
    }
    // Take the middle value of the array as the root node value
    const mid = Math.floor(low + (high - low) / 2);
    // Create the root node of the current tree
    const cur = new TreeNode(nums[mid]);
    // build left subtree
    cur.left = buildAVL(low, mid - 1);
    // build right subtree
    cur.right = buildAVL(mid + 1, high);
    // return the root node of the current tree
    return cur;
  }
  // Call the inorder traversal method to find nums
  inorder(root);
  // Based on nums, construct a balanced binary tree
  return buildAVL(0, nums.length - 1);
};

const root = [1,null,2,null,3,null,4,null,null]
console.log(balanceBST(buildBinaryTree(root)));