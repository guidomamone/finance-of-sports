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

### 1. 414 · (Pipeline, con la Auditora, prioridad media): «Ganhos em imobilizações» y afines: ¿son ventas de jugadores? (Benfica 2007, Sporting 2000-2005, PAOK 2025, Académica 2023)

Salió de la auditoría (`catchall-dominante`): una sola línea de «Otros ingresos» pesa del 29 % al 65 % de los ingresos del ejercicio. Hay indicio de que son plusvalías por traspasos: en Sporting 2002 el documento imprime «Mais-valias em Transferências» 13.413 y «Ganhos em Imobiliz.» 13.413 (misma cifra, `Clubes/Portugal/Sporting CP/relatorio-contas-2001.md` L152 y L761). Casos visibles hoy: Benfica 2007 «Ganhos em imobilizações» 24,1 M (29 %), Sporting 2000 «Proveitos e Ganhos Extraordinários», 2002 «Ganhos em Imobiliz.» y 2005 «G. Imobilizações» 65,0 M (65 %), PAOK 2025 «Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων» 31,8 M (43 %) y Académica 2023 «Ganhos em perdão de dívida» (esta es una quita de deuda, no un traspaso). Los hay más, por debajo del umbral del aviso (40 %). Es una decisión de criterio de datos: si la nota del documento dice que son traspasos de jugadores, van a `player_sales` (cambia lo ya publicado: skill `contrato-de-datos`, trailer `Corrige:`).
Terminado cuando: cada etiqueta de «ganancias de inmovilizado» de los clubes cargados está mirada contra su nota (¿jugadores o activos fijos?) y votada si no tiene precedente (`votacion-de-criterios`), y la que sea traspaso está recategorizada con su cita.

Verificar: manual

### 2. 415 · (Pantallas, con Pipeline, prioridad media): ingresos negativos: las deducciones sobre la receita (impuestos, direito de arena) caen en «Otros ingresos» y lo dejan negativo (284 líneas, 64 clubes)

Pregunta de Guido (2026-10-23) sobre Flamengo: «Otros ingresos» da negativo. Causa: el DRE brasileño resta de la receita bruta los impuestos y el «direito de arena» para llegar a la receita líquida; la carga pone esa resta como una línea negativa en `other_income` («Impostos e contribuições + Direito de arena (deduções sobre a receita)», −68,2 M en 2024 y −60,5 M en 2025) para que el total dé la receita líquida del documento. Con «Outros» de 47,5 M queda −20,7 M. No es un error de cifra (cierra con el total oficial) sino de presentación. Son 284 líneas de ingreso negativas en 64 clubes (195 en `other_income`, casi todas deducciones de clubes brasileños). Opciones: (a) una categoría propia de deducciones, visible como fila «Deducciones sobre ingresos» (cambia el contrato de datos: skill `contrato-de-datos`); (b) solo en pantalla, mostrar las deducciones aparte sin tocar los datos; (c) dejarlo como está y explicarlo en la fila.
MEDIDO (2026-10-24, `data/**/*.json`): 284 líneas de ingreso negativas en 64 clubes (Brasil 168, Turquía 31, Portugal 18, Chile 13, Colombia 12, Grecia 10, Italia 10); 195 son `other_revenue/other_income` y 108 de ellas (36 clubes) llevan un rótulo de deducción; 43 club-años en 25 clubes tienen «Otros ingresos» NEGATIVO en total; 44 líneas pesan más del 5 % de los ingresos. Ya van a su categoría natural (y están bien) las deducciones que el documento asigna: entradas −21 en `matchday`, −12 en `membership`, −10 en `media_rights`. Por qué existen: el documento imprime la receta bruta por línea y las deducciones como un total por tipo (impostos, direito de arena, sindicato), sin decir a qué línea de ingreso corresponden; la carga copia el documento para que el total dé la receita líquida, y partirlas entre las líneas sería inventar un desglose. El audit ya mira las líneas negativas (P3 `signo-invertido`, más del 2 % de la sección) pero silencia las que coinciden con la lista de deducciones conocidas (`DEDUCCION_FISCAL_INGRESO_RE`), y no mira el total de «Otros ingresos». Recomendación: una subcategoría `revenue_deductions` dentro de `other_revenue` (aditiva: la categoría no cambia; chequear con `contrato-de-datos-finance-of-sports`), recategorizar por etiqueta las ~108 líneas (`fos etiquetas`), mostrar en pantalla una fila «Deducciones sobre ingresos» aparte, y después un P3 si un total de `other_income` queda negativo (ya sería una anomalía). Medido: sacando las 108 líneas con rótulo de deducción, los club-años con «Otros ingresos» negativo bajan de 43 a 6 (5 clubes); los que quedan tienen otras líneas negativas (variación de existencias, costos de traspaso netos, resultado de una joint venture) que se miran caso por caso. Pregunta de Guido (2026-10-24): ¿la fila de deducciones no seguiría mostrando un ingreso negativo? Sí: en el listado de ingresos aparecería UNA fila negativa «Deducciones sobre ingresos» (explicada, con su nota) en lugar de un «Otros ingresos» negativo y sin explicación; el total sigue siendo la receita líquida del documento. Si se prefiere que la lista de ingresos no tenga ningún negativo, la alternativa es sacar las deducciones de la composición y mostrar «Ingresos brutos» menos «Deducciones» igual «Ingresos netos» como un renglón aparte; es una decisión de pantalla (skill `producto-y-pantalla`).
DECISIÓN DE GUIDO (2026-10-24): por ahora se deja SOLO una nota aclaratoria en pantalla cuando haya un ingreso negativo (la opción c de arriba): no se cambia el contrato de datos, no se crea la subcategoría `revenue_deductions` ni se separa la fila. Qué dice la nota se ve después (a decidir con Guido; mirar los casos de Brasil, Turquía y Portugal, que son 188 de las 284 líneas, para que el texto sirva a los tres: la receita bruta menos las deducciones es la receita líquida del documento). La recomendación de arriba (subcategoría y fila aparte) queda como el paso siguiente si la nota no alcanza.
Terminado cuando: cada ingreso negativo, y cada «Otros ingresos» negativo, lleva una nota aclaratoria en pantalla cuyo texto aprobó Guido, y ningún club muestra uno sin que la pantalla lo explique.

