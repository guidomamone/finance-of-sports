# Sesión pantallas (Pantallas 6): marca COVID implementada

## Qué cambió (para CHANGELOG)
- Marca COVID (aprobada por Guido, versión sobria): un recuadro con borde de estallido, azul del sitio con COVID en blanco, en los ejercicios con cierre entre 2020-03-31 y 2021-12-31 (se deriva de
  `cierreEjercicio()`, sin campo). Va en el card de cada ejercicio, la cabecera de la tabla multi-año y el número «Ingresos» de arriba. `role="img"` + `aria-label`, globo con `js/info-tip.js`
  (tocarla en un card no elige el año), Tab/Enter/Escape; claves `covid.aria` y `covid.tip` en `en.js`. `js/finanzas-calc.js` (`esCovid`, `marcaCovidHtml`; el `keydown` se guarda con `typeof document`
  porque `tools/generate-club-pages.js` carga ese archivo sin navegador), `js/finanzas-anios.js`, `js/finanzas-multi.js`, `css/styles.css`, regla en `Admin/PANTALLA.md`. Verificado servido con Juventus (cards
  19/20 y 20/21, 2 cabeceras, KPI), a 375 px (sin desborde, la marca no se corta) y en inglés. ASSET_V 1657; regeneradas `fuentes/`, `club/` y `liga/`. `node tools/audit.js`: 0 P0, 0 P1.
- NO probado: `file://` en un navegador, ni el modo oscuro del sitio real (el sitio no tiene modo oscuro: el del mockup era solo del mockup).

## Qué queda (para TODO)
- Comparar, Ligas y el selector de ejercicio no llevan la marca todavía.

## Qué deja de ser cierto en ESTADO
- «Finanzas multi-año»: los ejercicios con cierre en la ventana de la pandemia llevan la marca COVID (card, cabecera de tabla y número de ingresos).

---

# Sesión pantallas (Pantallas 6): mockup de la marca COVID (sin código)

## Qué cambió (para CHANGELOG)
- Mockup de la marca COVID (un estallido de historieta con la palabra) en `Prototyping/Covid/mockup-covid.html`, con números reales de Juventus y Atalanta: la marca en tres tamaños, dónde va (card de
  ejercicio, cabecera de la tabla multi-año y número grande de arriba), el teléfono a 375 px, modo oscuro, texto alternativo, globo y teclado. La ventana se deriva de `cierreEjercicio()` (cierre entre
  2020-03-31 y 2021-12-31), sin campo nuevo. No se tocó `index.html`, `js/` ni `css/`.

## Qué queda (para TODO)
- El ok de Guido al mockup; después, el código (helper compartido, `t()` en español e inglés, claves en `en.js`, `Admin/PANTALLA.md`) y verificar servido y como archivo.
- Comparar, Ligas y el selector de ejercicio quedan para después de aprobar.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): Inicio sin conteos de lo cargado

## Qué cambió (para CHANGELOG)
- Inicio ya no muestra cuánto hay cargado: se sacó la línea «320 clubes · 23 países · 1301 ejercicios» (el elemento `#iniConteo`, `pintarConteoInicio()` y las claves `ini.clubs`, `ini.countries` e
  `ini.years` de `en.js`; el estilo `.ini-eyebrow`). Las tarjetas de «Los que más facturan» dicen solo «Ejercicio AAAA» (no «262 clubes con balance»). El ranking con los US$ de cada club QUEDA
  (se había sacado en la tanda anterior por la lectura de «(c)»; se restauró según la aclaración: es contenido, como el ranking de una liga). Sigue fuera el aviso de «% sin desglosar» de las
  tarjetas de liga de Inicio. Verificado servido: sin conteos y con los 40 valores en US$. ASSET_V 1593.

## Qué queda (para TODO)
- `file://`: no pude verlo en Brave. Dos `open -a "Brave Browser" file:///…/fos-pantallas/index.html` no abrieron una ventana nueva visible para `app_list_windows`; la ventana que se ve es la de la
  principal, con `finance-of-sports/index.html` (la carpeta principal, no la mía). Falta que alguien lo mire con esta rama mergeada.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): 344 implementado, números fuera de Ligas e Inicio, Escocia separada

