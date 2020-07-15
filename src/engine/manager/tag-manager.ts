export class TagManager {

    // Variables
    private _tags: string[];

    /**
     * Constructeur
     */
    constructor() {
        this._tags = [];
    }

    // Fonctions
    /**
     * Ajouter un ou plusieurs tags
     * @param tags Liste de tags à ajouter
     */
    public add(...tags: string[]) {

        const pattern: RegExp = /^([a-z0-9])([a-z-0-9]+)([a-z0-9])$/;

        tags.forEach(tag => {
            // Gestion des erreurs
            if (!pattern.test(tag)) {
                new Error(`The tag must respect the following criteria: any combination of lowercase letters, dashes (not at the beginning or at the end) and digits (tag: "${tag}")`);
            }
            if (this.contains(tag)) {
                new Error(`This tag already exists (tag: "${tag}")`);
            }

            this._tags.push(tag);
        });
    }

    /**
     * Supprimer un ou plusieurs tags
     * @param tags Liste de tags à supprimer
     */
    public remove(...tags: string[]) {
        tags.forEach(tag => {
            this._tags.splice(this._tags.indexOf(tag), 1);
        });
    }

    /**
     * Vérifier que le tag existe dans la liste des tags
     * @param tag Nom du tag
     */
    public contains(tag: string): boolean {
        return this._tags.includes(tag);
    }

    /**
     * Remplace un tag par un autre
     * @param tag Nom du tag
     */
    public replace(tag: string) {
        // TODO : Soon
    }

    /**
     * Retoure la liste des tags
     */
    public list(): string[] {
        return this._tags;
    }
}