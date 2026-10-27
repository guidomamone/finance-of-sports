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

## Versión 1197 — regla-de-pais-en-doc-general mira también ESTADO.md y PIPELINE.md [472 · reglas-pais.mjs, audit-chequeos-siis.js, pre-tool.mjs]
- El aviso P3 y el hook de `pre-tool` miran los `##` y `###` de `ESTADO.md` y `PIPELINE.md` (además de los `## REGLA:` de `CONVENCIONES-DATOS.md`) con `paisDeTitulo()`; el hook rechaza el título nuevo, no uno que ya está en el archivo. Un título general que nombra un país se acepta con su motivo en `tools/titulos-pais-aceptados.json` (hoy «Dinamarca: los informes en XHTML», que es un formato).
- Hoy marca 1 de 61 títulos de `ESTADO.md`, `PIPELINE.md`, `CONVENCIONES.md` y `PANTALLA.md` (el de Dinamarca, aceptado); la prueba del hook (`probar-pre-tool.mjs`) tiene 5 casos nuevos y da 87 ok.
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

## Versión 1185 — club-siis ya no deja misses.jsonl para restaurar [468 · lookup-club-league.js, club-siis.mjs]
- `lookup-club-league.js --sin-anotar` hace la misma consulta sin escribir `tools/club-league-reference/misses.jsonl`; `club-siis.mjs` lo pasa en sus dos consultas (la lista de clubes, `--evaluar` y la liga de cada año), que son de solo lectura. Sin la bandera (alta-club y los demás) todo igual.
- Medición: lote completo, medidores lote-ensayo, alta y cargar: idéntico. Sin revisión independiente de la Auditora.

## Versión 1184 — dictamen-fechas.mjs: aviso dictamen-fechas-ajenas [468 · audit.js, audit-chequeos-siis.js, dictamen-fechas.mjs]
- `node tools/dictamen-fechas.mjs` (gratis) mira, en cada línea de `Admin/registros/auditoria.jsonl` cuyo `.md` es un informe del auditor, las fechas de la firma (4 líneas arriba y 1 abajo de la cita del auditor) contra el cierre del ejercicio del JSON del club: firma anterior al cierre, o más de 30 meses después, o un `.md` que no nombra el año del cierre. `audit.js` lo muestra como P3 `dictamen-fechas-ajenas`. Solo mira documentos que son el informe (no un balance entero) y meses en español, portugués, inglés, italiano, alemán, francés y neerlandés: 75 de 1.459 líneas se pueden mirar hoy.
- Salen 6: Alianza FC 2025, 2024 y 2023, Deportes Tolima 2023, AEL Larissa 2017 y Lazio 2006 (resueltos en la Versión 1187).
- Medición: lote chico del medidor `audit`, 7 diferencias, todas explicadas: aparecen los 6 avisos nuevos y sale `tool-sin-clasificar` de `dictamen-fechas.mjs` (se clasificó antes de medir). Sin revisión independiente de la Auditora.

## Versión 1183 — sin-salarios: SIIS sin Gastos de ventas [468 · audit-chequeos-4.js]
- `sin-salarios` no aplica cuando el `siis-estado-AAAA.md` del año no trae «Gastos de ventas» (o lo trae en 0) y sí «Gastos de administración»: la regla de Colombia manda el rubro tal cual y no hay nómina del plantel que separar. Se sacan de `audit-ignore.json` los tres silencios manuales que lo decían (Alianza 2017 y 2018, L12-L14 de su `siis-estado`; Fortaleza 2016, L12-L15); la cita vive ahora en la condición, que lee las mismas líneas.
- Medición: lote chico del medidor `audit`, 3 diferencias, las tres explicadas: salen los hallazgos `sin-salarios` de esos tres club-años (silenciados hasta hoy); ninguno aparece. Sin revisión independiente de la Auditora.

