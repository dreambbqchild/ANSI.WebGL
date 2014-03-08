"use strict";
require("AJAX");
	
(function()
{
	if(window.ANSI.Text)
		return;

	window.ANSI.Text = function(file, readyFn)
	{
		var ajax = new AJAX();
		var self = this;
		var rawData = null;
		var index = -1;
		
		ajax.getFragment(file, 'arraybuffer', function(ans)
		{
			rawData = ans;
			readyFn(self);
		});
		
		this.moveNext = function()
		{
			return ++index < rawData.length;
		}
		
		this.current = function()
		{
			if(index < rawData.length)
				return String.fromCharCode(rawData[index]);
			else
				return null;
		}
	}
})();