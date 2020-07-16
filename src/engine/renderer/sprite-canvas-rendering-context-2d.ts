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
        // Enregistre l'état complet du sprite, dans le but de pouvoir effectuer un restore() et annuler le clipping du sprite
        this._canvasContext?.save(); 
        // Création du rectangle représentant le sprite
        this.beginPath().fillStyle('transparent').rect().fill().clip().closePath();
        // Déplace le point de départ d'un nouveau sous-chemin vers les coordonnées absolue du sprite
        this.moveTo();
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

    //#region "Dessin de reactangles"

    public clearRect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y, width, height);
        this._canvasContext?.clearRect(measures.position.x, measures.position.y, measures.dimension.width, measures.dimension.height);
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
    
    /**
     * Remarque: On utilise pas la fonction strokeRect() directement, car elle réalise la fonction beginPath() en fin de traitement ce qu'il la rend incompatible avec la fonction clip()
     */
    public strokeRect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        this.rect(x, y, width, height);
        this.stroke();
        return this;
    }

    //#endregion

    //#region "Desinner du texte"

    public fillText(text: string, x?: number, y?: number, maxWidth?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.fillText(text, measures.position.x, measures.position.y, maxWidth);
        return this;
    }

    public strokeText(text: string, x?: number, y?: number, maxWidth?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.strokeText(text, measures.position.x, measures.position.y, maxWidth);
        return this;
    }

    public measureText(text: string): TextMetrics {
        return this._canvasContext!.measureText(text);
    }

    //#endregion

    //#region "Styles de ligne"

    public lineWidth(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineWidth = value;
        return this;
    }

    public lineCap(value: CanvasLineCap): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineCap = value;
        return this;
    }

    public lineJoin(value: CanvasLineJoin): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineJoin = value;
        return this;
    }

    public miterLimit(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.miterLimit = value;
        return this;
    }

    public getLineDash(): number[] {
        return this._canvasContext!.getLineDash();
    }

    public setLineDash(value: number[]): SpriteCanvasRenderingContext2D {
        this._canvasContext?.setLineDash(value);
        return this;
    }

    public lineDashOffset(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineDashOffset = value;
        return this;
    }

    //#endregion

    //#region "Styles de text"

    public font(value: string): SpriteCanvasRenderingContext2D {
        this._canvasContext!.font = value;
        return this;
    }

    public textAlign(value: CanvasTextAlign): SpriteCanvasRenderingContext2D {
        this._canvasContext!.textAlign = value;
        return this;
    }

    public textBaseline(value: CanvasTextBaseline): SpriteCanvasRenderingContext2D {
        this._canvasContext!.textBaseline = value;
        return this;
    }

    public direction(value: CanvasDirection): SpriteCanvasRenderingContext2D {
        this._canvasContext!.direction = value;
        return this;
    }

    //#endregion

    //#region "Styles de remplissage et de contour"

    public fillStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.fillStyle = value;
        return this;
    }

    public strokeStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.strokeStyle = value;
        return this;
    }

    //#endregion

    //#region "Dégradés et motifs"

    public createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient {
        const measures1: Measures = this.checkMeasures(x0, y0);
        const measures2: Measures = this.checkMeasures(x1, y1);
        return this._canvasContext!.createLinearGradient(measures1.position.x, measures1.position.y, measures2.position.x, measures2.position.y);
    }

    public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient {
        const measures1: Measures = this.checkMeasures(x0, y0);
        const measures2: Measures = this.checkMeasures(x1, y1);
        return this._canvasContext!.createRadialGradient(measures1.position.x, measures1.position.y, r0, measures2.position.x, measures2.position.y, r1);
    }

    public createPattern(image: CanvasImageSource, repetition: string | null): CanvasPattern | null {
        return this._canvasContext!.createPattern(image, repetition);
    }

    //#endregion

    //#region "Ombres"

    public shadowBlur(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.shadowBlur = value;
        return this;
    }

    public shadowColor(value: string): SpriteCanvasRenderingContext2D {
        this._canvasContext!.shadowColor = value;
        return this;
    }

    public shadowOffsetX(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.shadowOffsetX = value;
        return this;
    }

    public shadowOffsetY(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.shadowOffsetY = value;
        return this;
    }

    //#endregion

    //#region "Chemins"

    public beginPath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.beginPath();
        return this;
    }

    public closePath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.closePath();
        return this;
    }

    public moveTo(x?: number, y?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.moveTo(measures.position.x, measures.position.y)
        return this;
    }

    public lineTo(x?: number, y?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.lineTo(measures.position.x, measures.position.y)
        return this;
    }

    public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): SpriteCanvasRenderingContext2D {
        const controlMeasures1: Measures = this.checkMeasures(cp1x, cp1y);
        const controlMeasures2: Measures = this.checkMeasures(cp2x, cp2y);
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.bezierCurveTo(
            controlMeasures1.position.x, controlMeasures1.position.y, 
            controlMeasures2.position.x, controlMeasures2.position.y,
            measures.position.x, measures.position.y);
        return this;
    }

    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): SpriteCanvasRenderingContext2D {
        const controlMeasures: Measures = this.checkMeasures(cpx, cpy);
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.quadraticCurveTo(
            controlMeasures.position.x, controlMeasures.position.y, 
            measures.position.x, measures.position.y);
        return this;
    }

    public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.arc(measures.position.x, measures.position.y, radius, startAngle, endAngle, anticlockwise);
        return this;
    }

    public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): SpriteCanvasRenderingContext2D {
        const measures1: Measures = this.checkMeasures(x1, y1);
        const measures2: Measures = this.checkMeasures(x2, y2);
        this._canvasContext?.arcTo(measures1.position.x, measures1.position.y, measures2.position.x, measures2.position.y, radius);
        return this;
    }

    public ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y);
        this._canvasContext?.ellipse(measures.position.x, measures.position.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        return this;
    }

    public rect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.checkMeasures(x, y, width, height);
        this._canvasContext?.rect(measures.position.x, measures.position.y, measures.dimension.width, measures.dimension.height);
        return this;
    }

    //#endregion
    

    //#region "Tracés de chemin"

    public fill(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.fill();
        return this;
    }

    public stroke(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.stroke();
        return this;
    }
 
    /*public drawFocusIfNeeded(element: Element): void
    public drawFocusIfNeeded(path: Path2D, element: Element): void {
        //this._canvasContext?.drawFocusIfNeeded(path, element);
        return this;
    }*/


  /*  drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    scrollPathIntoView(): void;
    scrollPathIntoView(path: Path2D): void;*/


    //#endregion


 



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
        if(this._canvasContextPathSaveCount > 0) { 
            this._canvasContext?.restore();
            this._canvasContextPathSaveCount -= 1;
        }
        return this;
    }

    dispose(): void {
        while(this._canvasContextPathSaveCount > 0) { 
            this.restore();
        }
        this._canvasContext?.restore();
    }
}