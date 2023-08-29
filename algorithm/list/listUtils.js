function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 打印新链表
function printList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val);
    current = current.next;
  }
}

module.exports = { ListNode, printList };
