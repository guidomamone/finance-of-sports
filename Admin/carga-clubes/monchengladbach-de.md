# monchengladbach-de — evidencia de carga

Lo que había como comentario en `data/de/monchengladbach-de-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/de/monchengladbach-de-data.js — Borussia VfL 1900 Mönchengladbach GmbH
(Alemania, Bundesliga). 2 ejercicios REALES (2023, 2024), Jahresabschluss
INDIVIDUAL (no hay Konzernabschluss separado). Transcripciones en
Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-<año>.md.

EJERCICIO CALENDARIO (01/01-31/12), NO 01/07-30/06 como el resto de los
clubes alemanes ya cargados — confirmado en el propio documento ("Bilanz zum
31. Dezember 2023"/"...2024", "Gewinn- und Verlustrechnung für die Zeit vom
1. Januar bis 31. Dezember"). Por eso usa fx de CIERRE CALENDARIO
(EUR@2023-12-31, EUR@2024-12-31), no las fechas 30/6 del resto — las 2 fechas
YA EXISTÍAN en FX_CLOSE (data/currency-map.js) antes de esta carga, no hizo
falta agregar ninguna.

SOBRE EL 3er ARCHIVO DE LA CARPETA, `jahresabschluss-2024-aufsichtsratsbericht
-nachtrag.md`: es el "Bericht des Aufsichtsrates zum Geschäftsjahr 2024" (el
informe del CONSEJO DE VIGILANCIA/supervisory board), un documento narrativo
de 3 páginas separado del balance — NO es el Jahresabschluss ni un anexo del
balance en sí, es un informe de gobierno corporativo que el propio consejo de
vigilancia redacta sobre su propia gestión de supervisión durante el año. Se
leyó igual (confirma el Jahresfehlbetrag de 2,4M€ y la caída de ingresos de
7,8% en prosa) pero NO se usó como fuente de datos — todos los números de
este archivo salen de `jahresabschluss-2024-completo.md`, el balance real.

ADVERTENCIA DE CALIDAD DE FUENTE — TABLA DE GuV INCOMPLETA EN LOS 2 AÑOS: la
conversión PDF→Markdown capturó limpio el desglose de Personalaufwand (Löhne+
soziale Abgaben) y "Aufwendungen für bezogene Waren" (Materialaufwand), y
saltó DIRECTAMENTE de ahí a "11. Ergebnis nach Steuern" — las filas de
Umsatzerlöse, Sonstige betriebliche Erträge, Abschreibungen, Sonstige
betriebliche Aufwendungen, Erträge/Aufwendungen financieros y Steuern vom
Einkommen NO sobrevivieron como filas de tabla en ninguno de los 2 archivos
(confirmado con grep, cero resultados). Se reconstruyó todo lo que se pudo
cruzando: el Lagebericht ("Finanz-, Vermögens- und Ertragslage", que da en
prosa el movimiento interanual de cada partida en TEUR) + el Konzern-
Anlagenspiegel (que SÍ sobrevivió completo y limpio, con la columna
"Abschreibung des Geschäftsjahres" separando Spielerwerte de Sachanlagen/
Konzessionen) + "11. Ergebnis nach Steuern" y el Jahresüberschuss/
-fehlbetrag de la Bilanz (los 2 únicos números EXACTOS al EUR que
sobrevivieron intactos en la tabla).

LO ÚNICO QUE QUEDÓ SIN PODER SEPARAR: "Sonstige betriebliche Erträge"
(ingreso) y el resultado financiero neto (Finanzergebnis/netInterest) — el
Lagebericht NO menciona ninguno de los 2 en ningún año (a diferencia de
Werder/Köln/Hoffenheim/Hamburgo, que sí narran ambos). Por diferencia contra
"11. Ergebnis nach Steuern" (el ancla exacta), el COMBINADO de ambos da
TEUR ~615 (2023) y TEUR ~104 (2024) — montos chicos (0,3%/0,06% del revenue),
pero la separación entre los 2 es una incógnita real, no una aproximación
razonada. SE DECIDIÓ (documentado como duda en Admin/dudas-por-club.md):
cargar el combinado ENTERO como línea de revenue "Sonstige betriebliche
Erträge" (other_income) y `netInterest:0` para los 2 años — más simple que
inventar una partición sin ningún ancla, pero es una SIMPLIFICACIÓN
reconocida: dado que Borussia carga ~62-63M€ de deuda bancaria (Verbindlich-
keiten gegenüber Kreditinstituten, ver Bilanz), es probable que el
Finanzergebnis real sea negativo (varios cientos de miles a pocos millones)
compensado por una "Sonstige betriebliche Erträge" positiva de magnitud
similar — sin las filas originales del GuV no se puede confirmar el split.

REVENUE — Umsatzerlöse por línea de negocio (Lagebericht "Finanz-, Vermögens-
und Ertragslage" de cada año, TEUR): Spielbetrieb, Werbung, Fernseh- und
Hörfunkverwertung (TV), Transfer, Handel tienen cifra propia; el resto
(Umsatzerlöse total menos esas 5 partidas) es RESIDUAL sin desglose propio →
other_income, disclosureLevel:'aggregated_residual' (mismo criterio que
Werder/Hoffenheim). "Handel" → sponsorship_commercial (merchandising).

GASTOS — Materialaufwand ("Aufwendungen für bezogene Waren", EXACTO en la
tabla los 2 años) → other_expenses. Personalaufwand (Löhne+soziale Abgaben,
EXACTO) → wages_squad, sin separar plantel de administración. Sonstige
betriebliche Aufwendungen: el Lagebericht solo da el combinado "Material- und
sonstige betriebliche Aufwendungen" (TEUR), así que se calculó por diferencia
contra el Materialaufwand exacto (sin desglose adicional propio) →
other_expenses. Abschreibungen: el Anlagenspiegel SÍ separa "Spielerwerte"
(activo INDEPENDIENTE de "Entgeltlich erworbene Konzessionen" en este club, a
diferencia de Hoffenheim/Köln donde las 2 cosas están mezcladas en una sola
línea "Konzessionen") → player_amortisation = SOLO la columna "Abschreibung
des Geschäftsjahres" de Spielerwerte; depreciation = Konzessiones (licencias/
software, NO jugadores en este club) + Sachanlagen (Grundstücke + andere
Anlagen). Los 2 componentes reconcilian EXACTOS contra el total impreso en el
Lagebericht (34.633 en 2023, 30.789 en 2024).

MONEDA: EUR los 2 ejercicios. fxRef contra FX_CLOSE: EUR@2023-12-31,
EUR@2024-12-31 (ambas ya existían).

LIGA: Bundesliga (1ª división) los 2 ejercicios — 14° puesto en la temporada
2023/24 (que cubre la 2da mitad del ejercicio calendario 2023 y la 1ra mitad
del ejercicio 2024), sin descenso en ningún momento del período. Cargado en
data/club-leagues/de.js.

gestionId: 'actual' — la Geschäftsführung cambió DENTRO de 2024 (Rolf Königs
hasta 19/3/2024, Stephan A.C. Schippers hasta 31/7/2024, Dr. Stefan
Stegemann asume como nuevo CEO recién el 1/1/2025), sin un responsable único
para todo el período en ninguno de los 2 ejercicios.
============================================================================
```

_de data/clubs.js:_

```text
Borussia Mönchengladbach: ejercicio CALENDARIO (01/01-31/12), confirmado en el propio documento.
```

_de data/club-leagues/de.js:_

```text
Borussia Mönchengladbach: ejercicio CALENDARIO. Bundesliga (1ª división) los 2 ejercicios, sin
descenso (14° puesto temporada 2023/24, que cubre ambos años calendario cargados).
```

## 2024

### Ingresos

```text
2024: Umsatzerlöse total TEUR 182.288. Nombradas: Spielbetrieb 23.407,
Werbung 42.149, TV 64.958, Transfer 18.909, Handel 24.184 (suma 173.607,
residual 8.681).
```

### Gastos

_antes de la fila 3 (`Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)`):_

```text
Spielerwerte 24.656.798,07 → player_amortisation. Konzessionen 682.732,83 + Grundstücke
4.306.189,01 + andere Anlagen 1.143.092,62 = 6.132.014,46 → depreciation. Suma
30.788.812,53 ≈ TEUR 30.789 impreso.
```

### Meta

```text
tax = 10. Steuern vom Einkommen (+0.136, Lagebericht "Steuerergebnis": Steuererstattung por
reversión de impuestos diferidos) + 12. sonstige Steuern (-0.056024, despejado por diferencia
entre Ergebnis nach Steuern -2.376.379,45 y el Jahresfehlbetrag -2.432.403,17 impresos).
officialPAT = IV. Jahresfehlbetrag impreso EXACTO (-2.432.403,17 EUR).
```

## 2023

### Ingresos

```text
2023: Umsatzerlöse total TEUR 197.721. Nombradas: Spielbetrieb 21.268,
Werbung 40.189, TV 68.206, Transfer 38.054, Handel 21.555 (suma 189.272,
residual 8.449). Sonstige betriebliche Erträge = combinado con
Finanzergebnis (ver comentario de cabecera), ajustado +0,000294 para que
el tie-out cierre exacto contra el Jahresüberschuss impreso.
```

