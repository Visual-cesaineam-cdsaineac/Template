---
bookCollapseSection: true
---

# Shaders

Los shaders no son más que simples programas que se ejecutan en el procesador gráfico GPU, son escritos en el lenguaje GLSL, el cual es bastante similar a C, como cualquier otro programa los shaders deben ser compilados y enlazados, solo que el compilador y el enlazador o linker están integrados en la API [OpenGL](https://www.opengl.org/).

OpenGL cuenta con diferentes tipos de shaders, cada uno en su nivel correspondiente, de momento veremos los dos shaders requeridos Vertex Shader en el primer nivel y Fragment Shader en el último, los demos están ubicados entre estos dos y son opcionales.

## Vertex shader:

El vertex shader tiene dos funciones principales las cuales son :

- Proyecta el vertex dentro del clip space. El resultado de esta operación debe almacenarse en la variable reservada gl_Position glsl. Por ejemplo  

``` glsl
gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0)
```
- Definir qué atributos del vertex interpolar para que estén disponibles en la etapa de fragment shader. Los atributos interpolados deben ser definidos usando varyng glsl variables.
        
## Variables del vertex shader: 

1. Vertex attributes: 
    
    Son variables definidas en una base por vértice por la API p5. Ten en cuenta que los atributos de vértice suelen ser definidos por la propia API p5 y el uso de atributos de vértice personalizados está fuera del alcance de esta plantilla de ebook.
2. Uniforms: 

    Son variables que permanecen constantes para todos los vértices que se procesan. Ten en cuenta que las variables uniformes pueden ser definidas tanto por la API p5 como por el skecth con setUniform y que están disponibles tanto para el sombreador de vértices como para el de fragmentos.
3. Varying:

    Se definen directamente en el sombreador de vértices para señalar los atributos de los vértices que deben interpolarse para el sombreador de fragmentos.

## Fragment shader: 

La tarea del fragment shader es definir el color normalizado del fragmento (es decir, del píxel) que siempre debe asignarse a la variable reservada gl_FragColor vec4.

El fragment shader tiene acceso a las coordenadas actuales del fragment en el espacio de la pantalla a través de la variable reservada glsl gl_FragCoord. El espacio de pantalla se define como una caja de dimensiones [0..width] * [0..height] * [0..1], donde width y height son las dimensiones de la ventana y la coordenada z almacena la profundidad del fragmento (0 para el plano cercano y 1 para el lejano).

# Conclusiones
- Es mucho más óptimo trabajar con shaders, pues las implementaciones por medio de hardware no sobrecargan el navegador o la interfaz que se esté usando al aprovechar tarjeta gráfica.
- El desarrollo de shaders se complica ocasionalmente puesto que no hay una manera directa de hacer debugging, sin embargo al entender la lógica entre el fragment shader y Javascript se logran hacer implementaciones de alta calidad. 
- Como trabajo futuro, sería interesante desarrollar un shader más “inteligente” que a partir del filtro de visión nocturna permitiera reconocer las placas de los autos pasando.



