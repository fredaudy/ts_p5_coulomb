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
    mx.emptyMatrix();
    mx.calculDistance(pt);
    console.log(mx.distance);
}

function draw() {

}