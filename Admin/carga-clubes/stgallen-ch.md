# stgallen-ch — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/stgallen-ch-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
St. Gallen: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.pdf. brandColor #009A3A
(procedencia en Admin/sourcing/Suiza/St. Gallen.md; tools/cargar-lote.mjs).
```

```text
data/ch/stgallen-ch-data.js — FC St.Gallen AG (Suiza).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "stgallen-ch" — slug de "St. Gallen" + '-ch' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC St.Gallen AG" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): el club es FC St.Gallen AG; Event AG es la operadora del estadio (la propue
  displayName        ok        "St. Gallen" — nombre de la carpeta del club en Clubes/
  country            ok        "CH" — carpeta de país "Suiza" (tabla PAISES)
  reportingCurrency  ok        "CHF" — moneda de curso legal de Suiza
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (6 de 6 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 15 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (6 de 6 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): ER 'konsolidierte' FC St.Gallen AG + FC St.Gallen Event AG (operadora del e
  currency           ok        "CHF" — moneda de curso legal de Suiza (tabla PAISES de alta-club.mjs)
  fxRef              ok        "CHF@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene CHF@2025-06-30 = 0.7938 (Noon buying rate de Nueva York (Reserva Federal, H.10) al 2025-06-3
  sourceId           ok        "stgallen-ch-geschaeftsbericht-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "ch-superleague" — roster cacheado de "2024–25 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"CHF","fxRef":"CHF@2025-06-30","sourceId":"stgallen-ch-geschaeftsbericht-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge aus Transfers und Leihgebühren | pág. 10, Jev 1 |
| 2 | Diverse Erträge inklusive Swiss Football League | pág. 10, precedente |
| 3 | Erträge aus FutureChampsOstschweiz | pág. 10, precedente |
| 4 | Erträge von Gönnern und Mitgliedern | pág. 10, precedente |
| 5 | Ertrag aus Fussballspielen | pág. 11, Jev 0.98 |
| 6 | Ertrag aus Werbung und Sponsoring | pág. 11, Jev 1 |
| 7 | Ertrag aus Hospitality und Logen | pág. 11, Jev 0.99 |
| 8 | Ertrag aus Merchandising | pág. 11, Jev 1 |
| 9 | Ertrag aus Drittveranstaltungen | pág. 11, precedente |
| 10 | Ertrag aus Conference Arena / Diverse Erträge | pág. 11, precedente |
| 11 | Ausserordentlicher Ertrag | pág. 9, Jev 1 |
| 12 | Veränderung Wertberichtigungen | pág. 10, Jev 0.99 |
| 13 | Ertragsminderungen | pág. 11, Jev 0.96 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand für Spielbetrieb | pág. 10, precedente |
| 2 | Aufwand für Transfers | pág. 10, precedente |
| 3 | Aufwand für Spielorganisation Fussball | pág. 11, Jev 1 |
| 4 | Aufwand für Catering | pág. 11, precedente |
| 5 | Aufwand für Werbung und Sponsoring | pág. 11, Jev 0.98 |
| 6 | Aufwand für Mechandising | pág. 11, precedente |
| 7 | Aufwand für Drittveranstaltungen | pág. 11, precedente |
| 8 | Aufwand für Conference Arena / Diverses | pág. 11, precedente |
| 9 | Personalaufwand | pág. 9, precedente |
| 10 | Sonstiger Betriebsaufwand | pág. 9, precedente |
| 11 | Abschreibungen Sachanlagen | pág. 9, Jev 1 |
| 12 | Abschreibungen Spielerwerte | pág. 9, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = consolidado. ER 'konsolidierte' FC St.Gallen AG + FC St.Gallen Event AG (operadora del estadio): las dos hacen el negocio del club
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. el total consolidado "Erträge netto" 45.057 se sumaba además del desglose de las dos sociedades (sin la Entschädigung intercompany) (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 21. impreso +21 en la ER de la AG (suma con su Total Erträge netto 15.548 del consolidado); se leía -21 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -484. impreso -484 en la ER de Event AG (Total Erträge netto 29.509); se leía +484 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. transferencia intercompany (Event AG -> AG) que se anula en la consolidación; su espejo es el gasto de L269 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. transferencia intercompany que se anula en la consolidación; espejo de L268 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): incluye = broadcasting. la TV de la Swiss Football League está dentro de 'Diverse Erträge inklusive Swiss Football League' (9.512 mil CHF, L327), mezclada con premios UEFA; pregunta al club en dudas-por-club (Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

### Liga

```text
alta-club.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2024–25 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge aus Transfers und Leihgebühren | pág. 10, precedente |
| 2 | Diverse Erträge inklusive Swiss Football League | pág. 10, precedente |
| 3 | Erträge aus Future Champs Ostschweiz | pág. 10, precedente |
| 4 | Erträge von Gönnern und Mitgliedern | pág. 10, precedente |
| 5 | Ertrag aus Fussballspielen | pág. 11, precedente |
| 6 | Ertrag aus Werbung und Sponsoring | pág. 11, precedente |
| 7 | Ertrag aus Hospitality und Logen | pág. 11, precedente |
| 8 | Ertrag aus Merchandising | pág. 11, precedente |
| 9 | Ertrag aus Drittveranstaltungen | pág. 11, precedente |
| 10 | Ertrag aus Conference Arena / Diverse Erträge | pág. 11, precedente |
| 11 | Veränderung Wertberichtigungen | pág. 10, Jev 1 |
| 12 | Ertragsminderungen | pág. 11, Jev 0.99 |
| 13 | Ausserordentlicher Ertrag | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand für Spielbetrieb | pág. 10, precedente |
| 2 | Aufwand für Transfers | pág. 10, precedente |
| 3 | Aufwand für Spielorganisation Fussball | pág. 11, precedente |
| 4 | Aufwand für Catering | pág. 11, precedente |
| 5 | Aufwand für Werbung und Sponsoring | pág. 11, precedente |
| 6 | Aufwand für Merchandising | pág. 11, precedente |
| 7 | Aufwand für Drittveranstaltungen | pág. 11, precedente |
| 8 | Aufwand für Conference Arena / Diverses | pág. 11, precedente |
| 9 | Personalaufwand | pág. 9, precedente |
| 10 | Sonstiger Betriebsaufwand | pág. 9, precedente |
| 11 | Abschreibungen Sachanlagen | pág. 9, precedente |
| 12 | Abschreibungen Spielerwerte | pág. 9, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): ch-superleague, verificado contra roster cacheado de "2023–24 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge brutto | pág. 17, precedente |
| 2 | Ertragsminderungen | pág. 17, precedente |
| 3 | Ausserordentlicher Ertrag | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direkte Kosten | pág. 17, precedente |
| 2 | Personalaufwand | pág. 17, precedente |
| 3 | Sonstiger Betriebsaufwand | pág. 17, precedente |
| 4 | Abschreibungen Sachanlagen | pág. 17, precedente |
| 5 | Abschreibungen Spielerwerte | pág. 17, precedente |
| 6 | Ausserordentlicher Aufwand | pág. 17, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Estadio, Venta de Jugadores, Otras secciones deportivas, Organización de partidos
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2022–23 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge brutto | pág. 16, precedente |
| 2 | Ertragsminderungen | pág. 16, precedente |
| 3 | Ausserordentlicher Ertrag | pág. 16, precedente |
| 4 | Entschädigung von FCSG Event AG | pág. 16, Jev 0.9 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direkte Kosten | pág. 16, precedente |
| 2 | Personalaufwand | pág. 16, precedente |
| 3 | Sonstiger Betriebsaufwand | pág. 16, precedente |
| 4 | Abschreibungen Sachanlagen | pág. 16, precedente |
| 5 | Abschreibungen Spielerwerte | pág. 16, precedente |
| 6 | Ausserordentlicher Aufwand | pág. 16, Jev 1 |
| 7 | Entschädigung an FCSG AG | pág. 16, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Estadio, Venta de Jugadores, Otras secciones deportivas, Organización de partidos
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2021–22 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge aus Transfers und Leihgebühren | pág. 10, precedente |
| 2 | Diverse Erträge inklusive Swiss Football League | pág. 10, precedente |
| 3 | Erträge aus Future Champs Ostschweiz | pág. 10, precedente |
| 4 | Erträge von Gönnern und Mitgliedern | pág. 10, precedente |
| 5 | Ertrag aus Fussballspielen | pág. 11, precedente |
| 6 | Ertrag aus Werbung und Sponsoring | pág. 11, precedente |
| 7 | Ertrag aus Merchandising | pág. 11, precedente |
| 8 | Ertrag aus Conference Arena / Diverse Erträge | pág. 11, precedente |
| 9 | Veränderung Wertberichtigungen | pág. 10, Jev 1 |
| 10 | Debitorenverluste | pág. 11, Jev 1 |
| 11 | Veränderung Wertberichtigungen | pág. 11, Jev 1 |
| 12 | Diverse Ertragsminderungen | pág. 11, Jev 0.98 |
| 13 | Ausserordentlicher Ertrag | pág. 9, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aufwand für Spielbetrieb | pág. 10, precedente |
| 2 | Aufwand für Transfers | pág. 10, precedente |
| 3 | Aufwand für Spielorganisation Fussball | pág. 11, precedente |
| 4 | Aufwand für Werbung und Sponsoring | pág. 11, precedente |
| 5 | Aufwand für Merchandising | pág. 11, precedente |
| 6 | Aufwand für Conference Arena / Diverses | pág. 11, precedente |
| 7 | Personalaufwand | pág. 9, precedente |
| 8 | Sonstiger Betriebsaufwand | pág. 9, precedente |
| 9 | Abschreibungen Sachanlagen | pág. 9, precedente |
| 10 | Abschreibungen Spielerwerte | pág. 9, precedente |
| 11 | Ausserordentlicher Aufwand | pág. 9, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-20): ch-superleague, verificado contra roster cacheado de "2020–21 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "St. Gallen".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Suiza/St. Gallen/geschaeftsbericht-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/St. Gallen/geschaeftsbericht-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Erträge brutto | pág. 7, precedente |
| 2 | Ertragsminderungen | pág. 7, precedente |
| 3 | Ausserordentlicher Ertrag | pág. 7, precedente |
| 4 | Auflösung Rückstellungen | pág. 7, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direkte Kosten | pág. 7, precedente |
| 2 | Personalaufwand | pág. 7, precedente |
| 3 | Sonstiger Betriebsaufwand | pág. 7, precedente |
| 4 | Abschreibungen Spielerwerte | pág. 7, precedente |
| 5 | Abschreibungen Sachanlagen | pág. 7, precedente |
| 6 | Ausserordentlicher Aufwand | pág. 7, precedente |
| 7 | Ausserordentliche Abschreibungen | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-20): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Estadio, Venta de Jugadores, Otras secciones deportivas, Organización de partidos
```

## Fuentes

### stgallen-ch-geschaeftsbericht-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### stgallen-ch-geschaeftsbericht-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### stgallen-ch-geschaeftsbericht-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### stgallen-ch-geschaeftsbericht-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### stgallen-ch-geschaeftsbericht-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### stgallen-ch-geschaeftsbericht-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Suiza/St. Gallen/geschaeftsbericht-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
