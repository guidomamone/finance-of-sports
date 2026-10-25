<!-- md: CHANGELOG archivado, versiones 1022 a 1043 | leer: solo por grep de una palabra o de una tool (fos changelog historial <tool>) -->
# Changelog archivado, versiones 1022 a 1043

Salieron de `Admin/CHANGELOG.md` con `node tools/fos.mjs changelog archivar`. Las rutas son las de su época.

---

## Versión 1043 — votacion-nueva.mjs: el archivo del caso de una votación desde una plantilla [438 · votacion-nueva.mjs, probar-votacion-nueva.mjs]

- `node tools/fos.mjs votacion nueva --id --slug --titulo --opcion "A=texto|monto" … [--hechos f.md] [--total n] [--club id] [--palabras "a,b"] [--escribir]` arma `Admin/mediciones/<id>-votacion-<slug>.md` con la marca, Conclusión y Destino, el cuánto mueve de la skill (sección 4: la diferencia entre opciones sobre el total, 1 % o menos no se vota), la lista fija de qué abrir (renglones de `CONVENCIONES-DATOS.md` por palabra, JSON del club y de su país) y el formato JSON del voto con `no_abri`. Ensayo por defecto; no pisa un archivo.
- Queda del 438: la verificación de citas por script, el voto en JSON contado por una tool, el votante único barato y la comparación contra 3 votaciones anteriores.
- Medición: tools de orden, fuera del pipeline: `probar-votacion-nueva.mjs` (8 casos ok) y `medir pipeline` sin diferencias. Sin revisión independiente.

## Versión 1042 — las tools que escriben registros se niegan mientras medir pipeline mide [443 · candado-medicion.mjs, estado.mjs, inventario-transcripciones.mjs, publicar.mjs, cola.mjs, ajustes.mjs, lote.mjs, medir-pipeline.mjs, fos.mjs, probar-medir-pipeline.mjs]

- `tools/candado-medicion.mjs` (`negarSiSeMide`): con `Admin/mediciones/pipeline/_corriendo` y su pid vivo, `estado`, `inventario-transcripciones`, `publicar` (sin `--ensayo`), `cola --responder/--corregir-categoria`, `ajustes --agregar/--anular` y `lote --ejecutar` salen con 3 y dicen el pid. `--ignorar-medicion` es la salida de emergencia; `medir-pipeline` marca a sus hijos con `FOS_MIDIENDO=1` y esos no se niegan.
- `fos --check` comprueba que esas tools sigan llamándolo y lista (informativo, 58) las que escriben en `Admin/registros` sin chequearlo; queda `cargar.mjs --escribir` y `patron/decision/silenciar` sin candado. `probar-medir-pipeline.mjs`: 6 casos nuevos (se niega, no escribe, modo sin escritura, emergencia, hijo, pid muerto).
- Verificado a mano (443): probar-medir-pipeline.mjs: la tool se niega con el candado vivo (6 casos nuevos ok); fos --check lista las 58 escritoras de registros sin chequearlo y verifica las 6 que lo llaman
- Medición: `medir pipeline` (9 medidores, hasta el lote completo): idéntico; la primera corrida dio `escribir` vacío por `tool-sin-clasificar` de las tools nuevas, ya clasificadas. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1041 — aviso de cambio de formato del balance, y fos cerrar ya no borra el punto a medias [446 · cambio-formato.js, cargar-ejercicio.mjs, audit-chequeos-3.js, audit.js, cerrar.mjs]

- `tools/cambio-formato.js`: ingresos de UNA línea `lump_football_operations` contra más de una (o al revés) respecto del año inmediatamente anterior cargado. `cargar.mjs` lo avisa en la propuesta con el texto sugerido de la `publicNote` (SønderjyskE 2025 lo dispara); `audit.js` da el P3 `cambio-de-formato-sin-nota` (hoy 23 club-años, punto 447).
- `fos cerrar --cerrar` borra el punto del TODO al FINAL y solo si ningún chequeo falló (antes lo borraba primero y repetir el comando daba «no existe el punto»); repetir sobre un punto ya cerrado sigue con los demás chequeos.
- Verificado a mano (446): cargar en ensayo sobre SønderjyskE 2025 (--reemplazar) imprime el aviso con el texto sugerido; audit.js da cambio-de-formato-sin-nota (23 club-años, punto 447); lote completo idéntico salvo ese aviso
- Medición: `medir pipeline` hasta el lote completo (1004 documentos; `audit`, `cargar`, `escribir`): idéntico salvo el aviso nuevo `cambio-de-formato-sin-nota`, explicado. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1040 — fos patron --revision y el P4 revision-propia-pendiente [436 · patron.mjs, probar-patron.mjs, audit.js, audit-chequeos-5.js]

