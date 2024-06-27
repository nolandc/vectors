<script setup lang="ts">
  import VectorInput from "../components/VectorInput.vue"
  import { PropType, Ref, onUnmounted, ref } from 'vue'
  import Vector from "../math/vector.ts";
  import Grid from "../grid";
  import SVGVector from "../SVGVector";
  import SVGGrid from "../SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "../SVGLine";
  import SVGInteractivePoint from "../SVGInteractivePoint";
  import { usePointSelection } from '../logic/usePointSelection.ts'

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  let grid = new Grid(20, 20, 600, 600)
  let v1 = ref(new Vector(3, 1))
  let v2 = ref(new Vector(1, 3))

  let { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  let p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  let p2 = new SVGInteractivePoint(v2, grid, props.context, selectPoint)

  let shape = props.context.polygon(
    grid.unitVectorsToPxVectors(
      [
        new Vector(0, 0), 
        v1.value.invertY(),
        v1.value.plus(v2.value).invertY(),
        v2.value.invertY(),
      ]
    ).flatMap(v => [v.x, v.y])    
  )
  .fill('gray')
  .removeMouseInteraction()
  .attachToPoint(p1, (v: Vector) => {
      const points = grid.unitVectorsToPxVectors(
        [
          new Vector(0, 0), 
          v1.value.invertY(),
          v1.value.plus(v2.value).invertY(),
          v2.value.invertY(),
        ]
      ).flatMap(v => [v.x, v.y])
      shape.attr('points', points)
    })

  let svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)

  let svg2 = new SVGVector(v2.value, grid, props.context, "v2")
    .color('#43aa8b')
    .attachToPoint(p2)

  let svg1m = new SVGLine(v2.value, v1.value.plus(v2.value), grid, props.context)
    .color('#cccccc')
    .attachOriginToPoint(p2)
    .onPointUpdate(p2, (vec) => {
      svg1m.end(p1.plus(vec))
    })
    .onPointUpdate(p1, (vec) => {
      svg1m.end(p2.plus(vec))
    })

  let svg2m = new SVGLine(v1.value, v1.value.plus(v2.value), grid, props.context)
    .color('#cccccc')
    .attachOriginToPoint(p1)
    .onPointUpdate(p2, (vec) => {
      svg2m.end(p1.plus(vec))
    })
    .onPointUpdate(p1, (vec) => {
      svg2m.end(p2.plus(vec))
    })


    onUnmounted(() => {
        let chart = document.getElementById('chart')
        if (chart != undefined) {
        //props.context.clear()
        }
    })

    console.log("setting up viz")


</script>

<template>
    <div>
      <VectorInput label="v1" color="#f94144" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
      <VectorInput label="v2" color="#43aa8b" :vector="p2.vec.value" @updated="v => p2?.update(v)"/>
    </div>
    <div id="details-text">
      Notice how dotted gray vectors between v1/v2 and v1+v2 are the same magnitude as v1/v2. To add two vectors, you can imagine
      simply placing the origin of one vector at the end of another.
    </div>
</template>

<style lang="scss" scoped>

</style>
