const Identity = (x) => ({
  map: (f) => Identity(f(x)),
  valueOf: () => x,
  inspect: () => `Identity(${x})`,
});

/**
 * Maybe Functor：识别空数据
 * @param {*} x
 * @returns
 */
const isEmpty = (x) => x === null || x === undefined;
const Maybe = (x) => ({
  map: (f) => (isEmpty(x) ? Maybe(null) : Maybe(f(x))),
  valueOf: () => x,
  inspect: () => `Maybe(${x})`,
});
function add4(x) {
  return x + 4;
}

function add8(x) {
  x + 8;
}

function toString(x) {
  return x.toString();
}

function addX(x) {
  return x + "X";
}

function add10(x) {
  return x + "10";
}

const res = Maybe(10).map(add4).map(add8).map(toString).map(addX).inspect();

// 输出 Maybe {null}
console.log(res);
