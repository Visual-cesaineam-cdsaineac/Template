const ROWS = 20;
const COLS = 20;
const LENGTH = 25;
let countClicks = 0;
let X1 = 0, Y1 = 0, X2 = 0, Y2 = 0,X3 = 0, Y3 = 0;
let antialising = false

function setup() {
    createCanvas(COLS * LENGTH, ROWS * LENGTH);
    quadrille = createQuadrille(ROWS, COLS);
    vertex1 = 0
    vertex2 = 5
    vertex3 = 9
    textSize(5);   
}
                            
                              

function draw() {
    background(255);
    drawQuadrille(quadrille, { cellLength: LENGTH, outline: 'black', board: true , charColor: 'black', outlineWeight:1});
 
  if(mouseIsPressed)
    {if (countClicks == 1){
      X1 = floor(mouseY / LENGTH)
      Y1 = floor(mouseX / LENGTH)
      quadrille.fill(X1, Y1, vertex1)
    }else if(countClicks == 2){
      X2 = floor(mouseY / LENGTH)
      Y2 = floor(mouseX / LENGTH)
      midPoint(X1, Y1, X2, Y2);
      quadrille.fill(X1, Y1, vertex1)
      quadrille.fill(X2, Y2, vertex2)
    }else if(countClicks == 3){
      X3 = floor(mouseY / LENGTH)
      Y3 = floor(mouseX / LENGTH)
      
      midPoint(X3, Y3, X2, Y2);
      midPoint(X1, Y1, X3, Y3);
      quadrille.fill(X1, Y1, vertex1)
      quadrille.fill(X2, Y2, vertex2)
      quadrille.fill(X3, Y3, vertex3)
      fillTriangle(X1,Y1,X2,Y2,X3,Y3)
      
    }else{
      countClicks = 0
      quadrille.clear()
    } }  
  
  
}

function fillTriangle(X1,Y1,X2,Y2,X3,Y3){
  quadrille.clear()
  midPoint(X1, Y1, X2, Y2);
  midPoint(X3, Y3, X2, Y2);
  midPoint(X1, Y1, X3, Y3);
  for(let i = 0;i<ROWS;i++){
    for(let j = 0;j<COLS;j++){
      let F12 = edgeF(X1,Y1,X2,Y2,i,j)
      let F23 = edgeF(X2,Y2,X3,Y3,i,j)
      let F31 = edgeF(X3,Y3,X1,Y1,i,j)
      let A = F12 + F23 + F31
      let N12 = F12/A
      let N23 = F23/A
      let N31 = F31/A
      
      let plot = N12 * vertex3  + N23 * vertex1 + N31 * vertex2 
      plot = plot.toFixed(0)
      if(i == 0 && j == 0){
        console.log(plot)
      }
      if((F12 <= 0 && F23 <= 0 && F31 <= 0) || (F12 >= 0 && F23 >= 0 && F31 >= 0)){
        quadrille.fill(i, j, plot.toString())
      }
    }
  }
  
}
function edgeF(v0x,v0y,v1x,v1y,px,py){
  return (v0y - v1y) * px + (v1x - v0x) * py + ((v0x*v1y) - (v0y*v1x)) 
}

function mousePressed() {
  countClicks ++;
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
        quadrille.fill(x, y,'-')
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
        quadrille.fill(x, y,'-')
        if (D > 0) {
            x = x + xi
            D = D + (2 * (dx - dy))
        }
        else { D = D + 2 * dx }
    }
}

