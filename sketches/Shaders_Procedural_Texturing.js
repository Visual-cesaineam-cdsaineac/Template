let pg;
let illusionShader;
let zoom = 3;
let blur = false;
function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  illusionShader = readShader('/Template/sketches/shaders/chess.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use illusionShader to render onto pg
  pg.shader(illusionShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(illusionShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  illusionShader.setUniform('u_zoom', zoom);
  illusionShader.setUniform('u_blur', blur);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  //cylinder(100, 200);
  box(200)
  //sphere(100);
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    zoom -= 1;
    illusionShader.setUniform('u_zoom', zoom);
  } else if (keyCode === RIGHT_ARROW) {
    zoom += 1;
  } else if (key == 'b'){
    blur = !blur;
  }
  illusionShader.setUniform('u_zoom', zoom);
  illusionShader.setUniform('u_blur', blur);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}