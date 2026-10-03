> **ARCHIVADO el 2026-10-01 (Versión 327).** Es el HANDOFF del pipeline tal como estaba hasta la Versión 326. El vigente, corto, es `Admin/HANDOFF-pipeline.md`. Acá quedan la historia de los pilotos, los números medidos y las trampas viejas.

# HANDOFF: el pipeline de PDF a club cargado (sesiones del 2026-09-29 al 2026-10-01, actualizado al cierre del 2026-10-01, Versión 324)

> **SESIÓN NUEVA: empezá por la sección "EL PROCESO NUEVO" (más abajo) y por "Cómo arranca la próxima sesión" dentro de ella.** Lo de antes
> (etapas 3-4 por palabras clave) queda como historia y como lo que todavía usa `pipeline.mjs`.

Documento para que una sesión NUEVA de Claude Code entienda dónde quedó este trabajo sin leer el historial. Leé esto, después
`Admin/MAPA-DE-TOOLS.md` (qué es cada archivo de `tools/`) y las entradas de `Admin/CHANGELOG.md` desde la Versión 305 (decisiones y bugs, con
causa raíz; la 319 es la última). Después `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/TODO.md` (to-dos 108, 109, 112) como siempre.

**LO PRIMERO: `node tools/estado.mjs`** (gratis, instantáneo; `--actualizar` regenera el registro antes). Es el tablero que pidió Guido: cada PDF del
inventario en su etapa (1 conseguir, 2 transcribir, 3 validar, 4 preparar, 5 categorizar, 6 cargar, 7 en el sitio), también los estados en 0, con
qué le falta, con qué comando se avanza y cuánto cuesta. El código está en `tools/estado.mjs` (cabecera explicada).

## El objetivo (en una frase)

Que un solo comando lleve un PDF de un club desde la transcripción hasta el ejercicio **cargado en el sitio**, sin gastar tokens de sesión,
barato en dólares de API y sin errores en los números. Hoy el comando llega hasta la categorización (etapa 5: Jev y Claude por API); la etapa 6
(`tools/cargar.mjs`) existe y está probada, pero todavía frena casi todo por problemas de etapas anteriores (ver "Qué falta" 1); la 7 (commit local) no existe. Solo se automatiza la carga de un año nuevo de un club que ya existe y
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
8. **Cada vez que le propongas correr un script (un test, un lote), decile qué ETAPA se está tocando y PARA QUÉ** (qué se va a medir o
   destrabar), además del costo. Pedido de Guido, 2026-09-30: "no estoy entendiendo para qué hacés lo de los 159 documentos".
9. **Ejemplos concretos, no teoría.** Cada hallazgo o cada arreglo se muestra con casos reales del inventario (club, año, fila, importe,
   antes/después), y se MIRAN antes de afirmar algo. Pedido de Guido, 2026-09-30: "hacés todo muy teórico; si no fuera porque vi Racing,
   no te dabas cuenta" (el informe de la etapa 6 atribuía Racing 2012 a "escala por tabla", y la causa era que la plausibilidad comparaba
   contra la mediana de años en USD y en ARS con 15 años de inflación: ver "Qué falta" 1b).
10. **Siglas y referencias internas explicadas.** No asumas que sabe qué es "(b)" o "4.4": decí qué es en una frase.

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

## EL PROCESO NUEVO (diseñado con Guido el 2026-10-01, Versión 324): punta a punta, con cola humana. LEER ESTO PRIMERO.

Reemplaza a las etapas 3 (validar el documento entero) y 4 (elegir filas por palabras clave) de hoy. Por qué: la selección por palabras
reproduce los ingresos ya cargados en 7-11% de los años (ver "Test de la etapa 4 por grupo"); el test con IA por página llegó a 42% de
ingresos y 69% de gastos; y la investigación con fuentes (bancos, proveedores de datos, document AI) dice lo mismo: primero se ubica, después
se extrae, se verifica por script y lo dudoso va a una persona. **Las tools están construidas y probadas solo en lo gratis (ensayos y una
prueba de verificar.mjs con datos sintéticos). NINGUNA etapa con IA corrió todavía en este formato.** Guido pidió no correr pilotos en la
sesión del 2026-10-01: la próxima sesión arranca por el lote 01 (abajo).

