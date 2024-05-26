import Grid from "./grid"
import SVG from 'svg.js';
import Vector from "./vector";

let gridStrokeSize = 2
let lightGray = '#cccccc'
let darkGray = '#222222'

class SVGGrid {
    grid: Grid

    constructor(grid: Grid, context: SVG.Doc) {
        this.grid = grid

        // Treating all grids as squares (for now)
        let halfGridSize = grid.gridWidth/2

        for (let i = -halfGridSize; i <= halfGridSize; i++) {
            if (i == 0 || i == -halfGridSize || i == halfGridSize)
                continue;
            context
                .line(grid.vectorLineFromUnitVec(new Vector(-halfGridSize, i), new Vector(halfGridSize, i)))
                .stroke({color: lightGray, width: gridStrokeSize})
        }
    
        
        for (let i = -halfGridSize; i <= halfGridSize; i++) {
            if (i == 0 || i == -halfGridSize || i == halfGridSize)
                continue;
            context
                .line(grid.vectorLineFromUnitVec(new Vector(i, -halfGridSize), new Vector(i, halfGridSize)))
                .stroke({color: lightGray, width: gridStrokeSize})
        }
        
    
    
        // Draw middle lines last so they show up on top of backing grid lines
        //let midLine = gridSize / 2
        context.line(grid.vectorLineFromUnitVec(new Vector(0, -halfGridSize), new Vector(0, halfGridSize))).stroke({color: darkGray, width: gridStrokeSize})
        context.line(grid.vectorLineFromUnitVec(new Vector(-halfGridSize, 0), new Vector(halfGridSize, 0))).stroke({color: darkGray, width: gridStrokeSize}) 
            
    }
}

export default SVGGrid