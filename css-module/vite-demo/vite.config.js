import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入 UnoCSS 依赖
import unoCSS from "unocss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unoCSS()],
});
