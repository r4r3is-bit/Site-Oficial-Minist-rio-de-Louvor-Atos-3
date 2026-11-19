/* =========================================================
   ÁREA DE ESTUDOS ATOS 3 — aulas, prática e progresso local
========================================================= */
const params = new URLSearchParams(window.location.search);
const lista = params.get("hinos");
const tipo = params.get("tipo");
const notasKey = "atos3_estudo_notas_v2";
const progressoKey = "atos3_estudo_progresso_v2";
let studyData = {};
let metronomeTimer = null;
let beatCount = 0;

function safeRead(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch (error) { return fallback; }
}
function safeWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (error) { return false; }
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));
}
function videoId(url) {
  try {
    const u = new URL(url);
    let id = u.hostname.includes("youtu.be") ? u.pathname.split("/").filter(Boolean)[0] : u.searchParams.get("v");
    if (!id) id = u.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1] || "";
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
  } catch (error) { return ""; }
}
function renderText(blocks) {
  const area = document.getElementById("textoEstudo");
  area.innerHTML = "";
  if (typeof blocks === "string") {
    blocks.split(/\n\n/).forEach(p => {
      if (p.trim()) area.insertAdjacentHTML("beforeend", '<p class="paragrafo-estudo">' + escapeHtml(p.trim()).replace(/\n/g,"<br>") + "</p>");
    });
  } else if (Array.isArray(blocks)) {
    blocks.forEach(b => {
      const tag = b.tipo === "subtitulo" ? "h3" : "p";
      const cls = b.tipo === "subtitulo" ? "subtitulo-estudo" : "paragrafo-estudo";
      area.insertAdjacentHTML("beforeend", '<' + tag + ' class="' + cls + '">' + escapeHtml(b.conteudo).replace(/\n/g,"<br>") + '</' + tag + '>');
    });
  }
}
function progressState() { return safeRead(progressoKey, {}); }
function updateProgress() {
  const checks = [...document.querySelectorAll("[data-study-check]")];
  const done = checks.filter(c => c.checked).length;
  const total = checks.length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const bar = document.getElementById("studyProgressBar");
  const text = document.getElementById("studyProgressText");
  if (bar) bar.style.width = pct + "%";
  if (text) text.textContent = done + " de " + total + " atividades concluídas (" + pct + "%)";
}
function addChecklist(id, label) {
  const state = progressState();
  const checked = !!state[id];
  return '<label class="study-check"><input type="checkbox" data-study-check data-check-id="' + escapeHtml(id) + '" ' + (checked ? "checked" : "") + '> <span>' + escapeHtml(label) + '</span></label>';
}
document.addEventListener("change", event => {
  const el = event.target;
  if (!el.matches("[data-study-check]")) return;
  const state = progressState();
  state[el.dataset.checkId] = el.checked;
  safeWrite(progressoKey, state);
  updateProgress();
});

function renderVideos(videos) {
  const area = document.getElementById("videosEstudo");
  area.innerHTML = "";
  (videos || []).forEach(v => {
    const id = videoId(v.link);
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = (id ? '<iframe width="300" height="180" src="https://www.youtube-nocookie.com/embed/' + id + '" title="' + escapeHtml(v.titulo) + '" loading="lazy" allowfullscreen></iframe>' : '<a class="link-estudo" target="_blank" rel="noopener" href="' + escapeHtml(v.link) + '">Abrir vídeo</a>') + '<p>' + escapeHtml(v.titulo || "Vídeo-aula") + '</p>';
    area.appendChild(card);
  });
}
function renderLinks(data) {
  const area = document.getElementById("linksEstudo");
  area.innerHTML = "";
  (data.leitura || data.links || []).forEach(item => {
    const a = document.createElement("a");
    a.className = "link-estudo";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "📖 " + item.titulo;
    area.appendChild(a);
  });
}
function renderExercises(exercises, key) {
  const area = document.getElementById("exerciciosEstudo");
  area.innerHTML = "";
  (exercises || []).forEach((ex, i) => {
    const card = document.createElement("article");
    card.className = "study-exercise";
    card.innerHTML = '<h3>' + escapeHtml(ex.titulo) + '</h3><p class="paragrafo-estudo">' + escapeHtml(ex.descricao) + '</p>' +
      addChecklist(key + "-exercise-" + i, "Concluí este exercício");
    area.appendChild(card);
  });
  updateProgress();
}
function renderNotes(key) {
  const title = document.getElementById("tituloAnotacoes");
  const notes = document.getElementById("anotacoes");
  title.style.display = "block";
  notes.style.display = "block";
  notes.value = safeRead(notasKey, {})[key] || "";
  notes.addEventListener("input", () => {
    const all = safeRead(notasKey, {});
    all[key] = notes.value;
    safeWrite(notasKey, all);
  });
}
function noteAndProgressKey() { return tipo || (lista ? "escala-" + lista : "geral"); }

