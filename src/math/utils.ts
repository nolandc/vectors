

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
        // Convert to fixed precision, but remove trailing zeros
        let formatted = Math.abs(num).toFixed(decimalPlaces).replace(/\.?0+$/, "");
        
        // If the number is an integer, ensure we don't add a decimal point
        if (Number.isInteger(num)) {
            formatted = Math.abs(num).toString();
        }
        
        const sign = num < 0 ? '-' : '';
        
        return sign + formatted;
    }
}

export default MathUtils
