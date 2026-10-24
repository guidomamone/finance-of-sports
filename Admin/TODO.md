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

### 1. 399 · (Pipeline): partir las funciones enormes de tools/ (verificar 1.600 líneas, proponer 892, analizar 365) y audit.js sin tocar el comportamiento

Lo que el 375 dejó con motivo escrito (`tools/tamanos-aceptados.json`, aviso `tool-grande`): `verificar.mjs` 217 KB (UNA función `verificar()` de ~1.600 líneas con ~30 tramos de escalones), `cargar.mjs` 129 KB (`proponer()`, 892 líneas), `alta-club.mjs` 51 KB (`analizar()`, 365 líneas), `audit.js` 161 KB (CommonJS con un contexto compartido), `lote.mjs` 70 KB (un solo flujo a nivel de módulo), `perimetro-senales.mjs` 62 KB (`cacheA2` lo reasigna `main`) y `vocabulario-datos.mjs` 48 KB (una tabla). Partirlas ya no es un movimiento sino un refactor: cada función enorme se corta en funciones que reciben un contexto, o el estado compartido pasa a un objeto. Una función por vez, de menor a mayor riesgo (`analizar`, `proponer`, `verificar`), cada una con su medición completa y un commit; `audit.js` primero necesita que `fos mover` entienda CommonJS (`require`/`module.exports`).
HECHO (2026-10-23): `analizar()` (7 funciones), `proponer()` (11 fases con `ctx`) y `verificar()` (13 fases; 27 variables compartidas en `ctx.N`), cada una con su medición completa idéntica y su veredicto general. Las funciones ya no pasan de ~325 líneas (`armar()`); los archivos siguen pasando de 40 KB y su motivo de `tamanos-aceptados.json` queda. QUEDA: `audit.js` (primero que `fos mover` entienda CommonJS), `lote.mjs`, `perimetro-senales.mjs` y `vocabulario-datos.mjs`; y partir los archivos en módulos si se quiere bajar de 40 KB (ahora que las fases no comparten variables sueltas, cada fase puede mudarse con `fos mover`).
Terminado cuando: cada tool de la lista pasa a tener menos de 40 KB o su motivo sigue escrito; cada corte tiene su línea de medición idéntica en el registro.

Verificar: manual

### 2. 413 · (Onboarding, con Pipeline): cargar SønderjyskE 2023 (informe de transición de 15 meses) y 2025 (informe XHTML en mano)

Salió de la auditoría (`ejercicio-sin-rastro`, P3): los documentos EXISTEN en `Clubes/Dinamarca/SønderjyskE/` y no se cargaron, así que no se silencian. Cargados 2022 y 2024. 2023: `aarsrapport-2022-2023-09-30-transicion` (01/07/2022-30/09/2023, con `.md`, `.pdf` y `.xhtml`). 2025: `aarsrapport-2025-09-30.xhtml`, sin `.md` (hay que convertirlo con `tools/xhtml-aarsrapport.mjs`). El ensayo del lote 142 (`Admin/lotes/lote-142.txt`) da US$ 0,12 para 2023: el motor determinista de XHTML/iXBRL todavía no lee las cifras etiquetadas, así que `--ejecutar` frena el lote hasta pasar `--pagar-ia-xhtml "<motivo>"` (gasto que decide Guido). (Fredrikstad 2019-2023 NO va: esos PDF son de Fredrikstad Fotballinvest AS, descartados el 2026-10-21 porque no es el club; el aviso quedó silenciado con esa cita.)
Terminado cuando: SønderjyskE 2023 y 2025 están cargados con su verificación y `node tools/audit.js` no da `ejercicio-sin-rastro` para `sonderjyske-dk`.

Verificar: manual

### 3. 414 · (Pipeline, con la Auditora, prioridad media): «Ganhos em imobilizações» y afines: ¿son ventas de jugadores? (Benfica 2007, Sporting 2000-2005, PAOK 2025, Académica 2023)

