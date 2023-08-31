/**
 * 给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。

示例 1：
输入：head = [3,2,0,-4]（如下图） 输出：tail connects to node index 1 解释：链表中有一个环，其尾部连接到第二个结点。 链表成环1

示例 2：
输入：head = [1,2]（如下图）
输出：tail connects to node index 0
解释：链表中有一个环，其尾部连接到第一个结点。 链表成环2

示例 3：
输入：head = [1]（如下图）
输出：no cycle
解释：链表中没有环。
链表成环3
 * @param {*} head 
 * @returns 
 */
const detectCycle = function (head) {
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return null;
};
