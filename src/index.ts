import { GameCanvas } from "./engine/game-canvas";
import { Sprite } from "./engine/objects/sprite";
import { SpriteCanvasRenderingContext2D } from "./engine/renderer/sprite-canvas-rendering-context-2d";

const game: GameCanvas = new GameCanvas(document.body, 1280, 720);
game.backgroundColor = '#eee';

const sprite = game.sprites.add(new Sprite(0, 0, 85, 100));
sprite.onUpdate = function(renderer: SpriteCanvasRenderingContext2D) {
    //this.debug(renderer);
    renderer.fillStyle('rgb(255, 255, 0)').arc(50, 50, 50, 0.25 * Math.PI, 1.25 * Math.PI, false).fill();
    renderer.beginPath().arc(50, 50, 50, 0.75 * Math.PI, 1.75 * Math.PI, false).fill();
    renderer.beginPath().fillStyle('rgb(0, 0, 0)').arc(50, 25, 10, 0, 2 * Math.PI, false).fill();

    if (this.pos.x < 1180) {
        this.pos.x +=  (this.pos.x + 1) * 0.05;
    }

/*
    animator.animate('pacman', { iterations: 3, duration: 1000 });
    animator.registerKeyframeAnimation('pacman', { iterations: Infinity, duration: 3000 }, [
        new KeyframeAnimation('0%', () => {
            renderer.beginPath().fillRect();
        })
    ]);*/
}

