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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento anterior): "Caixa e depósitos bancários" pág. 11
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin fila financiera; saldo Casa Pia Atlético Clube 24 323 en Outros passivos correntes (nota 16). Balance completo (Total do passivo 10 268 888); el saldo de 24.323 con el Clube es un adelanto para material deportivo ya regularizado, no un préstamo.
```

### Liga

```text
alta-club.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2024–25 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Casa Pia/relatorio-contas-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Casa Pia/relatorio-contas-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Vendas: | pág. 25, precedente |
| 2 | Bilheteira | pág. 25, Jev 1 |
| 3 | Patrocínios, publicidade e corporate | pág. 25, Jev 1 |
| 4 | Receitas TV, Premios de participação Competições | pág. 25, precedente |
| 5 | Lucros jogos Online e Placard | pág. 25, Jev 0.97 |
| 6 | Serviços Scouting | pág. 25, precedente |
| 7 | Cedência direitos desportivos | pág. 25, Jev 0.99 |
| 8 | Federação Portuguesa de Futebol | pág. 26, precedente |
| 9 | IEFP | pág. 26, Claude 0.85 |
| 10 | Correções relativas a exercícios anteriores | pág. 27, precedente |
| 11 | Acordo de gestão | pág. 27, precedente |
| 12 | Alienações - ativos intangíveis | pág. 27, precedente |
| 13 | Outros rendimentos | pág. 27, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo das mercadorias vendidas e das matérias consumidas | pág. 8, Jev 0.97 |
| 2 | Trabalhos especializados | pág. 26, Jev 0.99 |
| 3 | Publicidade | pág. 26, Jev 1 |
| 4 | Vigilância e Segurança | pág. 26, Jev 0.97 |
| 5 | Honorários | pág. 26, Jev 1 |
| 6 | Conservação e reparação | pág. 26, Jev 1 |
| 7 | Serviços bancários | pág. 26, Jev 0.98 |
| 8 | Materias | pág. 26, precedente |
| 9 | Energia e fluidos | pág. 26, Jev 1 |
| 10 | Deslocações e estadas | pág. 26, Jev 1 |
| 11 | Rendas e alugueres | pág. 26, precedente |
| 12 | Contencioso e notariado | pág. 26, Jev 1 |
| 13 | Outros serviços diversos | pág. 26, Jev 1 |
| 14 | Remunerações dos orgão sociais | pág. 27, Jev 0.99 |
| 15 | Remunerações do pessoal | pág. 27, precedente |
| 16 | Encargos sobre remunerações | pág. 27, Jev 0.9 |
| 17 | Seguros | pág. 27, precedente |
| 18 | Equipamentos | pág. 27, precedente |
| 19 | Outros | pág. 27, Jev 0.91 |
| 20 | Correções relativas a exercícios anteriores | pág. 28, Jev 1 |
| 21 | Gastos em investimentos não financeiros | pág. 28, Jev 1 |
| 22 | Quotizações | pág. 28, precedente |
| 23 | Multas | pág. 28, Jev 1 |
| 24 | Gastos não devidamente documentados | pág. 28, Jev 1 |
| 25 | Acordo de gestão | pág. 28, precedente |
| 26 | Outros n/ aceites fiscalmente | pág. 28, Jev 0.97 |
| 27 | Gastos/reversões de depreciação e de amortização | pág. 8, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1 (compuerta: documento siguiente): "Caixa e depósitos bancários" pág. 7
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Sin fila financiera; saldo Casa Pia Atlético Clube 98 356 en Outros passivos correntes (nota 16). Balance completo (Total do passivo 6 066 752). El saldo de 98 356 con el Clube, según la nota 16, es parte del Mecanismo de Solidaridad UEFA a transferir a la formación del Clube (no un préstamo), aunque la nota 4/related parties lo llame 'suprimentos' (línea 644). Si se lo contara como préstamo sería 98.356.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2023–24 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-16) desde Clubes/Portugal/Casa Pia/relatorio-contas-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Portugal/Casa Pia/relatorio-contas-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheteira | pág. 19, Jev 1 |
| 2 | Patrocínios, publicidade e corporate | pág. 19, Jev 1 |
| 3 | Receitas TV, Premios de participação Competições | pág. 19, precedente |
| 4 | Lucros jogos Online e Placard | pág. 19, Jev 0.97 |
| 5 | Serviços Scouting | pág. 19, precedente |
| 6 | Cedência direitos desportivos | pág. 19, Jev 0.99 |
| 7 | Federação Portuguesa de Futebol | pág. 19, precedente |
| 8 | IEFP | pág. 19, Claude 0.85 |
| 9 | IAPMEI | pág. 19, Claude 0.85 |
| 10 | Outros rendimentos | pág. 9, Jev 0.98 |

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
| 13 | Remunerações dos orgão sociais | pág. 25, Jev 0.99 |
| 14 | Remunerações do pessoal | pág. 25, precedente |
| 15 | Indemnizações | pág. 25, precedente |
| 16 | Encargos sobre remunerações | pág. 25, Jev 0.9 |
| 17 | Seguros | pág. 25, precedente |
| 18 | Equipamentos | pág. 25, precedente |
| 19 | Outros | pág. 25, Jev 0.91 |
| 20 | Correções relativas a exercícios anteriores | pág. 25, Jev 1 |
| 21 | Gastos em investimentos não financeiros | pág. 25, Jev 1 |
| 22 | Quotizações | pág. 25, precedente |
| 23 | Multas | pág. 25, Jev 1 |
| 24 | Gastos não devidamente documentados | pág. 25, Jev 1 |
| 25 | Acordo de gestão | pág. 25, precedente |
| 26 | Outros n/ aceites fiscalmente | pág. 25, Jev 0.97 |
| 27 | Gastos/reversões de depreciação e de amortização | pág. 9, Jev 0.91 |