## Versión 1182 — audit.js: aviso regla-nota-contradicha [468 · audit.js, audit-chequeos-siis.js, reglas-categoria.mjs]
- Aviso P3 `regla-nota-contradicha`: las líneas de gastos cargadas que la regla por nota (`NOTA-CATEGORÍA`) manda a otra categoría, por club, con la nota de cada fila; las lista `node tools/reglas-categoria.mjs --cargadas` (0,4 s). Probado al revés: con una regla cambiada a propósito lista 50 líneas. Hoy da 0.
- Entra sin veredicto previo de la Auditora (sección 7: aviso P3 nuevo que no frena nada) y sin revisión independiente.
- Medición: idéntico (lote completo, medidores cargar y audit); el aviso no aparece porque lo cargado ya cumple la regla.

## Versión 1181 — Colombia: lo cargado que la regla de notas contradecía, corregido [468 · alianzafc-co, atleticobucaramanga-co, fortalezaceif-co, deportestolima-co, oncecaldas-co]
- 21 líneas de gastos, un commit por club con `Corrige:`: «Diversos» a `other_expenses` (Alianza 2019 y 2023, Bucaramanga 2019 y 2020, Tolima 2016 a 2023 y 2025, Once Caldas 2016 a 2018) y los viajes de la nota de administración a `admin_general_expense` (Bucaramanga 2020, Fortaleza 2019, Once Caldas 2016 y 2017). Los totales de cada año no cambian. Alianza se rehízo con `cargar --reemplazar` (corrigiendo antes la respuesta vieja de la cola); los demás con `recategorizar-linea --gasto`, porque `cargar` no los puede rehacer (Bucaramanga 2019 y 2020 frenan con 19 filas en la cola, ya antes de este cambio).
- Un escaneo de todo `data/co` con la nota de cada fila contra la regla da 0 diferencias.
- Medición: solo datos; ninguna tool cambió.

## Versión 1180 — recategorizar-linea: líneas de gastos [468 · recategorizar-linea.mjs]
- `--gasto` (y `--importe <monto>` para desempatar dos líneas con la misma etiqueta) cambia la categoría de una línea de GASTOS de un ejercicio ya cargado, con su cita y su respuesta en la cola; sirve para los años que `cargar` no puede rehacer (Bucaramanga 2019 y 2020 frenan con 19 filas en la cola) y corrige lo que la regla de notas de Colombia contradice.
- Medición: no es del pipeline (clasificada «manual», no pide medición).

## Versión 1179 — La regla escrita de las notas de gastos de Colombia gana sobre el precedente y sobre Jev [468 · cargar-categorias.mjs, categorizar-claude-listos.mjs, reglas-categoria.mjs]
- Causa: la regla `CATEGORÍA (prompt)` solo llegaba al prompt de Claude; el precedente del club (mal aprendido de un año) o Jev decidían antes y repetían el error.
- `NOTA-CATEGORÍA (co): <nota> | <concepto> | <categoría>` en la regla de Colombia y `reglaDeNota()` en `reglas-categoria.mjs`: se aplica antes del precedente en `categorizar-claude-listos.mjs` y al empezar `catDe` de `cargar-categorias.mjs`; una respuesta de la cola o un ajuste manual de la fila siguen ganando. Si la nota no se sabe no decide.
- 21 líneas cargadas la contradecían (Diversos y viajes de administración) y se corrigieron con `Corrige:`, un commit por club.
- Medición: lote completo, 42 diferencias, todas de clubes colombianos: filas que la regla corrige, filas que ya iban a esa categoría y dejan de preguntarse, Bucaramanga 2019 «Refrigerios» fuera de la cola por materialidad, Once Caldas 2016 y 2017 frenadas por el choque con una respuesta vieja (resuelto al corregirla). Nada fuera de Colombia cambió. Sin revisión independiente de la Auditora.

