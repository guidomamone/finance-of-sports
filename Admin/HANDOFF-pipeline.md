# HANDOFF: el pipeline de PDF a club cargado (sesiones del 2026-09-29 y 2026-09-30, actualizado al cierre del 2026-09-30, Versión 319)

Documento para que una sesión NUEVA de Claude Code entienda dónde quedó este trabajo sin leer el historial. Leé esto, después
`Admin/MAPA-DE-TOOLS.md` (qué es cada archivo de `tools/`) y las entradas de `Admin/CHANGELOG.md` desde la Versión 305 (decisiones y bugs, con
causa raíz; la 319 es la última). Después `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/TODO.md` (to-dos 108, 109, 112) como siempre.

**LO PRIMERO: `node tools/estado.mjs`** (gratis, instantáneo; `--actualizar` regenera el registro antes). Es el tablero que pidió Guido: cada PDF del
inventario en su etapa (1 conseguir, 2 transcribir, 3 validar, 4 preparar, 5 categorizar, 6 cargar, 7 en el sitio), también los estados en 0, con
qué le falta, con qué comando se avanza y cuánto cuesta. El código está en `tools/estado.mjs` (cabecera explicada).

## El objetivo (en una frase)

Que un solo comando lleve un PDF de un club desde la transcripción hasta el ejercicio **cargado en el sitio**, sin gastar tokens de sesión,
barato en dólares de API y sin errores en los números. Hoy el comando llega hasta la categorización (etapa 5: Jev y Claude por API); la etapa 6
(cargar en `data/<club>-data.js`) está EN CONSTRUCCIÓN (ver "Qué falta" 1) y la 7 (commit local) no existe. Solo se automatiza la carga de un año nuevo de un club que ya existe y
sin decisiones abiertas; lo que requiera criterio se frena y lo resuelve una sesión.

## Estado de git

- Rama **`inventario-transcripciones`**, sin ningún push; `main` no tiene nada que la rama no tenga (el merge es directo; Guido dijo que no hace falta
  hacerlo). `main` local está ~50 commits por delante de `origin/main`. Cada push a `main`
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
   Lo que Claude resuelve con >= 0,80 queda en `Admin/categorias-aprendidas.jsonl` (`tools/memoria-categorias.mjs`): el año siguiente del mismo club lo toma
   como precedente gratis (>= 0,90) y Jev lo ve como ejemplo. Lo cargado en el sitio siempre gana.
   Vocabulario de todas las tools (títulos de estados, ingresos, gastos, totales, flujo, patrimonio) en 29 idiomas: `tools/vocabulario.mjs`.
   Período de cada documento leído del contenido (anual calendario / temporada, trimestral, semestral...): `tools/periodo.mjs`, campo `periodo` del registro.
5. **Altas de clubes nuevos (fuera del pipeline por ahora):** `alta-club.mjs --todos` escribe `Admin/altas-club.jsonl`; `--claude` resuelve preguntas con cita
   verificada; `pipeline.mjs --resumen` lo muestra.

**Dónde está cada cosa (Versión 317):** `Clubes/<País>/<Club>/` = solo el PDF y su `.md`; todo lo que las tools derivan (rubros, briefing, Jev, Claude, otras voces, respaldos) vive en `Generados/<País>/<Club>/` con el mismo nombre base (`tools/rutas.mjs`, gitignoreado).

Estados de un PDF: `sin-md`, `sin-tablas`, `pendiente-segunda-voz`, `revisar`, `reintentar`, `no-es-pdf`, `listo`, `listo-para-jev`, `sin-rubros`, `cargado`.
Registro: `Admin/transcripciones-estado.jsonl` (se regenera); historial: `Admin/transcripciones-verificaciones.jsonl` (solo se agrega). Costo real:
`node tools/gasto.mjs`.

**Piloto C (2026-09-30, `Admin/piloto-c.txt`):** 10 PDFs, 9 con rubros categorizados; ~US$ 0,20 por documento (texto $0,08-0,18, escaneo $0,13-0,21, Real Madrid
2005 ~$1); 82% de los rubros categorizados solos. Bugs encontrados y arreglados en las Versiones 308-310.

## Lo hecho (Versiones 306-319, todo en el CHANGELOG con números y causa raíz)

