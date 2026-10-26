# Unión Magdalena (Unión Magdalena S.A., Santa Marta)

**Página del canal**: https://siis.ia.supersociedades.gov.co/ (registro de Supersociedades, por NIT 891700992; se arma con JavaScript, pero por debajo es una API JSON: `_notas-generales.md`, "SIIS ya NO necesita browser"). El club no publica en su sitio.

**Ángulos**: sitio oficial: no intentado esta sesión · regulador/país: agotado (SIIS API, serie completa bajada) · Wayback CDX: no aplica · búsqueda web: no aplica · barrido: 2 (Sonnet) — 2026-10-03

- **Club nuevo de la sesión 2026-09-22, pero el más pobre de los 7 nuevos: un solo ejercicio con PDF
  real (2018).** Vía SIIS (Supersociedades), NIT **891700992**, punto de entrada
  "Pymes-Individuales", Santa Marta (Magdalena), estado "INSPECCION". Se bajaron las "NOTAS EF" (44
  páginas) y la "CERTIFICACION EF"; no hay dictamen del revisor fiscal para ese año.
- **Los huecos están verificados uno por uno y son reales, no falta de búsqueda.** SIIS tiene los
  cortes 2016, 2017, 2019 y 2020 para este NIT, y el endpoint de documentos devuelve la lista
  **vacía** para los cuatro — o sea que la sociedad reportó las cifras del formulario pero nunca
  adjuntó el paquete de estados financieros. Es la diferencia entre "no publicó" y "no encontramos":
  acá es lo primero.
- **En el índice conviven dos grafías de la razón social bajo el mismo NIT** (`UNION MAGDALENA S.A`,
  `UNION MAGDALENA SA` y hasta `UNION MAGDALENA S,.A.` con una coma de más) — son la misma entidad,
  no hay homónimos. Buscar por NIT.
- Cifras del ejercicio 2025 según la vista de SIIS (miles de COP): activos 5.254.040, ingresos
  11.396.578, **pérdida de 2.371.880** — ROA -45,14%. **El ROE que informa SIIS es +518,68% con
  pérdida**, lo que implica patrimonio negativo (mismo caso que Llaneros, al revés de signo).
  Verificarlo en el balance antes de publicar indicadores.
- Ángulo que queda pendiente: el club no tiene sección de transparencia en su sitio, así que la única
  vía para los ejercicios sin documento sería pedírselos directo. Dado que SIIS confirma que la
  sociedad sí presentó el formulario esos años, la pregunta al club sería por el paquete completo.
- **`Clubes/Colombia/Union Magdalena/dictamen-revisor-fiscal-2021.pdf` está roto** (encontrado en la
  sesión de transcripción del 2026-09-24, Versión 214): no es un PDF, es una página HTML de "The URL
  you requested has been blocked" guardada con extensión `.pdf` — una descarga fallida de una sesión
  anterior no documentada acá (esta nota no menciona ningún intento de 2021). Hay que volver a
  descargarlo desde el origen real, no transcribirlo tal cual está.
- **Ejercicio 2018 CARGADO al sitio (`data/unionmagdalena-data.js`), sesión 2026-09-24.**
  `estados-financieros-2018.md` (texto nativo, trae el Estado de Situación Financiera y el Estado de
  Resultado Integral primarios completos) + `certificacion-ef-2018.md` (OCR, solo firmantes, sin
  total propio) — tie-out exacto contra el "Utilidad del Ejercicio" impreso ($285,742 M COP), sin
  ningún residuo. El ejercicio 2021 (dictamen del revisor fiscal) sigue SOURCEADO pero SIN
  transcribir ni cargar — queda pendiente para una sesión futura, y el PDF roto de arriba es
  justamente ese documento, hay que re-descargarlo antes de poder transcribirlo.
