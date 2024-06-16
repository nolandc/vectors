import {onMounted, onUnmounted} from 'vue'
import SVGInteractivePoint from '../SVGInteractivePoint';
import SVG from 'svg.js'
import Grid from '../grid';
import Vector from '../vector';

export function usePointSelection(context: SVG.Doc, grid: Grid) {

    let selectedPoint: SVGInteractivePoint|undefined

    const selectPoint = (point: SVGInteractivePoint) => { selectedPoint = point}

    onMounted(() => {
        context.on('mousemove', (e: MouseEvent) => {
            var bounds = (e.currentTarget as Element).getBoundingClientRect()
            let mx = e.clientX - bounds.left;
            let my = e.clientY - bounds.top;
    
            if (selectedPoint != undefined) {
                let newVec = grid.pxToUnit(new Vector(mx, my))
                if (!selectedPoint.vec.value.equals(newVec)) {
                  selectedPoint.update(newVec)
                }
            }
        })    
        
        context.on('mouseup', () => {
            selectedPoint = undefined
        })
    })

    onUnmounted(() => {
        context.off('mousemove')
        context.off('mouseup')
    })

  

    return { selectPoint, selectedPoint }
}
