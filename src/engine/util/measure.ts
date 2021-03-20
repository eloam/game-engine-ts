import { Vector } from "./vector";
import { Size } from "./size";

export class Measures {
    public pos: Vector;
    public size: Size;

    constructor(position: Vector, dimension: Size) {
        this.pos = position;
        this.size = dimension;
    }
}
