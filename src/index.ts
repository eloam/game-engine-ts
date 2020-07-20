import { GameCanvas } from "./engine/game-canvas";
import { Sprite } from "./engine/sprite";
import { SpriteCanvasRenderingContext2D } from "./engine/renderer/sprite-canvas-rendering-context-2d";

const game: GameCanvas = new GameCanvas(document.body, 1280, 720);
game.backgroundColor = '#eee';

const sprite3 = game.sprites.add(new Sprite(500, 500, 300, 150));
sprite3.update = function(renderer: SpriteCanvasRenderingContext2D) {
    renderer.fillStyle('blue').fillRect();
    this.position.x += 1;
    this.debug(renderer);
}