**Cómo se trabaja (pedido de Guido):** lotes de 5 PDFs de punta a punta; se mira dónde hace falta la cola humana y se refina el proceso. La
sesión le dice a Guido qué revisar ("abrí el PDF en la pág. 14; en el .md, líneas 412-430; fijate si X") y él lo abre por su cuenta.
Arrancar por documentos ya transcriptos de clubes que ya están en el sitio y no tienen ese año cargado. Antes de proponer un comando: qué
etapa toca, para qué, y cuánto cuesta (ensayo).

### 1) Conseguir el PDF
Tools: exa-search.mjs, wayback-cdx.mjs, wayback-verify-download.mjs, búsquedas de Reddit y X; lo probado por club en fuentes/<País>/<Club>.md.
a) Se encuentra el documento oficial: se guarda en Clubes/<País>/<Club>/.
b) Llega roto (un HTML con extensión .pdf, cortado): el registro lo marca `no-es-pdf`. **Pero fuentes/ puede seguir dándolo por conseguido**
   (caso cerrado) y nadie vuelve a buscarlo. Desde la Versión 324 `node tools/estado.mjs` lo lista en la etapa 1 con el archivo de fuentes a
   reabrir (hoy: Unión Magdalena 2021). Falta automatizar que el sourcing lo tome solo.
Riesgos: i) un documento que no es del club, del año o del perímetro (réplicas no oficiales); ii) el mismo documento bajado dos veces con
nombres distintos; iii) PDF dañado que falla en silencio después; iv) el caso b.
Mitigaciones: i) las no oficiales se guardan sin publicar (CLAUDE.md); año y período del contenido (periodo.mjs), no del nombre; ii)
duplicados por huella del archivo: FALTA; iii) qpdf + reparar-pdf.mjs; si no se repara, se vuelve a bajar; iv) estado.mjs lo lista.

### 2) Transcribir
Tools: mistral-ocr-transcribe.mjs (documento entero a .md), check-transcripcion-fidelidad.js (corre solo después), reparar-pdf.mjs.
a) PDF DIGITAL (texto propio): Mistral; el texto propio del PDF (pdftotext) queda como segunda fuente GRATIS para la etapa 4.
b) PDF ESCANEADO: Mistral, que lo marca como escaneo con un aviso adentro del .md. No hay segunda fuente gratis: la etapa 4 la consigue.
c) PDF DIGITAL CON TEXTO ROTO (mojibake: fuentes sin mapa Unicode, cirílico que sale como letras latinas; Kolos Kovalivka, Ferro 121). Se
   detecta AUTOMÁTICAMENTE en verifyNumbers() de verify-numbers.mjs: si menos del 25% de los números del texto del PDF están en el .md, el
   texto del PDF es ilegible y el documento se trata como escaneo. También si el PDF tiene menos de 150 caracteres o 30 números por página.
Riesgos: i) Mistral INVENTA un número en un escaneo con la misma seguridad que uno bien leído; ii) se saltea o resume páginas; iii) no arma
tablas; iv) el texto propio del PDF está roto y se usa como verdad; v) costo de memorias de 200 páginas.
Mitigaciones: i) no se resuelve acá: en la etapa 4 cada número que se carga se confirma contra una fuente independiente de Mistral. ii)
check-transcripcion-fidelidad.js: marcas de página faltantes, duplicadas o corridas contra la cantidad real de páginas del PDF, bloques
reemplazados por un resumen en inglés, páginas con muy poco texto. CÓMO PUEDE FALLAR ESE CHEQUEO: no compara NÚMEROS (un dígito mal leído
pasa); no exige cobertura estricta si las marcas de página no son estándar; una página cortada a la mitad con algo de texto no es "muy poco
texto"; una columna corrida (el importe en la columna equivocada) pasa. Lo que se le escapa lo atajan la etapa 4 (números contra el PDF) y la
6 (sumas). iii) "Sin tablas": las transcripciones VIEJAS (antes de las APIs: Tesseract o un subagente de Claude) escribían las tablas como
texto suelto, y la preparación no encontraba filas; se rehacen con Mistral UNA vez porque Mistral sí arma tablas. Es mitigación solo para
esa causa: si Mistral mismo no arma tabla, rehacer no sirve; para eso indice-bloques.mjs lee también BLOQUES DE TEXTO con importes. iv) la
detección automática de c). v) más de 100 páginas quedan para el final (--max-paginas); Mistral ~US$ 4 cada 1.000 páginas.

