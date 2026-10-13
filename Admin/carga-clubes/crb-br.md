# crb-br — evidencia de carga

Lo que había como comentario en `data/crb-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/crb-br-data.js — Clube de Regatas Brasil (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/CRB/balanco-patrimonial-2020.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "crb-br" — slug de "CRB" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Clube de Regatas Brasil" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "CRB" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2020 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2020-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2020-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2020-12-31 = 5.1967 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2020)
  sourceId           ok        "crb-br-balanco-patrimonial-2020" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2020 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "CRB"

FISCAL YEAR META PROPUESTO para 2020 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2020: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2020-12-31","sourceId":"crb-br-balanco-patrimonial-2020"}
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 7, precedente |
| 2 | Despesas com pessoal | pág. 7, precedente |
| 3 | Despesas gerais e administrativas | pág. 7, Jev 1 |
| 4 | Despesas tributárias | pág. 7, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 7, precedente |
| 2 | Despesas com pessoal | pág. 7, precedente |
| 3 | Despesas gerais e administrativas | pág. 7, Jev 1 |
| 4 | Despesas tributárias | pág. 7, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/CRB/balanco-patrimonial-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/balanco-patrimonial-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 1, precedente |
| 2 | Despesas com pessoal | pág. 1, precedente |
| 3 | Despesas gerais e administrativas | pág. 1, precedente |
| 4 | Despesas tributárias | pág. 1, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/CRB/balanco-patrimonial-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/balanco-patrimonial-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 1, precedente |
| 2 | Despesas com pessoal | pág. 1, precedente |
| 3 | Despesas gerais e administrativas | pág. 1, precedente |
| 4 | Despesas tributárias | pág. 1, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/balanco-patrimonial-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/balanco-patrimonial-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 1, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 1, precedente |
| 2 | Despesas com pessoal | pág. 1, precedente |
| 3 | Despesas gerais e administrativas | pág. 1, Jev 1 |
| 4 | Despesas tributárias | pág. 1, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/balanco-patrimonial-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/CRB/balanco-patrimonial-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita operacional líquida | pág. 1, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-09)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das atividades sociais e esportivas | pág. 1, precedente |
| 2 | Despesas com pessoal | pág. 1, precedente |
| 3 | Despesas gerais e administrativas | pág. 1, Jev 1 |
| 4 | Despesas tributárias | pág. 1, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```
