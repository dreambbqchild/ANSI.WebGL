"use strict";
(function()
{
	if(window.ANSI.Canvas)
		return;
	
	var black = [0.0, 0.0, 0.0, 1.0];7
	
	function makeUseProgram(gl)
	{
		var ajax = new AJAX();
		var shaders = [];
		
		ajax.getFragment("scripts/vertex.glsl", "text", function(vertex)
		{
			shaders.push(loadShader(gl, vertex, gl.VERTEX_SHADER));
		}, false);
		
		ajax.getFragment("scripts/fragment.glsl", "text", function(fragment)
		{
			shaders.push(loadShader(gl, fragment, gl.FRAGMENT_SHADER));
		}, false);
		
		var program = createProgram(gl, shaders);
		gl.useProgram(program);
		return program;
	}
	
	function loadSprite()
	{
		var img = new Image();
		img.src = "data:image/png;base64,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";
		document.body.appendChild(img);
		document.body.removeChild(img);
		return img;
	}
	
	window.ANSI.Canvas = function(doc, charBounds, canvasBounds) 
	{
		var img = loadSprite();
		var canvas = document.createElement("canvas");
		var shaders = [];
		canvas.width = canvasBounds.Width;
		canvas.height = canvasBounds.Height;
		var gl = setupWebGL(canvas, {preserveDrawingBuffer: true});
		var program = makeUseProgram(gl);
		
		var positionLocation = gl.getAttribLocation(program, "a_position");
		var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
		var texCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0,  0.0,
														 1.0,  0.0,
														 0.0,  1.0,
														 0.0,  1.0,
														 1.0,  0.0,
														 1.0,  1.0]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(texCoordLocation);
		gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

		var resolutionLocation = gl.getUniformLocation(program, "resolution");
		gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
		
		var textureWidthLocation = gl.getUniformLocation(program, "texturePxWidth");
		gl.uniform1f(textureWidthLocation, img.width);
		var charWidthLocation = gl.getUniformLocation(program, "characterPxWidth");
		gl.uniform1f(charWidthLocation, charBounds.Width)
		
		var indexLocation = gl.getUniformLocation(program, "index");
		var foreColorLocation = gl.getUniformLocation(program, "foreColor");
		var backColorLocation = gl.getUniformLocation(program, "backColor");
			
		var buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
			
		this.render = function()
		{	
			var enumerator = doc.getEnumerator();
			while(enumerator.moveNext())
			{
				var c = enumerator.current();
				gl.uniform1f(indexLocation, Math.max(0, c.CharacterIndex - 32));
				gl.uniform4fv(foreColorLocation, c.RGBFore || black);
				gl.uniform4fv(backColorLocation, c.RGBBack || black);
				gl.bufferData(gl.ARRAY_BUFFER, c.Points, gl.STATIC_DRAW);
				gl.drawArrays(gl.TRIANGLES, 0, 6);
			}		
		}
		
		Object.defineProperty(this, "Canvas", 
		{
			get: function() {return canvas; },
		});
	}
})();