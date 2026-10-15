# rioave-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/rioave-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Rio Ave: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2017-18.pdf. brandColor #007700
(procedencia en Admin/sourcing/Portugal/Rio Ave.md; tools/cargar-lote.mjs).
```

```text
data/pt/rioave-pt-data.js — Rio Ave Futebol Clube – Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Rio Ave/relatorio-contas-2017-18.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "rioave-pt" — slug de "Rio Ave" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Rio Ave Futebol Clube – Futebol SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el alta no detecta nombre (el .md de
  displayName        ok        "Rio Ave" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no
  sport              ok        "futbol" — el .md nombra el fútbol 103 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2018 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el docum
  cierre             ok        "2018-06-30" — año del ejercicio + mes de cierre (ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): e
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2018-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2018-06-30 = 0.85778 (Tipo de referencia del Banco Central Europeo, última rueda hábil a
  sourceId           ok        "rioave-pt-relatorio-contas-2017-18" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2017–18 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave"

FISCAL YEAR META PROPUESTO para 2018 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2018: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2018-06-30","sourceId":"rioave-pt-relatorio-contas-2017-18"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Total Vendas | pág. 36, precedente |
| 2 | Bilheteira | pág. 36, Jev 1 |
| 3 | Direitos Televisivos | pág. 36, Jev 1 |
| 4 | Patrocínio e Publicidade | pág. 36, Jev 1 |
| 5 | Atividades Comerciais | pág. 36, Jev 0.91 |
| 6 | Outros Rendimentos de Exploração | pág. 36, Jev 0.99 |
| 7 | Subsidios à Exploração contribuições da UEFA e prémios monetários | pág. 11, precedente |
| 8 | Royalties | pág. 38, Jev 0.92 |
| 9 | Competições UEFA- Solidariedade | pág. 38, Jev 0.95 |
| 10 | Participação nas Competições Nacionais | pág. 38, Jev 1 |
| 11 | Apostas Desportivas | pág. 38, Jev 0.95 |
| 12 | Cedência de Jogadores | pág. 38, Jev 0.99 |
| 13 | Venda de Direitos Desportivos | pág. 38, Jev 1 |
| 14 | Mecanismo de Solidariedade | pág. 38, precedente |
| 15 | Outros | pág. 38, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 11, precedente |
| 2 | Subcontratos | pág. 36, precedente |
| 3 | Trabalhos especializados | pág. 36, Jev 0.95 |
| 4 | Vigilância e segurança | pág. 36, Jev 0.91 |
| 5 | Honorários | pág. 36, Jev 0.99 |
| 6 | Gastos honorários a agentes desportivos | pág. 37, precedente |
| 7 | Outras Comissões | pág. 37, precedente |
| 8 | Conservação e reparação | pág. 36, Jev 0.96 |
| 9 | Outros serviços especializados | pág. 36, precedente |
| 10 | Ferramentas e utensílios de desgaste rápido | pág. 36, Claude 0.8 |
| 11 | Livros e Documentação Técnica | pág. 36, Jev 0.99 |
| 12 | Material de escritório | pág. 36, Jev 1 |
| 13 | Artigos para oferta | pág. 36, precedente |
| 14 | Equipamento Desportivo | pág. 36, precedente |
| 15 | Medicamentos e Artigos de Saúde | pág. 36, Jev 0.99 |
| 16 | Outros materiais | pág. 37, precedente |
| 17 | Eletricidade | pág. 37, Jev 1 |
| 18 | Combustíveis | pág. 37, Jev 0.99 |
| 19 | Outras energias e fluidos | pág. 37, precedente |
| 20 | Deslocações e estadas | pág. 37, Jev 0.95 |
| 21 | Rendas e alugueres | pág. 37, precedente |
| 22 | Comunicação | pág. 37, Jev 1 |
| 23 | Seguros | pág. 37, Jev 0.9 |
| 24 | Contencioso e Notariado | pág. 37, Jev 0.97 |
| 25 | Limpeza, higiene e conforto | pág. 37, Jev 0.99 |
| 26 | Outros serviços diversos | pág. 37, Jev 0.98 |
| 27 | Remunerações do pessoal | pág. 37, precedente |
| 28 | Indemnizações | pág. 37, precedente |
| 29 | Encargos s/ remunerações | pág. 37, precedente |
| 30 | Seguros de acidentes no trabalho e doenças profissionais | pág. 37, precedente |
| 31 | Gastas cedências temporárias jogadores | pág. 37, precedente |
| 32 | Mecanismo de Solidariedade | pág. 37, Jev 0.9 |
| 33 | Outros gastos | pág. 37, Jev 0.99 |
| 34 | Imparidade de dívidas a receber (perdas/reversões) | pág. 11, Jev 0.96 |
| 35 | Provisões (aumentos/reduções) | pág. 11, Jev 0.92 |
| 36 | Imparidade de investimentos não depreciáveis/amortizações (perdas/reversões) | pág. 11, precedente |
| 37 | Quotizações/Inscrições | pág. 39, precedente |
| 38 | Impostos | pág. 39, Jev 0.93 |
| 39 | Multas e Penalidades | pág. 39, Jev 0.98 |
| 40 | Abates e Alienações | pág. 39, precedente |
| 41 | Outros Gastos e Perdas | pág. 39, Jev 0.97 |
| 42 | Ativos fixos tangíveis | pág. 39, Jev 0.96 |
| 43 | Ativos intangíveis | pág. 39, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2025-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 35, precedente |
| 2 | Direitos Televisivos | pág. 35, precedente |
| 3 | Patrocínio e Publicidade | pág. 35, precedente |
| 4 | Atividades Comerciais | pág. 35, precedente |
| 5 | Subsídios à Exploração | pág. 14, precedente |
| 6 | Royalties | pág. 37, precedente |
| 7 | Participação nas Competições Nacionais | pág. 37, precedente |
| 8 | Apostas Desportivas | pág. 37, precedente |
| 9 | Cedência de Jogadores | pág. 37, precedente |
| 10 | Venda de Direitos Desportivos | pág. 37, precedente |
| 11 | Indemnizações AT | pág. 37, precedente |
| 12 | Mecanismo de Solidariedade | pág. 37, precedente |
| 13 | Outros | pág. 37, precedente |
| 14 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, precedente |
| 15 | Imparidade de investimentos não depreciáveis/amortizações (perdas/reversões) | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 35, precedente |
| 2 | Trabalhos especializados | pág. 35, precedente |
| 3 | Vigilância e segurança | pág. 35, precedente |
| 4 | Honorários | pág. 35, precedente |
| 5 | Gastos honorários a agentes desportivos | pág. 36, precedente |
| 6 | Outras Comissões | pág. 36, precedente |
| 7 | Conservação e reparação | pág. 35, precedente |
| 8 | Outros serviços especializados | pág. 35, precedente |
| 9 | Ferramentas e utensílios de desgaste rápido | pág. 35, precedente |
| 10 | Livros e Documentação Técnica | pág. 35, precedente |
| 11 | Material de escritório | pág. 35, precedente |
| 12 | Artigos para oferta | pág. 35, precedente |
| 13 | Equipamento Desportivo | pág. 35, precedente |
| 14 | Medicamentos e Artigos de Saúde | pág. 35, precedente |
| 15 | Outros materiais | pág. 35, precedente |
| 16 | Eletricidade | pág. 35, precedente |
| 17 | Combustíveis | pág. 36, precedente |
| 18 | Outras energias e fluidos | pág. 36, precedente |
| 19 | Deslocações e estadas | pág. 36, precedente |
| 20 | Rendas e alugueres | pág. 36, precedente |
| 21 | Comunicação | pág. 36, precedente |
| 22 | Seguros | pág. 36, precedente |
| 23 | Limpeza, higiene e conforto | pág. 36, precedente |
| 24 | Outros serviços diversos | pág. 36, precedente |
| 25 | Remunerações do pessoal | pág. 36, precedente |
| 26 | Indemnizações | pág. 36, precedente |
| 27 | Encargos s/ remunerações | pág. 36, precedente |
| 28 | Seguros de acidentes no trabalho e doenças profissionais | pág. 36, precedente |
| 29 | Mecanismo de Solidariedade | pág. 36, precedente |
| 30 | Outros gastos | pág. 36, precedente |
| 31 | Provisões (aumentos/reduções) | pág. 14, precedente |
| 32 | Quotizações/Inscrições | pág. 37, precedente |
| 33 | Impostos | pág. 37, precedente |
| 34 | Multas e Penalidades | pág. 37, precedente |
| 35 | Alienações | pág. 37, Claude 0.8 |
| 36 | Abates | pág. 38, precedente |
| 37 | Donativos | pág. 38, precedente |
| 38 | Outros Gastos e Perdas | pág. 38, precedente |
| 39 | Ativos fixos tangíveis | pág. 38, precedente |
| 40 | Ativos intangíveis | pág. 38, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2024-06-30
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 4,89. Claude 2026-10-15 (lote 76): reversión de imparidad (en el PDF sin signo menos, pág. 14 del visor). Pasa al lado del ingreso con valor positivo porque cargar.mjs toma el valor absoluto de un ajuste fila de gasto negativo (verificar sí cerraba con -X como gasto): el efecto en el resultado es el mismo (to-do 237 l)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 2.500,00. Claude 2026-10-15 (lote 76): reversión de imparidad (en el PDF sin signo menos, pág. 14 del visor). Pasa al lado del ingreso con valor positivo porque cargar.mjs toma el valor absoluto de un ajuste fila de gasto negativo (verificar sí cerraba con -X como gasto): el efecto en el resultado es el mismo (to-do 237 l)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = 115.896,16. Claude 2026-10-15 (lote 76, revisado en la imagen de la pág. 14): el .md perdió los signos y la lectura sumaba los intereses obtenidos como costo (financiero 0,317495 en vez del neto -0,085703); con los dos el resultado da el impreso -5.863.187,66
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): fila = -201.599,08. Claude 2026-10-15 (lote 76, revisado en la imagen de la pág. 14): el .md perdió los signos y la lectura sumaba los intereses obtenidos como costo (financiero 0,317495 en vez del neto -0,085703); con los dos el resultado da el impreso -5.863.187,66
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 692 047,70. Claude 2026-10-15 (lote 76): confirmado mirando la imagen de la página 14 del visor (impreso 2 al pie), escaneo sin texto propio; además el EBITDA y el resultado impresos cierran con estos importes
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 2 500,00. Claude 2026-10-15 (lote 76): confirmado mirando la imagen de la página 14 del visor (impreso 2 al pie), escaneo sin texto propio; además el EBITDA y el resultado impresos cierran con estos importes
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 5 539 966,65. Claude 2026-10-15 (lote 76): confirmado mirando la imagen de la página 14 del visor (impreso 2 al pie), escaneo sin texto propio; además el EBITDA y el resultado impresos cierran con estos importes
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): confirmado = 1 798 760,09. Claude 2026-10-15 (lote 76): confirmado mirando la imagen de la página 14 del visor (impreso 2 al pie), escaneo sin texto propio; además el EBITDA y el resultado impresos cierran con estos importes
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/Relatorio_SDUQ_2022-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/Relatorio_SDUQ_2022-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 31, Jev 1 |
| 2 | Direitos Televisivos | pág. 31, Jev 1 |
| 3 | Patrocínio e Publicidade | pág. 31, Jev 1 |
| 4 | Atividades Comerciais | pág. 31, Jev 0.91 |
| 5 | Subsídios à Exploração | pág. 12, Jev 0.99 |
| 6 | Participação nas Competições Nacionais | pág. 33, Jev 1 |
| 7 | Apostas Desportivas | pág. 33, Jev 0.95 |
| 8 | Cedência de Jogadores | pág. 33, Jev 0.99 |
| 9 | Venda de Direitos Desportivos | pág. 33, Jev 1 |
| 10 | Indemnizações AT | pág. 33, Jev 1 |
| 11 | Mecanismo de Solidariedade | pág. 33, precedente |
| 12 | Outros | pág. 34, Jev 0.99 |
| 13 | Outros Rendimentos Similares | pág. 34, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 32, precedente |
| 2 | Trabalhos especializados | pág. 32, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 32, Jev 0.91 |
| 4 | Honorários | pág. 32, Jev 0.99 |
| 5 | Comissões | pág. 32, precedente |
| 6 | Conservação e reparação | pág. 32, Jev 0.96 |
| 7 | Outros serviços especializados | pág. 32, precedente |
| 8 | Ferramentas e utensílios de desgaste rápido | pág. 32, Claude 0.8 |
| 9 | Livros e Documentação Técnica | pág. 32, Jev 0.99 |
| 10 | Material de escritório | pág. 32, Jev 1 |
| 11 | Artigos para oferta | pág. 32, precedente |
| 12 | Equipamento Desportivo | pág. 32, precedente |
| 13 | Medicamentos e Artigos de Saúde | pág. 32, Jev 0.99 |
| 14 | Outros materiais | pág. 32, precedente |
| 15 | Electricidade | pág. 32, Jev 0.99 |
| 16 | Combustíveis | pág. 32, Jev 0.99 |
| 17 | Outras energias e fluidos | pág. 32, precedente |
| 18 | Deslocações e estadas | pág. 32, Jev 0.95 |
| 19 | Rendas e alugueres | pág. 32, precedente |
| 20 | Comunicação | pág. 32, Jev 1 |
| 21 | Seguros | pág. 32, Jev 0.9 |
| 22 | Limpeza, higiene e conforto | pág. 32, Jev 0.99 |
| 23 | Outros serviços diversos | pág. 32, Jev 0.98 |
| 24 | Remunerações do pessoal | pág. 32, precedente |
| 25 | Remunerações da gerência | pág. 32, Jev 1 |
| 26 | Indemnizações | pág. 32, precedente |
| 27 | Encargos s/ remunerações | pág. 32, precedente |
| 28 | Seguros de acidentes no trabalho e doenças profissionais | pág. 32, precedente |
| 29 | Mecanismo de Solidariedade | pág. 32, Jev 0.9 |
| 30 | Outros gastos | pág. 32, Jev 0.99 |
| 31 | Imparidade de dívidas a receber (perdas/reversões) | pág. 12, Jev 0.96 |
| 32 | Quotizações/Inscrições | pág. 34, precedente |
| 33 | Impostos | pág. 34, Jev 0.93 |
| 34 | Multas e Penalidades | pág. 34, Jev 0.98 |
| 35 | Abates | pág. 34, precedente |
| 36 | Outros Gastos e Perdas | pág. 34, Jev 0.97 |
| 37 | Ativos fixos tangíveis | pág. 34, Jev 0.96 |
| 38 | Ativos intangíveis | pág. 34, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 36, Jev 1 |
| 2 | Direitos Televisivos | pág. 36, Jev 1 |
| 3 | Patrocinio e Publicidade | pág. 36, Jev 1 |
| 4 | Atividades Comerciais | pág. 36, Jev 0.91 |
| 5 | Subsídios à Exploração | pág. 14, Jev 0.99 |
| 6 | Participação nas Competições Nacionais | pág. 38, Jev 1 |
| 7 | Apostas Desportivas | pág. 38, Jev 0.95 |
| 8 | Cedência de Jogadores | pág. 38, Jev 0.99 |
| 9 | Venda de Direitos Desportivos | pág. 38, Jev 1 |
| 10 | Indemnizações AT | pág. 38, Jev 1 |
| 11 | Mecanismo de Solidariedade | pág. 38, precedente |
| 12 | Outros | pág. 38, Jev 0.99 |
| 13 | Outros Rendimentos Similares | pág. 38, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 36, precedente |
| 2 | Trabalhos especializados | pág. 36, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 36, Jev 0.91 |
| 4 | Honorários | pág. 36, Jev 0.99 |
| 5 | Comissões | pág. 36, precedente |
| 6 | Conservação e reparação | pág. 36, Jev 0.96 |
| 7 | Outros serviços especializados | pág. 36, precedente |
| 8 | Ferramentas e utensílios de desgaste rápido | pág. 36, Claude 0.8 |
| 9 | Livros e Documentação Técnica | pág. 36, Jev 0.99 |
| 10 | Material de escritório | pág. 36, Jev 1 |
| 11 | Artigos para oferta | pág. 36, precedente |
| 12 | Equipamento Desportivo | pág. 36, precedente |
| 13 | Medicamentos e Artigos de Saúde | pág. 36, Jev 0.99 |
| 14 | Outros materiais | pág. 37, precedente |
| 15 | Electricidade | pág. 37, Jev 0.99 |
| 16 | Combustíveis | pág. 37, Jev 0.99 |
| 17 | Outras energias e fluidos | pág. 37, precedente |
| 18 | Deslocações e estadas | pág. 37, Jev 0.95 |
| 19 | Rendas e alugueres | pág. 37, precedente |
| 20 | Comunicação | pág. 37, Jev 1 |
| 21 | Seguros | pág. 37, Jev 0.9 |
| 22 | Limpeza, higiene e conforto | pág. 37, Jev 0.99 |
| 23 | Outros serviços diversos | pág. 37, Jev 0.98 |
| 24 | Remunerações do pessoal | pág. 37, precedente |
| 25 | Remunerações da gerência | pág. 37, Jev 1 |
| 26 | Indemnizações | pág. 37, precedente |
| 27 | Encargos s/ remunerações | pág. 37, precedente |
| 28 | Seguros de acidentes no trabalho e doenças profissionais | pág. 37, precedente |
| 29 | Gastos Cedencias temporárias jogadores | pág. 37, precedente |
| 30 | Mecanismo de Solidariedade | pág. 37, Jev 0.9 |
| 31 | Outros gastos | pág. 37, Jev 0.99 |
| 32 | Imparidade de dívidas a receber (perdas/reversões) | pág. 14, Jev 0.96 |
| 33 | Quotizações/Inscrições | pág. 39, precedente |
| 34 | Impostos | pág. 39, Jev 0.93 |
| 35 | Multas e Penalidades | pág. 39, Jev 0.98 |
| 36 | Multas Fiscais | pág. 39, precedente |
| 37 | Abates | pág. 39, precedente |
| 38 | Donativos | pág. 39, Jev 0.98 |
| 39 | Outros Gastos e Perdas | pág. 39, Jev 0.97 |
| 40 | Ativos fixos tangíveis | pág. 39, Jev 0.96 |
| 41 | Ativos intangíveis | pág. 39, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2022-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 25, Jev 1 |
| 2 | Direitos Televisivos | pág. 25, Jev 1 |
| 3 | Patrocinio e Publicidade | pág. 25, Jev 1 |
| 4 | Atividades Comerciais | pág. 25, Jev 0.91 |
| 5 | O Lucros de Exploração | pág. 25, Jev 0.92 |
| 6 | Subsídios do Estado e outros entes públicos | pág. 26, Jev 0.98 |
| 7 | Subsídios de outras entidades | pág. 26, Jev 0.99 |
| 8 | Royalties | pág. 28, Jev 0.92 |
| 9 | Participação nas Competições Europeias | pág. 28, Jev 1 |
| 10 | Participação nas Competições Nacionais | pág. 28, Jev 1 |
| 11 | Apostas Desportivas | pág. 28, Jev 0.95 |
| 12 | Venda de Direitos Desportivos | pág. 28, Jev 1 |
| 13 | Indemnizações AT | pág. 28, Jev 1 |
| 14 | Mecanismo de Solidariedade | pág. 28, Jev 0.92 |
| 15 | Outros | pág. 28, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 26, precedente |
| 2 | Trabalhos especializados | pág. 26, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 26, Jev 0.91 |
| 4 | Honorários | pág. 26, Jev 0.99 |
| 5 | Gastos honorários a agentes desportivos | pág. 27, precedente |
| 6 | Outras Comissões | pág. 27, precedente |
| 7 | Conservação e reparação | pág. 26, Jev 0.96 |
| 8 | Outros serviços especializados | pág. 26, precedente |
| 9 | Livros e Documentação Técnica | pág. 26, Jev 0.99 |
| 10 | Material de escritório | pág. 26, Jev 1 |
| 11 | Equipamento Desportivo | pág. 26, precedente |
| 12 | Medicamentos e Artigos de Saúde | pág. 26, Jev 0.99 |
| 13 | Outros materiais | pág. 26, precedente |
| 14 | Electricidade | pág. 26, Jev 0.99 |
| 15 | Combustíveis | pág. 26, Jev 0.99 |
| 16 | Outras energias e fluidos | pág. 26, precedente |
| 17 | Deslocações e estadas | pág. 26, Jev 0.95 |
| 18 | Rendas e alugueres | pág. 26, precedente |
| 19 | Comunicação | pág. 26, Jev 1 |
| 20 | Seguros | pág. 26, Jev 0.9 |
| 21 | Limpeza, higiene e conforto | pág. 26, Jev 0.99 |
| 22 | Outros serviços diversos | pág. 26, Jev 0.98 |
| 23 | Remunerações do pessoal | pág. 27, precedente |
| 24 | Indemnizações | pág. 27, precedente |
| 25 | Encargos s/ remunerações | pág. 27, precedente |
| 26 | Seguros de acidentes no trabalho e doenças profissionais | pág. 27, precedente |
| 27 | Outros gastos | pág. 27, Jev 0.99 |
| 28 | Imparidade de investimentos não depreciáveis/amortizações (perdas/reversões) | pág. 3, precedente |
| 29 | Quotizações/Inscrições | pág. 28, precedente |
| 30 | Impostos | pág. 28, Jev 0.93 |
| 31 | Multas e Penalidades | pág. 28, Jev 0.98 |
| 32 | Abates | pág. 28, precedente |
| 33 | Donativos | pág. 28, Jev 0.98 |
| 34 | Outros Gastos e Perdas | pág. 28, Jev 0.97 |
| 35 | Ativos fixos tangíveis | pág. 29, Jev 0.96 |
| 36 | Ativos intangíveis | pág. 29, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2020-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2020-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2019–20 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 24, Jev 1 |
| 2 | Direitos Televisivos | pág. 24, Jev 1 |
| 3 | Patrocínio e Publicidade | pág. 24, Jev 1 |
| 4 | Atividades Comerciais | pág. 24, Jev 0.91 |
| 5 | Subsídios à Exploração | pág. 2, Jev 0.99 |
| 6 | Royalties | pág. 27, Jev 0.92 |
| 7 | Participação nas Competições Europeias | pág. 27, Jev 1 |
| 8 | Participação nas Competições Nacionais | pág. 27, Jev 1 |
| 9 | Apostas Desportivas | pág. 27, Jev 0.95 |
| 10 | Cedência de Jogadores | pág. 27, Jev 0.99 |
| 11 | Venda de Direitos Desportivos | pág. 27, Jev 1 |
| 12 | Indemnizações AT | pág. 27, Jev 1 |
| 13 | Mecanismo de Solidariedade | pág. 27, Jev 0.92 |
| 14 | Outros | pág. 27, Jev 0.99 |
| 15 | Outros Rendimentos Similares | pág. 27, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 25, precedente |
| 2 | Trabalhos especializados | pág. 25, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 25, Jev 0.91 |
| 4 | Honorários | pág. 25, Jev 0.99 |
| 5 | Gastos honorários a agentes desportivos | pág. 25, precedente |
| 6 | Outros serviços especializados | pág. 25, precedente |
| 7 | Conservação e reparação | pág. 25, Jev 0.96 |
| 8 | Outros serviços especializados | pág. 25, precedente |
| 9 | Livros e Documentação Técnica | pág. 25, Jev 0.99 |
| 10 | Material de escritório | pág. 25, Jev 1 |
| 11 | Equipamento Desportivo | pág. 25, precedente |
| 12 | Medicamentos e Artigos de Saúde | pág. 25, Jev 0.99 |
| 13 | Outros materiais | pág. 25, precedente |
| 14 | Electricidade | pág. 25, Jev 0.99 |
| 15 | Combustíveis | pág. 25, Jev 0.99 |
| 16 | Outras energias e fluidos | pág. 25, precedente |
| 17 | Deslocações e estadas | pág. 25, Jev 0.95 |
| 18 | Rendas e alugueres | pág. 25, precedente |
| 19 | Comunicação | pág. 25, Jev 1 |
| 20 | Seguros | pág. 25, Jev 0.9 |
| 21 | Limpeza, higiene e conforto | pág. 25, Jev 0.99 |
| 22 | Outros serviços diversos | pág. 25, Jev 0.98 |
| 23 | Remunerações do pessoal | pág. 26, precedente |
| 24 | Indemnizações | pág. 26, precedente |
| 25 | Encargos s/ remunerações | pág. 26, precedente |
| 26 | Seguros de acidentes no trabalho e doenças profissionais | pág. 26, precedente |
| 27 | Outros gastos | pág. 26, Jev 0.99 |
| 28 | Imparidade de dívidas a receber (perdas/reversões) | pág. 2, Jev 0.96 |
| 29 | Imparidade de investimentos não depreciáveis/amortizações (perdas/reversões) | pág. 2, precedente |
| 30 | Quotizações/Inscrições | pág. 27, precedente |
| 31 | Impostos | pág. 27, Jev 0.93 |
| 32 | Multas e Penalidades | pág. 27, Jev 0.98 |
| 33 | Abates | pág. 27, precedente |
| 34 | Outros Gastos e Perdas | pág. 27, Jev 0.97 |
| 35 | Ativos fixos tangíveis | pág. 28, Jev 0.96 |
| 36 | Ativos intangíveis | pág. 28, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2019-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2018–19 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2017-18.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 31, Jev 1 |
| 2 | Direitos Televisivos | pág. 31, Jev 1 |
| 3 | Patrocínio e Publicidade | pág. 31, Jev 1 |
| 4 | Atividades Comerciais | pág. 31, Jev 0.91 |
| 5 | O.Lucros de Exploração | pág. 31, Claude 0.8 |
| 6 | Subsídios à Exploração | pág. 11, Jev 0.99 |
| 7 | Royalties | pág. 34, Jev 0.92 |
| 8 | Participação nas Competições Europeias | pág. 34, Jev 1 |
| 9 | Participação nas Competições Nacionais | pág. 34, Jev 1 |
| 10 | Apostas Desportivas | pág. 34, Jev 0.95 |
| 11 | Cedência de Jogadores | pág. 34, Jev 0.99 |
| 12 | Venda de Direitos Desportivos | pág. 34, Jev 1 |
| 13 | Indemnizações AT | pág. 34, Jev 1 |
| 14 | Outros | pág. 34, Jev 0.99 |
| 15 | Outros Rendimentos Similares | pág. 34, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 32, precedente |
| 2 | Trabalhos especializados | pág. 32, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 32, Jev 0.91 |
| 4 | Honorários | pág. 32, Jev 0.99 |
| 5 | Gastos honorários a agentes desportivos | pág. 33, precedente |
| 6 | Outros serviços especializados | pág. 33, precedente |
| 7 | Conservação e reparação | pág. 32, Jev 0.96 |
| 8 | Outros serviços especializados | pág. 32, precedente |
| 9 | Livros e Documentação Técnica | pág. 32, Jev 0.99 |
| 10 | Material de escritório | pág. 32, Jev 1 |
| 11 | Artigos para oferta | pág. 32, precedente |
| 12 | Equipamento Desportivo | pág. 32, precedente |
| 13 | Medicamentos e Artigos de Saúde | pág. 32, Jev 0.99 |
| 14 | Outros materiais | pág. 32, precedente |
| 15 | Electricidade | pág. 32, Jev 0.99 |
| 16 | Combustíveis | pág. 32, Jev 0.99 |
| 17 | Outras energias e fluidos | pág. 32, precedente |
| 18 | Deslocações e estadas | pág. 32, Jev 0.95 |
| 19 | Rendas e alugueres | pág. 32, precedente |
| 20 | Comunicação | pág. 32, Jev 1 |
| 21 | Seguros | pág. 32, Jev 0.9 |
| 22 | Limpeza, higiene e conforto | pág. 32, Jev 0.99 |
| 23 | Outros serviços diversos | pág. 32, Jev 0.98 |
| 24 | Remunerações do pessoal | pág. 33, precedente |
| 25 | Indemnizações | pág. 33, precedente |
| 26 | Encargos s/ remunerações | pág. 33, precedente |
| 27 | Seguros de acidentes no trabalho e doenças profissionais | pág. 33, precedente |
| 28 | Outros gastos | pág. 33, Jev 0.99 |
| 29 | Imparidade de dívidas a receber (perdas/reversões) | pág. 11, Jev 0.96 |
| 30 | Quotizações/Inscrições | pág. 34, precedente |
| 31 | Impostos | pág. 34, Jev 0.93 |
| 32 | Multas e Penalidades | pág. 34, Jev 0.98 |
| 33 | Abates | pág. 34, precedente |
| 34 | Donativos | pág. 34, Jev 0.98 |
| 35 | Outros Gastos e Perdas | pág. 34, Jev 0.97 |
| 36 | Outros Juros | pág. 34, Jev 0.98 |
| 37 | Outros Gastos de Financiamento | pág. 34, precedente |
| 38 | Ativos fixos tangíveis | pág. 35, Jev 0.96 |
| 39 | Ativos intangíveis | pág. 35, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2018-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2018-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2017–18 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2016-17.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 33, Jev 1 |
| 2 | Direitos Televisivos | pág. 33, Jev 1 |
| 3 | Patrocínio e Publicidade | pág. 33, Jev 1 |
| 4 | Atividades Comerciais | pág. 33, Jev 0.91 |
| 5 | O Lucros de Exploração | pág. 33, Jev 0.92 |
| 6 | Comparticipações da UEFA | pág. 34, ? 0.6 |
| 7 | Subsídio Deslocação | pág. 34, Jev 0.95 |
| 8 | Royalties | pág. 36, Jev 0.92 |
| 9 | Participação nas Competições Europeias | pág. 36, Jev 1 |
| 10 | Participação nas Competições Nacionais | pág. 36, Jev 1 |
| 11 | Cedência de Jogadores | pág. 36, Jev 0.99 |
| 12 | Venda de Direitos Desportivos | pág. 36, Jev 1 |
| 13 | Outros | pág. 36, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 34, precedente |
| 2 | Trabalhos especializados | pág. 34, Jev 0.95 |
| 3 | Vigilância e segurança | pág. 34, Jev 0.91 |
| 4 | Honorários | pág. 34, Jev 0.99 |
| 5 | Comissões | pág. 34, precedente |
| 6 | Conservação e reparação | pág. 34, Jev 0.96 |
| 7 | Outros serviços especializados | pág. 34, precedente |
| 8 | Livros e Documentação Técnica | pág. 34, Jev 0.99 |
| 9 | Material de escritório | pág. 34, Jev 1 |
| 10 | Artigos para oferta | pág. 34, precedente |
| 11 | Equipamento Desportivo | pág. 34, precedente |
| 12 | Medicamentos e Artigos de Saúde | pág. 34, Jev 0.99 |
| 13 | Outros materiais | pág. 34, precedente |
| 14 | Electricidade | pág. 34, Jev 0.99 |
| 15 | Combustíveis | pág. 34, Jev 0.99 |
| 16 | Outras energias e fluidos | pág. 34, precedente |
| 17 | Deslocações e estadas | pág. 34, Jev 0.95 |
| 18 | Rendas e alugueres | pág. 34, precedente |
| 19 | Comunicação | pág. 34, Jev 1 |
| 20 | Seguros | pág. 34, Jev 0.9 |
| 21 | Limpeza, higiene e conforto | pág. 34, Jev 0.99 |
| 22 | Outros serviços diversos | pág. 34, Jev 0.98 |
| 23 | Remunerações do pessoal | pág. 35, precedente |
| 24 | Indemnizações | pág. 35, precedente |
| 25 | Encargos s/ remunerações | pág. 35, precedente |
| 26 | Seguros de acidentes no trabalho e doenças profissionais | pág. 35, precedente |
| 27 | Mecanismo de Solidariedade | pág. 35, Jev 0.9 |
| 28 | Outros gastos | pág. 35, Jev 0.99 |
| 29 | Imparidade de dívidas a receber (perdas/reversões) | pág. 11, Jev 0.96 |
| 30 | Quotizações/inacrições | pág. 36, precedente |
| 31 | Impostos | pág. 36, Jev 0.93 |
| 32 | Multas e Penalidades | pág. 36, Jev 0.98 |
| 33 | Outros Gastos e Perdas | pág. 36, Jev 0.97 |
| 34 | Outros Gastos de Financiamento | pág. 36, precedente |
| 35 | Edifícios e outras construções | pág. 36, Claude 0.92 |
| 36 | Equipamento Básico | pág. 36, Jev 0.99 |
| 37 | Equipamento de Transporte | pág. 36, Jev 0.98 |
| 38 | Equipamento Administrativo | pág. 36, Claude 0.93 |
| 39 | Outros Ativos Fixos Tangíveis | pág. 36, Jev 0.99 |
| 40 | Outros Direitos (Passes dos jogadores) | pág. 36, Claude 0.95 |
| 41 | Outros Ativos Intangíveis | pág. 36, Claude 0.85 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2017-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2017-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2016–17 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Rio Ave/relatorio-contas-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Rio Ave/relatorio-contas-2015-16.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | receitos de bilheteira | pág. 2, Jev 1 |
| 2 | patrocínio e publicidade | pág. 2, Jev 1 |
| 3 | direitos de transmissão | pág. 2, Jev 1 |
| 4 | atividades comerciais | pág. 2, Jev 1 |
| 5 | outros lucros de exploração | pág. 2, Jev 1 |
| 6 | Comparticipaçoes da UEFA | pág. 24, precedente |
| 7 | Subsidio Deslocações ás Ilhas | pág. 24, Jev 0.99 |
| 8 | Royalties | pág. 26, precedente |
| 9 | Participação nas Competições Europeias | pág. 26, precedente |
| 10 | Participação nas Competições Nacionais | pág. 26, precedente |
| 11 | Cedencia de Jogadores | pág. 26, precedente |
| 12 | Venda de Direitos Desportivos | pág. 26, precedente |
| 13 | Indemnizações AT | pág. 26, precedente |
| 14 | Outros | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 24, precedente |
| 2 | Trabalhos especializados | pág. 24, precedente |
| 3 | Vigilância e segurança | pág. 24, precedente |
| 4 | Honorários | pág. 24, precedente |
| 5 | Comissões | pág. 24, precedente |
| 6 | Conservação e reparação | pág. 24, precedente |
| 7 | Outros serviços especializados | pág. 24, precedente |
| 8 | Livros e Documentação Técnica | pág. 24, precedente |
| 9 | Material de escritório | pág. 24, precedente |
| 10 | Artigos para oferta | pág. 24, precedente |
| 11 | Equipamento Desportivo | pág. 24, precedente |
| 12 | Medicamentos e Artigos de Saúde | pág. 24, precedente |
| 13 | Outros materiais | pág. 24, precedente |
| 14 | Electricidade | pág. 24, precedente |
| 15 | Combustíveis | pág. 24, precedente |
| 16 | Outras energias e fluidos | pág. 24, precedente |
| 17 | Deslocações e estadas | pág. 24, precedente |
| 18 | Rendas e alugueres | pág. 24, precedente |
| 19 | Comunicação | pág. 24, precedente |
| 20 | Seguros | pág. 24, precedente |
| 21 | Limpeza, higiene e conforto | pág. 24, precedente |
| 22 | Outros serviços diversos | pág. 24, precedente |
| 23 | Remunerações do pessoal | pág. 25, precedente |
| 24 | Encargos s/ remunerações | pág. 25, precedente |
| 25 | Seguros de acidentes no trabalho e doenças profissionais | pág. 25, precedente |
| 26 | Outros gastos | pág. 25, precedente |
| 27 | Imparidade de dívidas a receber (perdas/reversões) | pág. 2, precedente |
| 28 | Quotizações/Inscrições | pág. 26, precedente |
| 29 | Impostos | pág. 26, precedente |
| 30 | Multas e Penalidades | pág. 26, precedente |
| 31 | Alienação de Jogadores (valor líquido) | pág. 26, ? 0.75 |
| 32 | Donativos | pág. 26, precedente |
| 33 | Outros Gastos e Perdas | pág. 26, precedente |
| 34 | Outros Juros | pág. 26, precedente |
| 35 | Outros Gastos de Financiamento | pág. 26, precedente |
| 36 | Edifícios e outras construções | pág. 26, precedente |
| 37 | Equipamento Básico | pág. 26, precedente |
| 38 | Equipamento de Transporte | pág. 26, precedente |
| 39 | Equipamento Administrativo | pág. 26, precedente |
| 40 | Outros Ativos Fixos Tangíveis | pág. 26, precedente |
| 41 | Outros Direitos (Passes dos jogadores) | pág. 26, precedente |
| 42 | Outros Ativos Intangíveis | pág. 26, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2016-06-30. Revisión del alta (Claude, 2026-10-09): el registro no trae cierre; el documento dice cierre 2016-06-30
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-15): pt-primeiraliga, verificado contra roster cacheado de "2015–16 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Rio Ave".
```

## Fuentes

### rioave-pt-relatorio-contas-2017-18

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2016-17

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-sduq-2022-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/Relatorio_SDUQ_2022-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2015-16

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rioave-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Rio Ave/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