### Gastos

_antes de la fila 3 (`Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)`):_

```text
Abschreibung des Geschäftsjahres, Konzern-Anlagenspiegel: Spielerwerte 28.187.752,93 →
player_amortisation. Konzessionen 631.080,75 + Grundstücke 4.529.307,36 + andere Anlagen
1.285.153,44 = 6.445.541,55 → depreciation. Suma 34.633.294,48 ≈ TEUR 34.633 impreso.
```

_antes de la fila 5 (`Sonstige betriebliche Aufwendungen (por diferencia contra el combinado "Material- und sonstige betriebliche Aufwendungen" del Lagebericht)`):_

```text
Sonstige betriebliche Aufwendungen = Material- und sonstige betriebliche Aufwendungen
combinado (TEUR 51.584, Lagebericht) menos Materialaufwand exacto (12.949497).
```

### Meta

```text
netInterest = 0 (simplificación reconocida: combinado con "Sonstige betriebliche Erträge"
del lado de revenue, ver comentario de cabecera).
tax = 10. Steuern vom Einkommen und vom Ertrag (-5.734, Lagebericht "Steuerergebnis") +
12. sonstige Steuern (-0.089501, despejado por diferencia entre Ergebnis nach Steuern
4.376.047,44 y el Jahresüberschuss 4.286.546,48 impresos).
officialPAT = IV. Jahresüberschuss impreso EXACTO (4.286.546,48 EUR).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Rainer Bonhof (2024-03-19 a hoy): El Aufsichtsrat lo eligió presidente el 19-3-2024, con efecto inmediato (fohlen-hautnah; nota del club fechada en la URL). En Gladbach el presidente del e.V. lo elige el Aufsichtsrat, no la asamblea.
SIN CONFIRMAR, no cargada: Rolf Königs (2004-04-06 a 2024-03-19), https://de.wikipedia.org/wiki/Rolf_K%C3%B6nigs: Wikipedia confirma presidente 2004-2024 y que entregó en marzo de 2024; el día 6-4-2004 salió de una búsqueda (esb-online/otra prensa) sin que la página lo confirme, por eso confirmada:false en el desde. El hasta 19-3-2024 coincide con la nota del club y fohlen-hautnah. Para el cierre pedido (2023-12-31) basta con que estuviera, que Wikipedia confirma.
Duda: Fecha exacta de asunción de Königs (6-4-2004) sin fuente que la confirme en la página citada; irrelevante para los cierres pedidos.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-18/resultado-9.json, tools/gestiones-tanda.mjs, 2026-10-18):_

```text
Rolf Königs (2004-04-01 a 2024-03-19): fohlen-hautnah (19-3-2024) dice que era presidente desde abril de 2004 y que Bonhof asume 'mit sofortiger Wirkung' ese mismo día tras la elección del nuevo Präsidium por el Aufsichtsrat; por eso hasta 2024-03-19 (coincide con el 'desde' ya cargado de Bonhof). La fuente da solo mes para el inicio: desde con día 01 (de.wikipedia.org/wiki/Rolf_Königs da el 6-4-2004 como elección, sucediendo al fallecido Adalbert Jordan). Corroboración en los documentos: jahresabschluss-2023.md:18 (Geschäftsführung 2023 con Rolf Königs) y jahresabschluss-2024-aufsichtsratsbericht-nachtrag.md:105 ('Rolf Königs (bis 19. März 2024)'). El cierre 2023-12-31 queda dentro de su gestión.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Alemania/Borussia Mönchengladbach/jahresabschluss-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1. Umsatzerlöse | pág. 5, precedente |
| 2 | 2. Sonstige betriebliche Erträge | pág. 5, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen für bezogene Waren | pág. 5, precedente |
| 2 | a) Löhne und Gehälter | pág. 5, Jev 0.99 |
| 3 | b) Soziale Abgaben | pág. 5, Claude 0.88 |
| 4 | 6. Sonstige betriebliche Aufwendungen | pág. 6, precedente |
| 5 | 12. Sonstige Steuern | pág. 6, Jev 0.99 |
| 6 | Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres) | pág. ?, precedente |
| 7 | Abschreibungen — Entgeltlich erworbene Konzessionen + Sachanlagen, laut Anlagenspiegel | pág. 6, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): fila = 32.294.038,76. REGLA de la línea de depreciación y amortización junta (votación 3 a 0): el estado junta Abschreibungen (45.923.257,98) y el Anlagenspiegel las abre; jugadores = 32.294.038,76 (L596), resto 13.629.219,22. Mismo criterio que 2023 y 2024 de este club
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): fila = 13.629.219,22. Resto de la línea 5 Abschreibungen: 1.795.355,54 + 5.673.611,13 (a.o.) + 4.644.522,57 + 1.515.729,98 del Anlagenspiegel (L594-L626), suma 13.629.219,22
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): categoria = player_amortisation. derechos de jugadores
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): categoria = depreciation. bienes de uso y licencias
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-23): de-bundesliga, verificado contra roster cacheado de "2022–23 Bundesliga" (tools/club-league-reference/de.json), coincidencia exacta "Borussia Mönchengladbach".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Alemania/Borussia Mönchengladbach/jahresabschluss-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1. Umsatzerlöse | pág. 3, precedente |
| 2 | 2. Sonstige betriebliche Erträge | pág. 3, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen für bezogene Waren | pág. 3, precedente |
| 2 | a) Löhne und Gehälter | pág. 3, precedente |
| 3 | b) Soziale Abgaben | pág. 3, precedente |
| 4 | 6. Sonstige betriebliche Aufwendungen | pág. 3, precedente |
| 5 | Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen — derechos de jugadores (según cuadro de movimiento) | pág. ?, precedente |
| 6 | Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen — resto: bienes de uso y licencias (según cuadro de movimiento) | pág. 3, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, partir-amortizacion 2026-10-23): fila = 37.213.303,94. partir-amortizacion.mjs (REGLA de la línea de depreciación y amortización junta): «5. Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen» (45.630.778,63, L110) = jugadores 37.213.303,94 + resto 8.417.474,69, según cuadro de movimiento: L554 (jugadores) y el cuadro de L550 a L577
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, partir-amortizacion 2026-10-23): fila = 8.417.474,69. partir-amortizacion.mjs (REGLA de la línea de depreciación y amortización junta): «5. Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen» (45.630.778,63, L110) = jugadores 37.213.303,94 + resto 8.417.474,69, según cuadro de movimiento: L554 (jugadores) y el cuadro de L550 a L577
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, partir-amortizacion 2026-10-23): categoria = player_amortisation. partir-amortizacion.mjs (REGLA de la línea de depreciación y amortización junta): «5. Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen» (45.630.778,63, L110) = jugadores 37.213.303,94 + resto 8.417.474,69, según cuadro de movimiento: L554 (jugadores) y el cuadro de L550 a L577
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, partir-amortizacion 2026-10-23): categoria = depreciation. partir-amortizacion.mjs (REGLA de la línea de depreciación y amortización junta): «5. Abschreibungen auf immaterielle Vermögensgegenstände des Anlage- vermögens und Sachanlagen» (45.630.778,63, L110) = jugadores 37.213.303,94 + resto 8.417.474,69, según cuadro de movimiento: L554 (jugadores) y el cuadro de L550 a L577
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-23): de-bundesliga, verificado contra roster cacheado de "2021–22 Bundesliga" (tools/club-league-reference/de.json), coincidencia exacta "Borussia Mönchengladbach".
```

## Fuentes

### monchengladbach-de-jahresabschluss-2023

_note (data/):_

```text
Jahresabschluss INDIVIDUAL de la Borussia VfL 1900 Mönchengladbach GmbH (HRB 5742, Amtsgericht Mönchengladbach), ejercicio CALENDARIO. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2023.md. La tabla de GuV llegó incompleta (faltan varias filas); reconstruido cruzando el Lagebericht y el Anlagenspiegel — ver comentario de cabecera de monchengladbach-de-data.js.
```

### monchengladbach-de-jahresabschluss-2024

_note (data/):_

```text
Jahresabschluss INDIVIDUAL, ejercicio CALENDARIO. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2024-completo.md. Existe además jahresabschluss-2024-aufsichtsratsbericht-nachtrag.md (informe del Consejo de Vigilancia, narrativo, NO se usó como fuente de datos — ver comentario de cabecera de monchengladbach-de-data.js). Mismo problema de tabla de GuV incompleta que 2023.
```

### monchengladbach-de-jahresabschluss-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-23) desde la transcripción Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### monchengladbach-de-jahresabschluss-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-23) desde la transcripción Clubes/Alemania/Borussia Mönchengladbach/jahresabschluss-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```


## Resuelto desde Admin/dudas-por-club.md (2026-10-23)

*(RESUELTO, sesión 2026-09-17: se bajó el PDF pendiente y el Lagebericht 2024 confirma
explícitamente que la "Borussia VfL 1900 Mönchengladbach GmbH" es la operadora de la
Lizenzspielermannschaft — el fútbol profesional, no otra unidad de negocio. La prensa que la
describía como "club e.V. sin escindir" estaba desactualizada/imprecisa. Ver
`Admin/sourcing/Alemania/Borussia Mönchengladbach.md`.)*