function renderScaleTrainer() {
  document.getElementById("tituloVideos").style.display = "none";
  document.getElementById("tituloLinks").style.display = "none";
  document.getElementById("tituloExercicios").style.display = "none";
  document.getElementById("videosEstudo").style.display = "none";
  document.getElementById("linksEstudo").style.display = "none";
  document.getElementById("exerciciosEstudo").style.display = "none";
  document.getElementById("tituloAnotacoes").style.display = "block";
  document.getElementById("anotacoes").style.display = "block";
  const tools = document.getElementById("interactiveTools");
  tools.innerHTML = `
    <article class="study-tool-card">
      <h3>🎼 Gerador de escalas</h3>
      <p class="study-muted">Escolha a tonalidade e o tipo de escala para visualizar as notas.</p>
      <label>Tonalidade <select id="scaleRoot">${["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"].map(n=>'<option>'+n+'</option>').join("")}</select></label>
      <label>Escala <select id="scaleType"><option value="major">Maior (jônica)</option><option value="minor">Menor natural</option><option value="pentMajor">Pentatônica maior</option><option value="pentMinor">Pentatônica menor</option><option value="blues">Blues</option></select></label>
      <div id="scaleOutput" class="scale-notes"></div>
      <button class="study-action" id="showScale">Gerar escala</button>
    </article>
    <article class="study-tool-card">
      <h3>⏱️ Metrônomo</h3>
      <p class="study-muted">Treine subdivisões com andamento controlado.</p>
      <label>BPM <input id="bpmInput" type="number" min="40" max="220" value="80"></label>
      <div class="metronome-display" id="bpmDisplay">80 BPM</div>
      <div><span class="metronome-beat" id="beat1"></span><span class="metronome-beat" id="beat2"></span><span class="metronome-beat" id="beat3"></span><span class="metronome-beat" id="beat4"></span></div>
      <button class="study-action" id="metroStart">Iniciar</button>
      <button class="study-action" id="metroStop">Parar</button>
    </article>
    <article class="study-tool-card">
      <h3>🎯 Treino de ouvido</h3>
      <p class="study-muted">Identifique a distância entre duas notas (intervalo). Use o botão para ouvir o intervalo e escolha a resposta.</p>
      <button class="study-action" id="playInterval">Ouvir intervalo</button>
      <div id="intervalOptions"></div><p id="intervalFeedback" class="study-feedback"></p>
    </article>`;
  const semitones = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const patterns = {major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],pentMajor:[0,2,4,7,9],pentMinor:[0,3,5,7,10],blues:[0,3,5,6,7,10]};
  function drawScale() {
    const root = semitones.indexOf(document.getElementById("scaleRoot").value);
    const pattern = patterns[document.getElementById("scaleType").value];
    document.getElementById("scaleOutput").innerHTML = pattern.map(n=>'<span class="scale-note">'+semitones[(root+n)%12]+'</span>').join("");
  }
  document.getElementById("showScale").onclick = drawScale;
  document.getElementById("scaleRoot").onchange = drawScale;
  document.getElementById("scaleType").onchange = drawScale;
  drawScale();
  document.getElementById("metroStart").onclick = startMetronome;
  document.getElementById("metroStop").onclick = stopMetronome;
  document.getElementById("bpmInput").oninput = () => document.getElementById("bpmDisplay").textContent = document.getElementById("bpmInput").value + " BPM";
  let answer = 0;
  const intervals = [{name:"Segunda maior",n:2},{name:"Terça maior",n:4},{name:"Quarta justa",n:5},{name:"Quinta justa",n:7},{name:"Oitava",n:12}];
  function newQuestion() {
    answer = intervals[Math.floor(Math.random()*intervals.length)];
    document.getElementById("intervalOptions").innerHTML = intervals.map(x=>'<button class="study-quiz-option" data-interval="'+x.n+'">'+x.name+'</button>').join("");
    document.querySelectorAll("[data-interval]").forEach(btn=>btn.onclick=()=>{
      const ok = Number(btn.dataset.interval)===answer.n;
      document.getElementById("intervalFeedback").textContent = ok ? "Correto! Muito bem." : "Ainda não. Tente ouvir novamente.";
      if(ok) setTimeout(newQuestion,900);
    });
  }
  document.getElementById("playInterval").onclick = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const first = 261.63, second = first*Math.pow(2,answer.n/12);
    [first,second].forEach((freq,i)=>{
      const osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.frequency.value=freq; osc.type="sine"; gain.gain.setValueAtTime(.0001,ctx.currentTime+i*.65);
      gain.gain.exponentialRampToValueAtTime(.18,ctx.currentTime+i*.65+.03);
      gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.65+.48);
      osc.connect(gain);gain.connect(ctx.destination);osc.start(ctx.currentTime+i*.65);osc.stop(ctx.currentTime+i*.65+.5);
    });
  };
  newQuestion();
  renderNotes("estudo-escalas");
  updateProgress();
}
function startMetronome() {
  stopMetronome();
  const bpm = Math.max(40,Math.min(220,Number(document.getElementById("bpmInput")?.value)||80));
  beatCount=0;
  const tick=()=>{
    beatCount=(beatCount%4)+1;
    document.querySelectorAll(".metronome-beat").forEach((el,i)=>el.classList.toggle("active",i===beatCount-1));
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(AudioCtx){
      const ctx=new AudioCtx(), osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.frequency.value=beatCount===1?1200:800;gain.gain.value=.08;
      osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.045);
    }
  };
  tick();
  metronomeTimer=setInterval(tick,60000/bpm);
}
function stopMetronome() {
  if(metronomeTimer) clearInterval(metronomeTimer);
  metronomeTimer=null;
  document.querySelectorAll(".metronome-beat").forEach(el=>el.classList.remove("active"));
}
window.addEventListener("pagehide",stopMetronome);

