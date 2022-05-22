const ROWS = 20;
const COLS = 20;
const LENGTH = 25;
let countClicks = 0;
let X1 = 0, Y1 = 0, X2 = 0, Y2 = 0,X3 = 0, Y3 = 0;
let antialising = false

function setup() {
    createCanvas(COLS * LENGTH, ROWS * LENGTH);
    quadrille = createQuadrille(ROWS, COLS);
    /*color1 = color(255,0,0)
    color2 = color(0,255,0)
    color3 = color(0,0,255) */
    col1 = createColorPicker('green');
    col1.position(0, 0);
    col2 = createColorPicker('red');
    col2.position(80, 0);
    col3 = createColorPicker('blue');
    col3.position(160, 0);
    
}
                            
                              

function draw() {
    color1 = color(col1.color())
    color2 = color(col2.color())
    color3 = color(col3.color())
    background(255);
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true });
 
  if(mouseIsPressed)
    {if (countClicks == 1){
      X1 = floor(mouseY / LENGTH)
      Y1 = floor(mouseX / LENGTH)
      quadrille.fill(X1, Y1, color(color1))
    }else if(countClicks == 2){
      X2 = floor(mouseY / LENGTH)
      Y2 = floor(mouseX / LENGTH)
      midPoint(X1, Y1, X2, Y2,color1,color2,antialising);
      quadrille.fill(X1, Y1, color(color1))
      quadrille.fill(X2, Y2, color(color2))
    }else if(countClicks == 3){
      X3 = floor(mouseY / LENGTH)
      Y3 = floor(mouseX / LENGTH)
      
      midPoint(X3, Y3, X2, Y2,color3,color2,antialising);
      midPoint(X1, Y1, X3, Y3,color1,color3,antialising);
      quadrille.fill(X1, Y1, color(color1))
      quadrille.fill(X2, Y2, color(color2))
      quadrille.fill(X3, Y3, color(color3))
      fillTriangle(X1,Y1,X2,Y2,X3,Y3)
      
    }else{
      countClicks = 0
      quadrille.clear()
    } }  
  
  
}

function fillTriangle(X1,Y1,X2,Y2,X3,Y3){
  quadrille.clear()
  midPoint(X1, Y1, X2, Y2,color1,color2,antialising);
  midPoint(X3, Y3, X2, Y2,color3,color2,antialising);
  midPoint(X1, Y1, X3, Y3,color1,color3,antialising);
  for(let i = 0;i<ROWS;i++){
    for(let j = 0;j<COLS;j++){
      let F12 = edgeF(X1,Y1,X2,Y2,i,j)
      let F23 = edgeF(X2,Y2,X3,Y3,i,j)
      let F31 = edgeF(X3,Y3,X1,Y1,i,j)
      let A = F12 + F23 + F31
      let N12 = F12/A
      let N23 = F23/A
      let N31 = F31/A
      
      let R = N12 * red(color3) + N23 * red(color1) + N31 * red(color2)
      let G = N12 * green(color3) + N23 * green(color1) + N31 * green(color2)
      let B = N12 * blue(color3) + N23 * blue(color1) + N31 * blue(color2)

      if((F12 <= 0 && F23 <= 0 && F31 <= 0) || (F12 >= 0 && F23 >= 0 && F31 >= 0)){
        quadrille.fill(i, j, color(R,G,B))
      }
    }
  }
  
}
function edgeF(v0x,v0y,v1x,v1y,px,py){
  return (v0y - v1y) * px + (v1x - v0x) * py + ((v0x*v1y) - (v0y*v1x)) 
}

function keyPressed() {
    if (key === 'z') {
        antialising = !antialising
        fillTriangle(X1,Y1,X2,Y2,X3,Y3)
    }
}
function mousePressed() {
  countClicks ++;
}

function midPoint(x0, y0, x1, y1, color_a,color_b,a = false) {
  if(a){
    drawLine(x0, y0, x1, y1,color_a,color_b)
  }else{if (abs(y1 - y0) < abs(x1 - x0)) {
        if (x0 > x1) { plotLineLow(x1, y1, x0, y0,color_b,color_a) }

        else { plotLineLow(x0, y0, x1, y1,color_a,color_b) }
    }
    else {
        if (y0 > y1) {
            plotLineHigh(x1, y1, x0, y0,color_b,color_a)
        }

        else { plotLineHigh(x0, y0, x1, y1,color_a,color_b) }
    }}
    
}

