precision mediump float;
uniform float index;
uniform float texturePxWidth;
uniform float characterPxWidth;
uniform sampler2D image;
uniform vec4 foreColor;
uniform vec4 backColor;
varying vec2 texCoord;

void main() 
{
	float low = (index * characterPxWidth) / texturePxWidth;
	float hi = ((index + 1.0) * characterPxWidth) / texturePxWidth;
	vec4 color = texture2D(image, vec2(low + (hi - low) * texCoord.x, texCoord.y));
	if(color.r == 0.0)
	   gl_FragColor = backColor;
	else
	   gl_FragColor = foreColor;
}