attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 resolution;
varying vec2 texCoord;

void main() {
   vec2 zeroToOne = a_position / resolution;
   vec2 zeroToTwo = zeroToOne * 2.0;
   vec2 clipSpace = zeroToTwo - 1.0;
   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
   texCoord = a_texCoord;
}