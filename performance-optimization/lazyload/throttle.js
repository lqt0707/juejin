// fn使我们需要包装的回调函数，interval是时间间隔的值
function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0;

  // 将throttle处理结果当做函数返回
  return function () {
    // 记录本次回调触发的时间
    let now = +new Date();

    //判断上次触发时间和本次触发时间差是否校服时间间隔的阈值
    if (now - last >= interval) {
      // 如果大于，则执行回调
      last = now;
      fn.apply(this, arguments);
    }
  };
}
