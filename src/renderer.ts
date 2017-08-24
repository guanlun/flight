export class Renderer {
    canvas: HTMLCanvasElement;
    // gl: WebGLRenderingContext;

    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        // this.gl = canvas.getContext('webgl');

        this.ctx = canvas.getContext('2d');
    }

    renderTerrain(terrainData: Array<Array<number>>) {
        for (let y: number = 0; y < terrainData.length; y++) {
            for (let x: number = 0; x < terrainData[y].length; x++) {
                const hexVal = Math.floor(terrainData[y][x] * 256).toString(16);
                this.ctx.fillStyle = `#${hexVal}${hexVal}${hexVal}`;
                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}