<script setup lang="ts">
import { computed, provide } from 'vue'
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
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from './MathDetails.vue'
import InlineColorLabel from '../components/InlineColorLabel.vue'

// Use the composable to manage URL state
const { v, w, m } = useUrlState({
  v: { type: 'vector', default: new Vector(2, 2) },
  w: { type: 'vector', default: new Vector(-3, 3) },
  m: { type: 'matrix', default: new Matrix2x2(2, 1, 1, 2) }
});

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
].map(v => v))

const transformedPoints = computed(() => [
  new Vector(0, 0),
  mV.value,
  new Vector(mV.value.x + mW.value.x, mV.value.y + mW.value.y),
  mW.value
].map(v => v))

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>
<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="newV => v = newV" />
        <VectorInput label="w" :color="Colors.green" :vector="w" @updated="newW => w = newW" />
        <MatrixInput :initial-matrix="m" @updated="newM => m = newM" />
        <VectorInput label="Mv" :vector="v.multiplyByMatrix(m)" :editable="false" :color="Colors.gray"/>
        <VectorInput label="Mw" :vector="w.multiplyByMatrix(m)" :editable="false" :color="Colors.gray"/>          
      </div>
    </VizDetails>
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.5">
      <!-- Transformed vectors and parallelogram (in background) -->
      <PolygonView :points="transformedPoints" :color="'rgba(128, 128, 128, 0.1)'" />
      <VectorView :vector="mV" :color="Colors.gray" />
      <VectorView :vector="mW" :color="Colors.gray" />
      <LabelView :position="mV.divided(1.5)" text="Mv" :color="Colors.gray" />
      <LabelView :position="mW.divided(1.5)" text="Mw" :color="Colors.gray" />
      <LabelView :position="transformedCenter" text="A2" color="none" background="#777" />

      <!-- Original vectors and parallelogram (in foreground) -->
      <PolygonView :points="originalPoints" :color="Colors.lightBlue" />
      <VectorView :vector="v" :color="Colors.red" />
      <VectorView :vector="w" :color="Colors.green" />
      <LabelView :position="v.divided(2)" text="v" :color="Colors.red" />
      <LabelView :position="w.divided(2)" text="w" :color="Colors.green" />
      <LabelView :position="originalCenter" text="A1" color="none" background="rgba(41, 41, 94, 0.5)" />
      
      <DraggableCircleView :vector="v" @on-changed="newV => v = newV"  :color="Colors.red"/>
      <DraggableCircleView :vector="w" @on-changed="newW => w = newW"  :color="Colors.green"/>
    </GridView>
    <MathDetails>
      <template #notes>
        Determinant Visualization

        The determinant of a matrix represents how it scales area or volume in linear transformations.

        <ul>
            <li>
                <InlineColorLabel label="v" :color="Colors.red"/> and <InlineColorLabel label="w" :color="Colors.green"/> 
                are input vectors.
            </li>

            <li>
                <InlineColorLabel label="Mv" :color="Colors.gray"/> and <InlineColorLabel label="Mw" :color="Colors.gray"/> 
                show the transformed vectors.
            </li>

            <li>
                A1 represents the area of the parallelogram formed by <InlineColorLabel label="v" :color="Colors.red"/> and <InlineColorLabel label="w" :color="Colors.green"/> .
            </li>

            <li>
                A2 shows the area after transformation, illustrating the scaling effect of the determinant.
            </li>
        </ul>

        This visualization demonstrates how the determinant quantifies the factor by which a linear transformation 
        changes areas, with the sign indicating orientation preservation or reversal.
      </template>
      <template #math>

        <p>Area(A1): {{ MathUtils.round(Math.abs(determinant), 2) }}</p>
        <p>Area(A2): {{ MathUtils.round(Math.abs(transformedDeterminant), 2) }}</p>
        <p>Determinant of matrix (scale factor): {{ MathUtils.round(m.determinant(), 2) }}</p>
        <p>A2 / A1 = {{ MathUtils.round(Math.abs(transformedDeterminant) / Math.abs(determinant), 2) }}</p>
      </template>
    </MathDetails>
  </Visualization>
</template>