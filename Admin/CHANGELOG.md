<!-- md: qué cambió y cuándo (las últimas 40 entradas; lo anterior está en Archive) | leer: solo por grep de una palabra o de una tool (fos changelog historial más el nombre de la tool), nunca de corrido -->
# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión por versión: las últimas 40 entradas
(`node tools/fos.mjs changelog archivar` mueve las más viejas). **Las anteriores están en `Admin/Archive/CHANGELOG-v*.md`** (la 10 a la 299, la 300 a la 672, la 673 a la 956, …).
**El título lleva al final, entre corchetes, los to-dos, las tools y los clubes** (`## Versión N — título [292 · cola.mjs, cargar.mjs · besiktas-tr]`; se omite la parte que no aplica).
Las tools las deriva `fos cerrar` de git (lo tocado desde la última entrada); una con `~` (`~cola.mjs`) está solo mencionada en el texto de una entrada vieja. Para saber qué tool tuvo
problemas y qué leer: `node tools/fos.mjs changelog historial <tool>` (entradas con su línea de medición, commits, hallazgos y mediciones); `grep "cola.mjs" Admin/CHANGELOG.md Admin/Archive/CHANGELOG-*.md` devuelve solo títulos
y alguna mención. **Una entrada: hasta 4 bullets y 1.500 caracteres**, y su último bullet empieza con `Medición:` (idéntico, o la diferencia explicada); el porqué largo va a `Admin/finance-of-sports-project.md`
y los descartes medidos a `Admin/HALLAZGOS-pipeline.md` (`audit.js`: `changelog-entrada-larga`). Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Admin/finance-of-sports-project.md`. Para el
estado actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`Admin/ESTADO.md`, y para la to-do list vigente, `Admin/TODO.md` — hasta la Versión 137
las dos cosas vivían en un comentario HTML al principio de `index.html`.

**Las rutas que aparecen DENTRO de cada entrada son las de su época.** La Versión 196 mudó
los documentos internos a `Admin/` y no reescribió el historial: una entrada de septiembre
que dice `ESTADO.md` era verdad ese día.

---

## Versión 1227 — TODO con HECHO y PENDIENTE, `fos ayuda`, `&` rechazado y las pruebas que nadie corría [todo.mjs, audit-chequeos-4.js, fos.mjs, probar-todas.mjs, probar-patron.mjs, probar-votacion-nueva.mjs · hooks/pre-tool.mjs]
- `todo.mjs`: un punto con ítems `- [x]` hecho y `- [ ]` pendiente muestra `[2 de 5 hechos]` en la lista y abre con HECHO y PENDIENTE antes del cuerpo; `audit.js` da `todo-todo-hecho` (P3) si todos están hechos y el punto sigue abierto. 463 y 476 ya usan ítems; la cabecera de `Admin/TODO.md` lo explica.
- `fos ayuda <tool>` (y `fos <cmd> --ayuda`) imprime el USO de la cabecera sin correr nada; el hook de Bash rechaza `node tools/<x> --ayuda|--help` y manda ahí, y rechaza un `&` al final (usar `run_in_background`). `probar-pre-tool.mjs` 111 casos, todos ok.
- `node tools/probar-todas.mjs` (`fos probar`) corre las 16 pruebas y anota cuándo pasó cada una en `Admin/registros/pruebas-corridas.json`; `audit.js` da `prueba-sin-correr` (P3) si una falló, no figura o lleva 14 días sin correr. Al correrlas aparecieron dos rotas: `probar-patron.mjs` (no copiaba `patrones-tools.mjs` ni su `.json`, y su caso esperaba un PENDIENTE que ahora es un error) y `probar-votacion-nueva.mjs` (suponía que toda votación unánime es DECIDIDO; la del 414 fue A GUIDO por cambiar 12 años cargados). Las 16 pasan.
- Medición: idéntico (`audit`). Sin revisión independiente de la Auditora.

## Versión 1226 — `tool-grande` a 60 KB, medir-pipeline rechaza argumentos desconocidos, cerrar-tool ignora tools sin cambios y la prueba del medidor, rota, arreglada [audit-chequeos-2.js, medir-pipeline.mjs, cerrar-tool.mjs, probar-medir-pipeline.mjs]
- `tool-grande` (P3) pide partir una tool desde los 60 KB, no desde los 40: 14 tools estaban entre 34 y 39 KB y `cola.mjs` a 22 bytes del tope, así que cada línea nueva obligaba a mudar código y a medir de nuevo. El aviso de lectura entera a los 30 KB (hook) queda; `CLAUDE.md` y `CONVENCIONES.md` lo dicen igual (commit aparte).
- `medir-pipeline.mjs` frena con «Argumento desconocido» (antes `--ayuda` arrancaba una medición entera); `cerrar-tool --tools` ignora las tools sin cambios contra HEAD y lo dice (una sin cambios hacía fallar el veredicto con «falta la medición con la huella actual»).
- `probar-medir-pipeline.mjs` llevaba rota desde que `medir-pipeline` y `patron` ganaron `duraciones-lib.mjs` y `patrones-tools.mjs` (no los copiaba al repo de juguete): 19 casos MAL antes de tocar nada; ahora todos ok, con un caso nuevo del argumento desconocido. Nadie lo notó porque no lo corre ningún chequeo.
- Medición: idéntico (`audit`, lote chico; `audit-chequeos-2.js` es módulo de `audit.js`). Sin revisión independiente de la Auditora.

## Versión 1225 — Lo hecho de los pendientes del 463 y el 476, al CHANGELOG [477]
- Tigres 2016 y 2017 quedan como «Costo de ventas» en otros gastos; los clubes sin `official_totals` ya no existían; sponsors de Real Cartagena, Atlético FC, Tigres y Cortulua verificados en FKA; caja y deuda de SIIS en 19 clubes (`siis-caja-deuda.mjs`); Cúcuta 2016 caja de 64 miles de pesos; Δ % con tope en Finanzas multi-año; `auditAll()` sin diferencias; `brandColor` de los cuatro clubes nuevos (`fos color-club`, y `lookup-brand-color.js` lo llama); estadio de Orsomarso 2025 en Yumbo y fin de la gestión de Issa el `2026-01-01` por decisión de Guido.
- El analizador de filas de `caja-deuda` descarta un entero de 1 a 99 en la primera columna por parecer un número de nota: 14 de 9.512 filas de los estados de SIIS, una sola de caja o deuda (Cúcuta 2016); no se toca. El 476 queda con lo que falta, una línea cada uno.
- Medición: sin cambio de tools en esta entrada.

## Versión 1224 — lookup-brand-color.js corre color-candidatos cuando el club no está en footylogos [lookup-brand-color.js]
- Sin coincidencias en las tablas de footylogos, `node tools/lookup-brand-color.js "<club>"` (la corrida a mano, no la de `--json` que usa `alta-club`) imprime a continuación los candidatos de la Wikipedia del país (`color-candidatos.mjs`, gratis; `--gemini` aparte). Es lo que hizo `fos cerrar-tool`: ensayo, medición y veredicto en orden, por primera vez de punta a punta en esta sesión.
- Medición: idéntico (lote completo; `lookup-brand-color.js` es módulo de `alta-club.mjs`). Sin revisión independiente de la Auditora.

## Versión 1223 — color-candidatos (brandColor de los cuatro clubes nuevos), cerrar-tool a la vista en los hooks y aviso de directorio de trabajo [463, 476 · color-candidatos.mjs · cucutadeportivo-co]
- `tools/color-candidatos.mjs` (`fos color-club "<Club>" [--gemini]`): la capa 1 de `club-nuevo.md` por programa para un club que footylogos no tiene: artículo de la Wikipedia en su idioma (la API de búsqueda), colores con hex, apodo, y con `--gemini` la camiseta local con fuentes. Probado: Exa trae las páginas pero no hace falta, Firecrawl no está configurado, teamcolorcodes no tiene estos clubes. `brandColor` puestos: Orsomarso `#1D4DF3`, Atlético Huila `#FFF200`, Barranquilla FC `#ED1C24`, Bogotá FC `#FFE217` (la plantilla de la camiseta local de es.wikipedia), con su procedencia en `Admin/sourcing/Colombia/`.
- Hooks: la edición de una tool del pipeline y el rechazo del commit nombran `fos cerrar-tool` (antes `medir-pipeline.mjs` suelto, y el aviso de arranque listaba `medir` y `patron` por separado, de ahí que se olvidara); `pre-tool.mjs` frena un Bash cuando la shell quedó en una subcarpeta del proyecto por un `cd` anterior y dice cómo volver. `probar-pre-tool.mjs` 102 casos y `probar-post-tool.mjs` 20, todos ok.
- Cúcuta 2016: la caja es 64 miles de pesos (Nota 5 del PDF, p. 11, y SIIS: el 1,871 es la columna 2015); ajuste manual y la proporción de `audit.js` silenciada con motivo. Medición: sin cambio de tools del pipeline.

