<!-- md: qué falta hacer, un punto por título y por prioridad | leer: con node tools/todo.mjs; nunca entero -->
# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.** No la dupliques en `Admin/CHANGELOG.md` ni en
`Admin/finance-of-sports-project.md` (historia) ni en el comentario de ningún archivo de código.

## Cómo leerla y cómo editarla

- **Un punto es un título `### <orden>. <id> · <qué>` y su cuerpo debajo.** El **orden** es la prioridad (1 es lo próximo; se trabaja de
  arriba hacia abajo). El **id** es el identificador estable con el que otros archivos citan el punto (CHANGELOG, HALLAZGOS, el código): no cambia
  nunca, y un punto nuevo toma el id siguiente al más alto, nunca uno libre. Por eso el id tiene huecos: son los puntos resueltos o descartados.
- **Para no leerla entera:** `node tools/todo.mjs` imprime la lista (orden, id y título); `node tools/todo.mjs 355` imprime el cuerpo de ese punto;
  `node tools/todo.mjs --cerrar 355` borra el punto y renumera el orden de los de abajo. A mano, `grep -n '^### ' Admin/TODO.md` da lo mismo que
  el primero.
- **Un punto resuelto se BORRA** (no se marca «RESUELTO»); su historia queda en `Admin/CHANGELOG.md` y, si ameritaba el porqué, en
  `Admin/finance-of-sports-project.md`. Si el punto sigue vivo en parte, se reescribe a lo que falta.
- **Un punto nuevo arranca con «Terminado cuando:»**: la lista cerrada de lo que entra (clubes, años, archivos, tools) y la prueba de que está
  hecho. Lo que aparece en el camino y no está en esa lista es un punto nuevo.
