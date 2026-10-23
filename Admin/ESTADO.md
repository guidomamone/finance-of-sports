<!-- md: qué hay armado hoy (snapshot del proyecto) | leer: siempre, al arrancar una sesión -->
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
creadores de contenido. **Todo el sitio es gratis. Licencia (decisión de Guido): el Formato simplificado bajo CC BY-NC 4.0 (libre citando,
también en medios con publicidad); el uso comercial, la reventa, la descarga masiva u otra API necesitan licencia aparte; la API, si se
hace, es paga para todos. Los documentos de los clubes no llevan la licencia del sitio, lo de Wikipedia va con CC BY-SA 4.0 y el código
tiene todos los derechos reservados (`terminos.html`; fuentes y términos en `Admin/fuentes-externas.md`). Presupuesto casi cero, sigue
siendo un proyecto hobby de Guido: no gastar en infraestructura que no haga falta todavía.

Nombre del sitio: "El deporte en Números" en castellano y "Finance of Sports" en inglés (clave
`site.name`, ver `data/lang/en.js`). Dominio: **financeofsports.com**. Carpeta y repo:
`finance-of-sports`.

---

## Estado actual

### Pipeline: de un PDF a un año cargado

- Tools: `lote.mjs` (etapas 3 a 8, en segundo plano), `pipeline.mjs` (solo la etapa 2: transcribir con Mistral y validar), `cargar.mjs` (escribe el
  año, corre los generadores y `audit.js`, y revierte si algo falla; `lote.mjs --ejecutar --cargar` escribe lo que queda listo, con un commit por
  año), `caja-deuda.mjs` (caja, deuda y, con `--personal`, el costo de personal) y `cola.mjs` (lo que no se resuelve solo). Proceso etapa por
  etapa: `Admin/PIPELINE.md`; descartes medidos: `Admin/HALLAZGOS-pipeline.md`; cuántos documentos hay en cada etapa y cuánto cuesta el paso
  siguiente: `node tools/estado.mjs` (gratis). Un dato publicado mal se corrige con un ajuste manual (`tools/ajustes.mjs`) además de en `data/`,
  para que una corrida futura no lo deshaga.
- La cola la contesta un subagente Sonnet con cita del documento y del criterio de `club-data-mapping`; a Guido va solo lo que frena un alta o un
  año, y lo que solo el club sabe va a `Admin/dudas-por-club.md`. Un club nuevo entra al lote con un solo ejercicio; sus otros años van después
  de contestar su cola, para que las respuestas del primero sirvan de precedente.
- Lo que se decide solo: el primer año de un club (con lo impreso o con una pregunta a Claude, `primer-anio-ia.mjs`), el perímetro
  (`perimetro-senales.mjs`), el rubro probable de una fila en «—» (`dentro-de-otro.mjs`), las gestiones (`gestiones-tanda.mjs`) y la liga de un año
  nuevo (`listas-lote.mjs --lote`). La liga de un año necesita dos fuentes: la segunda es RSSSF (`segunda-fuente-liga.mjs`).
- Sin IA cuando el documento viene estructurado: Rusia sale del fisco (`bfo-rusia.mjs`), Dinamarca y los británicos que presentan en iXBRL, del XHTML
  (`xhtml-aarsrapport.mjs`; `lote.mjs` frena la IA sobre ellos salvo `--pagar-ia-xhtml`; `ixbrl-resultado.mjs` frena el individual si el resultado no
  coincide con el etiquetado) y Bélgica, de los códigos NBB (`nbb.mjs`).
- No se transcriben PDFs nuevos salvo los de las 5 grandes ligas, Brasil y Argentina; el resto se carga si ya tiene `.md`. Los escaneados británicos
  los transcriben subagentes (`Admin/transcripcion-subagentes/README.md`); cargar sin API: `club-or-year-onboarding/carga-con-tokens.md`.
