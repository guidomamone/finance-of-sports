# rapidwien-at — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/rapidwien-at-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Rapid Wien: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.pdf. brandColor #009150
(procedencia en Admin/sourcing/Austria/Rapid Wien.md; tools/cargar-lote.mjs).
```

```text
data/at/rapidwien-at-data.js — SK Rapid GmbH (Austria).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "rapidwien-at" — slug de "Rapid Wien" + '-at' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "SK Rapid GmbH" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social de la sociedad que oper
  displayName        ok        "Rapid Wien" — nombre de la carpeta del club en Clubes/
  country            ok        "AT" — carpeta de país "Austria" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Austria
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-
  sport              ok        "futbol" — el .md nombra el fútbol 11 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consol
  currency           ok        "EUR" — moneda de curso legal de Austria (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "rapidwien-at-geschaeftsbericht-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "at-bundesliga" — roster cacheado de "2023–24 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia única por palabras "SK Rapid" = "Rapid W

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"rapidwien-at-geschaeftsbericht-2023-24"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsatzerlöse | pág. 28, precedente |
| 2 | Erträge aus dem Abgang von Anlagevermögen | pág. 28, precedente |
| 3 | Erträge aus der Auflösung von Rückstellungen | pág. 28, precedente |
| 4 | Übrige | pág. 28, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen Spielbetrieb, Transfers etc. | pág. 28, precedente |
| 2 | Aufwendungen für bezogene Leistungen | pág. 28, precedente |
| 3 | Löhne & Gehälter | pág. 28, precedente |
| 4 | Soziale Aufwendungen | pág. 28, precedente |
| 5 | Abschreibungen | pág. 28, precedente |
| 6 | Steuern, soweit sie nicht unter Steuern vom Einkommen fallen | pág. 28, precedente |
| 7 | Übrige | pág. 28, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2024-25; el registro no trae cierre
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): perimetro = consolidado. El documento presenta solo el estado consolidado (Konsolidierte Bilanz): un ejercicio con un solo perímetro publicado se carga con ese (CONVENCIONES-DATOS, perímetro); igual que 2010-13 a 2023-24 ya ajustados
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022): Comercial / Sponsors, Estadio, Televisión, Venta de Jugadores
```

### Liga

```text
tools/cargar.mjs (2026-10-20): at-bundesliga, verificado contra roster cacheado de "2024–25 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia única por palabras "SK Rapid" = "Rapid Wien".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsatzerlöse | pág. 26, Jev 0.99 |
| 2 | Erträge aus dem Abgang von Anlagevermögen | pág. 26, Jev 0.99 |
| 3 | Erträge aus der Auflösung von Rückstellungen | pág. 26, Jev 1 |
| 4 | Übrige | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen Spielbetrieb, Transfers etc. | pág. 26, precedente |
| 2 | Aufwendungen für bezogene Leistungen | pág. 26, precedente |
| 3 | Löhne & Gehälter | pág. 26, precedente |
| 4 | Soziale Aufwendungen | pág. 26, precedente |
| 5 | Abschreibungen | pág. 26, precedente |
| 6 | Steuern, soweit sie nicht unter Steuern vom Einkommen fallen | pág. 26, Jev 1 |
| 7 | Übrige | pág. 26, Jev 0.99 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2023-24; el registro no trae cierre
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022): Comercial / Sponsors, Estadio, Televisión, Venta de Jugadores
```

### Liga

```text
alta-club.mjs (2026-10-20): at-bundesliga, verificado contra roster cacheado de "2023–24 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia única por palabras "SK Rapid" = "Rapid Wien".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsatzerlöse | pág. 22, precedente |
| 2 | Erträge aus der Auflösung von Rückstellungen | pág. 22, precedente |
| 3 | Übrige | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwendungen Spielbetrieb, Transfers etc. | pág. 22, precedente |
| 2 | Aufwendungen für bezogene Leistungen | pág. 22, precedente |
| 3 | Löhne & Gehälter | pág. 22, precedente |
| 4 | Soziale Aufwendungen | pág. 22, precedente |
| 5 | Abschreibungen | pág. 22, precedente |
| 6 | Sonstige betriebliche Aufwendungen | pág. 22, Jev 0.96 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2022-23; el registro no trae cierre
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022): Comercial / Sponsors, Estadio, Televisión, Venta de Jugadores
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2023 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2022–23 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2023). Antes: sin fila.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 24, Jev 1 |
| 2 | Sponsoring | pág. 24, Jev 1 |
| 3 | Hospitality – VIP | pág. 24, precedente |
| 4 | Merchandising | pág. 24, Jev 0.99 |
| 5 | Rechteverwertung | pág. 24, precedente |
| 6 | Transfererlöse | pág. 24, Jev 0.99 |
| 7 | Fanreisen | pág. 24, precedente |
| 8 | sonstige Erlöse | pág. 24, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsofeistungen | pág. 24, precedente |
| 2 | Aufwand Heimspiele | pág. 24, Jev 1 |
| 3 | Aufwand Hospitality – VIP | pág. 24, Jev 0.97 |
| 4 | Wareneinsatz Merchandising | pág. 24, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 24, Jev 0.93 |
| 6 | Fanreisen | pág. 24, precedente |
| 7 | Personalaufwand | pág. 24, precedente |
| 8 | Abgaben, Gebühren, Strafen | pág. 24, precedente |
| 9 | Spiel- und Trainingsbetrieb | pág. 24, Claude 0.85 |
| 10 | Managementgebühren und Vermittlungsprovisionen | pág. 24, precedente |
| 11 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 24, precedente |
| 12 | Klubservice, Events, PR und Marketing | pág. 24, precedente |
| 13 | Verwaltungs-, Versicherungs- und sonstiger Aufwand | pág. 24, Jev 0.99 |
| 14 | Abschreibungen für Abnutzung | pág. 24, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 24, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2021-22; el registro no trae cierre
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2022 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2021–22 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2022). Antes: sin fila.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 22, Jev 1 |
| 2 | Sponsoring | pág. 22, Jev 1 |
| 3 | Hospitality - VIP | pág. 22, precedente |
| 4 | Merchandising | pág. 22, Jev 0.99 |
| 5 | Rechteverwertung | pág. 22, precedente |
| 6 | Transfererlöse | pág. 22, Jev 0.99 |
| 7 | Fanreisen | pág. 22, precedente |
| 8 | sonstige Erlöse | pág. 22, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsorleistungen | pág. 22, Jev 0.96 |
| 2 | Aufwand Heimspiele | pág. 22, Jev 1 |
| 3 | Aufwand Hospitality - VIP | pág. 22, Jev 0.98 |
| 4 | Wareneinsatz Merchandising | pág. 22, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 22, Jev 0.93 |
| 6 | Fanreisen | pág. 22, precedente |
| 7 | Personalaufwand | pág. 22, precedente |
| 8 | Abgaben, Gebühren, Strafen | pág. 22, precedente |
| 9 | Spiel- und Trainingsbetrieb | pág. 22, Claude 0.85 |
| 10 | Managementgebühren und Vermittlungsprovisionen | pág. 22, precedente |
| 11 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 22, precedente |
| 12 | Klubservice, Events, PR und Marketing | pág. 22, precedente |
| 13 | Verwaltungs-, Versicherungs- und sonst. Aufwand | pág. 22, Jev 0.99 |
| 14 | Abschreibungen für Abnutzung | pág. 22, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 22, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2020-21; el registro no trae cierre
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2021 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2020–21 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2021). Antes: sin fila.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 22, Jev 1 |
| 2 | Sponsoring | pág. 22, Jev 1 |
| 3 | Hospitality (VIP) | pág. 22, precedente |
| 4 | Merchandising | pág. 22, Jev 0.99 |
| 5 | Rechteverwertung | pág. 22, precedente |
| 6 | Fanreisen | pág. 22, precedente |
| 7 | sonstige Erlöse | pág. 22, Jev 0.99 |
| 8 | Transfererlöse | pág. 22, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsorleistungen | pág. 22, Jev 0.96 |
| 2 | Aufwand Heimspiele | pág. 22, Jev 1 |
| 3 | Aufwand Hospitality VIP | pág. 22, Jev 0.97 |
| 4 | Wareneinsatz Merchandising | pág. 22, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 22, Jev 0.93 |
| 6 | Fanreisen | pág. 22, precedente |
| 7 | Personalaufwand Sport | pág. 22, Jev 1 |
| 8 | sonstiger Personalaufwand | pág. 22, precedente |
| 9 | Abgaben, Gebühren, Strafen | pág. 22, precedente |
| 10 | Spiel- und Trainingsbetrieb | pág. 22, Claude 0.85 |
| 11 | Management-Gebühren und Vermittlungsprovisionen | pág. 22, precedente |
| 12 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 22, precedente |
| 13 | Klubservice, Events, PR und Marketing | pág. 22, precedente |
| 14 | Verwaltung-, Versicherungs- und sonst. Aufwand | pág. 22, Jev 1 |
| 15 | Abschreibungen für Abnutzung | pág. 22, Jev 0.93 |
| 16 | Transferauwendungen | pág. 22, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2020-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2019-20; el registro no trae cierre
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2020 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2019–20 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2020). Antes: sin fila.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 56, precedente |
| 2 | Sponsoring | pág. 56, precedente |
| 3 | Hospitality (VIP) | pág. 56, precedente |
| 4 | Merchandising | pág. 56, precedente |
| 5 | Rechteverwertung | pág. 56, precedente |
| 6 | Fanreisen | pág. 56, precedente |
| 7 | sonstige Erlöse | pág. 56, precedente |
| 8 | Transfererlöse | pág. 56, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsorleistungen | pág. 56, precedente |
| 2 | Aufwand Heimspiele | pág. 56, precedente |
| 3 | Aufwand Hospitality VIP | pág. 56, precedente |
| 4 | Wareneinsatz Merchandising | pág. 56, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 56, Jev 0.93 |
| 6 | Fanreisen | pág. 56, precedente |
| 7 | Personalaufwand Sport | pág. 56, precedente |
| 8 | sonstiger Personalaufwand | pág. 56, precedente |
| 9 | Abgaben, Gebühren, Strafen | pág. 56, precedente |
| 10 | Spiel- und Trainingsbetrieb | pág. 56, precedente |
| 11 | Management-Gebühren und Vermittlungsprovisionen | pág. 56, precedente |
| 12 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 56, precedente |
| 13 | Klubservice, Events, PR und Marketing | pág. 56, precedente |
| 14 | Verwaltung-, Versicherunungs- und sonst. Aufwand | pág. 56, precedente |
| 15 | Abschreibungen für Abnutzung | pág. 56, precedente |
| 16 | Transferauwendungen | pág. 56, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2018-19; el registro no trae cierre
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): at-bundesliga, verificado contra roster cacheado de "2018–19 Austrian Football Bundesliga" (tools/club-league-reference/at.json), coincidencia exacta "Rapid Wien".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 21, Jev 1 |
| 2 | Sponsoring | pág. 21, Jev 1 |
| 3 | Hospitality (VIP) | pág. 21, precedente |
| 4 | Merchandising | pág. 21, Jev 0.99 |
| 5 | Rechteverwertung | pág. 21, precedente |
| 6 | sonstige Erlöse | pág. 21, Jev 0.99 |
| 7 | Transfererlöse | pág. 21, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsorleistungen | pág. 21, Jev 0.96 |
| 2 | Aufwand Heimspiele | pág. 21, Jev 1 |
| 3 | Aufwand Hospitality (VIP) | pág. 21, Jev 0.97 |
| 4 | Wareneinsatz Merchandising | pág. 21, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 21, Jev 0.93 |
| 6 | Personalaufwand Sport | pág. 21, Jev 1 |
| 7 | sonstiger Personalaufwand | pág. 21, precedente |
| 8 | Abgaben, Gebühren und Strafen | pág. 21, precedente |
| 9 | Spiel- und Trainingsbetrieb | pág. 21, Claude 0.85 |
| 10 | Management-Gebühren und Vermittlungsprovisionen | pág. 21, precedente |
| 11 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 21, precedente |
| 12 | Klubservice, Events, PR und Marketing | pág. 21, precedente |
| 13 | Verwaltungs-, Versicherungs- und sonst. Aufwand | pág. 21, Jev 0.99 |
| 14 | Abschreibungen für Abnutzung | pág. 21, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 21, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2018-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2017-18; el registro no trae cierre
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2018 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2017–18 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2018). Antes: sin fila.
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 23, precedente |
| 2 | Sponsoring | pág. 23, precedente |
| 3 | Hospitality (VIP) | pág. 23, precedente |
| 4 | Merchandising | pág. 23, precedente |
| 5 | Rechteverwertung | pág. 23, precedente |
| 6 | sonstige Erlöse | pág. 23, precedente |
| 7 | Transferlöse | pág. 23, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Umsetzung Sponsorleistungen | pág. 23, precedente |
| 2 | Aufwand Heimspiele | pág. 23, precedente |
| 3 | Aufwand Hospitality (VIP) | pág. 23, precedente |
| 4 | Wareneinsatz Merchandising | pág. 23, precedente |
| 5 | eigene Medien und Produktionskosten | pág. 23, Jev 0.93 |
| 6 | Personalaufwand Sport | pág. 23, precedente |
| 7 | Sonstiger Personalaufwand | pág. 23, precedente |
| 8 | Abgaben, Gebühren und Strafen | pág. 23, precedente |
| 9 | Spiel- und Trainingsbetrieb | pág. 23, precedente |
| 10 | Management-Gebühren und Vermittlungsprovisionen | pág. 23, precedente |
| 11 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 23, precedente |
| 12 | Klubservice, Events, PR und Marketing | pág. 23, precedente |
| 13 | Verwaltung-, Versicherunungs- und sonst. Aufwand | pág. 23, precedente |
| 14 | Abschreibungen für Abnutzung | pág. 23, precedente |
| 15 | Transferaufwendungen | pág. 23, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2017-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2016-17; el registro no trae cierre
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): resultado-final = 2288319. El Jahresergebnis impreso es 2.288.319 (balance L1367, texto L1733 y GuV L1556); la extracción leyó 2.226.318. Con él las líneas cierran: ingresos 43,951 - gastos 44,980 - financiero 1,400 + Steuern aus Erträgen 4,718 (impuesto diferido) = 2,288
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2017 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2016–17 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2017). Antes: sin fila.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsoring | pág. 23, Jev 1 |
| 2 | Ticketing, Fannessen & Events | pág. 23, Claude 0.85 |
| 3 | Rechteverwertung & Zentralvermarktung | pág. 23, Jev 0.98 |
| 4 | Merchandising | pág. 23, Jev 0.99 |
| 5 | Hospitality (VIP) | pág. 23, precedente |
| 6 | sonstige Erlöse | pág. 23, Jev 0.99 |
| 7 | Transferlöse | pág. 23, Jev 0.99 |
| 8 | a.o. Ergebnis | pág. 23, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand Heimspiele, Fannessen & Events | pág. 23, Jev 0.98 |
| 2 | Wareneinsatz Merchandising | pág. 23, precedente |
| 3 | Aufwand Hospitality VIP | pág. 23, Jev 0.97 |
| 4 | Umsetzung Sponsorleistungen | pág. 23, Jev 0.96 |
| 5 | eigene Medien und Produktionskosten | pág. 23, precedente |
| 6 | Personalaufwand Sport | pág. 23, Jev 1 |
| 7 | Sonstiger Personalaufwand | pág. 23, precedente |
| 8 | Verwaltung-, Versicherungs- und sonst. Aufwand | pág. 23, Jev 1 |
| 9 | Stadion-, Miet- und Instandhaltungsaufwand | pág. 23, precedente |
| 10 | Spiel- und Trainingsbetrieb | pág. 23, precedente |
| 11 | Klubservice, Events, PR und Marketing | pág. 23, precedente |
| 12 | Management-Gebühren und Vermittlungsprovisionen | pág. 23, precedente |
| 13 | Abgaben, Gebühren, Strafen | pág. 23, precedente |
| 14 | Abschreibungen für Abnutzung | pág. 23, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 23, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2016-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2015-16; el registro no trae cierre
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2016 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2015–16 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2016). Antes: sin fila.
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2014-15.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsoring | pág. 42, Jev 1 |
| 2 | + Ticketing, Fanreisen & Events | pág. 42, Jev 0.9 |
| 3 | + Rechteverwertung & Zentralvermarktung | pág. 42, Claude 0.82 |
| 4 | + Merchandising | pág. 42, Jev 0.99 |
| 5 | + Hospitality (VIP) | pág. 42, precedente |
| 6 | + Sonstige Erlöse | pág. 42, Jev 0.99 |
| 7 | a.o. Erträge | pág. 42, Jev 1 |
| 8 | Transfererlöse | pág. 42, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand Heimspiele, Fanreisen & Events | pág. 42, Jev 1 |
| 2 | + Wareneinsatz Merchandising | pág. 42, precedente |
| 3 | + Aufwand Hospitality VIP | pág. 42, Jev 0.93 |
| 4 | + Umsetzung Sponsorleistungen | pág. 42, precedente |
| 5 | + Eigene Medien und Produktionskosten | pág. 42, precedente |
| 6 | Personalaufwand Sport | pág. 42, Jev 1 |
| 7 | + Sonstiger Personalaufwand | pág. 42, precedente |
| 8 | Verwaltungs-, Versicherungs- und sonst. Aufwand | pág. 42, Jev 0.99 |
| 9 | + Stadion-, Miet- und Instandhaltungsaufwand | pág. 42, precedente |
| 10 | + Spiel- und Trainingsbetrieb | pág. 42, precedente |
| 11 | + Klubservice, Events, PR und Marketing | pág. 42, precedente |
| 12 | + Management-Gebühren und Vermittlungsprovisionen | pág. 42, precedente |
| 13 | + Abgaben, Gebühren & Strafen | pág. 42, precedente |
| 14 | Abschreibungen für Abnutzung | pág. 42, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 42, precedente |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2015-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2014-15; el registro no trae cierre
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2015 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2014–15 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2015). Antes: sin fila.
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2013-14.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2013-14.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsoring | pág. 34, Jev 1 |
| 2 | + Ticketing & Fanreisen | pág. 34, Jev 0.96 |
| 3 | + Rechteverwertung | pág. 34, precedente |
| 4 | + Merchandising | pág. 34, Jev 0.99 |
| 5 | + Hospitality (VIP) | pág. 34, precedente |
| 6 | + Sonstige Erlöse | pág. 34, Jev 0.99 |
| 7 | a.o. Erträge | pág. 34, Jev 1 |
| 8 | Transfererlöse | pág. 34, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand Heimspiele und Fanreisen | pág. 34, Jev 1 |
| 2 | + Wareneinsatz Merchandising | pág. 34, precedente |
| 3 | + Aufwand Hospitality VIP | pág. 34, Jev 0.93 |
| 4 | + Umsetzung Sponsorleistungen | pág. 34, precedente |
| 5 | + Eigene Medien und Produktionskosten | pág. 34, precedente |
| 6 | Personalaufwand Sport | pág. 34, Jev 1 |
| 7 | + Sonstiger Personalaufwand | pág. 34, precedente |
| 8 | Verwaltungs-, Versicherungs- und sonst. Aufwand | pág. 34, Jev 0.99 |
| 9 | + Stadion-, Miet- und Instandhaltungsaufwand | pág. 34, precedente |
| 10 | + Spiel- und Trainingsbetrieb | pág. 34, precedente |
| 11 | + Klubservice, Events, PR und Marketing | pág. 34, precedente |
| 12 | + Management-Gebühren und Vermittlungsprovisionen | pág. 34, precedente |
| 13 | + Abgaben, Gebühren & Strafen | pág. 34, precedente |
| 14 | Abschreibungen für Abnutzung | pág. 34, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 34, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2014-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2013-14; el registro no trae cierre
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2014 cacheada).
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Austria/Rapid Wien/geschaeftsbericht-2010-11-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Austria/Rapid Wien/geschaeftsbericht-2010-11-2012-13.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 70, Jev 1 |
| 2 | + Sponsoring | pág. 70, Jev 1 |
| 3 | + Hospitality (VIP) | pág. 70, precedente |
| 4 | + Merchandising | pág. 70, Jev 0.99 |
| 5 | + Rechteverwertung | pág. 70, precedente |
| 6 | + Sonstige Erlöse | pág. 70, Jev 0.99 |
| 7 | Transfererlöse | pág. 70, Jev 0.99 |
| 8 | a.o. Ergebnis | pág. 70, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand Sport | pág. 70, Jev 1 |
| 2 | + Sonstiger Personalaufwand | pág. 70, precedente |
| 3 | Umsetzung Sponsorleistungen | pág. 70, Jev 0.96 |
| 4 | + Aufwand Heimspiele | pág. 70, Jev 1 |
| 5 | + Aufwand Hospitality VIP | pág. 70, Jev 0.93 |
| 6 | + Wareneinsatz Merchandising | pág. 70, precedente |
| 7 | + Eigene Medien und Produktionskosten | pág. 70, precedente |
| 8 | Abgaben, Gebühren & Strafen | pág. 70, Claude 0.8 |
| 9 | + Spiel- und Trainingsbetrieb | pág. 70, precedente |
| 10 | + Management-Gebühren und Vermittlungsprovisionen | pág. 70, precedente |
| 11 | + Stadion-, Miet- und Instandhaltungsaufwand | pág. 70, precedente |
| 12 | + Klubservice, Events, PR und Marketing | pág. 70, precedente |
| 13 | + Verwaltung-, Versicherungs- und sonst. Aufwand | pág. 70, Jev 0.99 |
| 14 | Abschreibungen für Abnutzung | pág. 70, Jev 0.93 |
| 15 | Transferaufwendungen | pág. 70, precedente |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2013-06-30. Revisión del alta (Claude, 2026-10-09): ejercicio 1.7-30.6 de la temporada 2010-11-2012-13; el registro no trae cierre
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): perimetro = consolidado. Revisión del alta (Claude, 2026-10-09): el documento presenta solo el consolidado del Verein SK Rapid con su filial 100% SK Rapid GmbH
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): null, SIN VERIFICAR (no hay ninguna liga-temporada de at 2013 cacheada).
```

```text
tools/ligas-sin-verificar.mjs (2026-10-25): at-bundesliga, verificado contra la lista de equipos de "2012–13 Austrian Football Bundesliga" (Wikipedia; tools/club-league-reference/at.json, at-bundesliga 2013). Antes: sin fila.
```

## Fuentes

### rapidwien-at-geschaeftsbericht-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2010-11-2012-13

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2010-11-2012-13.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2013-14

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2013-14.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2014-15

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2014-15.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### rapidwien-at-geschaeftsbericht-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Austria/Rapid Wien/geschaeftsbericht-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
