let ROWS = 20;
let COLS = 20;
let LENGTH = 25;
let RADIUS = 5;
let X1 = 0, Y1 = 0, X2 = 0, Y2 = 0;
let antialising = false
let countClicks = 0;

function setup() {
    createCanvas(500, 500);
    quadrille = createQuadrille(ROWS, COLS);
    colpick = createColorPicker('#3200FF');
    colpick.position(0, 0);
}

function draw() {
    background(255);
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
    if (mouseIsPressed) {
        if (countClicks == 1) {
            X1 = floor(mouseY / LENGTH)
            Y1 = floor(mouseX / LENGTH)
            midPointCircleDraw(X1, Y1, RADIUS)
        }
    } 
}

function mousePressed() {
    countClicks++;
    if (countClicks >= 2) {
        quadrille.clear()
        countClicks = 0
    }
}

function keyPressed() {
    if (key === 'w'&& (RADIUS) <= 8) {
        RADIUS += 1;
        quadrille.clear()
        midPointCircleDraw(X1, Y1, RADIUS)
    } else if (key === 's' && (RADIUS) >= 1) {
        RADIUS -= 1;
        quadrille.clear()
        midPointCircleDraw(X1, Y1, RADIUS)
    }
}



function midPointCircleDraw(x_centre , y_centre , r) {
 
    var x = r, y = 0;

    // Printing the initial point
    // on the axes after translation
    quadrille.fill(x + x_centre, y + y_centre,color(colpick.color()))

    // When radius is zero only a single
    // point will be printed
    if (r > 0) {
        quadrille.fill((-x + x_centre),(y + y_centre),color(colpick.color()));
        quadrille.fill((-y + x_centre),(-x + y_centre), color(colpick.color()));
        quadrille.fill((-y + x_centre),(x + y_centre), color(colpick.color()));
    }

    // Initialising the value of P
    var P = 1 - r;
    while (x > y) {

        y++;

        // Mid-point is inside or on the perimeter
        if (P <= 0)
            P = P + 2 * y + 1;

        // Mid-point is outside the perimeter
        else {
            x--;
            P = P + 2 * y - 2 * x + 1;
        }

        // All the perimeter points have already
        // been printed
        if (x < y)
            break;

        // Printing the generated point and its
        // reflection in the other octants after
        // translation
        quadrille.fill((x + x_centre),(y + y_centre), color(colpick.color()));
        quadrille.fill((-x + x_centre),(y + y_centre), color(colpick.color()));
        quadrille.fill((x + x_centre),(-y + y_centre), color(colpick.color()));
        quadrille.fill((-x + x_centre),(-y + y_centre), color(colpick.color()));

        // If the generated point is on the
        // line x = y then the perimeter points
        // have already been printed
        if (x != y) {

            quadrille.fill(( y + x_centre),( x + y_centre), color(colpick.color()));
            quadrille.fill((-y + x_centre),( x + y_centre), color(colpick.color()));
            quadrille.fill(( y + x_centre),(-x + y_centre), color(colpick.color()));
            quadrille.fill((-y + x_centre),(-x + y_centre), color(colpick.color()));

        }
    }

}