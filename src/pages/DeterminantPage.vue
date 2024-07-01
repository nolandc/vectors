<script setup lang="ts">
  import VectorInput from "../components/svg/LineView.vue"
  import {ref } from 'vue'
  import Vector from "../math/vector.ts";

  let v1 = ref(new Vector(3, 1))
  let v2 = ref(new Vector(1, 3))



</script>

<template>
    <div>

    </div>
    <div id="details-text">
      Notice how dotted gray vectors between v1/v2 and v1+v2 are the same magnitude as v1/v2. To add two vectors, you can imagine
      simply placing the origin of one vector at the end of another.
    </div>
</template>

<style lang="scss" scoped>

</style>
