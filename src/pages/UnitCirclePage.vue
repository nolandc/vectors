<script setup lang="ts">
  import VectorInput from "../components/VectorInput.vue"
  import { ComputedRef, PropType, Ref, computed, onUnmounted, ref } from 'vue'
  import Vector from "../math/vector.ts";
  import Grid from "../grid";
  import SVGVector from "../SVGVector";
  import SVGGrid from "../SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "../SVGLine";
  import SVGInteractivePoint from "../SVGInteractivePoint";
  import { usePointSelection } from '../logic/usePointSelection.ts'
import Colors from "../constants/Colors.ts";
import MathUtils from "../math/utils.ts";

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  const grid = new Grid(6, 6, 600, 600, 0.1)
  const v1 = ref(new Vector(2, 2))
  const unitVec: ComputedRef<Vector> = computed(() => {
    return v1.value.unit().invertY()
  })

  const { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  const p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  const svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)


  const origin = grid.gridToPx(new Vector(0, 0))

  const unitCircle = props.context.circle(grid.unitPxSize * 2)
    .cx(origin.x)
    .cy(origin.y)
    .stroke({width: 2, color: 'black'})
    .attr({'stroke-dasharray': "7"})
    .fill('transparent')


  // TODO: attempt to use extensions elsewhere, see if they're a decent approach
  SVG.extend(SVG.Element, {
    attachToPoint: function(p: SVGInteractivePoint, f: (vec: Vector) => void) {
      p.onChange({
        update: (newVec) => f(newVec)
      })
      
      return this;
    }
  })

  const tri = props.context.polygon(
    grid.unitVectorsToPxVectors(
      [
        new Vector(0, 0), 
        new Vector(unitVec.value.x, 0), 
        new Vector(unitVec.value.x, unitVec.value.y)
      ]
    ).flatMap(v => [v.x, v.y])
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



  const unitVector = new SVGVector(v1.value.unit(), grid, props.context, "u")
    .onPointUpdate(p1, (v: Vector) => {
        //const unitVec = grid.unitToPx(v.unit().invertY())
        console.log('unit vec: ', v)
        unitVector.update(v.unit())
      })
      .color(Colors.blue)

  /*
  const unitPoint = props.context.circle(16)
    .cx(unitVec.x)
    .cy(unitVec.y)
    .fill(Colors.blue)
    .attachToPoint(p1, (v: Vector) => {
      const unitVec = grid.unitToPx(v.unit().invertY())
      unitPoint.cx(unitVec.x)
      unitPoint.cy(unitVec.y)
    })
    */

</script>

<template>
  <div>
    <VectorInput label="v1" :color="Colors.red" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
    <VectorInput label="u" :color="Colors.blue" :vector="p1.vec.value.unit()" :editable="false"/>
  </div>
  <div id="details-text">
    <div>
      u<sub>1</sub><sup>2</sup> + u<sub>2</sub><sup>2</sup> = ||u||
    </div>
    <div>
      ({{ MathUtils.round(unitVec.x) }})<sup>2</sup> + ({{ MathUtils.round(unitVec.y) }})<sup>2</sup> = 1
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>
