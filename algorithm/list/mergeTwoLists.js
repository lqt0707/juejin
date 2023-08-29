/**
 * 链表的合并
真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 

示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
做链表处理类问题，大家要把握住一个中心思想——处理链表的本质，是处理链表结点之间的指针关系。
 *   
 */

const {ListNode} = require("./listUtils");

const mergeTwoLists = function (l1, l2) {
  // 定义头结点，确保链表可以被访问到
  let head = new ListNode(null);
  // cur这里就是那根针，用来串联node
  let cur = head;
  // 在l1和l2中串联
  while (l1 && l2) {
    // 如果l1的结点值较小
    if (l1.val < l2.val) {
      // 先串起l1的结点
      cur.next = l1;
      // l1指针向前一步
      l1 = l1.next;
    } else {
      // l2较小时，串起l2的结点
      cur.next = l2;
      // l2向前一步
      l2 = l2.next;
    }
    // 在串起一个结点后，也会往前一步
    cur = cur.next;
  }
  // 处理链表不等长的情况
  cur.next = l1 !== null ? l1 : l2;
  // 返回起始节点
  return head.next;
};


const l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4);

const l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);

const mergedList = mergeTwoLists(l1, l2);

// 打印新链表
let current = mergedList;
while (current !== null) {
  console.log(current.val);
  current = current.next;
}
