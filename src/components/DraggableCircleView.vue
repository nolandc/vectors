
<script setup lang="ts">
import { PropType, Ref, computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import Grid from '../grid';
import Vector from '../math/vector';
import { useDraggableCircle } from '../logic/useDraggableCircle';


const props = defineProps({
  vector: { type: Vector as PropType<Vector>, required: true },
})
const grid = inject('grid') as Grid
const pxVector = computed(() => grid.gridToPx(props.vector.invertY()))
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
  <circle ref="el" id="SvgjsCircle1046" r="17.5" :cx="pxVector.x" :cy="pxVector.y" fill="transparent" stroke="transparent"
    stroke-width="1" style="cursor: grab;"
    @mousedown="(e) => selectPoint(e.currentTarget as SVGCircleElement)" @mouseup="() => onMouseReleased() "></circle>
</template>

