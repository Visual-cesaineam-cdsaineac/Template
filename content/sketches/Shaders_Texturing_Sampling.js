let lumaShader;
let img;

function preload() {
  lumaShader = readShader('/Template/sketches/shaders/luma.frag', {matrices: Tree.NONE, varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/Template/sketches/shaders/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  lumaShader.setUniform('texture', img);
}
  
function draw() {
  background(0);
  quad(1, 1, -1, 1, -1, -1, 1, -1);
}

function keyPressed(){
  if(key == '1'){
    lumaShader.setUniform('filter_selected', 1.0);
  }else if(key == '2'){
    lumaShader.setUniform('filter_selected', 2.0);
  }else if(key == '3'){
    lumaShader.setUniform('filter_selected', 3.0);
  }else{
    lumaShader.setUniform('filter_selected', 4.0);
  }
  background(0);
  quad(1, 1, -1, 1, -1, -1, 1, -1); 
}