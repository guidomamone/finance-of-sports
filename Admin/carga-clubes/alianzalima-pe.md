# alianzalima-pe — evidencia de carga

Lo que había como comentario en `data/pe/alianzalima-pe-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/pe/alianzalima-pe-data.js — Alianza Lima (Perú), primer club peruano del sitio.

FUENTE: 6 Estados Financieros auditados (NIIF), uno por ejercicio 2019-2024, transcriptos en
`Clubes/Perú/Alianza Lima/estado-financiero-<año>.md`. Los de 2019 y 2021 tienen capa de texto
nativa (pdftotext -layout); los de 2020, 2022, 2023 y 2024 son escaneos OCR con Tesseract
(-l spa --psm 6) — ver la cabecera de cada .md. LOS TRES ÚLTIMOS (2022/2023/2024) SOLO TRANSCRIBEN
los 4 estados principales (situación financiera, resultados integrales, cambios en el patrimonio,
flujos de efectivo), NO las notas explicativas — por eso sus revenueLines/expenseLines son más
gruesas que las de 2019-2021 (ver el comentario largo antes de cada año más abajo).

EL CLUB ESTÁ EN PROCESO CONCURSAL POR INSOLVENCIA desde 2012 (Ley 27809, bajo supervisión de
INDECOPI), administrado por un Administrador designado por la Junta de Acreedores (no un
presidente electo) — por eso `gestionesByClub['alianzalima-pe']` queda vacío (ver sección 7 del
skill club-data-mapping: mejor sin gestión asignada que una inventada; el concepto de "gestión
presidencial" del resto del sitio no aplica limpio acá).

TIE-OUT: Revenue - Expenses = Resultado operativo impreso, EXACTO, los 6 ejercicios (ver
verificación completa en el comentario de cada año). PAT = "Resultado del periodo" (neto, ANTES de
"Otros resultados integrales" — el único año con OCI ≠ 0 es 2019, S/ 6.305.226 de cambios de
estimaciones de revaluación; se usó el resultado del periodo, no el "integral", mismo criterio que
el resto del sitio usa "Superávit/Déficit del ejercicio" y no un totalizador con OCI incluido).

MONEDA: PEN nativo, en MILLONES (mismo criterio que todos los clubes desde la Versión 32/103).
`scale:1` para PEN ya estaba declarado en CURRENCY_META (data/currency-map.js) antes de esta
sesión. FX: 2019/2020/2021 declaran su propio tipo de cambio de cierre en la Nota "Riesgo de tipo
de cambio" (promedio ponderado SBS, publicado como un rango compra/venta — acá se usó el PROMEDIO
de ambos, a falta de precedente en el sitio para un caso "compra/venta" en vez de un valor único;
documentado en cada año). 2022/2023/2024 no tienen esa nota en la transcripción disponible, así que
usan `fxRef` a `FX_CLOSE` (data/currency-map.js): 2022 cotización interbancaria BCRP del último día
hábil del año (30/12, el 31/12/2022 fue sábado), 2023 y 2024 tipo de cambio contable SBS de cierre.

CATEGORIZACIÓN — casos específicos de Alianza Lima que no estaban ya en la tabla de
club-data-mapping/SKILL.md sección 1 (agregados ahí también al cerrar esta sesión):
  - "Ingresos por participación en torneos internacionales"/"...nacionales": el club los reporta
    como línea propia, separada de la taquilla (que va aparte, en la Nota de "Otros ingresos
    deportivos") -> `competition_bonus` (premios/ingresos de la FPF o CONMEBOL por participar en el
    torneo, no recaudación de boletería).
  - "Taquilla por torneos locales" / "...internacionales y amistosos" -> `matchday_competition`
    (recaudación de entradas, sea el partido local o de visita/amistoso).
  - "Ingresos por derechos de formación y transferencias" -> `player_sales` (venta/formación de
    jugadores).
  - "Franquicias de academias" (franquiciar la marca/metodología "Academia Alianza Lima" a
    terceros, ver Nota NIIF15 del EEFF 2019) -> `youth_football` (es negocio de fútbol juvenil,
    aunque el ingreso sea un canon de franquicia y no una cuota de alumno).
  - "Academias de fútbol y vóley" (operación propia, mixta con vóley) -> `other_sports` (no se
    puede separar la porción de fútbol de la de vóley con lo que reporta la Nota).
  - "Concesionarios" (del estadio) -> `stadium_other` ("uso del estadio fuera del partido",
    Versión 189 de category-map.js: comparte la fila "Estadio" de Formato simplificado con
    matchday_competition/season_tickets, sin decir que es recaudación de entradas).
  - "Regalías" -> `sponsorship_commercial`.
  - Campaña "De vuelta a casa" (2021, campaña puntual post-pandemia, sin más detalle en la Nota)
    -> `other_income`.
  - "Gastos deportivos: Personal" -> `wages_squad`. "...Depreciación" -> `depreciation`.
    "...Amortización" -> `player_amortisation` (es la amortización de "Derechos federativos, neto",
    el intangible de pases de jugadores — ver política contable "f. Intangible Derechos
    federativos" en el EEFF 2020, activa y amortiza el costo de adquisición de cada jugador).
    "...Diversos" -> `other_expenses`.
    "...Servicios" -> `match_organisation_expense` — ESTO ES UNA APROXIMACIÓN, no una certeza: la
    Nota no desglosa qué compone este bloque grande (S/ 9-15M/año, el 2do rubro más grande de
    "Gastos deportivos" después de Personal). Podría incluir viajes/concentración/seguridad (que sí
    es `match_organisation_expense`) pero también servicios médicos tercerizados, comisiones de
    intermediación u otros conceptos que en otro club irían a categorías distintas. Se documentó
    como pregunta en Admin/dudas-por-club.md / dudas-por-club.md (según dónde viva ese archivo en
    este worktree) en vez de inventar una separación que el dato no permite.
  - "Gastos administrativos: Personal/Servicios/Estimaciones contables/Diversos" -> las 4 a
    `admin_general_expense` (mismo criterio que Vélez: administración/gastos generales).
  - "Gastos de marketing" (línea propia del estado, sin nota) -> `admin_general_expense` (incluye
    "comerciales" según la propia descripción de esta categoría en category-map.js).
  - 2022/2023/2024, "Otros ingresos deportivos"/"Otros ingresos" (Nota 15/17, NO transcripta): se
    dejó como UNA sola línea sin desglosar, `lump_football_operations` (ingreso) — mismo criterio
    que usa River para su "Fútbol Profesional" (ver data/ar/river-data.js): el documento SÍ separa
    esto en algo (se ve en 2019-2021: cuotas de socios, taquilla, transferencias, academias,
    concesionarios, regalías, diversos), pero ESTA transcripción no llegó a esa Nota, así que
    mandarlo a `other_income` sería subestimar cuánto de esto es en realidad fútbol operativo
    (30-47% del revenue total en estos 3 años). `disclosureLevel:'not_disclosed'` marca que es un
    pendiente de transcripción, no un límite real de la fuente.
  - 2022/2023/2024, "Costos deportivos" (Nota 16/18, NO transcripta): mismo criterio, UNA sola
    línea `lump_football_operations_expense` (gasto) en vez de forzar una separación
    Personal/Servicios/Depreciación/Amortización que no se puede confirmar sin releer esa Nota.

PENDIENTE para una sesión futura: re-OCRear las páginas de Notas de estado-financiero-2022.md,
-2023.md y -2024.md (Notas "Otros ingresos"/"Costos deportivos", equivalentes a las Notas 14-16 que
SÍ están transcriptas en 2019/2020/2021) para poder separar esas 2 líneas lump en las mismas
categorías finas que ya se usan en 2019-2021. Documentado también en
Admin/sourcing/Perú/Alianza Lima.md.
============================================================================
```

