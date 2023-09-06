const TreeNode = require("./TreeNode");

const buildBinaryTree = (arr) => {
  const len = arr.length;
  if (len === 0) {
    return null;
  }

  const queue = [];
  const root = new TreeNode(arr[0]);
  queue.push(root);

  for (let i = 1; i < len; i += 2) {
    const currentNode = queue.shift() || { left: null, right: null, val: null };

    if (arr[i] !== null && arr[i] !== undefined) {
      const leftChild = new TreeNode(arr[i]);
      currentNode.left = leftChild;
      queue.push(leftChild);
    }

    if (i + 1 < len && arr[i + 1] !== null && arr[i + 1] !== undefined) {
      const rightChild = new TreeNode(arr[i + 1]);
      currentNode.right = rightChild;
      queue.push(rightChild);
    }
  }

  return root;
};

module.exports = buildBinaryTree