const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// En modo online el anfitrión es el "dueño" del estado: aplica las reglas y le manda
// una copia al invitado. El invitado solo envía sus acciones (elegir, responder, continuar).
const estado = {
  modo: "local",     // "local" | "host" | "invitado"
  yo: null,          // online: 0 = anfitrión, 1 = invitado
  fase: "inicio",    // "inicio" | "tablero" | "final"
  jugadores: [{ nombre: "", puntos: 0 }, { nombre: "", puntos: 0 }],
  turno: 0,          // jugador que elige la próxima casilla
  categorias: [],    // categorías sorteadas para esta partida
  tablero: [],       // tablero[cat][fila] = { valor, pregunta, usada, ganador }
  config: { rebote: true, restar: false, tiempo: 30, cantidad: 6 },
  actual: null,      // pregunta en curso
  vistas: new Set(), // preguntas ya jugadas (para no repetir en la revancha)
  rival: null,       // nombre del invitado (solo anfitrión)
};

const esAutoridad = () => estado.modo !== "invitado";
const puedeActuar = (j) => estado.modo === "local" || estado.yo === j;

function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) {} }
function leer(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }

function mostrarPantalla(id) {
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

function nuevaPartida(nombres, config) {
  estado.jugadores = nombres.map((nombre) => ({ nombre, puntos: 0 }));
  estado.config = config;
  estado.turno = Math.random() < 0.5 ? 0 : 1; // sorteo de quién empieza
  estado.categorias = mezclar(CATEGORIAS).slice(0, config.cantidad);
  estado.tablero = estado.categorias.map((cat) =>
    VALORES.map((valor) => ({ valor, pregunta: elegirPregunta(cat.preguntas[valor]), usada: false, ganador: null }))
  );
  estado.actual = null;
  estado.fase = "tablero";
  sincronizar("inicio");
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

function responder(texto, quien) {
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
  const motivo = texto === null ? `⏰ ¡Se le acabó el tiempo a ${jugador.nombre}!` : `❌ Incorrecto, ${jugador.nombre}.`;
  const resta = estado.config.restar ? ` (-${valor})` : "";

  if (estado.config.rebote && !a.esRebote) {
    a.esRebote = true;
    a.responde = 1 - a.responde;
    a.mensaje = `${motivo}${resta} ¡Rebote para ${estado.jugadores[a.responde].nombre}!`;
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
  estado.turno = 1 - estado.turno; // el turno de elegir siempre alterna
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

// Copia del estado que ve el invitado (sin las respuestas correctas pendientes).
function foto() {
  const a = estado.actual;
  return {
    fase: estado.fase,
    jugadores: estado.jugadores,
    turno: estado.turno,
    config: estado.config,
    categorias: estado.categorias.map(({ nombre, icono }) => ({ nombre, icono })),
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
  renderTablero();
  renderPregunta();
}

function nombreConMarca(j) {
  const n = estado.jugadores[j].nombre;
  return estado.modo !== "local" && estado.yo === j ? `${n} (vos)` : n;
}

function renderTablero() {
  estado.jugadores.forEach((j, i) => {
    const el = $("#j" + i);
    el.querySelector(".nombre").textContent = nombreConMarca(i);
    el.querySelector(".puntos").textContent = j.puntos;
    el.classList.toggle("activo", estado.turno === i);
  });
  const miTurno = puedeActuar(estado.turno);
  const quien = estado.jugadores[estado.turno].nombre;
  $("#turno").innerHTML = estado.modo === "local" || miTurno
    ? `Elige:<br><b>${estado.modo === "local" ? quien : "¡Vos!"}</b>`
    : `Elige:<br><b>${quien}</b><br><small>esperando...</small>`;

  const tablero = $("#tablero");
  tablero.style.gridTemplateColumns = `repeat(${estado.categorias.length}, 1fr)`;
  tablero.innerHTML = "";

  estado.categorias.forEach((cat) => {
    const h = document.createElement("div");
    h.className = "cat";
    h.innerHTML = `<span class="ico">${cat.icono}</span><span class="nom">${cat.nombre}</span>`;
    tablero.appendChild(h);
  });

  // Filas de arriba (500) hacia abajo (100)
  for (let f = VALORES.length - 1; f >= 0; f--) {
    estado.categorias.forEach((_, c) => {
      const celda = estado.tablero[c][f];
      const btn = document.createElement("button");
      btn.className = "celda";
      if (celda.usada) {
        btn.classList.add("usada", celda.ganador === null ? "nadie" : "g" + celda.ganador);
        btn.textContent = celda.ganador === null ? "—" : estado.jugadores[celda.ganador].nombre;
      } else {
        btn.textContent = "x" + celda.valor;
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

  const color = a.responde === 0 ? "var(--j0)" : "var(--j1)";
  const prefijo = a.esRebote ? "¡Rebote! Responde" : "Responde";
  const espera = !a.terminada && !puedeActuar(a.responde) ? " <small>(esperando su respuesta...)</small>" : "";
  $("#mQuien").innerHTML = a.terminada ? "" :
    `${prefijo}: <b style="color:${color}">${nombreConMarca(a.responde)}</b>${espera}`;

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
  const [a, b] = estado.jugadores;
  $("#ganador").textContent =
    a.puntos === b.puntos ? "🤝 ¡Empate!" : `🏆 ¡Ganó ${a.puntos > b.puntos ? a.nombre : b.nombre}!`;
  $("#resumen").innerHTML = `${a.nombre}: <b>${a.puntos}</b> pts &nbsp;·&nbsp; ${b.nombre}: <b>${b.puntos}</b> pts`;
  $("#btnRevancha").classList.toggle("oculto", estado.modo === "invitado");
  $("#esperaRevancha").classList.toggle("oculto", estado.modo !== "invitado");
  mostrarPantalla("final");
}

function volverAlInicio() {
  Red.cerrar();
  Object.assign(estado, { modo: "local", yo: null, fase: "inicio", actual: null, rival: null });
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

// ---------- Modo online ----------

function miNombre() {
  const n = $("#miNombre").value.trim();
  if (n) guardar("nombre", n);
  return n;
}

function enlaceSala(codigo) {
  return `${location.origin}${location.pathname}?sala=${codigo}`;
}

async function crearSala() {
  const nombre = miNombre();
  if (!nombre) return $("#miNombre").focus();
  $("#estadoOnline").textContent = "Creando sala...";
  try {
    const codigo = await Red.crearSala();
    Object.assign(estado, { modo: "host", yo: 0, rival: null });
    $("#codigoGrande").textContent = codigo;
    $("#estadoSala").textContent = "Esperando rival...";
    $("#btnEmpezarOnline").disabled = true;
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
    Object.assign(estado, { modo: "invitado", yo: 1 });
    Red.enviar({ tipo: "hola", nombre });
    $("#estadoEspera").textContent = "Conectado. Esperando al anfitrión...";
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
    if (e.name !== "AbortError") prompt("Copiá este link y mandáselo a tu rival:", url);
  }
}

function empezarOnline() {
  if (!Red.conectado || !estado.rival) return;
  nuevaPartida([$("#miNombre").value.trim() || "Anfitrión", estado.rival], leerConfig());
}

Red.on("mensaje", (m) => {
  if (estado.modo === "host") {
    if (m.tipo === "hola") {
      estado.rival = String(m.nombre || "Rival").slice(0, 16);
      $("#estadoSala").textContent = `✅ ${estado.rival} se unió. ¡Ya pueden jugar!`;
      $("#btnEmpezarOnline").disabled = false;
      Red.enviar({ tipo: "bienvenida", nombre: $("#miNombre").value.trim() });
      Sonido.click();
    } else if (m.tipo === "accion") {
      ejecutar(m.accion, m, 1);
    }
  } else if (estado.modo === "invitado") {
    if (m.tipo === "bienvenida") {
      $("#estadoEspera").textContent = `Conectado a la sala de ${m.nombre}. Esperando que empiece la partida...`;
    } else if (m.tipo === "estado") {
      aplicarFoto(m.estado, m.sonido);
    } else if (m.tipo === "lleno") {
      Red.cerrar();
      estado.modo = "local";
      mostrarPanel("panelOnline");
      $("#estadoOnline").textContent = "Esa sala ya tiene dos jugadores.";
    }
  }
});

Red.on("desconectado", () => {
  if (estado.modo === "host" && estado.fase === "inicio") {
    // En la sala de espera: seguir esperando a otro rival
    estado.rival = null;
    $("#estadoSala").textContent = "El rival se fue. Esperando rival...";
    $("#btnEmpezarOnline").disabled = true;
    return;
  }
  if (estado.modo !== "local") avisar("Se perdió la conexión con el rival 😕");
});

Red.on("error", (msg) => {
  if (estado.modo !== "local" && !Red.conectado && estado.fase !== "inicio") avisar(msg);
});

// ---------- Eventos ----------

$("#btnModoLocal").onclick = () => mostrarPanel("panelLocal");
$("#btnModoOnline").onclick = () => { mostrarPanel("panelOnline"); if (!$("#miNombre").value) $("#miNombre").focus(); };
$$(".btn-volver").forEach((b) => (b.onclick = () => mostrarPanel("panelModo")));
$$(".btn-salir").forEach((b) => (b.onclick = volverAlInicio));

$("#btnEmpezar").onclick = () => {
  estado.modo = "local";
  estado.yo = null;
  nuevaPartida([$("#nombre1").value.trim() || "Jugador 1", $("#nombre2").value.trim() || "Jugador 2"], leerConfig());
};
$("#btnCrearSala").onclick = crearSala;
$("#btnUnirse").onclick = unirseSala;
$("#codigoSala").addEventListener("keydown", (e) => { if (e.key === "Enter") unirseSala(); });
$("#codigoSala").addEventListener("input", (e) => (e.target.value = e.target.value.toUpperCase()));
$("#btnCompartir").onclick = compartir;
$("#btnEmpezarOnline").onclick = empezarOnline;

$("#btnContinuar").onclick = () => accion("continuar");
$("#btnRevancha").onclick = () => {
  if (estado.modo === "local") nuevaPartida(estado.jugadores.map((j) => j.nombre), estado.config);
  else if (estado.modo === "host") {
    if (!Red.conectado) return avisar("El rival ya no está conectado.");
    nuevaPartida(estado.jugadores.map((j) => j.nombre), estado.config);
  }
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
