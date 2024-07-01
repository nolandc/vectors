
<script setup lang="ts">
import { PropType, computed, inject, ref } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';
import { v4 as uuidv4 } from 'uuid';



const props = defineProps({
  points: {type: Array, default: []},
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