## Versión 1178 — sponsor-fka --buscar: Football Kit Archive con Exa [468 · sponsor-fka.mjs]
- `node tools/sponsor-fka.mjs <clubId> --buscar --nombre "<Club>"` consulta Exa (`tools/exa-search.mjs`, clave en `Admin/api-keys/exa.env`) por cada año de sponsor débil y lee de las fichas de camisetas de FKA el campo Sponsor y la marca, sin el cartel «View a short ad»; imprime lo hallado y el comando para registrarlo. Cuesta ~US$ 0,007 por año (anotado en `Admin/registros/api/exa.jsonl`). `club-siis` lo ofrece primero y deja Claude in Chrome para los años que Exa no trae.
- Probado: Once Caldas 2018 da Colanta (coincide con lo cargado, ficha de FKA); 2016 y 2021 la ficha no tiene campo Sponsor (coincide con «sin sponsor»); 2017, 2019 y 2020 Exa no trae la ficha. Boyacá Chicó: 2016 a 2023 sin campo Sponsor en FKA (no contradice los `sin-fuente`).
- Medición: no es del pipeline (no pide medición).

## Versión 1177 — fos club-datos [468 · club-datos.mjs]
- `node tools/fos.mjs club-datos <clubId> <año> [gastos|ingresos|todo]` imprime las líneas de un año de un club (etiqueta, subcategoría, importe) con el total por subcategoría y los totales oficiales; reemplaza los scripts sueltos del scratchpad que se armaban para mirar un año cargado.
- Medición: no es del pipeline (no pide medición).

## Versión 1176 — El punto 463 del TODO, compacto, y el 468 con los arreglos que salieron de cargar clubes de SIIS [463, 468]
- Lo hecho del 463 (la tool, el chequeo, el criterio y los clubes cargados) pasó entero a `Admin/Archive/TODO-463-siis-hecho.md`; el 463 queda con los clubes que faltan y lo pendiente de lo ya cargado, y se pausa. Nuevo punto 468 con los arreglos que Guido aprobó (el categorizador contra la regla de Colombia primero), a razón de dos por turno.
- Medición: solo documentos; ninguna tool cambió.

## Versión 1175 — Alianza FC 2016 a 2022, 2024 y 2025 desde SIIS [463 · alianzafc-co]
- Con esto Alianza FC (antes Alianza Petrolera) tiene sus 10 años. Las ligas las escribió `club-siis --avanzar` buscando también por los alias (`Alianza Petrolera` y `Alianza` en `alias.json`; antes no encontraba nada). Estadio Daniel Villa Zapata; sponsor `sin-fuente` de 2016 a 2022 (nadie lo nombra), marca de 2016 y 2022 de una sola base de aficionados. Líneas del auditor de 2020 a 2025 (2020 con salvedades; 2021 y 2022 dicen «introducir una salvedad» en el texto pero no en la opinión: dejadas sin salvedades, a revisar). Faltan los dictámenes de 2016 a 2019.
- Corrección en 2019: «Gastos de personal (Gastos de ventas)», 2.569 M de pesos, estaba como administración y va a sueldos del plantel (regla de Colombia); `Corrige:`. Silencios `sin-salarios` de 2017 y 2018 (SIIS pone todos los gastos en administración).
- Medición: no cambió ninguna tool pipeline (`club-siis.mjs` busca la liga por alias); la carga corrió con categorización primero y cola de una sola pregunta (resultado idéntico entre el balance de 2023 y el comparativo de SIIS).

## Versión 1174 — Regla de Colombia: las filas de una nota de Costo de ventas [463 · boyacachico-co]
- La regla de las notas de gastos suma el caso que abrió dos preguntas en Boyacá Chicó 2019: una fila de la nota de «Costo de ventas» que nombra la actividad deportiva sin separar nómina, partidos ni viajes («Partidos y Actividades Deportivas») va a `lump_football_operations_expense` (espejo del ingreso «Actividades Deportivas» de Fortaleza CEIF, tabla aprobada por Guido el 2026-10-02) y «Honorarios y Arriendos» a administración. Con su frase para el categorizador y dos ejemplos registrados (`reglas-categoria --escribir`).
- Medición: ninguna tool cambió; es texto de criterio que Guido lee en el diff.

