const { defineConfig } = require("@unocss/webpack");
const presetUno = require("@unocss/preset-uno");
module.exports = defineConfig({
  content: {
    pipeline: {
      include: ["src/**/*.{js,ts}"],
    },
  },
  presets: [presetUno()],
});
