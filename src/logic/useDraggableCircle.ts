import {Ref, onMounted, onUnmounted, reactive} from 'vue'
import SVGInteractivePoint from '../SVGInteractivePoint';
import SVG from 'svg.js'
import Grid from '../grid';
import Vector from '../math/vector';


interface MouseDragListener {
    onChange: (point: SVGCircleElement, vec: Vector) => void
}

let selectedPoint: SVGCircleElement|undefined
let context: HTMLDivElement
let grid: Grid
const listeners: Set<MouseDragListener> = new Set()

function setupDraggableCircle(_context: HTMLDivElement, _grid: Grid) {
    context = _context
    grid = _grid
}

function selectPoint(point: SVGCircleElement) { 
    selectedPoint = point; console.log('sel', selectedPoint) 
}

function subscribeToMouseMove(listener: MouseDragListener) {
    listeners.add(listener);
}

function unsubscribeFromMouseMove(listener: MouseDragListener) {
    listeners.delete(listener);
}

const onMouseMoved = (e: MouseEvent) => {
    if (context == undefined) return;
    const boundsRect = new Vector(grid.gridHeight, grid.gridWidth).divided(2.0)

    let bounds = context.getBoundingClientRect()
    let x = e.clientX - bounds.left
    let y = e.clientY - bounds.top

    if (selectedPoint != undefined) {
        let newVec = grid.pxToGrid(new Vector(x, y))
            
        let clampedVec = newVec.intersectWithSquare(boundsRect)
        let sel = selectedPoint
        listeners.forEach(l => l.onChange(sel, clampedVec))
    } 
}

const onMouseReleased = () => {
    selectedPoint = undefined
}

document.addEventListener('mousemove', onMouseMoved)
document.addEventListener('mouseup', onMouseReleased)

export function useDraggableCircle() {
    return { selectPoint, onMouseReleased, subscribeToMouseMove, unsubscribeFromMouseMove, setupDraggableCircle }
}
