function debounce(fn, delay) {
  // 定时器
  let timer = null;
  return function () {
    // 每次时间重新触发，清除定时器
    if (timer) clearTimeout(timer);
    // 设立新计时器
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
