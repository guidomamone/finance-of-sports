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

## Después del segundo merge del 2026-10-18
(El 299 y la k ya pasaron a main: TODO, CHANGELOG 729, ESTADO. Lo nuevo va acá.)
- Lotes 91 (Estonia, 54) y 92 (Bélgica, 55) por Batch API: 2 años escritos (Lommel SK 2018, RWDM 2020); 231 casos en la cola (Bélgica ~150,
  Estonia ~95). Mejoras de script nuevas, para el 298 (sin aplicar):
  l) El alta vuelve a preguntar el tipo de documento (`reportType`) en CADA año de un club ya dado de alta: 50 de 54 documentos estonios
     frenan por eso, y el ajuste `reportType` no se puede poner a nivel club (solo perimetro, deuda-incluye y name). Que un club existente
     herede el tipo de sus años cargados del mismo formato de documento, o que `reportType` se pueda fijar para la carpeta.
  m) La compuerta del perímetro en la carga compara con el año cargado más cercano y no con el ajuste del club: Nõmme Kalju 2022-2024
     preguntan "¿individual como 2025?" aunque el club tiene ajuste `perimetro` consolidado (2025 es individual por ser su único estado).
  n) La comparación con el año vecino (anio-vecino / no-cierra "columna del año anterior") compara perímetros distintos: FCI Levadia 2020
     da ingresos 786.551 (la MTÜ sola) contra 1.073.554 de la columna comparativa del consolidado 2021; 13 casos así en Estonia. Que la
     compuerta compare el mismo perímetro, o que lo diga en la pregunta.
  o) Dos versiones de un mismo ejercicio (`-correction` y la original en Beerschot 2019, Lokeren-Temse 2023, Lommel SK 2021, Patro Eisden
     2020 y 2024) entran juntas al lote y cada una abre sus casos: 21 casos de "año vecino" en Bélgica salen de ahí. Que el lote elija una
     antes de localizar (la regla de CONVENCIONES-DATOS, dos documentos del mismo ejercicio) y mande la otra a descartados con ok.
  p) Ceros reales que se repiten cada año (Televisión y Estadio en los clubes estonios chicos, Cuotas sociales en Beerschot): el ajuste
     `cero-real` es por documento y vuelve a frenar cada año; y el perfil del club (socios, otros deportes) se pregunta de nuevo en cada
     documento hasta que se contesta. Un cero real confirmado del club debería valer para sus otros años del mismo formato.
  q) El ensayo de lote.mjs cobra la categorización (~US$ 0,03) de TODOS los documentos de la lista, también los que ya están en el sitio o
     ya categorizados: lote 91 con 26 años en el sitio y el resto ya categorizado sigue estimando US$ 1,62.
- Lote 91, segunda corrida: 22 años de Estonia escritos (26 en el sitio contando los 2025). Cola contestada en dos vueltas (97 + 49 casos,
  subagentes Sonnet revisados por Claude); 37 ceros reales de TV y estadio con cita; Narva Trans consolidado a nivel club (2021 rehecho);
  duda al club: FCI Levadia, "Liikmemaks" 2019-2020.
- Lote 91, tercera corrida: 27 años más; Estonia completa salvo Narva Trans 2021 (contestado: diferencia de perímetro, falta una corrida).
  r) caja-deuda.mjs en Estonia: 0 de 126 datos escritos. En casi todos los años "sin páginas de balance": localizar no guarda la ubicación
     del balance (bilanss) de los informes estonios, así que ni Jev ni la IA tienen dónde mirar. Y en la corrida con años vecinos dejó SIN
     COMMITEAR una caja equivocada de Tallinna Kalev 2019 (0,005455 contra "Raha 1 770" del balance, L90 y L172) y 2020 (0,028424): se
     descartó (git checkout); revisar de qué escalón salió y por qué escribió sin commit.
- ESTONIA COMPLETA: los 54 años 2019-2025 de los 9 clubes en el sitio (Narva Trans 2021 el último). Listas 89, 89-rehacer, 91 y 91-rehacer archivadas en Admin/Archive/lotes/. Bélgica (listas 90 y 92) espera correr con las tools de main (mejoras b y o, compuerta de estadio y sponsor del 273).

## Después del tercer merge del 2026-10-18