### Meta

```text
tools/cargar.mjs (2026-10-16). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento anterior): "Caixa e equivalentes" pág. 14
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Casa Pia Atlético Clube (Ateneu Casapiano) 851 121 dentro de Outros passivos correntes (nota 13.2.5), suprimentos. Suprimentos del Clube; se capitalizaron en el aumento de capital de 850.000 en 2024.
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-primeiraliga, verificado contra roster cacheado de "2022–23 Primeira Liga" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
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

```text
tools/caja-deuda.mjs (2026-10-16): cash escalón 1b (compuerta: documento siguiente): "Caixa e equivalentes" pág. 14
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Casa Pia Atlético Clube (Ateneu Casapiano) 817 335 dentro de Outras dívidas a pagar (nota 13.2.5), 'suprimentos efetuados'. No hay fila financiera en el balance; el único préstamo es el suprimento del Clube (accionista 100%) dentro de Outras dívidas a pagar (total 1 138 949; el resto es personal, acréscimos, Pantel y devedores diversos).
```

### Liga

```text
tools/cargar.mjs (2026-10-16): pt-ligaportugal2, verificado contra roster cacheado de "2021–22 Liga Portugal 2" (tools/club-league-reference/pt.json), coincidencia exacta "Casa Pia".
```

## Gestiones

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-17/resultado-14.json, tools/gestiones-tanda.mjs, 2026-10-17):_

```text
Victor Domingos Seabra Franco (2006-01-01 a hoy): Presidente del Casa Pia AC desde 2006 (A Bola, 6/6/2025: 'iniciou funções em 2006', solo el año: día y mes 01); reelecto sin oposición en junio de 2025 para 2025-28, por lo que sigue (hasta null). Firma como 'Victor Domingos Seabra Franco - Presidente' los balances 2021/22 (relatorio-contas-2021-22.md:272, 334, 1089), 2022/23 (relatorio-contas-2022-23.md:190, 1036), 2023/24 (relatorio-contas-2023-24.md:175, 1213) y 2024/25 (relatorio-contas-2024-25.md:299, 1333). Capital de Casa Pia Atlético Clube - Futebol SDUQ, Lda detenido al 100% por el club (relatorio-contas-2024-25.md:771). Los datos de MSD Capital/Robert Platek (Wikipedia lista a Platek de dueño) no figuran en los informes ni hay fecha confirmada, por eso no se carga como dueño; la gestión fue la misma en los cuatro cierres.
Duda: Inicio exacto en la presidencia no hallado (solo 2006; se usa 2006-01-01).
Duda: Fecha y estructura de la entrada de MSD Capital (Robert Platek) en la SDUQ: una nota de A Bola 2025 habla de una sociedad con MSD Capital, pero el informe 2024/25 todavía muestra al club con el 100%; no verificado.
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

### casapia-pt-relatorio-contas-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Casa Pia/relatorio-contas-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### casapia-pt-relatorio-contas-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-16) desde la transcripción Clubes/Portugal/Casa Pia/relatorio-contas-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
