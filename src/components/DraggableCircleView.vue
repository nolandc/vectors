<script setup lang="ts">
import { PropType, Ref, computed, inject, ref, onUnmounted } from 'vue';
import Grid from '../grid';
import Vector from '../math/vector';
import { useDragStyles } from '../logic/useDragStyles';

const { enableDragStyling, disableDragStyling } = useDragStyles()

const props = defineProps({
  vector: { type: Vector as PropType<Vector>, required: true },
  color: { type: String, required: false, default: 'transparent' }
})

const OFFSET_DISTANCE_PX = 6
const grid = inject('grid') as Grid
const container = inject('container') as Ref<HTMLDivElement>
const pxVector = computed(() => grid.gridToPx(props.vector))
const circlePosition = computed(() => {
  const offsetDistanceGrid = -OFFSET_DISTANCE_PX / grid.unitPxSize;
  const gridUnitVector = props.vector.unit();
  const offsetVector = gridUnitVector.times(offsetDistanceGrid);
  const offsetGridVector = props.vector.plus(offsetVector);
  return grid.gridToPx(offsetGridVector);
});

const el = ref<SVGCircleElement>()
let isDragging = false

const startDrag = (e: MouseEvent | TouchEvent) => {
  enableDragStyling()

  isDragging = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
  
  // Prevent default touch behavior
  if (e.type === 'touchstart') {
    e.preventDefault()
  }
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging) return
  
  // Prevent default scrolling behavior
  if (e.type === 'touchmove') {
    e.preventDefault()
  }
  
  const point = e instanceof MouseEvent ? e : e.touches[0]
  const bounds = container.value.getBoundingClientRect()
  if (!bounds) return
  const x = point.clientX - bounds.left
  const y = point.clientY - bounds.top
  const newVec = grid.pxToGrid(new Vector(x, y))
  const boundsRect = new Vector(grid.gridHeight, grid.gridWidth).divided(2.0)
  const clampedVec = newVec.intersectWithSquare(boundsRect).snap(grid.snapIncrement)
  emit('onChanged', clampedVec)
}

const stopDrag = () => {
  disableDragStyling()
  
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

onUnmounted(() => {
  stopDrag()
})

const emit = defineEmits(['onChanged'])
</script>

<template>
  <circle 
    class="draggable-circle" 
    ref="el" 
    r="20.5" 
    :cx="circlePosition.x" 
    :cy="circlePosition.y" 
    :fill="color" 
    stroke="transparent"
    stroke-width="1" 
    style="cursor: grab;" 
    opacity="0.15"
    @mousedown="startDrag"
    @touchstart.prevent="startDrag"
  ></circle>
</template>

<style scoped>
.draggable-circle:hover {
  opacity: 0.25;
}
</style>