# ESTADO — finance-of-sports

**Qué hay armado hoy.** Este archivo es el snapshot del proyecto: qué existe, cómo
está organizado, y qué hay cargado de cada club. No es un log: si algo que dice acá
deja de ser cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.

**Lo que NO está acá:**

- **Qué falta hacer** -> `Admin/TODO.md`.
- **Qué cambió y cuándo** -> `Admin/CHANGELOG.md`.
- **Por qué se decidió algo** -> `Admin/finance-of-sports-project.md`.
- **Reglas vigentes y trampas ya encontradas** -> `Admin/CONVENCIONES.md`. Leelo siempre.
- **Cómo funciona cada archivo del motor** -> `Admin/ARQUITECTURA.md`.
- **Cómo se ve cada pantalla del sitio** -> `Admin/PANTALLA.md`. **Cómo está hecho (motor, datos, mapa de archivos)** -> `Admin/ARQUITECTURA.md`.
- **Cuántos hay en cada etapa del pipeline y cuánto cuesta el paso siguiente** -> `node tools/estado.mjs` (gratis).

---

## Objetivo del proyecto

Un sitio de finanzas de clubes de fútbol (multi-club), pensado para hinchas, periodistas y
creadores de contenido. **Todo el sitio es gratis, y por ahora se queda así** (decisión de
Guido: no hay corte free/paid que definir ni paywall que construir). La idea de un plan pago
(analítica avanzada + tweets pre-armados, suscripciones vía dLocal Go) queda como posibilidad,
no como trabajo pendiente. Presupuesto casi cero, sigue siendo un proyecto hobby de Guido: no
gastar en infraestructura que no haga falta todavía.

Nombre del sitio: "El deporte en Números" en castellano y "Finance of Sports" en inglés (clave
`site.name`, ver `data/lang/en.js`). Dominio: **financeofsports.com**. Carpeta y repo:
`finance-of-sports`.

---

## Estado actual

### Pipeline: de un PDF a un año cargado (en `main`)

- El onboarding se hace con el pipeline: `tools/lote.mjs` (etapas 3 a 8, lo corre Guido), `tools/cargar.mjs` (escribe el año en el sitio,
  corre los generadores y `audit.js`, y revierte si algo falla) y `tools/caja-deuda.mjs` (caja y deuda, con el club ya publicado). Lo que no
  se resuelve solo va a la cola humana (`tools/cola.mjs`). Cómo se trabaja: skill `club-or-year-onboarding`; el proceso etapa por etapa y
  las decisiones de Guido: `Admin/PIPELINE.md`; las mejoras medidas y descartadas: `Admin/HALLAZGOS-pipeline.md`. Un dato publicado mal se
  corrige con un ajuste manual (`tools/ajustes.mjs`, escalón 0 de cada escalera) además de en `data/`, para que una corrida futura no lo deshaga.
- Cuántos documentos hay en cada etapa y cuánto cuesta el paso siguiente: `node tools/estado.mjs` (gratis).
- "Posiblemente dentro de otro rubro": una fila en "—" porque el documento no desglosa un renglón la marca `tools/dentro-de-otro.mjs` si el
  club la tiene en todos sus otros balances desglosados; `cargar.mjs --escribir` la aplica solo. La página dice el rubro en un bocadillo
  (`js/info-tip.js`). Para un año sin precedente todavía no hay pregunta en la cola: queda en "—".
- `lote.mjs --ejecutar --cargar` escribe solo lo que queda "listo para cargar" (`tools/cargar-lote.mjs`: alta con el color de
  `Admin/registros/altas-revision.jsonl`, un commit por año, revierte el alta si ningún año entra). `pipeline.mjs --lista/--dir` y `lote.mjs` recalculan
  el registro solo para su lista (inventario `--solo`, mucho más rápido que el inventario entero).
