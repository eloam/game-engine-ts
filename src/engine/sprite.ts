import { Vector } from "./util/vector";
import { Size } from "./util/size";
import { TagManager } from "./manager/tag-manager";

export class Sprite {

    // Variables
    private _position: Vector;
    private _dimension: Size;
    private _tags: TagManager;
    private _update: ((context: CanvasRenderingContext2D | null) => void) | null;

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

    /**
     * Obtenir l'objet TagManager permettant la gestion des tags
     */
    public get tags(): TagManager {
        return this._tags;
    }

    /**
     * Obtenir/définir la fonction permettant la mise à jour de la frame
     */
    public get update(): ((context: CanvasRenderingContext2D | null) => void) | null {
        return this._update;
    }
    public set update(value: ((context: CanvasRenderingContext2D | null) => void) | null) {
        this._update = value;
    }

    /**
     * Constructeur
     * @param position Vecteur représentant les valeurs x et y du Sprite 
     * @param dimension Size représentant les valeurs largeur et hauteur du Sprite
     */
    constructor(position: Vector, dimension: Size) {
        this._position = position;
        this._dimension = dimension;
        this._tags = new TagManager();
        this._update = null;
    }

    /**
     * Fonction permettant d'afficher les éléments de debug
     */
    public debug(context: CanvasRenderingContext2D | null) {
        // On conserve le style de trait afin de ne pas le modifier pas erreur s'il est déjà définit
        const initialStrokeStyle: string | CanvasGradient | CanvasPattern = context!.strokeStyle;
        
        // Couleur et largeur de ligne
        context!.strokeStyle = 'magenta';
        context!.lineWidth = 2;
        
        // Création du contour du sprite
        context?.strokeRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);

        // Création de la croix - 1ère ligne
        context?.beginPath();
        context?.moveTo(this.position.x, this.position.y);
        context?.lineTo(this.position.x + this.dimension.width, this.position.y + this.dimension.height);
        context?.stroke();
        
        // Création de la coix - 2ème ligne
        context?.beginPath();
        context?.moveTo(this.position.x, this.position.y + this.dimension.height);
        context?.lineTo(this.position.x + this.dimension.width, this.position.y);
        context?.stroke();

        // Réinitialisation du style de trait
        context!.strokeStyle = initialStrokeStyle;
    }

}