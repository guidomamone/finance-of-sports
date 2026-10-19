# basel-ch — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/basel-ch-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Basel: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.pdf. brandColor #E20A17
(procedencia en Admin/sourcing/Suiza/Basel.md; tools/cargar-lote.mjs).
```

```text
data/ch/basel-ch-data.js — FC Basel 1893 AG (Suiza).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "basel-ch" — slug de "Basel" + '-ch' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC Basel 1893 AG" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): geschaeftsbericht-2011.md L505 'Jah
  displayName        ok        "Basel" — nombre de la carpeta del club en Clubes/
  country            ok        "CH" — carpeta de país "Suiza" (tabla PAISES)
  reportingCurrency  ok        "CHF" — moneda de curso legal de Suiza
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (61 de 68 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 35 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (61 de 68 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "CHF" — moneda de curso legal de Suiza (tabla PAISES de alta-club.mjs)
  fxRef              ok        "CHF@2021-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.9146. --escribir agrega 'CHF@2021-12-31' a FX_CLOSE
  sourceId           ok        "basel-ch-geschaeftsbericht-unternehmen-2021" — clubId + nombre del archivo en slug
  liga               ok        "ch-superleague" — roster cacheado de "2021–22 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"CHF","fxRef":"CHF@2021-12-31","sourceId":"basel-ch-geschaeftsbericht-unternehmen-2021"}
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-unternehmen-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aus Meisterschaft | pág. 12, Jev 0.99 |
| 2 | Aus UEFA Spielen | pág. 12, Jev 1 |
| 3 | Aus Cup Spielen | pág. 12, precedente |
| 4 | Aus übrigen Spielen | pág. 12, precedente |
| 5 | Business Seats | pág. 9, precedente |
| 6 | Sponsoring, Werbung | pág. 9, Jev 1 |
| 7 | Transferertrag | pág. 9, Jev 1 |
| 8 | TV-Entschädigungen | pág. 9, Jev 1 |
| 9 | Merchandising, Licensing | pág. 9, Jev 1 |
| 10 | Catering | pág. 9, precedente |
| 11 | Events Non-Matchday | pág. 9, precedente |
| 12 | Verbandseinnahmen | pág. 9, precedente |
| 13 | Einnahmen Leistungsfussball Nachwuchs | pág. 9, Jev 1 |
| 14 | Sonstiger Betriebsertrag | pág. 9, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Warenaufwand | pág. 10, Jev 1 |
| 2 | Personalaufwand | pág. 10, precedente |
| 3 | Organisationskosten Heimspiele | pág. 10, Jev 1 |
| 4 | Übriger Spielbetrieb | pág. 10, precedente |
| 5 | Transferaufwand | pág. 10, precedente |
| 6 | Werbung | pág. 10, Jev 1 |
| 7 | Administration | pág. 10, Jev 1 |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 10, Jev 1 |
| 9 | Defizitgarantie FC Basel 1893 | pág. 10, precedente |
| 10 | Übriger Aufwand | pág. 10, Jev 1 |
| 11 | Abschreibungen auf Transferrechte | pág. 10, Jev 1 |
| 12 | Sonderabschreibungen auf Transferrechte | pág. 10, Claude 0.8 |
| 13 | Abschreibungen auf Sachanlagen | pág. 10, Jev 1 |
| 14 | Abschreibungen auf immaterielle Anlagen | pág. 10, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2021–22 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aus Meisterschaft | pág. 38, precedente |
| 2 | Aus UEFA Spielen | pág. 38, precedente |
| 3 | Aus Cup Spielen | pág. 38, precedente |
| 4 | Aus übrigen Spielen | pág. 38, precedente |
| 5 | Business Seats | pág. 34, precedente |
| 6 | Sponsoring, Werbung | pág. 34, precedente |
| 7 | Transferertrag | pág. 34, precedente |
| 8 | TV-Entschädigungen | pág. 34, precedente |
| 9 | Merchandising, Licensing | pág. 34, precedente |
| 10 | Catering | pág. 34, precedente |
| 11 | Events Non-Matchday | pág. 34, precedente |
| 12 | Verbandseinnahmen | pág. 34, precedente |
| 13 | Einnahmen Leistungsfussball Nachwuchs | pág. 34, precedente |
| 14 | Sonstiger Betriebsertrag | pág. 34, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Warenaufwand | pág. 35, precedente |
| 2 | Personalaufwand | pág. 35, precedente |
| 3 | Organisationskosten Heimspiele | pág. 35, precedente |
| 4 | Übriger Spielbetrieb | pág. 35, precedente |
| 5 | Transferaufwand | pág. 35, precedente |
| 6 | Werbung | pág. 35, precedente |
| 7 | Administration | pág. 35, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 35, precedente |
| 9 | Defizitgarantie FC Basel 1893 | pág. 35, precedente |
| 10 | Übriger Aufwand | pág. 35, precedente |
| 11 | Abschreibungen auf Transferrechte | pág. 35, precedente |
| 12 | Sonderabschreibungen auf Ersatzbeschaffung | pág. 35, precedente |
| 13 | Abschreibungen auf Sachanlagen | pág. 35, precedente |
| 14 | Korrektur Gewinnüberführung FC Basel Holding AG | pág. ?, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. El informe trae estados individuales sueltos (FC Basel 1893 AG, el Verein y, desde 2014, la Stadiondienst AG); no hay consolidado. La AG es la que juega el fútbol y cierra con el resultado impreso (mismo perímetro que el 2021 cargado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2016–17 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2015.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aus Meisterschaft | pág. 38, precedente |
| 2 | Aus UEFA Spielen | pág. 38, precedente |
| 3 | Aus Cup Spielen | pág. 38, precedente |
| 4 | Aus übrigen Spielen | pág. 38, precedente |
| 5 | Business Seats | pág. 35, precedente |
| 6 | Sponsoring, Werbung | pág. 35, precedente |
| 7 | Transferertrag | pág. 35, precedente |
| 8 | TV-Entschädigungen | pág. 35, precedente |
| 9 | Merchandising, Licensing | pág. 35, precedente |
| 10 | Catering | pág. 35, precedente |
| 11 | Events Non-Matchday | pág. 35, precedente |
| 12 | Verbandseinnahmen | pág. 35, precedente |
| 13 | Einnahmen Leistungsfussball Nachwuchs | pág. 35, precedente |
| 14 | Sonstiger Betriebsertrag | pág. 35, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Warenaufwand | pág. 35, precedente |
| 2 | Personalaufwand | pág. 35, precedente |
| 3 | Organisationskosten Heimspiele | pág. 35, precedente |
| 4 | Übriger Spielbetrieb | pág. 35, precedente |
| 5 | Transferaufwand | pág. 35, precedente |
| 6 | Werbung | pág. 35, precedente |
| 7 | Administration | pág. 35, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 35, precedente |
| 9 | Defizitgarantie FC Basel 1893 | pág. 35, precedente |
| 10 | Übriger Aufwand | pág. 35, precedente |
| 11 | Abschreibungen auf Transferrechte | pág. 35, precedente |
| 12 | Sonderabschreibungen auf Ersatzbeschaffung | pág. 35, precedente |
| 13 | Abschreibungen auf Sachanlagen | pág. 35, precedente |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. El informe trae estados individuales sueltos (FC Basel 1893 AG, el Verein y, desde 2014, la Stadiondienst AG); no hay consolidado. La AG es la que juega el fútbol y cierra con el resultado impreso (mismo perímetro que el 2021 cargado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2015–16 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2014.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 25, precedente |
| 2 | aus Champions-League / UEFA-Spielen | pág. 25, Jev 0.96 |
| 3 | aus Cup-Spielen | pág. 25, precedente |
| 4 | aus übrigen Spielen | pág. 25, precedente |
| 5 | Business Seats | pág. 25, precedente |
| 6 | Sponsoring, Werbung | pág. 25, precedente |
| 7 | Transferertrag | pág. 25, precedente |
| 8 | TV-Entschädigungen | pág. 25, precedente |
| 9 | Merchandising, Licensing | pág. 25, precedente |
| 10 | Catering | pág. 25, precedente |
| 11 | Events non-Matchday | pág. 25, precedente |
| 12 | Verbandseinnahmen | pág. 25, precedente |
| 13 | Einnahmen Leistungsfussball Nachwuchs | pág. 25, precedente |
| 14 | Diverses | pág. 25, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 25, precedente |
| 2 | Organisationskosten Heimspiele | pág. 25, precedente |
| 3 | Übriger Spielbetrieb | pág. 25, precedente |
| 4 | Transferaufwand | pág. 25, precedente |
| 5 | Warenaufwand | pág. 25, precedente |
| 6 | Werbung | pág. 25, precedente |
| 7 | Administration | pág. 25, precedente |
| 8 | Abschreibungen | pág. 25, precedente |
| 9 | Aufwand Leistungsfussball Nachwuchs | pág. 25, precedente |
| 10 | Übriger Aufwand | pág. 25, precedente |
| 11 | Ausserordentliche Aufwendungen | pág. 25, Jev 1 |
| 12 | Defizitgarantie FC Basel 1893 | pág. ?, precedente |
| 13 | Gewinnüberführung FC Basel Holding AG | pág. ?, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. El informe trae estados individuales sueltos (FC Basel 1893 AG, el Verein y, desde 2014, la Stadiondienst AG); no hay consolidado. La AG es la que juega el fútbol y cierra con el resultado impreso (mismo perímetro que el 2021 cargado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2014–15 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2013.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 25, Claude 0.88 |
| 2 | aus Champions-League / UEFA-Spielen | pág. 25, Jev 0.96 |
| 3 | aus Cup-Spielen | pág. 25, precedente |
| 4 | aus übrigen Spielen | pág. 25, Jev 0.99 |
| 5 | Business Seats | pág. 25, precedente |
| 6 | Sponsoring, Werbung | pág. 25, precedente |
| 7 | Transferertrag | pág. 25, precedente |
| 8 | TV-Entschädigungen | pág. 25, precedente |
| 9 | Merchandising, Licensing | pág. 25, precedente |
| 10 | Catering | pág. 25, precedente |
| 11 | Verbandseinnahmen | pág. 25, precedente |
| 12 | Einnahmen Leistungsfussball Nachwuchs | pág. 25, precedente |
| 13 | Diverses | pág. 25, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 25, precedente |
| 2 | Organisationskosten Heimspiele | pág. 25, precedente |
| 3 | Übriger Spielbetrieb | pág. 25, precedente |
| 4 | Transferaufwand | pág. 25, precedente |
| 5 | Warenaufwand | pág. 25, precedente |
| 6 | Werbung | pág. 25, precedente |
| 7 | Administration | pág. 25, precedente |
| 8 | Abschreibungen | pág. 25, precedente |
| 9 | Aufwand Leistungsfussball Nachwuchs | pág. 25, precedente |
| 10 | Übriger Aufwand | pág. 25, precedente |
| 11 | Ausserordentliche Aufwendungen | pág. 25, Jev 1 |
| 12 | Defizitgarantie FC Basel 1893 | pág. ?, precedente |
| 13 | Gewinnüberführung FC Basel Holding AG | pág. ?, precedente |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. El informe trae estados individuales sueltos (FC Basel 1893 AG, el Verein y, desde 2014, la Stadiondienst AG); no hay consolidado. La AG es la que juega el fútbol y cierra con el resultado impreso (mismo perímetro que el 2021 cargado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2013–14 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2012.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 23, precedente |
| 2 | aus UEFA-Spielen | pág. 23, precedente |
| 3 | aus Cup-Spielen | pág. 23, precedente |
| 4 | aus übrigen Spielen | pág. 23, precedente |
| 5 | Business Seats | pág. 23, precedente |
| 6 | Sponsoring, Werbung | pág. 23, precedente |
| 7 | Transferertrag | pág. 23, precedente |
| 8 | TV-Entschädigungen | pág. 23, precedente |
| 9 | Merchandising, Licensing | pág. 23, precedente |
| 10 | Verbandseinnahmen | pág. 23, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 23, precedente |
| 12 | Diverses | pág. 23, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 23, precedente |
| 2 | Organisationskosten Heimspiele | pág. 23, precedente |
| 3 | Übriger Spielbetrieb | pág. 23, precedente |
| 4 | Transferaufwand | pág. 23, precedente |
| 5 | Warenaufwand | pág. 23, precedente |
| 6 | Werbung | pág. 23, precedente |
| 7 | Administration | pág. 23, precedente |
| 8 | Abschreibungen | pág. 23, precedente |
| 9 | Aufwand Leistungsfussball Nachwuchs | pág. 23, precedente |
| 10 | Übriger Aufwand | pág. 23, precedente |
| 11 | Gewinnüberführung FC Basel Holding AG | pág. ?, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2012–13 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2011.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 23, precedente |
| 2 | aus UEFA-Spielen | pág. 23, precedente |
| 3 | aus Cup-Spielen | pág. 23, precedente |
| 4 | aus übrigen Spielen | pág. 23, precedente |
| 5 | Business Seats | pág. 23, precedente |
| 6 | Sponsoring, Werbung | pág. 23, precedente |
| 7 | Transferertrag | pág. 23, precedente |
| 8 | TV-Entschädigungen | pág. 23, precedente |
| 9 | Merchandising, Licensing | pág. 23, precedente |
| 10 | Verbandseinnahmen | pág. 23, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 23, precedente |
| 12 | Diverses | pág. 23, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 23, precedente |
| 2 | Organisationskosten Heimspiele | pág. 23, precedente |
| 3 | Übriger Spielbetrieb | pág. 23, precedente |
| 4 | Transferaufwand | pág. 23, precedente |
| 5 | Warenaufwand | pág. 23, precedente |
| 6 | Werbung | pág. 23, precedente |
| 7 | Administration | pág. 23, precedente |
| 8 | Abschreibungen | pág. 23, precedente |
| 9 | Aufwand Leistungsfussball Nachwuchs | pág. 23, precedente |
| 10 | Übriger Aufwand | pág. 23, precedente |
| 11 | Defizitgarantie FC Basel 1893 | pág. ?, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2011–12 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia única por palabras "FC Basel" = "Basel".
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2010.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 19, precedente |
| 2 | aus Uefa-Spielen | pág. 19, precedente |
| 3 | aus Cup-Spielen | pág. 19, precedente |
| 4 | aus übrigen Spielen | pág. 19, precedente |
| 5 | Business Seats | pág. 19, precedente |
| 6 | Sponsoring, Werbung | pág. 19, precedente |
| 7 | Transferertrag | pág. 19, precedente |
| 8 | TV-Entschädigungen | pág. 19, precedente |
| 9 | Merchandising, Licensing | pág. 19, precedente |
| 10 | Verbandseinnahmen | pág. 19, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 19, precedente |
| 12 | Diverses | pág. 19, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 19, precedente |
| 2 | Organisationskosten Heimspiele | pág. 19, precedente |
| 3 | Übriger Spielbetrieb | pág. 19, precedente |
| 4 | Transferaufwand | pág. 19, precedente |
| 5 | Werbung | pág. 19, precedente |
| 6 | Administration | pág. 19, precedente |
| 7 | Abschreibungen | pág. 19, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 19, precedente |
| 9 | Übriger Aufwand | pág. 19, precedente |
| 10 | Verlustabdeckung FC Basel Holding AG | pág. ?, precedente |
| 11 | Defizitgarantie FC Basel 1893 | pág. ?, precedente |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): perimetro = individual. El informe trae estados individuales sueltos (FC Basel 1893 AG, el Verein y, desde 2014, la Stadiondienst AG); no hay consolidado. La AG es la que juega el fútbol y cierra con el resultado impreso (mismo perímetro que el 2021 cargado)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2010–11 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia única por palabras "FC Basel" = "Basel".
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2009.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 18, precedente |
| 2 | aus Uefa-Spielen | pág. 18, precedente |
| 3 | aus Cup-Spielen | pág. 18, precedente |
| 4 | aus übrigen Spielen | pág. 18, precedente |
| 5 | Business Seats | pág. 18, precedente |
| 6 | Sponsoring, Werbung | pág. 18, precedente |
| 7 | Transferertrag | pág. 18, precedente |
| 8 | TV-Entschädigungen | pág. 18, precedente |
| 9 | Merchandising, Licensing | pág. 18, precedente |
| 10 | Verbandseinnahmen | pág. 18, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 18, precedente |
| 12 | Diverses | pág. 18, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 18, precedente |
| 2 | Organisationskosten Heimspiele | pág. 18, precedente |
| 3 | Übriger Spielbetrieb | pág. 18, precedente |
| 4 | Transferaufwand | pág. 18, precedente |
| 5 | Werbung | pág. 18, precedente |
| 6 | Administration | pág. 18, precedente |
| 7 | Abschreibungen | pág. 18, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 18, precedente |
| 9 | Übriger Aufwand | pág. 18, precedente |
| 10 | Verlustabdeckung FC Basel Holding AG | pág. ?, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2009–10 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2008.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 18, Claude 0.88 |
| 2 | aus UEFA-Spielen | pág. 18, precedente |
| 3 | aus Cup-Spielen | pág. 18, precedente |
| 4 | aus übrigen Spielen | pág. 18, Jev 0.99 |
| 5 | Business Seats | pág. 18, precedente |
| 6 | Sponsoring, Werbung | pág. 18, precedente |
| 7 | Transferertrag | pág. 18, precedente |
| 8 | TV-Entschädigungen | pág. 18, precedente |
| 9 | Merchandising, Licensing | pág. 18, precedente |
| 10 | Verbandseinnahmen | pág. 18, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 18, precedente |
| 12 | Diverses | pág. 18, Jev 1 |
| 13 | Ausserordentlicher Ertrag | pág. 18, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 18, precedente |
| 2 | Organisationskosten Heimspiele | pág. 18, precedente |
| 3 | Übriger Spielbetrieb | pág. 18, precedente |
| 4 | Transferaufwand | pág. 18, precedente |
| 5 | Werbung | pág. 18, precedente |
| 6 | Administration | pág. 18, precedente |
| 7 | Abschreibungen | pág. 18, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 18, precedente |
| 9 | Übriger Aufwand | pág. 18, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2008–09 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia única por palabras "FC Basel" = "Basel".
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2007.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2007.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 17, precedente |
| 2 | aus UEFA-Spielen | pág. 17, precedente |
| 3 | aus Cup-Spielen | pág. 17, precedente |
| 4 | aus übrigen Spielen | pág. 17, precedente |
| 5 | Business Seats | pág. 17, precedente |
| 6 | Sponsoring, Werbung | pág. 17, precedente |
| 7 | Transferertrag | pág. 17, precedente |
| 8 | TV-Entschädigungen | pág. 17, precedente |
| 9 | Merchandising, Licensing | pág. 17, precedente |
| 10 | Verbandseinnahmen | pág. 17, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 17, precedente |
| 12 | Diverses | pág. 17, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 17, precedente |
| 2 | Organisationskosten Heimspiele | pág. 17, precedente |
| 3 | Übriger Spielbetrieb | pág. 17, precedente |
| 4 | Transferaufwand | pág. 17, precedente |
| 5 | Werbung | pág. 17, precedente |
| 6 | Administration | pág. 17, precedente |
| 7 | Abschreibungen | pág. 17, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 17, precedente |
| 9 | Übriger Aufwand | pág. 17, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2007–08 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2006.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2006.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 20, Claude 0.88 |
| 2 | aus UEFA-Spielen | pág. 20, precedente |
| 3 | aus Cup-Spielen | pág. 20, precedente |
| 4 | aus übrigen Spielen | pág. 20, Jev 0.99 |
| 5 | Business Seats | pág. 20, precedente |
| 6 | Sponsoring, Werbung | pág. 20, precedente |
| 7 | Transferertrag | pág. 20, precedente |
| 8 | TV-Entschädigungen | pág. 20, precedente |
| 9 | Merchandising, Licensing | pág. 20, precedente |
| 10 | Verbandseinnahmen | pág. 20, precedente |
| 11 | Einnahmen Leistungsfussball Nachwuchs | pág. 20, precedente |
| 12 | Diverses | pág. 20, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 20, precedente |
| 2 | Organisationskosten Heimspiele | pág. 20, precedente |
| 3 | Übriger Spielbetrieb | pág. 20, precedente |
| 4 | Transferaufwand | pág. 20, precedente |
| 5 | Werbung | pág. 20, precedente |
| 6 | Administration | pág. 20, precedente |
| 7 | Abschreibungen | pág. 20, precedente |
| 8 | Aufwand Leistungsfussball Nachwuchs | pág. 20, precedente |
| 9 | Übriger Aufwand | pág. 20, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2006–07 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## 2005

### Ingresos

```text
2005: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Suiza/Basel/geschaeftsbericht-2005.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Suiza/Basel/geschaeftsbericht-2005.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | aus Meisterschaft | pág. 13, precedente |
| 2 | aus Champions-League / UEFA-Cup | pág. 13, Claude 0.88 |
| 3 | aus Cup-Spielen | pág. 13, precedente |
| 4 | aus übrigen Spielen | pág. 13, precedente |
| 5 | Business Seats | pág. 13, precedente |
| 6 | Sponsoring, Werbung | pág. 13, precedente |
| 7 | TV-Entschädigungen | pág. 13, precedente |
| 8 | Leihertrag, Ausbildungsentschädigungen | pág. 13, precedente |
| 9 | Mitglieder | pág. 13, Jev 1 |
| 10 | Verbandseinnahmen | pág. 13, precedente |
| 11 | Diverses | pág. 13, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personalaufwand | pág. 14, precedente |
| 2 | Organisationskosten Heimspiele | pág. 14, precedente |
| 3 | Übriger Spielbetrieb | pág. 14, precedente |
| 4 | Leihaufwand, Ausbildungsentschädigungen | pág. 14, precedente |
| 5 | Werbung | pág. 14, precedente |
| 6 | Administration | pág. 14, precedente |
| 7 | Abschreibungen | pág. 14, precedente |
| 8 | Übriger Aufwand | pág. 14, precedente |
| 9 | Verlustabdeckung FC Basel Marketing AG | pág. ?, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): ch-superleague, verificado contra roster cacheado de "2005–06 Swiss Super League" (tools/club-league-reference/ch.json), coincidencia exacta "Basel".
```

## Fuentes

### basel-ch-geschaeftsbericht-unternehmen-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-unternehmen-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2005

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2005.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2006

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2006.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2007

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2007.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2008

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2009

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2010

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2011

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2012

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2013

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2014

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2015

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### basel-ch-geschaeftsbericht-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Suiza/Basel/geschaeftsbericht-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
