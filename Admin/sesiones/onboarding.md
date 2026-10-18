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
- Estonia pasa a ser un país del sitio (cuando entren las altas del lote 89).

## Pantalla (para fos-finanzas)
- Nada todavía.

## PDFs bajados acá (copiar a la principal con rsync)
- Ninguno.

## Mejoras de script vistas (para fos-pipeline, sin aplicar)
- La cola de categorías admite UNA categoría por fila: el 630 belga (amortizaciones) que la nota de activos fijos abre en pases y bienes
  de uso hubo que partirlo a mano con ajustes `fila` + `categoria` en 5 de 8 documentos. Escalón posible: que la cola acepte un
  "partir según la nota" con la suma exacta como compuerta.
- Ligas de Estonia: no hay ids en `data/leagues.js` (propuesto `ee-meistriliiga` tier 1, `ee-esiliiga` tier 2); las 9 altas quedan
  con liga null hasta sumarlos.
- `verificar.mjs` con las jaarrekening belgas (NBB): los costos financieros (Financiële kosten 65/66B y sus renglones) entran en
  positivo y suman; los renglones con "(+)/(-)" impresos negativos (609, 631/4, 635/8) entran por su valor absoluto; el "Waarvan:
  niet-recurrente bedrijfsopbrengsten" (76A) del esquema abreviado se suma aparte cuando ya está en la Brutomarge. Casos: los 9 del
  lote 90 (se cerraron con ajustes `fila`). PELIGROSO: Lierse Kempenzonen 2022 da "cierra (financiero invertido)" con la Brutomarge
  impresa −2.369 cargada como ingreso +2.369 (la compuerta compara en valor absoluto): un cierre falso.
- `perimetro-senales.mjs` no ve los dos estados en los informes estonios (consolidado + "Lisa NN konsolideerimata tulemiaruanne") y
  fija "individual" para el club con los años de un solo estado: FCI Levadia, Kuressaare, Tallinna Kalev (corregidos con ajuste del
  club); Narva Trans quedó "individual" aunque su 2025 es solo consolidado.
- `pipeline.mjs`, control "sin tablas": `sinPasarPorElLote` exige `!e.jev`, así que un `.md` viejo con la marca de la preparación vieja
  (`listo-para-jev` o `sin-rubros`) nunca se marca `sin-tablas` ni se rehace con Mistral. Casos: OH Leuven 2022 (1 renglón de tabla,
  `jev: listo-para-jev`) y Llaneros 2022 (0 renglones, `jev: sin-rubros`); la segunda corrida de Mistral los dejó igual (0 documentos).
  Probablemente afecta a buena parte de los 319 de `sin-tablas-6paises.txt`.
- `periodo.mjs` no saca el cierre de las jaarrekening belgas de la NBB cuando las fechas vienen en celdas de tabla
  ("| het boekjaar dat de periode dekt van | 01-07-2024 | tot | 30-06-2025 |"): Lommel SK y RWDM 2025 frenaban antes de localizar
  (se cargaron con ajuste `cierre`).
