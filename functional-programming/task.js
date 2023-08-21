//  Task Monad 构造函数
const Task = (run) => ({
  run,
  // map 方法：接收一个函数 f，并将其应用于 Task Monad 包装的值，返回一个新的 Task Monad
  map: (f) =>
    Task((resolve, reject) => run((value) => resolve(f(value)), reject)),
  // flatMap 方法：接收一个函数 f，并将其应用于 Task Monad 包装的值，
  // f 返回一个新的 Task Monad 实例
  flatMap: (f) =>
    Task((resolve, reject) =>
      run((value) => f(value).run(resolve, reject), reject)
    ),
  // fork 方法：开始执行 Task Monad，并根据结果执行成功或失败的回调函数
  fork: (resolve, reject) => run(resolve, reject),
});

// 创建一个包含值的task实例
Task.of = (value) => Task((resolve) => resolve(value));

// 封装一个返回Task Monad 实例的异步请求函数
const fetchUrl = (url) =>
  Task((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// 模拟获取用户基本信息的函数，异步
const getUser = (id) =>
  Task((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, name: "test" });
    }, 1000);
  });

// 模拟获取用户职业的函数，异步
const getJob = (user) =>
  Task((resolve, reject) => {
    setTimeout(() => {
      if (user.id === 1) {
        resolve("programmer");
      } else {
        reject("Job not found");
      }
    }, 1000);
  });

const userId = 1;

// 使用 flatMap 实现链式异步操作
getUser(userId)
  .flatMap((user) => getJob(user))
  .fork(
    // 成功回调：输出获取到的工作信息
    (job) => console.log("Job:", job),
    // 失败回调：输出错误信息
    (error) => console.error("Error:", error)
  );
