export class Size {

    // Variables
    private _width: number;
    private _height: number;

    // Propriétés
    /**
     * Obtenir la largeur
     */
    public get width(): number {
        return this._width;
    }
    /**
     * Obtenir la hauteur
     */
    public get height(): number {
        return this._height;
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
     * @param width Largeur
     * @param height Hauteur
     */
    public equals(width: number, height: number): boolean {
        return this._width === width && this._height === height;
    }

    /**
     * Vérifie que deux objets Size sont identiques
     * @param size Objet de type Size
     */
    public equalsBySize(size: Size): boolean {
        return this._width === size.width && this._height === size.height;
    }
}