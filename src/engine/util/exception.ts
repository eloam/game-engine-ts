export class Exception {

    // Variables
    private _message: string;

    // Propriétés
    /**
     * Obtenir le message de l'erreur
     */
    public get message(): string {
        return this._message;
    }

    /**
     * Constructeur
     * Affiche dans la console un message
     */
    public constructor(message: string) {
        this._message = message;
        this.init();
    }

    /**
     * Affiche dans la console un message
     */
    protected init() {
        console.log(new Error(this._message));
    }
}

export class WarningException extends Exception {

    /**
     * Constructeur
     * Affiche dans la console un message
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Affiche dans la console un avertissement
     */
    protected init() {
        console.warn(new Error(this.message));
    }
}

export class ErrorException extends Exception {

    /**
     * Constructeur
     * Affiche dans la console un message
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Affiche dans la console une error
     */
    protected init() {
        console.error(new Error(this.message));
    }
}