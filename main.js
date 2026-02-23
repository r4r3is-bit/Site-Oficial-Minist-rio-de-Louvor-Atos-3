// =================================================
// TELA DE BOAS-VINDAS
// =================================================
setTimeout(() => {
document.getElementById("welcome-screen").style.display = "none"
document.getElementById("site").classList.remove("hidden")
}, 4000)

// =================================================
// BOTÃO CLARO / ESCURO
// =================================================
const toggle = document.getElementById("themeToggle")
let dark = true

toggle.onclick = () => {
dark = !dark
document.body.style.background = dark ? "#111" : "#f2f2f2"
document.body.style.color = dark ? "#fff" : "#000"
toggle.textContent = dark ? "🌙" : "☀️"
}
let termoBusca = "";
// =================================================
// TOPO FIXO
// =================================================
const topbar = document.querySelector(".topbar")
window.addEventListener("scroll", () => {
window.scrollY > 150 ? topbar.classList.add("show") : topbar.classList.remove("show")
})
let scrollHinos = 0;
// ===============================
// DADOS DOS MINISTROS
// ===============================
const ministros = [
{
nome: "Raphael Reis",
funcao: "Multi-Instrumentista • Vocalista Barítono Baixo",
info: "Líder do Ministério. Integrante desde 2018, líder desde 2025. Coringa do louvor, onde precisa ele fica, confiável, sempre que precisar pode chamar.",
foto: "assets/raphael.png"
},
{
  nome: "Iara",
funcao: "Sonoplasta",
info: "Integrante desde 2025. Dedicada, acertiva, observadora, simples mas possui um grande potêncial, ajuda sempre que consegue, dando seu melhor em tudo.",
foto: "assets/iara.png"
},
{
nome: "Natiele",
funcao: "Vocalista Mezzo Soprano",
info: "Integrante desde 2025. Voz poderosa e companheira, sempre está a disposição quando precisa, tem um grande alcance vocal, mas não foi completamente explorado ainda.",
foto: "assets/natiele.png"
},

{
nome: "Natã Freitas",
funcao: "Tecladista",
info: "Integrante desde 2024. Grande potencial toca com sinceridade e dedicação.",
foto: "assets/nata.png"
},
{
  nome: "Felipe Mesquita",
funcao: "Sonoplasta",
info: "Integrante desde 2025. Esforçado, muito capaz, humilde, grande potêncial, faz o fino, dá o devido suporte, som nota 10, não gosta de ficar em evidência mas ajuda sempre, pensa muito no próximo,  compreensivo e tem os melhores comentários.",
foto: "assets/felipe.jpg"
},
{
nome: "Délia Carvalho",
funcao: "Violonista • Baixista • Vocalista",
info: "Integrante desde 2025. Esforçada, talentosa e humilde, grande talento mas nãoquer ficar em evidência de nenhuma forma.",
foto: "assets/delia.jpg"
},
{
nome: "Edna",
funcao: "Vocalista Soprano",
info: "Integrante desde 2020. Voz característica e discreta, nãogosta de se aparecer, mesmo temdo uma voz poderosa..",
foto: "assets/edna.jpg"
},
{
nome: "Stephanie",
funcao: "Vocalista Contralto",
info: "Integrante desde 2025. Muito dedicada e bem humorada, responsável pelo humor da equipe.",
foto: "assets/stephanie.jpg"
},
{
nome: "Thiago",
funcao: "Vocalista Barítono Alto",
info: "Integrante desde 2025. Humor contagiante.",
foto: "assets/thiago.png"
}
]
// ===============================
// AVALIAÇÕES DOS MINISTROS
// ===============================
const avaliacoesMinistros = {
  "Raphael Reis": {
    teoria: 92,
    paciencia: 98,
    humor: 72,
    pontualidade: 95,
    potencial: 98,
    compromisso: 100
  },

"Délia Carvalho": {
  teoria: 68,
  paciencia: 70,
  humor: 75,
  pontualidade: 65,
  potencial: 89,
  compromisso: 100
  },

  "Edna": {
    teoria: 74,
    paciencia: 76,
    humor: 72,
    pontualidade: 78,
    potencial: 100,
    compromisso: 87
  },

  "Stephanie": {
    teoria: 71,
    paciencia: 83,
    humor: 92,
    pontualidade: 44,
    potencial: 98,
    compromisso: 99
  },

"Natiele": {
    teoria: 67,
    paciencia: 80,
    humor: 78,
    pontualidade: 80,
    potencial: 85,
    compromisso: 90
  },

  "Samuel": {
    teoria: 90,
    paciencia: 67,
    humor: 63,
    pontualidade: 81,
    potencial: 80,
    compromisso: 80
  },
  
    "Felipe Mesquita": {
    teoria: 87,
    paciencia: 95,
    humor: 90,
    pontualidade: 95,
    potencial: 85,
    compromisso: 97
  },
  
    "Iara": {
    teoria: 75,
    paciencia: 50,
    humor: 90,
    pontualidade: 67,
    potencial: 90,
    compromisso: 78
  },

  "Thiago": {
    teoria: 0,
    paciencia: 0,
    humor: 0,
    pontualidade: 0,
    potencial: 0,
    compromisso: 0
  },

  "Natã Freitas": {
    teoria: 79,
    paciencia: 85,
    humor: 83,
    pontualidade: 87,
    potencial: 90,
    compromisso: 76
  }
};
let audioLigado = false;