- Bélgica con las tools de main (b y o): verificar gratis sobre el lote 92 da 41 de 50 resultados que cierran (antes fallaban 27); el lote
  saltea las 5 versiones originales que tienen -correction (Beerschot 2019, Lokeren-Temse 2023, Lommel SK 2021, Patro Eisden 2020 y 2024).
  Lista 90 archivada (las 8 altas belgas 2025 ya en el sitio). Beerschot 2019 -correction: ajuste de cierre 30-06-2019 y lista lote-92-rehacer.
- Mejora de script nueva (para el 298, s): periodo.mjs / localizar toman el INICIO del boekjaar como cierre cuando el ejercicio empieza en
  junio (Beerschot 2019 -correction: "van 29-06-2018 tot 30-06-2019" -> ejercicio 2018) y localizar elige la columna "Vorig boekjaar"
  (vacía): 0 filas extraídas, sin aviso de por qué.

### Para la sesión nueva (Onboarding 2): por dónde seguir (2026-10-18, cierre de Onboarding 1)

Estado: carpeta limpia, todo commiteado. Las tools son las de main (la rama se adelantó a main después del tercer merge). Antes de
nada: `node tools/worktree.mjs preparar /Users/guidopablomamonesoneira/Claude/Projects/fos-onboarding`.

**1. Bélgica (to-do 292), lo que va primero.** Lista activa `Admin/lotes/lote-92.txt` (55 documentos, 2013-2024 de Beerschot, Lierse SK,
Lokeren-Temse, Lommel SK, OH Leuven, Patro Eisden y RWDM; la 90, de las altas 2025, ya está archivada). Ya en el sitio: los 8 clubes belgas
2025, Lommel SK 2018 y RWDM 2020. Con las tools de main (mejoras b y o), `verificar` gratis da 41 de 50 resultados que cierran. Primer
comando (lo corre Guido, ~US$ 1,65):
```
cd /Users/guidopablomamonesoneira/Claude/Projects/fos-onboarding && caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-92-rehacer.txt --ejecutar --rehacer && caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-92.txt --ejecutar --cargar ; osascript -e 'display notification "Terminó el lote" with title "finance-of-sports" sound name "Glass"'; say "lote terminado"
```
`lote-92-rehacer.txt` es Beerschot 2019 -correction: se había localizado con la columna "Vorig boekjaar" (vacía, 0 filas); ya tiene el
ajuste `cierre` 2019-06-30. Después: la cola belga con subagentes Sonnet, un club por vez. El método que funcionó en los lotes 89-91: armar
los casos por club con un script (cola.mjs filtrado por carpeta, sin gestión), un subagente por grupo de clubes con el prompt "solo Read,
Write y grep simple" (memoria subagentes-sin-bash), revisar los borradores grandes contra el .md y con `verificar.mjs` (gratis) antes de
aplicarlos, y aplicar con un script (`cola.mjs --responder` / `ajustes.mjs --agregar`). Precedentes belgas ya decididos: el 630
(amortizaciones) se parte según la nota de activos fijos (pases -> player_amortisation, bienes de uso -> depreciation, goodwill ->
other_amortisation); el residuo implícito de la Brutomarge en el esquema abreviado va como other_income (Lokeren-Temse 2025, como Dender EH);
la Brutomarge sin Omzet ni 60/61 es el ingreso operativo (lump_football_operations); el 76A "waarvan" no se suma aparte. Ojo: en main
`cargar.mjs` frena un año nuevo sin estadio y sponsor (to-do 273); los años belgas pueden frenar por eso.
DUDA ABIERTA para Guido: las 5 versiones originales reemplazadas por su -correction (Beerschot 2019, Lokeren-Temse 2023, Lommel SK 2021,
Patro Eisden 2020 y 2024): ¿a `Admin/registros/documentos-descartados.txt`? (recomendado; el lote ya no las usa).
Caja y deuda de los 17 clubes nuevos: vacía. Estonia no tiene dónde mirar (mejora r); en Bélgica cuidado con el código "54/58" leído como
caja (mejora c). No correr `caja-deuda --escribir` en Bélgica sin mirar el valor contra el balance.

