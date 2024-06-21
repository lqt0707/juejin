const myComplexPlugin = require("./postcss-plugin-complex");
const postcss = require("postcss");
const fs = require("fs");

// 规则定义
const selectorRules = {
  ".container": ".custom-container",
  ".title": ".custom-title",
};

// 属性值转换函数定义
const valueConverters = {
  margin: (value) => {
    const parsedValue = parseInt(value, 10);
    return `${parsedValue * 0.5}px`; // 假设按照一般的规则进行转换
  },
  "background-color": (value) => {
    return value.toUpperCase(); // 将颜色值转换为大写形式
  },
};

// 需要移除的选择器和声明
const removeSelectors = [];
const removeDeclarations = ["color"];

// 需要添加的新选择器和声明
const newSelectors = {
  ".new-selector": {
    color: "blue",
    "font-size": "14px",
  },
};

const newDeclarations = {
  padding: "5px",
  border: "1px solid black",
};

// 插件配置选项
const pluginOptions = {
  prefix: "qqx-",
  copyright: `
         @auth: qqx
         @email: 353087890@qq.com 
        `,
  selectorRules: selectorRules,
  valueConverter: valueConverters,
  removeSelectors: removeSelectors,
  removeDeclarations: removeDeclarations,
  newSelectors: newSelectors,
  newDeclarations: newDeclarations,
};

fs.readFile("./test.css", (err, css) => {
  postcss([myComplexPlugin(pluginOptions)])
    .process(css, { from: "./test.css", to: "output.css" })
    .then((result) => {
      fs.writeFile("output.css", result.css, () => true);
      if (result.map) {
        fs.writeFile("output.css.map", result.map.toString(), () => true);
      }
    });
});

// const result = postcss([myComplexPlugin(pluginOptions)]).process(css, {
//   /* options */
// });

// console.log(result.css);
