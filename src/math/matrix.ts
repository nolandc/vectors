import Vector from "./vector";

class Matrix2x2 {
    a: number;
    b: number;
    c: number;
    d: number;

    constructor(a: number, b: number, c: number, d: number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    // Add another 2x2 matrix
    add(other: Matrix2x2): Matrix2x2 {
        const a = this.a + other.a;
        const b = this.b + other.b;
        const c = this.c + other.c;
        const d = this.d + other.d;
        return new Matrix2x2(a, b, c, d);
    }

    // Subtract another 2x2 matrix
    subtract(other: Matrix2x2): Matrix2x2 {
        const a = this.a - other.a;
        const b = this.b - other.b;
        const c = this.c - other.c;
        const d = this.d - other.d;
        return new Matrix2x2(a, b, c, d);
    }

    // Multiply by another 2x2 matrix
    multiply(other: Matrix2x2): Matrix2x2 {
        const a = this.a * other.a + this.b * other.c;
        const b = this.a * other.b + this.b * other.d;
        const c = this.c * other.a + this.d * other.c;
        const d = this.c * other.b + this.d * other.d;
        return new Matrix2x2(a, b, c, d);
    }

    // Calculate the determinant of the matrix
    determinant(): number {
        return this.a * this.d - this.b * this.c;
    }

    static interpolate(A: Matrix2x2, B: Matrix2x2, t: number): Matrix2x2 {
        const a = A.a * (1 - t) + B.a * t;
        const b = A.b * (1 - t) + B.b * t;
        const c = A.c * (1 - t) + B.c * t;
        const d = A.d * (1 - t) + B.d * t;
        return new Matrix2x2(a, b, c, d);
    }    

    // Get the matrix data
    getData(): { a: number, b: number, c: number, d: number } {
        return {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };
    }


    trace(): number {
        return this.a + this.d;
    }

    eigenvalues(): number[] {
        const T = this.trace();
        const D = this.determinant();
        const discriminant = T * T - 4 * D;
        return [
            (T + Math.sqrt(discriminant)) / 2,
            (T - Math.sqrt(discriminant)) / 2
        ];
    }

    eigenvectors(): Vector[] {
        const eigenvalues = this.eigenvalues();
        const [l1, l2] = this.eigenvalues()
        if (this.b === 0 && this.c === 0) {
            return [
                new Vector(1, 0),
                new Vector(0, 1)
            ]
        } else if (this.b !== 0) {
            return [
                new Vector(l1-this.d, this.b),
                new Vector(l2-this.d, this.b)
            ]   
        } else {
            return [
                new Vector(this.c, l1-this.a),
                new Vector(this.c, l2-this.a)
            ]
        }
    }

    findEigenvector(lambda: number): Vector {
        // Solving (A - lambda * I)v = 0
        // Leads to the system:
        // (a - lambda) * x + x2 * y = 0
        // b * x + (d - lambda) * y = 0

        // Assuming x = 1, solving for y when x2 is not zero
        if (this.c !== 0) {
            const y = -(this.a - lambda) / this.c;
            return new Vector(1, y);
        }

        // If x2 = 0, check b
        if (this.b !== 0) {
            const x = -(this.d - lambda) / this.b;
            return new Vector(x, 1);
        }

        // Handle special cases where direct solution might not be straightforward
        return new Vector(1, 0); // Choosing a default eigenvector when the above conditions don't apply
    }

    // Print the matrix in a readable format
    toString(): string {
        return `|${this.a} ${this.b}|\n|${this.c} ${this.d}|`;
    }
}

export default Matrix2x2