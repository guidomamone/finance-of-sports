# Cierre de la sesión onboarding (rama onboarding, arrancó 2026-10-18)

Se completa mientras se trabaja. No se tocan TODO, CHANGELOG ni ESTADO: la principal pasa esto a esos tres.

## Qué cambió (para CHANGELOG)
- `Admin/lotes/mistral-despues-del-merge.txt` recortada de 39 a 5 documentos (OH Leuven 2022, Boyacá Chicó 2020, Deportes Tolima 2025,
  Llaneros 2022, Viking Fotball AS 2025): de los 39, 25 ya estaban cargados en el sitio (`pipeline.mjs` no los toca), 5 ya tienen
  tablas (los rehízo el subagente) y Thun 2015-16 ya es de Mistral.

- 292: validadas las 326 transcripciones de subagentes de `subagentes-validar.txt` (todas `listo`, 1 con "reserva": Basel 2008
  pág. 32, cerrar con sum-check al cargar; US$ 2,53 contra ~3,47 del ensayo). Mistral: Boyacá Chicó 2020, Deportes Tolima 2025 (rehecho,
  839 filas de tabla) y Viking Fotball AS 2025 (transcripto nuevo) quedaron `listo` (US$ 0,64).

- Lotes 89 (Estonia) y 90 (Bélgica), altas: primera corrida US$ 1,21 (Bélgica) + Estonia; 0 años cargados en esa pasada. Cola de los
  dos lotes contestada por subagentes Sonnet (un club por vez, borradores en `Admin/registros/cola-borradores/lote-89-90/`), revisada
  por Claude contra el `.md` y con `verificar.mjs` (gratis) antes de aplicar: 9 de 10 documentos belgas y los de Estonia cierran con
  ajustes `fila` (signo de los costos financieros 65/66B, 76A "waarvan" afuera, residuo implícito de la Brutomarge de Lokeren-Temse
  50.197 como Dender EH) y respuestas en la cola. Estonia: `name` y `reportType` de 9 altas, perímetro consolidado del club en FCI
  Levadia, Kuressaare, Tallinna Kalev, Flora y Tartu (regla 2: las controladas son escuelas de fútbol y el estadio). RAAL La Louvière
  2024-25: el consolidado (ajuste `perimetro`). `tools/alta-club.mjs`: Estonia en la tabla PAISES.

- Categorías de los lotes 89 y 90 (117 casos de la cola, 4 subagentes Sonnet, un club por vez): 110 respuestas directas; el 630 belga
  partido con ajustes `fila` + `categoria` según la nota de activos fijos (pases a player_amortisation, bienes de uso a depreciation,
  goodwill a other_amortisation) en Beerschot, Lierse SK, Lommel SK, OH Leuven y Patro Eisden, como los belgas ya cargados; el 66A de
  Lommel partido (player_impairment 573.455 + exceptional_items 175.700); el pago de solidaridad UEFA de los estonios, competition_bonus
  en todos; ceros reales de TV (y estadio en Laagri) con cita; Lierse SK cierre 30-06-2025 (el 30-10-2025 es la asamblea). Colores de
  las 17 altas en `altas-revision.jsonl` (RAAL cambia de null a verde). Pregunta al club: Paide (becas y apoyos de la Lisa 10).

## Qué queda (para TODO)
- 292: validación y Mistral HECHOS (ver arriba). Falta: lotes de carga por país; OH Leuven 2022 y Llaneros 2022 (siguen sin tablas, ver
  mejoras de script); los 319 `.md` sin tablas. (Texto viejo del ensayo:
  que no anticipa el rehacer de los `listo` sin tablas: to-do 286), lotes de carga por país, los 319 `.md` sin tablas.
- 238, 285, 284, 283, 195, 165 c: sin empezar.


## Qué deja de ser cierto en ESTADO
- Estonia es un país del sitio: Flora, Harju JK Laagri, Kuressaare, Nõmme Kalju y Tartu Tammeka 2025 cargados (lote 89). Bélgica suma Lierse SK, Lokeren-Temse, Lommel SK, OH Leuven, Patro Eisden y RWDM 2025 (lote 90). FCI Levadia, Narva Trans, Paide, Tallinna Kalev y Beerschot 2025 también. Las ligas estonias, sin id (liga null). RAAL La Louvière 2025 también (consolidado; el individual 2024-25 a descartados con ok de Guido). 17 clubes nuevos en total; caja y deuda vacías hasta que entren los años vecinos (lotes 91-92).

## Pantalla (para fos-finanzas)
- Nada todavía.

## PDFs bajados acá (copiar a la principal con rsync)
- Ninguno.

## Mejoras de script vistas (para TODO: to-dos nuevos de fos-pipeline, sin aplicar; uno por letra, por impacto)
Vistas onboardeando Estonia y Bélgica (lotes 89-92). Cada una es un escalón a diseñar con el ok de Guido (skill club-or-year-onboarding, 3.b).

a) CIERRE FALSO EN verificar.mjs (lo más grave). La compuerta del resultado compara en valor absoluto y da "cierra (financiero
   invertido)" con una fila del lado o signo equivocado. Caso: Lierse Kempenzonen 2022, Brutomarge impresa −2.369 tomada como ingreso
   +2.369; habría cargado ingresos de 2.369 en vez de un gasto. Que "cierra" exija el signo, o que el cierre con signos invertidos baje a
   la cola.
