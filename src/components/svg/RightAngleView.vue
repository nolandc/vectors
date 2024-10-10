<script setup lang="ts">
import { PropType, computed, inject } from 'vue';
import Grid from '../../grid';
import Vector from '../../math/vector';
import Matrix2x2 from '../../math/matrix';

const props = defineProps({
  v: { type: Object as PropType<Vector>, required: true },
  p: { type: Object as PropType<Vector>, required: true },
  color: { type: String, default: '#bbb' },
  strokeWidth: { type: Number, default: 3 }
});

const grid = inject('grid') as Grid;

const rightAnglePath = computed(() => {
  const rotMat = new Matrix2x2(0, 1, -1, 0);
  const pUnit = props.p.unit();
  const vMinusP = props.v.minus(props.p);
  const size = Math.min(0.75, props.p.length() * 0.5)

  // Determine the correct orientation
  const crossProduct = pUnit.x * vMinusP.y - pUnit.y * vMinusP.x;
  const sign = -Math.sign(crossProduct);

  // Calculate the points for the right angle marker
  const p1 = props.p.minus(pUnit.times(size));
  const p2 = props.p.plus(pUnit.times(sign).multiplyByMatrix(rotMat).times(size));
  
  const proj = props.v.projectOnto(props.p).unit();
  const c = p2.minus(proj.times(size));

  const point1 = grid.gridToPx(p1);
  const point2 = grid.gridToPx(p2);
  const corner = grid.gridToPx(c);

  return `M ${point1.x} ${point1.y} L ${corner.x} ${corner.y} L ${point2.x} ${point2.y}`;
});
</script>

<template>
  <path :d="rightAnglePath" :stroke="color" :stroke-width="strokeWidth" fill="none" />
</template>