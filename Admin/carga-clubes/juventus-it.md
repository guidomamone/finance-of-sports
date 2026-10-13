# juventus-it — evidencia de carga

Lo que había como comentario en `data/juventus-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/juventus-it-data.js — Juventus Football Club S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "juventus-it" — slug de "Juventus" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Juventus Football Club S.p.A." — el .md, 3 veces (nombre del club + forma societaria)
  displayName        ok        "Juventus" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 140 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2012 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2012-06-30" — año del ejercicio + mes de cierre (contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2012-06-30" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.794281. --escribir agrega 'EUR@2012-06-30' a FX_CLOSE
  sourceId           ok        "juventus-it-annual-financial-report-2011-12" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Juventus"

FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2012: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2012-06-30","sourceId":"juventus-it-annual-financial-report-2011-12"}
============================================================================
```

_de data/clubs.js:_

```text
Juventus: alta por tools/alta-club.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding §3 1b, identidad primero).
```

_de data/club-leagues/it.js:_

```text
Juventus (alta-club.mjs, 2026-10-03): verificado contra roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Juventus".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 193, precedente |
| 2 | Broadcasting revenues | pág. 193, Jev 1 |
| 3 | Revenues from sponsorship and advertising | pág. 193, precedente |
| 4 | Revenues from sales of products and licences | pág. 193, precedente |
| 5 | Revenues from players' registration rights | pág. 193, precedente |
| 6 | Other income | pág. 193, Jev 0.99 |
| 7 | Change in the fair value of equity investments in joint ventures | pág. 193, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of raw materials and other consumables | pág. 193, Claude 0.85 |
| 2 | Cost of goods for sale | pág. 193, Jev 0.98 |
| 3 | External services | pág. 193, precedente |
| 4 | Registered players and technical staff | pág. 193, Jev 0.92 |
| 5 | Other personnel expenses | pág. 193, Claude 0.92 |
| 6 | Expenses from players' registration rights | pág. 193, precedente |
| 7 | Other operating expenses | pág. 193, Jev 1 |
| 8 | Amortisation and write-downs of players' registration rights | pág. 193, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 193, precedente |
| 10 | Provisions, other impairments/reversals and releases of provisions | pág. 193, Jev 0.93 |
| 11 | Equity-accounted profit (loss) of associates | pág. 193, Claude 0.88 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
caja/deuda 2025: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-04) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 123, precedente |
| 2 | Audiovisual rights and media revenues | pág. 123, Jev 1 |
| 3 | Revenues from sponsorship and advertising | pág. 123, precedente |
| 4 | Revenues from sales of products and licences | pág. 123, precedente |
| 5 | Revenues from players' registration rights | pág. 123, precedente |
| 6 | Other revenues and income | pág. 123, precedente |
| 7 | Share of results of associates and joint ventures | pág. 123, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-04)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchases of materials, supplies and other consumables | pág. 123, precedente |
| 2 | Purchases of products for sale | pág. 123, precedente |
| 3 | External services | pág. 123, precedente |
| 4 | Players' wages and technical staff costs | pág. 123, precedente |
| 5 | Other personnel | pág. 123, precedente |
| 6 | Expenses from players' registration rights | pág. 123, precedente |
| 7 | Other expenses | pág. 123, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 123, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 123, precedente |
| 10 | Provisions and other write-downs/reverses and releases of funds | pág. 123, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe
tools/cargar.mjs (2026-10-04). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
caja/deuda 2024: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-04, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-04) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2022-23.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 142, precedente |
| 2 | Audiovisual rights and media revenues | pág. 142, Jev 1 |
| 3 | Revenues from sponsorship and advertising | pág. 142, precedente |
| 4 | Revenues from sales of products and licences | pág. 142, precedente |
| 5 | Revenues from players' registration rights | pág. 142, precedente |
| 6 | Other revenue and income | pág. 142, precedente |
| 7 | Share of results of associates and joint ventures | pág. 142, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-04)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 142, precedente |
| 2 | Purchases of products for sale | pág. 142, precedente |
| 3 | External services | pág. 142, precedente |
| 4 | Players' wages and technical staff costs | pág. 142, precedente |
| 5 | Other personnel | pág. 142, precedente |
| 6 | Expenses from players' registration rights | pág. 142, precedente |
| 7 | Other expenses | pág. 142, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 142, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 142, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 142, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe
tools/cargar.mjs (2026-10-04). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
caja 2023: corregida a mano el 2026-10-04 (Guido): "Cash and cash equivalents" 48,389,386 del balance SEPARADO (.md L4800); caja-deuda.mjs había tomado el consolidado (pág. 53, L1504, 48,676,632). 2003-2006: caja y deuda divididas por 1.000 (caja-deuda leyó esos documentos en miles por las filas de la nota de sponsors abiertas a mano).
caja/deuda 2023: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-04, verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-04) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 136, precedente |
| 2 | Audiovisual rights and media revenues | pág. 136, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 136, precedente |
| 4 | Revenues from sales of products and licences | pág. 136, precedente |
| 5 | Revenues from players' registration rights | pág. 136, precedente |
| 6 | Other revenues and income | pág. 136, precedente |
| 7 | Share of results of associates and joint ventures | pág. 136, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-04)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 136, precedente |
| 2 | Purchases of products for sale | pág. 136, precedente |
| 3 | External services | pág. 136, precedente |
| 4 | Players' wages and technical staff costs | pág. 136, precedente |
| 5 | Other personnel | pág. 136, precedente |
| 6 | Expenses from players' registration rights | pág. 136, precedente |
| 7 | Other expenses | pág. 136, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 136, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 136, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 136, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 24,541. Guido 2026-10-04: número de una NOTA (b133, pág. 172) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2019. Guido 2026-10-04: número de una NOTA (b133, pág. 172) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 28,838. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 12,123. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 10,495. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,925. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,603. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,129. Guido 2026-10-04: número de una NOTA (b136, pág. 174) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2,560. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,355. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,205. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,897. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,600. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,835. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,588. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2,250. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,530. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2,980. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,450. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 1,129. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 5,123. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 4,927. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 74,237. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 64,011. Guido 2026-10-04: número de una NOTA (b140, pág. 176) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 12,086. Guido 2026-10-04: número de una NOTA (b149, pág. 181) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 9,545. Guido 2026-10-04: número de una NOTA (b149, pág. 181) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2,541. Guido 2026-10-04: número de una NOTA (b149, pág. 181) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2021. Guido 2026-10-04: número de una NOTA (b149, pág. 181) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-04): confirmado = 2020. Guido 2026-10-04: número de una NOTA (b149, pág. 181) que no se usa para cargar (2022 cierra con la lectura 6, solo el estado b100); se confirma para destrabar el registro
tools/cargar.mjs (2026-10-04). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
caja/deuda 2022: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-04, verificado contra roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 69, precedente |
| 2 | Television and radio rights and media revenues | pág. 69, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 69, precedente |
| 4 | Revenues from sales of products and licences | pág. 69, precedente |
| 5 | Revenues from players' registration rights | pág. 69, precedente |
| 6 | Other revenue and income | pág. 69, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 69, precedente |
| 2 | Purchases of products for sale | pág. 69, precedente |
| 3 | External services | pág. 69, precedente |
| 4 | Players' wages and technical staff costs | pág. 69, precedente |
| 5 | Other personnel | pág. 69, precedente |
| 6 | Expenses from players' registration rights | pág. 69, precedente |
| 7 | Other expenses | pág. 69, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 69, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 69, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 69, precedente |
| 11 | Share of results of associates and joint ventures | pág. 69, Jev 0.94 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe; '(0,157)' se leía como 157 €
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
caja/deuda 2021: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2020–21 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 49, precedente |
| 2 | Television and radio rights and media revenues | pág. 49, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 49, precedente |
| 4 | Revenues from sales of products and licences | pág. 49, precedente |
| 5 | Revenues from players' registration rights | pág. 49, precedente |
| 6 | Other revenue and income | pág. 49, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 49, precedente |
| 2 | Purchases of products for sale | pág. 49, Jev 0.99 |
| 3 | External services | pág. 49, precedente |
| 4 | Players' wages and technical staff costs | pág. 49, precedente |
| 5 | Other personnel | pág. 49, precedente |
| 6 | Expenses from players' registration rights | pág. 49, precedente |
| 7 | Other expenses | pág. 49, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 49, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 49, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 49, Claude 0.93 |
| 11 | Group's share of results of associates and joint ventures | pág. 49, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 2 (compuerta: año anterior): "Cash and cash equivalents" pág. 46
caja/deuda 2020: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 43, precedente |
| 2 | Television and radio rights and media revenues | pág. 43, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 43, precedente |
| 4 | Revenues from sales of products and licences | pág. 43, precedente |
| 5 | Revenues from players' registration rights | pág. 43, precedente |
| 6 | Other revenues | pág. 43, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 43, precedente |
| 2 | Purchases of products for sale | pág. 43, precedente |
| 3 | External services | pág. 43, precedente |
| 4 | Players' wages and technical staff costs | pág. 43, precedente |
| 5 | Other personnel | pág. 43, precedente |
| 6 | Expenses from players' registration rights | pág. 43, precedente |
| 7 | Other expenses | pág. 43, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 43, precedente |
| 9 | Amortisation of other tangible and intangible assets | pág. 43, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 43, precedente |
| 11 | Group's share of results of associates and joint ventures | pág. 43, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe del estado; '(0,040)' se leía como 40 €
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
caja/deuda 2019: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 45, precedente |
| 2 | Television and radio rights and media revenues | pág. 45, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 45, precedente |
| 4 | Revenues from sales of products and licences | pág. 45, precedente |
| 5 | Revenues from players' registration rights | pág. 45, precedente |
| 6 | Other revenues | pág. 45, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 45, precedente |
| 2 | Purchases of products for sale | pág. 45, Jev 0.99 |
| 3 | External services | pág. 45, precedente |
| 4 | Players' wages and technical staff costs | pág. 45, precedente |
| 5 | Other personnel | pág. 45, precedente |
| 6 | Expenses from players' registration rights | pág. 45, precedente |
| 7 | Other expenses | pág. 45, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 45, precedente |
| 9 | Amortisation of other tangible and intangible assets | pág. 45, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 45, Claude 0.93 |
| 11 | Group's share of results of associates and joint ventures | pág. 45, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 42
caja/deuda 2018: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2017–18 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2016-17.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 68, precedente |
| 2 | Television and radio rights and media revenues | pág. 68, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 68, precedente |
| 4 | Revenues from sales of products and licences | pág. 68, precedente |
| 5 | Revenues from players' registration rights | pág. 68, precedente |
| 6 | Other revenues | pág. 68, precedente |
| 7 | Other non-recurring revenues and costs | pág. 68, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 68, precedente |
| 2 | Purchases of products for sale | pág. 68, Jev 0.99 |
| 3 | External services | pág. 68, precedente |
| 4 | Players' wages and technical staff costs | pág. 68, precedente |
| 5 | Other personnel | pág. 68, precedente |
| 6 | Expenses from players' registration rights | pág. 68, precedente |
| 7 | Other expenses | pág. 68, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 68, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 68, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 68, Claude 0.93 |
| 11 | Group's share of results of associates and *joint ventures | pág. 68, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 65
caja/deuda 2017: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2016–17 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2015-16.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 64, precedente |
| 2 | Television and radio rights and media revenues | pág. 64, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 64, precedente |
| 4 | Revenues from sales of products and licences | pág. 64, precedente |
| 5 | Revenues from players' registration rights | pág. 64, precedente |
| 6 | Other revenues | pág. 64, precedente |
| 7 | Other non-recurring revenues and costs | pág. 64, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 64, precedente |
| 2 | Purchases of products for sale | pág. 64, Jev 0.99 |
| 3 | External services | pág. 64, precedente |
| 4 | Players' wages and technical staff costs | pág. 64, precedente |
| 5 | Other personnel | pág. 64, precedente |
| 6 | Expenses from players' registration rights | pág. 64, precedente |
| 7 | Other expenses | pág. 64, precedente |
| 8 | Amortisation and write-downs of players' registration rights | pág. 64, precedente |
| 9 | Depreciation/amortisation of other tangible and intangible assets | pág. 64, precedente |
| 10 | Provisions, write-downs and release of funds | pág. 64, Claude 0.93 |
| 11 | Group's share of results of associates and joint ventures | pág. 64, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 61
caja/deuda 2016: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2015–16 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2014-15.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 69, precedente |
| 2 | Television and radio rights and media revenues | pág. 69, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 69, precedente |
| 4 | Revenues from players' registration rights | pág. 69, precedente |
| 5 | Other revenues | pág. 69, precedente |
| 6 | Other non-recurring revenues and costs | pág. 69, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 69, precedente |
| 2 | External services | pág. 69, precedente |
| 3 | Players' wages and technical staff costs | pág. 69, precedente |
| 4 | Other personnel | pág. 69, precedente |
| 5 | Expenses from players' registration rights | pág. 69, precedente |
| 6 | Other expenses | pág. 69, precedente |
| 7 | Amortisation and write-downs of players' registration rights | pág. 69, precedente |
| 8 | Depreciation/amortisation of other tangible and intangible assets | pág. 69, Jev 0.99 |
| 9 | Provisions and other write-downs/reverses and releases | pág. 69, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 66
caja/deuda 2015: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2014–15 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2013-14.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2013-14.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 77, precedente |
| 2 | Television and radio rights and media revenues | pág. 77, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 77, precedente |
| 4 | Revenues from players' registration rights | pág. 77, precedente |
| 5 | Other revenues | pág. 77, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 77, precedente |
| 2 | External services | pág. 77, precedente |
| 3 | Players' wages and technical staff costs | pág. 77, precedente |
| 4 | Other personnel | pág. 77, precedente |
| 5 | Expenses from players' registration rights | pág. 77, precedente |
| 6 | Other expenses | pág. 77, precedente |
| 7 | Amortisation and write-downs of players' registration rights | pág. 77, precedente |
| 8 | Depreciation/amortisation of other tangible and intangible assets | pág. 77, Jev 0.99 |
| 9 | Provisions and other write-downs/reverses and releases | pág. 77, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 74
caja/deuda 2014: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2012-13.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 79, precedente |
| 2 | Television and radio rights and media revenues | pág. 79, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 79, precedente |
| 4 | Revenues from players' registration rights | pág. 79, precedente |
| 5 | Other revenues | pág. 79, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 79, precedente |
| 2 | External services | pág. 79, precedente |
| 3 | Players' wages and technical staff costs | pág. 79, precedente |
| 4 | Other personnel | pág. 79, precedente |
| 5 | Expenses from players' registration rights | pág. 79, precedente |
| 6 | Other expenses | pág. 79, precedente |
| 7 | Amortisation and write-downs of players' registration rights | pág. 79, precedente |
| 8 | Depreciation/amortisation of other tangible and intangible assets | pág. 79, Jev 0.99 |
| 9 | Provisions and other write-downs/reverses and releases | pág. 79, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 76
caja/deuda 2013: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2012–13 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2011-12.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 86, Jev 0.99 |
| 2 | Television and radio rights and media revenues | pág. 86, Jev 1 |
| 3 | Revenues from sponsorship and advertising | pág. 86, Jev 1 |
| 4 | Revenues from players' registration rights | pág. 86, Jev 0.94 |
| 5 | Other revenues | pág. 86, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 86, precedente |
| 2 | External services | pág. 86, Jev 1 |
| 3 | Players' wages and technical staff costs | pág. 86, Jev 1 |
| 4 | Other personnel | pág. 86, precedente |
| 5 | Expenses from players' registration rights | pág. 86, precedente |
| 6 | Other expenses | pág. 86, Jev 1 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 86, Jev 0.96 |
| 8 | Amortisation of other tangible and intangible assets | pág. 86, Jev 0.96 |
| 9 | Provisions and other write-downs/reverses and releases | pág. 86, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 83
caja/deuda 2012: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2010-11.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2010-11.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 70, precedente |
| 2 | Television and radio rights and media revenues | pág. 70, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 70, precedente |
| 4 | Revenues from players' registration rights | pág. 70, precedente |
| 5 | Other revenues | pág. 70, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 70, precedente |
| 2 | External services | pág. 70, precedente |
| 3 | Players' wages and technical staff costs | pág. 70, precedente |
| 4 | Other personnel | pág. 70, precedente |
| 5 | Expenses from players' registration rights | pág. 70, precedente |
| 6 | Other costs | pág. 70, Jev 0.99 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 70, precedente |
| 8 | Other amortisation, provisions and release of provisions | pág. 70, Jev 0.99 |
| 9 | Other non recurring revenues and costs | pág. 70, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 68
caja/deuda 2011: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2011: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2010–11 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2009-10.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2009-10.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 62, precedente |
| 2 | Television and radio rights and media revenues | pág. 62, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 62, precedente |
| 4 | Revenues from players' registration rights | pág. 62, precedente |
| 5 | Other revenues | pág. 62, precedente |
| 6 | Other non recurring revenues and costs | pág. 62, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 62, precedente |
| 2 | External services | pág. 62, precedente |
| 3 | Players' wages and technical staff costs | pág. 62, precedente |
| 4 | Other personnel | pág. 62, precedente |
| 5 | Expenses from players' registration rights | pág. 62, precedente |
| 6 | Other costs | pág. 62, Jev 0.99 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 62, precedente |
| 8 | Other amortisation, write-downs and provisions | pág. 62, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 60
caja/deuda 2010: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2010: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2009–10 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2008-09.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2008-09.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 75, precedente |
| 2 | Television and radio rights and media revenues | pág. 75, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 75, precedente |
| 4 | Revenues from players' registration rights | pág. 75, precedente |
| 5 | Other revenues | pág. 75, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 75, precedente |
| 2 | External services | pág. 75, precedente |
| 3 | Players' wages and technical staff costs | pág. 75, precedente |
| 4 | Other personnel | pág. 75, precedente |
| 5 | Expenses from players' registration rights | pág. 75, precedente |
| 6 | Other costs | pág. 75, Jev 0.99 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 75, precedente |
| 8 | Other amortisation, write-downs and provisions | pág. 75, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: año anterior): "Cash and cash equivalents" pág. 73
caja/deuda 2009: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2009: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2008–09 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2007-08.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2007-08.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 47, precedente |
| 2 | Television and radio rights and media revenues | pág. 47, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 47, precedente |
| 4 | Revenues from players' registration rights | pág. 47, precedente |
| 5 | Other revenues | pág. 47, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 47, precedente |
| 2 | External services | pág. 47, precedente |
| 3 | Players' wages and technical staff costs | pág. 47, precedente |
| 4 | Other personnel | pág. 47, precedente |
| 5 | Expenses from players' registration rights | pág. 47, precedente |
| 6 | Other costs | pág. 47, Jev 0.99 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 47, precedente |
| 8 | Other amortisation, write-downs and provisions | pág. 47, Jev 1 |
| 9 | Other non recurring revenues and costs | pág. 47, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
caja/deuda 2008: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2008: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2007–08 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2007

### Ingresos

```text
2007: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2006-07.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticket sales | pág. 61, precedente |
| 2 | Television and radio rights and media revenues | pág. 61, precedente |
| 3 | Revenues from sponsorship and advertising | pág. 61, precedente |
| 4 | Revenues from players' registration rights | pág. 61, precedente |
| 5 | Other revenues | pág. 61, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Purchase of materials, supplies and other consumables | pág. 61, precedente |
| 2 | External services | pág. 61, precedente |
| 3 | Players' wages and technical staff costs | pág. 61, precedente |
| 4 | Other personnel | pág. 61, precedente |
| 5 | Expenses from players' registration rights | pág. 61, precedente |
| 6 | Other costs | pág. 61, Jev 0.99 |
| 7 | Amortisation and write-downs of players' registration rights | pág. 61, precedente |
| 8 | Other amortisation, write-downs and provisions | pág. 61, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
caja/deuda 2007: cargadas a mano el 2026-10-04 (Guido) del balance SEPARADO; deuda = "Loans/Bonds and other financial payables/liabilities" no corriente + corriente (diagnóstico de caja-deuda, Admin/HANDOFF-pipeline.md).
```

### Liga

```text
2007: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2006–07 Serie B" (tools/club-league-reference/it.json), coincidencia e
```

## 2006

### Ingresos

```text
2006: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2005-06.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2005-06.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) REVENUES FROM SALES AND SERVICES | pág. 81, precedente |
| 2 | a) Income from temporary transfer of players | pág. 81, Jev 0.98 |
| 3 | b) LNP contributions | pág. 81, precedente |
| 4 | Option rights granted to RTI (Mediaset), TV 2007/08-2008/09 | pág. 111, ajuste manual (auditoría 2026-10-04): parte de 'e) Other revenues and income', .md L3133 |
| 5 | e) Other revenues and income (resto) | pág. 81, ajuste manual: 51.002569 menos los 30 de RTI |
| 6 | a) Capital gains on disposals | pág. 82, precedente |
| 7 | b) Others | pág. 82, Jev 0.99 |
| 8 | Official and Technical sponsors | pág. 109, Jev 1 |
| 9 | Other sponsorships and other commercial contracts | pág. 109, Jev 0.99 |
| 10 | Television and radio revenues | pág. 109, Jev 1 |
| 11 | TV revenues percentage from other teams | pág. 109, Jev 0.96 |
| 12 | Telephone rights | pág. 109, precedente |
| 13 | Revenues from U.E.F.A. Champions League | pág. 109, Jev 0.96 |
| 14 | Advertising | pág. 109, Jev 1 |
| 15 | Technical staff and players' image rights | pág. 109, precedente |
| 16 | Sundry income | pág. 109, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) RAW MATERIALS, SUPPLIES, CONSUMABLES AND GOODS | pág. 81, Claude 0.8 |
| 2 | 7) SERVICES | pág. 81, Jev 0.99 |
| 3 | 8) LEASES AND RENTALS | pág. 81, Jev 0.99 |
| 4 | a) Salaries and wages | pág. 81, Jev 0.98 |
| 5 | b) Social security contributions | pág. 81, precedente |
| 6 | c) Employees' severance indemnity | pág. 81, Jev 0.9 |
| 7 | e) Other costs | pág. 81, Jev 0.99 |
| 8 | a) Amortisation of intangible fixed assets | pág. 81, precedente |
| 9 | b) Depreciation of tangible fixed assets | pág. 81, Jev 1 |
| 10 | c) Other write-downs of assets | pág. 81, precedente |
| 11 | d) Write-downs of receivables entered under current assets and cash at bank and in hand | pág. 81, precedente |
| 12 | Other risks | pág. 81, Jev 0.94 |
| 13 | a) Match organisation expenses | pág. 81, Jev 1 |
| 14 | b) Official match expenses | pág. 81, Jev 1 |
| 15 | c) Match registration fees | pág. 81, Jev 1 |
| 16 | d) Others | pág. 81, Jev 0.99 |
| 17 | a) Capital losses on disposals | pág. 82, precedente |
| 18 | c) Others | pág. 82, Jev 0.99 |

