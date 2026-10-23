# juvestabia-it — evidencia de carga

Lo que había como comentario en `data/it/juvestabia-it-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/it/juvestabia-it-data.js — Società Sportiva Juve Stabia S.r.l. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-08), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "juvestabia-it" — slug de "Juve Stabia" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Società Sportiva Juve Stabia S.r.l." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-08): Claude 2026-10-08 (revisión Sonnet de las altas de Italia): el script propuso 'Sportiv
  displayName        ok        "Juve Stabia" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (169 de 172 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 23 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (169 de 172 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "juvestabia-it-bilancio-2024-ifrs-sec-6k" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2024 (it-seriea, it-serieb): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"juvestabia-it-bilancio-2024-ifrs-sec-6k"}
============================================================================
```

_de data/clubs.js:_

```text
Juve Stabia: alta por tools/alta-club.mjs (2026-10-08) desde Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

_de data/club-leagues/it.js:_

```text
Juve Stabia (alta-club.mjs, 2026-10-08): SIN VERIFICAR (no aparece en los rosters cacheados de 2024 (it-seriea, it-serieb): puede haber jugado otra división).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sponsorships | pág. 37, Jev 1 |
| 2 | Sponsorships - Related party | pág. 37, Jev 0.99 |
| 3 | Ticketing | pág. 37, precedente |
| 4 | Gain on transfer of players | pág. 37, Jev 0.99 |
| 5 | Revenue from Television rights | pág. 37, Jev 1 |
| 6 | Revenue from Contributions | pág. 37, precedente |
| 7 | Revenue from store | pág. 37, Jev 1 |
| 8 | Other incomes | pág. 37, Jev 0.99 |
| 9 | Other incomes | pág. 6, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ticketing | pág. 40, Jev 0.93 |
| 2 | Sports equipment | pág. 40, precedente |
| 3 | Player salaries | pág. 40, Jev 1 |
| 4 | Accomodation and transportation | pág. 40, Jev 1 |
| 5 | Insurance | pág. 40, precedente |
| 6 | Loan of players | pág. 40, precedente |
| 7 | Other cost of revenues | pág. 40, Jev 1 |
| 8 | Amortization of multi-year football players rights | pág. 40, Jev 1 |
| 9 | Salaries and social security contributions | pág. 42, Claude 0.8 |
| 10 | Rental expenses | pág. 42, Jev 1 |
| 11 | Impairment of receivables | pág. 42, Jev 0.96 |
| 12 | Penalties and fines | pág. 42, precedente |
| 13 | Operating and administrative expenses | pág. 42, Jev 0.91 |
| 14 | Impairment loss on intangible assets | pág. 42, Jev 0.91 |
| 15 | Depreciation costs | pág. 43, Jev 1 |
| 16 | Amortization on Intangible assets | pág. 43, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): Loans and Advances no corriente (BCC) 49.949 + Financial Liabilities - Related Party (soci) 340.000 + Loans and Advances corriente (BCC) 42.224 + Short-term borrowings (descubiertos) 78.275 = 510.448. Sin lease liabilities; incluye préstamo bancario BCC (corriente y no corriente), préstamos de socios y descubiertos bancarios.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera con socios): 49.496. Cash and cash equivalents al 30/06/2024 (IFRS, en unidades de euro); los descubiertos están en Short-term borrowings.
```

## Gestiones

_antes de Andrea Langella (data/gestiones/it.js):_

```text
Andrea Langella: presidente y dueño de la mayoría con su hermano Giuseppe desde 2019 (borsaefinanza.it, 19/4/2024: lo describe como presidente en esa fecha). Las fechas 2021-2026 salen
del título de un artículo que encontró Guido ("2021 - 2026: The Andrea Langella Era"); en junio de 2026 el dueño pasó a Alfredo Guerri (dato de Guido, 2026-10-09; la fuente es la búsqueda que él pasó):
solo mes y año: día 01 por convención. Falta la fecha exacta de asunción de Langella y la del cambio.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### juvestabia-it-bilancio-2024-ifrs-sec-6k

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```


## Resuelto desde Admin/dudas-por-club.md (2026-10-23)

- **Gestión resuelta por Guido el 2026-10-09:** Andrea Langella (borsaefinanza.it, 19/4/2024; 2021-2026 por el título de un artículo) y, desde junio de 2026, Alfredo Guerri (dato de Guido, con una
  búsqueda como fuente); cargadas en `data/gestiones/it.js` con mes y año (día 01). Sin preguntas pendientes para el club. Solo queda, si algún día hace falta, quién tenía el resto de las cuotas
  antes de Brera Holdings.
