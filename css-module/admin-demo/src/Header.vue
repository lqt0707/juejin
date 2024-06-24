<template>
  <div class="h-full flex items-center p-l p-r">
    <div class="w-20 h-7 bg-gray-2 m-r"></div>
    <span class="text-lg text-black font-bold"> AdminDemo </span>
    <div class="flex-1"></div>
    <a-badge dot :count="9" class="m-r">
      <icon-notification class="text-lg" />
    </a-badge>
    <icon-search class="text-lg m-r" />
    <icon-settings class="text-lg m-r" />
    <a-switch v-model="isDarkMode" class="m-r">
      <template #checked-icon>
        <icon-moon-fill />
      </template>
      <template #unchecked-icon>
        <icon-sun-fill style="color: var(--color-primary-light-4)" />
      </template>
    </a-switch>
    <a-avatar :size="32" class="m-r">Arco</a-avatar>
  </div>
</template>

<script lang="ts" setup>
import {
  IconSearch,
  IconSettings,
  IconSunFill,
  IconMoonFill,
  IconNotification,
} from "@arco-design/web-vue/es/icon";
import { ref } from "vue";
const isDarkMode = ref(false);
</script>
