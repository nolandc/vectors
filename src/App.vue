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
  const v1plusv2 = ref(new Vector(4, 4))

  let svg1: SVGVector | undefined
  let svg2: SVGVector | undefined

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

    svg1 = new SVGVector(v1, grid, draw, "v1")
      .color('#f94144')
      .interactable(true)

      console.log('app init selected', svg1.vec)
      console.log('app init selected value', svg1.vec.value)

    
    svg2 = new SVGVector(v2, grid, draw, "v2")
      .color('#43aa8b')
      .interactable(true)

      console.log('app init selected', svg2.vec)
      console.log('app init selected value', svg2.vec.value)


    let sumSVG = new SVGVector(v1plusv2, grid, draw, "v1+v2")
      .color('#577590')
      .strokeDashArray('8')  

    let updateComputedVecs = () => {
      v1plusv2.value = v1.value.plus(v2.value)
      sumSVG.update(v1plusv2.value)
      svg1m.start(v2.value).end(v1plusv2.value)
      svg2m.start(v1.value).end(v1plusv2.value)
    }

    svg1.onChange({update: (vec) => {
      updateComputedVecs()
    }})

    svg2.onChange({update: (vec) => {
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
          console.log('selected', selectedVector.vec)
          console.log('selected value', selectedVector.vec.value)
            let newVec = grid.pxToUnit(new Vector(mx, my))
            if (!selectedVector.vec.value.equals(newVec)) {
              selectedVector.update(newVec)
            }
            
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
    <div id="nav">
        <div class="link selected">
          <a href="#addition">addition</a>
        </div>
        <div class="link">
          <a href="#subtraction">subtraction</a>
        </div>
        <div class="link">
          <a href="#length">length</a>
        </div>                
    </div>
    <div id="chart">
      
    </div>
    <div id="details" >
      <VectorInput label="v1" color="#f94144" :vector="v1" @updated="v => svg1?.update(v)"/>
      <VectorInput label="v2" color="#43aa8b" :vector="v2" @updated="v => svg2?.update(v)"/>
      <VectorInput label="v1+v2" color="#577590" :vector="v1plusv2" :editable="false"/>
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
