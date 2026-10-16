# casapia-pt — evidencia de carga

Lo que antes iba como comentario en el data file del club, `data/<país>/casapia-pt-data.js` (la regla: `Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA
COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de
fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
Casa Pia: alta por tools/alta-club.mjs (2026-10-16) desde Clubes/Portugal/Casa Pia/relatorio-contas-2024-25.pdf. brandColor #000000
(procedencia en Admin/sourcing/Portugal/Casa Pia.md; tools/cargar-lote.mjs).
```

```text
data/pt/casapia-pt-data.js — Casa Pia (Portugal).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-16), SIN EJERCICIOS CARGADOS TODAVÍA: las estructuras del data file
nacen vacías a propósito. Los rubros, los totales oficiales y el resto del fiscalYearMeta los agrega la etapa de carga.

Documento que originó el alta: Clubes/Portugal/Casa Pia/relatorio-contas-2024-25.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "casapia-pt" — slug de "Casa Pia" + '-pt' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               pendiente "Casa Pia" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
  displayName        ok        "Casa Pia" — nombre de la carpeta del club en Clubes/
  country            ok        "PT" — carpeta de país "Portugal" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Portugal
  fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (152 de 152 fechas de fin de mes caen en el mes 6)
  sport              ok        "futbol" — el .md nombra el fútbol 96 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (152 de 152 fechas de fin de mes caen en el mes 6))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
  currency           ok        "EUR" — moneda de curso legal de Portugal (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
  sourceId           ok        "casapia-pt-relatorio-contas-2024-25" — clubId + nombre del archivo en slug
  liga               ok        "pt-primeiraliga" — roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"casapia-pt-relatorio-contas-2024-25"}
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Casa Pia/relatorio-contas-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Casa Pia/relatorio-contas-2024-25.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas: | pág. 29, precedente |
| 2 | Bilheteira | pág. 29, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 29, Jev 1 |
| 4 | Receitas IV, Premios de participação Competições | pág. 29, precedente |
| 5 | Lucros jogos Online e Placard | pág. 29, Jev 0.97 |
| 6 | Serviços Scouting | pág. 29, precedente |
| 7 | Cedência direitos desportivos | pág. 29, Jev 0.99 |
| 8 | Subsídios à exploração | pág. 12, Jev 0.99 |
| 9 | Correções relativas a exercícios anteriores | pág. 31, precedente |
| 10 | Acordo de gestão | pág. 31, precedente |
| 11 | Alienações - ativos intangíveis | pág. 31, precedente |
| 12 | Outros rendimentos | pág. 31, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 12, Jev 0.97 |
| 2 | Fornecimentos e serviços externos | pág. 12, Jev 1 |
| 3 | Remunerações dos orgão sociais | pág. 30, Jev 0.99 |
| 4 | Remunerações do pessoal | pág. 30, precedente |
| 5 | Encargos sobre remunerações | pág. 30, Jev 0.9 |
| 6 | Seguros | pág. 30, precedente |
| 7 | Equipamentos | pág. 30, precedente |
| 8 | Correções relativas a exercícios anteriores | pág. 32, Jev 1 |
| 9 | Quotizações | pág. 32, precedente |
| 10 | Multas | pág. 32, Jev 1 |
| 11 | Gastos não devidamente documentados | pág. 32, Jev 1 |
| 12 | Acordo de gestão | pág. 32, precedente |
| 13 | Outros n/ aceites fiscalmente | pág. 32, Jev 0.97 |
| 14 | Gastos/reversões de depreciação e de amortização | pág. 12, Jev 0.91 |
| 15 | Imparidade de investimentos depreciáveis/amortizáveis (perdas/reversões) | pág. 12, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Casa Pia/relatorio-contas-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 18, Jev 1 |
| 2 | Patrocínios, publicidade e corporate | pág. 18, Jev 1 |
| 3 | Receitas TV, Premios de participação Competições | pág. 18, precedente |
| 4 | Lucros jogos Online e Placard | pág. 18, Jev 0.97 |
| 5 | Serviços Scouting | pág. 18, precedente |
| 6 | Cedência direitos desportivos | pág. 18, Jev 0.99 |
| 7 | Subsidios à exploração | pág. 9, Jev 0.99 |
| 8 | Outros rendimentos | pág. 9, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Trabalhos especializados | pág. 24, Jev 0.99 |
| 2 | Publicidade | pág. 24, Jev 1 |
| 3 | Vigilância e Segurança | pág. 24, Jev 0.97 |
| 4 | Honorários | pág. 24, Jev 1 |
| 5 | Conservação e reparação | pág. 24, Jev 1 |
| 6 | Serviços bancários | pág. 24, Jev 0.98 |
| 7 | Materias | pág. 24, precedente |
| 8 | Energia e fluidos | pág. 24, Jev 1 |
| 9 | Deslocações e estadas | pág. 24, Jev 1 |
| 10 | Rendas e alugueres | pág. 24, precedente |
| 11 | Contencioso e notariado | pág. 24, Jev 1 |
| 12 | Outros serviços diversos | pág. 24, Jev 1 |
| 13 | Remunerações dos orgão sociais | pág. 24, Jev 0.99 |
| 14 | Remunerações do pessoal | pág. 24, precedente |
| 15 | Indemnizações | pág. 24, precedente |
| 16 | Encargos sobre remunerações | pág. 24, Jev 0.9 |
| 17 | Seguros | pág. 24, precedente |
| 18 | Testes laboratoriais/COVID | pág. 24, precedente |
| 19 | Equipamentos | pág. 24, precedente |
| 20 | Outros | pág. 24, Jev 0.91 |
| 21 | Correções relativas a exercícios anteriores | pág. 25, Jev 1 |
| 22 | Quotizações | pág. 25, precedente |
| 23 | Multas | pág. 25, Jev 1 |
| 24 | Gastos não devidamente documentados | pág. 25, Jev 1 |
| 25 | Acordo de gestão | pág. 25, precedente |
| 26 | Gastos de financiamento | pág. 25, precedente |
| 27 | Outros n/ aceites fiscalmente | pág. 25, Jev 0.97 |
| 28 | Gastos/reversões de depreciação e de amortização | pág. 9, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
```

## Fuentes

### casapia-pt-relatorio-contas-2024-25

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Casa Pia/relatorio-contas-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### casapia-pt-relatorio-contas-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Casa Pia/relatorio-contas-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
