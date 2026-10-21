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
