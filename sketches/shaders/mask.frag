precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;
uniform vec2 mouse_position;
uniform float filter_selected;
uniform vec2 u_resolution;


uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;



float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}


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


  if(distance(st,mouse)< 90.0){
     // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  // origin (current fragment texcoords)
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }

  if(filter_selected == 1.0){
     return convolution.rgb;
  }else if(filter_selected == 2.0){
   return (vec3(luma(color.rgb)));
  }
    
  

   

   
 
    

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
  gl_FragColor = vec4(luminance(texel.rgb), 1.0);
  gl_FragColor = vec4(luminance(), 1.0);
  */
  

   
    gl_FragColor = vec4(luminance(), 1.0);

}