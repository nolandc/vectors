import Grid from "./grid";
import Vector from "./vector";
import SVG from 'svg.js';


class SVGVector {
    origin: Vector
    grid: Grid
    vec: Vector
    color: string
    context: SVG.Doc
    label: string

    arrow: SVG.Marker
    line: SVG.Line
    text: SVG.Text
    textBackground: SVG.Rect

    clickProxyCircle: SVG.Circle

    constructor(vec: Vector, label: string, grid: Grid, context: SVG.Doc, origin: Vector = new Vector(0, 0), color: string = 'red') {
        this.context = context
        this.vec = vec
        this.label = label
        this.grid = grid
        this.origin = origin
        this.color = color

        this.arrow = this.context.marker(20, 20, (add) => {
            add.path("M 0 8 L 4 4 L 0 0").stroke({color: this.color, width: 1}).fill('none')
          }).ref(4, 4)

        this.line = this.context
          .line(this.grid.vectorLineFromUnitVec(this.vec))
          .stroke({color: this.color, width: 3})

        // TODO: move this to more accurately overlap the triangle
        this.clickProxyCircle = this.context
            .circle(35)
            .fill('transparent')//.stroke({color: 'black'})
            .style({cursor: 'grab'})

        this.clickProxyCircle.on('mouseenter', () => {
            this.line.attr({'stroke-width': 4})
        })

        this.clickProxyCircle.on('mouseleave', () => {
            this.line.attr({'stroke-width': 3})
        })

        // TODO: consolidate init code and update() call
        this.textBackground = this.context.circle(25).fill('white')
        this.text = this.context.text(label).fill(color)

        this.line.marker('end', this.arrow)

        this.update(vec)
    }

    update(newUnitVec: Vector) {
        this.vec = newUnitVec
        let pxVec = this.grid.unitToPx(newUnitVec.invertY())
        this.line.attr({x2: pxVec.x, y2: pxVec.y})
        this.clickProxyCircle.cx(pxVec.x).cy(pxVec.y)

        let c = this.line.bbox()
        this.text.cx(c.x + c.width/2).cy(c.y + c.height/2)
        this.textBackground.cx(c.x + c.width/2).cy(c.y + c.height/2)

    }
    
    on(event: string, on: (vec: SVGVector) => void) {
        this.clickProxyCircle.on(event, () => { on(this) }) 
        return this
    }
}

export default SVGVector