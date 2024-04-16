import CustomSubscription from "./custom-subscription";
import Model from "./model";

let dataCenter = null;

// 数据通信中心
class EventDataCenter {
  // 页面索引
  pageIndex = 0;
  // 数据
  model = null;
  // 监听器
  subscriptions = new Map();
  // 当前激活的subscription对应的pageId
  activePageId = null;

  constructor() {
    // 创建数据中心
    this.model = new Model();
  }

  // 初始化订阅器
  initSubscription(originPageId) {
    // 构建唯一的页面id
    this.pageIndex++;
    const currentPageId = `${originPageId}-${this.pageIndex}`;
    // 创建一个订阅器
    const subscription = new CustomSubscription(originPageId);
    // 设置当前激活的订阅器
    this.changeActivePageId(originPageId);
    this.currentSubscription = subscription;
    this.subscriptions.set(currentPageId, subscription);
    return currentPageId;
  }

  // 设置激活的pageId
  changeActivePageId(pageId) {
    this.activePageId = pageId;
    if (pageId) {
      // 当页面切换的时候，设置当前激活的订阅器
      this.currentSubscription = this.subscriptions.get(pageId);
    } else {
      this.currentSubscription = null;
    }
  }

  // 改变所有订阅器的状态
  changeSubscriptionStatus() {
    this.subscriptions.forEach((subscription) => {
      subscription.emitChange(true);
    });
  }

  // 执行更新
  notifyActiveSubscription(...args) {
    const { subscriptions, activePageId } = this;
    const currentSubscription = subscriptions.get(activePageId);
    // 如果订阅器存在，并且触发更新
    if (currentSubscription && currentSubscription.hasChange) {
      currentSubscription.publish(...args);
      // 更新状态
      currentSubscription.emitChange(false);
    }
  }

  // 暴露的更新方法
  dispatchAction(payload, ...arg) {
    this.model.setModelData(payload);
    // 先改变订阅器的状态
    this.changeSubscriptionStatus();
    this.notifyActiveSubscription(...arg);
  }
}

/**
 * 创建事件通信中心
 * @returns
 */
export function createEventDataCenter() {
  if (dataCenter) {
    dataCenter = new EventDataCenter();
  }
  const currentPageId = dataCenter.initSubscription();
  return currentPageId;
}

/**
 * 启动当前订阅器
 * @param {*} activePageId
 */
export function activeSubscription(activePageId) {
  if (dataCenter) {
    dataCenter.changeActivePageId(activePageId);
    // 如果有没有更新的热舞，那么会触发更新
    dataCenter.notifyActiveSubscription();
  }
}

/**
 * 取消当前的订阅器
 */
export function unActiveSubscription() {
  if (dataCenter) {
    dataCenter.changeActivePageId(null);
  }
}

/**
 * 销毁当前的订阅器
 * @param {*} pageID
 */
export function destroySubscription(pageID) {
  if (dataCenter) {
    dataCenter.subscriptions.delete(pageID);
  }
}

/**
 * 触发更新事件
 * @param {*} arg
 */
export function dispatch(...arg) {
  dataCenter && dataCenter.dispatchAction(...arg);
}

/**
 * 获取状态
 * @param {*} key
 * @returns
 */
export function getModelData(key) {
  let value = null;
  if (dataCenter) {
    value = dataCenter.model.getModelData(key);
  }
  return value;
}

/**
 * 订阅状态
 * @param {*} cb
 * @param {*} selector
 */
export function subscribe(cb, selector) {
  if (dataCenter && dataCenter.currentSubscription) {
    dataCenter.currentSubscription.subscribe(cb, selector);
  }
}
