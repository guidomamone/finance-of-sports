# famalicao-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/famalicao-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Famalicão: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Famalicão/relatorio-contas-2021-22.pdf. brandColor #0057B8
(procedencia en Admin/sourcing/Portugal/Famalicão.md; tools/cargar-lote.mjs).
```

```text
data/pt/famalicao-pt-data.js — Futebol Clube de Famalicão - Futebol S.A.D. (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Famalicão/relatorio-contas-2021-22.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "famalicao-pt" — slug de "Famalicão" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Famalicão - Futebol S.A.D." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-10): Nombre legal del alta (Claude, Sonnet): relatorio-contas-2021-22.md L30 y L
  displayName        ok        "Famalicão" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (62 de 65 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 119 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2022-06-30" — año del ejercicio + mes de cierre (contenido del .md (62 de 65 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2022-06-30 = 0.9627 (Cierre BCE al 30/6/2022 (1 EUR = 1,0387 USD))
  sourceId           ok        "famalicao-pt-relatorio-contas-2021-22" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-06-30","sourceId":"famalicao-pt-relatorio-contas-2021-22"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 40, precedente |
| 2 | Ingressos | pág. 40, precedente |
| 3 | Competições | pág. 40, precedente |
| 4 | Publicidade | pág. 40, precedente |
| 5 | Patrocínios | pág. 40, precedente |
| 6 | Direitos Clube | pág. 40, precedente |
| 7 | Apostas desportivas | pág. 40, precedente |
| 8 | Outras receitas desportivas | pág. 40, precedente |
| 9 | Subsídios à exploração | pág. 26, precedente |
| 10 | Outros rendimentos | pág. 26, precedente |
| 11 | Ganhos/perdas imputados de subsidiárias, associadas e empresas | pág. 26, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 26, precedente |
| 2 | Serviços especializados | pág. 41, precedente |
| 3 | Materiais | pág. 41, precedente |
| 4 | Energia e fluidos | pág. 41, precedente |
| 5 | Deslocações, estadas e transportes | pág. 41, precedente |
| 6 | Rendas e alugueres | pág. 41, precedente |
| 7 | Limpeza, Higiene e conforto | pág. 41, precedente |
| 8 | Outros | pág. 41, precedente |
| 9 | Remunerações do pessoal | pág. 42, precedente |
| 10 | Benefícios pós-emprego | pág. 42, Jev 0.98 |
| 11 | Indemnizações | pág. 42, precedente |
| 12 | Encargos sobre remunerações | pág. 42, precedente |
| 13 | Seguros | pág. 42, precedente |
| 14 | Gastos de ação social | pág. 42, precedente |
| 15 | Outros gastos com pessoal | pág. 42, precedente |
| 16 | Imparidade de dívidas a receber (perdas/reversões) | pág. 26, precedente |
| 17 | Provisões (aumentos/reduções) | pág. 26, precedente |
| 18 | Impostos | pág. 42, precedente |
| 19 | Descontos de pronto pagamento concedidos | pág. 42, precedente |
| 20 | Gastos e perdas em inv. não financeiros | pág. 42, precedente |
| 21 | Outros gastos e perdas | pág. 42, precedente |
| 22 | Gastos/reversões de depreciação e de amortização | pág. 26, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2025-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 5 007,78. Renglón de ingresos del estado que la extracción no trajo; con él el resultado operacional da el impreso 262.412,53 y el líquido −3.257.811,34.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 25 + "Financiamentos obtidos" pág. 25; cash escalón 1 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 25
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 42, precedente |
| 2 | Ingressos | pág. 42, precedente |
| 3 | Competições | pág. 42, precedente |
| 4 | Publicidade | pág. 42, precedente |
| 5 | Patrocínios | pág. 42, precedente |
| 6 | Direitos Clube | pág. 42, precedente |
| 7 | Apostas desportivas | pág. 42, precedente |
| 8 | Outras receitas desportivas | pág. 42, precedente |
| 9 | Subsídios à exploração | pág. 27, precedente |
| 10 | Ganhos/perdas imputados de subsidiárias, associadas e empre | pág. 27, Jev 1 |
| 11 | Outros rendimentos | pág. 27, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 27, precedente |
| 2 | Serviços especializados | pág. 43, precedente |
| 3 | Materiais | pág. 43, precedente |
| 4 | Energia e fluidos | pág. 43, precedente |
| 5 | Deslocações, estadas e transportes | pág. 43, precedente |
| 6 | Rendas e alugueres | pág. 43, precedente |
| 7 | Limpeza, Higiene e conforto | pág. 43, precedente |
| 8 | Outros | pág. 43, precedente |
| 9 | Remunerações do pessoal | pág. 43, precedente |
| 10 | Indemnizações | pág. 43, precedente |
| 11 | Encargos sobre remunerações | pág. 43, precedente |
| 12 | Seguros | pág. 43, precedente |
| 13 | Gastos de ação social | pág. 43, precedente |
| 14 | Outros gastos com pessoal | pág. 43, precedente |
| 15 | Imparidade de dívidas a receber (perdas/reversões) | pág. 27, precedente |
| 16 | Provisões (aumentos/reduções) | pág. 27, precedente |
| 17 | Impostos | pág. 44, precedente |
| 18 | Descontos de pronto pagamento concedidos | pág. 44, precedente |
| 19 | Gastos e perdas em inv. não financeiros | pág. 44, precedente |
| 20 | Outros gastos e perdas | pág. 44, precedente |
| 21 | Gastos/reversões de depreciação e de amortização | pág. 27, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2024-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 26
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 29, precedente |
| 2 | Ingressos | pág. 29, precedente |
| 3 | Competições | pág. 29, precedente |
| 4 | Publicidade | pág. 29, precedente |
| 5 | Patrocínios | pág. 29, precedente |
| 6 | Direitos Clube | pág. 29, precedente |
| 7 | Apostas desportivas | pág. 29, precedente |
| 8 | Outras receitas desportivas | pág. 29, precedente |
| 9 | Subsídios à exploração | pág. 15, precedente |
| 10 | Outros rendimentos | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 15, precedente |
| 2 | Serviços especializados | pág. 30, precedente |
| 3 | Materiais | pág. 30, precedente |
| 4 | Energia e fluídos | pág. 30, precedente |
| 5 | Deslocações, estadas e transportes | pág. 30, precedente |
| 6 | Rendas e alugueres | pág. 30, precedente |
| 7 | Limpeza, Higiene e conforto | pág. 30, precedente |
| 8 | Outros | pág. 30, precedente |
| 9 | Remunerações do pessoal | pág. 30, precedente |
| 10 | Indemnizações | pág. 30, precedente |
| 11 | Encargos sobre remunerações | pág. 30, precedente |
| 12 | Seguros | pág. 30, precedente |
| 13 | Gastos de ação social | pág. 30, precedente |
| 14 | Outros gastos com pessoal | pág. 30, precedente |
| 15 | Imparidade de dívidas a receber (perdas/reversões) | pág. 15, precedente |
| 16 | Provisões (aumentos/reduções) | pág. 15, precedente |
| 17 | Impostos | pág. 31, precedente |
| 18 | Descontos de pronto pagamento concedidos | pág. 31, precedente |
| 19 | Gastos e perdas em inv. não financeiros | pág. 31, precedente |
| 20 | Outros gastos e perdas | pág. 31, precedente |
| 21 | Gastos/reversões de depreciação e de amortização | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 14 + "Financiamentos obtidos" pág. 14; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 14
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Famalicão/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 32, Jev 1 |
| 2 | Ingressos | pág. 32, Jev 1 |
| 3 | Competições | pág. 32, precedente |
| 4 | Publicidade | pág. 32, Jev 1 |
| 5 | Patrocinios | pág. 32, Jev 1 |
| 6 | Direitos Clube | pág. 32, precedente |
| 7 | Apostas desportivas | pág. 32, Jev 0.95 |
| 8 | Outras receitas desportivas | pág. 32, Jev 0.96 |
| 9 | Subsídios à exploração | pág. 18, Jev 0.99 |
| 10 | Outros rendimentos | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 18, precedente |
| 2 | Serviços especializados | pág. 33, Jev 1 |
| 3 | Materiais | pág. 33, Jev 0.93 |
| 4 | Energia e fluidos | pág. 33, Jev 0.99 |
| 5 | Deslocações, estadas e transportes | pág. 33, Jev 0.97 |
| 6 | Rendas e alugueres | pág. 33, precedente |
| 7 | Limpeza, Higiene e conforto | pág. 33, Jev 0.99 |
| 8 | Outros | pág. 33, Jev 0.97 |
| 9 | Remunerações do pessoal | pág. 34, precedente |
| 10 | Indemnizações | pág. 34, precedente |
| 11 | Encargos sobre remunerações | pág. 34, precedente |
| 12 | Seguros | pág. 34, precedente |
| 13 | Gastos de ação social | pág. 34, precedente |
| 14 | Outros gastos com pessoal | pág. 34, precedente |
| 15 | Imparidade de dívidas a receber (perdas/reversões) | pág. 18, Jev 0.99 |
| 16 | Provisões (aumentos/reduções) | pág. 18, Jev 0.92 |
| 17 | Impostos | pág. 34, Jev 1 |
| 18 | Descontos de pronto pagamento concedidos | pág. 34, Jev 0.97 |
| 19 | Gastos e perdas em inv. não financeiros | pág. 34, Jev 0.9 |
| 20 | Outros gastos e perdas | pág. 34, Jev 0.97 |
| 21 | Gastos/reversões de depreciação e de amortização | pág. 18, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): categoria = player_sales. Claude 2026-10-15 (lote 76): la nota 25 dice que el saldo 'reflete, essencialmente, a mais-valia na alienação dos direitos desportivos e económicos de três jogadores' (L1317); el único otro concepto nombrado es un subsidio de 1.204 € (L1315). Formato SNC (to-do 237 h)
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 17 + "Financiamentos obtidos" pág. 17; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 17
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 28, precedente |
| 2 | Competições | pág. 28, precedente |
| 3 | Publicidade | pág. 28, precedente |
| 4 | Patrocínios | pág. 28, precedente |
| 5 | Direitos Clube | pág. 28, precedente |
| 6 | Apostas desportivas | pág. 28, precedente |
| 7 | Outras receitas desportivas | pág. 28, precedente |
| 8 | Subsídios à exploração | pág. 14, precedente |
| 9 | Outros rendimentos | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 14, precedente |
| 2 | Serviços especializados | pág. 29, precedente |
| 3 | Materiais | pág. 29, precedente |
| 4 | Energia e fluidos | pág. 29, precedente |
| 5 | Deslocações, estadas e transportes | pág. 29, precedente |
| 6 | Rendas e alugueres | pág. 29, precedente |
| 7 | Limpeza, Higiene e conforto | pág. 29, precedente |
| 8 | Outros | pág. 29, precedente |
| 9 | Remunerações do pessoal | pág. 30, precedente |
| 10 | Indemnizações | pág. 30, precedente |
| 11 | Encargos sobre remunerações | pág. 30, precedente |
| 12 | Seguros | pág. 30, precedente |
| 13 | Gastos de ação social | pág. 30, precedente |
| 14 | Outros gastos com pessoal | pág. 30, precedente |
| 15 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, precedente |
| 16 | Impostos | pág. 30, precedente |
| 17 | Descontos de pronto pagamento concedidos | pág. 30, precedente |
| 18 | Ganhos e perdas em subsidiárias e associadas | pág. 30, Jev 0.99 |
| 19 | Gastos e perdas em inv. não financeiros | pág. 30, precedente |
| 20 | Outros gastos e perdas | pág. 30, precedente |
| 21 | Gastos/reversões de depreciação e de amortização | pág. 14, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2021-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 27, precedente |
| 2 | Ingressos | pág. 27, precedente |
| 3 | Competições | pág. 27, precedente |
| 4 | Publicidade | pág. 27, precedente |
| 5 | Patrocínios | pág. 27, precedente |
| 6 | Direitos Clube | pág. 27, precedente |
| 7 | Apostas desportivas | pág. 27, precedente |
| 8 | Outras receitas desportivas | pág. 27, precedente |
| 9 | Descontos e Abatimentos | pág. 27, Jev 0.99 |
| 10 | Subsídios à exploração | pág. 14, precedente |
| 11 | Outros rendimentos | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 14, precedente |
| 2 | Fornecimentos e serviços externos | pág. 14, Jev 1 |
| 3 | Remunerações do pessoal | pág. 29, precedente |
| 4 | Indemnizações | pág. 29, precedente |
| 5 | Encargos sobre remunerações | pág. 29, precedente |
| 6 | Seguros | pág. 29, precedente |
| 7 | Gastos de ação social | pág. 29, precedente |
| 8 | Outros gastos com pessoal | pág. 29, precedente |
| 9 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, precedente |
| 10 | Impostos | pág. 29, precedente |
| 11 | Descontos de pronto pagamento concedidos | pág. 29, precedente |
| 12 | Outros gastos e perdas | pág. 29, precedente |
| 13 | Gastos/reversões de depreciação e de amortização | pág. 14, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2020-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 13 + "Financiamentos obtidos" pág. 13; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2019–20 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Famalicão/relatorio-contas-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de mercadorias | pág. 27, precedente |
| 2 | Ingressos | pág. 27, precedente |
| 3 | Competições | pág. 27, precedente |
| 4 | Publicidade | pág. 27, precedente |
| 5 | Patrocínios | pág. 27, precedente |
| 6 | Direitos Clube | pág. 27, precedente |
| 7 | Apostas desportivas | pág. 27, precedente |
| 8 | Outras receitas desportivas | pág. 27, precedente |
| 9 | Descontos e Abatimentos | pág. 27, Jev 0.99 |
| 10 | Subsídios à exploração | pág. 14, precedente |
| 11 | Outros rendimentos | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas | pág. 14, precedente |
| 2 | Fornecimentos e serviços externos | pág. 14, Jev 1 |
| 3 | Remunerações do pessoal | pág. 29, precedente |
| 4 | Indemnizações | pág. 29, precedente |
| 5 | Encargos sobre remunerações | pág. 29, precedente |
| 6 | Seguros | pág. 29, precedente |
| 7 | Gastos de ação social | pág. 29, precedente |
| 8 | Outros gastos com pessoal | pág. 29, precedente |
| 9 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, precedente |
| 10 | Impostos | pág. 29, precedente |
| 11 | Descontos de pronto pagamento concedi | pág. 29, Jev 1 |
| 12 | Outros gastos e perdas | pág. 29, precedente |
| 13 | Gastos/reversões de depreciação e de amortização | pág. 14, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): cierre = 2019-06-30. periodo.mjs no encontró el cierre; confirmado contra el .md (revisión de altas de Portugal, subagente Sonnet y Claude)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 13 + "Financiamentos obtidos" pág. 13; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2018–19 LigaPro" (tools/club-league-reference/pt.json), coincidencia exacta "Famalicão".
```

## Fuentes

### famalicao-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### famalicao-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Famalicão/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
