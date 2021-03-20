import { Vector } from "../util/vector";
import { Size } from "../util/size";
import { TagManager } from "../managers/tag-manager";
import { SpriteCanvasRenderingContext2D } from "../renderer/sprite-canvas-rendering-context-2d";
import { ColliderManager } from "../managers/collider-manager";

export class Sprite {

    // Variables
    private _pos: Vector;
    private _size: Size;
    private _tags: TagManager;
    private _canDestroy: boolean;
    private _colliders: ColliderManager;
    private _onCreate: ((context: SpriteCanvasRenderingContext2D) => void) | null;
    private _onUpdate: ((context: SpriteCanvasRenderingContext2D) => void) | null;
    private _onDelete: ((context: SpriteCanvasRenderingContext2D) => void) | null;
    private _onCollide: ((sprite: Sprite) => void) | null;

    // Propriétés
    /**
     * Obtenir la position (x, y) du Sprite
     */
    public get pos(): Vector {
        return this._pos;
    }
    /**
     * Obtenir la dimension (largeur, hauteur) du Sprite
     */
    public get size(): Size {
        return this._size;
    }

    /**
     * Obtenir l'objet TagManager permettant la gestion des tags
     */
    public get tags(): TagManager {
        return this._tags;
    }

    /**
     * Obtenir l'objet ColliderManager permettant la gestion des collisions
     */
    public get colliders(): ColliderManager {
        return this._colliders;
    }

    /**
     * Obtenir la valeur permettant d'indiquer si on peut supprimer cet objet Sprite
     */
    public get canDestroy(): boolean {
        return this._canDestroy;
    }

    /**
     * Obtenir/définir la fonction permettant la mise à jour de la frame
     */
    public get onCreate(): ((renderer: SpriteCanvasRenderingContext2D) => void) | null {
        return this._onCreate;
    }
    public set onCreate(value: ((renderer: SpriteCanvasRenderingContext2D) => void) | null) {
        this._onCreate = value;
    }

    /**
     * Obtenir/définir la fonction permettant la mise à jour de la frame
     */
    public get onUpdate(): ((renderer: SpriteCanvasRenderingContext2D) => void) | null {
        return this._onUpdate;
    }
    public set onUpdate(value: ((renderer: SpriteCanvasRenderingContext2D) => void) | null) {
        this._onUpdate = value;
    }

    /**
     * Obtenir/définir la fonction appelé à la suppression du Sprite
     */
    public get onDelete(): ((renderer: SpriteCanvasRenderingContext2D) => void) | null {
        return this._onDelete;
    }
    public set onDelete(value: ((renderer: SpriteCanvasRenderingContext2D) => void) | null) {
        this._onDelete = value;
    }

    /**
     * Obtenir/définir la fonction déclenchée à chaque frame lorsque deux Sprite sont en collisions
     */
    public get onCollide(): ((sprite: Sprite) => void) | null {
        return this._onCollide;
    }
    public set onCollide(value: ((renderer: Sprite) => void) | null) {
        this._onCollide = value;
    }

    /**
     * Constructeur
     * @param position Vecteur représentant les valeurs x et y du Sprite 
     * @param dimension Size représentant les valeurs largeur et hauteur du Sprite
     */
    
    constructor(position: Vector, dimension: Size) 
    constructor(width: number, height: number)
    constructor(x: number, y: number, width: number, height: number)
    constructor(p1: any, p2: any, p3?: any, p4?: any) {

        if (typeof p1 === "number" && typeof p2 === "number" && typeof p3 === "number" && typeof p4 === "number") {
            this._pos = new Vector(p1, p2);
            this._size = new Size(p3, p4);
        } else if (typeof p1 === "number" && typeof p2 === "number") {
            this._pos = new Vector(0, 0);
            this._size = new Size(p1, p2);
        } else if (p1 instanceof Vector && p2 instanceof Size) {
            this._pos = p1;
            this._size = p2;
        } else {
            this._pos = new Vector(0, 0);
            this._size = new Size(0, 0);
        }

        this._tags = new TagManager();
        this._colliders = new ColliderManager();
        this._canDestroy = false;
        this._onCreate = null;
        this._onUpdate = null;
        this._onDelete = null;
        this._onCollide = null;
    }

    /**
     * Affiche les contours du sprite
     */
    public debug(renderer: SpriteCanvasRenderingContext2D, borderWidth: number = 2) {
        renderer.beginPath().strokeStyle('magenta').lineWidth(borderWidth).strokeRect().closePath();
    }

    public destroy() {
        this._canDestroy = true;
    }
}