_de data/clubs.js:_

```text
Perú, primer club del país (onboarding 2026-09-25). fiscalYearStart:'01-01': año calendario
(los EEFF dicen "Al 31 de diciembre de AAAA"), mismo criterio que Brasil/Colombia/Chile.
reportingCurrency:'PEN', ya soportado en CURRENCY_META (data/currency-map.js, scale:1).
```

_de data/club-leagues/pe.js:_

```text
Verificado el 25/9/2026: Alianza Lima jugó Liga 1 (primera división) los 6 ejercicios cargados,
sin interrupción. Hubo un intento real de descenso administrativo (tabla acumulada 2019-2020,
por los puntos de Carlos Stein), pero el Tribunal Arbitral del Deporte (TAS) anuló esa pérdida de
categoría en 2021 antes de que Alianza llegara a jugar en segunda división — nunca descendió de
hecho (ver https://www.swissinfo.ch/spa/la-liga-peruana-patas-arriba-tras-anularse-el-descenso-de-alianza-lima/46457674).
Campeón de Liga 1 en 2021 y 2022 (24° y 25° título, respectivamente).
```

## 2024

### Ingresos

```text
EEFF 2024 (estado-financiero-2024.md, OCR, solo estados principales). Suma = 120.465726 M PEN,
EXACTO igual al Estado de resultados integrales 2024 (Memoria Anual 2024).
```