### 3) Localizar
Tools: indice-bloques.mjs (gratis) y localizar.mjs (IA, ~US$ 0,05 por documento).
a) ÍNDICE DE BLOQUES (no de páginas: Guido descartó elegir páginas porque "el estado de resultados puede arrancar por la mitad de la página").
   Un bloque es una tabla (líneas con "|") o un bloque de texto con importes (3+ líneas seguidas que terminan en importes: estados que
   Mistral transcribió como texto, listas con viñetas como Bayern). Ficha: página, líneas del .md, las 3 líneas de arriba (título, escala),
   encabezado, primeras y últimas etiquetas, cantidad de filas e importes, y si continúa a otro bloque (tabla sin fila separadora con las
   mismas columnas en la página siguiente; bloque de texto a 3 líneas o menos del anterior en la misma página: 1. FC Köln partía su GuV en
   "4. Personalaufwand").
b) La IA ve el índice y elige: bloques del estado, de las notas de ingresos y de gastos, escala con su evidencia, moneda, columnas del
   ejercicio y del año anterior, perímetro. Puede pedir ver bloques enteros (una segunda llamada) y deja `dudas` para la cola.
c) Documento sin estado de resultados (memoria sola, dictamen, balance solo): `sin_estado`, queda como fuente. En el test por página pasó 5
   de 31 veces y las 5 era cierto (Ferro: memoria; Amazonas: balance; 3 dictámenes colombianos).
Riesgos: i) elige el balance, un presupuesto, la conciliación del impuesto (Leeds) o el otro perímetro; ii) la ficha resume demasiado; iii)
estado partido y elige una parte; iv) consolidado e individual en el mismo documento (Brann, Parma, PSV); v) la escala no está cerca; vi)
el filtro de seguridad rechaza el pedido; vii) cómo puede fallar el índice: Mistral partió una tabla por un membrete (si repite el
encabezado, quedan dos bloques sin `continuaDe`), dos tablas pegadas quedan como una, un estado en texto con el importe en otra línea que la
etiqueta no forma bloque, importes de menos de 4 dígitos sin separador no cuentan.
Mitigaciones: i) lo frena la etapa 6 (no cierra con totales, resultado ni años vecinos); ii) `necesito_ver`; iii) `continuaDe` en la ficha y
la etapa 6; iv) se pasa el perímetro de los años cargados; si es club nuevo, cola; v) la escala se confirma en la 6; vi) `fallbacks`; vii)
la IA lo ve en primeras/últimas filas y puede pedir el bloque entero; lo que igual se escapa lo frena la 6.
CÓMO PUEDE FALLAR extract-table-rows.mjs (la herramienta VIEJA, que sigue usando la preparación del pipeline y cargar.mjs sin
--desde-verificacion): toma la primera fila de cada tabla como encabezado (falla con encabezados de varias filas, Colo-Colo); une una tabla
con la anterior si no tiene fila separadora aunque sea otra cosa; el título de la tabla sale de los últimos renglones cortos de arriba, y un
membrete o una firma puede quedar como título (River 2021, Corinthians); en texto plano necesita importes con separador (pierde valores
menores a 1.000) y una etiqueta partida en dos renglones se pierde; la "relevancia" es por palabras (Alemania: 0 de 28). En el proceso
nuevo la relevancia la decide la IA de localizar y extract-table-rows deja de ser crítica.

### 4) Validar (solo los bloques elegidos)
Tools: validar-bloques.mjs; reusa verify-numbers.mjs (texto del PDF), gemini-transcribe.mjs y claude-api-transcribe.mjs (lectura de la
imagen de una página suelta, separada con qpdf; se guarda en Generados/ y no se paga dos veces).
a) DIGITAL: cada número de 4+ dígitos de los bloques se busca en el texto propio de SU página (pdftotext -f N -l N). Gratis.
b) ESCANEADO o TEXTO ROTO: Gemini lee la IMAGEN de esa página, independiente de Mistral; si la rechaza (RECITATION), Claude. Lo no confirmado
   queda con su línea del .md y, si la segunda lectura tiene un número que difiere en un dígito, cuál leyó. ~US$ 0,003 por página.
