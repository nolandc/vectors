<script setup>
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
}


#details {
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  #details-text {
    margin-top: auto;
  }
}
</style>
