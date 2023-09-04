/**
 * 
 * 题目描述：翻转一棵二叉树。

示例：
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9

输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
 * @param {*} root 
 * @returns 
 */
const invertTree = function (root) {
  // define recursion bounds
  if (!root) {
    return root;
  }
  // Recursively swap the child nodes of the right child
  let right = invertTree(root.right);
  // Recursively swap the child nodes of the left child
  let left = invertTree(root.left);
  // Exchange the two left and right child nodes currently traversed
  root.left = right;
  root.right = left;
  return root;
};
var root = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D",
      },
      right: {
        val: "E",
      },
    },
    right: {
      val: "C",
      right: {
        val: "F",
      },
    },
  };

  console.log(invertTree(root));