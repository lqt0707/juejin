import Observer from "./observer";
/**
  封装基础订阅器
 */
export default class Subscription {
  // 观察者对象
  observers = new Set();
  /**
   * 订阅器
   * @param {*} cb 回调函数
   * @param {*} selector
   * @returns 取消订阅函数
   */
  subscribe(cb, selector) {
    if (typeof cb !== "function") {
      return console.warn("subscribe 的参数应该是一个function类型");
    }
    const observer = new Observer(cb, selector);
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  /**
   * 发布通知，更新每一个订阅者
   * @param  {...any} args 订阅者接收到的参数
   */
  publish(...args) {
    console.log("observers 的数量=======>", this.observers.size);
    this.observers.forEach((item) => {
      item.next(...args);
    });
  }

  /**
   * 取消订阅
   * @param {*} observer
   */
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
}
