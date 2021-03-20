export class Size {

    // Variables
    private _width: number;
    private _height: number;

    // Propriétés
    /**
     * Obtenir la largeur
     */
    public get w(): number {
        return this._width;
    }
    public set w(value: number) {
        this._width = value;
    }

    /**
     * Obtenir / définir la hauteur
     */
    public get h(): number {
        return this._height;
    }
    public set h(value: number) {
        this._height = value;
    }

    /**
     * Constructeur
     * @param width Largeur
     * @param height Hauteur
     */
    constructor(width: number, height: number) {
        this._width = Math.round(width);
        this._height = Math.round(height);
    }
  
    // Méthodes
    /**
     * Vérifie que deux objets Size sont identiques
     * @param size Objet de type Size
     */
    public equals(size: Size): boolean
        /**
     * Vérifie que deux objets Size sont identiques
     * @param width Largeur
     * @param height Hauteur
     */
    public equals(width: number, height: number): boolean
    public equals(p1: any, p2?: any): boolean {
        if (p1 as Size) {
            const size: Size = p1;
            return this._width === size.w && this._height === size.h;
        } else {
            return this._width === p1 && this._height === p2;
        }
    }
}