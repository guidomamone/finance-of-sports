# gilvicente-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/gilvicente-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Gil Vicente: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.pdf. brandColor #ED3124
(procedencia en Admin/sourcing/Portugal/Gil Vicente.md; tools/cargar-lote.mjs).
```

```text
data/pt/gilvicente-pt-data.js — Gil Vicente (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "gilvicente-pt" — slug de "Gil Vicente" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Gil Vicente" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Gil Vicente" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (211 de 211 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 73 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (211 de 211 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, perimetro-senales 2026-10-15): perimetro-senales.mjs: 0 documento(s) con los dos estados votan 
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "gilvicente-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"gilvicente-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 55, Claude 0.85 |
| 2 | Venda e Cedência de Atletas | pág. 55, Jev 1 |
| 3 | Publicidade | pág. 55, Jev 1 |
| 4 | Direitos Televisivos | pág. 55, Jev 1 |
| 5 | Receitas de Jogos - Bilhetes | pág. 55, Jev 1 |
| 6 | Receitas de Jogos - Lugares Cativos | pág. 55, precedente |
| 7 | Participação nas Competições | pág. 55, Jev 1 |
| 8 | Outras Prestações de Serviços | pág. 55, Jev 1 |
| 9 | FEDERAÇÃO PORTUGUESA DE FUTEBOL | pág. 55, precedente |
| 10 | INSTITUTO EMPREGO FORMAÇÃO PROFISSIONAL | pág. 55, Claude 0.85 |
| 11 | LIGA PORTUGUESA DE FUTEBOL PROFISSIONAL | pág. 55, precedente |
| 12 | Outros rendimentos suplementares | pág. 57, Jev 1 |
| 13 | Outros não especificados | pág. 57, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 29, Jev 0.98 |
| 2 | Comissões | pág. 56, precedente |
| 3 | Honorários | pág. 56, Jev 1 |
| 4 | Conservação e Reparações | pág. 56, Jev 0.97 |
| 5 | Publicidade e Propaganda | pág. 56, Jev 1 |
| 6 | Trabalhos especializados | pág. 56, Jev 0.99 |
| 7 | Serviços bancários | pág. 56, Jev 0.97 |
| 8 | Deslocações | pág. 56, Jev 1 |
| 9 | Inscrições de Atletas | pág. 56, Jev 0.96 |
| 10 | Despesas Médicas | pág. 56, precedente |
| 11 | Organização de Jogos | pág. 56, Jev 1 |
| 12 | Material de Ginásio e Treino | pág. 56, precedente |
| 13 | Produtos Energéticos | pág. 56, precedente |
| 14 | Equipamentos Desportivos | pág. 56, precedente |
| 15 | Direitos de Formação | pág. 56, Jev 0.97 |
| 16 | Empréstimos de Atletas | pág. 56, precedente |
| 17 | Despesas Diversas | pág. 56, Jev 1 |
| 18 | Serviços Scouting | pág. 56, precedente |
| 19 | SEGUROS | pág. 56, Claude 0.85 |
| 20 | Rendas e Alugueres | pág. 56, precedente |
| 21 | CONTENCIOSO E NOTARIADO | pág. 56, Jev 1 |
| 22 | Outros Serviços | pág. 56, Jev 1 |
| 23 | Comunicação | pág. 56, Jev 1 |
| 24 | LIMPEZA, HIGIENE E CONFORTO | pág. 56, Jev 1 |
| 25 | COMBUSTÍVEIS | pág. 56, Jev 0.98 |
| 26 | ELETRICIDADE | pág. 56, Jev 1 |
| 27 | ÁGUA | pág. 56, Jev 1 |
| 28 | GÁS | pág. 56, Jev 0.97 |
| 29 | Outros Serviços | pág. 56, Jev 1 |
| 30 | MATERIAL ESCRITÓRIO | pág. 56, Jev 1 |
| 31 | FERR. e UTENS. DESGASTE RÁPIDO | pág. 56, Jev 1 |
| 32 | Bilhetes | pág. 56, precedente |
| 33 | ARTIGOS PARA OFERTA | pág. 56, Jev 0.98 |
| 34 | Remunerações do Pessoal | pág. 57, Claude 0.85 |
| 35 | Encargos sobre remunerações | pág. 57, Jev 0.93 |
| 36 | Seguros acidentes no trabalho e doença | pág. 57, Jev 0.93 |
| 37 | Outros gastos com o pessoal | pág. 57, precedente |
| 38 | Imparidade de dívidas a receber (perdas/reversões) | pág. 29, Jev 0.99 |
| 39 | Direitos económicos desportivos | pág. 58, precedente |
| 40 | Mecanismo de solidariedade | pág. 58, Jev 0.97 |
| 41 | Quotizações | pág. 58, precedente |
| 42 | Multas e penalidades | pág. 58, Jev 0.96 |
| 43 | Outras diversos | pág. 58, Jev 1 |
| 44 | Gastos/reversões de depreciação e de amortização | pág. 29, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 16 + "Financiamentos obtidos" pág. 16
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 186.924,33. Balance individual 30.06.25 (el consolidado, en otro .md, da 305.547,11). Total activo no verificado, pero la fila coincide con la tabla de gestión (línea 406).
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 57, precedente |
| 2 | Venda de Atletas | pág. 57, Jev 1 |
| 3 | Publicidade | pág. 57, precedente |
| 4 | Receitas de jogos- Lugares cativos | pág. 57, precedente |
| 5 | Participação nas competições - Taça da liga | pág. 57, Jev 1 |
| 6 | Participação nas competições - Taça de Portuga | pág. 57, Jev 1 |
| 7 | Participação eliga Portugal | pág. 57, precedente |
| 8 | Participação UEFA | pág. 57, Claude 0.85 |
| 9 | Participação nas Competições - Liga Revelação | pág. 57, Jev 0.99 |
| 10 | Bilheteira | pág. 57, Jev 1 |
| 11 | Direitos Televisivos | pág. 57, precedente |
| 12 | Outras Prestações de serviços | pág. 57, precedente |
| 13 | Donativos | pág. 57, Jev 1 |
| 14 | Quotas | pág. 57, Jev 1 |
| 15 | Liga Portuguesa de Futebol profissional | pág. 58, precedente |
| 16 | Federação Portuguesa de Futebol | pág. 58, precedente |
| 17 | UEFA | pág. 58, precedente |
| 18 | IEFP | pág. 58, Jev 0.97 |
| 19 | Município de Barcelos | pág. 58, Jev 0.97 |
| 20 | Mecanismo de Solidariedade | pág. 58, Jev 0.95 |
| 21 | Rendimentos suplementares | pág. 60, Jev 0.98 |
| 22 | Outros rendimentos e ganhos | pág. 60, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 28, precedente |
| 2 | Comissões | pág. 59, precedente |
| 3 | Honorários | pág. 59, precedente |
| 4 | Conservação e Reparações | pág. 59, precedente |
| 5 | Publicidade e Propaganda | pág. 59, precedente |
| 6 | Trabalhos especializados | pág. 59, precedente |
| 7 | Serviços bancários | pág. 59, precedente |
| 8 | Deslocações | pág. 59, precedente |
| 9 | Inscrições de Atletas | pág. 59, precedente |
| 10 | Despesas Médicas | pág. 59, precedente |
| 11 | Organização de Jogos | pág. 59, precedente |
| 12 | Material de Ginásio e Treino | pág. 59, precedente |
| 13 | Produtos Energéticos | pág. 59, precedente |
| 14 | Equipamentos Desportivos | pág. 59, precedente |
| 15 | Direitos de Formação | pág. 59, precedente |
| 16 | Despesas Diversas | pág. 59, precedente |
| 17 | Serviços Scouting | pág. 59, precedente |
| 18 | SEGUROS | pág. 59, precedente |
| 19 | Rendas e Alugueres | pág. 59, precedente |
| 20 | Contencioso | pág. 59, Claude 0.9 |
| 21 | Outros Serviços | pág. 59, precedente |
| 22 | Comunicação | pág. 59, precedente |
| 23 | Limpeza, Higiene e conforto | pág. 59, precedente |
| 24 | Eletricidade | pág. 59, precedente |
| 25 | Combustíveis | pág. 59, precedente |
| 26 | Água | pág. 59, precedente |
| 27 | Gás | pág. 59, precedente |
| 28 | Outros Serviços | pág. 59, precedente |
| 29 | Ferramentas e utensílios de desgaste rápido | pág. 59, Jev 1 |
| 30 | Material de escritório | pág. 59, Jev 1 |
| 31 | Bilhetes | pág. 59, precedente |
| 32 | Outras | pág. 59, Jev 1 |
| 33 | Remunerações do pessoal | pág. 60, precedente |
| 34 | Encargos sobre remunerações | pág. 60, precedente |
| 35 | Seguros | pág. 60, precedente |
| 36 | Outros gastos com pessoal | pág. 60, precedente |
| 37 | Provisões (aumentos/reduções) | pág. 28, precedente |
| 38 | Impostos | pág. 61, Jev 1 |
| 39 | Outros gastos e perdas | pág. 61, Jev 1 |
| 40 | Ativos fixos tangíveis | pág. 61, Jev 1 |
| 41 | Ativos intangíveis | pág. 61, precedente |
| 42 | Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões) | pág. 28, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 27 + "Financiamentos obtidos" pág. 27
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 1.064.865,16 (balance consolidado 30.06.24). Este .md solo trae el balance CONSOLIDADO (primer año de consolidadas; la P&L que se cargó de él, ventas 16.801.252,67, también es consolidada aunque la carga diga 'individual'). El balance individual 2024 sólo aparece como comparativo en el .md 2024-25: 1.051.946,61 (línea 829, pág. 28). Decidir según el perímetro que se quiera para 2024.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 48, precedente |
| 2 | Venda de Atletas | pág. 48, Jev 1 |
| 3 | Publicidade | pág. 48, precedente |
| 4 | Receitas de Jogos - Lugares Cativos | pág. 48, precedente |
| 5 | Participação nas Competições - Taça da Liga | pág. 48, Jev 1 |
| 6 | Participação nas Competições - Taça de Portugal | pág. 48, Jev 1 |
| 7 | Participação e Liga Portugal | pág. 48, Jev 1 |
| 8 | Participação UEFA Europa Conference League | pág. 48, Jev 1 |
| 9 | Participação nas Competições - Liga Revelação | pág. 48, Jev 0.99 |
| 10 | Receitas de Jogos - Bilhetes | pág. 48, precedente |
| 11 | Direitos Televisivos | pág. 48, precedente |
| 12 | Outras Prestações de Serviços | pág. 48, precedente |
| 13 | LIGA PORTUGUESA DE FUTEBOL PROFISSIONAL | pág. 48, precedente |
| 14 | FEDERAÇÃO PORTUGUESA DE FUTEBOL | pág. 48, precedente |
| 15 | UEFA - DISPENSAÇÃO JOGADORES | pág. 48, ? 0.75 |
| 16 | INSTITUTO EMPREGO FORMAÇÃO PROFISSIONAL | pág. 48, precedente |
| 17 | Outros rendimentos suplementares | pág. 50, precedente |
| 18 | Correções relativas a períodos anteriores | pág. 50, precedente |
| 19 | Outros não especificados | pág. 50, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 25, precedente |
| 2 | Comissões | pág. 49, precedente |
| 3 | Honorários | pág. 49, precedente |
| 4 | Conservação e Reparações | pág. 49, precedente |
| 5 | Publicidade e Propaganda | pág. 49, precedente |
| 6 | Trabalhos especializados | pág. 49, precedente |
| 7 | Serviços bancários | pág. 49, precedente |
| 8 | Deslocações | pág. 49, precedente |
| 9 | Inscrições de Atletas | pág. 49, precedente |
| 10 | Despesas Médicas | pág. 49, precedente |
| 11 | Organização de Jogos | pág. 49, precedente |
| 12 | Material de Ginásio e Treino | pág. 49, precedente |
| 13 | Produtos Energéticos | pág. 49, precedente |
| 14 | Equipamentos Desportivos | pág. 49, precedente |
| 15 | Direitos de Formação | pág. 49, precedente |
| 16 | Empréstimos de Atletas | pág. 49, precedente |
| 17 | Despesas Diversas | pág. 49, precedente |
| 18 | Serviços Scouting | pág. 49, precedente |
| 19 | Seguros | pág. 49, precedente |
| 20 | Rendas e Alugueres | pág. 49, precedente |
| 21 | Contencioso e notariado | pág. 49, precedente |
| 22 | Outros Serviços | pág. 49, precedente |
| 23 | Comunicação | pág. 49, precedente |
| 24 | Limpeza, higiene e conforto | pág. 49, precedente |
| 25 | Electricidade | pág. 49, precedente |
| 26 | Combustíveis | pág. 49, precedente |
| 27 | Água | pág. 49, precedente |
| 28 | Gás | pág. 49, precedente |
| 29 | Resíduos Urbanos | pág. 49, Jev 0.99 |
| 30 | Ferramentas e utensílios de desgaste rápido | pág. 49, Jev 1 |
| 31 | Material de escritório | pág. 49, Jev 1 |
| 32 | Bilhetes | pág. 49, precedente |
| 33 | BILHETES | pág. 49, precedente |
| 34 | Remunerações do Pessoal | pág. 50, precedente |
| 35 | Encargos sobre remunerações | pág. 50, precedente |
| 36 | Seguros acidentes no trabalho e doença | pág. 50, precedente |
| 37 | Outros gastos com o pessoal | pág. 50, precedente |
| 38 | Imparidade de dívidas a receber (perdas/reversões) | pág. 25, precedente |
| 39 | Provisões (aumentos/reduções) | pág. 25, precedente |
| 40 | Impostos | pág. 51, Jev 1 |
| 41 | Correções relativas a períodos anteriores | pág. 51, Jev 1 |
| 42 | Donativos | pág. 51, Jev 0.99 |
| 43 | Quotizações | pág. 51, precedente |
| 44 | Ofertas e amostras de inventários | pág. 51, precedente |
| 45 | Multas e penalidades | pág. 51, precedente |
| 46 | Mecanismo de Solidariedade | pág. 51, precedente |
| 47 | Direitos económicos desportivos | pág. 51, precedente |
| 48 | Outros | pág. 51, Jev 0.99 |
| 49 | Gastos/reversões de depreciação e de amortização | pág. 25, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: año anterior): "Financiamentos obtidos" pág. 13 + "Financiamentos obtidos" pág. 13
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 67.203,73. Balance individual (modelo reducido) 30.06.23.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/wf-src-Relatorio_SDUQ_Final.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/wf-src-Relatorio_SDUQ_Final.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 45, precedente |
| 2 | Venda de Atletas | pág. 45, Jev 1 |
| 3 | Publicidade | pág. 45, precedente |
| 4 | Receitas de Jogos - Lugares Cativos | pág. 45, precedente |
| 5 | Participação nas Competições - Taça de Portugal | pág. 45, Jev 1 |
| 6 | Participação nas Competições - Taça de Portugal | pág. 45, Jev 1 |
| 7 | Receitas de Jogos - Bilhetes | pág. 45, precedente |
| 8 | Direitos Televisivos | pág. 45, precedente |
| 9 | Participação nas Competições - Taça da Liga | pág. 45, Jev 1 |
| 10 | Outras Prestações de Serviços | pág. 45, precedente |
| 11 | Subsídios à exploração | pág. 24, Jev 0.97 |
| 12 | Outros rendimentos suplementares | pág. 47, precedente |
| 13 | Correções relativas a períodos anteriores | pág. 47, precedente |
| 14 | Outros não especificados | pág. 47, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 24, precedente |
| 2 | Comissões | pág. 46, precedente |
| 3 | Honorários | pág. 46, precedente |
| 4 | Conservação e Reparações | pág. 46, precedente |
| 5 | Publicidade e Propaganda | pág. 46, precedente |
| 6 | Trabalhos especializados | pág. 46, precedente |
| 7 | Serviços bancários | pág. 46, precedente |
| 8 | Deslocações | pág. 46, precedente |
| 9 | Inscrições de Atletas | pág. 46, precedente |
| 10 | Despesas Médicas | pág. 46, precedente |
| 11 | Organização de Jogos | pág. 46, precedente |
| 12 | Material de Ginásio e Treino | pág. 46, precedente |
| 13 | Produtos Energéticos | pág. 46, precedente |
| 14 | Equipamentos Desportivos | pág. 46, precedente |
| 15 | Direitos de Formação | pág. 46, precedente |
| 16 | Empréstimos de Atletas | pág. 46, precedente |
| 17 | Despesas Diversas | pág. 46, precedente |
| 18 | Serviços Scouting | pág. 46, precedente |
| 19 | Seguros | pág. 46, precedente |
| 20 | Rendas e Alugueres | pág. 46, precedente |
| 21 | Contencioso e notariado | pág. 46, precedente |
| 22 | Outros Serviços | pág. 46, precedente |
| 23 | Comunicação | pág. 46, precedente |
| 24 | Limpeza, higiene e conforto | pág. 46, precedente |
| 25 | Electricidade | pág. 46, precedente |
| 26 | Combustíveis | pág. 46, precedente |
| 27 | Água | pág. 46, precedente |
| 28 | Gás | pág. 46, precedente |
| 29 | Resíduos Urbanos | pág. 46, Jev 0.99 |
| 30 | Ferramentas e utensílios de desgaste rápido | pág. 46, Jev 1 |
| 31 | Material de escritório | pág. 46, Jev 1 |
| 32 | Bilhetes | pág. 46, precedente |
| 33 | BILHETES | pág. 46, precedente |
| 34 | Remunerações do Pessoal | pág. 46, precedente |
| 35 | Encargos sobre remunerações | pág. 46, precedente |
| 36 | Seguros acidentes no trabalho e doença | pág. 46, precedente |
| 37 | Outros gastos com o pessoal | pág. 46, precedente |
| 38 | Imparidade de dívidas a receber (perdas/reversões) | pág. 24, precedente |
| 39 | Provisões (aumentos/reduções) | pág. 24, precedente |
| 40 | Impostos | pág. 47, Jev 1 |
| 41 | Correções relativas a períodos anteriores | pág. 47, Jev 1 |
| 42 | Donativos | pág. 47, Jev 0.99 |
| 43 | Quotizações | pág. 47, precedente |
| 44 | Ofertas e amostras de inventários | pág. 47, precedente |
| 45 | Multas e penalidades | pág. 47, precedente |
| 46 | Mecanismo de Solidariedade | pág. 47, precedente |
| 47 | Outros | pág. 47, Jev 0.99 |
| 48 | Gastos/reversões de depreciação e de amortização | pág. 24, precedente |
| 49 | Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões) | pág. 24, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2022. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2022 según el registro (periodo.cierre).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 13 + "Financiamentos obtidos" pág. 13; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 13
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Gil Vicente/relatorio-contas-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Gil Vicente/relatorio-contas-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda Merchandising | pág. 46, Claude 0.85 |
| 2 | Venda de Atletas | pág. 46, Jev 1 |
| 3 | Publicidade | pág. 46, Jev 1 |
| 4 | Receitas de Jogos - Lugares Cativos | pág. 46, precedente |
| 5 | Participação nas Competições - Taça de Portugal | pág. 46, Jev 1 |
| 6 | Direitos Televisivos | pág. 46, Jev 1 |
| 7 | Participação nas Competições - Taça da Liga | pág. 46, Jev 1 |
| 8 | Outras Prestações de Serviços | pág. 46, Jev 1 |
| 9 | FEDERAÇÃO PORTUGUESA DE FUTEBOL | pág. 47, precedente |
| 10 | INSTITUTO EMPREGO FORMAÇÃO PROFISSIONAL | pág. 47, Claude 0.85 |
| 11 | LIGA PORTUGUESA DE FUTEBOL PROFISSIONAL | pág. 47, precedente |
| 12 | Outros rendimentos suplementares | pág. 50, Jev 1 |
| 13 | Rendimentos e ganhos em inv. Não financeiros | pág. 50, Jev 0.9 |
| 14 | Correções relativas a períodos anteriores | pág. 50, precedente |
| 15 | Outros rendimentos | pág. 50, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 28, Jev 0.98 |
| 2 | Comissões | pág. 48, precedente |
| 3 | Honorários | pág. 48, Jev 1 |
| 4 | Conservação e Reparações | pág. 48, Jev 0.97 |
| 5 | Publicidade e Propaganda | pág. 48, Jev 1 |
| 6 | Trabalhos especializados | pág. 48, Jev 0.99 |
| 7 | Deslocações | pág. 48, Jev 1 |
| 8 | Inscrições de Atletas | pág. 48, Jev 0.96 |
| 9 | Despesas Médicas | pág. 48, precedente |
| 10 | Organização de Jogos | pág. 48, Jev 1 |
| 11 | Material de Ginásio e Treino | pág. 48, precedente |
| 12 | Produtos Energéticos | pág. 48, precedente |
| 13 | Equipamentos Desportivos | pág. 48, precedente |
| 14 | Despesas Diversas | pág. 48, Jev 1 |
| 15 | Serviços Scouting | pág. 48, precedente |
| 16 | Seguros | pág. 48, Claude 0.85 |
| 17 | Rendas e Alugueres | pág. 48, precedente |
| 18 | Contencioso e notariado | pág. 48, Jev 1 |
| 19 | Outros Serviços | pág. 48, Jev 1 |
| 20 | Comunicação | pág. 48, Jev 1 |
| 21 | Limpeza, higiene e conforto | pág. 48, Jev 1 |
| 22 | Combustíveis | pág. 48, Jev 0.98 |
| 23 | Electricidade | pág. 48, Jev 1 |
| 24 | Água | pág. 48, Jev 1 |
| 25 | Gás | pág. 48, Jev 0.97 |
| 26 | Resíduos Urbanos | pág. 48, Claude 0.8 |
| 27 | Material de escritório | pág. 48, Jev 1 |
| 28 | Ferramentas e utensílios de desgaste rápido | pág. 48, Jev 1 |
| 29 | Artigos para oferta | pág. 48, Jev 0.98 |
| 30 | ADMINISTRATIVOS | pág. 49, Jev 0.91 |
| 31 | JOGADORES | pág. 49, Jev 1 |
| 32 | TREINADORES | pág. 49, Jev 0.97 |
| 33 | SUBSÍDIO DE ALIMENTAÇÃO-ADM | pág. 49, Claude 0.85 |
| 34 | Encargos sobre remunerações | pág. 49, Jev 0.93 |
| 35 | Seguros acidentes no trabalho e doença | pág. 49, Jev 0.93 |
| 36 | Outros gastos com o pessoal | pág. 49, precedente |
| 37 | Imparidade de dívidas a receber (perdas/reversões) | pág. 28, Jev 0.99 |
| 38 | Provisões (aumentos/reduções) | pág. 28, Jev 0.98 |
| 39 | Direitos económicos desportivos | pág. 50, precedente |
| 40 | Impostos | pág. 50, Jev 0.92 |
| 41 | Correções relativas a períodos anteriores | pág. 50, Jev 0.99 |
| 42 | Quotizações | pág. 50, precedente |
| 43 | Ofertas e amostras de inventários | pág. 50, precedente |
| 44 | Ofertas e amostras de inventários | pág. 50, precedente |
| 45 | Multas e penalidades | pág. 50, Jev 0.96 |
| 46 | Outras diversos | pág. 50, Jev 1 |
| 47 | Gastos/reversões de depreciação e de amortização | pág. 28, precedente |
| 48 | Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões) | pág. 28, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 17 + "Financiamentos obtidos" pág. 17; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 17
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2020–21 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Gil Vicente".
```

## Fuentes

### gilvicente-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### gilvicente-pt-relatorio-contas-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/relatorio-contas-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### gilvicente-pt-wf-src-relatorio-sduq-final

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/wf-src-Relatorio_SDUQ_Final.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### gilvicente-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### gilvicente-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Gil Vicente/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
