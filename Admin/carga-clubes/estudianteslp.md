# estudianteslp — evidencia de carga

Lo que había como comentario en `data/ar/estudianteslp-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/estudianteslp-data.js — Club Estudiantes de La Plata: 9no club del motor genérico. 4
ejercicios consecutivos cargados: 2022, 2023, 2024, 2025 (30/6 de cada año), todos balances
auditados reales, texto nativo (Becher y Asociados S.R.L.). PDF + transcripción en
Clubes/Argentina/Estudiantes LP/memoria-y-balance-{2021-2022,2022-2023,2023-2024,2024-2025}.
{pdf,md}. El 4to (2024-2025) es un escaneo sin capa de texto (127 páginas) — transcripto vía OCR
(Tesseract, 300dpi); a diferencia de otros clubes esta sesión, sus 2 Anexos clave (Recursos-
Resultados por Sectores / Gastos) resultaron ser tablas grandes pero NÍTIDAS en el escaneo — se
verificaron visualmente contra la imagen renderizada (no solo el texto OCR crudo, que salía
bastante ruidoso en esta tabla en particular) antes de cargar.

2025 — Estructura NUEVA respecto a 2022-2024: el eje de fútbol ahora tiene "Fútbol - Plantel
profesional" como columna SEPARADA (antes esa economía de pases vivía dentro de "Fútbol -
Exhibición y espectáculos") — el club separó explícitamente transferencias/pases de la operación
de partidos este ejercicio. Se cargó con el mismo criterio de siempre: cada rubro por su
NATURALEZA (no por la columna de departamento en la que aparece), "Sueldos y jornales"/"Cargas
sociales" son los únicos 2 rubros que sí se reparten por columna (Fútbol - Exhibición y
espectáculos → wages_squad, resto de columnas sumadas → youth_other_sports_expense). DÉFICIT
real: $(14.277.112.789) ARS — primer déficit del club en los 4 ejercicios cargados.

Estructura (Anexo V "Recursos-Resultados por Sectores" / Anexo VI "Gastos"): igual mecanismo de
columna-por-sector que Vélez/Instituto/Rosario Central, pero acá el eje de fútbol se separa en
"Fútbol - Plantel profesional" (economía de pases: transferencias, revaluación de jugadores,
amortización acelerada) vs. "Fútbol - Exhibición y espectáculos" (operación de partidos: sueldos,
TV, publicidad, entradas) — DISTINTO de Vélez/Instituto, que usan una sola columna "Fútbol
Profesional" para todo. Para "Sueldos y jornales"/"Cargas sociales" se usó la columna "Fútbol -
Exhibición y espectáculos" como wages_squad (es la que de verdad tiene personal del plantel/cuerpo
técnico) y el resto de columnas como youth_other_sports_expense, mismo criterio de fondo que los
demás clubes aunque la columna de referencia tenga otro nombre.

A partir de 2023 aparece una 7ma columna "Estadio" (separada de "Fútbol - Exhibición y
espectáculos", donde vivía en 2022) — la fuente de cada ejercicio ya trae esa separación (o no)
por su cuenta, no se fuerza a que los 3 años tengan las mismas columnas.

"OTROS INGRESOS Y EGRESOS" (Nota 3.7 de cada ejercicio: Indemnizaciones y juicios, Licitaciones de
palco, Recuperos de cargas sociales Dto 1212, etc.) se cargó como líneas de revenue/expense
normales (other_income/other_expenses), NO como parte de RECPAM/netInterest — el propio documento
los separa de "RESULTADOS FINANCIEROS Y POR TENENCIA" (que SÍ va a netInterest).

"Resultado por revaluación de jugadores" y "Gastos por transferencias y préstamos jugadores"/
"Amortización acelerada por libertad de acción" van a `player_sales`/`player_amortisation`
respectivamente (economía de pases, columna "Fútbol - Plantel profesional").

grossDebt = "Deudas" (Nota 3.5) corriente+no corriente, EXCLUYENDO "Fondos específicos" y
"Previsiones" — mismo criterio que Boca/Vélez/Instituto. cash = Caja y bancos.

FX: cada balance declara su propio Anexo IV con DOS cotizaciones de USD (Activo vs. Pasivo,
diferencia de centavos) — se usó siempre la del lado Activo/Caja (coherente con `cash`), mismo
criterio que Rosario Central: $125,030 (2022), $256,30 (2023), $909,00 (2024 — mismo valor que
declararon Racing/Vélez/Instituto para la misma fecha de cierre), $1.196 (2025).

Gestión: Martín Gorostegui (presidente marzo-2021 a abril-2024) cubre 2022 y 2023 con confianza.
El balance 2024 (cierre 30/6/2024) está FIRMADO por Juan Sebastián Verón, proclamado presidente el
6/4/2024 — o sea, asumió ~3 meses antes del cierre de este ejercicio. DUDA ABIERTA (ver
Admin/dudas-por-club.md): Gorostegui presidió la gran mayoría de este ejercicio (jul-2023 a abr-2024),
pero es Verón quien firma el balance como Presidente — se cargó gestionId:'veron' (criterio de
"quien está a cargo al momento del cierre/firma", mismo usado para Berlanga/Belloso cuando asumen
a mitad de ejercicio), pero la mayoría de los meses del ejercicio fueron de Gorostegui, vale
confirmar el criterio con Guido. 2025 (Ejercicio completo bajo Verón, sin ambigüedad) también
gestionId:'veron'.
============================================================================
```

## 2025

### Meta

```text
grossDebt = Deudas corriente (23197.866989) + no corriente (12564.970707), EXCLUYENDO Fondos
específicos (144.600000+710.269290) y Previsiones (129.000000).
58112.923456+1404.273084 / 76269.807543. DÉFICIT FINAL real: $(14.277.112.789) ARS — primer
déficit del club en los 4 ejercicios cargados.
```

## 2024

### Gastos

_antes de la fila 4 (`Reconocimientos y premios`):_

```text
Reconocimientos y premios: premios al plantel profesional (columna 'Fútbol - Exhibición y espectáculos' del anexo de gastos, la de los sueldos de los jugadores; la memoria habla de 'reconocimientos con el plantel profesional'). Sueldos del plantel en todos los años (decisión de Guido, 2026-10-04).
```

### Meta

_al lado del campo `reportType`:_

```text
ver duda abierta en Admin/dudas-por-club.md
```

```text
49648.052256+9.707725+172.145497 / 40626.579372+172.697275.
```

## 2023

### Gastos

_antes de la fila 3 (`Reconocimientos y premios`):_

```text
Reconocimientos y premios: premios al plantel profesional (columna 'Fútbol - Exhibición y espectáculos' del anexo de gastos, la de los sueldos de los jugadores; la memoria habla de 'reconocimientos con el plantel profesional'). Sueldos del plantel en todos los años (decisión de Guido, 2026-10-04).
```

### Meta

```text
7404.751724+9.148760+236.542911 / 9109.489587+61.980949.
```

## 2022

### Gastos

_antes de la fila 8 (`Reconocimientos y premios`):_

```text
Reconocimientos y premios: premios al plantel profesional (columna 'Fútbol - Exhibición y espectáculos' del anexo de gastos, la de los sueldos de los jugadores; la memoria habla de 'reconocimientos con el plantel profesional'). Sueldos del plantel en todos los años (decisión de Guido, 2026-10-04).
```

### Meta

```text
officialTotalRevenue/Expenses = RECURSOS/GASTOS ORDINARIOS + la porción positiva/negativa de
"Otros Ingresos y Egresos" (Nota 3.7), ya que esas líneas se cargaron como revenue/expense
normales (ver comentario de cabecera): 4264.184851+68.756627 / 4419.205412+29.218628+0.024121.
```

## Gestiones

_antes de Juan Sebastián Verón (data/gestiones/ar.js):_

```text
Verón: desde el 27/11/2025 la AFA lo suspendió 6 meses y Gorostegui lo reemplazó de forma interina; se deja abierta.
```

## Fuentes

### estudianteslp-memoria-y-balance-2021-22

_note (data/):_

```text
PDF oficial (92 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 29/9/2022. SUPERÁVIT real: $574.824.674 ARS. Convertido a USD con $125,03 (Anexo IV, lado Activo/Caja — el Pasivo declara $125,23, diferencia de centavos). Ver data/ar/estudianteslp-data.js para el detalle completo de categorización (columna "Fútbol - Exhibición y espectáculos" = wages_squad, distinto nombre que Vélez/Instituto pero mismo criterio de fondo).
```

### estudianteslp-memoria-y-balance-2022-23

_note (data/):_

```text
PDF oficial (94 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 10/10/2023. SUPERÁVIT real: $14.074.185 ARS (mucho más chico que 2022, ver RESULTADOS FINANCIEROS/RECPAM). Convertido a USD con $256,30 (Anexo IV, lado Activo/Caja). OJO: la columna comparativa "30/06/2022" de ESTE documento reexpresa esos valores a la fecha de cierre de 2023 (moneda homogénea) — no se usó, se usa siempre el Ejercicio 2022 cargado desde SU PROPIO balance (ver club-data-mapping/SKILL.md sección 6, regla 5).
```

### estudianteslp-memoria-y-balance-2024-25

_note (data/):_

```text
PDF oficial (127 páginas, escaneado sin capa de texto, transcripto vía OCR con Tesseract — a diferencia de los 3 ejercicios anteriores del mismo club, que son texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 7/10/2025, firmado por Juan Sebastián Verón como Presidente (ejercicio completo bajo su gestión, sin ambigüedad). DÉFICIT real: $(14.277.112.789) ARS — primer déficit del club en los 4 ejercicios cargados. Estructura nueva: "Fútbol - Plantel profesional" aparece como columna separada de "Fútbol - Exhibición y espectáculos" (antes la economía de pases vivía dentro de esa 2da columna). Convertido a USD con $1.196 (Anexo de moneda extranjera, lado Activo/Caja). Ver data/ar/estudianteslp-data.js.
```

### estudianteslp-memoria-y-balance-2023-24

_note (data/):_

```text
PDF oficial (108 páginas, texto nativo), auditado por Becher y Asociados S.R.L., informe de fecha 8/10/2024, firmado por Juan Sebastián Verón como Presidente (proclamado el 6/4/2024, ~3 meses antes del cierre de este ejercicio — Martín Gorostegui presidió la mayoría de los meses de este mismo ejercicio, ver duda abierta en Admin/dudas-por-club.md). SUPERÁVIT real: $9.565.538.179 ARS (salto grande por una venta de pases importante: "Transferencias y préstamos de jugadores" $20.177.210.830). Convertido a USD con $909,00 (mismo valor que Racing/Vélez/Instituto para la misma fecha de cierre 30/6/2024).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.estudianteslp

```text
Confirmado por búsqueda (Versión 95): Martín Gorostegui presidente marzo-2021 a abril-2024.
Juan Sebastián Verón, proclamado presidente el 6/4/2024 (sin elecciones, lista única). Firma
el balance del Ejercicio 2024 como Presidente — ver duda abierta sobre el criterio de
atribución en Admin/dudas-por-club.md (la mayoría de los meses de ese ejercicio fueron de
Gorostegui).
```

### memberCountByClub.estudianteslp

```text
~55.781-56.000 socios (cobertura de prensa, 2026)
```
