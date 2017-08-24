import { generateTerrain } from './terrain-gen';
import { Renderer } from './renderer';
import { GameObject } from './game-object';

const TERRAIN_SIZE = 512;

class Main {
    renderer: Renderer;

    constructor() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');

        this.renderer = new Renderer(canvas);
        this.renderer.renderTerrain(generateTerrain(TERRAIN_SIZE));
    }
}

new Main();
