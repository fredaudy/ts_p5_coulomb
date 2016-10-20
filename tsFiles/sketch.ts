/// <reference path="../lib/P5.d.ts" />

let prg: p5 = new p5();
let pt: Coulomb[] = [];

function setup() {
    prg.createCanvas(1200, 700);
    prg.background(125);

    for (let i = 0; i < 15; i++) {
        pt.push(new Coulomb(prg.width * (i + 1) / 16, prg.height * (i + 1) / 16, 1));
        prg.ellipse(pt[i].point.x, pt[i].point.y, 20, 20);
    }
}

function draw() {

}