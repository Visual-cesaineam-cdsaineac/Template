let zoom
function setup() {
    createCanvas(700, 350);
    zoom = createSlider(0,5,0,1)
    frameRate(30)
  }
  
function draw() {
    background("#555753");

    fill("white")
    for(i = 0; i < width; i++ ){
        for(j=0; j<height; j++){
            rect((i*50)-20,(j*50)-20,45,45);
        }
    }
    fill("black")
    for(i = 0; i < width; i++ ){
        for(j=0; j<height; j++){
            circle((i*50)+27,(j*50)+27,7);
        }
    } 
    filter(BLUR,zoom.value())
}