c) No decide quién tiene razón: lo decide la etapa 6 con las sumas, y si nada cierra, la cola.
Riesgos: i) Mistral y Gemini se equivocan igual (dígito borroso); ii) Gemini y Claude rechazan la página; iii) escaneo malo (Alverca); iv) en
un digital el número está en la página pero en otra columna (año anterior) y se da por bueno; v) números de menos de 4 dígitos no se validan.
Mitigaciones: i) las sumas; ii) sin segunda fuente -> la 6 lo manda a la cola si no cierra; iii) cola, y "pedirle el digital al club"; iv) el
chequeo de años vecinos de la 6; v) los cubren las sumas.
Cambio respecto de hoy: ya no se valida el documento entero (627 escaneos y 486 dudosos pendientes, ~US$ 140).

### 5) Extraer
Tools: extraer.mjs (IA, ~US$ 0,05-0,10 por documento).
a) Entran solo los bloques elegidos, con sus 3 líneas de arriba y CADA LÍNEA NUMERADA.
b) Salen las filas: bloque, línea del .md, etiqueta e importe TAL CUAL, importe del AÑO ANTERIOR, tipo (renglón, subtotal, total,
   resultado), lado (ingreso, gasto, financiero, impuesto), qué renglón desglosa si es de una nota; la ESCALA DE CADA BLOQUE con su evidencia
   (el test con una escala por documento falló en Köln: nota en miles, estado en euros); totales y resultado impresos con su línea; dudas.
c) No suma, no convierte, no categoriza.
Riesgos: lado o tipo equivocados, nota unida al renglón equivocado, filas salteadas, respuesta distinta cada vez.
Mitigaciones: todo lo frena la 6; la respuesta se guarda (no se vuelve a pedir; --rehacer la fuerza).

### 6) Verificar
Tools: verificar.mjs (gratis, sin IA: un LLM no sirve para verificar aritmética, FinVerBench arXiv 2605.29586).
a) NÚMEROS NO CONFIRMADOS en la 4: si las sumas cierran, la aritmética los confirma; si no, a la cola con los dos números (o la corrección
   de Guido si ya la dio).
b) NOTAS: reemplazan a su renglón solo si suman; la escala de la nota se deduce del cierre (x1, x1.000, x1.000.000). Si no, queda el renglón.
c) TOTALES Y RESULTADO: líneas contra el total impreso (también un total que es una fila más, Forest: "Turnover" + "Profit on disposal"
   aparte); ingresos - gastos ± financiero ± impuesto contra el resultado (se prueban los signos como vienen y combinados, gana el que
   cierra); redondeo: menos de media unidad impresa por fila -> fila "Diferencia de redondeo" (decisión 3 de Guido); sin totales impresos,
   vale el resultado (decisión 2).
d) AÑO ANTERIOR CARGADO: la columna del año anterior de este documento contra el sitio (±2%).
e) AÑO VECINO EN OTRO DOCUMENTO (agregado al medir: de los 159 años nuevos, solo 2 tienen el año anterior cargado, porque casi todos
   completan la serie hacia atrás; pero 101 tienen el documento del AÑO SIGUIENTE transcripto en la carpeta): si ese documento ya pasó por
   extraer, su columna "año anterior" tiene que coincidir con la actual de este. Por eso los lotes llevan años consecutivos del mismo club.
f) Si nada de d/e se puede hacer: caso "primer año" en la cola (decisión pendiente de Guido: ¿siempre?).
g) Con --rubros escribe el .rubros.json para la categorización de siempre.
Riesgos: i) dos errores que se compensan; ii) ningún vecino para comparar; iii) convención distinta de producción (Nordsjælland toma la
"ganancia bruta" como ingreso; Forest suma la venta de jugadores al ingreso); iv) el año ya cargado está mal; v) un documento siguiente que
REEXPRESA el año anterior (cambio de norma) da una diferencia que no es error.
Mitigaciones: i) segundo chequeo (vecino, o el número citado en la prosa: FALTA construir); ii) cola; iii) cola, y la respuesta se vuelve
regla del grupo en grupos-pais.mjs (FALTA el paso de respuesta a regla); iv) "producción o documento" a la cola, nunca se corrige solo; v)
cola con esa hipótesis escrita.