### Gastos

```text
EEFF 2024 (solo estados principales, Memoria Anual 2024). Suma = -119.800515 M PEN, EXACTO igual
a "Costos y gastos" del Estado de resultados integrales 2024 (92.697274+17.027913+10.075328).
```

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021): Cuotas Sociales, Estadio, Venta de Jugadores, Otras secciones deportivas, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
```

## 2023

### Ingresos

```text
EEFF 2023 (estado-financiero-2023.md, OCR, solo estados principales). Aparece por primera vez
"Ingresos por participación en torneos nacionales" (línea nueva del propio documento, separada de
la de torneos internacionales). Suma = 108.214198 M PEN, EXACTO igual al Estado de resultados
integrales 2023.
```

### Gastos

```text
EEFF 2023 (solo estados principales). Suma = -100.961185 M PEN, EXACTO igual a "Costos y gastos"
del Estado de resultados integrales 2023 (80.506543+12.265510+8.189132).
```

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021): Cuotas Sociales, Estadio, Venta de Jugadores, Otras secciones deportivas, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
grossDebt: el propio EEFF 2023 no separa "Deuda concursal" como línea propia en su Estado de
situación financiera (aparece mezclada dentro de "Otras cuentas por pagar") — se usó el valor
de "Deuda concursal" que sí declara la comparativa "2023" del EEFF 2024 (Nota 13, más
desglosada), consistente con que ambos documentos deberían describir el mismo 31/12/2023.
```

## 2022

### Ingresos

```text
EEFF 2022 (estado-financiero-2022.md, OCR, SOLO estados principales transcriptos — ver
comentario de cabecera). "Otros ingresos deportivos" queda como un bolsón sin desglosar,
`lump_football_operations`. Suma = 89.052777 M PEN, EXACTO igual a "Ingresos" del Estado de
resultado integral 2022.
```

### Gastos