- 306: Gemini página por página, reparar-pdf, filas-rubro, glosa. 307: validación paga solo en páginas con números y dudosas (chequeos gratis),
  Claude después de Jev, alta-club, tabla por ancla, gasto.mjs. 308: la etapa 5 solo toca la corrida; huellas. 309: una sola regla carpeta -> club
  (11 carpetas caían en otro club; 316 -> 388 cargados reales). 310: lotes de Claude de 8 páginas. 311: registro de altas + Claude con cita verificada.
  312: estados sin título en la tabla, etiqueta en la 2ª columna, flujo/patrimonio fuera. 313: sumas horizontales deciden páginas "con reserva"
  (10 corregidas). 314: período leído del contenido. 315: 25 ligas y 11 países al catálogo (decisión de Guido), liga por "categoría al cierre".
  316: vocabulario en 29 idiomas. 317: derivados a `Generados/`. 318: `tools/estado.mjs`, `tools/` fuera del deploy. 319: memoria de categorías.
- Pilotos: C (`Admin/piloto-c.txt`) y D (`Admin/piloto-d.txt`), y C+D recategorizados con el vocabulario nuevo (`Admin/piloto-cd.txt`): ~US$ 0,20 por
  documento (texto $0,08-0,18, escaneo $0,13-0,21, escaneo malo ~$1); 76% de los rubros categorizados solos; 160 de 726 filas eran `no_es_rubro`
  (Claude las descarta pagando: ver "Qué falta" 2).

## Números medidos (para no volver a medirlos)

- Gasto acumulado registrado: Mistral $119,6 (29.889 págs.), Claude API $53,7, Gemini $13,6. Lote típico: $0,25 a $0,35 por documento; con Gemini por
  página, un documento de 16 págs. que Gemini rechaza entero baja de ~$0,30-0,45 a ~$0,14.
- Gemini rechaza documentos enteros por RECITATION (124 de 141 fallos), pero por página acepta: Ituano 7/8, Alverca 21/29, Start 17/17, Sandefjord 16/16.
- Resoluciones de página registradas (178 documentos): mayoría 810, texto del PDF 164, **Claude con reserva 210**, sumas 2, parche 4.
- Tesseract como tercera voz gratis: **no sirve** en escaneos malos (Alverca: texto ilegible). Falla con rutas largas; correrlo con rutas relativas.
- Sumas genéricas (fila = suma de las contiguas de arriba) sobre las páginas de Alverca: la lectura de Claude cierra más sumas que la de Mistral
  en las 4 páginas con tablas que se compararon (6/1, 3/2, 6/4, 4/2).
- Jev, backtest sobre 3.975 rubros ya cargados (`Admin/tests/test-jev-resultados*.md`): sin ayuda 69,5%; con lado 74,2%; lado + 8 ejemplos 86,6% (95,9% en >= 0,90);
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

1. **ETAPA 6 (cargar), en construcción por un subagente al cierre de esta sesión.** Construye `tools/cargar.mjs` (año nuevo de club que YA existe;
   `--propuesta` / `--escribir` con reversión si `audit.js` da P0/P1) y la prueba de punta a punta: backtest sobre años ya cargados (borrados en un git
   worktree y reconstruidos) y años nuevos del piloto C+D (Vejle 2014, PSV 2019-20, Dinamo Zagreb 2019, Los Andes 2009-10, Real Madrid 2005-06).
   Informe: `Admin/tests/test-cargar.md`. **Lo más importante de ese informe es la lista de cosas de etapas anteriores que no sirven para cargar**
   (pedido de Guido: "cuando introducimos un paso nuevo descubrimos que algo hecho antes no sirvió"). La sesión siguiente: si el archivo existe,
   revisarlo, verificar `node --check tools/cargar.mjs` y `node tools/audit.js`, commitear, y arreglar en las tools lo que el informe liste.
   Reglas que ya están decididas para la etapa 6: no cargar documentos con `periodo.tipo` distinto de 'anual' ni con `periodo.nombreNoCoincide`;
   excluir filas `no_es_rubro`; cerrar sumas contra los totales impresos antes de escribir (hay totales con su desglose abajo que entran dos veces:
   Groningen "Personeelskosten"); las páginas "con reserva" se cierran con sumas; el alta de un club nuevo va en el mismo commit que su primer año.
2. **Filas que no son rubros:** en el piloto C+D, 160 de 726 filas llegaron a Claude y él las marcó `no_es_rubro` (subtotales, desgloses ya incluidos,
   partidas de balance; Rubin Kazan 2025 34 de 70, Polissya 19 de 43). Mejorar `filas-rubro.mjs` / `pipeline.mjs` (etapa 3) con esos ejemplos.
