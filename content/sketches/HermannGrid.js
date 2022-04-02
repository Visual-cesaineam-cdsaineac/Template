let zoom
let aux= 2
let check

function setup() {
    zoom = createSlider(10,40,0,2)
    check = createCheckbox('Mostrar', true);
    createCanvas(700, 350);
    frameRate(30);
    fill(0)
  }
  
function draw() {
    background("white");
    if(check.checked()){     
        for(i = 0; i <= 700; i++ ){
            for(j=0; j<= 350; j++){
                rect((i*50)+1,(j*50)+1,zoom.value(),zoom.value())
            }
        }
    }
}