## Qué cambió (para CHANGELOG)
- 344: la lista de la pestaña Ligas pasa a ser la del mockup aprobado: filtros de deporte (solo si hay más de uno con datos), región y «Con informes»; agrupar por país (plegable), deporte o
  nivel (matriz país × nivel de un deporte); ordenar A–Z o por cantidad de ligas; deporte, región, agrupación, orden e informes en la URL (`?tab=liga&agrupar=nivel`). Sin conteos de clubes
  ni plata en la lista. `js/liga.js` (`estadoFrio()` y vistas), `js/principal.js` (la URL), `css/styles.css` (`.lg-ffila`, `.lg-pais2`, `.lg-lrow`, `.lg-mat`…), claves `liga.f.*` en `data/lang/en.js`
  (y se borraron las huérfanas).
- Por pedido de Guido se sacan los números: el encabezado de una liga ya no dice «N de M con ejercicio AAAA» ni cuántos clubes trae cada ejercicio (ahora país · división · deporte y el año), y las tarjetas
  de ranking de Inicio ya no llevan «N de M cargados», «+ N clubes más», el aviso de «% sin desglosar» ni US$ por club. El ranking de una liga y «La liga en total» quedan.
- Escocia separada de Inglaterra: `COUNTRIES.SCT` (Escocia), la Premiership escocesa con `country:'SCT'`, `CLUB_NATION` y `nationOf(clubId)` en `data/leagues.js` (Celtic → `SCT`; los ids y la carpeta
  `data/gb/` no cambian), `countryOf()` del selector y las banderas de `js/liga.js` usan `nationOf`, y `tools/generate-club-pages.js` también. La bandera de Inglaterra es la propia. Gales: el mecanismo
  está y la regla en `Admin/CONVENCIONES-DATOS.md`; no hay clubes ni ligas galeses cargados todavía. Los estaduales de Brasil quedan como están, sin nivel.
- Verificado servido a escritorio y 375 px: la lista por país, por deporte y por nivel (sin desborde de la página), el filtro de rugby, Premiership bajo Escocia, Celtic bajo Escocia en Finanzas y en
  el selector, el encabezado y Inicio sin números. `node tools/audit.js`: 0 P0, 0 P1. ASSET_V 1580; regenerados `fuentes/`, `club/` y `liga/`. NO se probó `file://` en un navegador (el panel lo abre como captura
  sin estilos y Claude in Chrome no conecta): no cambió nada de `index.html` salvo la versión.
- En el worktree: `preparar` dejó 28 enlaces a PDFs que ya no existen en la carpeta principal; los borré (solo enlaces rotos, ningún archivo) porque hacían fallar dos chequeos de `audit.js`.

## Qué queda (para TODO)
- Si se carga un club o una liga galesa: `WAL` en `COUNTRIES`, la Cymru Premier con `country:'WAL'` y los clubes galeses (Cardiff, Swansea) en `CLUB_NATION`.
- `leagueAt()` devuelve null hasta que se abre el selector (las tablas de `data/club-leagues/` son lazy): el subtítulo de Finanzas no dice la liga al entrar directo a un club. Es de antes de esta tanda.
- Texto de Inicio «Revenue in dollars for every club loaded…» (`vid.sub`) sigue hablando de los clubes cargados, sin números.

## Qué deja de ser cierto en ESTADO
- «Inicio, Ligas y navegación»: Ligas es una lista con filtros de deporte, región e informes, agrupada por país, deporte o nivel, con el estado en la URL; Inglaterra y Escocia son países distintos.

---

# Sesión pantallas (Pantallas 6): 344, el mockup sin conteos ni plata

## Qué cambió (para CHANGELOG)
- 344: por pedido de Guido el mockup de Ligas ya no muestra cuántos clubes hay cargados ni plata en las filas, los países ni las matrices: queda el nombre, el país, el deporte, el nivel, «Con datos / Sin datos
  todavía» y los informes propios. El orden «Más clubes cargados» y «Mayor ingreso» se cambió por «Más ligas». Se republicó en el mismo artifact (versión 2).

## Qué queda (para TODO)
- La pestaña Ligas del sitio de hoy: la lista inicial ya muestra solo el nombre de cada liga, pero hay números en el encabezado de una liga (país · división · «N de M con ejercicio AAAA» y las pastillas de ejercicio),
  en el ranking y el total «La liga en total» (que son el contenido de la pantalla) y en las tarjetas de Inicio («N de M cargados» y US$ por club). Esperan la confirmación de Guido de si el pedido vale para el sitio.
- Los estaduales de Brasil (Paulista A1, A2, A3) no tienen nivel en los datos (`tier` ausente): decidir dónde van en la lista.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 258, índice partido por país o liga

## Qué cambió (para CHANGELOG)
- 258: se miró con la skill `escala-finance-of-sports` (sección B, payload eager) y todavía no llegó el momento: no se implementó nada. Medido el 2026-10-21 con 320 clubes: `data/clubs.js` 66,9 KB
  (11,2 KB comprimido) y `data/club-index.js` 69,6 KB (6,5 KB comprimido), o sea unos 55 bytes comprimidos por club; el payload eager completo (los `<script src="data/…">` de `index.html`) es
  250 KB crudo y 46,5 KB comprimido, y lo que escala por club es solo esos dos archivos (17,7 KB comprimidos).

## Qué queda (para TODO)
- 258 se cierra con su disparador, que la skill ya fija como «problema observable del payload eager comprimido»: a 55 bytes comprimidos por club, el payload eager comprimido llega a ~100 KB con ~1.300 clubes
  cargados y a ~200 KB con ~3.000 (a 1.000 clubes: ~84 KB; a 10.000: ~0,6 MB). Propuesta de umbral para reabrirlo: payload eager comprimido > 150 KB (~2.200 clubes) o `clubs.js` + `club-index.js` crudos > 1 MB.
  Medirlo con `grep -o 'src="data/[^"?]*' index.html | sed 's/src="//' | xargs cat | gzip -9c | wc -c`. Cuando se reabra: la premisa de la skill (el destino de `fiscalYearStart` es `club-index.js`, no el archivo del club)
  y partir por país no compra lazy-load si el selector necesita la tabla entera para dibujarse; lo que sirvió con `club-leagues.js` fue sacarlo del camino eager detrás de una frontera async.
- Si se quiere, agregar ese umbral como chequeo a `checkEscala()` de `tools/audit.js` (P3 `payload-eager`), que hoy proyecta bytes crudos y no comprimidos (lo pide Pipeline).

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 344, mockup de Ligas con muchos países y deportes

## Qué cambió (para CHANGELOG)
- 344: mockup de la pestaña Ligas con ligas de distintos países y deportes: `Prototyping/Ligas/mockup-344.html` y artifact https://claude.ai/artifact/CzmEuNtdt7i2yHNrDDi2Aa.
  Con los datos reales de las ligas (`LEAGUES`, `RANKINGS_INDICE`, ingresos de cada ranking, informes de `data/informes.js`). Muestra el estado de hoy, una versión interactiva
  (filtros de deporte y región; agrupar por país, deporte o nivel; ordenar A–Z, por clubes cargados o por ingreso; «Con informes»; buscador), una tabla de cómo se comporta con
  66, 150 y 400 ligas, y la página de una liga con el bloque Informes (Premier, Bundesliga, Premiership Rugby sin informes y Primera de Argentina). No se implementó nada.
  Verificado a escritorio y a 375 px (sin desborde de la página; la matriz por nivel scrollea dentro de su caja).

## Qué queda (para TODO)
- Esperar el ok de Guido a las decisiones del mockup: agrupar por país por default; niveles solo dentro de país y deporte; países plegados; filtro «Con informes» con los informes propios
  de la liga (el de la UEFA cubre toda Europa y no distingue).
- Hallazgo de datos: el país `GB` se llama «Inglaterra» y hoy agrupa también la Premiership escocesa de fútbol. Con más ligas conviene separar Escocia, Gales e Irlanda del Norte o llamar
  al grupo «Reino Unido» (`COUNTRIES` en `data/leagues.js`). Es de datos, lo decide la principal o Guido.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 340 reabierto, index.html sin base ni rutas con «/»