3. **Decisiones de Guido antes de la primera alta escrita** (to-do 112): 5 perímetros consolidados (Inter, Atalanta, Go Ahead Eagles, Başakşehir,
   Trabzonspor), 12 preguntas de `node tools/alta-club.mjs --dudas`, series de fx de EUR/DKK/GBP/SEK (no existen), `FX_PLAUSIBLE_RANGE` de COP y BRL.
4. **Escaneos:** es donde queda el costo. Próximo chequeo gratis: la columna comparativa ENTRE documentos del mismo club (año N-1 impreso en el documento
   N contra el documento N-1), aunque ninguno esté en producción.
5. **Japón:** 14 documentos y ninguno con estado de resultados reconocido (Admin/tests/test-vocabulario.md).
6. **Incoherencias de producción** (to-do 101): parte del "error" de la categorización automática es la vara. Las decide Guido.
7. Ideas gratis sin construir: tablas desde el texto del PDF (`pdftotext -bbox`), clasificador local como segunda opinión de Jev, duplicados de PDF por hash.

## Trampas que ya costaron tiempo

- Los `Syntax Error` de la terminal son de poppler leyendo PDFs dañados; están silenciados (`grep -v "^Syntax"`). `qpdf` devuelve 3 = éxito con advertencias; 2 = dañado.
  Un ".pdf" puede ser un HTML (`no-es-pdf`) o estar truncado (PEC Zwolle: hay que volver a bajarlo; el link está en `fuentes/<País>/<Club>.md`).
- Documentos de más de 40 páginas: Gemini y Claude van por tramos de 20; los de más de 100 páginas quedan para el final (`--max-paginas 0` los incluye).
- Un motor que devuelve menos páginas que las pedidas ya no falla el documento: se reparte el lote en mitades.
- No editar `.claude/skills/*/SKILL.md` sin proponerle el texto a Guido y esperar su ok (regla de memoria del proyecto).
- Hay otra sesión ("To-dos") que puede editar `Admin/TODO.md`: leé la versión del disco antes de tocarlo.
- **Procesos en segundo plano que quedan colgados:** un loop `while pgrep -f X; do sleep; done` se encuentra a SÍ MISMO (su propia línea de
  comando contiene X) y nunca termina (pasó con `fetchall.mjs`, 4 horas). Para esperar un proceso usar su PID, no `pgrep -f`. Y cuando Guido pregunta
  por tareas en segundo plano, buscar también loops de shell (`ps -eo pid,ppid,command | grep sleep`), no solo `node`/`python`.
- `node tools/estado.mjs` mientras corre el pipeline muestra una foto a mitad de camino (el pipeline regenera el registro al arrancar).
- `--max-paginas` (100 por defecto) también deja afuera de la preparación GRATIS a las memorias largas: para preparar, `--max-paginas 0`.
- `alta-club.mjs --todos` sin `--claude` descartaba las respuestas de Claude ya pagadas (arreglado: viajan en `claudeAnterior`); para recalcular
  reusándolas sin gastar: `--todos --claude --tope-usd 0`.
- Un cambio de listas de rubros deja desactualizadas las categorías (huellas): la próxima categorización las rehace y cuesta API (~US$ 0,04 por documento).

## Cómo retomar

```bash
cd ~/Claude/Projects/finance-of-sports && git switch inventario-transcripciones
node tools/estado.mjs                                                      # EL TABLERO: cada PDF en su etapa, qué falta, cuánto cuesta (gratis)
node tools/pipeline.mjs --lista Admin/piloto-d.txt --limit 10              # ensayo (estimación de costo, sin API)
node tools/pipeline.mjs --ejecutar --lista Admin/mi-piloto.txt --limit 10 --concurrencia 3 2>&1 | grep -v "^Syntax"   # lo corre Guido
node tools/gasto.mjs --desde 2026-09-30 --lista Admin/mi-piloto.txt         # cuánto costó, por documento (gratis)
node tools/alta-club.mjs "<ruta del PDF>"                                  # qué haría falta para dar de alta el club (propuesta, no escribe)
```

Para armar un piloto: elegir ~10 PDFs `sin-md` (de `Admin/transcripciones-estado.jsonl`), uno por país, de 8 a 40 páginas, y guardarlos en un `.txt` (una ruta por línea).
