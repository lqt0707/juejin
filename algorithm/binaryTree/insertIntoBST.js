const TreeNode = require("./TreeNode");

function insertIntoBST(root, n) {
  // If root is empty, it means that there is currently a slot that can be inserted
  if (!root) {
    // fill this slot with a node with value n
    root = new TreeNode(n);
    return root;
  }

  if (root.val > n) {
    // The data field of the current node is greater than n, search to the left
    root.left = insertIntoBST(root.left, n);
  } else {
    // The data field of the current node is less than n, search to the right
    root.right = insertIntoBST(root.right, n);
  }
}