## Versión 1222 — Barranquilla FC y Bogotá FC (2016 a 2025) desde SIIS; Δ % con tope en Finanzas multi-año [463, 476 · barranquillafc-co, bogotafc-co]
- Los dos clubes cargados por `club-siis.mjs` (alta, estados, dictámenes, tres subagentes cada uno, lote con un commit por año), con la línea del auditor (sin salvedades en los 12 años), caja y deuda de SIIS y ligas en Primera B (el roster de Wikipedia los nombra «Barranquilla» y «Bogotá»). Un aviso `dictamen-fechas-ajenas` de Barranquilla 2020 queda silenciado con motivo (errata del original: el dictamen es del 20-2-2021). Faltan su `brandColor`, sponsors fuertes y las gestiones con nota propia por año (TODO 476).
- `js/finanzas-multi.js`: el Δ primero→último con un año base casi en cero muestra el tope «>+1.000%» en vez de +38.046 % (Águilas Doradas, Estadio); verificado a 375 px, sin scroll horizontal de la página. `auditAll()` en el navegador: 344 clubes, 4.391 chequeos, 0 que no cierran.
- Medición: sin cambio de tools en esta entrada.

## Versión 1221 — cola.mjs --corregir-categoria no repite una respuesta ya fijada; TODO 463 achicado, sus pendientes al 476 [463, 476 · cola.mjs, cola-corregir-categoria.mjs]
- `node tools/cola.mjs --corregir-categoria` (lo que `club-siis --avanzar` corre en cada pasada) agregaba otra respuesta idéntica cada vez; ahora dice «Ya estaba fijada (id)» y no escribe. La lógica salió a `tools/cola-corregir-categoria.mjs` (`cola.mjs` había pasado los 40 KB con el cambio).
- El punto 463 del TODO queda con los clubes que faltan cargar; sus pendientes de lo ya cargado (gestiones, sponsors, dictámenes, pantallas, skills, cositas del 461) pasan al punto nuevo 476 sin cambiar de contenido.
- Medición: idéntico (lote chico: `cargar`, `cargar-cola-vacia`, `audit`, `escribir`, `verificar`, `lote-ensayo`, `alta`). Sin revisión independiente de la Auditora.

## Versión 1220 — Hook de fin de turno: no bloquea con trabajo en segundo plano sin terminar [hooks/stop.mjs]
- `tools/hooks/stop.mjs` mira el transcript: un subagente (`agentId:`) o un comando con `run_in_background` (`running in background with ID:`) sin su `<task-notification>` de fin deja el cierre pasar sin decir nada (los archivos sin commitear son su salida en curso). Los monitores de espera no cuentan. Antes avisaba a cada rato mientras los subagentes escribían. Sin transcript sigue como antes.
- Medición: `probar-stop.mjs` 12 casos, todos ok (4 nuevos). Un comando en segundo plano que se mata sin aviso deja el hook en silencio hasta que termine la sesión: si pasa, `git status` lo dice igual al cierre del turno siguiente.