- **Color de marca: `null` (ambigüedad genuina, no chequeada a medias)** — verificado 2026-09-24.
  Apodo "Ciclón Bananero"/"Los Samarios". Infobox de es.wikipedia.org/wiki/Unión_Magdalena declara
  "Azul, Blanco y Rojo" (tricolor, inspirado en la bandera del Magdalena); la camiseta titular es
  roja con rayas verticales azules (inspirada en San Lorenzo de Almagro), la alternativa es azul, la
  suplente blanca — ningún color domina con claridad sobre los otros dos, y a diferencia de San
  Lorenzo (que se desempató con su propio `theme-color`), el sitio oficial (unionmagdalena.com.co) no
  devolvió `theme-color` ni contenido utilizable. Sin una fuente que ordene o marque predominancia,
  `brandColor:null` (Sección 3 de `club-or-year-onboarding/SKILL.md`: "si el color que lo identifica
  es ambiguo, `null`, que es un resultado cerrado, no un pendiente").
- Contacto: siis.ia.supersociedades.gov.co (NIT 891700992); unionmagdalena.com.co.
- Último chequeo: 2026-09-24.

## 2026-10-21: el dictamen 2021 de SIIS NO se puede bajar (el servidor bloquea la URL), y qué se hizo con el archivo roto

- El ejercicio 2021 (corte 2021-12-31, radicado `2022-01-371753`) tiene en `documentos-adicionales` tres documentos: «CERTIFICACION EF» (2022-01-433905), «NOTAS EF» (2022-01-433962) y «DICTAMEN DEL REVISOR FISCAL» (2022-01-433940, token `qQH7z0RXvPLQiFstIk5h0Q%3D%3D`). El flujo de la skill (visor → subvisor → `tmp/`) llega hasta la ruta, pero **el nombre del archivo del dictamen es `1%%7p601!.PDF`**: tiene un `%%` literal, y el servidor (`servicios.supersociedades.gov.co`) responde **500 con la página «The URL you requested has been blocked»** (38.712 bytes, la misma que había en el `.pdf` roto) a todas las formas de pedirlo: sin codificar, `%25%25`, con `!` codificado, en `tmp/` y en `cache-baranda/`, con `curl` y con `fetch` desde el propio visor en el Browser pane (el iframe del visor tiene el mismo problema). La doble codificación da 404: el archivo existe pero no hay URL válida que llegue a él. Es un bloqueo del servidor por el nombre, no throttling ni sesión.
- El `.pdf` roto no era un PDF: se renombró a `dictamen-revisor-fiscal-2021-pagina-html.html` (no se borró). No hay un `dictamen-revisor-fiscal-2021.pdf` real.
- Queda: pedirle el dictamen 2021 a la Supersociedades (o al club; no tiene sección de transparencia) o esperar que corrijan el archivo. Los otros dos documentos del 2021 (certificación y notas EF) no se probaron: el estado financiero 2021 en sí tampoco está en `Clubes/` (ver el barrido de abajo: «2021 no baja»).

## Barrido 2026-10-03 (completar a 5 ejercicios, SIIS por API)

- NIT 891700992, 9 registros en SIIS; 2021 (régimen Pymes) no baja: el subvisor no devuelve ruta de PDF.
- Bajado a `Clubes/Colombia/Union Magdalena/`: estados-financieros 2022-2025 (+certificación y dictamen), con el 2018 ya existente = 5 ejercicios. Total en disco: 5 ejercicios con estados-financieros.
- Ninguno transcripto ni cargado todavía.

## Barrido 2026-10-08 (año de sourcing 2023)

**Ángulos**: regulador/país (SIIS): agotado — se bajaron todos los ejercicios con documentos (API; ver `_notas-generales.md`) · barrido: 2 (Sonnet) — 2026-10-08

Estados financieros en disco ahora: 5 ejercicios (2018, 2022-2025), cada uno con certificación y dictamen del revisor fiscal cuando SIIS los tiene. Los años que faltan son registros de SIIS sin documentos depositados.

- Cargado en el sitio por tools/cargar.mjs (2026-10-20): ejercicio 2025 desde `Clubes/Colombia/Union Magdalena/estados-financieros-2025.pdf` (sourceId `unionmagdalena-co-estados-financieros-2025`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-26): ejercicio 2016 desde `Clubes/Colombia/Union Magdalena/siis-estado-2016.pdf` (sourceId `unionmagdalena-co-siis-estado-2016`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-26): ejercicio 2017 desde `Clubes/Colombia/Union Magdalena/siis-estado-2017.pdf` (sourceId `unionmagdalena-co-siis-estado-2017`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-26): ejercicio 2019 desde `Clubes/Colombia/Union Magdalena/siis-estado-2019.pdf` (sourceId `unionmagdalena-co-siis-estado-2019`).

- Cargado en el sitio por tools/cargar.mjs (2026-10-26): ejercicio 2020 desde `Clubes/Colombia/Union Magdalena/siis-estado-2020.pdf` (sourceId `unionmagdalena-co-siis-estado-2020`).
