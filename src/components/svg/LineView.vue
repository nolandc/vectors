
<script setup lang="ts">
import { PropType, computed, inject } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';

const props = defineProps({
  origin: { type: Vector as PropType<Vector>, default: new Vector(0, 0)},
  vector: { type: Vector as PropType<Vector>, required: true },
  color: { type: String, default: 'blue' },
  strokeDashArray: { type: String, default: '' }
})

const grid = inject('grid') as Grid

const pxOrigin = computed(() => grid.gridToPx(props.origin.invertY()))
const pxVector = computed(() => grid.gridToPx(props.vector.invertY()))

</script>


<template>
  <line 
    :x1="pxOrigin.x" 
    :y1="pxOrigin.y" 
    :x2="pxVector.x" 
    :y2="pxVector.y" 
    :stroke="props.color" 
    stroke-width="3" 
    style="pointer-events: none;"
    :stroke-dasharray="props.strokeDashArray"
    />
</template>

