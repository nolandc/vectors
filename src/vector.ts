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

    divided(scalar: number) {
        return new Vector(this.x / scalar, this.y / scalar)
    }

    snap(size: number) {
        // (0, 0) => (0, 0)
        // (0.25, 0.25) => (0, 0)
        const multx = Math.round(this.x / size)
        const multy = Math.round(this.y / size)

        return new Vector(multx * size, multy * size)
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    equals(v2: Vector) {
        return this.x == v2.x && this.y == v2.y
    }

    dotProduct(v2: Vector) {
        return this.x * v2.x + this.y * v2.y
    }

    projectOnto(v2: Vector): Vector {
        console.log('is zero... ', v2.isZero(), v2)
        if (v2.isZero()) return new Vector(0, 0)
        // TODO: error handling for div/0?

        const scalarProj = this.dotProduct(v2) / v2.length()
        const unit = v2.divided(v2.length())

        return unit.times(scalarProj)
    }

    isZero(): boolean {
        return this.x == 0 && this.y == 0
    }
}


export default Vector