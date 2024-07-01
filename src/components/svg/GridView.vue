
<script setup lang="ts">
import { PropType, computed, onMounted, provide, ref, watch } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';
import { useDraggableCircle } from '../../logic/useDraggableCircle';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  pxWidth: { type: Number, required: true },
  pxHeight: { type: Number, required: true },
  snapIncrement: { type: Number, default: 0.5 }
})

const grid = new Grid(props.width, props.height, props.pxWidth, props.pxHeight, props.snapIncrement)
console.log('injecting grid', grid)
const halfGridSize = props.width / 2.0

const container = ref<HTMLDivElement>()

provide('grid', grid)

const emit = defineEmits(['updated'])

const { setupDraggableCircle } = useDraggableCircle()

onMounted(() => {
  setupDraggableCircle(container.value!, grid)
})

</script>

<template>
    <div id="svg-container"  ref="container">
        <svg id="svg-grid">
          <!-- Could eventually even just make a GridLines component? -->
          <template v-for="(line, index) in grid.gridHorizontalLines()">
            <line :x1="line[0]" :y1="line[1]" :x2="line[2]" :y2="line[3]" :stroke-width="index==halfGridSize ? 2 : 1" stroke="lightGray"></line>
          </template>
          <template v-for="(line, index) in grid.gridVerticalLines()">
            <line :x1="line[0]" :y1="line[1]" :x2="line[2]" :y2="line[3]" :stroke-width="index==halfGridSize ? 2 : 1" stroke="lightGray"></line>
          </template>
          <slot/>
        </svg>
    </div>
</template>


<style lang="scss">

#svg-container {
  width: v-bind('props.pxWidth + "px"');
  height: v-bind('props.pxHeight + "px"');
}
#svg-grid {
  width: 100%;
  height: 100%;
}
</style>