Verificar: manual

### 3. 417 · (Auditora, prioridad media): revisar los niveles P0 a P4 de audit.js: la skill quedó atrás, P1 mezcla lo que ve el visitante con lo que frena un commit, y qué contrastes externos sumar (Money League, UEFA, ligas)

Pregunta de Guido (2026-10-23): ¿están bien los criterios P0 a P4?, ¿faltan niveles?, ¿hace falta un hook? (Transfermarkt y sitios parecidos se usaron solo para pensar procesos: Guido no quiere ningún trabajo con su información.) Hallazgos: (a) los niveles están definidos en `SEV_TITULO` de `audit.js` y en la sección 2 de la skill `auditoria-finance-of-sports`, y la skill quedó atrás: dice «P3 limpieza e informativo» y no conoce P4 (el código separa P3 = pide trabajo de una sesión y P4 = informativo, `quien: nada` de `tools/audit-acciones.json`). (b) P1 dice «roto o ausente que el visitante ve» pero tiene 40 códigos y muchos son internos (`import-sin-export`, `linea-duplicada`, `admin-no-excluido`): en la práctica P0 y P1 son «frena el commit». (c) No faltan niveles: la segunda dimensión que importa ya existe como `quien` (script, sesión, guido, nada) en `audit-acciones.json`; más letras diluyen. (d) Ideas de contrastes externos, cada una un chequeo nuevo (P2 o P3), a medir antes con `fos cola-historial`-estilo: ingresos de los clubes grandes contra la Deloitte Football Money League; la distribución central de TV que publican la Premier League, la Serie A y LaLiga contra `broadcasting`; la razón sueldos/ingresos contra el benchmarking de UEFA; asistencia × precio medio contra `matchday_competition`. Sin Transfermarkt ni sitios parecidos. Antes de usar cualquiera: su fila en `Admin/fuentes-externas.md` (regla de Guido).
Propuesta: (1) corregir la skill (texto en una propuesta, commit aparte) y agregar un chequeo `severidades-desfasadas` que compare su tabla con `SEV_TITULO`; (2) `node tools/audit.js --leyenda`: los niveles con su definición, su cuenta y sus códigos, para que ninguna sesión tenga que investigarlo; (3) redefinir P1 como «frena el commit» o partirlo; (4) elegir 1 o 2 contrastes externos y medir cuántos clubes cubren; (5) `audit.js --json` incluye los hallazgos silenciados y el resumen no (los conteos de P3 por JSON daban 69 contra 49): que `--json` marque cada uno con `silenciado: true` o que no los traiga.
HECHO (2026-10-24): (2) `node tools/audit.js --leyenda` (cada nivel con su definición, los hallazgos de hoy y los códigos que lo emiten, leídos del código). (5) ya estaba: `--json` trae `findings` y `silenciados` en listas separadas (los 69 contra 49 eran la suma de las dos).
QUEDA, y es de Guido o toca una skill: (1) el texto de la skill `auditoria-finance-of-sports` (sección 2: P3 pide trabajo, P4 informativo; el comando de la leyenda) y el chequeo `severidades-desfasadas` que compare la tabla de la skill con `SEV_TITULO`; (3) redefinir P1 como «frena el commit» o partirlo: decide Guido (hoy P0 y P1 frenan el commit, con 40 códigos en P1 de los cuales varios son internos); (4) qué contrastes externos entran, con su fila en `Admin/fuentes-externas.md`, y medir cuántos clubes cubre cada uno.
Terminado cuando: la skill y `audit.js` dicen lo mismo de los niveles, `--leyenda` existe, P1 está redefinido por Guido y hay una decisión escrita sobre qué contrastes externos entran.

