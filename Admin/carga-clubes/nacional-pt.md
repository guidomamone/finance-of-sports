# nacional-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/nacional-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Nacional: alta por tools/alta-club.mjs (2026-10-15) desde Clubes/Portugal/Nacional/relatorio-contas-2023-24.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Nacional.md; tools/cargar-lote.mjs).
```

```text
data/pt/nacional-pt-data.js — Clube Desportivo Nacional, Futebol SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-15), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Nacional/relatorio-contas-2023-24.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "nacional-pt" — slug de "Nacional" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Clube Desportivo Nacional, Futebol SAD" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-15): Claude 2026-10-15 (revisión del alta, lote 76): designación formal 'O Clube
  displayName        ok        "Nacional" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (42 de 45 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 25 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] sc internacional: #E5050F Red, #FFFFFF White | [colombia] internacional de bogota: #C49F65 gold, #
  anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (42 de 45 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
  sourceId           ok        "nacional-pt-relatorio-contas-2023-24" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Nacional"

FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"nacional-pt-relatorio-contas-2023-24"}
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-15) desde Clubes/Portugal/Nacional/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Nacional/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes, Camarotes | pág. 20, Jev 0.95 |
| 2 | Publicidade | pág. 20, Jev 1 |
| 3 | Direitos Televisivos | pág. 20, Jev 1 |
| 4 | DRJD | pág. 21, precedente |
| 5 | INST. EMPREGO | pág. 21, precedente |
| 6 | Rendimentos suplementares | pág. 21, Jev 0.99 |
| 7 | Prémios - LPFP Apostas Desportivas Placard | pág. 21, precedente |
| 8 | Prémios Federação Portuguesa de Futebol | pág. 21, Jev 0.99 |
| 9 | Prémios - Mecanismo de Solidariedade | pág. 21, precedente |
| 10 | Excesso da estimativa para impostos | pág. 21, Jev 1 |
| 11 | Comparticipação tarifa residente | pág. 21, precedente |
| 12 | Outros não especificados | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Correções relativas a períodos anteriores | pág. 21, precedente |
| 2 | Trabalhos especializados | pág. 22, Jev 0.96 |
| 3 | Vigilância e segurança | pág. 22, Jev 0.9 |
| 4 | Honorários | pág. 22, Jev 0.99 |
| 5 | Conservação e reparação | pág. 22, Jev 0.99 |
| 6 | Serviços bancários | pág. 22, precedente |
| 7 | Outros | pág. 22, Jev 0.96 |
| 8 | Outros | pág. 22, Jev 0.96 |
| 9 | Outros | pág. 22, Jev 0.96 |
| 10 | Deslocações e estadas | pág. 22, Jev 0.95 |
| 11 | Outros | pág. 22, Jev 0.96 |
| 12 | Rendas e alugueres | pág. 22, precedente |
| 13 | Comunicação | pág. 22, Jev 1 |
| 14 | Contencioso e notariado | pág. 22, Jev 0.99 |
| 15 | Limpeza, higiene e conforto | pág. 22, Jev 1 |
| 16 | Outros serviços | pág. 22, precedente |
| 17 | Remunerações órgãos sociais | pág. 23, Jev 0.9 |
| 18 | Remunerações do Pessoal - Funcionários | pág. 23, Claude 0.8 |
| 19 | Remunerações do Pessoal - Jogadores | pág. 23, Jev 1 |
| 20 | Remunerações do Pessoal - Treinadores | pág. 23, Claude 0.85 |
| 21 | Enc. s/rem.-orgãos sociais | pág. 23, Claude 0.9 |
| 22 | Enc. s/rem.-pessoal - Funcionários | pág. 23, Claude 0.85 |
| 23 | Enc. s/rem.-pessoal - Treinadores | pág. 23, Claude 0.85 |
| 24 | Enc. s/rem.-pessoal - Jogadores | pág. 23, Claude 0.92 |
| 25 | Seg.ac.trb - pessoal | pág. 23, precedente |
| 26 | Seg.ac.trb - Jogadores | pág. 23, precedente |
| 27 | Outros Custos com Pessoal - Jogadores | pág. 23, precedente |
| 28 | Outros Custos com Pessoal - Outros | pág. 23, precedente |
| 29 | Outros Custos com Pessoal - Outros | pág. 23, precedente |
| 30 | Provisões (aumentos/reduções) | pág. 4, Jev 0.92 |
| 31 | Encargos com descontos de letras | pág. 24, precedente |
| 32 | Correções relativas a períodos anteriores | pág. 24, precedente |
| 33 | Quotizações | pág. 24, precedente |
| 34 | Transferências de jogadores | pág. 24, precedente |
| 35 | Custas, tribunal, etc | pág. 24, precedente |
| 36 | Outros não especificados | pág. 24, Jev 1 |
| 37 | Gastos/reversões de depreciação e de amortização | pág. 4, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-15). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-15): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Nacional".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Nacional/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Nacional/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes, Camarotes | pág. 20, precedente |
| 2 | Competições | pág. 20, Jev 0.9 |
| 3 | Publicidade | pág. 20, precedente |
| 4 | Direitos Televisivos | pág. 20, precedente |
| 5 | DRJD | pág. 21, precedente |
| 6 | INST. SEG. SOCIAL | pág. 21, Jev 0.96 |
| 7 | FPF - TAÇA PORTUGAL | pág. 21, ? 0.7 |
| 8 | Prémios - LPFP Apostas Desportivas Placard | pág. 21, precedente |
| 9 | Prémios Federação Portuguesa de Futebol | pág. 21, precedente |
| 10 | Prémios - Mecanismo de Solidariedade | pág. 21, precedente |
| 11 | Cedências de jogadores | pág. 21, Jev 0.96 |
| 12 | Venda de Jogadores | pág. 21, Jev 1 |
| 13 | Comparticipação tarifa residente | pág. 21, precedente |
| 14 | Outros não especificados | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 22, precedente |
| 2 | Vigilância e segurança | pág. 22, precedente |
| 3 | Honorários | pág. 22, precedente |
| 4 | Conservação e reparação | pág. 22, precedente |
| 5 | Serviços bancários | pág. 22, precedente |
| 6 | Outros | pág. 22, precedente |
| 7 | Outros | pág. 22, precedente |
| 8 | Deslocações e estadas | pág. 22, precedente |
| 9 | Outros | pág. 22, precedente |
| 10 | Rendas e alugueres | pág. 22, precedente |
| 11 | Comunicação | pág. 22, precedente |
| 12 | Contencioso e notariado | pág. 22, precedente |
| 13 | Limpeza, higiene e conforto | pág. 22, precedente |
| 14 | Outros serviços | pág. 22, precedente |
| 15 | Remunerações órgãos sociais | pág. 22, precedente |
| 16 | Remunerações do Pessoal - Funcionários | pág. 22, precedente |
| 17 | Remunerações do Pessoal - Jogadores | pág. 22, precedente |
| 18 | Remunerações do Pessoal - Treinadores | pág. 22, precedente |
| 19 | Indemnização para despedimento | pág. 22, precedente |
| 20 | Enc. s/rem.-orgãos sociais | pág. 22, precedente |
| 21 | Enc. s/rem.-pessoal - Funcionários | pág. 22, precedente |
| 22 | Enc. s/rem.-pessoal - Treinadores | pág. 22, precedente |
| 23 | Enc. s/rem.-pessoal - Jogadores | pág. 22, precedente |
| 24 | Seg.ac.trb - pessoal | pág. 22, precedente |
| 25 | Seg.ac.trb - Jogadores | pág. 22, precedente |
| 26 | Outros Custos com Pessoal - Jogadores | pág. 22, precedente |
| 27 | Outros Custos com Pessoal - Outros | pág. 22, precedente |
| 28 | Encargos com descontos de letras | pág. 23, precedente |
| 29 | Correções relativas a períodos anteriores | pág. 23, precedente |
| 30 | Quotizações | pág. 23, precedente |
| 31 | Transferências de jogadores | pág. 23, precedente |
| 32 | Custas, tribunal, etc | pág. 23, precedente |
| 33 | Outros não especificados | pág. 23, precedente |
| 34 | Gastos/reversões de depreciação e de amortização | pág. 4, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2022–23 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Nacional".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Nacional/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Nacional/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilhetes, Camarotes | pág. 23, precedente |
| 2 | COMPETIÇÕES | pág. 23, precedente |
| 3 | Publicidade | pág. 23, precedente |
| 4 | Direitos Televisivos | pág. 23, precedente |
| 5 | Subsídios EOEP - IDRAM | pág. 20, Claude 0.85 |
| 6 | Subsídios EOEP - INST. SEG. SOCIAL | pág. 20, Claude 0.92 |
| 7 | Subsídios EOEP - IDERAM / InvesteRA | pág. 20, Claude 0.85 |
| 8 | FPF - TAÇA PORTUGAL | pág. 20, precedente |
| 9 | Rendimentos em ativos não financeiros | pág. 21, precedente |
| 10 | Prémios - LPFP Apostas Desportivas Placard | pág. 21, precedente |
| 11 | Prémios Federação Portuguesa de Futebol | pág. 21, precedente |
| 12 | Prémios - Mecanismo de Solidariedade | pág. 21, precedente |
| 13 | Excesso da estimativa para impostos | pág. 21, precedente |
| 14 | Quotas - 50% CDN | pág. 21, ? 0.6 |
| 15 | Comparticipação tarifa residente | pág. 21, precedente |
| 16 | Outros não especificados | pág. 21, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 21, precedente |
| 2 | Vigilância e segurança | pág. 21, precedente |
| 3 | Honorários | pág. 21, precedente |
| 4 | Conservação e reparação | pág. 21, precedente |
| 5 | Serviços bancários | pág. 21, precedente |
| 6 | Outros | pág. 21, precedente |
| 7 | Outros | pág. 21, precedente |
| 8 | Deslocações e estadas | pág. 21, precedente |
| 9 | Outros | pág. 21, precedente |
| 10 | Rendas e alugueres | pág. 21, precedente |
| 11 | Comunicação | pág. 21, precedente |
| 12 | Contencioso e notariado | pág. 21, precedente |
| 13 | Limpeza, higiene e conforto | pág. 21, precedente |
| 14 | Outros serviços | pág. 21, precedente |
| 15 | Remunerações órgãos sociais | pág. 22, precedente |
| 16 | Remunerações do Pessoal - Funcionários | pág. 22, precedente |
| 17 | Remunerações do Pessoa - Jogadores | pág. 22, precedente |
| 18 | Remunerações do Pessoal - Treinadores | pág. 22, precedente |
| 19 | Enc. s/rem.-orgãos sociais | pág. 22, precedente |
| 20 | Enc. s/rem.-pessoal - Funcionários | pág. 22, precedente |
| 21 | Enc. s/rem.-pessoal - Treinadores | pág. 22, precedente |
| 22 | Enc. s/rem.-pessoal - Jogadores | pág. 22, precedente |
| 23 | Seg.ac.trb - pessoal | pág. 22, precedente |
| 24 | Seg.ac.trb - Jogadores | pág. 22, precedente |
| 25 | Outros Custos com Pessoal - Jogadores | pág. 22, precedente |
| 26 | Outros Custos com Pessoal - Outros | pág. 22, precedente |
| 27 | Provisões (aumentos/reduções) | pág. 4, precedente |
| 28 | Menos-valias jogadores | pág. 22, ? 0.6 |
| 29 | Outros | pág. 22, precedente |
| 30 | Correções relativas a períodos anteriores | pág. 22, precedente |
| 31 | Quotizações | pág. 22, precedente |
| 32 | Transferências de jogadores | pág. 22, precedente |
| 33 | Outros custos - Protocolos | pág. 22, Jev 0.93 |
| 34 | Custas, Quota TV (estorno), etc | pág. 22, Claude 0.8 |
| 35 | Outros não especificados | pág. 22, precedente |
| 36 | Gastos/reversões de depreciação e de amortização | pág. 4, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): cierre = 2022-06-30. periodo.mjs tomó 30/06/2021 (columna comparativa); el informe es del período de doce meses findo el 30/06/2022.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Nacional".
```

## Fuentes

### nacional-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-15) desde la transcripción Clubes/Portugal/Nacional/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### nacional-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Nacional/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### nacional-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Nacional/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