- Rusia NO sale de PDFs: `tools/bfo-rusia.mjs` lee los JSON oficiales del fisco (GIR BO) con el formulario 2 (código → categoría fijo,
  compuerta: la suma da el 2300 impreso) y el formulario 6 en los clubes que reciben aportes (Akhmat, Akron, Dynamo Makhachkala, Pari NN,
  Orenburg). Escalón 2 (`tools/bfo-rusia-notas.mjs`): abre ingresos, otros ingresos/gastos y costos por elemento con las tablas de las
  notas explicativas cuando suman el código del formulario. Qué clubes y años hay: `Admin/ESTADO-clubes.md`. Cómo corre:
  `Admin/PIPELINE.md`, "Rusia (GIR BO)".
- `tools/pipeline.mjs` hace SOLO la etapa 2 (transcribir con Mistral y validar, más el control "sin tablas"). La lista de rubros la arma
  `verificar.mjs` y la categorización es la etapa 7 del lote.
- Perímetro del club por señales (`tools/perimetro-senales.mjs`): antes de la compuerta de la etapa 3, `lote.mjs` fija solo el ajuste
  `perimetro` de un club nuevo cuando sus documentos coinciden (tablas de cada perímetro y voto con Jev); si la serie cambia de perímetro,
  frena y decide Guido. Reconoce títulos en italiano e inglés; en otros idiomas no decide (frena).
- Qué hay cargado de cada club (ejercicios, tipo de documento, moneda, deuda y caja): `Admin/ESTADO-clubes.md`, generado por
  `node tools/generate-club-index.js`. El detalle de cada año (fuente, qué es real y qué no) está en la cabecera de `data/<país>/<club>-data.js`.
- Brasil, Italia y Rusia se cargaron por el pipeline (Rusia por su camino propio); en los documentos italianos viejos quedan ajustes
  manuales donde el script no da idéntico, y dos ejercicios (Lazio 2012-13, AS Roma 2021) llevan el ajuste `no-recargar` porque lo publicado
  es más detallado que lo que lee el script. Un ejercicio de menos de 12 meses no se carga: queda en `Admin/registros/documentos-parciales.txt` con el
  tramo que falta. Los ejercicios de Lazio en liras (ITL) llevan su tipo de cambio de cierre y la paridad fija a euro para mostrarse en EUR.
  La etiqueta y la gestión de cada ejercicio salen de su propio cierre, aunque el club haya cambiado la fecha de cierre. Un documento que no
  es del dominio (un artículo de prensa) va a `Admin/registros/documentos-descartados.txt`. Sin transcribir: rugby, tenis y entes italianos; ver
  `Admin/sourcing/Italia/_notas-generales.md`. Las federaciones entran al sitio.

### Finanzas multi-año

- Finanzas muestra varios ejercicios a la vez: el título es el club; cards de ejercicios (default, los últimos 5 con balance) y
  fila de gestión; KPIs con comparación y sparkline; gráfico de evolución arriba de la tabla; Estado de resultados y Deuda con una
  columna por año (rubro desplegable, % del total, presupuesto al lado del balance); valores ajustados por inflación (deflactor del
  PBI, USD y EUR); fuentes por ejercicio; card "otra liga" con el puesto. `?multi=0` vuelve a la vista de un año (salida de
  emergencia). Cómo está hecho y qué no romper: `Admin/PANTALLA.md`, "Finanzas multi-año". Mockup aprobado:
  `Prototyping/Finanzas/mockup-147.html`.
- Datos que se mantienen a mano una vez por año: `data/deflactores.js` (se genera con
  `node tools/fetch-fx-reference.mjs --deflactores`) y `data/gestiones/<país>.js` (los presidentes de cada club; un año nuevo
  sin presidente que lo cubra abre un caso `gestion` en la cola al cargarlo).

### Comparar con el diseño de Finanzas

- Comparar se lee como Finanzas: los dos cards de lado son el título, con los chips de ejercicio de Finanzas (un club puede elegir
  varios ejercicios, cada lado con "Promedio | Suma"); sin botón, el resultado se arma solo con los dos lados llenos; barra con
  formato fijo y "Valores ajustados por inflación" (serie USD, propia de Comparar); un solo gráfico con A y B en el mismo eje de
  años; tabla con las filas de Finanzas (A, B, B / A, % del total, rubro desplegable); avisos de cada lado en su card y fuentes por
  ejercicio. Sin USD / ARS en el header en esta pestaña. Cómo está hecho: `Admin/PANTALLA.md`, "Comparar con el diseño de
  Finanzas". Mockup: `Prototyping/Comparar/mockup-23.html`.

### Techo del modelo (no es una tarea)

- La taxonomía es de fútbol (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Pases/Resultados/Títulos y
  `gestionesByClub` también. Un club de otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

### Sitio, publicación y analytics

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin build step, servido desde la raíz. Deploy continuo en
  Netlify al pushear a `main` del repo de GitHub. Dominio propio: **financeofsports.com**.
- QUÉ SE PUBLICA: Netlify publica la raíz, pero `netlify.toml` borra del artefacto de deploy lo interno (`Admin/`, con las notas de
  sourcing de `Admin/sourcing/`; `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/` y `Generados/`); todo se trackea, así que el respaldo en GitHub es completo. Se publican
  las páginas `fuentes/<clubId>.html`, `data/`, `js/` y las transcripciones `Clubes/**/*.md`: estas últimas se publican A PROPÓSITO (decisión
  de Guido; `netlify.toml` no las borra). Los PDFs no se trackean (`.gitignore`). Un documento interno nuevo va adentro de `Admin/`;
  `node tools/audit.js` caza el que quede suelto en la raíz (`doc-interno-no-excluido`).
  Los comentarios de `index.html` y `js/` también viajan al visitante: solo el porqué técnico, sin historia interna (regla en
  `Admin/PANTALLA.md`, chequeo `comentario-interno-publicado`). `data/` tampoco lleva comentarios internos ni `note`: la evidencia de
  cada carga vive en `Admin/carga-clubes/<club>.md` (la escriben los scripts del pipeline vía `tools/evidencia-club.mjs`; regla en
  `Admin/CONVENCIONES-DATOS.md`), y las de ligas, gestiones y cotizaciones en `Admin/ligas-por-pais/`, `Admin/gestiones-por-pais/` y
  `Admin/fx-cotizaciones.md` (chequeos `comentario-interno-publicado` y `comentario-en-data-club`).
- ANALYTICS: Cloudflare Web Analytics (snippet en el `<head>` de `index.html`): visitas, pageviews, referrers y país, sin cookies ni banner
  de consentimiento. Además, un Worker + KV propios (`square-sky-ca25.guidomamone91.workers.dev` → KV namespace `FOS_LOGS`, cuenta de
  Cloudflare de Guido, free tier) loggean texto libre que Web Analytics no puede: qué se tipea en el buscador (con o sin resultado) y qué par
  de clubes se elige en Comparar. Se lee directo del dashboard de Cloudflare (KV Pairs), sin reporte propio. Mixpanel (proyecto "Finance of
  sports", free tier) cubre el FUNNEL del selector, paso a paso, desde que se abre hasta que se elige un club (`selector_opened` /
  `selector_step_completed` / `selector_club_chosen`, instrumentados a mano en `js/selector.js`, nunca Autocapture). `track_pageview:false` a
  propósito, para no duplicar lo que ya da Cloudflare. El Worker y Mixpanel están GATEADOS por hostname en `js/selector.js`: solo mandan datos
  si `location.hostname === 'financeofsports.com'`, así que probar el sitio en preview local no ensucia esas cuentas.
- Un solo motor genérico calcula Finanzas para todos los clubes (ver `Admin/ARQUITECTURA.md`); ningún club tiene motor propio. Los clubes
  nuevos nacen con el país en el `clubId` (ej. `corinthians-br`, `millonarios-co`); `tools/audit.js` lo chequea (`clubid-sin-pais`).
- DATOS: cuántos clubes, de qué países y qué ejercicios tiene cada uno: `Admin/ESTADO-clubes.md` (generado). Solo cuentan los clubes
  con al menos un ejercicio REAL (balance o presupuesto oficial).

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición.
`verifyTieOuts()` automatiza esto para los club-ejercicios que tienen un total
conocido: mirá la consola del navegador al cargar el sitio. Este sitio es para
uso público de hinchas y periodistas reales: la precisión importa más que la
velocidad acá.
