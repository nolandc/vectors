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
import LineView from "../components/svg/LineView.vue";
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from '../components/layout/MathDetails.vue';
import EigenvectorMath from './math/EigenvectorMath.vue';
import InlineColorLabel from '../components/InlineColorLabel.vue';
import ConstantInput from '../components/ConstantInput.vue';

const { v, m } = useUrlState({
  v: { type: 'vector', default: new Vector(1, 3) },
  m: { type: 'matrix', default: new Matrix2x2(-1, 1, 1, 3) }
});

const eigenvectors = computed(() => {
  return m.value.eigenvectors().map((v: Vector) => v.unit().times(20))
})

const eigenvalues = computed(() => {
  return m.value.eigenvalues()
})


// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="nv => v = nv"/>
        <MatrixInput :matrix="m" @updated="newM => m = newM"/>
        <VectorInput label="Mv" :color="Colors.green" :vector="v.multiplyByMatrix(m)" :editable="false"/>
        <VectorInput label="ev1" :color="Colors.gray" :vector="eigenvectors[0].unit()" :editable="false"/>
        <VectorInput label="ev2" :color="Colors.gray" :vector="eigenvectors[1].unit()" :editable="false"/>
        
        <ConstantInput v-if="eigenvalues[0] != undefined" label="e1" :color="Colors.gray" :value="eigenvalues[0]" :editable="false"/>
        <ConstantInput v-if="eigenvalues[1] != undefined" label="e2" :color="Colors.gray" :value="eigenvalues[1]" :editable="false"/>
      </div>
    </VizDetails>    
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.1">
      <template v-for="ev in eigenvectors">
        <LineView :vector="ev" :origin="ev.times(-1)" :stroke-dash-array="Math.abs(ev.unit().dotProduct(v.unit())) > 0.98 ? '0' : '10 3' " :color="Colors.lightGray"/>
      </template>

      <VectorView :vector="v.multiplyByMatrix(m)" :color="Colors.green"/>
      <LabelView text="Mv" :position="v.multiplyByMatrix(m).divided(2)" :color="Colors.green"/>

      <VectorView :vector="v" :color="Colors.red"/>
      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>

      <DraggableCircleView :vector="v" @on-changed="nv => v = nv" :color="Colors.red"/>
    </GridView>
    <MathDetails>
      <template #notes>
        Eigenvectors are special vectors that, when transformed by a matrix, only change in magnitude (not direction). 
        The corresponding eigenvalues represent the factor by which these vectors are scaled during the transformation.
        <ul>
          <li>An eigenspace is the set of all eigenvectors associated with a particular eigenvalue. The eigenspaces for <InlineColorLabel label="M" :color="Colors.blue"/> are represented as gray lines.</li>
          <li><InlineColorLabel label="ev1" :color="Colors.gray"/> and <InlineColorLabel label="ev2" :color="Colors.gray"/> are unit vectors in the eigenspaces for the matrix, while <InlineColorLabel label="e1" :color="Colors.gray"/> and <InlineColorLabel label="e2" :color="Colors.gray"/> are the eigenvalues.</li>
          <li>Note that there are some matrices that don't have real (non-complex) eigenvectors / eigenvalues. For instance, a vector transformed by a rotation or shear matrix will never align with its original direction.</li>
        </ul>
      </template>
      <template #math>
        <EigenvectorMath 
          :matrix="m" 
          :vector="v" 
          :eigenvectors="eigenvectors"
        />
      </template>   
    </MathDetails>
  </Visualization>
</template>