<template>
  <div class="h-full overflow-x-hidden">
    <a-menu
      :style="{ width: '100%', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_0']"
      show-collapse-button
      @collapse="onCollapse"
    >
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>菜单</template>
        <a-menu-item key="0_0">
          <template #icon>
            <icon-list />
          </template>
          页面1
        </a-menu-item>
        <a-menu-item key="0_1">
          <template #icon>
            <icon-list />
          </template>
          页面2
        </a-menu-item>
        <a-menu-item key="0_2">
          <template #icon>
            <icon-list />
          </template>
          页面3
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { IconApps, IconList } from "@arco-design/web-vue/es/icon";
const emit = defineEmits(["collapsed"]);
function onCollapse(params: any) {
  emit("collapsed", params);
}
</script>
