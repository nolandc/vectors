<script setup lang="ts">
  import VectorInput from "../components/VectorInput.vue"
  import { PropType, Ref, onUnmounted, ref } from 'vue'
  import Vector from "../vector";
  import Grid from "../grid";
  import SVGVector from "../SVGVector";
  import SVGGrid from "../SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "../SVGLine";
  import SVGInteractivePoint from "../SVGInteractivePoint";

  const props = defineProps({
    context: {
      type: SVG.Doc as PropType<SVG.Doc>,
      required: true
    },
  })

  let grid = new Grid(20, 20, 600, 600)
  let v1 = ref(new Vector(3, 1))
  let v2 = ref(new Vector(1, 3))

  let selectedPoint: SVGInteractivePoint | undefined

  new SVGGrid(grid, props.context)

  let p1 = new SVGInteractivePoint(v1, grid, props.context, (point) => {
    selectedPoint = point
  })

  let p2 = new SVGInteractivePoint(v2, grid, props.context, (point) => {
    selectedPoint = point
  })

  let svg1 = new SVGVector(v1.value, grid, props.context, "v1")
    .color('#f94144')
    .attachToPoint(p1)

  let svg2 = new SVGVector(v2.value, grid, props.context, "v2")
    .color('#43aa8b')
    .attachToPoint(p2)

  let sumSVG = new SVGVector(p1.plus(p2.vec.value), grid, props.context, "v1+v2")
    .color('#577590')
    .strokeDashArray('8')
    .onPointUpdate(p1, (vec) => {
      sumSVG.update(p2.plus(vec))
    })
    .onPointUpdate(p2, (vec) => {
      sumSVG.update(p1.plus(vec))
    })

  let svg1m = new SVGLine(v2.value, v1.value.plus(v2.value), grid, props.context)
    .color('#cccccc')
    .strokeDashArray("10")
    .attachOriginToPoint(p2)
    .onPointUpdate(p2, (vec) => {
      svg1m.end(p1.plus(vec))
    })
    .onPointUpdate(p1, (vec) => {
      svg1m.end(p2.plus(vec))
    })

  let svg2m = new SVGLine(v1.value, v1.value.plus(v2.value), grid, props.context)
    .color('#cccccc')
    .strokeDashArray("10")
    .attachOriginToPoint(p1)
    .onPointUpdate(p2, (vec) => {
      svg2m.end(p1.plus(vec))
    })
    .onPointUpdate(p1, (vec) => {
      svg2m.end(p2.plus(vec))
    })

    props.context.on('mousemove', (e: MouseEvent) => {
        var bounds = (e.currentTarget as Element).getBoundingClientRect()
        let mx = e.clientX - bounds.left;
        let my = e.clientY - bounds.top;

        if (selectedPoint != undefined) {
            let newVec = grid.pxToUnit(new Vector(mx, my))
            if (!selectedPoint.vec.value.equals(newVec)) {
              selectedPoint.update(newVec)
            }
        }
    })    
    
    props.context.on('mouseup', () => {
        selectedPoint = undefined
    })
  
    onUnmounted(() => {
      props.context.children().forEach((c) => c.remove())
    })
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
  <div id="main">
    <div id="details" >
      <div>

      </div>
      <div v-if="p1 != undefined && p2 != undefined">
        <VectorInput label="v1" color="#f94144" :vector="p1.vec.value" @updated="v => p1?.update(v)"/>
        <VectorInput label="v2" color="#43aa8b" :vector="p2.vec.value" @updated="v => p2?.update(v)"/>
        <VectorInput label="v1+v2" color="#577590" :vector="p1.vec.value.plus(p2.vec.value)" :editable="false"/>
      </div>
      <div v-else>
        points are undefined i guess?
      </div>
      <div id="details-text">
        Notice how dotted gray vectors between v1/v2 and v1+v2 are the same magnitude as v1/v2. To add two vectors, you can imagine
        simply placing the origin of one vector at the end of another.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#nav {
  padding: 40px;
  background: #f2f2f2;

  .link {
    &.selected {
      a {
        text-decoration: underline;
      }
    }
    a {
      color: #333;
      &:hover {
        color:#666;
      }
    }
  }
}

#details {
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  #details-text {
    margin-top: auto;
  }
}
</style>
