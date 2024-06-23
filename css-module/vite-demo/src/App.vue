<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import "./styles/reset.css";
import { sassComponent, lessComponent, stylusComponent } from "./component";

function component() {
  const element = document.createElement("div");
  element.id = "app";
  const sassElement = sassComponent();
  element.appendChild(sassElement);
  const lessElement = lessComponent();
  element.appendChild(lessElement);
  const stylusElement = stylusComponent();
  element.appendChild(stylusElement);
  return element;
}

document.body.appendChild(component());
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <!-- 使用 UnoCSS  -->
    <div class="text-red">hello, Vite + UnoCSS</div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
