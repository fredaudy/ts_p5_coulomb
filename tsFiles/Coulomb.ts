class Vector2D {
    x: number;
    y: number;
    constructor(_x: number = 0, _y: number = 0) {
        this.x = _x;
        this.y = _y;
    }
}

class Coulomb {
    point: Vector2D;

    charge: number;

    constructor(_x: number, _y: number, _q: number) {
        this.point = new Vector2D(_x, _y);
        this.charge = _q;
    }
}

