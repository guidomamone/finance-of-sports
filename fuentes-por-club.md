# Fuentes por club

Este archivo es tuyo, Guido: un lugar para pegar links a documentos, notas de
prensa o páginas oficiales cuando encuentres algo útil para un club, aunque
todavía no tengas tiempo de cargarlo al sitio. No hace falta ningún formato
especial ni saber programar — un link y una línea de contexto alcanza. Cuando
tengas varios, decime "che, revisá fuentes-por-club.md" y yo los proceso: los
leo, saco los números/categorías reales, y los cargo al sitio con la fuente
correctamente citada.

Cómo agregar algo: buscá el país en el índice de abajo, abrí su archivo, y copiá
una línea nueva bajo el club que corresponda, con este formato:

- [qué es] — [link] — [para qué sirve o qué tiene adentro, si se nota a simple vista]

Ejemplo:

- Presupuesto 2026/27 — (ya subido como PDF) — presupuesto oficial completo, es lo que ya está cargado en Finanzas.

Si no tenés ganas de buscar dónde va, pegalo igual al final de este archivo y yo
lo acomodo en el país que corresponda cuando lo procese.

**REGLA (agregada a pedido de Guido, sesión 2026-09-12)**: cada vez que Claude revisa o actualiza la
línea de un club (haya encontrado algo nuevo o no), en `fuentes/_indice/<País>.md`, agregar/actualizar
al final de esa línea `— Último chequeo: AAAA-MM-DD` con la fecha del día. Esto es lo que le
permite a una sesión futura calcular de un vistazo qué tan viejo es cada chequeo (y por lo tanto
cuáles clubes vale la pena revisar de nuevo primero) sin tener que releer el historial de versiones
de `index.html`.

**REGLA 2 (agregada a pedido de Guido, sesión 2026-09-12)**: cuando se busca un balance/estado
financiero para un club y NO se encuentra nada, no alcanza con anotar "no se encontró" — hay que
anotar QUÉ se probó puntualmente y por qué falló cada intento (URL exacta, portal/regulador
consultado, y el motivo del bloqueo: login de socios, formulario interactivo sin URL fija,
Cloudflare, autocomplete que no devuelve resultados, sin obligación legal de publicar, etc.), más
una sugerencia concreta de qué ángulo distinto probar en el futuro si lo hay. Por qué: sin este
detalle, una sesión futura que busque "más profundo" el mismo club corre el riesgo de repetir
exactamente los mismos intentos fallidos (la misma URL obvia, el mismo portal) sin darse cuenta de
que ya se probaron y no funcionaron — el objetivo es que cada sesión nueva empiece un escalón más
allá de donde quedó la anterior, no desde cero. Ver `fuentes/Uruguay/_notas-generales.md` y
`fuentes/Uruguay/Peñarol.md` como ejemplo del nivel
de detalle esperado (lista numerada de los 3 ángulos probados en la sesión 2026-09-12, con la URL y
el motivo de bloqueo de cada uno, y una sugerencia distinta —pedido de acceso a información pública
a la AIN, o contacto directo con un socio— para la próxima vez).

---

**REGLA 3 (sesión 2026-09-13, decisión de Guido al sumar el primer deporte que no es fútbol)**:
las carpetas siguen ordenadas por PAÍS, no por deporte. El deporte va declarado adentro del archivo
de cada club (primera línea, `- **Deporte**:`) y, cuando no es fútbol, también en su línea del
índice de su país (`fuentes/_indice/<País>.md`). Si algún día dos clubes del mismo país comparten nombre en deportes distintos, se desambigua
en el nombre del archivo. Se eligió así para no migrar los 41 clubes de fútbol ya cargados y no tocar
los paths que ya citan docs y skills.

---

**REGLA 4 (sesión 2026-09-20)**: el detalle línea-por-club NO vive más en este archivo, vive en
`fuentes/_indice/<País>.md`, uno por país. Acá quedó solo el índice de países. Es el mismo split
que en la sesión 2026-09-13 movió el detalle de cada club a `fuentes/<País>/<Club>.md`, un nivel
más arriba: el índice también crecía linealmente con cada sesión de sourcing (570 líneas, ~97 KB
cuando se partió). El motivo no es solo el tamaño: con un archivo por país, dos sesiones o dos
agentes trabajando países DISTINTOS al mismo tiempo no comparten ningún archivo, así que no
pueden pisarse ni generar un conflicto de merge (pasó de verdad, con dos agentes en paralelo
sobre el archivo único). **Al sourcear un país, editá `fuentes/_indice/<País>.md`** — y actualizá
la línea de ese país acá solo si cambió alguno de sus números.

---

## Índice de países

Un archivo por país en `fuentes/_indice/<País>.md`, con una línea por club. Hoy: **44 países,
530 clubes trackeados, 339 con documento encontrado.**

"Con documento" = existe al menos un documento financiero identificado y accesible con cifras de
ese club — propio, o un agregado de liga con desglose club por club, como la DNCG francesa —
aunque todavía no esté cargado al sitio. No cuenta un documento confirmado pero inaccesible
(pago, captcha, 403), ni un agregado que solo publica el total de la liga.

