# pacosdeferreira-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/pacosdeferreira-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Paços de Ferreira: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas_2425.pdf. brandColor #FFDD00
(procedencia en Admin/sourcing/Portugal/Paços de Ferreira.md; tools/cargar-lote.mjs).
```

```text
data/pt/pacosdeferreira-pt-data.js — Paços de Ferreira (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Paços de Ferreira/contas_2425.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "pacosdeferreira-pt" — slug de "Paços de Ferreira" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Paços de Ferreira" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Paços de Ferreira" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (25 de 25 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 30 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): El nombre del archivo (2425) se lee como año 2425; el ejercicio es 2024-25,
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (25 de 25 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "pacosdeferreira-pt-contas-2425" — clubId + nombre del archivo en slug
  liga               ok        "pt-ligaportugal2" — roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"pacosdeferreira-pt-contas-2425"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas_2425.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/contas_2425.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 12, Jev 1 |
| 2 | Publicidade | pág. 12, Jev 1 |
| 3 | Direitos televisivos | pág. 12, Jev 1 |
| 4 | Bilhetes, camarotes e cativos | pág. 12, Jev 0.92 |
| 5 | Competições | pág. 12, precedente |
| 6 | Mecanismo de solidariedade | pág. 12, precedente |
| 7 | Outros | pág. 12, precedente |
| 8 | Subsídios formação UEFA | pág. 13, Jev 0.99 |
| 9 | Outros | pág. 13, precedente |
| 10 | Cedências jogadores | pág. 14, Jev 0.96 |
| 11 | Lucros Placard | pág. 14, Jev 0.96 |
| 12 | Cedência de Espaço | pág. 14, Claude 0.8 |
| 13 | Outros | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 1, Jev 0.97 |
| 2 | Subcontratos | pág. 16, Jev 0.96 |
| 3 | Trabalhos Especializados | pág. 16, Jev 0.99 |
| 4 | Publicidade e Propaganda | pág. 16, Jev 1 |
| 5 | Vigilância e Segurança | pág. 16, Jev 0.96 |
| 6 | Honorários | pág. 16, Jev 1 |
| 7 | Comissões | pág. 16, precedente |
| 8 | Conservação e Reparação | pág. 16, Jev 0.99 |
| 9 | Liga | pág. 16, precedente |
| 10 | Outros Serviços Especializados | pág. 16, precedente |
| 11 | Ferramentas e utensílios desgaste rápido | pág. 16, Jev 1 |
| 12 | Material de Escritório | pág. 16, Jev 1 |
| 13 | Eletricidade | pág. 16, Jev 1 |
| 14 | Combustíveis | pág. 16, Jev 0.98 |
| 15 | Água | pág. 16, Jev 1 |
| 16 | Outros | pág. 16, Jev 0.99 |
| 17 | Deslocações e Estadas | pág. 16, Jev 1 |
| 18 | Rendas e alugueres | pág. 16, precedente |
| 19 | Comunicação | pág. 16, Jev 1 |
| 20 | Seguros | pág. 16, Claude 0.8 |
| 21 | Contencioso e notariado | pág. 16, Jev 1 |
| 22 | Limpeza, higiene e conforto | pág. 16, Jev 1 |
| 23 | Outros Serviços | pág. 16, Jev 1 |
| 24 | Jogadores | pág. 15, Jev 1 |
| 25 | Treinadores | pág. 15, Jev 0.96 |
| 26 | Pessoal Diverso | pág. 15, precedente |
| 27 | Encargos sobre remunerações | pág. 15, Jev 0.91 |
| 28 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 15, Jev 1 |
| 29 | Impostos | pág. 17, Jev 0.95 |
| 30 | Multas/coimas | pág. 17, Jev 0.97 |
| 31 | Despesas não devidamente documentadas | pág. 17, Jev 1 |
| 32 | Correções relativas a períodos anteriores | pág. 17, Jev 1 |
| 33 | Outros | pág. 17, Jev 0.99 |
| 34 | Gastos/reversões de depreciação e de amortização | pág. 1, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2025. El nombre del archivo (2425) se lee como año 2425; el ejercicio es 2024-25, cierre 30/06/2025.
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "Financiamentos obtidos" pág. 2; cash escalón 1 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 2
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2024–25 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas23_24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/contas23_24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 15, Jev 1 |
| 2 | Publicidade | pág. 15, Jev 1 |
| 3 | Direitos televisivos | pág. 15, Jev 1 |
| 4 | Bilhetes, camarotes e cativos | pág. 15, Jev 0.92 |
| 5 | Competições | pág. 15, precedente |
| 6 | Outros | pág. 15, precedente |
| 7 | Subsídios formação UEFA | pág. 16, Jev 0.99 |
| 8 | Outros | pág. 16, precedente |
| 9 | Cedências jogadores | pág. 16, Jev 0.96 |
| 10 | Lucros Placard | pág. 16, Jev 0.96 |
| 11 | Cedência de Espaço | pág. 16, Claude 0.8 |
| 12 | Outros | pág. 16, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 2, Jev 0.97 |
| 2 | Subcontratos | pág. 18, Jev 0.96 |
| 3 | Trabalhos Especializados | pág. 18, Jev 0.99 |
| 4 | Publicidade e Propaganda | pág. 18, Jev 1 |
| 5 | Vigilância e Segurança | pág. 18, Jev 0.96 |
| 6 | Honorários | pág. 18, Jev 1 |
| 7 | Comissões | pág. 18, precedente |
| 8 | Conservação e Reparação | pág. 18, Jev 0.99 |
| 9 | Liga | pág. 18, precedente |
| 10 | Outros Serviços Especializados | pág. 18, precedente |
| 11 | Ferramentas e utensílios desgaste rápido | pág. 18, Jev 1 |
| 12 | Material de Escritório | pág. 18, Jev 1 |
| 13 | Eletricidade | pág. 18, Jev 1 |
| 14 | Combustíveis | pág. 18, Jev 0.98 |
| 15 | Água | pág. 18, Jev 1 |
| 16 | Outros | pág. 18, Jev 0.99 |
| 17 | Deslocações e Estadas | pág. 18, Jev 1 |
| 18 | Rendas e alugueres | pág. 18, precedente |
| 19 | Comunicação | pág. 18, Jev 1 |
| 20 | Seguros | pág. 18, Claude 0.8 |
| 21 | Contencioso e notariado | pág. 18, Jev 1 |
| 22 | Limpeza, higiene e conforto | pág. 18, Jev 1 |
| 23 | Outros Serviços | pág. 18, Jev 1 |
| 24 | Jogadores | pág. 17, Jev 1 |
| 25 | Treinadores | pág. 17, Jev 0.96 |
| 26 | Pessoal Diverso | pág. 17, precedente |
| 27 | Encargos sobre remunerações | pág. 17, Jev 0.91 |
| 28 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 17, Jev 1 |
| 29 | Outros gastos com o pessoal | pág. 17, precedente |
| 30 | Imparidade de dívidas a receber (perdas/reversões) | pág. 2, Jev 0.99 |
| 31 | Impostos | pág. 19, Jev 0.95 |
| 32 | Abates | pág. 19, precedente |
| 33 | Multas/coimas | pág. 19, Jev 0.97 |
| 34 | Despesas não devidamente documentadas | pág. 19, Jev 1 |
| 35 | Correções relativas a períodos anteriores | pág. 19, Jev 1 |
| 36 | Despesas cedência Sergio Oliveira | pág. 19, precedente |
| 37 | Outros | pág. 19, Jev 0.99 |
| 38 | Gastos/reversões de depreciação e de amortização | pág. 2, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2024. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2024 según el registro (periodo.cierre).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 1; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 1
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2023–24 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas22_23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/contas22_23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 15, precedente |
| 2 | Publicidade | pág. 15, precedente |
| 3 | Direitos televisivos | pág. 15, precedente |
| 4 | Bilhetes, camarotes e cativos | pág. 15, precedente |
| 5 | Competições | pág. 15, precedente |
| 6 | Outros | pág. 15, precedente |
| 7 | Subsídios Estado | pág. 16, Jev 0.99 |
| 8 | Subsídios formação UEFA | pág. 16, precedente |
| 9 | Subsídios Taça de Portugal | pág. 16, precedente |
| 10 | Outros | pág. 16, precedente |
| 11 | Cedências jogadores | pág. 15, precedente |
| 12 | Lucros Placard | pág. 15, precedente |
| 13 | Outros | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 2, precedente |
| 2 | Subcontratos | pág. 18, precedente |
| 3 | Trabalhos Especializados | pág. 18, precedente |
| 4 | Publicidade e Propaganda | pág. 18, precedente |
| 5 | Vigilância e Segurança | pág. 18, precedente |
| 6 | Honorários | pág. 18, precedente |
| 7 | Comissões | pág. 18, precedente |
| 8 | Conservação e Reparação | pág. 18, precedente |
| 9 | Liga | pág. 18, precedente |
| 10 | Ferramentas e utensílios desgaste rápido | pág. 18, precedente |
| 11 | Material de Escritório | pág. 18, precedente |
| 12 | Eletricidade | pág. 18, precedente |
| 13 | Combustíveis | pág. 18, precedente |
| 14 | Água | pág. 18, precedente |
| 15 | Outros | pág. 18, precedente |
| 16 | Deslocações e Estadas | pág. 18, precedente |
| 17 | Rendas e alugueres | pág. 18, precedente |
| 18 | Comunicação | pág. 18, precedente |
| 19 | Seguros | pág. 18, precedente |
| 20 | Contencioso e notariado | pág. 18, precedente |
| 21 | Limpeza, higiene e conforto | pág. 18, precedente |
| 22 | Outros Serviços | pág. 18, precedente |
| 23 | Jogadores | pág. 17, precedente |
| 24 | Treinadores | pág. 17, precedente |
| 25 | Pessoal Diverso | pág. 17, precedente |
| 26 | Encargos sobre remunerações | pág. 17, precedente |
| 27 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 17, precedente |
| 28 | Outros gastos com o pessoal | pág. 17, precedente |
| 29 | Impostos | pág. 19, precedente |
| 30 | Abales | pág. 19, ? 0.6 |
| 31 | Outros | pág. 19, precedente |
| 32 | Cedência de Créditos IBB | pág. 19, Jev 0.96 |
| 33 | Gastos/reversões de depreciação e de amortização | pág. 2, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2023. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2023 según el registro (periodo.cierre).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 1; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 1
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/contas21_22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/contas21_22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 13, precedente |
| 2 | Publicidade | pág. 13, precedente |
| 3 | Direitos televisivos | pág. 13, precedente |
| 4 | Bilhetes, camarotes e cativos | pág. 13, precedente |
| 5 | Competições | pág. 13, precedente |
| 6 | Outros | pág. 13, precedente |
| 7 | Subsídios formação UEFA | pág. 14, precedente |
| 8 | Subsídios Taça de Portugal | pág. 14, precedente |
| 9 | Outros | pág. 14, precedente |
| 10 | Cedências jogadores | pág. 14, precedente |
| 11 | Lucros Placard | pág. 14, precedente |
| 12 | Outros | pág. 14, precedente |
| 13 | Diferências de Câmbio favoráveis | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 2, precedente |
| 2 | Cedências de Jogadores | pág. 16, precedente |
| 3 | Outros | pág. 16, precedente |
| 4 | Trabalhos Especializados | pág. 16, precedente |
| 5 | Publicidade e Propaganda | pág. 16, precedente |
| 6 | Vigilância e Segurança | pág. 16, precedente |
| 7 | Honorários | pág. 16, precedente |
| 8 | Comissões | pág. 16, precedente |
| 9 | Conservação e Reparação | pág. 16, precedente |
| 10 | Liga | pág. 16, precedente |
| 11 | Outros Serviços Especializados | pág. 16, precedente |
| 12 | Ferramentas e utensílios desgaste rápido | pág. 16, precedente |
| 13 | Material de Escritório | pág. 16, precedente |
| 14 | Outros materiais | pág. 16, Jev 0.96 |
| 15 | Eletricidade | pág. 16, precedente |
| 16 | Combustíveis | pág. 16, precedente |
| 17 | Água | pág. 16, precedente |
| 18 | Outros | pág. 16, precedente |
| 19 | Deslocações e Estadas | pág. 16, precedente |
| 20 | Rendas e alugueres | pág. 16, precedente |
| 21 | Comunicação | pág. 16, precedente |
| 22 | Seguros | pág. 16, precedente |
| 23 | Contencioso e notariado | pág. 16, precedente |
| 24 | Despesas de representação | pág. 16, Jev 0.99 |
| 25 | Limpeza, higiene e conforto | pág. 16, precedente |
| 26 | Outros Serviços | pág. 16, precedente |
| 27 | Jogadores | pág. 15, precedente |
| 28 | Treinadores | pág. 15, precedente |
| 29 | Pessoal Diverso | pág. 15, precedente |
| 30 | Encargos sobre remunerações | pág. 15, precedente |
| 31 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 15, precedente |
| 32 | Outros gastos com o pessoal | pág. 15, precedente |
| 33 | Impostos | pág. 17, precedente |
| 34 | Outros | pág. 17, precedente |
| 35 | Gastos/reversões de depreciação e de amortização | pág. 2, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2022. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2022 según el registro (periodo.cierre).
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): fila = 28.199,10. Claude 2026-10-16 (lote 82): la fila está dentro de la nota 'Outros Rendimentos' (Cedências 1.576.106,85 + Diferenças de câmbio 28.199,10 + Placard 338.529,17 + Outros 241.427,30 = 2.184.262,42), pero la extracción la puso como gasto y la categorización la sacó (no_es_rubro). Es ingreso: sin ella el resultado da -498.594 en vez de -470.395 (diferencia 28.199). Como Marítimo 2023 y Santa Clara 2024-25 (to-do 237 w)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): categoria = other_income. Claude 2026-10-16 (lote 82): diferencia de cambio favorable operativa, en la nota de Outros Rendimentos: other_income, como Tondela 2020-21 (la categorización la había sacado con no_es_rubro)
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 2 (compuerta: documento siguiente): "Financiamentos obtidos" pág. 1; cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 1
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2021–22 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas de Mercadorias (Merchandising) | pág. 18, precedente |
| 2 | Publicidade | pág. 18, precedente |
| 3 | Direitos televisivos | pág. 18, precedente |
| 4 | Bilhetes, camarotes e cativos | pág. 18, precedente |
| 5 | Competições | pág. 18, precedente |
| 6 | Outros | pág. 18, precedente |
| 7 | Subsidios Estado | pág. 18, Jev 0.99 |
| 8 | Subsidios formação UEFA | pág. 18, precedente |
| 9 | Subsidios Taça de Portugal | pág. 18, precedente |
| 10 | Outros | pág. 18, precedente |
| 11 | Ganhos por aumentos de justo valor | pág. 20, Jev 1 |
| 12 | Cedências jogadores | pág. 20, precedente |
| 13 | Alienações | pág. 20, Jev 0.97 |
| 14 | Lucros Placard | pág. 20, precedente |
| 15 | Outros | pág. 20, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 2, precedente |
| 2 | Fornecimentos e serviços externos | pág. 2, Jev 0.99 |
| 3 | Jogadores | pág. 20, precedente |
| 4 | Treinadores | pág. 20, precedente |
| 5 | Pessoal Diverso | pág. 20, precedente |
| 6 | Encargos sobre remunerações | pág. 20, precedente |
| 7 | Seguros de acidentes de trabalho e de doenças profissionais | pág. 20, precedente |
| 8 | Outros gastos com o pessoal | pág. 20, precedente |
| 9 | Impostos | pág. 21, precedente |
| 10 | Outros | pág. 21, precedente |
| 11 | Gastos/reversões de depreciação e de amortização | pág. 2, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-16): anio = 2020. El nombre del archivo no da el año (o lo da mal: '202223' se lee 2022); el ejercicio cierra el 30/06/2020 según el registro (periodo.cierre).
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Financiamentos obtidos corriente 1 407 049,60 (nota 11: bancos 404 049,60 + participantes de capital 470 000 + otros financiadores 533 000). Balance muestra todo en corriente; la nota 11 lo pone en columna no corriente (total igual). Aparte, Outras dívidas a pagar incluye "Accionistas" 2 785 258,28 (nota 12/23, sin aclarar que sean préstamos) que NO se sumó.; cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Caixa e depósitos bancários 18 269,55. Balance de la SAD (SDUQ) al 30/06/2020.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2019–20 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Paços de Ferreira".
```

## Fuentes

### pacosdeferreira-pt-contas-2425

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/contas_2425.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### pacosdeferreira-pt-47-demonstracoes-financeiras-compressed

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/47-DEMONSTRACOES-FINANCEIRAS_compressed.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### pacosdeferreira-pt-contas22-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/contas22_23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### pacosdeferreira-pt-contas23-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/contas23_24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### pacosdeferreira-pt-contas21-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Paços de Ferreira/contas21_22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