## Versión 1173 — club-siis: sponsor débil a Football Kit Archive, cola a la vista antes de cargar y brief con las ligas [463, 467 · club-siis.mjs, sponsor-fka.mjs]
- `club-siis` lista, en el estado de cada club y al final de `--avanzar`, los sponsors débiles o sin dato (`tools/sponsor-fka.mjs`) como paso fijo: verificarlos en Football Kit Archive con Claude in Chrome y anotarlos con `sponsor-fka --registrar` (Admin/registros/sponsor-fka.jsonl). Probado: FKA da la verificación anti-bots en el navegador interno y 403 a las tools; en el Chrome de Guido abre la ficha del equipo (proveedores por año visibles) pero tapa el resto con «Unlock more content / View a short ad»: sin ver el anuncio, que es de Guido, el sponsor de cada temporada no se lee. El punto 467 del TODO se cierra: el paso vive en el script.
- `--avanzar --ejecutar --cargar`, si la cola frena la carga, imprime cada pregunta con su propuesta y el comando para contestar y volver a correr (la categorización ya está hecha); el brief del subagente de estadio y sponsor trae la liga de cada año, la fecha y «clave existente: agregá solo los años que faltan».
- Medición: ninguna es del pipeline (no piden medición); el brief probado con Unión Magdalena y Alianza FC.

## Versión 1172 — Unión Magdalena 2016, 2017 y 2019 a 2024 desde SIIS [463 · unionmagdalena-co]
- Con esto Unión Magdalena tiene sus 10 años. Ligas escritas por `club-siis --avanzar` desde el roster de Wikipedia; «Gastos de ventas» sin abrir fue a fútbol profesional sin desglosar solo (la corrección nueva de `--avanzar`); dictámenes de 2022 y 2023 por OCR (US$ 0,08). Estadio Federico Serrano Soto en 2016 (8.000, una sola ficha); sponsor de 2016 y 2022 `sin-fuente` (Wplay 2022 sin confirmar). Líneas del auditor de 2022 a 2024, sin salvedades; faltan los dictámenes de 2016 a 2021.
- Por primera vez el lote de categorización corrió antes y sin `--cargar`: la cola quedó vacía y la carga salió de una vez.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (~16 min por corrida).

## Versión 1171 — Boyacá Chicó 2016 a 2023 desde SIIS [463 · boyacachico-co]
- Con esto Boyacá Chicó tiene sus 10 años. La liga de cada año la escribió `club-siis --avanzar` desde el roster de Wikipedia (coincidencia exacta; primera vez que corre con un club). Estadio La Independencia (capacidad actual, 20.630, débil para 2016 y 2017); marca Geus; sponsor: Universidad de Boyacá 2016 (débil), «sin sponsor» 2023 (una sola fuente) y `sin-fuente` de 2017 a 2022. Líneas del auditor de 2020 a 2023 (2023 con salvedades por las instrucciones de la Superintendencia); faltan los dictámenes de 2016 a 2019.
- Cola de 2019: «Partidos y Actividades Deportivas» (61 % de los gastos, nota de Costo de ventas) a `lump_football_operations_expense` por el espejo del ingreso «Actividades Deportivas» de Fortaleza, y «Honorarios y Arriendos» a administración por la regla escrita.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (dos corridas) y la cola quedó sin preguntas.

## Versión 1170 — cola.mjs --historial y club-siis --avanzar con la liga y los comandos de commit [463, 465 · cola.mjs, cola-historial.mjs, club-siis.mjs]
- `node tools/cola.mjs --historial <texto> [motivo]` imprime la historia de un club (cada caso y cada respuesta, en orden) llamando a `cola-historial.mjs`, que entra a la tabla del pipeline. `cola.mjs` quedó en 40.930 bytes (límite 40.960): comentarios viejos con historia achicados.
- `club-siis --avanzar` escribe en `data/club-leagues/co.js` la liga de los años donde el roster de Wikipedia da el nombre exacto (sin probar todavía con un club nuevo) y al final imprime los tres comandos de commit, uno por llamada.
- Medición: `cola.mjs` y `cola-historial.mjs` (lote completo, siete medidores) idéntico, veredicto GENERAL; `club-siis.mjs` no es del pipeline. Costó cuatro corridas: dos por `tool-grande` y por una clasificación que tenía que estar en el commit antes de medir (la prueba de escritura corre en un worktree armado desde el último commit).

