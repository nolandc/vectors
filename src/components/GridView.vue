
<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import Grid from '../grid';
import Vector from '../math/vector';


const props = defineProps({
  grid: { type: Grid as PropType<Grid>, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  pxWidth: { type: Number, required: true },
  pxHeight: { type: Number, required: true }
})

const halfGridSize = props.width / 2.0

const emit = defineEmits(['updated'])

const v1 = ref(new Vector(3, 0))


</script>

<template>
    <div id="svg-container">
        <svg id="svg-grid">
          <!-- Could eventually even just make a GridLines component? -->
          <template v-for="(line, index) in props.grid.gridHorizontalLines()">
            <line :x1="line[0]" :y1="line[1]" :x2="line[2]" :y2="line[3]" :stroke-width="index==halfGridSize ? 2 : 1" stroke="lightGray"></line>
          </template>
          <template v-for="(line, index) in props.grid.gridVerticalLines()">
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
