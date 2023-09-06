const deleteNode = function (root, n) {
  // If the target node is not found, return directly
  if (!root) {
    return root;
  }
  // Locate the target node and start to process the delete action according to the situation
  if (root.val === n) {
    // If it is a leaf node, you don't need to think too much, just delete it directly
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // Find the node with the largest value in the left subtree
      const maxLeft = findMax(root.left);
      // Use this maxLeft to overwrite the current node that needs to be deleted
      root.val = maxLeft.val;
      // The overwriting action will consume the original maxLeft node
      root.left = deleteNode(root.left, maxLeft.val);
    } else {
      // Find the node with the smallest value in the right subtree
      const minRight = findMin(root.right);
      // Use this minRight to overwrite the current node that needs to be deleted
      root.val = minRight.val;
      // The overwriting action will consume the original minRight node
      root.right = deleteNode(root.right, minRight);
    }
  } else if (root.val > n) {
    // If the value of the current node is greater than n,
    // continue to search for the target node in the left subtree
    root.left = deleteNode(root.left, n);
  } else {
    // If the value of the current node is smaller than n, 
    // continue to search for the target node in the right subtree
    root.right = deleteNode(root.right, n);
  }
  return root
};

// Find the maximum value of the left subtree
function findMax(root) {
  while (root.right) {
    root = root.right;
  }
  return root;
}

// Find the minimum value of the right subtree
function findMin(root) {
  while (root.left) {
    root = root.left;
  }
  return root;
}
