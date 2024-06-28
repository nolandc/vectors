<script setup lang="ts">
  import { ref } from "vue";
  import GridView from "../components/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/VectorView.vue";
  import Grid from "../grid";

  // TODO: just define grid in GridView, and let it use inherit/provide to pass it to child types?
  const grid = new Grid(10, 10, 600, 600)
  const vec = ref(new Vector(3, 2))


</script>

<template>
  <GridView :grid="grid" :width="10" :height="10" :pxWidth="600" :pxHeight="600">
    <VectorView :grid="grid" :vector="vec"/>
  </GridView>
</template>

<style lang="scss" scoped>

</style>
