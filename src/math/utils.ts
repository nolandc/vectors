

const MathUtils = {
    round: (num: number, digits: number = 3) => {
        //const factor = Math.pow(10, digits)
        //Math.round((Number(num) + Number.EPSILON) * factor) / factor
        return +num.toFixed(digits)
    },


    clamp: (value: number, min: number, max: number): number => {
        return Math.min(Math.max(value, min), max);
    },

    formatWithPadding: (num: number, decimalPlaces: number): string => {
        const formatted = Math.abs(num).toFixed(decimalPlaces);
        const sign = num < 0 ? '-' : '';
        return sign + formatted.padStart(decimalPlaces + 2, '\u2007'); // Figure space for padding
      }
}

export default MathUtils