function plotLineLow(x0, y0, x1, y1,color_a,color_b) {
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
        newColor = getInterpolatedColor(color_a,color_b,(x-x0)/x1)
        quadrille.fill(x, y,color(newColor))
        if (D > 0) {
            y = y + yi
            D = D + (2 * (dy - dx))
        }
        else { D = D + 2 * dy }
    }
}

function plotLineHigh(x0, y0, x1, y1,color_a,color_b) {
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
        newColor = getInterpolatedColor(color_a,color_b,(y-y0)/y1)
        quadrille.fill(x, y,color(newColor))
        if (D > 0) {
            x = x + xi
            D = D + (2 * (dx - dy))
        }
        else { D = D + 2 * dx }
    }
}


function getInterpolatedColor(color_a, color_b,t){
  r = red(color_a) + (red(color_b) - red(color_a)) * t;
  g = green(color_a) + (green(color_b) - green(color_a)) * t; 
  b = blue(color_a) + (blue(color_b) - blue(color_a)) * t;
  a = alpha(color_a) + (alpha(color_b) - alpha(color_a)) * t;
  return color(r,g,b,a)
}  
      
function plot(x, y, c,color_a,color_b) {
    bright = (c*255)
    newColor = getInterpolatedColor(color_a,color_b,c)
    newColor.setAlpha(bright)
    noStroke();
    quadrille.fill(x, y, newColor)
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

function drawLine(x0, y0, x1, y1,color_a,color_b) {
    steep = abs(y1 - y0) > abs(x1 - x0)
    aux = true
    if (steep) {
        let temp = x0;
        x0 = y0;
        y0 = temp;

        temp = x1;
        x1 = y1;
        y1 = temp;
    }
    if (x0 > x1) {
        aux = false
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
        plot(ypxl1, xpxl1, rfpart(yend) * xgap,color_a,color_b)
        plot(ypxl1 + 1, xpxl1, fpart(yend) * xgap,color_b,color_a)
        
    }
    else {
        plot(xpxl1, ypxl1, rfpart(yend) * xgap,color_b,color_a)
        plot(xpxl1, ypxl1 + 1, fpart(yend) * xgap,color_a,color_b)
    }
    intery = yend + gradient // first y-intersection for the main loop

    // handle second endpoint
    xend = roundf(x1)
    yend = y1 + gradient * (xend - x1)
    xgap = fpart(x1 + 0.5)
    xpxl2 = xend //this will be used in the main loop
    ypxl2 = ipart(yend)
    if (steep) {
        plot(ypxl2, xpxl2, rfpart(yend) * xgap,color_a,color_b)
        plot(ypxl2 + 1, xpxl2, fpart(yend) * xgap,color_b,color_a)
    }
    else {
        plot(xpxl2, ypxl2, rfpart(yend) * xgap,color_b,color_a)
        plot(xpxl2, ypxl2 + 1, fpart(yend) * xgap,color_a,color_b)
    }

    // main loop
    if (steep) {
        if(aux == false){
          for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(ipart(intery), x, rfpart(intery),color_b,color_a)
            plot(ipart(intery) + 1, x, fpart(intery),color_a,color_b)
            intery = intery + gradient
          }  
        }else{
          for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(ipart(intery), x, rfpart(intery),color_a,color_b)
            plot(ipart(intery) + 1, x, fpart(intery),color_b,color_a)
            intery = intery + gradient
          }
        }
    } else {
      if(aux == false){
        for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(x, ipart(intery), rfpart(intery),color_a,color_b)
            plot(x, ipart(intery) + 1, fpart(intery),color_b,color_a)
            intery = intery + gradient
        }
      }else{
        for (x = xpxl1 + 1; x <= xpxl2 - 1; x++) {
            plot(x, ipart(intery), rfpart(intery),color_b,color_a)
            plot(x, ipart(intery) + 1, fpart(intery),color_a,color_b)
            intery = intery + gradient
        }
      }
        
    }

}

//https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
//https://rosettacode.org/wiki/Xiaolin_Wu%27s_line_algorithm#Java
//https://iq.opengenus.org/xiaolin-wu-line-drawing-algorithm/
//https://github.com/objetos/p5.quadrille.js/blob/main/examples/demo/sketch.js
//https://objetos.github.io/p5.quadrille.js/docs/demo
//https://p5js.org/es/learn/interactivity.html
//https://en.wikipedia.org/wiki/Xiaolin_Wu%27s_line_algorithm