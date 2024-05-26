<script setup lang="ts">
  import VectorInput from "./components/VectorInput.vue"

  import { ref } from 'vue'
  import Vector from "./vector";

  const vec = ref(new Vector(3, 1))

</script>

<template>
  <div id="main">
    <div id="chart">
      
    </div>
    <div id="details">
      <VectorInput label="v1" :vector="vec"/>
    </div>
  </div>
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
