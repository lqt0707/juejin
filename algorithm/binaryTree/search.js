/**
 * 查找数据域为某一特定值的结点
 * @param {*} root 
 * @param {*} n 
 * @returns 
 */
function search(root, n) {
  // If root is empty, the search fails and returns directly
  if (!root) {
    return;
  }
  // Find the target node and output the node object
  if (root.val === n) {
    console.log("目标节点是：", root);
  } else if (root.val > n) {
    // The data field of the current node is greater than n, search to the left
    search(root.left, n);
  } else {
    // The data field of the current node is less than n, search to the right
    search(root.right, n);
  }
}
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

console.log(search(root, "C"));
