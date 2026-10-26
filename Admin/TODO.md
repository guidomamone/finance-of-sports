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

### 1. 463 · (Onboarding, con Pipeline y Auditora): SIIS (Colombia) como estado primario oficial: tool, chequeo permanente, criterio, Tolima y los otros tres clubes, y las cositas chicas que iban con eso

Reemplaza y agrupa los puntos 257 (Deportes Tolima), 461 (cositas chicas) y 462 (SIIS), cerrados al abrir este (2026-10-26) para no trabajarlos a la vez. Su texto original queda en git: `git show 743efef04a:Admin/TODO.md`. NO TOCAR 420, 445 ni 452 (otros puntos). El 401 sigue aparte y va al final.
DECISIONES DE GUIDO (2026-10-26): (a) el estado de resultados de SIIS (índice `siis_resultadointegral`, datos parseados que el club cargó en el formulario; no es un PDF) es el ESTADO PRIMARIO OFICIAL de un club colombiano; (b) un año que SIIS tiene y no tiene PDF útil SE CARGA igual (nivel de dato nuevo: rubros grandes y resultado); (c) la tool, el chequeo y la regla se enganchan al pipeline y a `audit.js`, sin depender de la memoria de una sesión; (d) el informe de UEFA con imágenes no interesa (se descartó).
HECHOS que sostienen esto (detalle en `Admin/sourcing/Colombia/_notas-generales.md`, «SIIS SÍ da el estado de resultados primario»): `siis_resultadointegral` da por NIT y año ingresos, costo de ventas, gastos de ventas y de administración, otros ingresos y gastos, impuestos y resultado, con el año anterior al lado; Tolima, La Equidad, Talento Dorado (Águilas Doradas) y Atlético Bucaramanga tienen 2016 a 2025; el sector tiene 373 presentaciones del CIIU R9312 de 2015 a 2025 (30 a 43 por año), más R9319 y R9311. Existe también `siis_flujoefectivo`; el índice del balance no se encontró (su nombre no es `siis_situacionfinanciera`). El resultado de SIIS suma exacto por dentro y coincide con `utilidades` de `siis_empresas`. En Tolima el costo de ventas NO explica solo la diferencia con las notas (2023: 945 contra 1.660 millones de pesos; 2024: 2.406 contra 2.633; 2025: 2.826 contra 2.774), así que se concilia rubro por rubro. Desde 2024 «gastos de ventas» y «de administración» cambian de lugar en algunos clubes: se compara por el total de gastos. La tabla de la Nota 18(3) de Tolima está corrida un año (su «2025», 914.330.454, es el 2024 de SIIS). La serie `margen` de `siis_empresas` es la ganancia bruta sobre ingresos.
CASOS: (1) PDF completo con su estado propio: se carga del PDF y SIIS es control cruzado (si difieren, a la cola). (2) Solo notas más SIIS (Tolima, La Equidad, Águilas Doradas, Bucaramanga; 34 documentos `estados-financieros-*.pdf` en `Admin/registros/documentos-descartados.txt`, Once Caldas se pudo porque su nota de patrimonio trae el resultado): SIIS manda como estado primario y las notas abren el detalle solo donde concilian con SIIS; lo que no abren queda como el rubro de SIIS, sin inventar desglose. (3) Solo PDF, sin SIIS (club que no deposita, como Pasto o el Deportivo Cali anterior a 2025): como hoy. (4) Solo SIIS, sin PDF útil: se carga con los rubros de SIIS, marcado visible «fuente: SIIS».

ORDEN DE TRABAJO (grupos; cada grupo termina y se commitea antes del siguiente; dentro de un grupo, de a un paso):
GRUPO 1 · La base (Pipeline): lo que lo demás necesita.
 1.1 HECHO (2026-10-26): el balance es el índice `siis_sitfinan` y también existen `siis_flujoefectivo` y `siis_otroreporte` (`_notas-generales.md`). QUEDA: usar el balance de SIIS (caja y «otros pasivos financieros») en `caja-deuda.mjs` para los clubes de solo notas, con su medición.
 1.2 HECHO: regla en `Admin/CONVENCIONES-DATOS.md`. QUEDA: si al cargar aparece una pregunta de criterio sin precedente (cómo se rotula un rubro de SIIS que las notas no abren; cómo se cargan las notas que sí suman), `votacion-de-criterios`.
 1.3 HECHO: `tools/siis-estado.mjs` (+ `tools/siis-clubes.json`, `fos siis-estado`, medidor `siis`, familia «Colombia · siis»). QUEDA: la prueba de escritura con una respuesta guardada de SIIS (va con el 401; hoy figura en `escriben_sin_prueba` de `pipeline-tools.json`).
 1.4 HECHO: el pipeline lo reconoce (inventario con su motor, localizar y extraer en US$ 0, verificar cierra). QUEDA: probar el lote con `--ejecutar` (categorización con IA, unos US$ 0,03 por documento) cuando se cargue Tolima, y que la prueba completa incluya más de un documento de la familia.
 1.5 La carga desde SIIS más notas (casos 2 de la regla): QUEDA decidir en el grupo 3 si las notas abren algún rubro; hasta entonces se carga el estado de SIIS solo.
GRUPO 2 · El control permanente (Auditora):
 2.1 HECHO (2026-10-26): `siis-control`, `siis-faltante` y `siis-resumen-viejo` en `audit.js` (`tools/audit-chequeos-siis.js`, sin red; lee `Admin/sourcing/Colombia/siis-resumen.json`, que regenera `node tools/siis-estado.mjs --inventario --escribir`). Sin revisión independiente (aviso P3 nuevo, sección 7).
 2.2 HECHO: el control encontró Fortaleza 2021 (publicada antes de impuestos; corregida con el ajuste `resultado-final` y el trailer `Corrige:`) y Santa Fe 2025 (era perímetro: la tool toma ahora el estado propio del club; decisión registrada y regla en `CONVENCIONES-DATOS.md`). Los 380 club-años de los 38 clubes cierran las compuertas. QUEDA: 3 clubes cargados sin `official_totals` en algún año no se comparan (el control los saltea).
 2.3 HECHO: inventario en `Admin/sourcing/Colombia/siis-inventario.md` (generado); los cuatro clubes con solo notas cierran de 2016 a 2025.