### Meta

```text
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -270,216. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -3,386,350. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 34470000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3074)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 17437000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3075)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 95595809. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3076) (incluye -191 € de redondeo de la nota en miles)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3967000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3077)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 8735000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3078)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 18915000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3079)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1628000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3080)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1731000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3081)
2006: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 166000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3082)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): grossDebt escalón 2 (compuerta: año anterior): "4) Due to banks" pág. 79; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
```

### Liga

```text
2006: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2005–06 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2005

### Ingresos

```text
2005: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2004-05.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2004-05.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) REVENUES FROM SALES AND SERVICES | pág. 72, precedente |
| 2 | a) Income from temporary transfer of players | pág. 72, Jev 0.98 |
| 3 | e) Other revenues and income | pág. 72, precedente |
| 4 | a) Capital gains on disposals | pág. 73, precedente |
| 5 | Official and Technical sponsors | pág. 101, Jev 1 |
| 6 | Other sponsorships and other commercial contracts | pág. 101, Jev 0.99 |
| 7 | Television and radio revenues | pág. 101, Jev 1 |
| 8 | TV revenues percentage from other teams | pág. 101, Jev 0.96 |
| 9 | Telephone rights | pág. 101, precedente |
| 10 | Revenues from U.E.F.A. Champions League | pág. 101, Jev 0.96 |
| 11 | Advertising | pág. 101, Jev 1 |
| 12 | Technical staff and players' image rights | pág. 101, precedente |
| 13 | Sundry income | pág. 101, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) RAW MATERIALS, SUPPLIES, CONSUMABLES AND GOODS | pág. 72, Claude 0.8 |
| 2 | 7) SERVICES | pág. 72, Jev 0.99 |
| 3 | 8) LEASES AND RENTALS | pág. 72, Jev 0.99 |
| 4 | a) Salaries and wages | pág. 72, Jev 0.98 |
| 5 | b) Social security contributions | pág. 72, precedente |
| 6 | c) Employees' severance indemnity | pág. 72, Jev 0.9 |
| 7 | e) Other costs | pág. 72, Jev 0.99 |
| 8 | a) Amortisation of intangible fixed assets | pág. 72, precedente |
| 9 | b) Depreciation of tangible fixed assets | pág. 72, Jev 1 |
| 10 | c) Altre svalutazioni delle immobilizzazioni | pág. 72, precedente |
| 11 | d) Write-downs of receivables entered under current assets and cash at bank and in hand | pág. 72, precedente |
| 12 | Other risks | pág. 72, Jev 0.94 |
| 13 | a) Match organisation expenses | pág. 72, Jev 1 |
| 14 | b) Official match expenses | pág. 72, Jev 1 |
| 15 | c) Match registration fees | pág. 72, Jev 1 |
| 16 | d) Others | pág. 72, Jev 0.99 |
| 17 | a) Capital losses on disposals | pág. 73, precedente |
| 18 | c) Others | pág. 73, Jev 0.99 |

