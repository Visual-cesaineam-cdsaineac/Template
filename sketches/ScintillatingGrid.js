function setup() {
    createCanvas(700,400);
    noLoop();
  }
  
function draw() {
    background("gray");
    fill("white")
    stroke("white")
    for(i = 0; i < width; i++ ){
        for(j=0; j<height; j++){
            circle((i*50)+25,(j*50)+25,10);
        }
    } 
    fill("black")
    stroke("black")    
    for(i = 0; i < width; i++ ){
        for(j=0; j<height; j++){
            rect((i*50)-20,(j*50)-20,40,40);
        }
    }
}