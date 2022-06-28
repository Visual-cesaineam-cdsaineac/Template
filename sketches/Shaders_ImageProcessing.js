let lumaShader;
let img;
let video;

function preload() {
  lumaShader = readShader('/Template/sketches/shaders/mask.frag', {matrices: Tree.NONE});
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/Template/sketches/shaders/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  lumaShader.setUniform('texture', img);
  lumaShader.setUniform('texOffset', [0.001,0.001]);
  lumaShader.setUniform('mask', [-1,-1,-1,-1,8.0,-1,-1,-1,-1]);

}

function draw() {
  
  background(0);
  lumaShader.setUniform('mouse_position', [mouseX,mouseY]);
  quad(1, 1, -1, 1, -1, -1, 1, -1);
  /*beginShape();
    vertex(1, -1);
    vertex(-1, -1);
    vertex(-1, 1);
    vertex(1, 1);
  endShape(CLOSE);*/
}

function keyPressed(){
  if(key == '1'){
    lumaShader.setUniform('filter_selected', 1.0);
  }else if(key == '2'){
    lumaShader.setUniform('filter_selected', 2.0);
  }
  background(0);
  lumaShader.setUniform('mouse_position', [mouseX,mouseY]);
  quad(1, 1, -1, 1, -1, -1, 1, -1);
}