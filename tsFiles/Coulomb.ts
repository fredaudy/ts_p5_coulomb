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
    coef: number;
    distance: number[][];
    force: number[][];
    forceXaxis: number[][];
    forceYaxis: number[][];
    forceSumX: number[];
    forceSumY: number[];

    emptyMatrix() {
        this.distance = new Array();
        this.force = new Array();
        this.forceXaxis = new Array();
        this.forceYaxis = new Array();
        this.forceSumX = new Array();
        this.forceSumY = new Array();

        for (let c = 0; c < pt.length; c++) {
            this.distance[c] = new Array();
            this.force[c] = new Array();
            this.forceXaxis[c] = new Array();
            this.forceYaxis[c] = new Array();
            this.forceSumX.push(0);
            this.forceSumY.push(0);

            for (let r = 0; r < pt.length; r++) {
                this.distance[c].push(0);
                this.force[c].push(0);
                this.forceXaxis[c].push(0);
                this.forceYaxis[c].push(0);                
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

    calculForce(pt: Coulomb[]) {
        for (let c = 0; c < pt.length; c++) {
            for (let r = c; r < pt.length; r++) {
                if (r != c) {
                    this.force[c][r] = this.coef * pt[c].charge * pt[r].charge / 
                        (this.distance[c][r] * this.distance[c][r]);
                    this.distance[r][c] = -this.force[c][r];
                } else {
                    this.force[c][r] = 0;
                }
            }
        }
    }

    calulForceAxis(pt: Coulomb[]) {
        for (let c = 0; c < pt.length; c++) {
            for (let r = c; r < pt.length; r++) {
                if (r != c) {
                    this.forceXaxis[c][r] = (pt[r].point.x - pt[c].point.x)
                        * this.force[c][r] / this.distance[c][r];
                    this.forceYaxis[c][r] = (pt[r].point.y - pt[c].point.y)
                        * this.force[c][r] / this.distance[c][r];

                    this.forceXaxis[r][c] = -this.forceXaxis[c][r];
                    this.forceYaxis[r][c] = -this.forceYaxis[c][r];
                } else {
                    this.forceXaxis[c][r] = 0;
                    this.forceYaxis[c][r] = 0;
                }
            }
        }
    }

    calculForceSum(){
        for (let c = 0; c < this.force[0].length; c++) {
            for (let r = c; r < this.force[0].length; r++) {
                this.forceSumX[c] += this.forceXaxis[c][r];
                this.forceSumY[c] += this.forceYaxis[c][r];
            }            
        }
    }


} 
