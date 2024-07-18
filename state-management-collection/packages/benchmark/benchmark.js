const b = require('benny')

b.suite(
  // 任务名称
  'Example',

  // 添加第一个用例
  b.add('Reduce two elements', () => {
    ;[1, 2].reduce((a, b) => a + b)
  }),

  // 添加第二个用例
  b.add('Reduce five elements', () => {
    ;[1, 2, 3, 4, 5].reduce((a, b) => a + b)
  }),

  // 添加第三个用例
  b.add('Reduce ten elements', () => {
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((a, b) => a + b)
  }),

  // 可以传入一个函数，会在每个用例执行完后运行
  b.cycle(),
  // 可以传入一个函数，会在整个任务执行完后运行
  b.complete(),
  // 保持测试结果，如果没有传入format会保存为json格式
  b.save({ file: 'reduce', version: '1.0.0' }),
  b.save({ file: 'reduce', format: 'chart.html' }),
)
