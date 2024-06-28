import { Element } from "svg.js";
import Vector from "../math/vector";



declare module "svg.js" {
    interface Element {
        // Add your custom method signatures here
        attachToPoint(p: SVGInteractivePoint, f: (vec: Vector) => void): Element;
        attachToVector(v: Vector, f: (v: Vector) => void): Element // TODO
        removeMouseInteraction(): Element;
    }
}