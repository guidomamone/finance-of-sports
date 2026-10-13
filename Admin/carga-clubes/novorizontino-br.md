# novorizontino-br — evidencia de carga

Lo que había como comentario en `data/br/novorizontino-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/novorizontino-br-data.js — Novorizontino (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "novorizontino-br" — slug de "Novorizontino" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Novorizontino" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Novorizontino" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2024-12-31 = 6.1923 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2024)
  sourceId           ok        "novorizontino-br-demonstracoes-financeiras-2024" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Novorizontino"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2024-12-31","sourceId":"novorizontino-br-demonstracoes-financeiras-2024"}
============================================================================
```

_de data/clubs.js:_

```text
Novorizontino: alta por tools/alta-club.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.pdf. brandColor AUSENTE a propósito
(nadie lo chequeó todavía: club-or-year-onboarding §3 1b, identidad primero).
```

_de data/clubs.js:_

```text
name: demonstracoes-financeiras-2023.md L70 (SAF desde 06/12/2023; antes associação 'Grêmio Novorizontino'). Color: aurinegro, amarillo primero (pt.wikipedia, himno 'Amarelo e negro'); hex como Amazonas,
```

_de data/club-leagues/br.js:_

```text
Novorizontino (alta-club.mjs, 2026-10-03): verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Novorizontino".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 7, precedente |
| 2 | Negociação de atletas | pág. 7, precedente |
| 3 | Publicidade | pág. 7, precedente |
| 4 | Patrocínio | pág. 7, precedente |
| 5 | Arrecadação de jogos | pág. 7, precedente |
| 6 | Fomento do futebol | pág. 7, precedente |
| 7 | Premiações | pág. 7, precedente |
| 8 | Timemania | pág. 7, Jev 1 |
| 9 | Mecanismo de solidariedade | pág. 7, ? 0.6 |
| 10 | Convênios | pág. 7, precedente |
| 11 | Outras receitas | pág. 7, precedente |
| 12 | Impostos incidentes sobre a receita | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 25, Jev 0.94 |
| 2 | Direito de imagem | pág. 25, Jev 0.98 |
| 3 | Gastos com negociação de atletas | pág. 25, precedente |
| 4 | Assessoria esportiva | pág. 25, precedente |
| 5 | Premiações | pág. 25, precedente |
| 6 | Com jogos | pág. 25, Jev 1 |
| 7 | Aluguel de imóveis | pág. 25, Jev 0.9 |
| 8 | Manutenção e conservação | pág. 25, precedente |
| 9 | Lanches e refeições | pág. 25, precedente |
| 10 | Energia elétrica | pág. 25, precedente |
| 11 | Taxa da FPF e CBF | pág. 25, ? 0.6 |
| 12 | Lavanderia | pág. 25, precedente |
| 13 | Amortização dos atletas formados | pág. 25, Jev 0.99 |
| 14 | Serviços e exames médicos | pág. 25, Claude 0.85 |
| 15 | Material esportivo | pág. 25, precedente |
| 16 | Segurança patrimonial | pág. 25, precedente |
| 17 | Água e esgoto | pág. 25, precedente |
| 18 | Acordos trabalhistas e cíveis | pág. 25, precedente |
| 19 | Medicamentos | pág. 25, precedente |
| 20 | Materiais de escritório e de limpeza | pág. 25, precedente |
| 21 | Telefone e internet | pág. 25, precedente |
| 22 | Gás | pág. 25, Jev 0.98 |
| 23 | Outras despesas | pág. 25, Jev 0.95 |
| 24 | Com pessoal | pág. 8, Jev 0.94 |
| 25 | Com jogos | pág. 8, Jev 1 |
| 26 | Administrativas e gerais | pág. 8, precedente |
| 27 | Serviços de terceiros | pág. 8, precedente |
| 28 | Gastos com atletas não profissionais | pág. 8, precedente |
| 29 | Tributária | pág. 8, precedente |
| 30 | Outras despesas | pág. 8, Jev 0.95 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 6
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Partes relacionadas" pág. 6
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 7, Jev 1 |
| 2 | Negociação de atletas | pág. 7, Jev 1 |
| 3 | Publicidade | pág. 7, Jev 1 |
| 4 | Patrocínio | pág. 7, Jev 1 |
| 5 | Arrecadação de jogos | pág. 7, Jev 1 |
| 6 | Fomento do futebol | pág. 7, precedente |
| 7 | Premiações | pág. 7, Claude 0.85 |
| 8 | Convênios | pág. 7, precedente |
| 9 | Outras receitas | pág. 7, Jev 0.99 |
| 10 | Impostos incidentes sobre a receita | pág. 7, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 25, precedente |
| 2 | Gastos com atletas e comissão técnica | pág. 25, precedente |
| 3 | Serviços de terceiros | pág. 25, Jev 0.95 |
| 4 | Com jogos | pág. 25, Jev 0.99 |
| 5 | Manutenção e conservação | pág. 25, Jev 0.97 |
| 6 | Aluguéis | pág. 25, Jev 1 |
| 7 | Material esportivo | pág. 25, precedente |
| 8 | Premiações | pág. 25, precedente |
| 9 | Acordos trabalhistas e cíveis | pág. 25, precedente |
| 10 | Outras | pág. 25, Jev 0.95 |
| 11 | Com pessoal | pág. 8, precedente |
| 12 | Com jogos | pág. 8, Jev 0.99 |
| 13 | Administrativas e gerais | pág. 8, Jev 1 |
| 14 | Serviços de terceiros | pág. 8, Jev 0.95 |
| 15 | Gastos com atletas não profissionais | pág. 8, Claude 0.85 |
| 16 | Tributária | pág. 8, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 6
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Partes relacionadas" pág. 6
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 7, precedente |
| 2 | Negociação de atletas | pág. 7, precedente |
| 3 | Publicidade | pág. 7, precedente |
| 4 | Patrocínio | pág. 7, precedente |
| 5 | Arrecadação de jogos | pág. 7, precedente |
| 6 | Premiações | pág. 7, precedente |
| 7 | Convênios | pág. 7, precedente |
| 8 | Outras receitas | pág. 7, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 7, precedente |
| 2 | Gastos com atletas e comissão técnica | pág. 7, Jev 1 |
| 3 | Lanches e refeições | pág. 26, precedente |
| 4 | Assessoria esportiva | pág. 26, precedente |
| 5 | Assessoria de imprensa | pág. 26, Jev 1 |
| 6 | Lavanderia | pág. 26, precedente |
| 7 | Energia elétrica | pág. 26, Jev 0.98 |
| 8 | Água e esgoto | pág. 26, Jev 1 |
| 9 | Assessoria jurídica | pág. 26, Jev 1 |
| 10 | Depreciação | pág. 26, precedente |
| 11 | Assessoria administrativa | pág. 26, Jev 1 |
| 12 | Serviços médicos | pág. 26, precedente |
| 13 | Medicamentos | pág. 26, precedente |
| 14 | Materiais de escritório e de limpeza | pág. 26, Jev 1 |
| 15 | Software | pág. 26, precedente |
| 16 | Serviços contábeis e auditoria | pág. 26, Jev 0.99 |
| 17 | Segurança patrimonial | pág. 26, precedente |
| 18 | Telefone e internet | pág. 26, Jev 1 |
| 19 | Despesas diversas | pág. 26, Jev 0.9 |
| 20 | Acordos trabalhistas | pág. 26, Jev 0.95 |
| 21 | Acordos cíveis | pág. 26, Claude 0.8 |
| 22 | Outras | pág. 26, precedente |
| 23 | Com jogos | pág. 7, precedente |
| 24 | Manutenção | pág. 7, Jev 0.95 |
| 25 | Atletas não profissionais | pág. 7, Jev 0.93 |
| 26 | Aluguéis | pág. 7, precedente |
| 27 | Material esportivo | pág. 7, Jev 0.95 |
| 28 | Tributária | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: documento siguiente): "Caixa e equivalentes de caixa (nota 6)" pág. 6
tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 1 (compuerta: documento siguiente): "Empréstimos bancários" pág. 6 + "Partes relacionadas" pág. 6
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 10, precedente |
| 2 | Negociação de atletas | pág. 10, precedente |
| 3 | Publicidade | pág. 10, precedente |
| 4 | Patrocínio | pág. 10, precedente |
| 5 | Arrecadação de jogos | pág. 10, precedente |
| 6 | Premiações | pág. 10, precedente |
| 7 | Convênios | pág. 10, precedente |
| 8 | Outras receitas | pág. 10, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 10, precedente |
| 2 | Aluguel de imóveis | pág. 29, precedente |
| 3 | Serviços e exames médicos | pág. 29, precedente |
| 4 | Taxa da FPF e CBF | pág. 29, precedente |
| 5 | Gastos com negociação de atletas | pág. 29, precedente |
| 6 | Multa indenizatória | pág. 29, Jev 0.9 |
| 7 | Outros | pág. 29, precedente |
| 8 | Lanches e refeições | pág. 30, precedente |
| 9 | Assessoria esportiva | pág. 30, precedente |
| 10 | Assessoria de imprensa | pág. 30, precedente |
| 11 | Lavanderia | pág. 30, precedente |
| 12 | Estadias | pág. 30, ? 0.6 |
| 13 | Combustíveis e lubrificantes | pág. 30, precedente |
| 14 | Energia elétrica | pág. 30, precedente |
| 15 | Água e esgoto | pág. 30, precedente |
| 16 | Assessoria jurídica | pág. 30, precedente |
| 17 | Depreciação | pág. 30, precedente |
| 18 | Assessoria administrativa | pág. 30, precedente |
| 19 | Serviços médicos | pág. 30, precedente |
| 20 | Medicamentos | pág. 30, precedente |
| 21 | Matriais de escritório e de limpeza | pág. 30, precedente |
| 22 | Software | pág. 30, precedente |
| 23 | Serviços contábeis e auditoria | pág. 30, precedente |
| 24 | Segurança patrimonial | pág. 30, precedente |
| 25 | Telefone e internet | pág. 30, precedente |
| 26 | Outras | pág. 30, precedente |
| 27 | Com jogos | pág. 10, precedente |
| 28 | Manutenção | pág. 10, precedente |
| 29 | Atletas não profissionais | pág. 10, precedente |
| 30 | Aluguéis | pág. 10, precedente |
| 31 | Material esportivo | pág. 10, precedente |
| 32 | Tributária | pág. 10, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): cierre = 2022-12-31. Guido 2026-10-02: el detector de período tomó la fecha de la firma (28/04/2023, L17); el ejercicio cierra el 31/12/2022 (29 menciones)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-02: la caja de 2022 como la reclasificó el documento 2023 (sin las aplicaciones financieras de proyectos incentivados, 574.806), coherente con 2023-2025; el 2022 imprimía 721.730
ajuste manual `deuda` (Admin/registros/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos bancários 28.250 + Partes relacionadas 70.283.684, .md L250/L258
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Repasse da federação | pág. 28, precedente |
| 2 | Negociação e empréstimo de atletas (nota nº6) | pág. 28, Jev 1 |
| 3 | Receita com patrocínios | pág. 28, Jev 1 |
| 4 | Vendas de ingressos e bar | pág. 28, Claude 0.8 |
| 5 | Subvenções | pág. 28, Jev 0.92 |
| 6 | Receita do bar | pág. 28, precedente |
| 7 | Outras receitas operacionais | pág. 8, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários, ordenados e outros custos com pessoal | pág. 28, Claude 0.8 |
| 2 | Gastos com jogos | pág. 28, Jev 1 |
| 3 | Aluguéis | pág. 28, Jev 1 |
| 4 | Outros | pág. 28, Jev 0.98 |
| 5 | Serviços prestados (i) | pág. 29, Jev 0.98 |
| 6 | Despesas administrativas (ii) | pág. 29, Jev 0.99 |
| 7 | Manutenções (ii) | pág. 29, Claude 0.8 |
| 8 | Gastos com negociação de atletas | pág. 29, Jev 0.98 |
| 9 | Salários, ordenados e outros custos - Projeto Sub 15 e 17 | pág. 29, Claude 0.85 |
| 10 | Ganhos/perdas com atletas | pág. 29, precedente |
| 11 | Combustível e lubrificantes | pág. 29, Jev 0.94 |
| 12 | Depreciação / Amortização | pág. 29, Jev 0.98 |
| 13 | Outros | pág. 29, Jev 0.98 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = matchday_competition. Guido 2026-10-02: como 'Vendas de ingressos e bar' (matchday_competition); R$ 6 mil, inmaterial
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = player_impairment. Guido 2026-10-02: pérdida con atletas dentro de despesas gerais = baja de pases, no amortización del año
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 7
ajuste manual `deuda` (Admin/registros/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos e financiamentos 87 + 12 + partes relacionadas 51.785 (miles), .md L174/L187/L189
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2021: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Repasse da federação | pág. 25, precedente |
| 2 | Negociação e empréstimo de atletas (nota nº6) | pág. 25, Jev 1 |
| 3 | Receita com patrocínios | pág. 25, Jev 1 |
| 4 | Vendas de ingressos e bar | pág. 25, Claude 0.8 |
| 5 | Subvenções | pág. 25, Jev 0.92 |
| 6 | Outras receitas operacionais | pág. 9, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários, ordenados e outros custos com pessoal | pág. 26, Claude 0.8 |
| 2 | Gastos com jogos | pág. 26, Jev 1 |
| 3 | Aluguéis | pág. 26, Jev 1 |
| 4 | Outros | pág. 26, Jev 0.98 |
| 5 | Serviços prestados | pág. 26, Jev 0.99 |
| 6 | Provisão para Perdas (nota nº5) | pág. 26, precedente |
| 7 | Despesas administrativas | pág. 26, Jev 1 |
| 8 | Manutenções | pág. 26, Jev 0.95 |
| 9 | Gastos com negociação de atletas | pág. 26, Jev 0.98 |
| 10 | Combustível e lubrificantes | pág. 26, Jev 0.94 |
| 11 | Depreciação / Amortização | pág. 26, Jev 0.98 |
| 12 | Outros | pág. 26, Jev 0.98 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = exceptional_items. Guido 2026-10-02: provisión única por una cobranza a Corinthians por venta de un atleta, en discusión judicial; no recurrente
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 8
ajuste manual `deuda` (Admin/registros/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos 79 + partes relacionadas 39.971 + 9 (miles), .md L198/L204/L211
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2020: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2020 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Repasse da federação | pág. 27, precedente |
| 2 | Negociação e empréstimo de atletas | pág. 27, Jev 1 |
| 3 | Receita com patrocínios | pág. 27, Jev 1 |
| 4 | Vendas de ingressos e bar | pág. 27, Claude 0.8 |
| 5 | Subvenções | pág. 27, Jev 0.92 |
| 6 | Recuperação de despesas | pág. 29, Jev 1 |
| 7 | Reversão de provisão de contingências | pág. 29, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários, ordenados e outros custos com pessoal | pág. 28, Claude 0.8 |
| 2 | Gastos com jogos | pág. 28, Jev 1 |
| 3 | Aluguéis | pág. 28, Jev 1 |
| 4 | Outros | pág. 28, Jev 0.98 |
| 5 | Serviços prestados | pág. 29, Jev 0.99 |
| 6 | Provisão para contingências | pág. 29, ? 0.6 |
| 7 | Despesas administrativas | pág. 29, Jev 1 |
| 8 | Manutenções | pág. 29, Jev 0.95 |
| 9 | Salários, ordenados e outras despesas com pessoal | pág. 29, Claude 0.85 |
| 10 | Gastos com negociação de atletas | pág. 29, Jev 0.98 |
| 11 | Combustível e lubrificantes | pág. 29, Jev 0.94 |
| 12 | Depreciação | pág. 29, Jev 1 |
| 13 | Outros | pág. 29, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 8
ajuste manual `deuda` (Admin/registros/ajustes-manuales.jsonl, 2026-10-05, to-do 143): préstamos + partes relacionadas, criterio del club; Empréstimos 27 + Débitos com partes relacionadas 32.296 (miles), .md L193/L204. caja-deuda.mjs (2026-10-03) había leído el 24 de 2018 (32,32)
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2019: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2019 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/demonstracoes-financeiras-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Repasse da federação | pág. 24, precedente |
| 2 | Negociação e empréstimo de atletas | pág. 24, Jev 1 |
| 3 | Receita com patrocínios | pág. 24, Jev 1 |
| 4 | Vendas de ingressos e bar | pág. 24, Claude 0.8 |
| 5 | Subvenções | pág. 24, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Salários, ordenados e outros custos com pessoal | pág. 24, Claude 0.8 |
| 2 | Gastos com jogos | pág. 24, Jev 1 |
| 3 | Aluguéis | pág. 24, Jev 1 |
| 4 | Outros | pág. 24, Jev 0.98 |
| 5 | Serviços prestados | pág. 25, Jev 0.99 |
| 6 | Provisão para contingências | pág. 25, precedente |
| 7 | Despesas administrativas | pág. 25, Jev 1 |
| 8 | Manutenções | pág. 25, Jev 0.95 |
| 9 | Salários, ordenados e outras despesas com pessoal | pág. 25, Claude 0.85 |
| 10 | Gastos com negociação de atletas | pág. 25, Jev 0.98 |
| 11 | Combustível e lubrificantes | pág. 25, Jev 0.94 |
| 12 | Depreciação | pág. 25, Jev 1 |
| 13 | Outros | pág. 25, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/caja-deuda.mjs (2026-10-03): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 8
ajuste manual `deuda` (Admin/registros/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos 24 + Débitos com partes relacionadas 27.467 (miles), .md L181/L191
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2018 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RENDAS DE JOGOS, PATROCÍNIOS, LOCAÇÕES E OUTRAS RECEITAS OPERACIONAIS | pág. 5, precedente |
| 2 | Recuperação de Despesas | pág. 5, Jev 1 |
| 3 | RECURSOS PUBLICOS | pág. 5, Jev 0.9 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Ordenados, Salários, Encargos Sociais e Trabalhistas e Outros | pág. 5, precedente |
| 2 | Despesas Administrativas | pág. 5, Jev 1 |
| 3 | Despesas Gerais e de Manutenção | pág. 5, Jev 1 |
| 4 | Provisões no Exercício | pág. 5, precedente |
| 5 | (-) DESPESAS OPERACIONAIS PAGAS COM RECURSOS PÚBLICOS | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2017: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2017 Campeonato Paulista" (tools/club-league-reference/br.json), coinc
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/balanco-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | PATROCINIO NO UNIFORME | pág. 1, Jev 1 |
| 2 | PATROCÍNIO NO ESTÁDIO | pág. 1, Jev 0.95 |
| 3 | LOCAÇÃO DE CADEIRA S/ASSENTOS | pág. 1, precedente |
| 4 | VENDAS DE INGRESSOS | pág. 1, Jev 1 |
| 5 | RECEITAS DO BAR | pág. 1, precedente |
| 6 | RECEITA C/ NEGOCIAÇÃO DE ATLETA | pág. 1, Jev 1 |
| 7 | REPASSE DA FEDERAÇÃO | pág. 1, precedente |
| 8 | Recuperação de Despesas | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Ordenados, Salários, Encargos Sociais e Trabalhistas | pág. 1, Jev 0.94 |
| 2 | Despesas Administrativas | pág. 1, Jev 1 |
| 3 | Despesas e Manutenção | pág. 1, Jev 0.99 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 2.204. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.794. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.945. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.422. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2016: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2016 Campeonato Paulista" (tools/club-league-reference/br.json), coinc
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/balanco-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 117 3.1.01.01.0009 - DOAÇOES RECEBIDAS | pág. 1, Jev 1 |
| 2 | 35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS | pág. 1, precedente |
| 3 | 33 3.1.01.01.0002 - PATROCINIO EM PLACAS | pág. 1, Jev 1 |
| 4 | 34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO | pág. 1, Jev 0.98 |
| 5 | 32 3.1.01.01.0001 - PATROCINIO NO UNIFORME | pág. 1, Jev 1 |
| 6 | 37 3.1.01.01.0006 - RECEITAS DO BAR | pág. 1, Claude 0.9 |
| 7 | 39 3.1.01.01.0008 - REPASSE DA FEDERAÇÃO | pág. 1, Claude 0.9 |
| 8 | 36 3.1.01.01.0005 - VENDAS DE INGRESSOS | pág. 1, Jev 1 |
| 9 | 225 3.1.04.01.0001 - RECUPERACAO DE DESPESA | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 41 4.1.01.01.0002 - AJUDA DE CUSTO | pág. 1, precedente |
| 2 | 55 4.1.01.01.0016 - ALUGUEL MORADIA COM TECNICA | pág. 1, precedente |
| 3 | 184 4.1.01.01.0031 - ANUIDADE CBF E FEDER.PAULISTA | pág. 1, Jev 0.95 |
| 4 | 207 4.1.01.01.0038 - AUXILIO EDUCACIONAL | pág. 1, Jev 0.92 |
| 5 | 205 4.1.01.01.0036 - BONIFICACAO/GRATIFICACAO | pág. 1, Claude 0.8 |
| 6 | 58 4.1.01.01.0019 - CAFE DA MANHA | pág. 1, Claude 0.8 |
| 7 | 214 4.1.01.01.0039 - CONTRIBUICAO CONFEDERATIVA | pág. 1, precedente |
| 8 | 51 4.1.01.01.0012 - CURSOS E TREINAMENTOS | pág. 1, precedente |
| 9 | 44 4.1.01.01.0005 - DIREITOS DE IMAGEM | pág. 1, Jev 0.9 |
| 10 | 206 4.1.01.01.0037 - DSR VARIAVEL | pág. 1, Claude 0.8 |
| 11 | 47 4.1.01.01.0008 - FERIAS E 13° SALARIO | pág. 1, Jev 0.99 |
| 12 | 46 4.1.01.01.0007 - FGTS | pág. 1, Jev 0.92 |
| 13 | 204 4.1.01.01.0035 - HORAS EXTRAS | pág. 1, precedente |
| 14 | 87 4.1.01.01.0030 - I.R.R.FONTE S/ FOLHA | pág. 1, precedente |
| 15 | 45 4.1.01.01.0006 - INSS | pág. 1, Jev 0.92 |
| 16 | 57 4.1.01.01.0018 - LANCHES | pág. 1, precedente |
| 17 | 62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS | pág. 1, Claude 0.85 |
| 18 | 60 4.1.01.01.0021 - MEDICAMENTOS | pág. 1, Jev 0.9 |
| 19 | 195 4.1.01.01.0034 - PENSAO ALIMENTICIA | pág. 1, precedente |
| 20 | 186 4.1.01.01.0032 - PIS FOLHA PAGAMENTO | pág. 1, Jev 0.94 |
| 21 | 42 4.1.01.01.0003 - PREMIAÇOES | pág. 1, precedente |
| 22 | 56 4.1.01.01.0017 - REFEIÇÕES | pág. 1, precedente |
| 23 | 48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES | pág. 1, precedente |
| 24 | 40 4.1.01.01.0001 - SALARIOS | pág. 1, Jev 0.91 |
| 25 | 52 4.1.01.01.0013 - SEGURO PESSOAL | pág. 2, precedente |
| 26 | 71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA | pág. 2, precedente |
| 27 | 70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS | pág. 2, Jev 0.97 |
| 28 | 61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES | pág. 2, precedente |
| 29 | 89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS | pág. 2, precedente |
| 30 | 88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS | pág. 2, Claude 0.85 |
| 31 | 73 5.1.01.01.0008 - ASSESSORIA DE MARKETING | pág. 2, Jev 0.99 |
| 32 | 76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA | pág. 2, Jev 0.98 |
| 33 | 75 5.1.01.01.0010 - ASSESSORIA JURÍDICA | pág. 2, Jev 1 |
| 34 | 97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES | pág. 2, Jev 0.97 |
| 35 | 123 5.1.01.01.0026 - COMBUSTIVEIS E LUBRIFICANTES | pág. 2, Jev 1 |
| 36 | 95 5.1.01.01.0018 - CORREIOS | pág. 2, Jev 0.98 |
| 37 | 93 5.1.01.01.0017 - DESPESAS CARTORARIAS | pág. 2, Jev 1 |
| 38 | 181 5.1.01.01.0027 - ESTADIAS | pág. 2, Jev 0.96 |
| 39 | 109 5.1.01.01.0025 - FRETES, CARRETOS E TRANSPORTES | pág. 2, Jev 0.94 |
| 40 | 72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE | pág. 2, Jev 1 |
| 41 | 192 5.1.01.01.0029 - IMPOSTOS E TAXAS | pág. 2, Jev 1 |
| 42 | 198 5.1.01.01.0032 - IR RETIDO NA FONTE | pág. 2, Jev 0.93 |
| 43 | 77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE | pág. 2, Claude 0.8 |
| 44 | 65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO | pág. 2, Jev 1 |
| 45 | 64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA | pág. 2, Jev 1 |
| 46 | 68 5.1.01.01.0004 - MATERIAIS DIVERSOS | pág. 2, precedente |
| 47 | 63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL | pág. 2, Jev 0.98 |
| 48 | 69 5.1.01.01.0006 - MOVEIS E UTENS. PEQ VALOR | pág. 2, Jev 0.96 |
| 49 | 94 5.1.01.01.0016 - MULTAS | pág. 2, Jev 1 |
| 50 | 194 5.1.01.01.0030 - PIS/COFINS/CSLL RETIDO | pág. 2, Jev 0.96 |
| 51 | 191 5.1.01.01.0028 - PRODUTOS FARMACEUTICOS | pág. 2, Claude 0.8 |
| 52 | 80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL | pág. 2, Jev 0.97 |
| 53 | 96 5.1.01.01.0019 - TELEFONE | pág. 2, Jev 1 |
| 54 | 196 5.1.01.01.0031 - VIDEO OBSERVER | pág. 2, precedente |
| 55 | 101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA | pág. 2, precedente |
| 56 | 102 5.1.02.02.0014 - DESPESAS COM JOGOS | pág. 2, Jev 1 |
| 57 | 103 5.1.02.02.0015 - DESPESAS DIVERSAS | pág. 2, Jev 1 |
| 58 | 98 5.1.02.02.0010 - ENERGIA ELETRICA | pág. 2, Jev 0.94 |
| 59 | 190 5.1.02.02.0021 - INTERNET / TV A CABO | pág. 2, Jev 1 |
| 60 | 83 5.1.02.02.0004 - LAVANDERIA | pág. 2, Jev 0.96 |
| 61 | 187 5.1.02.02.0018 - MANUTENCAO DE VEICULOS | pág. 2, Jev 0.98 |
| 62 | 188 5.1.02.02.0019 - MANUTENCAO DO GRAMADO | pág. 2, Claude 0.8 |
| 63 | 78 5.1.02.02.0002 - MANUTENÇAO GERAL | pág. 2, Jev 0.99 |
| 64 | 84 5.1.02.02.0005 - PINTURA DE PLACAS | pág. 2, precedente |
| 65 | 79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS | pág. 2, Jev 1 |
| 66 | 197 5.1.02.02.0022 - SERV.ALMOXARIFADO E ROUPARIA | pág. 3, Jev 0.94 |
| 67 | 189 5.1.02.02.0020 - SERVICO DE DEDETIZACAO | pág. 3, Claude 0.8 |
| 68 | 90 5.1.02.02.0007 - TAXA DE ARBITRAGEM | pág. 3, Jev 1 |
| 69 | 91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO | pág. 3, precedente |
| 70 | 85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES | pág. 3, Jev 0.97 |
| 71 | 92 5.1.02.02.0009 - VIAGENS E ESTADIAS | pág. 3, precedente |
| 72 | 99 5.1.02.02.0011 - ÁGUA E ESGOTO | pág. 3, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2015: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "Campeonato Paulista de Futebol de 2015 - Série A2" (tools/club-league-
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2014-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/balanco-2014-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 144 3.1.01.01.0011 - CESSÃO DIREITO EXPLOR.EVENTOS | pág. 1, precedente |
| 2 | 180 3.1.01.01.0013 - CESSÃO ECONOMICO DO JOGADOR | pág. 1, Jev 1 |
| 3 | 159 3.1.01.01.0012 - CESSÃO EXPLORAÇÃO PUBLICIDADE | pág. 1, precedente |
| 4 | 117 3.1.01.01.0009 - DOAÇÕES RECEBIDAS | pág. 1, Jev 1 |
| 5 | 35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS | pág. 1, precedente |
| 6 | 33 3.1.01.01.0002 - PATROCINIO EM PLACAS | pág. 1, Jev 1 |
| 7 | 34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO | pág. 1, Jev 0.98 |
| 8 | 32 3.1.01.01.0001 - PATROCINIO NO UNIFORME | pág. 1, Jev 1 |
| 9 | 37 3.1.01.01.0006 - RECEITAS DO BAR | pág. 1, Claude 0.9 |
| 10 | 36 3.1.01.01.0005 - VENDAS DE INGRESSOS | pág. 1, Jev 1 |
| 11 | 179 3.1.01.02.0003 - DEV. DE CONVÊNIO NÃO UTILIZAD | pág. 1, Jev 0.97 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 49 4.1.01.01.0010 - ACORDOS TRABALHISTAS | pág. 1, Jev 0.92 |
| 2 | 41 4.1.01.01.0002 - AJUDA DE CUSTO | pág. 1, precedente |
| 3 | 55 4.1.01.01.0016 - ALUGUEL MORADIA COM TECNICA | pág. 1, precedente |
| 4 | 184 4.1.01.01.0031 - ANUIDADE CBF E FEDER.PAULISTA | pág. 1, Jev 0.95 |
| 5 | 50 4.1.01.01.0011 - ASSISTENCIA MÉDICA E SOCIAL | pág. 1, precedente |
| 6 | 58 4.1.01.01.0019 - CAFE DA MANHA | pág. 1, Claude 0.8 |
| 7 | 51 4.1.01.01.0012 - CURSOS E TREINAMENTOS | pág. 1, precedente |
| 8 | 44 4.1.01.01.0005 - DIREITOS DE IMAGEM | pág. 1, Jev 0.9 |
| 9 | 47 4.1.01.01.0008 - FERIAS E 13º SALARIO | pág. 1, Jev 0.99 |
| 10 | 46 4.1.01.01.0007 - FGTS | pág. 1, Jev 0.92 |
| 11 | 87 4.1.01.01.0030 - I.R.R.FONTE | pág. 1, precedente |
| 12 | 45 4.1.01.01.0006 - INSS | pág. 1, Jev 0.92 |
| 13 | 57 4.1.01.01.0018 - LANCHES | pág. 1, precedente |
| 14 | 62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS | pág. 1, Claude 0.85 |
| 15 | 60 4.1.01.01.0021 - MEDICAMENTOS | pág. 1, Jev 0.9 |
| 16 | 54 4.1.01.01.0015 - OUTROS BENEFICIOS | pág. 1, precedente |
| 17 | 186 4.1.01.01.0032 - PIS FOLHA PAGAMENTO | pág. 1, Jev 0.94 |
| 18 | 56 4.1.01.01.0017 - REFEIÇÕES | pág. 1, precedente |
| 19 | 48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES | pág. 1, precedente |
| 20 | 40 4.1.01.01.0001 - SALARIOS | pág. 1, Jev 0.91 |
| 21 | 52 4.1.01.01.0013 - SEGURO PESSOAL | pág. 1, precedente |
| 22 | 71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA | pág. 2, precedente |
| 23 | 70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS | pág. 2, Jev 0.97 |
| 24 | 61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES | pág. 2, precedente |
| 25 | 89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS | pág. 2, precedente |
| 26 | 88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS | pág. 2, Claude 0.85 |
| 27 | 59 4.1.01.01.0020 - UNIFORME | pág. 2, precedente |
| 28 | 74 5.1.01.01.0009 - ASSESSORIA ADMINISTRATIVA | pág. 2, Jev 1 |
| 29 | 73 5.1.01.01.0008 - ASSESSORIA DE MARKETING | pág. 2, Jev 0.99 |
| 30 | 76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA | pág. 2, Jev 0.98 |
| 31 | 75 5.1.01.01.0010 - ASSESSORIA JURÍDICA | pág. 2, Jev 1 |
| 32 | 97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES | pág. 2, Jev 0.97 |
| 33 | 123 5.1.01.01.0026 - COMBUSTIVEIS E LUBRIFICANTES | pág. 2, Jev 1 |
| 34 | 95 5.1.01.01.0018 - CORREIOS | pág. 2, Jev 0.98 |
| 35 | 93 5.1.01.01.0017 - DESPESAS CARTORARIAS | pág. 2, Jev 1 |
| 36 | 181 5.1.01.01.0027 - ESTADIAS | pág. 2, Jev 0.96 |
| 37 | 109 5.1.01.01.0025 - FRETES, CARRETOS E TRANSPORTES | pág. 2, Jev 0.94 |
| 38 | 72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE | pág. 2, Jev 1 |
| 39 | 108 5.1.01.01.0024 - I.S.S.Q.N | pág. 2, Jev 0.94 |
| 40 | 77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE | pág. 2, Claude 0.8 |
| 41 | 65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO | pág. 2, Jev 1 |
| 42 | 64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA | pág. 2, Jev 1 |
| 43 | 68 5.1.01.01.0004 - MATERIAIS DIVERSOS | pág. 2, precedente |
| 44 | 63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL | pág. 2, Jev 0.98 |
| 45 | 69 5.1.01.01.0006 - MOVEIS E UTENS. PEQ VALOR | pág. 2, Jev 0.96 |
| 46 | 94 5.1.01.01.0016 - MULTAS | pág. 2, Jev 1 |
| 47 | 80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL | pág. 2, Jev 0.97 |
| 48 | 82 5.1.01.01.0014 - SERVIÇOS LIMPEZA E MANUTENÇÃO | pág. 2, Jev 0.93 |
| 49 | 96 5.1.01.01.0019 - TELEFONE | pág. 2, Jev 1 |
| 50 | 101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA | pág. 2, precedente |
| 51 | 100 5.1.02.02.0012 - ASSOCIAÇÕES RECREATIVAS | pág. 2, precedente |
| 52 | 102 5.1.02.02.0014 - DESPESAS COM JOGOS | pág. 2, Jev 1 |
| 53 | 98 5.1.02.02.0010 - ENERGIA ELETRICA | pág. 2, Jev 0.94 |
| 54 | 124 5.1.02.02.0017 - FRETES E CARRETOS | pág. 2, Jev 0.99 |
| 55 | 83 5.1.02.02.0004 - LAVANDERIA | pág. 2, Jev 0.96 |
| 56 | 78 5.1.02.02.0002 - MANUTENÇAO GERAL | pág. 2, Jev 0.99 |
| 57 | 66 5.1.02.02.0001 - MATERIAIS P/ ALOJAMENTO | pág. 2, precedente |
| 58 | 84 5.1.02.02.0005 - PINTURA DE PLACAS | pág. 2, precedente |
| 59 | 79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS | pág. 2, Jev 1 |
| 60 | 90 5.1.02.02.0007 - TAXA DE ARBITRAGEM | pág. 2, Jev 1 |
| 61 | 91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO | pág. 2, precedente |
| 62 | 85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES | pág. 3, Jev 0.97 |
| 63 | 92 5.1.02.02.0009 - VIAGENS E ESTADIAS | pág. 3, precedente |
| 64 | 99 5.1.02.02.0011 - AGUA E ESGOTO | pág. 3, Jev 1 |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 56,16. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 21,76. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 34,40. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 857,96. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): reportType = official_balance_sheet. Guido 2026-10-02: balancete con la Demonstração do Resultado completa; la lectura 5 cierra exacto con el PREJUÍZO impreso
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): resultado-final = -3.108.722,71. Guido 2026-10-02: el PREJUIZO viene impreso sin signo; es pérdida
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2014: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "Campeonato Paulista de Futebol de 2014 - Série A3" (tools/club-league-
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/balanco-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 32 3.1.01.01.0001 - PATROCINIO NO UNIFORME | pág. 3, Jev 1 |
| 2 | 33 3.1.01.01.0002 - PATROCINIO EM PLACAS | pág. 3, Jev 1 |
| 3 | 34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO | pág. 3, Jev 0.98 |
| 4 | 35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS | pág. 3, precedente |
| 5 | 36 3.1.01.01.0005 - VENDAS DE INGRESSOS | pág. 3, Jev 1 |
| 6 | 37 3.1.01.01.0006 - RECEITAS DO BAR | pág. 3, Claude 0.9 |
| 7 | 38 3.1.01.01.0007 - RECEITA C/ NEGOCIAÇ DE ATLETA | pág. 3, Jev 1 |
| 8 | 39 3.1.01.01.0008 - REPASSE DA FEDERAÇÃO | pág. 3, Claude 0.9 |
| 9 | 117 3.1.01.01.0009 - DOAÇOES RECEBIDAS | pág. 3, Jev 1 |
| 10 | 119 3.1.01.02.0002 - CONV.PROJETO NOVOS HORIZONTES | pág. 3, Claude 0.85 |
| 11 | 179 3.1.01.02.0003 - DEV. DE CONVÊNIO NÃO UTILIZAD | pág. 3, Jev 0.97 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 40 4.1.01.01.0001 - SALARIOS | pág. 3, Jev 0.91 |
| 2 | 41 4.1.01.01.0002 - AJUDA DE CUSTO | pág. 3, precedente |
| 3 | 44 4.1.01.01.0005 - DIREITOS DE IMAGEM | pág. 3, Jev 0.9 |
| 4 | 45 4.1.01.01.0006 - INSS | pág. 3, Jev 0.92 |
| 5 | 46 4.1.01.01.0007 - FGTS | pág. 3, Jev 0.92 |
| 6 | 48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES | pág. 3, precedente |
| 7 | 49 4.1.01.01.0010 - ACORDOS TRABALHISTAS | pág. 3, Jev 0.92 |
| 8 | 51 4.1.01.01.0012 - CURSOS E TREINAMENTOS | pág. 3, precedente |
| 9 | 55 4.1.01.01.0016 - ALUGUEL/MORADIA COM TECNICA | pág. 3, precedente |
| 10 | 56 4.1.01.01.0017 - REFEIÇÕES | pág. 3, precedente |
| 11 | 57 4.1.01.01.0018 - LANCHES | pág. 3, precedente |
| 12 | 60 4.1.01.01.0021 - MEDICAMENTOS | pág. 3, Jev 0.9 |
| 13 | 61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES | pág. 3, precedente |
| 14 | 62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS | pág. 3, Claude 0.85 |
| 15 | 70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS | pág. 3, Jev 0.97 |
| 16 | 71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA | pág. 3, precedente |
| 17 | 81 4.1.01.01.0026 - SEGURANÇA E MEDICINA TRABALHO | pág. 3, precedente |
| 18 | 88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS | pág. 3, Claude 0.85 |
| 19 | 89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS | pág. 3, precedente |
| 20 | 63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL | pág. 3, Jev 0.98 |
| 21 | 64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA | pág. 3, Jev 1 |
| 22 | 65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO | pág. 3, Jev 1 |
| 23 | 68 5.1.01.01.0004 - MATERIAIS DIVERSOS | pág. 3, precedente |
| 24 | 72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE | pág. 3, Jev 1 |
| 25 | 73 5.1.01.01.0008 - ASSESSORIA DE MARKETING | pág. 3, Jev 0.99 |
| 26 | 74 5.1.01.01.0009 - ASSESSORIA ADMINISTRATIVA | pág. 3, Jev 1 |
| 27 | 76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA | pág. 4, Jev 0.98 |
| 28 | 77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE | pág. 4, Claude 0.8 |
| 29 | 80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL | pág. 4, Jev 0.97 |
| 30 | 82 5.1.01.01.0014 - SERVIÇOS LIMPEZA E MANUTENÇÃO | pág. 4, Jev 0.93 |
| 31 | 86 5.1.01.01.0015 - ASSESSORIA DE IMPRENSA | pág. 4, Jev 1 |
| 32 | 94 5.1.01.01.0016 - MULTAS | pág. 4, Jev 1 |
| 33 | 93 5.1.01.01.0017 - DESPESAS CARTORARIAS | pág. 4, Jev 1 |
| 34 | 95 5.1.01.01.0018 - CORREIOS | pág. 4, Jev 0.98 |
| 35 | 96 5.1.01.01.0019 - TELEFONE | pág. 4, Jev 1 |
| 36 | 97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES | pág. 4, Jev 0.97 |
| 37 | 108 5.1.01.01.0024 - I.S.S.Q.N | pág. 4, Jev 0.94 |
| 38 | 66 5.1.02.02.0001 - MATERIAIS P/ ALOJAMENTO | pág. 4, precedente |
| 39 | 78 5.1.02.02.0002 - MANUTENÇÃO GERAL | pág. 4, Jev 0.99 |
| 40 | 79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS | pág. 4, Jev 1 |
| 41 | 83 5.1.02.02.0004 - LAVANDERIA | pág. 4, Jev 0.96 |
| 42 | 84 5.1.02.02.0005 - PINTURA DE PLACAS | pág. 4, precedente |
| 43 | 85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES | pág. 4, Jev 0.97 |
| 44 | 90 5.1.02.02.0007 - TAXA DE ARBITRAGEM | pág. 4, Jev 1 |
| 45 | 91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO | pág. 4, precedente |
| 46 | 92 5.1.02.02.0009 - VIAGENS E ESTADIAS | pág. 4, precedente |
| 47 | 98 5.1.02.02.0010 - ENERGIA ELETRICA | pág. 4, Jev 0.94 |
| 48 | 99 5.1.02.02.0011 - ÁGUA E ESGOTO | pág. 4, Jev 1 |
| 49 | 101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA | pág. 4, precedente |
| 50 | 102 5.1.02.02.0014 - DESPESAS COM JOGOS | pág. 4, Jev 1 |
| 51 | 103 5.1.02.02.0015 - DESPESAS DIVERSAS | pág. 4, Jev 1 |
| 52 | 170 5.2.03.01.0002 - LAVANDERIA | pág. 4, Jev 0.96 |
| 53 | 171 5.2.03.01.0003 - ESCRITORIO CONTABILIDADE | pág. 4, Jev 0.99 |
| 54 | 172 5.2.03.01.0004 - ENERGIA ELETRICA | pág. 4, Jev 0.93 |
| 55 | 173 5.2.03.01.0005 - TELEFONE | pág. 4, Jev 1 |
| 56 | 174 5.2.03.01.0006 - ÁGUA E ESGOTO | pág. 4, Jev 1 |
| 57 | 175 5.2.03.01.0007 - VIAGENS E ESTADIAS-ATLETAS | pág. 4, Jev 0.92 |
| 58 | 176 5.2.03.01.0008 - VIAGENS E ESTADIAS-ADMINISTRAT | pág. 4, Jev 0.99 |
| 59 | 177 5.2.03.01.0009 - REFEIÇÕES | pág. 4, precedente |
| 60 | 178 5.2.03.01.0010 - LANCHES | pág. 4, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2013: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "Campeonato Paulista de Futebol de 2013 - Série A3" (tools/club-league-
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Brasil/Novorizontino/balanco-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Novorizontino/balanco-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Convênio P.M.N.H nº 21/10 | pág. 1, precedente |
| 2 | Doações, Receitas de Patrocínio, Locação de Espaço, e Ev | pág. 1, Jev 0.9 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrativas | pág. 1, Jev 1 |
| 2 | Despesas Gerais e Manutenção | pág. 1, Jev 0.98 |
| 3 | Projeto Escola de Futebol -Conv. Nº 21/10 | pág. 1, Jev 0.9 |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): reportType = official_balance_sheet. Guido 2026-10-02: la página 1 trae la Demonstração do Resultado completa (pocas filas numéricas porque el club recién se fundaba)
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): cero-real = Salarios del plantel. Guido 2026-10-02: año de fundación del club (R$ 130 mil de ingresos: convenio municipal y patrocinios); sin plantel profesional, sin TV ni estadio
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): cero-real = Televisión. Guido 2026-10-02: año de fundación del club (R$ 130 mil de ingresos: convenio municipal y patrocinios); sin plantel profesional, sin TV ni estadio
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-03): cero-real = Estadio. Guido 2026-10-02: año de fundación del club (R$ 130 mil de ingresos: convenio municipal y patrocinios); sin plantel profesional, sin TV ni estadio
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2010: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### novorizontino-br-demonstracoes-financeiras-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-balanco-2010

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-demonstracoes-financeiras-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-dre-e-fluxo-de-caixa-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-balanco-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-balanco-2014-b

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2014-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-balanco-2013

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### novorizontino-br-balanco-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