function renderInstrumentTools(key) {
  const tools=document.getElementById("interactiveTools");
  const isStrings=["guitarra","violao","baixo"].includes(key);
  const isKeyboard=key==="teclado";
  const isVoice=key==="canto";
  const title=isStrings?"Treino de acordes e posições":isKeyboard?"Formação de tríades no teclado":isVoice?"Rotina de aquecimento vocal":"Rotina de prática";
  tools.innerHTML=`
    <article class="study-tool-card">
      <h3>🎯 ${title}</h3>
      <p class="study-muted">${isVoice?"Faça os exercícios sem forçar a voz e interrompa se sentir dor ou rouquidão.": "Escolha um foco e pratique lentamente, priorizando precisão antes da velocidade."}</p>
      <label>Foco de treino
        <select id="practiceFocus">
          ${(isVoice?["Afinação","Respiração","Articulação","Dinâmica"]:isKeyboard?["Tríades maiores","Tríades menores","Inversões","Progressões"]:isStrings?["Acordes maiores","Acordes menores","Mudança de acordes","Ritmo e precisão"]:["Tempo","Coordenação","Dinâmica","Consistência"]).map(x=>'<option>'+x+'</option>').join("")}
        </select>
      </label>
      <label>Tempo de prática (minutos) <input type="number" id="practiceMinutes" min="1" max="90" value="15"></label>
      <button class="study-action" id="startPractice">Iniciar sessão</button>
      <p id="practiceTimer" class="metronome-display">15:00</p>
      <button class="study-action" id="stopPractice">Encerrar</button>
    </article>
    <article class="study-tool-card">
      <h3>📚 Plano de prática</h3>
      ${["Revisar o conteúdo da aula","Praticar lentamente por 5 minutos","Repetir o exercício sem olhar a explicação","Tocar junto com uma música","Gravar e avaliar a própria execução"].map((x,i)=>addChecklist(key+"-practice-"+i,x)).join("")}
    </article>`;
  let timer=null,remaining=900;
  const display=document.getElementById("practiceTimer");
  function show(){display.textContent=Math.floor(remaining/60).toString().padStart(2,"0")+":"+ (remaining%60).toString().padStart(2,"0");}
  document.getElementById("practiceMinutes").onchange=()=>{remaining=Math.max(1,Math.min(90,Number(document.getElementById("practiceMinutes").value)||15))*60;show();};
  document.getElementById("startPractice").onclick=()=>{
    if(timer)clearInterval(timer);
    remaining=Math.max(1,Math.min(90,Number(document.getElementById("practiceMinutes").value)||15))*60;show();
    timer=setInterval(()=>{remaining--;show();if(remaining<=0){clearInterval(timer);timer=null;alert("Sessão concluída! Registre seu progresso.");}},1000);
  };
  document.getElementById("stopPractice").onclick=()=>{if(timer)clearInterval(timer);timer=null;};
  updateProgress();
}

