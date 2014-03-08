"use strict";
(function()
{
	if(window.ANSI.Document)
		return;
		
	window.ANSI.Document = function(characterBounds, rows, columns)
	{
		function Enumerator(dirtyQueue)
		{
			dirtyQueue.splice(0, 0, null);
			var row = 0;
			var col = -1;
			
			this.moveNext = function()
			{
				dirtyQueue.shift();
				return dirtyQueue.length !== 0;
			}
			
			this.current = function()
			{
				return dirtyQueue[0];
			}
		}
	
		var dirtyChars = [];	
		var foreColorState = new ANSI.Color();
		var backColorState = new ANSI.Color();
		var ansiCanvas = new ANSI.Canvas(this, characterBounds, new ANSI.Bounds(characterBounds.Width * columns, characterBounds.Height * rows));
		
		var characters = [];
		for(var row = 0; row < rows; row++)
		{
			characters.push([]);
			for(var col = 0; col < columns; col++)
			{
				characters[row].push(new ANSI.Character(col, row, characterBounds));
			}
		}
		
		this.setCharAt = function(c, x, y)
		{
			characters[y][x].RGBFore = foreColorState.Color;
			characters[y][x].RGBBack = backColorState.Color;
			characters[y][x].CharacterIndex = c.charCodeAt(0);
			dirtyChars.push(characters[y][x]);
		}
		
		this.clearCharAt = function(x, y)
		{
			characters[y][x].RGBFore = null;
			characters[y][x].RGBBack = null;
			characters[y][x].CharacterIndex = 32;
			dirtyChars.push(characters[y][x]);
		}
		
		this.defaultColor = function()
		{
			foreColorState.IsIntense = false;
			foreColorState.colorByNumber(37);
			backColorState.colorByNumber(40);
		}
		
		this.getEnumerator = function() 
		{
			var enumerator = new Enumerator(dirtyChars);
			dirtyChars = [];
			return enumerator;
		};
		
		Object.defineProperty(this, "ForeColorState", 
		{
			get: function() {return foreColorState; },
			set: function(value) {foreColorState = value;}
		});
		
		Object.defineProperty(this, "BackColorState", 
		{
			get: function() {return backColorState; },
			set: function(value) {backColorState = value;}
		});
		
		Object.defineProperty(this, "ANSICanvas",
		{
			get: function(){return ansiCanvas;}
		});
		
		Object.defineProperty(this, "Rows",
		{
			get: function(){return rows;}
		});
		
		Object.defineProperty(this, "Columns",
		{
			get: function(){return columns;}
		});
		
		this.defaultColor();
	}
})();