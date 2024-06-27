import {onMounted, onUnmounted} from 'vue'
import SVGInteractivePoint from '../SVGInteractivePoint';
import SVG from 'svg.js'
import Grid from '../grid';
import Vector from '../math/vector';

export function usePointSelection(context: SVG.Doc, grid: Grid) {

    let selectedPoint: SVGInteractivePoint|undefined

    const selectPoint = (point: SVGInteractivePoint) => { selectedPoint = point }

    const boundsRect = new Vector(grid.gridHeight, grid.gridWidth).divided(2.0)

    const onMouseMoved = (e: MouseEvent) => {
        let bounds = context.parent().getBoundingClientRect()
        let x = e.clientX - bounds.left
        let y = e.clientY - bounds.top

        if (selectedPoint != undefined) {
            let newVec = grid.pxToGrid(new Vector(x, y))

            if (!selectedPoint.vec.value.equals(newVec)) {
                //let clampedVec = newVec.clamp(grid.minBounds(), grid.maxBounds())
                
                let clampedVec = newVec.intersectWithSquare(boundsRect)
                selectedPoint.update(clampedVec)
            }
        } 
    }

    const onMouseReleased = () => {
        selectedPoint = undefined
    }

    onMounted(() => {
        document.addEventListener('mousemove', onMouseMoved)
        document.addEventListener('mouseup', onMouseReleased)
    })

    onUnmounted(() => {
        document.removeEventListener('mousemove', onMouseMoved)
        document.removeEventListener('mouseup', onMouseReleased)
    })

    return { selectPoint, selectedPoint }
}
