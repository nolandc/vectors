import Grid from "./grid";
import Vector from "./vector";
import SVG from 'svg.js';

interface VectorListener {
    update(newVec: Vector): void;
}

class SVGVector {
    vOrigin?: Vector
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
    clickProxyCircle: SVG.Circle

    listeners: VectorListener[] = []

    constructor(vec: Vector, grid: Grid, context: SVG.Doc, label?: string) {
        this.context = context
        this.vec = vec

        this.label = label
        this.grid = grid
        this.arrow = this.context.marker(20, 20, (add) => {
            add.path("M 0 8 L 4 4 L 0 0").fill('none')
          }).ref(4, 4)

        this.line = this.context
          .line(this.grid.vectorLineFromUnitVec(this.vec))
          .stroke({color: this.lineColor, width: 3, linecap: 'round'})

        // TODO: move this to more accurately overlap the triangle
        this.clickProxyCircle = this.context
            .circle(35)
            .fill('transparent')//.stroke({color: 'black'})
            .style({cursor: 'grab'})
            .hide()

        if (label != undefined) {
            this.textBackground = this.context.rect(label.length * 12, 18).fill('white').attr('rx', 10)
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

    interactable(interactable: boolean) {
        this.isInteractable = interactable
        if (this.isInteractable) {
            this.line.style('pointer-events', 'auto')
            this.clickProxyCircle.show()
            this.line.reference('marker-end').style('pointer-events', 'auto')
            this.clickProxyCircle.on('mouseenter', () => {
                this.line.attr({'stroke-width': 4})
            })
    
            this.clickProxyCircle.on('mouseleave', () => {
                this.line.attr({'stroke-width': 3})
            })
        } else {
            this.clickProxyCircle.off('mouseenter').off('mouseleave').hide()
            this.line.style('pointer-events', 'none')
            this.line.reference('marker-end').style('pointer-events', 'none')
        }
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
        this.vec = newUnitVec
        let pxVec = this.grid.unitToPx(newUnitVec.invertY())
        this.line.attr({x2: pxVec.x, y2: pxVec.y})
        this.clickProxyCircle.cx(pxVec.x).cy(pxVec.y)

        let c = this.line.bbox()
        this.text?.cx(c.x + c.width/2).cy(c.y + c.height/2)
        this.textBackground?.cx(c.x + c.width/2).cy(c.y + c.height/2)

        this.listeners.forEach(l => l.update(newUnitVec))

        if (newUnitVec.length() < 2.5) {
            this.text?.attr('visibility', 'hidden')
            this.textBackground?.attr('visibility', 'hidden')
        } else {
            this.text?.attr('visibility', '')
            this.textBackground?.attr('visibility', '')
        }

        return this
    }

    onChange(l: VectorListener) {
        this.listeners.push(l)
    }
    
    on(event: string, on: (vec: SVGVector) => void) {
        this.clickProxyCircle.on(event, () => { on(this) }) 
        return this
    }
}

export default SVGVector