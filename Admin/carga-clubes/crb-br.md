# crb-br — evidencia de carga

Lo que había como comentario en `data/br/crb-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/crb-br-data.js — Clube de Regatas Brasil (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/CRB/balanco-patrimonial-2020.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "crb-br" — slug de "CRB" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Clube de Regatas Brasil" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
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

_de data/clubs.js:_

```text
CRB: alta por tools/alta-club.mjs (2026-10-09) desde Clubes/Brasil/CRB/balanco-patrimonial-2020.pdf. brandColor:null a propósito (procedencia en Admin/sourcing/Brasil/CRB.md).
```

_de data/club-leagues/br.js:_

```text
CRB (alta-club.mjs, 2026-10-09): verificado contra roster cacheado de "2020 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "CRB".
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "Caixa e equivalentes de caixa" pág. 6
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 6
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 1
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 1
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 1
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-09, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 1
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Mário Marroquim (2021-04-01 a hoy): Aclamado el viernes 05/03/2021 (chapa única) con posse el 1 de abril de 2021 (Gazeta Web, buscador). Reelecto el 18/12/2024 para 2025-2028.
SIN CONFIRMAR, no cargada: Marcos Barbosa (2011-01-01 a 2021-04-01), https://www.tnh1.com.br/noticia/nid/sem-oposicao-marcos-barbosa-sera-aclamado-presidente-do-crb-pela-4a-vez/: TNH1 (2015-2016): comandaba el CRB desde 2011 y fue aclamado por cuarta vez (bienio 2017/2018). Desde 01/01/2011 por convención (solo año). Hasta = 01/04/2021, día de posse de Marroquim (la nota de Gazeta Web dice que la chapa 'Avante, Galo!' tomaría posse el 1 de abril); no se leyó una fuente que diga cuándo salió Barbosa. Confirmada false por esas dos razones.
Duda: Fecha de aclamación de Marroquim (viernes 5): el mes (marzo 2021) lo deduje por el día de la semana y la posse del 1 de abril; no leí la nota completa (Gazeta Web).
```

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Mário Marroquim (2021-04-01 a hoy): Aclamado el viernes 05/03/2021 (chapa única "Avante, Galo!"), posse el 1 de abril de 2021 (Gazeta Web, que dice que "toma posse el día 1 de abril"). Reelecto el 18/12/2024 para 2025-2028, posse 01/01/2025 (continúa).
SIN CONFIRMAR, no cargada: Marcos Barbosa (2011-01-01 a 2021-04-01), https://www.gazetaweb.com/noticias/esportes/alagoano/mario-marroquim-e-oficialmente-o-novo-presidente-do-crb: Gazeta Web / NE45: presidió desde 2011 hasta el inicio de 2021 ("después de una década"); aclamado por 4ª vez el 19/12/2016 para 2017/2018 (TNH1). Solo año de inicio (01/01/2011 por convención). Hasta = 01/04/2021, posse de Marroquim; ninguna fuente dice cuándo dejó Barbosa. confirmada=false.
Duda: Gazeta Web y Jornal de Alagoas discrepan sobre la duración del primer mandato de Marroquim (2022 vs 2024); no afecta quién conducía.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-1.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Mário Marroquim (2021-04-01 a hoy): Gazeta Web: aclamado chapa única el 05/03/2021, posse el 01/04/2021 (fecha de asunción confirmada). Firma el balanço 2020 y 2021 como Presidente (balanco-patrimonial-2020.md:69, balanco-patrimonial-2021.md:69). Ya figura en data/gestiones/br.js con la misma fecha; falta agregar a Barbosa.
SIN CONFIRMAR, no cargada: Marcos Barbosa (2011-01-01 a 2021-04-01), https://www.gazetaweb.com/blogs/arivaldo-maia/227348: Gazeta Web dice que presidió el CRB 'entre 2011 y este início de 2021' (solo años, sin día de salida); desde 2011-01-01 es solo año, y hasta 2021-04-01 es el día de la posse de su sucesor, no una salida confirmada. TNH1 (18/12/2018, tnh1.com.br/noticia/nid/barbosa-comenta-sobre-reforcos-negociacoes-marca-propria-e-sucessao-ouca/) lo muestra reconducido por dos años (2019-2020) tras el Conselho del 17/12/2018. Que siguiera al 31/12/2020 es inferencia: ninguna fuente lo dice. IMPORTANTE: el balanço 2020 (Clubes/Brasil/CRB/balanco-patrimonial-2020.md:69) lo firma Mário Marroquim como Presidente, es decir, el balance se aprobó/firmó ya bajo la nueva gestión; no contradice que al cierre 2020 condujera Barbosa.
Duda: No encontré fuente con fecha de salida de Marcos Barbosa ni de asunción original (2011). Su mandato bianual 2019-2020 terminaba presumiblemente el 31/12/2020, y la posse de Marroquim fue el 01/04/2021: no pude confirmar si hubo prórroga (pandemia) o interino entre ambas fechas. Por eso la gestión de Barbosa va confirmada:false y el cierre 2020-12-31 queda sin cobertura confirmada.
Duda: Qué fuente buscar: acta del Conselho Deliberativo del CRB o prensa alagoana (Tribuna Hoje, Gazeta de Alagoas) de dic-2020 a mar-2021 sobre el calendario electoral.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### crb-br-balanco-patrimonial-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### crb-br-balanco-patrimonial-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### crb-br-demonstracoes-contabeis-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### crb-br-demonstracoes-contabeis-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### crb-br-balanco-patrimonial-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### crb-br-balanco-patrimonial-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
