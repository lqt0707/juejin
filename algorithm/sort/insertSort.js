// 插入排序
function insertSort(arr) {
  const len = arr.length;
    // 用来存放比较的元素
  let temp;
  for (let i = 1; i < len; i++) {
    temp = arr[i];
    let j = i;
    // 如果前面的比现在的数大,把大的放在当前的位置，前面留一个位置用来放当前的数
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

console.log(insertSort([5, 3, 2, 4, 1]));