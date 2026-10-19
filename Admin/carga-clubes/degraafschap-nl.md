# degraafschap-nl — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/degraafschap-nl-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
De Graafschap: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Países Bajos/De Graafschap/wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022.pdf. brandColor #0055A4
(procedencia en Admin/sourcing/Países Bajos/De Graafschap.md; tools/cargar-lote.mjs).
```

```text
data/nl/degraafschap-nl-data.js — Betaald Voetbal De Graafschap B.V. (Países Bajos).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Países Bajos/De Graafschap/wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "degraafschap-nl" — slug de "De Graafschap" + '-nl' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Betaald Voetbal De Graafschap B.V." — respuesta de Guido en la cola (c0b3b4f)
  displayName        ok        "De Graafschap" — nombre de la carpeta del club en Clubes/
  country            ok        "NL" — carpeta de país "Países Bajos" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Países Bajos
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (23 de 25 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 17 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (contenido del .md (23 de 25 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Países Bajos (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022" — clubId + nombre del archivo en slug
  liga               ok        "nl-eerstedivisie" — roster cacheado de "2021–22 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "De Graafschap"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022"}
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Países Bajos/De Graafschap/wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Países Bajos/De Graafschap/wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Netto-omzet | pág. 6, Jev 1 |
| 2 | Resultaat vergoedingssommen | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Lonen en salarissen | pág. 6, Jev 1 |
| 2 | Sociale lasten | pág. 6, Jev 0.93 |
| 3 | Pensioenlasten | pág. 6, precedente |
| 4 | Afschrijvingen materiële vaste activa | pág. 6, Jev 1 |
| 5 | Overige bedrijfskosten | pág. 6, Claude 0.9 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = player_sales. resultado neto de traspasos impreso dentro de los costos como -51.460 (ganancia): se muda a ingreso por venta de jugadores sin cambiar el resultado; los costos sin él suman 8.772.605 (subagente Sonnet, revisado por Claude contra el .md, 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): nl-eerstedivisie, verificado contra roster cacheado de "2021–22 Eerste Divisie" (tools/club-league-reference/nl.json), coincidencia exacta "De Graafschap".
```

## Fuentes

### degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Países Bajos/De Graafschap/wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
