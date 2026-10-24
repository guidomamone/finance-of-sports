# tools/archivo — tools que ya no se usan

No se borran (su historia y sus resultados están en `Admin/CHANGELOG.md`), pero no forman parte de ningún proceso y nadie las llama.
Sus `import` relativos (`./rutas.mjs`, etc.) ya no resuelven desde esta carpeta: para correr una de nuevo, devolverla a `tools/`.

- `localizar-extraer.mjs` — el test "localizar y extraer por página" del 2026-10-01 (US$ 3,52, 31 años ya cargados). Descartado como
  proceso porque elegía páginas enteras; lo reemplazó el proceso nuevo (`indice-bloques`, `localizar`, `extraer`, `verificar`).
- `test-motores.mjs` — el test que comparó Mistral, Gemini y Claude para transcribir (resultados en `Admin/mediciones/test-motores-resultados.md`).
  Terminado: de ahí salió el criterio de transcripción de `CLAUDE.md`.
- `mover-comentarios-data.mjs`, `mover-comentarios-compartidos.mjs` y `mover-notas-fuentes.mjs` — las mudanzas del to-do 209: los
  comentarios y las `note` internas de `data/` a `Admin/carga-clubes/`, `Admin/ligas-por-pais/` y `Admin/gestiones-por-pais/`. Terminadas.
- `revisar-reservas.mjs` — la pasada que decidió con sumas (gratis) las páginas "con reserva" de los documentos ya resueltos (Versión 313).
  El mismo criterio vive hoy adentro de `resolver-inventario.mjs`.
- `tablas-sesion.mjs` — las tablas de arranque de una sesión de Italia y del TODO (2026-10-08). No la usaba ningún proceso.
- `estado-desde-md.mjs` — armar a mano las filas del estado de resultados desde una tabla del `.md` (Lazio 2007-08 y 2011-12, 2026-10-08).
  Hecho para el formato de Lazio; si vuelve a hacer falta para otro documento viejo, devolverla a `tools/` y revisar la salida fila por fila.
- `proponer-carga.mjs` — la carga por selección de filas por palabras (seleccionarFilas, briefingFor con prepare-onboarding.mjs) y su
  backtest (`--backtest`, `--pdf`, to-do 108). Lo reemplazó la carga desde la verificación (`cargar.mjs`, etapa 8); se archivó en el to-do 218.
  Sus dos utilidades vivas, `loadSite()` y `parseNumber()`, están en `tools/datos-sitio.mjs`.
- `onboard.mjs` — el onboarding viejo: transcribir con Mistral y Gemini, comparar las dos transcripciones y armar el briefing con
  `prepare-onboarding.mjs`. Lo reemplazaron `pipeline.mjs` (etapa 2) y `lote.mjs` (3 a 8); se archivó en el to-do 218. Sus dos funciones
  vivas (`--quien` y `--all --dry-run`) están, con el mismo código, en `tools/quien.mjs` (`--quien` y `--pendientes`).
- `partir-cjs.mjs` — el método que repartió `audit.js` (CommonJS, 109 declaraciones de nivel superior, 165 KB) en `audit-base.js`, cinco `audit-chequeos-N.js` y la
  entrada (to-do 399): una declaración por chunk (con `lexico-js.mjs`), los `check*` que se usan entre sí viajan juntos y se empaquetan hasta ~27 KB,
  las constantes exclusivas de un módulo van con él y el resto a la base, y cada `require` se calcula con los nombres que usa. Sin `--escribir` solo
  dice el reparto y las dependencias que cruzan. Se comprobó con `audit.js` y `--json` antes y después, y `eslint no-undef`. Sobre el `audit.js` de hoy
  ya no hay nada que partir; para otro CommonJS, copiarlo a `tools/` y ajustar `ENTRADA`, el prefijo `check` y el archivo de entrada.
- `prepare-onboarding.mjs` — el briefing por documento (`.briefing.json`) del onboarding viejo; solo lo llamaba `onboard.mjs`. Archivado en
  el to-do 218.