Verificar: manual

### 4. 418 · (Onboarding, con Auditora, prioridad media): verificar de verdad los 5 silencios «aceptado sin verificar» de audit-ignore (liga-una-fuente x2, color de Bath Rugby, filas de liga en null, sponsors anteriores al registro)

Para llevar el P3 a cero (2026-10-23) se silenciaron 5 avisos con «ACEPTADO SIN VERIFICAR POR PEDIDO DE GUIDO» en `tools/audit-ignore.json`. Verificarlos de verdad, uno por uno: (1) `liga-una-fuente` de `aellarissa-gr` 2025 y `felgueiras-pt` 2023: `node tools/segunda-fuente-liga.mjs <url> <ligaId> <año> --pais <iso2> --tabla "<título>" --escribir` con una segunda fuente (el sitio de la liga o la federación); las ligas en grupos frenan en la compuerta. (2) Bath Rugby: buscar el color de marca (`brandColor`, la camiseta, no a ojo) o escribir `brandColor:null` si se miró y no lleva; skill `club-or-year-onboarding`, `club-nuevo.md`. (3) 24 filas de `data/club-leagues/<iso2>.js` en null: `node tools/lookup-club-league.js` contra la página de temporada y escribirlas. (4) Sponsors anteriores al registro (`tools/sponsor-legacy.json`, 26 años): completar con `tools/sponsor-busqueda.js` al tocar cada club; si no se toca ninguno, queda la excepción escrita. Cada uno que se verifica pierde su entrada de `audit-ignore.json`.
Terminado cuando: las 5 entradas «ACEPTADO SIN VERIFICAR» ya no están en `audit-ignore.json` y el aviso correspondiente no dispara (o quedó con motivo VERIFICADO).

Verificar: manual

### 5. 401 · (Pipeline): una prueba que escribe de verdad en cada tool que escribe, porque un ensayo no pasa por los imports que se rompen

La partición de `cargar.mjs` (375) dejó sin re-exportar `snapshot`, `revertir` y `runNode`: `publicar`, `caja-deuda --escribir`, `costo-personal`, `dentro-de-otro`, `worktree` y `gestiones-tanda` fallaron un día entero sin que `medir pipeline` lo viera, porque sus medidores corren en ensayo y el import dinámico solo se evalúa al escribir. Hoy hay un chequeo estático (`fos imports`, P1 `import-sin-export`) que atrapa ESA clase, pero no otras (una ruta rota, un argumento que cambió, un archivo que la tool partida ya no escribe). `node tools/prueba-escribir.mjs` ya escribe de verdad un año con fuente nueva en un worktree descartable (solo `cargar.mjs`).
Propuesta: extenderla a cada tool que escribe datos o registros (`caja-deuda --escribir`, `costo-personal`/`fos personal --escribir`, `recategorizar-etiquetas --escribir`, `ajustes --agregar`, `publicar`, `generar-correcciones`, `alta-club --escribir`, `fetch-fx-reference` sobre una copia): una lista en `tools/pipeline-tools.json` de qué tools escriben y con qué comando se prueban, cada una sobre una copia del repo en un worktree, comparando archivo por archivo con lo esperado. Que el medidor las corra cuando cambia una de ellas (o un módulo que importa) y que `medir pipeline` se niegue a dar «idéntico» si una tool que escribe no tiene su prueba.
HECHO (2026-10-23): `tools/prueba-escribir.mjs` escribe de verdad, en el mismo worktree descartable, `caja-deuda --personal --escribir` y `--partir --escribir`, `recategorizar-etiquetas --escribir`, `generar-correcciones`, `ajustes --agregar` y `publicar` (sobre los datos de HEAD, idempotentes; exige salir con 0 y ningún error de código en la salida). Quitando el re-export de `cargar.mjs` la prueba falla (y antes el chequeo estático). Medidor nuevo `escribir` en `tools/pipeline-tools.json`, asignado a `cargar.mjs`, `caja-deuda.mjs`, `publicar.mjs` y `recategorizar-etiquetas.mjs` (medido de punta a punta: idéntico; suma unos 4 minutos a una medición). QUEDA: las que escriben y no tienen prueba (`dentro-de-otro.mjs --escribir`, `gestiones-tanda.mjs`, `alta-club.mjs --escribir`, `fetch-fx-reference.mjs` sobre una copia, `worktree.mjs`), la lista de «tools que escriben» en `pipeline-tools.json` para que `medir pipeline` se niegue a dar «idéntico» si una de ellas no tiene su prueba, y que la prueba compare lo escrito con lo esperado (hoy las tres primeras comprueban que no cambian ningún JSON de club; las demás, solo que no se rompan). `tools/con-worktree.mjs` (`conWorktree(fn)`) arma el worktree: una prueba nueva es solo el escenario.
Terminado cuando: cada tool que escribe tiene su prueba de escritura en un worktree, `medir pipeline` la corre al cambiarla, y la rotura de la 375 (quitar el re-export) la atrapa una prueba y no solo el chequeo estático.