function toggleAudio(){
  const audio = document.getElementById("bgAudio");
  const btn = document.getElementById("audioToggle");
  const msg = document.getElementById("audioMsg");

  if(!audioLigado){
    audio.volume = 0.25;
    audio.play();
    audioLigado = true;
    btn.textContent = "🔊";
    msg.textContent = "Áudio ambiente ativo";
  } else {
    audio.pause();
    audioLigado = false;
    btn.textContent = "🔇";
    msg.textContent = "🔊 Clique para ativar o áudio ambiente";
  }
}
// ===============================
// RENDERIZA MINISTROS
// ===============================
const area = document.getElementById("ministros");
area.innerHTML = "";

ministros.forEach((m, i) => {
  area.innerHTML += `
    <div class="ministro" onclick="abrirPerfil(${i})">
      <img src="${m.foto}" class="ministro-thumb">
      <h4>${m.nome}</h4>
      <span>${m.funcao}</span>
    </div>
  `;
});

function linha(nome, valor){
  return `
  <div class="linha-avaliacao">
    <small>${nome}</small>
    <div class="barra">
      <div class="fill" style="width:${valor}%"></div>
    </div>
  </div>`;
}

// =================================================
// MODAL DE ESCALA
// =================================================
function abrirEscala(){ document.getElementById("escalaModal").classList.add("show") }
function fecharEscala(){ document.getElementById("escalaModal").classList.remove("show") }

// =================================================
// HINOS (JSON)
// =================================================
let hinos = []
let hinoAtual = null
let escala = []

fetch("data/hinos.json")
.then(r => r.json())
.then(d => {
hinos = d
renderHinos()
})

// =================================================
// RENDERIZA HINOS A-Z (COM FILTRO)
// =================================================
function renderHinos(){
  const base = termoBusca
    ? hinos.filter(h =>
        h.nome.toLowerCase().includes(termoBusca) ||
        h.cantor.toLowerCase().includes(termoBusca)
      )
    : hinos;

  const ordenados = [...base].sort((a,b)=>a.nome.localeCompare(b.nome));

  renderAgrupado("listaHinos", ordenados);
  renderAgrupado("listaEscala", ordenados);
}

function renderAgrupado(id, lista){
  const ul = document.getElementById(id)
  ul.innerHTML = ""   

  let letra = ""

  const normalizados = [...lista].sort((a,b)=>{
    return a.nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .localeCompare(
      b.nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    )
  })

  normalizados.forEach(h=>{
    const primeira = h.nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim()[0].toUpperCase()

    if(primeira !== letra){  
      letra = primeira  
      ul.innerHTML += `<div class="az-letter">${letra}</div>`  
    }  

    ul.innerHTML += `
      <li class="az-item" onclick="abrirHinoPorId('${h.id}')">  
        <strong>${h.nome}</strong>  
        <span>${h.cantor}</span>  
      </li>`  
    })  
} // =================================================
// ABRIR HINO
// =================================================
function abrirHino(i){
hinoAtual = hinos[i]

document.getElementById("hinoNome").innerText = hinoAtual.nome
document.getElementById("hinoTom").innerText = hinoAtual.tom
document.getElementById("hinoCifra").href = hinoAtual.cifra
document.getElementById("hinoSpotify").href = hinoAtual.spotify
document.querySelector(".galeria-sonora").classList.add("hidden")
document.getElementById("avaliacaoMinistro").classList.add("hidden")
document.querySelector(".footer").classList.add("hidden")
localStorage.setItem("scrollHinos", window.scrollY);
// FORÇA ABRIR O HINO NO TOPO DA TELA
window.scrollTo({ top: 0, behavior: "instant" });

// BOTÃO YOUTUBE EXTERNO
document.getElementById("hinoYouTube").href =
hinoAtual.youtube_secundario || hinoAtual.youtube_principal

// PLAYER EMBED
if(hinoAtual.youtube_principal){
let idVideo = "";

if(hinoAtual.youtube_principal.includes("youtu.be/")){
  idVideo = hinoAtual.youtube_principal.split("youtu.be/")[1].split("?")[0];
} else if(hinoAtual.youtube_principal.includes("v=")){
  idVideo = hinoAtual.youtube_principal.split("v=")[1].split("&")[0];}
document.getElementById("hinoPlayer").src =
  `https://www.youtube-nocookie.com/embed/${idVideo}`
}else{
document.getElementById("hinoPlayer").src = ""
}

// SELECT DE TOM
const selectT = document.getElementById("tomSelect")
selectT.innerHTML = ""
const tons = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
tons.forEach(t=>{
selectT.innerHTML +=
  `<option ${t == hinoAtual.tom ? "selected" : ""}>${t}</option>`
})
document.querySelector(".header").classList.add("hidden")
document.querySelector(".ministros").classList.add("hidden")
document.querySelector(".repertorio").classList.add("hidden")
document.getElementById("escalaModal").classList.remove("show")
document.getElementById("hinoPage").classList.remove("hidden")
document.querySelector(".galeria-sonora").classList.add("hidden")
document.getElementById("avaliacaoMinistro").classList.add("hidden")
document.querySelector(".footer").classList.add("hidden")
}


