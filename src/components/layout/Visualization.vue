<script setup lang="ts">
import Attribution from './Attribution.vue';
</script>

<template>
  <div id="visualization">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  #visualization {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    @media screen and (max-width: 1420px) {
      flex-direction: column;
      align-items: center;
    }
  }
</style>