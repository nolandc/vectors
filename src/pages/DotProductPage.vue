<script setup lang="ts">
import { computed, provide } from 'vue'
import Vector from "../math/vector.ts"
import Colors from "../constants/Colors.ts"
import Visualization from "../components/layout/Visualization.vue"
import VizDetails from "../components/layout/VizDetails.vue"
import GridView from "../components/svg/GridView.vue"
import VectorView from "../components/svg/VectorView.vue"
import VectorInput from "../components/VectorInput.vue"
import DraggableCircleView from "../components/DraggableCircleView.vue"
import LabelView from "../components/svg/LabelView.vue"
import ArcView from "../components/svg/ArcView.vue"
import MathUtils from "../math/utils.ts"
import Grid from "../grid.ts"
import { useUrlState } from '../logic/useURLState.ts'
import MathDetails from '../components/layout/MathDetails.vue'
import InlineColorLabel from '../components/InlineColorLabel.vue'
import ConstantInput from '../components/ConstantInput.vue'
import DotProductMath from './math/DotProductMath.vue'
const { v, w } = useUrlState({
  v: { type: 'vector', default: new Vector(2, 4) },
  w: { type: 'vector', default: new Vector(5, 2) }
});

const dotProduct = computed(() => v.value.dotProduct(w.value))
const unitDotProduct = computed(() => v.value.unit().dotProduct(w.value.unit()))
const magnitudeProduct = computed(() => v.value.length() * w.value.length())
const cosTheta = computed(() => dotProduct.value / magnitudeProduct.value)
const angle = computed(() => Math.acos(MathUtils.clamp(cosTheta.value, -1, 1)))
const angleDegrees = computed(() => angle.value * 180 / Math.PI)

const arcCenter = computed(() => new Vector(0, 0))
const arcRadius = computed(() => Math.min(v.value.length(), w.value.length()) / 3)

// Calculate the midpoint angle, considering the correct direction
const midpointAngle = computed(() => {
  const startAngle = Math.atan2(-v.value.y, v.value.x)
  const endAngle = Math.atan2(-w.value.y, w.value.x)
  let diff = endAngle - startAngle

  // Ensure we're taking the shorter arc
  if (diff > Math.PI) diff -= 2 * Math.PI
  if (diff < -Math.PI) diff += 2 * Math.PI

  let midAngle = startAngle + diff / 2

  // Normalize the angle to be between -π and π
  if (midAngle > Math.PI) midAngle -= 2 * Math.PI
  if (midAngle < -Math.PI) midAngle += 2 * Math.PI

  return midAngle
})

// Position for the angle label
const anglePosition = computed(() => {
  const radius = arcRadius.value * 1.5 // Slightly larger radius for the label
  return new Vector(
    radius * Math.cos(midpointAngle.value),
    -radius * Math.sin(midpointAngle.value)
  )
})

const angleText = computed(() => `${MathUtils.round(Math.abs(angleDegrees.value), 0)}°`)

// Create and provide grid
const grid = new Grid(20, 20, 600, 600, 0.1)
provide('grid', grid)
</script>

<template>
  <Visualization>
    <VizDetails>
      <div>
        <VectorInput label="v" :color="Colors.red" :vector="v" @updated="newV => v = newV" />
        <VectorInput label="w" :color="Colors.green" :vector="w" @updated="newW => w = newW" />
        <ConstantInput label="v&#xb7;w" :color="Colors.gray" :value="dotProduct"/>
        <ConstantInput label="v̂&#xb7;ŵ" :color="Colors.gray" :value="unitDotProduct"/>
      </div>
    </VizDetails>    
    <GridView :width="20" :height="20" :snap-increment="0.1">
      <ArcView 
        :start="v" 
        :end="w" 
        :center="arcCenter" 
        :radius="arcRadius" 
        color="#D3D3D3"
        :stroke-width="3" 
      />
      <LabelView :position="anglePosition" :text="angleText" color="white" background="#888" />

      <VectorView :vector="v" :color="Colors.red" />
      <LabelView :position="v.divided(2)" text="v" :color="Colors.red" />

      <VectorView :vector="w" :color="Colors.green" />
      <LabelView :position="w.divided(2)" text="w" :color="Colors.green" />

      <DraggableCircleView :vector="v" @on-changed="newV => v = newV" :color="Colors.red"/>
      <DraggableCircleView :vector="w" @on-changed="newW => w = newW" :color="Colors.green"/>
    </GridView>
    <MathDetails>      
      <template #notes>
        The dot product is an operation providing a scalar value that represents how closely two vectors align.
        <ul>
            <li>
                As the angle between vectors approaches 90°, the dot product approaches zero, indicating perpendicularity.
            </li>

            <li>
              While the dot product by itself it useful, it can be more intuitive to look at the dot product of two unit vectors <InlineColorLabel label="v̂&#xb7;ŵ" :color="Colors.gray"/>.
              Watch how it approaches 1 when the vectors near parallel, and 0 as they approach perpendicularity.
            </li>
        </ul>    
      </template>
      <template #math>
        <DotProductMath :v="v" :w="w" />
      </template>
    </MathDetails>
  </Visualization>
</template>