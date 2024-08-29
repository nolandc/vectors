<script setup lang="ts">
import { computed, provide } from "vue";
import GridView from "../components/svg/GridView.vue"
import Vector from "../math/vector";
import VectorView from "../components/svg/VectorView.vue";
import DraggableCircleView from "../components/DraggableCircleView.vue"
import VectorInput from "../components/VectorInput.vue";
import LineView from "../components/svg/LineView.vue";
import Colors from "../constants/Colors";
import LabelView from "../components/svg/LabelView.vue"
import Visualization from "../components/layout/Visualization.vue";
import VizDetails from "../components/layout/VizDetails.vue"
import KatexComponent from "../components/KatexComponent.vue";
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from './MathDetails.vue'
import InlineColorLabel from "../components/InlineColorLabel.vue";

// Use the composable to manage URL state
const { vec, vec2 } = useUrlState({
  vec: { type: 'vector', default: new Vector(3, 2) },
  vec2: { type: 'vector', default: new Vector(-1, -2) }
});

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" color="#f94144" :vector="vec" @updated="v => vec = v"/>
        <VectorInput label="w" color="#43aa8b" :vector="vec2" @updated="v => vec2 = v"/>
        <VectorInput label="v+w" color="#577590" :vector="vec.plus(vec2)" :editable="false"/>
      </div>

    </VizDetails>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="vec.plus(vec2)" :origin="vec" :color="Colors.lightGray" strokeDashArray="10"/>
      <LineView :vector="vec.plus(vec2)" :origin="vec2" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="vec" @onChanged="v => vec = v" :color="Colors.red"/>
      <VectorView :vector="vec" :color="Colors.red"/>

      <DraggableCircleView :vector="vec2" @onChanged="v => vec2 = v" :color="Colors.green"/>
      <VectorView :vector="vec2" :color="Colors.green"/>

      <VectorView :vector="vec2.plus(vec)" :color="Colors.blue"/>

      <LabelView text="v" :position="vec.divided(2)" :color="Colors.red"/>
      <LabelView text="w" :position="vec2.divided(2)" :color="Colors.green"/>
      <LabelView text="v+w" :position="vec.plus(vec2).divided(2)" :color="Colors.blue"/>
    </GridView>
    <MathDetails>
      <div id="details-text">
	        Notice how dotted gray vectors extending from <InlineColorLabel label="v" :color="Colors.red"/> and <InlineColorLabel label="w" :color="Colors.green"/>
          to <InlineColorLabel label="v+w" :color="Colors.blue"/> are the same magnitude as 
          <InlineColorLabel label="w" :color="Colors.green"/> and <InlineColorLabel label="v" :color="Colors.red"/> respectively. 
          To add two vectors, you can imagine simply placing the origin of the first vector at the tip of the second.	        
	        <KatexComponent>
	          \begin{bmatrix} {{ vec.x }} \\ {{ vec.y }} \end{bmatrix} + \begin{bmatrix} {{ vec2.x }} \\ {{  vec2.y }} \end{bmatrix} 
	          = \begin{bmatrix} {{vec.x}} + {{vec2.x}} \\ {{ vec.y }} + {{ vec2.y }} \end{bmatrix} 
	          = \begin{bmatrix} {{ vec.x + vec2.x }} \\ {{ vec.y + vec2.y }} \end{bmatrix}        </KatexComponent>
	      </div>
    </MathDetails>
  </Visualization>
</template>

