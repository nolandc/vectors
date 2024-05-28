<script setup lang="ts">
  import VectorInput from "./components/VectorInput.vue"

  import { Ref, ref } from 'vue'
  import Vector from "./vector";
  import Grid from "./grid";
  import SVGVector from "./SVGVector";
  import SVGGrid from "./SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "./SVGLine";

  const v1 = ref(new Vector(3, 1))
  const v2 = ref(new Vector(1, 3))
  let v1plusv2 = new Vector(4, 4)

  const svg1: Ref<SVGVector | null> = ref(null)
  const svg2: Ref<SVGVector | null> = ref(null)

  function createVis() {
    let grid = new Grid(20, 20, 600, 600)


    let selectedVector: SVGVector | undefined

    let draw = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')

    new SVGGrid(grid, draw)

    let svg1m = new SVGLine(v2.value, v1.value, grid, draw)
      .color('#cccccc')
      .strokeDashArray("10")

    let svg2m = new SVGLine(v1.value, v2.value, grid, draw)
      .color('#cccccc')
      .strokeDashArray("10")

    svg1.value = new SVGVector(v1.value, grid, draw, "v1")
      .color('#f94144')
      .interactable(true)

    svg2.value = new SVGVector(v2.value, grid, draw, "v2")
      .color('#43aa8b')
      .interactable(true)

    let sumSVG = new SVGVector(v1plusv2, grid, draw, "v1+v2")
      .color('#577590')
      .strokeDashArray('8')  

    let updateComputedVecs = () => {
      v1plusv2 = v1.value.plus(v2.value)
      sumSVG.update(v1plusv2)
      svg1m.start(v2.value).end(v1plusv2)
      svg2m.start(v1.value).end(v1plusv2)
    }

    svg1.value.onChange({update: (vec) => {
      console.log('vec changed...', vec)
      v1.value = vec
      updateComputedVecs()
    }})

    svg2.value.onChange({update: (vec) => {
      v2.value = vec
      updateComputedVecs()
    }})

    svg1.value.on('mousedown', function (vec) {
        selectedVector = vec
        console.log(selectedVector)
    })

    svg2.value.on('mousedown', function (vec) {
        selectedVector = vec
        console.log(selectedVector)
    })

    draw.on('mousemove', (e: MouseEvent) => {
        var bounds = (e.currentTarget as Element).getBoundingClientRect()
        let mx = e.clientX - bounds.left;
        let my = e.clientY - bounds.top;

        if (selectedVector != undefined) {
            let newVec = grid.pxToUnit(new Vector(mx, my))
            selectedVector.update(newVec)
        }
    })
    
    draw.on('mouseup', () => {
        selectedVector = undefined
    })

    updateComputedVecs()
  }

  window.onload = () => {
      createVis()
  };
</script>

<template>
  <div id="main">
    <div id="chart">
      
    </div>
    <div id="details" v-if="svg1 != undefined && svg2 != undefined">
      <VectorInput label="v1" :vector="v1" @updated="v => svg1?.update(v)"/>
      <VectorInput label="v2" :vector="v2" @updated="v => svg2?.update(v)"/>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#details {
  box-sizing: border-box;
  padding: 10px;
}
</style>
