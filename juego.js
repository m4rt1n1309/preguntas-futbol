const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const MAX_JUGADORES = 4;

// En modo online el anfitrión es el "dueño" del estado: aplica las reglas y les manda
// una copia a los invitados. Los invitados solo envían sus acciones (elegir, responder, continuar).
const estado = {
  modo: "local",     // "local" | "host" | "invitado"
  yo: null,          // online: mi índice en jugadores
  fase: "inicio",    // "inicio" | "tablero" | "final"
  jugadores: [],     // [{ id, nombre, puntos, conectado }]
  turno: 0,          // jugador que elige la próxima casilla
  categorias: [],    // categorías sorteadas para esta partida
  tablero: [],       // tablero[cat][fila] = { valor, pregunta, usada, ganador }
  config: { rebote: true, restar: false, tiempo: 30, cantidad: 6 },
  actual: null,      // pregunta en curso
  vistas: new Set(), // preguntas ya jugadas (para no repetir en la revancha)
  sala: [],          // invitados en la sala de espera (solo anfitrión): [{ id, nombre }]
};

const esAutoridad = () => estado.modo !== "invitado";
const puedeActuar = (j) => estado.modo === "local" || estado.yo === j;
const color = (j) => `var(--j${j})`;

function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapar(texto) {
  const d = document.createElement("div");
  d.textContent = texto;
  return d.innerHTML;
}

function inicial(nombre) {
  return (String(nombre).trim()[0] || "?").toUpperCase();
}

function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) {} }
function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }

function mostrarPantalla(id) {
  if ($("#" + id).classList.contains("activa")) return; // no reiniciar la animación de entrada
  $$(".pantalla").forEach((p) => p.classList.remove("activa"));
  $("#" + id).classList.add("activa");
}

function mostrarPanel(id) {
  $$(".panel").forEach((p) => p.classList.remove("activo"));
  const panel = $("#" + id);
  panel.classList.add("activo");
  const slot = panel.querySelector(".slot-opciones");
  if (slot) slot.appendChild($("#opciones"));
  $("#opciones").style.display = slot ? "" : "none";
}

function leerConfig() {
  return {
    rebote: $("#optRebote").checked,
    restar: $("#optRestar").checked,
    tiempo: Number($("#optTiempo").value),
    cantidad: Number($("#optCantidad").value),
  };
}

// ---------- Lógica del juego (solo la ejecuta local o anfitrión) ----------

// Prefiere preguntas que todavía no salieron; si ya salieron todas, las libera.
function elegirPregunta(lista) {
  let libres = lista.filter((q) => !estado.vistas.has(q.p));
  if (libres.length === 0) {
    lista.forEach((q) => estado.vistas.delete(q.p));
    libres = lista;
  }
  const q = libres[Math.floor(Math.random() * libres.length)];
  estado.vistas.add(q.p);
  return q;
}

// participantes: [{ id, nombre }]
function nuevaPartida(participantes, config) {
  estado.jugadores = participantes.map(({ id, nombre }) => ({ id, nombre, puntos: 0, conectado: true }));
  estado.config = config;
  estado.turno = Math.floor(Math.random() * estado.jugadores.length); // sorteo de quién empieza
  estado.categorias = mezclar(CATEGORIAS).slice(0, config.cantidad);
  estado.tablero = estado.categorias.map((cat) =>
    VALORES.map((valor) => ({ valor, pregunta: elegirPregunta(cat.preguntas[valor]), usada: false, ganador: null }))
  );
  estado.actual = null;
  estado.fase = "tablero";
  if (estado.modo === "host") estado.yo = 0;
  sincronizar("inicio");
}

// Próximo jugador en la ronda, salteando a los que se desconectaron.
function siguiente(i) {
  const n = estado.jugadores.length;
  for (let k = 1; k <= n; k++) {
    const j = (i + k) % n;
    if (estado.jugadores[j].conectado) return j;
  }
  return i;
}

// En cada columna solo se puede elegir la casilla más baja que quede libre.
function estaDisponible(c, f) {
  const col = estado.tablero[c];
  if (col[f].usada) return false;
  return col.slice(0, f).every((celda) => celda.usada);
}

