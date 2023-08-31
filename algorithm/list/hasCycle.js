/**
 * 给定一个链表，判断链表中是否有环。

示例 1：
输入：[3,2,0,4]（链表结构如下图） 输出：true
解释：链表中存在一个环 链表图片
 * @param {*} head 
 * @returns 
 */
const hasCycle = function (head) {
  // 只要结点存在，那么就继续遍历
  while (head) {
    // 如果flag已经立过，那么说明环存在
    if (head.flag) {
      return true;
    } else {
      //如果flag没立过，就立一个flag再往下走
      head.flag = true;
      head = head.next;
    }
  }
  return false;
};
