<script setup lang="ts">
  import { computed, ref } from "vue";
  import GridView from "../components/svg/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/svg/VectorView.vue";
  import DraggableCircleView from "../components/DraggableCircleView.vue"
  import VectorInput from "../components/VectorInput.vue";
  import LineView from "../components/svg/LineView.vue";
  import Colors from "../constants/Colors";
  import VectorLabelView from "../components/svg/VectorLabelView.vue"
  import Visualization from "../components/layout/Visualization.vue";
  import VizDetails from "../components/layout/VizDetails.vue";


  const v1 = ref(new Vector(4, 1))
  const v2 = ref(new Vector(5, 8))
  const p = computed(() => v1.value.projectOnto(v2.value))
</script>

<template>
  <Visualization>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="p" :origin="v1" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="v1" @onChanged="(v: Vector) => v1.set(v)"/>
      <VectorView :vector="v1" :color="Colors.red"/>

      <DraggableCircleView :vector="v2" @onChanged="(v: Vector) => v2.set(v)"/>
      <VectorView :vector="v2" :color="Colors.green"/>

      <VectorView :vector="p" :color="Colors.blue"/>

      <VectorLabelView text="v1" :vector="v1.divided(2)" :color="Colors.red"/>
      <VectorLabelView text="v2" :vector="v2.divided(2)" :color="Colors.green"/>
      <VectorLabelView text="p" :vector="p.divided(2)" :color="Colors.blue"/>
    </GridView>  
    <VizDetails>
      <div>
        <VectorInput label="v1" :color="Colors.red" :vector="v1" @updated="v => v1.set(v)"/>
        <VectorInput label="v2" :color="Colors.green" :vector="v2" @updated="v => v2.set(v)"/>
        <VectorInput label="p" :color="Colors.blue" :vector="p" :editable="false"/>
      </div>
      <div id="details-text">
        Projection is...
      </div>
    </VizDetails>
  </Visualization>
</template>
