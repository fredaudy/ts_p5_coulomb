/// <reference path="../lib/P5.d.ts" />

let prg: p5 = new p5();
let pt: Coulomb[] = [];
let mx: Matrix = new Matrix();

let red;
let coefForce: number = 500;

let nbPoints: number = 3

function setup() {
    prg.createCanvas(1200, 700);
    prg.background(175);
    red = prg.color(255, 0, 0);

    for (let i = 0; i < nbPoints; i++) {
        let charge = Math.pow(-1, i);
        // charge = -1;
        pt.push(new Coulomb(prg.width * (i + 1) / (nbPoints + 1), prg.height * (i + 1) / (nbPoints + 1), charge));
        prg.fill(175);
        prg.stroke(255);
        prg.ellipse(pt[i].point.x, pt[i].point.y, 20, 20);
    }

    mx.dim = pt.length;
    mx.coef = 1000;
    mx.emptyMatrix();
    mx.calculDistance(pt);
    mx.calculForce(pt);
    mx.calulForceAxis(pt);
    mx.calculForceSum();
    console.log(mx.forceSumX);
    // console.log(mx.force);
    // console.log(mx.forceXaxis);
    // console.log(mx.forceYaxis);
}

function draw() {
    prg.background(175);
    for (let c = 0; c < pt.length; c++) {
        pt[c].point.x += mx.forceSumX[c];
        pt[c].point.y += mx.forceSumY[c];

        prg.fill(175);
        prg.stroke(255);
        prg.ellipse(pt[c].point.x, pt[c].point.y, 20, 20);
        prg.stroke(red);
        prg.line(pt[c].point.x, 
            pt[c].point.y, 
            pt[c].point.x + mx.forceSumX[c]*coefForce, 
            pt[c].point.y + mx.forceSumY[c]*coefForce);
    }
    mx.emptyMatrix();
    mx.calculDistance(pt);
    mx.calculForce(pt);
    mx.calulForceAxis(pt);
    mx.calculForceSum();
}