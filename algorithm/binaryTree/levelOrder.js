/**
 * 
 * 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

示例： 二叉树：[3,9,20,null,null,15,7],

  3
 / \
9  20
  /  \
 15   7
返回其层次遍历结果：
[
[3],
[9,20],
[15,7]
]
 * @param {*} root 
 */
const levelOrder = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const queue = [];
  // The first element of the queue is the root node
  queue.push(root);
  while (queue.length) {
    // level is used to store the nodes of the current layer
    const level = [];
    // Cache the queue length when it just entered the loop,
    // this step is critical, because the queue length will change later
    const len = queue.length;
    // Loop through the nodes of the current level
    for (let i = 0; i < len; i++) {
      // Get the head element of the queue
      const top = queue.shift();
      // Push the value of the header element into the level array
      level.push(top.val);
      // If the current node has a left child, push it to the next level
      if (top.left) {
        queue.push(top.left);
      }
      // If the current node has a right child, push it to the next level
      if (top.right) {
        queue.push(top.right);
      }
    }
    // Push the value of the level into result array
    res.push(level);
  }
  return res;
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

console.log(levelOrder(root));
