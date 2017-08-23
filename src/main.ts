import { generateTerrain } from './terrain-gen';
import { GameObject } from './game-object';

class Main {
    public static main(): number {
        generateTerrain(16);

        return 0;
    }
}

Main.main();
