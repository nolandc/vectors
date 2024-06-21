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

  let grid = new Grid(10, 10, 600, 600)
  let v1 = ref(new Vector(3, 1))
  let v2 = ref(new Vector(1, 3))

  let { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  let p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  let svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)


  let origin = grid.unitToPx(new Vector(0, 0))

  let circle = props.context.circle(grid.unitPxSize * 2)
    .cx(origin.x)
    .cy(origin.y)
    .stroke({width: 1, color: 'black'})
    .fill('transparent')

// TODO: genericize mount / unmount behavior for all visualizations
/*
  onMounted(() => {
    createVis()
  })  


  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      p1.value = undefined
      p2.value = undefined
    })
    import.meta.hot.accept(() => {
      createVis()
    })  
  }
  */
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
