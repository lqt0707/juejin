function betterThrottle(fn, delay) {
  let last = 0,
    timer = null;
  return function () {
    let now = Date.now();
    if (now - last < delay) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    } else {
      last = now;
      fn.apply(this, arguments);
    }
  };
}
