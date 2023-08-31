
const { ListNode } = require("./listUtils");
/**
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明: 1 ≤ m ≤ n ≤ 链表长度。

示例:
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
 * @param {*} head 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */
// 入参是头结点m、n
const reverseBetween = function (head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, cur, leftHead;
  const dummy = new ListNode();
  dummy.next = head;
  // p是一个游标，用于遍历，最终指向dummy
  let p = dummy;
  // p往前走m-1步，走到整个区间的前驱节点处
  for (let i = 0; i < m - 1; i++) {
    p = p.next;
  }
  // 缓存这个前驱结点到leftHead里
  leftHead = p;
  // start是反转区间的第一个结点
  let start = leftHead.next;
  // pre指向start
  pre = start;
  // cur只想start的下一个结点
  cur = pre.next;
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  // leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre;
  // 将区间内反转后的最后一个结点next指向cur
  start.next = cur;
  // dummy.next永远指向链表头结点
  return dummy.next;
};
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const m = 2;
const n = 4;

const result = reverseBetween(head, m, n);

// 打印反转后的链表
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

printList(result);