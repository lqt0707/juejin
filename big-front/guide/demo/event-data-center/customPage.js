/**
 * 自定义小程序页面构造器
 * @param {*} options 页面配置项
 * @param {*} pageID 小程序页面id
 * @param {*} originPage 其他自定义页面构造器或者原始的构造器
 */
function customPage(options, pageID, originPage = Page) {
  Object.assign(options.data, { author: "test" });
  originPage({
    ...options,
    onLoad(...args) {
      options.onLoad?.apply(this, args);
    },
    onUnload() {},
    onHide() {},
    onShow() {},
  });
}
