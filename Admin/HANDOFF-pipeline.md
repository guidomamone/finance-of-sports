# HANDOFF: el pipeline de PDF a club cargado (sesiones del 2026-09-29 y 2026-09-30, actualizado al cierre del 2026-09-30)

Documento para que una sesión NUEVA de Claude Code entienda dónde quedó este trabajo sin leer el historial. Leé esto, después
`Admin/MAPA-DE-TOOLS.md` (qué es cada archivo de `tools/`) y las entradas de `Admin/CHANGELOG.md` desde la Versión 305 (decisiones y bugs, con
causa raíz; la 306 es la última). Después `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/TODO.md` (to-do 108) como siempre.

## El objetivo (en una frase)

Que un solo comando lleve un PDF de un club desde la transcripción hasta el ejercicio **cargado en el sitio**, sin gastar tokens de sesión,
barato en dólares de API y sin errores en los números. Hoy el comando llega hasta la categorización con Jev (etapa 5 de 7); las etapas 6-7
(cargar en `data/<club>-data.js` y commit local) todavía no existen. Solo se automatiza la carga de un año nuevo de un club que ya existe y
sin decisiones abiertas; lo que requiera criterio se frena y lo resuelve una sesión.

## Estado de git

- Rama **`inventario-transcripciones`**, sin ningún push. `main` local está ~50 commits por delante de `origin/main`. Cada push a `main`
  dispara un deploy de Netlify (plan gratis, ~25 por mes): **el push lo hace solo Guido, con permiso explícito**.
- `git status` se ensucia mientras Guido corre lotes: los logs de `Admin/*/resultados.jsonl`, `Admin/transcripciones-*.jsonl` y varios `.md`
  de `Clubes/` cambian solos. Revisá antes de commitear y **commiteá el código por separado de ese lote**.

## Lo que quiere Guido

1. **Un solo comando** de punta a punta: `node tools/pipeline.mjs --ejecutar --limit 50 --concurrencia 4`. Lo corre Guido en su terminal.
2. **No gastar tokens de sesión**: lo repetible va en scripts. Gastar dólares de API (Mistral, Gemini, Claude por API, Jev) está bien, pero
   quiere que sea lo más barato posible sin perder calidad. Las cuentas tienen recarga automática. Después de cada corrida, mirá los
   resultados vos (`Admin/transcripciones-estado.jsonl`, los `.jev.json`); no le pidas que pegue nada.
3. **Pilotos chicos y controlados** (metodología, ver abajo): pocos PDFs, de punta a punta, analizar cada etapa, arreglar los bugs en el
   script (nunca a mano) y repetir hasta que estén cómodos. Recién ahí se construye lo posterior a Jev, con herramientas gratis cuando se pueda.
4. **No categorizar rubros vos en la sesión.** Eso lo hace Jev; lo dudoso se deriva a Claude por API, y lo abierto a `Admin/dudas-por-club.md`.
   No armar carpetas de "revisión a futuro": buscar la solución ahora.
5. Aceptado: confianza de Jev >= 0,90; subir un club-año con solo el total de ingresos; los `sin-rubros` quedan como fuente.
6. **Comentarios largos en el código** que expliquen qué hace cada cosa (para sesiones nuevas). Cada herramienta tiene cabecera: mantenela.
7. La producción no se toca hasta que el pipeline esté pulido ("producción se va a solucionar cuando pushee"): una diferencia contra
   producción no es automáticamente un error del pipeline ni de producción (ver "Trampas de medición").

## Cómo funciona (el detalle está en la cabecera de `tools/pipeline.mjs`)

`pipeline.mjs` -> regenera el registro (`inventario-transcripciones.mjs`) -> elige documentos -> `resolver-inventario.mjs` (transcribe y valida)
-> `prepare-onboarding.mjs` + `filas-rubro.mjs` (tablas, sumas, filas limpias con su lado) -> `glosar-rubros.mjs` (glosa en español) ->
`jev-categorizar.mjs --listos` (categorías). Estados de un PDF: `sin-md`, `sin-tablas`, `pendiente-segunda-voz`, `revisar`, `reintentar`,
`no-es-pdf`, `listo`, `listo-para-jev`, `sin-rubros`, `cargado`. Registro por PDF: `Admin/transcripciones-estado.jsonl` (se regenera);
historial: `Admin/transcripciones-verificaciones.jsonl` (solo se agrega). Cada página reemplazada queda con su motor (`proveniencia`); el `.md`
reemplazado queda en `<nombre>.previo-*.md` (gitignoreado).