**2. To-do 292, lo que queda además de Bélgica.** Los 319 `.md` viejos sin tablas de `Admin/lotes/sin-tablas-6paises.txt`: decidir
subagentes o Mistral; antes, medir cuántos frena la mejora e (la marca vieja de Jev saltea el control "sin tablas": OH Leuven 2022 y Llaneros
2022 son dos casos). Países Bajos, Suiza, Beşiktaş y Colombia de `subagentes-validar.txt` ya están validados (listo) y SIN lotes de carga:
armar el alta de cada país con un solo año (el más reciente con estado de resultados), igual que Estonia y Bélgica (lotes 89-90).
`Admin/lotes/subagentes-pb-co.txt`: revisar si quedó algo sin validar.

**3. Los demás to-dos del plan, sin empezar:** 238 (estados intermedios del inventario a 0), 285 (Viking Fotball AS: el 2025 ya está
transcripto por Mistral; faltan los otros años del AS), 284 (Fredrikstad y Sarpsborg 08 sobre el FLI; Fredrikstad: abrir antes
`wf-src-FFK_-_Årsmøte_2025.pdf`; Pardubice no se da de alta), 283 (Vålerenga y Aalesund: sumar AS + FLI sin contar dos veces la
transferencia; lo de pantalla, para fos-finanzas), 195 (gestiones de los clubes nuevos: todos los años de Estonia y Bélgica salieron con el
aviso "ningún presidente confirmado"; `node tools/gestiones-tanda.mjs --armar --escribir`), 165 c (altas de los países nuevos).

**4. Dudas al club ya anotadas en `Admin/dudas-por-club.md`:** Paide Linnameeskond (becas y apoyos de la Lisa 10, cargados como
wages_squad) y FCI Levadia ("Liikmemaks" 2019-2020 que el club paga, cargado como admin_general_expense).

**5. Cómo trabajó esta sesión (lo que le sirvió a Guido):** un paso por vez; ensayo gratis antes de cada comando pago; el comando entero
con costo en el último mensaje, terminado en `; osascript ...; say "lote terminado"`; scripts en el scratchpad corridos con `node` (sin
variables, sin `cd`, sin espacios escapados, sin `git -C`: si no, cada comando le pide permiso a Guido); las mejoras de script van al cierre
como letras para fos-pipeline, sin aplicarlas.

## Onboarding 2

- Lote 92 de Bélgica corrido (lote-92-rehacer y lote-92, ~US$ 1,65): 0 años escritos. De 50 documentos: 37 frenan en la verificación con
  casos en la cola, 3 en la categorización, 2 piden reintento, 3 sin propuesta (OH Leuven 2017 sin estado; 2018 y 2022 con páginas en
  imagen), 3 ya estaban en el sitio y 2 listos pero frenados por la compuerta de estadio y sponsor (Lommel SK 2020 y 2022).
- Cola belga contestada por subagentes Sonnet, un borrador por club (126 casos sin contar gestión). Aplicadas las 58 respuestas que no tocan
  importes (perfiles en 0 reales, el 617 dentro del 61, el desglose geográfico del Omzet no se carga, cuadros que solo respaldan, etc.).
  QUEDAN SIN APLICAR, a propósito, las que cambian números: Guido (2026-10-18) decidió esperar a las mejoras t y u para cargar Bélgica, en
  vez de unos 20 ajustes a mano. Los borradores con las cuentas (para revisar contra el script nuevo) están en el scratchpad de esta sesión;
  lo esencial va en las letras t y u.
- Con ok de Guido: las 5 versiones originales reemplazadas por su -correction a documentos-descartados.txt; RWDM 2019 (primer ejercicio,
  7 meses sin actividad) a documentos-parciales.txt. Patro Eisden 2020 -correction: la Brutomarge impresa (277.991, L219-221) no cierra
  con su propio desglose (568.892 + 183.012 - 423.072 = 328.832); Guido: se carga la Brutomarge impresa, sin abrir, con nota (va con la t).
