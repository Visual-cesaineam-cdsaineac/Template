precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;
uniform vec2 mouse_position;
uniform float filter_selected;
uniform vec2 u_resolution;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
vec3 luminance() {

  vec4 color = texture2D(texture, texcoords2);
  
  vec2 st = gl_FragCoord.xy; 
  vec2 mouse = vec2(mouse_position.x, 500.0 - mouse_position.y);

  /*if(st.x <= mouse.x + 100.0 && 
    st.x > mouse.x - 100.0 && 
    500.0 - st.y <=  mouse.y + 100.0 &&
    500.0 - st.y > mouse.y - 100.0){
      r = 0.0;
      g = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      b = 0.0;
  }*/


  if(distance(st,mouse)< 150.0){
    vec4 color = texture2D(texture, vec2((1.0- mouse.x/700.0) + (texcoords2.x - mouse.x/700.0)*0.4,(1.0- mouse.y/500.0) + (texcoords2.y - mouse.y/500.0)*0.4));
    float r = color.r;
    float g = color.g;
    float b = color.b;

    float Cmax = max(r,max(g,b)); 
    float Cmin = min(r,min(g,b));

    float V;
     
    // HSV 
    if (filter_selected == 2.0){
      V = Cmax;
    }
    //HSL
    else if (filter_selected == 3.0){
      V = (Cmax + Cmin) / 2.0;
    }
    // luma by default
    else{
      V = dot(color.rgb, vec3(0.299, 0.587, 0.0114));
    }

    vec3 result = vec3(V);
    result.r = 0.0;
    result.b = 0.0;
    
    return result;

  }else{

    vec4 color = texture2D(texture, texcoords2);

    float r = color.r;
    float g = color.g;
    float b = color.b;

    return (vec3(r,g,b));
  }

}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  /*vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = vec4(luminance(texel.rgb), 1.0);*/
  gl_FragColor = vec4(luminance(), 1.0);
}