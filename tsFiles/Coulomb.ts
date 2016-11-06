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
    vitesse: Vector2D;
    distMaxParFrame: number;

    charge: number;

    constructor(_x: number, _y: number, _q: number, _distMax: number = 10) {
        this.point = new Vector2D(_x, _y);
        this.vitesse = new Vector2D(0, 0);
        this.charge = _q;
        this.distMaxParFrame = _distMax;
    }

    majVitesse(_SumForceX: number, _SumForceY: number, _canvas_width: number, _canvas_height: number) {
        this.vitesse.x += _SumForceX;
        this.vitesse.y += _SumForceY;

        this.edgeDectection(_canvas_width, _canvas_height, 10);
        this.majPosition();

    }

    edgeDectection(_canvas_width: number, _canvas_height: number, _pt_radius: number) {
        // border up
        if (this.point.x - this.distMaxParFrame <= _pt_radius
            && this.vitesse.x < 0) {
            this.vitesse.x = 0;
        }

        // border down
        if (this.point.x + this.distMaxParFrame >= _canvas_width - _pt_radius
            && this.vitesse.x > 0) {
            this.vitesse.x = 0;
        }

        // border left
        if (this.point.y - this.distMaxParFrame <= _pt_radius
            && this.vitesse.y < 0) {
            this.vitesse.y = 0;
        }

        // boder right
        if (this.point.y + this.distMaxParFrame >= _canvas_height - _pt_radius
            && this.vitesse.y > 0) {
            this.vitesse.y = 0;
        }
    }

    majPosition() {
        let NormeVitesse: number = Math.sqrt(Math.pow(this.vitesse.x, 2) + Math.pow(this.vitesse.y, 2));
        if (NormeVitesse > this.distMaxParFrame) {
            let NormePos_NormeVitesse = this.distMaxParFrame / NormeVitesse;
            this.point.x += this.vitesse.x * NormePos_NormeVitesse;
            this.point.y += this.vitesse.y * NormePos_NormeVitesse;
        } else {
            this.point.x += this.vitesse.x;
            this.point.y += this.vitesse.y;
        }
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
                let dist = this.distance[c][r] = Math.sqrt(x * x + y * y);
                this.distance[c][r] = dist;
                this.distance[r][c] = dist;
            }
        }
    }

    calculForce(pt: Coulomb[]) {
        for (let c = 0; c < pt.length; c++) {
            for (let r = c; r < pt.length; r++) {
                if (r != c) {
                    this.force[c][r] = this.coef /
                        (this.distance[c][r] * this.distance[c][r]);
                    this.force[r][c] = this.force[c][r];
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
                    this.forceXaxis[c][r] = (pt[c].point.x - pt[r].point.x)
                        * this.force[c][r] / this.distance[c][r];
                    this.forceYaxis[c][r] = (pt[c].point.y - pt[r].point.y)
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

    calculForceSum() {
        for (let c = 0; c < this.force[0].length; c++) {
            for (let r = 0; r < this.force[0].length; r++) {
                this.forceSumX[c] += (pt[c].charge * pt[r].charge) * this.forceXaxis[c][r];
                this.forceSumY[c] += (pt[c].charge * pt[r].charge) * this.forceYaxis[c][r];
            }
        }
    }


} 
