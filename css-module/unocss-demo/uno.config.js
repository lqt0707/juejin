import { defineConfig, presetIcons, presetUno } from "unocss";
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      // 统一添加上 inline-block
      extraProperties: {
        display: "inline-block",
      },
      collections: {
        // 自定义添加图标
        custom: {
          circle:
            '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
        },
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
    // 可以让我们把样式以属性的形式写在标签中
    presetAttributify({
      prefix: "my-un-",
    }),
  ],
  // 配置自定义 rule
  rules: [
    [
      "aa-bb-cc",
      {
        display: "fixed",
        top: "10px",
        left: "10px",
      },
    ],
  ],
});
