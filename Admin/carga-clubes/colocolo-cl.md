# colocolo-cl — evidencia de carga

Lo que había como comentario en `data/cl/colocolo-cl-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/cl/colocolo-cl-data.js — Colo-Colo (Blanco y Negro S.A. y Filiales), Chile. clubId:'colocolo-cl'
(convención desde la Versión 129, CONVENCIONES.md: todo club nuevo lleva el país al final del id).
Primer club chileno cargado en finance-of-sports (junto con Universidad de
Chile y Universidad Católica, misma sesión, 2026-09-25).

FUENTE: Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales
(IFRS, auditados), transcriptos completos en:
  Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2024.md
  Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2023.md
  Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2022.md
Ejercicio 2024 y 2023 extraídos del documento de 2024 (que trae ambos años
como columnas "Acumulado" 01.01-31.12, formato estándar de EEFF chilenos, sin
reexpresión por inflación entre ejercicios) — se verificó cruzando contra el
"año corriente" del documento propio de 2023 (mismo pretax $852.053 M$ y mismo
tax -$34.283 M$ en ambos documentos), así que usar el comparativo del reporte
2024 para el ejercicio 2023 es equivalente a usar el reporte de 2023 directo.
Ejercicio 2022 extraído de su propio documento (estados-financieros-2022.md).

CIFRAS: el documento reporta en MILES de pesos chilenos (M$). Acá se guardan
ya divididas por 1.000, en MILLONES de pesos (CLP), mismo criterio de unidad
que usa el sitio para ARS/COP (amountNative en millones nativos).

REVENUE = Nota 22 "Ingresos de actividades ordinarias y otros ingresos por
función" (6 líneas de ingresos ordinarios + el desglose de "otros ingresos,
por función", una línea de P&L aparte, debajo de la ganancia bruta) — la suma
de las 6 líneas ordinarias da EXACTO el total impreso ($47.333.779 M$ en 2024,
$29.660.025 M$ en 2023, $28.846.935 M$ en 2022), y sumándole "Otros ingresos,
por función" da el total de revenueLines de cada año.

EXPENSES = Nota 23 (2024)/24 (2022) "Composición de cuentas de resultados
relevantes", que desglosa por NATURALEZA "Costo de ventas", "Gastos de
administración" y "Otros gastos, por función" — las 3 sub-tablas reconcilian
EXACTO contra los 3 totales impresos en el Estado de Resultados.

CATEGORIZACIÓN (revenue): "Ingresos por recaudaciones" -> matchday_competition;
"venta de jugadores comprado a terceros"/"formados por el Club" -> player_sales
(2 líneas separadas porque el documento las separa así, ver Nota 22); "Ingresos
por publicidad" -> sponsorship_commercial; "Ingresos por derechos de
televisión" -> broadcasting; "Otros" (dentro de ingresos ordinarios) y "Otros
ingresos, por función" (línea de P&L aparte, debajo de la ganancia bruta) ->
other_income, cada una su propia línea (no se combinan, para poder auditar
cada una contra la nota que la sustenta).

CATEGORIZACIÓN (expenses), dentro de "Costo de ventas": "Costo de ventas
jugadores" (costo asociado a las ventas del año, distinto de la amortización
del plantel activo) -> player_amortisation; "Remuneración plantel profesional
y cuerpo técnico" -> wages_squad; "Amortización Activos en concesión"
(amortización de activos de la concesión del Estadio Monumental, no vinculada
a jugadores) -> depreciation; "Amortización pases jugadores profesionales" ->
player_amortisation; "Costos de concentración traslados y otros" (viajes,
pretemporada, concentración del plantel) -> match_organisation_expense;
"Otros costos" -> other_expenses. Dentro de "Gastos de administración": todo
-> admin_general_expense salvo "Depreciaciones" -> depreciation (es
depreciación de activo fijo administrativo, no de plantel). Dentro de "Otros
gastos, por función": "Otros gastos" -> other_expenses; "Intereses y Multas"
(multas/recargos, no interés financiero de deuda) -> other_expenses, NO va a
netInterest (ese campo es solo Ingresos/Costos financieros + diferencias de
cambio, ver abajo).

RESULTADOS FINANCIEROS: "Ingresos financieros" - "Costos financieros" -
"Diferencias de tipo de cambio" (netas) van a fiscalYearMeta[year].netInterest,
nunca como línea (club-data-mapping SKILL.md sección 2).

IMPUESTO: "Gasto (Ingreso) por Impuesto a las Ganancias" va a
fiscalYearMeta[year].tax. OJO CON EL SIGNO: en este documento, cuando la línea
es POSITIVA representa un INGRESO/beneficio tributario que se SUMA al pretax
para llegar al resultado después de impuesto (confirmado sumando: pretax +
tax = PAT exacto en los 3 ejercicios) — no es el signo "gasto resta" que
tienen otros balances, así que el valor se carga literal, con su signo tal
cual lo imprime el documento.

TIPO DE CAMBIO: ninguno de los 3 documentos (2022/2023/2024) declara su propio
tipo de cambio de cierre en un Anexo dedicado (la Nota 28 "Moneda extranjera"
desglosa activos/pasivos por moneda YA CONVERTIDOS a M$, sin declarar la tasa
usada) — se usa el dólar observado (SII/Banco Central de Chile) de cierre de
ejercicio, fx LITERAL (no fxRef a FX_CLOSE) porque fxSource:'market_approx':
el 31/12 no tiene publicación propia en la serie consultada (cae fin de semana
en 2022 y 2023; sin dato en la serie de SII para 2024) y se usó el día hábil
más cercano — data/currency-map.js documenta que una cotización `market_approx`
se queda literal en el archivo del club, no se centraliza en FX_CLOSE, para que
nadie la reuse creyendo que es un cierre oficial exacto. Valores: 2022-12-30
$859,51; 2023-12-29 $884,59; 2024-12-30 $992,12 (dólar observado SII/BCCh).

GESTIÓN: Alfredo Stohwing presidió Blanco y Negro S.A. desde abril de 2022
hasta abril de 2024 (~2 años, fuente: prensa deportiva chilena, abril 2024,
cobertura de la vuelta de Aníbal Mosa a la presidencia); cierra los ejercicios
2022 y 2023 (31/12, antes del cambio de abril 2024). Aníbal Mosa asumió el 26
de abril de 2024 (su 3er período) y es quien preside al cierre del ejercicio
2024 (31/12/2024), criterio "gestión al cierre del ejercicio" (mismo que ya
usa el sitio, ver cabecera de data/club-leagues.js).

grossDebt/cash: NO se cargaron (no se revisó el Estado de Situación Financiera
completo en esta sesión). Se habían dejado en 0 (convención vieja); el 2026-10-14 pasaron a null (sin dato no es
cero: el sitio mostraba "Deuda 0 / Caja 0"). Los completa tools/caja-deuda.mjs.
============================================================================
```