### 7) Categorizar (como hoy)
Tools: glosar-rubros.mjs, jev-categorizar.mjs, categorizar-claude.mjs (precedente por familia, Jev >= 0,90, Claude >= 0,80),
memoria-categorias.mjs, respuestas-cache.mjs. ~US$ 0,03 por documento, menos con la memoria.
Riesgos: i) categoría equivocada con sumas correctas (nada lo delata); ii) filas grandes y genéricas con confianza baja; iii) el precedente
copia un error viejo; iv) fila sin lado.
Mitigaciones: i) el primer año automático de cada club lo revisa Guido; ii) su decisión queda como precedente; iii) audit.js y to-do 101; iv)
sin lado, precedente solo exacto o de un solo lado (99,7% / 100%). Decisión 1 de Guido: < 0,80 de Claude no se carga, va a la cola.
OJO: verificar.mjs --rubros PISA el .rubros.json; si después alguien corre `pipeline.mjs --repreparar`, lo vuelve a pisar con la selección
vieja. Mientras convivan los dos procesos, no re-preparar los documentos que pasaron por el nuevo.

### 8) Cargar
Tools: cargar.mjs --desde-verificacion (las líneas salen del .verificacion.json, solo si quedó en estado 'ok'; financiero e impuesto con
destino decidido por extraer, no por palabras), alta-club.mjs, periodo.mjs, lookup-fx-close.js, audit.js y los 4 generadores.
a) Club existente: líneas, totales verificados, financiero e impuesto aparte, tipo de cambio (el que declara el documento si cae en rango; si
   no, la cotización de cierre), liga, fuente con página. b) Club nuevo: alta en el mismo commit que su primer año. c) audit.js; si da P0/P1,
   se revierte solo (probado).
Riesgos: i) falta la cotización (EUR, CLP, DKK; HRK sin decidir); ii) no es anual; iii) tipo de cambio declarado falso (Arsenal); iv) liga sin
dato. Mitigaciones: i) frena (to-do 112: bajar las series); ii) no se carga (periodo.mjs --grupos); iii) rango plausible, si no cola; iv)
"sin dato", no frena. --desde-verificacion NO SE PROBÓ todavía de punta a punta.

### 9) Publicar
Commit local (código por un lado, datos por otro, un commit por año cargado para poder deshacer uno solo). El push lo hace Guido.

### Cola humana (atraviesa todo)
Tools: cola.mjs; archivo Admin/cola-revision.jsonl (trackeado: son decisiones de Guido). `node tools/cola.mjs` lista los pendientes por
documento con "Qué mirar", "Abrí el PDF en la pág. N", "En la transcripción, líneas X-Y" y la propuesta; Guido contesta
`node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club [--nota "..."]`; la próxima corrida la
toma (verificar.mjs ya lo hace). Hoy entran: números no confirmados que no cierran, totales o resultado que no cierran, año vecino distinto,
primer año sin vecino, dudas de extraer. FALTA: que localizar mande sus `dudas` y su perímetro de club nuevo a la cola (hoy quedan en el
.ubicacion.json), que categorización y cargar manden sus casos, que una respuesta se vuelva REGLA (convención del grupo de países,
precedente del club), y ordenar la cola por impacto.

### Cómo arranca la próxima sesión
1. `node tools/lote.mjs --lista Admin/lote-01.txt` (ensayo, gratis): ~US$ 0,63 + ~US$ 0,15 de categorización. Lote 01: Bahia 2021, 2022, 2023
   (Brasil) y Athletic Club 2022, 2023 (España), consecutivos para el chequeo de años vecinos.
2. Proponérselo a Guido (etapa, para qué, costo); lo corre él: `caffeinate -i node tools/lote.mjs --lista Admin/lote-01.txt --ejecutar`.
3. Mirar cada documento (los .ubicacion.json, .filas.json y .verificacion.json en Generados/) y la cola; decirle a Guido qué abrir; con sus
   respuestas, volver a correr el lote (lo que ya está hecho no se repite).
4. Refinar las tools con lo que aparezca, y recién después lotes más grandes.

## Lo que falló en los tests o no entró (2026-09-30 y 2026-10-01)
- Selección de filas por palabras (proponer-carga.mjs seleccionarFilas, etapa 4 de hoy): 7-11% de los ingresos de producción en 266 años
  cargados; partirla por grupo de países mejora poco. Toma cualquier tabla con palabras de ingresos/gastos (Chapecoense pág. 28, Ituano
  "Imobilizado", Leeds conciliación del impuesto, Racing 2018 deudas en euros, Atlético Nacional partidas de balance).