Verificar: manual

### 6. 257 · (Orden 1): Deportes Tolima, sin cargar por una duda sobre el resultado de 2025

Lo que quedaba de esta línea (la skill `perfil-en-cola` que frenaba la carga) ya está: `cargar.mjs` nunca frena por eso (se avisa y la pregunta queda en la cola). Queda un solo caso: **Deportes Tolima no está en el sitio**
(no hay JSON de Tolima en la carpeta de Colombia de data) aunque `Clubes/Colombia/Deportes Tolima/` tiene los estados financieros de 2016 a 2025. La duda (`Admin/dudas-por-club.md`, sección Deportes Tolima): el documento de 2025 trae solo las
NOTAS, y el resultado neto de 2025 da tres cifras que no concilian (SIIS $359 M; la tabla histórica de la Nota 18(3), $914 M; sumando las notas 19 a 23, ~$3.185 M). Los ingresos de 2025 sí cierran exacto ($49.330,876 M).
Cómo se resuelve sin preguntarle al club, porque es público: bajar de SIIS (siis.ia.supersociedades.gov.co, NIT 890700863) otro radicado de 2025 que traiga el Estado de Resultado Integral primario (`club-sourcing`); y
mientras tanto cargar 2016 a 2024 (el año 2025 sin `officialPAT` queda con el aviso `balance-sin-pat`, que no frena). Falta el dictamen del revisor fiscal de 2024 (`dictamen-revisor-fiscal-2024.pdf` es idéntico al de 2025, `Admin/sourcing/Colombia/_notas-generales.md`).
Decisión de Guido (2026-10-22): no es necesario resolver el resultado de 2025 para cargar; se cargan los años con el pipeline y 2025 queda sin `officialPAT` (aviso `balance-sin-pat`, no frena). La duda se anota en la nota de sourcing del club y se retoma. Se hace después del reset de tokens (≈10 documentos ya transcriptos; el costo es la categorización).
Terminado cuando: Tolima está cargado (los años que el documento permite) y la duda de `dudas-por-club.md` se borró o quedó respondida con la fuente.

Verificar: existe data/co/deportestolima-co.json

### 7. 362 · (Pipeline, con la Auditora): el freno de documentos de grupo

FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
skill de auditoría (la Auditora). Lo hace Pipeline.

Verificar: manual

### 8. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

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

### 9. 434 · (Orden): diagnosticar qué se lee en vano al arrancar una sesión y diferenciar más las sesiones por rol

Caso (2026-10-24, sesión de los puntos chicos): al terminar, la sesión informó lo que leyó sin usar: `fos arranque orden` entero (ESTADO.md, salida larga) casi sin servir para ningún punto; la salida de `fos cerrar` que repite lo mismo en cada punto; la skill de onboarding cargada solo por dos de sus archivos. Guido: puede ser que haya que diferenciar más las sesiones (un arranque distinto por tipo de tarea, no uno por rol). Diagnóstico a hacer: (1) medir cuántos KB lee de verdad cada arranque (`arranque <rol>` y la tabla de la skill de arranque) y cuáles se usan, mirando 3 o 4 transcripciones recientes de sesiones de distinto tipo; (2) proponer qué sacar, qué dejar a demanda y si conviene un tipo de sesión más (por ejemplo «puntos chicos de tools» con un arranque mínimo). Proponerle a Guido lo que cambie un texto que él lee.
Terminado cuando: hay un informe corto en `Admin/mediciones/` (con `Conclusión:` y `Destino:`) con los KB leídos por tipo de sesión y la lista de lo que se saca o se hace a demanda, y los cambios que no sean texto de skills o CLAUDE.md están hechos.