function iniciarReloj(a) {
  a.fin = estado.config.tiempo > 0 ? Date.now() + estado.config.tiempo * 1000 : null;
}

function elegir(c, f, quien) {
  if (estado.fase !== "tablero" || estado.actual) return;
  if (quien !== null && quien !== estado.turno) return;
  if (!estaDisponible(c, f)) return;
  const celda = estado.tablero[c][f];
  estado.actual = {
    c, f,
    pregunta: celda.pregunta.p,
    correcta: celda.pregunta.o[0],
    opciones: mezclar(celda.pregunta.o),
    responde: estado.turno,
    esRebote: false,
    descartadas: [],
    terminada: false,
    mensaje: "",
    fin: null,
  };
  iniciarReloj(estado.actual);
  sincronizar("click");
}

// texto: opción elegida; null = se agotó el tiempo. "motivo" permite cambiar el mensaje del error.
function responder(texto, quien, motivo) {
  const a = estado.actual;
  if (!a || a.terminada) return;
  if (quien !== null && quien !== a.responde) return;
  if (texto !== null && (a.descartadas.includes(texto) || !a.opciones.includes(texto))) return;

  const celda = estado.tablero[a.c][a.f];
  const jugador = estado.jugadores[a.responde];
  const valor = celda.valor;

  if (texto === a.correcta) {
    jugador.puntos += valor;
    celda.ganador = a.responde;
    a.mensaje = `✅ ¡Correcto! +${valor} para ${jugador.nombre}`;
    return terminarPregunta("correcto");
  }

  // Respuesta incorrecta o tiempo agotado
  if (texto !== null) a.descartadas.push(texto);
  if (estado.config.restar) jugador.puntos -= valor;
  motivo = motivo || (texto === null ? `⏰ ¡Se le acabó el tiempo a ${jugador.nombre}!` : `❌ Incorrecto, ${jugador.nombre}.`);
  const resta = estado.config.restar ? ` (-${valor})` : "";

  const rebote = siguiente(a.responde);
  if (estado.config.rebote && !a.esRebote && rebote !== a.responde) {
    a.esRebote = true;
    a.responde = rebote;
    a.mensaje = `${motivo}${resta} ¡Rebote para ${estado.jugadores[rebote].nombre}!`;
    iniciarReloj(a);
    return sincronizar("incorrecto");
  }

  a.mensaje = `${motivo}${resta} La respuesta era: ${a.correcta}`;
  terminarPregunta("incorrecto");
}

function terminarPregunta(sonido) {
  const a = estado.actual;
  a.terminada = true;
  a.fin = null;
  estado.tablero[a.c][a.f].usada = true;
  estado.turno = siguiente(estado.turno); // el turno de elegir rota entre todos
  sincronizar(sonido);
}

function continuar() {
  if (!estado.actual || !estado.actual.terminada) return;
  estado.actual = null;
  const quedan = estado.tablero.some((col) => col.some((celda) => !celda.usada));
  if (quedan) return sincronizar();
  estado.fase = "final";
  sincronizar("final");
}

// Acciones de la interfaz: el invitado las manda al anfitrión, el resto las ejecuta.
function accion(tipo, datos = {}) {
  if (estado.modo === "invitado") return Red.enviar({ tipo: "accion", accion: tipo, ...datos });
  ejecutar(tipo, datos, estado.modo === "host" ? 0 : null);
}

function ejecutar(tipo, d, quien) {
  if (tipo === "elegir") elegir(d.c, d.f, quien);
  else if (tipo === "responder") responder(d.texto, quien);
  else if (tipo === "continuar") continuar();
}

// ---------- Sincronización ----------

