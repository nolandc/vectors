import { Element } from "svg.js";


declare module '@svgdotjs/svg.js' {
    interface Element {
        // Add your custom method signatures here
        attachToPoint(p: SVGInteractivePoint, f: (vec: Vector) => void): Element;
        removeMouseInteraction(): void;
    }
}