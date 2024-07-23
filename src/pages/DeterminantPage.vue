<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import Vector from "../math/vector.ts"
import Matrix2x2 from "../math/matrix.ts"
import Colors from "../constants/Colors.ts"
import Visualization from "../components/layout/Visualization.vue"
import VizDetails from "../components/layout/VizDetails.vue"
import GridView from "../components/svg/GridView.vue"
import VectorView from "../components/svg/VectorView.vue"
import VectorInput from "../components/VectorInput.vue"
import DraggableCircleView from "../components/DraggableCircleView.vue"
import LabelView from "../components/svg/LabelView.vue"
import MatrixInput from "../components/MatrixInput.vue"
import PolygonView from "../components/svg/PolygonView.vue"
import Grid from "../grid.ts"
import MathUtils from '../math/utils.ts'

// Define reactive vectors and matrix
const v = ref(new Vector(2, 2))
const w = ref(new Vector(-3, 3))
const m = ref(new Matrix2x2(2, 1, 1, 2))

// Compute transformed vectors
const mV = computed(() => v.value.multiplyByMatrix(m.value))
const mW = computed(() => w.value.multiplyByMatrix(m.value))

// Compute determinant (area)
const determinant = computed(() => {
  return v.value.x * w.value.y - v.value.y * w.value.x
})

const transformedDeterminant = computed(() => {
  return mV.value.x * mW.value.y - mV.value.y * mW.value.x
})


const originalCenter = computed(() => v.value.plus(w.value).divided(2))
const transformedCenter = computed(() => mV.value.plus(mW.value).divided(2))


const originalPoints = computed(() => [
  new Vector(0, 0),
  v.value,
  new Vector(v.value.x + w.value.x, v.value.y + w.value.y),
  w.value
].map(v => v.invertY()))

const transformedPoints = computed(() => [
  new Vector(0, 0),
  mV.value,
  new Vector(mV.value.x + mW.value.x, mV.value.y + mW.value.y),
  mW.value
].map(v => v.invertY()))


// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.5">
      <!-- Transformed vectors and parallelogram (in background) -->
      <PolygonView :points="transformedPoints" :color="'rgba(128, 128, 128, 0.1)'" />
      <VectorView :vector="mV" :color="Colors.gray" />
      <VectorView :vector="mW" :color="Colors.gray" />
      <LabelView :position="mV.divided(1.5)" text="M*v" :color="Colors.gray" />
      <LabelView :position="mW.divided(1.5)" text="M*w" :color="Colors.gray" />
      <LabelView :position="transformedCenter" text="A2" :color="Colors.gray" background="none" />

      <!-- Original vectors and parallelogram (in foreground) -->
      <PolygonView :points="originalPoints" :color="'rgba(255, 0, 0, 0.2)'" />
      <VectorView :vector="v" :color="Colors.red" />
      <VectorView :vector="w" :color="Colors.blue" />
      <LabelView :position="v.divided(2)" text="v" :color="Colors.red" />
      <LabelView :position="w.divided(2)" text="w" :color="Colors.blue" />
      <LabelView :position="originalCenter" text="A1" color="rgba(255, 0, 0, 0.6)" background="none" />
      
      <DraggableCircleView :vector="v" @on-changed="newV => v = newV" />
      <DraggableCircleView :vector="w" @on-changed="newW => w = newW" />
    </GridView>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="newV => v = newV" />
        <VectorInput label="w" :color="Colors.blue" :vector="w" @updated="newW => w = newW" />
        <VectorInput label="Mv" :vector="v.multiplyByMatrix(m)" :editable="false" :color="Colors.lightGray"/>
        <VectorInput label="Mw" :vector="w.multiplyByMatrix(m)" :editable="false" :color="Colors.lightGray"/>
        <MatrixInput :initial-matrix="m" @updated="newM => m = newM" />
      </div>
      <div id="details-text">
        <p>Area(A1): {{ MathUtils.round(Math.abs(determinant), 2) }}</p>
        <p>Area(A2): {{ MathUtils.round(Math.abs(transformedDeterminant), 2) }}</p>
        <p>Determinant of matrix (scale factor): {{ MathUtils.round(m.determinant(), 2) }}</p>
        <p>A2 / A1 = {{ MathUtils.round(Math.abs(transformedDeterminant) / Math.abs(determinant), 2) }}</p>
      </div>
    </VizDetails>
  </Visualization>
</template>