# llaneros-co — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/llaneros-co-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Llaneros: alta por tools/alta-club.mjs (2026-10-20) desde Clubes/Colombia/Llaneros/estados-financieros-2025.pdf. brandColor:null a propósito
(procedencia en Admin/sourcing/Colombia/Llaneros.md; tools/cargar-lote.mjs).
```

```text
data/co/llaneros-co-data.js — Club Llaneros S.A. (Colombia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-20), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Colombia/Llaneros/estados-financieros-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "llaneros-co" — slug de "Llaneros" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Club Llaneros S.A." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): estados-financieros-2025.md L41 dic
  displayName        ok        "Llaneros" — nombre de la carpeta del club en Clubes/
  country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
  reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (9 de 9 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 20 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] llaneros: #EFDB3E yellow, #B59127 gold, #3E4051 slate gray, #0D0D0D black
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (9 de 9 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): Club Llaneros S.A. presenta estados de una sola entidad; 'consolidado' en e
  currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
  sourceId           ok        "llaneros-co-estados-financieros-2025" — clubId + nombre del archivo en slug
  liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Llaneros"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"llaneros-co-estados-financieros-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Colombia/Llaneros/estados-financieros-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Llaneros/estados-financieros-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cesion de Derechos de TV | pág. 11, Jev 1 |
| 2 | Contratos Publicidad | pág. 11, Jev 1 |
| 3 | Auxilio Transporte Dimayor | pág. 11, Jev 0.99 |
| 4 | Auxilio Arbitraje Dimayor | pág. 11, Jev 0.92 |
| 5 | Auxilio Hotelero Dimayor | pág. 11, Jev 0.95 |
| 6 | Mecanismo de Solidaridad | pág. 11, Jev 0.99 |
| 7 | Taquillas | pág. 11, Jev 1 |
| 8 | Otros Ingresos | pág. 18, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gastos de Administración | pág. 18, Jev 1 |
| 2 | Gastos por beneficios a empleados | pág. 12, Jev 0.95 |
| 3 | Honorarios | pág. 12, Jev 0.92 |
| 4 | Impuestos | pág. 12, Jev 0.98 |
| 5 | Arrendamientos | pág. 12, precedente |
| 6 | Seguros | pág. 12, Claude 0.8 |
| 7 | Servicios | pág. 12, Jev 0.93 |
| 8 | Gastos legales | pág. 12, Jev 1 |
| 9 | Mantenimiento y reparaciones | pág. 12, precedente |
| 10 | Adecuacion e instalacion | pág. 12, precedente |
| 11 | Gastos de Viaje | pág. 12, Jev 1 |
| 12 | Otros Gstos | pág. 12, Jev 0.96 |
| 13 | Gastos extraordinarios | pág. 13, Jev 1 |
| 14 | Gastos diversos | pág. 13, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-28): cash escalón 1 (compuerta: balance del documento): "Efectivo y Equivalentes de Efectivo" pág. 17
```

### Liga

```text
alta-club.mjs (2026-10-20): co-primeraA, verificado contra roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia exacta "Llaneros".
```

## Fuentes

### llaneros-co-estados-financieros-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Colombia/Llaneros/estados-financieros-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