Salió de la auditoría (`catchall-dominante`): una sola línea de «Otros ingresos» pesa del 29 % al 65 % de los ingresos del ejercicio. Hay indicio de que son plusvalías por traspasos: en Sporting 2002 el documento imprime «Mais-valias em Transferências» 13.413 y «Ganhos em Imobiliz.» 13.413 (misma cifra, `Clubes/Portugal/Sporting CP/relatorio-contas-2001.md` L152 y L761). Casos visibles hoy: Benfica 2007 «Ganhos em imobilizações» 24,1 M (29 %), Sporting 2000 «Proveitos e Ganhos Extraordinários», 2002 «Ganhos em Imobiliz.» y 2005 «G. Imobilizações» 65,0 M (65 %), PAOK 2025 «Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων» 31,8 M (43 %) y Académica 2023 «Ganhos em perdão de dívida» (esta es una quita de deuda, no un traspaso). Los hay más, por debajo del umbral del aviso (40 %). Es una decisión de criterio de datos: si la nota del documento dice que son traspasos de jugadores, van a `player_sales` (cambia lo ya publicado: skill `contrato-de-datos`, trailer `Corrige:`).
Terminado cuando: cada etiqueta de «ganancias de inmovilizado» de los clubes cargados está mirada contra su nota (¿jugadores o activos fijos?) y votada si no tiene precedente (`votacion-de-criterios`), y la que sea traspaso está recategorizada con su cita.

Verificar: manual

### 4. 415 · (Pantallas, con Pipeline, prioridad media): ingresos negativos: las deducciones sobre la receita (impuestos, direito de arena) caen en «Otros ingresos» y lo dejan negativo (284 líneas, 64 clubes)

Pregunta de Guido (2026-10-23) sobre Flamengo: «Otros ingresos» da negativo. Causa: el DRE brasileño resta de la receita bruta los impuestos y el «direito de arena» para llegar a la receita líquida; la carga pone esa resta como una línea negativa en `other_income` («Impostos e contribuições + Direito de arena (deduções sobre a receita)», −68,2 M en 2024 y −60,5 M en 2025) para que el total dé la receita líquida del documento. Con «Outros» de 47,5 M queda −20,7 M. No es un error de cifra (cierra con el total oficial) sino de presentación. Son 284 líneas de ingreso negativas en 64 clubes (195 en `other_income`, casi todas deducciones de clubes brasileños). Opciones: (a) una categoría propia de deducciones, visible como fila «Deducciones sobre ingresos» (cambia el contrato de datos: skill `contrato-de-datos`); (b) solo en pantalla, mostrar las deducciones aparte sin tocar los datos; (c) dejarlo como está y explicarlo en la fila.
Terminado cuando: Guido elige una opción y queda hecha, y ningún club muestra «Otros ingresos» negativo por una deducción sin que la pantalla lo explique.

Verificar: manual

### 5. 416 · (Auditora, con Pipeline, prioridad media): los silencios de audit-ignore con fecha de revisión, y el aviso de ejercicio-sin-rastro que nombra documentos-descartados

Dos cosas que salieron de llevar el P3 a cero (2026-10-23). (1) Un silencio de `tools/audit-ignore.json` es permanente: lo protege el texto del aviso (si cambia el último año o la lista de huecos, vuelve a saltar), pero nada lo hace vencer. Las 5 entradas «ACEPTADO SIN VERIFICAR» y las de «todavía no publicado» (Gladbach, Stuttgart, Monza) no tienen fecha de revisión. Propuesta: un campo `revisar` (fecha) en la entrada; `audit.js` avisa (`silencio-vencido`, P3) cuando pasó, y `silenciar.mjs` lo pide para los motivos «sin verificar» y «no publicado». (2) El mensaje de `ejercicio-sin-rastro` dice «si no hay documento publicado, silenciarlo», pero no menciona `Admin/registros/documentos-descartados.txt`: Fredrikstad 2019-2023 tenía los PDF en `Clubes/` y descartados a propósito (no son del club); casi se cargan. El aviso tiene que decir, por cada hueco, si el documento está en mano, descartado (con el motivo) o no existe.
Terminado cuando: una entrada de `audit-ignore.json` puede llevar `revisar`, `audit.js` avisa al vencer, y `ejercicio-sin-rastro` distingue en su texto «en mano», «descartado» y «sin documento».

Verificar: manual

### 6. 417 · (Auditora, prioridad media): revisar los niveles P0 a P4 de audit.js: la skill quedó atrás, P1 mezcla lo que ve el visitante con lo que frena un commit, y qué contrastes externos sumar (Money League, UEFA, ligas)

