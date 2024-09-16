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
import PolygonView from "../components/svg/PolygonView.vue"
import CircleView from "../components/svg/CircleView.vue"
import Grid from "../grid";
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from "../components/layout/MathDetails.vue";
import MLVector from "../components/mathml/MLVector.vue";
import MLVectorVar from "../components/mathml/MLVectorVar.vue";
import MLFormattedNumber from "../components/mathml/MLFormattedNumber.vue";
import InlineColorLabel from "../components/InlineColorLabel.vue";
import MLAlignedEquations from "../components/mathml/MLAlignedEquations.vue";
import MLFraction from "../components/mathml/MLFraction.vue";
import MLNorm from "../components/mathml/MLNorm.vue";

const { v } = useUrlState({
  v: { type: 'vector', default: new Vector(2, 2) }
});

const unitVec = computed(() => v.value.unit())

const pointVectors = computed(() => {
  return [
    new Vector(0, 0), 
    new Vector(unitVec.value.x, 0), 
    new Vector(unitVec.value.x, unitVec.value.y)
  ]
})


// Create and provide grid
const grid = new Grid(6, 6, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="newV => v = newV"/>
        <VectorInput label="v̂" :color="Colors.blue" :vector="v.unit()" :editable="false"/>
      </div>
    </VizDetails>    
    <GridView :width="6" :height="6" :pxWidth="600" :pxHeight="600" :snap-increment="0.1">
      <PolygonView :points="pointVectors" :color="Colors.lightBlue"/>
      <VectorView :vector="v" :color="Colors.red"/>
      <DraggableCircleView :vector="v" @onChanged="newV => v = newV" :color="Colors.red"/>
      <VectorView :vector="unitVec" :color="Colors.blue"/>
      <LabelView text="v" :position="v.divided(2)" :color="Colors.red"/>
      <LabelView text="v̂" :position="v.unit().divided(2)" :color="Colors.blue"/>
      <CircleView :radius="1"/>
    </GridView>
    <MathDetails>
      <template #notes>
        A unit vector is a vector with a magnitude (length) of 1. This visualization demonstrates how any vector can be 
        converted to a unit vector.

        <ul>
          <li>
            The vector <InlineColorLabel label="v" :color="Colors.red"/> 
            represents an arbitrary vector in 2D space.
          </li>
          <li>
            The blue circle has a radius of 1, centered at the origin. All points on this circle represent unit vectors.
          </li>
          <li>
            The light blue triangle shows how <InlineColorLabel label="v" :color="Colors.red"/> is scaled down to create its 
            unit vector, which lies on the circle.
          </li>
          <li>
            The resulting unit vector points in the same direction as <InlineColorLabel label="v" :color="Colors.red"/> but 
            has a length of exactly 1.
          </li>
        </ul>

        This concept is crucial in many applications where only the direction of a vector is important, not its magnitude.            
      </template>
      <template #math>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <MLAlignedEquations>
            <mtr>
              <mtd>
                <MLVectorVar variable="v" :isUnit="true" />
              </mtd>
              <mtd>
                <mo>=</mo>
              </mtd>
              <mtd>
                <MLFraction>
                  <MLVectorVar variable="v" />
                  <MLNorm>
                    <MLVectorVar variable="v" />
                  </MLNorm>
                </MLFraction>
              </mtd>
            </mtr>
            <mtr>
              <mtd></mtd>
              <mtd>
                <mo>=</mo>
              </mtd>
              <mtd>
                <MLFraction>
                  <MLVector>
                    <MLFormattedNumber :val="v.x" :decimals="2"/>
                    <MLFormattedNumber :val="v.y" :decimals="2"/>
                  </MLVector>
                  <MLFormattedNumber :val="v.length()" :decimals="3"/>
                </MLFraction>
              </mtd>
            </mtr>
            <mtr>
              <mtd></mtd>
              <mtd>
                <mo>=</mo>
              </mtd>
              <mtd>
                <MLVector>
                  <MLFormattedNumber :val="v.x / v.length()" :decimals="3"/>
                  <MLFormattedNumber :val="v.y / v.length()" :decimals="3"/>
                </MLVector>
              </mtd>
            </mtr>
          </MLAlignedEquations>
        </math>
      </template>
    </MathDetails>
  </Visualization>
</template>

<style>
/* TODO: MOVE ME */
math {
  font-size: 16px;
  padding-bottom: 25px;
}

mi {
  /* TODO: Adjust font perhaps? */
}
mn {

}
</style>