```text
EEFF 2022 (solo estados principales transcriptos). "Costos deportivos" queda como bolsón sin
desglosar, `lump_football_operations_expense` (mismo criterio que usa River para su "Fútbol
profesional", ver data/ar/river-data.js: el documento sí lo desglosaría en su Nota, pero esta
transcripción no llegó a esa página). Suma = -75.511252 M PEN, EXACTO igual a "Gastos" del
Estado de resultado integral 2022 (60.792598+8.734136+5.984518).
```

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2019, 2020, 2021): Cuotas Sociales, Estadio, Venta de Jugadores, Otras secciones deportivas, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
El EEFF 2022 transcripto no incluye la Nota de riesgo de tipo de cambio (solo se transcribieron
los 4 estados principales) — se usó la cotización de mercado de FX_CLOSE (data/currency-map.js).
```

## 2021

### Ingresos

```text
EEFF 2021 (estado-financiero-2021.md, texto nativo). Nota 14 desglosada, columna propia "2021"
(verificada exacta contra la comparativa "2021" del EEFF 2022, coinciden dígito a dígito). Suma
= 60.786207 M PEN, EXACTO igual a "Ingresos" del Estado de resultados integrales 2021.
```

_al final de las filas:_

```text
"Franquicias de academias" y "Concesionarios" dieron 0 en 2021 (Nota 14) — no se cargan líneas
en 0 sin motivo (mismo criterio que el resto del sitio: no inventar una fila vacía).
```

### Gastos

```text
EEFF 2021. Nota 15/16, columna propia "2021" (verificada exacta contra la comparativa del EEFF
2022). Suma = -49.326371 M PEN, EXACTO igual a "Gastos" del Estado de resultados integrales 2021
(39.293039+7.165247+2.868085).
```

### Meta

```text
3.9865 = promedio de compra S/3.975 y venta S/3.998 al 31/12/2021, declarado por el propio EEFF
2021 (misma Nota que 2019/2020).
```

## 2020

### Ingresos

```text
EEFF 2020 (estado-financiero-2020.md, OCR). Nota 14 desglosada. Se usó la columna propia "2020"
del EEFF 2020 (no la comparativa "2020" del EEFF 2021, que difiere un poco en 2 sub-ítems —
"Academias de fútbol y vóley" 293.797 vs 241.496 y "Diversos" 1.564.381 vs 1.616.682 — ver
club-data-mapping sección 6, regla 5: usar siempre la columna del año corriente de ESE
documento). Suma = 44.948112 M PEN, EXACTO igual a "Ingresos" del Estado de resultados
integrales 2020.
```

_antes de la fila 12 (`Ingresos por participación en torneos internacionales`):_

```text
Nota: 2020 NO tiene "Ingresos por participación en torneos internacionales" como línea
relevante en Formato Simplificado porque el propio Estado de resultados la reporta en apenas
S/ 411.333 (pandemia: los torneos internacionales de ese año casi no se jugaron) — sí se carga,
ver la línea de abajo, solo que es chica.
```

### Gastos

```text
EEFF 2020. Nota 15/16, columna propia "2020". Suma = -47.452429 M PEN, EXACTO igual a "Gastos"
del Estado de resultados integrales 2020 (39.750555+6.473894+1.227980).
```

_antes de la fila 9 (`Gastos de marketing`):_

```text
"Diversos (gastos administrativos)" dio 0 en 2020, no se carga una fila en 0 sin motivo.
```

### Meta

```text
3.621 = promedio de compra S/3.618 y venta S/3.624 al 31/12/2020, declarado por el propio EEFF
2020 (misma Nota que 2019).
```

## 2019

### Ingresos

```text
EEFF 2019 (estado-financiero-2019.md, texto nativo). Nota 15 "Otros ingresos deportivos"
desglosada íntegra: sus 9 sub-ítems tienen categorías reales DISTINTAS entre sí (cuotas de
socios, taquilla, transferencias, academias, concesionarios, regalías, diversos), así que se
promovieron a líneas de primer nivel en vez de anidarlas como `items` de una sola línea "Otros
ingresos deportivos" (club-data-mapping SKILL.md sección 1, regla de la "fila acumulada"/
promoción de sub-ítems). Suma total = 59.376339 M PEN, EXACTO igual a "Ingresos" del Estado de
resultados integrales (18.401167+12.300941+11.252943+17.421288 = 59.376339).
```

### Gastos

```text
EEFF 2019. Nota 16 "Gastos deportivos" (Personal/Servicios/Depreciación/Diversos — sin
"Amortización" todavía, el intangible "Derechos federativos" recién aparece en el balance de
2020) y Nota 17 "Gastos administrativos" (Personal/Servicios/Estimaciones contables/Diversos),
cada sub-ítem promovido a línea de primer nivel (categorías distintas entre sí). Suma total =
-46.494783 M PEN, EXACTO igual a "Gastos" del Estado de resultados integrales 2019
(38.945731+6.696803+0.852249).
```

### Meta

```text
3.314 = promedio de compra S/3.311 y venta S/3.317 al 31/12/2019, el tipo de cambio que el
PROPIO EEFF 2019 declara en su Nota "Riesgo de tipo de cambio" (SBS, promedio ponderado). El
documento da un rango compra/venta, no un valor único como los Anexos de River/Racing — se usó
el promedio de los dos a falta de otro precedente en el sitio para este caso puntual.
```

## Fuentes

### alianzalima-pe-eeff-2019

_note (data/):_

```text
EEFF auditados (NIIF) por TGS Sarrio & Asociados, dictamen sin salvedades (con párrafo de énfasis sobre el proceso concursal por insolvencia del club, ver Nota 1b). Transcripción con texto nativo (pdftotext -layout) en Clubes/Perú/Alianza Lima/estado-financiero-2019.md.
```

### alianzalima-pe-eeff-2020

_note (data/):_

```text
EEFF auditados (NIIF) por TGS Sarrio & Asociados, dictamen sin salvedades (mismo párrafo de énfasis sobre el proceso concursal). Documento escaneado, transcripción OCR (Tesseract, -l spa --psm 6) en Clubes/Perú/Alianza Lima/estado-financiero-2020.md — números verificados contra el tie-out de Ingresos/Gastos/Resultado operativo del propio documento.
```

### alianzalima-pe-eeff-2021

_note (data/):_

```text
EEFF auditados (NIIF) por Ropert, Sarrio y Asociados (mismo estudio, nueva razón social), dictamen sin salvedades. Transcripción con texto nativo en Clubes/Perú/Alianza Lima/estado-financiero-2021.md, columna 2021 verificada exacta contra la comparativa 2021 del EEFF 2022.
```

### alianzalima-pe-eeff-2022

_note (data/):_

```text
EEFF auditados (NIIF) por Panez, Chacaliaza y Asociados. Documento escaneado, transcripción OCR en Clubes/Perú/Alianza Lima/estado-financiero-2022.md — ESTA TRANSCRIPCIÓN SOLO CUBRE LOS 4 ESTADOS PRINCIPALES, no las notas explicativas (a diferencia de 2019-2021), así que "Otros ingresos deportivos" y "Costos deportivos" quedan sin desglosar en revenueLines/expenseLines (ver comentario de cabecera de este archivo).
```

### alianzalima-pe-eeff-2023

_note (data/):_

```text
EEFF auditados (NIIF). Documento escaneado de baja calidad (OCR con bastante ruido en las páginas de portada), transcripción en Clubes/Perú/Alianza Lima/estado-financiero-2023.md — igual que 2022, solo los 4 estados principales, sin notas. Deuda concursal de este ejercicio se tomó de la comparativa del EEFF 2024 (ver comentario en fiscalYearMeta[2023]).
```

### alianzalima-pe-eeff-2024

_note (data/):_

```text
EEFF auditados (NIIF), publicados dentro de la Memoria Anual 2024 del club. Documento escaneado, transcripción OCR en Clubes/Perú/Alianza Lima/estado-financiero-2024.md — igual que 2022/2023, solo los 4 estados principales, sin notas.
```

## Otros

### Meta (alianzalimaPeFiscalYearMeta), en general

```text
fiscalYearMeta: los 6 son ejercicios REALES (EEFF auditados), año calendario (1/1 a 31/12, ver
fiscalYearStart:'01-01' en data/clubs.js). netInterest = "Gastos financieros, neto" + "Diferencia
de cambio, neta" combinados (club-data-mapping sección 2: nunca van como línea, siempre netos en
meta) — extraRows muestra los 2 componentes por separado para que la tabla "Estado de resultados"
los distinga, igual que hace River. grossDebt = "Deuda concursal" (corriente + no corriente): es la
única línea de pasivo que es deuda financiera de verdad (el resto — cuentas por pagar comerciales,
impuestos por pagar, ingresos diferidos — es pasivo operativo, no deuda), mismo criterio que
Boca/Vélez (club-data-mapping/referencia/formato-simplificado.md). cash = "Efectivo y equivalente de efectivo".
```

### alianzalimaPePasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos verificados todavía para este club
(fuera del alcance de esta sesión, que fue onboarding financiero). Mismo patrón que otros clubes
recién onboardeados sin este trabajo hecho todavía (ver data/co/envigado-data.js).
```

### gestionesByClub['alianzalima-pe']

```text
gestionesByClub: sin entradas para este club (ver comentario de cabecera — el club está bajo
administración concursal, no una presidencia electa, y no se investigó con confianza suficiente
quién administraba cada ejercicio puntual como para armar una atribución por año).
```
