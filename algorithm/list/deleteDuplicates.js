const {ListNode} = require("./listUtils");

/**
 *
 链表结点的删除
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:
输入: 1->1->2
输出: 1->2
示例 2:
输入: 1->1->2->3->3
输出: 1->2->3
 */
const deleteDuplicates = function (head) {
  // 设定cur指针，初始位置为链表的第一个结点
  let cur = head;
  // 遍历链表
  while (cur != null && cur.next != null) {
    // 若当前节点和它后面的一个节点值相等（重复）
    if (cur.val === cur.next.val) {
      // 删除靠后的那个节点（去重）
      cur.next = cur.next.next;
    } else {
      // 若不重复，继续遍历
      cur = cur.next;
    }
  }
  return head;
};



const head1 = new ListNode(1);
head1.next = new ListNode(1);
head1.next.next = new ListNode(2);

const head2 = new ListNode(1);
head2.next = new ListNode(1);
head2.next.next = new ListNode(2);
head2.next.next.next = new ListNode(3);
head2.next.next.next.next = new ListNode(3);

const result1 = deleteDuplicates(head1);
const result2 = deleteDuplicates(head2);

// 打印新链表
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

console.log("示例 1:");
printList(result1);

console.log("示例 2:");
printList(result2);
