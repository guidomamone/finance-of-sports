# udechile-cl — evidencia de carga

Lo que había como comentario en `data/cl/udechile-cl-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/cl/udechile-cl-data.js — Universidad de Chile (Azul Azul S.A.), Santiago,
Chile. clubId = 'udechile-cl' (sufijo de país, ver CONVENCIONES.md Versión
129 — 'udechile' a secas lo marca audit.js como clubid-sin-pais, P1). Primer
club chileno cargado en finance-of-sports. 3 ejercicios REALES cargados:
2024, 2023, 2022 (balances auditados consecutivos, sin años faltantes en el
medio).

FUENTE: Estados Financieros Consolidados bajo IFRS, descargados de la CMF
(Comisión para el Mercado Financiero de Chile, ficha
cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=76838140&tipoentidad=RVEMI,
pestaña "Información Financiera"), auditados por KAM Auditores Consultores
Ltda. Transcripciones completas (texto nativo vía pdftotext -layout) en
`Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-<año>.md`.
Cada documento trae el ejercicio propio + un comparativo del año anterior;
se verificó cruzando los 3 documentos entre sí que el comparativo de un
balance coincide EXACTO (sin reexpresar) con el año corriente del balance de
ESE año — Chile no reexpresa por inflación entre ejercicios, a diferencia de
los balances RT6 argentinos — así que no hay riesgo de mezclar columnas de
dos fechas de cierre distintas (ver club-data-mapping SKILL.md sección 6.5).

CIFRAS: el documento está en MILES de pesos chilenos (M$). Acá se guardan
divididas por 1.000, en MILLONES de CLP nativos (mismo criterio que
oncecaldas-co-data.js para COP).

TIPO DE CAMBIO: ninguno de los 3 balances declara su propio tipo de cambio
de cierre en un Anexo dedicado — se buscó explícito ("moneda extranjera"/
"Riesgo de Tipo de Cambio" en la Nota de Análisis de Riesgo de los 3 años) y
los 3 solo traen un análisis de SENSIBILIDAD (+/-10% sobre el tipo de cambio
de cierre, sin publicar el valor del propio tipo de cambio usado) más el %
de deuda en moneda extranjera sobre el total. Por eso se usa el dólar
observado SII de cierre, `fx` LITERAL con `fxSource:'market_approx'`:
2022 $859,51; 2023 $884,59; 2024 $992,12 (fin de semana, sin publicación
propia del 31/12 exacto en los 3 años) — NO un `fxRef` a FX_CLOSE en
data/currency-map.js, que es solo para cotizaciones EXACTAS
(`market_close`); ver la regla en el comentario de esa tabla.

ESTRUCTURA DEL P&L: a diferencia de Boca/River/Racing (formato por
naturaleza del gasto), Azul Azul reporta "por función" (Costo de Ventas +
Gasto de Administración), formato IFRS estándar de sociedad anónima. El
desglose por RUBRO real está en las notas:
  - Nota "Ingresos de Actividades Ordinarias": 6 líneas (Borderó, Publicidad,
    Participación torneos Internacionales, Derechos de T.V., Ingresos por
    transferencias de pases de jugadores, Ingresos varios) — de ahí sale
    revenueLines completo, no hace falta ningún catch-all no clasificable.
  - Nota "Composición de Cuentas de Resultados Relevantes", parte a) Costo
    de Ventas: Borderó (costos directos), Remuneraciones, Amortización de
    pases, Costo de venta de pases de jugadores, Otros gastos de operación.
  - Misma nota, parte b) Gastos de Administración: Servicios básicos,
    Asesorías, Depreciaciones y amortizaciones, Arriendos, Mantenciones,
    Remuneraciones Administración, Otros Gastos de Administración.
Los 2 rubros (Costo de Ventas y Gasto de Administración) son subtotales de
FUNCIÓN, no de naturaleza — se promovieron sus 12 líneas combinadas a
primer nivel (ver club-data-mapping SKILL.md sección 1: si cada sub-ítem
tiene una categoría real distinta, no un bolsón `lump_football_operations`).

CATEGORIZACIÓN (rubros sin precedente exacto en otros clubes):
  - "Borderó" (ingreso) = recaudación de partidos (Torneo Nacional, Copa
    Chile, Torneos Internacionales, amistosos), término chileno para la
    distribución de taquilla → matchday_competition.
  - "Borderó (costos directos)" (gasto) = costos de organizar cada evento,
    traslados y concentración del plantel (según la propia Nota de
    Información por Segmentos, que separa esto de "Remuneraciones") →
    match_organisation_expense.
  - "Participación torneos Internacionales" (ingreso) = premio/bono por
    participar en competencias internacionales, separado de Borderó por el
    propio documento → competition_bonus.
  - "Remuneraciones"/"Remuneraciones Administración" → wages_squad (plantel,
    dentro de Costo de Ventas) / admin_general_expense (administración,
    dentro de Gasto de Administración) respectivamente — mismo criterio de
    "cargas/sueldos van con su sector" de club-data-mapping/referencia/casos-por-pais-y-formato.md.
  - "Amortización de pases" / "Costo de venta de pases de jugadores" →
    player_amortisation (igual criterio que Once Caldas/Racing: costo de
    adquirir/vender el derecho federativo del jugador).
  - "Otros gastos de operación" (dentro de Costo de Ventas, sin desglose
    adicional en la fuente) → other_expenses.
  - Todo el resto de Gastos de Administración (servicios básicos, asesorías,
    arriendos, mantenciones, otros gastos de administración) →
    admin_general_expense; "Depreciaciones y amortizaciones" → depreciation.

RESULTADO FINANCIERO (netInterest, NUNCA como línea, ver club-data-mapping
SKILL.md sección 2): el propio Estado de Resultados imprime, debajo de
"Gasto de administración", 4 líneas antes de "Ganancia (pérdida), antes de
impuestos": Ingresos financieros, Otras ganancias o pérdidas, Costos
financieros, Diferencia de cambio, Resultado por unidades de reajuste (este
último es el ajuste por UF/inflación de partidas indexadas, típico de
Chile). Las 5 se suman netas a `netInterest`. Confirmación fuerte de que
esta agrupación es la correcta: la propia Nota de Información por Segmentos
(Nota 23, 2024) suma estas mismas 5 líneas bajo su propia fila "Resultado
no operacional" — o sea que el documento MISMO ya las trata como un bloque
financiero/no-operacional separado de Ingresos/Costo de Ventas/Gasto de
Administración.

"(Gasto) utilidad por impuestos a las ganancias" → `tax` en fiscalYearMeta
(mismo campo que Once Caldas), no como línea.

grossDebt = "Otros pasivos financieros" corrientes + no corrientes (línea
angosta de deuda financiera real, NO el Total Pasivos completo — mismo
criterio que Boca/Vélez, ver club-data-mapping/referencia/formato-simplificado.md: el
Estado de Situación Financiera de Azul Azul separa esta deuda financiera de
"Cuentas por pagar comerciales"/"Otros pasivos no financieros"/
"Provisiones", así que se usa la línea angosta). cash = "Efectivo y
equivalentes al efectivo".

VERIFICACIÓN (los 3 años, club-data-mapping SKILL.md sección 6): revenueLines
suma EXACTO el total impreso de "Ingresos de Actividades Ordinarias" en los
3 años (24.057,808 / 18.684,003 / 14.515,925 M CLP — con una diferencia de
redondeo de 0,001 M en 2022, ver nota puntual abajo). expenseLines suma
EXACTO el total de Costo de Ventas + Gasto de Administración impreso en los
3 años. Revenue + Expenses + netInterest + tax reconstruye la "Ganancia
(pérdida)" final impresa, exacto, en los 3 años:
  2024: 24057,808 - 22260,627 - 1473,596 + 920,675 = 1244,260 (oficial: 1.244.260)
  2023: 18684,003 - 16918,563 - 1391,540 + 1162,475 = 1536,375 (oficial: 1.536.375)
  2022: 14515,925 - 16432,670 -  448,920 +  669,533 = -1696,132 (oficial: -1.696.132)
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Borderó | pág. 72, precedente |
| 2 | Publicidad | pág. 72, precedente |
| 3 | Participación torneos Internacionales | pág. 72, precedente |
| 4 | Derechos de T.V. | pág. 72, precedente |
| 5 | Ingresos por ventas de productos | pág. 72, precedente |
| 6 | (ventas de pases) | pág. 72, Jev 1 |
| 7 | Cesión temporal de derechos federativos (Préstamos) | pág. 72, Jev 1 |
| 8 | Otros (Derechos de Formación, Solidaridad, etc.) | pág. 72, precedente |
| 9 | Ingresos varios | pág. 72, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Borderó (costos directos) | pág. 73, precedente |
| 2 | Remuneraciones | pág. 73, precedente |
| 3 | Amortización de pases | pág. 73, Jev 1 |
| 4 | Deterioro de pases | pág. 73, Claude 0.9 |
| 5 | Costo de venta pases de jugadores | pág. 73, Jev 0.98 |
| 6 | Costo de ventas de productos | pág. 73, Jev 1 |
| 7 | Concentraciones y viajes | pág. 73, Jev 0.99 |
| 8 | Indumentaria y equipamiento deportivo | pág. 73, Jev 0.98 |
| 9 | Otros gastos de operación | pág. 73, Jev 0.92 |
| 10 | Servicios básicos | pág. 73, Jev 0.99 |
| 11 | Asesorías | pág. 73, Jev 0.99 |
| 12 | Depreciaciones y amortizaciones | pág. 73, Jev 0.99 |
| 13 | Mantenciones | pág. 73, Jev 1 |
| 14 | Remuneraciones Administración | pág. 73, Jev 1 |
| 15 | Multas Conmebol y otras | pág. 73, precedente |
| 16 | Publicidad | pág. 73, precedente |
| 17 | Otros Gastos de Administración | pág. 73, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Gastos

_antes de la fila 1 (`Costo de Ventas: Borderó (costos directos)`):_

```text
Nota "Composición de Cuentas de Resultados Relevantes" a) Costo de Ventas ($18.046,118 M impreso):
```

_antes de la fila 6 (`Gasto de Administración: Servicios básicos`):_

```text
b) Gasto de Administración ($4.214,509 M impreso):
```

### Meta

```text
Ingresos financieros (85,232) + Otras ganancias o pérdidas (0) + Costos financieros (-833,835)
+ Diferencia de cambio (23,090) + Resultado por unidades de reajuste (-748,083) — el propio
documento agrupa estas 5 líneas bajo "Resultado no operacional" en su Nota de Información por
Segmentos, ver comentario de cabecera.
grossDebt = Otros pasivos financieros corrientes (1.471,735) + no corrientes (12.244,506).
```

_al lado del campo `cash`:_

```text
Efectivo y equivalentes al efectivo
```

## 2023

### Meta

```text
Ingresos financieros (88,441) + Otras ganancias o pérdidas (8,078) + Costos financieros
(-854,683) + Diferencia de cambio (39,647) + Resultado por unidades de reajuste (-673,023).
```

_al lado del campo `grossDebt`:_

```text
1.394,004 (corriente) + 13.103,175 (no corriente)
```

## 2022

### Ingresos

_antes de la fila 6 (`Ingresos varios`):_

```text
1.053,975 M impreso (pág. 76 del documento propio de 2022) — la suma de las 6 líneas da
14.515,926 M contra el total impreso de 14.515,925 M (diferencia de 0,001 M = 1.000 pesos,
redondeo del propio documento entre esta cifra y su comparativo en el balance 2023, que
imprime 1.053,974 M para el mismo concepto). Se usa el valor tal cual imprime CADA documento
en su propio año corriente (regla de club-data-mapping SKILL.md sección 6.5); el
officialTotalRevenue de abajo usa el total impreso (14.515,925), no esta suma.
```

### Gastos

_antes de la fila 4 (`Costo de Ventas: Costo de venta de pases de jugadores (indemnización por término anticipado de contrato)`):_

```text
Este año SÍ tuvo costo de venta de pases real (indemnización por término anticipado de
contrato de un jugador, ver Nota de detalle): -25.341, a diferencia de 2023/2024 (ambos $0).
```

### Meta

```text
Ingresos financieros (142,003) + Otras ganancias o pérdidas (0,181) + Costos financieros
(+1.507,393 NETO POSITIVO este año: incluye una condonación de multas e intereses por prepago
de una deuda tributaria heredada de la concesión de Corfuch a la Tesorería General, ver la
propia Nota de "Composición de Cuentas de Resultados Relevantes" c) Costos Financieros del
documento 2022 — no es un error de signo, el documento lo imprime así) + Diferencia de cambio
(-519,700) + Resultado por unidades de reajuste (-1.578,797).
```

_al lado del campo `grossDebt`:_

```text
490,377 (corriente) + 13.817,537 (no corriente)
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Michael Clark Varela (2021-09-30 a 2026-04-23): Elegido por el directorio de Azul Azul tras la renuncia de Cristián Aubert como presidente. Diario Financiero da el 30/9/2021; Wikipedia en inglés y la prensa 1/10/2021 (fecha del anuncio); se usó el 30/9. Renunció el 23/4/2026 (hecho esencial a la CMF), Cecilia Pérez asumió interina. Clark controla ~63% vía un fondo (entidad), por eso no es 'dueño'.
Duda: Discrepancia 30/9 vs 1/10/2021 (y un 21/10/2021 en el cuerpo de Wikipedia) para el inicio; no afecta ningún cierre.
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2013.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Borderó | pág. 65, precedente |
| 2 | Publicidad | pág. 65, precedente |
| 3 | Derechos de T.V. | pág. 65, precedente |
| 4 | Cesión definitiva de derechos federativos y económicos (ventas de pases) | pág. 65, Jev 1 |
| 5 | Cesión temporal de derechos federativos (Préstamos) | pág. 65, precedente |
| 6 | Otros (Derechos de Formación, Solidaridad, etc.) | pág. 65, precedente |
| 7 | Ingresos varios | pág. 65, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Borderó (costos directos) | pág. 66, precedente |
| 2 | Remuneraciones | pág. 66, precedente |
| 3 | Amortización de pases | pág. 66, precedente |
| 4 | Costo no amortizado | pág. 66, Claude 0.88 |
| 5 | Indemnización por término anticipado de contrato | pág. 66, Claude 0.85 |
| 6 | Otros costos | pág. 66, Jev 0.96 |
| 7 | Otros gastos de operación | pág. 66, precedente |
| 8 | Gasto de administración | pág. 7, Jev 0.91 |
| 9 | Otras ganancias o pérdidas | pág. 7, Jev 0.9 |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-25): cl-primera, verificado contra roster cacheado de "2013–14 Campeonato Nacional Primera División" (tools/club-league-reference/cl.json), coincidencia exacta "Universidad de Chile".
```

## Fuentes

### udechile-cl-estados-financieros-2024

_note (data/):_

```text
Descargado de la CMF (Comisión para el Mercado Financiero de Chile), ficha de Azul Azul S.A. (RUT 76.838.140-0), pestaña "Información Financiera". Auditado por KAM Auditores Consultores Ltda. (Freddy Lizana S.), opinión sin salvedades. Cifras impresas en miles de pesos (M$); ninguna nota declara un tipo de cambio propio de cierre (solo un análisis de sensibilidad +/-10%, sin valor puntual), se usó el dólar observado SII de mercado (ver data/currency-map.js). Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2024.md.
```

### udechile-cl-estados-financieros-2023

_note (data/):_

```text
Descargado de la CMF, misma ficha que el ejercicio 2024. Cifras confirmadas idénticas (sin reexpresar) contra el comparativo "2023" que trae el balance 2024. Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2023.md.
```

### udechile-cl-estados-financieros-2022

_note (data/):_

```text
Descargado de la CMF, misma ficha. Cifras confirmadas idénticas (sin reexpresar) contra el comparativo "2022" que trae el balance 2023, salvo una diferencia de redondeo de 0,001 M CLP en "Ingresos varios" (1.053,975 M en el documento propio de 2022 vs. 1.053,974 M en el comparativo del documento 2023) — redondeo del propio emisor, no un error de transcripción. Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2022.md.
```

### udechile-cl-estados-financieros-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### udechile-cl-estados-financieros-2013

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### udechilePasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
club (fuera de alcance de esta sesión, enfocada en Finanzas 2022-2024). Arrays vacíos en vez de
placeholders inventados.
```

### gestionesByClub['udechile-cl']

```text
gestionesByClub: Azul Azul S.A. es una sociedad anónima deportiva profesional (no un club
asociativo con presidente electo) — no se pudo confirmar con confianza una atribución de
"gestión"/directorio específica por ejercicio en esta sesión. Se agrega una entrada genérica
"Gestión actual" (mismo criterio que Once Caldas/Envigado, club-data-mapping SKILL.md sección 7).
```
