const { ListNode, printList } = require("./listUtils");

/**
 * 
 * 快慢指针——删除链表的倒数第 N 个结点
真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个结点后，链表变为 1->2->3->5.
说明： 给定的 n 保证是有效的。
 */
const removeNthFromEnd = function (head, n) {
  // 初始化dummy节点
  const dummy = new ListNode();
  // dummy指向头结点
  dummy.next = head;
  // 初始化快慢指针，均指向dummy
  let fast = dummy;
  let slow = dummy;
  // 快指针先走n步
  while (n !== 0) {
    fast = fast.next;
    n--;
  }
  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  // 慢指针删除自己的后继结点
  slow.next = slow.next.next;
  // 返回头结点
  return dummy.next;
};

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const n = 2;

const result = removeNthFromEnd(head, n);

printList(result);