## Versión 1219 — Orsomarso (2016 a 2018, 2020 a 2025) y Atlético Huila (2016 a 2025) desde SIIS [463 · orsomarso-co, atleticohuila-co]
- Los dos clubes cargados por `club-siis.mjs` (alta, estados, dictámenes, tres subagentes cada uno, lote con un commit por año), con la línea del auditor (sin salvedades en los 15 años con dictamen), caja y deuda de SIIS, ligas por año (Huila en B 2020, 2022 y 2024 por prensa: descendió en 2019, subió en 2021, bajó en 2021 y 2023) y gestiones de Huila 2016 a 2025. Lo que quedó abierto está en el TODO 463 (gestiones y sponsors de Orsomarso, sponsors débiles de Huila).
- Medición: sin cambio de tools en esta entrada.

## Versión 1218 — siis-caja-deuda.mjs: la proporción con los ingresos de audit.js, antes de escribir [463 · siis-caja-deuda.mjs · cucutadeportivo-co]
- Caja y deuda de 17 clubes colombianos quedaron escritas desde SIIS (commit aparte). Cúcuta frenó solo: `caja-deuda-desproporcionada` (caja 2016 = 64 mil COP contra 3.935 M de ingresos, 1,6e-5 < el piso 7e-5) y la tool revirtió todo. Ahora `siisDeBalance` aplica la misma proporción (caja entre 7e-5 y 3 veces los ingresos, deuda hasta 20 veces) y ese año queda sin dato; la escalera por documento tampoco lo decide (1,871 contra 0,064 en el documento siguiente).
- Medición: idéntico (los cinco medidores). Sin revisión independiente de la Auditora.

## Versión 1217 — caja-deuda.mjs --club --escribir ya no se cuelga; el año de siis-caja-deuda como número [463 · caja-deuda.mjs, siis-caja-deuda.mjs]
- `node tools/caja-deuda.mjs --club <id> --escribir` terminaba con «unsettled top-level await» sin escribir: `costo-personal.mjs` importa `caja-deuda.mjs`, `cargar.mjs` importa `costo-personal`, y el `import('./cargar.mjs')` esperaba a un módulo con su `await` de nivel superior pendiente. El despacho del CLI ahora corre en una función asíncrona, sin `await` de nivel superior (latente desde que `costo-personal` se separó).
- `siis-caja-deuda.mjs`: `a.anio` llega como texto y `anio + 1` daba «20211», así que la comparativa del año siguiente nunca se miraba; ahora `Number(a.anio) + 1`. Lo vio el ensayo sobre Tigres (la validación decía solo «cuadra»).
- Medición: idéntico (lote chico: los cinco medidores). Sin revisión independiente de la Auditora.

## Versión 1216 — caja-deuda.mjs: caja y deuda desde el balance de SIIS [463 · caja-deuda.mjs, siis-caja-deuda.mjs]
- `tools/siis-caja-deuda.mjs` (nuevo, solo de SIIS): `siisDeBalance(clubId, a)` lee `siis_sitfinan` de `siis-estado-AAAA.json`. Caja = «Efectivo y equivalentes»; deuda = «Otros pasivos financieros» corrientes + no corrientes (los préstamos corrientes son parte de los corrientes y no se suman). Precedente: América de Cali 2025 y Unión Magdalena 2018 dan esos valores exactos. Compuerta: el balance cuadra y la comparativa del año siguiente de SIIS repite el cierre; con reexpresión o un préstamo sin «Otros pasivos financieros», no decide. Un rubro vacío no es 0.
- `caja-deuda.mjs` (`completarClub`) lo llama después de Rusia y antes de los documentos; lo que SIIS no da sigue por la escalera de siempre. Ensayo sobre `data/co/`: 228 de 288 vacíos con balance de SIIS salen resueltos (Tigres 2021: 190,741 por SIIS = lo que da el documento por otro camino). Faltan por reexpresión (45) y por pasivo financiero no reportado (15).
- Medición: idéntico (lote chico: `caja-deuda`, `caja-deuda-personal`, `personal-ensayos`, `audit`, `escribir`). Sin revisión independiente de la Auditora.

## Versión 1215 — 463: «2.2» (clubes sin official_totals) ya estaba resuelto [463]
- Ningún año de `data/co/*.json` carece de `official_totals` hoy (se recorrió cada club), así que `siis-control` compara todos los años; el punto sale del TODO 463. El motivo por el que figuraba abierto (3 clubes sin totales) ya no es cierto.
- Medición: sin cambio de datos ni de tools.

## Versión 1214 — audit.js: «sin historia» cubre los briefs de SIIS, los contadores fijos y «Guido decidió…» [audit-chequeos-2.js]
- `checkHistoriaEnDocs` (`historia-en-doc-de-criterio`, P3) suma `Admin/briefs-subagentes-siis.md` a los documentos que mira y dos patrones: `Guido cambió|decidió|eligió|resolvió|aprobó|quiso` y contadores fijos («60 clubes», «265 entidades»; solo en ESTADO, CLAUDE.md y los briefs, donde el documento dice qué hay HOY: en una convención el número ilustra el caso). Hoy no da hallazgos nuevos: el contador de `Admin/ESTADO.md` se cambió antes por el comando que lo da (`entidades.mjs --check`). Los avisos van por el mismo camino de silenciar con motivo.
- Medición: idéntico (`audit`). Probado plantando una línea en los briefs: salta con cada patrón; revertida. Sin revisión independiente de la Auditora.

