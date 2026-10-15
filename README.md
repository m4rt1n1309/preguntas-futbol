# ⚽ Preguntas de Fútbol

Juego de preguntas de fútbol para 1 a 4 jugadores, estilo tablero (x100 a x500).

**Jugar online:** https://m4rt1n1309.github.io/preguntas-futbol/

## Reglas
- En cada partida se sortean las categorías (4, 5 o 6) entre 18 disponibles.
- En cada columna se empieza por abajo (x100, lo más fácil) y se va subiendo hasta x500 (lo más difícil).
- Los jugadores se turnan para elegir, en ronda; si aciertan suman los puntos de la casilla.
- Opcional: rebote (si uno falla responde el siguiente), restar puntos al fallar y tiempo límite.

## Modos de juego
- **Mi equipo:** en "Preguntas" se elige uno de los 30 equipos de la Primera División y el tablero
  pasa a tener 4 categorías sobre ese club (Historia, Ídolos y DT, Títulos y logros, Cancha e hinchada).
  Se puede jugar solo o en grupo, en el mismo dispositivo u online.
- **Mismo dispositivo:** de 1 a 4 jugadores se turnan en el mismo celular o compu. Jugando solo, al final se muestra cuántas preguntas acertaste.
- **Online:** uno toca "Crear sala" y comparte el código (o el link de invitación); hasta 3 más tocan "Unirse".
  Cada uno juega desde su dispositivo. Usa [PeerJS](https://peerjs.com/) (conexión directa entre dispositivos, gratis, sin servidor propio).
  Si alguien se desconecta, la partida sigue con los demás.

## Agregar preguntas
Editar `preguntas.js` (hay 5 preguntas por casilla, 450 en total). Las preguntas de cada equipo están en `equipos.js`
(2 por casilla, 40 por equipo, 1.200 en total): en cada partida se sortea una de cada casilla y en la revancha salen las otras. Las preguntas van subiendo de dificultad: x100 fáciles, x500 muy difíciles. La **primera opción** de cada pregunta es la correcta (el juego las mezcla al mostrarlas).

Al cambiar archivos `.css` o `.js`, subir el número de `?v=` en `index.html` para que los navegadores no usen la versión vieja guardada.