Pregunta de Guido (2026-10-23): ¿están bien los criterios P0 a P4?, ¿faltan niveles?, ¿hace falta un hook? (Transfermarkt y sitios parecidos se usaron solo para pensar procesos: Guido no quiere ningún trabajo con su información.) Hallazgos: (a) los niveles están definidos en `SEV_TITULO` de `audit.js` y en la sección 2 de la skill `auditoria-finance-of-sports`, y la skill quedó atrás: dice «P3 limpieza e informativo» y no conoce P4 (el código separa P3 = pide trabajo de una sesión y P4 = informativo, `quien: nada` de `tools/audit-acciones.json`). (b) P1 dice «roto o ausente que el visitante ve» pero tiene 40 códigos y muchos son internos (`import-sin-export`, `linea-duplicada`, `admin-no-excluido`): en la práctica P0 y P1 son «frena el commit». (c) No faltan niveles: la segunda dimensión que importa ya existe como `quien` (script, sesión, guido, nada) en `audit-acciones.json`; más letras diluyen. (d) Ideas de contrastes externos, cada una un chequeo nuevo (P2 o P3), a medir antes con `fos cola-historial`-estilo: ingresos de los clubes grandes contra la Deloitte Football Money League; la distribución central de TV que publican la Premier League, la Serie A y LaLiga contra `broadcasting`; la razón sueldos/ingresos contra el benchmarking de UEFA; asistencia × precio medio contra `matchday_competition`. Sin Transfermarkt ni sitios parecidos. Antes de usar cualquiera: su fila en `Admin/fuentes-externas.md` (regla de Guido).
Propuesta: (1) corregir la skill (texto en una propuesta, commit aparte) y agregar un chequeo `severidades-desfasadas` que compare su tabla con `SEV_TITULO`; (2) `node tools/audit.js --leyenda`: los niveles con su definición, su cuenta y sus códigos, para que ninguna sesión tenga que investigarlo; (3) redefinir P1 como «frena el commit» o partirlo; (4) elegir 1 o 2 contrastes externos y medir cuántos clubes cubren; (5) `audit.js --json` incluye los hallazgos silenciados y el resumen no (los conteos de P3 por JSON daban 69 contra 49): que `--json` marque cada uno con `silenciado: true` o que no los traiga.
Terminado cuando: la skill y `audit.js` dicen lo mismo de los niveles, `--leyenda` existe, P1 está redefinido por Guido y hay una decisión escrita sobre qué contrastes externos entran.

Verificar: manual

### 7. 418 · (Onboarding, con Auditora, prioridad media): verificar de verdad los 5 silencios «aceptado sin verificar» de audit-ignore (liga-una-fuente x2, color de Bath Rugby, filas de liga en null, sponsors anteriores al registro)

Para llevar el P3 a cero (2026-10-23) se silenciaron 5 avisos con «ACEPTADO SIN VERIFICAR POR PEDIDO DE GUIDO» en `tools/audit-ignore.json`. Verificarlos de verdad, uno por uno: (1) `liga-una-fuente` de `aellarissa-gr` 2025 y `felgueiras-pt` 2023: `node tools/segunda-fuente-liga.mjs <url> <ligaId> <año> --pais <iso2> --tabla "<título>" --escribir` con una segunda fuente (el sitio de la liga o la federación); las ligas en grupos frenan en la compuerta. (2) Bath Rugby: buscar el color de marca (`brandColor`, la camiseta, no a ojo) o escribir `brandColor:null` si se miró y no lleva; skill `club-or-year-onboarding`, `club-nuevo.md`. (3) 24 filas de `data/club-leagues/<iso2>.js` en null: `node tools/lookup-club-league.js` contra la página de temporada y escribirlas. (4) Sponsors anteriores al registro (`tools/sponsor-legacy.json`, 26 años): completar con `tools/sponsor-busqueda.js` al tocar cada club; si no se toca ninguno, queda la excepción escrita. Cada uno que se verifica pierde su entrada de `audit-ignore.json`.
Terminado cuando: las 5 entradas «ACEPTADO SIN VERIFICAR» ya no están en `audit-ignore.json` y el aviso correspondiente no dispara (o quedó con motivo VERIFICADO).

Verificar: manual

### 8. 401 · (Pipeline): una prueba que escribe de verdad en cada tool que escribe, porque un ensayo no pasa por los imports que se rompen

