<script setup lang="ts">
import { PropType, computed, inject } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';

const props = defineProps({
  start: { type: Vector as PropType<Vector>, required: true },
  end: { type: Vector as PropType<Vector>, required: true },
  center: { type: Vector as PropType<Vector>, required: true },
  radius: { type: Number, required: true },
  color: { type: String, default: 'gray' },
  strokeWidth: { type: Number, default: 1 }
})

const grid = inject('grid') as Grid

const pxCenter = computed(() => grid.gridToPx(props.center))
const pxRadius = computed(() => props.radius * grid.unitPxSize)

// Here we invert the Y coordinates to accounts for the SVG axes
// being the opposite of our mathematical axes
const start = computed(() => props.start.invertY())
const end = computed(() => props.end.invertY())

const startAngle = computed(() => Math.atan2(start.value.y - props.center.y, start.value.x - props.center.x))
const endAngle = computed(() => Math.atan2(end.value.y - props.center.y, end.value.x - props.center.x))

const crossProduct = computed(() => 
  (start.value.x - props.center.x) * (end.value.y - props.center.y) - 
  (start.value.y - props.center.y) * (end.value.x - props.center.x)
)
const isClockwise = computed(() => crossProduct.value < 0)

const arcPath = computed(() => {
  let sweepAngle = endAngle.value - startAngle.value
  
  if (isClockwise.value) {
    if (sweepAngle > 0) sweepAngle -= 2 * Math.PI
  } else {
    if (sweepAngle < 0) sweepAngle += 2 * Math.PI
  }

  const startX = pxCenter.value.x + pxRadius.value * Math.cos(startAngle.value)
  const startY = pxCenter.value.y + pxRadius.value * Math.sin(startAngle.value)
  const endX = pxCenter.value.x + pxRadius.value * Math.cos(endAngle.value)
  const endY = pxCenter.value.y + pxRadius.value * Math.sin(endAngle.value)
  
  const largeArcFlag = Math.abs(sweepAngle) > Math.PI ? 1 : 0
  const sweepFlag = isClockwise.value ? 0 : 1

  return `M ${startX} ${startY} A ${pxRadius.value} ${pxRadius.value} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`
})
</script>

<template>
  <path :d="arcPath" :stroke="color" :stroke-width="strokeWidth" fill="none" />
</template>