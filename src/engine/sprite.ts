import { Vector } from "./util/vector";
import { Size } from "./util/size";
import { TagManager } from "./manager/tag-manager";
import { SpriteCanvasRenderingContext2D } from "./renderer/sprite-canvas-rendering-context-2d";

export class Sprite {

    // Variables
    private _position: Vector;
    private _dimension: Size;
    private _tags: TagManager;
    private _update: ((context: SpriteCanvasRenderingContext2D) => void) | null;

    // Propriétés
    /**
     * Obtenir la position (x, y) du Sprite
     */
    public get position(): Vector {
        return this._position;
    }
    /**
     * Obtenir la dimension (largeur, hauteur) du Sprite
     */
    public get dimension(): Size {
        return this._dimension;
    }

    /**
     * Obtenir l'objet TagManager permettant la gestion des tags
     */
    public get tags(): TagManager {
        return this._tags;
    }

    /**
     * Obtenir/définir la fonction permettant la mise à jour de la frame
     */
    public get update(): ((context: SpriteCanvasRenderingContext2D) => void) | null {
        return this._update;
    }
    public set update(value: ((renderer: SpriteCanvasRenderingContext2D) => void) | null) {
        this._update = value;
    }

    /**
     * Constructeur
     * @param position Vecteur représentant les valeurs x et y du Sprite 
     * @param dimension Size représentant les valeurs largeur et hauteur du Sprite
     */
    constructor(position: Vector, dimension: Size) {
        this._position = position;
        this._dimension = dimension;
        this._tags = new TagManager();
        this._update = null;
    }

    /**
     * Affiche les contours du sprite
     */
    public debug(renderer: SpriteCanvasRenderingContext2D) {
        renderer.beginPath().strokeStyle('magenta').lineWidth(8).strokeRect();
    }

}