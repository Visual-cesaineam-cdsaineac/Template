---
bookCollapseSection: true
---

# Transformaciones
<a href="https://visualcomputing.github.io/docs/scene_trees/introduction/">Introducción a las transformaciones espaciales </a>


### Controller.js


Controller.js está construido para manejar el trabajo asociado con el uso de la API del Gamepad para que sea más fácil de usar para fines no relacionados con el juego. Tiene tres características principales:

#### 1. Una interfaz basada en eventos

Controller.js dispara eventos DOM sobre el estado del controlador y los cambios de entrada. Mantiene un registro de los cambios de cada entrada a lo largo del tiempo y los informa de forma similar a los eventos de ratón y teclado.

Cada evento proporciona un paquete de información sobre el evento disparado, como las coordenadas y el ángulo para los eventos del stick analógico.

#### 2. Nombres de entrada estandarizados 

Uno de los retos de trabajar con gamepads es la cantidad y variedad de dispositivos que existen en el mercado. Algunos tendrán más entradas que un gamepad "normal" y otros tendrán menos. La API de los gamepads permite un número arbitrario de botones y ejes, pero no ofrece una forma de saber qué es cada una de esas entradas. buttons[0] puede ser una entrada del D-pad en un gamepad, pero un trigger en otro.

Controller.js alivia este problema mapeando las entradas en bruto contra un conjunto de diseños conocidos y dando a cada entrada un nombre único y descriptivo, por ejemplo: "DPAD_UP", "LEFT_SHOULDER", "RIGHT_ANALOG_STICK".

#### 3. Funciones y ajustes útiles

Controller.js proporciona un conjunto de funciones para tareas comunes y opciones configurables para cada gamepad. Maneja el proceso de descubrir los gamepads, mapear sus entradas y escuchar y pausar los eventos de esos gamepads. También proporciona ajustes para hacer cosas como cambiar la sensibilidad de los botones o asignar los movimientos del stick analógico al D-pad.

## Aplicaciones 
{{< p5-iframe sketch="/Template/sketches/Brush3d.js" width="640" height="470" >}}

## Discusión

Luego de haber visto varios sensores de hardware y haber experimentado con ellos (como lo fueron el Leap motion y el space navigator), nos parecio bastante interesante saber que existe este hardware y que cubre diferentes necesidades pero en nuestro caso quisimos experimentar con uno diferente como es el control de una consola de vieo juegos que investigando por internet encontramos una libreria desarrollada por un palestino <a href="https://twitter.com/SamIAre">Samir Are</a> quien desarrollo una libreria en Javascript para reconocer los comando de un control, en este caso es un control de xbox. Nos pareció un hecho bastante interesante de unir nuestro gusto por los videojuegos ya que el control es una herramienta fundamental a la hora de jugar y que además los controles en los espacios tridimensionales se vuelven muy intuitivos ya que cuando se juegan videojuegos casi siempre se están accediendo a estos espacios tridimensionales.


## Conclusiones

- En el mundo digital encontramos muchas alternativas de sensores por hardware que cada vez van siendo más complejos, pero que para el usuario se convierten cada vez más precisos y manejables.
- En la web encontramos personas o empresas que se dedican al uso de estos sensores por hardware lo que permite que su campo de uso sea mucho mas amplio o que permite adaptar hardware por medio de software como nuevos tipos de sensores.
- Las transformaciones 3d nos permiten hacernos una idea más cercana de lo complejo pero a la vez lo simple que se pueden generar estos espacios digitalmente, permitiéndonos así tener una visión un poco más clara lo que sucede en las proyecciones 3d como son las animaciones digitales que es un tema que abarca muchas áreas en la computación visual.


## Referencias

<a href="https://samiare.github.io/Controller.js/">Controller.js</a> 