## Versión 1169 — Once Caldas 2016, 2017, 2019, 2020 y 2021 desde SIIS [463 · oncecaldas-co]
- Con esto Once Caldas tiene sus 10 años (2016 a 2025). Liga Primera A de Wikipedia (coincidencia exacta); estadio Palogrande (28.678) y marca de Wikipedia; sponsor de FKA, fuente única y débil: «sin sponsor» 2016 y 2017, Colanta 2019 a 2021 (revisar con prensa colombiana con fecha). 2016 y 2017 abren con las notas del club; 2019 a 2021 quedan como SIIS. Líneas del auditor de 2016, 2017, 2019 y 2021 (sin salvedades; 2019 de otra firma, Gerencia y Control); falta el dictamen de 2020.
- Medición: no cambió ninguna tool; la carga corrió en segundo plano (~11 min) con `club-siis --avanzar --ejecutar --cargar --en-segundo-plano` y la cola quedó sin preguntas.

## Versión 1168 — Fortaleza CEIF 2016 desde SIIS [463 · fortalezaceif-co]
- Con esto Fortaleza CEIF tiene sus 10 años (2016 a 2025). Liga Primera A de 2016 (ascendió de la B en 2015 y descendió al cerrar 2016), estadio Metropolitano de Techo y sponsor «Seguros del Estado» de Wikipedia (fuente única, débil); en SIIS el club imprime Costo de ventas y Gastos de ventas en 0 y todos los gastos en administración, así que `sin-salarios` queda silenciado con la cita. Sin dictamen del revisor fiscal de 2016 a 2019.
- Medición: no cambió ninguna tool; el año por el pipeline medido, con el camino `club-siis --avanzar --ejecutar --cargar` en unos 3 minutos y la cola sin preguntas.

## Versión 1167 — fos siis-adicionales: los documentos adicionales de SIIS por club-año [465 · siis-adicionales.mjs]
- Un GET por año a `documentos-adicionales` con el radicado de los `siis-estado-AAAA.json` ya bajados (si el del resultado integral dice «None», el de empresas o balance: Tolima 2021 y 2022) y lista trámite y radicado contra lo que hay en la carpeta. Sin descargas. Muestra lo que antes se rehacía en el scratchpad: Tolima 2022 y 2025 traen dictámenes, certificaciones y notas por duplicado.
- Verificado a mano (465): Cada pendiente hecho con su commit y entrada de CHANGELOG (Versiones 1158 a 1167) o descartado con motivo en este TODO; mediciones de publicar, cargar-ejercicio y auditoria idénticas; audit.js P0 0 y P1 0.
- Medición: no es del pipeline (no pide medición); probado con Deportes Tolima.

## Versión 1166 — fos cola-historial club y patrón del veredicto desde una lista corta [465 · cola-historial.mjs, patron.mjs, cerrar-tool.mjs, patrones-tools.mjs]
- `fos cola-historial club <texto> [motivo]` imprime en orden cada caso y cada respuesta de un club (decisión, causa, nota), sin armar un script suelto.
- `fos patron` y `fos cerrar-tool` sin `--patron` ni `--sin-documentos` toman el patrón (o el motivo) de cada tool cambiada de `tools/patrones-tools.json`; `cerrar-tool` frena en segundos, antes de medir, si a una tool le falta la entrada. La lista arranca con 8 tools y se suma una cuando hace falta.
- Medición: ninguna es del pipeline (no piden medición); probado a mano con tools sueltas y con una sin entrada.

