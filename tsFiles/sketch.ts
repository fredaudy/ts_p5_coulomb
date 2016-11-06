/// <reference path="../lib/P5.d.ts" />

let prg: p5 = new p5();
let pt: Coulomb[] = [];
let mx: Matrix = new Matrix();

let colorCharge: p5.Color[] = [];
let colorVectorForce: p5.Color;

let coefForce: number = 1000;

let nbPoints: number = 5;

function setup() {
    prg.createCanvas(1200, 700);
    prg.background(195);
    
    colorVectorForce = prg.color(142, 162, 198);

    colorCharge.push(prg.color(34, 120, 15)); // couleur pour les charges -1
    colorCharge.push(prg.color(255));
    colorCharge.push(prg.color(255, 94, 77)); // couleur pour les charges +1

    for (let i = 0; i < nbPoints; i++) {
        let charge = Math.pow(-1, i);
        // charge = -1;
        pt.push(new Coulomb( prg.width * (i + 1) / (nbPoints + 1), prg.height * (i + 1) / (nbPoints + 1), charge, 3));
        prg.fill(175);
        prg.stroke(colorCharge[pt[i].charge+1]);
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
    prg.background(195);
    for (let c = 0; c < pt.length; c++) {
        pt[c].majVitesse(mx.forceSumX[c], mx.forceSumY[c], prg.width, prg.height);

        prg.fill(175);
        prg.stroke(colorCharge[pt[c].charge+1]);
        prg.ellipse(pt[c].point.x, pt[c].point.y, 20, 20);
        prg.stroke(colorVectorForce);
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