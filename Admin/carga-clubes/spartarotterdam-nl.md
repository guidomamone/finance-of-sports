# spartarotterdam-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/spartarotterdam-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Sparta Rotterdam: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.pdf. brandColor #E2001A
(procedencia en Admin/sourcing/Países Bajos/Sparta Rotterdam.md; tools/cargar-lote.mjs).
```

```text
data/nl/spartarotterdam-nl-data.js — Sparta Beheer B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "spartarotterdam-nl" — slug de "Sparta Rotterdam" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Sparta Beheer B.V." — respuesta de Guido en la cola (874d0fc): aceptó la propuesta
  displayName        ok        "Sparta Rotterdam" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (105 de 110 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 54 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (105 de 110 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio 2024-06-30 se publicó solo c
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "spartarotterdam-nl-wf-2023-2024-7bc9c6f8" — clubId + nombre del archivo en slug
  liga               ok        "nl-eredivisie" — roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Sparta Rotterdam"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"spartarotterdam-nl-wf-2023-2024-7bc9c6f8"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 40, Jev 1 |
| 2 | Resultaat vergoedingssommen | pág. 40, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen | pág. 66, precedente |
| 2 | Overige lasten uit hoofde van personeelsbeloningen | pág. 66, precedente |
| 3 | Horecakosten | pág. 40, precedente |
| 4 | Verkoopkosten | pág. 40, precedente |
| 5 | Huisvestingskosten | pág. 40, Jev 0.99 |
| 6 | Wedstrijd- en trainingskosten | pág. 40, Jev 0.98 |
| 7 | Algemene kosten | pág. 40, Jev 1 |
| 8 | Afschrijving op materiële vaste activa | pág. 40, Jev 1 |
| 9 | Afschrijving vergoedingssommen | pág. 40, Jev 1 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = consolidado. perimetro-senales.mjs: el ejercicio 2024-06-30 se publicó solo consolidado (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 6 ejercicio(s) con un solo perímetro (consolidado); 7 documento(s) mirados
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): fila = 206.622. resultado de participadas (nota 23), faltaba: con él cierra el 200.363 impreso (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eredivisie, verificado contra roster cacheado de "2023–24 Eredivisie" (tools/club-league-reference/nl.json), coincidencia exacta "Sparta Rotterdam".
```

## Fuentes

### spartarotterdam-nl-wf-2023-2024-7bc9c6f8

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
