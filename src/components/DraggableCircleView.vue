
<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import Grid from '../grid';
import Vector from '../math/vector';


const props = defineProps({
  grid: { type: Grid as PropType<Grid>, required: true },
  origin: { type: Vector as PropType<Vector>, default: new Vector(0, 0)},
  vector: { type: Vector as PropType<Vector>, required: true }
})

const pxOrigin = computed(() => props.grid.gridToPx(props.origin.invertY()))
const pxVector = computed(() => props.grid.gridToPx(props.vector.invertY()))
</script>


<template>

</template>