// Copia del estado que ven los invitados (sin las respuestas correctas pendientes).
function foto() {
  const a = estado.actual;
  return {
    fase: estado.fase,
    jugadores: estado.jugadores,
    turno: estado.turno,
    config: estado.config,
    categorias: estado.categorias.map(({ nombre, corto, icono }) => ({ nombre, corto, icono })),
    tablero: estado.tablero.map((col) => col.map(({ valor, usada, ganador }) => ({ valor, usada, ganador }))),
    actual: a && {
      c: a.c, f: a.f, pregunta: a.pregunta, opciones: a.opciones, responde: a.responde,
      esRebote: a.esRebote, descartadas: a.descartadas, terminada: a.terminada, mensaje: a.mensaje,
      correcta: a.terminada ? a.correcta : null,
      restanteMs: a.fin ? Math.max(0, a.fin - Date.now()) : null,
    },
  };
}

function sincronizar(sonido) {
  if (estado.modo === "host") Red.enviar({ tipo: "estado", estado: foto(), sonido });
  if (sonido) Sonido[sonido]();
  renderTodo();
}

function aplicarFoto(f, sonido) {
  Object.assign(estado, f);
  estado.yo = estado.jugadores.findIndex((j) => j.id === Red.miId);
  if (estado.actual) {
    const ms = estado.actual.restanteMs;
    estado.actual.fin = ms === null ? null : Date.now() + ms;
  }
  if (sonido) Sonido[sonido]();
  renderTodo();
}

// ---------- Interfaz ----------

function renderTodo() {
  if (estado.fase === "inicio") return;
  if (estado.fase === "final") {
    $("#modal").classList.add("oculto");
    return renderFinal();
  }
  mostrarPantalla("juego");
  renderMarcador();
  renderTablero();
  renderPregunta();
}

function nombreConMarca(j) {
  const n = estado.jugadores[j].nombre;
  return estado.modo !== "local" && estado.yo === j ? `${n} (vos)` : n;
}

let puntosPrevios = [];
function renderMarcador() {
  const cont = $("#jugadores");
  cont.dataset.n = estado.jugadores.length;
  cont.innerHTML = "";
  estado.jugadores.forEach((j, i) => {
    const el = document.createElement("div");
    el.className = "jugador";
    el.style.setProperty("--c", color(i));
    el.classList.toggle("activo", estado.turno === i);
    el.classList.toggle("fuera", !j.conectado);
    el.innerHTML = `<span class="avatar">${escapar(inicial(j.nombre))}</span>
      <div class="datos"><span class="nombre">${escapar(nombreConMarca(i))}</span><span class="puntos">${j.puntos}</span></div>`;
    if (puntosPrevios[i] !== undefined && puntosPrevios[i] !== j.puntos) el.querySelector(".puntos").classList.add("salto");
    cont.appendChild(el);
  });
  puntosPrevios = estado.jugadores.map((j) => j.puntos);

  const quien = estado.jugadores[estado.turno];
  const nombre = `<b style="color:${color(estado.turno)}">${escapar(quien.nombre)}</b>`;
  $("#turno").innerHTML = estado.modo === "local"
    ? `Elige ${nombre}`
    : puedeActuar(estado.turno) ? `<b class="tu-turno">¡Te toca elegir!</b>` : `Elige ${nombre} <small>esperando...</small>`;
}

function renderTablero() {
  const miTurno = puedeActuar(estado.turno);
  const tablero = $("#tablero");
  tablero.style.gridTemplateColumns = `repeat(${estado.categorias.length}, 1fr)`;
  tablero.innerHTML = "";

  estado.categorias.forEach((cat) => {
    const h = document.createElement("div");
    h.className = "cat";
    h.innerHTML = `<span class="ico">${cat.icono}</span><span class="nom">${cat.nombre}</span>` +
      `<span class="nom-corto">${(cat.corto || cat.nombre).replaceAll("-", "&shy;")}</span>`;
    h.title = cat.nombre;
    tablero.appendChild(h);
  });

  // Filas de arriba (500) hacia abajo (100)
  for (let f = VALORES.length - 1; f >= 0; f--) {
    estado.categorias.forEach((_, c) => {
      const celda = estado.tablero[c][f];
      const btn = document.createElement("button");
      btn.className = "celda";
      if (celda.usada) {
        btn.classList.add("usada");
        if (celda.ganador === null) {
          btn.classList.add("nadie");
          btn.textContent = "—";
        } else {
          btn.classList.add("ganada");
          btn.style.setProperty("--c", color(celda.ganador));
          btn.textContent = estado.jugadores[celda.ganador].nombre;
        }
      } else {
        btn.innerHTML = `<small>x</small>${celda.valor}`;
        if (!estaDisponible(c, f)) {
          btn.classList.add("bloqueada");
          btn.title = "Primero respondé las de abajo";
        } else if (miTurno) {
          btn.classList.add("disponible");
          btn.onclick = () => accion("elegir", { c, f });
        } else {
          btn.classList.add("siguiente");
        }
      }
      tablero.appendChild(btn);
    });
  }
}

