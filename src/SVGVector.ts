import Vector from "./vector";


class SVGVector {
    origin: Vector
    vec: Vector

    constructor(_vec: Vector, _origin: Vector = new Vector(0, 0)) {
        this.origin = _origin
        this.vec = _vec
    }
}