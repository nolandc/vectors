<script setup lang="ts">
import { computed, provide } from 'vue'
import Vector from "../math/vector.ts";
import Colors from "../constants/Colors.ts";
import Matrix2x2 from "../math/matrix.ts";
import Visualization from "../components/layout/Visualization.vue";
import VizDetails from "../components/layout/VizDetails.vue";
import GridView from "../components/svg/GridView.vue";
import VectorView from "../components/svg/VectorView.vue";
import VectorInput from "../components/VectorInput.vue";
import DraggableCircleView from "../components/DraggableCircleView.vue";
import LabelView from "../components/svg/LabelView.vue";
import MatrixInput from "../components/MatrixInput.vue";
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from './MathDetails.vue';
import InlineColorLabel from '../components/InlineColorLabel.vue';

const { v1, m1 } = useUrlState({
  v1: { type: 'vector', default: new Vector(-2, 2) },
  m1: { type: 'matrix', default: new Matrix2x2(-1, 2, 2, 3) }
});

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v1" @updated="v => v1 = v"/>
        <MatrixInput :initial-matrix="m1" @updated="newM => m1 = newM"/>
        <VectorInput label="Mv" :color="Colors.green" :vector="v1.multiplyByMatrix(m1)" :editable="false"/>
      </div>
    </VizDetails>    
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.1">
      <VectorView :vector="v1.multiplyByMatrix(m1)" :color="Colors.green"/>
      <LabelView text="Mv" :position="v1.multiplyByMatrix(m1).divided(2)" :color="Colors.green"/>

      <VectorView :vector="v1" :color="Colors.red"/>
      <LabelView text="v" :position="v1.divided(2)" :color="Colors.red"/>

      <DraggableCircleView :vector="v1" @on-changed="v => v1 = v" :color="Colors.red"/>
    </GridView>
    <MathDetails>
      <template #notes>
        Linear Transformation Visualization

        Linear transformations are operations that map vectors while preserving vector addition and scalar multiplication.

        <ul>
            <li>
                <InlineColorLabel label="v" :color="Colors.red"/> represents an input vector.
            </li>

            <li>
                <InlineColorLabel label="Mv" :color="Colors.green"/> shows the result of applying 
                the linear transformation M to v1.
            </li>

            <li>
                The transformation preserves the origin (the point where both vectors start).
            </li>

            <li>
                Changes in direction and magnitude of the vector illustrate how M affects v1.
            </li>
        </ul>

        This visualization demonstrates how linear transformations can stretch, rotate, or reflect vectors, 
        maintaining linearity throughout the process.
      </template>
      <template #math>
        hi
      </template>
    </MathDetails>
  </Visualization>
</template>