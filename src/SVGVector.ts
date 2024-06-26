import SVGInteractivePoint from "./SVGInteractivePoint";
import Grid from "./grid";
import Vector from "./math/vector";
import SVG from 'svg.js';

class SVGVector {
    vOrigin: Vector
    grid: Grid
    vec: Vector
    lineColor: string = 'red'
    context: SVG.Doc
    label?: string

    isInteractable: boolean = false

    arrow: SVG.Marker
    line: SVG.Line
    text?: SVG.Text
    textBackground?: SVG.Rect

    constructor(vec: Vector, grid: Grid, context: SVG.Doc, label?: string) {
        this.context = context
        this.vOrigin = new Vector(0, 0)        
        this.vec = vec

        this.label = label
        this.grid = grid
        this.arrow = this.context.marker(20, 20, (add) => {
            add.path("M 0 8 L 4 4 L 0 0").fill('none')
          }).ref(4, 4)

        this.line = this.context
          .line(this.grid.vectorLineFromUnitVec(this.vec))
          .stroke({color: this.lineColor, width: 3, linecap: 'round'})
          .style('pointer-events', 'none')

        if (label != undefined) {
            this.textBackground = this.context.rect(Math.max(label.length * 12, 16), 16).fill('white').attr('rx', 10)
            this.text = this.context
                .text(label)
                .style({'user-select': 'none'})
        }

        this.line.marker('end', this.arrow)

       this.update(vec)      
    }

    color(color: string) {
        this.lineColor = color
        this.line.stroke({color: this.lineColor, width: 3})
        this.arrow.stroke({color: this.lineColor, width: 1})
        this.text?.fill(color)
        return this
    }

    origin(origin: Vector) {
        this.vOrigin = origin
        let points = this.grid.vectorLineFromUnitVec(this.vec, this.vOrigin)
        this.line.attr({x1: points[0], y1: points[1]})
        return this
    }

    strokeDashArray(strokeDashArray: string) {
        this.line.attr({'stroke-dasharray': strokeDashArray})
        return this
    }

    showArrow(show: boolean) {
        if (show) {
            this.line.reference('marker-end').stroke({width: 3})
        } else {
            this.line.reference('marker-end').stroke({width: 0})
        }
        return this
    }

    update(newUnitVec: Vector) {      
        console.log('udpating vec... so why aint it changing in the UI?')   
        this.vec = newUnitVec
        let pxVec = this.grid.unitToPx(newUnitVec.invertY())
        this.line.attr({x2: pxVec.x, y2: pxVec.y})

        let c = this.line.bbox()
        this.text?.cx(c.x + c.width/2).cy(c.y + c.height/2)
        this.textBackground?.cx(c.x + c.width/2).cy(c.y + c.height/2)

        if ((this.vec.length() * this.grid.unitPxSize) < 80) {
            this.text?.attr('visibility', 'hidden')
            this.textBackground?.attr('visibility', 'hidden')
        } else {
            this.text?.attr('visibility', '')
            this.textBackground?.attr('visibility', '')
        }

        return this
    }

    attachToPoint(point: SVGInteractivePoint) {
        point.onChange({
            update: (newVec) => this.update(newVec)
        })
        return this
    }

    attachOriginToPoint(point: SVGInteractivePoint) {
        point.onChange({
            update: (newVec) => this.origin(newVec)
        })
        return this
    }

    onPointUpdate(point: SVGInteractivePoint, update: (vec: Vector) => void) {
        point.onChange({
            update: update
        })
        return this        
    }
}

export default SVGVector