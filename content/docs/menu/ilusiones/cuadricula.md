## Definición. 

Una ilusión de cuadrícula es cualquier tipo de cuadrícula que engaña la visión de una persona. Los dos tipos más comunes de ilusiones de rejilla son la ilusión de rejilla de Hermann y la ilusión de rejilla centelleante. 

Ilusiones como éstas, demuestran la forma en que los ojos y el cerebro trabajan juntos en la creación de la percepción. Las ilusiones también pueden ayudarnos a darnos cuenta de que nuestras propias percepciones pueden ser limitadas o diferentes de las de otra persona que ve lo mismo. 


## Cuadricula de Hermann

La cuadrícula de Hermann es un ejemplo clásico de lo que los científicos de la visión llaman una ilusión de contraste de luminosidad simultánea, pero los filósofos han señalado que no está claro si clasificarla mejor como una ilusión o como una especie de alucinación

Esta ilusión fue comunicada por primera vez por Ludimar Hermann en 1870, quien descubrió la ilusión mientras leía la obra On Sound de John Tyndall. En 1872, Ewald Hering observó que los colores inversos (una cuadrícula negra sobre un fondo blanco) producían resultados similares. Por ello, la cuadricula de Hermann se denomina a menudo cuadricula "Hermann-Hering". 

{{< details title="Implementación cuadricula Hermann" open=false >}}
```js
{{</* p5-iframe sketch="/Template/sketches/HermannGrid" width="725" height="425 

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
*/>}}
```
{{< /details >}}

{{< p5-iframe sketch="/Template/sketches/HermannGrid.js" width="720" height="375" >}}

## Ilusion de Bergen

Un fenómeno sorprendente fue descubierto por Bergen en 1985, quien desenfocó una cuadrícula de Hermann mediante el filtrado de pasa-bajas del estímulo de la cuadrícula estándar. Informó que, al igual que en la versión original, las manchas no aparecen cerca del punto de fijación. Las manchas se hacen más intensas cuando se mueven los ojos, creando un efecto de centelleo. El efecto centelleo se aprecia mejor en una pantalla que en la versión impresa, y sólo se ve dentro de un determinado rango de desenfoque, cuyo óptimo varía de un observador a otro. 

{{< details title="Implementación Ilusion de Bergen" open=false >}}
```js
{{</* p5-iframe sketch="/Template/sketches/blurredGrid.js" width="720" height="375" 

function setup() {
    createCanvas(700, 350);
    noLoop()
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
    filter(BLUR,2)
}
*/>}}
```
{{< /details >}}

{{< p5-iframe sketch="/Template/sketches/blurredGrid.js" width="720" height="375" >}}

## Cuadricula centelleante

La ilusión de la cuadricula centelleante es una ilusión óptica descubierta por Elke Lingelbach en 1994, y suele considerarse una variación de la ilusión de la cuadricula de Hermann. Lingelbach y sus colegas publicaron sus hallazgos en un artículo de 1995 titulado "La cuadricula Hermann y el efecto de centelleo" 

{{< details title="Implementación Cuadricula centelleante" open=false >}}
```js
{{</* p5-iframe sketch="/Template/sketches/ScintillatingGrid.js" width="725" height="425" 

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
*/>}}
```
{{< /details >}}
{{< p5-iframe sketch="/Template/sketches/ScintillatingGrid.js" width="725" height="425" >}}

## Explicación

El efecto de ambas ilusiones ópticas se explica comúnmente por un proceso neural llamado inhibición lateral. Las células de la retina del ojo funcionan como receptores de luz. Si se ilumina un solo receptor, éste percibe una mayor cantidad de luz que cuando se iluminan también los receptores vecinos. La iluminación de los receptores inhibe el disparo de los receptores cercanos, y el efecto se transmite lateralmente. En el caso de la ilusión de la cuadrícula de Hermann, la configuración de las bandas blancas crea una situación en la que hay más luz alrededor de las intersecciones que a lo largo de las bandas entre las intersecciones. Por tanto, la región de la intersección está más inhibida y aparecen manchas más oscuras.  










