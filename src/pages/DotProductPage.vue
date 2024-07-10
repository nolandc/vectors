<script setup lang="ts">
  import { ref } from "vue";
  import GridView from "../components/svg/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/svg/VectorView.vue";
  import DraggableCircleView from "../components/DraggableCircleView.vue"
  import VectorInput from "../components/VectorInput.vue";
  import LineView from "../components/svg/LineView.vue";
  import Colors from "../constants/Colors";
  import VectorLabelView from "../components/svg/VectorLabelView.vue"
  import Visualization from "../components/layout/Visualization.vue";
  import VizDetails from "../components/layout/VizDetails.vue"
  const vec = ref(new Vector(3, 2))
  const vec2 = ref(new Vector(-1, -2))

</script>

<template>
  <Visualization>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="vec.plus(vec2)" :origin="vec" :color="Colors.lightGray" strokeDashArray="10"/>
      <LineView :vector="vec.plus(vec2)" :origin="vec2" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="vec" @onChanged="v => vec = v"/>
      <VectorView :vector="vec" :color="Colors.red"/>

      <DraggableCircleView :vector="vec2" @onChanged="v => vec2 = v"/>
      <VectorView :vector="vec2" :color="Colors.green"/>

      <VectorView :vector="vec2.plus(vec)" :color="Colors.blue"/>

      <VectorLabelView text="v1" :vector="vec.divided(2)" :color="Colors.red"/>
      <VectorLabelView text="v2" :vector="vec2.divided(2)" :color="Colors.green"/>
      <VectorLabelView text="v1+v2" :vector="vec.plus(vec2).divided(2)" :color="Colors.blue"/>
    </GridView>
    <VizDetails>
      <div>
        <VectorInput label="v1" color="#f94144" :vector="vec" @updated="v => vec = v"/>
        <VectorInput label="v2" color="#43aa8b" :vector="vec2" @updated="v => vec2 = v"/>
        <VectorInput label="v1+v2" color="#577590" :vector="vec.plus(vec2)" :editable="false"/>
      </div>
      <div id="details-text">
        Dot Product: {{  vec.dotProduct(vec2) }}
      </div>
    </VizDetails>
  </Visualization>
</template>

