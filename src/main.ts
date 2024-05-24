import { createApp } from 'vue'
import './style.css'
import SVG from 'svg.js';

import App from './App.vue'
import Vector from './vector';
import Grid from './grid';

createApp(App).mount('#app')

let lightGray = '#cccccc'
let darkGray = '#222222'

function createVis() {
    let gridSize = 10

    let chartPxWidth = 600
    let chartPxHeight = 600


    let grid = new Grid(10, 10, 600, 600)

    let unitPxSize = chartPxHeight / gridSize

    let gridStrokeSize = 2
    let vectorStrokeSize = 3

    let draw = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')


    var gradient = draw.gradient('linear', function(add: SVG.Gradient) {
        add.at(0, '#333333')
        add.at(1, 'red')
      })

   // draw.rect(chartPxWidth, chartPxHeight).fill({ color: '#f00', opacity: 1 })
    for (let i = 0; i < gridSize+1; i++) {
        if (i == gridSize / 2)
            continue;
        draw
            .line([0, unitPxSize * i, chartPxWidth, unitPxSize * i])
            .stroke({color: lightGray, width: gridStrokeSize})
    }

    for (let i = 0; i < gridSize+1; i++) {
        if (i == gridSize / 2)
            continue;
        draw
            .line([unitPxSize * i, 0, unitPxSize * i, chartPxHeight])
            .stroke({color: lightGray, width: gridStrokeSize})
    }


    // Draw middle lines last so they show up on top of backing grid lines
    let midLine = gridSize / 2
    draw.line([0, unitPxSize * midLine, chartPxWidth, unitPxSize * midLine]).stroke({color: darkGray, width: gridStrokeSize})
    draw.line([unitPxSize * midLine, 0, unitPxSize * midLine, chartPxHeight]).stroke({color: darkGray, width: gridStrokeSize}) 


    let vec1 = new Vector(3, 1)
    
    let v1 = grid.unitToPx(vec1)

    let vecSVG = draw.group()

    //var markerPath = draw.path

    let arrow =draw.marker(10, 10, function(add) {
        add.path("M 0 8 L 5 4 L 0 0").stroke({color: 'red', width: 1}).fill('none')
      }).ref(5, 4)
    let mainArrow = draw
        .line(grid.lineFromUnitVec(vec1))
        .stroke({color: 'red', width: vectorStrokeSize})
        .marker('end', arrow)


    vecSVG.add(mainArrow)
}


window.onload = (event) => {
    createVis()
};