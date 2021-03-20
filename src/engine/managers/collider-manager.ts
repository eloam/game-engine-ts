import { Collider } from "../objects/collider";

export class ColliderManager {

    // Variables
    private _colliders: Collider[];

    /**
     * Constructeur
     */
    constructor() {
        this._colliders = [];
    }

    // Fonctions
    /**
     * Ajouter un collider
     * @param collider Objet représentant la boite de collision
     */
    public add(collider: Collider) {
        this._colliders.push(collider);
    }

    /**
     * Supprimer un collider
     * @param collider Objet représentant la boite de collision
     */
    public remove(collider: Collider) {
        this._colliders.splice(this._colliders.indexOf(collider), 1);
    }

    /**
     * Vérifier que le collider existe dans la liste des collisions
     * @param collider Objet représentant la boite de collision
     */
    public contains(collider: Collider): boolean {
        return this._colliders.includes(collider);
    }

    /**
     * Retoure la liste des boites de collisions
     */
    public list(): Collider[] {
        return this._colliders;
    }
}