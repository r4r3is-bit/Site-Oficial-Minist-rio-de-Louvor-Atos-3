const params = new URLSearchParams(window.location.search);

const lista = params.get("hinos");
const tipo = params.get("tipo");

// ================= ESTUDO POR ESCALA =================

if(lista){

document.getElementById("tituloEstudo").innerText = "Escala para Estudo";

// esconde seções que não são usadas
document.getElementById("tituloVideos").style.display = "none";
document.getElementById("tituloLinks").style.display = "none";
document.getElementById("tituloExercicios").style.display = "none";

document.getElementById("videosEstudo").style.display = "none";
document.getElementById("linksEstudo").style.display = "none";
document.getElementById("exerciciosEstudo").style.display = "none";

const nomes = decodeURIComponent(lista).replace(/\n/g,"").split("|");

fetch("data/hinos.json")
.then(r => r.json())
.then(hinos => {

const area = document.getElementById("estudoEscala");

area.innerHTML = "";

nomes.forEach(nome => {

const h = hinos.find(x => x.nome === nome);

if(!h) return;

const id = extrairID(h.youtube_principal);

area.innerHTML += `

<div class="bloco-estudo">

<h2>${h.nome}</h2>

<iframe
src="https://www.youtube.com/embed/${id}"
allowfullscreen>
</iframe>

<div class="cifra-estudo">

<h3>Cifra</h3>

<iframe
src="${h.cifra}"
class="iframe-cifra">
</iframe>

</div>

<textarea
class="anotacao-hino"
placeholder="Anotações sobre este hino...">
</textarea>

</div>

`;

});

});

}

function extrairID(url) {
  
  const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regExp);
  
  return match ? match[1] : url;
  
}

if (!tipo && !lista) {
  document.getElementById("tituloEstudo").innerText = "Estudo não encontrado";
  throw new Error("Tipo de estudo não informado");
}

if(tipo){

fetch(`data/estudos/${tipo}.json`)
  .then(r => r.json())
  .then(d => {
        
    document.getElementById("tituloEstudo").innerText = d.titulo || "";
    
    const textoArea = document.getElementById("textoEstudo");
    textoArea.innerHTML = "";
    
    
    // ================= TEXTO =================
    
    if (typeof d.texto === "string") {
      
      const paragrafos = d.texto.split("\n\n");
      
      paragrafos.forEach(p => {
        
        const texto = p.trim();
        
        if (!texto) return;
        
        textoArea.innerHTML += `
<p class="paragrafo-estudo">${texto}</p>
`;
        
      });
      
    }
    
    
    if (Array.isArray(d.texto)) {
      
      d.texto.forEach(bloco => {
        
        if (bloco.tipo === "subtitulo") {
          
          textoArea.innerHTML += `
<h3 class="subtitulo-estudo">${bloco.conteudo}</h3>
`;
          
        }
        
        if (bloco.tipo === "paragrafo") {
          
          textoArea.innerHTML += `
<p class="paragrafo-estudo">${bloco.conteudo}</p>
`;
          
        }
        
      });
      
    }
    
    
    // ================= VIDEOS =================
    
    const vArea = document.getElementById("videosEstudo");
    vArea.innerHTML = "";
    
    (d.videos || []).forEach(v => {
      
      const id = extrairID(v.link);
      
      vArea.innerHTML += `

<div class="video-card">

<iframe
width="300"
height="180"
src="https://www.youtube.com/embed/${id}"
frameborder="0"
allowfullscreen>
</iframe>

<p>${v.titulo || ""}</p>

</div>

`;
      
    });
    
    
    // ================= LINKS =================
    
    const lArea = document.getElementById("linksEstudo");
    lArea.innerHTML = "";
    
    const listaLinks = d.leitura || d.links || [];
    
    listaLinks.forEach(l => {
      
      lArea.innerHTML += `
<a class="link-estudo" href="${l.url}" target="_blank">
📖 ${l.titulo}
</a>
`;
      
    });
    
    
    // ================= EXERCICIOS =================
    
    if (d.exercicios) {
      
      const exercArea = document.createElement("div");
      
      exercArea.className = "exercicios-estudo";
      
      exercArea.innerHTML = `<h2>Exercícios</h2>`;
      
      d.exercicios.forEach(ex => {
        
        exercArea.innerHTML += `

<div class="exercicio-card">

<h4>${ex.titulo}</h4>

<p>${ex.descricao}</p>

</div>

`;
        
      });
      
      const conteudo = document.querySelector(".conteudo-estudo");

      if (conteudo) {
        conteudo.appendChild(exercArea);
      }
      
    }
    
  })

  .catch(err => {
    
    console.error("Erro ao carregar estudo:", err);
    
    document.getElementById("tituloEstudo").innerText = "Erro ao carregar estudo";
    
  });
}

// ================= BOTÃO VOLTAR =================

function voltarSite() {
  
  window.history.back();
  
}


// ================= AJUSTE ESPECIAL PARA ESCALA =================

if (tipo === "escala") {
  
  document.getElementById("tituloVideos").style.display = "none";
  document.getElementById("tituloLinks").style.display = "none";
  document.getElementById("videosEstudo").style.display = "none";
  document.getElementById("linksEstudo").style.display = "none";
  
  document.getElementById("tituloAnotacoes").style.display = "block";
  document.getElementById("anotacoes").style.display = "block";
  
}

function abrirEscalaCodigo(){

const codigo = document.getElementById("codigoEscala").value.trim()

if(!codigo){
alert("Cole o código da escala.")
return
}

const url = "estudo.html?hinos=" + encodeURIComponent(codigo)

window.location.href = url
}