GRUPO 3 · Los clubes (Onboarding):
 3.1 Deportes Tolima. HECHO (2026-10-26): los DIEZ años (2016 a 2025) están en el sitio, un commit por año. Camino que se repite con cada club: `alta-club.mjs`; `siis-estado.mjs --club "<Club>" --todos --escribir`; lote con `--ejecutar` (categorización, ~US$ 0,03 por documento) y cola; la línea única de ingresos a `lump_football_operations` con `cola --corregir-categoria`; estadio y sponsor de los años que Wikipedia no trae (`tools/contexto-manual.json`, un subagente Sonnet por club con el brief de `club-sourcing` 0.5; Tolima 2016 a 2019 sponsor con fuente débil de una base de camisetas y 2022 sin sponsor, registrado); `data/club-leagues/co.js` con la liga de cada año; `lote --ejecutar --cargar`; `publicar.mjs`; y las líneas del auditor de cada año (subagente, `Admin/registros/auditoria.jsonl`). Detalle: alta, los diez estados de SIIS (uno por año, 2016 a 2025), lote con la categorización y la cola contestada (regla votada 3 a 0: «Gastos de ventas» sin abrir va a `lump_football_operations_expense`, «Costo de ventas» a `other_expenses`; `CONVENCIONES-DATOS.md`). QUEDA, en este orden: (a) verificar que el lote con `--reintentar --cargar` dejó los diez años en `data/co/deportestolima-co.json`; (b) HECHO por el 3.0 (a). Lo anterior de este item: Tolima 2025: las tres cifras de resultado que no concilian se explican con SIIS (359 M es el de 2025; 914 M es el de 2024 puesto en la fila de 2025; 3.185 M es la suma de las notas sin los costos que faltan): queda `officialPAT` de SIIS. Falta el dictamen del revisor fiscal de 2024 (`dictamen-revisor-fiscal-2024.pdf` es idéntico al de 2025, `_notas-generales.md`): pedirlo a SIIS u anotarlo como hueco. Borrar o responder con la fuente la duda de `Admin/dudas-por-club.md`, sección Deportes Tolima. Que Tolima esté cargado lo comprueba la línea «Verificar» del final.
 3.2 La Equidad, Águilas Doradas y Atlético Bucaramanga. HECHO (2026-10-26): los 30 años (10 por club) están en el sitio con el mismo camino que Tolima (3.1), la cola contestada, el contexto manual de estadio y sponsor con fuente, y las líneas del auditor (28 nuevas). Reglas que salieron: la línea de ingresos sin abrir a `lump_football_operations`; «Gastos de ventas» y «Costo de ventas» por contenido y no por rótulo (Bucaramanga 2016 a 2018); los rótulos de SIIS se intercambian en algún año (Tolima y La Equidad 2024, corregidos y publicados con `Corrige:`). SPONSORS SIN DATO (registrados con sus intentos en `tools/contexto-manual.json`): Águilas Doradas todos los años, Bucaramanga 2016 y 2018, Tolima 2022; con fuente débil (una base de camisetas que da 403): Tolima 2016 a 2019 y La Equidad 2016 a 2022; verificar a mano en Football Kit Archive mejoraría varios a la vez. DICTÁMENES QUE FALTAN para el sourcing: Tolima 2024 (hay que renombrar o transcribir el que está archivado como 2025) y 2025; La Equidad 2016, 2018 y 2019; Águilas Doradas 2016 y 2018; Bucaramanga 2017, 2018 y 2021 (`sin_informe`: el documento de SIIS no trae informe). Los `estados-financieros-*` de estos clubes quedan en `documentos-descartados.txt` (solo notas; las usa `siis-notas.mjs`, 3.0 f).
 3.0 PRIMERO, ANTES DE MÁS CLUBES (decisión de Guido, 2026-10-26; sin bloquear el 3.3, Guido lo soltó): MEJORAR EL PROCESO DE CARGA DE AÑOS DE SIIS. HECHO (2026-10-26): la protección de orden (`tools/exigir-medida.mjs`: `cargar.mjs` y `siis-estado.mjs` no escriben con tools sin medir; el medidor `siis` corre los cuatro clubes). Orden de lo que sigue: (c), (e), (f), (b) al final; (d) y 3.0b quedan abajo. Lo que mostró cargar los cuatro primeros clubes (Tolima, La Equidad, Águilas Doradas, Bucaramanga) y hay que resolver una sola vez: (a) HECHO (2026-10-26): `tools/siis-notas.mjs` abre con las notas del club los rubros de SIIS que suman exacto (regla en `CONVENCIONES-DATOS.md`, caso 2, y la de las notas de gastos); 20 club-años rehechos y publicados (Tolima 2016 a 2025 con ingresos y gastos abiertos; La Equidad 2016, 2020, 2022 y 2025; Águilas Doradas 2021, 2022, 2024 y 2025; Bucaramanga 2017 y 2018). NO abren (quedan como SIIS los trae, con la diferencia anotada en el ensayo): Águilas 2016 a 2020 y 2023 (la nota difiere de SIIS en 0,5 a 3 miles de pesos), La Equidad 2017, 2019, 2021, 2023 y 2024, Bucaramanga 2016 y 2019 a 2025 (nota de otra forma o que no suma), Tolima 2024 gastos (rótulos intercambiados). HECHO a ojo (2026-10-26, preview): Tolima 2025 (venta de jugadores 4,1 M US$ = 14.934 M de pesos), La Equidad 2025, Águilas Doradas 2025, Bucaramanga 2025 y Medellín 2025; arreglado: «Sueldos / Ingresos» mostraba 0 % donde el gasto no se abre, y tres clubes sin color. QUEDA a Pantallas: (i) en un mismo año unas filas dicen «n/d*» y otras «—» aunque ninguna se abre (Bucaramanga: Comercial, Estadio y TV «—», pero Premios y Venta de jugadores «n/d*»); (ii) el Δ 2021→2025 da +38.046 % cuando el año base es casi cero (Águilas, Estadio); (iii) impuestos e intereses salen en filas distintas según el año: Leones FC 2021 a 2023 en «Tax income (expense)» (vienen en `extra_rows`) y 2024 y 2025 en «Net interest» y «Taxes» (vienen solo en `financial`), y La Equidad y Tolima tienen la misma mezcla; que el cuadro junte las dos formas en una sola fila o que la carga escriba siempre lo mismo; y `costoVentas` / «Otros gastos» de Tolima que ninguna nota abre. (b) HECHO (2026-10-26): `node tools/club-siis.mjs "<Club>"` (solo lee) da el estado por año y lo que falta con su comando y sus subagentes; `--crear-lista` y `--rehacer-anio AAAA`; `Admin/PIPELINE.md`, «Colombia: los estados de SIIS». Con él salió que Tolima, La Equidad y Águilas Doradas no tenían `clubId` en `tools/siis-clubes.json` y `siis-control` no los comparaba: ya lo tienen, y sus 30 años cierran con SIIS. (c) HECHO (2026-10-26): un documento con `filas-a-mano` (los de SIIS y los armados por sesión) no pide reintento ni pregunta de perfil por categorías en 0: se carga con un aviso (`cargar-ceros.mjs`; localizar y extraer lo devuelven protegido, así que el reintento no podía cambiarlo). (d) HECHO EN PARTE (2026-10-26): `cargar-categorias.mjs` abre una pregunta de categoría por club, etiqueta y propuesta; los otros años frenan igual y la respuesta les vale (probado con cola vacía: tres años de Tolima, un caso en vez de tres). QUEDA: la memoria de categorías sigue siendo por etiqueta y club y no ve la sección de la nota (hoy se distingue con el rubro entre paréntesis en la etiqueta, y eso crea preguntas nuevas la primera vez); y el script suelto que contestó ~60 preguntas por regla no está en el repo (candidato: una tool que aplique una regla escrita a las preguntas pendientes con su cita). (e) HECHO (2026-10-26): `siis-entre-anios` en `audit.js` (`tools/audit-chequeos-siis.js`) compara los rubros de cada año con el comparativo del siguiente: intercambios de rótulos en P3 y reexpresión material en P4. (f) HECHO (2026-10-26): los 34 `estados-financieros-*` de los cuatro clubes siguen en `documentos-descartados.txt` (son solo notas: cargados como documento propio duplicarían el año y costarían IA) con el motivo al día: el estado del año es el de SIIS y las notas abren sus rubros con `siis-notas.mjs` cuando suman exacto. Terminado el 3.0: el 3.3 va con el proceso nuevo.
 3.0b ABRIR LOS CLUB-AÑOS QUE LAS NOTAS NO ABREN (Guido, 2026-10-26: «dejalo en el to do»). Primero un ensayo gratis que clasifique cada año en «el club no trae nota de ese rubro», «hay tabla pero no suma» (con cuánto difiere) o «estructura rara» (anidada, con grupos, partida de otra forma); lo de estructura se arregla en `siis-notas.mjs` con medición antes y después. Casos: (1) Águilas 2016 a 2020 y 2023: la nota difiere de SIIS entre 0,5 y 3 miles de pesos (SIIS trunca a miles): abrir con el valor de la nota sería un criterio de datos (votación o Guido) y `verificar.mjs` tendría que aceptarlo (lógica compartida: medición completa); (2) La Equidad 2017, 2019, 2021, 2023, 2024 y Bucaramanga 2016 y 2019 a 2025: mirar por qué ninguna tabla suma; (3) Tolima 2024: rótulos de ventas y administración intercambiados, abrir colgando cada tabla del rubro que le toca por contenido (el comparativo de 2025 lo prueba); (4) «Costo de ventas» y «Otros gastos» de Tolima: ninguna nota los abre, quedan como SIIS.
 3.3 Los años que SIIS tiene y el sitio no (resultado del 2.3), cargados como «solo SIIS»: quedan unos 300 club-años de los otros 34 clubes colombianos (`node tools/siis-estado.mjs --faltantes`; `Admin/sourcing/Colombia/siis-inventario.md`) más Valledupar FC (NIT 824006447, 2016 a 2025; hay que darlo de alta y sumarlo a `tools/siis-clubes.json`) y Cóndores de Cundinamarca (900695572, 2021 y 2022, ingresos muy chicos). Los clubes ya cargados desde PDF (Alianza FC, América de Cali, Boyacá Chicó, Atlético Nacional, Deportivo Cali, Deportivo Pereira, Envigado, Fortaleza, Junior, Llaneros, Millonarios, Once Caldas, Santa Fe, Unión Magdalena) tienen años cargados del PDF que quedan; sus años que faltan se bajan igual. Santa Fe: la tool ya toma el perímetro propio y los 10 años cierran las compuertas. HECHO (2026-10-26): Independiente Medellín (El Equipo del Pueblo S.A., rojo #E91B29), los diez años 2016 a 2025 cargados con el camino de `club-siis.mjs` (un commit por año, `Costo de ventas` a `lump_football_operations_expense` por la excepción del 50 %, pesa 87 a 90 % de los gastos y el presupuesto 2020 del propio dictamen separa «costos de operación» de «costo de la mercancía vendida»), liga, estadio y sponsor (2017 a 2022 con fuente débil), diez dictámenes transcriptos (2024 solo trae el informe legal: hueco) y su línea del auditor. QUEDA de Medellín: la gestión de 2018 (Giraldo hasta el 19 de septiembre y Gil Gómez desde esa fecha, con fuente) está confirmada hasta ahí; faltan fuentes fechadas para la salida de Gil Gómez en 2019 (Antena 2 y Win Sports no traen fecha), quién condujo el cierre de 2019 y el de 2020 (Ossa interino «hasta el primer semestre de 2020», luego «enero de 2021»; ESPN dice «casi cuatro años» hasta el 6 de mayo de 2024, lo que lo pone a mediados de 2020) y el 2021 a 2023: `confirmada:false` en `data/gestiones/co.js` y la cola vuelve a preguntar; probar la Wayback de dim.co o los comunicados del club de 2019 y 2020. La tabla que pegó Guido (2026-10-26) está contrastada en `Admin/carga-clubes/independientemedellin-co.md`: confirma a Gil Gómez desde el 19-09-2018 y la salida de Ossa del 6-05-2024, contradice a Giraldo de 2014 a 2018 (fue Silva Meluk hasta enero de 2018) y trae nombres («Jamer Ospina», «Jhariel Ossa») y fechas (31-10-2019, 17-08-2020) que ninguna fuente pública confirmó, así que no entran a `data/gestiones/co.js`, caja y deuda del balance de SIIS (3.4 c). DESCARTADO: Real Sincelejo (2017, único año de SIIS: sociedad sin actividad, ingresos 0 y 1.778 M de «otros ingresos», sin liga en ninguna fuente; sus `siis-estado-2017.*` siguen en `Clubes/Colombia/Real Sincelejo/` (el hook no deja borrar ahí; Guido decidió no borrarlos y están en `.git/info/exclude`, local, para que no figuren como sin commitear). HECHO (2026-10-26): Leones FC (`leonesfc-co`, rojo #FF0000, Primera B salvo 2018) cargado de 2016 a 2025 con `--avanzar --ejecutar --cargar` (diez commits, publicado) como prueba de punta a punta: color y liga a mano, estadio y sponsor y gestiones con subagentes lanzados juntos, y las líneas del auditor. Huecos: dictamen de 2016 a 2019 (SIIS no lo tiene), el de 2020 es copia del de 2016 y el de 2024 solo trae el informe SIPLAFT; sponsor Colanta de 2017 a 2025 con fuente débil (una base de camisetas) y 2016 sin dato; la gestión es una sola (Murillo Giraldo desde 2009, de una fuente por año). `--evaluar` sobre los otros 20 clubes sin alta (a mano; ver el 18 del 465): 18 dan CARGAR, Corsarios REVISAR (ingresos de hasta 268 M) y Real Sincelejo DESCARTAR; Titanes (baloncesto) y Toros de Córdoba (béisbol) dan CARGAR pero son del punto 464. Siguiente club: los que tienen años por cargar y alta (`node tools/club-siis.mjs` sin nombre), uno por vez; Valledupar FC y Cóndores de Cundinamarca siguen sin alta.
 3.4 PENDIENTES QUE DEJÓ LA SESIÓN DEL 2026-10-26 (no son del 3.0 pero no se pierden): (a) SPONSORS: Águilas Doradas todos los años, Bucaramanga 2016 y 2018 y Tolima 2022 sin dato (registrado con sus intentos en `tools/contexto-manual.json`); fuente débil (una base de camisetas que da 403 a las herramientas): Tolima 2016 a 2019 y La Equidad 2016 a 2022; verificar a mano en Football Kit Archive mejoraría varios a la vez. (b) HECHO (2026-10-26): Tolima 2024 y 2025 resueltos (el archivo «2025» era el de 2024; el de 2025 se bajó de SIIS, `_notas-generales.md`). HUECOS REALES que SIIS no tiene (los de Grupo 2 depositan solo certificación y notas): La Equidad 2016, 2018 y 2019, Águilas Doradas 2016 y 2018, Bucaramanga 2017, 2018 y 2021; solo el club los puede dar (mail solo si Guido lo pide). (c) Usar el balance de SIIS (`siis_sitfinan`: efectivo y «otros pasivos financieros») en `caja-deuda.mjs` para los cuatro clubes (caja y deuda hoy sin cargar). (d) La prueba de escritura de `siis-estado.mjs` con una respuesta guardada de SIIS (va con el 401; hoy figura en `escriben_sin_prueba` de `tools/pipeline-tools.json`). (e) El diff pendiente de Guido: nada abierto; todo lo de texto de skills está en el grupo 4.
GRUPO 4 · Skills y pantalla (Guido ve cada texto en el diff, un commit por skill):
 4.1 Skill `club-sourcing` (`paises/Colombia.md` y `_notas-generales.md`): corregir que «NOTAS EF» es «el paquete COMPLETO» (es falso para estos cuatro clubes) y decir que `financieros.ingresosEmpresa`, `financieros.utilidades` y el estado de `siis_resultadointegral` son datos oficiales de cada año, útiles de control cruzado y de resultado oficial cuando el PDF es solo notas.
 4.2 Skill `club-or-year-onboarding` (y `contrato-de-datos-finance-of-sports` si el contrato cambia): el camino SIIS y el nivel nuevo de dato.
 4.3 Pantalla y contrato de datos: cómo se ve y cómo se publica un año «solo SIIS» con su marca «fuente: SIIS» (Pantallas y Contrato de datos; mockup antes de código).
GRUPO 5 · Las cositas chicas que quedaron del 461 (independientes, de a una):
 5.1 Verificar a 375 px y con teclado la nota de ingreso negativo (el asterisco mide ~21 px de ancho, bajo los 44 px; igual que el de «s/d»).
 5.2 `?audit=1` en la consola para Sporting 2005, Chelsea 2023, PAOK 2020, Benfica 2007 y Flamengo 2025.
 5.3 Mirar a ojo las imágenes `og/` y la tabla de los otros seis clubes de margen bruto.
 5.4 Revisar la nota en español de la vista de varios años.
 5.5 414: que la carga mande a la cola una línea de «ganancia en inmovilizado» que pese poco y no la deje en `other_income` (Guido cerró el punto sin esto: hoy lo ve el auditor desde el 5 %).
 5.6 `fos liga-segunda-fuente-local`: las 5 ligas ya guardadas conservan el ruido viejo (técnicos, «Stam-nummer») hasta volver a correr cada una con `--escribir`.
 5.7 HECHO (2026-10-26): `medir-pipeline.mjs` pide la prueba de escritura solo a la tool que lee `'--escribir'` como argumento (cadena exacta entre comillas); 21 tools que solo lo nombraban en un comentario o un mensaje dejaron de marcarse, con dos casos nuevos en `probar-medir-pipeline.mjs`.
 5.8 Las tres tools sin prueba de escritura (`cargar-lote`, `bfo-rusia`, `bfo-rusia-notas`) quedan en el punto 401, que va al final.
YA HECHO del 461 (historia en CHANGELOG, Versiones 1128 a 1132): lotes de prueba (era la ranura semanal, no un defecto), series de tipo de cambio al día (y el BRL conserva 2005), la segunda fuente local sin técnicos, la fecha `desde` por registro y el texto de rugby en la skill. DESCARTADO por Guido (2026-10-26): las imágenes del informe de UEFA (US$ 0,45); la Money League de Deloitte no se bajó.
Terminado cuando: existen la tool y el chequeo permanente, el criterio está en `Admin/CONVENCIONES-DATOS.md`, Tolima y los otros tres clubes están cargados (o dejaron escrito por qué no), los años solo-SIIS están cargados o descartados con motivo, los textos de skill están en sus commits, y los items del grupo 5 están hechos o descartados por Guido con su motivo escrito acá.

Verificar: existe tools/siis-estado.mjs
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2016
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2025
Verificar: audit siis-faltante = 0

Aplicación (decidido 2026-10-26, registro en Admin/registros/auditoria-proceso.jsonl):
(1) Perímetro propio del club por defecto (tools/siis-estado.mjs, rangoPerimetro); override perimetro en tools/siis-clubes.json
(2) Santa Fe 2019 y 2025 ya no están frenados: bajarlos en el grupo 3

### 2. 465 · (Onboarding, con Pipeline y Auditora): mejoras de proceso que salieron del 463, para no repetir trabajo (sin quitar ningún hook que proteja la información del sitio)

Salió de cargar los cuatro primeros clubes de SIIS y mejorar su proceso (sesión del 2026-10-26). Se trabaja DESPUÉS de cerrar el 463, de a una, con el orden de `Admin/PLANTILLA-SESION.md` (ensayo gratis sobre todos los datos reales, medir una vez, recién después escribir).
LO QUE SE LEYÓ EN VANO Y ERA EVITABLE CON UN MEJOR PROCESO: (1) `tools/cola.mjs` y casi todo `tools/verificar.mjs` para saber cómo se contesta la cola y cómo se cierra una nota; un `fos mapa` por función habría bastado, y `fos mapa` debería ser lo primero que sugiere el hook al abrir una tool grande. (2) Cuatro corridas del mismo ensayo de las notas de Tolima hasta ver el patrón; el primer ensayo tendría que haber sido sobre los cuatro clubes completos, y `siis-notas` ya imprime el motivo de cada año que no abre. (3) Dos falsos positivos (5.7 y el P1 de `que-pide`) que el medidor y la auditoría podían haber dicho en una línea con el archivo y la causa.
ESTADO (2026-10-26). Guido: las tools de SIIS NO se hacen paralelas a las generales (la lógica compartida se queda compartida y se mide completa, para no mantener dos copias); lo de SIIS vive en `club-siis.mjs` y `siis-*.mjs`. Tiempos reales de cada medidor: `node tools/fos.mjs duraciones` (una tool compartida mide en unos 14 minutos; `audit.js` ya tarda 11 s).
HECHO (historia en CHANGELOG, Versiones 1149 a 1161): 11 (la pregunta de gestión no se repite en un documento que ya la tiene contestada `aceptar`), 23 (`fos perfil-audit`, el tiempo de cada chequeo de `audit.js`), 19 (`publicar.mjs` avisa que el commit va en otra llamada), 20 (tiempo estimado y aviso de segundo plano en `club-siis --avanzar`; tiempo estimado en `medir-pipeline --ensayo`), 6 (briefs: `Admin/briefs-subagentes-siis.md`, `club-siis --brief`), 7 (inventario en el camino de `club-siis`), 8 (peso de «Costo de ventas»: `--evaluar` y `--avanzar`), 10 (uso de `cola.mjs --responder`), 12 a 14 (`--avanzar`, `--evaluar`, subagentes juntos; probado con Leones FC de punta a punta y con Deportivo Pereira 2024, un año), 15 (`fos duraciones`), 17 (firma en escalones de `dictamenes-md.mjs`), 18 (lista de clubes con veredicto), 21 (reexpresión de comparativo de SIIS que se contesta sola si el resultado neto es idéntico; probada solo con casos falsos), 22 (`audit.js` de 22 a 11 s) y de 9 el `dictamenes-md`. DESCARTADO: 2 (una tool que aplique una regla escrita a la cola): medido sobre los 203 casos de SIIS de `cola-revision.jsonl`, 38 se contestaron por `regla-escrita` y las dos reglas que explican casi todos ya no necesitan una tool: «Costo de ventas» mayor a la mitad y «Gastos de ventas» sin abrir los hace `club-siis --avanzar` (`cola.mjs --corregir-categoria`), y la regla de las notas de gastos (19 `corregir` de la sesión de Tolima) quedó escrita como `CATEGORÍA (prompt, futbol)` en `CONVENCIONES-DATOS.md`, que lee el categorizador antes de preguntar; hoy no hay una sola pregunta de categoría abierta de SIIS. Se reabre si un club nuevo de SIIS vuelve a traer preguntas de categoría que una regla contesta, 1 (distinguir la memoria de categorías por sección de la nota): la clave de la cola ya lleva el renglón que la fila desglosa (`padreDe(r.origen)` en `cargar-categorias.mjs`; `padre` en `categorias-aprendidas.jsonl`) y el rubro entre paréntesis separa las filas repetidas; sumar la sección cambia la clave de los ~3.400 casos de categoría ya contestados para ahorrar una pregunta la primera vez, y se reabre si algún día pasa de a muchos (medir antes cuántas preguntas nuevas por club-año salen del paréntesis), 23 en lo de acelerar `checkNombresSinDefinir` (2,4 s, eslint), `checkComaComida` (1,6 s) y `checkParrafosRepetidos` (1,2 s): son 5 de los 11 s de `audit.js` y cada cambio arriesga un chequeo que protege los datos; el perfil queda para cuando haga falta, 16 (tools de SIIS paralelas) y contestar la cola de categoría por precedente de otros clubes (`HALLAZGOS-pipeline.md`).
PENDIENTE (en este orden de provecho; uno por vez, con el orden de `PLANTILLA-SESION.md`):
- (9) QUEDA el listado de `documentos-adicionales` de SIIS por club-año (huellas duplicadas, escaneos) que hoy se rehace en el scratchpad: es una tool nueva con red (índice por NIT para el radicado, endpoint `documentos-adicionales`, `Admin/sourcing/Colombia/_notas-generales.md` pasos 1 y 2) y para las huellas hay que bajar los PDF; falta definir qué lista (¿solo nombre y radicado, o también la huella?) antes de escribirla. HECHO el aviso de `auditoria.mjs --extractos`.
- (3) Un medidor de la cola sobre una cola de prueba: el medidor `cargar` compara propuestas y no ve cuántas preguntas abre.
- (4) y (5) Unificar la tolerancia con que `siis-notas.mjs` y `verificar.mjs` cierran una nota en pesos contra un rubro de SIIS en miles (Águilas 2023 queda sin abrir por 0,5 mil pesos) y el ensayo que clasifica cada club-año que las notas no abren en «no hay nota», «hay tabla pero no suma» o «estructura rara»: son el 3.0b del 463; el criterio de cargar con el valor de la nota es de Guido o de una votación, y `verificar.mjs` es lógica compartida (medición completa).
- LEÍDO EN VANO que quedan: `git status --short` completo después del alta (~600 páginas regeneradas por `ASSET_V`: un resumen sin las generadas); `read_console_messages` sin filtro (ruido de analytics en local); `fos mapa` por función como primer consejo del hook al abrir una tool grande; un aviso de una línea con archivo y causa para los falsos positivos de `que-pide` y del medidor.
Terminado cuando: cada pendiente de la lista está hecho (con su medición y su entrada de CHANGELOG) o descartado con su motivo escrito acá.
Verificar: manual

### 3. 466 · (Onboarding, con Pantallas): un mapa visual, tipo workflow, del proceso de onboarding (sin sourcing): comandos, tools, hooks y qué hace cada paso

Pedido de Guido (2026-10-26): un mapa VISUAL, con forma de workflow, de todo el proceso de onboarding de un club, SIN el sourcing (buscar documentos): desde que el PDF o el estado de SIIS está en la carpeta hasta el año publicado y con su línea del auditor. Que se vea de un vistazo qué corre cada paso (comando de `node tools/fos.mjs` o de `club-siis`), qué tool lo hace y de qué archivo lee y a cuál escribe (`Admin/CONTRATO-ETAPAS.md`), qué hook o compuerta lo cuida (`tools/hooks/pre-tool.mjs`, `exigir-medida`, `audit.js`, `verificar`), dónde interviene un subagente o Guido, qué cuesta (API o gratis) y qué commit deja. Dos caminos en el mismo mapa: el PDF (etapas de `Admin/PIPELINE.md`) y el de SIIS (`club-siis.mjs`). Se hace con el widget de diagramas o con un Artifact (la skill `producto-y-pantalla-finance-of-sports` no aplica: no es del sitio); una vez hecho, `club-siis` y `fos` lo citan y el arranque de una sesión de onboarding lo abre en vez de leer `PIPELINE.md` entero. Salió de que una sesión tardó una hora en cargar un solo club por no tener este mapa a la vista.
Terminado cuando: existe el mapa (un Artifact o un `.html` en `Admin/`), muestra los dos caminos con comando, tool, hook, costo y quién decide en cada paso, y está citado desde `Admin/PIPELINE.md` y el arranque de la skill `club-or-year-onboarding` (el texto de la skill, con su diff para Guido).

Verificar: manual

### 4. 401 · (Pipeline): una prueba que escribe de verdad en cada tool que escribe, porque un ensayo no pasa por los imports que se rompen

La partición de `cargar.mjs` (375) dejó sin re-exportar `snapshot`, `revertir` y `runNode`: `publicar`, `caja-deuda --escribir`, `costo-personal`, `dentro-de-otro`, `worktree` y `gestiones-tanda` fallaron un día entero sin que `medir pipeline` lo viera, porque sus medidores corren en ensayo y el import dinámico solo se evalúa al escribir. Hoy hay un chequeo estático (`fos imports`, P1 `import-sin-export`) que atrapa ESA clase, pero no otras (una ruta rota, un argumento que cambió, un archivo que la tool partida ya no escribe). `node tools/prueba-escribir.mjs` ya escribe de verdad un año con fuente nueva en un worktree descartable (solo `cargar.mjs`).
Propuesta: extenderla a cada tool que escribe datos o registros (`caja-deuda --escribir`, `costo-personal`/`fos personal --escribir`, `recategorizar-etiquetas --escribir`, `ajustes --agregar`, `publicar`, `generar-correcciones`, `alta-club --escribir`, `fetch-fx-reference` sobre una copia): una lista en `tools/pipeline-tools.json` de qué tools escriben y con qué comando se prueban, cada una sobre una copia del repo en un worktree, comparando archivo por archivo con lo esperado. Que el medidor las corra cuando cambia una de ellas (o un módulo que importa) y que `medir pipeline` se niegue a dar «idéntico» si una tool que escribe no tiene su prueba.
HECHO (2026-10-23): `tools/prueba-escribir.mjs` escribe de verdad, en el mismo worktree descartable, `caja-deuda --personal --escribir` y `--partir --escribir`, `recategorizar-etiquetas --escribir`, `generar-correcciones`, `ajustes --agregar` y `publicar` (sobre los datos de HEAD, idempotentes; exige salir con 0 y ningún error de código en la salida). Quitando el re-export de `cargar.mjs` la prueba falla (y antes el chequeo estático). Medidor nuevo `escribir` en `tools/pipeline-tools.json`, asignado a `cargar.mjs`, `caja-deuda.mjs`, `publicar.mjs` y `recategorizar-etiquetas.mjs` (medido de punta a punta: idéntico; suma unos 4 minutos a una medición). HECHO TAMBIÉN (2026-10-26, a pedido de Guido): la prueba suma `dentro-de-otro`, `gestiones-tanda --armar`, `alta-club --escribir` (con un club sacado de los datos de la copia, que la tool da de alta de nuevo), `recategorizar-linea`, `segunda-fuente-wikipedia-local`, `segunda-fuente-liga`, `estadio-sponsor`, `fetch-fx-reference`, `reglas-categoria`, `imports-sin-export`, `fuente-url-xhtml` y `xhtml-aarsrapport` (las que salen a internet no fallan sin red: lo dicen). `medir-pipeline.mjs` no da «idéntico» a una tool del pipeline que tiene `--escribir` y no está en la prueba ni en `escriben_sin_prueba` de `pipeline-tools.json` (la deuda anotada: `cargar-lote`, `bfo-rusia` y `bfo-rusia-notas`). La prueba encontró dos fallas reales: `fetch-fx-reference` pisaba la serie entera con solo el tramo de `--from`, y el BCRA rechazaba la fecha UTC de noche; las dos corregidas. QUEDA: un escenario para esas tres tools (con una respuesta guardada, sin red), y que la prueba compare lo escrito con lo esperado (hoy las idempotentes comprueban que no cambian ningún JSON de club; las demás, solo que no se rompan). `tools/con-worktree.mjs` (`conWorktree(fn)`) arma el worktree: una prueba nueva es solo el escenario.
Terminado cuando: cada tool que escribe tiene su prueba de escritura en un worktree, `medir pipeline` la corre al cambiarla, y la rotura de la 375 (quitar el re-export) la atrapa una prueba y no solo el chequeo estático.

Verificar: manual

### 5. 459 · (Deploy, con Guido, prioridad alta): Supabase se pausó otra vez: el Worker fos-supabase-ping no lo mantuvo despierto

Dicho por Guido (2026-10-25): «Supabase me pausó de vuelta, el worker no anduvo». MI CUENTA usa Supabase en plan gratis, que se pausa tras 7 días sin uso; lo debería mantener despierto el Worker `fos-supabase-ping` (cron cada 3 días que llama a `ping()`; `Admin/ESTADO.md`, «MI CUENTA»). Esta vez se pausó igual, así que el Worker no corrió o falló. Qué mirar: las corridas del Worker en Cloudflare (sin corridas o con errores), que el cron siga activo y apunte al proyecto de Supabase correcto, que la función `ping()` exista y responda (`node tools/supabase/stats.mjs` llama a `stats()`), y reactivar el proyecto en el panel de Supabase. Si el plan gratis no alcanza, la alternativa es otro mecanismo (un ping desde otro cron) o un plan pago. Mientras esté pausado, la pestaña MI CUENTA dice «no disponible».
Terminado cuando: Supabase está activo, el Worker corre su cron y deja una corrida sin errores, y hay una prueba de que dos corridas seguidas mantienen el proyecto sin pausarse.

Verificar: manual

### 6. 362 · (Pipeline, con la Auditora): el freno de documentos de grupo

FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
skill de auditoría (la Auditora). Lo hace Pipeline.

Verificar: manual

### 7. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

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

### 8. 445 · (Auditora, con Guido): SønderjyskE 2022-2024 en formato completo: qué hace falta (Guido lo prefiere)

Guido (2026-10-24) prefiere ver a SønderjyskE en formato completo. Hoy: 2025 cargado completo (ventas 66,29 M y otros ingresos 0,12 M; votación 3 a 0 en `Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`); 2022, 2023 y 2024 cargados como «Bruttofortjeneste» (el margen bruto, balance resumido por la § 32), que es como el club publicó esos años. Para mostrarlos completos hace falta el estado completo de cada año: 2024: el informe 2025 trae la columna 2023/24 completa pero REEXPRESADA (pasó 2,13 M de personal a margen bruto: 35,30 M contra 37,43 M originales). Esa es la opción C que la votación descartó por la regla «un comparativo reexpresado no es la transcripción del año» (`CONVENCIONES-DATOS.md`, Salernitana 2022); hacerlo exige que Guido decida una excepción o una regla nueva («el comparativo completo de un informe posterior reemplaza al año resumido, con una publicNote de reexpresión»), cambia 1 año ya publicado y se recarga con `cargar.mjs --reemplazar`. 2022 y 2023: los informes publicados no traen el desglose; habría que pedírselo al club (mail, skill `club-outreach`) o encontrar una versión interna; mientras tanto quedan resumidos con su nota. Sobre qué mide «completo»: ingresos y gastos brutos (el resultado no cambia), útil para el tamaño real y la relación sueldos/ingresos; no es «poder adquisitivo». POR QUÉ LA VOTACIÓN RECHAZÓ USAR EL 2024 DEL INFORME 2025 (pregunta de Guido): (1) el informe 2024 publicó 37,43 M de margen bruto y el comparativo del 2025 dice 35,30 M para el mismo año, porque el club reclasificó 2,13 M entre personal y margen bruto; cargar el comparativo mostraría para 2024 una cifra que el club no publicó ese año, y quien abra el informe 2024 encontraría otra; (2) la regla vigente (`CONVENCIONES-DATOS.md`, «UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO», decisión de Guido para Salernitana 2022, y `club-data-mapping/SKILL.md`: usar siempre la columna del propio ejercicio) lo permite solo si el PDF del año es ilegible, y el del 2024 es legible; (3) 2024 quedaría completo entre 2022 y 2023 resumidos (la serie seguiría mezclada). A favor de hacerlo: es la última versión que da el propio club, y el desglose de 2024 sale gratis. Es una regla, no una ley: Guido puede decidir la excepción.
DECISIÓN DE GUIDO (2026-10-24): NO se usa el 2024 del informe 2025; 2024 queda como el club lo publicó (resumido), de acuerdo con la votación. Queda abierto solo si se le pide el desglose completo de 2022, 2023 y 2024 al club (mail, `club-outreach`; un pedido por club, no urgente).
Terminado cuando: Guido decide si se le pide el desglose completo de 2022 a 2024 al club, y lo decidido queda hecho (el mail, o el punto se cierra con «no se pide»).

Verificar: manual

### 9. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
CORRIDO a medias (2026-10-23, sesión sola): `audit.js` P0 0 · P1 0 · P2 16 · P3 132; `?audit=1` `auditAll()`: 331 clubes, 3.823 chequeos OK, 0 que no cierran, 0 avisos de tipo de cambio; `generar-data --check`, `estimar --check`, `generate-club-pages --check`, `generate-club-index --check`, `generate-rankings --check` y `generate-fuentes-page --check`: todos al día. Falta la skill `auditoria-finance-of-sports` (un eje) y decidir qué hacer con los P2 y P3 (el 370), que es lo que pide el punto.

Verificar: manual

### 10. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 11. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

EL REGISTRO DE CORRECCIONES, CURADO (Pantallas 7, sale del 247). `correcciones.html` y el bloque de Finanzas muestran hoy 236 eventos en 56
clubes, y todos dicen «Motivo no registrado». Terminado cuando: (a) los eventos de más impacto (valor, retiros, recargas) tienen su motivo en
español en `Admin/registros/correcciones.jsonl` (`{"commit","club","anio","motivo_es","motivo_en","fuente"}`; con subagentes que lean el
cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`; el motivo es público: se escribe para un hincha o un periodista); (b) decidido si
el motivo se traduce al inglés al curar (sin `motivo_en` la página en inglés muestra el español); (c) `tools/exportar-paquete.mjs` suma el
registro al Data Package (pasa por la skill `contrato-de-datos`); (d) revisado que los tipos «total» y «otro» de los eventos no tengan ruido
de renombres. Lo hace Pantallas.

Peso (medido 2026-10-24): `data/correcciones/correcciones.json`, que carga la página, pesa 415 KB y 24 KB comprimido (Netlify lo sirve comprimido) con 718 eventos; los de cada país, hasta 76 KB y 5 KB comprimidos (lo que lee el bloque de Finanzas). No hace falta partirlo hoy. Se parte (por año del evento, con páginas 1, 2, 3… en la vista) cuando el archivo comprimido pase de 150 KB, unas 6 veces el de hoy. Hoy ningún aviso de `audit.js` mira el tamaño de ese archivo (`archivo-pesado` cubre solo algunos `.md` e `index.html`): sumarlo al hacer este punto.

Además, `correcciones.html` da tres avisos de `audit.js` que son de esta pantalla: `doc-interno-no-excluido` (es una página pública: se silencia con el motivo o se mueve), `raya-larga-visible` (línea 76) e `i18n-incompleto` (`corr.th.antes` y `corr.th.despues` sin traducción en `data/lang/en.js`).

Verificar: audit doc-interno-no-excluido = 0
Verificar: audit raya-larga-visible = 0
Verificar: audit i18n-incompleto = 0
Verificar: manual

### 12. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

2026-10-24 (Orden): no es un punto chico. Verificadas contra el código y sacadas del texto por estar hechas: aa (`worktree.mjs` ya lleva `data/sponsors.js` y `sponsors-indice.js` en OTROS_GENERADOS), i (`alta-club-tablas.mjs` resuelve un país fuera de PAISES con la tabla de referencia ISO) y o (`lote-preparar.mjs`: «la versión corregida reemplaza al original»). Quedan unas 12 letras sin verificar (g2, k, l a q, s, z, t2, u2, v…), cada una un escalón del pipeline con medición completa y varias con diseño de Guido (z: cómo se muestra un año de más de 12 meses; t2: si se corrigen los 3 años belgas con errores chicos; Escocia/Gales/Irlanda del Norte en el selector). Falta, primero, recorrer las letras contra el código y borrar del texto las que ya estén hechas (ej.: la `aa` de `worktree.mjs mergear` puede haber desaparecido con el modo de una sola sesión); lo que quede, de a una, con Pipeline.
MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
Terminado cuando: cada letra pendiente se hizo, se descartó con su motivo en `Admin/HALLAZGOS-pipeline.md` o se confirmó ya resuelta en
el código. El texto de abajo quedó cortado en un cierre y se recuperó del historial (`git show 7ef1eb6874:Admin/TODO.md`): antes de
trabajar una letra, verificarla contra el código, porque varias pueden estar hechas.
vez; el detalle con casos, en `Admin/Archive/sesion-onboarding-2026-10-18-2.md`). a) CIERRE FALSO en verificar.mjs: compara en valor
absoluto y da "cierra" con una fila del lado o signo equivocado (Lierse Kempenzonen 2022 habría cargado un gasto como ingreso): lo más
grave. b) Esquema NBB belga en verificar.mjs y cargar.mjs: costos financieros 65/66B positivos, renglones "(+)/(-)" por valor absoluto,
el 76A sumado aparte, y verificar y la propuesta que no leen igual el signo; una regla por código NBB.
Aviso para la próxima corrida grande: 368 documentos viejos sin tablas (221 en "revisar", 102 en "pendiente-segunda-voz", 38 en
"sin-tablas") se rehacen con Mistral (~US$ 83 más la validación) apenas pasen por resolver-inventario; el ensayo ya lo cotiza.
RWDM 2019: el registro
tiene el cierre 2019-11-30 y el balance va del 30/11/2018 al 30/06/2019 (como la f). Escocia, Gales e Irlanda del Norte se ven como GB
("Inglaterra") en el selector: decisión de pantalla pendiente. g2) partir en la cola cualquier fila según su nota (otros países, el 66A de Lommel SK
2025): solo si aparece otra fila mixta sin códigos; el 630 belga ya sale solo. l) a p) más casos de onboarding (reportType por año de un club existente, perímetro de la carga, año vecino con
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

### 13. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

HOY (2026-10-23): el aviso `ejercicio-sin-rastro` de este club está silenciado en `tools/audit-ignore.json` (2023-2025 sin depósito; 2022 con el balance en mano) para llevar el P3 a cero; lo que falta es la decisión de 2022, así que la línea de verificación pasó a manual.
Verificar: manual

### 14. 452 · (Pantallas, con Contenido): mostrarle al lector las particularidades contables clave de lo que está leyendo (balance resumido, cierre, perímetro), sin curso de contabilidad

Pedido de Guido (2026-10-24): mostrar en algún lugar del sitio un puñado de particularidades contables, no un curso para periodistas, para que un lector entienda qué está leyendo, más allá de lo que se resuelva con el 447. Son cosas que solo se ven al tener ejercicios de muchos países. Candidatas (a elegir y a escribir cortas, con el caso real como ejemplo): (1) balance resumido contra completo: algunos clubes publican solo un margen (el «Bruttofortjeneste» danés de la exención del artículo 32 de la ley contable, el esquema abreviado belga, el «lucro bruto»), y el sitio lo muestra como «ingresos» aunque ya vienen netos de costos; el salto cuando pasan al formato completo es de formato, no de actividad (SønderjyskE: 37,4 M en 2024 contra 55,9 M de ventas reales, que el informe 2025 trae en la columna comparativa; 71 de los 1340 ejercicios cargados, un 5 %, tienen los ingresos en una sola línea sin abrir; en unos es un margen y en otros la facturación entera, y hay que separarlos antes de escribir la nota); (2) el ejercicio no es el año calendario: cierra el 30-06 en España, Países Bajos o Francia, el 31-12 en Brasil, Rusia o Noruega, y el año del sitio es el del cierre; (3) individual contra consolidado: el mismo club tiene dos balances con perímetros distintos y no se suman ni se comparan; (4) sociedades sin socios: «cuotas sociales» en cero es un cero real, no un dato perdido; (5) cifras en moneda local convertidas al tipo de cambio de cierre: un club puede «crecer» en dólares por la moneda. Dónde: `metodologia.html` (donde ya explica cómo se leen los datos) y una nota corta en el lugar donde el lector tropieza (el gráfico de ingresos cuando hay un cambio de formato, ver el 447). El aviso `metodologia-desactualizada` de `audit.js` recuerda revisarlo cada 40 commits de reglas. Lo escribe Contenido con el criterio de `contenido-y-difusion`.
HECHO parcial (2026-10-25): «Notas sobre este club» (debajo del Estado de resultados) ya explica el caso de los ingresos en una línea; se arma por ejercicio con plantillas es/en. QUEDA lo de `metodologia.html` y las demás particularidades (cierre, perímetro). Guido tiene ideas y NO se cierra hasta que lo autorice explícitamente.
Terminado cuando: `metodologia.html` y sus textos en español e inglés tienen una sección corta con esas particularidades, cada una con un ejemplo real del sitio y un enlace a la fuente.

Verificar: manual

### 15. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso es `node tools/fos.mjs etiquetas` (369, hecho). Este punto es lo que queda después de que corrió. La lista corta de 24 etiquetas ya está decidida por Guido (2026-10-23). Falta la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 16. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

## E. Después de A a D (Guido, 2026-10-20)

### 17. 464 · (Onboarding, con Pantallas y Contrato de datos): abrir con SIIS los deportes que no son fútbol (baloncesto y béisbol de Colombia)

Pedido de Guido (2026-10-26): SIIS tiene el estado de resultados de clubes de otros deportes y hay que abrirlos. No se cargan hasta que Guido active cada deporte (`Admin/PIPELINE.md`, «Un deporte nuevo»; activar un deporte es suyo). Lo que SIIS tiene hoy (`Admin/sourcing/Colombia/siis-inventario.md`, generado): baloncesto, Gigantes de Barranquilla (NIT 901330760, 2021 a 2025), Titanes de Barranquilla (901213941, 2021 a 2025; ya hay carpeta en `Clubes/Colombia/`), Frastbreak Basketball Club (901123128, 2018, 2019 y 2021 a 2025), Bogotá Piratas (900720607, 2016, 2017, 2019 y 2021 a 2025) y un club de baloncesto de razón social «Fomentar, patrocinar y practicar el baloncesto…» (900721306, 2024); béisbol, Toros de Córdoba (900477535, 2017 a 2019 y 2021 a 2023; carpeta existente) y Caimanes de Barranquilla (900650770; carpeta existente). Los dos de béisbol y Titanes ya figuran en `tools/siis-clubes.json`; los demás hay que sumarlos con su carpeta.
Pasos: (1) Guido decide qué deportes se activan (baloncesto, béisbol) y con qué taxonomía. (2) Se suman los NIT que faltan a `tools/siis-clubes.json` y se dan de alta los clubes (`alta-club.mjs`, que pregunta el deporte). (3) `node tools/siis-estado.mjs --club "<Club>" --todos --escribir` y el pipeline de siempre. (4) Pantallas y Contrato de datos si el deporte cambia algo visible o público.
Terminado cuando: Guido decidió qué deportes se activan con SIIS y los clubes de esos deportes con estado en SIIS están cargados, o quedó escrito por qué no.

Verificar: manual

### 18. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual

### 19. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas (viene del 356)

Viene del 356 (el conversor ya está: celdas por coordenadas como tablas, medido sobre 317 XHTML). Qué hay hecho: los 55 `.md` de Hibernian, Bolton, Bristol Rovers, Cambridge, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere, Blackpool y Reading están reconvertidos con tablas (costo 0), y Bolton 2024-25 corrió de punta a punta (`lote.mjs --rehacer --ejecutar --pagar-ia-xhtml`: US$ 0,15, verificó, 2 dudas ordinarias en la cola). Presupuesto del 356: US$ 35 de Guido, gastados ~2 (`node tools/gasto.mjs`), con ensayo gratis antes de cada corrida.
- Los lotes: `Admin/lotes/lote-143.txt` (13 documentos de Inglaterra, el año más reciente de cada club; ensayo ~US$ 0,4 por documento con IA) y Hibernian en un lote de Escocia (un país por lote). Los `Generados/` de esos clubes eran de cuando el `.md` no tenía tablas (`sin_estado: true`); desde el 419 el lote lo ve solo («el .md cambió desde localizar … se rehace») y el ensayo cotiza US$ 4,85 para los 13 (Bolton ya está hecho). Los 2 documentos de OH Leuven 2017 y 2022 (Bélgica) también quedan «viejos» por su `.md` cambiado. Después las altas como en los lotes 140 y 141: cola contestada por subagentes Sonnet, ficha de alta, estadio y sponsor, perímetros (group accounts: perímetro consolidado con la regla 1 de CONVENCIONES-DATOS), gestiones.
- Los otros años de esos clubes (17 años esperaban el conversor) y los años pagables de las altas hechas (~US$ 8): Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan 2022-23, con las respuestas del lote anterior como precedente.
- Falkirk 2025: listo salvo la liga. Scottish Championship no existe en `data/leagues.js`: crearla (`club-sourcing` 0.4) y cargar con su publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; CONVENCIONES-DATOS).
- De las 10 altas del 356: las líneas del auditor (`node tools/auditoria.mjs --pendientes`), los escudos sin mirar (`escudoOk` null) y las gestiones (presidentes, en la cola; no frenan).
- Criterio a escribir en CONVENCIONES-DATOS (votación o precedente): la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se contestó «no»).
- La nota de sourcing de Fleetwood dice «Ejercicios útiles: Jaymel 2015/16-2023/24», y es falso (fútbol 42 % en 2021-22); lo único útil es Fleetwood Wanderers 2020-21. Fleetwood/Jaymel 2022-25 está descartado.
- Daneses que esperan (se cruza con el 413): los XHTML de SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 (−130,578 M) y el PSE de København 2021-25, y los 9 de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg).
- Ya cargados en el 356 (Onboarding 9, lotes 140 y 141): AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025 y Wigan Athletic 2024.
HECHO (2026-10-24, con el ok de Guido para pagar el 420): lote 143 corrido de punta a punta (13 documentos; ensayo estimaba US$ 4,85 y costó US$ 1,33 la primera vez y US$ 1,59 el reintento único de desgloses de personal; gasto total del día en API: US$ 3,58 con el 413). Contestadas con cita por tres revisores Sonnet y revisadas contra el documento: 21 de sumas/notas, 10 de perfil (Oxford y Plymouth tienen membresía paga), 15 de categorías (incl. «Football» de Blackpool a lump_football_operations y «New stadium development costs» de Oxford a other_expenses). Los 13 documentos están verificados; falta contestar 43 preguntas nuevas que dejó el reintento (cola, `node tools/cola.mjs`) y después `lote.mjs --lista Admin/lotes/lote-143.txt --ejecutar --cargar --pagar-ia-xhtml "<motivo>"`, que hace las 13 altas (hoy el único freno restante es `[club] el club no existe`). Las 13 gestiones (presidentes) están en la cola y no frenan. QUEDA además: Hibernian en su lote de Escocia, los años pagables (~US$ 8), Falkirk (Scottish Championship), las altas (color, escudo, estadio y sponsor, perímetro, gestiones), el criterio del Trust y la nota de Fleetwood.
Terminado cuando: cada club británico con iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo, y Scottish Championship existe en data/leagues.js.

Verificar: contiene data/leagues.js | Scottish Championship
Verificar: contiene Admin/CONVENCIONES-DATOS.md | Trust
Verificar: manual

### 20. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 21. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

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

### 22. 335 · mails a clubes

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

### 23. 460 · (Contenido, con Pantallas, prioridad baja): una página de blog: sumar nuestros datos a lo que dicen los informes de UEFA, Deloitte y similares

Pedido de Guido (2026-10-26): hacer eventualmente una página de blog (la ruta se decide con Pantallas) que tome lo que dicen informes como el de UEFA (*The European Club Finance and Investment Landscape*) o la Money League de Deloitte y le agregue lo que dicen NUESTROS datos. No se toman cifras de esos informes para cargarlas en el sitio ni para compararlas con nuestros clubes como control de calidad; es contenido de blog. Ya está guardado el informe de UEFA 2025: `Admin/informes-externos/uefa/ecfil-2025.md` (transcripción de Mistral, 112 páginas) y su `README.md` dice qué trae (no trae ingresos por club; trae KPI por liga y país). Falta: elegir qué liga o tema abre el primer artículo, qué de nuestros datos lo completa (cobertura de la liga en el sitio, ingresos por rubro de los clubes cargados), diseño de la página (Pantallas, mockup antes; la skill `contenido-y-difusion-finance-of-sports` es el criterio de lo que se publica con un dato), la fila del informe en `Admin/fuentes-externas.md` y sus términos de uso, y la Money League de Deloitte (aún sin bajar). Va antes del punto de la API.
Terminado cuando: existe la página de blog con al menos un artículo que cita el informe externo con su fuente y suma datos del sitio, con el mockup aprobado por Guido y la fila del informe en `Admin/fuentes-externas.md`.

Verificar: manual

### 24. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual
