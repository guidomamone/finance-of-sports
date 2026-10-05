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

---

## Objetivo del proyecto

Arrancó como un sitio solo para hinchas de Boca antes de una elección de
presidente. Ahora es más ambicioso: un sitio de finanzas de clubes de fútbol
en general (multi-club), pensado para periodistas y creadores de contenido.
**Todo el sitio es gratis, y por ahora se queda así** (decisión de Guido,
2026-09-14: no hay corte free/paid que definir ni paywall que construir; los
dos puntos que había en la to-do se sacaron). La idea de un plan pago
(analítica avanzada + tweets pre-armados, suscripciones vía dLocal Go) queda
como posibilidad, no como trabajo pendiente. Presupuesto casi cero,
sigue siendo un proyecto hobby de Guido, no gastar en infraestructura que
no haga falta todavía. Nombre del sitio: "El deporte en Números" en castellano y
"Finance of Sports" en inglés (clave `site.name`, ver data/lang/en.js). Historia
del nombre: "Boca en Números" -> "Tu club en números" (Versión 12) -> "El deporte
en Números" (Versión 117, pedido de Guido). Cada rename fue solo de branding: el
<title>, el logo del header y el asunto del mail de contacto. DESDE 2026-09-13 el
dominio es **financeofsports.com** y la carpeta/repo se llama
`finance-of-sports`.

---

## Estado actual

### Pipeline: de un PDF a un año cargado (en `main`)

- El onboarding se hace con el pipeline: `tools/lote.mjs` (etapas 3 a 8, lo corre Guido), `tools/cargar.mjs` (escribe el año en el sitio,
  corre los generadores y `audit.js`, y revierte si algo falla) y `tools/caja-deuda.mjs` (caja y deuda, con el club ya publicado). Lo que no
  se resuelve solo va a la cola humana (`tools/cola.mjs`). Cómo se trabaja: skill `club-or-year-onboarding`; el proceso etapa por etapa y
  las decisiones de Guido: `Admin/PIPELINE.md`; los pendientes: to-dos 139 a 142 y 145. Un dato publicado mal se corrige con un ajuste manual
  (`tools/ajustes.mjs`, escalón 0 de cada escalera) además de en `data/`, para que una corrida futura no lo deshaga.
- "Posiblemente dentro de otro rubro": una fila en "—" porque el documento no desglosa un renglón la marca `tools/dentro-de-otro.mjs` si el
  club la tiene en todos sus otros balances desglosados (hoy 70 filas en 16 años de 7 clubes); `cargar.mjs --escribir` la aplica solo. La
  página dice el rubro en un bocadillo (`js/info-tip.js`). Falta la pregunta de la cola para años sin precedente (to-do 140(i), paso 4).
- Clubes cargados enteros por el pipeline: UC, Fortaleza CEIF, Goiás, Novorizontino, AEL Larissa (2016-2025) y Juventus (2003-2025,
  estados separados; caja y deuda en parte cargadas a mano).
- `tools/pipeline.mjs` hace la etapa 2 (transcribir con Mistral y validar), corrido con `--sin-jev`. Su categorización (Jev y Claude)
  es la del proceso viejo y no se usa: la reemplaza la etapa 7 del lote; retirar esa parte es el to-do 142c. No re-preparar con él
  documentos que pasaron por el lote.
- Inventario (`node tools/inventario-transcripciones.mjs`, gratis; registro en `Admin/transcripciones-estado.jsonl`): 6.825 PDFs, 517
  cargados, 4.550 sin `.md`, 663 con la transcripción validada esperando localizar, y el resto en la validación de la etapa 2.

Esto es el ESTADO, no el historial. Si buscás "¿cuándo se hizo tal cosa?" o "¿por
qué se decidió tal cosa?", NO está acá: está en `Admin/CHANGELOG.md` (resumen por
versión, 96 versiones) y en `Admin/finance-of-sports-project.md` (narrativa completa). Este bloque
se reescribe, no se acumula.

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin
  build step, servido desde la raíz. Deploy continuo en Netlify al pushear a
  `main` del repo de GitHub. Dominio propio desde 2026-09-13:
  **financeofsports.com** (ver to-do 7: falta renombrar el repo en GitHub y
  re-linkearlo en Netlify, eso lo tiene que hacer Guido).
