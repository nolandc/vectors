
<script setup lang="ts">
import { PropType, computed, inject, ref, watch } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';



const props = defineProps({
  vector: { type: Vector as PropType<Vector>, required: true },
  text: { type: String, required: true },
  color: { type: String, default: 'blue' }
})

const grid = inject('grid') as Grid
const pxVector = computed(() => grid.gridToPx(props.vector.invertY()))

const textLength = Math.max(props.text.length * 11, 16)
</script>


<template>
  <rect :width="textLength" height="17" fill="white" rx="3" :x="pxVector.x -textLength/2.0" :y="pxVector.y - 8"/>
  <text :text="text" style="user-select: none" :x="pxVector.x + 1" :y="pxVector.y + 6" :fill="color" text-anchor="middle" font-size="15">{{ text }}</text>
</template>