Verificar: manual

### 10. 444 · (Pipeline, con la Auditora): 675 de 3662 documentos con .md no tienen fecha de cierre en el registro (Colombia, Dinamarca, Brasil, Grecia…)

Medido 2026-10-24 sobre `Admin/registros/transcripciones-estado.jsonl` (con un script de la sesión que no se guardó: contar en el registro las entradas con `tieneMd` y `periodo.cierre` vacío): 675 de 3662 documentos con `.md` tienen un período sin fecha de cierre (Colombia 127, Dinamarca 75, Brasil 56, Grecia 55, Argentina 49, Francia 46, España 43, Rusia 38). El registro les pone `{tipo: anual, meses: 12, cierre: null, confianza: baja}` por defecto. Consecuencia real: el 413 no pudo cargar el período de 15 meses de SønderjyskE 2023 porque `cargar-inicio.mjs` busca el cierre del año anterior entre los documentos del club y los daneses tenían `cierre: null`; se resolvió con un ajuste `cierre` a mano en el documento 2022 y con una mejora de `periodo.mjs` (leer «1. OKTOBER 2024»). Qué hacer: (1) los que traen el cierre en el nombre del archivo (`aarsrapport-2022-06-30.pdf`, `...-AAAA-MM-DD`) usarlo como señal de confianza media, con compuerta (si el contenido dice otro cierre, manda el contenido, como ya hace `nombreNoCoincide`); (2) para el resto, mirar en 10 casos por país por qué `periodo.mjs` no encuentra la fecha (idioma, formato, tabla) y mejorar por escalón; (3) un aviso P3 que cuente los documentos de clubes ya cargados con `cierre: null`. Medir con `periodo.mjs --todos` antes y después y con el medidor `verificar`.
HECHO (partes 1 y 3): `periodo.mjs` toma el cierre del nombre del archivo (fin de mes y el año en el texto): sobre los .md 810 sin cierre pasan a 634 (Dinamarca 89, Grecia 59, Bélgica 16, Chequia 10); `verificar` idéntico. P3 `cierre-sin-fecha` en `audit.js` (hoy 486 documentos de 116 clubes cargados, con el registro sin refrescar).
HECHO también (parte 2, primer escalón): registro refrescado; `periodo.mjs` toma la fecha de fin de mes más citada con su comparativa y el año del nombre (98,3 % de aciertos sobre 1013 anuales con cierre conocido) y lee fechas coreanas, japonesas y chinas: sin cierre 634 a 554, `verificar` idéntico; `cierre-sin-fecha` 486 a 340 documentos (registro sin refrescar tras este segundo escalón).
HECHO también: registro refrescado (cierre-sin-fecha de 486 a 285) y `fos cierre-sin-fecha`: de los 457 anuales sin cierre, la regla de los vecinos (`cierre-vecinos.mjs`, año anterior y siguiente con el mismo día y mes, 98,2 % de aciertos medido) deduce 92 de los 283 de clubes con algo cargado al cargar; FRENAN 191 en 73 carpetas (Brasil 39, España 31, Argentina 30, Colombia 27, Rusia 25, Países Bajos 10…), y el P3 cuenta esos. Medido y descartado por no llegar al 98 %: un escalón por el año del nombre (81,5 %) y «todos los demás del club cierran igual» (78,8 %).
HECHO también: las 163 preguntas `cierre-por-pais` contestadas (todas aceptar; 17 de seguridad baja, sobre todo los agregados DNCG de Francia sin fecha explícita); los que frenan bajan de 191 a 83 (Argentina 30, Colombia 27, Alemania 8, Croacia 7, Italia 4, Grecia 2, Perú 2, Inglaterra, Países Bajos y Portugal 1). Los 83 son países sin cierre por defecto: van uno por uno con un ajuste `cierre` (punto 3 de QUEDA).
QUEDA (la parte 1 de abajo ya está hecha por la cola): (1) un cierre por defecto por país, que sería un CRITERIO DE DATOS (votación): sobre los anuales con cierre conocido, Brasil cierra el 31-12 en 98 %, Rusia 98 %, Noruega 100 %, Ucrania 100 % (17), y España, Países Bajos y Francia el 30-06 en 100 % (75, 190 y 9); Argentina (6 % el 31-12) y Colombia (91 %) no sirven; resolvería ~220 de los 554; (2) Corea del Sur (26): «AAAA년 MM월 DD일 까지» en líneas sueltas, sin documento con cierre conocido para medir; (3) los demás, uno por uno con un ajuste `cierre` (`node tools/fos.mjs cierre-sin-fecha --lista`). Un escalón nuevo se mide como estos: precisión sobre los anuales con cierre conocido (98 % o más) y `verificar` idéntico.
Terminado cuando: los documentos con cierre null bajan de 675 a la cifra que el criterio permita, con la medición idéntica en `verificar`, y un P3 cuenta los que quedan en clubes cargados.

