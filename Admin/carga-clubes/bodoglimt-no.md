# bodoglimt-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/bodoglimt-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Bodø-Glimt: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Noruega/Bodø-Glimt/aarsregnskap-2025.md. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/no/bodoglimt-no-data.js — FK Bodø/Glimt (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Bodø-Glimt/aarsregnskap-2025.md

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "bodoglimt-no" — slug de "Bodø-Glimt" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "FK Bodø/Glimt" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): aarsregnskap-2025.md L1454 dice "Vi
  displayName        ok        "Bodø-Glimt" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — el documento más reciente del club (aarsregnskap-2025.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 12: 2008,2009,2010,2011,2012,2013,2014,20
  sport              ok        "futbol" — la liga no-eliteserien del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (7 de 8 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — claude-api con cita verificada: pág. 1: "Morselskap i konsern: Ja" (confianza 0.85)
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene NOK@2025-12-31 = 10.0791 (Tipo medio de referencia de Norges Bank al 2025-12-31)
  sourceId           ok        "bodoglimt-no-aarsregnskap-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Bodø/Glimt"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2025-12-31","sourceId":"bodoglimt-no-aarsregnskap-2025"}
```

## 2025

### Liga

```text
alta-club.mjs (2026-10-27): no-eliteserien, verificado contra roster cacheado de "2025 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Bodø/Glimt".
```
