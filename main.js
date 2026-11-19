// =================================================
// TELA DE BOAS-VINDAS
// =================================================
setTimeout(() => {
document.getElementById("welcome-screen").style.display = "none"
document.getElementById("site").classList.remove("hidden")
}, 1300)

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

function normalizarTexto(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
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
nome: "Natã Freitas",
funcao: "Tecladista",
info: "Integrante desde 2024. Grande potencial toca com sinceridade e dedicação.",
foto: "assets/nata.png"
},
{
nome: "Natiele",
funcao: "Vocalista Mezzo Soprano",
info: "Integrante desde 2025. Voz poderosa e companheira, sempre está a disposição quando precisa, tem um grande alcance vocal, mas não foi completamente explorado ainda.",
foto: "assets/natiele.png"
},
{
nome: "Júnior",
funcao: "Baixista/Guitarrista",
info: "Integrante desde 2024. Diretor Musical da Banda, Forte senso musical, sério e meticuloso.",
foto: "assets/junior.jpg"
},
{
nome: "Gil Carlos",
funcao: "Violonista",
info: "Integrante desde 2024.",
foto: "assets/gil.jpg"
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
    teoria: 90,
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
},

   "Júnior": {
    teoria: 95,
    paciencia: 61,
    humor: 80,
    pontualidade: 92,
    potencial: 90,
    compromisso: 88
  },
     "Gil Carlos": {
    teoria: 0,
    paciencia: 0,
    humor: 0,
    pontualidade: 0,
    potencial: 0,
    compromisso: 0
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
      <img src="${m.foto}" class="ministro-thumb" loading="lazy" decoding="async">
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
let hinosOrdenados = []
let hinoAtual = null
let escala = []

fetch("data/hinos.json")
.then(r => {
  if (!r.ok) throw new Error("Falha ao carregar data/hinos.json: " + r.status);
  return r.json();
})
.then(d => {
  hinos = Array.isArray(d) ? d : [];

  // Pré-calcula os textos normalizados e a ordem alfabética uma única vez.
  hinos.forEach(h => {
    h._nomeBusca = normalizarTexto(h.nome);
    h._cantorBusca = normalizarTexto(h.cantor);
    h._letraBusca = (h._nomeBusca[0] || "").toUpperCase();
  });

  hinosOrdenados = [...hinos].sort((a, b) =>
    a._nomeBusca.localeCompare(b._nomeBusca)
  );

  criarFiltroLetras();
  renderHinos();
})
.catch(err => {
  console.error("Erro ao carregar hinos:", err);
  const lista = document.getElementById("listaHinos");
  if (lista) {
    lista.innerHTML = "<p style='padding:20px'>Não foi possível carregar o repertório. Atualize a página.</p>";
  }
});


// =================================================
// RENDERIZA HINOS A-Z (COM FILTRO)
// =================================================
function renderHinos(){
  const busca = normalizarTexto(termoBusca);

  // Filtra letra e pesquisa no mesmo conjunto, sem descartar um filtro ao usar o outro.
  const filtrados = hinosOrdenados.filter(h => {
    const combinaLetra = !letraSelecionada || h._letraBusca === letraSelecionada;
    const combinaBusca = !busca ||
      h._nomeBusca.includes(busca) ||
      h._cantorBusca.includes(busca);
    return combinaLetra && combinaBusca;
  });

  if (filtrados.length === 0) {
    document.getElementById("listaHinos").innerHTML =
      "<p style='padding:20px'>Nenhum hino encontrado.</p>";
    return;
  }

  renderAgrupado("listaHinos", filtrados, true);
}

function renderAgrupado(id, lista, jaOrdenada = false){
  const ul = document.getElementById(id);
  if (!ul) return;

  const normalizados = jaOrdenada ? lista : [...lista].sort((a, b) =>
    normalizarTexto(a.nome).localeCompare(normalizarTexto(b.nome))
  );

  let letra = "";
  const html = [];

  normalizados.forEach(h => {
    const primeira = normalizarTexto(h.nome).trim()[0]?.toUpperCase() || "#";

    if (primeira !== letra) {
      letra = primeira;
      html.push(`<div class="az-letter">${letra}</div>`);
    }

    html.push(`
      <li class="az-item" onclick="abrirHinoPorId('${h.id}')">
        <strong>${h.nome}</strong>
        <span>${h.cantor}</span>
      </li>
    `);
  });

  // Uma única escrita no DOM em vez de reprocessar a lista a cada item.
  ul.innerHTML = html.join("");
}

// =================================================
// ABRIR HINO
// =================================================
function extrairIdYouTube(url) {
  if (typeof url !== "string" || !url.trim()) return "";

  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    let id = "";

    if (host === "youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v") || "";
      } else {
        const match = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
        if (match) id = match[1];
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
  } catch (erro) {
    return "";
  }
}