- Mejoras de script nuevas para el 298:
  t) Esquema NBB belga, lo que la mejora b no cubrió (verificar.mjs / la propuesta de carga). Casos revisados contra el .md:
     1. Suma el total "Bedrijfskosten 60/66A" ADEMÁS de sus renglones, y los subrenglones "Aankopen 600/8" y "Voorraad 609" además del 60:
        Beerschot 2021 da gastos 30,7 M en vez de 15,1 M (L294-305). Regla: en el NBB, 60/66A y 70/76A son totales y 600/8 y 609 son
        detalle del 60.
     2. El "waarvan" del 76A se suma aparte: Lommel SK 2023, 74.960 (L241) además de la Brutomarge 1.253.901.
     3. La Brutomarge (esquema abreviado, código 9900) se pierde o se lee sin signo: Lierse SK 2019 (-1.372, L229) y 2020 (-1.475, L257),
        Lierse Kempenzonen 2022 (-2.369, L228) y Patro Eisden 2021 (-140.857, L232) y 2023 (-246.781) quedan con ingreso 0 o positivo.
     4. Brutomarge con Omzet y 60/61 impresos: falta el residuo implícito como ingreso (Lokeren-Temse 2021 76.401, 2022 64.280,
        2023 -correction 551.469; Patro Eisden 2022 768.543 y 2023 1.451.259); cuando el 60/61 está impreso y se carga como gasto, la
        Brutomarge no se suma otra vez.
     5. Financiero del esquema abreviado: suma los ingresos financieros (75) y los costos (65) con el mismo signo en vez de restarlos
        (Lokeren-Temse 2021-2023, Patro Eisden 2021-2022).
     6. Renglones "(+)/(-)" de reversión leídos en positivo: 631/4 y 635/8 (Patro Eisden 2022 635/8 -45.749, L220; 2023 631/4 -9.781 y
        635/8 -12.882, L224) y el 77 "Regularisering van belastingen" que resta del impuesto (Beerschot 2021, 155, L324).
     7. OH Leuven 2021 toma el resumen del jaarverslag (ingresos 0, gastos 4.186.307) y no el estado de la pág. 8 del visor (L387-529:
        ingresos 11.399.352, gastos 28.279.768, resultado -17.061.519).
  u) La compuerta de estadio y sponsor (to-do 273) frena TODO año nuevo de un club cuya liga de ese año no está en data/club-leagues:
     cargar.mjs no le pasa --liga y estadio-sponsor.mjs dice "sin liga en club-leagues" (Lommel SK 2020 y 2022). Bélgica solo tiene la liga
     2025 de cada club, y ligas-sin-verificar.mjs solo mira años ya cargados. Que la carga de un año nuevo resuelva su liga con la misma
     compuerta de ligas-sin-verificar (candidatas: las ligas del club en otros años y las del país con listas) antes de la compuerta del
     273. Faltan además las listas de las ligas amateur belgas (Patro Eisden, Lokeren-Temse, Lierse SK, RWDM antes de ascender).
  v) El final de lote.mjs lista en "Frenados" los documentos que el mismo lote salteó por estar reemplazados por su -correction
     (Beerschot 2019, Lokeren-Temse 2023, Lommel SK 2021 y Patro Eisden 2020 y 2024 originales): confunde el conteo. Ya en descartados no
     deberían volver a aparecer; confirmarlo en la próxima corrida.
- Por dónde seguir: Bélgica espera a la t y la u. Lo demás del plan sigue igual (292 resto, 238, 285, 284, 283, 195, 165 c).

## Después del cuarto merge del 2026-10-18
- 292, los 319 .md viejos sin tablas de `Admin/lotes/sin-tablas-6paises.txt`, medidos (gratis, contra el registro y el .md de hoy): 75 ya
  tienen tablas, 26 ya están cargados, 6 son de Mistral y no tienen tablas (casi todos memorias sin estados: Telstar Bestuursverslag, Suiza),
  1 lo ve el control "sin tablas". Quedan 212 para rehacer: 100 los saltea la mejora e (estado listo con marca vieja: 86 `sin-rubros` y 14
  `listo-para-jev`; Bélgica 96, Colombia 4) y 112 pasan por la validación (108 `revisar`, 3 `pendiente-segunda-voz`, 1 `sin-tablas`),
  que los rehace con Mistral al correr. Recomendación: Mistral (~US$ 0,17 c/u, ~US$ 36 los 212) cuando la e esté hecha; casi todos son
  belgas, que igual esperan a la t y la u.
- Lote 93 armado: alta de Países Bajos, 26 clubes con un año cada uno (afuera Go Ahead Eagles por el 165 c, MVV y RKC sin documento validado,
  NEC Nijmegen duplicada). Ajustes `cierre` 2025-06-30 de Roda JC y SC Cambuur. Ensayo: ~US$ 10,50 (cota alta: club sin historia).

## Después del quinto merge del 2026-10-18
