<script setup lang="ts">
  import VectorInput from "../components/VectorInput.vue"
  import MatrixInput from "../components/MatrixInput.vue"
  import { ComputedRef, PropType, Ref, computed, onUnmounted, ref } from 'vue'
  import Vector from "../math/vector.ts";
  import Grid from "../grid.ts";
  import SVGVector from "../SVGVector.ts";
  import SVGGrid from "../SVGGrid.ts";
  import SVG from 'svg.js'
  import SVGLine from "../SVGLine.ts";
  import SVGInteractivePoint from "../SVGInteractivePoint.ts";
  import { usePointSelection } from '../logic/PointSelection.ts'
import Colors from "../constants/Colors.ts";
import Matrix2x2 from "../math/matrix.ts";

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  const grid = new Grid(20, 20, 600, 600, 0.5)
  const v1 = ref(new Vector(3, 1))
  const m1 = ref(new Matrix2x2(0, -1, 1, 0))

  const { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  const p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  const svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color(Colors.red)
    .attachToPoint(p1)


  // TODO: attempt to use extensions elsewhere, see if they're a decent approach
  SVG.extend(SVG.Element, {
    attachToPoint: function(p: SVGInteractivePoint, f: (vec: Vector) => void) {
      p.onChange({
        update: (newVec) => f(newVec)
      })
      
      return this;
    }
  })


  const svg2 = new SVGVector(v1.value.multiplyByMatrix(m1.value), grid, props.context, "M*v1")
    .color(Colors.green)
    .onPointUpdate(p1, (vec) => {
      svg2.update(vec.multiplyByMatrix(m1.value))
    })


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
    <VectorInput label="M * v1" :color="Colors.green" :vector="v1.multiplyByMatrix(m1)" :editable="false"/>
    <MatrixInput :initial-matrix="m1" @updated="newM => {m1 = newM, svg2.update(v1.multiplyByMatrix(newM)) }"/>
  </div>
  <div id="details-text">
    Projection is...
  </div>
</template>

<style lang="scss" scoped>

</style>
