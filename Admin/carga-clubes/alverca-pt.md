# alverca-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/alverca-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Alverca: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Alverca/relatorio-contas-2021-22.pdf. brandColor #0000FF
(procedencia en Admin/sourcing/Portugal/Alverca.md; tools/cargar-lote.mjs).
```

```text
data/pt/alverca-pt-data.js — Futebol Clube de Alverca - Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Alverca/relatorio-contas-2021-22.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "alverca-pt" — slug de "Alverca" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Alverca - Futebol SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el alta toma el encabezado 'FC ALVER
  displayName        ok        "Alverca" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 4 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (contenido del .md (5 de 5 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "alverca-pt-relatorio-contas-2021-22" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2022 (pt-primeiraliga, pt-ligaportugal2): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"alverca-pt-relatorio-contas-2021-22"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Alverca/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Alverca/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 10, precedente |
| 2 | Subsídios à exploração | pág. 10, precedente |
| 3 | Rendimentos Suplementares | pág. 28, precedente |
| 4 | Descontos de pronto pagamento obtidos | pág. 28, precedente |
| 5 | Alienações diretas de inscrição desportiva | pág. 28, precedente |
| 6 | Correções relativas a períodos anteriores (rendimentos) | pág. 28, precedente |
| 7 | Outros rendimentos | pág. 28, precedente |
| 8 | Outros não especificados | pág. 28, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Serviços Especializados | pág. 24, Jev 0.97 |
| 2 | Materiais | pág. 24, Jev 0.93 |
| 3 | Energia e Fluidos | pág. 24, Jev 1 |
| 4 | Deslocações e Estadas | pág. 24, Jev 1 |
| 5 | Serviços Diversos | pág. 24, precedente |
| 6 | Gastos com o pessoal | pág. 10, precedente |
| 7 | Gastos/reversões de depreciação e de amortização | pág. 10, precedente |
| 8 | Outros gastos | pág. 10, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 0. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 347.028,99. Claude 2026-10-15 (lote 76, subagente Sonnet, revisado en la imagen): el OCR leyó 247.028,99; el PDF dice (347.028,99), igual al total de la nota 17.2.3 (L933) y a la columna 2024 del documento 2024-25
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 24.153,57. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 0,01. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 581.500,00. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 4.102,68. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 500,00. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 12.335,39. Claude 2026-10-15 (lote 76): 'Outros rendimentos' del estado (622.591,65 tras corregir el OCR de L281) se abre con las filas de la nota 17.2.3 (L935-L941, pág. 28 del visor), que suman exacto; la fila del estado con el OCR corregido no se abría sola y la venta de jugadores (581.500) quedaba en other_income
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = player_sales. Claude 2026-10-15 (lote 76): venta de derechos de inscripción de jugadores (nota 17.2.3, L937); en 2024-25 la misma fila ya va a player_sales
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2024 (pt-primeiraliga, pt-ligaportugal2): puede haber jugado otra división).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Alverca/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Alverca/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 2, Jev 0.91 |
| 2 | Subsídios a exploração | pág. 2, Jev 0.99 |
| 3 | Descontos de pronto pagamento obtidos | pág. 2, precedente |
| 4 | Alienações diretas de inscrição desportiva | pág. 2, precedente |
| 5 | Correções relativas a períodos anteriores (rendimentos) | pág. 2, precedente |
| 6 | Recuperação de encargos | pág. 2, precedente |
| 7 | Outros não especificados | pág. 2, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 2, Jev 0.92 |
| 2 | Gastos com o pessoal | pág. 2, precedente |
| 3 | Outros gastos | pág. 2, Jev 1 |
| 4 | Gastos/reversões de depreciação e de amortização | pág. 2, Claude 0.85 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2023-06-30. Claude 2026-10-15 (lote 76): el registro dedujo 2023-09-29, que es la fecha de firma ('Alverca, 29 de Setembro de 2023', L75 y L108); el documento dice 'Período findo em 30 de Junho de 2023' (L87)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 0. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 11,09. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 694.020,93. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 3.093,05. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 2.949,02. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 8.474,16. Guido 2026-10-15 (pedido) / Claude: el documento 2022-23 solo trae 'Outros rendimentos' 708.548,25 agregado (L98); la nota 17.2.3 del documento 2023-24 (L935-L941, columna 30/06/2023, pág. 28 del visor) lo abre en filas que suman exacto 708.548,25, con la venta de jugadores (694.020,93) que quedaba en other_income
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = player_sales. Claude 2026-10-15 (pedido de Guido): venta de derechos de inscripción de jugadores (nota 17.2.3 del 2023-24, L937, columna 2023)
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Alverca/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Alverca/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e serviços prestados | pág. 2, Jev 0.91 |
| 2 | Subsídios à exploração | pág. 2, Jev 0.99 |
| 3 | Outros rendimentos | pág. 2, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Fornecimentos e serviços externos | pág. 2, Jev 0.92 |
| 2 | Gastos com pessoal | pág. 2, Claude 0.8 |
| 3 | Provisões (aumentos/reduções) | pág. 2, Jev 0.91 |
| 4 | Outros gastos | pág. 2, Jev 1 |
| 5 | Gastos / reversões de depreciação e de amortização | pág. 2, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

### Liga

```text
alta-club.mjs (2026-10-15): null, SIN VERIFICAR (no aparece en los rosters cacheados de 2022 (pt-primeiraliga, pt-ligaportugal2): puede haber jugado otra división).
```

## Fuentes

### alverca-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Alverca/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alverca-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Alverca/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### alverca-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Alverca/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
