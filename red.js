// Conexión online entre dispositivos usando PeerJS (WebRTC, de igual a igual).
// El anfitrión crea una sala con un código y recibe a los invitados; cada invitado
// se conecta solo con el anfitrión, que reparte los mensajes a todos.
const Red = (() => {
  const PREFIJO = "pregfut-";
  const LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin O/0/I/1 para que no se confundan
  let peer = null;
  const conexiones = new Map(); // id del otro → { conn, ultimo }
  let latido = null;
  const handlers = {};

  const emitir = (evento, ...args) => handlers[evento] && handlers[evento](...args);

  function codigoAzar() {
    return Array.from({ length: 5 }, () => LETRAS[Math.floor(Math.random() * LETRAS.length)]).join("");
  }

  function mensajeError(e) {
    switch (e && e.type) {
      case "peer-unavailable": return "No existe una sala con ese código.";
      case "network":
      case "server-error":
      case "socket-error":
      case "socket-closed": return "No se pudo conectar al servidor. Revisá tu conexión a internet.";
      case "browser-incompatible": return "Este navegador no permite jugar online.";
      default: return "Error de conexión" + (e && e.type ? ` (${e.type})` : "") + ".";
    }
  }

  // id: cómo identificamos al otro lado ("host" para el invitado, el peer id para el anfitrión)
  function configurar(c, id) {
    c.on("open", () => {
      conexiones.set(id, { conn: c, ultimo: Date.now() });
      iniciarLatido();
      emitir("conectado", id);
    });
    c.on("data", (d) => {
      const info = conexiones.get(id);
      if (info) info.ultimo = Date.now();
      if (d && d.tipo === "ping") return;
      if (d && d.tipo === "chau") return perder(id, c);
      emitir("mensaje", d, id);
    });
    c.on("close", () => perder(id, c));
    c.on("error", () => perder(id, c));
  }

  function perder(id, c) {
    const info = conexiones.get(id);
    if (!info || info.conn !== c) return;
    conexiones.delete(id);
    try { c.close(); } catch (e) {}
    emitir("desconectado", id);
  }

  // Ping periódico: si alguien no responde en un rato, se considera desconectado.
  function iniciarLatido() {
    if (latido) return;
    latido = setInterval(() => {
      const ahora = Date.now();
      conexiones.forEach((info, id) => {
        if (info.conn.open) info.conn.send({ tipo: "ping" });
        if (ahora - info.ultimo > 20000) perder(id, info.conn);
      });
    }, 3000);
  }

  function crearSala() {
    return new Promise((resolve, reject) => {
      const codigo = codigoAzar();
      let abierto = false;
      peer = new Peer(PREFIJO + codigo);
      peer.on("open", () => { abierto = true; resolve(codigo); });
      peer.on("connection", (c) => configurar(c, c.peer));
      peer.on("error", (e) => {
        if (!abierto && e.type === "unavailable-id") {
          peer.destroy();
          crearSala().then(resolve, reject); // código repetido: probar otro
        } else if (!abierto) {
          reject(new Error(mensajeError(e)));
        } else if (e.type !== "peer-unavailable") {
          emitir("error", mensajeError(e));
        }
      });
    });
  }

  function unirse(codigo) {
    return new Promise((resolve, reject) => {
      let conectado = false;
      peer = new Peer();
      peer.on("open", () => {
        const c = peer.connect(PREFIJO + codigo.trim().toUpperCase(), { reliable: true });
        configurar(c, "host");
        c.on("open", () => { conectado = true; resolve(); });
      });
      peer.on("error", (e) => {
        if (!conectado) reject(new Error(mensajeError(e)));
        else emitir("error", mensajeError(e));
      });
      setTimeout(() => {
        if (!conectado) reject(new Error("No se pudo conectar a la sala. Revisá el código e intentá de nuevo."));
      }, 15000);
    });
  }

  // Sin "para": se manda a todos.
  function enviar(mensaje, para) {
    conexiones.forEach((info, id) => {
      if ((para === undefined || para === id) && info.conn.open) info.conn.send(mensaje);
    });
  }

  // Corta a un invitado (por ejemplo, si la sala está llena).
  function expulsar(id, mensaje) {
    const info = conexiones.get(id);
    if (!info) return;
    if (mensaje) enviar(mensaje, id);
    conexiones.delete(id);
    setTimeout(() => info.conn.close(), 500);
  }

  function cerrar() {
    enviar({ tipo: "chau" });
    clearInterval(latido);
    latido = null;
    const todas = [...conexiones.values()];
    conexiones.clear();
    todas.forEach((info) => info.conn.close());
    if (peer) peer.destroy();
    peer = null;
  }

  // Al cerrar o salir de la página, avisar para que los demás no tengan que esperar el ping.
  window.addEventListener("pagehide", () => enviar({ tipo: "chau" }));

  return {
    on(evento, fn) { handlers[evento] = fn; },
    crearSala,
    unirse,
    enviar,
    expulsar,
    cerrar,
    get miId() { return peer ? peer.id : null; },
    get cantidad() { return conexiones.size; },
  };
})();
