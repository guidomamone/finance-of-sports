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

## Versión 1151 — Independiente Medellín (diez años de SIIS), dictámenes de Tolima, colores de marca de tres clubes colombianos y «Sueldos / Ingresos» en «—» [463 · independientemedellin-co · deportestolima-co · laequidad-co · aguilasdoradas-co]
- Independiente Medellín (El Equipo del Pueblo S.A.) cargado de 2016 a 2025 con el camino de `club-siis.mjs`, un commit por año; «Costo de ventas» (87 a 90 % de los gastos) va a fútbol profesional sin desglosar por la excepción de la regla de Colombia; diez dictámenes de RSM transcriptos con su línea del auditor (2024: solo el informe legal). Real Sincelejo se descartó (sociedad sin actividad). Los dictámenes que faltaban de los otros cuatro clubes no están en SIIS (huecos); el de Tolima 2025 se bajó y el «2025» archivado era el de 2024.
- Pantalla: la razón de sueldos sobre ingresos muestra «—» (no 0 %) si el documento no abre los sueldos, y el Δ ya no compara contra ese cero; Tolima, La Equidad y Águilas Doradas tenían el color de marca sin poner.
- Medición: no cambia ninguna tool del pipeline (datos y `js/`); `audit.js` P0 0 y P1 0.

## Versión 1150 — cargar-categorias.mjs: una pregunta de categoría por club, etiqueta y propuesta [463 · cargar-categorias.mjs]
- Antes, cada año de un club abría su propia pregunta de categoría aunque otro año ya tuviera abierta la misma (misma clave y misma categoría propuesta), porque se proponían varios años antes de que se contestara el primero. Ahora se abre una vez por club; los otros años frenan igual con el aviso «pregunta ya abierta» y, al contestarla, la respuesta les vale (`respuestaPorDetalle` ya era por club; una respuesta `aceptar` solo vale con la misma propuesta, por eso se compara).
- Ensayo gratis sobre toda la historia de la cola: 1.032 de 3.407 preguntas de categoría (30 %) eran repeticiones del mismo club, etiqueta y propuesta (Portugal 262, Brasil 206, Grecia 184, Colombia 179). Con una cola vacía, tres años de Tolima abren un caso y no tres. Queda en el TODO que la memoria de categorías no ve la sección de la nota.
- Medición: idéntico en el lote completo (el medidor compara propuestas, no las preguntas abiertas: el efecto se probó aparte con una cola de prueba); veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1149 — club-siis.mjs: el camino de un club colombiano de SIIS en un comando [463 · club-siis.mjs · deportestolima-co · laequidad-co · aguilasdoradas-co]
- `node tools/club-siis.mjs "<Club>"` (solo lee: no escribe ni llama a ninguna API) muestra por año si está hecho el estado de SIIS, la verificación, la cola, la liga, el estadio y sponsor, la carga y la línea del auditor, y si las notas abren; después lista lo que falta en orden, con el comando de cada paso y los subagentes (cola, estadio y sponsor, auditor). `--crear-lista` arma la lista del lote y `--rehacer-anio AAAA` da la cadena explícita para un año ya publicado. Sin nombre de club resume todos los de `siis-clubes.json`.
- Al probarlo salió que Tolima, La Equidad y Águilas Doradas no tenían `clubId` en `tools/siis-clubes.json`, así que `siis-control` nunca los había comparado con SIIS; ya lo tienen y los 30 años cierran (sin avisos nuevos). Documentado en `Admin/PIPELINE.md`; registrado en `fos` y clasificado fuera del pipeline.
- Medición: ninguna tool del pipeline cambió (herramienta de sesión nueva, de solo lectura); `audit.js` P0 0 y P1 0.

## Versión 1148 — Los 34 estados-financieros de solo notas de los cuatro clubes de SIIS: motivo al día en documentos-descartados [463 · deportestolima-co · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- Los 34 `estados-financieros-*` de Tolima (10), La Equidad (9), Águilas Doradas (8) y Bucaramanga (7) siguen en `Admin/registros/documentos-descartados.txt`: son solo notas, y cargados como documento propio duplicarían el año y gastarían IA. Su motivo decía «se carga cuando haya el estado primario (SIIS)»; ahora dice que el estado del año es el de SIIS y que las notas abren sus rubros con `siis-notas.mjs` cuando suman exacto.
- Solo cambió el texto de después del « # »; ninguna ruta, así que el lote, el alta y el auditor leen lo mismo. Cierra la parte (f) del 3.0.
- Medición: ninguna tool cambió.

## Versión 1147 — medir-pipeline.mjs y exigir-medida.mjs: la prueba de escritura se pide a la tool que lee --escribir [463 · medir-pipeline.mjs, probar-medir-pipeline.mjs, exigir-medida.mjs]
- `medir-pipeline.mjs` buscaba `--escribir` en cualquier parte del texto de una tool, y una que solo lo nombraba en un comentario o un mensaje frenaba la medición con «sin prueba de escritura» (pasó con `exigir-medida.mjs` y `audit-chequeos-siis.js`). Ahora la pide solo a la que lo lee como argumento (la cadena exacta entre comillas): de 77 tools que lo nombraban quedan 56, y las 21 que dejaron de marcarse solo lo tenían en comentarios o mensajes (ensayo gratis sobre todas las tools).
- Dos casos nuevos en `probar-medir-pipeline.mjs` (nombrarlo no pide prueba; leerlo sin prueba no da idéntico); se sacaron las dos anotaciones que se habían puesto en `escriben_sin_prueba`, y `CON_MEDIDA` de `exigir-medida.mjs` pasa a lista de tools.
- Medición: `probar medir-pipeline` con todos los casos ok; `exigir-medida.mjs` idéntico, veredicto GENERAL; `audit.js` P0 0 y P1 0.

## Versión 1146 — audit-chequeos-siis.js y audit.js: siis-entre-anios compara los rubros entre años [463 · audit-chequeos-siis.js, audit.js]
- `siis-entre-anios` (sin red, desde los `siis-estado-AAAA.md`) compara cada rubro de un año con el comparativo que imprime el año siguiente. Avisa en P3 los rótulos intercambiados (el comparativo le da a un gasto el importe que el año imprime con otro rótulo) y en P4 la reexpresión de ingresos o resultado de más del 1 % de los ingresos, un aviso por club.
- Sobre los cuatro clubes encontró los tres intercambios que se habían visto a mano (Tolima y La Equidad 2024, Bucaramanga 2018); quedaron silenciados con su verificación (ajustes de categoría y regla de las notas de gastos). Las tres reexpresiones (Bucaramanga 2023→2024, Tolima 2023→2024, La Equidad 2016→2017) quedan como informativas. Código nuevo en `audit-acciones.json`.
- Medición: 5 diferencias del medidor `audit`, todas explicadas (el aviso nuevo y, del lado del antes, tres silencios sin chequeo todavía); veredicto GENERAL; P0 0 y P1 0. Aviso P3 nuevo sin revisión independiente (sección 7 de la auditora).

## Versión 1145 — cargar-ceros.mjs: un documento con filas armadas a mano no pide reintento por categorías en 0 [463 · cargar-ceros.mjs]
- Un documento con el ajuste `filas-a-mano` (los estados de SIIS y los que arma una sesión) ya no frena la carga con «categorías en 0 que deberían tener número» ni genera la pregunta de perfil (socios, otros deportes): localizar y extraer lo devuelven protegido, así que el reintento con IA no podía cambiar sus filas. Las categorías en 0 quedan en un aviso y se carga como está.
- Antes del cambio, ninguno de los 52 documentos armados a mano tenía un reintento pendiente en su última propuesta (40 de SIIS, 12 de otros clubes); el efecto es para los clubes que vienen.
- Medición: idéntico (cargar, verificar y siis en chico, mediano y completo); veredicto GENERAL (52 documentos de 9 o más clubes); `audit.js` P0 0 y P1 0.

## Versión 1144 — exigir-medida.mjs, cargar.mjs y siis-estado.mjs: no se escriben datos reales con tools sin medir [463 · exigir-medida.mjs, cargar.mjs, siis-estado.mjs]
- `cargar.mjs` y `siis-estado.mjs` se niegan a escribir (`--escribir`) si hay archivos de `tools/` cambiados contra HEAD, fuera de `no_pipeline`, sin una medición buena de su versión actual (`tools/exigir-medida.mjs`; no usa otras tools; `--ignorar-medicion` solo con el ok de Guido; `fos --check` verifica que sigan llamándolo). Así el orden (ensayo gratis completo, arreglar, medir una vez, recién después escribir) lo impone el código.
- El medidor `siis` corre los cuatro clubes de `siis-clubes.json` (antes solo Tolima) y cuenta qué rubros abren las notas. La regla del orden queda en `Admin/PLANTILLA-SESION.md`.
- La primera versión llamaba a `que-pide.mjs` y rompía la auditoría (una tool del pipeline no puede depender de una de afuera); se rehízo autocontenida y se midió de nuevo, sin explicación previa.
- Medición: idéntico (cargar, verificar y siis en chico, mediano y completo; `escribir` pasa); veredicto GENERAL (sin documentos); `audit.js` P0 0 y P1 0.

## Versión 1143 — siis-notas.mjs y siis-estado.mjs: 20 club-años de Colombia rehechos con las notas abiertas [463 · siis-estado.mjs, siis-notas.mjs · deportestolima-co · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- La tool se afinó con los cuatro clubes: columna de etiquetas (la de párrafos de la norma no cuenta), total impreso que tiene que sumar, tolerancia de verificar para una nota en pesos, tablas partidas por página, cifras con coma de miles, etiqueta repetida entre notas con el rubro entre paréntesis y no abrir si el título de la nota dice lo contrario del rubro (Tolima 2024).
- Rehechos y publicados 20 club-años (Tolima 10, La Equidad 4, Águilas Doradas 4, Bucaramanga 2) con la cadena `siis-estado --rehacer`, `verificar`, Jev, Claude y `cargar --reemplazar`: ingresos y gastos abiertos (Tolima 2025: venta de derechos deportivos 14.934 M). Regla de las notas de gastos en `CONVENCIONES-DATOS.md` (personal y viajes de administración son administración) y 10 ajustes de categoría. Costo de API unos US$ 0,60.
- Los años donde la nota no suma exacto quedan como SIIS los trae; el detalle está en el punto 463 del TODO.
- Medición: lote chico y mediano idénticos salvo las líneas «notas: …» del medidor `siis` (Tolima 2016 a 2025); veredicto GENERAL (42 documentos de 12 clubes); `audit.js` P0 0 y P1 0; condición nueva sin revisión independiente.

