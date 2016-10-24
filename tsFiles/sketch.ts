/// <reference path="../lib/P5.d.ts" />

let prg: p5 = new p5();
let pt: Coulomb[] = [];
let mx: Matrix = new Matrix();

function setup() {
    prg.createCanvas(1200, 700);
    prg.background(175);

    for (let i = 0; i < 15; i++) {
        pt.push(new Coulomb(prg.width * (i + 1) / 16, prg.height * (i + 1) / 16, 1));
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
    }
    mx.emptyMatrix();
    mx.calculDistance(pt);
    mx.calculForce(pt);
    mx.calulForceAxis(pt);
    mx.calculForceSum();
}