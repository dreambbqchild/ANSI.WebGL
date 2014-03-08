"use strict";
(function()
{
	if(window.ANSI.Parser)
		return;
	
	var STATES = 
	{
		FREE_TEXT : 0,
		ESCAPE_SEQUENCE : 1,
	};
	
	var ESCAPE = 27;
		
	window.ANSI.StateMachine = function(cursor, doc)
	{
		var sequence = null;
		var state = STATES.FREE_TEXT;
		var rendered = false;
		
		function cursorSequence()
		{
			if(sequence[0].length === 0)
				return 1;
			
			return parseInt(sequence[0]);
		}
				
		function cursorPosition()
		{
			var x = 0;
			var y = 0;
			if(sequence.length > 0)
				y = sequence[0].length ? sequence[0] : "1";
				
			if(sequence.length > 1)
				x = sequence[1].length ? sequence[1] : "1";
				
			cursor.setXY(x, y);
		}
	
		function cursorUp()
		{
			cursor.Y = cursor.Y - cursorSequence();
		}
	
		function cursorDown()
		{
			cursor.Y = cursor.Y + cursorSequence();
		}
	
		function cursorForeward()
		{
			cursor.X = cursor.X + cursorSequence();
		}
	
		function cursorBackward()
		{
			cursor.X = cursor.X - cursorSequence();
		}
	
		function saveCursorPosition()
		{
			cursor.saveCurrentPosition();
		}
		
		function restoreCursorPosition()
		{
			cursor.restoreSavedPosition();
		}
		
		function eraseDisplay()
		{
			var enumerator = doc.getEnumerator();
			while(enumerator.moveNext())
			{
				var c = enumerator.current();
				c.CharacterIndex = 0;
				c.RGBFore = null;
				c.RGBBack = null;
			}				
			
			doc.ANSICanvas.render();
			rendered = true;
		}
		
		function eraseLine()
		{
			var x = cursor.X;
			for(var x = cursor.X; x < ansiDocument.Columns; x++)
				doc.clearCharAt(x, cursor.Y);
		}
	
		function graphicsMode()
		{
			sequence.forEach(function(item)
			{
				var i = parseInt(item);
		
				if(i === 0)
					doc.defaultColor();
				else if(i === 1)
					doc.ForeColorState.IsIntense = true;
				else if(i >= 30 && i <= 37)
					doc.ForeColorState.colorByNumber(i);	
				else if(i >= 40 && i <= 47)
					doc.BackColorState.colorByNumber(i);	
			});
		}
	
		var TERMINATORS =
		{
			H : cursorPosition,
			f : cursorPosition,
			A : cursorUp,
			B : cursorDown,
			C : cursorForeward,
			D : cursorBackward,
			s : saveCursorPosition,
			u : restoreCursorPosition,
			J : eraseDisplay,
			K : eraseLine,
			m : graphicsMode
		};
		
		this.processChar = function(c)
		{
			rendered = false;
			switch(state)
			{
				case STATES.FREE_TEXT:
					if(c.charCodeAt(0) == ESCAPE)
					{
						state = STATES.ESCAPE_SEQUENCE;
						sequence = [""];
					}
					else
					{			
						cursor.putCharacter(c);
						doc.ANSICanvas.render();
						rendered = true;
					}
					break;
				case STATES.ESCAPE_SEQUENCE:
					if(TERMINATORS[c] !== undefined)
					{
						TERMINATORS[c]();
						sequence = null;
						state = STATES.FREE_TEXT;
					}
					else if(c === ';')
						sequence.push("");
					else if(c != "[")
						sequence[sequence.length - 1] += c;					
					break;
			}
			
			return rendered;
		}
	}
})();