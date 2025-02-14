import Vector from "./math/vector"

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
      this.snapIncrement = _snapIncrement
      // Graph must be divisible by 2 - eventually should allow origin to be specified
      this.origin = new Vector(this.gridWidth / 2, this.gridHeight / 2)

      this.pxWidth = pw;
      this.pxHeight = ph;
  
      // I just use height to calculate this. All units have to be square. I'll need to refactor this
      // later if we want a non-square grid.
      this.unitPxSize = this.pxHeight / this.gridHeight
  }

  setPixelSize(w: number, h: number) {
    this.pxWidth = w;
    this.pxHeight = h;

    // I just use height to calculate this. All units have to be square. I'll need to refactor this
    // later if we want a non-square grid.
    this.unitPxSize = this.pxHeight / this.gridHeight
  }


  gridToPx(vec: Vector): Vector {
      return new Vector(
          this.unitPxSize * (vec.x + this.origin.x), 
          this.unitPxSize * (vec.invertY().y + this.origin.y)
      )
  }
  
  gridUnitsToPxUnits(vec: Vector): Vector {
      return new Vector(
          this.unitPxSize * vec.x,
          this.unitPxSize * vec.invertY().y
      )
  }

  pxToGrid(vec: Vector) {
      return new Vector(
          (vec.x) / this.unitPxSize, 
          (vec.invertY().y) / this.unitPxSize
      )
          .minus(this.origin.invertY())
          .snap(this.snapIncrement)
  }

  unitVectorsToPxVectors(array: Array<Vector>) {
      return array.map(u => this.gridToPx(u))
  }

  pxLineFromGridVec(vec: Vector, origin: Vector = new Vector(0, 0)) {
      const originPx = this.gridToPx(origin)
      // All user-facing coordinates need to flip the y axis. 
      // I gotta gotta figure out a better solution for this tbh.        
      const vecPx = this.gridToPx(vec)
      return [
          originPx.x,
          originPx.y,
          vecPx.x,
          vecPx.y
      ]
  }

  minBounds() {
      return new Vector(-this.gridWidth/2.0, -this.gridHeight/2.0)
  }

  maxBounds() {
      return new Vector(this.gridWidth/2.0, this.gridHeight/2.0)
  }

  gridHorizontalLines() {
    const lines: number[][] = []
    const halfGridSize = this.gridWidth / 2.0

    for (let i = -halfGridSize; i <= halfGridSize; i++) {
        lines.push(
            this.pxLineFromGridVec(new Vector(-halfGridSize, i), new Vector(halfGridSize, i))
        )
    }
    
    return lines
  }

  gridVerticalLines() {
    const lines: number[][] = []
    const halfGridSize = this.gridHeight / 2.0

    for (let i = -halfGridSize; i <= halfGridSize; i++) {
        lines.push(
            this.pxLineFromGridVec(new Vector(i, -halfGridSize), new Vector(i, halfGridSize))
        )
    }

    return lines
  }  
}

export default Grid