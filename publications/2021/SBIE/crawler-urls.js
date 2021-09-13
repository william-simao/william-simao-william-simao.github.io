/*
Instruções de uso:
- 1. fazer a busca pela string
- 2. clicar na engrenagem
- 3. alterar o campo itens para 100
- 4. clicar em ordenar
- 5. executar o código abaixo no console do navegador
-- 5.1 copiar o texto gerado na linha 41
-- 5.2 colar o texto em um editor (recomenda-se Sublime)
-- 5.3 salvar o texto em formato .csv
--- 5.3.1 recomenda-se fazer uma substituição do "\n" para nova quebra de linha
- 6. ir para nova página e repetir o processo a partir da etapa 5
*/

let links = []
for(let i = 0; i < 100; i++){
    links.push(document.getElementsByClassName("t1")[i].getElementsByTagName("a")[0].href)
}

links = []

csv = ""
for(var i = 0; i < 2; i++){
	const Http = new XMLHttpRequest();
	Http.open("GET", links[i] + "?mode=full");
	Http.send();
	Http.onreadystatechange = (e) => {
  		var result = Http.responseText;
  		if (Http.readyState == 4){
  			if (Http.status === 200) {  
  				csv += document.getElementsByTagName("table")[0].innerText.replaceAll(";", "").replaceAll("\t", ";").replace("\n", " \n ")
  				csv += "\n";
       		}
		}
		console.log(`-- Request: #${i}. Status: Processed at ${new Date()}`);
	}
	console.log('--end--');
}

console.log(csv)