- **Cada punto termina con una o más líneas `Verificar: ...`** que una máquina comprueba: `audit <código> [«texto»] <op> <n>`, `existe <ruta>`,
  `no-existe <ruta>`, `contiene <ruta> | <texto>`, `no-contiene <ruta> | <texto>`, o `Verificar: manual` si no se puede. `node tools/todo.mjs
  --verificar` las corre; `audit.js` avisa `todo-cumplido` cuando un punto ya cumple (hay que cerrarlo) y `todo-sin-verificar` cuando falta la línea.
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md`.

## A. En marcha

### 1. 378 · (Orden, prioridad alta): un hook que me recuerde mostrar el diff cuando un commit toca una skill

Guido pidió dos veces ver el diff de un cambio de skill con un botón y la primera vez se olvidó: una regla que depende de acordarse se rompe. Un hook posterior a `git commit` (PostToolUse sobre Bash): si el último commit toca archivos de la carpeta de skills, devuelve contexto adicional «mostrale a Guido el diff de ese commit con show_pane (pane diff, diff_scope el hash)». Se prueba como el de pre-tool, con entradas simuladas (un commit que toca una skill y uno que no).
Terminado cuando: el hook está en la configuración de Claude Code del proyecto, su prueba pasa y está en la lista de `fos`.

Verificar: existe tools/hooks/post-tool.mjs
Verificar: contiene .claude/settings.json | post-tool

### 2. 380 · (Pipeline, prioridad alta): una prueba de medir-pipeline.mjs, porque todo el 371 depende de que «idéntico» sea cierto

`medir-pipeline` tuvo dos errores que solo se vieron de casualidad: la clave de la caché ignoraba las tablas de tools/ (reutilizaba un DESPUÉS viejo) y un medidor dejaba archivos escritos en tools/. Un «idéntico» falso es peor que no medir. Una prueba que corra la propia herramienta contra un cambio sintético conocido: (1) un cambio que sí altera la salida da «sin explicar» y sale con 1; (2) un cambio sin efecto da idéntico; (3) cambiar un archivo de tools/ que no es de la tabla cambia la clave de la caché; (4) lo que un medidor escribe se revierte; (5) si la corrida muere a la mitad, las tools quedan restauradas (`--restaurar`). Cómo aislarla (una copia del repo en el scratchpad, o una tabla de prueba) lo decide quien la escribe; tiene que correr en menos de 2 minutos.
Terminado cuando: la prueba corre en menos de 2 minutos, está en `fos` y un error sembrado a propósito en `medir-pipeline` la hace fallar (probado y revertido).

Verificar: existe tools/probar-medir-pipeline.mjs

### 3. 382 · (Orden, prioridad alta): `fos cerrar <id>`, el cierre de una tarea en un comando

Hoy cada cierre repite a mano los mismos pasos y alguno se olvida (el índice de los .md más de una vez, la entrada del CHANGELOG, el ESTADO). Un comando que: cierra el punto del TODO, regenera el índice de los .md, corre `audit.js` y dice P0 y P1, comprueba que `Admin/CHANGELOG.md` tiene una entrada que nombra el id, avisa si cambió algo de tools/ y `Admin/ESTADO.md` o `Admin/PIPELINE.md` no se tocaron, avisa de los .md nuevos sin marca de primera línea, y imprime la lista de lo que falta con ✓ y ✗ y el `git add` sugerido. No commitea.
Terminado cuando: `node tools/fos.mjs cerrar <id>` hace todo eso, probado cerrando un punto de prueba, y la skill de arranque lo cita en el cierre.

Verificar: existe tools/cerrar.mjs
Verificar: contiene tools/fos-comandos.json | cerrar

### 4. 383 · (Orden, prioridad alta): `todo.mjs --nuevo`, un punto nuevo sin escribir encabezados ni renumerar a mano

Para anotar cinco puntos hubo que insertar a mano y escribir un script de renumeración: error seguro. `node tools/todo.mjs --nuevo --pos <n> --rol "…" --titulo "…"` crea el encabezado con el id siguiente al más alto, el orden pedido, renumera los de abajo y deja la plantilla con «Terminado cuando:» y «Verificar:» para completar. Rechaza una posición fuera de rango y avisa de un título que ya existe.
Terminado cuando: el comando existe y se probó insertando y cerrando un punto de prueba sin dejar rastro.

Verificar: contiene tools/todo.mjs | --nuevo

### 5. 384 · (Pipeline, con la Auditora, prioridad alta): el veredicto «general o parche» de una mejora de script, por una tool y no de memoria

La regla ya está escrita (skill de auditoría, sección 8): una mejora al código es general si se describe sin nombres, el patrón está en 3 documentos de 2 clubes o más y no rompe nada; si el patrón está en 1 o 2 documentos, o en un solo club (un cambio por un solo año), NO se toca el código: va como ajuste a `Admin/registros/ajustes-manuales.jsonl` con motivo y cita. Hoy lo decide cada sesión de memoria. Una tool `fos patron`: (1) SIN NOMBRES: revisa las líneas agregadas del cambio contra los ids y nombres de club de `data/clubs.js`, años literales y rutas de Clubes/; (2) CUÁNTOS: dado el patrón (una expresión sobre los .md), cuenta documentos y clubes en `Clubes/**/*.md`; (3) NO ROMPE: toma de `mediciones-pipeline.jsonl` la línea de las tools del cambio (idéntico o explicado). Veredicto general, parche o rechazada, escrito en `Admin/registros/auditoria-proceso.jsonl` con el patrón, el comando, los números y el antes y después; un parche imprime el `ajustes.mjs --agregar` listo. Con esto Guido deja de revisar el diseño de un cambio de script: lo decide el veredicto más el lote. A Guido siguen yendo el criterio de datos, el gasto fuera de presupuesto y el alcance. DEPENDE DE: el 371 (cerrado).
Terminado cuando: la tool existe y reproduce el veredicto de dos casos viejos del registro (uno general y un parche), el hook de commit pide la línea de veredicto para un cambio a una tool del pipeline que no sea una mudanza ni solo comentarios, y la skill de mejora de scripts deja de pedir mostrar el diseño.

Verificar: existe tools/patron.mjs

### 6. 374 · (Orden, con la Auditora): comentarios de tools/ que no dicen nada: medir, criterio, limpiar solo comentarios

Muchos comentarios del código son ruido: historia («Versión N», «to-do N», fechas de decisión, «ver Admin/…» a documentos archivados), explicaciones de un caso viejo ya resuelto, comentarios que repiten el código, cabeceras largas con lo que ya está en `Admin/PIPELINE.md` y comentarios que dicen lo contrario de lo que el código hace hoy. Es el criterio que ya rige para los documentos de criterio en `CLAUDE.md` («sin historia, sin contadores, las menos palabras que una sesión siga entendiendo»), aplicado al código; y cada línea de ruido se lee en cada sesión que abre el archivo.
DEPENDE DE: el 368 (después) y el 371 (cerrado: la prueba de comparación entra a la tabla de mediciones). Lo que ayuda al 373 (mapa).
1. MEDIR primero, sin tocar nada: por archivo de tools/, bytes de comentarios sobre bytes totales, cantidad de referencias a «Versión N», «to-do N» y fechas AAAA-MM-DD, y cabeceras de más de 25 líneas. Una opción de audit.js o una tool (la sesión elige) que lo imprima, y un aviso P3 de audit.js que lo vigile, como `historia-en-doc-de-criterio`.
2. CRITERIO escrito (en la skill de onboarding o en `Admin/CONVENCIONES.md`; la sesión elige): se queda el POR QUÉ no obvio, la invariante, el caso real que justifica una regla (sin la versión), el USO de la tool en pocas líneas y las trampas. Se va la historia, la numeración de to-dos, la narración de una sesión y lo que el código ya dice.
3. LIMPIAR por archivo, de los más chicos y el que más ruido tenga hacia los grandes, SOLO comentarios. Prueba obligatoria de que no cambió la lógica: el código sin comentarios, antes y después, idéntico. Ya existe `tools/comparar-sin-comentarios.js` para index.html y js/ (no hay acorn en tools/node_modules): extenderla a tools/ (comparar contra HEAD, más `node --check`). Esa prueba entra a `tools/pipeline-tools.json` como el medidor de este tipo de cambio; por eso un cambio de solo comentarios no necesita el lote completo, pero sí esa comparación.
4. Lo que un comentario dice y el código ya no hace se anota como hallazgo (en `Admin/HALLAZGOS-pipeline.md`); no se arregla en esta pasada. Ya anotado: `cargar.mjs` y `caja-deuda.mjs --partir` llaman «etapa 5» a la categorización, que es la 7. (Decidido por Guido el 2026-10-22: los `.json` de `Generados/` siguen trackeados, son el caché pago de la IA; el comentario de `rutas.mjs` ya está corregido.)
Terminado cuando: hay medición, criterio y prueba de comparación; los archivos de más de 50 KB están limpios y el aviso del paso 1 da 0 o un número aceptado.

Verificar: audit comentario-historico-en-tools = 0
Verificar: contiene tools/pipeline-tools.json | comparar-sin-comentarios

### 7. 379 · (Pipeline, prioridad alta, para el 375): `fos mover`, una tool que muda un bloque de código a un módulo sin cambiarlo

La mudanza del bloque de personal (368) se hizo con dos scripts de una sola vez: uno calcula qué nombres del resto del archivo usa el bloque (imports, ayudantes) y otro escribe el módulo, exporta lo necesario y comprueba que el bloque quedó idéntico. El 375 son muchas particiones iguales. La tool: archivo, rango de líneas y destino; calcula los nombres libres (cuidando las interpolaciones de los templates), exporta lo que hace falta de los dos lados, escribe el módulo con una cabecera de menos de 15 líneas, deja el import en el original, comprueba que el bloque es idéntico salvo `export`, que `node --check` pasa y que el despachador sigue entero, e imprime el comando de medición. Ensayo por defecto.
Terminado cuando: rehace la mudanza del 368 sobre una copia y da el mismo resultado byte a byte; el 375 la usa para cada partición.

Verificar: existe tools/mover-bloque.mjs

### 8. 375 · (Pipeline): partir los archivos grandes de tools/ en módulos, sin cambiar el comportamiento

UNA SOLA LEY: movimiento puro, con re-exports para que los llamadores no cambien, medido con `node tools/fos.mjs medir pipeline` (lote completo idéntico, salida de audit.js idéntica, los 39 casos de `tools/hooks/probar-pre-tool.mjs`). Cada partición, un commit y su línea en `Admin/registros/mediciones-pipeline.jsonl`. De menor a mayor riesgo:
1. audit.js: una familia de chequeos por archivo, registrados en el mismo punto de entrada (los chequeos son independientes).
2. caja-deuda.mjs: el bloque del costo de personal ya lo extrajo el 368 (a `tools/costo-personal.mjs`); acá siguen el parseo del .md, las propuestas y la escala.
3. cargar.mjs, el corazón: por las regiones de sus banners.
4. verificar.mjs al final o nunca: el mapa del 373 mostró que es UNA función `verificar()` de 1623 líneas (176 a 1798) con unos 30 tramos marcados («ESCALÓN …»), así que partirlo es cortar adentro de esa función. alta-club.mjs (184 KB, 65 funciones) se mapea antes de decidir. lote.mjs tiene 21 funciones: se parte por etapas solo si el mapa muestra regiones claras. Con `node tools/fos.mjs mapa <archivo>` se ve cada archivo.
RIESGOS A NOMBRAR en cada partición: estado compartido a nivel de módulo, ciclos de imports, tools que corren como módulo y como comando (el bloque de arranque y `import.meta`), constantes que se evalúan al importar.
OBJETIVO MEDIBLE: tamaño máximo por archivo de 40 KB y una cabecera de menos de 15 líneas por módulo; lo que quede arriba, con una excepción escrita con su motivo.
DEPENDE DE: el 374 (comentarios limpios primero: no se mueve ruido), el 373 (el mapa dice dónde cortar) y el 368 (extrae el bloque de personal).
Terminado cuando: ningún archivo de tools/ pasa del tamaño máximo acordado (o queda una excepción escrita con motivo) y cada partición tiene su línea en el registro de mediciones.

Verificar: manual

### 9. 370 · (Auditora, prioridad 3): llevar los P2 y los P3 de la auditoría a 0, o decir por qué un aviso no puede llegar

DIAGNÓSTICO (2026-10-22), `node tools/audit.js --acciones`: P2 23 y P3 132 (131 con el índice de los .md al día). P2: 19 `sin-salarios` (el 368), `moneda-sin-meta` (Beşiktaş, TRY: agregar la moneda a `CURRENCY_META`, mecánico), `balance-sin-pat` (Aston Villa 2019, sale con el 368), y `doc-interno-no-excluido` + `raya-larga-visible` de `correcciones.html` (el 364). P3: 90 `catchall-dominante` (51 de ingresos y 39 de gastos; Portugal 23, Estonia 16, Bélgica 13, Grecia 10, Noruega 9). De esos 90, la mayoría NO se puede llevar a 0 con datos, es un límite de la fuente: la etiqueta más grande del catch-all es ella misma un «otros» del documento («diensten en diverse goederen» del esquema abreviado belga, «прочие затраты» ruso, «annen driftskostnad» noruego, «outros rendimentos»); unos 20 son subsidios sin la palabra (el 369). Otros 13 P3 son informativos que no piden nada (`gestion-club-inexistente`, `cambio-de-formato`, `cobertura`, `categoria-sin-bucket`, `signos-menores`, `dedu-fiscal-conocida`, `nombres-repetidos-sourcing`, `proyeccion`): mientras cuenten como P3 el total no baja de 13. El resto: 9 `ejercicio-sin-rastro`, 7 `outlier-liga`, 2 `liga-una-fuente`, 3 `historia-en-doc-de-criterio` y los sueltos.
Propuesta: (1) `catchall-dominante` reconoce el límite de la fuente por el vocabulario (`tools/vocabulario.mjs` ya es multilingüe) y baja a un código informativo con la etiqueta; (2) un nivel P4 «informativo» para los 13 que no piden nada, con `audit.js` contándolos aparte; (3) la acción de `catchall-dominante` en `tools/audit-acciones.json` quedó vieja («esperar la categoría de subsidios»): reescribirla; (4) los avisos de datos que sí piden trabajo (TRY, 9 ejercicios sin rastro, 7 outliers) se hacen o se silencian con `tools/silenciar.mjs` y su verificación.
Terminado cuando: `node tools/audit.js` da P2 0 y P3 solo con lo que pide trabajo, y el cambio de nivel está medido (cuántos avisos baja de cada código).

Verificar: audit moneda-sin-meta = 0
Verificar: manual

### 10. 369 · (Pipeline, con la Auditora): un proceso para aprobar etiquetas de una categoría nueva, sin que Guido lea cada una

HOY LAS 164 ETIQUETAS DE SUBSIDIOS SE DECIDIERON CON MI EXPRESIÓN REGULAR, NO CON JEV (2026-10-22). Las 67 excluidas salen de reglas objetivas (mezcladas, solidaridad de la federación o la liga, subvención de capital imputada, impuestos), no de una confianza baja. Y la expresión no ve lo que no tiene la palabra: en los avisos `catchall-dominante` que quedan hay etiquetas que son subsidios sin decirlo («Tartu linnavalitsus» = ayuntamiento de Tartu, «Sihtfinantseerimine tegevuskuludeks» = financiación dirigida a gastos de operación, «Αποζημίωση ειδικού σκοπού αθλητικών σωματείων» = compensación del Estado a los clubes, «Acordo de gestão» = convenio con el municipio, «EJL toetused» = excluida por la regla de solidaridad). Se necesita un proceso, no una lista.
Propuesta: una tool nueva, recategorizar-etiquetas, que recibe la categoría (generaliza `recategorizar-subsidios.mjs`): (1) las reglas objetivas deciden lo claro (se conservan); (2) a TODAS las líneas de `other_income`/`other_expenses` se les pregunta a Jev (Jev categoriza con la REGLA de la categoría como prompt, ya registrada por `reglas-categoria.mjs`): confianza de 0,90 o más pasa sola; (3) lo que queda entre 0,50 y 0,90 va a un agente Sonnet con prompt fijo (como `dato-publico.mjs --prompt`) que devuelve etiqueta, categoría, motivo y la cita; sin cita o en conflicto con las reglas de (1), a Guido en UNA lista corta, no a mano una por una; (4) todo queda en el JSON de decisiones (aprobada/excluida/motivo/quién); (5) un aviso P3 de `audit.js`, `etiqueta-sin-revisar`, cuando una línea nueva de `other_income` matchea una categoría con regla y no está en el JSON. Medir con el backtest de Jev (`jev-categorizar.mjs --backtest`) antes de confiar: cuántas de las 97 aprobadas y las 67 excluidas de hoy reproduce Jev solo.
Terminado cuando: las etiquetas que hoy se escapan (las de arriba) pasan por el proceso, la tabla antes/después de `catchall-dominante` está medida y `etiqueta-sin-revisar` existe.

Verificar: existe tools/recategorizar-etiquetas.mjs
Verificar: contiene tools/audit.js | etiqueta-sin-revisar

### 11. 351 · (Onboarding): sueldos de los británicos y de Instituto 2025 que siguen sin separar (quedan 12 club-años, todos casos de a uno)

HECHO (2026-10-22): de los 58 club-años con aviso `sin-salarios`, 38 quedaron resueltos: 12 con el sueldo partido de «Administrative expenses» (Leeds 2019-23, Liverpool 2022-23, Nottingham Forest 2022-23, West Ham 2020-22), 17 marcados «posiblemente dentro de…» donde el estado por función reparte los sueldos (Brentford 2022-23, Brighton 2020-22, Newcastle 2020-22, Sunderland 2019-23, Wolves 2020-23; todo con `tools/caja-deuda.mjs --personal --partir --escribir`) y 9 de los británicos nuevos del 356, que ya estaban marcados y ahora `audit.js` acepta. Se agregó la compuerta de plausibilidad (menos de 15 % de los ingresos no se usa), el respaldo `incluye`, la cadena entera sola (ajustes → verificar → Jev → Claude → cargar) y se arregló un defecto: el segundo año de un club figuraba como «ya tiene los ajustes». `audit.js` acepta la marca `incluye` sobre los sueldos como resuelto. Las recargas reaplican todo desde `Admin/registros/ajustes-manuales.jsonl`.
HECHO (368, 2026-10-22): 8 de los 20 que quedaban salieron solos con el escalón 1 de `tools/costo-personal.mjs` (la nota de personal por su estructura): Fulham 2021-23, Newcastle 2023-24 y West Ham 2023-24, más Brighton 2020-22 completado; y `node tools/fos.mjs personal` corre la cadena de los clubes con el aviso.
QUEDAN 12 CASOS DE A UNO (no son un patrón: según la regla, no se toca el código; van a la lista de ajustes manuales `Admin/registros/ajustes-manuales.jsonl` con motivo y cita, leyendo el documento): Aston Villa 2019-22 (los documentos son de la sociedad filial, la nota es el 5 % de los ingresos: hace falta el consolidado del grupo o confirmar que los sueldos están en otra entidad), Celtic 2021-25 (sin filas de total ni nota que cierre: 23 a 42 candidatos), Newcastle 2019 y Brighton 2023 (Jev dice «ninguna»: la nota no tiene la estructura de sueldos, cargas y pensiones), Instituto 2025 (anexo de remuneraciones sin fila de total: lectura) y Novorizontino 2010 (aviso viejo, no es de la serie británica). Prioridad baja: cada uno cuesta una lectura del documento. Cuando el veredicto automático del 384 exista, estos son los parches que registra.
DECISIÓN DE PANTALLA PENDIENTE (de Pantallas, no del pipeline): cuando el estado de resultados es por función y los sueldos van repartidos entre costo de ventas y administración, mostrar un valor informativo en la fila «Salarios y primas» (sin mover los totales) en lugar de dejarla «posiblemente dentro de…». Corrige datos publicados: trailer `Corrige:`.

Verificar: audit sin-salarios = 0

### 12. 350 · (Auditora, al final de A): revisar con Guido la fila nueva y el proceso de revisión de categorías

HECHO (2026-10-22): Educación se fusionó con Otras secciones en una fila, «Otras actividades (educación y otros deportes)» (vista, sin tocar datos); se abrió la fila «Subsidios y donaciones» (categoría `grants_donations`, REGLA en CONVENCIONES-DATOS) y se recategorizó lo ya cargado por etiqueta (468 líneas en 111 clubes, `tools/recategorizar-subsidios.mjs`, decisiones en `tools/subsidios-etiquetas.json`). La tabla de relevancia es `Admin/mediciones/filas-formato-simplificado.md` (`node tools/fos.mjs filas`).
QUEDA: (1) que Guido mire las dos filas en el navegador antes de publicar (Vélez para Otras actividades; Flora Tallinn y Académica para Subsidios); (2) las 67 etiquetas excluidas: el punto 372 (prioridad baja), con el proceso del 369; (3) decidir si el umbral de abrir o cerrar una fila (propuesta `Admin/propuestas/350-revision-categorias.md`, sección 3: 15 % de los clubes para una genérica) se escribe como texto de la skill `club-data-mapping`; con la tabla ya hay evidencia para usarlo; (4) el chequeo `revision-taxonomia-vencida` de audit.js de esa propuesta.

Verificar: contiene js/finanzas-calc.js | Subsidios y donaciones
Verificar: manual

### 13. 257 · (Orden 1): Deportes Tolima, sin cargar por una duda sobre el resultado de 2025

Lo que quedaba de esta línea (la skill `perfil-en-cola` que frenaba la carga) ya está: `cargar.mjs` nunca frena por eso (se avisa y la pregunta queda en la cola). Queda un solo caso: **Deportes Tolima no está en el sitio**
(no hay JSON de Tolima en la carpeta de Colombia de data) aunque `Clubes/Colombia/Deportes Tolima/` tiene los estados financieros de 2016 a 2025. La duda (`Admin/dudas-por-club.md`, sección Deportes Tolima): el documento de 2025 trae solo las
NOTAS, y el resultado neto de 2025 da tres cifras que no concilian (SIIS $359 M; la tabla histórica de la Nota 18(3), $914 M; sumando las notas 19 a 23, ~$3.185 M). Los ingresos de 2025 sí cierran exacto ($49.330,876 M).
Cómo se resuelve sin preguntarle al club, porque es público: bajar de SIIS (siis.ia.supersociedades.gov.co, NIT 890700863) otro radicado de 2025 que traiga el Estado de Resultado Integral primario (`club-sourcing`); y
mientras tanto cargar 2016 a 2024 (el año 2025 sin `officialPAT` queda con el aviso `balance-sin-pat`, que no frena). Falta el dictamen del revisor fiscal de 2024 (`dictamen-revisor-fiscal-2024.pdf` es idéntico al de 2025, `Admin/sourcing/Colombia/_notas-generales.md`).
Decisión de Guido (2026-10-22): no es necesario resolver el resultado de 2025 para cargar; se cargan los años con el pipeline y 2025 queda sin `officialPAT` (aviso `balance-sin-pat`, no frena). La duda se anota en la nota de sourcing del club y se retoma. Se hace después del reset de tokens (≈10 documentos ya transcriptos; el costo es la categorización).
Terminado cuando: Tolima está cargado (los años que el documento permite) y la duda de `dudas-por-club.md` se borró o quedó respondida con la fuente.

Verificar: existe data/co/deportestolima-co.json

### 14. 356 · (Onboarding carga los británicos en iXBRL; Pipeline arregla el conversor XHTML y los defectos de script)

CARGAR LOS BRITÁNICOS EN iXBRL (Guido, 2026-10-21: «carguemos iXBRL»). Sourcing buscó en Companies House los clubes que no tenemos y
presentan en iXBRL y bajó los 198 `.xhtml` (84 MB, los 68 con PDF oficial al lado renombrados a `-ixbrl`); Onboarding los carga con
`tools/xhtml-aarsrapport.mjs` (sin transcribir). Presupuesto: US$ 35 (Guido), con ensayo gratis antes; gastados ~US$ 1,9. Medido: el
escalón de etiquetas ahorraría solo el 25 % (no se codea; EN PAUSA con la condición de la Auditora: si el estado de resultados es menos
del 40 % del gasto, no se codea; backtest 22 de 67, 33 %); `lote.mjs` frena la IA sobre estos documentos salvo `--pagar-ia-xhtml`. Hechos
(Onboarding 9, lotes 140 y 141): 10 altas, AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham,
Lincoln City y Shrewsbury Town 2025 y Wigan Athletic 2024. Fleetwood/Jaymel 2022-25 descartado. Terminado cuando: cada club británico con
iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo. Falta:
- Pipeline, el conversor: `xhtml-aarsrapport.mjs` rearma las filas por posición cuando el XHTML está maquetado con div o span (12 clubes
  cuyo `-ixbrl.md` no tiene tablas: Hibernian, Bolton, Bristol Rovers, Cambridge 2024-25, Crewe, Northampton, Oxford, Peterborough,
  Plymouth, Rotherham, Salford y Tranmere; Blackpool y Reading igual; 17 años esperan), y `lote.mjs` frena en el ensayo un `-ixbrl.md`
  sin tablas. Sección 8 de la skill de auditoría: medir antes y después sobre los 249 XHTML.
- Pipeline, defectos de script (`Admin/registros/frenados-por-script.jsonl`): Morecambe (el importe «(n )» con espacio se lee en
  unidades); Ross County 2025 (el aviso «registro no se actualizó, correr el lote» no cambia al correrlo); `perimetro-senales.mjs` votó
  «individual» en group accounts con s408 (Salford, Falkirk, Exeter; corregidos a mano).
- Falkirk 2025: listo salvo la liga. Scottish Championship no existe en `data/leagues.js`: crearla (`club-sourcing` 0.4) y cargar con su
  publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; CONVENCIONES-DATOS).
- Los otros años pagables (~US$ 8): Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta
  puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan
  2022-23: lote siguiente, con las respuestas de este como precedente.
- De las 10 altas: las líneas del auditor (`node tools/auditoria.mjs --pendientes`), los escudos sin mirar (`escudoOk` null) y las
  gestiones (presidentes, en la cola; no frenan).
- Criterio a escribir en CONVENCIONES-DATOS: la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se
  contestó «no»).
- La nota de sourcing de Fleetwood dice «Ejercicios útiles: Jaymel 2015/16-2023/24», y es falso (fútbol 42 % en 2021-22); lo único útil
  es Fleetwood Wanderers 2020-21.
- Daneses que esperan: los XHTML de SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 (−130,578 M) y el PSE de København 2021-25, y los 9
  de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg; nota de Pipeline 14).
- ESTADO VERIFICADO (2026-10-22): ninguno de los clubes de las listas de arriba (Hibernian, Bolton… Tranmere, Falkirk, Morecambe, Ross County) está en el sitio todavía; `Scottish Championship` no existe en `data/leagues.js`; la cuota del Trust no está escrita en CONVENCIONES-DATOS. El gasto de IA citado arriba (~US$ 1,9) es de entonces: `node tools/gasto.mjs` da el actual.
- HALLAZGO DEL 351 que cae acá: un `full-accounts` de la filial (Aston Villa Football Club Limited 2019-20) trae una nota de personal de 8,3 M£ (3 directores y personal comercial) y el plantel está en otra entidad del grupo; el gasto «Administrative expenses» (203 M£) no tiene los sueldos de los jugadores. Esa nota NO es el costo de personal del club: el conversor y `caja-deuda --personal` tienen que distinguir la nota de la entidad de la del grupo (y descartar un total que es menos del 15 % de los ingresos). Ver el 351.

Verificar: contiene data/leagues.js | Scottish Championship
Verificar: contiene Admin/CONVENCIONES-DATOS.md | Trust
Verificar: manual

### 15. 362 · (Pipeline, con la Auditora): el freno de documentos de grupo

FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
skill de auditoría (la Auditora). Lo hace Pipeline.

Verificar: manual

### 16. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

LO APROBADO DE PIPELINE 15 QUE NO SE APLICÓ (Auditora 5 y 6, `Admin/registros/auditoria-proceso.jsonl`; el detalle
en `Admin/Archive/sesion-pipeline-2026-10-21.md`, «Pipeline 15»). Terminado cuando: (a) barrido de lecturas recortadas: `jevDe` de
`caja-deuda.mjs` con todas las filas (aprobado con un cambio: antes de commitear, volver a pedirle a Jev los 162 documentos que cortan en 120
filas, y los años cuya caja o deuda cambia van como corrección con cita y trailer `Corrige:`, o se revierte); los encabezados de balance de
la página entera (`--medir` dio idéntico en 779 años); y `nombreLegal` de `alta-club.mjs` y las señales de intermedio de
`perimetro-senales.mjs` como ventana de portada declarada en el código, con la medición (63 de 356 y 394 falsos intermedios) y la frase en la
regla de PIPELINE.md «salvo una ventana de portada declarada en el código, con la medición de leer entero»; (b) `falta_documento` en
`auditoria.mjs` (parche `p15-falta-documento.patch` en la carpeta de notas compartidas de la principal; aprobado con dos cambios: las
marcas «--- pág. N ---» de 1 a N sin saltos, y las 13 sin `.md` propio citan el `.md` fuente del año), con la migración de las 58 por un
subagente Sonnet y el lote entero pasando `--check` antes del commit (medido: 45 con el `.md` completo, 0 con páginas sin transcribir); (c)
se saca `cabecera` de `perimetroHeredado` (`cargar.mjs:215-220`), que se calcula y no la lee nadie; (d) la skill `auditoria-finance-of-sports`
(eje datos) y la de la cola dicen «antes de reportar algo raro de un documento, `node tools/rarezas.mjs --md <ruta>`» (texto para el ok de
Guido). Lo hace Pipeline (a, b, c) y la principal (d). Las dos preguntas de la Auditora 5 ya están contestadas en CONVENCIONES-DATOS:
el tramo corto va como C y la temporada COVID lleva la etiqueta en pantalla, sin publicNote.

Verificar: manual

## D. Orden de la casa

### 17. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.

Verificar: manual

### 18. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 19. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

EL REGISTRO DE CORRECCIONES, CURADO (Pantallas 7, sale del 247). `correcciones.html` y el bloque de Finanzas muestran hoy 236 eventos en 56
clubes, y todos dicen «Motivo no registrado». Terminado cuando: (a) los eventos de más impacto (valor, retiros, recargas) tienen su motivo en
español en `Admin/registros/correcciones.jsonl` (`{"commit","club","anio","motivo_es","motivo_en","fuente"}`; con subagentes que lean el
cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`; el motivo es público: se escribe para un hincha o un periodista); (b) decidido si
el motivo se traduce al inglés al curar (sin `motivo_en` la página en inglés muestra el español); (c) `tools/exportar-paquete.mjs` suma el
registro al Data Package (pasa por la skill `contrato-de-datos`); (d) revisado que los tipos «total» y «otro» de los eventos no tengan ruido
de renombres. Lo hace Pantallas.