## Qué cambió (para CHANGELOG)
- `index.html` va sin `<base>` y sin script que lo escriba. `js/i18n.js` calcula `FOS_RAIZ` desde la URL de su propio script (`<raíz>/js/i18n.js`) y expone `fosUrl(ruta)`;
  lo usan todas las cargas dinámicas (club, ranking, estimados, idioma, contexto, auditoría, entidades, gestiones, grupo, sponsors, correcciones). Los links relativos
  (`fuentes.html`, `fuentes/<id>.html`, `correcciones.html`) se reescriben a absolutos al cargar (`absolutizarLink()` en `js/principal.js`) y, los que arma el JS después,
  justo antes de usarlos (pointerdown, click, contextmenu, focusin). Las páginas generadas siguen con su `<base>` estático (lo escribe el generador). Anda servido (también en
  `/club/<id>` y `/liga/<id>`) y abierto como archivo, porque la raíz sale de la URL del script y no de la barra. Verificado servido: portada → liga → Burnley, atrás y adelante,
  `/liga/gb-premierleague.html` directo a escritorio y 375 px (Brighton), y un link `fuentes/<id>.html` armado por JS da 200 tras el pointerdown. `node tools/audit.js`: 0 P0, 0 P1. ASSET_V 1564.
- Sin probar: abrir `index.html` por `file://` en un navegador (el panel lo abre como captura sin estilos y Claude in Chrome no conectaba). Por construcción no hay ruta con `/` ni base:
  `FOS_RAIZ` sale de `file:///…/js/i18n.js`. Conviene que Guido lo abra una vez.

## Qué queda (para TODO)
- Que Guido confirme `file://`.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 342, título de la pestaña y <base> doble

## Qué cambió (para CHANGELOG)
- 342: el `<title>` de la pestaña sigue a la ruta (`tituloDe()` en `js/principal.js`, desde `escribirURL()`): club o liga con el nombre del sitio, y la portada con el título
  del sitio (en el idioma elegido). En la ruta por la que se entró queda el título de la página generada. Y `tools/generate-club-pages.js` ya no escribe su `<base href="/">`
  (lo trae la plantilla `index.html`): una sola base por página. `--check` al día. Verificado en el preview: liga directa → club → atrás → Inicio. ASSET_V 1562.

## Qué queda (para TODO)
- Nada.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 6): to-do 340, rutas relativas en /club/<id> y /liga/<id>

## Qué cambió (para CHANGELOG)
- 340: `index.html` lleva `<base href="/">` (la app corre también en `/club/<id>` y `/liga/<id>`). Sin eso toda ruta relativa apuntaba a `/liga/data/…`: elegir un
  club no cargado desde una liga fallaba con «No se pudieron cargar los datos», y lo mismo los links `fuentes.html`, `fuentes/<id>.html` y `correcciones.html`. Elegí la
  base y no rutas absolutas en cada carga porque cubre scripts, `fetch`, `I18N_BASE` y los `href` a la vez. Los links `#ancla` que cambian con una base
  (irían a `/#…`) ya hacen `preventDefault` (índice de Finanzas, sponsors). Verificado en el preview: portada → liga → Burnley (carga y la URL pasa a `/club/burnley-gb`),
  atrás y adelante, `/club/boca-ar.html` y `/liga/gb-premierleague.html` directos, y 375 px (Brighton, sin desborde). ASSET_V 1561; regeneradas `fuentes/`, `club/` y `liga/`.

## Qué queda (para TODO)
- El generador (`tools/generate-club-pages.js`) ya mete su propio `<base href="/">`: ahora la página tiene dos (el primero manda, inofensivo). Pipeline puede sacar el suyo.
- El `<title>` y la descripción de la página generada no cambian cuando el visitante navega dentro de la app (queda el del club o la liga de entrada); solo lo ven la pestaña
  del navegador y el historial. Si molesta, hay que actualizar `document.title` en `escribirURL()`.

## Qué deja de ser cierto en ESTADO
- Nada.

---

# Sesión pantallas (Pantallas 7): to-do 247, registro público de correcciones

## Qué cambió (para CHANGELOG)
- **Registro público de correcciones**, con las 4 decisiones de Guido: se muestra también lo anterior al registro (marcado «anterior al registro»; la vista
  filtra «desde el registro» por defecto), el motivo en español (el inglés es opcional), sha corto sin link, trailer `Corrige:`.
