<script setup lang="ts">
  import MatrixInput from "../components/MatrixInput.vue"
  import { ComputedRef, computed, ref } from 'vue'
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

  const v1 = ref(new Vector(1, 3))
  const m1 = ref(new Matrix2x2(-5, -7, 2, 4))
</script>

<template>
  <Visualization>
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.1">
      <VectorView :vector="v1.multiplyByMatrix(m1)" :color="Colors.green"/>
      <LabelView text="M*v1" :position="v1.multiplyByMatrix(m1).divided(2)" :color="Colors.green"/>

      <VectorView :vector="v1" :color="Colors.red"/>
      <LabelView text="v1" :position="v1.divided(2)" :color="Colors.red"/>

      <DraggableCircleView :vector="v1" @on-changed="v => v1 = v"/>
    </GridView>
    <VizDetails>
      <div>
        <VectorInput label="v1" :color="Colors.red" :vector="v1" @updated="v => v1 = v"/>
        <VectorInput label="M*v1" :color="Colors.green" :vector="v1.multiplyByMatrix(m1)" :editable="false"/>
        <MatrixInput :initial-matrix="m1" @updated="newM => m1 = newM"/>

      </div>
      <div id="details-text">
      </div>
    </VizDetails>
  </Visualization>
</template>