Además, `correcciones.html` da tres avisos de `audit.js` que son de esta pantalla: `doc-interno-no-excluido` (es una página pública: se silencia con el motivo o se mueve), `raya-larga-visible` (línea 76) e `i18n-incompleto` (`corr.th.antes` y `corr.th.despues` sin traducción en `data/lang/en.js`).

Verificar: audit doc-interno-no-excluido = 0
Verificar: audit raya-larga-visible = 0
Verificar: audit i18n-incompleto = 0
Verificar: manual

### 20. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
Terminado cuando: cada letra pendiente se hizo, se descartó con su motivo en `Admin/HALLAZGOS-pipeline.md` o se confirmó ya resuelta en
el código. El texto de abajo quedó cortado en un cierre y se recuperó del historial (`git show 7ef1eb6874:Admin/TODO.md`): antes de
trabajar una letra, verificarla contra el código, porque varias pueden estar hechas.
vez; el detalle con casos, en `Admin/Archive/sesion-onboarding-2026-10-18-2.md`). a) CIERRE FALSO en verificar.mjs: compara en valor
absoluto y da "cierra" con una fila del lado o signo equivocado (Lierse Kempenzonen 2022 habría cargado un gasto como ingreso): lo más
grave. b) Esquema NBB belga en verificar.mjs y cargar.mjs: costos financieros 65/66B positivos, renglones "(+)/(-)" por valor absoluto,
el 76A sumado aparte, y verificar y la propuesta que no leen igual el signo; una regla por código NBB. aa) `tools/worktree.mjs mergear` deja sin commitear `data/sponsors.js` y `data/sponsors-indice.js`, que regenera
`generate-sponsors.js`: sumarlos a su lista de `git add` (el commit siguiente frena por asset-v-sin-subir).
Aviso para la próxima corrida grande: 368 documentos viejos sin tablas (221 en "revisar", 102 en "pendiente-segunda-voz", 38 en
"sin-tablas") se rehacen con Mistral (~US$ 83 más la validación) apenas pasen por resolver-inventario; el ensayo ya lo cotiza.
RWDM 2019: el registro
tiene el cierre 2019-11-30 y el balance va del 30/11/2018 al 30/06/2019 (como la f). Escocia, Gales e Irlanda del Norte se ven como GB
("Inglaterra") en el selector: decisión de pantalla pendiente. g2) partir en la cola cualquier fila según su nota (otros países, el 66A de Lommel SK
2025): solo si aparece otra fila mixta sin códigos; el 630 belga ya sale solo. i) alta-club.mjs: un país nuevo
frena hasta agregar su fila a PAISES: que la proponga. o) dos versiones "-correction" del mismo ejercicio entran juntas al lote (Bélgica): que
entre una sola. l) a p) más casos de onboarding (reportType por año de un club existente, perímetro de la carga, año vecino con
perímetros distintos, ceros reales y perfil que se repreguntan). q) el ensayo de lote.mjs cobra la categorización de todos los documentos de
la lista, también los ya cargados o categorizados. El detalle
de l a q, en `Admin/Archive/sesion-onboarding-2026-10-18-4.md`. s) el cierre de Beerschot 2019 -correction ya lo arregló la f: falta ver si localizar sigue
eligiendo la columna "Vorig boekjaar" vacía con el cierre bueno. z) cargar los primeros ejercicios de más de 12 meses (Guido: "son
parciales, pero corresponde cargarlos"): Anderlecht 2011 (16 meses), RAAL La Louvière 2018 (14), Sint-Truiden 2013 (15) y Zulte Waregem
2012 (17); diseño a decidir: cómo se muestra un año de más de 12 meses y cómo compara con los vecinos. t2) los años 2025 belgas ya cargados tienen ajustes `fila` y el escalón NBB no corre en
ellos: Patro Eisden 2025 (ingresos +1.810 por el waarvan 76A, gastos +4.012 por el 631/4), Lommel SK 2025 (gastos +172, el 609) y Lommel SK
2018 (−182 de financiero) cerraron por tolerancia con errores chicos: decidir con Guido si se corrigen (escalón: correr el NBB también
con ajustes si el resultado sigue exacto). PRIMERO: u2) lo que la u no decide: listas de un solo grupo (Third Division antes de 2016, Second
Amateur Division: Lokeren-Temse 2021-2022, Patro Eisden 2013-2014 y 2019) y la First Division B 2017-18 y 2018-19, que baja con 7 de 8
(la tool pierde a Beerschot Wilrijk; OH Leuven 2017-2019, Beerschot 2019).  v) el final
de lote.mjs lista como frenados los originales que salteó por su -correction. El detalle de s a v, con líneas y montos, en
`Admin/Archive/sesion-onboarding-2026-10-18-5.md`. k) alta-club.mjs / cargar-lote.mjs escriben la liga del alta en null aunque
`altas-revision.jsonl` traiga las ligas verificadas (las 17 altas de los lotes 89-90): que el alta las tome de la revisión.

