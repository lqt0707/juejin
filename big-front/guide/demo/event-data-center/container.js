import {
  activeSubscription,
  createEventDataCenter,
  destroySubscription,
  unActiveSubscription,
} from "./event-data-center";

/**
 * 自定义小程序页面构造器
 * @param {*} options 页面配置项
 * @param {*} pageID 小程序页面id
 * @param {*} originPage 其他自定义页面构造器或者原始的构造器
 */
export default function customPage(options, pageID, originPage = Page) {
  originPage({
    ...options,
    onLoad(...args) {
      // 假如有多个相同的页面，这样可以生成唯一的页面id
      this._pageId = createEventDataCenter(pageID);
      options.onLoad?.apply(this, args);
    },
    onUnload() {
      destroySubscription(this._pageId);
      options.onUnload?.apply(this);
    },
    onHide() {
      unActiveSubscription();
      options.onHide?.apply(this);
    },
    onShow() {
      activeSubscription(this._pageId);
      options.onShow?.apply(this);
    },
  });
}