// =================================================
// FECHAR HINO
// =================================================
function fecharHino(){
document.getElementById("hinoPage").classList.add("hidden")
document.querySelector(".header").classList.remove("hidden")
document.querySelector(".ministros").classList.remove("hidden")
document.querySelector(".repertorio").classList.remove("hidden")
document.getElementById("hinoPlayer").src = ""
document.querySelector(".galeria-sonora").classList.remove("hidden")
document.getElementById("avaliacaoMinistro").classList.remove("hidden")
document.querySelector(".footer").classList.remove("hidden")
}

// ficar em observação 

const scroll = localStorage.getItem("scrollHinos");
  if (scroll) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(scroll));
    }, 50);
  }
// =================================================
// ESCALA
// =================================================

document.getElementById("buscaEscala").addEventListener("input", e=>{
const termo = e.target.value.toLowerCase()
renderAgrupado("listaEscala", hinos.filter(h=>h.nome.toLowerCase().includes(termo)))
})

function abrirHinoPorId(id){
const i = hinos.findIndex(h=>h.id===id)
if(i!==-1) abrirHino(i)
}
function abrirPerfil(i){
  const m = ministros[i]

  document.getElementById("perfilFoto").src = m.foto
  document.getElementById("perfilNome").innerText = m.nome
  document.getElementById("perfilFuncao").innerText = m.funcao
  document.getElementById("perfilInfo").innerText = m.info
  document.querySelector(".galeria-sonora").classList.remove("hidden")
  document.getElementById("avaliacaoMinistro").classList.remove("hidden")
  document.querySelector(".footer").classList.remove("hidden")

  document.getElementById("hinoPlayer").src = ""

  const area = document.getElementById("perfilAvaliacoes")
  area.innerHTML = ""

  if(avaliacoesMinistros[m.nome]){
    const av = avaliacoesMinistros[m.nome]

    area.innerHTML += linhaAvaliacao("Teoria Musical", av.teoria)
    area.innerHTML += linhaAvaliacao("Paciência", av.paciencia)
    area.innerHTML += linhaAvaliacao("Humor", av.humor)
    area.innerHTML += linhaAvaliacao("Pontualidade", av.pontualidade)
    area.innerHTML += linhaAvaliacao("Potencial", av.potencial)
    area.innerHTML += linhaAvaliacao("Compromisso", av.compromisso)
  }

  document.body.style.overflow = "hidden"
  document.getElementById("perfil").classList.remove("hidden")
}
function corPorValor(valor){
  if(valor < 40) return "#d32f2f";        // vermelho
  if(valor < 60) return "#f57c00";        // laranja
  if(valor < 75) return "#fbc02d";        // amarelo
  if(valor < 90) return "#388e3c";        // verde
  return "#7CFC00";                       // verde claro (excelência)
}
function linhaAvaliacao(nome, valor){
  const cor = corPorValor(valor);

  return `
    <div class="linha-avaliacao">
      <div style="
        display:flex;
        justify-content:space-between;
        font-size:0.85rem;
        color:${cor};
        margin-bottom:4px;
        font-weight:600;
      ">
        <span>${nome}</span>
        <strong>${valor}%</strong>
      </div>

      <div class="barra">
        <div class="fill"
          style="
            width:${valor}%;
            background: linear-gradient(90deg, ${cor}, #ffffff);
          ">
        </div>
      </div>
    </div>
  `;
}
function fecharPerfil(){
  document.getElementById("perfil").classList.add("hidden")
  document.body.style.overflow = ""
}
  // ===============================
