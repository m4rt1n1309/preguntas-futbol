// Conexión online entre 2 dispositivos usando PeerJS (WebRTC, de igual a igual).
// El anfitrión crea una sala con un código; el invitado se conecta con ese código.
const Red = (() => {
  const PREFIJO = "pregfut-";
  const LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin O/0/I/1 para que no se confundan
  let peer = null;
  let conn = null;
  let ultimoMensaje = 0;
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

  function configurar(c) {
    conn = c;
    c.on("open", () => {
      ultimoMensaje = Date.now();
      iniciarLatido();
      emitir("conectado");
    });
    c.on("data", (d) => {
      ultimoMensaje = Date.now();
      if (d && d.tipo === "ping") return;
      if (d && d.tipo === "chau") return perderConexion(c);
      emitir("mensaje", d);
    });
    c.on("close", () => perderConexion(c));
    c.on("error", () => perderConexion(c));
  }

  function perderConexion(c) {
    if (c !== conn) return;
    conn = null;
    clearInterval(latido);
    emitir("desconectado");
  }

  // Ping periódico: si el otro no responde en un rato, se considera desconectado.
  function iniciarLatido() {
    clearInterval(latido);
    latido = setInterval(() => {
      if (!conn) return;
      enviar({ tipo: "ping" });
      if (Date.now() - ultimoMensaje > 20000) {
        const c = conn;
        perderConexion(c);
        c.close();
      }
    }, 3000);
  }

  function crearSala() {
    return new Promise((resolve, reject) => {
      const codigo = codigoAzar();
      let abierto = false;
      peer = new Peer(PREFIJO + codigo);
      peer.on("open", () => { abierto = true; resolve(codigo); });
      peer.on("connection", (c) => {
        if (conn) {
          // Ya hay un rival: avisar que la sala está llena
          c.on("open", () => { c.send({ tipo: "lleno" }); setTimeout(() => c.close(), 500); });
          return;
        }
        configurar(c);
      });
      peer.on("error", (e) => {
        if (!abierto && e.type === "unavailable-id") {
          peer.destroy();
          crearSala().then(resolve, reject); // código repetido: probar otro
        } else if (!abierto) {
          reject(new Error(mensajeError(e)));
        } else {
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
        configurar(c);
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

  function enviar(mensaje) {
    if (conn && conn.open) conn.send(mensaje);
  }

  function cerrar() {
    clearInterval(latido);
    enviar({ tipo: "chau" });
    const c = conn;
    conn = null;
    if (c) c.close();
    if (peer) peer.destroy();
    peer = null;
  }

  // Al cerrar o salir de la página, avisar al rival para que no tenga que esperar el ping.
  window.addEventListener("pagehide", () => enviar({ tipo: "chau" }));

  return {
    on(evento, fn) { handlers[evento] = fn; },
    crearSala,
    unirse,
    enviar,
    cerrar,
    get conectado() { return !!(conn && conn.open); },
  };
})();