Transcripción/validación: Mistral OCR transcribe (~$0,004/pág.). PDF con texto: los números de cada página se comparan gratis contra el texto
del PDF y Claude por API solo mira las páginas dudosas. Escaneo o texto roto: Gemini como segunda voz; Claude solo en las páginas que difieren;
voto entre voces, cuarta voz (Mistral), aritmética, y "Claude con reserva" como último recurso. **Si Gemini rechaza el documento entero
(RECITATION), se prueba página por página** (`voiceGeminiPerPage`) y Claude recibe solo las rechazadas. `tools/reparar-pdf.mjs` arregla PDFs
dañados o con imágenes gigantes antes de gastar API.

## Lo hecho el 2026-09-30 (Versión 306, todo en el CHANGELOG con detalle)

- `reparar-pdf.mjs` (PDF dañado / imagen de más de 8000 px / truncado), Gemini página por página, `filas-rubro.mjs` (descarta filas que no son
  rubros, deduce el lado por la estructura), `glosar-rubros.mjs` (traducción para que Jev encuentre ejemplos en idiomas que el sitio no tiene).
- Bugs del pipeline arreglados: la etapa 5 usaba el registro viejo; `--repreparar` no repreparaba; "Rendimentos e gastos" no se reconocía.

## Números medidos (para no volver a medirlos)

- Gasto acumulado registrado: Mistral $119,6 (29.889 págs.), Claude API $53,7, Gemini $13,6. Lote típico: $0,25 a $0,35 por documento; con Gemini por
  página, un documento de 16 págs. que Gemini rechaza entero baja de ~$0,30-0,45 a ~$0,14.
- Gemini rechaza documentos enteros por RECITATION (124 de 141 fallos), pero por página acepta: Ituano 7/8, Alverca 21/29, Start 17/17, Sandefjord 16/16.
- Resoluciones de página registradas (178 documentos): mayoría 810, texto del PDF 164, **Claude con reserva 210**, sumas 2, parche 4.
- Tesseract como tercera voz gratis: **no sirve** en escaneos malos (Alverca: texto ilegible). Falla con rutas largas; correrlo con rutas relativas.
- Sumas genéricas (fila = suma de las contiguas de arriba) sobre las páginas de Alverca: la lectura de Claude cierra más sumas que la de Mistral
  en las 4 páginas con tablas que se compararon (6/1, 3/2, 6/4, 4/2).
- Jev, backtest sobre 3.975 rubros ya cargados (`Admin/test-jev-resultados*.md`): sin ayuda 69,5%; con lado 74,2%; lado + 8 ejemplos 86,6% (95,9% en >= 0,90);
  ejemplos solo de otros clubes 83,0% (94,4%). **Acierto por país (ejemplos de otros clubes): HR 98%, DK 95%, BE 93%, DE 91%, GB 90%, CO 90%, ES 89%, AR 74%, BR 80%.**
  Más historia NO mejora a Jev: Argentina y Brasil tienen más rubros cargados y peor acierto (agrupaciones curadas de cada club). Los errores con confianza alta
  son casi siempre catch-alls (`other_income` / `lump_football_operations`, `admin_general_expense` / `other_expenses`) o convenciones de un club.
- Jev en el pipeline real (rubros sacados de `.md` sin curar): solo ~30% con confianza >= 0,90 antes de las mejoras. Causas medidas: 27% de las etiquetas eran
  números sueltos (Jev les daba categoría con confianza alta), subtotales/resultados/metadatos, 80% de filas sin lado, ejemplos buscados por palabras que
  no existen en idiomas nuevos. Con filtro + lado por estructura + glosa: 39,5% sobre 7 documentos (sin verdad contra la cual medir acierto en documentos nuevos).
  Ofrecerle a Jev una opción `no_es_rubro` no ayudó.
- Piloto de 9 documentos (uno por país): 9 listos; 5 quedaron `sin-rubros` (2 por ser documentos sin estado de resultados: notas o certificación; 1 balance
  solo, Alanyaspor; Alverca era un bug ya arreglado; Excelsior tiene 4 rubros). Alverca es un escaneo malo: 17 de 29 páginas quedaron "con reserva".
- Carga automática (`tools/proponer-carga.mjs --backtest --mistral-fresco --limit 40`): dinero bien ubicado por categoría 67% ingresos / 60-62% gastos. Es bimodal:
  ~20 ejercicios entre 90 y 100%, y otros en 0-5% porque se elige mal la tabla (el estado de resultados resumido en vez de la nota que abre el ingreso; Arsenal,
  Bayern, Werder, Fulham). **Todavía NO es viable dejarla escribir.**

## Trampas de medición

- "Total impreso = `officialTotalRevenue` de producción" da 14% y **no es un bug del detector**: en 23 de 35 ejercicios ese número no está impreso en el documento
  (definiciones curadas: Dortmund usa el HGB de la KGaA y no el consolidado IFRS; Fluminense suma las líneas ordinarias sin excepcionales; Colo-Colo difiere 0,6%).
  No usar esa vara. Usar: consistencia entre las filas de ingresos y algún total impreso del mismo documento.
