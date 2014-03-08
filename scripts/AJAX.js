"use strict";
(function()
{	
	if(window.AJAX)
		return;

	window.AJAX = function()
	{
		var xhr = new XMLHttpRequest();
		var fnFinish = null;
		var htmlDIV = document.createElement("div");
	
		xhr.onload = function(e) 
		{
			var fnFinishLocal = fnFinish;
			fnFinish = null;
			
			if (this.status == 200) 
				fnFinishLocal(this.response);
		};
		
		this.getFragment = function(file, type, callback, async)
		{
			if(fnFinish === null)
			{	
				var preCallback = null;
				switch(type)
				{
					case 'text':
						preCallback = function(response)
						{
							callback(response);
						}
					break;
					case 'html':
						preCallback = function(response)
						{
							htmlDIV.innerHTML = response;
							var result = htmlDIV.firstChild;
							htmlDIV.removeChild(result);
							callback(result);
						}		
					break;
					case 'arraybuffer':
						preCallback = function(response)
						{
							callback(new Uint8Array(response));
						}		
					break;
				}			
							
				xhr.open('GET', file, async === false ? false : true);	
				if(async !== false)
					xhr.responseType = type;
								
				fnFinish = preCallback;
				xhr.setRequestHeader("Cache-Control", "max-age=0");
				xhr.send();
			}
		}
	}
})();