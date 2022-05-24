// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color;
let depth;
let brush;

let easycam;
let state;

let escorzo;
let points;
let record;

//Controller controls 
let z_cero = 250;
let zmas = 0;
let zmenos = 0;

let center_x = 0;
let center_y = 0;

let rotate_x = 0;
let rotate_y = 0;
let rotate_z = 0;

function setup() {
    createCanvas(600, 450, WEBGL);
    // easycam stuff
    let state = {
        distance: z_cero,           // scalar
        center: [center_x, center_y, 0],       // vector
        //rotation: [rotate_x,  0,rotate_y, 0.5],  // quaternion
        rotation: [0, 0, 0, 1],
    };
    easycam = createEasyCam();
    easycam.state_reset = state;   // state to use on reset (double-click/tap)
    easycam.setState(state, 2000); // now animate to that state
    escorzo = true;
    perspective();


    //Controller 

    if (Controller && Controller.supported) {
        Controller.search();
        window.addEventListener('gc.button.press', function (event) {
            if (event.detail.value > 0.1) {

                if (event.detail.name == 'FACE_1') {
                    
                    record = !record;

                } else if (event.detail.name == 'SELECT') {
                    
                    let state = {
                        distance:250,           // scalar
                        center: [0, 0, 0],       // vector
                        rotation: [0,0,0, 1],  // quaternion
                    };
                    easycam.setState(state)

                }else if (event.detail.name == 'FACE_4') {
                 points=[]
                }
                else if (event.detail.name == 'LEFT_SHOULDER') {
                    rotate_z -= 10
                    let state = {
                        distance: z_cero,           // scalar
                        center: [center_x, center_y, 0],       // vector
                        rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                    };
                    easycam.setState(state)

                } else if (event.detail.name == 'RIGHT_SHOULDER') {
                    rotate_z += 10
                    let state = {
                        distance: z_cero,           // scalar
                        center: [center_x, center_y, 0],       // vector
                        rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                    };
                    easycam.setState(state)

                }

                else if (event.detail.name == 'RIGHT_SHOULDER_BOTTOM') {
                    // xbox
                    z_cero += 20;

                    let state = {
                        distance: z_cero,           // scalar
                        center: [center_x, center_y, 0],       // vector
                        rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                    };
                    easycam.setState(state)
                } else if (event.detail.name == 'LEFT_SHOULDER_BOTTOM') {
                    z_cero -= 20;

                    let state = {
                        distance: z_cero,           // scalar
                        center: [center_x, center_y, 0],       // vector
                        rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                    };
                    easycam.setState(state)
                }
            }
        }, false);

        window.addEventListener('gc.analog.hold', function (event) {
            //console.log(event.detail);
            if (event.detail.name == 'LEFT_ANALOG_STICK') {
                center_x += event.detail.position.x;
                center_y += event.detail.position.y;
                let state = {
                    distance: z_cero,           // scalar
                    center: [center_x, center_y, 0],//vector
                    rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                };
                easycam.setState(state)
            }
            if (event.detail.name == 'RIGHT_ANALOG_STICK') {
                rotate_x += event.detail.position.x;
                rotate_y += event.detail.position.y;
                let state = {
                    distance: z_cero,           // scalar
                    center: [center_x, center_y, 0],//vector
                    rotation: [rotate_y, rotate_x, rotate_z, 1],  // quaternion
                };
                easycam.setState(state)
            }

        }, false);
    }


    // brush stuff
    points = [];
    depth = createSlider(0, 1, 0.05, 0.05);
    depth.position(10, 10);
    depth.style('width', '580px');
    color = createColorPicker('#ed225d');
    color.position(width - 70, 40);
    // select initial brush
    brush = sphereBrush;
}

function draw() {
    update();
    background(180);
    push();
    strokeWeight(1);
    stroke('black');
    grid({ dotted: false });
    pop();
    axes();
    for (const point of points) {
        push();
        translate(point.worldPosition);
        brush(point);
        pop();
    }
}

function update() {


    let dx = abs(mouseX - pmouseX);
    let dy = abs(mouseY - pmouseY);
    speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
    if (record) {
        points.push({
            worldPosition: treeLocation([mouseX, mouseY, depth.value()], { from: 'SCREEN', to: 'WORLD' }),
            color: color.color(),
            speed: speed
        });
    }
}

function sphereBrush(point) {
    push();
    noStroke();
    // TODO parameterize sphere radius and / or
    // alpha channel according to gesture speed
    fill(point.color);
    sphere(1);
    pop();
}

function keyPressed() {


    if (key === 'r') {
        record = !record;
    }
    if (key === 'p') {
        escorzo = !escorzo;
        escorzo ? perspective() : ortho();
    }
    if (key == 'c') {
        points = [];
    }
}

function mouseWheel(event) {
    //comment to enable page scrolling
    return false;
}