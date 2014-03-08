"use strict";
(function()
{
	if(window.ANSI.Color)
		return;
		
	var Color = 
	{
		Base:
		{
			BLACK: [0.0, 0.0, 0.0, 1.0],
			RED: [0.5, 0.0, 0.0, 1.0],
			GREEN: [0.0, 0.5, 0.0, 1.0],
			YELLOW: [0.5, 0.5, 0.0, 1.0],
			BLUE: [0.0, 0.0, 0.5, 1.0],
			MAGENTA: [0.5, 0.0, 0.5, 1.0],
			CYAN: [0.0, 0.5, 0.5, 1.0],
			WHITE:[0.5, 0.5, 0.5, 1.0]
		},
		Intense : {}
	};
	
	for(var prop in Color.Base)
	{
		Color.Intense[prop] = [];
		Color.Base[prop].forEach(function(v)
		{
			Color.Intense[prop].push(v ? 1.0 : 0.0);
		});
	}
	
	var ColorNumberMap = 
	{
		30: "BLACK",
		31: "RED",
		32: "GREEN",
		33: "YELLOW",
		34: "BLUE",
		35: "MAGENTA",
		36: "CYAN",
		37: "WHITE",
	}
	
	for(var prop in ColorNumberMap)
		ColorNumberMap[parseInt(prop) + 10] = ColorNumberMap[prop];
	
	window.ANSI.Color = function()
	{
		var isIntense = false;
		var color = "BLACK";
		
		this.colorByNumber = function(number) {
			color = ColorNumberMap[number];
		}
		
		Object.defineProperty(this, "IsIntense", 
		{
			get: function() {return isIntense; },
			set: function(value) {isIntense = value; },
		});
	
		Object.defineProperty(this, "Color", 
		{
			get: function() 
			{
				var src = isIntense ? Color.Intense : Color.Base;
				return src[color].slice(0);
			},
		});
	}
})();