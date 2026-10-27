# cucutadeportivo-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/cucutadeportivo-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Cucuta Deportivo: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Colombia/Cucuta Deportivo/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/cucutadeportivo-co-data.js — Cúcuta Deportivo Fútbol Club S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Cucuta Deportivo/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "cucutadeportivo-co" — slug de "Cucuta Deportivo" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Cúcuta Deportivo Fútbol Club S.A." — respuesta de Guido en la cola (d27e3e8)
  displayName        ok        "Cucuta Deportivo" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
  sport              ok        "futbol" — la liga co-primeraB del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] cucuta deportivo: #D90706 red, #010000 black, #995D11 brown, #FEFEFE white
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "cucutadeportivo-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraB" — roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Cúcuta Deportivo"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"cucutadeportivo-co-siis-estado-2025"}
```

## 2025

### Liga

```text
alta-club.mjs (2026-10-27): co-primeraB, verificado contra roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Cúcuta Deportivo".
```
