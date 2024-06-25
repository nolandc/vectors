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

  const grid = new Grid(6, 6, 600, 600)
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


  // TODO: attempt to use extensions elsewhere, see if they're a decent approach
  SVG.extend(SVG.Element, {
    attachToPoint: function(p: SVGInteractivePoint, f: (vec: Vector) => void) {
      p.onChange({
        update: (newVec) => f(newVec)
      })
      
      return this;
    }
  })

  let unit = v1.value.unit().invertY()

  const tri = props.context.polygon(
    grid.unitVectorsToPxVectors(
      [
        new Vector(0, 0), 
        new Vector(unit.x, 0), 
        new Vector(unit.x, unit.y)
      ]
    ).flatMap(v => [v.x, v.y])
  ).fill('#ebb7b7')
  .stroke({color: 'red', width: 3})
  .attachToPoint(p1, (v: Vector) => {
    let unit = v.unit().invertY()
    tri.attr('points', grid.unitVectorsToPxVectors(
      [
        new Vector(0, 0), 
        new Vector(unit.x, 0), 
        new Vector(unit.x, unit.y)
      ]
    ).flatMap(v => [v.x, v.y]))
  })


  const unitVec = grid.unitToPx(v1.value.unit().invertY())
  const unitPoint = props.context.circle(16)
    .cx(unitVec.x)
    .cy(unitVec.y)
    .fill('blue')
    .attachToPoint(p1, (v: Vector) => {
      const unitVec = grid.unitToPx(v.unit().invertY())
      unitPoint.cx(unitVec.x)
      unitPoint.cy(unitVec.y)
    })

</script>

<template>
  <div>
    <VectorInput label="v1" color="#f94144" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
    <VectorInput label="unit" color="blue" :vector="p1.vec.value.unit()" :editable="false"/>
  </div>
  <div id="details-text">
    Projection is...
  </div>
</template>

<style lang="scss" scoped>

</style>