Verificar: manual

### 21. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

Verificar: audit ejercicio-sin-rastro "liersekempenzonen-be" = 0

### 22. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso para decidirlas es el punto 369. Este punto es lo que queda después de que el 369 corra: (a) la lista corta que el proceso no pudo decidir; (b) la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/recategorizar-subsidios.mjs --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 23. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

## E. Después de A a D (Guido, 2026-10-20)

### 24. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 25. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
 Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
 (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
 (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
     club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
 (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
     con Higgsfield (321);
 (d) un calendario: qué liga o club se publica cada semana, para no repetir;
 (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
 (f) material de difusión (era el 259): un deck para periodistas y sponsors, o un informe por liga («las finanzas de LaLiga 2025 en
     10 slides»), con el tipo Slides; sin código. Nada de esto sale antes del 337.

Verificar: manual

### 26. 335 · mails a clubes

MAILS A CLUBES (une el 51, el 282 y el 326, Guido 2026-10-20). Todo lo que implique escribirle a un club vive acá. Nadie manda ni redacta
un mail sin que Guido lo pida en sus palabras.
(a) Proceso: Etapa 1 lista y probada de punta a punta (Resend, `outreach.financeofsports.com`, cola en `Admin/outreach/`, envío desde
la terminal de Guido con `tools/outreach-send.js`); el flujo, en la skill `club-outreach`. Etapa 2 (disparo automático: 3 preguntas
acumuladas o 90 días; follow-up y cooldown) documentada, no prendida. Cuándo amerita un mail: `club-sourcing`, sección 0.3.
(b) Check-in a los 30 días, el 2026-10-24: `Admin/outreach/checkin-2026-10-24.md` (hay una tarea programada que lo pregunta).
(c) Informes del auditor que faltan: 56 que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL
PDF"), casi todos sin canal público; entre ellos Go Ahead Eagles 2025. Roma 2022 queda así por decisión de Guido (no hay informe del
consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025 cambian de informe (los dos están bajados).
(d) Las preguntas a cada club: `Admin/dudas-por-club.md`.

Verificar: manual

### 27. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual

### 28. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual
