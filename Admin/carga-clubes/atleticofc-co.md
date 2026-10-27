# atleticofc-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/atleticofc-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Atletico FC: alta por tools/alta-club.mjs (2026-10-27) desde Clubes/Colombia/Atletico FC/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/atleticofc-co-data.js — Club Deportivo Atletico Futbol Club Sa (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-27), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Atletico FC/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "atleticofc-co" — slug de "Atletico FC" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Deportivo Atletico Futbol Club Sa" — respuesta de Guido en la cola (b50f850): aceptó la propuesta
  displayName        ok        "Atletico FC" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (2 de 2 documentos cierran en el mes 12); este documento no alcanza solo
  sport              ok        "futbol" — el .md nombra el fútbol 1 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (2 de 2 documentos cierran en el mes 12); este documento no alcanza solo)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "atleticofc-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               pendiente null — coincidencia NO exacta en los rosters cacheados: "Atlético Bucaramanga" en 2025 Liga DIMAYOR | "Atlético Nacional" en 2025 Liga DIMAYOR | "Atlético" e

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"atleticofc-co-siis-estado-2025"}
```

## 2025

### Liga

```text
alta-club.mjs (2026-10-27): null, SIN VERIFICAR (coincidencia NO exacta en los rosters cacheados: "Atlético Bucaramanga" en 2025 Liga DIMAYOR | "Atlético Nacional" en 2025 Liga DIMAYOR | "Atlético" en 2025 Torneo DIMAYOR | "Atlético Huila" en 2025 Torneo DIMAYOR).
```
