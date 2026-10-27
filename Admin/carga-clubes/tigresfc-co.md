# tigresfc-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/tigresfc-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Tigres FC: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Colombia/Tigres FC/siis-estado-2024.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/tigresfc-co-data.js — Tigres FC (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Tigres FC/siis-estado-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "tigresfc-co" — slug de "Tigres FC" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Tigres FC" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Tigres FC" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 22 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraB del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (patrón del país: los 22 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2024-12-31 = 4409.15 (TRM oficial (Banco de la República / Superfinanciera de Colombia) 
  sourceId           ok        "tigresfc-co-siis-estado-2024" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraB" — NO EXACTA, confirmar en la página del club: roster cacheado de "2024 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por pal

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2024-12-31","sourceId":"tigresfc-co-siis-estado-2024"}
```

## 2024

### Liga

```text
alta-club.mjs (2026-10-27): co-primeraB, verificado contra NO EXACTA, confirmar en la página del club: roster cacheado de "2024 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Tigres" = "Tigres FC" (si es el mismo club, agregarlo a alias.json).
```
