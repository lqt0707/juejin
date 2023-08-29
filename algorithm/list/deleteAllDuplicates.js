/**
 * 删除问题的延伸——dummy 结点登场
 * 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。

示例 1:
输入: 1->2->3->3->4->4->5
输出: 1->2->5
示例 2:
输入: 1->1->1->2->3
输出: 2->3
 */
const {ListNode} = require("./listUtils");

const deleteAllDuplicates = function (head) {
  // 极端情况 0或1个结点，都不会重复，直接返回
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode();
  // dummy永远指向头结点
  dummy.next = head;
  // cur从dummy开始遍历
  let cur = dummy;
  // 当cur的后面至少有两个节点时
  while (cur.next && cur.next.next) {
    // 对cur后面的两个节点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，则记下这个值
      let val = cur.next.val;
      // 反复的排查后面的元素是否存在多次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有，则删除
        cur.next = cur.next.next;
      }
    } else {
      // 若不重复，则正常遍历
      cur = cur.next;
    }
  }
  // 返回链表的起始结点
  return dummy.next;
};
const head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(3);
head1.next.next.next.next = new ListNode(4);
head1.next.next.next.next.next = new ListNode(4);
head1.next.next.next.next.next.next = new ListNode(5);

const head2 = new ListNode(1);
head2.next = new ListNode(1);
head2.next.next = new ListNode(1);
head2.next.next.next = new ListNode(2);
head2.next.next.next.next = new ListNode(3);

const result1 = deleteAllDuplicates(head1);
const result2 = deleteAllDuplicates(head2);

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