### Meta

```text
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -148,861. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -1,585,619. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 29,168,740. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3,451,549. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 100,745. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 38802000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2804)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 15423000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2805)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 97847015. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2806) (incluye 15 € de redondeo de la nota en miles)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3832000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2807)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 7730000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2808)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 14986000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2809)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 990000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2810)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2326000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2811)
2005: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 192000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2812)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): grossDebt escalón 2 (compuerta: documento siguiente): "4) Due to banks" pág. 70; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
```

### Liga

```text
2005: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2004–05 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2004

### Ingresos

```text
2004: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2003-04.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2003-04.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) REVENUES FROM SALES AND SERVICES | pág. 74, precedente |
| 2 | a) Income from temporary transfer of players | pág. 74, Jev 0.98 |
| 3 | e) Other revenues and income | pág. 74, precedente |
| 4 | a) capital gains on disposals | pág. 75, precedente |
| 5 | b) use of reserve ex art. 26 of the Company By-Laws | pág. 75, Jev 0.99 |
| 6 | d) others | pág. 75, precedente |
| 7 | Official and technical sponsors | pág. 95, Jev 1 |
| 8 | Other sponsorships and other commercial contracts | pág. 95, Jev 0.99 |
| 9 | Television revenues | pág. 95, Jev 1 |
| 10 | TV revenues percentage from visiting team | pág. 95, Jev 0.99 |
| 11 | Telephonic rights | pág. 95, precedente |
| 12 | Revenues from U.E.F.A. Champions League | pág. 95, Jev 0.96 |
| 13 | Advertising | pág. 95, Jev 1 |
| 14 | Players' and coach image rights | pág. 95, precedente |
| 15 | Sundry income | pág. 95, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) RAW MATERIALS, SUPPLIES, CONSUMABLES AND GOODS | pág. 74, Claude 0.8 |
| 2 | 7) SERVICES | pág. 74, Jev 0.99 |
| 3 | 8) LEASES AND RENTALS | pág. 74, Jev 0.99 |
| 4 | a) Salaries and wages | pág. 74, Jev 0.98 |
| 5 | b) Social security contributions | pág. 74, precedente |
| 6 | c) Employees' severance indemnity | pág. 74, Jev 0.9 |
| 7 | e) Other costs | pág. 74, Jev 0.99 |
| 8 | a) Amortisation of intangible fixed assets | pág. 74, precedente |
| 9 | b) Depreciation of tangible fixed assets | pág. 74, Jev 1 |
| 10 | d) Write-downs of receivables entered under current assets and cash at bank and in hand | pág. 74, precedente |
| 11 | a) Match organisation expenses | pág. 74, Jev 1 |
| 12 | b) Official match expenses | pág. 74, Jev 1 |
| 13 | c) Match registration fees | pág. 74, Jev 1 |
| 14 | d) Others | pág. 74, Jev 0.99 |
| 15 | a) capital losses on disposals | pág. 75, precedente |
| 16 | c) others | pág. 75, Jev 0.99 |

### Meta

```text
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -3,026,244. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 5,043,852. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 215,006. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 103,318. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1,314,812. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3,121,282. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 32578000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3396)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 17782000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3397)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 84968975. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3398) (incluye -25 € de redondeo de la nota en miles)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3530000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3399)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 6720000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3400)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 14927000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3401)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1052000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3402)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2353000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3403)
2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 392000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3404)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
```

### Liga

```text
2004: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2003–04 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2003

### Ingresos

```text
2003: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2002-03.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juventus/Juventus-annual-financial-report-2002-03.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 1) REVENUES FROM SALES AND SERVICES | pág. 67, precedente |
| 2 | a) Income from temporary transfer of players | pág. 67, Jev 0.98 |
| 3 | e) Other revenues and income | pág. 67, precedente |
| 4 | a) capital gains on disposals | pág. 68, precedente |
| 5 | b) use of reserve art. 25 of the Company By-Laws | pág. 68, Jev 0.99 |
| 6 | d) others | pág. 68, precedente |
| 7 | Official and technical sponsors | pág. 87, Jev 1 |
| 8 | Other sponsorships and other commercial contracts | pág. 87, Jev 0.99 |
| 9 | Television revenues | pág. 87, Jev 1 |
| 10 | TV revenues percentage from visiting team | pág. 87, Jev 0.99 |
| 11 | Telephonic rights | pág. 87, precedente |
| 12 | Revenues from U.E.F.A. Champions League | pág. 87, Jev 0.96 |
| 13 | Advertising | pág. 87, Jev 1 |
| 14 | Players' and coach image rights | pág. 87, precedente |
| 15 | Sundry income | pág. 87, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6) PURCHASES | pág. 67, Jev 0.99 |
| 2 | 7) SERVICE EXPENSES | pág. 67, precedente |
| 3 | 8) LEASE AND RENT COSTS | pág. 67, Jev 0.99 |
| 4 | a) Salaries and wages | pág. 67, Jev 0.98 |
| 5 | b) Social security contributions | pág. 67, precedente |
| 6 | c) Severance indemnity | pág. 67, precedente |
| 7 | e) Other costs | pág. 67, Jev 0.99 |
| 8 | a) Amortisation of intangible fixed assets | pág. 67, precedente |
| 9 | b) Depreciation of tangible fixed assets | pág. 67, Jev 1 |
| 10 | d) Write-downs of receivables entered under current assets and cash at bank and in hand | pág. 67, precedente |
| 11 | Other risks | pág. 67, Jev 0.94 |
| 12 | a) Match organisation expenses | pág. 67, Jev 1 |
| 13 | b) Official match expenses | pág. 67, Jev 1 |
| 14 | c) Match registration fees | pág. 67, Jev 1 |
| 15 | d) Others | pág. 67, Jev 0.99 |
| 16 | c) of securities entered under current assets other than shareholdings | pág. 68, Jev 0.94 |
| 17 | a) capital losses on disposals | pág. 68, precedente |
| 18 | c) other extraordinary expenses | pág. 68, precedente |

### Meta

```text
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -670,013. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 196,702. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 48,013,871. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 613,289. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 4,217,905. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2,447,425. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1,469,301. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 32150000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2806)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 19530000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2807)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 78201921. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2808) (incluye -79 € de redondeo de la nota en miles)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3488000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2809)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 5715000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2810)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 35009000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2811)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 536000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2813)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2396000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2814)
2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 478000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2815)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-04): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-03: caja total del balance separado; el script leía otra fila (reclasificado en miles, total del activo corriente o consolidado)
```

### Liga

```text
2003: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2002–03 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
