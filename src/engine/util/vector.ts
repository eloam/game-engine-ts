import { MathUtil } from "./math-util";

export class Vector {

    // Variables
    private _x: number;
    private _y: number;

    // Propriétés
    /**
     * Obtenir/définir la valeur de l'abscisse
     */
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
    
    /**
     * Obtenir/définir la valeur de l'ordonnée
     */
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }

    /**
     * Obtenir la longeur du vecteur
     */
    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    /**
     * Obtenir la longeur du vecteur au carré
     */
    public get lengthSquared(): number {
        return Math.pow(this._x, 2) + Math.pow(this._y, 2);
    }

    /**
     * Constructeur
     * @param x Abscisse
     * @param y Ordonnée
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    // Méthodes
    /**
     * Normalise le vecteur, sa longeur devient égale à 1
     * Le vecteur résultant est appelé vecteur d'unité
     * Un vecteur est normalisé en divisant le vecteur par sa propre longeur
     */
    public normalize(): Vector {
        const currentVectorLength: number = this.length;
        const decimalTruncate: number = 4;

        this._x = MathUtil.decimalRounding((1 / currentVectorLength) * this._x, decimalTruncate);
        this._y = MathUtil.decimalRounding((1 / currentVectorLength) * this._y, decimalTruncate);

        return this;
    }

    /**
     * Oppose la direction du vecteur
     */
    public negate(): Vector {
        this._x *= -1;
        this._y *= -1;

        return this;
    }

    /**
     * Ajoute l'abscisse et l'ordonnée au vecteur courant
     * @param vector Abscisse
     */
    public add(vector: Vector): Vector 
    /**
     * Ajoute l'abscisse et l'ordonnée au vecteur courant
     * @param x Abscisse
     * @param y Ordonnée
     */
    public add(x: number, y: number): Vector
    public add(p1: any, p2?: any): Vector {
        if (p1 instanceof Vector) {
            const vector: Vector = p1;
            this._x += vector.x;
            this._y += vector.y;
        } else {
            this._x += p1;
            this._y += p2;
        }
        return this;
    }

    /**
     * Soustrait l'abscisse et l'ordonnée du vecteur au vecteur courant
     * @param vector Objet de type Vector
     */
    public subtract(vector: Vector): Vector
    /**
     * Soustrait l'abscisse et l'ordonnée au vecteur courant
     * @param x Abscisse
     * @param y Ordonnée
     */
    public subtract(x: number, y: number): Vector
    public subtract(p1: any, p2?: any): Vector {
        if (p1 instanceof Vector) {
            const vector: Vector = p1;
            this._x -= vector.x;
            this._y -= vector.y;
        } else {
            this._x -= p1;
            this._y -= p2;
        }
        return this;
    }
    
    /**
     * Multiplie l'abscisse et l'ordonnée du vecteur au vecteur courant
     * @param vector Objet de type Vector
     */
    public multiply(vector: Vector): Vector
    /**
     * Multiplie l'abscisse et l'ordonnée au vecteur courant
     * @param x Abscisse
     * @param y Ordonnée
     */
    public multiply(x: number, y: number): Vector
    public multiply(p1: any, p2?: any): Vector {
        if (p1 instanceof Vector) {
            const vector: Vector = p1;
            this._x *= vector.x;
            this._y *= vector.y;
        } else {
            this._x *= p1;
            this._y *= p2;
        }
        return this;
    }

    /**
     * Divise l'abscisse et l'ordonnée du vecteur au vecteur courant
     * @param vector Objet de type Vector
     */
    public divide(vector: Vector): Vector
    /**
     * Divise l'abscisse et l'ordonnée au vecteur courant
     * @param x Abscisse
     * @param y Ordonnée
     */
    public divide(x: number, y: number): Vector
    public divide(p1: any, p2?: any): Vector {
        if (p1 instanceof Vector) {
            const vector: Vector = p1;
            this._x /= vector.x;
            this._y /= vector.y;
        } else {
            this._x /= p1;
            this._y /= p2;
        }
        return this;
    }

    /**
     * Vérifie que deux objets Vector sont identiques
     * @param vector Objet de type Vector
     */
    public equals(vector: Vector): boolean
    /**
     * Vérifie que deux objets Vector sont identiques
     * @param x Abscisse
     * @param y Ordonnée
     */
    public equals(x: number, y: number): boolean
    public equals(p1: any, p2?: any): boolean {
        if (p1 instanceof Vector) {
            const vector: Vector = p1;
            return this._x === vector.x && this._y === vector.y;
        } else {
            return this._x === p1 && this._y === p2;
        }
    }
}