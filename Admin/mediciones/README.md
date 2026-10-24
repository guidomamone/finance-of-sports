# Admin/mediciones: qué es cada archivo y dónde quedó su conclusión

Cada medición, prueba o plan que se corrió para decidir algo. Lo que importa de cada una es su conclusión, y esa vive en otro lado (`Admin/HALLAZGOS-pipeline.md` si no entró, `Admin/PIPELINE.md` o una convención si entró). El archivo crudo queda para poder repetir la medición.

**Convención:** un archivo nuevo abre con `Conclusión:` y `Destino:` (la línea de HALLAZGOS o la regla donde quedó). Un archivo que ya cumplió y solo guarda salida cruda se archiva en `Admin/Archive/mediciones/`. `node tools/audit.js` (`medicion-sin-destino`) da P3 por cada archivo que no lo cita ninguna tool, skill o documento de criterio y no está en esta lista.

Los archivos que una tool, una skill o un documento de criterio ya nombran no figuran acá. Los de abajo no los nombra ninguno: el destino dicho es el que encontré al armar la lista; «a confirmar» es que no lo verifiqué contra el documento.

| Archivo | Qué es | Destino |
|---|---|---|
| `441-cola-evitables.md` | qué preguntas de la cola de revisión se pueden evitar sin perder respuestas (perfil por país, las que se cierran solas, los subtipos de verificar) | ninguna compuerta (todas por debajo del 98 %); lo que se cierra solo ya se cierra antes de que alguien lo lea; la ventana del perfil ya existe (punto 441, cerrado; punto 449) |
| `440-revisores-gratis.md` | qué encuentran hoy y cuánto tardan 15 reglas de eslint, los imports sin uso, los ciclos y los exports sin uso sobre tools/ | 14 reglas y los imports sin uso quedaron en `audit.js`; TypeScript, knip y madge se probaron y no se dejaron (punto 440, cerrado) |
| `245-inventario-docs.md` | cambios de documentos de la fase 2 del esquema JSON | aplicado; archivable |
| `339-inventario.md` | inventario del paso 1 de «el pipeline sabe el deporte» | aplicado, `Admin/PIPELINE.md` «Un deporte nuevo»; archivable |
| `339-medir-coma.mjs` | script de la medición de `339-condicion-coma.md` | acompaña a esa medición |
| `auditoria-codigo-docs-2026-10-20.md` | auditoría de rutina, ejes `codigo` y `docs` | sus hallazgos pasaron al TODO; archivable |
| `boceto-vigilar-portal-316.md` | boceto sin programar para vigilar un portal por mes | vigente hasta que se decida |
| `caja-deuda-ia-sonnet.txt` | salida cruda de caja y deuda con Sonnet | `Admin/PIPELINE.md`, «Caja y deuda» (el escalón 2 usa Sonnet); archivable |
| `crawl4ai-noruega-lista.md` | prueba chica de Crawl4AI en el regulador noruego; Guido eligió no instalarlo | falta la línea en `HALLAZGOS-pipeline.md` |
| `extraer-opus.txt`, `extraer-sonnet.txt` | salidas crudas de extraer con cada modelo | `HALLAZGOS-pipeline.md`, «Sonnet en vez de Opus en extraer»; archivables |
| `extraer-verificar-cargado-vs-opus.txt`, `extraer-verificar-cargado-vs-sonnet.txt` | salidas crudas de extraer y verificar contra lo cargado, con cada modelo | `HALLAZGOS-pipeline.md`, «Sonnet en vez de Opus en extraer»; archivables |
| `informes-etapa6-italia/` | informes de la etapa 6 (verificar) de Italia | a confirmar |
| `informe-260-caja-deuda-sin-documento-nuevo.md` | informe de solo lectura de caja y deuda por documento | a confirmar |
| `localizar-sonnet.txt` | salida cruda de localizar con Sonnet | `HALLAZGOS-pipeline.md`, «Sonnet en vez de Opus en localizar»; archivable |
| `perimetro-a2-lista.txt`, `perimetro-a2-medicion-recorte-232e.txt`, `perimetro-a2-medicion-resultado.txt`, `perimetro-a2-jev-medicion.txt` | salidas crudas de las mediciones del paso A2 del perímetro | `HALLAZGOS-pipeline.md`, «Achicar el texto del paso A2» y «Sonnet en vez de Opus en perimetro-a2»; archivables |
| `prueba-batch.txt` | salida cruda de una prueba de la Batch API | `Admin/PIPELINE.md`, «El lote con la Batch API»; archivable |
| `stirling-vs-tesseract-vs-mistral.md` | Stirling PDF contra Tesseract y Mistral: no reemplaza a Mistral | falta la línea en `HALLAZGOS-pipeline.md` |
| `x2-voz-local-escaneos.md` | una voz local (OCR) para respaldar las cifras de un escaneo: no entra | falta la línea en `HALLAZGOS-pipeline.md` |
| `test-mistral-gemini-escaneos.md` | Mistral contra Gemini en escaneos | a confirmar (`Admin/PIPELINE.md`, «Documentos fuente») |
| `test-motores-lista.txt`, `test-motores-resultados.jsonl` | lista y salida cruda del test de tres motores de transcripción | resumen en `test-motores-resultados.md` |
| `test-proponer-carga.jsonl` | salida cruda de `test-proponer-carga.md` | acompaña a esa medición |
| `companies-house-ixbrl.md` | cuántos clubes británicos presentan sus cuentas en iXBRL en Companies House (9 de 36; los grandes, PDF) | falta una descarga de 3 archivos para saber si `xhtml-aarsrapport.mjs` los lee (ok de Guido) |
| `318-open-notebook.md`, `320-browser-use.md`, `321-higgsfield-mcp.md`, `322-zapier-omniroute.md`, `349-herramientas.md` | herramientas externas revisadas sin instalar nada (Open Notebook, Browser Use, Higgsfield MCP, Zapier MCP y OmniRoute, OpenSEO, Book to Skill, Open Generative AI) | ninguna entra; archivables |
| `350-uso-categorias.txt` | salida cruda de `350-uso-categorias.mjs` (uso de cada categoría por club) | acompaña a esa medición |
| `371-compuerta-personal.mjs`, `371-compuerta-personal.txt` | la compuerta de plausibilidad del costo de personal (15 % de los ingresos) contra los 9 `staffCost` cargados: rechazaría 0 de 9 | aplicada en `caja-deuda.mjs`; archivables |
| `373-bytes-leidos.mjs` | cuántos bytes lee una sesión que toma el mismo punto de Pipeline, antes y después del mapa de código | aplicado (`fos mapa`, `Admin/CONTRATO-ETAPAS.md`); archivable |
| `escalon0-estado-vs-notas.md` | cuánto del costo de localizar y extraer es el estado de resultados | a confirmar |
| `246-ids.md`, `246-ensayo.txt` | diseño y ensayo de renombrar ids estables (`<slug>-<iso2>`, 41 ids) | aplicado (ids con país, `data/club-aliases.js`); archivables |
| `317-supabase.md`, `317-supabase/` | Supabase como espejo de lectura (experimento descartable: `exportar.mjs`, `auditorias.sql`) | quedó como la pestaña «Mi cuenta» (`Admin/ESTADO.md`, «Sitio, publicación y analytics»); archivables |
| `350-categorias-en-vano.md`, `350-subsidios-en-otros-ingresos.mjs` | relevamiento de categorías sin uso y barrido de etiquetas de subsidios en Otros ingresos | alimentó el 372 (revisión de etiquetas de subsidios); archivables |
| `test-altas-claude.md` | registro de altas y Claude por API para las preguntas del alta (tres cambios en `alta-club.mjs`) | aplicado (`Admin/PIPELINE.md`, alta de un club); archivable |
| `test-jev-resultados_lado_ej_otrosclubes.md` | backtest de la confiabilidad de Jev contra 3.975 rubros ya cargados (`jev-categorizar.mjs --backtest`) | lo usan la propuesta de categorías y `fos cola-historial categoria`; vigente |
