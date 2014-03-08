"use strict";
(function()
{
	if(window.ANSI.Bounds)
		return;
		
	window.ANSI.Bounds = function(width, height)
	{
		Object.defineProperty(this, "Width", 
		{
			get: function() {return width; },
		});
		
		Object.defineProperty(this, "Height", 
		{
			get: function() {return height;},
		});
	}
})();