Verificar: manual

### 11. 445 · (Auditora, con Guido): SønderjyskE 2022-2024 en formato completo: qué hace falta (Guido lo prefiere)

Guido (2026-10-24) prefiere ver a SønderjyskE en formato completo. Hoy: 2025 cargado completo (ventas 66,29 M y otros ingresos 0,12 M; votación 3 a 0 en `Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`); 2022, 2023 y 2024 cargados como «Bruttofortjeneste» (el margen bruto, balance resumido por la § 32), que es como el club publicó esos años. Para mostrarlos completos hace falta el estado completo de cada año: 2024: el informe 2025 trae la columna 2023/24 completa pero REEXPRESADA (pasó 2,13 M de personal a margen bruto: 35,30 M contra 37,43 M originales). Esa es la opción C que la votación descartó por la regla «un comparativo reexpresado no es la transcripción del año» (`CONVENCIONES-DATOS.md`, Salernitana 2022); hacerlo exige que Guido decida una excepción o una regla nueva («el comparativo completo de un informe posterior reemplaza al año resumido, con una publicNote de reexpresión»), cambia 1 año ya publicado y se recarga con `cargar.mjs --reemplazar`. 2022 y 2023: los informes publicados no traen el desglose; habría que pedírselo al club (mail, skill `club-outreach`) o encontrar una versión interna; mientras tanto quedan resumidos con su nota. Sobre qué mide «completo»: ingresos y gastos brutos (el resultado no cambia), útil para el tamaño real y la relación sueldos/ingresos; no es «poder adquisitivo». POR QUÉ LA VOTACIÓN RECHAZÓ USAR EL 2024 DEL INFORME 2025 (pregunta de Guido): (1) el informe 2024 publicó 37,43 M de margen bruto y el comparativo del 2025 dice 35,30 M para el mismo año, porque el club reclasificó 2,13 M entre personal y margen bruto; cargar el comparativo mostraría para 2024 una cifra que el club no publicó ese año, y quien abra el informe 2024 encontraría otra; (2) la regla vigente (`CONVENCIONES-DATOS.md`, «UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO», decisión de Guido para Salernitana 2022, y `club-data-mapping/SKILL.md`: usar siempre la columna del propio ejercicio) lo permite solo si el PDF del año es ilegible, y el del 2024 es legible; (3) 2024 quedaría completo entre 2022 y 2023 resumidos (la serie seguiría mezclada). A favor de hacerlo: es la última versión que da el propio club, y el desglose de 2024 sale gratis. Es una regla, no una ley: Guido puede decidir la excepción.
DECISIÓN DE GUIDO (2026-10-24): NO se usa el 2024 del informe 2025; 2024 queda como el club lo publicó (resumido), de acuerdo con la votación. Queda abierto solo si se le pide el desglose completo de 2022, 2023 y 2024 al club (mail, `club-outreach`; un pedido por club, no urgente).
Terminado cuando: Guido decide si se le pide el desglose completo de 2022 a 2024 al club, y lo decidido queda hecho (el mail, o el punto se cierra con «no se pide»).

Verificar: manual

### 12. 447 · (Auditora, con Onboarding): 23 club-años con cambio de formato del balance y sin publicNote: ¿son cambios de formato reales?

