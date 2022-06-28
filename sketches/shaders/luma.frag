precision mediump float;

// uniforms are defined and sent by the sketch
uniform float filter_selected;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

// returns V of HSV of given texel
float HSV(vec3 texel) {
  float r = texel.r;
  float g = texel.g;
  float b = texel.b;
  
  float Cmax = max(r,max(g,b)); 

  float V = Cmax;
  return V; 
}

// returns L of HSL of given texel
float HSL(vec3 texel) {
  float r = texel.r;
  float g = texel.g;
  float b = texel.b;
  
  float Cmax = max(r,max(g,b)); 
  float Cmin = min(r,min(g,b));

  float L = (Cmax + Cmin) / 2.0;
  return L; 
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);

  if (filter_selected == 1.0){
    gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
  }else if(filter_selected == 2.0){
    gl_FragColor = vec4(vec3(HSV(texel.rgb)), 1.0);
  }else if(filter_selected == 3.0){
    gl_FragColor = vec4(vec3(HSL(texel.rgb)), 1.0);
  }else{
    gl_FragColor = texel;
  }
}