## Versión 1213 — Hook texto-de-guido-aparte: todo el texto que Guido lee va en su propio commit y con el diff mostrado [hooks/pre-tool.mjs, hooks/post-tool.mjs, hooks/texto-de-guido.mjs]
- `tools/hooks/texto-de-guido.mjs` es la lista única (skills, CLAUDE.md, CONVENCIONES*, PANTALLA, PIPELINE, ESTADO, `Admin/briefs-subagentes-siis.md`, `Admin/paises/*.md`). Antes el aviso de `show_pane` (post-tool) solo miraba una parte y NADA exigía el commit aparte, ni para skills.
- `pre-tool.mjs`, `texto-de-guido-aparte`: un commit con ese texto no puede llevar otros archivos (CHANGELOG y TODO sí), una skill por commit, y el primer intento se frena una vez para pedir el `show_pane` del diff (huella en `.git/fos-diff-visto.json`; el mismo commit con el mismo texto pasa). `[texto-junto]` solo con el ok de Guido.
- Medición: `probar-pre-tool.mjs` 98 casos y `probar-post-tool.mjs` 18, todos ok (11 y 2 nuevos). Sin revisión independiente de la Auditora.

## Versión 1212 — publicar.mjs --correcciones imprime los dos comandos del commit siguiente [publicar.mjs, audit-acciones.json]
- `tools/publicar.mjs --correcciones` termina imprimiendo el `git add -A` y el `git commit -q -m "Registro de correcciones y sitio regenerado tras: <asunto del último commit>"` exactos (cada uno en su llamada de Bash); `correcciones-desfasado` en `audit-acciones.json` lo dice igual. Sin cambio de lógica.
- Medición: idéntico (`audit`, `escribir`). Sin revisión independiente de la Auditora.

## Versión 1211 — Tigres FC 2016 y 2017: «Costo de ventas» queda en otros gastos [463 · tigresfc-co]
- Decisión por la regla de Colombia (`Admin/paises/co.md`): el rubro pesa 43 % (2016) y 41 % (2017) de los gastos y el comparativo del año siguiente lo repite como «Costo de ventas» con «Gastos de ventas» en 0, así que no entra en la excepción de la actividad deportiva (a diferencia de 2018). No se tocó ningún dato; el motivo del aviso silenciado `siis-entre-anios` de Tigres 2018→2019 lo dice. Sale del 463 el punto (i).
- Medición: idéntico (sin cambio de datos ni de tools).

## Versión 1210 — La auditoría guarda lo que tres chequeos calculan por archivo [audit-cache.js, audit-chequeos-3.js, audit-chequeos-5.js]
- `tools/audit-cache.js`: `checkComaComida` (cada `.md` de `Clubes/`), `checkArchivoNoEsLoQueDice` (los 64 bytes de cada PDF, XHTML y XML) y `checkNombresSinDefinir` (eslint sobre `tools/`) guardan su resultado en `.git/fos-audit-cache.json` y no lo recalculan si el archivo no cambió de tamaño ni de fecha. La clave suma la versión del código de los chequeos (cambiar uno, `rarezas.mjs` o eslint invalida todo); las rarezas ya revisadas se miran en cada corrida; los hallazgos se emiten con `add` siempre. Ningún chequeo ni mensaje cambia. `--sin-cache` o `FOS_SIN_CACHE=1` hacen la auditoría completa.
- `fos probar-cache-audit` (~100 s): mismos hallazgos con y sin caja en el árbol, con una coma comida, un PDF que es HTML y un nombre sin definir plantados, y arreglados. Mediana de `audit.js --json`: 12,8 s sin caja, 8,3 s con caja caliente (35 %).
- Medición: idéntico (`audit`), veredicto GENERAL. Sin revisión independiente de la Auditora.

## Versión 1209 — gestion-exa abre cada fuente de Gemini y la comprueba [gestion-exa.mjs, verificar-fuente-web.mjs]
- `tools/verificar-fuente-web.mjs` (`fos verificar-url <url> --nombre "…"`, gratis) abre una URL citada por un modelo y dice si abre (o el HTTP con que no abre), la fecha de la URL y la que declara la página (meta, JSON-LD, `<time>`; marca cuando difieren de año), y por cada nombre de persona de la afirmación si su apellido aparece en la nota, con la frase. `gestion-exa` lo corre con cada fuente real de Gemini: ✓ el nombre aparece, ✗ no abre o la nota no nombra a nadie del texto. Lo que se hacía a mano con WebFetch.
- Verificado contra las notas ya abiertas a mano: confirma la nota de Cali 2020 con su frase, rechaza la de 2023 (no menciona a Volt) y la URL inventada (404).
- Medición: tools de orden, no leen documentos (`fos que-pide`). Sin revisión independiente de la Auditora.

## Versión 1208 — Cierre del 475: cuánto tarda cargar un club de SIIS y en qué paso se va
- Medido con lo nuevo (`club-siis --avanzar --ejecutar --cargar`, reloj): Atlético FC 10 años en 4 min 28 s (27 s por año) y Real Cartagena 9 años en 5 min 26 s (36 s por año), con la categorización, la escritura de cada año y sus commits; Cúcuta Deportivo, 8 años, 4 min 10 s (31 s por año).
- Dónde queda el tiempo por año: `audit.js --json` ~14,6 s (la compuerta de P0 y P1, hoy una vez por año), `generar-data --check` ~0,15 s y el índice de clubes ~0,2 s; el resto es la categorización, escribir el año y el commit (el hook ya no repite una auditoría idéntica). Lo que queda es la auditoría completa: el único camino a bajarla más es guardar por hash el resultado de los chequeos de `audit.js` que dependen de archivos que no cambian al cargar un año (~6 s de los ~15, medidos en el 475) o escribir todos los años del club y auditar una vez; las dos cosas mueven cuándo corre una compuerta y no se hicieron: el tiempo no es el objetivo.
- Medición: no cambia ninguna tool. Sin revisión independiente de la Auditora.

