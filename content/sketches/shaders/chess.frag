#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;
uniform bool u_blur;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return (uv.x)*(uv.y);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //Cantidad de cuadros en cada cara del cubo
    st = tile(st,u_zoom);

    // Draw a square
    float blur_value = 0.01;

    if(u_blur){
        blur_value = 0.2;
    }else{
        blur_value = 0.01;
    }

    color = vec3(1.0 - box(st,vec2(0.85),blur_value));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
