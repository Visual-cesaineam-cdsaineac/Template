function setup() {
    createCanvas(700, 350);
    noLoop();
  }
  
function draw() {
    background("white");
    for(i = 0; i <= 700; i++ ){
        for(j=0; j<= 350; j++){
            fill(0)
            rect((i*50)+1,(j*50)+1,40,40)
        }
    }
}