# estorilpraia-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/estorilpraia-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Estoril Praia: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.pdf. brandColor #FFE000
(procedencia en Admin/sourcing/Portugal/Estoril Praia.md; tools/cargar-lote.mjs).
```

```text
data/pt/estorilpraia-pt-data.js — Estoril Praia – Futebol, SAD (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "estorilpraia-pt" — slug de "Estoril Praia" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Estoril Praia – Futebol, SAD" — respuesta de Guido en la cola (49bfb4f)
  displayName        ok        "Estoril Praia" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (160 de 161 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 72 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), presente en el .md (el año más citado con fecha de cierre es 2028)
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (160 de 161 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "estorilpraia-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"estorilpraia-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estoril Praia/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 27, precedente |
| 2 | Competições nacionais | pág. 60, Claude 0.8 |
| 3 | Bilhetes época | pág. 60, Jev 1 |
| 4 | Patrocínio e publicidade | pág. 27, Jev 1 |
| 5 | Direitos de transmissão | pág. 27, Jev 1 |
| 6 | Atividades comerciais | pág. 27, Jev 0.99 |
| 7 | Contribuições da UEFA e prémios monetários | pág. 27, Jev 1 |
| 8 | Subsídio do Estado e Outros entes públicos | pág. 61, Jev 0.99 |
| 9 | Subsídio da UEFA | pág. 61, precedente |
| 10 | Outros subsídios | pág. 61, Jev 0.99 |
| 11 | Rendimentos suplementares | pág. 65, Jev 0.99 |
| 12 | Correções relativas a períodos anteriores | pág. 65, precedente |
| 13 | Outros rendimentos | pág. 65, Jev 0.99 |
| 14 | (Gastos)/rendimentos com transações de direitos de atletas | pág. 27, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 27, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 62, Jev 0.99 |
| 3 | Vigilância e Segurança | pág. 62, Jev 0.96 |
| 4 | Honorários | pág. 62, Jev 1 |
| 5 | Comissões | pág. 62, precedente |
| 6 | Conservação e Reparação | pág. 62, Jev 0.99 |
| 7 | Serviços bancários | pág. 62, Jev 0.98 |
| 8 | Materiais | pág. 62, precedente |
| 9 | Energia e fluídos | pág. 62, Jev 1 |
| 10 | Deslocações, estadas e transportes | pág. 62, Jev 1 |
| 11 | Serviços diversos | pág. 62, Jev 0.95 |
| 12 | Remunerações do pessoal | pág. 64, precedente |
| 13 | Indemnizações | pág. 64, precedente |
| 14 | Encargos sobre remunerações | pág. 64, Jev 0.92 |
| 15 | Seguros | pág. 64, precedente |
| 16 | Gastos de ação social | pág. 64, precedente |
| 17 | Outros gastos com pessoal | pág. 64, precedente |
| 18 | Impostos | pág. 65, Jev 0.93 |
| 19 | Correções relativas a períodos anteriores | pág. 65, Jev 0.99 |
| 20 | Quotizações | pág. 65, precedente |
| 21 | Multas desportivas | pág. 65, Jev 0.92 |
| 22 | Inscrições desportivas | pág. 65, precedente |
| 23 | Donativos | pág. 65, Jev 1 |
| 24 | Outros gastos | pág. 65, Jev 1 |
| 25 | Gastos/reversões de depreciação e de amortização (excluindo direitos de atletas) | pág. 27, Jev 0.99 |
| 26 | Gastos/reversões de depreciação e de amortização de direitos de atletas | pág. 27, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estoril Praia/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 22, precedente |
| 2 | Receitas de bilheteira | pág. 22, Jev 1 |
| 3 | Patrocínio e publicidade | pág. 22, precedente |
| 4 | Direitos de transmissão | pág. 22, precedente |
| 5 | Atividades comerciais | pág. 22, precedente |
| 6 | Contribuições da UEFA e prémios monetários | pág. 22, precedente |
| 7 | Subsídio do Estado e Outros entes públicos | pág. 53, precedente |
| 8 | Subsídio da UEFA | pág. 53, precedente |
| 9 | Outros subsídios | pág. 53, precedente |
| 10 | Rendimentos suplementares | pág. 55, precedente |
| 11 | Correções relativas a períodos anteriores | pág. 55, precedente |
| 12 | Outros rendimentos | pág. 55, precedente |
| 13 | (Gastos)/rendimentos com transações de passes de atletas | pág. 22, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 22, precedente |
| 2 | Trabalhos especializados | pág. 53, precedente |
| 3 | Vigilância e Segurança | pág. 53, precedente |
| 4 | Honorários | pág. 53, precedente |
| 5 | Comissões | pág. 53, precedente |
| 6 | Conservação e Reparação | pág. 53, precedente |
| 7 | Serviços bancários | pág. 53, precedente |
| 8 | Materiais | pág. 53, precedente |
| 9 | Energia e fluidos | pág. 53, precedente |
| 10 | Deslocações, estadas e transportes | pág. 53, precedente |
| 11 | Serviços diversos | pág. 53, precedente |
| 12 | Remunerações dos órgãos sociais | pág. 54, Jev 1 |
| 13 | Remunerações do pessoal | pág. 54, precedente |
| 14 | Indemnizações | pág. 54, precedente |
| 15 | Encargos sobre remunerações | pág. 54, precedente |
| 16 | Seguros | pág. 54, precedente |
| 17 | Gastos de ação social | pág. 54, precedente |
| 18 | Outros gastos com pessoal | pág. 54, precedente |
| 19 | Impostos | pág. 55, precedente |
| 20 | Correções relativas a períodos anteriores | pág. 55, precedente |
| 21 | Quotizações | pág. 55, precedente |
| 22 | Multas desportivas | pág. 55, precedente |
| 23 | Inscrições desportivas | pág. 55, precedente |
| 24 | Donativos | pág. 55, precedente |
| 25 | Outros gastos | pág. 55, precedente |
| 26 | Gastos/reversões de depreciação e de amortização (excluindo passes de jogadores) | pág. 22, Jev 1 |
| 27 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 22, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estoril Praia/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 23, precedente |
| 2 | Receitas de bilheteira | pág. 23, Jev 1 |
| 3 | Patrocínio e publicidade | pág. 23, Jev 1 |
| 4 | Direitos de transmissão | pág. 23, Jev 1 |
| 5 | Atividades comerciais | pág. 23, Jev 0.99 |
| 6 | Contribuições da UEFA e prémios monetários | pág. 23, Jev 1 |
| 7 | Subsídio do Estado e Outros entes públicos | pág. 55, Jev 0.99 |
| 8 | Subsídio da UEFA | pág. 55, precedente |
| 9 | Outros subsídios | pág. 55, Jev 0.99 |
| 10 | Rendimentos suplementares | pág. 57, Jev 0.99 |
| 11 | Correções relativas a períodos anteriores | pág. 57, precedente |
| 12 | Outros rendimentos | pág. 57, Jev 0.99 |
| 13 | (Gastos)/rendimentos com transações de passes de atletas | pág. 23, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 23, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 55, Jev 0.99 |
| 3 | Publicidade e Propaganda | pág. 55, Jev 1 |
| 4 | Vigilância e Segurança | pág. 55, Jev 0.96 |
| 5 | Honorários | pág. 55, Jev 1 |
| 6 | Comissões | pág. 55, precedente |
| 7 | Conservação e Reparação | pág. 55, Jev 0.99 |
| 8 | Serviços bancários | pág. 55, Jev 0.98 |
| 9 | Materiais | pág. 55, precedente |
| 10 | Energia e fluídos | pág. 55, Jev 1 |
| 11 | Deslocações, estadas e transportes | pág. 55, Jev 1 |
| 12 | Serviços diversos | pág. 55, Jev 0.95 |
| 13 | Remunerações dos órgãos sociais | pág. 56, Jev 1 |
| 14 | Remunerações do pessoal | pág. 56, precedente |
| 15 | Indemnizações | pág. 56, precedente |
| 16 | Encargos sobre remunerações | pág. 56, Jev 0.92 |
| 17 | Seguros | pág. 56, precedente |
| 18 | Gastos de ação social | pág. 56, precedente |
| 19 | Outros gastos com pessoal | pág. 56, precedente |
| 20 | Imparidade de dívidas a receber (perdas/reversões) | pág. 23, Jev 0.98 |
| 21 | Impostos | pág. 57, Jev 0.93 |
| 22 | Correções relativas a períodos anteriores | pág. 57, Jev 0.99 |
| 23 | Quotizações | pág. 57, precedente |
| 24 | Multas desportivas | pág. 57, Jev 0.92 |
| 25 | Inscrições desportivas | pág. 57, precedente |
| 26 | Donativos | pág. 57, Jev 1 |
| 27 | Outros gastos | pág. 57, Jev 1 |
| 28 | Gastos/reversões de depreciação e de amortização (excluindo passes de jogadores) | pág. 23, Jev 0.97 |
| 29 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 23, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Estoril Praia/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas | pág. 25, precedente |
| 2 | Receitas de bilheteira | pág. 25, Jev 1 |
| 3 | Patrocínio e publicidade | pág. 25, precedente |
| 4 | Direitos de transmissão | pág. 25, precedente |
| 5 | Atividades comerciais | pág. 25, precedente |
| 6 | Contribuições da UEFA e prémios monetários | pág. 25, precedente |
| 7 | Subsídio do Estado e Outros entes públicos | pág. 60, precedente |
| 8 | Subsídio da UEFA | pág. 60, precedente |
| 9 | Outros subsídios | pág. 60, precedente |
| 10 | Rendimentos suplementares | pág. 63, precedente |
| 11 | Correções relativas a períodos anteriores | pág. 63, precedente |
| 12 | Outros rendimentos | pág. 63, precedente |
| 13 | Imparidade de dívidas a receber (perdas/reversões) | pág. 25, Jev 1 |
| 14 | Gastos/rendimentos com transações de passes de atletas | pág. 25, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 25, precedente |
| 2 | Trabalhos especializados | pág. 61, precedente |
| 3 | Publicidade e Propaganda | pág. 61, Jev 1 |
| 4 | Vigilância e Segurança | pág. 61, precedente |
| 5 | Honorários | pág. 61, precedente |
| 6 | Comissões | pág. 61, precedente |
| 7 | Conservação e Reparação | pág. 61, precedente |
| 8 | Serviços bancários | pág. 61, precedente |
| 9 | Materiais | pág. 61, precedente |
| 10 | Energia e fluídos | pág. 61, precedente |
| 11 | Deslocações, estadas e transportes | pág. 61, precedente |
| 12 | Serviços diversos | pág. 61, precedente |
| 13 | Remunerações dos órgãos sociais | pág. 62, Jev 1 |
| 14 | Remunerações do pessoal | pág. 62, precedente |
| 15 | Indemnizações | pág. 62, precedente |
| 16 | Encargos sobre remunerações | pág. 62, precedente |
| 17 | Seguros | pág. 62, precedente |
| 18 | Outros gastos com pessoal | pág. 62, precedente |
| 19 | Impostos | pág. 63, precedente |
| 20 | Correções relativas a períodos anteriores | pág. 63, precedente |
| 21 | Quotizações | pág. 63, precedente |
| 22 | Multas desportivas | pág. 63, precedente |
| 23 | Inscrições desportivas | pág. 63, precedente |
| 24 | Donativos | pág. 63, precedente |
| 25 | Outros gastos | pág. 63, precedente |
| 26 | Gastos/reversões de depreciação e de amortização (excluindo passes de jogadores) | pág. 25, Jev 1 |
| 27 | Gastos/reversões de depreciação e de amortização com passes de jogadores | pág. 25, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia única por palabras "Estoril" = "Estoril Praia".
```

## Fuentes

### estorilpraia-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estoril Praia/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### estorilpraia-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estoril Praia/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### estorilpraia-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estoril Praia/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### estorilpraia-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Estoril Praia/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