Viene del 446. `audit.js` da el P3 `cambio-de-formato-sin-nota` con los club-años cuyos ingresos pasan de UNA línea `lump_football_operations` (balance resumido) a más de una, o al revés, contra el año inmediatamente anterior cargado, y cuya fuente no tiene `publicNote` (`node tools/audit.js --json` los lista; hoy 23: Avaí 2022 y 2023, Bayern 2024, Belenenses 2025, Fredrikstad 2016, Goiás 2019 y 2021, Lierse Kempenzonen 2020, Lokeren-Temse 2024 y 2025, Lommel 2024, Patro Eisden —seis—, RAAL 2025, Remo —tres—, RWDM 2025 y Vejle 2025). La señal es solo la forma de las líneas: no distingue un cambio de formato del documento de un ingreso que el club dejó sin desglosar por otro motivo (los belgas de esquema abreviado alternan año a año). Falta, por club-año: mirar los ingresos del documento y el anterior; si es un cambio de formato real, `node tools/fuente.mjs <clubId> <sourceId> --nota "…" --escribir` con el texto que sugiere el aviso de `cargar.mjs` (`textoSugerido` de `tools/cambio-formato.js`; el modelo es la nota de SønderjyskE 2025); si no, silenciar el año con su motivo (`tools/silenciar.mjs`). Si la mayoría resulta no ser un cambio real, afinar la señal en `tools/cambio-formato.js` (medir antes y después).
Terminado cuando: `node tools/audit.js` no da `cambio-de-formato-sin-nota` (cada año con nota o silenciado con motivo).

Verificar: audit cambio-de-formato-sin-nota = 0

### 13. 454 · (Auditora, con Onboarding y Pantallas): una nota por ejercicio para los 71 ejercicios con los ingresos en una sola línea (margen bruto o facturación), según el caso

Decisión de Guido (2026-10-24): en el sitio un ejercicio con los ingresos en UNA línea sin desglosar (`lump_football_operations`) muestra esa línea como «ingresos», y puede ser un margen ya neto de costos (el «Bruttofortjeneste» danés del artículo 32, el «Brutomarge» belga) o la facturación entera («Omzet», «Turnover»). Reconstruir los ingresos reales sería inventar números, aunque el informe del año siguiente traiga una columna comparativa (el voto del 413 descartó reescribir años publicados con ella). Lo que se hace es dejar una NOTA PÚBLICA por ejercicio (`publicNote` de su fuente, con `node tools/fuente.mjs <clubId> <sourceId> --nota "…" --escribir`), según el caso, y NO una nota genérica que confunda más que aclare. Medido: 71 de 1340 ejercicios cargados (5,3 %), en 26 clubes: Bélgica 32, Brasil 16, Dinamarca 13, Noruega 4, Alemania 2, Países Bajos 2, Portugal 1, México 1; `node tools/fos.mjs ingresos-en-una-linea [--pais dk]` los lista con su rótulo, su importe y cuántas líneas tiene el año siguiente. Por ejercicio hay que mirar el rótulo en el documento y decidir qué dice la nota: (a) el rótulo es un margen (Bruttofortjeneste, Brutomarge, Bruttotab, lucro bruto): la nota dice que el importe es el margen bruto que el club publica, que ya descuenta costos, y que no es comparable con los ingresos de un club que publica el estado completo ni con sus propios años en formato completo; (b) el rótulo es la facturación entera (Omzet, Turnover, Net sales): ese no es el caso del margen, el ingreso es real y solo falta decir que no está abierto por fuente; (c) hay un año siguiente completo (los cambios de formato del 447: 15 de los 55 con año siguiente): la nota del año nuevo explica el salto y la del viejo remite a ella. El texto lo escribe una sesión con el documento delante y los números que figuran en él, sin cifras que no estén impresas. Va junto con el 447 (los 23 pares con cambio de formato) y alimenta al 452 (las particularidades contables para el lector). Si la nota es un cambio a datos publicados: `publicar.mjs` y el trailer `Corrige:`.
Terminado cuando: cada uno de los 71 ejercicios tiene su nota pública (o el motivo escrito de que no hace falta) y `node tools/fos.mjs ingresos-en-una-linea` no lista ninguno sin nota.

Verificar: manual

### 14. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
CORRIDO a medias (2026-10-23, sesión sola): `audit.js` P0 0 · P1 0 · P2 16 · P3 132; `?audit=1` `auditAll()`: 331 clubes, 3.823 chequeos OK, 0 que no cierran, 0 avisos de tipo de cambio; `generar-data --check`, `estimar --check`, `generate-club-pages --check`, `generate-club-index --check`, `generate-rankings --check` y `generate-fuentes-page --check`: todos al día. Falta la skill `auditoria-finance-of-sports` (un eje) y decidir qué hacer con los P2 y P3 (el 370), que es lo que pide el punto.

Verificar: manual

### 15. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 16. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

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

### 17. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

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

### 18. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

HOY (2026-10-23): el aviso `ejercicio-sin-rastro` de este club está silenciado en `tools/audit-ignore.json` (2023-2025 sin depósito; 2022 con el balance en mano) para llevar el P3 a cero; lo que falta es la decisión de 2022, así que la línea de verificación pasó a manual.
Verificar: manual

### 19. 451 · (Pantallas, con Guido): las etiquetas de las filas siguen el idioma elegido por el visitante (español o inglés), no el del documento

