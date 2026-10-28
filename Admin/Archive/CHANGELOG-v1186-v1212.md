<!-- md: CHANGELOG archivado, versiones 1186 a 1212 | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->
# Changelog archivado, versiones 1186 a 1212

Salieron de `Admin/CHANGELOG.md` con `node tools/fos.mjs changelog archivar`. Las rutas son las de su época.

---

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
