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
import VizDetails from "../components/layout/VizDetails.vue";
import KatexComponent from "../components/KatexComponent.vue";
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from "./MathDetails.vue";
import InlineColorLabel from "../components/InlineColorLabel.vue";
const { v, w } = useUrlState({
  v: { type: 'vector', default: new Vector(4, 1) },
  w: { type: 'vector', default: new Vector(5, 8) }
});

const p = computed(() => v.value.projectOnto(w.value))

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization> 
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="nv => v = nv"/>
        <VectorInput label="w" :color="Colors.green" :vector="w" @updated="nv => w = nv"/>
        <VectorInput label="p" :color="Colors.blue" :vector="p" :editable="false"/>
      </div>
    </VizDetails>
    <GridView :width="20" :height="20" :pxWidth="600" :pxHeight="600">
      <LineView :vector="p" :origin="v" :color="Colors.lightGray" strokeDashArray="10"/>

      <DraggableCircleView :vector="v" @onChanged="(nv: Vector) => v=nv" :color="Colors.red"/>
      <VectorView :vector="v" :color="Colors.red"/>

      <DraggableCircleView :vector="w" @onChanged="(nv: Vector) => w=nv" :color="Colors.green"/>
      <VectorView :vector="w" :color="Colors.green"/>

      <VectorView :vector="p" :color="Colors.blue"/>

      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>
      <LabelView text="w" :position="w.divided(2)" :color="Colors.green"/>
      <LabelView text="p" :position="p.divided(2)" :color="Colors.blue"/>
    </GridView> 
    <MathDetails>
      <div id="details-text">
        Vector projection is the process of computing the component of a vector which is parallel to a second vector.

        <ul>
          <li>
            The projection of <InlineColorLabel label="v" :color="Colors.red"/> onto 
            <InlineColorLabel label="w" :color="Colors.green"/> finds the component of 
            <InlineColorLabel label="v" :color="Colors.red"/> parallel to 
            <InlineColorLabel label="w" :color="Colors.green"/>.
          </li>

          <li>
            The projection vector <InlineColorLabel label="p" :color="Colors.blue"/> represents the 'shadow' of 
            <InlineColorLabel label="v" :color="Colors.red"/> cast onto 
            <InlineColorLabel label="w" :color="Colors.green"/>'s line.
          </li>

          <li>
            A dashed gray line shows the perpendicular component.
          </li>

          <li>
            Together, these form a right triangle with 
            <InlineColorLabel label="v" :color="Colors.red"/> as the hypotenuse.
          </li>
        </ul>
        <KatexComponent>
          \text{proj}_{\vec{w}} \vec{v} = \frac{\vec{v} \cdot \vec{w}}{\|\vec{w}\|^2} \vec{w}
        </KatexComponent>
      </div>      
    </MathDetails>
  </Visualization>
</template>
