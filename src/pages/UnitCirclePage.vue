<script setup lang="ts">
import { computed, provide } from "vue";
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
import PolygonView from "../components/svg/PolygonView.vue"
import CircleView from "../components/svg/CircleView.vue"
import KatexComponent from "../components/KatexComponent.vue"
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'

const { v } = useUrlState({
  v: { type: 'vector', default: new Vector(2, 2) }
});

const unitVec = computed(() => v.value.unit())

const pointVectors = computed(() => {
  return [
    new Vector(0, 0), 
    new Vector(unitVec.value.x, 0), 
    new Vector(unitVec.value.x, unitVec.value.y).invertY()
  ]
})

// Create and provide grid
const grid = new Grid(6, 6, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <GridView :width="6" :height="6" :pxWidth="600" :pxHeight="600" :snap-increment="0.1">
      <PolygonView :points="pointVectors" :color="Colors.lightBlue"/>
      <VectorView :vector="v" :color="Colors.red"/>
      <DraggableCircleView :vector="v" @onChanged="newV => v = newV" :color="Colors.red"/>
      <VectorView :vector="unitVec" :color="Colors.blue"/>
      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>

      <CircleView :radius="1"/>
    </GridView>
  </Visualization>
  <VizDetails>
    <div>
      <VectorInput label="v" :color="Colors.red" :vector="v" @updated="newV => v = newV"/>
      <VectorInput label="v̂" :color="Colors.blue" :vector="v.unit()" :editable="false"/>
    </div>
    <div id="details-text">
      <KatexComponent>
        \hat{v} = \frac{\overrightarrow{v}}{\|\overrightarrow{v}\|}
      </KatexComponent>
      <KatexComponent>
        \hat{v} = \frac{\overrightarrow{v}}{ {{ MathUtils.round(v.length(), 3) }} } 
        = \begin{bmatrix} 
          \frac{ {{ MathUtils.round(v.x, 2) }} }{ {{ MathUtils.round(v.length(), 3) }} } \\ 
          \frac{ {{ MathUtils.round(v.y, 2) }} }{ {{ MathUtils.round(v.length(), 3) }} }
        \end{bmatrix}
        = \begin{bmatrix}
          {{ MathUtils.round(v.x / v.length(), 3) }} \\
          {{ MathUtils.round(v.y / v.length(), 3) }}
        \end{bmatrix}      
      </KatexComponent>      
    </div>    
  </VizDetails>
</template>