const inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let cur = root;
  // When cur is not empty or stack is not empty, repeat the following logic
  while (cur || stack.length) {
    //The function of this while is to record all the nodes
    // in the path during the process of finding the leftmost leaf node.
    while (cur) {
      // Push the node of the path onto the stack
      stack.push(cur);
      //Continue to search for the left child of the current node
      cur = cur.left;
    }
    // remove the top element of the stack
    cur = stack.pop();
    // Push the top element of the stack onto the stack
    res.push(cur.val);
    //Try to read the right child of the cur node
    cur = cur.right;
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

console.log(inorderTraversal(root));