## Versión 1142 — siis-estado.mjs y siis-notas.mjs: las notas del club abren los rubros de SIIS que suman exacto [463 · siis-estado.mjs, siis-notas.mjs]
- `siis-notas.mjs` busca, entre las tablas de los `estados-financieros-AAAA.md` del club, la que abre cada rubro del estado de SIIS (ingresos, costo de ventas, gastos de ventas y de administración, otros): una columna cuyas filas, sin subtotales, suman el rubro (en miles o en pesos). `siis-estado.mjs` copia esa tabla al final del `siis-estado-AAAA.md` (sin «$» ni negritas, con su origen) y la deja como `notas_ingresos` / `notas_gastos` con `detalla_a` = el rubro; `verificar.mjs` hace el cierre de siempre. Una tabla que no suma no entra: se avisa la más cercana (< 0,1 %) y el rubro queda como SIIS lo trae. `--sin-notas` lo apaga.
- Primer ensayo en los cuatro clubes: Tolima abre ingresos y gastos de ventas sus diez años (más administración en 2016 a 2018 y 2022 a 2025); en los otros tres abre una parte de los años. Tolima 2025 pasó por verificar y la propuesta de carga: los ingresos salen en 8 líneas con la venta de derechos deportivos (14.934 M de pesos). Condición nueva sin revisión independiente (sección 7 de la auditora).
- Medición: lote chico y mediano idénticos salvo 10 diferencias del medidor `siis`, todas la línea nueva «notas: …» por año de Tolima; veredicto GENERAL (42 documentos de 12 clubes).

## Versión 1141 — La Equidad, Águilas Doradas y Atlético Bucaramanga: 30 años en el sitio desde los estados de SIIS [463 · laequidad-co · aguilasdoradas-co · atleticobucaramanga-co]
- Con Tolima, los cuatro clubes colombianos de solo notas tienen sus diez años (40 club-años nuevos, un commit por año), con el resultado oficial de SIIS, estadio y sponsor con su fuente o con el registro de búsqueda, y la línea del auditor de cada año (8 + 10 + 10 + 10; los dictámenes que faltan están en el punto 463).
- Dos correcciones de criterio salieron de cargarlos: «Costo de ventas» es la actividad deportiva cuando pesa más de la mitad de los gastos o el año siguiente lo repite como «Gastos de ventas» (Bucaramanga 2016 a 2018), y los rótulos de ventas y administración de SIIS se intercambian en algún año (Tolima y La Equidad 2024, corregidos con ajuste y publicados con `Corrige:`). Regla en `Admin/CONVENCIONES-DATOS.md`.
- Medición: ninguna tool cambió; `audit.js` P0 0 y P1 0 después de `publicar.mjs`.

## Versión 1140 — Deportes Tolima 2016 a 2025 en el sitio, desde el estado de SIIS [463 · deportestolima-co]
- Tolima (primer club de solo notas) quedó cargado completo: diez años, un commit por año, desde sus estados de SIIS, con el resultado oficial de SIIS (2025: 359 M de pesos, que son los 359 de SIIS y no las tres cifras que no concilian). Cola contestada con la regla votada 3 a 0 (`Gastos de ventas` sin abrir a `lump_football_operations_expense`, `Costo de ventas` a `other_expenses`) y la línea única de ingresos a `lump_football_operations`; estadio, capacidad y sponsor 2016 a 2022 con fuente en `tools/contexto-manual.json` (sponsor 2016 a 2019 con fuente débil y 2022 sin sponsor, registrado); líneas del auditor 2016 a 2023 con citas (2024 y 2025 «falta transcripción»: el dictamen que hay es el de 2024 archivado como 2025).
- Pendiente anotado en el punto 463: abrir los ingresos con la Nota 19 (suma exacta con SIIS; esconde la venta de jugadores, 30 % de los ingresos en 2025).
- Medición: ninguna tool cambió en esta entrada; `audit.js` P0 0 y P1 0 después de `publicar.mjs`.

## Versión 1139 — Deportes Tolima: alta y los diez estados de SIIS; la tool imprime 0 en el año que falta de un rubro [463 · siis-estado.mjs · deportestolima-co]
- Alta de Deportes Tolima (`alta-club.mjs`, 15 de 16 campos ok) y sus diez estados de SIIS (2016 a 2025) bajados con `siis-estado.mjs`, con filas armadas y verificación sin IA. Tolima destapó un defecto de la tool: un rubro que SIIS informa en un solo año salía en blanco y `armar-a-mano` rechazaba la fila (2020 y 2023); ahora se imprime 0 en el año que falta.
- Medición: idéntico (lote mediano) y veredicto GENERAL; el ensayo de Tolima del medidor `siis` no cambia.

## Versión 1138 — Fortaleza 2021: el resultado del ejercicio incluye el beneficio de impuesto diferido (lo encontró el control de SIIS) [463 · fortalezaceif-co]
- Fortaleza CEIF 2021 estaba cargada con resultado −647,3 M de pesos (antes de impuestos); el documento imprime «Resultados del ejercicio (208.773)» porque suma un beneficio de impuesto diferido de 438,5 M, y SIIS y el documento de 2022 dicen lo mismo. Corregido en `data/co/fortalezaceif-co.json` (impuesto +438,544; resultado −208,773) con el ajuste manual `resultado-final` en `ajustes-manuales.jsonl`, y publicado.
- Medición: `audit.js` sin `siis-control` (de 1 a 0), P0 0 y P1 0 después de `publicar.mjs`; ninguna tool cambió.

## Versión 1137 — SIIS: la tool toma el perímetro propio del club; Santa Fe 2019 y 2025 no eran contradicciones de SIIS [463 · siis-estado.mjs]
- `siis-estado.mjs` elige por el id del documento el estado propio del club («individuales» o «separados») y el consolidado solo si no hay otro o si `tools/siis-clubes.json` pide `perimetro: consolidado`; el inventario y el `perimetro` de las filas salen de esa elección. Antes elegía uno cualquiera cuando un club presentaba los dos (Santa Fe) y comparaba perímetros distintos: 2019 y 2025 salían como contradicción. Los 380 club-años de los 38 clubes cierran ahora; Santa Fe ya no tiene años frenados.
- Decisión registrada con `decision.mjs` (`auditoria-proceso.jsonl` y punto 463); regla en `Admin/CONVENCIONES-DATOS.md`. En `audit.js` queda un solo `siis-control`: Fortaleza 2021.
- Medición: idéntico (lote mediano) y veredicto GENERAL; el ensayo de Tolima del medidor `siis` no cambia.

## Versión 1136 — El control permanente de SIIS: audit.js compara lo cargado de Colombia con SIIS y avisa de los años sin bajar [463 · audit.js, audit-chequeos-siis.js, siis-estado.mjs]
- Avisos P3 nuevos en `audit.js` (módulo `tools/audit-chequeos-siis.js`, sin red, leen `Admin/sourcing/Colombia/siis-resumen.json` que genera `siis-estado.mjs --inventario --escribir`): `siis-control` (resultado cargado distinto del de SIIS, o ingresos cargados menores que los ordinarios de SIIS), `siis-faltante` (337 club-años que SIIS tiene y no están bajados) y `siis-resumen-viejo` (más de 120 días). Entradas en `audit-acciones.json`. Sin revisión independiente (aviso P3 nuevo, sección 7 de la skill de auditoría).
- Primer día: encontró un error publicado (Fortaleza 2021 cargada antes de impuestos, −647,3 M contra −208,8 M del documento) y dos casos de Santa Fe 2025; `siis-estado.mjs` suma el rubro de participación en subsidiarias a la compuerta (Santa Fe 2016 a 2018 ahora cierran), saltea los `frenados` de `tools/siis-clubes.json` y guarda el resumen offline.
- Medición: 4 diferencias, todas explicadas (los avisos nuevos de audit y el ensayo de Tolima); `verificar` idéntico en los tres niveles; antes y después del aviso P3 pasa de 3 a 7 (3 `siis-control` y 1 `siis-faltante`).

## Versión 1135 — Medir y commitear una tool sin tropezar: nombres antes de medir, el hook mira lo que va en el commit y un comando que ordena los pasos [465 · medir-pipeline.mjs, cerrar-tool.mjs, pre-tool.mjs]
- `medir-pipeline.mjs` corre el chequeo de nombres del veredicto (en seco) antes de gastar la medición y frena en segundos si el código agregado nombra un club, un año o una ruta de `Clubes/` (también con `--ensayo`); su mensaje de «datos sin commitear» dice cómo commitearlos sin `-A` ni `.`.
- El hook de commit (`tools/hooks/pre-tool.mjs`) entiende las rutas y las exclusiones de `git add` en el mismo comando (`git add -A Admin/registros`, `git add -A -- . ':!tools'`): un commit de solo datos y registros pasa aunque haya tools sin medir; `git add .` y `-A` sin rutas siguen mirando todo el árbol. `FOS_ARBOL` lo simula en la prueba.
- `tools/cerrar-tool.mjs` (`fos cerrar-tool`) corre en orden el chequeo en seco, la medición, el veredicto y la lista de lo que falta; no commitea. Regla en `Admin/PLANTILLA-SESION.md`.
- Medición: `probar-pre-tool.mjs` 79 casos ok (5 nuevos) y `probar-medir-pipeline.mjs` todos ok (2 nuevos); ninguna tool del pipeline cambió (las tres son de orden o de prueba), así que `medir pipeline` dice «nada que medir».

## Versión 1134 — La tool siis-estado.mjs: el estado de resultados y el balance de SIIS como documento del pipeline [463 · 464 · siis-estado.mjs, familias-docs.mjs, inventario-transcripciones.mjs]
- `tools/siis-estado.mjs` baja de SIIS (Colombia) el estado de resultados y el balance de un club y deja `siis-estado-AAAA.md` (fiel), `.json` y `.pdf` en su carpeta, con 5 compuertas aritméticas (de unos 340 club-años solo Independiente Santa Fe falla en 5), más las filas armadas con `armar-a-mano.mjs`: localizar y extraer cuestan US$ 0, y verificar cierra el resultado de Tolima 2025. `--inventario` genera `Admin/sourcing/Colombia/siis-inventario.md`. El país y la moneda salen de `tools/siis-clubes.json`.
- `inventario-transcripciones.mjs` reconoce el motor «siis-api (determinista)»; `familias-docs.mjs` tiene la familia «siis»; `pipeline-tools.json` tiene el medidor `siis`; `fos siis-estado` figura en `fos-comandos.json`. Regla: `Admin/CONVENCIONES-DATOS.md`; proceso: `Admin/PIPELINE.md`. Punto nuevo 464 (deportes que no son fútbol con SIIS).
- Medición: 13 diferencias, todas explicadas (las altas del medidor nuevo y dos avisos de audit que se van); `lote-ensayo` y `verificar` idénticos en los tres niveles.

