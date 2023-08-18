const foldMap = (Monoid, arr) =>
  arr
    .map(Monoid)
    .reduce(
      (prevMonoid, currentMonoid) => prevMonoid.concat(currentMonoid),
      Monoid.empty()
    );

const Multi = (value) => ({
  value,
  concat: (box) => Multi(value * box.value),
});

Multi.empty = () => Multi(1);

const res = foldMap(Multi, [1, 2, 3, 4]);

console.log(res.value);

const compose = (func1, func2) => (arg) => func1(func2(arg));
