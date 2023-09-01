// const MinStack = function () {
//   this.stack = [];
// };

// MinStack.prototype.push = function (x) {
//   this.stack.push(x);
// };

// MinStack.prototype.pop = function () {
//   this.stack.pop();
// };

// MinStack.prototype.top = function () {
//   if (!this.stack || !this.stack.length) {
//     return;
//   }
//   return this.stack[this.stack.length - 1];
// };

// MinStack.prototype.getMin = function () {
//   let minValue = Infinity;
//   const { stack } = this;
//   for (let i = 0; i < stack.length; i++) {
//     if (stack[i] < minValue) {
//       minValue = stack[i];
//     }
//   }
//   return minValue;
// };

const MinStack = function () {
  this.stack = [];
  this.stack2 = [];
};

MinStack.prototype.push = function (x) {
  this.stack.push(x);
  // 若入栈的值小于当前最小的值，则推入辅助栈栈顶
  if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
};

MinStack.prototype.pop = function () {
  // 若出栈的值和当前最小的值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
  this.stack.pop();
};
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.stack2[this.stack2.length - 1];
};
let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();
minStack.pop();
minStack.top();

console.log(minStack.getMin());