function renderPregunta() {
  const a = estado.actual;
  if (!a) return $("#modal").classList.add("oculto");
  $("#modal").classList.remove("oculto");

  const cat = estado.categorias[a.c];
  $("#mCategoria").textContent = `${cat.icono} ${cat.nombre}`;
  $("#mValor").textContent = "x" + estado.tablero[a.c][a.f].valor;
  $("#mPregunta").textContent = a.pregunta;
  $("#mResultado").textContent = a.mensaje;

  const prefijo = a.esRebote ? "¡Rebote! Responde" : "Responde";
  const espera = !a.terminada && !puedeActuar(a.responde) ? " <small>(esperando su respuesta...)</small>" : "";
  $("#mQuien").innerHTML = a.terminada ? "" :
    `${prefijo}: <b style="color:${color(a.responde)}">${escapar(nombreConMarca(a.responde))}</b>${espera}`;

  const puedeResponder = !a.terminada && puedeActuar(a.responde);
  const cont = $("#mOpciones");
  cont.innerHTML = "";
  a.opciones.forEach((texto) => {
    const b = document.createElement("button");
    b.className = "opcion";
    b.textContent = texto;
    const descartada = a.descartadas.includes(texto);
    if (descartada) b.classList.add("incorrecta");
    if (a.terminada && texto === a.correcta) b.classList.add("correcta");
    b.disabled = !puedeResponder || descartada;
    b.onclick = () => {
      $$(".opcion").forEach((o) => (o.disabled = true)); // evita doble toque mientras llega la respuesta
      accion("responder", { texto });
    };
    cont.appendChild(b);
  });

  $("#btnContinuar").classList.toggle("oculto", !a.terminada);
  pintarReloj();
}

// Barra de tiempo. Corre en todos los dispositivos, pero solo el anfitrión (o el modo
// local) decide cuándo se agota.
let ultimoSegundo = null;
function pintarReloj() {
  const a = estado.actual;
  const timer = $("#mTimer");
  const visible = !!(a && a.fin && !a.terminada);
  timer.classList.toggle("oculto", !visible);
  if (!visible) return;

  const restante = Math.max(0, a.fin - Date.now());
  const seg = Math.ceil(restante / 1000);
  timer.querySelector(".barra").style.width = (restante / (estado.config.tiempo * 1000)) * 100 + "%";
  timer.classList.toggle("urgente", seg <= 5);
  if (seg !== ultimoSegundo && seg > 0 && seg <= 5) Sonido.tick();
  ultimoSegundo = seg;

  if (restante === 0 && esAutoridad()) responder(null, null);
}
setInterval(pintarReloj, 200);

function renderFinal() {
  const orden = estado.jugadores
    .map((j, i) => ({ ...j, i }))
    .sort((a, b) => b.puntos - a.puntos);
  const maximo = orden[0].puntos;
  const ganadores = orden.filter((j) => j.puntos === maximo);
  const empate = ganadores.length > 1;

  $(".trofeo").textContent = empate ? "🤝" : "🏆";
  $("#ganador").textContent = empate ? "¡Empate!" : `¡Ganó ${ganadores[0].nombre}!`;

  // Puesto compartido si empatan en puntos
  const medallas = ["🥇", "🥈", "🥉", "4°"];
  let puesto = 0;
  $("#ranking").innerHTML = orden.map((j, k) => {
    if (k > 0 && j.puntos < orden[k - 1].puntos) puesto = k;
    return `<li style="--c:${color(j.i)}">
      <span class="medalla">${medallas[puesto]}</span>
      <span class="avatar">${escapar(inicial(j.nombre))}</span>
      <span class="rk-nombre">${escapar(j.nombre)}${j.conectado ? "" : " <small>(se fue)</small>"}</span>
      <b>${j.puntos}</b>
    </li>`;
  }).join("");

  $("#btnRevancha").classList.toggle("oculto", estado.modo === "invitado");
  $("#esperaRevancha").classList.toggle("oculto", estado.modo !== "invitado");
  if (!$("#final").classList.contains("activa")) {
    mostrarPantalla("final");
    lanzarConfeti();
  }
}

