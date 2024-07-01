
<script setup lang="ts">
import { PropType, computed, inject, ref } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../../constants/Colors';



const props = defineProps({
  radius: { type: Number, default: 1 },
  origin: { type: Vector as PropType<Vector>, default: new Vector(0, 0) },
  color: { type: String, default: Colors.blue },
  stroke: { type: String, default: Colors.blue }

})

const grid = inject('grid') as Grid
const pxRadius = computed(() => grid.gridUnitsToPxUnits(new Vector(props.radius, props.radius)).x)
const pxPosition = computed(() => grid.gridToPx(props.origin))
</script>


<template>
  <circle :r="pxRadius" :stroke="color" stroke-width="2" :cx="pxPosition.x" :cy="pxPosition.y" fill="transparent"/>
</template>