_de data/clubs.js:_

```text
Chile (onboarding 2026-09-25): primer país sudamericano con moneda propia CLP (scale:1000, ver
data/currency-map.js). fiscalYearStart:'01-01': los 3 son sociedades anónimas cerradas/abiertas
que reportan EEFF IFRS en año calendario (1/1 a 31/12), igual que Brasil/Colombia, no un
ejercicio partido como los clubes argentinos/españoles.
Los 3 clubes de Chile llevan el país al final del id (convención desde la Versión 129,
CONVENCIONES.md: `<clubId>-<iso2>`), a diferencia de los 41 clubes heredados de arriba. Clave
entre comillas porque un id con guion no es una key JS válida sin comillas. brandColor: color
identificador del club verificado contra footylogos.com (Colo-Colo negro de su camiseta, no el
azul/dorado del escudo; U de Chile y Católica el azul de su camiseta pese a ser predominantemente
blanca, mismo criterio que River con su franja roja).
```

_de data/club-leagues/cl.js:_

```text
Verificado el 25/9/2026 contra "2022/2023/2024 Campeonato Nacional Primera División" (Wikipedia):
los 3 jugaron Primera División de Chile en los 3 ejercicios (Colo-Colo campeón en 2022 y 2024).
clubId con sufijo de país (Versión 129: colocolo-cl/udechile-cl/catolica-cl), clave entre // 2021: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2025: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2020: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2019: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2018: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2010: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2011: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2012: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2013: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2014: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2015: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2016: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2017: tools/cargar.mjs 2026-10-02, SIN VERIFICAR
comillas porque un id con guion no es una key JS válida sin comillas.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por recaudaciones | pág. 72, precedente |
| 2 | Ingresos por venta de jugadores comprado a terceros | pág. 72, precedente |
| 3 | Ingresos por publicidad | pág. 72, precedente |
| 4 | Ingresos por derechos de televisión | pág. 72, precedente |
| 5 | Otros | pág. 72, precedente |
| 6 | Condonación | pág. 74, Jev 1 |
| 7 | Condonación Intereses y Multas TGR | pág. 74, Jev 1 |
| 8 | Dividendos | pág. 74, Jev 1 |
| 9 | Otros Ingresos | pág. 74, Jev 0.92 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas jugadores | pág. 75, precedente |
| 2 | Remuneración plantel profesional y cuerpo técnico | pág. 75, precedente |
| 3 | Amortización Activos en concesión | pág. 75, precedente |
| 4 | Amortización Otros Intangibles | pág. 75, Jev 1 |
| 5 | Amortización pases jugadores profesionales | pág. 75, precedente |
| 6 | Costos de concentración traslados y otros | pág. 75, precedente |
| 7 | Otros costos | pág. 75, precedente |
| 8 | Gasto de administración | pág. 10, precedente |
| 9 | Otros gastos, por función | pág. 10, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2024

### Meta

_al lado del campo `netInterest`:_

```text
Ingresos financieros - Costos financieros - Diferencias de tipo de cambio
```

_al lado del campo `grossDebt`:_

```text
no sourceado en esta sesión (fuera de alcance)
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento anterior): "Efectivo y Equivalentes al Efectivo" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Otros pasivos financieros corrientes 0 + no corrientes 0 en balance; pero Cuentas por pagar empresas relacionadas (Fynpal Spa, accionista común) 1.872.558 M$ corriente = financiamiento (interés efectivo 18,69%, 'Total Deuda'). Fynpal (cesión de créditos con prenda; flujos 'Obtención/Pagos financiamiento Fynpal' en actividades de financiación) está clasificado en el balance 2024 como cuenta por pagar a relacionadas, no en Otros pasivos financieros (0). Se incluye por coherencia con 2023 (donde estaba en Otros pasivos financieros). Si se prefiere el rubro literal, la deuda 2024 es 0. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## 2023