function lanzarConfeti() {
  const canvas = $("#confeti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const colores = ["#f7c948", "#ff6b4a", "#38bdf8", "#a3e635", "#c084fc", "#ffffff"];
  const piezas = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.6,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
    vy: 2 + Math.random() * 3,
    vx: -1.5 + Math.random() * 3,
    giro: Math.random() * Math.PI,
    vg: -0.15 + Math.random() * 0.3,
    color: colores[Math.floor(Math.random() * colores.length)],
  }));
  const fin = Date.now() + 5000;
  (function cuadro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.giro += p.vg;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.giro);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.giro * 2)));
      ctx.restore();
    });
    if (Date.now() < fin && $("#final").classList.contains("activa")) requestAnimationFrame(cuadro);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

function volverAlInicio() {
  Red.cerrar();
  Object.assign(estado, { modo: "local", yo: null, fase: "inicio", actual: null, sala: [] });
  puntosPrevios = [];
  $("#modal").classList.add("oculto");
  $("#aviso").classList.add("oculto");
  $("#estadoOnline").textContent = "";
  mostrarPantalla("inicio");
  mostrarPanel("panelModo");
}

function avisar(texto) {
  $("#avisoTexto").textContent = texto;
  $("#aviso").classList.remove("oculto");
}

// ---------- Modo local: cantidad de jugadores y nombres ----------

let cantidadLocal = 2;
const nombresLocales = ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"];

function renderNombresLocales() {
  $$("#optJugadores button").forEach((b) => b.classList.toggle("activo", Number(b.dataset.n) === cantidadLocal));
  const cont = $("#nombresLocal");
  cont.innerHTML = "";
  for (let i = 0; i < cantidadLocal; i++) {
    const label = document.createElement("label");
    label.style.setProperty("--c", color(i));
    label.innerHTML = `Jugador ${i + 1} <input maxlength="16">`;
    const input = label.querySelector("input");
    input.value = nombresLocales[i];
    input.oninput = () => (nombresLocales[i] = input.value);
    cont.appendChild(label);
  }
}

$$("#optJugadores button").forEach((b) => (b.onclick = () => {
  cantidadLocal = Number(b.dataset.n);
  renderNombresLocales();
}));

// ---------- Modo online ----------

function miNombre() {
  const n = $("#miNombre").value.trim();
  if (n) guardar("nombre", n);
  return n;
}

function enlaceSala(codigo) {
  return `${location.origin}${location.pathname}?sala=${codigo}`;
}

function listaHTML(nombres) {
  return nombres.map((n, i) =>
    `<li style="--c:${color(i)}"><span class="avatar">${escapar(inicial(n))}</span>${escapar(n)}${i === 0 ? " <small>👑 anfitrión</small>" : ""}</li>`
  ).join("") + Array.from({ length: MAX_JUGADORES - nombres.length }, () => `<li class="vacio">Lugar libre</li>`).join("");
}

// El anfitrión actualiza su pantalla de sala y se la manda a los invitados.
function actualizarSala() {
  const nombres = [$("#miNombre").value.trim() || "Anfitrión", ...estado.sala.map((s) => s.nombre)];
  $("#listaSala").innerHTML = listaHTML(nombres);
  const faltan = estado.sala.length === 0;
  $("#estadoSala").textContent = faltan
    ? "Esperando jugadores..."
    : nombres.length === MAX_JUGADORES ? "✅ ¡Sala completa!" : `✅ ¡Ya pueden jugar! (o esperá a más, hasta ${MAX_JUGADORES})`;
  $("#btnEmpezarOnline").disabled = faltan;
  Red.enviar({ tipo: "sala", nombres });
}

