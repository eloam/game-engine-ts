import { Game2DCanvas } from "./engine/game-2d-canvas";
import { Vector } from "./engine/util/vector";
import { Sprite } from "./engine/sprite";
import { Size } from "./engine/util/size";

const game: Game2DCanvas = new Game2DCanvas(document.body, 800, 600);
game.backgroundColor = "#eee";
//game.isDebugMode = true;

const sprite1 = new Sprite(new Vector(10, 30), new Size(300, 150));
sprite1.update = function(context: CanvasRenderingContext2D | null) {
    context!.fillStyle = 'green';
    context?.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    this.position.add(1,1);
}
sprite1.tags.add('player', 'main-hero');

game.sprites.push(sprite1);

console.log(sprite1.tags.list());