### Meta

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Efectivo y Equivalentes al Efectivo" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Otros pasivos financieros corrientes 2.804.415 M$ (Fynpal Spa 2.794.267 + Giser 10.148) + no corrientes 0. Fynpal = cesión de créditos (cuotas de licenciamiento TNT Sport) con prenda, interés efectivo 20,78%; en el doc 2024 el comparativo 2023 reclasifica los 2.794.267 de Fynpal a 'Cuentas por pagar empresas relacionadas' y deja solo 10.148 como pasivo financiero. Elegido 2.804.415 (doc 2023). (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## 2022

### Meta

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Otros pasivos financieros corrientes" pág. 6 + "Otros pasivos financieros, no corrientes" pág. 6; cash escalón 1b (compuerta: documento siguiente): "Efectivo y Equivalentes al Efectivo" pág. 5
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2013.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos por recaudaciones | pág. 78, precedente |
| 2 | Ingresos por venta de jugadores comprado a terceros(*) | pág. 78, precedente |
| 3 | Ingresos por venta de jugadores formados por el Club(**) | pág. 78, precedente |
| 4 | Ingresos por publicidad | pág. 78, precedente |
| 5 | Otros | pág. 78, precedente |
| 6 | Otros ingresos, por función | pág. 8, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de venta jugadores | pág. 79, precedente |
| 2 | Remuneración plantel profesional y cuerpo técnico | pág. 79, precedente |
| 3 | Amortización Activos en concesión | pág. 79, precedente |
| 4 | Amortización pases jugadores profesionales | pág. 79, precedente |
| 5 | Costos de concentración traslados y otros | pág. 79, precedente |
| 6 | Otros costos | pág. 79, precedente |
| 7 | Servicios básicos | pág. 79, Jev 0.99 |
| 8 | Asesorías | pág. 79, Jev 0.99 |
| 9 | Depreciaciones | pág. 79, precedente |
| 10 | Gastos Legales | pág. 79, Jev 0.99 |
| 11 | Mantenciones | pág. 79, Jev 0.99 |
| 12 | Remuneración administración | pág. 79, Jev 1 |
| 13 | Otros gastos de administración | pág. 79, Jev 0.98 |
| 14 | Otros gastos, por función | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-25): cl-primera, verificado contra roster cacheado de "2013–14 Campeonato Nacional Primera División" (tools/club-league-reference/cl.json), coincidencia exacta "Colo-Colo".
```

## Fuentes

### colocolo-cl-estados-financieros-2024

_note (data/):_

```text
EEFF consolidados bajo IFRS, con notas completas (82+ páginas). Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2024.md. Tipo de cambio: dólar observado de cierre (el documento no declara uno propio). OJO: según Admin/sourcing/Chile/Colo-Colo (Blanco y Negro).md, este balance fue inicialmente rechazado por los accionistas en la junta de abril 2025 (por el tratamiento contable del contrato con DG Medios) y la CMF debió intervenir; el PDF cargado es el que finalmente circuló, pero conviene revisar prensa de la época antes de citar este ejercicio como definitivo sin salvedad.
```

### colocolo-cl-estados-financieros-2023

_note (data/):_

```text
Cifras del ejercicio 2023 extraídas del comparativo del documento de 2024 (verificado idéntico contra el "año corriente" del documento propio de 2023: mismo pretax y mismo impuesto). Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2023.md.
```

### colocolo-cl-estados-financieros-2022

_note (data/):_

```text
Transcripción completa en Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2022.md.
```

### colocolo-cl-estados-financieros-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### colocolo-cl-estados-financieros-2013

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Chile/Colo-Colo (Blanco y Negro)/estados-financieros-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### colocoloPasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía (fuera de
alcance de esta sesión, que se enfocó en Finanzas 2022-2024).
```

### gestionesByClub['colocolo-cl']

```text
gestionesByClub: Alfredo Stohwing presidió Blanco y Negro S.A. abril 2022 - abril 2024 (cierra
2022 y 2023); Aníbal Mosa asumió su 3er período el 26/4/2024 (cierra 2024). Fuente: cobertura de
prensa deportiva chilena de abril 2024 sobre el cambio de presidencia (Emol, Cooperativa,
Meganoticias, La Tercera) — ver comentario de cabecera de este archivo.
```
