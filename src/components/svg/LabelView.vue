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
const pxPosition = computed(() => grid.gridToPx(props.position.invertY()))
const visible = computed(() => (props.position.length() * grid.unitPxSize) > 40)

</script>

<template>
  <rect 
    v-if="background !== 'none' && visible"
    :width="textLength" 
    height="17" 
    :fill="background" 
    rx="3" 
    :x="pxPosition.x - textLength/2.0" 
    :y="pxPosition.y - 8" 
  />
  <text 
    :text="text" 
    style="user-select: none" 
    :x="pxPosition.x" 
    :y="pxPosition.y + 6" 
    :fill="color" 
    text-anchor="middle" 
    font-size="15" 
    v-if="visible"
  >
    {{ text }}
  </text>
</template>