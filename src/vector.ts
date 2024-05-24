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
}


export default Vector