Pedido de Guido (2026-10-24), a partir de SønderjyskE: en las filas extra del «Formato del club» (`adjustments.extra_rows`) y en las líneas de ingresos y gastos aparece el texto en el idioma del documento («Andre finansielle indtægter», «Øvrige finansielle omkostninger», «Skat af årets resultat», «Bruttofortjeneste/Bruttotab», «Løn og gager»…). Hoy es la regla: `rawLabel` va tal cual el documento y nunca se traduce (skill `club-data-mapping`, §0), porque es la evidencia de qué dice la fuente. Lo que pide Guido: lo que LEE el visitante sigue el idioma que eligió, español o inglés (el selector que ya existe, `data/lang/es.js` y `en.js`). Propuesta a diseñar: conservar `rawLabel` como evidencia (en el JSON y en la página de fuentes) y mostrar en pantalla una glosa en el idioma del visitante, con el original en el título o entre paréntesis; de dónde sale la glosa (una tabla por idioma de origen para las etiquetas que se repiten —impuestos, ingresos financieros, personal—, o un campo `label_es`/`label_en` que escribe el categorizador al cargar y que audita `audit.js`); cómo se previene que una fila nueva entre sin glosa (el pipeline la pide al cargar; un P3 de `audit.js` cuenta las etiquetas visibles sin glosa en el idioma del visitante, hoy no hay ningún chequeo: solo `audit-chequeos-4` mira el «otros» en el idioma del documento); y el contrato de datos (un campo nuevo pasa por la skill `contrato-de-datos`).
Terminado cuando: ninguna etiqueta de un club cargado se muestra en un idioma que no es el del visitante sin su glosa (con el original a mano), la glosa de una fila nueva la escribe el pipeline y `audit.js` da un aviso si falta.

Verificar: manual

### 20. 452 · (Pantallas, con Contenido): mostrarle al lector las particularidades contables clave de lo que está leyendo (balance resumido, cierre, perímetro), sin curso de contabilidad

Pedido de Guido (2026-10-24): mostrar en algún lugar del sitio un puñado de particularidades contables, no un curso para periodistas, para que un lector entienda qué está leyendo, más allá de lo que se resuelva con el 447. Son cosas que solo se ven al tener ejercicios de muchos países. Candidatas (a elegir y a escribir cortas, con el caso real como ejemplo): (1) balance resumido contra completo: algunos clubes publican solo un margen (el «Bruttofortjeneste» danés de la exención del artículo 32 de la ley contable, el esquema abreviado belga, el «lucro bruto»), y el sitio lo muestra como «ingresos» aunque ya vienen netos de costos; el salto cuando pasan al formato completo es de formato, no de actividad (SønderjyskE: 37,4 M en 2024 contra 55,9 M de ventas reales, que el informe 2025 trae en la columna comparativa; 71 de los 1340 ejercicios cargados, un 5 %, tienen los ingresos en una sola línea sin abrir; en unos es un margen y en otros la facturación entera, y hay que separarlos antes de escribir la nota); (2) el ejercicio no es el año calendario: cierra el 30-06 en España, Países Bajos o Francia, el 31-12 en Brasil, Rusia o Noruega, y el año del sitio es el del cierre; (3) individual contra consolidado: el mismo club tiene dos balances con perímetros distintos y no se suman ni se comparan; (4) sociedades sin socios: «cuotas sociales» en cero es un cero real, no un dato perdido; (5) cifras en moneda local convertidas al tipo de cambio de cierre: un club puede «crecer» en dólares por la moneda. Dónde: `metodologia.html` (donde ya explica cómo se leen los datos) y una nota corta en el lugar donde el lector tropieza (el gráfico de ingresos cuando hay un cambio de formato, ver el 447). El aviso `metodologia-desactualizada` de `audit.js` recuerda revisarlo cada 40 commits de reglas. Lo escribe Contenido con el criterio de `contenido-y-difusion`.
Terminado cuando: `metodologia.html` y sus textos en español e inglés tienen una sección corta con esas particularidades, cada una con un ejemplo real del sitio y un enlace a la fuente.

Verificar: manual

### 21. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso es `node tools/fos.mjs etiquetas` (369, hecho). Este punto es lo que queda después de que corrió. La lista corta de 24 etiquetas ya está decidida por Guido (2026-10-23). Falta la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 22. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

## E. Después de A a D (Guido, 2026-10-20)

### 23. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual

### 24. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas (viene del 356)

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

### 25. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 26. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

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

### 27. 335 · mails a clubes

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

### 28. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual
