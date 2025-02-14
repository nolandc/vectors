
<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import Grid from '../../grid';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  snapIncrement: { type: Number, default: 0.5 }
})

const grid = ref(new Grid(props.width, props.height, 600, 600, props.snapIncrement))
const halfGridSize = props.width / 2.0

const container = ref<HTMLDivElement>()

provide('grid', grid.value)
provide('container', container)

const emit = defineEmits(['updated'])

onMounted(() => {
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, right } = entry.contentRect;
      grid.value.setPixelSize(width, right);
    }
  });

  if (container.value) {
    resizeObserver.observe(container.value);
  }

  onUnmounted(() => {
    resizeObserver.disconnect();
  });
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
  max-width: 650px;
  max-height: 650px;
  min-width: 450px;
  aspect-ratio: 1; 
  margin-bottom: 40px;
  flex-grow: 1;

  @media screen and (max-width: 1200px) {
    min-width: unset;
    min-height: unset;
    width: 100%;
    max-width: 550px;
    max-height: 550px
  }

  @media screen and (max-width: 800px) {
    order: 0;
    width: 100%;
    height: auto;
  }
}

#svg-grid {
  width: 100%;
  aspect-ratio: 1;
}

</style>
