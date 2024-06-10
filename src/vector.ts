import SVG from 'svg.js';

class Vector {
    x: number;
    y: number;

    /*
    svgContext: SVG.Doc
    line: SVG.Line;
    leftArrowLine: SVG.Line;
    rightArrowLine: SVG.Line;
    */

    constructor(_x: number, _y: number) {
        this.x = _x
        this.y = _y
    }

    invertY() {
        return new Vector(this.x, this.y * -1)
    }

    plus(vec: Vector) {
        return new Vector(this.x + vec.x, this.y + vec.y)
    }

    minus(vec: Vector) {
        return new Vector(this.x - vec.x, this.y - vec.y)
    }

    times(scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    snap(size: number) {
        // (0, 0) => (0, 0)
        // (0.25, 0.25) => (0, 0)
        let multx = Math.round(this.x / size)
        let multy = Math.round(this.y / size)

        return new Vector(multx * size, multy * size)
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}


export default Vector