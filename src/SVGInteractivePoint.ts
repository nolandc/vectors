// Class to create draggable points that other vectors can latch on to to auto-update vectors

import Grid from "./grid";
import Vector from "./vector";
import SVG from 'svg.js'


export default class SVGInteractivePoint {
    vec: Vector
    grid: Grid
    clickableCircle: SVG.Circle

    constructor(v: Vector, grid: Grid, context: SVG.Doc,  selected: (point: SVGInteractivePoint) => void) {
        this.vec = v
        this.grid = grid

        let pxVec = this.grid.unitToPx(v.invertY())

        this.clickableCircle = context.circle(35)
            .cx(pxVec.x).cy(pxVec.y)
            .fill('transparent').stroke({color: 'black'})
            .style({cursor: 'grab'})

        this.clickableCircle.on('mousedown',  () => {
            selected(this)
        })
    }

    update(v: Vector) {
        this.vec = v
        let pxVec = this.grid.unitToPx(v.invertY())
        this.clickableCircle.cx(pxVec.x).cy(pxVec.y)

        // Run the update things right here
    }
}