- `tools/generar-correcciones.mjs` (hecho acá, no por Pipeline, porque no había otra sesión de Pipeline): lee el historial de git de los `-data.js`
  (un solo `git log --raw -M`, caché por blob en `Generados/.cache-correcciones.json`, gitignoreada), compara versiones consecutivas y escribe
  `data/correcciones/correcciones.json`, `<iso2>.json` por país (existe aunque esté vacío) y `correcciones.csv`. `--check` y `--sin-motivo` (para audit).
  Hoy: 236 eventos en 56 clubes, 14 desde el registro (20/10/2026), ninguno con motivo todavía.
- `tools/audit.js`: `correcciones-desfasado` (P2) y `correccion-sin-motivo` (P2; obliga desde 2026-10-21, `OBLIGA_DESDE` en el generador).
  P2 y no P1: el commit que corrige un dato deja el registro un commit atrás hasta el próximo regenerado. `tools/generadores.mjs`: sumado a GENERADORES.
- `tools/generate-club-pages.js`: `correcciones.html` en `sitemap.xml`. `.gitignore`: la caché.
- Pantalla: `correcciones.html` (página propia con filtros), `js/correcciones.js` (compartido), bloque «Correcciones a estos números» en Finanzas debajo de
  «Quién auditó» (+ link en el índice de la ficha), punto dorado en la tarjeta de un ejercicio con correcciones, link «Correcciones» en el pie, sección en
  `metodologia.html`, claves `corr.*` en `data/lang/en.js`, sección en `Admin/PANTALLA.md`. `ASSET_V` 1537.
- Verificado en preview a escritorio y a 375 px (sin scroll horizontal): la página, el bloque en Finanzas con club con y sin correcciones. audit P0/P1 en 0.

## Regla de proceso nueva para `Admin/CONVENCIONES.md` (la pasa la principal)
**Un commit que corrige un dato publicado lleva el trailer `Corrige: <motivo en una frase, en español, sin números de to-do>`** (opcional `Corrige-en:` con la
versión en inglés). «Corrige un dato publicado» = cambia un importe, una categoría, las filas, un total, la caja o la deuda, la moneda, el tipo de cambio, la
fuente o el perímetro de un ejercicio que ya estaba en el sitio (no un año o club nuevo). Alternativa: una línea en `Admin/registros/correcciones.jsonl`
`{"commit":"<sha>","club":"<id>","anio":2024,"motivo_es":"…","motivo_en":"…","fuente":"…"}`. El motivo es público: se escribe para un hincha o un periodista, nunca
jerga interna. `node tools/audit.js` da `correccion-sin-motivo` (P2) si falta, desde el 2026-10-21.

## Queda pendiente (para TODO)
- Curar los motivos de los eventos con más impacto (valor, retiros, recargas) en `Admin/registros/correcciones.jsonl` (paso 2 del plan, con subagentes que lean el
  cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`). Hoy todo dice «Motivo no registrado».
- El inglés del motivo: no hay traducción automática al generar; sin `motivo_en`/`Corrige-en:` la página en inglés muestra el español. Decidir si se traduce al curar.
- `tools/worktree.mjs mergear` debería regenerar `data/correcciones/` (como los otros generados) y `tools/exportar-paquete.mjs` sumar el registro al Data Package.
- Los shas del registro son los de la rama: un squash o rebase al mergear los cambia; con merge normal o fast-forward quedan.
- El punto de la tarjeta de ejercicio no lleva link (la tarjeta es un botón): el detalle está en el bloque de abajo.
- Revisar que los tipos «total» y «otro» de los eventos de hoy (246, 245) no tengan ruido de renombres; los 0→null de caja y deuda ya se filtran.

## Qué deja de ser cierto en ESTADO
- Agregar: el registro de correcciones (`correcciones.html`, `data/correcciones/`, `tools/generar-correcciones.mjs`, bloque en Finanzas) y que `data/` y el
  mapa «Dónde vive cada cosa» lo incluyen; `correcciones.html` entra a la lista de páginas de la raíz.