async function crearSala() {
  const nombre = miNombre();
  if (!nombre) return $("#miNombre").focus();
  $("#estadoOnline").textContent = "Creando sala...";
  try {
    const codigo = await Red.crearSala();
    Object.assign(estado, { modo: "host", yo: 0, sala: [], fase: "inicio" });
    $("#codigoGrande").textContent = codigo;
    $("#btnCompartir").textContent = "📤 Invitar";
    actualizarSala();
    mostrarPanel("panelSala");
  } catch (e) {
    Red.cerrar();
    $("#estadoOnline").textContent = e.message;
  }
}

async function unirseSala() {
  const nombre = miNombre();
  if (!nombre) return $("#miNombre").focus();
  const codigo = $("#codigoSala").value.trim().toUpperCase();
  if (codigo.length !== 5) return ($("#estadoOnline").textContent = "El código tiene 5 caracteres.");
  $("#estadoOnline").textContent = "Conectando...";
  try {
    await Red.unirse(codigo);
    Object.assign(estado, { modo: "invitado", yo: null, fase: "inicio" });
    Red.enviar({ tipo: "hola", nombre });
    $("#estadoEspera").textContent = "Conectado. Esperando al anfitrión...";
    $("#listaEspera").innerHTML = "";
    mostrarPanel("panelEspera");
    history.replaceState(null, "", location.pathname);
  } catch (e) {
    Red.cerrar();
    $("#estadoOnline").textContent = e.message;
  }
}

async function compartir() {
  const url = enlaceSala($("#codigoGrande").textContent);
  const texto = "¡Jugá conmigo a Preguntas de Fútbol! ⚽";
  try {
    if (navigator.share) return await navigator.share({ title: "Preguntas de Fútbol", text: texto, url });
    await navigator.clipboard.writeText(url);
    $("#btnCompartir").textContent = "✅ Link copiado";
  } catch (e) {
    // El usuario canceló o el navegador no permite copiar: mostrar el link
    if (e.name !== "AbortError") prompt("Copiá este link y mandáselo a los demás:", url);
  }
}

function empezarOnline() {
  if (estado.sala.length === 0) return;
  const anfitrion = { id: Red.miId, nombre: $("#miNombre").value.trim() || "Anfitrión" };
  nuevaPartida([anfitrion, ...estado.sala], leerConfig());
}

// Un jugador se fue en plena partida: se lo saltea y, si estaba respondiendo, pierde el turno.
function jugadorSeFue(id) {
  const i = estado.jugadores.findIndex((j) => j.id === id);
  if (i < 0 || !estado.jugadores[i].conectado) return;
  estado.jugadores[i].conectado = false;
  const nombre = estado.jugadores[i].nombre;

  if (estado.jugadores.filter((j) => j.conectado).length < 2) {
    return avisar("Todos los demás jugadores se desconectaron 😕");
  }
  const a = estado.actual;
  if (estado.fase === "tablero" && a && !a.terminada && a.responde === i) {
    return responder(null, null, `🔌 ${nombre} se desconectó.`);
  }
  if (estado.turno === i) estado.turno = siguiente(i);
  sincronizar();
}

Red.on("mensaje", (m, id) => {
  if (estado.modo === "host") {
    if (m.tipo === "hola") {
      if (estado.fase !== "inicio") return Red.expulsar(id, { tipo: "rechazo", motivo: "Esa partida ya empezó." });
      if (estado.sala.length >= MAX_JUGADORES - 1) {
        return Red.expulsar(id, { tipo: "rechazo", motivo: `Esa sala ya está completa (máximo ${MAX_JUGADORES} jugadores).` });
      }
      estado.sala.push({ id, nombre: String(m.nombre || "Jugador").slice(0, 16) });
      actualizarSala();
      Sonido.click();
    } else if (m.tipo === "accion") {
      const quien = estado.jugadores.findIndex((j) => j.id === id);
      if (quien >= 0) ejecutar(m.accion, m, quien);
    }
  } else if (estado.modo === "invitado") {
    if (m.tipo === "sala") {
      $("#estadoEspera").textContent = `Sala de ${m.nombres[0]}. Esperando que empiece la partida...`;
      $("#listaEspera").innerHTML = listaHTML(m.nombres);
    } else if (m.tipo === "estado") {
      aplicarFoto(m.estado, m.sonido);
    } else if (m.tipo === "rechazo") {
      Red.cerrar();
      estado.modo = "local";
      mostrarPanel("panelOnline");
      $("#estadoOnline").textContent = m.motivo;
    }
  }
});