function renderSongScaleStudy(names) {
  document.getElementById("tituloVideos").style.display="none";
  document.getElementById("tituloLinks").style.display="none";
  document.getElementById("tituloExercicios").style.display="none";
  document.getElementById("videosEstudo").style.display="none";
  document.getElementById("linksEstudo").style.display="none";
  document.getElementById("exerciciosEstudo").style.display="none";
  document.getElementById("textoEstudo").innerHTML="<p class='paragrafo-estudo'>Estude cada música, confira o tom, revise a estrutura e anote entradas, dinâmicas e mudanças.</p>";
  fetch("data/hinos.json").then(r=>r.json()).then(hinos=>{
    const area=document.getElementById("estudoEscala");
    area.innerHTML="";
    names.forEach((name,i)=>{
      const h=hinos.find(x=>x.nome===name);
      if(!h)return;
      const id=videoId(h.youtube_principal);
      const box=document.createElement("article");
      box.className="study-lesson";
      box.innerHTML="<h2>"+escapeHtml(h.nome)+"</h2><p class='study-muted'>Intérprete: "+escapeHtml(h.cantor)+" • Tom: "+escapeHtml(h.tom||"não informado")+"</p>"+
        (id?'<iframe width="100%" height="220" src="https://www.youtube-nocookie.com/embed/'+id+'" allowfullscreen></iframe>':'<a class="link-estudo" href="'+escapeHtml(h.youtube_principal)+'" target="_blank" rel="noopener">Abrir busca/vídeo no YouTube</a>')+
        '<p><a class="link-estudo" href="'+escapeHtml(h.cifra||"#")+'" target="_blank" rel="noopener">Abrir cifra</a></p>'+
        addChecklist("song-scale-"+i,"Estudei esta música")+
        '<textarea class="study-notes" data-song-note="'+escapeHtml(h.id)+'" placeholder="Anotações sobre esta música..."></textarea>';
      area.appendChild(box);
    });
    const saved=safeRead(notasKey,{});
    document.querySelectorAll("[data-song-note]").forEach(el=>{
      el.value=saved[el.dataset.songNote]||"";
      el.addEventListener("input",()=>{const all=safeRead(notasKey,{});all[el.dataset.songNote]=el.value;safeWrite(notasKey,all);});
    });
    updateProgress();
  });
}

function start() {
  if(lista) {
    document.getElementById("tituloEstudo").textContent="Estudo da escala";
    renderSongScaleStudy(lista.split("|").map(x=>x.trim()).filter(Boolean));
    renderNotes(noteAndProgressKey());
    return;
  }
  if(!tipo){document.getElementById("tituloEstudo").textContent="Estudo não encontrado";return;}
  if(tipo==="escala"){document.getElementById("tituloEstudo").textContent="Estudo de escalas musicais";renderScaleTrainer();return;}
  fetch("data/estudos/"+encodeURIComponent(tipo)+".json").then(r=>{if(!r.ok)throw new Error("Estudo não encontrado");return r.json();}).then(data=>{
    studyData=data;
    document.getElementById("tituloEstudo").textContent=data.titulo||"Estudo";
    renderText(data.texto);
    renderVideos(data.videos);
    renderLinks(data);
    renderExercises(data.exercicios,tipo);
    renderInstrumentTools(tipo);
    renderNotes(tipo);
    updateProgress();
  }).catch(error=>{
    console.error(error);
    document.getElementById("tituloEstudo").textContent="Não foi possível carregar este estudo";
    document.getElementById("textoEstudo").textContent="Verifique sua conexão e tente novamente.";
  });
}
function abrirEscalaCodigo(){
  const codigo=document.getElementById("codigoEscala").value.trim();
  if(!codigo){alert("Cole o código da escala.");return;}
  window.location.href="estudo.html?hinos="+encodeURIComponent(codigo);
}
start();
