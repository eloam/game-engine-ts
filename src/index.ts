import { GameCanvas } from "./engine/game-canvas";
import { Vector } from "./engine/util/vector";
import { Sprite } from "./engine/sprite";
import { Size } from "./engine/util/size";
import { SpriteCanvasRenderingContext2D } from "./engine/renderer/sprite-canvas-rendering-context-2d";

const game: GameCanvas = new GameCanvas(document.body, 1280, 720);
game.backgroundColor = "#eee";
//game.isDebugMode = true;

/*// Version 1
const sprite1 = new Sprite(new Vector(100, 150), new Size(300, 150));
sprite1.update = function(renderer: SpriteCanvasRenderingContext2D) {
    renderer.canvasContext!.fillStyle = 'green';
    renderer.canvasContext?.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    this.position.add(1,0);
}
sprite1.tags.add('player');
sprite1.tags.add('main-hero');
game.sprites.push(sprite1);

// Version 2
const sprite2 = new Sprite(new Vector(100, 300), new Size(300, 150));
sprite2.update = function(renderer: SpriteCanvasRenderingContext2D) {
    renderer.fillStyle('blue').fillRect();
    this.position.add(1,0);
}
sprite2.tags.add('player', 'main-hero');
game.sprites.push(sprite2);*/

// Version 3
const sprite2 = new Sprite(new Vector(500, 500), new Size(300, 150));
sprite2.update = function(renderer: SpriteCanvasRenderingContext2D) {
    renderer.fillStyle('blue').fillRect().beginPath().fillStyle('green').fillRect(50, 50);
    //this.position.add(1,0);
    this.debug(renderer);

    renderer.beginPath().restore().fillStyle('brown').fillRect(-150, -150, 50, 50);

    renderer.clearRect();

    this.debug(renderer);
    renderer.beginPath().restore().fillStyle('brown').fillRect(-30, -30, 50, 50).lineCap("butt");
}
//sprite2.tags.add('player', 'main-hero');
game.sprites.add(sprite2);


// Version vNext
/*sprite1.update = function() {
    this.renderer.fillStyle('green').fillRect().snapshot('player-frame-1');
    this.renderer.removeSnapshot('player-frame-1');
    var listSnapshots = this.renderer.snapshots;
    this.position.add(1,1);
}*/