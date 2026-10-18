# vizela-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/vizela-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Vizela: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.pdf. brandColor #00A3E0
(procedencia en Admin/sourcing/Portugal/Vizela.md; tools/cargar-lote.mjs).
```

```text
data/pt/vizela-pt-data.js — Futebol Clube de Vizela - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "vizela-pt" — slug de "Vizela" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Vizela - Futebol, SAD" — respuesta de Guido en la cola (3bf97d4)
  displayName        ok        "Vizela" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (87 de 89 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 145 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (87 de 89 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "vizela-pt-relatorio-e-contas-2024-25-fcv" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"vizela-pt-relatorio-e-contas-2024-25-fcv"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 19, Jev 1 |
| 2 | Receitas de bilheteira | pág. 19, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 19, Jev 1 |
| 4 | Receitas de televisão | pág. 19, Jev 1 |
| 5 | Merchandising | pág. 19, Jev 1 |
| 6 | Competições da UEFA e nacionais | pág. 19, Jev 1 |
| 7 | Cedência de jogadores | pág. 19, Jev 1 |
| 8 | Outros | pág. 19, precedente |
| 9 | Município de Vizela | pág. 30, Claude 0.8 |
| 10 | I.E.F.P | pág. 30, Claude 0.85 |
| 11 | Outras entidades (UEFA/FPF) | pág. 30, precedente |
| 12 | Outros rendimentos suplementares | pág. 36, Jev 1 |
| 13 | Subsídio deslocação | pág. 36, Jev 1 |
| 14 | Distribuição de lucros Placard eapostas on-line | pág. 36, Claude 0.85 |
| 15 | Outros | pág. 36, precedente |
| 16 | Gastos/rendimentos com transações de passes de atletas | pág. 19, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 19, Jev 0.97 |
| 2 | Subcontratos | pág. 35, Jev 0.98 |
| 3 | Serviços especializados | pág. 35, Jev 0.98 |
| 4 | Materiais | pág. 35, Claude 0.8 |
| 5 | Energia e fluidos | pág. 35, Jev 1 |
| 6 | Deslocações, estadas e transportes | pág. 35, Jev 1 |
| 7 | Serviços diversos | pág. 35, Jev 0.96 |
| 8 | Remunerações órgãos sociais | pág. 36, Jev 1 |
| 9 | Remunerações pessoal | pág. 36, precedente |
| 10 | Indemnizações | pág. 36, precedente |
| 11 | Encargos sobre remunerações | pág. 36, Jev 0.97 |
| 12 | Seguros | pág. 36, precedente |
| 13 | Outros gastos com pessoal | pág. 36, precedente |
| 14 | Imparidade de dívidas a receber (perdas/reversões) | pág. 19, Jev 0.99 |
| 15 | Provisões (aumentos / reduções) | pág. 19, Jev 0.98 |
| 16 | Impostos | pág. 37, Jev 0.92 |
| 17 | Multas e outras penalidades | pág. 37, Jev 0.99 |
| 18 | Outros | pág. 37, Jev 0.99 |
| 19 | Gastos/reversões de depreciação e de amortização(excluindo passes de jogadores) | pág. 19, Claude 0.85 |
| 20 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 19, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin filas de financiamientos en el pasivo; balance completo con Total do Passivo. Balance sin fila de financiamentos; Total do Passivo 2.329.453. Las dívidas por traspasos no son deuda financiera.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 82,822. Balance de la SAD, euros enteros.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-Gestao-e-contas-FCV-2023-24-Ass.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vizela/Relatorio-Gestao-e-contas-FCV-2023-24-Ass.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 21, precedente |
| 2 | Receitas de bilheteira | pág. 21, precedente |
| 3 | Patrocínios, publicidade e corporate | pág. 21, precedente |
| 4 | Receitas de televisão | pág. 21, precedente |
| 5 | Merchandising | pág. 21, precedente |
| 6 | Competições da UEFA e nacionais | pág. 21, precedente |
| 7 | Cedência de jogadores | pág. 21, precedente |
| 8 | Outros | pág. 21, precedente |
| 9 | Município de Vizela | pág. 31, precedente |
| 10 | I.E.F.P | pág. 31, precedente |
| 11 | Outras entidades (UEFA) | pág. 31, Claude 0.93 |
| 12 | Outros rendimentos suplementares | pág. 37, precedente |
| 13 | Subsídio deslocação | pág. 37, precedente |
| 14 | Distribuição de lucros Placard | pág. 37, Jev 1 |
| 15 | Outros | pág. 37, precedente |
| 16 | Gastos/rendimentos com transações de passes de atletas | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 21, precedente |
| 2 | Subcontratos | pág. 36, precedente |
| 3 | Serviços especializados | pág. 36, precedente |
| 4 | Materiais | pág. 36, precedente |
| 5 | Energia e fluídos | pág. 36, precedente |
| 6 | Deslocações, estadas e transportes | pág. 36, precedente |
| 7 | Serviços diversos | pág. 36, precedente |
| 8 | Remunerações orgãos sociais | pág. 36, precedente |
| 9 | Remunerações pessoal | pág. 36, precedente |
| 10 | Encargos sobre remunerações | pág. 36, precedente |
| 11 | Seguros | pág. 36, precedente |
| 12 | Outros gastos com pessoal | pág. 36, precedente |
| 13 | Imparidade de dívidas a receber (perdas/reversões) | pág. 21, precedente |
| 14 | Provisões (aumentos / reduções) | pág. 21, precedente |
| 15 | Impostos | pág. 38, precedente |
| 16 | Multas e outras penalidades | pág. 38, precedente |
| 17 | Outros | pág. 38, precedente |
| 18 | Gastos/reversões de depreciação e de amortização (excluindo passes de jogadores) | pág. 21, precedente |
| 19 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 21, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 2 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 20
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin filas de financiamientos en el pasivo; balance completo con Total do Passivo. Balance sin fila de financiamentos; Total do Passivo 3.915.186. Las dívidas por traspasos no son deuda financiera.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-e-Contas-FCV-2022-23_Aprovadas.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vizela/Relatorio-e-Contas-FCV-2022-23_Aprovadas.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Quotizações | pág. 21, Jev 1 |
| 2 | Receitas de bilheteira | pág. 21, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 21, Jev 1 |
| 4 | Receitas de televisão | pág. 21, Jev 1 |
| 5 | Merchandising | pág. 21, Jev 1 |
| 6 | Competições da UEFA e nacionais | pág. 21, Jev 1 |
| 7 | Cedência de jogadores | pág. 21, Jev 1 |
| 8 | Outros | pág. 21, precedente |
| 9 | Município de Vizela | pág. 31, Claude 0.8 |
| 10 | I.E.F.P | pág. 31, Claude 0.85 |
| 11 | Outras entidades | pág. 31, Jev 0.99 |
| 12 | Outros rendimentos e ganhos | pág. 21, Jev 1 |
| 13 | Gastos/rendimentos com transações de passes de atletas | pág. 21, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 21, Jev 0.97 |
| 2 | Subcontratos | pág. 36, Jev 0.98 |
| 3 | Serviços especializados | pág. 36, Jev 0.98 |
| 4 | Materiais | pág. 36, Claude 0.8 |
| 5 | Energia e fluídos | pág. 36, Jev 1 |
| 6 | Deslocações, estadas e transportes | pág. 36, Jev 1 |
| 7 | Serviços diversos | pág. 36, Jev 0.96 |
| 8 | Remunerações órgãos sociais | pág. 37, Jev 1 |
| 9 | Remunerações pessoal | pág. 37, precedente |
| 10 | Encargos sobre remunerações | pág. 37, Jev 0.97 |
| 11 | Seguros | pág. 37, precedente |
| 12 | Outros gastos com pessoal | pág. 37, precedente |
| 13 | Imparidade de dívidas a receber (perdas/reversões) | pág. 21, Jev 0.99 |
| 14 | Impostos | pág. 38, Jev 0.92 |
| 15 | Multas e outras penalidades | pág. 38, Jev 0.99 |
| 16 | Outros | pág. 38, Jev 0.99 |
| 17 | Gastos/reversões de depreciação e de amortização (excluindo passes de jogadores) | pág. 21, Claude 0.85 |
| 18 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 21, Jev 0.97 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin filas de financiamientos en el pasivo; balance completo con Total do Passivo. Fila Financiamentos obtidos impresa con 0,00; Total do Passivo 4.131.029,54 sin otras filas financieras.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 34,828.25. Balance de la SAD.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Vizela/Relatorio-Contas-FCV-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Vizela/Relatorio-Contas-FCV-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas e Serviços Prestados | pág. 8, Jev 0.95 |
| 2 | Subsídios à exploração | pág. 8, Jev 0.95 |
| 3 | Outros Rendimentos | pág. 8, Jev 0.92 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo Merc Vend e Matérias Consumidas | pág. 7, Claude 0.93 |
| 2 | Fornecimentos e Serviços Externos | pág. 7, Jev 0.99 |
| 3 | Gastos com Pessoal | pág. 7, Jev 0.9 |
| 4 | Gastos de Depreciação e Amortização | pág. 7, precedente |
| 5 | Outros Gastos e Perdas | pág. 7, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-16): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Estadio, Televisión, Premios por competencias, Venta de Jugadores
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin filas de financiamientos en el pasivo; balance completo con Total do Passivo. Balance de la SAD completo (Total do Passivo 1.870.586,08) sin ninguna fila financiera; los "Outros instrumentos de capital próprio" son patrimonio.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Vizela".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-30.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Diogo Godinho de Faria dos Santos (2016-01-01 a 2022-09-17): Presidente del conselho de administração de la SAD desde 2016, cuando la ampliación de capital dio el 80% a SECA (Edmund Chu; asamblea del 5/11/2016): Mais Futebol (17/9/2022) dice solo 'desde 2016', por eso desde 2016-01-01 (día y mes por convención, no son la fecha real). Salió al asumir Joaquim Ribeiro en la asamblea general de la SAD del 17/9/2022 (Mais Futebol; Relatorio-e-Contas-FCV-2022-23_Aprovadas.md:118 confirma 'Assembleia Geral de 17 de setembro de 2022, ata nº 15'). Digital de Vizela dice que su salida oficial fue el 15/9. El balance al 30/6/2022 lo cita como Presidente en Relatorio-Contas-FCV-2021-22.md:63 (Diogo Godinho de Faria dos Santos).
Joaquim Fernando de Almeida Ribeiro (2022-09-17 a 2025-06-03): Nombrado presidente en la asamblea general del 17/9/2022 (Mais Futebol, publicado ese día; Relatorio-e-Contas-FCV-2022-23_Aprovadas.md:118 y :85 'Presidente: Joaquim Fernando de Almeida Ribeiro'). Dejó la presidencia y el consejo 'a partir del 3 de junho' de 2025 por motivos personales (comunicado del club del 2/6/2025). Firma los cierres 2023 y 2024: Relatorio-e-Contas-FCV-2022-23_Aprovadas.md:85 (informe del 25/10/2023) y Relatorio-Gestao-e-contas-FCV-2023-24-Ass.md:83 (informe del 23/10/2024). AVISO: el balance 2022/23 (30/6/2023) se redactó bajo su gestión, pero el 30/6/2024 también; ningún cambio entre cierre y aprobación.
Pedro Jorge da Silva Rodrigues (2025-06-03 a 2026-06-30): Vicepresidente desde 2022, asumió la presidencia al salir Ribeiro (3/6/2025, comunicado del club del 2/6/2025). Presidente en Relatorio-e-Contas-2024-25-FCV.md:87 (informe del 23/10/2025). AVISO: la gestión cambió ENTRE el cierre y la aprobación solo en el sentido de que Rodrigues ya presidía el 30/6/2025 (asumió 3/6/2025, antes del cierre), así que no hay desfase. Anunció su salida para fines de junio de 2026 (A Bola, 29/5/2026; Wikipedia: 'fin de junio de 2026'); el 'hasta' 2026-06-30 es aproximado (no se halló fecha exacta) y no afecta ningún cierre. Su sucesor, João Ribas (agosto de 2026), no tiene ejercicio cargado: no se carga.
Duda: Fecha exacta de asunción de Diogo Godinho en 2016 (la fuente da solo el año; la ampliación de capital con SECA fue el 5/11/2016): no afecta ningún cierre cargado.
Duda: Fecha exacta de salida de Pedro Rodrigues en 2026: A Bola/Record anunciaron su salida para fines de junio de 2026; 'hasta' 2026-06-30 es aproximado. No afecta ningún cierre.
Duda: La salida de Godinho: Digital de Vizela dice 15/9/2022 y la asamblea que nombra a Ribeiro es del 17/9/2022; se usa el 17/9 (acta nº 15 del propio informe). No afecta ningún cierre.
Duda: La fuente de Pedro Rodrigues es la página de etiqueta del sitio oficial (fcvizela.pt/tag/pedro-rodrigues/), no la nota individual del comunicado del 2/6/2025.
```

## Fuentes

### vizela-pt-relatorio-e-contas-2024-25-fcv

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Vizela/Relatorio-e-Contas-2024-25-FCV.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vizela-pt-relatorio-e-contas-fcv-2022-23-aprovadas

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Vizela/Relatorio-e-Contas-FCV-2022-23_Aprovadas.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vizela-pt-relatorio-contas-fcv-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Vizela/Relatorio-Contas-FCV-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### vizela-pt-relatorio-gestao-e-contas-fcv-2023-24-ass

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Vizela/Relatorio-Gestao-e-contas-FCV-2023-24-Ass.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
