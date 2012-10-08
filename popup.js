document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.getSelected(null, function(tab) {
		document.getElementById("textbox").value = tab.url;
		getDetails(tab.url);
      });
});

document.getElementById("submit").addEventListener('click',function(){
	getDetails(document.getElementById("textbox").value);
});

document.getElementById('textbox').addEventListener('keydown', function(event) {
	if (event.keyCode == 13) {
		getDetails(document.getElementById("textbox").value);
	}
});


function getDetails(url)
{
var req = new XMLHttpRequest();
req.open('GET', url, true);

req.onreadystatechange = function() {
		switch(req.readyState)
		{
		case 2:	document.getElementById("resultbox").innerHTML = "<img src='loading.gif' />";
				break;
				
		case 4:	var rawheaders = req.getAllResponseHeaders().toLowerCase();
				var headerarray = rawheaders.split('\r\n');
				var table = document.createElement("table");
				var tbody = document.createElement("tbody");
				var th = document.createElement("tr");
				th.innerHTML = "<th>Key</th><th>Value</th>";
				tbody.appendChild(th);
				for(i=0;i<headerarray.length;i++)
				{
				var index = headerarray[i].indexOf(':');
				var key = headerarray[i].substring(0,index); var value = headerarray[i].substring(index+1);
				var row = document.createElement("tr");
				var td1 = document.createElement("td");td1.className="key";td1.appendChild(document.createTextNode(key));
				var td2 = document.createElement("td");td2.className="value";td2.appendChild(document.createTextNode(value));
				row.appendChild(td1);row.appendChild(td2);
				tbody.appendChild(row);
				}
				table.appendChild(tbody);
				var el = document.getElementById("resultbox");
				while( el.hasChildNodes() ){
				el.removeChild(el.lastChild);
				}
				document.getElementById("resultbox").appendChild(table);
				break;
		}
};

req.send(null);

}


