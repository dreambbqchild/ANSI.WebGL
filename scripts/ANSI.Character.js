"use strict";
(function()
{
	if(window.ANSI.Character)
		return;
	
	window.ANSI.Character = function(x, y, bounds)
	{
		var x1 = bounds.Width * x;
		var x2 = bounds.Width * x + bounds.Width;
		var y1 = bounds.Height * y;
		var y2 = bounds.Height * y + bounds.Height;
		var charIndex = 0;
		
		var points = new Float32Array([x1, y1,
									   x2, y1,
									   x1, y2,
									   x1, y2,
									   x2, y1,
									   x2, y2]);
		this.RGBFore = null;
		this.RGBBack = null;
										   
		Object.defineProperty(this, "Points", 
		{
			get: function() {return points; },
		});
		
		Object.defineProperty(this, "CharacterIndex", 
		{
			get: function() {return charIndex; },
			set: function(value) { charIndex = Math.max(0, Math.min(255, value)); }
		});
	};
})();