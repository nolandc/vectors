import { createApp } from 'vue'
import './style.css'
import SVG from 'svg.js';

import App from './App.vue'
import Vector from './vector';
import Grid from './grid';
import SVGVector from './SVGVector';
import SVGGrid from './SVGGrid';

createApp(App).mount('#app')


function createVis() {
    let grid = new Grid(20, 20, 600, 600)


    let selectedVector: SVGVector | undefined

    let draw = SVG(window.document.getElementById('chart') as HTMLElement).size('100%', '100%')

    let svgGrid = new SVGGrid(grid, draw)


    let svg1 = new SVGVector(new Vector(3, 1), "v1", grid, draw)
    let svg2 = new SVGVector(new Vector(1, 3), "v2", grid, draw, new Vector(0, 0), 'green')

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
            console.log(' new vec', newVec)
            selectedVector.update(newVec)
        }
    })
    
    draw.on('mouseup', () => {
        selectedVector = undefined
    })
}


window.onload = (event) => {
    createVis()
};