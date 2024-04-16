/**
 * 自定义组件构造器
 * @param {*} options 组件配置项
 * @param {*} originComponent 其他自定义组件构造器或者原始组件构造器
 */
function customComponent(options, originComponent = Component) {
  const { behaviors, methods } = options;

  // 加入自定义behaviors
  Array.isArray(behaviors) && behaviors.push(customBehaviors);
  methods._customFunction = function () {};
  originComponent(options);
}
