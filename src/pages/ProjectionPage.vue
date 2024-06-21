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

  let grid = new Grid(20, 20, 600, 600)
  let v1 = ref(new Vector(3, 1))
  let v2 = ref(new Vector(1, 3))

  let projection: ComputedRef<Vector> = computed(() => {
    return v1.value.projectOnto(v2.value)
  })

  let { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  let p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  let p2 = new SVGInteractivePoint(v2, grid, props.context, selectPoint)

  let svg2m = new SVGLine(v1.value, projection.value, grid, props.context)
    .color('#cccccc')
    .strokeDashArray("10")
    .attachOriginToPoint(p1)
    .onPointUpdate(p2, () => {
      svg2m.end(projection.value)
    })
    .onPointUpdate(p1, () => {
      svg2m.end(projection.value)
    })  

  let svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)

  let svg2 = new SVGVector(v2.value, grid, props.context, "v2")
    .color('#43aa8b')
    .attachToPoint(p2)

  let svg3 = new SVGVector(projection.value, grid, props.context, "p")
    .color('#577590')
    .onPointUpdate(p2, () => {
      svg3.update(projection.value)
    })
    .onPointUpdate(p1, () => {
      svg3.update(projection.value)
    })



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
    <VectorInput label="v2" color="#43aa8b" :vector="p2.vec.value" @updated="v => p2?.update(v)"/>
    <VectorInput label="p" color="#577590" :vector="projection" :editable="false"/>
  </div>
  <div id="details-text">
    Projection details
  </div>
</template>

<style lang="scss" scoped>

</style>
