"use strict";
(function()
{
	if(window.ANSI.Cursor)
		return;

	window.ANSI.Cursor = function(ansiDocument)
	{
		var self = this;
		var savedPosition = null;
		var _x = 0;
		var _y = 0;
		
		this.setXY = function(x, y)
		{
			_x = Math.max(0, Math.min(ansiDocument.Columns - 1, parseInt(x)));
			_y = Math.max(0, parseInt(y));
		}
		
		this.saveCurrentPosition = function()
		{
			savedPosition = {x: _x, y : _y};
		}
		
		this.restoreSavedPosition = function()
		{
			if(savedPosition !== null)
			{
				_x = savedPosition.x;
				_y = savedPosition.y;
				savedPosition = null;
			}
		}
		
		this.putCharacter = function(c)
		{
			if(c == '\r')
				return;
			
			if(c == '\n')
			{
				self.setXY(0, _y + 1);
				return;
			}
		
			if(_x === ansiDocument.Columns)
			{
				_x = 0;
				_y++;
			}
		
			ansiDocument.setCharAt(c, _x, _y);
			_x++;
		}
		
		Object.defineProperty(this, "X", 
		{
			get: function() {return _x; },
			set: function(value) {self.setXY(value, _y);}
		});
		
		Object.defineProperty(this, "Y", 
		{
			get: function() {return _y;},
			set: function(value) {self.setXY(_x, value);}
		});
	}	
})();