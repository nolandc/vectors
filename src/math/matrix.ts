class Matrix2x2 {
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    // Add another 2x2 matrix
    add(other: Matrix2x2): Matrix2x2 {
        const x1 = this.x1 + other.x1;
        const y1 = this.y1 + other.y1;
        const x2 = this.x2 + other.x2;
        const y2 = this.y2 + other.y2;
        return new Matrix2x2(x1, y1, x2, y2);
    }

    // Subtract another 2x2 matrix
    subtract(other: Matrix2x2): Matrix2x2 {
        const x1 = this.x1 - other.x1;
        const y1 = this.y1 - other.y1;
        const x2 = this.x2 - other.x2;
        const y2 = this.y2 - other.y2;
        return new Matrix2x2(x1, y1, x2, y2);
    }

    // Multiply by another 2x2 matrix
    multiply(other: Matrix2x2): Matrix2x2 {
        const x1 = this.x1 * other.x1 + this.y1 * other.x2;
        const y1 = this.x1 * other.y1 + this.y1 * other.y2;
        const x2 = this.x2 * other.x1 + this.y2 * other.x2;
        const y2 = this.x2 * other.y1 + this.y2 * other.y2;
        return new Matrix2x2(x1, y1, x2, y2);
    }

    // Calculate the determinant of the matrix
    determinant(): number {
        return this.x1 * this.y2 - this.y1 * this.x2;
    }

    // Get the matrix data
    getData(): { x1: number, y1: number, x2: number, y2: number } {
        return {
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2
        };
    }

    // Print the matrix in a readable format
    toString(): string {
        return `|${this.x1} ${this.y1}|\n|${this.x2} ${this.y2}|`;
    }
}

export default Matrix2x2