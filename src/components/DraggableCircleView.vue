
<script setup lang="ts">
import { PropType, computed, inject, onMounted, onUnmounted, ref } from 'vue';
import Grid from '../grid';
import Vector from '../math/vector';
import { useDraggableCircle } from '../logic/useDraggableCircle';


const props = defineProps({
  vector: { type: Vector as PropType<Vector>, required: true },
  color: { type: String, required: false, default: 'transparent' }
})

const OFFSET_DISTANCE_PX = 7
const grid = inject('grid') as Grid
const pxVector = computed(() => grid.gridToPx(props.vector.invertY()))
const circlePosition = computed(() => {
  // Convert the pixel offset to grid units
  const offsetDistanceGrid = -OFFSET_DISTANCE_PX / grid.unitPxSize;
  
  // Calculate the unit vector in grid space
  const gridUnitVector = props.vector.unit();
  
  // Calculate the offset in grid space
  const offsetVector = gridUnitVector.times(offsetDistanceGrid);
  
  // Add the offset to the original vector in grid space
  const offsetGridVector = props.vector.plus(offsetVector);
  
  // Convert the result to pixel coordinates
  return grid.gridToPx(offsetGridVector.invertY());
});

const el = ref<SVGCircleElement>()
const { selectPoint, onMouseReleased, subscribeToMouseMove, unsubscribeFromMouseMove } = useDraggableCircle()

const handleMouseMove = {
  onChange: (selected: SVGCircleElement, vec: Vector) => {
    if (el.value == selected) {
      emit('onChanged', vec)
    }
  }
}


onMounted(() => {
  subscribeToMouseMove(handleMouseMove)
})

onUnmounted(() => {
  unsubscribeFromMouseMove(handleMouseMove)
})

const emit = defineEmits(['onChanged'])

</script>


<template>
  <circle ref="el" id="SvgjsCircle1046" r="17.5" :cx="circlePosition.x" :cy="circlePosition.y" :fill="color" stroke="transparent"
    stroke-width="1" style="cursor: grab;" opacity="0.2"
    @mousedown="(e) => selectPoint(e.currentTarget as SVGCircleElement)" @mouseup="() => onMouseReleased() "></circle>
</template>