- ANALYTICS: Cloudflare Web Analytics desde la Versión 166 (snippet en el `<head>`
  de `index.html`) — visitas, pageviews, referrers y país, sin cookies ni banner de
  consentimiento. Desde la Versión 216, además, un Worker + KV propios
  (`square-sky-ca25.guidomamone91.workers.dev` → KV namespace `FOS_LOGS`, cuenta de
  Cloudflare de Guido, free tier) loggean texto libre que Web Analytics no puede: qué
  se tipea en el buscador (con o sin resultado) y qué par de clubes se elige en
  Comparar. Se lee directo del dashboard de Cloudflare (KV Pairs), sin reporte propio.
  Desde la Versión 277 (to-do 67), Mixpanel (proyecto "Finance of sports", free tier)
  cubre lo que ninguno de los dos anteriores mide: el FUNNEL del selector, paso a paso,
  desde que se abre hasta que se elige un club (`selector_opened` /
  `selector_step_completed` / `selector_club_chosen`, instrumentados a mano en
  `js/selector.js`, nunca Autocapture). `track_pageview:false` a propósito, para no
  duplicar lo que ya da Cloudflare. **Pendiente de verificar con tráfico real tras el
  push** — ver to-do 67. Los 3 sistemas están GATEADOS por hostname en `js/selector.js`:
  solo mandan datos si `location.hostname === 'financeofsports.com'`, así que probar el
  sitio en preview local no ensucia ninguna de las tres cuentas.