La partición de `cargar.mjs` (375) dejó sin re-exportar `snapshot`, `revertir` y `runNode`: `publicar`, `caja-deuda --escribir`, `costo-personal`, `dentro-de-otro`, `worktree` y `gestiones-tanda` fallaron un día entero sin que `medir pipeline` lo viera, porque sus medidores corren en ensayo y el import dinámico solo se evalúa al escribir. Hoy hay un chequeo estático (`fos imports`, P1 `import-sin-export`) que atrapa ESA clase, pero no otras (una ruta rota, un argumento que cambió, un archivo que la tool partida ya no escribe). `node tools/prueba-escribir.mjs` ya escribe de verdad un año con fuente nueva en un worktree descartable (solo `cargar.mjs`).
Propuesta: extenderla a cada tool que escribe datos o registros (`caja-deuda --escribir`, `costo-personal`/`fos personal --escribir`, `recategorizar-etiquetas --escribir`, `ajustes --agregar`, `publicar`, `generar-correcciones`, `alta-club --escribir`, `fetch-fx-reference` sobre una copia): una lista en `tools/pipeline-tools.json` de qué tools escriben y con qué comando se prueban, cada una sobre una copia del repo en un worktree, comparando archivo por archivo con lo esperado. Que el medidor las corra cuando cambia una de ellas (o un módulo que importa) y que `medir pipeline` se niegue a dar «idéntico» si una tool que escribe no tiene su prueba.
HECHO (2026-10-23): `tools/prueba-escribir.mjs` escribe de verdad, en el mismo worktree descartable, `caja-deuda --personal --escribir` y `--partir --escribir`, `recategorizar-etiquetas --escribir`, `generar-correcciones`, `ajustes --agregar` y `publicar` (sobre los datos de HEAD, idempotentes; exige salir con 0 y ningún error de código en la salida). Quitando el re-export de `cargar.mjs` la prueba falla (y antes el chequeo estático). Medidor nuevo `escribir` en `tools/pipeline-tools.json`, asignado a `cargar.mjs`, `caja-deuda.mjs`, `publicar.mjs` y `recategorizar-etiquetas.mjs` (medido de punta a punta: idéntico; suma unos 4 minutos a una medición). QUEDA: las que escriben y no tienen prueba (`dentro-de-otro.mjs --escribir`, `gestiones-tanda.mjs`, `alta-club.mjs --escribir`, `fetch-fx-reference.mjs` sobre una copia, `worktree.mjs`), la lista de «tools que escriben» en `pipeline-tools.json` para que `medir pipeline` se niegue a dar «idéntico» si una de ellas no tiene su prueba, y que la prueba compare lo escrito con lo esperado (hoy las tres primeras comprueban que no cambian ningún JSON de club; las demás, solo que no se rompan). `tools/con-worktree.mjs` (`conWorktree(fn)`) arma el worktree: una prueba nueva es solo el escenario.
Terminado cuando: cada tool que escribe tiene su prueba de escritura en un worktree, `medir pipeline` la corre al cambiarla, y la rotura de la 375 (quitar el re-export) la atrapa una prueba y no solo el chequeo estático.

Verificar: manual

### 9. 257 · (Orden 1): Deportes Tolima, sin cargar por una duda sobre el resultado de 2025

