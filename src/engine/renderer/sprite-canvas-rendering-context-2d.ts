import { Vector } from "../util/vector";
import { Size } from "../util/size";
import { Sprite } from "../sprite";
import { Measures } from "../util/measure";
import { Disposable } from "../util/dispose";

export class SpriteCanvasRenderingContext2D implements Disposable {

    // Variables
    private _canvasContext: CanvasRenderingContext2D | null;
    private _spritePosition: Vector;
    private _spriteDimension: Size;
    private _canvasContextPathSaveCount: number;

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
        this._canvasContextPathSaveCount = 0;

        this.initSprite();
    }

    /**
     * Initialisation du Sprite
     * Définit un rectangle transparant avec la propriété clip correspondant à la taille du Sprite, afin de pouvoir empêcher de dessiner en dehors
     */
    private initSprite() {
        this.save().beginPath().fillStyle('transparent').rect().fill().clip().closePath();
    }

    /**
     * Vérifie si positions et les dimensions sont comprises dans la zone délimitant le Sprite
     * @param position 
     * @param dimension 
     */
    private checkMeasures(x?: number, y?: number, width?: number, height?: number): Measures {

        // Gestion des valeurs undefined concernant les positions
        if (!x) {
            x = 0;
        }
        if (!y) {
            y = 0;
        }

        // Gestion des valeurs undefined concernant les dimensions
        if (!width) {
            width = this._spriteDimension.width;
        }
        if (!height) {
            height = this._spriteDimension.height;
        }

        // Calcul de la position absolu
        const absolutePosition: Vector = new Vector(x, y).addByVector(this._spritePosition);

        // On renseigne l'objet Size concernant les dimensions de l'objet qu'on souhaite dessiner
        const dimension: Size = new Size(width, height);

        // Retourne les mesures correctes concernant la réalisation du dessin dans le sprite courant
        return new Measures(absolutePosition, dimension);
    }

    public fillStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.fillStyle = value;
        return this;
    }

    public rect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y, width, height);
        this._canvasContext?.rect(measures.position.x, measures.position.y, measures.dimension.width, measures.dimension.height);
        return this;
    }

    /**
     * Remarque: On utilise pas la fonction fillRect() directement, car elle réalise la fonction beginPath() en fin de traitement ce qu'il la rend incompatible avec la fonction clip()
     */
    public fillRect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        this.rect(x, y, width, height);
        this.fill();
        return this;
    }

    public fill(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.fill();
        return this;
    }

    public beginPath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.beginPath();
        return this;
    }

    public closePath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.closePath();
        return this;
    }

    public clip(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.clip();
        return this;
    }

    public save(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.save();
        this._canvasContextPathSaveCount += 1;
        return this;
    }

    public restore(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.restore();
        this._canvasContextPathSaveCount -= 1;
        return this;
    }

    dispose(): void {
        while(this._canvasContextPathSaveCount > 0) { 
            this.restore();
        }
    }
}