# vvvvenlo-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/vvvvenlo-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
VVV-Venlo: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/VVV-Venlo/jaarverslag_2024-2025_-_vvv-venlo_bv.pdf. brandColor #FFFF00
(procedencia en Admin/sourcing/Países Bajos/VVV-Venlo.md; tools/cargar-lote.mjs).
```

```text
data/nl/vvvvenlo-nl-data.js — VVV-Venlo B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/VVV-Venlo/jaarverslag_2024-2025_-_vvv-venlo_bv.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vvvvenlo-nl" — slug de "VVV-Venlo" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "VVV-Venlo B.V." — respuesta de Guido en la cola (3ea046c): aceptó la propuesta
  displayName        ok        "VVV-Venlo" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): el jaarverslag de VVV-Venlo B.V. trae la cuenta de resultados (Omzet, Bedri
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "VVV-Venlo"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/VVV-Venlo/jaarverslag_2024-2025_-_vvv-venlo_bv.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/VVV-Venlo/jaarverslag_2024-2025_-_vvv-venlo_bv.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 5, Jev 1 |
| 2 | Resultaat vergoedingsommen | pág. 5, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Personeelskosten | pág. 5, Claude 0.8 |
| 2 | Verkoopkosten | pág. 5, Jev 1 |
| 3 | Huisvestingskosten | pág. 5, Jev 0.99 |
| 4 | Wedstrijd-trainingskosten | pág. 5, Claude 0.8 |
| 5 | Algemene kosten | pág. 5, Jev 1 |
| 6 | Afsch. Materiele vaste activa | pág. 5, Jev 1 |
| 7 | Afschrijving vergoedingsommen | pág. 5, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): reportType = official_balance_sheet. el jaarverslag de VVV-Venlo B.V. trae la cuenta de resultados (Omzet, Bedrijfsresultaat, vergoedingssommen, financieel): la verificación cierra con el resultado impreso (Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2024–25 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "VVV-Venlo".
```

## Fuentes

### vvvvenlo-nl-jaarverslag-2024-2025-vvv-venlo-bv

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/VVV-Venlo/jaarverslag_2024-2025_-_vvv-venlo_bv.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
