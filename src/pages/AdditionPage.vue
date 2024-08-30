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
const { v, w } = useUrlState({
  v: { type: 'vector', default: new Vector(3, 2) },
  w: { type: 'vector', default: new Vector(-1, -2) }
});

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" color="#f94144" :vector="v" @updated="nv => v = nv"/>
        <VectorInput label="w" color="#43aa8b" :vector="w" @updated="v => w = v"/>
        <VectorInput label="v+w" color="#577590" :vector="v.plus(w)" :editable="false"/>
      </div>

    </VizDetails>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="v.plus(w)" :origin="v" :color="Colors.lightGray" strokeDashArray="10"/>
      <LineView :vector="v.plus(w)" :origin="w" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="v" @onChanged="nv => v = nv" :color="Colors.red"/>
      <VectorView :vector="v" :color="Colors.red"/>

      <DraggableCircleView :vector="w" @onChanged="v => w = v" :color="Colors.green"/>
      <VectorView :vector="w" :color="Colors.green"/>

      <VectorView :vector="w.plus(v)" :color="Colors.blue"/>

      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>
      <LabelView text="w" :position="w.divided(2)" :color="Colors.green"/>
      <LabelView text="v+w" :position="v.plus(w).divided(2)" :color="Colors.blue"/>
    </GridView>
    <MathDetails>
      <template #notes>
	        Notice how dotted gray vectors extending from <InlineColorLabel label="v" :color="Colors.red"/> and <InlineColorLabel label="w" :color="Colors.green"/>
          to <InlineColorLabel label="v+w" :color="Colors.blue"/> are the same magnitude as 
          <InlineColorLabel label="w" :color="Colors.green"/> and <InlineColorLabel label="v" :color="Colors.red"/> respectively. 
          To add two vectors, you can imagine simply placing the origin of the first vector at the tip of the second.	        
      </template>
      <template #math>
        <!-- Generic formula for adding two 2D vectors -->
        <KatexComponent>
          \vec{v} + \vec{w} = \begin{bmatrix} v_x \\ v_y \end{bmatrix} + \begin{bmatrix} w_x \\ w_y \end{bmatrix} = \begin{bmatrix} v_x + w_x \\ v_y + w_y \end{bmatrix}
        </KatexComponent>

        <!-- Specific vector addition step 1: Initial vectors -->
        <KatexComponent>
          = \begin{bmatrix} {{ v.x }} \\ {{ v.y }} \end{bmatrix} + \begin{bmatrix} {{ w.x }} \\ {{ w.y }} \end{bmatrix}
        </KatexComponent>

        <!-- Specific vector addition step 2: Addition and result -->
        <KatexComponent>
          = \begin{bmatrix} {{ v.x }} + {{ w.x }} \\ {{ v.y }} + {{ w.y }} \end{bmatrix} = \begin{bmatrix} {{ v.x + w.x }} \\ {{ v.y + w.y }} \end{bmatrix}
        </KatexComponent>
      </template>
    </MathDetails>
  </Visualization>
</template>

