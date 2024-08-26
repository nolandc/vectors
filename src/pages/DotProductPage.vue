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

const { a, b } = useUrlState({
  a: { type: 'vector', default: new Vector(5, 2) },
  b: { type: 'vector', default: new Vector(2, 4) }
});

const dotProduct = computed(() => a.value.dotProduct(b.value))
const magnitudeProduct = computed(() => a.value.length() * b.value.length())
const cosTheta = computed(() => dotProduct.value / magnitudeProduct.value)
const angle = computed(() => Math.acos(MathUtils.clamp(cosTheta.value, -1, 1)))
const angleDegrees = computed(() => angle.value * 180 / Math.PI)

const arcCenter = computed(() => new Vector(0, 0))
const arcRadius = computed(() => Math.min(a.value.length(), b.value.length()) / 3)

// Calculate the midpoint angle, considering the correct direction
const midpointAngle = computed(() => {
  const startAngle = Math.atan2(-a.value.y, a.value.x)
  const endAngle = Math.atan2(-b.value.y, b.value.x)
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
    <GridView :width="20" :height="20" :px-width="600" :px-height="600" :snap-increment="0.1">
      <ArcView 
        :start="a.invertY()" 
        :end="b.invertY()" 
        :center="arcCenter" 
        :radius="arcRadius" 
        color="#D3D3D3"
        :stroke-width="3" 
      />
      <LabelView :position="anglePosition" :text="angleText" color="#888" background="white" />

      <VectorView :vector="a" :color="Colors.red" />
      <LabelView :position="a.divided(2)" text="a" :color="Colors.red" />

      <VectorView :vector="b" :color="Colors.blue" />
      <LabelView :position="b.divided(2)" text="b" :color="Colors.blue" />

      <DraggableCircleView :vector="a" @on-changed="newA => a = newA" :color="Colors.red"/>
      <DraggableCircleView :vector="b" @on-changed="newB => b = newB" :color="Colors.blue"/>
    </GridView>
    <VizDetails>
      <div>
        <VectorInput label="a" :color="Colors.red" :vector="a" @updated="newA => a = newA" />
        <VectorInput label="b" :color="Colors.blue" :vector="b" @updated="newB => b = newB" />
      </div>
      <div id="details-text">
        <p>Dot Product (a · b): {{ MathUtils.round(dotProduct, 2) }}</p>
        <p>|a| * |b|: {{ MathUtils.round(magnitudeProduct, 2) }}</p>
        <p>cos(θ): {{ MathUtils.round(cosTheta, 2) }}</p>
        <p>Angle θ: {{ MathUtils.round(Math.abs(angle), 2) }} radians ({{ MathUtils.round(Math.abs(angleDegrees), 2) }}°)</p>
      </div>
    </VizDetails>
  </Visualization>
</template>