## Versión 1165 — fos git-resumen y aviso del hook al leer entera una tool grande [465 · git-resumen.mjs, post-tool.mjs]
- `node tools/fos.mjs git-resumen`: `git status` sin las páginas generadas (club/, liga/, fuentes/, og/, los `-data.js`), un renglón con la cuenta de cada tipo y el resto archivo por archivo; evita las ~600 líneas de después de un alta.
- `tools/hooks/post-tool.mjs` avisa (sin bloquear) cuando un `Read` trae entera una tool de más de 30 KB y manda a `fos mapa` y a `Read` con offset y limit; `.claude/settings.json` suma `Read` al matcher de PostToolUse (ningún chequeo ni mensaje existente cambia; `probar-post-tool.mjs` con cuatro casos nuevos, 16 de 16 ok; `probar-pre-tool.mjs`, 79 de 79).
- Medición: ninguna de las dos es del pipeline (no piden medición).

## Versión 1164 — fos siis-notas-clasificar: por qué las notas no abren un rubro de SIIS [465 · siis-notas-clasificar.mjs]
- Gratis y sin red: de cada club-año de SIIS dice qué rubros abren las notas del club y clasifica los que no en «sin nota», «casi suma» (con la diferencia en miles de pesos), «ninguna se acerca» y «estructura», con `abrirConNotas` de `siis-notas.mjs`. Hoy: 51 rubros abren, 20 casi suman (de 0,5 a 12.831 miles de pesos), 125 ninguna tabla se acerca, 132 sin nota del club, 2 estructura.
- Medición: `siis-notas-clasificar.mjs` no es del pipeline (no pide medición); no cambia `siis-notas.mjs`.

## Versión 1163 — medidor cargar-cola-vacia: cuántas preguntas abre la carga con la cola vacía [465 · medir-cargar.mjs, pipeline-tools.json]
- `medir-cargar.mjs --cola-vacia` corre el ensayo de la carga con la cola de partida sin una respuesta, como un club nuevo, y `--comparar` imprime «preguntas que abre: N antes · M después». Con la cola real una pregunta ya contestada no se ve: en el lote chico la cola real abre 1 pregunta y la vacía 74, así que un cambio que abre más preguntas pasaba sin que el medidor `cargar` lo notara.
- Es el medidor `cargar-cola-vacia` de `tools/pipeline-tools.json`, sumado solo a `cargar.mjs` (y por import a `cargar-categorias.mjs` y `cargar-ejercicio.mjs`): +unos 6 minutos a su medición (de ~14 a ~20 en el completo).
- Medición: `medir-cargar.mjs` y `pipeline-tools.json` no son del pipeline (no piden medición); probado de punta a punta con `medir-pipeline --solo-chico --medidor cargar-cola-vacia` (idéntico, sin anotar).

## Versión 1162 — auditoria.mjs --extractos avisa los club-años sin informe del auditor [465 · auditoria.mjs]
- Al escribir los extractos, lista los club-años cuyos `.md` no traen ninguna frase de un informe del auditor y dice qué hacer (`sin_informe` o `falta_transcripcion`): citar el `.md` de otro ejercicio se rechaza («es del ejercicio X, no del Y») recién al final de la corrida.
- Sin pendientes hoy, el aviso no se pudo ver disparar; se revisó solo el código.
- Medición: `auditoria.mjs` (lote completo, medidores cargar y audit) idéntico; veredicto GENERAL (681 documentos de 131 clubes).

## Versión 1161 — cargar-ejercicio.mjs: la pregunta de gestión no se repite con otro detalle [465 · cargar-ejercicio.mjs]
- Causa: contestada la pregunta genérica del club (`aceptar`) con la gestión todavía sin cubrir el año, la corrida siguiente abría otra con detalle `club:año` para el mismo documento (Medellín 2018 a 2023, 6 preguntas). Ahora, si ese documento ya tiene una pregunta de gestión contestada `aceptar`, no se vuelve a abrir; una gestión que cubre el año cierra la duda sola y un año de otro documento abre la suya.
- Las 6 abiertas de Medellín siguen en la cola hasta que `cerrarObsoletos` las cierre en una corrida de carga de esos documentos (no verificado).
- Medición: `cargar-ejercicio.mjs` (compartida, lote completo) idéntico; veredicto GENERAL (1405 documentos de 250 clubes).

