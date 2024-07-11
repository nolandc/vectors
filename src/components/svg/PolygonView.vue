
<script setup lang="ts">
import { computed, inject } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';



const props = defineProps({
  points: {type: Array<Vector>, default: []},
  color: { type: String, default: 'blue' }
})

const grid = inject('grid') as Grid

const polyPoints = computed(() => {
  return grid.unitVectorsToPxVectors(props.points).flatMap(v => [v.x, v.y]).join(" ")
})

</script>


<template>
  <polygon :points="polyPoints" :fill="color"/>
</template>