## Versión 1133 — Los puntos 257, 461 y 462 se agrupan en el 463, con orden de trabajo en cinco grupos [257 · 461 · 462 · 463]
- Se abrió el 463 (SIIS como estado primario oficial en Colombia) con las decisiones de Guido, los hechos, los cuatro casos y los pasos en cinco grupos (base, control permanente, clubes, skills y pantalla, cositas chicas); no se perdió ningún item del 257, 461 ni 462, y el texto original está en `git show 743efef04a:Admin/TODO.md`. Se cerró el 257, el 461 y el 462; el 6 del 461 (imágenes de UEFA) quedó descartado por Guido.
- Se sacó el worktree viejo de una medición (`wt-antes`, sin rama).
- Medición: solo TODO y CHANGELOG; no cambió ninguna tool.

## Versión 1132 — La skill de club nuevo nombra el color de un club de rugby [461]
- `club-nuevo.md` (skill de onboarding) dice que un club de rugby usa `node tools/fos.mjs color-rugby "<club>"`, que se corre a mano y no decide el color.
- Medición: solo texto de skill; no cambió ninguna tool.

## Versión 1131 — La fecha `desde` del esquema de registros es una por registro [461 · registro-esquema.js, audit-chequeos-5.js]
- `desde` de `esquemas-registros.json` pasó de una fecha a una por registro (auditoría, cola, ajustes, mediciones) y `registro-fuera-de-esquema` ahora también avisa de una línea de ajustes o de mediciones, de hoy en adelante, sin `esquema` (antes solo miraba las que lo declaraban).
- Medición: `audit.js` sin avisos nuevos con los registros de hoy; con una línea falsa de mediciones sin `esquema` el aviso aparece (probado y revertido).

## Versión 1130 — La segunda fuente local ya no guarda técnicos ni encabezados como equipos [461 · segunda-fuente-wikipedia-local.mjs]
- `segunda-fuente-wikipedia-local.mjs` saltea las filas de puro encabezado y descarta los ítems que Wikidata marca como personas. Bélgica 2.ª 2020-21 pasó de 14 «equipos» (con «Stam-nummer» y cinco técnicos) a los 8 reales.
- Medición: el cruce con la lista en inglés quedó igual (6 de 8, mismos sin par); `medir-pipeline.mjs`: idéntico.

## Versión 1129 — Series de tipo de cambio al día; el BRL ya no pierde 2005 a 2009 [461 · fetch-fx-reference.mjs]
- `fetch-fx-reference.mjs` sin `--currency` volvió a bajar las 21 series (hasta el 22 al 26 de octubre según la moneda). El BRL tenía `defaultFrom` 2010 y lo cargado arranca en 2005 (Goiás 2008-2009): la corrida habría borrado 1.254 días; ahora el default es 2005-01-01.
- Medición: se comparó cada serie contra HEAD: ninguna fecha perdida, ningún valor viejo cambiado, solo días agregados (el PEN llenó un `null` del 2026-09-28); `medir-pipeline.mjs` dice «nada que medir» para esta tool.

## Versión 1128 — Las listas de prueba cambian por la ranura de la semana, no por un defecto [461]
- Se reprodujo el «reescribe los lotes de prueba sin que cambie nada»: lo que cambia es la ranura de la semana (S43 a S44, rota por diseño) y el orden de un bloque de casos raros; `lotes-prueba.mjs` es estable al repetirlo y `--check` da «al día». Se commitean las listas regeneradas y el item 8 del 461 queda tachado con ese motivo.
- Medición: no cambió ninguna tool.

## Versión 1127 — SIIS tiene el estado de resultados primario por rubro (Colombia) [257 · 462 · deportestolima-co]
- Se encontró en el portal de SIIS el índice `siis_resultadointegral`: ingresos, costo de ventas, gastos, otros ingresos y gastos, impuestos y resultado de 2016 a 2025 para Tolima, La Equidad, Talento Dorado y Bucaramanga. Cómo consultarlo quedó en `Admin/sourcing/Colombia/_notas-generales.md`.
- Tolima: el estado de SIIS suma exacto (2024 y 2025) y su resultado coincide con `utilidades`; el costo de ventas no explica solo la diferencia con las notas (2023 y 2024), así que hay que conciliar rubro por rubro. Los puntos 257 y 462 lo cuentan y quedan a la espera de la decisión de Guido sobre cómo entra una fuente que no es un PDF.
- Medición: no cambió ninguna tool ni dato cargado.

## Versión 1126 — Cierra el punto 417 y se reordena el TODO [417]
- 417 (niveles P0 a P4 del auditor) cerrado: la skill y `audit.js` dicen lo mismo, `--leyenda` existe, P1 es «frena el commit», y los contrastes externos quedaron decididos: no se comparan los clubes contra los informes de UEFA ni de Deloitte; lo que queda de esa idea es la página de blog (punto 460). Orden del TODO: 257, 461, 462 y 401 arriba.

## Versión 1125 — Los 26 sponsors anteriores al registro, buscados con el registro; cierra el punto 418 [sponsor-legacy.json, contexto-manual.json]
- Cuatro subagentes Sonnet buscaron el sponsor de camiseta de los 26 club-años que tenían un texto libre de antes del registro, con las clases de fuente de la skill de sourcing. Con sponsor y su fuente: Rapid Wien 2013 a 2022, 2024 y 2025 (Wien Energie), Molde 2008 y 2010 a 2012 (Sparebanken Møre) y Beşiktaş 2007 (Cola Turka). Sin sponsor, con su registro de búsqueda: Patro Eisden 2013 y 2015, RAAL La Louvière 2018 y 2019 (candidatos Payconiq y UNICEF anotados, sin confirmar que fueran del frente), Vålerenga 2023, Alianza FC 2023, Atlético Bucaramanga 2019 y 2020 y Rapid Wien 2023.
- `tools/sponsor-legacy.json` quedó vacío y se sacó su silencio de `audit-ignore.json`; con esto las 5 entradas «aceptado sin verificar» de ese archivo quedaron resueltas. Las fuentes más débiles: Molde (el informe dice «generalsponsor», la camiseta sale de una base de camisetas leída por el buscador) y Rapid Wien 2024 (la nota dice sponsor principal, no pecho).

## Versión 1124 — La prueba de escritura cubre 12 tools más y medir-pipeline la exige [401 · prueba-escribir.mjs, medir-pipeline.mjs, fetch-fx-reference.mjs]
- `prueba-escribir.mjs` suma `dentro-de-otro`, `gestiones-tanda`, `alta-club`, `recategorizar-linea`, `segunda-fuente-wikipedia-local`, `segunda-fuente-liga`, `estadio-sponsor`, `fetch-fx-reference`, `reglas-categoria`, `imports-sin-export`, `fuente-url-xhtml` y `xhtml-aarsrapport`. `medir-pipeline.mjs` no da «idéntico» a una tool que escribe sin su prueba (`escriben_sin_prueba` de `pipeline-tools.json` anota la deuda: `cargar-lote`, `bfo-rusia`, `bfo-rusia-notas`).
- Fallas que la prueba encontró y se corrigieron: `fetch-fx-reference --from` pisaba la serie con solo ese tramo (ahora la suma; la serie del ARS quedó al día hasta 2026-10-23) y el BCRA rechazaba la fecha UTC de noche. `recategorizar-linea` recuerda correr `dentro-de-otro`: PAOK 2019 a 2022 tenían una marca vieja de ventas de jugadores dentro de otro rubro y se actualizó.
- Sin medición de pipeline: ninguna de estas tools es del pipeline.