Lo que quedaba de esta línea (la skill `perfil-en-cola` que frenaba la carga) ya está: `cargar.mjs` nunca frena por eso (se avisa y la pregunta queda en la cola). Queda un solo caso: **Deportes Tolima no está en el sitio**
(no hay JSON de Tolima en la carpeta de Colombia de data) aunque `Clubes/Colombia/Deportes Tolima/` tiene los estados financieros de 2016 a 2025. La duda (`Admin/dudas-por-club.md`, sección Deportes Tolima): el documento de 2025 trae solo las
NOTAS, y el resultado neto de 2025 da tres cifras que no concilian (SIIS $359 M; la tabla histórica de la Nota 18(3), $914 M; sumando las notas 19 a 23, ~$3.185 M). Los ingresos de 2025 sí cierran exacto ($49.330,876 M).
Cómo se resuelve sin preguntarle al club, porque es público: bajar de SIIS (siis.ia.supersociedades.gov.co, NIT 890700863) otro radicado de 2025 que traiga el Estado de Resultado Integral primario (`club-sourcing`); y
mientras tanto cargar 2016 a 2024 (el año 2025 sin `officialPAT` queda con el aviso `balance-sin-pat`, que no frena). Falta el dictamen del revisor fiscal de 2024 (`dictamen-revisor-fiscal-2024.pdf` es idéntico al de 2025, `Admin/sourcing/Colombia/_notas-generales.md`).
Decisión de Guido (2026-10-22): no es necesario resolver el resultado de 2025 para cargar; se cargan los años con el pipeline y 2025 queda sin `officialPAT` (aviso `balance-sin-pat`, no frena). La duda se anota en la nota de sourcing del club y se retoma. Se hace después del reset de tokens (≈10 documentos ya transcriptos; el costo es la categorización).
Terminado cuando: Tolima está cargado (los años que el documento permite) y la duda de `dudas-por-club.md` se borró o quedó respondida con la fuente.

Verificar: existe data/co/deportestolima-co.json

### 10. 362 · (Pipeline, con la Auditora): el freno de documentos de grupo

FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
skill de auditoría (la Auditora). Lo hace Pipeline.

Verificar: manual

### 11. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

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

### 12. 426 · (Orden): faltantes-liga y ASSET_V cambian solo por la fecha y frenan un commit al pasar la medianoche

Caso (2026-10-24, al pasar la medianoche): `faltantes-liga.mjs` escribe «calculado: AAAA-MM-DD» en `Admin/sourcing/pendientes.md` y en los 66 `data/faltantes/*.js`; al cambiar el día, `audit.js` da P1 `faltantes-desfasado` y, al regenerar, 66 archivos de `data/` cambian solo por la fecha, lo que dispara el P1 `asset-v-sin-subir` (hay que correr `publicar.mjs`, que sube ASSET_V) para poder commitear cualquier cosa. Propuesta: que `faltantes-liga.mjs` no reescriba un archivo cuyo contenido es el mismo salvo la fecha (y `faltantes-desfasado` compare el contenido, no la fecha), así un cambio de día no frena un commit ni mueve ASSET_V sin que cambie un dato.
Terminado cuando: pasar la medianoche sin cambiar un dato no deja ningún archivo de data/faltantes distinto ni frena un commit.

Verificar: manual

### 13. 425 · (Orden): fos cerrar con un «Verificar: manual»: una forma de dejar constancia de que se verificó a mano

Caso (2026-10-24): al cerrar el 404 (`Verificar: manual`), `node tools/fos.mjs cerrar 404` dio ✗ «no cumple su Verificar» y hubo que usar `--forzar`, que también saltea todo lo demás. Propuesta: `fos cerrar <id> --cerrar --verificado "qué se miró y dónde quedó"` acepta un punto cuya única línea es `Verificar: manual`, anota la constancia en la entrada de CHANGELOG (o la exige ahí) y no saltea los otros chequeos (CHANGELOG, índice, auditoría). `--forzar` queda para lo que no es eso.
Terminado cuando: cerrar un punto con «Verificar: manual» pide --verificado con un motivo, lo anota y sigue exigiendo el resto de los chequeos.

Verificar: manual

### 14. 424 · (Orden): no pisar un lote que existe (Admin/lotes/lote-NN.txt): un comando que da el número libre

Caso (2026-10-24): se escribió una lista nueva sobre `Admin/lotes/lote-142.txt` (el lote del 413, tracked) sin darse cuenta; se restauró de git. Los números de lote los toma cada sesión a ojo. Propuesta: `node tools/fos.mjs lote-nuevo` imprime el siguiente número libre (el más alto de `Admin/lotes/lote-*.txt`, tracked o no, más uno) y crea el archivo con su encabezado, y el hook `tools/hooks/pre-tool.mjs` rechaza un Write sobre un `lote-NN.txt` que ya existe (con el mensaje de usar `fos lote-nuevo`). Agregar el comando a `tools/fos-comandos.json`.
Terminado cuando: un Write sobre un lote existente se rechaza con el comando que da el número libre, y fos lote-nuevo crea el siguiente.

Verificar: manual

### 15. 423 · (Pipeline): medir pipeline avisa cuando un medidor no imprime nada (el xhtml midió cero archivos durante semanas)

