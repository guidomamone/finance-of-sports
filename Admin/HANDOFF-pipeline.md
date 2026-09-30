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

## Cómo funciona (el detalle etapa por etapa, con números medidos, está en la cabecera de `tools/pipeline.mjs`)

0. **De qué club es cada carpeta:** `carpetas-clubes.mjs` (cita en `data/<id>-data.js`, o nombre igual dentro del mismo país). `audit.js` da P1 si una carpeta es ambigua.
1. **Transcribir:** Mistral, documento entero (queda como documentación).
2. **Validar solo lo que importa:** `paginas-con-numeros.mjs` descarta la prosa; `chequeos-gratis.mjs` valida gratis con el texto del PDF, sumas, año anterior y
   balance; solo las páginas `dudosa` van a Gemini / Claude (Claude en lotes de hasta 8 páginas).
3. **Preparar:** tablas, columna de importes, filas que no son rubros fuera, lado por estructura -> `<md>.rubros.json`.
4. **Categorizar, solo los documentos de la corrida:** precedente del club -> Jev >= 0,90 -> Claude por API >= 0,80 -> `<md>.categorias.json`. Huellas:
   si la entrada cambia, la salida se rehace sola.
5. **Altas de clubes nuevos (fuera del pipeline por ahora):** `alta-club.mjs --todos` escribe `Admin/altas-club.jsonl`; `--claude` resuelve preguntas con cita
   verificada; `pipeline.mjs --resumen` lo muestra.

Estados de un PDF: `sin-md`, `sin-tablas`, `pendiente-segunda-voz`, `revisar`, `reintentar`, `no-es-pdf`, `listo`, `listo-para-jev`, `sin-rubros`, `cargado`.
Registro: `Admin/transcripciones-estado.jsonl` (se regenera); historial: `Admin/transcripciones-verificaciones.jsonl` (solo se agrega). Costo real:
`node tools/gasto.mjs`.

**Piloto C (2026-09-30, `Admin/piloto-c.txt`):** 10 PDFs, 9 con rubros categorizados; ~US$ 0,20 por documento (texto $0,08-0,18, escaneo $0,13-0,21, Real Madrid
2005 ~$1); 82% de los rubros categorizados solos. Bugs encontrados y arreglados en las Versiones 308-310.

## Lo hecho el 2026-09-30 (Versión 306, todo en el CHANGELOG con detalle)

- `reparar-pdf.mjs` (PDF dañado / imagen de más de 8000 px / truncado), Gemini página por página, `filas-rubro.mjs` (descarta filas que no son
  rubros, deduce el lado por la estructura), `glosar-rubros.mjs` (traducción para que Jev encuentre ejemplos en idiomas que el sitio no tiene).
- Bugs del pipeline arreglados: la etapa 5 usaba el registro viejo; `--repreparar` no repreparaba; "Rendimentos e gastos" no se reconocía.

## Lo hecho el 2026-09-30, segunda sesión (Versión 307, detalle y números en el CHANGELOG)

- Mistral sigue transcribiendo TODO el documento (queda como documentación, decisión de Guido). La validación paga cambió: `paginas-con-numeros.mjs` descarta la
  prosa (58% de páginas elegidas, 99,7% de los importes de producción cubiertos) y `chequeos-gratis.mjs` valida gratis lo que el texto del PDF, las sumas, el año
  anterior en producción o el balance respaldan (163/163 errores reales siguen yendo a pagar; ~49% de ahorro). Gemini y Claude solo ven las páginas `dudosa`.
- Categorización en escalones: precedente -> Jev >= 0,90 -> Claude por API >= 0,80 (`categorizar-claude.mjs`, etapa 5b). Backtest: 80,2% automático con 94,5%.
- `alta-club.mjs` (club nuevo y metadatos del año, sin tokens), `proponer-carga --tabla ancla-listas`, lado ingreso/gasto corregido, `gasto.mjs`.
- Medido: pdftotext NO sirve para elegir páginas (23% de PDFs sin capa usable; con el .md de Mistral cubre más). De los 3.042 PDFs pendientes, ~73% son de clubes
  que no están en el sitio (141 clubes reales, no 205: ver to-do 110).

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

1. **Piloto D** (`Admin/piloto-d.txt`): el primero con todo lo de las Versiones 307-311 junto. Prueba a propósito: carpetas que antes caían en otro club
   (Porto, Inter, Rubin Kazan), un escaneo denso (lotes de Claude de 8 páginas), estados de resultados en cirílico y turco, países con series de fx nuevas.
   Mirar lo mismo que en el C: `node tools/gasto.mjs --lista Admin/piloto-d.txt`, páginas validadas gratis / dudosas, reservas, escalón de cada categoría.
2. **Escaneos:** es donde queda el costo (68 de 104 documentos medidos, $29,67 de $38,98). Próximo chequeo gratis a probar: la columna comparativa ENTRE documentos del
   mismo club (año N-1 impreso en el documento N contra la columna del año del documento N-1), aunque ninguno esté en producción (series: Charleroi, Standard, Randers,
   Fluminense).
3. **Errores que quedan en la carga** (`Admin/test-eleccion-tabla.md`): gastos no mejoran con el ancla (producción usa la apertura por función, el ancla abre la nota por
   naturaleza); consolidado e individual se cargan los dos cuando el documento trae ambos (Bayern); detalle en prosa (Werder); 12 de 74 ejercicios con <= 10% de
   ingresos bien ubicados. Todavía NO es viable dejar escribir a la carga.
4. **Antes de la primera alta escrita por script** (to-do 112): 5 perímetros consolidados para que decida Guido, series de fx de EUR/DKK/GBP/SEK,
   `FX_PLAUSIBLE_RANGE` de COP y BRL.
5. **Incoherencias de producción** (to-do 101): parte del "error" de la categorización automática es la vara. Las decide Guido/una sesión, no el pipeline.
6. **Etapa 6 (cargar):** especificación en el to-do 108 de `Admin/TODO.md`. Piezas ya hechas: `proponer-carga.mjs` (qué filas), `categorizar-claude.mjs` (categorías),
   `alta-club.mjs` (club nuevo y metadatos del año; el alta tiene que ir en el mismo commit que la carga del primer año, si no el club aparece "Sin datos cargados").
   Escritura con reversión automática si `audit.js` (0 P0/P1) o `auditAll()` fallan. Commit local; el push es de Guido. Solo cuando el piloto esté pulido.
7. **Los `.jev.json` viejos** de los 438 documentos re-preparados el 2026-09-30 se hicieron sobre la lista de rubros anterior (antes de corregir el lado y la columna):
   hay que volver a correr Jev + Claude sobre ellos antes de usarlos (`node tools/pipeline.mjs --ejecutar --solo-preparar --repreparar --limit 0` y después la etapa 5).
8. Ideas gratis todavía sin construir: tablas exactas desde el texto del PDF (`pdftotext -bbox`/`pdfplumber`); clasificador local (TF-IDF + kNN) como segunda opinión
   de Jev; embeddings multilingües para buscar ejemplos; duplicados de PDF por hash.

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
node tools/gasto.mjs --desde 2026-09-30 --lista Admin/mi-piloto.txt         # cuánto costó, por documento (gratis)
node tools/alta-club.mjs "<ruta del PDF>"                                  # qué haría falta para dar de alta el club (propuesta, no escribe)
```

Para armar un piloto: elegir ~10 PDFs `sin-md` (de `Admin/transcripciones-estado.jsonl`), uno por país, de 8 a 40 páginas, y guardarlos en un `.txt` (una ruta por línea).
