# vilanova-br — evidencia de carga

Lo que había como comentario en `data/br/vilanova-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/vilanova-br-data.js — Vila Nova Futebol Clube (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Vila Nova/notas-explicativas-2014.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vilanova-br" — slug de "Vila Nova" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Vila Nova Futebol Clube" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Vila Nova" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral
  sport              ok        "futbol" — el .md nombra el fútbol 6 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2014 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período par
  cierre             ok        "2014-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md n
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2014-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2014-12-31 = 2.6562 (PTAX de cierre (venda) del Banco Central do Brasil al 2014-12-31)
  sourceId           ok        "vilanova-br-notas-explicativas-2014" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2014 (br-serieA, br-paulistaA3): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2014 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2014: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2014-12-31","sourceId":"vilanova-br-notas-explicativas-2014"}
============================================================================
```

_de data/clubs.js:_

```text
Vila Nova: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/notas-explicativas-2014.pdf. brandColor #F00000
(procedencia en Admin/sourcing/Brasil/Vila Nova.md, club-or-year-onboarding/club-nuevo.md).
```

_de data/club-leagues/br.js:_

```text
Vila Nova (alta-club.mjs, 2026-10-10): SIN VERIFICAR (no aparece en los rosters cacheados de 2014 (br-serieA, br-paulistaA3): puede haber jugado otra división).
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/demonstrativo-financeiro-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Participação em competições, exposição e performance | pág. 54, Jev 0.98 |
| 2 | Direitos de transmissão | pág. 54, Jev 1 |
| 3 | Patrocínios e publicidade | pág. 54, Jev 1 |
| 4 | Licenciamento e *royanties | pág. 54, Jev 0.99 |
| 5 | Bilheteria | pág. 54, Jev 1 |
| 6 | Sócio Tigrão | pág. 54, Jev 1 |
| 7 | Associações quadro social | pág. 54, Jev 1 |
| 8 | Repasse loterias | pág. 54, Jev 0.99 |
| 9 | Bares e lanchonetes | pág. 54, Jev 0.95 |
| 10 | Incentivos governamentais | pág. 54, Jev 1 |
| 11 | (-) Impostos e deduções da receita | pág. 54, Jev 0.98 |
| 12 | Venda de atletas e participações em direitos econômicos | pág. 56, Jev 1 |
| 13 | Mecanismo de solidariedade | pág. 56, precedente |
| 14 | Estorno de provisões (ii) | pág. 55, Jev 1 |
| 15 | Multas contratuais recebidas (iii) | pág. 55, Jev 0.99 |
| 16 | Doações | pág. 55, Jev 1 |
| 17 | Receita com aluguéis | pág. 55, Claude 0.85 |
| 18 | Arrecadação do futebol de base | pág. 55, Jev 1 |
| 19 | Brindes recebidos | pág. 55, Claude 0.8 |
| 20 | Outros | pág. 55, Claude 0.9 |
| 21 | Reembolsos recebidos | pág. 55, Jev 1 |
| 22 | Taxa de avaliação base | pág. 55, Jev 0.92 |
| 23 | Auxílio custos operacionais | pág. 55, Jev 0.95 |
| 24 | Estacionamentos | pág. 55, Claude 0.8 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Adesão ao condomínio LFU | pág. 54, precedente |
| 2 | (-) Comissões | pág. 56, Claude 0.8 |
| 3 | (-) Gastos para viabilizar a venda | pág. 56, Jev 0.97 |
| 4 | Perdas na venda de ativos | pág. 55, Jev 0.95 |
| 5 | Amortização de direitos sobre atletas (i) | pág. 54, Jev 0.99 |
| 6 | Premiações (ii) | pág. 54, precedente |
| 7 | Salários, encargos e benefícios | pág. 54, precedente |
| 8 | Gastos com jogos e competições | pág. 54, Jev 0.99 |
| 9 | Despesas com transações de atletas | pág. 54, Jev 0.99 |
| 10 | Rescisões | pág. 54, precedente |
| 11 | Perdas esperadas com processos trabalhistas | pág. 54, Jev 0.93 |
| 12 | Direito de imagem | pág. 54, Jev 0.98 |
| 13 | Salários, encargos e benefícios | pág. 55, precedente |
| 14 | Férias e encargos | pág. 55, precedente |
| 15 | 13º salário e encargos | pág. 55, precedente |
| 16 | Rescisões | pág. 55, precedente |
| 17 | Serviços de terceiros | pág. 55, Jev 0.97 |
| 18 | Uso e consumo | pág. 55, Jev 0.99 |
| 19 | Depreciações | pág. 55, Jev 1 |
| 20 | Esportes olímpicos | pág. 55, Jev 0.99 |
| 21 | Publicidades | pág. 55, Jev 1 |
| 22 | Manutenções de ativos | pág. 55, Jev 0.97 |
| 23 | Gastos administrativos | pág. 55, Jev 1 |
| 24 | Honorários jurídicos | pág. 55, Jev 1 |
| 25 | Taxas associativas | pág. 55, Jev 0.95 |
| 26 | Multas contratuais | pág. 55, Jev 1 |
| 27 | Reembolsos | pág. 55, precedente |
| 28 | Tecnologia da informação | pág. 55, Jev 1 |
| 29 | Despesas com transporte | pág. 55, Jev 0.93 |
| 30 | Seguros | pág. 55, Jev 0.96 |
| 31 | Impostos estaduais | pág. 55, Jev 0.99 |
| 32 | Aluguéis | pág. 55, Jev 0.9 |
| 33 | Honorários contábeis | pág. 55, Jev 1 |
| 34 | Impostos municipais | pág. 55, Jev 1 |
| 35 | Outros | pág. 55, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2025-12-31
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/demonstrativo-financeiro-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITA COM DIREITOS DE TRANSMISSÃO, PARTICIPAÇÃO E PREMIAÇÃO | pág. 21, Jev 0.97 |
| 2 | RECEITAS DIVERSAS | pág. 21, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) DEDUÇÕES DA RECEITA BRUTA | pág. 21, precedente |
| 2 | (-) DESPESAS COM PESSOAL | pág. 21, precedente |
| 3 | (-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES | pág. 21, Jev 1 |
| 4 | (-) PROVISÕES E CONTIGÊNCIAS | pág. 21, precedente |
| 5 | (-) DESPESAS COM ATIVIDADE EM GERAL | pág. 21, precedente |
| 6 | (-) OUTRAS DESPESAS | pág. 21, Jev 0.98 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae la fecha de la firma (2025-04-30); el ejercicio del documento cierra el 2024-12-31
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/demonstrativo-financeiro-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITAS DIVERSAS | pág. 4, Jev 1 |
| 2 | (-) DEDUÇÕES DA RECEITA BRUTA | pág. 4, Jev 0.95 |
| 3 | Venda de atletas | pág. 20, precedente |
| 4 | Programa sócio torcedor | pág. 20, precedente |
| 5 | Cota televisiva | pág. 20, precedente |
| 6 | Bilheteria | pág. 20, precedente |
| 7 | Patrocinadores | pág. 20, precedente |
| 8 | Marca própria - Loja Royalties | pág. 20, precedente |
| 9 | Venda de participações | pág. 20, precedente |
| 10 | Mecanismo Solidariedade | pág. 20, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) CUSTOS GERAIS | pág. 4, Jev 0.99 |
| 2 | (-) DESPESAS COM PESSOAL | pág. 4, precedente |
| 3 | (-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES | pág. 4, Jev 1 |
| 4 | (-) PROVISÕES E CONTIGÊNCIAS | pág. 4, precedente |
| 5 | (-) DESPESAS COM VENDAS EM GERAL | pág. 4, precedente |
| 6 | (-) OUTRAS DESPESAS | pág. 4, Jev 0.99 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.718.339,04. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 786.306,37. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 10.448.424,84. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.777.180,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 5.017.600,75. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 859.339,42. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 825.365,61. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 26.993,18. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/demonstrativo-financeiro-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITA PATROCINIO E MARKETING | pág. 4, Jev 1 |
| 2 | RECEITAS DIVERSAS | pág. 4, Jev 1 |
| 3 | (-) DEDUÇÕES DA RECEITA BRUTA | pág. 4, Jev 0.95 |
| 4 | Venda/Empréstimos de atletas | pág. 18, precedente |
| 5 | Programa socio-torcedor | pág. 19, precedente |
| 6 | Cota televisiva | pág. 19, precedente |
| 7 | Incentivo Governo Federal | pág. 19, precedente |
| 8 | Premiação | pág. 19, precedente |
| 9 | Bilheteria | pág. 19, precedente |
| 10 | Uso de imagem / royalties | pág. 19, precedente |
| 11 | Direito de imagem | pág. 19, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) DESPESAS COM PESSOAL | pág. 4, precedente |
| 2 | (-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES | pág. 4, Jev 1 |
| 3 | (-) PROVISÕES E CONTIGÊNCIAS | pág. 4, precedente |
| 4 | (-) DESPESAS COM VENDAS EM GERAL | pág. 4, precedente |
| 5 | (-) OUTRAS DESPESAS | pág. 4, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.199.337,47. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.079.868,47. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 9.320.800,90. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.514.364,23. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.654.000,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.251.231,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 932.899,31. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 8.877,40. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/demonstrativo-financeiro-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | RECEITA COM DIREITOS DE TRANSMISSÃO E PREMIAÇÕES | pág. 8, Jev 1 |
| 2 | RECEITA PATROCÍNIO E MARKETING | pág. 8, Jev 1 |
| 3 | RECEITAS DIVERSAS | pág. 8, Jev 1 |
| 4 | (-) DEDUÇÕES DA RECEITA BRUTA | pág. 8, Jev 0.95 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) CUSTOS GERAIS | pág. 8, Jev 0.99 |
| 2 | (-) DESPESAS COM PESSOAL | pág. 8, precedente |
| 3 | (-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES | pág. 8, Jev 1 |
| 4 | (-) PROVISÕES E CONTIGÊNCIAS | pág. 8, precedente |
| 5 | (-) DESPESAS COM VENDAS EM GERAL | pág. 8, precedente |
| 6 | (-) OUTRAS DESPESAS | pág. 8, Jev 0.99 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2021
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/balanco-patrimonial-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas Atividades Esportivas | pág. 1, Jev 1 |
| 2 | Receitas Escolinha de Futebol | pág. 1, Jev 0.99 |
| 3 | Receitas Doações/Patrocínios | pág. 1, Jev 0.91 |
| 4 | Receitas CBF | pág. 1, precedente |
| 5 | Receitas Publicidade | pág. 1, Jev 1 |
| 6 | Receitas Sócio Tigrão | pág. 1, Jev 1 |
| 7 | Receitas Direitos Federativos Atletas | pág. 1, Jev 0.98 |
| 8 | Receitas Alugueis | pág. 1, Claude 0.93 |
| 9 | Receitas Federação Goiana | pág. 1, precedente |
| 10 | Receitas Contribuições Conselheiros | pág. 1, Jev 0.96 |
| 11 | Receitas Time mania | pág. 1, Jev 0.98 |
| 12 | Receitas Diversas | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, Jev 1 |
| 2 | Despesas Depto Esportes | pág. 1, precedente |
| 3 | Despesas Tributárias | pág. 1, Jev 1 |
| 4 | Despesas Serviços Terceiros | pág. 1, Jev 0.98 |
| 5 | Despesas Diversas | pág. 1, Jev 1 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2017-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2017
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L105 (39.541.429,69) es el total de los renglones de despesas (L98-L104, con la financiera 67.298,36): se contaba dos veces; 7.215.652,32 + 31.235.464,33 + 146.866,71 + 867.856,64 + 0 + 8.291,33 = 39.474.131,33; + 67.298,36 = 39.541.429,69
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.019,64. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): los 13 renglones de receitas suman 37.956.311,55 = TOTAL DAS RECEITAS (L97) con las financeiras adentro
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -67.298,36. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 37.954.291,91 - 39.474.131,33 + 2.019,64 - 67.298,36 = -1.585.118,14 = déficit impreso (L106)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2017 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/balanco-patrimonial-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas Atividades Esportivas | pág. 1, Jev 1 |
| 2 | Receitas Escolinha de Futebol | pág. 1, Jev 0.99 |
| 3 | Receitas Doações/Patrocínios | pág. 1, Jev 0.91 |
| 4 | Receitas CBF | pág. 1, precedente |
| 5 | Receitas Publicidade | pág. 1, Jev 1 |
| 6 | Receitas Sócio Tigrão | pág. 1, Jev 1 |
| 7 | Receitas Direitos Federativos Atletas | pág. 1, Jev 0.98 |
| 8 | Receitas Alugueis | pág. 1, Claude 0.93 |
| 9 | Receitas Contribuições Conselheiros | pág. 1, Jev 0.96 |
| 10 | Receitas Time mania | pág. 1, Jev 0.98 |
| 11 | Receitas Diversas | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, Jev 1 |
| 2 | Despesas Depto Esportes | pág. 1, precedente |
| 3 | Despesas Tributárias | pág. 1, Jev 1 |
| 4 | Despesas Serviços Terceiros | pág. 1, Jev 0.98 |
| 5 | Despesas Diversas | pág. 1, Jev 1 |
| 6 | Ajustes de Exercícios Anteriores | pág. 1, Jev 0.91 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2016-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2016
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 343.729,73. Onboarding to-do 165 (Claude, 2026-10-09): el renglón L75 no llegó a las filas extraídas; está dentro del TOTAL DAS DESPESAS impreso: 9.801.794,10 + 4.783.520,98 + 185.637,84 + 535.154,62 + 343.729,73 + 13.946,18 = 15.663.783,45; + financiera 33.202,07 = 15.696.985,52 (L77)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 30.508,57. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): 12.894.474,04 + 30.508,57 = 12.924.982,61 = TOTAL DAS RECEITAS (L67)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -33.202,07. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 12.894.474,04 - 15.663.783,45 + 30.508,57 - 33.202,07 = -2.772.002,91 = déficit impreso (L78)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2016 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/balanco-patrimonial-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas Atividades Esportivas | pág. 1, Jev 1 |
| 2 | Receitas Escolinha de Futebol | pág. 1, Jev 0.99 |
| 3 | Receitas Doações/Patrocínios | pág. 1, Jev 0.91 |
| 4 | Receitas Publicidade | pág. 1, Jev 1 |
| 5 | Receitas Direitos Federativos Atletas | pág. 1, Jev 0.98 |
| 6 | Receitas Alugueis | pág. 1, Claude 0.93 |
| 7 | Receitas Contribuições Conselheiros | pág. 1, Jev 0.96 |
| 8 | Receitas Time mania | pág. 1, Jev 0.98 |
| 9 | Receitas Diversas | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, Jev 1 |
| 2 | Despesas Depto Esportes | pág. 1, precedente |
| 3 | Despesas Tributárias | pág. 1, Jev 1 |
| 4 | Despesas Serviços Terceiros | pág. 1, Jev 0.98 |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2015-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2015
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 38.324,22. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): los 13 renglones de receita suman 6.928.521,06 = TOTAL DAS RECEITAS (L70), con las Receitas Financeiras 38.324,22 adentro; la extracción las sumaba con el mismo signo que el costo financiero
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -5.029,11. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 6.890.197 - 8.598.927 + 38.324 - 5.029 = -1.675.435 (L79, -1.675.435,38)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Televisión, Salarios y primas (plantel y cuerpo técnico)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2015 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/notas-explicativas-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Vila Nova/notas-explicativas-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas Atividades Esportivas | pág. 1, precedente |
| 2 | Receitas Doações/Patrocínios | pág. 1, precedente |
| 3 | Receitas Publicidade | pág. 1, precedente |
| 4 | Receitas Direitos Federativos Atletas | pág. 1, precedente |
| 5 | Receitas Aluguéis | pág. 1, precedente |
| 6 | Receitas Extraordinárias | pág. 1, precedente |
| 7 | Receitas Contribuições Conselheiros | pág. 1, precedente |
| 8 | Receitas Diversas | pág. 1, precedente |
| 9 | Receitas CBF | pág. 1, precedente |
| 10 | Receitas Escolinha de Futebol | pág. 1, precedente |
| 11 | Receitas Sócio Tigrão | pág. 1, precedente |
| 12 | Receitas Timemania | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, precedente |
| 2 | Despesas Tributárias | pág. 1, precedente |
| 3 | Despesas Serviços Terceiros | pág. 1, precedente |
| 4 | Ajustes de Exercícios Anteriores | pág. 1, precedente |
| 5 | Despesas Depto Esportes | pág. 1, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2014-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2014
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.890.000,00. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L81) lee 1.880.000,00; el PDF imprime 1.890.000,00. Con 1.890.000,00 los 12 renglones suman 6.116.235,71 = TOTAL DAS RECEITAS impreso (con 1.880.000,00 suman 6.106.235,71) y la columna 2014 del balance 2015 también dice 6.116.235,71
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.268.187,41. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L93) lee 3.268.157,41; el PDF imprime 3.268.187,41. Con 3.268.187,41 los 6 renglones suman 6.493.155,07 = TOTAL DAS DESPESAS impreso (con 3.268.157,41 suman 6.493.125,07, 30 menos)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 126.870,00. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L79) rotula 'Receitas de Eventos'; el PDF dice 'Receitas Escolinha de Futebol' (126.870,00)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.461,44. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L83) rotula 'Receitas Sócio Torcedor'; el PDF dice 'Receitas Sócio Tigrão' (1.461,44)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 78.862,10. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L88) rotula 'Receitas Sindicatos'; el PDF dice 'Receitas Timemania' (78.862,10)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 2.338.741,92. Onboarding to-do 165 (Claude, 2026-10-09): columna 2013 (no se carga); el PDF dice 2.338.741,82
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 1.880.000,00. Onboarding to-do 165 (Claude, 2026-10-09): el PDF dice 1.890.000,00; la fila que se carga va corregida por el ajuste fila
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 288.754,80. Onboarding to-do 165 (Claude, 2026-10-09): Receitas Publicidade 2014, confirmado en la imagen de la pág. 1
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 365.952,66. Onboarding to-do 165 (Claude, 2026-10-09): columna 2013 (no se carga); el PDF dice 365.952,68
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 3.268.157,41. Onboarding to-do 165 (Claude, 2026-10-09): el PDF dice 3.268.187,41; la fila que se carga va corregida por el ajuste fila
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Hugo Jorge Bravo (2019-12-09 a 2025-11-28): Posse 09/12/2019 (elegido 04/12/2019); reelecto el 17/12/2021, nuevo mandato desde el 18/12/2021 (lista de Wikipedia pt). Hasta 28/11/2025, posse de Fábio Brasil.
Fábio Brasil de Castro (2025-11-28 a hoy): Aclamado y posse el viernes 28/11/2025 (Mais Goiás, O Popular); mandato hasta 2028.
SIN CONFIRMAR, no cargada: Gutemberg Veronez (2014-12-01 a 2016-10-10), https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Vila_Nova_Futebol_Clube: Wikipedia pt (lista): tomó posse como interino tras la renuncia de Rodrigo Nogueira (que 'perto de deixar' el 26/11/2014, GE) y fue elegido el 01/12/2015 (posse 02/12/2015). Sagres Online: asumió 'a fines de 2014' y renunció 22 meses después. Desde = 2014-12-01 estimado (solo se sabe fines de 2014, tras el 26/11/2014); hasta = 10/10/2016, fecha de la nota de GE 'Gutemberg Veronez renuncia'.
SIN CONFIRMAR, no cargada: Ecival Martins (2016-10-10 a 2019-12-09), https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Vila_Nova_Futebol_Clube: Nombrado interino por el presidente del consejo tras la renuncia de Guto (Oct 2016), elegido el 09/11/2016 (mandato tampón; posse 30/12/2016 según la lista) y luego mandato 2018-2019 (elegido 07/12/2017, posse 01/01/2018). Desde = 2016-10-10 es la fecha de la renuncia de Guto, no la de la asunción exacta.
Duda: Cierre 2014: la posse de Guto Veronez fue en diciembre de 2014 (después del 26/11); si el 31/12/2014 ya estaba en el cargo está cubierto; si no, sería Rodrigo Nogueira (interino desde 18/03/2014).
Duda: Cierre 2025: Hugo Jorge Bravo presidió casi todo el año; Fábio Brasil asumió el 28/11/2025 (posible firmo).
Duda: La tabla de Wikipedia pt tiene filas sin nombre y notas con fechas cruzadas (2018-19, 2022-25); los nombres de esas filas los deduje de las notas/referencias.
```

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Hugo Jorge Bravo (2019-12-09 a 2025-11-28): Ya confirmada en la tanda anterior (posse 09/12/2019; Wikipedia pt).
Fábio Brasil de Castro (2025-11-28 a hoy): Ya confirmada en la tanda anterior (posse 28/11/2025).
SIN CONFIRMAR, no cargada: Gutemberg Veronez (2014-12-01 a 2016-10-11), https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Vila_Nova_Futebol_Clube: Wikipedia pt (lista): presidente 2014-2016, interino tras la renuncia del anterior; elegido el 01/12/2015 (posse 02/12/2015, venció la chapa de Carlos Antunes Júnior). Sagres Online: asumió "a fines de 2014" y renunció 22 meses después. El día exacto de la asunción de 2014 NO figura en ninguna fuente leída: 2014-12-01 es una estimación (día 01 por convención). Hasta = 2016-10-11, día en que se presentó a Ecival; la fecha exacta de la renuncia no se encontró (Sagres: renuncia previa al nombramiento de Ecival). confirmada=false.
SIN CONFIRMAR, no cargada: Ecival Martins (2016-10-11 a 2019-12-09), https://sagresonline.com.br/apresentado-novo-presidente-do-vila-pede-paciencia-a-torcida-e-destaca-que-a-paz-vai-voltar/: Sagres Online: presentado como presidente el martes 11/10/2016 (nombrado por el presidente del consejo, Wilson Balzacchi, tras la renuncia de Guto, hasta elecciones del 09/11/2016); la fecha del nombramiento no figura (pudo ser 1-2 días antes). Wikipedia pt: elegido 09/11/2016 (posse 30/12/2016), nuevo mandato 2018-2019 (posse 01/01/2018; la fila no trae nombre). Hasta = 09/12/2019, posse de Hugo Jorge Bravo según la lista de Wikipedia; ninguna fuente leída afirma explícitamente que Ecival fue el inmediato anterior. confirmada=false.
Duda: Cierre 2014: no se encontró el día de asunción de Guto Veronez; la lista de Wikipedia pt lo muestra con posse 02/12/2015 y a Rodrigo Nogueira (interino desde 18/03/2014) como anterior. Si Guto asumió después del 31/12/2014, el cierre 2014 sería de Rodrigo Nogueira.
Duda: Cierre 2025: Hugo Jorge Bravo presidió hasta el 28/11/2025 y Fábio Brasil estaba al cierre (posible firmo).
Duda: Cierre 2016: Guto Veronez presidió hasta octubre; Ecival estaba al cierre (posible firmo).
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-7.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Gutemberg Veronez Netto (2014-12-01 a 2016-10-10): Sagres Online dice que asumió 'no fim de 2014' y renunció 22 meses después, en 2016 (renuncia el 10/10/2016 según la nota de Globo Esporte citada en Wikipedia): por eso desde = 2014-12-01 (día 01 inventado, mes deducido de la cuenta de 22 meses). La tabla de Wikipedia pone su posse el 02/12/2015, que contradice a la prensa; en ambos casos preside al 31/12/2015. Firma el balance 2015 como 'GUTEMBERB VERONEZ NETTO, Presidente' (balanco-patrimonial-2015.md:128-131).
Ecival Miguel da Silva Martins (2016-10-11 a 2019-12-09): Segundo vicepresidente, nombrado por el Conselho Deliberativo tras la renuncia de Veronez (10/10/2016) y presentado el 11/10/2016 (desde = 2016-10-11); elegido para mandato tampón el 09/11/2016 y reelegido para 2018-2019 (Wikipedia da posse 30/12/2016 y 01/01/2018). Hasta = posse de Hugo Jorge Bravo, 09/12/2019 (Wikipedia; Esporte Goiano: aclamado el 04/12/2019, sin fecha de posse). Firma los balances 2016 y 2017 (balanco-patrimonial-2016.md:125-128; balanco-patrimonial-2017.md:157-160).
Duda: Cierre 2014-12-31 sin cubrir: Rodrigo Nogueira asumió como interino el 18/03/2014 tras la renuncia de Joás Abrantes (Wikipedia, citando Globo Esporte 18/03/2014) y en noviembre 2014 estaba 'perto de deixar a presidência' (Globo Esporte 26/11/2014), pero no encontré el día en que asumió Veronez (solo 'fim de 2014'). Además notas-explicativas-2014.md:128-130 lo firma Joás Araujo Abrantes como Presidente, con fecha 31/12/2014 y 05/01/2015, lo que contradice que ya no fuera presidente. Hace falta una fuente con la fecha de relevo de dic-2014.
Duda: El mes de asunción de Veronez (2014-12) es una deducción de 'fim de 2014' + 22 meses; no hay una nota que dé la fecha exacta. No afecta al cierre 2015.
Duda: Ecival desde: la prensa lo nombró el 10-11/10/2016 por el Conselho; Wikipedia anota posse 30/12/2016 tras la elección del 09/11/2016. Los cierres 2016 y 2017 caen en la gestión de Ecival con cualquiera de las dos fechas.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### vilanova-br-demonstrativo-financeiro-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-balanco-patrimonial-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-balanco-patrimonial-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-balanco-patrimonial-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-demonstrativo-financeiro-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-demonstrativo-financeiro-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-demonstrativo-financeiro-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-demonstrativo-financeiro-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vilanova-br-notas-explicativas-2014

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/notas-explicativas-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
