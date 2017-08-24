import { clamp } from './utils/math-utils';

const RAND_COEFF = 0.2;

function computeSquareStepVal(td: Array<Array<number>>, x: number, y: number, gridSize: number): void {
    const boardSize = td.length - 1;

    let isOnBorder: boolean = false;
    let sum: number = 0;

    if (x === 0) {
        isOnBorder = true;
    } else {
        sum += td[x - gridSize][y];
    }

    if (x === boardSize) {
        isOnBorder = true;
    } else {
        sum += td[x + gridSize][y];
    }

    if (y === 0) {
        isOnBorder = true;
    } else {
        sum += td[x][y - gridSize];
    }

    if (y === boardSize) {
        isOnBorder = true;
    } else {
        sum += td[x][y + gridSize];
    }

    td[x][y] = clamp((isOnBorder ? (sum / 3) : (sum / 4)) + Math.random() * RAND_COEFF - RAND_COEFF * 0.5);
}

export function generateTerrain(size: number): Array<Array<number>> {
    const actualSize: number = size + 1;

    const td: Array<Array<number>> = [];
    for (let i: number = 0; i < actualSize; i++) {
        td.push([]);
    }

    // init corners
    td[0][0] = Math.random() * 0.5 + 0.25;
    td[0][actualSize - 1] = Math.random() * 0.5 + 0.25;
    td[actualSize - 1][0] = Math.random() * 0.5 + 0.25;
    td[actualSize - 1][actualSize - 1] = Math.random() * 0.5 + 0.25;

    let currSize: number = actualSize;
    
    while (currSize > 2) {
        // diamond step
        const stepSize: number = currSize - 1;

        for (let y1: number = 0; y1 < size; y1 += stepSize) {
            for (let x1: number = 0; x1 < size; x1 += stepSize) {
                const x2: number = x1 + stepSize;
                const y2: number = y1 + stepSize;
                const xCenter: number = (x1 + x2) / 2;
                const yCenter: number = (y1 + y2) / 2;

                td[xCenter][yCenter] = 
                    clamp((td[x1][y1] + td[x1][y2] + td[x2][y1] + td[x2][y2]) / 4 + Math.random() * RAND_COEFF - RAND_COEFF * 0.5);
            }
        }

        const halfStepSize = stepSize / 2;

        // square step
        for (let y1: number = 0; y1 <= size; y1 += halfStepSize) {
            const yBegin: number = ((y1 / halfStepSize) % 2 === 0) ? halfStepSize : 0;

            for (let x1: number = yBegin; x1 <= size; x1 += stepSize) {
                computeSquareStepVal(td, x1, y1, stepSize / 2);
            }
        }

        currSize = (currSize + 1) / 2;
    }

    return td;
}