## Versión 1160 — fos perfil-audit: el tiempo de cada chequeo de audit.js [465 · audit-perfil.mjs]
- `node tools/fos.mjs perfil-audit [N]` corre `audit.js` con `--cpu-prof` en una carpeta temporal y lista los N chequeos más lentos con lo que llaman adentro (antes se armaba a mano con un script del scratchpad). No toca `audit.js`: ningún chequeo ni mensaje cambia; los tres más pesados (5 de 11 s) no se aceleran.
- Medición: `audit-perfil.mjs` no es del pipeline (no pide medición); sus tiempos coinciden con el perfil manual de la sesión anterior.

## Versión 1159 — publicar.mjs avisa que el commit va en otra llamada de Bash [465 · publicar.mjs, medir-pipeline.mjs]
- Al terminar, `publicar.mjs` imprime que `git commit` va en OTRA llamada: el hook de commit audita antes de ejecutar el comando entero y los dos juntos fallan por `asset-v-sin-subir`. El ensayo de `medir-pipeline` ya no sugiere escalar al completo cuando los medidores no usan lista.
- Medición: `publicar.mjs` (medidores audit y escribir, lote chico) idéntico; veredicto GENERAL.

## Versión 1158 — Tiempo estimado en club-siis --avanzar y en medir-pipeline --ensayo [465 · club-siis.mjs, medir-pipeline.mjs, duraciones-mediciones.mjs, duraciones-lib.mjs]
- `club-siis --avanzar` imprime «Tiempo estimado» (~1 min por año el lote, otro tanto la carga, ~25 s publicar, ~10 s bajar un estado) y, si pasa de 8 minutos, no corre nada: dice el comando exacto para correrlo en segundo plano con `--en-segundo-plano` (en primer plano la Bash se corta a los 10 minutos).
- `medir-pipeline` imprime el tiempo estimado de la medición (mediana de cada medidor y nivel, antes y después); para `cargar.mjs` da ~14 min, lo que mide de verdad. La lectura de las duraciones pasó a `duraciones-lib.mjs`, que usan también `fos duraciones` (salida idéntica) y el ensayo.
- Medición: ninguna de las tools es del pipeline (no pide medición); la salida de `fos duraciones` antes y después, idéntica; probado con Millonarios (frena y dice cómo) y Leones FC (1 min, sin cambios).

## Versión 1157 — club-siis.mjs --avanzar probado con un solo año (Deportivo Pereira 2024) [465 · club-siis.mjs · deportivopereira-co]
- Un año suelto de un club ya cargado desde su PDF se carga con `--avanzar --ejecutar --cargar` en 75 segundos: baja el estado de SIIS solo de los años que faltan (antes bajaba todos) y da por cubiertos estadio y sponsor cuando el ensayo de Wikipedia los trae al 100 % (antes pedía un subagente aunque no hiciera falta).
- Independiente Medellín: la gestión de Giraldo (dueño) de enero a septiembre de 2018 con fuente (El Colombiano, 19 de septiembre de 2018); la salida de Gil Gómez en 2019 y las gestiones de 2019 a 2023 siguen sin fuente fechada tras buscarlas.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); el año cargado con el pipeline medido.

## Versión 1156 — club-siis.mjs: reexpresiones de comparativo que se contestan solas y la lista de clubes con veredicto [465 · club-siis.mjs]
- `--avanzar` contesta las preguntas `anio-vecino` y `no-cierra` de un par de estados de SIIS solo si el resultado neto del año es idéntico en su estado y en el comparativo del siguiente; si cambia, queda para una persona. Corre el lote, contesta y lo repite para que el año no quede frenado.
- `club-siis` sin nombre imprime el veredicto de `--evaluar` de cada club y ordena de menos a más años por cargar.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); la lógica de reexpresión se probó con casos falsos, no con un caso real nuevo.

