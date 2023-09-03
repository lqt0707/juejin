/**
 * 如何用栈实现一个队列？
题目描述：使用栈实现队列的下列操作：
push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

示例: MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false

说明:

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
 */
const MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
};

MyQueue.prototype.pop = function () {
  // 加入stack2为空，需要将stack1的元素转移进来
  if (this.stack2.length <= 0) {
    // 当stack1不为空时，出栈
    while (this.stack1.length !== 0) {
      // 将stack1出栈元素推入stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 为了达到逆序的目的，我们只从stack2中出栈
  return this.stack2.pop();
};

MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    while (this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
};

MyQueue.prototype.empty = function () {
  return !this.stack1.length && !this.stack2.length;
};

let queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek()); // 返回 1
console.log(queue.pop()); // 返回 1
console.log(queue.empty()); // 返回 false