Caso (2026-10-24): el medidor `xhtml` de `medir pipeline` corría `xhtml-aarsrapport.mjs Clubes` y la tool solo miraba el nivel superior de la carpeta: cero archivos, salida vacía antes y después, «idéntico» en todas las mediciones del conversor. Nada lo delató. Propuesta: si el ANTES y el DESPUÉS de un medidor están vacíos (stdout vacío o un solo renglón sin datos), `medir-pipeline` no escribe «idéntico» sino «vacío: el medidor no midió nada» y pide `--explicacion` o falla; `probar-medir-pipeline.mjs` con un caso. Revisar de paso que los otros medidores de `tools/pipeline-tools.json` imprimen algo hoy (`node tools/fos.mjs medir pipeline --ensayo` y mirar los directorios de `Admin/mediciones/pipeline/`).
Terminado cuando: un medidor que no imprime nada no da «idéntico» (da «vacío» y no cierra sin explicación), con su caso en probar-medir-pipeline.mjs, y ningún medidor de la tabla está vacío hoy.

Verificar: manual

### 16. 422 · (Pipeline): costo-personal: la unidad del rótulo de la fila («Total staff costs (£m)») manda sobre la del documento; y la nota de una filial no es el personal del club

Caso: Fulham 2023. Con el cambio del 351, `caja-deuda --personal` (ensayo, `medir pipeline --base 385b905c0b^`) deja de confirmar el personal ya cargado de 2023 (139,064): compara con el documento siguiente y toma la fila «Total staff costs (£m) 154.8 139.1» de su cuadro de indicadores como si fuera £000 (154,8 × 0,001 = 0,1548) en vez de £m. No cambia ningún dato publicado (el valor cargado queda), pero (1) no se puede reconfirmar 2023, (2) 2024 y 2025 no se cargan aunque la nota (Staff costs 154,754 / 139,064) los tiene, porque se descarta el 0,1548 por «0,1 % de los ingresos» y no se mira la nota. Arreglo: la unidad que dice el rótulo de la fila («(£m)», «(€m)», «£000») manda sobre la del documento, como ya pasa con el encabezado de la tabla (`escalaDeEncabezado`); y un candidato descartado por tamaño no debe dejar al club sin mirar la nota. Además, del hallazgo del 351: un `full-accounts` de una filial (Aston Villa Football Club Limited 2019-20) trae una nota de personal de 8,3 M£ (3 directores y personal comercial) y el plantel está en otra entidad del grupo; esa nota no es el costo de personal del club, y el conversor y `caja-deuda --personal` tienen que distinguir la nota de la entidad de la del grupo (el 15 % de los ingresos ya lo ataja). Medir con `caja-deuda --personal --medir` y `personal-ensayos` (con Jev real, `--ejecutar`).
Terminado cuando: Fulham 2023 vuelve a confirmarse (139,064), Fulham 2024 y 2025 salen de la nota (154,754 y la de 2025) o quedan con motivo, y el medidor de personal da 0 pérdidas de valores aceptados.

Verificar: manual

### 17. 421 · (Pipeline): defectos de script que dejó el 356: Morecambe «(n )», Ross County 2025 y perimetro-senales en group accounts con s408

Tres defectos de script que frenaron cargas del 356 (`Admin/registros/frenados-por-script.jsonl`):
- Morecambe: el importe «(n )» con espacio antes del paréntesis se lee en unidades.
- Ross County 2025: el aviso «registro no se actualizó, correr el lote» no cambia al correrlo.
- `perimetro-senales.mjs` votó «individual» en group accounts con s408 (Salford, Falkirk, Exeter; corregidos a mano con ajuste).
Cada uno: ver 2-3 casos reales, un escalón con su veredicto (`fos patron`) y medido antes y después (`fos medir pipeline`).
Terminado cuando: los tres dan lo correcto sin ajuste a mano (Morecambe lee «(n )» en millones, el aviso de Ross County cambia al correr el lote y perimetro-senales vota consolidado en esos group accounts), con su medición sin pérdidas.

Verificar: manual

