function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    const lineIndex = partition(arr, left, right);
    if (left < lineIndex - 1) {
      quickSort(arr, left, lineIndex - 1);
    }
    if (lineIndex < right) {
      quickSort(arr, lineIndex, right);
    }
  }
  return arr;
}

function partition(arr, left, right) {
  let pivotValue = arr[Math.floor(left + (right - left) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i] < pivotValue) {
      i++;
    }

    while (arr[j] > pivotValue) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(quickSort([8, 7, 6, 5, 4, 3, 2, 1]));