## Versión 1207 — gestion-exa busca con Gemini y la búsqueda de Google [gestion-exa.mjs]
- `fos gestion-exa <clubId>` (mismo comando para un club de SIIS y uno que no) pregunta a Gemini con `google_search` quién presidió en cada cierre sin gestión confirmada, y devuelve el texto con las afirmaciones y la URL REAL de cada fuente (`groundingChunks`, resueltas); las URLs que el modelo escribe en el texto pueden ser inventadas (una dio 404). Exa queda con `--exa`. Cada llamada anota tokens y búsquedas en `Admin/registros/api/gemini-busqueda.jsonl`. El brief de gestiones dice cómo usarlo.
- Caso que lo motivó: Real Cartagena 2018 a 2020. Exa y WebFetch dejaron huecos y un error (padre e hijo Rendón); Gemini dio en una consulta de 10 búsquedas la muerte del padre (2019-07-09), a Vergara como presidente de la promotora y al hijo como presidente de 2007 a 2021, con notas fechadas que se abrieron para confirmar. La gestión de Real Cartagena se corrigió con eso.
- Medición: `gestion-exa.mjs` es de orden y no lee documentos (`fos que-pide`). Sin revisión independiente de la Auditora.

## Versión 1206 — Cierre del 474: lo adelantado con `--preparar`, medido en dos clubes seguidos
- Cortulua, Tigres FC, Atlético FC y Real Cartagena se cargaron con `--preparar` y los tres subagentes (gestiones, estadio y sponsor, auditor). Tigres se preparó durante la carga de Cortulua y Real Cartagena durante la de Atlético FC.
- Tiempos medidos (reloj, 2026-10-27): `--preparar` de un club entero (9 estados de SIIS, dictámenes y ensayo del alta) ~25 s; los tres subagentes en paralelo 1 a 5 min (el más lento, estadio y sponsor, 5,4 min); alta y lote de categorización ~2 min; la carga de 9 a 10 años y sus commits 4,5 a 5,5 min. Sin lo adelantado, la sesión espera a los subagentes (hasta 5,4 min) antes de cargar: con lo adelantado esa espera se solapa con la carga del club anterior, un ahorro de ~5 min de sesión por club (de ~14 min a ~8).
- El ensayo de estadio-sponsor se repite solo en cada corrida de `club-siis` (una entrada sin sponsor ni `sin-fuente` cuenta como pendiente) y la verificación de sponsors en FKA con Exa es un paso del brief del subagente.
- Medición: no cambia ninguna tool. Sin revisión independiente de la Auditora.

## Versión 1205 — generate-sponsors: un prefijo compartido no une equipos [474 · generate-sponsors.js]
- Un nombre del sitio que es prefijo de varios equipos del país («Atlético FC» frente a «Atlético Huila», «Atlético Nacional»…) ya no se une por prefijo a ninguno: queda sin unir salvo nombre exacto. Salió de la alta de Atlético FC, que se llevó los sponsors de Atlético Huila; en todo `data/sponsors.js` dejan de unirse seis pares falsos (Atlético Huila a Atlético FC, Botafogo-PB a Botafogo, Grêmio Barueri y Prudente a Grêmio, Sporting da Covilhã a Sporting CP) y no se une ninguno nuevo.
- Verificado a mano (474): Cortulua y Tigres FC, y Atlético FC y Real Cartagena, se cargaron con lo adelantado (--preparar y tres subagentes) mientras se cargaba el club anterior; tiempos en la entrada 1206 del CHANGELOG; club-siis muestra ctx y auditor por año (node tools/club-siis.mjs Real Cartagena)
- Medición: lote chico, 1 diferencia, explicada (los seis pares). Veredicto GENERAL. Sin revisión independiente de la Auditora.

## Versión 1204 — club-siis: la lista «para commitear» sale de git status [474 · club-siis.mjs, club-siis-preparar.mjs]
- La lista de `git add` que imprimen `--avanzar` y `--preparar` la calcula `listaParaCommitear` de `git status` (cada carpeta o archivo cambiado de la raíz; las tools de una en una; de `Clubes/` y `Generados/` solo lo de este club, y lo de otro club se dice aparte). Antes estaba escrita a mano y le faltaban el `clubId` de `siis-clubes.json`, las imágenes de `og/` y la verificación de un año recargado.
- Medición: `club-siis` y su módulo no son del pipeline (`fos que-pide`). Sin revisión independiente de la Auditora.

## Versión 1203 — Un club con dos nombres; club-siis y el brief del auditor [474 · json-datos.mjs, generar-data.mjs, generate-club-pages.js, club-siis.mjs]
- `data/clubs.js` admite `names: [{ name, from?, to? }]` (años incluidos) además del `displayName` de hoy; el JSON del club lo copia como `club.names` (campo opcional de `club-v2.json`, no rompe el contrato) y `generar-data --check` compara arreglos. Las páginas `club/<id>` dicen «También conocido como» y llevan `alternateName`. En el sitio, `js/nombres.js` da el nombre de cada año (la tabla de una liga), «antes X (hasta AAAA)» en la ficha y la búsqueda por cualquiera de los nombres. Primer caso: Inter de Palmira (antes Cortuluá, hasta 2023).
- `club-siis`: una entrada de `contexto-manual.json` sin sponsor ni `sin-fuente` cuenta como pendiente salvo que el ensayo de estadio-sponsor (que corre solo, con alta) la dé completa; el brief del auditor ya no pide correr `auditoria.mjs` en un club sin cargar (`[[CARGADO]]` en `Admin/briefs-subagentes-siis.md`).
- Medición: lote completo, 22 diferencias, todas explicadas (el antes de `escribir` no corre con datos que ya llevan el campo; `cargar`, `caja-deuda`, `personal-ensayos` y `alta` idénticos). Sin revisión independiente de la Auditora.

