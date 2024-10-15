<script setup lang="ts">
import Attribution from './components/layout/Attribution.vue';
import NavMenu from './components/layout/NavMenu.vue'

</script>

<template>
  <div id="container">
    <NavMenu />
    <div id="main">
      <RouterView v-slot="{Component}">
        <component :is="Component"/>
      </RouterView>
    </div>
    <Attribution/>
  </div>
</template>

<style lang="scss" scoped>

#container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0;
  min-height: 100vh;
  @media screen and (max-width: 1200px) {
    padding: 0;
  }
  #main {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>
