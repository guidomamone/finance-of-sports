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