## Versión 1202 — Cortulua y Tigres FC desde SIIS; Inter Palmira es Cortuluá [474 · alias.json, briefs-subagentes-siis.md]
- Cortulua (2020 a 2025) y Tigres FC (2016 a 2022 y 2024) cargados con lo adelantado por `--preparar` (gestiones, estadio y sponsor, auditor); Tigres se preparó mientras se cargaba Cortulua.
- El brief del subagente de estadio y sponsor trae la verificación en FKA con Exa como paso fijo (`sponsor-fka.mjs --buscar` con varios nombres, `--registrar` o `--sin-ficha`), así que ningún sponsor llega «débil» a la sesión.
- `tools/club-league-reference/alias.json`: «Inter Palmira» (Primera B 2024 y 2025) une al roster con `cortulua-co`; antes aparecía como un club aparte con un ingreso estimado. Sin medición: no es una tool del pipeline.

## Versión 1201 — club-siis --preparar corre el ensayo del alta [474 · club-siis-preparar.mjs]
- `--preparar` de un club sin alta corre `alta-club.mjs <último siis-estado> --resumen` (no escribe `data/`) y deja la pregunta del nombre legal en la cola, con su id, para contestarla antes de `--avanzar`. Probado con Cortulua: una pregunta (`name`), contestada con el formato de Envigado y Leones.
- Medición: no es una tool del pipeline (`tools/pipeline-tools.json`); sin revisión independiente de la Auditora.

## Versión 1200 — club-siis --preparar, --avanzar --ensayo y la cola por tipo [474 · club-siis.mjs, club-siis-preparar.mjs, cola.mjs]
- `node tools/club-siis.mjs "<Club>" --preparar` adelanta, sin alta y sin tocar lo que se publica, los estados de SIIS, los dictámenes (los escaneos por Mistral) y deja los briefs de gestiones, estadio y sponsor y auditor con el clubId previsto (slug de la carpeta + `-co`; `--avanzar` avisa si el alta da otro). Las líneas del auditor de un club sin balance van a `Admin/registros/auditoria-adelantada.jsonl` (`auditoria.mjs` rechaza un ejercicio sin balance) y `--mudar-auditor` (y `--avanzar`) las pasan a `auditoria.jsonl` cuando el año está cargado.
- `--avanzar --ensayo` dice qué correría y no escribe nada; sin `--ensayo` avisa al empezar que escribe. `cola.mjs --tipo <motivo>` filtra y el encabezado cuenta los casos por tipo; el filtro por club ya existía como `--dir`.
- Medición: lote completo, idéntico (cola.mjs; club-siis y su módulo no son del pipeline). Sin revisión independiente de la Auditora.

## Versión 1199 — Cargar un año audita una vez, y el commit no repite una auditoría idéntica [475 · cargar-escribir.mjs, segunda-fuente-liga.mjs, audit.js, sello-audit.js, probar-sello-audit.mjs, pre-tool.mjs]
- `publicarCambios` (de `cargar --escribir` y `publicar`) corría `audit.js` dos veces sobre el mismo árbol: la de `segunda-fuente-liga --pendientes` (para ver las ligas de una sola fuente, ~12 s) y la compuerta (~12 s). Ahora corre una `audit.js --json` que es la compuerta y da esas ligas (`segunda-fuente-liga --hallazgos <archivo>`); si la segunda fuente escribe algo, regenera y audita de nuevo; con P0/P1 o salida ilegible, la compuerta es la de siempre (`--quiet`, mismo texto). `publicar` baja de ~29 a ~19 s.
- `tools/sello-audit.js`: `audit.js` guarda en `.git/fos-audit-sello.json` el estado del árbol (HEAD, el día, tamaño y mtime de cada archivo que `git status` lista) cuando da P0 0 y P1 0; el hook de commit no repite la auditoría si el estado es idéntico y audita ante cualquier diferencia. `node tools/fos.mjs probar-sello-audit` (12 casos).
- Verificado a mano (475): tiempos de dos clubes y el paso que queda, en la entrada 1208.
- Medición: lote completo, idéntico (cargar, cargar-cola-vacia y audit). Sin revisión independiente de la Auditora.

## Versión 1198 — fos gestion-exa [463 · gestion-exa.mjs]
- `node tools/fos.mjs gestion-exa <clubId> [--nombre "Club"] [--anios 2016-2025 | "2016, 2017"]` marca los cierres que ninguna gestión confirmada de `data/gestiones/<iso>.js` cubre (con el club cargado o sin alta) y trae de Exa, por cada año con hueco, las notas de prensa de nombramiento y de renuncia con su fecha de publicación (~US$ 0,007 por consulta; queda en `Admin/registros/api/exa.jsonl`). No escribe `data/gestiones`. El brief del subagente de gestiones (`Admin/briefs-subagentes-siis.md`) empieza por él.
- Caso: América de Cali 2023, que una fuente débil (Wikipedia, 2024-01-04) dejaba sin cobertura, quedó con la nota de El Tiempo del 29-12-2023 («con Marcela al frente del equipo»).
- Medición: no es del pipeline (no pide medición).

## Versión 1197 — regla-de-pais-en-doc-general mira también ESTADO.md y PIPELINE.md [472 · reglas-pais.mjs, audit-chequeos-siis.js, pre-tool.mjs]
- El aviso P3 y el hook de `pre-tool` miran los `##` y `###` de `ESTADO.md` y `PIPELINE.md` (además de los `## REGLA:` de `CONVENCIONES-DATOS.md`) con `paisDeTitulo()`; el hook rechaza el título nuevo, no uno que ya está en el archivo. Un título general que nombra un país se acepta con su motivo en `tools/titulos-pais-aceptados.json` (hoy «Dinamarca: los informes en XHTML», que es un formato).
- Hoy marca 1 de 61 títulos de `ESTADO.md`, `PIPELINE.md`, `CONVENCIONES.md` y `PANTALLA.md` (el de Dinamarca, aceptado); la prueba del hook (`probar-pre-tool.mjs`) tiene 5 casos nuevos y da 87 ok.
- Verificado a mano (472): aviso y hook cubren CONVENCIONES-DATOS, ESTADO y PIPELINE; excepción de Dinamarca escrita con motivo en tools/titulos-pais-aceptados.json; probar-pre-tool.mjs 87 casos ok (5 nuevos); audit P0 0 P1 0; medido (audit idéntico)
- Medición: lote chico del medidor audit, idéntico. Sin revisión independiente de la Auditora.

