# arouca-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/arouca-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Arouca: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Arouca/wf-2024-2025-78053ec5.pdf. brandColor #FFFF00
(procedencia en Admin/sourcing/Portugal/Arouca.md; tools/cargar-lote.mjs).
```

```text
data/pt/arouca-pt-data.js — Futebol Clube de Arouca – Futebol, SDUQ, Lda. (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Arouca/wf-2024-2025-78053ec5.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "arouca-pt" — slug de "Arouca" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Futebol Clube de Arouca – Futebol, SDUQ, Lda." — respuesta de Guido en la cola (06ab4e1)
  displayName        ok        "Arouca" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (73 de 73 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 157 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (73 de 73 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "arouca-pt-wf-2024-2025-78053ec5" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Arouca"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"arouca-pt-wf-2024-2025-78053ec5"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Arouca/wf-2024-2025-78053ec5.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Arouca/wf-2024-2025-78053ec5.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade | pág. 36, Jev 1 |
| 2 | Receitas de Bilheteira | pág. 36, Jev 0.99 |
| 3 | Corporate | pág. 36, Jev 0.95 |
| 4 | Transmissões Televisivas | pág. 36, Jev 1 |
| 5 | Ced. Temporária atletas | pág. 36, Jev 1 |
| 6 | Subsídios e Prémios | pág. 36, precedente |
| 7 | Receitas Apostas Desport. | pág. 36, Jev 0.96 |
| 8 | Outros | pág. 36, precedente |
| 9 | Descontos pp obtidos | pág. 37, Jev 1 |
| 10 | Al. ativos intangíveis-Passes atletas | pág. 37, Jev 0.99 |
| 11 | Benefícios de penalidades contratuais | pág. 37, Jev 1 |
| 12 | Correções a exercícios anteriores | pág. 37, Jev 1 |
| 13 | Exc estimativa p/ impostos | pág. 37, Jev 1 |
| 14 | Outros Rendimentos | pág. 37, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 34, Jev 0.97 |
| 2 | Trabalhos Especializados | pág. 34, Jev 0.99 |
| 3 | Vigilância e Segurança | pág. 34, Jev 0.98 |
| 4 | Honorários | pág. 34, Jev 1 |
| 5 | Comissões | pág. 34, precedente |
| 6 | Conservação e Reparação | pág. 34, Jev 1 |
| 7 | Serviços Bancários | pág. 34, Jev 0.98 |
| 8 | Out. Serv. Especializados | pág. 34, Jev 0.95 |
| 9 | Ferr. Ut. Desgaste Rápido | pág. 34, Jev 1 |
| 10 | Livros e doc. técnica | pág. 34, Jev 1 |
| 11 | Material de Escritório | pág. 34, Jev 1 |
| 12 | Artigos Oferta | pág. 34, Jev 0.93 |
| 13 | Eletricidade | pág. 34, Jev 1 |
| 14 | Combustíveis | pág. 34, Jev 0.99 |
| 15 | Água | pág. 34, Jev 0.98 |
| 16 | Outros Fluidos | pág. 34, Jev 0.96 |
| 17 | Deslocações e Estadas | pág. 34, Jev 1 |
| 18 | Transp. Pessoal | pág. 34, precedente |
| 19 | Rendas e Alugueres | pág. 34, precedente |
| 20 | Comunicação | pág. 34, Jev 1 |
| 21 | Seguros | pág. 34, Jev 0.96 |
| 22 | Contencioso e Notarido | pág. 34, Jev 1 |
| 23 | Limpeza, Higiene e Conforto | pág. 34, Jev 1 |
| 24 | Outros Serviços | pág. 34, Jev 1 |
| 25 | Remun. Órgãos sociais | pág. 32, Jev 1 |
| 26 | Remunerações pessoal | pág. 32, precedente |
| 27 | Indemnizações | pág. 32, precedente |
| 28 | Encargos s/ remunerações | pág. 32, Jev 0.92 |
| 29 | Seg. Acidentes de Trabalho | pág. 32, Jev 0.99 |
| 30 | Outros Gastos c/ Pessoal | pág. 32, precedente |
| 31 | Imparidade de dívidas a receber (perdas/reversões) | pág. 7, Jev 0.99 |
| 32 | Provisões (aumentos/reduções) | pág. 7, Jev 0.98 |
| 33 | Impostos | pág. 35, Jev 0.95 |
| 34 | Desc. Pp concedidos | pág. 35, Jev 1 |
| 35 | Gastos em inv não financeiros | pág. 35, Jev 1 |
| 36 | Corr. Per. Anteriores | pág. 35, Jev 1 |
| 37 | Multas e penalidades | pág. 35, Jev 0.98 |
| 38 | Outros | pág. 35, Jev 0.99 |
| 39 | Gastos/reversões de depreciação e de amortização | pág. 7, precedente |
| 40 | Aumentos/reduções de justo valor | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Arouca".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Arouca/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Arouca/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade | pág. 35, Jev 1 |
| 2 | Receitas de Bilheteira | pág. 35, Jev 0.99 |
| 3 | Corporate | pág. 35, Jev 0.95 |
| 4 | Transmissões Televisivas | pág. 35, Jev 1 |
| 5 | Ced. Temporária atletas | pág. 35, Jev 1 |
| 6 | Subsídios e Prémios | pág. 35, precedente |
| 7 | Receitas Apostas Desport. | pág. 35, Jev 0.96 |
| 8 | Outros | pág. 35, precedente |
| 9 | Descontos pp obtidos | pág. 36, Jev 1 |
| 10 | Al. ativos intangíveis-Passes atletas | pág. 36, Jev 0.99 |
| 11 | Benefícios de penalidades contratuais | pág. 36, Jev 1 |
| 12 | Outros Rendimentos | pág. 36, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 34, Jev 0.97 |
| 2 | Trabalhos Especializados | pág. 34, Jev 0.99 |
| 3 | Publicidade e propaganda | pág. 34, Jev 1 |
| 4 | Vigilância e Segurança | pág. 34, Jev 0.98 |
| 5 | Honorários | pág. 34, Jev 1 |
| 6 | Comissões | pág. 34, precedente |
| 7 | Conservação e Reparação | pág. 34, Jev 1 |
| 8 | Serviços Bancários | pág. 34, Jev 0.98 |
| 9 | Out. Serv. Especializados | pág. 34, Jev 0.95 |
| 10 | Ferr. Ut. Desgaste Rápido | pág. 34, Jev 1 |
| 11 | Livros e doc. técnica | pág. 34, Jev 1 |
| 12 | Material de Escritório | pág. 34, Jev 1 |
| 13 | Artigos Oferta | pág. 34, Jev 0.93 |
| 14 | Eletricidade | pág. 34, Jev 1 |
| 15 | Combustíveis | pág. 34, Jev 0.99 |
| 16 | Água | pág. 34, Jev 0.98 |
| 17 | Outros Fluidos | pág. 34, Jev 0.96 |
| 18 | Deslocações e Estadas | pág. 34, Jev 1 |
| 19 | Transp. Pessoal | pág. 34, precedente |
| 20 | Rendas e Alugueres | pág. 34, precedente |
| 21 | Comunicação | pág. 34, Jev 1 |
| 22 | Seguros | pág. 34, Jev 0.96 |
| 23 | Contencioso e Notariado | pág. 34, Jev 1 |
| 24 | Limpeza, Higiene e Conforto | pág. 34, Jev 1 |
| 25 | Outros Serviços | pág. 34, Jev 1 |
| 26 | Remun. Órgãos sociais | pág. 32, Jev 1 |
| 27 | Remunerações pessoal | pág. 32, precedente |
| 28 | Indemnizações | pág. 32, precedente |
| 29 | Encargos s/ remunerações | pág. 32, Jev 0.92 |
| 30 | Seg. Acidentes de Trabalho | pág. 32, Jev 0.99 |
| 31 | Outros Gastos c/ Pessoal | pág. 32, precedente |
| 32 | Imparidade de dívidas a receber (perdas/reversões) | pág. 8, Jev 0.99 |
| 33 | Provisões (aumentos/reduções) | pág. 8, Jev 0.98 |
| 34 | Impostos | pág. 35, Jev 0.95 |
| 35 | Desc. Pp concedidos | pág. 35, Jev 1 |
| 36 | Corr. Per. Anteriores | pág. 35, Jev 1 |
| 37 | Diferenças câmbio desf. | pág. 35, Jev 0.99 |
| 38 | Multas e penalidades | pág. 35, Jev 0.98 |
| 39 | Outros | pág. 35, Jev 0.99 |
| 40 | Gastos/reversões de depreciação e de amortização | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Arouca".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Arouca/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Arouca/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade | pág. 29, Jev 1 |
| 2 | Receitas de Bilheteira | pág. 29, Jev 0.99 |
| 3 | Transmissões Televisivas | pág. 29, Jev 1 |
| 4 | Ced. Temporária jogadores | pág. 29, Jev 1 |
| 5 | Subsídios e Prémios | pág. 29, precedente |
| 6 | Receitas Apostas Desport. | pág. 29, Jev 0.96 |
| 7 | Outros | pág. 29, precedente |
| 8 | Descontos pp obtidos | pág. 30, Jev 1 |
| 9 | Rend. Suplementares | pág. 30, Jev 0.99 |
| 10 | Al. ativos intangíveis-Passes atletas | pág. 30, Jev 0.99 |
| 11 | Outros Rendimentos | pág. 30, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Subcontratos | pág. 28, Jev 0.97 |
| 2 | Trabalhos Especializados | pág. 28, Jev 0.99 |
| 3 | Publicidade e propaganda | pág. 28, Jev 1 |
| 4 | Vigilância e Segurança | pág. 28, Jev 0.98 |
| 5 | Honorários | pág. 28, Jev 1 |
| 6 | Comissões | pág. 28, precedente |
| 7 | Conservação e Reparação | pág. 28, Jev 1 |
| 8 | Serviços Bancários | pág. 28, Jev 0.98 |
| 9 | Out. Serv. Especializados | pág. 28, Jev 0.95 |
| 10 | Ferr. Ut. Desgaste Rápido | pág. 28, Jev 1 |
| 11 | Material de Escritório | pág. 28, Jev 1 |
| 12 | Artigos Oferta | pág. 28, Jev 0.93 |
| 13 | Eletricidade | pág. 28, Jev 1 |
| 14 | Combustíveis | pág. 28, Jev 0.99 |
| 15 | Água | pág. 28, Jev 0.98 |
| 16 | Outros Fluidos | pág. 28, Jev 0.96 |
| 17 | Deslocações e Estadas | pág. 28, Jev 1 |
| 18 | Transp. Pessoal | pág. 28, precedente |
| 19 | Desloc. Estadas - outros | pág. 28, precedente |
| 20 | Rendas e Alugueres | pág. 28, precedente |
| 21 | Comunicação | pág. 28, Jev 1 |
| 22 | Seguros | pág. 28, Jev 0.96 |
| 23 | Contencioso e Notariado | pág. 28, Jev 1 |
| 24 | Limpeza, Higiene e Conforto | pág. 28, Jev 1 |
| 25 | Outros Serviços | pág. 28, Jev 1 |
| 26 | Remun. Órgãos sociais | pág. 27, Jev 1 |
| 27 | Remunerações pessoal | pág. 27, precedente |
| 28 | Indemnizações | pág. 27, precedente |
| 29 | Encargos s/ remunerações | pág. 27, Jev 0.92 |
| 30 | Seg. Acidentes de Trabalho | pág. 27, Jev 0.99 |
| 31 | Outros Gastos c/ Pessoal | pág. 27, precedente |
| 32 | Impostos | pág. 29, Jev 0.95 |
| 33 | Desc. Pp concedidos | pág. 29, Jev 1 |
| 34 | Corr. Per. Anteriores | pág. 29, Jev 1 |
| 35 | Diferenças câmbio desf. | pág. 29, Jev 0.99 |
| 36 | Multas e penalidades | pág. 29, Jev 0.98 |
| 37 | Outros | pág. 29, Jev 0.99 |
| 38 | Gastos/reversões de depreciação e de amortização | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 8 + "Financiamentos obtidos" pág. 8
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Arouca".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Arouca/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Arouca/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Publicidade | pág. 30, Jev 1 |
| 2 | Receitas de Bilheteira | pág. 30, Jev 0.99 |
| 3 | Corporate | pág. 30, Jev 0.95 |
| 4 | Transmissões Televisivas | pág. 30, Jev 1 |
| 5 | Subsídios e Prémios | pág. 30, precedente |
| 6 | Receitas Apostas Desport. | pág. 30, Jev 0.96 |
| 7 | Outros | pág. 30, precedente |
| 8 | Subsídios à exploração | pág. 7, Jev 0.98 |
| 9 | Descontos pp obtidos | pág. 31, Jev 1 |
| 10 | Rend. Suplementares | pág. 31, Jev 0.99 |
| 11 | Outros Rendimentos | pág. 31, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos Especializados | pág. 29, Jev 0.99 |
| 2 | Vigilância e Segurança | pág. 29, Jev 0.98 |
| 3 | Honorários | pág. 29, Jev 1 |
| 4 | Comissões | pág. 29, precedente |
| 5 | Conservação e Reparação | pág. 29, Jev 1 |
| 6 | Serviços Bancários | pág. 29, Jev 0.98 |
| 7 | Out. Serv. Especializados | pág. 29, Jev 0.95 |
| 8 | Ferr. Ut. Desgaste Rápido | pág. 29, Jev 1 |
| 9 | Material de Escritório | pág. 29, Jev 1 |
| 10 | Artigos Oferta | pág. 29, Jev 0.93 |
| 11 | Eletricidade | pág. 29, Jev 1 |
| 12 | Combustíveis | pág. 29, Jev 0.99 |
| 13 | Água | pág. 29, Jev 0.98 |
| 14 | Outros Fluidos | pág. 29, Jev 0.96 |
| 15 | Deslocações e Estadas | pág. 29, Jev 1 |
| 16 | Transp. Pessoal | pág. 29, precedente |
| 17 | Desloc. Estadas - outros | pág. 29, precedente |
| 18 | Rendas e Alugueres | pág. 29, precedente |
| 19 | Comunicação | pág. 29, Jev 1 |
| 20 | Seguros | pág. 29, Jev 0.96 |
| 21 | Contencioso e Notariado | pág. 29, Jev 1 |
| 22 | Limpeza, Higiene e Conforto | pág. 29, Jev 1 |
| 23 | Outros Serviços | pág. 29, Jev 1 |
| 24 | Remun. Órgãos sociais | pág. 28, Jev 1 |
| 25 | Remunerações pessoal | pág. 28, precedente |
| 26 | Indemnizações | pág. 28, precedente |
| 27 | Encargos s/ remunerações | pág. 28, Jev 0.92 |
| 28 | Seg. Acidentes de Trabalho | pág. 28, Jev 0.99 |
| 29 | Outros Gastos c/ Pessoal | pág. 28, precedente |
| 30 | Impostos | pág. 30, Jev 0.95 |
| 31 | Desc. Pp concedidos | pág. 30, Jev 1 |
| 32 | Corr. Per. Anteriores | pág. 30, Jev 1 |
| 33 | Multas e penalidades | pág. 30, Jev 0.98 |
| 34 | Outros | pág. 30, Jev 0.99 |
| 35 | Gastos/reversões de depreciação e de amortização | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 9 + "Financiamentos obtidos" pág. 9
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Arouca".
```

## Fuentes

### arouca-pt-wf-2024-2025-78053ec5

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Arouca/wf-2024-2025-78053ec5.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### arouca-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Arouca/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### arouca-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Arouca/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### arouca-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Arouca/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
