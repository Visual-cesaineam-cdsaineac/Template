function setup() {
    createCanvas(1000, 10000);
    noLoop();
  }
  
function draw() {
    background(300);
    fill(0);
   
    var amount = 10
    var aux = 0
    var space= 50
    var side = 50
    var auxSide = side
    var auxy=side
    var linex = 0
    var mov = 0
    var Move = false
    for( var i = 0; i<7; i++){
      if(mov>40 ){
        Move = true
        mov-=20
      }else if(mov<0){
        Move = false
       mov+=20
      }else if(mov>0 && Move==true){
        mov-=20
      }else{
        mov+=20
      }    
      for(var j= 0; j<7; j++){
       
       
      var der = 0
      der = aux+space+mov
      aux= aux+side +space
      linex = der +100
     
      rect(der,auxy,side, side);
       
      }
      aux=0
      stroke(126);
      line(0,auxSide,linex,auxy)
      auxSide=auxSide +side+2
      auxy=auxy+side+2
    }
    stroke(126);
    line(0,auxSide,linex,auxy)   
}