b) ESQUEMA NBB BELGA EN verificar.mjs Y cargar.mjs. (1) Los costos financieros (Financiële kosten 65/66B y sus renglones) entran
   positivos y suman: 9 de 9 documentos del lote 90 necesitaron ajustes `fila` con signo. (2) Los renglones "(+)/(-)" impresos negativos
   (609, 631/4, 635/8) entran por su valor absoluto (Beerschot 631/4 −64.834; OH Leuven 631/4 y 635/8). (3) El "Waarvan: niet-recurrente
   bedrijfsopbrengsten" (76A) del esquema abreviado se suma aparte cuando ya está en la Brutomarge (Lierse SK 82.200, Patro Eisden).
   (4) verificar.mjs y la propuesta de cargar.mjs no leen igual el signo: Beerschot cerraba en verificar (lectura 5) y frenaba en la
   propuesta con el 631/4 en positivo. Una regla por el código NBB del renglón (65*, 66B, "(+)/(-)") alcanza para todo el país.
c) caja-deuda.mjs: (1) lee el CÓDIGO NBB "54/58" (Liquide middelen) como el importe 5.458: la misma caja 0,005458 en los escalones 1, 1b
   y 2 de Lierse SK, Lokeren-Temse, Lommel SK, Patro Eisden y RWDM; la columna de códigos no es un importe. (2) Un club con un solo año
   nunca pasa la compuerta "ningún año vecino" (8 clubes, 0 datos escritos): un primer año necesita otra compuerta (que el dato cuadre con
   el balance del propio documento). (3) Harju JK Laagri, Nõmme Kalju y Tartu Tammeka 2025: "sin páginas de balance" (localizar no guardó
   el balance).
d) perimetro-senales.mjs no ve los dos estados en los informes estonios (consolidado + "Lisa NN konsolideerimata tulemiaruanne") y fija
   "individual" para el club con los años de un solo estado: FCI Levadia, Kuressaare y Tallinna Kalev se localizaron con el perímetro
   equivocado y hubo que pagar el rehacer (US$ 0,37); Narva Trans quedó "individual" con un 2025 que es solo consolidado.
e) pipeline.mjs, control "sin tablas": `sinPasarPorElLote` exige `!e.jev`, así que un .md viejo con la marca de la preparación vieja
   (`listo-para-jev`, `sin-rubros`) nunca se marca `sin-tablas` ni se rehace con Mistral. Casos: OH Leuven 2022 (1 renglón de tabla) y
   Llaneros 2022 (0); la segunda corrida de Mistral tomó 0 documentos. Probablemente frena buena parte de los 319 de
   `Admin/lotes/sin-tablas-6paises.txt`: medirlo antes de decidir subagentes o Mistral para esos 319 (to-do 292).
f) periodo.mjs no saca el cierre de las cuentas NBB cuando las fechas vienen en celdas ("| het boekjaar dat de periode dekt van |
   01-07-2024 | tot | 30-06-2025 |", también "exercice couvrant la période du ... au"): 9 documentos frenaron antes de localizar (Lommel SK
   2019, 2023 y 2025, RWDM 2021, 2022 y 2025, Beerschot 2019, Patro Eisden 2023) y uno estonio (Harju JK Laagri 2023, primer ejercicio).
   Se resolvieron con ajustes `cierre` leídos con una expresión regular del .md: es exactamente lo que le falta a periodo.mjs.
g) La cola de categorías admite UNA categoría por fila: el 630 belga (amortizaciones) que la nota de activos fijos abre en pases y bienes de
   uso hubo que partirlo a mano con ajustes `fila` + `categoria` en 5 de 8 documentos (y el 66A de Lommel). Escalón posible: un
   "partir según la nota" en la cola, con la suma exacta como compuerta.
h) Sacar una fila de nota con `no_es_rubro` puede sacar el total del padre: en Narva Trans 2025 las dos filas "sh" ("del cual": 42.848 +
   109.938) eran todo el detalle de "Riigi ja KOV toetused" 152.786 y, marcadas `no_es_rubro`, se perdió el renglón entero (la propuesta
   frenó por 152.786 de menos). Que la cola avise cuando un `no_es_rubro` deja a un padre sin hijos.
i) alta-club.mjs: un país nuevo frena el alta con 3 preguntas (id, country, moneda) hasta agregar su fila a la tabla PAISES (Estonia).
   Chico, pero cada país nuevo lo repite: que el alta proponga la fila con ISO2 y moneda.
j) DATOS (no script): Estonia no tiene ligas en `data/leagues.js`; propuesto `ee-meistriliiga` (tier 1) y `ee-esiliiga` (tier 2). Las 9
   altas quedan con liga null.

## Después del merge del 2026-10-18
(Lo de arriba ya pasó a TODO 298-299, CHANGELOG 727 y ESTADO en main. Lo nuevo va acá.)
- En curso: lotes 91 (Estonia, 54 documentos) y 92 (Bélgica, 55) por Batch API con `--cargar`, con las tools de esta rama (anteriores a la compuerta de estadio y sponsor del to-do 273 que tiene main): los años que escriban no pasaron por esa compuerta.
- Nõmme Kalju: perímetro consolidado del club (2022-2024 traen los dos estados) e individual en 2025.
- To-do 299 HECHO (3a1da22b36): Estonia en Ligas (Meistriliiga 2019-2025 y Esiliiga 2021 y 2024, con su tamaño, 10); verificado en el preview: estado frío "Meistriliiga 9 of 10 · 2025" y su ranking. De paso, las 8 altas belgas tenían la liga en null: ahora Pro League (Beerschot, OH Leuven) y Challenger Pro League (6). `tools/faltantes-liga.mjs`: Estonia en su tabla PAISES; alias "Tammeka" -> tartutammeka-ee.
- Mejora de script (para el 298, letra k): `alta-club.mjs`/`cargar-lote.mjs` escriben la liga del alta en null aunque `Admin/registros/altas-revision.jsonl` traiga `ligas` verificadas (pasó con las 17 altas de los lotes 89-90): que el alta las tome de la revisión.
