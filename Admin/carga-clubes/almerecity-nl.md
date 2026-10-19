# almerecity-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/almerecity-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Almere City: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Almere City/wf-2024-2025-68975c13.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Países Bajos/Almere City.md; tools/cargar-lote.mjs).
```

```text
data/nl/almerecity-nl-data.js — Almere City FC B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Almere City/wf-2024-2025-68975c13.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "almerecity-nl" — slug de "Almere City" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Almere City FC B.V." — respuesta de Guido en la cola (112059e): aceptó la propuesta
  displayName        ok        "Almere City" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (6 de 6 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 14 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (6 de 6 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "almerecity-nl-wf-2024-2025-68975c13" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Almere City"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"almerecity-nl-wf-2024-2025-68975c13"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Almere City/wf-2024-2025-68975c13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Almere City/wf-2024-2025-68975c13.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 10, Jev 1 |
| 2 | Resultaat vergoedingssommen | pág. 10, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 10, Jev 1 |
| 2 | Overige personeelskosten | pág. 10, precedente |
| 3 | Afschrijving vaste activa | pág. 10, Jev 0.99 |
| 4 | Overige bedrijfskosten | pág. 10, Claude 0.85 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2024–25 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Almere City".
```

## Fuentes

### almerecity-nl-wf-2024-2025-68975c13

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Almere City/wf-2024-2025-68975c13.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
