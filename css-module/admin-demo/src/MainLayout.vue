<template>
  <div class="main-container-layout">
    <section class="header-wrapper border-b border-gray-200 border-b-solid">
      <Header></Header>
    </section>
    <div class="body-wrapper">
      <section
        class="side-wrapper border-r border-gray-200 border-r-solid"
      ></section>
      <section class="content-wrapper"></section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./Header.vue";
</script>

<style lang="less">
@headerHeight: 50px;
@sideWidth: 210px;
.main-container-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .header-wrapper {
    height: @headerHeight;
  }
  .body-wrapper {
    display: flex;
    flex: 1;
    .side-wrapper {
      width: @sideWidth;
    }
    .content-wrapper {
      flex: 1;
    }
  }
}
</style>
