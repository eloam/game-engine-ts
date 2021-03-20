import {Vector} from "../util/vector";
import {Size} from "../util/size";

export class Collider { 
    // Variables
    private _position : Vector;
    private _dimension : Size;

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

    constructor(position : Vector, dimension : Size)
    constructor(width : number, height : number)
    constructor(x : number, y : number, width : number, height : number)
    constructor(p1 : any, p2 : any, p3? : any, p4? : any) {

        if (typeof p1 === "number" && typeof p2 === "number" && typeof p3 === "number" && typeof p4 === "number") {
            this._position = new Vector(p1, p2);
            this._dimension = new Size(p3, p4);
        } else if (typeof p1 === "number" && typeof p2 === "number") {
            this._position = new Vector(0, 0);
            this._dimension = new Size(p1, p2);
        } else if (p1 instanceof Vector && p2 instanceof Size) {
            this._position = p1;
            this._dimension = p2;
        } else {
            this._position = new Vector(0, 0);
            this._dimension = new Size(0, 0);
        }
    }
}

export class BoxCollider extends Collider {

    constructor(position : Vector, dimension : Size)
    constructor(width : number, height : number)
    constructor(x : number, y : number, width : number, height : number)
    constructor(p1 : any, p2 : any, p3? : any, p4? : any) {

        if (typeof p1 === "number" && typeof p2 === "number" && typeof p3 === "number" && typeof p4 === "number") {
            super(p1, p2, p3, p4);
        } else if (typeof p1 === "number" && typeof p2 === "number") {
            super(p1, p2);
        } else if (p1 instanceof Vector && p2 instanceof Size) {
            super(p1, p2);
        } else {
            super(0, 0, 0, 0);
        }
    }
}
