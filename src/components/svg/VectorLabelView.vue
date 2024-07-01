
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

/*
            this.textBackground = this.context.rect(Math.max(label.length * 12, 16), 16).fill('white').attr('rx', 3)
            this.text = this.context
                .text(label)
                .style({'user-select': 'none'})
*/
watch(pxVector, () => {
  console.log('pxvector', pxVector)
})
</script>


<template>
  <rect :width="Math.max(text.length * 12, 16)" height="16" fill="white" rx="3" :x="pxVector.x -12" :y="pxVector.y - 8"/>
  <text :text="text" style="user-select: none" :x="pxVector.x + 1" :y="pxVector.y + 4" :fill="color" text-anchor="middle" font-size="14">{{ text }}</text>
</template>

