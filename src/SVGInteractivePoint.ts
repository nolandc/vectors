// Class to create draggable points that other vectors can latch on to to auto-update vectors

import Grid from "./grid";
import Vector from "./vector";
import SVG from 'svg.js'

interface PointListener {
    update(newVec: Vector): void;
}

export default class SVGInteractivePoint {
    vec: Vector
    grid: Grid
    clickableCircle: SVG.Circle
    listeners: PointListener[] = []

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

    onChange(l: PointListener) {
        this.listeners.push(l)
    }

    update(v: Vector) {
        this.vec = v
        let pxVec = this.grid.unitToPx(v.invertY())
        this.clickableCircle.cx(pxVec.x).cy(pxVec.y)

        // Run the update things right here
        this.listeners.forEach((l) => l.update(this.vec))
    }
}