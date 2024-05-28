import Grid from "./grid";
import Vector from "./vector";
import SVG from 'svg.js';

class SVGLine {
    from?: Vector
    to: Vector

    grid: Grid
    lineColor: string = 'red'
    context: SVG.Doc
    label?: string

    line: SVG.Line
    text?: SVG.Text
    textBackground?: SVG.Rect

    constructor(from: Vector, to: Vector, grid: Grid, context: SVG.Doc, label?: string) {
        this.context = context
        this.from = from
        this.to = to
        this.label = label
        this.grid = grid

        this.line = this.context
          .line(this.grid.vectorLineFromUnitVec(this.from, to))
          .stroke({color: this.lineColor, width: 3})

        if (label != undefined) {
            this.textBackground = this.context.circle(25).fill('white')
            this.text = this.context
                .text(label)
                .style({'user-select': 'none'})
        }
        this.start(from).end(to)
    }

    color(color: string) {
        this.lineColor = color
        this.line.stroke({color: this.lineColor, width: 3})
        this.text?.fill(color)
        return this
    }

    strokeDashArray(strokeDashArray: string) {
        this.line.attr({'stroke-dasharray': strokeDashArray})
        return this
    }

    start(origin: Vector) {
        this.from = origin
        let points = this.grid.unitToPx(this.from.invertY())
        this.line.attr({x1: points.x, y1: points.y})
        return this
    }    

    end(to: Vector) {
        this.to = to
        let pxVec = this.grid.unitToPx(to.invertY())
        this.line.attr({x2: pxVec.x, y2: pxVec.y})

        let c = this.line.bbox()
        this.text?.cx(c.x + c.width/2).cy(c.y + c.height/2)
        this.textBackground?.cx(c.x + c.width/2).cy(c.y + c.height/2)

        return this
    }
}

export default SVGLine