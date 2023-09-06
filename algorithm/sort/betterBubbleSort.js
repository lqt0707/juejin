/**
 * 冒泡排序
 * @param {*} arr 
 * @returns 
 */
const betterBubbleSort = function (arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    if (flag === false) {
      return arr;
    }
  }
  return arr;
};

console.log(betterBubbleSort([5, 3, 2, 4, 1]));
