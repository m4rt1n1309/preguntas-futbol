const $ = (sel) => document.querySelector(sel);

const estado = {
  jugadores: [{ nombre: "", puntos: 0 }, { nombre: "", puntos: 0 }],
  turno: 0,          // jugador que elige la próxima casilla
  tablero: [],       // tablero[cat][fila] = { valor, pregunta, usada, ganador }
  categorias: [],    // categorías sorteadas para esta partida
  config: { rebote: true, restar: false, tiempo: 30, cantidad: 6 },
  actual: null,      // pregunta en curso
  vistas: new Set(), // preguntas ya jugadas (para no repetir en la revancha)
};

let intervalo = null;

function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach((p) => p.classList.remove("activa"));
  $("#" + id).classList.add("activa");
}

// ---------- Inicio ----------

function empezar() {
  estado.jugadores[0] = { nombre: $("#nombre1").value.trim() || "Jugador 1", puntos: 0 };
  estado.jugadores[1] = { nombre: $("#nombre2").value.trim() || "Jugador 2", puntos: 0 };
  estado.config = {
    rebote: $("#optRebote").checked,
    restar: $("#optRestar").checked,
    tiempo: Number($("#optTiempo").value),
    cantidad: Number($("#optCantidad").value),
  };
  estado.turno = Math.random() < 0.5 ? 0 : 1; // sorteo de quién empieza
  estado.categorias = mezclar(CATEGORIAS).slice(0, estado.config.cantidad);

  estado.tablero = estado.categorias.map((cat) =>
    VALORES.map((valor) => ({ valor, pregunta: elegirPregunta(cat.preguntas[valor]), usada: false, ganador: null }))
  );

  Sonido.inicio();
  mostrarPantalla("juego");
  render();
}

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

// ---------- Tablero ----------

// En cada columna solo se puede elegir la casilla más baja que quede libre.
function estaDisponible(c, f) {
  const col = estado.tablero[c];
  if (col[f].usada) return false;
  return col.slice(0, f).every((celda) => celda.usada);
}

function render() {
  estado.jugadores.forEach((j, i) => {
    const el = $("#j" + i);
    el.querySelector(".nombre").textContent = j.nombre;
    el.querySelector(".puntos").textContent = j.puntos;
    el.classList.toggle("activo", estado.turno === i);
  });
  $("#turno").innerHTML = `Elige:<br><b>${estado.jugadores[estado.turno].nombre}</b>`;

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
        if (estaDisponible(c, f)) {
          btn.classList.add("disponible");
          btn.onclick = () => { Sonido.click(); abrirPregunta(c, f); };
        } else {
          btn.classList.add("bloqueada");
          btn.title = "Primero respondé las de abajo";
        }
      }
      tablero.appendChild(btn);
    });
  }
}

// ---------- Pregunta ----------

function abrirPregunta(c, f) {
  const celda = estado.tablero[c][f];
  const correcta = celda.pregunta.o[0];
  estado.actual = {
    c, f, celda, correcta,
    responde: estado.turno,
    esRebote: false,
    opciones: mezclar(celda.pregunta.o),
  };

  $("#mCategoria").textContent = `${estado.categorias[c].icono} ${estado.categorias[c].nombre}`;
  $("#mValor").textContent = "x" + celda.valor;
  $("#mPregunta").textContent = celda.pregunta.p;
  $("#mResultado").textContent = "";
  $("#btnContinuar").classList.add("oculto");

  const cont = $("#mOpciones");
  cont.innerHTML = "";
  estado.actual.opciones.forEach((texto) => {
    const b = document.createElement("button");
    b.className = "opcion";
    b.textContent = texto;
    b.onclick = () => responder(texto, b);
    cont.appendChild(b);
  });

  actualizarQuien();
  $("#modal").classList.remove("oculto");
  iniciarTimer();
}

function actualizarQuien() {
  const j = estado.actual.responde;
  const color = j === 0 ? "var(--j0)" : "var(--j1)";
  const prefijo = estado.actual.esRebote ? "¡Rebote! Responde" : "Responde";
  $("#mQuien").innerHTML = `${prefijo}: <b style="color:${color}">${estado.jugadores[j].nombre}</b>`;
}

