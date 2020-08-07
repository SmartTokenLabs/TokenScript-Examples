function loadIframe(){
	var iframes = document.getElementsByTagName("iframe");
	for(var i=0; i<iframes.length; i++){
		var iframe = iframes[i];
		var textContent = iframe.textContent;
		var wrapper = document.createElement('div');
		wrapper.innerHTML = textContent;
		
		iframeContentDocument = iframe.contentDocument || iframe.contentWindow.document;
		iframeContentDocument.write(wrapper.innerHTML);
		iframe.textContent = "";
	}

}