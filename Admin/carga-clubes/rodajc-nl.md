# rodajc-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/rodajc-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Roda JC: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Roda JC/wf-2024-2025-e1694c69.pdf. brandColor #E1AD00
(procedencia en Admin/sourcing/Países Bajos/Roda JC.md; tools/cargar-lote.mjs).
```

```text
data/nl/rodajc-nl-data.js — Roda JC (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Roda JC/wf-2024-2025-e1694c69.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "rodajc-nl" — slug de "Roda JC" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Roda JC" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Roda JC" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 2024-2025; balance consolidado 'per 30 juni 
  sport              ok        "futbol" — el .md nombra el fútbol 15 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 2024-2025; balance consolidado 'per 30 juni 2025'
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): boekjaar 2024-2025; balance consolidado 
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "rodajc-nl-wf-2024-2025-e1694c69" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Roda JC Kerkrade" = "Roda JC"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"rodajc-nl-wf-2024-2025-e1694c69"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Roda JC/wf-2024-2025-e1694c69.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Roda JC/wf-2024-2025-e1694c69.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 14, Jev 1 |
| 2 | Resultaat vergoedingssommen | pág. 14, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personeelskosten | pág. 14, precedente |
| 2 | Afschrijvingen | pág. 14, precedente |
| 3 | Overige bedrijfskosten | pág. 14, Claude 0.85 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2025-06-30. boekjaar 2024-2025; balance consolidado 'per 30 juni 2025'
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia única por palabras "Roda JC Kerkrade" = "Roda JC".
```

## Fuentes

### rodajc-nl-wf-2024-2025-e1694c69

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Roda JC/wf-2024-2025-e1694c69.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