- Escala por plausibilidad contra otros años del club: inútil con inflación y años en otra moneda (Racing: 2009-2011 en USD, 2012-2027 en
  ARS). Arreglado el "000" de adentro de un número. "Escala única por documento" probada en dos variantes y DESCARTADA (empeoraba 15 y 7
  años: la prosa de la página dice "Mio. €" o "millones" arriba de tablas en otra unidad). En el proceso nuevo la escala va por bloque.
- Test localizar-extraer por PÁGINA (localizar-extraer.mjs, US$ 3,52): descartado por elegir páginas enteras; su chequeo "literal" compara
  contra la transcripción y no detecta un número inventado por Mistral (lo vio Guido). Sirvió para medir: 42% / 69% contra 7-11%.
- Etapa 6 (cargar.mjs) sobre los 159 años nuevos: 0 cargan; 150 frenan por el cierre de sumas (consecuencia de la selección por palabras).
- Chequeo "año anterior cargado": solo 2 de 159 lo tienen -> se agregó el de año vecino en otro documento.
- No construido todavía: duplicados de PDF por huella; número citado en la prosa como segundo chequeo; respuesta de la cola -> regla;
  dudas de localizar a la cola; cola ordenada por impacto; reabrir el sourcing de un PDF roto automáticamente; las convenciones por grupo
  como configuración que lean las tools (hoy grupos-pais.mjs es documentación).
- Corridas largas: la Mac se durmió (2026-09-30, 3 horas para 159 documentos): usar `caffeinate -i`; las tools nuevas tienen tope de 5
  minutos por llamada.

## Resultado de la etapa 6 sobre los 159 años nuevos de clubes existentes (2026-09-30, noche, Versión 322)

Lista `Admin/piloto-existentes.txt`; etapa 5 corrida por Guido (US$ ~4,5 de Claude; la memoria de respuestas ahorró 3.400 de 5.344 llamadas a Jev).
`node tools/cargar.mjs --lista Admin/piloto-existentes.txt` (propuesta, gratis): **0 cargan.** Por grupo de países (tools/grupos-pais.mjs) y
motivo (un documento puede frenar por varios):

| grupo | docs | tie-out (no cierra contra lo impreso) | categoría | fx | alta (perímetro, fx declarado) |
|---|---|---|---|---|---|
| ARG | 7 | 7 | 5 | 5 | 6 |
| BRA | 27 | 26 | 12 | 2 | 6 |
| LAT | 45 | 42 | 12 | 37 | 15 |
| IBE | 23 | 23 | 22 | 10 | 5 |
| GER | 4 | 4 | 2 | 3 | 1 |
| BNL | 26 | 23 | 21 | 16 | 5 |
| NOR | 12 | 11 | 4 | 10 | 8 |
| EST | 6 | 6 | 4 | 6 | 6 |
| MED | 9 | 6 | 5 | 4 | 9 |

**La causa dominante (150 de 159) está en la etapa 4, no en la 6:** `seleccionarFilas()` recorre como "estado de resultados" CUALQUIER tabla
relevante con palabras de ingresos/gastos, no solo el estado y las notas que abren sus renglones. Ejemplos mirados:
Chapecoense 2016 (gastos −220,6 contra ingresos 66,9: "Custo dos Bens Patrimoniais Vendidos −83,8" y "Despesas diversas −74,0" salen de una
tabla de la pág. 28 que no es el estado); Ituano 2019 ("Imobilizado - Móveis e Instalações 12" como ingreso: cuadro de bienes de uso);
Envigado 2019 ("Diferencias en cambio en negociación 2.405" como ingreso, escalas mezcladas con "Abonados 25").
**Próximo paso propuesto:** medir por GRUPO la variante "solo el estado principal y las notas que abre" (ya existe como
`--ancla-solo-principales`; en el test de elección de tabla rompía Los Andes, Bahia, Colo-Colo 2024, Fluminense y Stuttgart en general,
pero puede ser la buena para algunos grupos y no para otros). Es la primera regla candidata a partirse por grupo (pedido de Guido).

### Test de la etapa 4 por grupo: ¿la selección reproduce lo cargado? (2026-10-01, gratis)

