import {Sprite} from "../objects/sprite";
import {SpriteCanvasRenderingContext2D} from "../renderer/sprite-canvas-rendering-context-2d";

export class SpriteManager { // Variables
    private _canvasContext : CanvasRenderingContext2D | null;
    private _sprites : Sprite[];

    /**
     * Constructeur
     */
    constructor(context : CanvasRenderingContext2D | null) {
        this._canvasContext = context;
        this._sprites = [];
    }

    // Fonctions
    /**
     * Ajouter un sprite
     * @param sprite Sprite à ajouter
     */
    public add(sprite : Sprite): Sprite {
        this._sprites.push(sprite);
        // Appel de l'événement Create du Sprite - Création du rendu du sprite
        this.usingSpriteContext(sprite, (spriteContext) => sprite.onCreate?.call(sprite, spriteContext));
        return sprite;
    }

    /**
     * Supprimer un sprite
     * @param sprite Sprite à supprimer
     */
    public remove(sprite : Sprite): Sprite {
        this._sprites.splice(this._sprites.indexOf(sprite), 1);
        // Appel de l'événement Delete du Sprite - Suppression du sprite
        this.usingSpriteContext(sprite, (spriteContext) => sprite.onDelete?.call(sprite, spriteContext));
        return sprite;
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
    public updateAll() {
        this._sprites.forEach(sprite => { // Appel de l'événement Update du Sprite - Mise à jour du rendu du sprite
            this.usingSpriteContext(sprite, (spriteContext) => sprite.onUpdate?.call(sprite, spriteContext));
            this.checkSpriteColliders(sprite);
            if (sprite.canDestroy) {
                this.remove(sprite);
            }
        });
    }

    // wip
    public checkSpriteColliders(sprite : Sprite) {
        this._sprites.forEach(otherSprite => {
            if (sprite !== otherSprite && sprite.onCollide != null) {

                let isCollide = false;

                if (((sprite.pos.x >= otherSprite.pos.x && sprite.pos.x <= otherSprite.pos.x + otherSprite.size.w) 
                || (sprite.pos.x + sprite.size.w >= otherSprite.pos.x && sprite.pos.x + sprite.size.w <= otherSprite.pos.x + otherSprite.size.w))
                && ((sprite.pos.y >= otherSprite.pos.y && sprite.pos.y <= otherSprite.pos.y + otherSprite.size.h) 
                || (sprite.pos.y + sprite.size.h >= otherSprite.pos.y && sprite.pos.y + sprite.size.h <= otherSprite.pos.y + otherSprite.size.h))) {
                    // Dans le cas ou le sprite est plus grand que otherSprite
                  isCollide = true;  
                } else if (((otherSprite.pos.x >= sprite.pos.x && otherSprite.pos.x <= sprite.pos.x + sprite.size.w) 
                || (otherSprite.pos.x + otherSprite.size.w >= sprite.pos.x && otherSprite.pos.x + otherSprite.size.w <= sprite.pos.x + sprite.size.w))
                && ((otherSprite.pos.y >= sprite.pos.y && otherSprite.pos.y <= sprite.pos.y + sprite.size.h) 
                || (otherSprite.pos.y + otherSprite.size.h >= sprite.pos.y && otherSprite.pos.y + otherSprite.size.h <= sprite.pos.y + sprite.size.h))) {
                    // Dans le cas ou otherSprite est plus grand que le sprite
                    isCollide = true;  
                }

                if (isCollide) {
                    sprite.onCollide.call(sprite, otherSprite);
                }
            }
        });
    }

    /**
     * Obtenir le context du Sprite
     * @param sprite 
     */
    private getSpriteCanvasRenderingContext2D(sprite : Sprite): SpriteCanvasRenderingContext2D {
        return new SpriteCanvasRenderingContext2D(this._canvasContext, sprite.pos, sprite.size);
    }

    /**
     * Appel le context du sprite, le callback et la fonction disposant le context
     * @param sprite 
     * @param callback 
     */
    private usingSpriteContext(sprite : Sprite, callback : (spriteContext : SpriteCanvasRenderingContext2D) => void) { // Initialisation du l'objet permettant le rendu du Sprite
        const spriteContext: SpriteCanvasRenderingContext2D = this.getSpriteCanvasRenderingContext2D(sprite);
        // Appel du callback
        callback?.call(this, spriteContext);
        // Dispatch
        spriteContext.dispose();
    }
}
