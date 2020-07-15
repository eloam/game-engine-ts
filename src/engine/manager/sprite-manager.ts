import { Sprite } from "../sprite";
import { SpriteCanvasRenderingContext2D } from "../renderer/sprite-canvas-rendering-context-2d";

export class SpriteManager {

    // Variables
    private _canvasContext: CanvasRenderingContext2D | null;
    private _sprites: Sprite[];

    /**
     * Constructeur
     */
    constructor(context: CanvasRenderingContext2D | null) {
        this._canvasContext = context;
        this._sprites = [];
    }

    // Fonctions
    /**
     * Ajouter un sprite
     * @param sprite Sprite à ajouter
     */
    public add(sprite: Sprite) {
        this._sprites.push(sprite);
    }

    /**
     * Retoure la liste des Sprites
     */
    public list(): Sprite[] {
        return this._sprites;
    }

    /**
     * Déclenche tous les événements Update des objets Sprite
     */
    public triggerUpdateEvents() {
        this._sprites.forEach(sprite => { 
            // Initialisation du l'objet permettant le rendu du Sprite
            const spriteCanvasRenderingContext2D: SpriteCanvasRenderingContext2D = new SpriteCanvasRenderingContext2D(this._canvasContext, sprite.position, sprite.dimension);
            // Appel de l'événement Update - Mise à jour du rendu du sprite
            sprite.update?.call(sprite, spriteCanvasRenderingContext2D);
            // Dispatch
            spriteCanvasRenderingContext2D.dispose();
         });
    }
}