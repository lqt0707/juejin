const Sum = (value) => ({
  value,
  concat: (other) => Sum(value + other.value),
});

Sum.empty = Sum(0);

const foldMap = (f, list) =>
  list.map(f).reduce((acc, x) => acc.concat(x), f.empty);

const array = [1, 2, 3, 4, 5];

const sumArray = (arr) => foldMap(Sum, arr).value;

// 输出: 15
console.log(sumArray(array)) 
// 输出: 0
console.log(sumArray([]))