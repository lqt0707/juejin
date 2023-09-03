const MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

MyQueue.prototype.push = function () {
  this.stack1.push();
};

MyQueue.prototype.pop=function () {
    // 加入stack2为空，需要将stack1的元素转移进来
}
