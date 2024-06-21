const postcss = require("postcss");

function myComplexPlugin(options) {
  const {
    prefix,
    copyright,
    selectorRules,
    valueConverter,
    removeSelectors,
    removeDeclarations,
    newSelectors,
    newDeclarations,
  } = options;

  return {
    postcssPlugin: "postcss-plugin-complex",
    Once(root, { result }) {
      // 创建版权声明注释节点
      const comment = postcss.comment({
        text: copyright,
      });

      // 将注释节点插入到根节点的开头
      root.prepend(comment);
    },

    Rule(rule, { result }) {
      // 处理选择器转换
      rule.selectors = rule.selectors.map((selector) => {
        let updatedSelector = selector;
        // 根据规则转换选择器
        Object.keys(selectorRules).forEach((rule) => {
          updatedSelector = updatedSelector.replace(rule, selectorRules[rule]);
        });

        return `${updatedSelector}`;
      });

      // 移除不要的css规则
      if (removeSelectors.includes(rule.selector)) {
        rule.remove();
      }
    },

    Declaration(decl, { result }) {
      const prop = decl.prop;
      const value = decl.value;

      // 处理属性值转换
      Object.keys(valueConverter).forEach((property) => {
        if (prop.includes(property)) {
          const converter = valueConverter[property];
          decl.value = converter(value);
        }
      });

      // 移除不需要的css声明
      if (removeDeclarations.includes(decl.prop)) {
        decl.remove;
      }
    },

    OnceExit(root, { result }) {
      // 添加新的css规则和声明
      Object.keys(newSelectors).forEach((selector) => {
        const rule = postcss.rule({ selector });

        Object.keys(newDeclarations).forEach((property) => {
          const value = newDeclarations[property];
          const declaration = postcss.decl({ prop: property, value });
          rule.append(declaration);
        });
        root.append(rule);
      });
      root.nodes
        .filter((it) => it.type === "rule" && it.selector.startsWith("."))
        .forEach((it) => {
          it.selector = `.${prefix}${it.selector.replace(".", "")}`;
        });
    },
  };
}

module.exports = myComplexPlugin;
