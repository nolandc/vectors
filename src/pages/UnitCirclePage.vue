<script setup lang="ts">
  import { computed, inject, ref } from "vue";
  import GridView from "../components/svg/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/svg/VectorView.vue";
  import DraggableCircleView from "../components/DraggableCircleView.vue"
  import VectorInput from "../components/VectorInput.vue";
  import Colors from "../constants/Colors";
  import LabelView from "../components/svg/LabelView.vue"
  import Visualization from "../components/layout/Visualization.vue";
  import VizDetails from "../components/layout/VizDetails.vue"
  import MathUtils from "../math/utils";
  import Grid from "../grid";
  import PolygonView from "../components/svg/PolygonView.vue"
  import CircleView from "../components/svg/CircleView.vue"
  import KatexComponent from "../components/KatexComponent.vue"

  const v1 = ref(new Vector(2, 2))
  const unitVec = computed(() => v1.value.unit())

  const pointVectors = computed(() => {
      return [
        new Vector(0, 0), 
        new Vector(unitVec.value.x, 0), 
        new Vector(unitVec.value.x, unitVec.value.y).invertY()
      ]
  })

</script>

<template>
  <Visualization>
    <GridView :width="6" :height="6" :pxWidth="600" :pxHeight="600" :snap-increment="0.1">
      <PolygonView :points="pointVectors" color="#A6C4E2"/>
      <VectorView :vector="v1" :color="Colors.red"/>
      <DraggableCircleView :vector="v1" @onChanged="(v: Vector) => v1 = v"/>
      <VectorView :vector="unitVec" :color="Colors.blue"/>
      <LabelView text="v1" :position="v1.divided(2)" :color="Colors.red"/>

      <CircleView :radius="1"/>
    </GridView>
  </Visualization>
  <VizDetails>
    <div>
      <VectorInput label="v" :color="Colors.red" :vector="v1" @updated="v => v1 = v"/>
      <VectorInput label="v̂" :color="Colors.blue" :vector="v1.unit()" :editable="false"/>
    </div>
    <div id="details-text">
      <KatexComponent>
        \hat{v} = \frac{\overrightarrow{v}}{\|\overrightarrow{v}\|}
      </KatexComponent>
      <KatexComponent>
        \hat{v} = \frac{\overrightarrow{v}}{ {{ MathUtils.round(v1.length(), 3) }} } 
        = \begin{bmatrix} 
          \frac{ {{ MathUtils.round(v1.x, 2) }} }{ {{ MathUtils.round(v1.length(), 3) }} } \\ 
          \frac{ {{ MathUtils.round(v1.y, 2) }} }{ {{ MathUtils.round(v1.length(), 3) }} }
        \end{bmatrix}
        = \begin{bmatrix}
          {{ MathUtils.round(v1.x / v1.length(), 3) }} \\
          {{ MathUtils.round(v1.y / v1.length(), 3) }}
        \end{bmatrix}      
      </KatexComponent>      
    </div>    
  </VizDetails>
</template>

