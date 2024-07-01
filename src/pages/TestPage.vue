<script setup lang="ts">
  import VectorInput from "../components/svg/LineView.vue"
  import { ComputedRef, PropType, computed, ref, watch } from 'vue'
  import Vector from "../math/vector.ts";
  import Grid from "../grid.ts";
  import SVGVector from "../SVGVector.ts";
  import SVGGrid from "../SVGGrid.ts";
  import SVG from 'svg.js'
  import SVGInteractivePoint from "../SVGInteractivePoint.ts";
  import { usePointSelection } from '../logic/usePointSelection.ts'
  import Colors from "../constants/Colors.ts";

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  let grid = new Grid(20, 20, 600, 600)
  let v1 = ref(new Vector(4, 1))

  let xvec = new Vector(3, 0)
  let yvec = new Vector(0, 3)

  let boxedVector: ComputedRef<Vector> = computed(() => {
    const v = v1.value.abs()
    let newV = v1.value
    
    if (v.x < 3 && v.y < 3) return v1.value

    if (v.x > v.y) {
      // If x > y, take projection of (box.x, 0) onto v1

      const scale = v.x / xvec.x
      newV = new Vector(xvec.x, v.divided(scale).y)
    } else if (v.x < v.y) {
      const scale = v.y / yvec.y
      newV = new Vector(v.divided(scale).x, yvec.y)
    } else {
      newV = new Vector(3, 3)
    }

    return newV.copySign(v1.value.sign())
  })

  watch(boxedVector, () => {
    svg4.update(boxedVector.value)
  })

  let { selectPoint } = usePointSelection(props.context, grid)

  new SVGGrid(grid, props.context)

  let p1 = new SVGInteractivePoint(v1, grid, props.context, selectPoint)

  let svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color(Colors.red)
    .attachToPoint(p1)

  let svg2 = new SVGVector(xvec, grid, props.context, "x")
    .color(Colors.green)

  let svg3 = new SVGVector(yvec, grid, props.context, "y")
    .color(Colors.blue)

  let svg4 = new SVGVector(boxedVector.value, grid, props.context)
    .color('black')

  let gridRect = grid.gridUnitsToPxUnits(new Vector(6, 6))
  let gridOrigin = grid.gridUnitsToPxUnits(grid.origin)
  let rect = props.context
    .rect(gridRect.x, gridRect.y)
    .cx(gridOrigin.x).cy(gridOrigin.y)
    .fill('transparent')
    .stroke({width: 2, color: Colors.blue})
    .style('pointer-events', 'none')


</script>

<template>
  <div>
    <VectorInput label="v1" :color="Colors.red" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
  </div>
  <div id="details-text">
    Projection is...
  </div>
</template>

<style lang="scss" scoped>

</style>
