import { Vector } from "../util/vector";
import { Size } from "../util/size";
import { Sprite } from "../objects/sprite";
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
        this.beginPath().fillStyle('transparent').fillRect().clip();
        // Déplace le point de départ d'un nouveau sous-chemin vers les coordonnées absolue du sprite
        this.moveTo();
        // On reset le chemin
        this.beginPath();
    }

    /**
     * Vérifie si positions et les dimensions sont comprises dans la zone délimitant le Sprite
     * @param position 
     * @param dimension 
     */
    private getRelativesMeasures(x?: number, y?: number, width?: number, height?: number): Measures {

        // Gestion des valeurs undefined concernant les positions
        if (!x) {
            x = 0;
        }
        if (!y) {
            y = 0;
        }

        // Gestion des valeurs undefined concernant les dimensions
        if (!width) {
            width = this._spriteDimension.w;
        }
        if (!height) {
            height = this._spriteDimension.h;
        }

        // Calcul de la position absolu
        const absolutePosition: Vector = new Vector(x, y).add(this._spritePosition);

        // On renseigne l'objet Size concernant les dimensions de l'objet qu'on souhaite dessiner
        const dimension: Size = new Size(width, height);

        // Retourne les mesures correctes concernant la réalisation du dessin dans le sprite courant
        return new Measures(absolutePosition, dimension);
    }

    //#region CanvasCompositing

    public globalAlpha(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.globalAlpha = value;
        return this;
    }

    public globalCompositeOperation(value: string): SpriteCanvasRenderingContext2D {
        this._canvasContext!.globalCompositeOperation = value;
        return this;
    }

    //#endregion

    //#region CanvasDrawImage

    public drawImage(image: CanvasImageSource, dx: number, dy: number): SpriteCanvasRenderingContext2D
    public drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): SpriteCanvasRenderingContext2D
    public drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): SpriteCanvasRenderingContext2D
    public drawImage(p1: CanvasImageSource, p2: number, p3: number, p4?: number, p5?: number, p6?: number, p7?: number, p8?: number, p9?: number) {

        if (p1 != null && p2 != null && p3 != null && p4 != null && p5 != null && p6 != null && p7 != null && p8 != null && p9 != null) {
            const measures: Measures = this.getRelativesMeasures(p6, p7);
            this._canvasContext?.drawImage(p1, p2, p3, p4, p5, measures.pos.x, measures.pos.y, p8, p9);
        } else if (p1 != null && p2 != null && p3 != null && p4 != null && p5 != null) {
            const measures: Measures = this.getRelativesMeasures(p2, p3);
            this._canvasContext?.drawImage(p1, measures.pos.x, measures.pos.y, p4, p5);
        } else {
            const measures: Measures = this.getRelativesMeasures(p2, p3);
            this._canvasContext?.drawImage(p1, measures.pos.x, measures.pos.y);
        }

        return this;
    }

    //#endregion

    //#region CanvasDrawPath

    public beginPath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.beginPath();
        return this;
    }

    public clip(fillRule?: CanvasFillRule): SpriteCanvasRenderingContext2D
    public clip(path: Path2D, fillRule?: CanvasFillRule): SpriteCanvasRenderingContext2D
    public clip(p1: any, p2?: CanvasFillRule): SpriteCanvasRenderingContext2D {
        if (p1 instanceof Path2D && p2) {
            this._canvasContext?.clip(p1, p2);
        } else {
            this._canvasContext?.clip(p1);
        }

        return this;
    }

    public fill(fillRule?: CanvasFillRule): SpriteCanvasRenderingContext2D
    public fill(path: Path2D, fillRule?: CanvasFillRule): SpriteCanvasRenderingContext2D
    public fill(p1: any, p2?: any): SpriteCanvasRenderingContext2D {
        if (p1 instanceof Path2D && p2) {
            this._canvasContext?.fill(p1, p2);
        } else {
            this._canvasContext?.fill(p1);
        }
        return this;
    }

    public isPointInPath(x: number, y: number, fillRule?: "evenodd" | "nonzero" | undefined): boolean
    public isPointInPath(path: Path2D, x: number, y: number, fillRule?: "evenodd" | "nonzero" | undefined): boolean
    public isPointInPath(p1: any, p2: number, p3?: any, p4?: any): boolean {
        if (p1 && p2 && p3 && p4) {
            return this._canvasContext?.isPointInPath(p1, p2, p3, p4) || false;
        } else {
            return this._canvasContext?.isPointInPath(p1, p2, p3) || false;
        }
    }

    public isPointInStroke(x: number, y: number): boolean
    public isPointInStroke(path: Path2D, x: number, y: number): boolean
    public isPointInStroke(p1: any, p2: number, p3?: number): boolean {
        if (p1 && p2 && p3) {
            return this._canvasContext?.isPointInStroke(p1, p2, p3) || false;
        } else {
            return this._canvasContext?.isPointInStroke(p1, p2) || false;
        }
    }

    public stroke(): SpriteCanvasRenderingContext2D
    public stroke(path?: Path2D): SpriteCanvasRenderingContext2D {
        if (path) {
            this._canvasContext?.stroke(path);
        } else {
            this._canvasContext?.stroke();
        }
        return this;
    }

    //#endregion

    //#region CanvasFillStrokeStyles

    public fillStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.fillStyle = value;
        return this;
    }

    public strokeStyle(value: string | CanvasGradient | CanvasPattern): SpriteCanvasRenderingContext2D {
        this._canvasContext!.strokeStyle = value;
        return this;
    }

    public createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient {
        const measures1: Measures = this.getRelativesMeasures(x0, y0);
        const measures2: Measures = this.getRelativesMeasures(x1, y1);
        return this._canvasContext!.createLinearGradient(measures1.pos.x, measures1.pos.y, measures2.pos.x, measures2.pos.y);
    }

    public createPattern(image: CanvasImageSource, repetition: string | null): CanvasPattern | null {
        return this._canvasContext!.createPattern(image, repetition);
    }

    public createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient {
        const measures1: Measures = this.getRelativesMeasures(x0, y0);
        const measures2: Measures = this.getRelativesMeasures(x1, y1);
        return this._canvasContext!.createRadialGradient(measures1.pos.x, measures1.pos.y, r0, measures2.pos.x, measures2.pos.y, r1);
    }

    //#endregion

    //#region CanvasFilters

    public filter(value: string): SpriteCanvasRenderingContext2D {
        this._canvasContext!.filter = value;
        return this;
    }

    //#endregion

    //#region CanvasImageData

    public createImageData(sw: number, sh: number): ImageData
    public createImageData(imagedata: ImageData): ImageData
    public createImageData(p1: any, p2?: number): ImageData {
        if (p1 && p2) {
            return this._canvasContext!.createImageData(p1, p2);
        } else {
            return this._canvasContext!.createImageData(p1);
        }
    }

    public getImageData(sx: number, sy: number, sw: number, sh: number): ImageData {
        return this._canvasContext!.getImageData(sx, sy, sw, sh);
    }

    putImageData(imagedata: ImageData, dx: number, dy: number): SpriteCanvasRenderingContext2D
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): SpriteCanvasRenderingContext2D
    putImageData(p1: ImageData, p2: number, p3: number, p4?: number, p5?: number, p6?: number, p7?: number): SpriteCanvasRenderingContext2D {
        if (p1 && p2 && p3 && p4 && p5 && p6 && p7) {
            this._canvasContext?.putImageData(p1, p2, p3, p4, p5, p6, p7);
        } else if (p1 && p2 && p3) {
            this._canvasContext?.putImageData(p1, p2, p3);
        }
        return this;
    }

    //#endregion

    //#region CanvasImageSmoothing

    public imageSmoothingEnabled(value: boolean): SpriteCanvasRenderingContext2D {
        this._canvasContext!.imageSmoothingEnabled = value;
        return this;
    }

    public imageSmoothingQuality(value: ImageSmoothingQuality): SpriteCanvasRenderingContext2D {
        this._canvasContext!.imageSmoothingQuality = value;
        return this;
    }

    //#endregion

    //#region CanvasPath

    public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.arc(measures.pos.x, measures.pos.y, radius, startAngle, endAngle, anticlockwise);
        return this;
    }

    public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): SpriteCanvasRenderingContext2D {
        const measures1: Measures = this.getRelativesMeasures(x1, y1);
        const measures2: Measures = this.getRelativesMeasures(x2, y2);
        this._canvasContext?.arcTo(measures1.pos.x, measures1.pos.y, measures2.pos.x, measures2.pos.y, radius);
        return this;
    }

    public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): SpriteCanvasRenderingContext2D {
        const controlMeasures1: Measures = this.getRelativesMeasures(cp1x, cp1y);
        const controlMeasures2: Measures = this.getRelativesMeasures(cp2x, cp2y);
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.bezierCurveTo(
            controlMeasures1.pos.x, controlMeasures1.pos.y,
            controlMeasures2.pos.x, controlMeasures2.pos.y,
            measures.pos.x, measures.pos.y);
        return this;
    }

    public closePath(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.closePath();
        return this;
    }

    public ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.ellipse(measures.pos.x, measures.pos.y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        return this;
    }

    public lineTo(x?: number, y?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.lineTo(measures.pos.x, measures.pos.y)
        return this;
    }

    public moveTo(x?: number, y?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.moveTo(measures.pos.x, measures.pos.y)
        return this;
    }

    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): SpriteCanvasRenderingContext2D {
        const controlMeasures: Measures = this.getRelativesMeasures(cpx, cpy);
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.quadraticCurveTo(
            controlMeasures.pos.x, controlMeasures.pos.y,
            measures.pos.x, measures.pos.y);
        return this;
    }
   
    public rect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y, width, height);
        this._canvasContext?.rect(measures.pos.x, measures.pos.y, measures.size.w, measures.size.h);
        return this;
    }

    //#endregion


    //#region CanvasPathDrawingStyles

    public lineCap(value: CanvasLineCap): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineCap = value;
        return this;
    }

    public lineDashOffset(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineDashOffset = value;
        return this;
    }

    public lineJoin(value: CanvasLineJoin): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineJoin = value;
        return this;
    }

    public lineWidth(value: number): SpriteCanvasRenderingContext2D {
        this._canvasContext!.lineWidth = value;
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

    //#endregion


    //#region CanvasPattern

    public setTransform(transform?: DOMMatrix2DInit): SpriteCanvasRenderingContext2D
    public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): SpriteCanvasRenderingContext2D
    public setTransform(p1?: any, p2?: number, p3?: number, p4?: number, p5?: number, p6?: number): SpriteCanvasRenderingContext2D {
        if (p1 && p2 && p3 && p4 && p5 && p6) {
            this._canvasContext?.setTransform(p1, p2, p3, p4, p5, p6);
        } else {
            this._canvasContext?.setTransform(p1);
        }
        return this;
    }

    //#endregion

    //#region CanvasRect

    public clearRect(x?: number, y?: number, width?: number, height?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y, width, height);
        this._canvasContext?.clearRect(measures.pos.x, measures.pos.y, measures.size.w, measures.size.h);
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

    //#region CanvasShadowStyles

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

    //#region CanvasState

    public restore(): SpriteCanvasRenderingContext2D {
        if (this._canvasContextPathSaveCount > 0) {
            this._canvasContext?.restore();
            this._canvasContextPathSaveCount -= 1;
        }
        return this;
    }

    public save(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.save();
        this._canvasContextPathSaveCount += 1;
        return this;
    }

    //#endregion

    //#region CanvasText

    public fillText(text: string, x?: number, y?: number, maxWidth?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.fillText(text, measures.pos.x, measures.pos.y, maxWidth);
        return this;
    }

    public measureText(text: string): TextMetrics {
        return this._canvasContext!.measureText(text);
    }

    public strokeText(text: string, x?: number, y?: number, maxWidth?: number): SpriteCanvasRenderingContext2D {
        const measures: Measures = this.getRelativesMeasures(x, y);
        this._canvasContext?.strokeText(text, measures.pos.x, measures.pos.y, maxWidth);
        return this;
    }

    //#endregion

    //#region CanvasTextDrawingStyles
    public direction(value: CanvasDirection): SpriteCanvasRenderingContext2D {
        this._canvasContext!.direction = value;
        return this;
    }

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

    //#endregion

    //#region CanvasTransform

    public getTransform(): DOMMatrix {
        return this._canvasContext!.getTransform();
    }

    public resetTransform(): SpriteCanvasRenderingContext2D {
        this._canvasContext?.resetTransform();
        return this;
    }

    public rotate(angle: number): SpriteCanvasRenderingContext2D {
        this._canvasContext?.rotate(angle);
        return this;
    }

    public scale(x: number, y: number): SpriteCanvasRenderingContext2D {
        this._canvasContext?.scale(x, y);
        return this;
    }

    public transform(a: number, b: number, c: number, d: number, e: number, f: number): SpriteCanvasRenderingContext2D {
        this._canvasContext?.transform(a, b, c, d, e, f);
        return this;
    }

    public translate(x: number, y: number): SpriteCanvasRenderingContext2D {
        this._canvasContext?.translate(x, y);
        return this;
    }

    //#endregion

    //#region CanvasUserInterface

    public drawFocusIfNeeded(element: Element): SpriteCanvasRenderingContext2D
    public drawFocusIfNeeded(path: Path2D, element: Element): SpriteCanvasRenderingContext2D
    public drawFocusIfNeeded(p1: any, p2?: any): SpriteCanvasRenderingContext2D {
        if (p1 instanceof Path2D && p2) {
            this._canvasContext?.drawFocusIfNeeded(p1, p2);
        } else {
            this._canvasContext?.drawFocusIfNeeded(p1);
        }
        return this;
    }

    public scrollPathIntoView(): SpriteCanvasRenderingContext2D;
    public scrollPathIntoView(path?: Path2D): SpriteCanvasRenderingContext2D {
        if (path) {
            this._canvasContext?.scrollPathIntoView(path);
        } else {
            this._canvasContext?.scrollPathIntoView();
        }
        return this;
    }

    //#endregion

    public dispose(): void {
        while (this._canvasContextPathSaveCount > 0) {
            this.restore();
        }
        this._canvasContext?.restore();
    }
}