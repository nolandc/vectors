<script setup lang="ts">
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
  </div>
</template>

<style lang="scss" scoped>

#container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0;

  @media screen and (max-width: 800px) {
    padding: 0;
    align-items: unset;
  }
}
</style>
