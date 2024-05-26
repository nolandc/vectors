<script setup lang="ts">
  import VectorInput from "./components/VectorInput.vue"

  import { ref } from 'vue'
  import Vector from "./vector";
  import Grid from "./grid";
  import SVGVector from "./SVGVector";
  import SVGGrid from "./SVGGrid";
  import SVG from 'svg.js'

  const v1 = ref(new Vector(3, 1))
  const v2 = ref(new Vector(1, 3))
  let v1plusv2 = new Vector(4, 4)

  function createVis() {
    let grid = new Grid(20, 20, 600, 600)


    let selectedVector: SVGVector | undefined

    let draw = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')

    new SVGGrid(grid, draw)

    let svg1m = new SVGVector(v1.value, grid, draw)
      .color('#cccccc')
      .origin(v2.value)
      .showArrow(false)
      .strokeDashArray("10")

    let svg2m = new SVGVector(v2.value, grid, draw)
      .color('#cccccc')
      .origin(v1.value)
      .interactable(false)
      .showArrow(false)
      .strokeDashArray("10")        

    let svg1 = new SVGVector(v1.value, grid, draw, "v1")
      .color('#f94144')
      .interactable(true)

    let svg2 = new SVGVector(v2.value, grid, draw, "v2")
      .color('#43aa8b')
      .interactable(true)

    let sumSVG = new SVGVector(v1plusv2, grid, draw, "v1+v2")
      .color('#577590')
      .strokeDashArray('8')  

    let updateComputedVecs = () => {
      v1plusv2 = v1.value.plus(v2.value)
      sumSVG.update(v1plusv2)
      svg1m.update(v1plusv2).origin(v2.value)
      svg2m.update(v1plusv2).origin(v1.value)
    }

    svg1.onChange({update: (vec) => {
      v1.value = vec
      updateComputedVecs()
    }})

    svg2.onChange({update: (vec) => {
      v2.value = vec
      updateComputedVecs()
    }})

    svg1.on('mousedown', function (vec) {
        selectedVector = vec
        console.log(selectedVector)
    })

    svg2.on('mousedown', function (vec) {
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
    <div id="details">
      <VectorInput label="v1" :vector="v1"/>
      <VectorInput label="v2" :vector="v2"/>
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
  padding: 10px;
}
</style>
