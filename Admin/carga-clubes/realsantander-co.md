# realsantander-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/realsantander-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Real Santander: alta por tools/alta-club.mjs (2026-10-28) desde Clubes/Colombia/Real Santander/siis-estado-2025.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).
```

```text
data/co/realsantander-co-data.js — Club Deportivo Real Santander S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-28), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Real Santander/siis-estado-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "realsantander-co" — slug de "Real Santander" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Deportivo Real Santander S.A." — respuesta de Guido en la cola (f88be02): aceptó la propuesta
  displayName        ok        "Real Santander" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: patrón del país: los 30 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  sport              ok        "futbol" — la liga co-primeraB del catálogo (data/leagues.js) es de futbol
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (patrón del país: los 30 clubes de CO ya cargados arrancan el 01-01 (el documento no trae fechas de cierre legibles)
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "realsantander-co-siis-estado-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraB" — roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Real Santander"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"realsantander-co-siis-estado-2025"}
```

## 2025

### Liga

```text
alta-club.mjs (2026-10-28): co-primeraB, verificado contra roster cacheado de "2025 Torneo DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Real Santander".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Real Santander/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Real Santander/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de administración | pág. 1, Jev 1 |
| 2 | Otros gastos | pág. 1, Jev 1 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## Fuentes

### realsantander-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Real Santander/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
