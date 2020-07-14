import { Vector } from "../util/vector";
import { Size } from "../util/size";
import { Sprite } from "../sprite";
import { Measures } from "../util/measure";

export class SpriteCanvasRenderingContext2D {

    // Variables
    private _canvasContext: CanvasRenderingContext2D | null;
    private _spritePosition: Vector;
    private _spriteDimension: Size;

    // Propriétés
    /**
     * Obtenir le context du canvas courant
     */
    public get canvasContext(): CanvasRenderingContext2D | null {
        return this._canvasContext;
    }

    /**
     * Constructeur
     */
    constructor(canvasContext: CanvasRenderingContext2D | null, position: Vector, dimension: Size) {
        this._canvasContext = canvasContext;
        this._spritePosition = position;
        this._spriteDimension = dimension;
    }

    /**
     * Vérifie si positions et les dimensions sont comprises dans la zone délimitant le Sprite
     * @param position 
     * @param dimension 
     */
    private checkMeasures(position?: Vector, dimension?: Size): Measures {

        // Gestion des valeurs undefined
        if (!position) {
            position = new Vector(0,0);
        }
        if (!dimension) {
            dimension = new Size(this._spriteDimension.width - position.x, this._spriteDimension.height - position.y);
        }

        // Création du vecteur contenant les positions absolues
        const absolutePosition: Vector = new Vector(0,0).addByVector(this._spritePosition).addByVector(position);
        
        // -- Vérification de la position
        // On vérifie si la position x est positionné dans les limites du Sprite
        if (absolutePosition.x < this._spritePosition.x) {
            absolutePosition.x = this._spritePosition.x;
        } else if (absolutePosition.x > this._spritePosition.x + this._spriteDimension.width) {
            absolutePosition.x = this._spritePosition.x + this._spriteDimension.width;
        }
        // On vérifie si la position y est positionné dans les limites du Sprite
        if (absolutePosition.y < this._spritePosition.y) {
            absolutePosition.y = this._spritePosition.y;
        } else if (absolutePosition.y > this._spritePosition.y + this._spriteDimension.height) {
            absolutePosition.y = this._spritePosition.y + this._spriteDimension.height;
        }

        // -- Vérification des dimensions
        // On vérifie si la largeur est définie et la position absolue reste dans les limites du Sprite
        if (dimension.width < 0) {
            dimension.width = 0;
        } else if (dimension.width > this._spriteDimension.width - position.x) {
            dimension.width = this._spriteDimension.width - position.x;
        }
        // On vérifie si la hauteur est définie et la position absolue reste dans les limites du Sprite
        if (dimension.height < 0) {
            dimension.height = 0;
        } else if (dimension.height > this._spriteDimension.height - position.y) {
            dimension.height = this._spriteDimension.height - position.y;
        }

        return new Measures(absolutePosition, dimension);
    }

    public fillStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.fillStyle = value;
        return this;
    }

    public fillRect(position?: Vector, dimension?: Size): SpriteCanvasRenderingContext2D {
        const spriteMeasures: Measures = this.checkMeasures(position, dimension);
        this._canvasContext?.fillRect(spriteMeasures.position.x, spriteMeasures.position.y, spriteMeasures.dimension.width, spriteMeasures.dimension.height);
        return this;
    }

    private test(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.fillRect
        return this;
    }
}