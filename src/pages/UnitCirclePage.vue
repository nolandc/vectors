<script setup lang="ts">
  import { computed, inject, ref } from "vue";
  import GridView from "../components/svg/GridView.vue"
  import Vector from "../math/vector";
  import VectorView from "../components/svg/VectorView.vue";
  import DraggableCircleView from "../components/DraggableCircleView.vue"
  import VectorInput from "../components/VectorInput.vue";
  import Colors from "../constants/Colors";
  import VectorLabelView from "../components/svg/VectorLabelView.vue"
  import Visualization from "../components/layout/Visualization.vue";
  import VizDetails from "../components/layout/VizDetails.vue"
  import MathUtils from "../math/utils";
  import Grid from "../grid";
  import PolygonView from "../components/svg/PolygonView.vue"
  import CircleView from "../components/svg/CircleView.vue"
  const v1 = ref(new Vector(2, 2))
  const unitVec = computed(() => {
    return v1.value.unit()
  })

//  const origin = grid.gridToPx(new Vector(0, 0))

  const pointVectors = computed(() => {
      return [
        new Vector(0, 0), 
        new Vector(unitVec.value.x, 0), 
        new Vector(unitVec.value.x, unitVec.value.y).invertY()
      ]
  })

  /*
  const tri = props.context.polygon(

  ).fill('#A6C4E2')
  .stroke({color: Colors.blue, width: 3})
  .attachToPoint(p1, (v: Vector) => {
    tri.attr('points', grid.unitVectorsToPxVectors(
      [
        new Vector(0, 0), 
        new Vector(unitVec.value.x, 0), 
        new Vector(unitVec.value.x, unitVec.value.y)
      ]
    ).flatMap(v => [v.x, v.y]))
  })


  const unitCircle = props.context.circle(grid.unitPxSize * 2)
    .cx(origin.x)
    .cy(origin.y)
    .stroke({width: 2, color: 'black'})
    .attr({'stroke-dasharray': "7"})
    .fill('transparent')      
    */

</script>

<template>
  <Visualization>
    <GridView :width="6" :height="6" :pxWidth="600" :pxHeight="600">
      <PolygonView :points="pointVectors" color="#A6C4E2"/>
      <VectorView :vector="v1" :color="Colors.red"/>
      <DraggableCircleView :vector="v1" @onChanged="(v: Vector) => v1.set(v)"/>
      <VectorView :vector="unitVec" :color="Colors.blue"/>
      <CircleView :radius="1"/>
    </GridView>
  </Visualization>
  <VizDetails>
    <VectorInput label="v1" :color="Colors.red" :vector="v1" @updated="v => v1.set(v)"/>
    <VectorInput label="u" :color="Colors.blue" :vector="v1.unit()" :editable="false"/>
    <div id="details-text">
      <div>
        u<sub>1</sub><sup>2</sup> + u<sub>2</sub><sup>2</sup> = ||u||
      </div>
      <div>
        ({{ MathUtils.round(unitVec.x) }})<sup>2</sup> + ({{ MathUtils.round(unitVec.y) }})<sup>2</sup> = 1
      </div>
    </div>    
  </VizDetails>
</template>