function abrirHino(i){
hinoAtual = hinos[i]

document.getElementById("hinoNome").innerText = hinoAtual.nome
document.getElementById("hinoTom").innerText = hinoAtual.tom
const consultaMusica = encodeURIComponent(hinoAtual.nome + " " + hinoAtual.cantor);
document.getElementById("hinoCifra").href =
  hinoAtual.cifra || `https://www.cifraclub.com.br/search/?q=${consultaMusica}`;
document.getElementById("hinoSpotify").href =
  hinoAtual.spotify || `https://open.spotify.com/search/${consultaMusica}`;
document.querySelector(".galeria-sonora").classList.add("hidden")
document.getElementById("avaliacaoMinistro").classList.add("hidden")
document.querySelector(".footer").classList.add("hidden")
localStorage.setItem("scrollHinos", window.scrollY);
// FORÇA ABRIR O HINO NO TOPO DA TELA
window.scrollTo({ top: 0, behavior: "instant" });

// BOTÃO YOUTUBE EXTERNO + PLAYER
const idSecundario = extrairIdYouTube(hinoAtual.youtube_secundario);
const idPrincipal = extrairIdYouTube(hinoAtual.youtube_principal);
const idVideo = idPrincipal || idSecundario;

// Usa o vídeo direto quando existe; caso contrário, abre a busca exata
// por título + intérprete, sem restringir a busca a um canal específico.
const buscaYouTube = `https://www.youtube.com/results?search_query=${consultaMusica}`;
document.getElementById("hinoYouTube").href = idVideo
  ? `https://www.youtube.com/watch?v=${idVideo}`
  : (hinoAtual.youtube_principal || hinoAtual.youtube_secundario || buscaYouTube);

document.getElementById("hinoPlayer").src = idVideo
  ? `https://www.youtube-nocookie.com/embed/${idVideo}`
  : "";

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
document.querySelector(".area-estudos").classList.add("hidden")
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
const areaEstudos = document.querySelector(".area-estudos");
  if (areaEstudos) areaEstudos.classList.remove("hidden");
const scroll = localStorage.getItem("scrollHinos");
  if(scroll){
    setTimeout(()=>{
      window.scrollTo({
        top: parseInt(scroll),
        behavior: "instant"
      });
    }, 50);
  }
}
// =================================================
// ESCALA
// =================================================

const buscaEscala = document.getElementById("buscaEscala");

if (buscaEscala) {
  buscaEscala.addEventListener("input", e => {
    const termo = normalizarTexto(e.target.value);
    const resultado = hinosOrdenados.filter(h =>
      h._nomeBusca.includes(termo) || h._cantorBusca.includes(termo)
    );
    renderAgrupado("listaEscala", resultado, true);
  });
}

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
 // trava o scroll do body (permite scroll dentro da .escala-box)
  document.body.style.overflow = "hidden";

  // (o resto da função continua igual: evita duplicatas, push na escalaAtual e renderEscala())
  // ...

//so detalhes pode ser removido
if(escalaAtual.hinos.some(h => h.nome === hinoAtual.nome)) return;
// acima

  escalaAtual.hinos.push({
    nome: hinoAtual.nome,
    cantor: hinoAtual.cantor,
    tom: hinoAtual.tom,
    youtube: hinoAtual.youtube_principal,
    spotify: hinoAtual.spotify,
    cifra: hinoAtual.cifra,
    observacoes: ""
  });

  renderEscala();
}
const fab = document.getElementById("escalaFab");
if (fab) fab.classList.remove("hidden");
function fecharEscalaBuilder(){
  document.getElementById("escalaBuilder").classList.remove("show");
  // libera o scroll do body
  document.body.style.overflow = "";
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

// =================================================
// GERAR CÓDIGO DE ESTUDO DA ESCALA (utility)
// =================================================
function gerarCodigoEscala(listaHinos){
  // junta pelos nomes, separador | — sem encoding aqui,
  // vamos deixar o encoding para quando montar a URL (ou whatsapp já faz encodeURIComponent)
  return listaHinos
    .map(h => h.nome)
    .join("|");
}


function enviarEscalaWhatsApp(){

  if(!escalaAtual.dia){
    alert("Selecione o dia da escala.");
    return;
  }

  let texto =
`━━━━━━━━━━━━━━━━
\uD83C\uDFBC *ESCALA DE LOUVOR*
\uD83D\uDCC5 ${escalaAtual.dia.toUpperCase()}
━━━━━━━━━━━━━━━━

`;

  escalaAtual.hinos.forEach((h, i) => {

    texto +=
`\uD83C\uDFB5 *${h.nome}*
\uD83C\uDFA4 ${h.cantor}
\uD83C\uDFBC Tom: ${h.tom}
\uD83D\uDC64 Ministro: ${h.ministro || "-"}

\u25B6 YouTube
${h.youtube}

\uD83C\uDFA7 Spotify
${h.spotify}

\uD83C\uDFB8 Cifra
${h.cifra || "-"}

\uD83D\uDCDD Obs: ${h.observacoes || "-"}

`;

    if(i < escalaAtual.hinos.length - 1){
      texto += `──────────────\n\n`;
    }

  });

// gera o código de estudo e acrescenta ao texto
  const codigo = gerarCodigoEscala(escalaAtual.hinos);
  texto += "\n\n📚 Código de estudo:\n";
  texto += codigo;

  window.open(
    "https://api.whatsapp.com/send?text=" + encodeURIComponent(texto),
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
const buscaInput = document.getElementById("buscaHinos");

if (buscaInput) {
  buscaInput.addEventListener("input", function () {
    termoBusca = this.value;
    renderHinos();
  });
}
let letraSelecionada = "";
// Filtro por letras
function criarFiltroLetras(){
  const container = document.getElementById("filtroLetras");
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  container.innerHTML = "";

  letras.forEach(l => {
    container.innerHTML += `
      <button 
        class="letra-btn" 
        onclick="toggleLetra('${l}')"
        id="letra-${l}">
        ${l}
      </button>
    `;
  });
}
function toggleLetra(letra){

  if(letraSelecionada === letra){
    letraSelecionada = "";
  } else {
    letraSelecionada = letra;
  }

  atualizarVisualLetras();
  renderHinos();
}
function atualizarVisualLetras(){
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  letras.forEach(l => {
    const btn = document.getElementById("letra-" + l);
    if(!btn) return;

    if(l === letraSelecionada){
      btn.classList.add("ativa");
    } else {
      btn.classList.remove("ativa");
    }
  });
}

// Área de Estudos //
function abrirEstudo(tipo){
  window.location.href = `estudo.html?tipo=${encodeURIComponent(tipo)}`;
}