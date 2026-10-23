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
Terminado cuando: cada tool de la lista pasa a tener menos de 40 KB o su motivo sigue escrito; cada corte tiene su línea de medición idéntica en el registro.

Verificar: manual

### 2. 401 · (Pipeline): una prueba que escribe de verdad en cada tool que escribe, porque un ensayo no pasa por los imports que se rompen

La partición de `cargar.mjs` (375) dejó sin re-exportar `snapshot`, `revertir` y `runNode`: `publicar`, `caja-deuda --escribir`, `costo-personal`, `dentro-de-otro`, `worktree` y `gestiones-tanda` fallaron un día entero sin que `medir pipeline` lo viera, porque sus medidores corren en ensayo y el import dinámico solo se evalúa al escribir. Hoy hay un chequeo estático (`fos imports`, P1 `import-sin-export`) que atrapa ESA clase, pero no otras (una ruta rota, un argumento que cambió, un archivo que la tool partida ya no escribe). `node tools/prueba-escribir.mjs` ya escribe de verdad un año con fuente nueva en un worktree descartable (solo `cargar.mjs`).
Propuesta: extenderla a cada tool que escribe datos o registros (`caja-deuda --escribir`, `costo-personal`/`fos personal --escribir`, `recategorizar-etiquetas --escribir`, `ajustes --agregar`, `publicar`, `generar-correcciones`, `alta-club --escribir`, `fetch-fx-reference` sobre una copia): una lista en `tools/pipeline-tools.json` de qué tools escriben y con qué comando se prueban, cada una sobre una copia del repo en un worktree, comparando archivo por archivo con lo esperado. Que el medidor las corra cuando cambia una de ellas (o un módulo que importa) y que `medir pipeline` se niegue a dar «idéntico» si una tool que escribe no tiene su prueba.
HECHO (2026-10-23): `tools/prueba-escribir.mjs` escribe de verdad, en el mismo worktree descartable, `caja-deuda --personal --escribir` y `--partir --escribir`, `recategorizar-etiquetas --escribir`, `generar-correcciones`, `ajustes --agregar` y `publicar` (sobre los datos de HEAD, idempotentes; exige salir con 0 y ningún error de código en la salida). Quitando el re-export de `cargar.mjs` la prueba falla (y antes el chequeo estático). Medidor nuevo `escribir` en `tools/pipeline-tools.json`, asignado a `cargar.mjs`, `caja-deuda.mjs`, `publicar.mjs` y `recategorizar-etiquetas.mjs` (medido de punta a punta: idéntico; suma unos 4 minutos a una medición). QUEDA: las que escriben y no tienen prueba (`dentro-de-otro.mjs --escribir`, `gestiones-tanda.mjs`, `alta-club.mjs --escribir`, `fetch-fx-reference.mjs` sobre una copia, `worktree.mjs`), la lista de «tools que escriben» en `pipeline-tools.json` para que `medir pipeline` se niegue a dar «idéntico» si una de ellas no tiene su prueba, y que la prueba compare lo escrito con lo esperado (hoy las tres primeras comprueban que no cambian ningún JSON de club; las demás, solo que no se rompan). `tools/con-worktree.mjs` (`conWorktree(fn)`) arma el worktree: una prueba nueva es solo el escenario.
Terminado cuando: cada tool que escribe tiene su prueba de escritura en un worktree, `medir pipeline` la corre al cambiarla, y la rotura de la 375 (quitar el re-export) la atrapa una prueba y no solo el chequeo estático.

Verificar: manual

### 3. 404 · (Pipeline): las mediciones de personal y de deuda con Jev no se invalidan cuando cambia la lista de candidatos (hoy muestran pérdidas falsas)

La caché de Jev (`Generados/_cache/jev-personal.jsonl`, y la de deuda y caja) se indexa por el texto de la pregunta, que lleva la lista de filas candidatas. Si un cambio al código agrega o quita candidatos (el 351 sumó filas «Staff costs» y totales por segmento), toda pregunta cambia de clave, el ensayo de `medir pipeline` no puede preguntarle a Jev y muestra como «PIERDE» 14 valores que con Jev real (`--ejecutar`) vuelven idénticos (Leeds, Liverpool, Forest, Chelsea, Volos, Panetolikos). El medidor pide una «razón escrita» por algo que no es una pérdida real, y quien lo mide puede perder tiempo, o peor, aceptarlo sin mirar.
Propuesta: (1) que el medidor, cuando la caché no tiene la pregunta, la pida con `--ejecutar` en la medición y la deje caliente (costo: centavos, medido por la propia caché), y marque en el informe «preguntado a Jev: N»; (2) o que la clave de la caché sea la fila elegida y no la lista, con una verificación de que la fila elegida sigue entre los candidatos; (3) que el informe distinga «pierde por caché» de «pierde por la lógica» (si con Jev real vuelve igual, no pide razón). Elegir una con una medición de cuántas preguntas cambian de clave por un cambio típico.
HECHO (2026-10-23): `medir-personal-ensayos.mjs` corre `--personal` y `--partir` con `--ejecutar` (la pregunta a Jev que no está en la caché se hace de verdad, centavos, y queda en la caché): opción (1). QUEDA: probarlo con el próximo cambio que modifique la lista de candidatos (esperado: 0 «PIERDE» falsos) y, si sigue habiendo ruido, la opción (3) en el informe (`medir-pipeline.mjs`, resumen `personal-ensayos`: distinguir «pierde porque no hay respuesta en la caché» de «pierde por la lógica»). El medidor `caja-deuda-personal` (`--medir`) usa la misma caché: mirarlo igual.
Terminado cuando: un cambio a `costo-personal.mjs` o `caja-deuda.mjs` que cambie la lista de candidatos no produce «PIERDE» falsos en `medir pipeline`, medido con el mismo cambio del 351 (esperado: 0 pérdidas, 6 valores nuevos).

Verificar: manual

### 4. 257 · (Orden 1): Deportes Tolima, sin cargar por una duda sobre el resultado de 2025

Lo que quedaba de esta línea (la skill `perfil-en-cola` que frenaba la carga) ya está: `cargar.mjs` nunca frena por eso (se avisa y la pregunta queda en la cola). Queda un solo caso: **Deportes Tolima no está en el sitio**
(no hay JSON de Tolima en la carpeta de Colombia de data) aunque `Clubes/Colombia/Deportes Tolima/` tiene los estados financieros de 2016 a 2025. La duda (`Admin/dudas-por-club.md`, sección Deportes Tolima): el documento de 2025 trae solo las
NOTAS, y el resultado neto de 2025 da tres cifras que no concilian (SIIS $359 M; la tabla histórica de la Nota 18(3), $914 M; sumando las notas 19 a 23, ~$3.185 M). Los ingresos de 2025 sí cierran exacto ($49.330,876 M).
Cómo se resuelve sin preguntarle al club, porque es público: bajar de SIIS (siis.ia.supersociedades.gov.co, NIT 890700863) otro radicado de 2025 que traiga el Estado de Resultado Integral primario (`club-sourcing`); y
mientras tanto cargar 2016 a 2024 (el año 2025 sin `officialPAT` queda con el aviso `balance-sin-pat`, que no frena). Falta el dictamen del revisor fiscal de 2024 (`dictamen-revisor-fiscal-2024.pdf` es idéntico al de 2025, `Admin/sourcing/Colombia/_notas-generales.md`).
Decisión de Guido (2026-10-22): no es necesario resolver el resultado de 2025 para cargar; se cargan los años con el pipeline y 2025 queda sin `officialPAT` (aviso `balance-sin-pat`, no frena). La duda se anota en la nota de sourcing del club y se retoma. Se hace después del reset de tokens (≈10 documentos ya transcriptos; el costo es la categorización).
Terminado cuando: Tolima está cargado (los años que el documento permite) y la duda de `dudas-por-club.md` se borró o quedó respondida con la fuente.

Verificar: existe data/co/deportestolima-co.json

### 5. 356 · (Onboarding carga los británicos en iXBRL; Pipeline arregla el conversor XHTML y los defectos de script)

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

### 8. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
CORRIDO a medias (2026-10-23, sesión sola): `audit.js` P0 0 · P1 0 · P2 16 · P3 132; `?audit=1` `auditAll()`: 331 clubes, 3.823 chequeos OK, 0 que no cierran, 0 avisos de tipo de cambio; `generar-data --check`, `estimar --check`, `generate-club-pages --check`, `generate-club-index --check`, `generate-rankings --check` y `generate-fuentes-page --check`: todos al día. Falta la skill `auditoria-finance-of-sports` (un eje) y decidir qué hacer con los P2 y P3 (el 370), que es lo que pide el punto.

Verificar: manual

### 9. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 10. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

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

### 11. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

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

### 12. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

Verificar: audit ejercicio-sin-rastro "liersekempenzonen-be" = 0

### 13. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso es `node tools/fos.mjs etiquetas` (369, hecho). Este punto es lo que queda después de que corrió. La lista corta de 24 etiquetas ya está decidida por Guido (2026-10-23). Falta la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 14. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

## E. Después de A a D (Guido, 2026-10-20)

### 15. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual

### 16. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 17. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

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

### 18. 335 · mails a clubes

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

### 19. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual
