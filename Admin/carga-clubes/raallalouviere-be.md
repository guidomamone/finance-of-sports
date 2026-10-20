# raallalouviere-be — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/raallalouviere-be-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
RAAL La Louvière: alta por tools/alta-club.mjs (2026-10-18) desde Clubes/Bélgica/RAAL La Louvière/wf-2024-2025-2677fac4.pdf. brandColor #009150
(procedencia en Admin/sourcing/Bélgica/RAAL La Louvière.md; tools/cargar-lote.mjs).
```

```text
data/be/raallalouviere-be-data.js — RAAL La Louvière SC (Bélgica).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-18), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Bélgica/RAAL La Louvière/wf-2024-2025-2677fac4.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "raallalouviere-be" — slug de "RAAL La Louvière" + '-be' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "RAAL La Louvière SC" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): Dénomination RAAL LA LOUVIÈRE, Forme
  displayName        ok        "RAAL La Louvière" — nombre de la carpeta del club en Clubes/
  country            ok        "BE" — carpeta de país "Bélgica" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Bélgica
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (2 de 2 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (2 de 2 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "consolidado" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): 2024-25 trae el consolidado (RAAL SC + Services + Jeunes) con estado comple
  currency           ok        "EUR" — moneda de curso legal de Bélgica (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "raallalouviere-be-wf-2024-2025-2677fac4" — clubId + nombre del archivo en slug
  liga               pendiente null — sin caché de rosters para be (tools/club-league-reference/be.json)

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"raallalouviere-be-wf-2024-2025-2677fac4"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-18) desde Clubes/Bélgica/RAAL La Louvière/wf-2024-2025-2677fac4.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/RAAL La Louvière/wf-2024-2025-2677fac4.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Chiffre d'affaires | pág. 7, Jev 1 |
| 2 | Autres produits d'exploitation | pág. 7, Jev 1 |
| 3 | Produits d'exploitation non récurrents | pág. 7, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Achats | pág. 7, precedente |
| 2 | Stocks: réduction (augmentation) | pág. 7, Jev 1 |
| 3 | Services et biens divers | pág. 7, Jev 0.96 |
| 4 | Rémunérations, charges sociales et pensions | pág. 7, Jev 0.9 |
| 5 | Amortissements et réductions de valeur sur frais d'établissement, sur immobilisations incorporelles et corporelles | pág. 7, precedente |
| 6 | Réductions de valeur sur stocks, sur commandes en cours d'exécution et sur créances commerciales: dotations (reprises) | pág. 7, Jev 0.98 |
| 7 | Autres charges d'exploitation | pág. 7, Jev 0.93 |
| 8 | Charges d'exploitation non récurrentes | pág. 7, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-18): perimetro = consolidado. 2024-25 trae el consolidado (RAAL SC + Services + Jeunes) con estado completo y el individual solo con marge brute: se carga el consolidado (CONVENCIONES-DATOS, perímetro y dos documentos del mismo ejercicio) (subagente Sonnet, revisado por Claude 2026-10-18)
tools/cargar.mjs (2026-10-18). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-18): cash escalón 1 (compuerta: balance del documento (NBB)): código NBB 54/58 = 1630864 (L176); el balance cuadra: 20/58 = 10/49 = 26276967 (año sin vecino)
```

### Liga

```text
alta-club.mjs (2026-10-18): null, SIN VERIFICAR (sin caché de rosters para be (tools/club-league-reference/be.json)).
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Bélgica/RAAL La Louvière/jaarrekening-2018-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/RAAL La Louvière/jaarrekening-2018-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Marge brute d'exploitation | pág. 11, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rémunérations, charges sociales et pensions | pág. 11, precedente |
| 2 | Amortissements et réductions de valeur sur frais d'établissement, sur immobilisations incorporelles et corporelles | pág. 11, precedente |
| 3 | Autres charges d'exploitation | pág. 11, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): reportType = official_balance_sheet. Revisión del alta (Claude, 2026-10-09): comptes annuels del ejercicio 12-05-2017 a 30-06-2018; no es presupuesto
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## Fuentes

### raallalouviere-be-wf-2024-2025-2677fac4

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-18) desde la transcripción Clubes/Bélgica/RAAL La Louvière/wf-2024-2025-2677fac4.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### raallalouviere-be-jaarrekening-2018-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Bélgica/RAAL La Louvière/jaarrekening-2018-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