- Confianza de Jev no es acierto. Para acierto hace falta una verdad (el backtest sobre producción); en documentos nuevos solo hay confianza.
- El año que sale del nombre del archivo miente a veces (fechas ISO se leían como 2012). `onboard.mjs --all` salta documentos con briefing al día;
  el registro usa `ONBOARD_IGNORE_BRIEFING=1`.

## Qué falta (en orden)

1. **Otro piloto de ~10 PDFs nuevos** con todo lo de hoy (Gemini por página, filas limpias, glosa) y ver: costo por documento, páginas "con reserva", % de Jev >= 0,90,
   falsos positivos del chequeo gratis. Repetir hasta estar cómodos.
2. **Bajar el costo sin perder calidad:** (a) el chequeo contra el texto del PDF marca de más (Alverca: ~8 de 17 páginas dudosas eran prosa con fragmentos como "3000";
   Rio Ave: 13 de 19 dudas, 1 real): ignorar números cortos y páginas sin tablas al decidir qué es una duda; (b) usar la aritmética (sumas genéricas, ver arriba) como
   desempate gratis ANTES de mandar a "Claude con reserva" (hoy solo se usa con 3 voces y casi nunca cierra: 2 de 1.190); (c) revisar si el rehacer `sin-tablas` con
   Mistral ($119 acumulados) se puede acotar a las páginas de estados financieros; (d) `tools/gasto.mjs` que sume el gasto por API desde los `resultados.jsonl`.
3. **Bajar los errores:** (a) elegir la tabla de detalle correcta (estado de resultados vs. nota que abre el ingreso) usando un total impreso como ancla; (b) validar
   consolidado vs. individual con el alcance del año anterior; (c) fecha del ejercicio leída del CONTENIDO del PDF contra el nombre del archivo; (d) balance
   (activo = pasivo + patrimonio) y aritmética del estado de resultados; (e) dejar las páginas "con reserva" cerradas por sumas siempre que sea posible.
4. **Jev:** derivar los rubros < 0,90 a Claude por API con contexto del club (piso 3 del to-do 99); probar mandarle contexto de las filas vecinas y el encabezado del bloque;
   medir acierto real corriendo el backtest con las mismas mejoras de entrada (filas limpias + glosa), no solo la confianza.
5. **Etapa 6 (cargar):** especificación en el to-do 108 de `Admin/TODO.md` (esquema de `data/<club>-data.js`, reglas mecánicas, orden de regeneración, trampas). Solo año
   nuevo de club existente; tipo de cambio con `tools/lookup-fx-close.js` (local); si algo requiere criterio, frenar y decirlo. Escritura con reversión automática si
   `audit.js` (0 P0/P1) o `auditAll()` fallan. Commit local; el push es de Guido. Solo cuando el piloto esté pulido.
6. Ideas gratis todavía sin construir: tablas exactas desde el texto del PDF (`pdftotext -bbox`/`pdfplumber`); comparar la columna comparativa del año N con lo cargado
   del año N-1; clasificador local (TF-IDF + kNN sobre los 3.975 rubros) como segunda opinión gratis de Jev; embeddings multilingües para buscar ejemplos; duplicados de PDF por hash.

## Trampas que ya costaron tiempo

- Los `Syntax Error` de la terminal son de poppler leyendo PDFs dañados; están silenciados (`grep -v "^Syntax"`). `qpdf` devuelve 3 = éxito con advertencias; 2 = dañado.
  Un ".pdf" puede ser un HTML (`no-es-pdf`) o estar truncado (PEC Zwolle: hay que volver a bajarlo; el link está en `fuentes/<País>/<Club>.md`).
- Documentos de más de 40 páginas: Gemini y Claude van por tramos de 20; los de más de 100 páginas quedan para el final (`--max-paginas 0` los incluye).
- Un motor que devuelve menos páginas que las pedidas ya no falla el documento: se reparte el lote en mitades.
- No editar `.claude/skills/*/SKILL.md` sin proponerle el texto a Guido y esperar su ok (regla de memoria del proyecto).
- Hay otra sesión ("To-dos") que puede editar `Admin/TODO.md`: leé la versión del disco antes de tocarlo.

## Cómo retomar

```bash
cd ~/Claude/Projects/finance-of-sports && git switch inventario-transcripciones
node tools/pipeline.mjs --resumen                                          # estado del inventario, sin gastar nada
node tools/pipeline.mjs --lista Admin/piloto-10.txt --limit 10             # ensayo (estimación de costo, sin API)
node tools/pipeline.mjs --ejecutar --lista Admin/mi-piloto.txt --limit 10 --concurrencia 3 2>&1 | grep -v "^Syntax"   # lo corre Guido
```

Para armar un piloto: elegir ~10 PDFs `sin-md` (de `Admin/transcripciones-estado.jsonl`), uno por país, de 8 a 40 páginas, y guardarlos en un `.txt` (una ruta por línea).
