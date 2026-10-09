// Sonidos generados con Web Audio API (no necesita archivos de audio).
const Sonido = (() => {
  let ctx = null;
  let silenciado = false;
  try { silenciado = localStorage.getItem("silencio") === "1"; } catch (e) {}

  // Los navegadores de celular solo permiten audio después de un toque del usuario.
  function contexto() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tono(frecuencia, inicio, duracion, { tipo = "sine", volumen = 0.25, hasta = null } = {}) {
    const c = contexto();
    if (!c || silenciado) return;
    const t = c.currentTime + inicio;
    const osc = c.createOscillator();
    const gan = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frecuencia, t);
    if (hasta) osc.frequency.exponentialRampToValueAtTime(hasta, t + duracion);
    gan.gain.setValueAtTime(0.0001, t);
    gan.gain.exponentialRampToValueAtTime(volumen, t + 0.02);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    osc.connect(gan).connect(c.destination);
    osc.start(t);
    osc.stop(t + duracion + 0.05);
  }

  // Silbato de árbitro: tono agudo con vibrato
  function silbato(inicio = 0, duracion = 0.35) {
    const c = contexto();
    if (!c || silenciado) return;
    const t = c.currentTime + inicio;
    const osc = c.createOscillator();
    const lfo = c.createOscillator();
    const lfoGan = c.createGain();
    const gan = c.createGain();
    osc.type = "sine";
    osc.frequency.value = 2900;
    lfo.frequency.value = 28;
    lfoGan.gain.value = 180;
    lfo.connect(lfoGan).connect(osc.frequency);
    gan.gain.setValueAtTime(0.0001, t);
    gan.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    gan.gain.setValueAtTime(0.18, t + duracion - 0.05);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    osc.connect(gan).connect(c.destination);
    osc.start(t); lfo.start(t);
    osc.stop(t + duracion + 0.05); lfo.stop(t + duracion + 0.05);
  }

  return {
    get silenciado() { return silenciado; },
    alternar() {
      silenciado = !silenciado;
      try { localStorage.setItem("silencio", silenciado ? "1" : "0"); } catch (e) {}
      return silenciado;
    },
    desbloquear: contexto,
    click() { tono(660, 0, 0.08, { tipo: "triangle", volumen: 0.2 }); },
    tick() { tono(1000, 0, 0.06, { tipo: "square", volumen: 0.08 }); },
    correcto() {
      tono(523, 0, 0.15, { tipo: "triangle" });
      tono(659, 0.12, 0.15, { tipo: "triangle" });
      tono(784, 0.24, 0.3, { tipo: "triangle" });
    },
    incorrecto() {
      tono(220, 0, 0.25, { tipo: "sawtooth", volumen: 0.15 });
      tono(160, 0.2, 0.4, { tipo: "sawtooth", volumen: 0.15, hasta: 110 });
    },
    inicio() { silbato(0, 0.25); silbato(0.35, 0.6); },
    final() {
      silbato(0, 0.3); silbato(0.4, 0.3); silbato(0.8, 0.8);
      [523, 659, 784, 1047].forEach((f, i) => tono(f, 1.8 + i * 0.15, 0.4, { tipo: "triangle" }));
      tono(1047, 2.5, 0.8, { tipo: "triangle" });
    },
  };
})();
