import Vector from "./vector"

class Grid {
    gridWidth: number
    gridHeight: number
    pxWidth: number
    pxHeight: number
    snapIncrement: number

    unitPxSize: number
    origin: Vector

    constructor(w: number, h: number, pw: number, ph: number, _snapIncrement: number = 0.5) {
        this.gridWidth = w
        this.gridHeight = h
        this.pxWidth = pw
        this.pxHeight = ph

        this.snapIncrement = _snapIncrement
        // Graph must be divisible by 2 - eventually should allow origin to be specified
        this.origin = new Vector(this.gridWidth / 2, this.gridHeight / 2)

        // I just use height to calculate this. All units have to be square. I'll need to refactor this
        // later if we want a non-square grid.
        this.unitPxSize = this.pxHeight / this.gridHeight
    }


    unitToPx(vec: Vector): Vector {
        return new Vector(
            this.unitPxSize * (vec.x + this.origin.x), 
            this.unitPxSize * (vec.y + this.origin.y)
        )
    }

    pxToUnit(vec: Vector) {
        return new Vector(
            (vec.x) / this.unitPxSize, 
            (vec.y) / this.unitPxSize
        )
            .minus(this.origin)
            .invertY()
            .snap(this.snapIncrement)
    
    }


    vectorLineFromUnitVec(vec: Vector, origin: Vector = new Vector(0, 0)) {
        let originPx = this.unitToPx(origin.invertY())
        console.log('origin', originPx)
        // All user-facing coordinates need to flip the y axis. 
        // I gotta gotta figure out a better solution for this tbh.        
        let vecPx = this.unitToPx(vec.invertY())
        return [
            originPx.x,
            originPx.y,
            vecPx.x,
            vecPx.y
        ]
    }
}

export default Grid