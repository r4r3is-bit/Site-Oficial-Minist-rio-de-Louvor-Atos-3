function extrairID(url){

const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
const match = url.match(regExp);

return match ? match[1] : url;

}

const params = new URLSearchParams(window.location.search)

const lista = params.get("hinos")

if(!lista){

document.getElementById("estudoEscala").innerHTML =
"<p>Nenhuma música selecionada.</p>"

throw new Error("Nenhuma música")

}

const nomes = decodeURIComponent(lista).split("|")

fetch("data/hinos.json")
.then(r => r.json())
.then(hinos => {

const area = document.getElementById("estudoEscala")

nomes.forEach(nome => {

const h = hinos.find(x => x.nome === nome)

if(!h) return

const id = extrairID(h.youtube_principal)

area.innerHTML += `

<div class="bloco-estudo">

<h2>${h.nome}</h2>

<iframe
src="https://www.youtube.com/embed/${id}"
allowfullscreen>
</iframe>

<div class="cifra">

<p>Tom: ${h.tom}</p>

<a href="${h.cifra}" target="_blank">
Abrir cifra completa
</a>

</div>

<textarea
class="anotacao-hino"
placeholder="Anotações sobre este hino...">
</textarea>

</div>

`;

})  // fecha o forEach

})  // fecha o then
.catch(err => {

console.error("Erro ao carregar hinos:", err)

document.getElementById("estudoEscala").innerHTML =
"<p>Erro ao carregar as músicas.</p>"

})