Red.on("desconectado", (id) => {
  if (estado.modo === "host") {
    const enSala = estado.sala.findIndex((s) => s.id === id);
    if (enSala >= 0) estado.sala.splice(enSala, 1);
    if (estado.fase === "inicio") return actualizarSala();
    jugadorSeFue(id);
  } else if (estado.modo === "invitado") {
    avisar("Se perdió la conexión con el anfitrión 😕");
  }
});

Red.on("error", (msg) => {
  if (estado.modo === "invitado" && estado.fase !== "inicio") avisar(msg);
});

// ---------- Eventos ----------

$("#btnModoLocal").onclick = () => { renderNombresLocales(); mostrarPanel("panelLocal"); };
$("#btnModoOnline").onclick = () => { mostrarPanel("panelOnline"); if (!$("#miNombre").value) $("#miNombre").focus(); };
$$(".btn-volver").forEach((b) => (b.onclick = () => mostrarPanel("panelModo")));
$$(".btn-salir").forEach((b) => (b.onclick = volverAlInicio));

$("#btnEmpezar").onclick = () => {
  estado.modo = "local";
  estado.yo = null;
  const participantes = nombresLocales.slice(0, cantidadLocal)
    .map((n, i) => ({ id: null, nombre: n.trim() || `Jugador ${i + 1}` }));
  nuevaPartida(participantes, leerConfig());
};
$("#btnCrearSala").onclick = crearSala;
$("#btnUnirse").onclick = unirseSala;
$("#codigoSala").addEventListener("keydown", (e) => { if (e.key === "Enter") unirseSala(); });
$("#codigoSala").addEventListener("input", (e) => (e.target.value = e.target.value.toUpperCase()));
$("#btnCompartir").onclick = compartir;
$("#btnEmpezarOnline").onclick = empezarOnline;

$("#btnContinuar").onclick = () => accion("continuar");
$("#btnRevancha").onclick = () => {
  const siguen = estado.jugadores.filter((j) => j.conectado).map(({ id, nombre }) => ({ id, nombre }));
  if (siguen.length < 2) return avisar("No quedan jugadores conectados para la revancha.");
  puntosPrevios = [];
  nuevaPartida(siguen, estado.config);
};
$("#btnNuevo").onclick = volverAlInicio;
$("#btnAvisoOk").onclick = volverAlInicio;

function pintarSonido() {
  $$(".btn-sonido").forEach((b) => (b.textContent = Sonido.silenciado ? "🔇" : "🔊"));
}
$$(".btn-sonido").forEach((b) =>
  b.addEventListener("click", () => { Sonido.alternar(); pintarSonido(); Sonido.click(); })
);
pintarSonido();
// En celulares el audio se habilita con el primer toque
document.addEventListener("pointerdown", () => Sonido.desbloquear(), { once: true });

// ---------- Arranque ----------

$("#miNombre").value = leer("nombre") || "";
mostrarPanel("panelModo");
if (typeof Peer === "undefined") $("#btnModoOnline").disabled = true;

// Link de invitación: ?sala=CODIGO
const salaInvitada = new URLSearchParams(location.search).get("sala");
if (salaInvitada) {
  mostrarPanel("panelOnline");
  $("#codigoSala").value = salaInvitada.toUpperCase().slice(0, 5);
  $("#msgInvitacion").textContent = `Te invitaron a la sala ${$("#codigoSala").value}. Escribí tu nombre y tocá "Unirse".`;
  $("#msgInvitacion").classList.remove("oculto");
  if (!$("#miNombre").value) $("#miNombre").focus();
}
