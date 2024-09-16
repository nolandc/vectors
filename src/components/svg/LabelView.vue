<script setup lang="ts">
import { PropType, computed, inject } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';

const props = defineProps({
  position: { type: Vector as PropType<Vector>, required: true },
  text: { type: String, required: true },
  color: { type: String, default: 'blue' },
  background: { type: String, default: 'white' }
})

const textLength = Math.max(props.text.length * 11, 16)

const grid = inject('grid') as Grid
const pxPosition = computed(() => grid.gridToPx(props.position))
const visible = computed(() => (props.position.length() * grid.unitPxSize) > 40)

</script>

<template>
  <g pointer-events="none">
    <rect 
      v-if="color !== 'none' && visible"
      :width="textLength+2" 
      height="17" 
      :fill="color" 
      rx="3" 
      :x="pxPosition.x - textLength/2.0 - 1" 
      :y="pxPosition.y - 8" 
    />
    <text 
      :text="text" 
      style="user-select: none; font-family: Courier;" 
      :x="pxPosition.x" 
      :y="pxPosition.y + 5" 
      :fill="background" 
      text-anchor="middle" 
      font-size="15" 
      v-if="visible"
    >
      {{ text }}
    </text>
  </g>
</template>