# leixoes-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/leixoes-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Leixoes: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.pdf. brandColor #FF0000
(procedencia en Admin/sourcing/Portugal/Leixoes.md; tools/cargar-lote.mjs).
```

```text
data/pt/leixoes-pt-data.js — Leixões Sport Clube - Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "leixoes-pt" — slug de "Leixoes" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Leixões Sport Clube - Futebol, SAD" — respuesta de Guido en la cola (cb435b1)
  displayName        ok        "Leixoes" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (115 de 115 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 72 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (115 de 115 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "leixoes-pt-relatorio-de-gestao-e-contas-2024-2025" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Leixões"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"leixoes-pt-relatorio-de-gestao-e-contas-2024-2025"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de Bens | pág. 17, precedente |
| 2 | Prestação de Serviços | pág. 17, precedente |
| 3 | Subsídios à exploração | pág. 5, Jev 0.97 |
| 4 | Rendimentos e Ganhos em Investimento | pág. 19, precedente |
| 5 | Outros | pág. 19, precedente |
| 6 | Correcções relativas a períodos anteriores | pág. 19, precedente |
| 7 | Distribuição de Lucros Placard | pág. 19, Jev 0.96 |
| 8 | Cedência desportiva de jogadores | pág. 19, Jev 0.98 |
| 9 | Direitos de Formação | pág. 19, precedente |
| 10 | Empréstimo de Jogadores | pág. 19, Jev 0.98 |
| 11 | Jogos On-line | pág. 19, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 5, Jev 0.98 |
| 2 | Serviços Especializados | pág. 18, Jev 0.98 |
| 3 | Materiais | pág. 18, precedente |
| 4 | Energia e Fluidos | pág. 18, Jev 1 |
| 5 | Deslocações, Estadas e Transportes | pág. 18, Jev 1 |
| 6 | Rendas e Alugueres | pág. 18, precedente |
| 7 | Comunicação | pág. 18, Jev 1 |
| 8 | Seguros | pág. 18, Jev 0.9 |
| 9 | Contencioso e Notariado | pág. 18, Jev 1 |
| 10 | Outros Serviços | pág. 18, Jev 1 |
| 11 | Remunerações | pág. 18, Jev 0.95 |
| 12 | Indeminizações | pág. 18, precedente |
| 13 | Encargos Sociais | pág. 18, precedente |
| 14 | Seguros de Ac. Trabalho | pág. 18, Jev 0.95 |
| 15 | Outros Gastos | pág. 18, Jev 0.98 |
| 16 | Imparidade de dívidas a receber (perdas/reversões) | pág. 5, Jev 0.99 |
| 17 | Provisões (aumentos/reduções) | pág. 5, precedente |
| 18 | Impostos | pág. 19, Jev 1 |
| 19 | Correcções relativas a períodos anteriores | pág. 19, Jev 1 |
| 20 | Outros não especificados | pág. 19, Jev 1 |
| 21 | Despesas não documentadas | pág. 19, Jev 0.99 |
| 22 | Outros | pág. 19, Jev 1 |
| 23 | Edifícios e Outras Construções | pág. 20, Jev 1 |
| 24 | Equipamento Básico | pág. 20, Jev 1 |
| 25 | Equipamento de Transporte | pág. 20, Jev 1 |
| 26 | Equipamento Administrativo | pág. 20, Jev 0.99 |
| 27 | Outros Ativos Fixos Tangíveis | pág. 20, Jev 1 |
| 28 | Marca | pág. 20, Claude 0.8 |
| 29 | Plantel | pág. 20, Jev 0.95 |
| 30 | Imparidade de activos depreciáveis / amortizáveis (perdas/reversões) | pág. 5, Jev 0.98 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 2 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 4
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Financiamentos obtidos no corriente 134.905,94 + corriente 3.030.950,00. Balance individual SAD. La nota 12 los clasifica como 'Participantes de capital' (préstamos de socios: Anderson Gonçalves 1.941.000 y Effort Premier 60.000 recibidos en 2024/25).
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Leixões".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2023-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2023-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de Bens | pág. 20, precedente |
| 2 | Prestação de Serviços | pág. 20, precedente |
| 3 | Subsídios à exploração | pág. 6, precedente |
| 4 | Rendimentos e Ganhos em Investimento | pág. 22, precedente |
| 5 | Outros | pág. 22, precedente |
| 6 | Correcções relativas a períodos anteriores | pág. 22, precedente |
| 7 | Distribuição de Lucros Placard | pág. 22, precedente |
| 8 | Cedência desportiva de jogadores | pág. 22, precedente |
| 9 | Direitos de Formação | pág. 22, precedente |
| 10 | Jogos On-line | pág. 22, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 21, Jev 0.98 |
| 2 | Serviços Especializados | pág. 21, precedente |
| 3 | Materiais | pág. 21, precedente |
| 4 | Energia e Fluídos | pág. 21, precedente |
| 5 | Deslocações, Estadas e Transportes | pág. 21, precedente |
| 6 | Rendas e Alugueres | pág. 21, precedente |
| 7 | Comunicação | pág. 21, precedente |
| 8 | Seguros | pág. 21, precedente |
| 9 | Contencioso e Notariado | pág. 21, precedente |
| 10 | Outros Serviços | pág. 21, precedente |
| 11 | Remunerações | pág. 21, precedente |
| 12 | Indemnizações | pág. 21, precedente |
| 13 | Encargos Sociais | pág. 21, precedente |
| 14 | Seguros de Ac. Trabalho | pág. 21, precedente |
| 15 | Outros Gastos | pág. 21, precedente |
| 16 | Imparidade de dívidas a receber (perdas/reversões) | pág. 6, precedente |
| 17 | Provisões (aumentos/reduções) | pág. 6, precedente |
| 18 | Impostos | pág. 22, precedente |
| 19 | Correcções relativas a períodos anteriores | pág. 22, precedente |
| 20 | Donativos | pág. 22, Jev 0.99 |
| 21 | Outros não especificados | pág. 22, precedente |
| 22 | Despesas não documentadas | pág. 22, precedente |
| 23 | Outros | pág. 22, precedente |
| 24 | Edificios e Outras Construções | pág. 23, precedente |
| 25 | Equipamento Básico | pág. 23, precedente |
| 26 | Equipamento de Transporte | pág. 23, precedente |
| 27 | Equipamento Administrativo | pág. 23, precedente |
| 28 | Marca | pág. 23, precedente |
| 29 | Plantel | pág. 23, precedente |
| 30 | Imparidade de activos depreciáveis / amortizáveis (perdas/reversões) | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Clientes" pág. 5 + "Estado e outros entes públicos" pág. 5 + "Outros créditos a receber" pág. 5 + "Diferimentos" pág. 5 + "Caixa e depósitos bancários" pág. 5 — CORREGIDO 2026-10-17: cash vaciado; esas filas suman el total del activo corriente, no la caja (to-do 260 c)
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 1b (compuerta: año anterior): "Caixa e depósitos bancários" pág. 5
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 5 + "Financiamentos obtidos" pág. 5
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Leixões".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Venda de Bens | pág. 19, precedente |
| 2 | Prestação de Serviços | pág. 19, precedente |
| 3 | Subsídios à exploração | pág. 5, precedente |
| 4 | Rendimentos e Ganhos em Investimento | pág. 21, precedente |
| 5 | Outros | pág. 21, precedente |
| 6 | Correcções relativas a períodos anteriores | pág. 21, precedente |
| 7 | Distribuição de Lucros Placard | pág. 21, precedente |
| 8 | Cedência desportiva de jogadores | pág. 21, precedente |
| 9 | Direitos de Formação | pág. 21, precedente |
| 10 | Empréstimo de Jogadores | pág. 21, precedente |
| 11 | Jogos On-line | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Serviços Especializados | pág. 20, precedente |
| 2 | Materiais | pág. 20, precedente |
| 3 | Energia e Fluidos | pág. 20, precedente |
| 4 | Deslocações, Estadas e Transportes | pág. 20, precedente |
| 5 | Rendas e Alugueres | pág. 20, precedente |
| 6 | Comunicação | pág. 20, precedente |
| 7 | Seguros | pág. 20, precedente |
| 8 | Contencioso e Notariado | pág. 20, precedente |
| 9 | Outros Serviços | pág. 20, precedente |
| 10 | Remunerações | pág. 20, precedente |
| 11 | Encargos Sociais | pág. 20, precedente |
| 12 | Seguros de Ac. Trabalho | pág. 20, precedente |
| 13 | Outros Gastos | pág. 20, precedente |
| 14 | Imparidade de dívidas a receber (perdas/reversões) | pág. 5, precedente |
| 15 | Provisões (aumentos/reduções) | pág. 5, precedente |
| 16 | Impostos | pág. 21, precedente |
| 17 | Correcções relativas a períodos anteriores | pág. 21, precedente |
| 18 | Quotizações | pág. 21, precedente |
| 19 | Outros não especificados | pág. 21, precedente |
| 20 | Despesas não documentadas | pág. 21, precedente |
| 21 | Edifícios e Outras Construções | pág. 22, precedente |
| 22 | Equipamento Básico | pág. 22, precedente |
| 23 | Equipamento de Transporte | pág. 22, precedente |
| 24 | Equipamento Administrativo | pág. 22, precedente |
| 25 | Marca | pág. 22, precedente |
| 26 | Plantel | pág. 22, precedente |
| 27 | Imparidade de activos depreciáveis / amortizáveis (perdas/reversões) | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 4
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 4 + "Financiamentos obtidos" pág. 4
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Leixões".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-19.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
André Gonçalves Fernandes de Castro (2020-08-28 a hoy): Sucedió a Paulo Lopo (que sigue de presidente de la mesa de la asamblea general y accionista principal) en la presidencia de la SAD; el club lo anunció el 28/8/2020 (maisfutebol; Renascença y RTP lo dan igual, sin día de toma de posesión): se usa la fecha del anuncio. Venía de director deportivo y fue promovido a administrador en mayo de 2020. Los tres balances lo nombran presidente del conselho de administração al cierre del ejercicio: Relatorio-e-Contas-Consolidado-2022-2023.md:73 y :933, Relatorio-e-Contas-Consolidado-2023-2024.md:118 y :1106, Relatorio-de-Gestao-e-Contas-2024-2025.md:83 y :979; el acta de aprobación 2024/25 (asamblea del 15/10/2025) lo identifica como 'Presidente do Conselho de Administração' (2024-2025.md:1568). Las firmas son 'A Administração' sin nombre. Sigue en el cargo según la página oficial de la SAD (leixoessad.pt/institucional-leixoes-sc-futebol-sad/). Jorge Moreira, presidente del club, es administrador no ejecutivo por estatutos. Sin cambio de gestión entre cierre y aprobación de ninguno de los tres balances.
Duda: El día exacto de la toma de posesión de Castro no figura en las fuentes: 28/8/2020 es el del anuncio del club; no afecta a ningún cierre.
Duda: El informe 2024/25 dice que Aliya Capital Partners (EE.UU.) es socio desde el 1/7/2025 y la prensa habla de compra de una posición mayoritaria; no hallé nota de que Castro haya dejado la presidencia, así que la gestión queda abierta. Posterior a todos los cierres cargados.
Duda: O Jogo (no accesible: 403) titula que Castro pasó a ser dueño de la empresa que gestiona la SAD (Play-fair); no se pudo leer el detalle del porcentaje.
```

## Fuentes

### leixoes-pt-relatorio-de-gestao-e-contas-2024-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Leixoes/Relatorio-de-Gestao-e-Contas-2024-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### leixoes-pt-relatorio-e-contas-consolidado-2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### leixoes-pt-relatorio-e-contas-consolidado-2023-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Leixoes/Relatorio-e-Contas-Consolidado-2023-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
