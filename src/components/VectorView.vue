
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
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 100 100"
      refX="4"
      refY="4"
      markerWidth="20"
      markerHeight="20"
      orient="auto-start-reverse"
      cx="30"
      cy="30"
      stroke="blue"
      stroke-width="2"
      fill="none">
      <path d="M 0 8 L 4 4 L 0 0" />
    </marker>
  </defs>
  <line :x1="pxOrigin.x" :y1="pxOrigin.y" :x2="pxVector.x" :y2="pxVector.y" stroke="blue" stroke-width="2" marker-end="url(#arrow)"></line>

</template>

