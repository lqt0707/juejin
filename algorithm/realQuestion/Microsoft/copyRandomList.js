/**
 * 复制带随机指针的链表
题目描述：给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。要求返回这个链表的 深拷贝。
我们用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
val：一个表示 Node.val 的整数。
random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。

示例1：



输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
示例2：



输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
示例3：



输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
示例4：

输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
命题关键字：数据结构、链表、哈希表
 */

function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = (head) => {
  // 处理边界条件
  if (!head) return null;
  // 初始化copy的头部结点
  let copyHead = new Node();
  // 初始化copy的游标结点
  let copyNode = copyHead;
  // 初始化hashMap
  const hashMap = new Map();
  let curr = head;
  // 首次循环，正常处理链表的复制
  while (curr) {
    copyNode.val = curr.val;
    copyNode.next = curr.next ? new Node() : null;
    hashMap.set(curr, copyNode);
    curr = curr.next;
    copyNode = copyNode.next;
  }
  // 将游标复位到head
  curr = head;
  // 将copy链表的游标也复位到copyHead
  copyNode = copyHead;
  // 再搞个循环，特殊处理random关系
  while (curr) {
    // 处理random的指向
    copyNode.random = curr.random ? hashMap.get(curr.random) : null;
    // copyNode 和 curr 两个游标一起前进
    copyNode = copyNode.next;
    curr = curr.next;
  }

  // 注意这里返回的是copyHead而不是head
  return copyHead;
};