- Una tarea mensual (`ejercicios-nuevos.mjs`) baja los PDF nuevos y los anota en `Admin/sourcing/README.md`. El tablero del pipeline
  (artifact https://claude.ai/artifact/ESc6PC7CUbQ8wV2ETgLVdb) no se actualiza solo: `node tools/tablero.mjs`.
- Para enterarse de que terminó un lote, el comando lleva al final `; osascript -e 'display notification "Terminó el lote" with title "finance-of-sports" sound name "Glass"'`.
- Modo de trabajo: una sola sesión en la carpeta principal y en `main`, un rol por vez, cada uno con su skill (reglas en `CLAUDE.md`,
  «Modo de trabajo»). Esta sesión escribe TODO, CHANGELOG y ESTADO al cerrar cada tarea. El modo de varios worktrees (`tools/worktree.mjs`,
  `Admin/Archive/modo-varias-sesiones.md`) y los roles de `Admin/CONVENCIONES.md` («ONBOARDING CARGA, PIPELINE
  ARREGLA, AUDITORA APRUEBA») siguen escritos, pero hoy no se usan. El gasto por sesión: `node tools/gasto.mjs --sesion <carpeta>`.
- Un punto nuevo del TODO: `node tools/todo.mjs --nuevo --pos <n> --rol "…" --titulo "…"`. Qué va a pedir el commit de lo cambiado (clasificación, medición, veredicto): `node tools/fos.mjs que-pide`. Cerrar una tarea: `node tools/fos.mjs cerrar <id>` (TODO, índice, auditoría, CHANGELOG; no commitea). Lo que una tool no resuelve: `node tools/fos.mjs causas` (registro `Admin/registros/casos-sin-resolver.jsonl`).
- Leer código sin quemar tokens: `node tools/fos.mjs mapa tools/<archivo>` (funciones con rango de líneas) y `Admin/CONTRATO-ETAPAS.md` (qué pasa entre etapas); una tool de más de 50 KB no se lee entera (`CLAUDE.md`). Ver cómo se ve un patrón sin leer todo: `node tools/fos.mjs muestra "<regex>"` (una muestra repartida). Una edición en masa (el mismo texto en muchos archivos, o cambios exactos por línea): `node tools/fos.mjs reemplazar` (ensayo por defecto).
- Medir cambios al pipeline: `node tools/fos.mjs medir pipeline` (tabla `tools/pipeline-tools.json`, registro `Admin/registros/mediciones-pipeline.jsonl`,
  listas de prueba estratificadas `Admin/lotes/prueba-*.txt` que regenera `lotes-prueba.mjs`; `Admin/PIPELINE.md`, «Medir un cambio a una tool»).
- Comentarios de `tools/`: `node tools/comparar-sin-comentarios.js --medir` los mide (aviso P3 `comentario-historico-en-tools`) y `--tools` prueba que una limpieza no cambió el código; `medir pipeline` usa esa prueba, sin lote, para un cambio de solo comentarios (`Admin/CONVENCIONES.md`, «Comentarios en tools/»).
- Hook posterior a Bash (`tools/hooks/post-tool.mjs`): un commit que toca una skill recuerda mostrar el diff.
- Hook `Stop` (`tools/hooks/stop.mjs`): al terminar un turno con cambios mira, en segundos, el árbol sin commitear, el índice de los `.md` y un punto del TODO que ya cumple su «Verificar:»; bloquea una sola vez con el comando que lo arregla. Hook `SessionStart` (`tools/hooks/session-start.mjs`): imprime en menos de 10 líneas el modo, el árbol, una medición muerta y los tres primeros puntos. Pruebas: `probar-stop.mjs` y `probar-session-start.mjs` en la misma carpeta.
- Hooks de Claude Code (`.claude/settings.json` → `tools/hooks/pre-tool.mjs`): `audit.js` antes de cada commit publicable (frena con P0/P1;
  `[sin-audit]` con el ok de Guido), el commit de una tool de `pipeline-tools.json` (o de un módulo que ellas usan) sin medición con su huella o, si cambia el código (no solo comentarios ni una mudanza), sin la línea GENERAL de `node tools/fos.mjs patron` (`[sin-veredicto]`), o de una tool nueva sin clasificar (`[sin-medicion]` con el ok de Guido), rechazan editar un archivo trackeado mientras corre una medición (candado `Admin/mediciones/pipeline/_corriendo`) y piden permiso editar skills, `git push` y borrar en `Clubes/`; en un worktree rechazan escribir TODO,
  CHANGELOG y ESTADO. También rechazan (con el motivo y cómo reescribirlo) rutas en `/tmp`, `$(...)` y variables, `cd ... &&`, `node -e`
  que importa una tool, un subagente sin la regla de solo Read, Grep y Write, el modo plan o un `git merge`/`pull` en un worktree y `rsync`
  sin `--no-links`; `mv` en `Clubes/` pide permiso. Qué chequea cada uno: la cabecera del script.
- Estadio, capacidad, sponsor de camiseta y marca técnica de cada club y ejercicio: `data/contexto/<iso>.js` (`tools/estadio-sponsor.mjs`,
  de Wikipedia con el permalink de la revisión; lo manual en `tools/contexto-manual.json` con fuente). `cargar.mjs` no escribe un año
  nuevo sin estadio y sponsor, salvo en una liga amateur o en las segundas sin tabla de camisetas en Wikipedia, donde basta el estadio (la lista, `SOLO_ESTADIO` de `estadio-sponsor.mjs`; `compuertaContexto()`; también `bfo-rusia.mjs`). Donde la temporada en inglés no lo trae, el estadio y la capacidad salen de la Wikipedia del país
  (`--local`, con `fuenteLocal`); el sponsor y la marca que faltan, de la tabla de camisetas de la página del club (`--camisetas`, fuente en
  `club`, caché `_clubes.json`); lo manual, en `tools/contexto-manual.json`, con una fuente por campo. El índice de sponsors y marcas: `data/sponsors.js` (y uno chico para el buscador, `data/sponsors-indice.js`).
  En Finanzas, la tarjeta "Estadio y camiseta"; cada sponsor y marca tiene su página (`?tab=sponsor&sponsor=…`, con los equipos de hoy y
  la línea de tiempo), que también se encuentra en el buscador ("Sponsors y marcas").
- El plan para Guido (solo lo pendiente, corto) vive en el panel Plan de la app; su copia durable es el bloque ORDEN de `Admin/TODO.md`
  (tandas A-G por dependencias), y el detalle, en los to-dos.
- Qué hay cargado de cada club (ejercicios, tipo de documento, moneda, deuda y caja): `Admin/ESTADO-clubes.md`, generado por
  `node tools/generate-club-index.js`. El detalle de cada año (fuente, qué es real y qué no) está en la evidencia del club, `Admin/carga-clubes/<clubId>.md`.


### Qué falta de cada liga y estimados

- Por liga y año se sabe qué clubes faltan y en qué estado (`tools/faltantes-liga.mjs`, generado en cada carga); la lista de pendientes de
  sourcing es `Admin/sourcing/pendientes.md` (generada, no se edita): una sesión de sourcing puede arrancar de ahí.
- Estimaciones (`data/estimados/`, `tools/estimar.mjs`): los años que le faltan a un club que tenemos, por interpolación entre sus años
  reales, y todo club de la lista de una liga sin balance ese año (club nuevo: regresión sin historia, error alto; los países de `PAISES_SIN_ESTIMAR`, hoy Estonia, no se estiman). Se
  muestran en Ligas dentro de la tabla de ingresos con "(estimado)*", rango y error; el total de la liga los suma solo cuando más de la
  mitad tiene balance real, y la composición y el simulador usan solo lo real. Arriba de la tabla, "La liga en total, por categoría".
- Registro público de correcciones: `correcciones.html` y un bloque en Finanzas, generados del historial de git (`tools/generar-correcciones.mjs`,
  dato abierto en `data/correcciones/`). El motivo sale del trailer `Corrige:` de cada commit (regla en `Admin/CONVENCIONES.md`).
- Ligas: una lista con filtros de deporte, región e informes, agrupada por país, deporte o nivel, sin conteos de lo cargado ni plata (Guido); Escocia es un país aparte de Inglaterra (`nationOf()` en `data/leagues.js`).
- "Informes de esta liga" en Ligas (`data/informes.js`): informes de terceros sobre las finanzas de la liga, con quién lo publica, qué cubre,
  una cifra con su fuente y el link al original; los de Europa arriba. Cubre Europa, Inglaterra, Alemania, España, Italia, Brasil, Noruega, Colombia y Japón. No sale en ligas sin ranking.
- Las listas de Wikipedia (`tools/club-league-reference/`) cubren 376 liga-años y guardan la posición final donde la tabla está completa.

### Finanzas multi-año

- Finanzas tiene la tarjeta Estructura ("De quién son estos números": entidad y perímetro, cadena de dueños, controladas, clubes del
  mismo grupo y nota para periodistas) y la página del grupo multiclub (`?tab=grupo`, clubes que controla y total por año), desde
  `data/entidades/` (lo genera `tools/entidades.mjs` del registro `Admin/registros/entidades.jsonl`, con cita por línea). El registro tiene
  60 clubes y 9 grupos multiclub (265 entidades). Donde el registro los tiene, la tarjeta muestra también los ingresos de la otra entidad del club.
- Para periodistas: la tarjeta "Citar y descargar" de Finanzas (cita sugerida de lo que se ve, copiar la cita o el link, CSV por rubro y
  ejercicio con moneda, tipo de cambio y documento; sin dato va vacío, nunca 0) y la página pública `metodologia.html` (link en el pie).
- Balances propios de las entidades que organizan las ligas: en `Ligas/` (cuáles hay: `data/auditoria/_ligas.js`; las notas de sourcing de cada entidad, en `Admin/sourcing/Ligas/`), con su auditoría en
  `data/auditoria/_ligas.js`; en Ligas, la tarjeta "Las cuentas de la liga".
- Quién auditó cada balance: `Admin/registros/auditoria.jsonl` (con citas) y `tools/auditoria.mjs`, que genera `data/auditoria/` (todos los
  balances). En Finanzas, la tarjeta "Quién auditó estos números"; un club-año sin línea dice "Todavía no lo
  revisamos", no "sin informe", y sin ningún dato del club la tarjeta se esconde; una revisión que no es auditoría plena dice
  su alcance (revisión limitada, procedimientos acordados, propósito especial, cuentas del grupo).
- Finanzas muestra varios ejercicios a la vez: el título es el club; cards de ejercicios (default, los últimos 5 con balance) y
  fila de gestión; KPIs con comparación y sparkline; gráfico de evolución arriba de la tabla; Estado de resultados y Deuda con una
  columna por año (rubro desplegable, % del total, presupuesto al lado del balance); valores ajustados por inflación (deflactor del
  PBI, USD y EUR); fuentes por ejercicio; card "otra liga" con el puesto. `?multi=0` vuelve a la vista de un año (salida de
  emergencia). Cómo está hecho y qué no romper: `Admin/PANTALLA.md`, "Finanzas multi-año". Mockup aprobado:
  `Prototyping/Finanzas/mockup-147.html`.
- Datos que se mantienen a mano una vez por año: `data/deflactores.js` (se genera con
  `node tools/fetch-fx-reference.mjs --deflactores`) y `data/gestiones/<país>.js` (los presidentes de cada club; un año nuevo
  sin presidente que lo cubra abre un caso `gestion` en la cola al cargarlo).

### Inicio, Ligas y navegación

- Inicio: qué es el sitio, el buscador como acción principal y rankings del mundo y de América por ejercicio más tarjetas de liga, desde
  `data/rankings/_regiones.js` (lo escribe `tools/generate-rankings.js` en cada carga). Ligas: buscador, regiones y una fila por país; la
  liga elegida con ranking de barras, composición apilada y simulador. Debajo, de dónde sale la lista de clubes de la temporada (Wikipedia, CC BY-SA 4.0;
  `wiki` de cada liga-año en `data/rankings/`, de `tools/club-league-reference/`). No hay pestaña Fuentes ni botón del club en el header: se busca con
  "Buscar un club o una liga" (Ctrl/Cmd K) y el club se nombra en el título de Finanzas.
- El estado va en la URL: pestaña, club, años, liga y ejercicio, y solo cuando no son los de siempre la moneda, `real=1` (inflación),
  `formato=club` y los dos lados de Comparar (`a`, `b`); también el grupo multiclub (`?tab=grupo&grupo=…`). Se lee al abrir y con
  "atrás"; un club, liga o moneda que el sitio no tiene se ignora. Cómo está hecho: `Admin/PANTALLA.md`. Mockups: artifact de Design
  "Pantallas FoS".

### Comparar con el diseño de Finanzas

- Comparar se lee como Finanzas: los dos cards de lado son el título, con los chips de ejercicio de Finanzas (un club puede elegir
  varios ejercicios, cada lado con "Promedio | Suma"); sin botón, el resultado se arma solo con los dos lados llenos; barra con
  formato fijo y "Valores ajustados por inflación" (serie USD, propia de Comparar); un solo gráfico con A y B en el mismo eje de
  años; tabla con las filas de Finanzas (A, B, B / A, % del total, rubro desplegable); avisos de cada lado en su card y fuentes por
  ejercicio. La moneda no está en el header en ninguna pestaña: en Finanzas va en "Más opciones". Cómo está hecho: `Admin/PANTALLA.md`, "Comparar con el diseño de
  Finanzas". Mockup: `Prototyping/Comparar/mockup-23.html`.

### Techo del modelo (no es una tarea)

- La taxonomía es de fútbol (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Resultados/Títulos y
  `gestionesByClub` también. Un club de otro deporte entra hoy con media taxonomía vacía y 2 pestañas sin sentido.

### Sitio, publicación y analytics

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin build step, servido desde la raíz. Deploy continuo en
  Netlify al pushear a `main` del repo de GitHub. Dominio propio: **financeofsports.com**.
- QUÉ SE PUBLICA: Netlify publica la raíz, pero `netlify.toml` borra del artefacto de deploy lo interno (`Admin/`, con las notas de
  sourcing de `Admin/sourcing/`; `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/` y `Generados/`); todo se trackea, así que el respaldo en GitHub es completo. Se publican
  las páginas `fuentes/<clubId>.html`, `data/`, `js/`, `css/` y las transcripciones `Clubes/**/*.md`: estas últimas se publican A PROPÓSITO (decisión
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
- MI CUENTA: Supabase en plan gratis (se pausa tras 7 días sin uso). Lo mantiene despierto el Worker `fos-supabase-ping` (cron cada 3 días,
  llama a ping()); si igual se cae, la pestaña avisa "no disponible". Cómo se usa: `node tools/supabase/stats.mjs` (llama a stats(), solo
  cantidades). Las visitas: `node tools/cloudflare-visitas.mjs` (Web Analytics; el plan gratis muestrea de a 10, así que son estimadas; necesita `Admin/api-keys/cloudflare.env`). Los dos alimentan el dashboard
  de Claude https://claude.ai/artifact/7kPta8U7BxyiGRKAyayHhA. Lo actualiza la tarea programada `fos-auditoria-semanal` (lunes 8:10,
  carpeta principal; vive en `~/.claude/scheduled-tasks/`): `audit.js --quiet`, `tools/dashboard-usuarios.mjs` (arma y sube los 4 archivos y
  mira las corridas del Worker de los últimos 7 días: sin corridas o con errores, ALERTA), el tablero del pipeline, la auditoría de rutina con un
  eje rotando y de 3 a 5 sugerencias de mejora. Commitea solo `auditorias/<fecha>.md`; lo que va al TODO queda en su sección "Para TODO", para
  la principal. Avisa siempre con una línea.
- Un solo motor genérico calcula Finanzas para todos los clubes (ver `Admin/ARQUITECTURA.md`); ningún club tiene motor propio. Todos los
  `clubId` llevan el país (`<slug>-<iso2>`, ej. `boca-ar`, `corinthians-br`); los ids viejos viven en `data/club-aliases.js` y `fuentes/`
  redirige con 301 desde `netlify.toml`. `tools/audit.js` vigila el formato y el mapa.
- DATOS: cuántos clubes, de qué países y qué ejercicios tiene cada uno: `Admin/ESTADO-clubes.md` (generado). Solo cuentan los clubes
  con al menos un ejercicio REAL (balance o presupuesto oficial).

### Dónde vive cada cosa

- Raíz: las páginas del sitio (`index.html`, `fuentes.html`, `metodologia.html`, `privacidad.html`, `terminos.html`, `sitemap.xml`), `netlify.toml` y `CLAUDE.md`.
- `club/<id>.html` y `liga/<id>.html` (generadas por `tools/generate-club-pages.js`, con la imagen de `og/`): el link propio de cada club y liga,
  con título, descripción y tarjeta al compartir; Netlify las sirve en `/club/<id>` y `/liga/<id>` y la app arranca en esa pestaña (`window.FOS_RUTA`).
  La dependencia de imágenes (`@resvg/resvg-js`) vive en `tools/package.json`: `cd tools && npm install` en una carpeta nueva.
- Deporte de cada club: el pipeline lo lee de la ficha o del registro de altas (`tools/deporte-club.mjs`) y usa la taxonomía de ese deporte
  (Jev, Claude, la carga, la verificación y `audit.js`); un club sin deporte se pregunta. Cómo sumar un deporte: `Admin/PIPELINE.md`, «Un deporte nuevo». Una liga o un deporte nuevo no se agrega a mano a `data/leagues.js`: lo propone `tools/catalogo-liga.mjs` desde Wikipedia y se escribe con la aprobación registrada (la liga, la Auditora; activar un deporte, Guido). Los prompts de lectura nombran el deporte del club; `estadio-sponsor.mjs` lee la ficha de rugby (el sponsor de rugby va a mano). Un sponsor sin fuente solo pasa la compuerta con el registro de búsqueda de club-sourcing 0.5. Un renglón que el documento abre en un cuadro que suma exacto se carga con ese detalle (`tools/cuadro-sobrante.mjs`).
- `data/`: la fuente de cada club es `data/<país>/<clubId>.json` (dato abierto, esquema en `data/schema/club-v2.json`: cada línea con `category` genérica, derivada de `data/category-map.js`, y
  `subcategory` del deporte, tabla en `data/schema/taxonomy-football-1.json`; `club-v1.json` queda congelado); el sitio carga el
  `data/<país>/<clubId>-data.js`, que se GENERA desde el JSON (`tools/generar-data.mjs`; `--check` lo controla). Los
  compartidos (`clubs.js`, `leagues.js`, …) sueltos; `club-leagues/`, `gestiones/`, `rankings/` y `lang/`. Las tools arman la ruta de un
  club solo con `tools/data-clubes.js`.
- `js/` (el script principal es `js/principal.js`) y `css/styles.css`. `fuentes/`: solo las páginas públicas `<clubId>.html`.
- `Clubes/<País>/<Club>/`: los PDFs y sus transcripciones `.md`. `Generados/`: lo que las tools derivan de cada documento.
- `Admin/`: los documentos internos sueltos (este, TODO, CONVENCIONES, PIPELINE, …) y `api-keys/` (las claves, gitignoreadas salvo la
  pública de Supabase), `registros/` (los registros del pipeline; `registros/api/`, el gasto de cada API), `lotes/` (las listas abiertas y
  las de prueba), `mediciones/` (tests, backtests y propuestas medidas), `sourcing/` (las notas de sourcing; `sourcing/README.md` es donde
  Guido deja links), `carga-clubes/` (la evidencia de cada club), `ligas-por-pais/`, `gestiones-por-pais/`, `outreach/` y `Archive/`.
- `tools/`: las tools, sueltas; las que ya no se usan, en `tools/archivo/` (su README dice por qué).

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición.
`verifyTieOuts()` automatiza esto para los club-ejercicios que tienen un total
conocido: mirá la consola del navegador al cargar el sitio. Este sitio es para
uso público de hinchas y periodistas reales: la precisión importa más que la
velocidad acá.
