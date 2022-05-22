let ROWS = 60;
let COLS = 60;
let LENGTH = 30;
let X1 = 0, Y1 = 0, X2 = 0, Y2 = 0;
let countClicks = 0;

function setup() {
    createCanvas(500,500);
    quadrille = createQuadrille(ROWS, COLS);
    colpick = createColorPicker('blue');
    colpick.position(0,0);
}

function draw() {
    background(255);
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
    if (mouseIsPressed) {
        if(countClicks == 1){
            X1 = floor(mouseY / LENGTH)
            Y1 = floor(mouseX / LENGTH)
            quadrille.fill(X1, Y1, color(colpick.color()))
        }else if(countClicks == 2){
            X2 = floor(mouseY / LENGTH)
            Y2 = floor(mouseX / LENGTH)
            quadrille.fill(X2, Y2, color(colpick.color()))
            midPoint(X1, Y1, X2, Y2);
        }
    }
}

function mousePressed() {
    countClicks ++;
    if(countClicks >= 3){
        quadrille.clear()
        countClicks = 0
    }
}

function midPoint(x0, y0, x1, y1) {
    if (abs(y1 - y0) < abs(x1 - x0)) {
        if (x0 > x1) { plotLineLow(x1, y1, x0, y0) }

        else { plotLineLow(x0, y0, x1, y1) }
    }
    else {
        if (y0 > y1) {
            plotLineHigh(x1, y1, x0, y0)
        }

        else { plotLineHigh(x0, y0, x1, y1) }
    }
}

function plotLineLow(x0, y0, x1, y1) {
    dx = x1 - x0
    dy = y1 - y0
    yi = 1
    if (dy < 0) {
        yi = -1
        dy = -dy
    }
    D = (2 * dy) - dx
    y = y0

    for (x = x0; x <= x1; x++) {
        quadrille.fill(x, y, color(colpick.color()))
        if (D > 0) {
            y = y + yi
            D = D + (2 * (dy - dx))
        }
        else { D = D + 2 * dy }
    }
}

function plotLineHigh(x0, y0, x1, y1) {
    dx = x1 - x0
    dy = y1 - y0
    xi = 1

    if (dx < 0) {
        xi = -1
        dx = -dx
    }

    D = (2 * dx) - dy
    x = x0

    for (y = y0; y <= y1; y++) {
        quadrille.fill(x, y, color(colpick.color()))
        if (D > 0) {
            x = x + xi
            D = D + (2 * (dx - dy))
        }
        else { D = D + 2 * dx }
    }
}

function keyPressed() {
    if (key === 'w' && (60*LENGTH) <= 1500) {
        LENGTH *= 1.05;
    }else if (key === 's' && (60*LENGTH) > 550) {
        LENGTH *= 0.95;
    }
    ROWS = 500/LENGTH;
    COLS= 500/LENGTH;
    redraw();
}
