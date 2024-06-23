import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 引入 arco-design 相关的依赖
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
// 使用 ArcoVue 组件库
app.use(ArcoVue, {
  componentPrefix: "arco",
});
app.mount("#app");