266 años YA cargados con su `.md`: la suma de ingresos de `seleccionarFilas()` a ±2% de la de producción. Regla actual ("todas las tablas con
palabras de ingresos/gastos"): **18 de 266 (7%)**; "solo el estado principal y las notas que abre" (`--ancla-solo-principales`): **28 (11%)**,
mejor o igual en TODOS los grupos (ARG 11->15, BRA 1->3, LAT 5->7, IBE 0->2; GER 0/28: casi nunca encuentra la GuV). Gastos: 11 -> 19.
Ejemplos: Brentford 2024 ingresos 72,5 contra 197,1; Atlético Mineiro 2023 gastos 2.702 contra 91; Bahia 2025 1.039 contra 545.
Lectura: las reglas de selección por palabras no alcanzan en ningún grupo; partirlas por país mejora poco. Propuesta en "Qué falta" 0.

### Test localizar-extraer-verificar con IA (2026-10-01, `tools/localizar-extraer.mjs`, US$ 3,52)

31 años YA cargados repartidos por grupo (`Admin/piloto-localizar.txt`). Claude Opus 5.5 esfuerzo bajo: localizar (qué páginas) + extraer
(filas tal cual). Resultados (`--medir`, gratis):
- 5 de 31: localizar dijo "no hay estado de resultados" y TENÍA RAZÓN (Ferro: solo memoria; Amazonas: balance; 3 dictámenes colombianos):
  el registro los marca cargados porque son del mismo club-año, pero producción salió de otro documento.
- De los 26 restantes: ingresos a ±2% de producción **11 (42%)**, gastos **18 (69%)**. La selección por palabras sobre los MISMOS
  documentos: 0-1 y 2.
- Fidelidad: de 1.117 importes extraídos, 1 no está literal en su página.
- Fallas mirando cada una: Eintracht (la transcripción del estado está incompleta: el modelo lo avisó), Nordsjælland (producción toma
  "Bruttofortjeneste" como ingreso: convención), Nottingham Forest (producción suma "Profit on disposal of player registrations" a
  Turnover; la verificación no abre un renglón "total" con su nota), notas en otra escala que el estado (Köln: arreglado deduciendo la
  escala de la nota por el cierre).
- Investigación con fuentes (subagente, 2026-10-01): bancos (Moody's CreditLens, nCino, Ocrolus), proveedores de datos (S&P, FactSet,
  LSEG, Morningstar) y document AI (Azure) clasifican páginas con un modelo antes de extraer, capturan "as reported" y después estandarizan,
  usan plantillas fijas, tienen revisión humana por confianza y no le piden la aritmética a un LLM (FinVerBench, arXiv 2605.29586).
  La UEFA no extrae: los clubes cargan sus números en una plantilla.

## Qué falta (en orden)

0. **DECIDIDO Y CONSTRUIDO (Versión 324): "El proceso nuevo", arriba. Lo que sigue es la propuesta original, por historia:** cambiar el orden de las etapas 3 y 4 por "localizar, extraer, verificar", como hace la
   industria del "financial spreading" (bancos y proveedores de datos que pasan balances en PDF a una plantilla estándar). Hoy se transcribe y
   valida el documento ENTERO (etapas 2-3) y después se buscan por palabras las tablas de resultados (etapa 4), que reproduce 7-11% de lo
   cargado. Propuesta: (a) LOCALIZAR con IA barata las 2-5 páginas que importan (estado de resultados y las notas que abren ingresos y gastos)
   y, en esas, la escala, la moneda, la columna del ejercicio y el perímetro; (b) EXTRAER esas páginas a filas estructuradas (etiqueta tal
   cual, importe del año, tipo: renglón/subtotal/total/resultado, qué nota abre qué renglón); (c) VERIFICAR gratis: cada importe tiene que
   existir literal en la transcripción, las filas tienen que sumar sus subtotales, el total y el resultado impresos. Lo que no cierra va a una
   cola de revisión, no se adivina. La validación paga de la etapa 3 se hace solo en esas páginas. Test propuesto antes de construir nada:
   (a)+(b) sobre ~30 años YA cargados, repartidos por grupo, medido contra producción con la misma vara (±2%).

1. **ETAPA 6: `tools/cargar.mjs` EXISTE (Versión 320) y se probó de punta a punta; el informe completo está en `Admin/tests/test-cargar.md`.**
   Año nuevo de un club que ya existe; `--propuesta` (default) / `--escribir` (escribe, sube ASSET_V, regenera, corre audit.js y REVIERTE si hay
   P0/P1: probado, restaura byte a byte) / `--comparar` (backtest). Resultado: backtest de 18 ejercicios cargados (reconstruidos en un worktree con las
   etapas 3-5 reales): cargó 1 idéntico a producción (Alianza Lima 2023) y frenó 17, todos con algo mal o faltante — **el cierre de sumas no dejó
   pasar ningún número falso**. Años nuevos del piloto: ninguno con el umbral por defecto; con `--umbral-claude 0.7` carga PSV 2019-20 (cierra exacto).
   **LO QUE HAY QUE ARREGLAR, EN ETAPAS ANTERIORES (orden sugerido, evidencia en el informe, sección 4):**
   a. Las filas que se categorizan (etapa 3, `pipeline.mjs`) no son las que se cargan (etapa 6 abre la nota que desglosa cada renglón): 103 de 150
      documentos. Que la etapa 3 use `seleccionarFilas()` de `proponer-carga.mjs` (ya exportada).
   b. Escala por tabla (plausibilidad) falla con inflación y notas en otra unidad (Racing 2012, RB Leipzig, Arsenal, Osasuna, Vélez, Ponte Preta; Los
      Andes 2009-10 estado x1000 y anexo x1): una sola escala por documento.
   c. Entran tablas que no son de resultados (balances, flujos en neerlandés/croata, cuadros de bienes de uso, presupuestos) y filas duplicadas entre el
      estado y sus notas (Católica, Sunderland, América Mineiro). `esNoPL()` nuevo en proponer-carga cubre parte.
   d. Filas grandes y genéricas quedan con Claude < 0,80 y una sola frena el ejercicio (13 de 18); el precedente del club es por texto exacto
      ("Vergoedingsommen" vs "Vergoedingssommen"): hacerlo tolerante a una letra.
   e. Categorizar lo ya preparado: 131 de 150 documentos de clubes existentes no tienen `.categorias.json` (~US$ 0,04 c/u).
   f. `alta-club.mjs` aplicado a clubes existentes: pregunta perímetro ya decidido, fx falsos ("0.6" de "£0.6 million"), liga null en 122 de 150.
   g. Faltan series de fx EUR (36 documentos), CLP (27), DKK (9); HRK de Croacia antes de 2023 sin decidir.
   h. Hoffenheim 2025 y Once Caldas 2024 quedan `sin-rubros` teniendo estado de resultados. Jev no es determinista (misma fila, dos respuestas).
   i. `glosar-rubros.mjs` y Jev no registran su costo (gasto.mjs no los ve).
   **DECISIONES DE GUIDO pendientes:** (1) ¿cargar una fila con Claude < 0,80 si el resultado impreso cierra exacto con ella? (2) ¿aceptar un total de
   ingresos/gastos verificado solo por el resultado (hoy se acepta, marcado `por-resultado`)? (3) ¿qué hacer con totales que cierran solo por redondeo?
   Reglas ya decididas: no cargar `periodo.tipo` distinto de 'anual' ni `nombreNoCoincide` (periodo.mjs ya reconoce temporadas "2009-10": 226 -> 15
   marcados); excluir `no_es_rubro`; el alta de un club nuevo va en el mismo commit que su primer año.
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
node tools/lote.mjs --lista Admin/lote-01.txt                              # PROCESO NUEVO: ensayo del lote 01 con costo (gratis)
node tools/cola.mjs                                                        # la cola humana: qué mirar en el PDF y en el .md
node tools/pipeline.mjs --lista Admin/piloto-d.txt --limit 10              # ensayo (estimación de costo, sin API)
node tools/pipeline.mjs --ejecutar --lista Admin/mi-piloto.txt --limit 10 --concurrencia 3 2>&1 | grep -v "^Syntax"   # lo corre Guido
node tools/gasto.mjs --desde 2026-09-30 --lista Admin/mi-piloto.txt         # cuánto costó, por documento (gratis)
node tools/alta-club.mjs "<ruta del PDF>"                                  # qué haría falta para dar de alta el club (propuesta, no escribe)
```

Para armar un piloto: elegir ~10 PDFs `sin-md` (de `Admin/transcripciones-estado.jsonl`), uno por país, de 8 a 40 páginas, y guardarlos en un `.txt` (una ruta por línea).
