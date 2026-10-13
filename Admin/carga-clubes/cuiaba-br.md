# cuiaba-br — evidencia de carga

Lo que había como comentario en `data/br/cuiaba-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/cuiaba-br-data.js — Cuiabá Esporte Clube - Sociedade Anônima do Futebol (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Cuiaba/balanco-financeiro-2022.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "cuiaba-br" — slug de "Cuiaba" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Cuiabá Esporte Clube - Sociedade Anônima do Futebol" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Cuiaba" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 25 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2022-12-31 = 5.2177 (PTAX de cierre (venda) del Banco Central do Brasil, 30/12/2022 (últ
  sourceId           ok        "cuiaba-br-balanco-financeiro-2022" — clubId + nombre del archivo en slug
  liga               ok        "br-serieA" — roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.json), coincidencia exacta "Cuiabá"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2022-12-31","sourceId":"cuiaba-br-balanco-financeiro-2022"}
============================================================================
```

_de data/clubs.js:_

```text
Cuiaba: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2022.pdf. brandColor #006030
(procedencia en Admin/sourcing/Brasil/Cuiaba.md, club-or-year-onboarding/club-nuevo.md).
```

_de data/club-leagues/br.js:_

```text
Cuiaba (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.json), coincidencia exacta "Cuiabá".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Cuiaba/balanco-financeiro-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PATROCÍNIOS | pág. 7, Jev 1 |
| 2 | PLACAS DE PUBLICIDADE | pág. 7, Jev 1 |
| 3 | SÓCIO TORCEDOR | pág. 7, Claude 0.88 |
| 4 | COTAS/TV | pág. 7, Jev 1 |
| 5 | BILHETERIA/JOGOS | pág. 7, Jev 1 |
| 6 | OUTRAS RECEITAS C/ FUTEBOL | pág. 7, Jev 0.92 |
| 7 | LICENCIAMENTOS | pág. 7, Jev 1 |
| 8 | ESCOLINHA | pág. 7, Jev 1 |
| 9 | LOTERIAS | pág. 7, Jev 1 |
| 10 | OUTRAS RECEITAS | pág. 7, Jev 1 |
| 11 | VENDAS DE MERCADORIAS | pág. 7, Jev 1 |
| 12 | OUTRAS RECEITAS/(DESPESAS) | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | CUSTOS COM PESSOAL | pág. 7, Claude 0.8 |
| 2 | CUSTOS COM JOGOS | pág. 7, Jev 1 |
| 3 | CUSTOS COM AMORTIZAÇÃO DE CONTRATOS | pág. 7, Jev 0.95 |
| 4 | OUTROS CUSTOS COM FUTEBOL | pág. 7, precedente |
| 5 | DESPESAS COM PESSOAL | pág. 7, precedente |
| 6 | DESPESAS ADMINISTRATIVAS | pág. 7, Jev 1 |
| 7 | DESPESAS DEPRECIAÇÃO | pág. 7, Jev 1 |
| 8 | DESPESAS GERAIS CATEGORIA DE BASE | pág. 7, Jev 0.99 |
| 9 | DESPESAS GERAIS ESCOLINHA | pág. 7, Claude 0.85 |
| 10 | DESPESAS GERAIS FUTEBOL FEMININO | pág. 7, Jev 0.96 |
| 11 | DESPESAS COM VENDAS | pág. 7, Jev 1 |
| 12 | DESPESAS TRIBUTÁRIAS | pág. 7, Jev 1 |
| 13 | DESPESAS TRIBUTÁRIAS (deduções da receita) | pág. 7, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 2.144.216. Claude 2026-10-09: la extracción puso la deducción de la receita (L200-L201) del lado ingreso; el estado la resta de la receita bruta y en 2022 y 2024 se carga como gasto. Cuenta (L186-L226): ingresos 36.625.174 (suma de L188-L193 29.457.738 + L195-L199 7.167.435) + OUTRAS RECEITAS/(DESPESAS) 20.805.324 (L221) - custos 76.739.132 (L204) - despesas 18.678.825 (L209) - deduções 2.144.216 (L200) - financeiras 2.017.000 (L220) = -42.148.673 contra -42.148.674 impreso (L222, L226).
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 20.805.324. Claude 2026-10-09: renglón no operativo impreso en positivo que SUMA al resultado: (60.936.997) + 18.788.324 (L219 = (2.017.000) financeiras + 20.805.324 outras) = (42.148.673) y el resultado impreso es (42.148.674) (L222). La nota 15 (L1118-L1123) lo cuenta junto con la receita (total 2024 205.052.629 = receita líquida original). Misma cuenta que en el ajuste de DESPESAS TRIBUTÁRIAS (deduções).
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Cuiaba/balanco-financeiro-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PATROCÍNIOS | pág. 9, Jev 1 |
| 2 | PLACAS DE PUBLICIDADE | pág. 9, Jev 1 |
| 3 | DIREITOS ECONÔMICOS DE ATLETAS | pág. 9, Jev 0.9 |
| 4 | SÓCIO TORCEDOR | pág. 9, Claude 0.88 |
| 5 | COTAS/TV | pág. 9, Jev 1 |
| 6 | BILHETERIA/JOGOS | pág. 9, Jev 1 |
| 7 | OUTRAS RECEITAS C/ FUTEBOL | pág. 9, Jev 0.92 |
| 8 | LICENCIAMENTOS | pág. 9, Jev 1 |
| 9 | ESCOLINHA | pág. 9, Jev 1 |
| 10 | LOTERIAS | pág. 9, Jev 1 |
| 11 | OUTRAS RECEITAS | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) DIREITOS ECONÔMICOS/ CUSTO INTANGÍVEL | pág. 9, precedente |
| 2 | DESPESAS TRIBUTÁRIAS | pág. 9, Jev 1 |
| 3 | CUSTOS COM PESSOAL | pág. 9, Claude 0.8 |
| 4 | CUSTOS COM JOGOS | pág. 9, Jev 1 |
| 5 | CUSTOS COM AMORTIZAÇÃO DE CONTRATOS | pág. 9, Jev 0.95 |
| 6 | OUTROS CUSTOS COM FUTEBOL | pág. 9, precedente |
| 7 | DESPESAS COM PESSOAL | pág. 9, precedente |
| 8 | DESPESAS ADMINISTRATIVAS | pág. 9, Jev 1 |
| 9 | DESPESAS DEPRECIAÇÃO | pág. 9, Jev 1 |
| 10 | DESPESAS GERAIS CATEGORIA DE BASE | pág. 9, Jev 0.99 |
| 11 | DESPESAS GERAIS ESCOLINHA | pág. 9, Claude 0.85 |
| 12 | DESPESAS GERAIS FUTEBOL FEMININO | pág. 9, Jev 0.96 |
| 13 | DESPESAS COM VENDAS | pág. 9, Jev 1 |
| 14 | DESPESAS TRIBUTÁRIAS | pág. 9, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Outras Receitas | pág. 22, Jev 1 |
| 2 | Receita com Bilheteria | pág. 22, Jev 1 |
| 3 | Receita com Publicidade/Propaganda | pág. 22, Jev 1 |
| 4 | Receitas Cotas de TV | pág. 22, Jev 1 |
| 5 | Cessão de Direitos Liga Forte União do Futebol Brasileiro (LFF) – a) | pág. 22, Claude 0.8 |
| 6 | (-) Deduções Receitas – b) | pág. 22, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo com Futebol Profissional | pág. 8, Jev 1 |
| 2 | Vendas | pág. 8, precedente |
| 3 | Despesas Trabalhistas | pág. 23, precedente |
| 4 | Despesas Gerais | pág. 23, Jev 1 |
| 5 | Despesas Tributárias | pág. 8, Jev 1 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): resultado-final = 37.356.016. Claude 2026-10-09: el estado de resultados (L261-L275) termina en 'Lucro Líquido antes dos impostos' 37.356.016 y no imprime renglón de impuesto a la renta ni resultado neto aparte; el resultado del ejercicio es el mismo 37.356.016 en la DMPL (L302 'Lucro do Exercício') y en el flujo de caja (L321 'Resultado do Exercício'). Cuenta: 157.933.413 - 98.846.512 - 107.449 - 20.890.970 - 126.468 - 753.664 + 56.178 + 91.488 = 37.356.016; impuesto 0 (los tributos del SAF, TEF 5%, están en Despesas Tributárias, nota 30 b).
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Cuiaba/balanco-financeiro-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PATROCÍNIOS | pág. 2, Jev 1 |
| 2 | PLACAS DE PUBLICIDADE | pág. 2, Jev 1 |
| 3 | DIREITOS ECONÔMICOS DE ATLETAS | pág. 2, Jev 0.9 |
| 4 | SOCIO TORCEDOR | pág. 2, Claude 0.88 |
| 5 | COTAS/TV | pág. 2, Jev 1 |
| 6 | BILHETERIA | pág. 2, Jev 1 |
| 7 | OUTRAS RECEITAS C/ FUTEBOL | pág. 2, Jev 0.92 |
| 8 | LICENCIAMENTOS | pág. 2, Jev 1 |
| 9 | ESCOLINHA | pág. 2, Jev 1 |
| 10 | LOTERIAS | pág. 2, Jev 1 |
| 11 | OUTRAS RECEITAS | pág. 2, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | DESPESAS TRIBUTÁRIAS | pág. 2, Jev 1 |
| 2 | CUSTOS COM PESSOAL | pág. 2, Claude 0.8 |
| 3 | CUSTOS COM JOGOS | pág. 2, Jev 1 |
| 4 | OUTROS CUSTOS COM FUTEBOL | pág. 2, precedente |
| 5 | DESPESAS COM PESSOAL | pág. 2, precedente |
| 6 | DESPESAS ADMINISTRATIVAS | pág. 2, Jev 1 |
| 7 | DESPESAS COM VENDAS | pág. 2, Jev 1 |
| 8 | DESPESAS TRIBUTÁRIAS | pág. 2, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### cuiaba-br-balanco-financeiro-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cuiaba-br-balanco-financeiro-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cuiaba-br-balanco-financeiro-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### cuiaba-br-demonstracoes-financeiras-2023-auditadas

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
