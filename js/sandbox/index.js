class SandBox {
  #options = {};
  constructor(options) {
    Object.assign(
      this.#options,
      {
        // 逃逸属性
        escapeVariables: [],
        // 逃逸事件
        escapeWEvents: [],
        // 预设数据
        presetVariables: {},
        // 需要清理的资源
        patches: {
          setTimeout: false,
          localStorage: false,
          fetch: false,
        },
      },
      options
    );
  }

  runScript(code) {}

  dispose() {}
}
