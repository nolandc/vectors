
<script setup lang="ts">
import { PropType, computed, inject, ref } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';
import { v4 as uuidv4 } from 'uuid';



const props = defineProps({
  origin: { type: Vector as PropType<Vector>, default: new Vector(0, 0)},
  vector: { type: Vector as PropType<Vector>, required: true },
  color: { type: String, default: 'blue' }
})

const grid = inject('grid') as Grid

const pxOrigin = computed(() => grid.gridToPx(props.origin.invertY()))
const pxVector = computed(() => grid.gridToPx(props.vector.invertY()))

const uuid = uuidv4()

</script>


<template>
  <defs>
    <marker
      :id="'arrow-' + uuid"
      viewBox="0 0 20 20"
      refX="4"
      refY="4"
      markerWidth="20"
      markerHeight="20"
      orient="auto"
      :stroke="props.color"
      stroke-width="1"
      fill="none"
      style="pointer-events: none;">
      <path d="M 0 8 L 4 4 L 0 0" />
    </marker>
  </defs>
  <line 
    :x1="pxOrigin.x" 
    :y1="pxOrigin.y" 
    :x2="pxVector.x" 
    :y2="pxVector.y" 
    :stroke="props.color" 
    stroke-width="3" 
    :marker-end="'url(#arrow-' + uuid + ')'"
    style="pointer-events: none;"
    />
</template>

