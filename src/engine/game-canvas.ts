import { Sprite } from "./objects/sprite";
import { SpriteCanvasRenderingContext2D } from "./renderer/sprite-canvas-rendering-context-2d";
import { SpriteManager } from "./managers/sprite-manager";

export class GameCanvas {

    // Variables
    private _selector: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;
    private _isDebugMode: boolean;
    private _sprites: SpriteManager;

    // Propriétés
    /**
     * Obtenir/définir le selecteur auquel le canvas est rattaché
     */
    public get selector(): HTMLElement {
        return this._selector;
    }

    /**
     * Obtenir/définir le canvas
     */
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    /**
     * Obtenir/définir la largeur du canvas
     */
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = this.defineCanvasWidth(value);
    }

    /**
     * Obtenir/définir la hauteur du canvas
     */
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = this.defineCanvasHeight(value);
    }

    /**
     * Obtenir les sprites du canvas
     */
    public get sprites(): SpriteManager {
        return this._sprites;
    }

    /**
     * Obtenir/définir le mode de debug
     */
    public get isDebugMode(): boolean {
        return this._isDebugMode;
    }
    public set isDebugMode(value: boolean) {
        this._isDebugMode = value;
    }

    /**
     * Obtenir/définir la couleur d'arrière-plan du canvas
     */
    public get backgroundColor(): string {
        return this._canvas.style.backgroundColor;
    }
    public set backgroundColor(value: string) {
        this._canvas.style.backgroundColor = value;
    }

    /**
     * Constructeur
     * @param selector Selecteur dans lequel le canvas sera inséré dans le DOM
     * @param height La hauteur du canvas
     * @param width La largeur du canvas
     */
    constructor(selector: HTMLElement, width: number, height: number) {
        this._selector = selector;
        this._canvas = document.createElement('canvas');
        this._width = this.defineCanvasWidth(width);
        this._height = this.defineCanvasHeight(height);
        this._isDebugMode = false;
        this._sprites = new SpriteManager(this.getContext());

        this.init();
    }

    // Méthodes
    private init() {
        // Ajout du canvas dans le DOM
        this._selector.appendChild(this._canvas);
        // Affichage de la premiere frame du canvas
        this.updateFrame();
    }

    /**
     * Définit la hauteur du canvas
     * @param height La hauteur du canvas
     * @returns La hauteur du canvas
     */
    private defineCanvasHeight(height: number): number {
        this._canvas.height = height;
        return height;
    }

    /**
     * Définit la largeur du canvas
     * @param width La largeur du canvas
     * @returns La largeur du canvas
     */
    private defineCanvasWidth(width: number): number {
        this._canvas.width = width;
        return width;
    }

    /**
     * Dessine la frame du canvas
     */
    private updateFrame() {

        this.clearFrame();

        this.sprites.updateAll();

        requestAnimationFrame(this.updateFrame.bind(this));
    }

    /**
     * Supprime tous les éléments du canvas
     */
    private clearFrame() {
        this.getContext()?.clearRect(0, 0, this._width, this._height);
    }

    /**
     * Obtenir le context du canvas
     */
    public getContext(): CanvasRenderingContext2D | null {
        return this._canvas.getContext('2d');
    }
}