### 18. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
CORRIDO a medias (2026-10-23, sesión sola): `audit.js` P0 0 · P1 0 · P2 16 · P3 132; `?audit=1` `auditAll()`: 331 clubes, 3.823 chequeos OK, 0 que no cierran, 0 avisos de tipo de cambio; `generar-data --check`, `estimar --check`, `generate-club-pages --check`, `generate-club-index --check`, `generate-rankings --check` y `generate-fuentes-page --check`: todos al día. Falta la skill `auditoria-finance-of-sports` (un eje) y decidir qué hacer con los P2 y P3 (el 370), que es lo que pide el punto.

Verificar: manual

### 19. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 20. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

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

### 21. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

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

### 22. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

HOY (2026-10-23): el aviso `ejercicio-sin-rastro` de este club está silenciado en `tools/audit-ignore.json` (2023-2025 sin depósito; 2022 con el balance en mano) para llevar el P3 a cero; lo que falta es la decisión de 2022, así que la línea de verificación pasó a manual.
Verificar: manual

### 23. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso es `node tools/fos.mjs etiquetas` (369, hecho). Este punto es lo que queda después de que corrió. La lista corta de 24 etiquetas ya está decidida por Guido (2026-10-23). Falta la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 24. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

## E. Después de A a D (Guido, 2026-10-20)

### 25. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual

### 26. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas (viene del 356)

Viene del 356 (el conversor ya está: celdas por coordenadas como tablas, medido sobre 317 XHTML). Qué hay hecho: los 55 `.md` de Hibernian, Bolton, Bristol Rovers, Cambridge, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere, Blackpool y Reading están reconvertidos con tablas (costo 0), y Bolton 2024-25 corrió de punta a punta (`lote.mjs --rehacer --ejecutar --pagar-ia-xhtml`: US$ 0,15, verificó, 2 dudas ordinarias en la cola). Presupuesto del 356: US$ 35 de Guido, gastados ~2 (`node tools/gasto.mjs`), con ensayo gratis antes de cada corrida.
- Los lotes: `Admin/lotes/lote-143.txt` (13 documentos de Inglaterra, el año más reciente de cada club; ensayo ~US$ 0,4 por documento con IA) y Hibernian en un lote de Escocia (un país por lote). Los `Generados/` de esos clubes eran de cuando el `.md` no tenía tablas (`sin_estado: true`); desde el 419 el lote lo ve solo («el .md cambió desde localizar … se rehace») y el ensayo cotiza US$ 4,85 para los 13 (Bolton ya está hecho). Los 2 documentos de OH Leuven 2017 y 2022 (Bélgica) también quedan «viejos» por su `.md` cambiado. Después las altas como en los lotes 140 y 141: cola contestada por subagentes Sonnet, ficha de alta, estadio y sponsor, perímetros (group accounts: perímetro consolidado con la regla 1 de CONVENCIONES-DATOS), gestiones.
- Los otros años de esos clubes (17 años esperaban el conversor) y los años pagables de las altas hechas (~US$ 8): Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan 2022-23, con las respuestas del lote anterior como precedente.
- Falkirk 2025: listo salvo la liga. Scottish Championship no existe en `data/leagues.js`: crearla (`club-sourcing` 0.4) y cargar con su publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; CONVENCIONES-DATOS).
- De las 10 altas del 356: las líneas del auditor (`node tools/auditoria.mjs --pendientes`), los escudos sin mirar (`escudoOk` null) y las gestiones (presidentes, en la cola; no frenan).
- Criterio a escribir en CONVENCIONES-DATOS (votación o precedente): la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se contestó «no»).
- La nota de sourcing de Fleetwood dice «Ejercicios útiles: Jaymel 2015/16-2023/24», y es falso (fútbol 42 % en 2021-22); lo único útil es Fleetwood Wanderers 2020-21. Fleetwood/Jaymel 2022-25 está descartado.
- Daneses que esperan (se cruza con el 413): los XHTML de SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 (−130,578 M) y el PSE de København 2021-25, y los 9 de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg).
- Ya cargados en el 356 (Onboarding 9, lotes 140 y 141): AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025 y Wigan Athletic 2024.
Terminado cuando: cada club británico con iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo, y Scottish Championship existe en data/leagues.js.

Verificar: contiene data/leagues.js | Scottish Championship
Verificar: contiene Admin/CONVENCIONES-DATOS.md | Trust
Verificar: manual

### 27. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 28. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

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

### 29. 335 · mails a clubes

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

### 30. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual
