/**
 * Repeated upward comparison + exchange
 * @param {*} low 
 * @param {*} high 
 */

// The input parameter is the index range of the heap element in the array,
// low means the lower bound, and high means the upper bound
function upHeap(low, high) {
    // Initialize i (the current node index) as the upper bound
  let i = high;
  // Initialize j as the parent node of i
  let j = Math.floor((i - 1) / 2);
  const heap = [9, 8, 6, 3, 1];
// When j does not exceed the lower bound, repeat the process of upward comparison + exchange
  while (j >= low) {
    // If the current node is bigger than the parent node
    if (heap[j] < heap[i]) {
        // Swap the current node with the parent node, keeping the parent node the larger one
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      // i is updated to the position of the exchanged parent node
      i = j;
      // j is updated as the parent node of the parent node
      j = Math.floor((i - 1) / 2);
    } else {
      break;
    }
  }
}

module.exports = upHeap