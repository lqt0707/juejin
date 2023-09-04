const preorderTraversal = function (root) {
  const res = [];
  // Dealing with boundary conditions
  if (!root) {
    return res;
  }
  const stack = [];
  stack.push(root);
  // If the stack is not empty, repeat the pop and push operations.
  while (stack.length) {
    // Record the top node of the stack as the current node
    const cur = stack.pop();
    // The current node is the root node of the current subtree,
    //  put this node at the end of the result array
    res.push(cur.val);
    // If the root node of the current subtree has a right child,
    // push the right child into the stack
    if (cur.right) {
      stack.push(cur.right);
    }
    // If the current subtree root node has a left child,
    // push the left child onto the stack
    if (cur.left) {
      stack.push(cur.left);
    }
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

console.log(preorderTraversal(root));
