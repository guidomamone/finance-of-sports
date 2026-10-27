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
<!-- roles: pantallas, contenido, deploy -->

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
<!-- roles: pipeline, onboarding, auditora, orden, sourcing -->

- Qué hace cada tool, qué se decide solo y qué no se transcribe: `Admin/ESTADO-pipeline.md` (no se lee en el arranque; se consulta con grep). Proceso etapa por etapa: `Admin/PIPELINE.md`; descartes medidos: `Admin/HALLAZGOS-pipeline.md`; cuántos documentos hay en cada etapa y cuánto cuesta el paso siguiente: `node tools/estado.mjs` (gratis).
- Lo esencial: `lote.mjs` corre las etapas 3 a 8 en segundo plano, `cargar.mjs` escribe el año y revierte si algo falla, `caja-deuda.mjs` completa caja, deuda y personal, `cola.mjs` guarda lo que no se resuelve solo. Un dato publicado mal se corrige con un ajuste manual (`tools/ajustes.mjs`) además de en `data/`, para que una corrida futura no lo deshaga. Las reglas que solo valen para un país están en `Admin/paises/<iso>.md`; el camino de un club colombiano desde SIIS, con lo que falta de cada uno: `node tools/club-siis.mjs "<Club>"` (`Admin/paises/co.md`, «Pipeline de Colombia: los estados de SIIS»). Comandos del cierre de una tool: `fos cerrar-tool`.

### Qué falta de cada liga y estimados
<!-- roles: sourcing, onboarding, pantallas -->

- Por liga y año se sabe qué clubes faltan y en qué estado (`tools/faltantes-liga.mjs`, generado en cada carga); la lista de pendientes de
  sourcing es `Admin/sourcing/pendientes.md` (generada, no se edita): una sesión de sourcing puede arrancar de ahí.
- Estimaciones (`data/estimados/`, `tools/estimar.mjs`): los años que le faltan a un club que tenemos, por interpolación entre sus años
  reales, y todo club de la lista de una liga sin balance ese año (club nuevo: regresión sin historia, error alto; los países de `PAISES_SIN_ESTIMAR`, hoy Estonia, no se estiman). Se
  muestran en Ligas dentro de la tabla de ingresos con "(estimado)*", rango y error; el total de la liga los suma solo cuando más de la
  mitad tiene balance real, y la composición y el simulador usan solo lo real. Arriba de la tabla, "La liga en total, por categoría".
  Tope de error automático (`ERROR_MAXIMO`, 60 %, decisión de Guido): un estimado no se publica si el error mediano medido de su país y su caso (club nuevo, entre dos reales, antes o después) lo pasa; se recalcula en cada `--escribir` y lo vigila `--check` (la auditoría, `estimados-desfasado`).
  Un ejercicio de margen bruto (`revenue_basis: gross_margin`: el documento imprime solo el margen, no los ingresos) cuenta como año que falta: sale del ranking real y se estima, con el margen
  positivo como piso; un ingreso real de un informe posterior (`Admin/registros/ingresos-ancla.jsonl`) lo pisa y se muestra como «(informe siguiente)». Qué hay y qué falta: `Admin/mediciones/455-ingresos-con-margen-bruto.md`.
- Registro público de correcciones: `correcciones.html` y un bloque en Finanzas, generados del historial de git (`tools/generar-correcciones.mjs`,
  dato abierto en `data/correcciones/`). El motivo sale del trailer `Corrige:` de cada commit (regla en `Admin/CONVENCIONES.md`).
- Ligas: una lista con filtros de deporte, región e informes, agrupada por país, deporte o nivel, sin conteos de lo cargado ni plata (Guido); Escocia es un país aparte de Inglaterra (`nationOf()` en `data/leagues.js`).
- "Informes de esta liga" en Ligas (`data/informes.js`): informes de terceros sobre las finanzas de la liga, con quién lo publica, qué cubre,
  una cifra con su fuente y el link al original; los de Europa arriba. Cubre Europa, Inglaterra, Alemania, España, Italia, Brasil, Noruega, Colombia y Japón. No sale en ligas sin ranking.
- Las listas de Wikipedia (`tools/club-league-reference/`) cubren 376 liga-años y guardan la posición final donde la tabla está completa.

### Finanzas multi-año
<!-- roles: pantallas, contenido -->

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
<!-- roles: pantallas, contenido -->

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
<!-- roles: pantallas -->

- Comparar se lee como Finanzas: los dos cards de lado son el título, con los chips de ejercicio de Finanzas (un club puede elegir
  varios ejercicios, cada lado con "Promedio | Suma"); sin botón, el resultado se arma solo con los dos lados llenos; barra con
  formato fijo y "Valores ajustados por inflación" (serie USD, propia de Comparar); un solo gráfico con A y B en el mismo eje de
  años; tabla con las filas de Finanzas (A, B, B / A, % del total, rubro desplegable); avisos de cada lado en su card y fuentes por
  ejercicio. La moneda no está en el header en ninguna pestaña: en Finanzas va en "Más opciones". Cómo está hecho: `Admin/PANTALLA.md`, "Comparar con el diseño de
  Finanzas". Mockup: `Prototyping/Comparar/mockup-23.html`.

### Techo del modelo (no es una tarea)
<!-- roles: pantallas -->

- La taxonomía es de fútbol (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Resultados/Títulos y
  `gestionesByClub` también. Un club de otro deporte entra hoy con media taxonomía vacía y 2 pestañas sin sentido.

### Sitio, publicación y analytics
<!-- roles: deploy, auditora -->

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
<!-- roles: * -->

- Raíz: las páginas del sitio (`index.html`, `fuentes.html`, `metodologia.html`, `privacidad.html`, `terminos.html`, `sitemap.xml`), `netlify.toml` y `CLAUDE.md`.
- `club/<id>.html` y `liga/<id>.html` (generadas por `tools/generate-club-pages.js`, con la imagen de `og/`): el link propio de cada club y liga,
  con título, descripción y tarjeta al compartir; Netlify las sirve en `/club/<id>` y `/liga/<id>` y la app arranca en esa pestaña (`window.FOS_RUTA`).
  Las dependencias de `tools/` (`@resvg/resvg-js` para las imágenes; `eslint` y `globals` para `node tools/fos.mjs indefinidos`, que busca nombres usados sin definir y alimenta el aviso P3 `nombre-sin-definir`) viven en `tools/package.json`, solo de desarrollo: `cd tools && npm install` en una carpeta nueva. Sin eso el aviso no aparece.
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
<!-- roles: pipeline, onboarding, auditora, pantallas -->

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición.
`verifyTieOuts()` automatiza esto para los club-ejercicios que tienen un total
conocido: mirá la consola del navegador al cargar el sitio. Este sitio es para
uso público de hinchas y periodistas reales: la precisión importa más que la
velocidad acá.
