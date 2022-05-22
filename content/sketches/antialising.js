let ROWS = 60;
let COLS = 60;
let LENGTH = 30;
let X1 = 0, Y1 = 0, X2 = 0, Y2 = 0;
let antialising = false
let countClicks = 0;
function setup() {
    createCanvas(500, 500);
    quadrille = createQuadrille(ROWS, COLS);
    colpick = createColorPicker('orange');
    colpick.position(0, 0);
}

function draw() {
    background(255);
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
    if (mouseIsPressed) {
        if (countClicks == 1) {
            X1 = floor(mouseY / LENGTH)
            Y1 = floor(mouseX / LENGTH)
            quadrille.fill(X1, Y1, color(colpick.color()))
        } else if (countClicks == 2) {
            X2 = floor(mouseY / LENGTH)
            Y2 = floor(mouseX / LENGTH)
            quadrille.fill(X2, Y2, color(colpick.color()))
            midPoint(X1, Y1, X2, Y2);
        }
    }

}

function mousePressed() {
    countClicks++;
    if (countClicks >= 3) {
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


function plot(x, y, c) {
    bright = c * 255
    colorPicked = colpick.color()
    colorPicked.setAlpha(bright)
    noStroke();
    quadrille.fill(x, y, color(colorPicked))
}

function ipart(x) {
    return floor(x)
}


function roundf(x) {
    return ipart(x + 0.5)
}


// fractional part of x
function fpart(x) {
    return x - floor(x)
}


function rfpart(x) {
    return 1 - fpart(x)
}

function drawLine(x0, y0, x1, y1) {
    steep = abs(y1 - y0) > abs(x1 - x0)

    if (steep) {
        let temp = x0;
        x0 = y0;
        y0 = temp;

        temp = x1;
        x1 = y1;
        y1 = temp;
    }
    if (x0 > x1) {
        let temp = x0;
        x0 = x1;
        x1 = temp;

        temp = y0;
        y0 = y1;
        y1 = temp;
    }
    dx = x1 - x0
    dy = y1 - y0

    if (dx == 0.0) {
        gradient = 1.0
    }
    else {
        gradient = dy / dx
    }

    // handle first endpoint

    xend = roundf(x0)
    yend = y0 + gradient * (xend - x0)
    xgap = rfpart(x0 + 0.5)
    xpxl1 = xend // this will be used in the main loop
    ypxl1 = ipart(yend)


    if (steep) {
        plot(ypxl1, xpxl1, rfpart(yend) * xgap)
        plot(ypxl1 + 1, xpxl1, fpart(yend) * xgap)

    }
    else {
        plot(xpxl1, ypxl1, rfpart(yend) * xgap)
        plot(xpxl1, ypxl1 + 1, fpart(yend) * xgap)
    }
    //console.log(ypxl1,   xpxl1, rfpart(yend) * xgap)    
    intery = yend + gradient // first y-intersection for the main loop

    // handle second endpoint
    xend = roundf(x1)
    yend = y1 + gradient * (xend - x1)
    xgap = fpart(x1 + 0.5)
    xpxl2 = xend //this will be used in the main loop
    ypxl2 = ipart(yend)
    if (steep) {
        plot(ypxl2, xpxl2, rfpart(yend) * xgap)
        plot(ypxl2 + 1, xpxl2, fpart(yend) * xgap)
    }
    else {
        plot(xpxl2, ypxl2, rfpart(yend) * xgap)
        plot(xpxl2, ypxl2 + 1, fpart(yend) * xgap)
    }

    // main loop
    if (steep) {
        for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(ipart(intery), x, rfpart(intery))
            plot(ipart(intery) + 1, x, fpart(intery))
            intery = intery + gradient
        }
    } else {
        for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(x, ipart(intery), rfpart(intery))
            plot(x, ipart(intery) + 1, fpart(intery))
            intery = intery + gradient
        }
    }
}

function keyPressed() {
    if (key === 'a') {
        antialising = !antialising
        if (antialising) {
            quadrille.clear()
            midPoint(X1, Y1, X2, Y2)
        } else {
            quadrille.clear()
            drawLine(X1, Y1, X2, Y2)
        }
    }
    else if (key === 'w' && (60 * LENGTH) <= 1500) {
        antialising = !antialising
        LENGTH *= 1.05;
    } else if (key === 's' && (60 * LENGTH) > 550) {
        LENGTH *= 0.95;
    }
    ROWS = 500 / LENGTH;
    COLS = 500 / LENGTH;
    redraw();
}