## Versión 1155 — audit.js más rápido: de 22 a 11 segundos [465 · audit-base.js · audit-chequeos-2.js · comparar-sin-comentarios.js]
- `audit.js` corre en cada año cargado, cada commit, cada publicar y cada medición. Los ~20 `--check` hijos de `checkGenerados` se lanzan a la vez (`execJuntos` en `audit-base.js`, archivos temporales y sueño corto) y `comparar-sin-comentarios.js` recuerda en la carpeta temporal los comentarios de los `data/*-data.js` ya vistos (se descarta si cambia el escáner). Mismos chequeos y mensajes: P0 0, P1 0, P2 2, P3 10, P4 63 antes y después. Contestar la cola de categoría por precedente de otros clubes se midió y no entró (`HALLAZGOS-pipeline.md`).
- Medición: idéntico en el medidor `audit` (lote chico: el sitio entero, sin lista); veredicto GENERAL.

## Versión 1154 — Leones FC (diez años de SIIS) y club-siis.mjs --avanzar probado de punta a punta [463 · leonesfc-co · club-siis.mjs]
- Leones FC cargado de 2016 a 2025 con `club-siis --avanzar --ejecutar --cargar` (un commit por año, publicado): color, liga y gestión a mano, estadio y sponsor y gestiones con dos subagentes lanzados en un solo mensaje, líneas del auditor de 2020 a 2025 (huecos de dictamen en 2016 a 2019, 2020 y 2024). La reexpresión de 2020 de SIIS (204.900 de «Otros ingresos») se aceptó: cada año se carga como lo imprimió su estado.
- `club-siis --avanzar`: el nombre legal que SIIS imprime mal frena el alta y dice el caso de la cola; con la gestión cargada no frena por las preguntas de gestión viejas y las contesta solas.
- Medición: `club-siis.mjs` no es del pipeline (no pide medición); datos cargados con el pipeline medido; `audit.js` P0 0 y P1 0.

## Versión 1153 — cola.mjs, cola-respuesta.mjs y duraciones-mediciones.mjs: el uso de --responder dice las tres banderas; cuánto tarda cada medidor [465 · cola.mjs · cola-respuesta.mjs · duraciones-mediciones.mjs]
- El uso de `cola.mjs --responder` muestra `--evidencia`, `--seguridad` y `--causa` (obligatorias) y el error de `--evidencia` dice que la ruta termina en .md o es «ninguna»; antes costó diez llamadas perdidas. `duraciones-mediciones.mjs` (comando `fos duraciones`) lista los segundos de cada medidor por nivel: `siis` 2 s de mediana, `verificar` 9, `cargar` completo 182, `escribir` 126, `xhtml` 340.
- Medición: idéntico en el lote completo (una tool compartida lo pide aunque solo cambie un mensaje; tardó unos 14 minutos y una primera corrida frenó por el tamaño de la cabecera); veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1152 — club-siis.mjs y dictamenes-md.mjs: subagentes juntos con su brief, --evaluar y --avanzar [463 · club-siis.mjs · dictamenes-md.mjs]
- `club-siis` imprime el brief de cada subagente (`--brief`, plantillas en `Admin/briefs-subagentes-siis.md`) y pide lanzarlos juntos; `--evaluar` dice CARGAR, REVISAR o DESCARTAR (solo se descarta una sociedad sin actividad: la liga no descarta, se cargan amateurs) y muestra el peso de «Costo de ventas»; `--avanzar` corre los pasos mecánicos hasta el primero que pide juicio. `dictamenes-md.mjs` transcribe los dictámenes de texto nativo y marca duplicados, escaneos y firmas.
- Medición: ninguna es tool del pipeline (orden y manual en `pipeline-tools.json`: `fos que-pide` no pide medición); `--avanzar` sin probar de punta a punta con un club nuevo.
