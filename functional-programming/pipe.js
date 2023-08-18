function pipe(...funcs) {
  function callback(input, func) {
    return func(input);
  }
  return function (params) {
    return funcs.reduce(callback, params);
  };
}
