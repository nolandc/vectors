<script setup lang="ts">
  import VectorInput from "../components/VectorInput.vue"
  import { ComputedRef, PropType, Ref, computed, onUnmounted, ref } from 'vue'
  import Vector from "../vector";
  import Grid from "../grid";
  import SVGVector from "../SVGVector";
  import SVGGrid from "../SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "../SVGLine";
  import SVGInteractivePoint from "../SVGInteractivePoint";
  import { usePointSelection } from '../logic/PointSelection.ts'

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  const grid = new Grid(10, 10, 600, 600)
  const v1 = ref(new Vector(3, 1))

  const { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  const p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  const svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)


  const origin = grid.unitToPx(new Vector(0, 0))

  const unitCircle = props.context.circle(grid.unitPxSize * 2)
    .cx(origin.x)
    .cy(origin.y)
    .stroke({width: 1, color: 'black'})
    .fill('transparent')

  SVG.extend(SVG.Element, {
    attachToPoint: function(p: SVGInteractivePoint, f: (p: SVGInteractivePoint, vec: Vector) => void) {
      p.onChange({
        update: (newVec) => f(p, newVec)
      })
      
      return this;
    }
  })

  const unitVec = grid.unitToPx(v1.value.unit().invertY())
  const unitPoint = props.context.circle(16)
    .cx(unitVec.x)
    .cy(unitVec.y)
    .fill('red')
    .attachToPoint(p1, (p: SVGInteractivePoint, v: Vector) => {
      const unitVec = grid.unitToPx(p1.vec.value.unit().invertY())
      unitPoint.cx(unitVec.x)
      unitPoint.cy(unitVec.y)
    })

</script>

<template>
  <div>
    <VectorInput label="v1" color="#f94144" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
  </div>
  <div id="details-text">
    Projection is...
  </div>
</template>

<style lang="scss" scoped>

</style>
