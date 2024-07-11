

const MathUtils = {
    round: (num: number, digits: number = 3) => {
        //const factor = Math.pow(10, digits)
        //Math.round((Number(num) + Number.EPSILON) * factor) / factor
        return +num.toFixed(digits)
    },


    clamp: (value: number, min: number, max: number): number => {
        return Math.min(Math.max(value, min), max);
    }    
}

export default MathUtils
