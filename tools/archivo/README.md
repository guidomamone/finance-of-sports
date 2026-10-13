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
