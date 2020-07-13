export class MathUtil {

    /**
     * Constructeur privée
     */
    private constructor() { }

    // Méthodes
    public static decimalRounding(value: number, numberOfDecimals: number): number {
        const decimalWeight: number = Math.pow(10, numberOfDecimals);
        return Math.round(value * decimalWeight) / decimalWeight;
    }
}