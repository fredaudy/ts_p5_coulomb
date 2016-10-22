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


class Matrix {
    dim: number;
    distance: number[][];

    emptyMatrix(){
        this.distance = new Array();
        for (let c = 0; c < pt.length; c++) {
            this.distance[c] = new Array();
            for (let r = 0; r < pt.length; r++) {
                this.distance[c].push( 0 );
            }
        }
    }

    calculDistance(pt: Coulomb[]) {
        for (let c = 0; c < pt.length; c++) {
            for (let r = c; r < pt.length; r++) {
                let x = pt[c].point.x - pt[r].point.x;
                let y = pt[c].point.y - pt[r].point.y;
                let dist = this.distance[c][r] = Math.sqrt(x * x - y * y);
                this.distance[c][r] = dist;
                this.distance[r][c] = dist;
            }
        }

    }
} 
