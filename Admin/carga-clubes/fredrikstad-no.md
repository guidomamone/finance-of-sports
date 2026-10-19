# fredrikstad-no — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/fredrikstad-no-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Fredrikstad: alta por tools/alta-club.mjs (2026-10-19) desde Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.pdf. brandColor #DA2128
(procedencia en Admin/sourcing/Noruega/Fredrikstad.md; tools/cargar-lote.mjs).
```

```text
data/no/fredrikstad-no-data.js — Fredrikstad Fotballklubb (Noruega).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-19), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "fredrikstad-no" — slug de "Fredrikstad" + '-no' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Fredrikstad Fotballklubb" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): to-do 284: el club es el FLI (sueldos y operación); Fredrikstad Fotballinve
  displayName        ok        "Fredrikstad" — nombre de la carpeta del club en Clubes/
  country            ok        "NO" — carpeta de país "Noruega" (tabla PAISES)
  reportingCurrency  ok        "NOK" — moneda de curso legal de Noruega
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): Resultatregnskap 2024; patrimonio 'pr 31.12.24'
  sport              ok        "futbol" — el .md nombra el fútbol 108 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): Resultatregnskap 2024; patrimonio 'pr 31.12.24'
  cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): Resultatregnskap 2024; patrimonio 'pr 31
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro-senales.mjs: el ejercicio Clubes/Noruega/Fredrikstad/w
  currency           ok        "NOK" — moneda de curso legal de Noruega (tabla PAISES de alta-club.mjs)
  fxRef              ok        "NOK@2024-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 11.3534. --escribir agrega 'NOK@2024-12-31' a FX_CLOSE
  sourceId           ok        "fredrikstad-no-wf-src-ffk-arsmote-2025" — clubId + nombre del archivo en slug
  liga               ok        "no-eliteserien" — roster cacheado de "2024 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Fredrikstad"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"NOK","fxRef":"NOK@2024-12-31","sourceId":"fredrikstad-no-wf-src-ffk-arsmote-2025"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Annen driftsinntekt | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 26, Jev 0.99 |
| 2 | Lønnskostnad | pág. 26, precedente |
| 3 | Avskrivning | pág. 26, precedente |
| 4 | Annen driftskostnad | pág. 26, Claude 0.85 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): anio = 2024. acta de asamblea 2025 del FLI Fredrikstad Fotballklubb con el Regnskap 2024 (Sak 3); el nombre del archivo dice 2025
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): cierre = 2024-12-31. Resultatregnskap 2024; patrimonio 'pr 31.12.24'
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.md se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 15 ejercicio(s) con un solo perímetro (individual); 26 documento(s) mirados
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = 0. el total "Sum driftsinntekter" se sumaba además de su único renglón (ingresos 2 x 92.725.486) (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): fila = -310 627. costo financiero leído como ingreso: netto -87.325 y el resultado cierra en 2.766.504 (revisado por Claude contra el .md, 2026-10-18; ajuste a mano por decisión de Guido hasta la mejora del script (298 y))
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): categoria = lump_football_operations. es el único renglón de ingresos (92.725.486): todo el ingreso operativo sin desglose, como Salgsinntekter de Aalesund (Claude 2026-10-19)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): incluye = member_dues. el FLI tiene socios que pagan cuota (1.196) y el estado no la separa: queda dentro del único renglón de ingresos (Claude 2026-10-19)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): incluye = broadcasting. el estado trae un solo renglón de ingresos; la TV de la liga queda adentro (Claude 2026-10-19)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): incluye = matchday_competition. el estado trae un solo renglón de ingresos; las entradas quedan adentro (Claude 2026-10-19)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-19): no-eliteserien, verificado contra roster cacheado de "2024 Eliteserien" (tools/club-league-reference/no.json), coincidencia exacta "Fredrikstad".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Annen driftsinntekt | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 14, precedente |
| 2 | Lønninger | pág. 18, Jev 0.95 |
| 3 | Arbeidsgiveravgift | pág. 18, Jev 0.99 |
| 4 | Pensjonskostnader | pág. 18, Claude 0.85 |
| 5 | Andre ytelser | pág. 18, Jev 0.98 |
| 6 | Avskrivning | pág. 14, precedente |
| 7 | Annen driftskostnad | pág. 14, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio 2017-12-31 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 15 ejercicio(s) con un solo perímetro (individual); 26 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Annen driftsinntekt | pág. 13, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Varekostnad | pág. 13, precedente |
| 2 | Lønnskostnad | pág. 13, precedente |
| 3 | Avskrivning | pág. 13, precedente |
| 4 | Annen driftskostnad | pág. 13, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-18): perimetro = individual. perimetro-senales.mjs: el ejercicio 2016-12-31 se publicó solo individual (el club no tiene un perímetro único); 0 documento(s) con los dos estados votan —; 15 ejercicio(s) con un solo perímetro (individual); 26 documento(s) mirados
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## Fuentes

### fredrikstad-no-wf-src-ffk-arsmote-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Fredrikstad/wf-src-FFK_-_Årsmøte_2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fredrikstad-no-aarsregnskap-fotballklubb-fli-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### fredrikstad-no-aarsregnskap-fotballklubb-fli-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