- `patron --revision propia|auditora` anota el campo `revision` en `auditoria-proceso.jsonl`. `audit.js` da el P4 `revision-propia-pendiente` con los cambios `propia` que ninguna línea `auditora` posterior cubre (mismas tools); `revisionesPendientes` en `audit-chequeos-5.js`, acción «nada» en `audit-acciones.json`.
- `probar-patron.mjs`: 3 casos nuevos (queda en el registro, valor inválido, qué cubre una auditora posterior). Esta misma entrada es la primera `propia`: aparece en el P4 hasta que la Auditora la revise.
- Verificado a mano (436): patron --revision propia queda en el registro; audit.js da el P4 revision-propia-pendiente (aparece con la línea de este cambio); 3 casos nuevos en probar-patron.mjs, todos ok
- Medición: `medir pipeline` (audit, lote chico): idéntico, el aviso no dispara sin líneas `propia`. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1039 — fos patron --en-xhtml: el conjunto real de un cambio al lector de XHTML [439 · patron.mjs, probar-patron.mjs]

- `node tools/fos.mjs patron --en-xhtml "<regex>"` cuenta documentos y clubes sobre los `Clubes/**/*.xhtml` con el mismo umbral y el mismo veredicto; el registro anota el comando con `--en-xhtml`. Sobre el patrón del 413 (`top:[0-9.]+em`) cuenta hoy 18 documentos de 5 clubes.
- `probar-patron.mjs`: 4 casos nuevos (cuenta los `.xhtml` y no el `.md`, GENERAL y anotado, RECHAZADA bajo el umbral, sin regex).
- Verificado a mano (439): patron --en-xhtml cuenta sobre los .xhtml y da el veredicto; 4 casos nuevos en probar-patron.mjs (todos ok); sobre el patron del 413 cuenta 18 documentos de 5 clubes, no los 12 de 4 que dice el punto
- Medición: `patron.mjs` es una tool de orden (no del pipeline), así que `medir pipeline` no tiene nada que medir; la prueba da todos los casos ok.

## Versión 1038 — todo.mjs imprime el contexto del punto [442 · todo.mjs, probar-todo-contexto.mjs]

- `node tools/todo.mjs <id>` termina con «Contexto de este punto»: una ruta y una línea por cada propuesta, medición, votación (`auditoria-proceso.jsonl`), línea de `mediciones-pipeline.jsonl`, entrada del CHANGELOG con `[id]`, lista de lote y commit que lo nombra; `--sin-contexto` lo omite. Los importes parecidos (`1.420`) y «Versión 420» no cuentan.
- `tools/probar-todo-contexto.mjs` (repo de juguete, 7 casos) registrada como `fos probar todo-contexto`. Queda sin hacer: el aviso del hook `session-start` cuando el primer mensaje nombra un id.
- Verificado a mano (442): `todo.mjs 420` termina con su CHANGELOG y 7 commits; la prueba da todos los casos ok.
- Medición: `medir pipeline` (audit, lote chico): idéntico. Veredicto de infraestructura (`patron --sin-documentos`). Sin revisión independiente.

## Versión 1037 — fos indefinidos: eslint no-undef en el repo, y el primer nombre sin definir real [433 · indefinidos.mjs, eslint.config.mjs, audit.js, audit-chequeos-5.js, resolver-inventario.mjs, resolver-inventario-motores.mjs]

- `eslint` 10.13.0 y `globals` 17.13.0 como devDependencies de `tools/package.json` (17 MB en `tools/node_modules`, gitignoreado; `cd tools && npm install` en una carpeta nueva). `tools/eslint.config.mjs` con solo `no-undef`; `node tools/fos.mjs indefinidos [archivo…]` (1,5 s sobre 243 archivos); aviso P3 `nombre-sin-definir` en `audit.js` (no aparece sin eslint instalado).
- El primer pase encontró un error real: `resolver-inventario.mjs` usaba `BIG_CHUNK` (en un log del camino de documentos largos) sin importarlo, y `resolver-inventario-motores.mjs` no lo exportaba: un `ReferenceError` al procesar un documento de más de 40 páginas. Ahora se exporta y se importa.
- Verificado a mano (433): node tools/fos.mjs indefinidos: ningún nombre sin definir en 243 archivos; con un archivo de prueba con un nombre falso da exit 1 y audit.js muestra el P3; medir pipeline idéntico
- Medición: `medir pipeline` (audit y lote-ensayo, lote completo de 992 documentos): idéntico. Veredicto de infraestructura (`patron --sin-documentos`). Sección 7 recorrida por la misma sesión (aviso P3 que no frena nada): sin revisión independiente.

## Versión 1036 — SønderjyskE 2023 y 2025 cargados; votación del formato completo contra reducido [413]

- 2023 (15 meses al 30/09/2023, liga 1. División del día del cierre) y 2025 (formato completo, Superliga) cargados con su verificación; la cola se contestó con cita. Votación 3 a 0 (`Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`): un club que pasa del balance reducido (§ 32) al completo carga ese año completo y los anteriores no se rehacen con el comparativo; regla nueva en `Admin/CONVENCIONES-DATOS.md` y línea en `Admin/registros/auditoria-proceso.jsonl`. El 2025 lleva una `publicNote` sobre el cambio de formato. Gasto total del punto: unos US$ 0,30.
- Verificado a mano (413): audit.js no da nada para sonderjyske-dk; 2023 y 2025 en data/dk/sonderjyske-dk.json con verificación y publicNote; votación 3 a 0 registrada
- Medición: no cambia ninguna tool en este paso (las tres anteriores, `xhtml-aarsrapport`, `periodo` y la regla de transición, están en sus entradas); `node tools/audit.js` ya no da `ejercicio-sin-rastro` para `sonderjyske-dk`.

## Versión 1035 — periodo.mjs: la fecha etiquetada en danés y el inicio sin caer al contexto [413 · periodo.mjs]

- El registro danés etiqueta el período del XHTML como «1. OKTOBER 2024» / «30. SEPTEMBER 2025» (`ixt:date-day-monthname-year-da`); `fechaIxbrl` solo leía meses en inglés sin punto tras el día, así que el inicio caía a la fecha del contexto (= el cierre) y SønderjyskE 2025 salía «otro, 0 meses» y no se cargaba. Ahora lee los meses daneses y el punto, y el inicio ya no cae al contexto (el contexto vale para el cierre, no para el inicio).
- Medición: `medir pipeline` (verificar, lote completo de 991 documentos): idéntico. SønderjyskE 2025 pasa a «anual, 2024-10-01 a 2025-09-30». Veredicto general (patrón: fechas con mes danés, proxy de los informes daneses).

## Versión 1034 — xhtml-aarsrapport: las celdas por coordenadas también en em (SønderjyskE 2025) [413 · xhtml-aarsrapport.mjs]

- Los informes que maqueta ParsePort (AGF, AaB, FC København PSE, SønderjyskE) dan `top`/`left` en `em`; el conversor solo reconocía `pt` y `px`, así que el estado de resultados salía con una cifra por línea, sin tabla, y localizar contestaba «sin estado de resultados». Ahora `posicionAbs` acepta `em` (1 em = 16 px) y, como esas páginas no traen contenedor con altura, una celda mucho más arriba que las ya juntas abre página nueva. SønderjyskE 2025: «| Nettoomsætning | 66.288.538 | 55.909.616 |».
- Medición: `medir pipeline` (medidor xhtml, todos los .xhtml de Clubes/): 12 documentos cambian, los 12 de em (AGF 4, AaB 3, København PSE 4, SønderjyskE 2025: líneas de 5343 a 2493 en AGF 2022, páginas ubicadas 98 % o más como antes); el resto, idéntico. Veredicto general (patrón: una cifra suelta por línea, 270 documentos de 82 clubes; el conjunto realmente afectado son esos 12). Los .md ya convertidos de los otros 11 no se rehicieron.

## Versión 1033 — costo-personal: la unidad del rótulo manda y la cifra exacta de la nota reemplaza a la redondeada [422 · costo-personal.mjs]

- Tres cambios en `costo-personal.mjs`: (1) `escalaDeRotulo`: la unidad entre paréntesis del rótulo de la fila («Total staff costs (£m)») manda sobre la del encabezado y la del documento; (2) `cifrasSeparadas`: «Staff costs 154,754 139,064» (dos importes pegados por el espacio) se lee como dos cifras, solo en las filas de personal; (3) `afinada`: si Jev elige la cifra redondeada de un cuadro de indicadores en £m y el documento tiene la fila de la nota «Staff costs» dentro del redondeo (±0,05 M o 1 %), se usa la exacta. Un arreglo en `filasDelMd` se descartó: cambiaba caja y deuda en 4 casos. La nota de una filial sigue atajada por el 15 % de ingresos.
- Verificado a mano (422): caja-deuda --personal --club fulham-gb: 2023 139.064 reconfirmado, 2024 154.754 y 2025 166.507 desde la nota; medir pipeline: 0 valores aceptados que cambian o se pierden
- Medición: `medir pipeline` (caja-deuda, caja-deuda-personal, audit, escribir idénticos; personal-ensayos: aceptados idénticos 156, que cambian 0, que se pierden 0, 20 nuevos validados por el vecino); Fulham 2023 se reconfirma (139,064) y 2024 y 2025 salen de la nota (154,754 y 166,507). Veredicto general (7 documentos de 2 clubes). Sección 7 recorrida por la misma sesión (no frena nada; un valor malo lo atrapa el vecino y el 15 %; lo cargado no cambia): sin revisión independiente.

## Versión 1032 — perímetro: la madre que no presenta su estado (s408) deja el del grupo [421 · perimetro-senales-a3.mjs]

- `proponer()`: si no hay tabla etiquetada «consolidado» ni «individual» y el documento dice que la madre no presenta su propio estado de resultados (Companies Act 2006, s408, con el nombre del estado a 300 caracteres), el paso A da `solo-consolidado` (Regla de perímetro 1 de `CONVENCIONES-DATOS.md`, antes aplicada a mano con un ajuste). Tercera y última parte del 421.
- Verificado a mano (421): Morecambe 2024-25 lee (4,892,287 ) en millones (medido en el lote completo); el aviso de Ross County dice sin-rubros; proponer() sobre los 104 .md con s408: Falkirk, Salford y Exeter pasan a consolidado, medido antes/después
- Medición: `proponer()` sobre los 104 .md con «section 408», antes y después: cambian 26, todos group accounts (Falkirk, Salford 2021-25, Exeter, Tranmere, Plymouth, Reading, Bolton, Blackpool, Chelsea, Aston Villa, Wolves, Brentford, Burnley, Mercedes) de solo-individual a solo-consolidado; el resto igual. `medir pipeline` (verificar y cargar, lote completo): idéntico, porque los ajustes manuales de perímetro mandan. Veredicto general (104 documentos). Sección 7 de la auditoría recorrida por la misma sesión (caso: Falkirk, Salford, Exeter; no frena; una mala propuesta la atrapa el tie-out; lo cargado no cambia; se corrige con un ajuste `perimetro`): sin revisión independiente.

## Versión 1031 — cargar.mjs: el aviso dice «sin-rubros» en vez de «correr el lote» [421 · cargar.mjs]

- Ross County 2024-25: el lote ya había corrido y el registro quedó `jev: sin-rubros` (4 rubros, menos de 5, y las sumas no cerraron contra el resultado impreso), pero `porQueNoListo` seguía diciendo «el registro no se actualizó: correr el lote». Ahora, si el registro dice `sin-rubros`, lo dice con la cantidad de rubros y manda a revisar las filas. Segunda de las tres partes del 421.
- Medición: lote completo (990 documentos), medidores cargar, audit y escribir: idéntico. Veredicto: `patron --sin-documentos` (solo el texto de un aviso).

## Versión 1030 — parseNumber lee «(4,892,287 )» en miles, no en unidades [421 · datos-sitio.mjs]

- `parseNumber` recorta el contenido entre paréntesis: «(4,892,287 )» (espacio antes del cierre, como lo deja el XHTML) tomaba la coma de miles por decimal y daba 4,89 en vez de 4.892.287. Patrón: 5 documentos de 4 clubes (Morecambe, Gent, AC Milan, Sport Recife). Primera de las tres partes del 421.
- Medición: lote completo (990 documentos), medidores cargar, audit, escribir, verificar, lote-ensayo y alta: idéntico salvo Morecambe 2024-25, que pasa de COLA (gastos 0,000914 M) a cerrar con el resultado impreso (gastos 5,800961 M, resultado −1,02345 M). Veredicto general.

## Versión 1029 — faltantes-liga no reescribe nada por un cambio de día [426 · faltantes-liga.mjs]

- Al escribir, compara cada `data/faltantes/*.js` y `pendientes.md` contra lo guardado sin la fecha («calculado»); si ninguno cambió ni sobra uno, no escribe y lo dice. Un cambio de día no mueve 66 archivos de `data/` ni dispara `asset-v-sin-subir`. `--check` ya comparaba con la fecha guardada. `FOS_HOY=AAAA-MM-DD` permite probar el cambio de día.
- Verificado a mano (426): FOS_HOY=2026-10-25 no escribe nada y --check da al día; con 2027-06-01 (entradas distintas) escribe los 66; audit idéntico
- Medición: `audit` lote chico idéntico; con `FOS_HOY=2026-10-25` no escribe nada y `--check` da «al día»; con `FOS_HOY=2027-06-01` (cambian entradas) sí escribe los 66 (restaurados). Veredicto: `patron --sin-documentos` (GENERAL, infraestructura).

## Versión 1028 — fos patron --sin-documentos: el veredicto de un cambio de infraestructura [435 · patron.mjs, probar-patron.mjs, pre-tool.mjs]

- `patron.mjs --cambio "…" --sin-documentos "por qué no lee documentos" --escribir` (en vez de `--patron`): el veredicto es GENERAL si el código agregado no nombra clubes, años ni rutas de `Clubes/` y la medición es idéntica o explicada; si nombra algo, RECHAZADA; sin medición, PENDIENTE. El registro lleva `sinDocumentos` (el motivo) y `patron: null`. El mensaje del hook de commit lo ofrece.
- Verificado a mano (435): probar patron 8 casos ok: sin documentos + sin nombres + medición idéntica da GENERAL; con un club o un año, RECHAZADA
- Medición: `probar patron` (8 casos ok, repo de juguete); `probar-pre-tool` sin cambios de casos; no es una tool del pipeline.

## Versión 1027 — medir pipeline: un medidor que no imprime nada no da «idéntico» [423 · medir-pipeline.mjs, probar-medir-pipeline.mjs]

- Si el ANTES y el DESPUÉS de un medidor no imprimen nada (o un solo renglón «0 archivos») ni escriben un archivo de salida, `medir-pipeline` dice `VACÍO: no midió nada`, corta el lote chico, sale con 1 y el resultado es «vacío: …» (el hook no lo acepta); con `--explicacion "por qué"` queda «1 diferencias, todas explicadas». El registro marca `vacio: true` en ese medidor.
- Verificado a mano (423): probar medir-pipeline 16 casos ok; salida de la última corrida de los 11 medidores de la tabla inspeccionada: ninguno vacío (xhtml 563 líneas)
- Medición: `probar medir-pipeline` 16 casos ok (2 nuevos); la última corrida anotada de cada medidor de la tabla (alta, audit, caja-deuda, caja-deuda-personal, cargar, contexto, escribir, lote-ensayo, personal-ensayos, verificar, xhtml) tiene salida: ninguno está vacío hoy.

## Versión 1026 — partir-fases: --envolver un script de nivel de módulo [430 · partir-fases.mjs, probar-partir-fases.mjs]

- La config acepta `envolver: { nombre, desde, comentario? }`: envuelve el flujo desde la línea `desde` en `[async ]function nombre() { … }`, la llama al final y calcula `funcStart`, `setupEnd` y `funcEnd`; `fases` y `--mapa` usan las líneas del original (la tool corre las del envoltorio). Va con `indentar: true`.
- Verificado a mano (430): envolver sobre git show 28881bd54e^:tools/lote.mjs da el mismo archivo (75465 bytes) que envolver-lote.mjs + partir-fases; probar-partir-fases ok
- Medición: sobre el `lote.mjs` de antes de la partición (`28881bd54e^`) el camino de un paso da el MISMO archivo, byte por byte (75 465 bytes), que el de dos pasos con el script del scratchpad; `probar-partir-fases` suma 3 casos de `envolver` (15 en total, todos ok).

## Versión 1025 — Prueba de partir-fases y lexico-js [429 · probar-partir-fases.mjs]

- `node tools/fos.mjs probar partir-fases`: parte una función de juguete en tres fases y compara con la entera (3 entradas). Casos: spread y `function*` como uso, `let` entre fases a `ctx.N`, plantilla multilínea con `indentar` (no se sangra), `await`, salida temprana, `--proxy`, `--mapa`, y los rechazos (corte en medio de un bloque, `return` sin `salidaTemprana`). Registrada en `fos-comandos.json` y `pipeline-tools.json`.
- Medición: 12 casos ok; no es una tool del pipeline.

## Versión 1024 — fos mapa: el fin de una función por sus llaves reales, y --corto [428 · mapa-codigo.mjs]

- Si la primera línea de una función deja un bloque abierto, `fos mapa` busca su cierre con la profundidad de llaves de `lexico-js.mjs` (strings, plantillas y regex incluidos) en vez de la sangría: un cuerpo sin sangría ya no da rangos de 3 a 8 líneas ni «?». `--corto` omite los tramos «·» de las funciones largas.
- Verificado a mano (428): mapa de los 239 archivos antes/después: solo cambian 3 rangos que estaban mal; prueba con cuerpo sin sangría da 2-9; --corto probado en faltantes-liga.mjs
- Medición: el mapa de los 239 archivos de `tools/` antes y después: 3 rangos cambian (`escribirPais` 55-64→55-66 en `estadio-sponsor.mjs`, `buildClubIndex` en `generate-club-index.js`, `texto` y `textoIndice` en `generate-sponsors.js`), los tres eran errores del cierre por columna 0 dentro de una plantilla; el resto idéntico, incluidos los 15 «?» de siempre; un archivo de prueba con cuerpo sin sangría da el rango 2-9 (antes 2-7).

## Versión 1023 — Comentarios de lote*.mjs: de 247 a 120 líneas, sin historia de lotes [427 · lote.mjs, lote-preparar.mjs, lote-leer.mjs, lote-final.mjs]

- `lote.mjs` 30→13 líneas de comentario, `lote-preparar.mjs` 73→36, `lote-leer.mjs` 91→45, `lote-final.mjs` 53→26: se dejó el porqué y la invariante de cada compuerta; se fueron las tablas de costo de la cabecera, los «Caso: lote N» / «to-do N» y los comentarios que repetían el código.
- Verificado a mano (427): lote*.mjs: 247 a 120 líneas de comentario, 0 coincidencias de Caso/lote N/to-do N/Versión N (grep), comparar-sin-comentarios --tools idéntico
- Medición: `comparar-sin-comentarios --tools`: mismo código en las 4 tools; `medir pipeline`: idéntico (solo comentarios).

## Versión 1022 — fos cerrar: un «Verificar: manual» se cierra con --verificado [425 · cerrar.mjs]

- `fos cerrar <id> --cerrar` ya no cierra un punto cuyo «Verificar:» es manual sin `--verificado "qué se miró y dónde quedó"`; con él cierra SIN `--forzar` (siguen todos los otros chequeos) y anota un bullet «Verificado a mano» en la entrada del CHANGELOG que lleva `[id]`, antes de su «Medición:». El ensayo muestra ✗ sin el motivo y ✓ con él. `--forzar` queda para lo descartado.
- Verificado a mano (425): ensayo sin motivo da ✗ y con motivo ✓ (2026-10-24, salida de fos cerrar 425); el cierre real de este punto usó el flag
- Medición: `fos medir pipeline`: ninguna tool del pipeline cambió (nada que medir); ensayos del comando sobre un punto manual con y sin `--verificado`; el cierre real del 425 lo usa.
