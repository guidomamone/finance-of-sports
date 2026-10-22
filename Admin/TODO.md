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

### 1. 366 · (Pipeline): meter en el pipeline las tools que una sesión todavía tiene que acordarse de correr

TOOLS SUELTAS (Guido, 2026-10-22: «que tools se pueden meter en pipeline así no hay tantas tools dando vuelta»). Medido con el inventario de `tools/` (150 archivos, 2,9 MB; 13 se corren a mano, el resto son módulos que otra tool llama). Lo que una sesión sigue teniendo que recordar, de más a menos: (a) `segunda-fuente-liga.mjs`: la corre una sesión después de asignar una liga; sale de la cadena de `alta-club.mjs` si se arma, por país, la tabla de URLs de RSSSF (patrón `tables<letra>/<código><año>.html`, sacable de las fuentes ya guardadas en `tools/club-league-reference/`) y se mantiene la compuerta de las ligas en grupos; (b) las herramientas de medición (`medir-cargar`, `medir-verificar`, `medir-ixbrl-consolidado`, `lotes-prueba`, `prueba-escribir`) en un solo `medir.mjs <qué>`; (c) los adaptadores de sourcing (`wayback-*`, `exa-search`, `reddit-archive-search`, `twitterapiio-search`, `listar-brreg`, `fca-mutuals-fetch`, `companies-house-fetch`) en un `buscar-fuente.mjs <canal>`; (d) una sola puerta, `tools/fos.mjs <comando>`, que lista los comandos con una línea cada uno, para que el índice de tools lo arme la tool y no una sesión.
Terminado cuando: (a) `alta-club.mjs` deja la segunda fuente de la liga sin que una sesión la corra (o la línea de HALLAZGOS dice por qué no), (b) y (c) están hechos con los comandos viejos como alias que avisan, y `node tools/fos.mjs` lista cada comando documentado en `Admin/PIPELINE.md`.

Verificar: manual

### 2. 351 · (Onboarding, después del 345): sueldos de 22 clubes británicos y de Instituto 2025, hoy adentro de una sola línea

SUELDOS ADENTRO DE UNA SOLA LÍNEA (Auditora 4, 3ª corrida de P2 y P3, 2026-10-21). 12 británicos (Aston Villa, Brentford, Brighton,
Celtic, Fulham, Leeds, Liverpool, Newcastle, Nottingham Forest, Sunderland, West Ham, Wolves; 47 club-años con el estado por función),
los 10 británicos nuevos del 356 (sus sueldos entraron con `incluye wages_squad --posible` en `other_expenses`; se parten con
`caja-deuda --personal`) e Instituto 2025 (anexo de remuneraciones cargado entero en gastos generales). Cómo:
`Admin/Archive/sesion-ligas-2026-10-21.md`, tercera corrida. Corrige datos publicados: trailer `Corrige:`.

Verificar: manual

### 3. 350 · (Auditora, al final de A): la tabla de cuántas veces queda en 0 cada fila del Formato simplificado; recién con eso Guido decide subsidios y donaciones y el proceso de revisión

CATEGORÍA PARA SUBSIDIOS Y DONACIONES (Auditora 4, 2ª corrida de P2 y P3, 2026-10-21; Guido: «dejalo como to do»). Buena parte de los
~130 `catchall-dominante` son subsidios, donaciones y aportes (Subsídios, Επιχορηγήσεις, Целевые взносы; ligas bajas de Grecia, Rusia y
Portugal) que la taxonomía no tiene dónde poner. Es una votación de criterio (`votacion-de-criterios`); por la regla vigente no recategoriza
lo ya cargado.
Además (Guido, 2026-10-21): revisar si la categoría de educación tiene sentido (se abrió por Vélez y parece aplicar a pocos clubes
argentinos), y antes de votar, un relevamiento exhaustivo de qué categorías y subcategorías de la taxonomía están en vano hoy: cuántos
clubes y años usan cada una, con qué monto, y cuáles casi nadie usa.
Y (Guido, 2026-10-21): una skill o un proceso para revisar categorías, «así no es un gut feeling»: cuándo se revisa la taxonomía, con
qué medición (uso por categoría, monto, deportes y países), qué umbral abre o cierra una categoría y cómo se vota. Texto de skill para el
ok de Guido.
Hecho (Auditora 5): medición, votación 3 a 0 por `grants_donations` y texto del proceso en `Admin/propuestas/350-revision-categorias.md`.
Guido (2026-10-21): todavía no se crea la categoría. Antes, al terminar el resto del bloque A, una tabla con cada fila del Formato
simplificado y en cuántos club-años de cuántos queda en 0 (por deporte y por país). Ninguna fila se oculta en cero: el formato es
siempre igual (la propuesta de `hideIfZero` para la fila nueva y para Educación queda descartada).

Verificar: manual

### 4. 257 · (Orden 1): los dos cabos sueltos que quedan (perfil-en-cola, Tolima)

LO QUE QUEDÓ SIN DUEÑO DEL RELEVAMIENTO DE SKILLS (une el 330). Aplicado: las cinco skills nuevas, las partes 1, 3 y 7 de
`Admin/propuestas/257-skills.md`, la memoria vaciada y el candado de skills del hook. Falta: (a) que `perfil-en-cola` de `cargar.mjs`
nunca frene (Pipeline); (b) la duda de Deportes Tolima, `dudas-por-club.md:201`, que frena su carga. Los descartes 314 y 298 en
`Admin/HALLAZGOS-pipeline.md` y el párrafo de Chrome headless ya se hicieron (Versión 931).

Verificar: manual

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

## E. Después de A a D (Guido, 2026-10-20)

### 13. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 14. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

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

### 15. 335 · mails a clubes

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

### 16. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual

### 17. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual
