const { ListNode } = require("./listUtils");

const reverseList = function (head) {
  // 初始化前驱结点为null
  let pre = null;
  // 初始化目标节点为头结点
  let cur = head;
  // 只要目标节点不为null，遍历就得继续
  while (cur !== null) {
    // 记录一下next结点
    let next = cur.next;
    // 反转指针
    cur.next = pre;
    // pre往前走一步
    pre = cur;
    // cur往前走一步
    cur = next;
  }
  // 反转结束后，pre就会变成新链表的头结点
  return pre;
};
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const result = reverseList(head);

// 打印反转后的链表
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

printList(result);