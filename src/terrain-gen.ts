const RAND_COEFF = 0.2;

function computeSquareStepVal(td: Array<Array<number>>, x: number, y: number, gridSize: number) {
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

    td[x][y] = (isOnBorder ? (sum / 3) : (sum / 4)) + Math.random() * RAND_COEFF - RAND_COEFF * 0.5;
}

function helper(td: Array<Array<number>>, x1: number, y1: number, size: number) {
    if (size === 2) {
        return;
    }

    // TODO: 
    const boardSize: number = td.length - 1;

    let currSize: number = size;

    while (currSize > 2) {
        // diamond step
        const stepSize: number = currSize - 1;

        for (let x1: number = 0; x1 < boardSize; x1 += stepSize) {
            for (let y1: number = 0; y1 < boardSize; y1 += stepSize) {
                const x2: number = x1 + stepSize;
                const y2: number = y1 + stepSize;
                const xCenter: number = (x1 + x2) / 2;
                const yCenter: number = (y1 + y2) / 2;

                td[xCenter][yCenter] = 
                    (td[x1][y1] + td[x1][y2] + td[x2][y1] + td[x2][y2]) / 4 + Math.random() * RAND_COEFF - RAND_COEFF * 0.5;
            }
        }

        const halfStepSize = stepSize / 2;

        // square step
        for (let x1: number = 0; x1 <= boardSize; x1 += halfStepSize) {
            const yBegin: number = ((x1 / halfStepSize) % 2 === 0) ? halfStepSize : 0;

            for (let y1: number = yBegin; y1 <= boardSize; y1 += stepSize) {
                console.log(x1, y1);
                computeSquareStepVal(td, x1, y1, stepSize / 2);
            }
        }

        currSize = (currSize + 1) / 2;
    }
}

export function generateTerrain(size: number) {
    const actualSize: number = size + 1;

    const terrainData: Array<Array<number>> = [];
    for (let i: number = 0; i < actualSize; i++) {
        terrainData.push([]);
    }

    terrainData[0][0] = Math.random();
    terrainData[0][actualSize - 1] = Math.random();
    terrainData[actualSize - 1][0] = Math.random();
    terrainData[actualSize - 1][actualSize - 1] = Math.random();

    helper(terrainData, 0, 0, actualSize);

    console.log(terrainData);
    for (let i = 0; i < actualSize; i++) {
        console.log(terrainData[i].map((x) => x.toFixed(2)).join(' '));
    }
}