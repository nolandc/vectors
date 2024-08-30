import Matrix2x2 from './matrix';

class Vector {
  x: number;
  y: number;

  constructor(_x: number, _y: number) {
    this.x = _x
    this.y = _y
  }

  set(newVec: Vector) {
    this.x = newVec.x
    this.y = newVec.y
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

  unit() {
    return this.divided(this.length())
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

  multiplyByMatrix(matrix: Matrix2x2): Vector {
    const newX = matrix.a * this.x + matrix.c * this.y;
    const newY = matrix.b * this.x + matrix.d * this.y;
    return new Vector(newX, newY);
  }

  clamp(min: Vector, max: Vector): Vector {
    const clampedX = Math.max(min.x, Math.min(this.x, max.x));
    const clampedY = Math.max(min.y, Math.min(this.y, max.y));
    return new Vector(clampedX, clampedY);
  }    

  abs() {
    return new Vector(
      Math.abs(this.x),
      Math.abs(this.y)
    )
  }

  sign(): Vector {
    // Using Math.sign() which returns 0, 1, or -1 based on the sign of the number
    return new Vector(Math.sign(this.x), Math.sign(this.y));
  }

  copySign(signVector: Vector) {
    return new Vector(this.x * signVector.x, this.y * signVector.y)
  }

  
  /* 
    Find intersection of square defined by:
    minimum corner of -bounds and
    maximum corner of bounds
  */
  intersectWithSquare(bounds: Vector) {
    const v = this.abs()
    let newV = v

    if (v.x < bounds.x && v.y < bounds.y) return this

    if (v.x > v.y) {
      // If x > y, take projection of (box.x, 0) onto v1
      const scale = v.x / bounds.x
      newV = new Vector(bounds.x, v.divided(scale).y)
    } else if (v.x < v.y) {
      const scale = v.y / bounds.y
      newV = new Vector(v.divided(scale).x, bounds.y)
    } else {
      newV = bounds
    }

    return newV.copySign(this.sign())
  }
}


export default Vector