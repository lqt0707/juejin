/**
 * 二叉树 中序遍历
 * @param {*} root
 * @returns
 */
// 所有遍历函数的入参都是树的根节点对象
function inorder(root) {
  // 递归边界，root为空
  if (!root) {
    return;
  }
  
  // 递归遍历左子树
  inorder(root.left);

  // 输出当前遍历的节点值
  console.log("输出当前遍历的节点值是：", root.val);

  // 递归遍历右子树
  inorder(root.right);
}
