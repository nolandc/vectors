<script setup lang="ts">
  import { computed, ref } from "vue";
  import GridView from "../components/svg/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/svg/VectorView.vue";
  import DraggableCircleView from "../components/DraggableCircleView.vue"
  import VectorInput from "../components/VectorInput.vue";
  import LineView from "../components/svg/LineView.vue";
  import Colors from "../constants/Colors";
  import LabelView from "../components/svg/LabelView.vue"
  import Visualization from "../components/layout/Visualization.vue";
  import VizDetails from "../components/layout/VizDetails.vue";
import KatexComponent from "../components/KatexComponent.vue";


  const v1 = ref(new Vector(4, 1))
  const v2 = ref(new Vector(5, 8))
  const p = computed(() => v1.value.projectOnto(v2.value))
</script>

<template>
  <Visualization>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="p" :origin="v1" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="v1" @onChanged="(v: Vector) => v1=v" :color="Colors.red"/>
      <VectorView :vector="v1" :color="Colors.red"/>

      <DraggableCircleView :vector="v2" @onChanged="(v: Vector) => v2=v" :color="Colors.green"/>
      <VectorView :vector="v2" :color="Colors.green"/>

      <VectorView :vector="p" :color="Colors.blue"/>

      <LabelView text="v" :position="v1.divided(2)" :color="Colors.red"/>
      <LabelView text="w" :position="v2.divided(2)" :color="Colors.green"/>
      <LabelView text="p" :position="p.divided(2)" :color="Colors.blue"/>
    </GridView>  
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v1" @updated="v => v1 = v"/>
        <VectorInput label="w" :color="Colors.green" :vector="v2" @updated="v => v2 = v"/>
        <VectorInput label="p" :color="Colors.blue" :vector="p" :editable="false"/>
      </div>
      <div id="details-text">
        The projection of v onto w is the operation of finding the component of vector v that lies parallel with vector w.
        <KatexComponent>
          \text{proj}_{\vec{w}} \vec{v} = \frac{\vec{v} \cdot \vec{w}}{\|\vec{w}\|^2} \vec{w}
        </KatexComponent>
      </div>
    </VizDetails>
  </Visualization>
</template>