// SISTEMA DE ESCALA (FUNCIONAL)
// ===============================

let escalaAtual = {
  dia: "",
  hinos: []
};

function abrirEscalaBuilder(){
  if(!hinoAtual){
    alert("Nenhum hino selecionado.");
    return;
  }

  document.getElementById("escalaBuilder").classList.add("show");

//so detalhes pode ser removido
if(escalaAtual.hinos.some(h => h.nome === hinoAtual.nome)) return;
// acima

  escalaAtual.hinos.push({
    nome: hinoAtual.nome,
    cantor: hinoAtual.cantor,
    tom: hinoAtual.tom,
    youtube: hinoAtual.youtube_principal,
    spotify: hinoAtual.spotify,
    observacoes: ""
  });

  renderEscala();
}
const fab = document.getElementById("escalaFab");
if (fab) fab.classList.remove("hidden");
function fecharEscalaBuilder(){
  document.getElementById("escalaBuilder").classList.remove("show");
}

function renderEscala(){
  const area = document.getElementById("escalaLista");
  area.innerHTML = "";

  escalaAtual.dia = document.getElementById("escalaDia").value;

  escalaAtual.hinos.forEach((h, i) => {
    area.innerHTML += `
      <div class="escala-item">
        <strong>${h.nome}</strong><br>
        <small>${h.cantor}</small><br><br>

      <select onchange="escalaAtual.hinos[${i}].tom=this.value">
  ${["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
    .map(t => `
      <option value="${t}" ${t === h.tom ? "selected" : ""}>${t}</option>
    `).join("")}
</select>
        <label>Ministro</label>
        <select onchange="escalaAtual.hinos[${i}].ministro=this.value">
          <option value="">Selecione o ministro</option>
          ${ministros.map(m => `
            <option value="${m.nome}">${m.nome}</option>
          `).join("")}
        </select>

        <label>Observações</label>
        <input placeholder="Opcional"
          onchange="escalaAtual.hinos[${i}].observacoes=this.value">
      </div>
    `;
  });
}

function enviarEscalaWhatsApp(){
  if(!escalaAtual.dia){
    alert("Selecione o dia da escala.");
    return;
  }

  let texto = `*ESCALA - ${escalaAtual.dia.toUpperCase()}*\n\n`;

  escalaAtual.hinos.forEach(h => {
    texto +=
`🎵 ${h.nome}
🎤 ${h.cantor}
🎼 Tom: ${h.tom}
👤 Ministro: ${h.ministro || "-"}
▶️ YouTube: ${h.youtube}
🎧 Spotify: ${h.spotify}
📝 Obs: ${h.observacoes || "-"}

`;
  });

  window.open(
    "https://wa.me/?text=" + encodeURIComponent(texto),
    "_blank"
  );
}
// ===============================
// ATUALIZA BARRAS DE AVALIAÇÃO
// ===============================
function atualizarAvaliacoes() {
  document.querySelectorAll(".progresso").forEach(barra => {
    const valor = barra.getAttribute("data-valor");
    barra.style.width = valor + "%";
  });
}
function carregarAvaliacao(nomeMinistro) {
  const dados = avaliacoesMinistros[nomeMinistro];

  if (!dados) {
    document.getElementById("avaliacaoMinistro").style.display = "none";
    return;
  }

  document.getElementById("avaliacaoMinistro").style.display = "block";

  const map = [
    ["teoria", "av-teoria", "tx-teoria"],
    ["paciencia", "av-paciencia", "tx-paciencia"],
    ["humor", "av-humor", "tx-humor"],
    ["pontualidade", "av-pontualidade", "tx-pontualidade"],
    ["potencial", "av-potencial", "tx-potencial"],
    ["compromisso", "av-compromisso", "tx-compromisso"]
  ];

  map.forEach(([key, barId, txtId]) => {
    const valor = dados[key];
    document.getElementById(barId).style.width = valor + "%";
    document.getElementById(txtId).innerText = valor + "%";
  });
}
// =================================================
// LUPA DE PESQUISA
// =================================================
document.addEventListener("DOMContentLoaded", () => {
  const buscaInput = document.getElementById("buscaHinos");
  if (buscaInput) {
    buscaInput.addEventListener("input", () => {
      termoBusca = buscaInput.value.toLowerCase().trim();
      renderHinos();
    });
  }
});
