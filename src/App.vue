<script setup lang="ts">
  import VectorInput from "./components/VectorInput.vue"

  import { Ref, ref } from 'vue'
  import Vector from "./vector";
  import Grid from "./grid";
  import SVGVector from "./SVGVector";
  import SVGGrid from "./SVGGrid";
  import SVG from 'svg.js'
  import SVGLine from "./SVGLine";
import SVGInteractivePoint from "./SVGInteractivePoint";

  let svg1: Ref<SVGVector|undefined> = ref()
  let svg2: Ref<SVGVector|undefined> = ref()
  let p1: Ref<SVGInteractivePoint|undefined> = ref()
  let p2: Ref<SVGInteractivePoint|undefined> = ref()


  function createVis() {
    let grid = new Grid(20, 20, 600, 600)
    let v1 = new Vector(3, 1)
    let v2 = new Vector(1, 3)    

    let selectedPoint: SVGInteractivePoint | undefined

    let draw = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')

    new SVGGrid(grid, draw)

    p1 = new SVGInteractivePoint(v1, grid, draw, (point) => {
      selectedPoint = point
    })

    p2 = new SVGInteractivePoint(v2, grid, draw, (point) => {
      selectedPoint = point
    })

    svg1.value = new SVGVector(v1, grid, draw, "v1")
      .color('#f94144')
      .attachToPoint(p1)

    svg2.value = new SVGVector(v2, grid, draw, "v2")
      .color('#43aa8b')
      .attachToPoint(p2)

    let sumSVG = new SVGVector(v1.plus(v2), grid, draw, "v1+v2")
      .color('#577590')
      .strokeDashArray('8')
      .onPointUpdate(p1, (vec) => {
        sumSVG.update(p2.vec.plus(vec))
      })
      .onPointUpdate(p2, (vec) => {
        sumSVG.update(p1.vec.plus(vec))
      })

    let svg1m = new SVGLine(v2, v1, grid, draw)
      .color('#cccccc')
      .strokeDashArray("10")
      .attachOriginToPoint(p1)
      .onPointUpdate(p2, (vec) => {
        svg1m.end(p1.vec.plus(vec))
      })
      .onPointUpdate(p1, (vec) => {
        svg1m.end(p2.vec.plus(vec))
      })

    let svg2m = new SVGLine(v1, v2, grid, draw)
      .color('#cccccc')
      .strokeDashArray("10")
      .attachOriginToPoint(p2)
      .onPointUpdate(p2, (vec) => {
        svg2m.end(p1.vec.plus(vec))
      })
      .onPointUpdate(p1, (vec) => {
        svg2m.end(p2.vec.plus(vec))
      })
    



    /*
    let updateComputedVecs = () => {
      if (svg1.value == undefined || svg2.value == undefined) return

      let v1plusv2 = svg1.value.vec.plus(svg2.value.vec)
      sumSVG.update(v1plusv2)
      svg1m.start(svg2.value.vec).end(v1plusv2)
      svg2m.start(svg1.value.vec).end(v1plusv2)
    }

    svg1.value.onChange({update: (vec) => {
      updateComputedVecs()
    }})

    svg2.value.onChange({update: (vec) => {
      updateComputedVecs()
    }})

    svg1.value.on('mousedown', function (vec) {
        selectedVector = vec
    })

    svg2.value.on('mousedown', function (vec) {
        selectedVector = vec
    })
    */

    draw.on('mousemove', (e: MouseEvent) => {
        var bounds = (e.currentTarget as Element).getBoundingClientRect()
        let mx = e.clientX - bounds.left;
        let my = e.clientY - bounds.top;

        if (selectedPoint != undefined) {
            let newVec = grid.pxToUnit(new Vector(mx, my))
            if (!selectedPoint.vec.equals(newVec)) {
              selectedPoint.update(newVec)
            }
        }
    })    
    
    draw.on('mouseup', () => {
        selectedPoint = undefined
    })
  }

  window.onload = () => {
      createVis()
  };

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      svg1.value = undefined
      svg2.value = undefined
    })
    import.meta.hot.accept(() => {
      createVis()
    })  
  }
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
      <div v-if="svg1 != undefined && svg2 != undefined">
        <VectorInput label="v1" color="#f94144" :vector="svg1.vec" @updated="v => p1?.update(v)"/>
        <VectorInput label="v2" color="#43aa8b" :vector="svg2.vec" @updated="v => p2?.update(v)"/>
        <VectorInput label="v1+v2" color="#577590" :vector="svg1.vec.plus(svg2.vec)" :editable="false"/>
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
