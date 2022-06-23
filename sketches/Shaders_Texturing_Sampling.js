let lumaShader;
let img;
let grey_scale;
let HSV_filter;

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

  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));

  HSV_filter = createCheckbox('HSV', false);
  HSV_filter.position(10, 30);
  HSV_filter.style('color', 'white');
  HSV_filter.input(() => lumaShader.setUniform('HSV_filter', HSV_filter.checked()));

  
  HSL_filter = createCheckbox('HSL', false);
  HSL_filter.position(10, 50);
  HSL_filter.style('color', 'white');
  HSL_filter.input(() => lumaShader.setUniform('HSL_filter', HSL_filter.checked()));
  
  lumaShader.setUniform('texture', img);
}
  
function draw() {
  background(0);
  quad(1, 1, -1, 1, -1, -1, 1, -1);
  /*beginShape();
    vertex(1, -1);
    vertex(-1, -1);
    vertex(-1, 1);
    vertex(1, 1);
  endShape(CLOSE);*/
}