## Versión 1196 — PIPELINE.md sin lo que solo vale para un país [471 · audit-acciones.json]
- Mudado a `Admin/paises/`: «Colombia: los estados de SIIS» (`co.md`), el camino de Rusia (`ru.md`, nuevo) y lo belga del esquema NBB (escalón «códigos NBB» y el 630 por la nota, año sin ingresos, caja sin vecino: `be.md`, «Pipeline de Bélgica»); en `PIPELINE.md` quedan punteros y la sección «Lo que solo vale para un país». Pesa 142 KB (150 KB antes). Sin las notas de «Medido…» de lo mudado.
- La medición por menciones daba ~52 KB belgas; por sección, no hay una sección belga y lo propio de Bélgica es ~3 KB. «Dinamarca: los informes en XHTML» se queda: es el formato (también británico), no el país.
- Verificado a mano (471): PIPELINE.md sin secciones propias de un país (Colombia SIIS, Rusia y lo belga NBB mudados a Admin/paises/{co,ru,be}.md, con punteros); audit P0 0 P1 0; citas actualizadas (audit-acciones.json, ESTADO, TODO, skill trampas); reglas-categoria lee las mismas 36 reglas
- Medición: no es del pipeline (solo texto y la ruta citada por `audit-acciones.json`); `audit.js` P0 0 P1 0 y `reglas-categoria` lee las mismas 36 reglas.

## Versión 1195 — fos comparar-carga [comparar-carga.mjs]
- `node tools/fos.mjs comparar-carga "<pdf>"` corre el ensayo de `cargar` y lo compara con lo cargado del año: qué frena, si los totales de ingresos y gastos dan lo mismo y qué líneas cambian de categoría; restaura los registros que el ensayo toca. Reemplaza el script suelto que se armaba antes de cada recarga.
- Medición: no es del pipeline (no pide medición).

## Versión 1194 — `--respuestas` lee los casos de la cola; la nómina suma «Aportes Admin…» [470 · reglas-categoria.mjs, audit-chequeos-siis.js]
- `respuestasContradichas()` lee los casos de categoría respondidos de `cola-revision.jsonl` (los que de verdad ganan sobre la regla), no `categorias-aprendidas.jsonl` (24 falsos avisos, 4 reales); el vocabulario de nómina reconoce `admin*` en los aportes.
- Cierre del 470: Bucaramanga 2019 y 2020 y Fortaleza 2017 recargados con `cargar` sin frenar y con los mismos totales; el comando que rehace la categoría de una línea cargada se descarta (`--cargadas` más `recategorizar-linea --gasto` y la recarga del año alcanzaron).
- Verificado a mano (470): Bucaramanga 2019 y 2020 y Fortaleza 2017 recargados con cargar --reemplazar --escribir sin frenar; ensayo contra lo cargado con los mismos totales y solo cambian filas de nómina/Logistica/Otros auxilios por la regla de co.md; reglas-categoria --cargadas y --respuestas dan 0; aviso respuesta-contradice-regla medido (lote completo, diferencias explicadas); el comando de rehacer línea se descartó (CHANGELOG 1194)
- Medición: lote completo, 6 diferencias, todas explicadas (filas de nómina de la nota de administración de Fortaleza). Sin revisión independiente de la Auditora.

## Versión 1193 — El pie de la cola nombra los tres flags de --responder [cola.mjs]
- El pie de `node tools/cola.mjs` agrega `--evidencia`, `--seguridad` y `--causa` (obligatorios); se quita un comentario repetido del archivo para quedar bajo el límite de tamaño.
- Medición: lote completo, idéntico. Sin revisión independiente de la Auditora.

## Versión 1192 — La regla por nota reconoce la nómina; aviso de respuestas de la cola que la contradicen [470 · reglas-categoria.mjs, audit.js, audit-chequeos-siis.js]
- `reglaDeNota()`: el concepto «personal» cubre también los componentes sueltos de la nómina (cesantías, prima de servicios, vacaciones, auxilios, indemnizaciones laborales, aportes); antes esas filas caían a la cola aunque estuvieran en la nota de administración.
- `node tools/reglas-categoria.mjs --respuestas` y aviso P3 `respuesta-contradice-regla` en `audit.js`: el caso de categoría de la cola, con su respuesta, que la regla por nota manda a otra categoría (una respuesta gana sobre la regla al recargar el año; nota de la fila por `padreEnDoc`). Cola de Fortaleza 2017 y 2023: 4 respuestas contestadas de nuevo.
- Cola de Atlético Bucaramanga 2019 y 2020: 22 respuestas por la regla de `co.md`; la recarga limpia da los mismos totales.
- Medición: lote completo, 8 diferencias, todas explicadas (filas de nómina de la nota de administración de Fortaleza y Bucaramanga). Sin revisión independiente de la Auditora.