- [Alemania](fuentes/_indice/Alemania.md) — 18 clubes, 11 con documento — Chequeo más antiguo: 2026-09-17
- [Arabia Saudita](<fuentes/_indice/Arabia Saudita.md>) — sin clubes trackeados individualmente, ver el detalle
- [Argentina](fuentes/_indice/Argentina.md) — 66 clubes, 15 con documento — Chequeo más antiguo: 2026-09-12
- [Austria](fuentes/_indice/Austria.md) — 12 clubes, 1 con documento — Chequeo más antiguo: 2026-09-17
- [Bélgica](fuentes/_indice/Bélgica.md) — 16 clubes, 16 con documento — Chequeo más antiguo: 2026-09-17
- [Bolivia](fuentes/_indice/Bolivia.md) — 3 clubes, 0 con documento — Chequeo más antiguo: 2026-09-12
- [Brasil](fuentes/_indice/Brasil.md) — 28 clubes, 28 con documento — Chequeo más antiguo: 2026-09-12
- [Chile](fuentes/_indice/Chile.md) — 16 clubes, 5 con documento — Chequeo más antiguo: 2026-09-12
- [China](fuentes/_indice/China.md) — 17 clubes, 1 con documento — Chequeo más antiguo: 2026-09-17
- [Colombia](fuentes/_indice/Colombia.md) — 10 clubes, 10 con documento — Chequeo más antiguo: 2026-09-12
- [Corea del Sur](<fuentes/_indice/Corea del Sur.md>) — 12 clubes, 4 con documento — Chequeo más antiguo: 2026-09-17
- [Costa Rica](<fuentes/_indice/Costa Rica.md>) — 3 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Croacia](fuentes/_indice/Croacia.md) — 10 clubes, 9 con documento — Chequeo más antiguo: 2026-09-17
- [Dinamarca](fuentes/_indice/Dinamarca.md) — 12 clubes, 12 con documento — Chequeo más antiguo: 2026-09-17
- [Ecuador](fuentes/_indice/Ecuador.md) — 13 clubes, 2 con documento — Chequeo más antiguo: 2026-09-13
- [Egipto](fuentes/_indice/Egipto.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Escocia](fuentes/_indice/Escocia.md) — 1 club, 1 con documento — Chequeo más antiguo: 2026-09-13
- [España](fuentes/_indice/España.md) — 20 clubes, 19 con documento — Chequeo más antiguo: 2026-09-13
- [Estados Unidos](<fuentes/_indice/Estados Unidos.md>) — 4 clubes, 3 con documento — Chequeo más antiguo: 2026-09-13
- [Francia](fuentes/_indice/Francia.md) — 18 clubes, 18 con documento — Chequeo más antiguo: 2026-09-17
- [Grecia](fuentes/_indice/Grecia.md) — 14 clubes, 14 con documento — Chequeo más antiguo: 2026-09-17
- [Guatemala](fuentes/_indice/Guatemala.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Honduras](fuentes/_indice/Honduras.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Inglaterra](fuentes/_indice/Inglaterra.md) — 33 clubes, 33 con documento — Chequeo más antiguo: 2026-09-13
- [Italia](fuentes/_indice/Italia.md) — 20 clubes, 16 con documento — Chequeo más antiguo: 2026-09-17
- [Jamaica](fuentes/_indice/Jamaica.md) — 1 club, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Japón](fuentes/_indice/Japón.md) — 10 clubes, 10 con documento — Chequeo más antiguo: 2026-09-13
- [Marruecos](fuentes/_indice/Marruecos.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [México](fuentes/_indice/México.md) — 2 clubes, 1 con documento — Chequeo más antiguo: 2026-09-13
- [Nigeria](fuentes/_indice/Nigeria.md) — sin clubes trackeados individualmente, ver el detalle
- [Noruega](fuentes/_indice/Noruega.md) — 16 clubes, 16 con documento — Chequeo más antiguo: 2026-09-17
- [Países Bajos](<fuentes/_indice/Países Bajos.md>) — 18 clubes, 18 con documento — Chequeo más antiguo: 2026-09-17
- [Panamá](fuentes/_indice/Panamá.md) — 1 club, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Paraguay](fuentes/_indice/Paraguay.md) — 3 clubes, 0 con documento — Chequeo más antiguo: 2026-09-12
- [Perú](fuentes/_indice/Perú.md) — 15 clubes, 1 con documento — Chequeo más antiguo: 2026-09-12
- [Portugal](fuentes/_indice/Portugal.md) — 18 clubes, 17 con documento — Chequeo más antiguo: 2026-09-17
- [República Checa](<fuentes/_indice/República Checa.md>) — 16 clubes, 16 con documento — Chequeo más antiguo: 2026-09-17
- [Rusia](fuentes/_indice/Rusia.md) — 16 clubes, 16 con documento — Chequeo más antiguo: 2026-09-18
- [Sudáfrica](fuentes/_indice/Sudáfrica.md) — 10 clubes, 0 con documento — Chequeo más antiguo: 2026-09-13
- [Suiza](fuentes/_indice/Suiza.md) — 12 clubes, 5 con documento — Chequeo más antiguo: 2026-09-17
- [Turquía](fuentes/_indice/Turquía.md) — 18 clubes, 10 con documento — Chequeo más antiguo: 2026-09-18
- [Ucrania](fuentes/_indice/Ucrania.md) — 16 clubes, 11 con documento — Chequeo más antiguo: 2026-09-18
- [Uruguay](fuentes/_indice/Uruguay.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-12
- [Venezuela](fuentes/_indice/Venezuela.md) — 2 clubes, 0 con documento — Chequeo más antiguo: 2026-09-12

---

### Nota técnica para cuando yo (Claude) proceso esto

Cada fuente que cargo al sitio queda registrada en `data/clubs.js` con estos
datos: de qué club es, qué tipo de documento es (presupuesto oficial, balance
oficial, cobertura de prensa, o placeholder), y qué tan confiable es. Esto es
lo que le permite al sitio mostrar avisos tipo "dato real" vs. "dato de
prensa, no oficial" vs. "placeholder, no es real todavía" en cada sección,
en vez de que quede solo en un comentario que nadie lee.
