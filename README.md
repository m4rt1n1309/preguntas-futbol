# ⚽ Preguntas de Fútbol

Juego de preguntas de fútbol para 2 a 4 jugadores, estilo tablero (x100 a x500).

**Jugar online:** https://m4rt1n1309.github.io/preguntas-futbol/

## Reglas
- En cada partida se sortean las categorías (4, 5 o 6) entre 12 disponibles.
- En cada columna se empieza por abajo (x100) y se va subiendo.
- Los jugadores se turnan para elegir, en ronda; si aciertan suman los puntos de la casilla.
- Opcional: rebote (si uno falla responde el siguiente), restar puntos al fallar y tiempo límite.

## Modos de juego
- **Mismo dispositivo:** de 2 a 4 jugadores se turnan en el mismo celular o compu.
- **Online:** uno toca "Crear sala" y comparte el código (o el link de invitación); hasta 3 más tocan "Unirse".
  Cada uno juega desde su dispositivo. Usa [PeerJS](https://peerjs.com/) (conexión directa entre dispositivos, gratis, sin servidor propio).
  Si alguien se desconecta, la partida sigue con los demás.

## Agregar preguntas
Editar `preguntas.js` (hay 5 preguntas por casilla, 300 en total). La **primera opción** de cada pregunta es la correcta (el juego las mezcla al mostrarlas).

Al cambiar archivos `.css` o `.js`, subir el número de `?v=` en `index.html` para que los navegadores no usen la versión vieja guardada.
