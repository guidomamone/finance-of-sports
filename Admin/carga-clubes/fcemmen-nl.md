# fcemmen-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fcemmen-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
FC Emmen: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Países Bajos/FC Emmen.md; tools/cargar-lote.mjs).
```

```text
data/nl/fcemmen-nl-data.js — FC Emmen B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fcemmen-nl" — slug de "FC Emmen" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FC Emmen B.V." — la portada y lo más frecuente del .md coinciden (2 veces)
  displayName        ok        "FC Emmen" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): el jaarverslag trae la winst-en-verliesrekening completa: la verificación c
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
  sourceId           ok        "fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2018–19 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Emmen" = "FC Emmen"

FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def"}
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2020-2021-incl.-Jaarcijfers-DEF.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2020-2021-incl.-Jaarcijfers-DEF.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 7, precedente |
| 2 | Sponsoring | pág. 7, precedente |
| 3 | Media gerelateerde baten | pág. 7, precedente |
| 4 | Prijzengeld | pág. 7, precedente |
| 5 | Horeca | pág. 7, precedente |
| 6 | Merchandise | pág. 7, precedente |
| 7 | Subsidies & giften | pág. 7, precedente |
| 8 | Overige baten | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personeelskosten | pág. 7, precedente |
| 2 | Horeca | pág. 7, precedente |
| 3 | Verkoopkosten | pág. 7, precedente |
| 4 | Huisvestingskosten | pág. 7, precedente |
| 5 | Wedstrijd- en trainingskosten | pág. 7, precedente |
| 6 | Algemene kosten | pág. 7, precedente |
| 7 | Afschrijvingskosten imm. & mat. vaste activa | pág. 7, precedente |
| 8 | Som der afschr. bijz. waardevermindering en resultaat vergoedingsommen | pág. 7, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): cierre = 2021-06-30. Temporada 2020/2021: el eigen vermogen se compara «per 30 juni 2021» (.md L146)
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-21) desde Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2019-2020-incl.-Jaarcijfers-DEF.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2019-2020-incl.-Jaarcijfers-DEF.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 7, precedente |
| 2 | Sponsoring | pág. 7, precedente |
| 3 | Media gerelateerde baten | pág. 7, precedente |
| 4 | Prijzengeld | pág. 7, precedente |
| 5 | Horeca | pág. 7, precedente |
| 6 | Merchandise | pág. 7, precedente |
| 7 | Subsidies & giften | pág. 7, precedente |
| 8 | Overige baten | pág. 7, precedente |
| 9 | Som der afschr. bijz. waardevermindering en resultaat vergoedingsommen | pág. 7, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personeelskosten | pág. 7, precedente |
| 2 | Horeca | pág. 7, precedente |
| 3 | Verkoopkosten | pág. 7, precedente |
| 4 | Huisvestingskosten | pág. 7, precedente |
| 5 | Wedstrijd- en trainingskosten | pág. 7, precedente |
| 6 | Algemene kosten | pág. 7, precedente |
| 7 | Afschrijvingskosten imm. & mat. vaste activa | pág. 7, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-21): cierre = 2020-06-30. Temporada 2019/2020: el informe fija el personal «Op 30 juni 2020» (.md L41); boekjaar de 1-7 a 30-6 como los demás años del club
tools/cargar.mjs (2026-10-21). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wedstrijdbaten | pág. 5, Jev 0.94 |
| 2 | Sponsoring | pág. 5, Jev 1 |
| 3 | Media gerelateerde baten | pág. 5, Jev 1 |
| 4 | Prijzengeld | pág. 5, Jev 1 |
| 5 | Horeca | pág. 5, precedente |
| 6 | Merchandise | pág. 5, Jev 0.99 |
| 7 | Subsidies & giften | pág. 5, Jev 0.99 |
| 8 | Overige baten | pág. 5, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personeelskosten | pág. 5, precedente |
| 2 | Horeca | pág. 5, precedente |
| 3 | Verkoopkosten | pág. 5, precedente |
| 4 | Huisvestingskosten | pág. 5, Jev 0.99 |
| 5 | Wedstrijd- en trainingskosten | pág. 5, Jev 0.98 |
| 6 | Algemene kosten | pág. 5, Jev 1 |
| 7 | Afschrijvingskosten imm. & mat. vaste activa | pág. 5, Jev 0.97 |
| 8 | Som der afschr. bijz. waardevermindering en resultaat vergoedingsommen | pág. 5, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): reportType = official_balance_sheet. el jaarverslag trae la winst-en-verliesrekening completa: la verificación cierra con el resultado impreso (831 mil) (Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2018–19 Eredivisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Emmen" = "FC Emmen".
```

## Fuentes

### fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fcemmen-nl-f-04-fce-jaarverslag-2019-2020-incl-jaarcijfers-def

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2019-2020-incl.-Jaarcijfers-DEF.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fcemmen-nl-f-04-fce-jaarverslag-2020-2021-incl-jaarcijfers-def

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-21) desde la transcripción Clubes/Países Bajos/FC Emmen/F.04-FCE-Jaarverslag-2020-2021-incl.-Jaarcijfers-DEF.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