## Versión 1123 — La segunda fuente de una liga puede ser la Wikipedia local, y cuatro silencios menos [418 · segunda-fuente-wikipedia-local.mjs]
- `fos liga-segunda-fuente-local`: busca la página de la misma temporada en el idioma del país por los enlaces entre idiomas, une los equipos de las dos Wikipedias por su identificador de Wikidata (el griego o el cirílico no se pueden comparar por letras) y guarda la lista con tipo `wikipedia-local`; el auditor la cuenta como cualquier segunda fuente. Con ella: Aellarissa 2025 (19 de 20), Felgueiras 2023, FC Utrecht 2025, Lierse SK 2019 a 2021 y Molde 2011; Patro Eisden 2013 con dos páginas de nl.wikipedia.
- `clubLeagueCoverage` no cuenta los años futuros (Boca y Racing 2027, presupuestos). `fos color-rugby`: colores candidatos de un club de rugby desde teamcolorcodes (Bath Rugby, #005BAA). Se quitaron 4 silencios de `audit-ignore.json` (las dos `liga-una-fuente`, `liga-sin-verificar` y el color de Bath Rugby).
- Medición: `segunda-fuente-wikipedia-local.mjs`, medidores contexto y audit, lote chico: una diferencia explicada (la tool nueva sin clasificar). Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1122 — Prevención de las ganancias en inmovilizado mal categorizadas [414 · audit.js, recategorizar-linea.mjs, votacion-contar.mjs]
- Aviso P3 nuevo `ganancia-inmovilizado-sin-mirar`: una línea de «Otros ingresos» con rótulo de ganancia de activos y el 5 % o más de los ingresos pide mirar el documento (la misma cifra) y moverla o anotarla con `fos recategorizar-linea` (`--a player_sales`, `--a asset_sales` o `--mirada`). Cada recategorización deja la respuesta de la cola para que una recarga no la deshaga.
- Corrige: Sporting 2005 (de 99,8 M a 34,8 M de ingresos) y Chelsea 2023 (de 682,5 M a 605,9 M) pasan la venta de una participación a `assetSales`, con su fila «Venta de activos»; el resultado neto no cambia. `votacion-contar --escribir` guarda los votos completos en `Admin/mediciones/votos/`.
- Medición: `audit.js` y `audit-chequeos-6.js`, medidor audit, lote chico: una diferencia explicada (el índice de los .md, que ya venía desactualizado). Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1121 — Los niveles de la auditoría dicen lo mismo en el código y en la skill [417 · audit.js, audit-chequeos-6.js]
- P1 pasa a «algo roto que frena el commit, lo vea o no el visitante». Aviso P3 nuevo `severidades-desfasadas`: salta si la tabla de severidades de la skill `auditoria-finance-of-sports` y `SEV_TITULO` dejan de coincidir. El texto de la skill va en su propio commit.
- Medición: `audit.js` y `audit-chequeos-6.js`, medidor audit, lote chico: idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1120 — Ganancias en inmovilizado que eran traspasos pasan a ventas de jugadores [414 · recategorizar-linea.mjs, CONVENCIONES-DATOS]
- Regla votada 3 a 0: una ganancia en inmovilizado de un club de fútbol va a `player_sales` solo si el documento la liga con jugadores. Corrige: Benfica 2007 (24,1 M), Sporting 2002 y 2003 (13,4 M y 8,1 M) y PAOK 2017 y 2019 a 2025 (de 0,5 M a 31,8 M) pasan de «Otros ingresos» a «Ventas de jugadores», cada una con la cita del documento; los totales no cambian. Santa Clara 2025 queda como estaba (el documento no la liga con jugadores). Sporting 2005 y Chelsea 2023 no son jugadores (venta de participaciones): quedan para decidir si van a `assetSales`.
- Herramienta nueva `fos recategorizar-linea` (manual, no es del pipeline: no corre en ningún lote). Se quitaron 3 silencios `catchall-dominante` que ya no hacen falta. Sin medición de pipeline.

## Versión 1119 — Nota en el Estado de resultados cuando un ingreso es negativo [415 · finanzas-render.js, finanzas-multi.js]
- Un renglón de ingresos negativo (las deducciones sobre la receita de los clubes brasileños, y los de Turquía, Portugal y otros) lleva un bocadillo y un asterisco a «Notas sobre este club», con una nota por ejercicio; sin cambiar los datos. Un año y varios años. Verificado con Flamengo 2024 y 2025 en español e inglés y a 375 px.

## Versión 1118 — La cola no guarda una respuesta sin evidencia, seguridad y causa [458 B · cola.mjs, cola-respuesta.mjs, probar-registros.mjs]
- `cola.mjs --responder` se niega si falta `--evidencia` (`ruta.md:12-30` o `ninguna`), `--seguridad` o `--causa`, y dice las que faltan; sin salida de emergencia. `--corregir-categoria` y el cierre de obsoletos siguen igual. La prueba de `probar registros` pasa de «es la de siempre» a «no guarda».
- `desde` de `esquemas-registros.json` pasa a 2026-10-26: las 112 respuestas del 25 sin esquema quedan como legado y el aviso `registro-fuera-de-esquema` baja a 0. No se reescribieron.
- Medición: `cola.mjs` y `cola-respuesta.mjs`, lote completo (cargar, audit, escribir, verificar, lote-ensayo, alta): idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1117 — Las páginas de club con margen bruto ya no dicen «Ingresos» [458 A · generate-club-pages.js]
- Los 14 clubes con ejercicios de margen bruto (los 7 con último ejercicio de margen, entre ellos Lierse SK y Vejle) llaman «Margen bruto» a esa cifra en el título, la descripción, la tabla y la imagen al compartir; la tabla suma la columna y las barras no mezclan bases. Elegida la alternativa B del mockup 149.
- Medición: `generate-club-pages.js`, medidor audit, lote chico: con las páginas viejas, 2 diferencias explicadas (`club-pages-desfasado`, `codigo-sin-accion`); con las 14 regeneradas, idéntico. Patrón GENERAL. Sin revisión independiente de la Auditora.

## Versión 1116 — Sarpsborg 2021 y Telstar 2025: el PDF mismo no trae el informe, no se re-transcribe
- Mirados a ojo, sin gastar API: el PDF de Sarpsborg 2021 trae el informe de EY de 2020 repetido (pág. 9) y el de Telstar 2025 termina en la pág. 26 y remite a la controleverklaring de la 27. Las dos líneas pasan a «FALTA EN EL PDF» y a la lista de sourcing.
- Medición: no cambió ninguna tool.

## Versión 1115 — Marcador `sin-competencia` en `data/club-leagues/` [audit-chequeos-6.js]
- Un ejercicio en el que el club no jugó ninguna competencia oficial de mayores (Novorizontino 2010, año de fundación) lleva `'sin-competencia'`: cuenta como verificado, no agrupa bajo ninguna liga, pide su línea en `ligas-no-catalogadas.jsonl` y `audit-chequeos-6.js` nunca lo «abre» como liga. El card «en otra liga» ya no ofrece como liga a quien no está en el catálogo (`liga-no-catalogada` incluida). Documentado en `ARQUITECTURA.md` y `PIPELINE.md`.
- Condición nueva en una tool, sin revisión independiente de la Auditora.
- Medición: idéntico (lote chico del medidor `audit`); con el dato nuevo el audit no suma avisos.

## Versión 1114 — `fos informe-en-pdf`: ¿el PDF trae el informe del auditor que falta en su .md? [informe-en-pdf.mjs, fos-comandos.json]
- Mira gratis, con `pdftotext`, si el PDF menciona el informe del auditor más veces que su transcripción, y detecta el escaneado. De los 34 `falta_transcripcion` que podían ser de transcripción, en 32 el PDF no trae más: re-transcribir con Mistral no ayuda; los otros dos (Sarpsborg 2021 y Telstar 2025) son escaneos.
- Medición: no es una tool del pipeline (no escribe nada ni llama a ninguna API).

## Versión 1113 — El card «en otra liga» ya no compara un margen bruto como ingreso [457 · liga.js, principal.js]
- Un ejercicio de margen bruto compara su estimado (etiqueta «Estimado», con el rango del 80 %) o el ingreso del informe siguiente (etiqueta «Informe siguiente»); sin ninguno el card queda en gris («Sin ingresos») y pasa solo a comparado cuando `estimar.mjs` genera el estimado. «Ver el ranking completo» lo muestra con el estimado. Mockup 148 aprobado (español e inglés sin mezclar).
- Verificado en escritorio y 375 px, en español e inglés, con Lierse SK 2025 (estimado), Vejle 2025 (gris) y RWDM 2024 (informe siguiente); sin errores de consola propios.
- Medición: no aplica a tools del pipeline (pantalla).

## Versión 1112 — Aalesund 2024 cargado (hueco ejercicio-sin-rastro) [aalesund-no]
- Aalesund 2024 (lote 154): dos ajustes de signo en el financiero (gastos «Nedskrivning» y «Annen rentekostnad» restan; cierra con el resultado 455.038 NOK) y el año 2024 (el documento es de 01.01 a 31.12.2024; 2025 es el depósito). Liga no-1divisjon 2024 con dos fuentes (Wikipedia y RSSSF) y su línea del auditor (Contabile AS, sin salvedades).
- Ross County: Roy MacGregor, chairman desde 2010-06-30 (Companies House, dato de Guido) en `data/gestiones/gb.js`; el caso de la cola pasa de `preguntar-club` a `aceptar`.
- Medición: sin cambio de tools.

## Versión 1111 — Excelsior 2020 cargado (hueco ejercicio-sin-rastro) y calibración de la cola: ocho segundas revisiones de cierre-por-pais alta [excelsior-nl]
- Excelsior 2020 cargado (lote 153, US$ 0,06): «Resultaat deelneming» (−43.569) va al financiero por ajuste, como en 2024, y cierra con el resultado impreso. Calibración de la cola: 8 segundas revisiones de cierre-por-pais alta, las 8 coinciden (21 de 131).
- Ligas con dos fuentes: Rapid Wien 2014 (Bundesliga 2013–14), Dynamo Majachkala 2021 (Segunda Liga rusa), Novorizontino 2012 (Segunda Divisão paulista) y 2010 (sin competencia oficial, año de fundación), estos tres como liga-no-catalogada con su línea de registro. Mockup 148 del card «en otra liga» para margen bruto, sin implementar.
- Auditor: 325 líneas nuevas en `auditoria.jsonl` por 29 subagentes Sonnet; `auditoria.mjs --check` confirmó cada cita y a mano se corrigieron Fredrikstad 2012, Besiktas 2014 y un `falta_transcripcion`. Cola: Sarpsborg (2011 y su perfil) contestada, Falkirk y Salford descartadas sin dos fuentes del chairman, Ross County a `preguntar-club`.
- Medición: ninguna tool cambió. Se midió y se descartó que total_ingresos/total_gastos valgan la fila de su línea (idéntico en 1.029 documentos; ver HALLAZGOS-pipeline.md).

## Versión 1110 — verificar-lecturas.mjs, vocabulario-datos.mjs: el total y su único renglón no se suman dos veces, vale la fila del resultado si el resumen de la IA trae otra cifra, y el vocabulario noruego del financiero [456 · verificar-lecturas.mjs, vocabulario-datos.mjs]
- `verificar-lecturas.mjs`: si el total impreso y su único renglón son la misma cifra («Driftsinntekter» y «Sum driftsinntekter»), la fila del total no se suma aparte (Aalesund 2018 daba 83,18 M de ingresos en vez de 41,59 M). Si el importe del resumen `resultado` de la IA no es el de ninguna fila de resultado del estado y difiere más de 1 % de la fila de su propia línea, vale la fila (Bolton 2024-25 traía la remuneración del personal de otra tabla como resultado).
- `vocabulario-datos.mjs` (noruego): «Inntekt på investering…» suma y «Nedskrivning av finansielle…» resta en el financiero por rótulo: Aalesund 2018 cierra con el resultado impreso (1,20 M).
- Verificado a mano (456): Aalesund 2018 cargado: ingresos, gastos y financiero cierran con el resultado impreso (1,20 M NOK); las notas 15 y 16 no cambian el total, sin criterio nuevo
- Medición: 2 diferencias, todas explicadas (Bolton y Aalesund; lote completo idéntico). Una primera versión rompía Sarpsborg 2008 (8 renglones con redondeo) y se acotó a un solo renglón.
- Aalesund 2018 cargado (lote 152): ingresos 41,59 M, gastos 41,48 M, resultado 1,20 M NOK, sin desglose por rubro. Las transferencias con el club matriz de las notas 15 y 16 ya están dentro de los renglones del estado, que cierra con el resultado impreso: no hizo falta votar un criterio. Punto 456 cerrado.

## Versión 1109 — audit-chequeos-6.js: los chequeos de ligas no catalogadas, claves repetidas y estimados repetidos salen de audit-chequeos-2.js (pasó los 40 KB) [audit-chequeos-2.js, audit.js]
- Sin cambio de lógica: tres funciones a un módulo nuevo y `audit.js` las importa de ahí. Comentarios sin fecha en `cierre-propuestas.mjs` y `produccion.mjs`. Las entradas de las Versiones 1090 y 1096 se acortan (pasaban de 1.500 caracteres).
- Viborg FF 2021 cargado con el cierre del 30/06 por ajuste; Fredericia 2018 y Rapid Wien 2013 a 2023 con liga (`ligas-sin-verificar.mjs`; Fredericia confirmado también por la Wikipedia en danés).
- Medición: 1 diferencia, explicada (lote completo: idéntico).

## Versión 1108 — tipo-sin-desglose.js, audit.js, audit-chequeos-2.js: la puntuación final no cambia un rótulo aprendido y claves repetidas en los JSON de configuración [tipo-sin-desglose.js, audit.js]
- `tipo-sin-desglose.js`: la tabla de rótulos aprendidos ignora la puntuación final («Ingresos operativos:» = «Ingresos operativos»), que había vuelto a mandar a la cola un rótulo ya contestado (Once Caldas 2018).
- `audit.js` suma `json-clave-duplicada` (P2): una clave repetida en un mismo objeto de un `.json` de `tools/` o de `tools/club-league-reference/` (JSON.parse se queda con la última). Primer hallazgo real: `tools/contexto-manual.json` tenía a Fredericia dos veces y la entrada de 2017 no valía; se juntaron. Contexto y sponsors regenerados.
- Medición: 3 diferencias, todas explicadas (lote completo: idéntico).

## Versión 1107 — Rijeka 2023, Once Caldas 2018 y Viborg FF 2019 y 2020 por el pipeline; los años de margen sin estimado se resuelven solos [455]
- Rijeka 2023 (euros; el informe reexpresa 2022 en euros: 69.154 M HRK / 7,5345 = 9.178 M EUR) y Once Caldas 2018 (sin estado de resultados: sale de las notas 20, 24, 25 y 26 y cierra con el impuesto diferido NIIF como fila de impuesto y la nómina de «gastos de ventas» como sueldos del plantel, `ajustes.mjs`) cargados. `contexto-manual.json` tenía a Once Caldas dos veces: la clave repetida pisaba la entrada nueva; se juntaron.
- Prueba con Viborg FF 2019 y 2020 (dos ejercicios reales de la 1ª División danesa, lista 2018-19 bajada): Fredericia 2022 a 2024 pasó de sin estimado a estimado sin tocar nada más (el modelo pide 2 clubes reales en la liga o en su nivel); los años de margen sin estimado bajaron de 15 a 5 en la sesión. El resto espera ejercicios reales de la Superliga y de la 1ª 2024.
- Verificado a mano (455): Cada ejercicio de margen bruto tiene su marca en el JSON (revenue_basis) y cargar avisa un margen nuevo; Ligas estima esos años (el real de un informe posterior lo pisa; ancla probada con Lommel 2024, anotada al escribir) con error a la vista y tope del 60 %; los años sin liga se asignaron con dos fuentes; Jev contesta el rótulo desconocido con tres votos coincidentes, con la cola de respaldo; prueba de que los años que quedan sin estimado se resuelven solos al sumar ejercicios reales (Viborg FF 2019 y 2020 bajaron Fredericia 2022 a 2024); 5 años de margen siguen sin estimado a la espera de reales de la Superliga
- Medición: no aplica (datos, sin tools de código).

## Versión 1106 — segunda-fuente-liga.mjs, audit.js, audit-chequeos-2.js: tablas amateur de RSSSF y aviso por una liga que el sitio no tiene [455 · segunda-fuente-liga.mjs, audit.js]
- `segunda-fuente-liga.mjs` lee también las filas de posición sin el punto («1  Club   30 22 5 3 71 69- 20», las amateurs belgas de RSSSF), con PJ, G, E, P, puntos y goles para no cortar un nombre que empieza con número.
- `audit.js` suma `liga-no-catalogada-sin-registro` y `liga-por-abrir` (3 club-años de la misma liga que el sitio no tiene: abrirla con `catalogo-liga.mjs`), leyendo `Admin/registros/ligas-no-catalogadas.jsonl` (documentado en `Admin/PIPELINE.md`). Comentarios sin fecha en `alta-club-analisis.mjs` y `estimar.mjs`.
- Medición: 3 diferencias, todas explicadas (lote completo: idéntico).

## Versión 1105 — RAAL 2018 y Zulte Waregem 2025 con liga, el bocadillo de gastos sin rótulo, la tabla RSSSF de la 1ª Amateur con la tool [454 · 455]
- RAAL 2018 estaba en `liga-no-catalogada` pero la 3ª Amateur belga ya existe en el catálogo: pasa a `be-div3amateur` (lista de 64 equipos de Wikipedia, 2017–18). Zulte Waregem 2025 pasa a `be-challengerproleague` (alias «S.V. Zulte Waregem»; una fuente: la tabla de RSSSF de 2024-25 trae 15 equipos y la de Wikipedia 16).
- Dynamo Makhachkala 2021 sigue en `liga-no-catalogada` y su liga (la Segunda Liga rusa) queda anotada en `Admin/registros/ligas-no-catalogadas.jsonl`. Las tablas RSSSF de la 1ª Amateur 2018 y 2020 pasan a guardarse con `segunda-fuente-liga.mjs`, no a mano.
- El bocadillo de «s/d» de los gastos queda sin rótulo, como la nota (español e inglés). Medición: no aplica a estos datos; las tools de la sesión van en su propia entrada.
- Verificado a mano (454): Plantillas de «Notas sobre este club» aprobadas por Guido (textos de ventas totales, gastos, parte y bocadillos; una nota por año y el mismo texto en un punto aunque no sean consecutivos); un ejemplo real de cada plantilla y los 4 casos raros revisados con Guido; Fredrikstad 2016-2018 y 2024 a ventas totales; Panetolikos 2021 con el rótulo corregido; comprobado en pantalla (Argentinos Juniors, Fredrikstad, Dender, Panetolikos)

## Versión 1104 — los 5 años de margen bruto sin liga y Panetolikos 2021 [455 · 454 · panetolikos-gr]
- Liga asignada con dos fuentes (Wikipedia en inglés y RSSSF, ésta anotada en `be.json`): Lommel 2018, RWDM 2020 y Lierse Kempenzonen 2018 (era Oosterzonen, mismo club) en la 1ª División Amateur; Vejle 2022 en la 1ª División danesa. RAAL 2018 jugó en la tercera amateur, que el sitio no tiene: `liga-no-catalogada`. Alias nuevos («Oosterzonen», «Vejle Boldklub», «Vejle BK»). Años de margen sin estimado: 15 a 9 (los que quedan no tienen un club real en su liga-año).
- Panetolikos 2021: el rótulo de la línea era una fila geográfica («Αγορές τρίτων χωρών», glosada «Compras de terceros países»); pasa a «Κύκλος εργασιών (καθαρός), resto sin desglosar (sin la venta de un jugador)»; los 600.000 € de venta de jugador y el total no cambian.
- `audit-ignore.json`: la aceptación de las filas en null ya no depende del número («24 de 13»); `audit-acciones.json` suma 5 códigos. Medición: no aplica (datos y registros; sin tools de código).

## Versión 1103 — «Notas sobre este club»: una nota por año, el mismo texto en un solo punto aunque los años no sean consecutivos, y los textos de Guido [454 · fredrikstad-no]
- Los ingresos y los gastos de un mismo ejercicio salen en una sola nota; los ejercicios con el mismo texto se juntan en un punto sin importar si son consecutivos («2016 a 2018 y 2024»), así un año nuevo con el mismo caso se suma solo. Textos nuevos (Guido): ventas totales («El documento informa una categoría como ingresos pero no lo abre por rubro…») y gastos sin el rótulo; un renglón de un año con más de una línea de ingreso (un departamento, una división) usa el texto de «parte».
- Fredrikstad 2016 a 2018 y 2024: «Annen driftsinntekt» es igual a «Sum inntekter», o sea el ingreso total: pasa a ventas totales y se aprende para los años que vengan; 2013 a 2015 sigue como una parte del ingreso.
- Medición: no aplica (sin tools del pipeline); comprobado en pantalla con Argentinos Juniors (una nota por año) y Fredrikstad (un solo punto para 2016 a 2018 y 2024).

## Versión 1102 — cargar-ejercicio.mjs, jev-tipo-linea.mjs: Jev contesta primero el rótulo desconocido de una línea única de ingresos [455 · cargar-ejercicio.mjs, jev-tipo-linea.mjs]
- Un rótulo de línea única que ninguna regla ni respuesta anterior reconoce se le pregunta a Jev (3 respuestas solo con el rótulo; centavos de API, aprobado por Guido). Si las 3 coinciden con confianza de 0,8 o más, el tipo (margen bruto, ventas u otra) se aprende en `tipos-sin-desglose.jsonl` y no se vuelve a preguntar; si no, va a la cola como antes. Gasto en `Admin/registros/api/jev.jsonl`.
- Calibrado con rótulos de los tres tipos: los claros dan 0,85 o más; los ambiguos («Fútbol profesional», «Annen driftsinntekt») y uno inventado, 0,4 a 0,79, y van a la cola. Probado de punta a punta cambiando un rótulo de un documento y revirtiendo.
- Medición: idéntico (lote completo).

## Versión 1101 — cargar-escribir.mjs, cargar-ejercicio.mjs: la ancla del ingreso del año anterior de margen bruto se anota al escribir [455 · cargar-escribir.mjs, cargar-ejercicio.mjs]
- La ancla (`Admin/registros/ingresos-ancla.jsonl`) se proponía pero nunca se anotaba: `cargar.mjs` le pasa un argv limpio a las fases y la condición `--escribir` de `cargar-ejercicio.mjs` no se cumplía. Ahora la anota `escribir()` (una línea por club-año, sin repetir, y la revierte un P0/P1 de la auditoría).
- Probado con Lommel 2024: la línea se anota una sola vez y una segunda carga no la duplica. Recarga de Dender 2024 (margen bruto, sin ancla posible), RWDM 2023 (idéntico) y Lommel 2022 (mismos totales; la amortización queda entera porque la regla del 630 por la nota no parte un año ya publicado).
- Medición: 1 diferencia, explicada (lote completo: idéntico).

## Versión 1100 — alta-club-analisis.mjs, alta-club.mjs, cargar-inicio.mjs, cargar-escribir.mjs, audit.js, audit-chequeos-2.js: moneda legado sin preguntar, Wikipedia local en la compuerta y chequeo de estimados repetidos [455 · alta-club-analisis.mjs, cargar-inicio.mjs, cargar-escribir.mjs, audit.js]
- Un ejercicio anterior al cambio de moneda cuyo documento habla sobre todo en la moneda vieja se carga en ella (kunas, liras…), con su tipo de cambio a USD del cierre y sin preguntar ni frenar (decisión de Guido); `HRK` entra a `CURRENCY_META` con su paridad fija al euro. La compuerta de estadio y sponsor de `cargar` usa también la Wikipedia del idioma del club (`--local`); regla en `Admin/PIPELINE.md`.
- `audit.js` suma `estimado-repetido` (P1): un club con dos estimaciones en la misma liga-año, aunque la tool misma lo repita. Dato nuevo: lista de Tottenham 2019 corregida a mano; listas de la 1ª División danesa 2018 y 2021 a 2025.
- Medición: 4 diferencias, todas explicadas (completo: idéntico); la mediana solo cambia Rijeka 2022, que deja de frenar por la moneda y carga en kunas.

## Versión 1099 — estimar.mjs, fetch-club-league-reference.mjs: un ejercicio estima en una sola temporada; una lista de Wikipedia corregida a mano no se pisa [455 · estimar.mjs, fetch-club-league-reference.mjs]
- `estimar.mjs`: un club del sitio se estima solo en la temporada que le da la regla de lo real (la categoría al cierre del ejercicio, `faltantes-liga.mjs`). Chile 2013 caía en dos temporadas que se pisan por el cambio de calendario (la de 2013 y la de 2013–14) y Colo-Colo y Universidad de Chile salían dos veces, con +68 % y +115 % la segunda.
- `fetch-club-league-reference.mjs`: una lista con `manualFix` no se vuelve a escribir sin `--forzar`. Tottenham 2019 (lista de Wikipedia con «Tottenham» dos veces: 21 equipos para 20) corregida a mano y marcada.
- Medición: 3 diferencias, todas explicadas (lote completo: ensayo idéntico; `audit` suma `estimados-desfasado`, que se corrige al regenerar); `data/estimados/` con y sin `estimar.mjs` difiere solo en Chile 2013 (las dos filas repetidas).

## Versión 1098 — cargar-ejercicio.mjs, tipo-sin-desglose.js: el rótulo de una línea única desconocido se aprende por la cola, y el ingreso del año anterior de margen bruto se anota como ancla [455 · cargar-ejercicio.mjs, tipo-sin-desglose.js]
- `tipo-sin-desglose.js`: mira primero lo aprendido (`Admin/registros/tipos-sin-desglose.jsonl`) y después las palabras; `tipoConocido` da null si nada reconoce el rótulo. `cargar-ejercicio.mjs` manda esa línea de ingresos a la cola (motivo `tipo-linea`, no frena) y aprende la respuesta: no se pregunta dos veces.
- `cargar-ejercicio.mjs`: si el año anterior del club es de margen bruto y el documento (esquema belga) imprime el ingreso de ese año en su columna anterior, `--escribir` lo agrega a `Admin/registros/ingresos-ancla.jsonl` (Lommel 2024 propone los 5,806012 M EUR de 2022/23).
- Medición: idéntico (lote completo); ni la cola nueva ni el ancla aparecen en los lotes de prueba, y se probaron a mano.

## Versión 1097 — estimar.mjs: tope de error por país y caso, automático [455 · estimar.mjs]
- `ERROR_MAXIMO` = 60 % (decisión de Guido): un estimado no se publica si el error mediano medido de su país y su caso (club nuevo, entre dos reales, antes o después; con menos de 8 club-años medidos vale el error global del caso) lo pasa. Se recalcula en cada `--escribir` y `--check` (la auditoría, `estimados-desfasado`). Regla escrita en `Admin/CONVENCIONES-DATOS.md`.
- Efecto: 1.528 estimados de club nuevo dejan de publicarse (Portugal 781, Colombia 512, Grecia 233, Croacia 2); Bélgica, Dinamarca y los de club con otros años siguen.
- Medición: 5 diferencias, todas explicadas (medidor de auditoría); el error global del modelo no cambia.

## Versión 1096 — generate-rankings.js, estimar.mjs, faltantes-liga.mjs, generate-club-index.js: Ligas estima los años de margen bruto y un ingreso real de un informe posterior lo pisa [455 · 447 · generate-rankings.js, estimar.mjs, faltantes-liga.mjs, generate-club-index.js]
- Un ejercicio de margen bruto (`revenue_basis: gross_margin`, `gm` en `data/club-index.js`) sale del ranking, la composición y la mediana de la liga (`margen` en `data/rankings/`) y `faltantes-liga` ya no lo da por cubierto: `estimar.mjs` lo estima (interpolación entre sus años completos o modelo de club nuevo, margen positivo como piso, rango medido); un ingreso real de un informe posterior (`Admin/registros/ingresos-ancla.jsonl`: Lommel 2022/23, RWDM 2023/24, SønderjyskE 2023/24) lo pisa. Finanzas no cambia.
- Error del modelo medido con `estimar --medir`: por club 51 % antes, 50 % ahora (39 filas menos de entrenamiento); en Bélgica y Dinamarca cambian los estimados que estaban envenenados por márgenes chicos; fuera de ellos 6.757 estimados con mediana de cambio 0,9 % (los dos saltos de Chile 2013 eran una fila repetida: Versión 1099).
- `js/liga.js` y `data/lang/en.js`: «(informe siguiente)» para el dato real, dos notas nuevas (margen bruto e informe siguiente), el club de margen sin estimado va a «sin ingreso calculable» y una liga-año sin ningún club real no muestra el total en cero; `Admin/PANTALLA.md` al día.
- Medición: 4 diferencias, todas explicadas (medidor de auditoría); se verificó a mano comparando los estimados antes y después y la pantalla de Ligas en español, inglés y 375 px.

## Versión 1095 — audit-chequeos-1.js: la banda de escala no cuenta los ejercicios de margen bruto [455 · audit-chequeos-1.js]
- `escala-implausible` (P0) marcaba como error de escala un año de margen bruto (`revenue_basis: gross_margin`) de cifra chica por naturaleza (un margen de 0,09 M USD en un club que factura unos 100 veces más), y revertía su carga; ahora ese año no entra a la banda. Lo encontró la carga de prueba de un año belga con margen sin año vecino parecido.
- Medición: 5 diferencias, todas explicadas (medidor de auditoría, lote chico): se va `escala-implausible` para ese año con los datos de HEAD; el resto de la auditoría idéntico.

## Versión 1094 — cargar-escribir.mjs, nbb.mjs, ingreso-derivado.js, audit-chequeos-3.js: la escritura persiste la marca de ingreso, el reconstruido lleva su rótulo y el margen reconstruible frena [455 · cargar-escribir.mjs, cargar-ejercicio.mjs, nbb.mjs, ingreso-derivado.js, ingreso-base.mjs, audit-chequeos-3.js, prueba-escribir.mjs]
- `cargar-escribir.mjs`: el escritor copiaba una lista fija de campos y descartaba `baseIngreso`/`derivacionIngreso`: un año cargado por el pipeline quedaba sin marca (lo atrapó `prueba-escribir.mjs` al subir `ingreso-sin-base` a P1; ahora muestra el detalle del revert). `nbb.mjs`: la hoja reconstruida 70/74 lleva su rótulo (antes «Brutomarge», el de la fila a la que apunta).
- `ingreso-derivado.js`: la identidad margen + compras y servicios se reconoce también por línea (un año con extraordinarios aparte, Patro Eisden 2015 y 2017, Dender 2017); `ingreso-base.mjs` agrega la derivación a un año ya marcado.
- `audit-chequeos-3.js`: `ingreso-sin-base` y `margen-reconstruible` (un año de margen cuyo documento imprime 60/61) son P1.
- Medición: 8 diferencias, todas explicadas (lote completo): la prueba de escritura pasa con las tools nuevas y falla con las commiteadas (su chequeo marcaba a Patro Eisden 2015 y 2017); cargar idéntico. La rama nueva de nbb no está en los lotes de prueba.

## Versión 1093 — cargar-ejercicio.mjs, nbb.mjs, tipo-sin-desglose.js, ingreso-derivado.js, audit-chequeos-3.js: la carga marca el ingreso (revenue_basis, revenue_derivation) y reconstruye el belga con margen + compras y servicios [455 · cargar-ejercicio.mjs, nbb.mjs, tipo-sin-desglose.js, ingreso-derivado.js, ingreso-base.mjs, audit-chequeos-3.js]
- `cargar-ejercicio.mjs`: cada año cargado lleva `baseIngreso` (completo, ventas totales o margen bruto) y `derivacionIngreso` si se reconstruyó; un año de margen sin reconstrucción posible avisa. La regla es una sola, `baseDeIngreso` de `ingreso-derivado.js`, compartida con `fos ingreso-base`.
- `nbb.mjs`: con 9900 y 60/61 impresos y un residuo negativo (las partes de ingreso impresas no cuadran) el ingreso es una línea, 70/74 = 9900 + 60/61, en vez del margen; no cambia ningún año cargado salvo Patro Eisden 2020 (ya corregido en el dato); 4 columnas de 302 documentos belgas usan la rama.
- `tipo-sin-desglose.js`: reconoce margen bruto en más idiomas; `audit-chequeos-3.js`: `ingreso-sin-base` sube a P2.
- Medición: idéntico (lote completo); la rama nueva de nbb no está en los lotes de prueba, por eso se probó a mano sobre los 302 documentos belgas con estado NBB.

## Versión 1092 — Patro Eisden 2019/20: el ingreso se reconstruye con margen bruto + compras y servicios [455 · patroeisden-be]
- El documento corregido imprime el margen bruto (277.991) y compras y servicios (423.072): el ingreso es 701.063 EUR (70/74 = 9900 + 60/61), y el sitio mostraba solo el margen. Ahora: una línea «Bedrijfsopbrengsten» de 0,701 M (como Patro Eisden 2019) y 0,423 M de compras y servicios en los gastos; el resultado (-0,708 M) no cambia. No se abre en ventas y otros: las partes que el documento imprime (70 y 73) no cuadran con el margen.
- Marcado `revenue_basis: sales_total` y `revenue_derivation` (12 reconstruidos); `audit.js` P0 0, P1 0 y comparado en pantalla (0,8 M USD en 2019/20).
- Medición: no aplica (un dato de un club; sin tools del pipeline).

## Versión 1091 — los 1340 ejercicios con su base de ingreso (revenue_basis) y los 11 reconstruidos marcados [455]
- `fos ingreso-base --escribir` sobre los 331 clubes: 1258 `full`, 32 `sales_total`, 46 `gross_margin`; 11 con `revenue_derivation` (Patro Eisden, Lokeren-Temse, Dender). Los 4 años sin meta (Lierse SK 2019-2021, Patro Eisden 2021) no se pueden marcar.
- Probado: datos, fuentes y totales idénticos antes y después en los 331 clubes (sin contar los dos campos); `generar-data --check` en verde; `data/schema/club-v2.json` regenerado. `Admin/mediciones/455-...md` corregido (46 de margen, 11 reconstruidos; ancla de SønderjyskE 2024).
- Medición: no aplica (datos; la tool se midió en la Versión 1090).

## Versión 1090 — cambio-formato.js, audit-chequeos-3.js, json-datos.mjs, ingreso-derivado.js, ingreso-base.mjs: señal de cambio de formato más precisa y marca del ingreso por año (revenue_basis, revenue_derivation) [455 · 447 · cambio-formato.js, audit-chequeos-3.js, audit.js, json-datos.mjs, ingreso-derivado.js, ingreso-base.mjs]
- `cambio-formato.js`: un año con una línea extra que pesa menos del 10 % no cuenta como «completo» (23 a 15 avisos); `audit-chequeos-3.js`: `cambio-de-formato-sin-nota` da por cubierto un año resumido que ya lleva la nota automática de `sinDesglose`.
- `json-datos.mjs` (+ esquema, paquete): campos opcionales `adjustments.revenue_basis` (`full`, `sales_total`, `gross_margin`) y `revenue_derivation` (`margin_plus_costs`: margen bruto + compras y servicios del documento); `ingreso-derivado.js` es la identidad, `ingreso-base.mjs` (`fos ingreso-base`) la escribe en los ejercicios ya cargados sin tocar importes (probado idéntico en los 331 clubes).
- `audit.js`: `ingreso-reconstruido-no-cierra` (P1: un reconstruido que ya no cierra con su documento) e `ingreso-sin-base` (P3).
- Medición: 3 diferencias, todas explicadas (lote completo): se va `cambio-de-formato-sin-nota`; aparecen `ingreso-sin-base` (la marca se escribe en el commit de datos siguiente) y `todo-cumplido` del 447 (no se cierra sin autorización); cargar, escribir, caja-deuda y alta idénticos.

## Versión 1089 — inventario de ingresos con margen bruto y punto 455 (estimado de Ligas y detección en el pipeline) [455 · 447]
- `Admin/mediciones/455-ingresos-con-margen-bruto.md`: 53 de 1340 ejercicios en 14 clubes (solo Bélgica y Dinamarca cargados), peso por liga-año, la identidad del margen belga (ingreso = margen + compras + servicios, verificada al euro) y qué se recupera sin estimar (Lommel 2022/23, RWDM 2023/24, Patro Eisden 2020); el margen no sirve de proxy (razón 2 a 18).
- Casuísticas revisadas: Fredrikstad «Annen driftsinntekt» es el ingreso total; «Receita Operacional Bruta» de Remo no tiene deducciones; el resto sin hallazgos.
- `Admin/TODO.md`: punto 455 con la propuesta aprobada (estimado solo en Ligas, formato de estimados existente, dato real lo pisa) y los cambios de pipeline.
- Medición: no aplica (documentos y TODO; sin tools).

## Versión 1088 — «Notas sobre este club»: sin montos, años consecutivos juntos, nota del margen bruto y del renglón parcial [447 · 454]
- `js/finanzas-render.js` (`renderNotasClub`): las notas ya no llevan el importe (la tabla lo muestra) y los ejercicios consecutivos con la misma nota se juntan en un punto («2019/20 a 2022/23»; en inglés «to»).
- Texto nuevo del margen bruto: no sabemos cuántos ingresos generó el club, solo la diferencia con parte de sus costos; no comparar con años que abren los ingresos. Caso nuevo `salesPart` (el renglón sin abrir es una parte de los ingresos del año): se dice que figura como s/d y que el resto está abierto, sin afirmar que el total es comparable (antes lo decía en más de 200 ejercicios).
- `data/lang/en.js`: `pl.notas.margin`, `.sales`, `.salesPart`, `.other`, `.exp`, `.hasta`. ASSET_V 1772.
- Medición: no aplica (sin tools del pipeline); verificado en Lommel (es/en, escritorio y 375 px, sin scroll horizontal) y `audit.js` P0 0, P1 0.

## Versión 1087 — se saca del sitio el texto interno de Resultados; estado de 447, 454 y 452 en el TODO [447 · 454 · 452]

- `index.html` y `en.js`: «Fuentes: Wikipedia…» ya no dice «buscada y verificada en agosto de 2026. A cruzar contra el sitio oficial de cada club antes de publicar» (nota interna que el visitante veía). Los puntos 447, 454 y 452 siguen abiertos (Guido los cierra); cada uno lleva en su cuerpo lo hecho y lo que queda.
- Medición: solo documentos y textos.

## Versión 1086 — medir-pipeline.mjs: cada nivel corre solo su tramo; fos progreso [medir-pipeline.mjs, progreso-medicion.mjs]

- Las listas chico, mediano y completo están anidadas y cada nivel corría la suya entera: 126 + 548 + 1004 = 1678 documentos en vez de 1004. Ahora cada nivel corre los documentos que no estaban en uno menor (126, 422, 456): el corte temprano en el chico sigue y el total baja 40 %. Un medidor que no usa lista corre y se compara una sola vez, en el primer nivel.
- `medir-pipeline.mjs` escribe `Admin/mediciones/pipeline/_progreso.json` en cada paso y `node tools/fos.mjs progreso` dice el porcentaje, qué corre y cuánto falta. La medición se lanza sin `| tail`: su salida se ve en vivo.
- Medición: no es del pipeline; `probar-medir-pipeline.mjs` ok y una medición real de `cargar-ejercicio.mjs` contra el commit anterior (126 + 422 + 456 documentos, idéntica, 10 min 52 s).

## Versión 1085 — marca s/d y notas sobre el club (base de 447, 454 y 452) [447 · 454 · 452 · bfo-rusia.mjs, cargar-ejercicio.mjs, cargar-escribir.mjs, json-datos.mjs, tipo-sin-desglose.js]

- Las celdas que el documento no abre se ven `s/d` (inglés `n/d`) con bocadillo y asterisco a «Notas sobre este club», armado por ejercicio con plantillas es/en desde `sinDesglose`. `no_breakdown` suma `kind` (opcional; schema, `json-datos.mjs`, paquete exportable) y `fos sin-desglose-tipo` lo completó en 136 clubes (76 líneas agregadas, 494 tipos). `cargar-ejercicio.mjs` y `bfo-rusia.mjs` lo escriben al cargar; `cargar-escribir.mjs` ya no lo descarta. Los puntos 447, 454 y 452 siguen abiertos (Guido los cierra).
- Medición: lote completo, `cargar` idéntico; `audit`, `escribir` y el schema cambian como se espera (las versiones viejas de las tools rechazaban el campo nuevo); 10 diferencias, todas explicadas.

## Versión 1084 — i18n: textos de la pantalla que se veían en castellano en inglés; audit.js texto-sin-traducir [audit-chequeos-5.js, audit.js]

- Se traducen: Resultado neto, Intereses netos, Impuestos, Ganancia por venta de jugadores, Venta de activos, Deuda bruta, Caja, Deuda neta, Salarios / Ingresos (`data/site-labels.js`), los títulos de los gráficos, «% del total», los rótulos de Comparar, el texto de Resultados, el selector de tipo del formulario y las salvedades de las fuentes. Quedan en castellano a propósito los rótulos textuales del presupuesto de un club (cards de torneos) y los nombres de gestión que vienen de los datos.
- `audit.js` da `texto-sin-traducir` (P3) con los rótulos de `js/` fuera de `site-labels.js` y los textos de `index.html` sin `data-i18n`.
- Medición: `audit` idéntico (hoy no dispara).

## Versión 1083 — 451 cerrado: glosas de todas las etiquetas, traducidas con Claude y automáticas al escribir un año [451 · audit-chequeos-5.js, generate-glosas.mjs, glosas-etiquetas.mjs]

- `glosas-etiquetas.mjs --completar` traduce con Claude Sonnet 5.5 (no Gemini) en lotes de 100: 11.160 etiquetas distintas, US$ 4,79, 0 sin glosa (portugués, italiano, neerlandés, griego, croata, ruso, turco, alemán, japonés y estonio revisados por muestra). `generate-glosas.mjs`, en la lista de generadores, traduce solo lo nuevo al escribir un año (tope de 400 etiquetas por corrida; sin clave o sin red deja lo escrito y no frena la carga; `FOS_SIN_API=1` la apaga). Probado: una etiqueta nueva en un club se tradujo en una corrida por US$ 0,0014.
- Verificado a mano (451): SønderjyskE en español e inglés, 375 px y ?audit=1 sin errores; 0 etiquetas sin glosa en los 331 clubes; una etiqueta nueva se traduce sola con generate-glosas.mjs; P3 etiqueta-sin-glosa
- Medición: `audit` idéntico (el aviso `etiqueta-sin-glosa` ya no dispara).

## Versión 1082 — 451: las etiquetas de las filas en el idioma del visitante [451 · audit-chequeos-5.js, audit.js, generadores.mjs, generate-glosas.mjs, glosas-etiquetas.mjs]

- Las filas del «Formato del club» muestran una glosa en español o inglés con el original en el title (`tLabelH`); la tabla es `data/<país>/<club>-glosas.js` (aparte del JSON del club: no cambia el contrato). `glosas-etiquetas.mjs` la arma (`es` de las glosas de `Generados/`, `--completar` con Gemini para lo que falta); `generate-glosas.mjs` corre con los demás generadores; `audit.js` da `etiqueta-sin-glosa` (P3). SønderjyskE completo; faltan unas 11 mil etiquetas de los demás clubes (gasto de Guido, escrito en el punto).
- Medición: `audit` con una diferencia, el aviso nuevo, explicada; el medidor `cargar` no usa estos archivos. Verificado en el navegador (español, inglés, 375 px, `?audit=1` 0 no cierran).

## Versión 1081 — 444 cerrado: ningún documento de un club con algo cargado frena por falta de cierre [444]

- Estado final: los documentos anuales sin cierre en el registro pasaron de 675 a 302; de los de clubes con algo cargado (175), 44 los deducen los vecinos, 102 los confirmó la cola (`cierre-por-pais`), 29 ya tienen el año cargado y 0 frenan (el P3 `cierre-sin-fecha` lo cuenta). Los otros 127 son de clubes todavía sin cargar (Francia 43, Corea del Sur 14, Turquía 10, Chequia 9, Japón 8, Ucrania 8…): su fecha se resuelve al darlos de alta (vecinos, `cierre-propuestas --escribir` para los países con cierre por defecto, o un ajuste `cierre` leído del documento), y si un club entra con un cierre que `periodo.mjs` no lee (Corea del Sur: «AAAA년 MM월 DD일 까지») se mejora ahí, midiendo.
- Verificado a mano (444): fos cierre-sin-fecha da 0 que frenan; 13 ajustes cierre leídos del documento, 163 preguntas de cola contestadas, 25 descartados; el P3 cierre-sin-fecha cuenta los de clubes cargados (0 hoy)
- Medición: solo documentos y registros; ver las entradas 1079 y 1080.

## Versión 1080 — auditoria.mjs: un informe del auditor descartado como fuente de carga sigue siendo fuente de la auditoría [auditoria.mjs]

- Guido: cada club deja su informe del auditor. Pero `auditoria.mjs` sacaba de sus fuentes todo lo que está en `documentos-descartados.txt`, y ahí hay unos 300 dictámenes (226 «dictamen del revisor fiscal», el resto «informe del auditor…»): descartar un dictamen suelto lo dejaba sin con qué citar la línea del club-año. Ahora un descartado cuyo motivo empieza por dictamen o informe del auditor/revisor no se excluye de la auditoría. Hoy no cambia ningún resultado (`--pendientes` 359 antes y después, `--check` al día): evita que pase cuando se cargue el balance de uno de esos años.
- Medición: PARCIAL, con el ok de Guido (cortó el resto): lote chico (126 documentos), `cargar` y `audit` idénticos; el mediano y el completo no se corrieron. Commit con `[sin-medicion]`.

## Versión 1079 — 444: los 38 frenados eran 13 balances; 25 descartados y 13 ajustes cierre; frenan 0 [444 · cierre-sin-fecha.mjs, probar-cierre.mjs]

- Guido abrió `River/memoria-2018-2019` y era narración sin cifras. Se revisaron los 38 por filas con números y palabras de estados: 25 no eran balances (memorias, certificaciones, dictámenes) y entraron a `documentos-descartados.txt` con su motivo; `fos cierre-sin-fecha` ya no cuenta los descartados (el total sin cierre bajó de 457 a 302).
- Los 13 balances reales (Dortmund, Llaneros, Istra, Osijek, Rijeka, Den Bosch) llevan un ajuste `cierre` con la línea citada; Den Bosch 2019-20 con seguridad media. Frenan 0.
- Medición: `cierre-sin-fecha.mjs` no es del pipeline; `fos probar cierre` sin fallas.

## Versión 1078 — cierre-sin-fecha no cuenta los documentos cuyo año ya está cargado [cierre-sin-fecha.mjs, probar-cierre.mjs]

- De los 83 «frenan» de antes, 45 eran documentos con el año ya en el sitio (`cargado`): al registro le falta la fecha, pero no hay carga que esperar. Ahora se cuentan aparte (`yaCargados`) y frenan 38 (Colombia 16, Argentina 10, Croacia 6, Alemania 4, Grecia 1, Países Bajos 1), de los cuales unos 20 están listos para cargar y el resto aún sin segunda lectura.
- Medición: no es del pipeline (solo lee el registro y la cola); `fos probar cierre` sin fallas.

## Versión 1077 — audit.js: calibracion-cola-pendiente [audit-chequeos-5.js, audit.js]

- P3 cuando una celda (motivo × seguridad) de la cola tiene 30 respuestas o más y menos de 20 con segunda revisión (`calibrar-cola.mjs`): el recordatorio ya no depende de que una sesión se acuerde. Hoy dispara por cierre-por-pais alta (13 de 131).
- Medición: `audit` con una diferencia, el aviso nuevo, explicada.

## Versión 1076 — 298: tres letras verificadas contra el código y sacadas [298]

- aa, i y o ya estaban hechas (`worktree.mjs`, `alta-club-tablas.mjs`, `lote-preparar.mjs`); el resto del 298 sigue, con la nota de por qué no es un punto chico. Se calibró la cola con 30 segundas revisiones (30 de 30 coinciden; `Admin/registros/calibracion-cola.jsonl`).
- Medición: solo documentos.

## Versión 1075 — fos calibrar-cola: cuánto acierta una respuesta de la cola según su seguridad [calibrar-cola.mjs]

- `node tools/calibrar-cola.mjs` da por motivo y seguridad cuántas respuestas hay, cuántas se volvieron a medir con una segunda revisión y cuántas coincidieron; `--muestra N` saca respuestas al azar para un revisor que no ve la original; `--registrar` anota el resultado en `Admin/registros/calibracion-cola.jsonl` (esquema `calibracion-cola`). Hoy hay 165 respuestas con seguridad y ninguna medida.
- Medición: no es del pipeline (solo lee la cola); `fos --check` al día.

## Versión 1074 — ejercicio-sin-rastro: «en mano» avisa que puede ser solo la memoria [audit-chequeos-5.js]

- Ferro Carril Oeste 2024 salía «en mano» por el nombre de `memoria-ejercicio-120-2023-24.pdf`, pero esa memoria es narrativa y sin cifras (verificado en `Admin/sourcing/Argentina/Ferro Carril Oeste.md`; el silencio es correcto). El texto ahora pide mirar que el PDF traiga estados.
- Medición: `audit` idéntico.

## Versión 1073 — medir-pipeline.mjs no se frena por un veredicto sin commitear [medir-pipeline.mjs, probar-medir-pipeline.mjs]

- Un veredicto `RECHAZADA` de `patron` queda sin commitear en `auditoria-proceso.jsonl` y frenaba la medición siguiente («cambios sin commitear en datos o registros»). Ese archivo lo escriben `patron.mjs` y `decision.mjs`, no un medidor: sale de lo que la medición exige limpio (y de lo que revierte).
- Medición: `probar-medir-pipeline.mjs` con un caso nuevo, ok.

## Versión 1072 — 434: qué se lee en vano al arrancar; `arranque orden` de 9,9 a 4,5 KB [434]

- Informe `Admin/mediciones/434-arranque-en-vano.md` (KB por rol y por sesión). `ESTADO.md`: el rol `orden` sale de «Objetivo», «Techo del modelo» y «Sitio, publicación y analytics». Dos propuestas que tocan texto que Guido lee (partir la skill de arranque, recortar «Al empezar» de CLAUDE.md) quedan en el informe, sin hacer.
- Verificado a mano (434): informe Admin/mediciones/434-arranque-en-vano.md con Conclusión y Destino; arranque orden medido de 9,9 a 4,5 KB tras el cambio de marcas en ESTADO.md
- Medición: solo documentos.

## Versión 1071 — 417 (parte): audit.js --leyenda [417 · audit.js]

- `node tools/audit.js --leyenda` imprime los cinco niveles con su definición, los hallazgos que tienen hoy y los códigos que los emiten. Del 417 quedan la skill y el chequeo de severidades, P1 y los contrastes externos (de Guido): quedó escrito en el punto.
- Medición: `audit` idéntico.

## Versión 1070 — 416: silencios de audit-ignore con fecha de revisión; ejercicio-sin-rastro dice si el documento está en mano, descartado o no existe [416 · audit-chequeos-5.js, audit.js, probar-registros.mjs, silenciar.mjs]

- Una entrada de `tools/audit-ignore.json` puede llevar `revisar` (AAAA-MM-DD): pasada la fecha, `audit.js` da `silencio-vencido` (P3). `silenciar.mjs --revisar` la pone y la exige si el motivo es «sin verificar», «no publicado» o parecido. Las 5 entradas «aceptado sin verificar» (2026-12-23) y las 3 de «todavía no publicado» (Gladbach, Stuttgart, Monza; 2027-01-23) ya la llevan.
- `ejercicio-sin-rastro` agrega por cada año: «en mano» (hay un PDF con ese año en el nombre), «descartado» (con el motivo de `documentos-descartados.txt`) o «sin documento». Ejemplo: Fredrikstad 2019-2023 sale «descartado».
- Verificado a mano (416): silencio-vencido y --revisar probados con probar-registros.mjs; ejercicio-sin-rastro corrido sobre los 13 clubes (Fredrikstad sale descartado); 8 entradas de audit-ignore.json con revisar
- Medición: `audit` idéntico (el aviso nuevo no dispara hoy y los silenciados no cuentan); `probar-registros.mjs` con un caso nuevo, ok.

## Versión 1069 — esquema de ajustes-manuales.jsonl y mediciones-pipeline.jsonl [ajustes.mjs, medir-pipeline.mjs, audit-chequeos-5.js, probar-registros.mjs]

- `tools/esquemas-registros.json` define los dos registros (`validacion.registros`). `ajustes.mjs` (`--agregar`, `--anular`, `agregarAjuste`) y `medir-pipeline.mjs` escriben `esquema: 1` y no guardan una línea que no lo cumple; `ajustes --agregar` acepta `--causa` (opcional). Lo anterior es legado. `audit.js` (`registro-fuera-de-esquema`) revisa las líneas que declaran `esquema`.
- Medición: lote completo (1004 documentos), todos los medidores idénticos; `probar-registros.mjs` (3 casos nuevos), `probar-medir-pipeline.mjs` y `prueba-escribir.mjs` (`ajustes --agregar` en un worktree) ok.

## Versión 1068 — imports sin uso de las 7 tools grandes del pipeline; el aviso imports-sin-uso queda en 0 [alta-club.mjs, lote.mjs, verificar.mjs, caja-deuda.mjs, cargar.mjs, resolver-inventario.mjs, categorizar-claude.mjs]

- Se quitan los 174 imports restantes (el script rompió dos imports por defecto y de espacio de nombres, `vm` y `EV`: se borraron a mano y `indefinidos` quedó limpio). Los imports sin uso de tools/ pasan de 220 a 0.
- Medición: lote completo (1004 documentos), todos los medidores idénticos salvo el aviso `imports-sin-uso` de audit (desaparece), explicado por el resumen.