function iniciarTimer() {
  clearInterval(intervalo);
  const timer = $("#mTimer");
  const barra = timer.querySelector(".barra");
  const total = estado.config.tiempo;
  timer.classList.toggle("oculto", total === 0);
  timer.classList.remove("urgente");
  if (total === 0) return;

  let restante = total;
  barra.style.transition = "none";
  barra.style.width = "100%";
  void barra.offsetWidth; // reinicia la animación
  barra.style.transition = "";

  intervalo = setInterval(() => {
    restante--;
    barra.style.width = (restante / total) * 100 + "%";
    timer.classList.toggle("urgente", restante <= 5);
    if (restante > 0 && restante <= 5) Sonido.tick();
    if (restante <= 0) {
      clearInterval(intervalo);
      responder(null, null);
    }
  }, 1000);
}

function responder(texto, boton) {
  clearInterval(intervalo);
  const a = estado.actual;
  const jugador = estado.jugadores[a.responde];
  const valor = a.celda.valor;
  const botones = [...document.querySelectorAll(".opcion")];

  if (texto === a.correcta) {
    jugador.puntos += valor;
    a.celda.ganador = a.responde;
    botones.forEach((b) => (b.disabled = true));
    boton.classList.add("correcta");
    Sonido.correcto();
    $("#mResultado").textContent = `✅ ¡Correcto! +${valor} para ${jugador.nombre}`;
    return terminarPregunta();
  }

  // Respuesta incorrecta o tiempo agotado
  Sonido.incorrecto();
  if (boton) {
    boton.classList.add("incorrecta");
    boton.disabled = true;
  }
  if (estado.config.restar) jugador.puntos -= valor;
  const motivo = texto === null ? "⏰ ¡Se acabó el tiempo!" : "❌ Incorrecto.";
  const resta = estado.config.restar ? ` (-${valor})` : "";

  if (estado.config.rebote && !a.esRebote) {
    a.esRebote = true;
    a.responde = 1 - a.responde;
    $("#mResultado").textContent = `${motivo}${resta} Pasa al rival...`;
    actualizarQuien();
    iniciarTimer();
    return;
  }

  botones.forEach((b) => {
    b.disabled = true;
    if (b.textContent === a.correcta) b.classList.add("correcta");
  });
  $("#mResultado").textContent = `${motivo}${resta} La respuesta era: ${a.correcta}`;
  terminarPregunta();
}

function terminarPregunta() {
  estado.actual.celda.usada = true;
  estado.turno = 1 - estado.turno; // el turno de elegir siempre alterna
  $("#btnContinuar").classList.remove("oculto");
}

function continuar() {
  $("#modal").classList.add("oculto");
  const quedan = estado.tablero.some((col) => col.some((celda) => !celda.usada));
  if (quedan) render();
  else mostrarFinal();
}

// ---------- Final ----------

function mostrarFinal() {
  const [a, b] = estado.jugadores;
  $("#ganador").textContent =
    a.puntos === b.puntos ? "🤝 ¡Empate!" : `🏆 ¡Ganó ${a.puntos > b.puntos ? a.nombre : b.nombre}!`;
  $("#resumen").innerHTML = `${a.nombre}: <b>${a.puntos}</b> pts &nbsp;·&nbsp; ${b.nombre}: <b>${b.puntos}</b> pts`;
  mostrarPantalla("final");
  Sonido.final();
}

$("#btnEmpezar").onclick = empezar;
$("#btnContinuar").onclick = continuar;
$("#btnRevancha").onclick = empezar;
$("#btnNuevo").onclick = () => mostrarPantalla("inicio");

function pintarSonido() {
  document.querySelectorAll(".btn-sonido").forEach((b) => (b.textContent = Sonido.silenciado ? "🔇" : "🔊"));
}
document.querySelectorAll(".btn-sonido").forEach((b) =>
  b.addEventListener("click", () => { Sonido.alternar(); pintarSonido(); Sonido.click(); })
);
pintarSonido();
// En celulares el audio se habilita con el primer toque
document.addEventListener("pointerdown", () => Sonido.desbloquear(), { once: true });