## Versión 1191 — Reglas de país: aviso, hook y puntero automático [469 · audit.js, audit-chequeos-siis.js, cargar.mjs, docs-reglas.mjs, club-siis.mjs, recategorizar-linea.mjs, pre-tool.mjs]
- Aviso P3 `regla-de-pais-en-doc-general` (la lista `node tools/reglas-pais.mjs`) y hook `pre-tool` que rechaza agregar a `CONVENCIONES-DATOS.md` un `## REGLA:` con un país en el título y dice en qué `Admin/paises/<iso>.md` va (82 casos de la prueba del hook, todos ok). Hoy no hay ninguno.
- `cargar` (por stderr), `club-siis` y `recategorizar-linea` imprimen al empezar «Reglas de datos de CO: Admin/paises/co.md» cuando el país del club tiene archivo.
- Verificado a mano (469): CONVENCIONES-DATOS.md y ESTADO.md sin reglas ni detalle de un país; las 6 reglas están en Admin/paises/{be,co,de,tr}.md (en el índice); reglas-categoria da 36 reglas y audit P0 0 P1 0; el hook y el aviso regla-de-pais-en-doc-general impiden que vuelva
- Medición: lote completo, medidores cargar, cargar-cola-vacia, audit y escribir: cargar idéntico; en audit salen 2 `import-sin-export` del estado anterior; en escribir se suman dos pasos `caja-deuda --personal` ok. Sin revisión independiente de la Auditora.

## Versión 1190 — Comentarios de siis-estado, siis-notas y audit-chequeos-siis apuntan a Admin/paises/co.md [469 · siis-estado.mjs, siis-notas.mjs, audit-chequeos-siis.js]
- Los comentarios que citaban la regla de Colombia en `CONVENCIONES-DATOS.md` citan `Admin/paises/co.md`.
- Medición: solo comentarios, código sin comentarios idéntico (`fos medir pipeline`).

## Versión 1189 — Las reglas de un país salen de CONVENCIONES-DATOS.md a Admin/paises/<iso>.md [469 · reglas-pais.mjs, club-siis.mjs]
- `node tools/reglas-pais.mjs` (ensayo por defecto, `--escribir` mueve) pasa a `Admin/paises/<iso>.md` las reglas cuyo título nombra un país fuera del paréntesis del caso. Se movieron 6: Colombia (3), Bélgica, Alemania y Turquía. `CONVENCIONES-DATOS.md` pasa de 81 a 67 KB y queda con las generales.
- `ESTADO.md` deja el detalle de SIIS (qué clubes, qué comandos) y apunta a `Admin/paises/` y a `club-siis.mjs`.
- Se quitó la historia de lo movido y de varias reglas generales (fechas de decisión, citas de pedidos, contadores, el relato de cómo se descubrió); las referencias a esas reglas (`club-siis.mjs`, `audit-acciones.json`, `PIPELINE.md`) apuntan al archivo nuevo.
- Medición: `reglas-categoria` da lo mismo (36 reglas, 14 con frase para el prompt, 19 ejemplos, 0 sin registrar); `club-siis.mjs` no es del pipeline.

## Versión 1188 — Las reglas de datos se leen de CONVENCIONES-DATOS.md y de Admin/paises/<iso>.md [469 · reglas-categoria.mjs, docs-reglas.mjs, votacion-nueva.mjs, historia.mjs, existe.mjs, audit-chequeos-2.js]
- `tools/docs-reglas.mjs` da la lista de documentos de reglas (el general y un archivo por país); `reglas-categoria.mjs`, `votacion-nueva.mjs`, `historia.mjs`, `existe.mjs` y la lista de documentos de criterio del audit la usan, así un país nuevo no obliga a tocarlos. Las reglas llevan su `archivo` y los mensajes de error lo nombran.
- Medición: lote completo, medidores cargar y audit: cargar idéntico; en audit solo sale `indice-md-desfasado` (el índice se regeneró antes de medir). Sin revisión independiente de la Auditora.

## Versión 1187 — Sponsors por Exa sin pasar por el anuncio de FKA; los avisos de dictamen resueltos y silenciados [468 · sponsor-fka.mjs, dictamen-fechas.mjs · alianzafc-co]
- `sponsor-fka.mjs` ya no tiene el camino de abrir FKA a mano; `--buscar` prueba hasta cuatro consultas por año y varios nombres (`--nombre "A|B"`), y `--registrar --sin-ficha "<qué se probó>"` anota lo que Exa no trae. Los 13 años quedaron cerrados (Boyacá 2020 y Tolima 2017 verificados; Once Caldas 2017, 2019 y 2020 y Alianza FC 2016 a 2023 sin ficha).
- `dictamen-fechas.mjs` mira también el encabezado y descarta notas de fuente, normas y la fecha del cierre; no lee meses en griego ni cirílico. Queda un aviso, Alianza FC 2025 (firma con el año del dictamen anterior): corregido en la nota del registro y silenciado.
- Medición: lote chico del medidor `audit`, 5 diferencias, todas explicadas: salen 5 avisos `dictamen-fechas-ajenas` y ninguno aparece. Sin revisión independiente de la Auditora.

## Versión 1186 — sponsor-fka --buscar lee la ficha en inglés; 24 sponsors débiles verificados [468 · sponsor-fka.mjs · oncecaldas-co, boyacachico-co, unionmagdalena-co, deportestolima-co, laequidad-co]
- Exa devolvía la ficha en el idioma del buscador (/el/, /zh/, /ar/), con los rótulos traducidos y sin el campo Sponsor, y contaba como «sin sponsor» lo que era un error de lectura. Ahora la tool lee la misma ficha sin el prefijo de idioma con Exa `/contents` (US$ 0,001), entiende sus dos formatos de texto e imprime también la liga (para ver que no es otro club: «Alianza FC» devuelve las de El Salvador y Panamá).
- 24 años registrados en `Admin/registros/sponsor-fka.jsonl` (La Equidad 2016 a 2022 Cotrafa, Boyacá Chicó 2016 y 2017 a 2023 sin campo, Once Caldas 2016, 2018 y 2021, Tolima 2016, 2018, 2019 y 2022, Unión Magdalena 2016 y 2022); uno no coincidía: Unión Magdalena 2022 pasa de «sin dato» a Wplay (ficha de la camiseta local), en `contexto-manual.json` y `data/contexto/co.js`. Los 13 que quedaban se cierran en la Versión 1187.
- Medición: no es del pipeline (clasificada como tool de sesión, no pide medición).
