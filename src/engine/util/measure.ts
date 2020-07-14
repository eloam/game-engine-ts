import { Vector } from "./vector";
import { Size } from "./size";

export class Measures {
    public position: Vector;
    public dimension: Size;

    constructor(position: Vector, dimension: Size) {
        this.position = position;
        this.dimension = dimension;
    }
}
