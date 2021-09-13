/*
Instruções de uso
- passar para o método getRequest() a URL desejada para extração dos metadados
*/

csv = "";
function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

function getRequest(url) {
	const Http = new XMLHttpRequest();
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange = (e) => {
  		var result = Http.responseText;
  		if (Http.readyState == 4 && Http.status == 200){
  			result = removeHtml(result);
  			result = removeTags(result);
  			csv += "\n" + result;
  		}
	}	
}

function removeHtml(text) {
	var str = text.split('<link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />')[1];
	return str.split(`<script type='text/javascript' src="/static/js/jquery/jquery-1.10.2.min.js"></script>`)[0].trim();

}

function removeTags(text) {
	var str1 = replaceAll(text, `<meta name="`, ``);
	var str2 = replaceAll(str1, `;`, `,`);
	var str3 = replaceAll(str2, `" content="`, `;`);
	return replaceAll(str3, `" />`, ``);
}

function replaceAll(str, needle, replacement) {
    return str.split(needle).join(replacement);
}