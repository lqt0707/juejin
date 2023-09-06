/**
 * Repeated downward comparison + exchange
 * @param {*} low
 * @param {*} high
 */
// The input parameter is the index range of the heap element in the array,
// low means the lower bound, and high means the upper bound
function downHeap(low, high) {
  // Initialize i as the current node, j as the left child of the current node
  let i = low,
    j = i * 2 + 1;
  const heap = [9, 8, 6, 3, 1];
  // When j does not exceed the upper bound, repeat the downward comparison + exchange operation
  while (j <= high) {
    // If the right child is bigger than the left child,
    // use the right child to compare with the root node
    if (j + 1 <= high && heap[j + 1] > heap[j]) {
      j = j + 1;
    }
    // If the current node is smaller than the child node,
    // exchange the positions of the two, and "arch up" the larger node
    if (heap[i] < heap[j]) {
      // swap positions
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      // i is updated with the index of the child node being swapped
      i = j;
      // j is updated to be the index of the left child of the child node
      j = j * 2 + 1;
    } else {
      break;
    }
  }
}

module.exports = downHeap;