- DATOS: 162 clubes cargados con al menos un ejercicio REAL (balance o presupuesto
  oficial), de 14 países: Argentina 19, España 19, Japón 10, Brasil 32, Colombia 10,
  Alemania 11, Inglaterra 19, México 1, Chile 3, Perú 1, Países Bajos 4, Croacia 8,
  Bélgica 14, Dinamarca 11. La Versión 227 (2026-09-25) siguió el mismo pedido de Guido
  ("20 más") con una 2da tanda: esta vez los 20 candidatos salieron de PAÍSES YA CARGADOS
  (Bélgica/Dinamarca/Croacia) con series históricas completas ya transcriptas y sin cargar
  — 15 clubes nuevos (Standard Liège, Union Saint-Gilloise, Westerlo, Zulte Waregem,
  Sint-Truiden, Cercle Brugge, Dender EH — Bélgica; FC Fredericia, FC Nordsjælland,
  Randers FC, Vejle, SønderjyskE — Dinamarca; Istra 1961, Varaždin, Gorica — Croacia) más
  7 ejercicios nuevos de 4 clubes ya cargados (Los Andes 2019/20, RB Leipzig 2021/22,
  Bayern Munich 2022/23, Botafogo(Río) 2023+2025, Cruzeiro 2022+2023). SIN dead-ends esta
  vez (los 20 cerraron los 20, con 2 P0 reales encontrados y corregidos en la integración —
  detalle en `Admin/CHANGELOG.md`). La Versión 226 (mismo día) onboardeó 20 transcripts ya hechos y
  sin cargar, elegidos SIN prioridad de país (pedido de Guido: "20 transcripts que no hayan
  sido onboardeados, no me importa un orden específico"), en 5 agentes paralelos + 1 de
  reemplazo: 15 clubes NUEVOS (Osijek, Slaven Belupo — Croacia; AGF, Silkeborg IF, Viborg
  FF — Dinamarca; Charleroi, Mechelen, Antwerp — Bélgica; Ceará, Sport Recife, Amazonas,
  Juventude, Botafogo-SP — Brasil, este último distinto del Botafogo de Río ya cargado;
  Godoy Cruz, Los Andes — Argentina) más 5 ejercicios nuevos de clubes ya cargados
  (Cruzeiro 2024, Coritiba 2023, Chapecoense 2017, Bayern Munich 2020/21, RB Leipzig
  2022/23). De los 20 candidatos elegidos al azar, 3 resultaron dead-ends sin estados
  contables reales (Temperley y Belgrano: solo "Memoria" narrativa institucional, sin
  Estado de Recursos y Gastos; Palestino: solo un estado financiero intermedio de 6 meses,
  sin P&L del ejercicio anual 2018) y se reemplazaron por Botafogo-SP/Juventude/Amazonas —
  el detalle completo, club por club, está en `Admin/CHANGELOG.md`. 69 de los 131 clubes
  previos se habían sumado en 8 sesiones de onboarding en paralelo de PDF transcriptos
  pendientes (Versiones 217, 219, 220, 221, 222, 223, 224 y 225, 2026-09-24/25), el detalle
  club por club de cada tanda está en `Admin/CHANGELOG.md` (no se repite acá para que esta
  sección no crezca sin límite). La Versión 225, con Sudamérica/España/Inglaterra ya
  agotados, abrió 3 países europeos más
  a pedido de Guido ("de donde sea"): Croacia (Dinamo Zagreb/Hajduk Split/Rijeka, ejercicio
  2024, ya en euros), Bélgica (Club Brugge/Anderlecht/Genk/Gent) y Dinamarca (FC København/
  Brøndby/FC Midtjylland, DKK moneda nueva). La Versión 224 agotó Sudamérica/España/Inglaterra
  y siguió en Europa continental: Países Bajos país nuevo (Ajax, PSV, Feyenoord, AZ —
  las transcripciones no existían todavía, se generaron en la misma sesión vía
  `pdftotext`, ver el comentario de esa versión en `Admin/CHANGELOG.md`) y 6 clubes
  alemanes grandes más (Bayern Munich, Borussia Dortmund, RB Leipzig, TSG Hoffenheim,
  Hamburger SV, Borussia Mönchengladbach — Alemania ya estaba cargada, sin país nuevo).
  La Versión 223 fue casi toda Inglaterra (14 clubes nuevos: Aston
  Villa, Bournemouth, Brentford, Brighton, Burnley, Chelsea, Crystal Palace, Fulham,
  Leeds United, Newcastle United, Nottingham Forest, Sunderland, West Ham, Wolves) más
  Levante UD (España) — ningún país nuevo, Inglaterra y España ya estaban cargados.
  Chile y Perú son países nuevos desde la Versión 222 (Colo-Colo, Universidad de Chile,
  Universidad Católica y Alianza Lima) — Ecuador se evaluó en la misma sesión y se
  descartó a propósito, ningún documento disponible llega al estándar de calidad (ver
  `Admin/dudas-por-club.md`). Desde la Versión 217 los clubes nuevos nacen con el país
  en el `clubId` (ej. `americamineiro-br`, `corinthians-br`, `millonarios-co`),
  convención de la Versión 129 que hasta ahí no se venía aplicando a los clubes que se
  agregaban (`tools/audit.js` lo empezó a chequear recién en la Versión 217,
  `clubid-sin-pais`). Rosario Central e Independiente, ya cargados, sumaron un 2do
  ejercicio cada uno (2024-25 y N°122/2025-26 respectivamente, Versión 209) — con esto
  se cierra el to-do 58 completo (los 6 ejercicios que el barrido del 2026-09-22
  encontró y descargó). Alemania e Inglaterra son países nuevos desde la Versión 201
  (sesión 2026-09-22, GBP moneda nueva). Un solo motor genérico calcula Finanzas para
  todos (ver `Admin/ARQUITECTURA.md`); no queda ningún club con motor propio desde la
  Versión 102.
  El detalle club por club (qué ejercicio, qué fuente, qué es real y qué no) está
  más abajo en "QUÉ ES REAL POR CLUB", y con más detalle
  todavía en el comentario de cabecera de cada `data/<club>-data.js`.
---

---

**QUÉ ES REAL POR CLUB** → se movió a `Admin/ESTADO-clubes.md` (Versión 239, to-do 63: este
bloque pesaba 12,35 KB de los 55,98 KB de este archivo, cerca del umbral de 60 KB de
`tools/audit.js` — mismo mecanismo que sacó la to-do list de `index.html` en la Versión 138).
Generado por `node tools/generate-club-index.js`, igual que antes.

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición. Ya
pasó una vez (con Boca) que un redondeo de conversión de moneda hizo que el
total no cerrara; Guido lo notó enseguida. verifyTieOuts() automatiza esto
para los club-ejercicios que tienen un total conocido, mirá la consola del
navegador al cargar el sitio. Este archivo es para uso público de hinchas y
periodistas reales: la precisión importa más que la velocidad acá.
