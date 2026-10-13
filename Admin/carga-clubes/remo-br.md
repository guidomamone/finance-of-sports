# remo-br — evidencia de carga

Lo que había como comentario en `data/br/remo-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/remo-br-data.js — Clube do Remo (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Remo/demonstracoes-contabeis-2021.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "remo-br" — slug de "Remo" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Clube do Remo" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
  displayName        ok        "Remo" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] clube de remo: #0F141F Black, #FEFEFE White | [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C
  anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
  sourceId           ok        "remo-br-demonstracoes-contabeis-2021" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Remo"

FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"remo-br-demonstracoes-contabeis-2021"}
============================================================================
```

_de data/clubs.js:_

```text
Remo: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-contabeis-2021.pdf. brandColor #111533
(procedencia en Admin/sourcing/Brasil/Remo.md; tools/cargar-lote.mjs).
```

_de data/club-leagues/br.js:_

```text
Remo (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Remo".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de futebol | pág. 9, Jev 0.94 |
| 2 | Aluguéis | pág. 24, precedente |
| 3 | Estacionamento | pág. 24, precedente |
| 4 | Royalties de lojas | pág. 24, precedente |
| 5 | Patrimoniais | pág. 24, precedente |
| 6 | Atividade sociais e esportivas | pág. 24, precedente |
| 7 | Programa timemania | pág. 24, precedente |
| 8 | Marketing, patrocínio e publicidade | pág. 24, precedente |
| 9 | Royalties licenciados | pág. 24, precedente |
| 10 | Sócio torcedor | pág. 24, precedente |
| 11 | Venda de materiais | pág. 24, precedente |
| 12 | Outras receitas (despesas) | pág. 9, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Custos das atividades esportivas | pág. 9, Jev 0.99 |
| 2 | Despesas administrativas | pág. 9, Jev 1 |
| 3 | Despesas tributárias | pág. 9, Jev 1 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.197.447. Onboarding to-do 165 (Claude, 2026-10-09): corrige el ajuste anterior de la misma fila, que no sacaba 'Receitas recorrentes' (42.297.318, L242) y la sumaba dos veces con sus 10 componentes de la nota 16 (L797-L806, suman 42.297.318)
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 888.197. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.715.210. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.789.439. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 821.643. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 870.607. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 23.627.425. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 583.704. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 6.492.978. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.310.668. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/dre-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/dre-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita Operacional Bruta | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, precedente |
| 2 | Despesas Operacionais | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L11 Receita Operacional Líquida 38.291.717 repite L10 (Bruta, sin deducciones) y L12 Resultado Operacional Bruto: el ingreso es uno solo, 38.291.717, y se contaba dos veces
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 26.177. Onboarding to-do 165 (Claude, 2026-10-09): la extracción sumó receitas y despesas financeiras con el mismo signo (0,934581). Receita financeira es positiva: -12.124.901 + 26.177 - 908.404 = -13.007.128 (L18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = -908.404. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero, resta: -12.124.901 + 26.177 - 908.404 = -13.007.128 (L18)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício firmada por el contador (una página); el balance del año está en otro PDF (descartado para la carga)
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2024) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2024) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2024) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2024) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2024) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Inversiones (amortizaciones y depreciación), Organización de partidos
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/dre-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/dre-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita Operacional Bruta | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 1, precedente |
| 2 | Despesas Operacionais | pág. 1, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L12 Receita Operacional Líquida 33.831.604 repite L10 (Bruta, sin deducciones) y L14 Resultado Operacional Bruto: el ingreso es uno solo, 33.831.604, y se contaba dos veces
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício firmada por el contador (una página); el balance del año está en otro PDF (descartado para la carga)
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Inversiones (amortizaciones y depreciación), Organización de partidos
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/relatorio-auditor-independente-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/relatorio-auditor-independente-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita de Alugueis | pág. 11, Claude 0.85 |
| 2 | Receita de Estacionamento | pág. 11, Claude 0.85 |
| 3 | Receita de Bilheteria | pág. 11, Jev 1 |
| 4 | Receita Royalties / Lojas | pág. 11, precedente |
| 5 | Receita Patrimoniais/Sociais | pág. 11, precedente |
| 6 | Receita da Atividade Social | pág. 11, Jev 0.96 |
| 7 | Receita Programa Timemania | pág. 11, precedente |
| 8 | Receita Programa Socio Torcedor | pág. 11, Jev 1 |
| 9 | Receita de Patrocínio / Marketing | pág. 11, Jev 1 |
| 10 | Receitas Royalties / Licenciados | pág. 11, Jev 0.95 |
| 11 | Receita com Vendas Materiais | pág. 11, precedente |
| 12 | Demais Receitas | pág. 11, Jev 0.99 |
| 13 | Receitas Repasse de Direitos Federativos | pág. 11, Jev 1 |
| 14 | Receita de Premiações | pág. 11, Jev 1 |
| 15 | Diferencia en el documento: total Receita Bruta Operacional vs sus renglones | pág. 11, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 11, Jev 1 |
| 2 | Comissões | pág. 11, precedente |
| 3 | Materiais | pág. 11, Jev 0.91 |
| 4 | Manutenção | pág. 11, Jev 0.99 |
| 5 | Despesas com eventos esportivos | pág. 11, Jev 1 |
| 6 | Custo com Contratação | pág. 11, precedente |
| 7 | Serviço de Terceiros | pág. 11, Jev 0.95 |
| 8 | Materiais esportivos e premiações | pág. 11, precedente |
| 9 | Amortização dos Débitos Trabalhistas | pág. 11, Jev 0.91 |
| 10 | Despesas com tributos | pág. 11, Jev 1 |
| 11 | Despesas com depreciação e amortização | pág. 11, Jev 0.98 |
| 12 | Amortizações - Direitos Econômicos | pág. 11, Jev 1 |
| 13 | Despesa com Contingências | pág. 11, precedente |
| 14 | Outras Despesas | pág. 11, Jev 0.99 |
| 15 | Despesas com Pessoal | pág. 11, precedente |
| 16 | Despesa com direito de imagem | pág. 12, Claude 0.9 |
| 17 | Despesas com Jogos e Competições | pág. 12, Jev 0.99 |
| 18 | Despesas Programa Sócio Torcedor | pág. 12, Jev 1 |
| 19 | Despesas com Passagens e Hospedagens | pág. 12, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L281 (21.545.016) es el total de los renglones de ingreso impresos debajo (L282-L298); la nota 13 (L982-L985) lo reparte en otras categorías (Operacionais/Ordinárias) y se contaba dos veces junto a los 17 renglones. Se cargan los renglones del estado
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L299 Receita Líquida 21.545.016 repite el total de L281 (sin deducciones): se contaba otra vez
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 198.800. Onboarding to-do 165 (Claude, 2026-10-09): el total impreso L281/L299 es 21.545.016 pero los renglones L282-L298 suman 21.346.216 (17 renglones, incluidas las Receitas Financeiras 14.197); falta 198.800 que el documento no abre. Sin esa diferencia el resultado no cierra: 21.545.016 - 29.103.327 - 406.410 = -7.964.721 (L337-L338). La versión anterior descartada sí sumaba (patrocinio 5.311.429 y demais 906.122, total 20.328.785); en la final sube el total en 1.216.231 y los renglones en 1.017.429
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 14.197. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): lo cuenta el total de L281; con el signo bien el resultado cierra
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = -406.410. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): -7.558.310 - 406.410 = -7.964.720 (impreso -7.964.721, L338)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita de Aluguéis | pág. 16, Claude 0.85 |
| 2 | Receita de Estacionamento | pág. 16, Claude 0.85 |
| 3 | Receita de Bilheteria | pág. 16, Jev 1 |
| 4 | Receita Royalties / Lojas | pág. 16, precedente |
| 5 | Receita Patrimoniais/Sociais | pág. 16, precedente |
| 6 | Receita da Atividade Social | pág. 16, Jev 0.96 |
| 7 | Receita Programa Timemania | pág. 16, precedente |
| 8 | Receita Programa Socio Torcedor | pág. 16, Jev 1 |
| 9 | Receita de Patrocínio / Marketing | pág. 16, Jev 1 |
| 10 | Receita de Direito de Transmissão | pág. 16, Jev 1 |
| 11 | Receitas Royalties / Licenciados | pág. 16, Jev 0.95 |
| 12 | Receita com Vendas Materiais | pág. 16, precedente |
| 13 | Demais Receitas | pág. 16, Jev 0.99 |
| 14 | Receita com redução juros/multa - Perse | pág. 16, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas Administrativas | pág. 16, Jev 1 |
| 2 | Comissões | pág. 16, precedente |
| 3 | Materiais | pág. 16, Jev 0.91 |
| 4 | Manutenção | pág. 16, Jev 0.99 |
| 5 | Programa Sócio Torcedor | pág. 16, Jev 0.99 |
| 6 | Serviço de Terceiros | pág. 16, Jev 0.95 |
| 7 | Materiais esportivos e premiações | pág. 16, precedente |
| 8 | Despesas com Amortização dos Débitos Trabalhistas | pág. 16, precedente |
| 9 | Despesas com tributos | pág. 16, Jev 1 |
| 10 | Despesas com depreciação e amortização | pág. 16, Jev 0.98 |
| 11 | Outras Despesas | pág. 16, Jev 0.99 |
| 12 | Despesas com Pessoal | pág. 16, precedente |
| 13 | Direito de imagem | pág. 16, Jev 1 |
| 14 | Despesas com Jogos e Competições | pág. 16, Jev 0.99 |
| 15 | Despesas Programa Socio Torcedor | pág. 16, Jev 1 |
| 16 | Despesas com Passagens e Hospedagens | pág. 16, Jev 0.99 |

### Meta

```text
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/relatorio-auditoria-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/relatorio-auditoria-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita De Atividades Esportivas | pág. 8, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custos das Atividades Esportivas | pág. 8, precedente |
| 2 | Despesas c/ drepreciação/amortização | pág. 8, precedente |
| 3 | (-) Despesas Operacionais (sin Resultado Financeiro) | pág. 8, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L191 (12.351.668,08) es el subtotal de L192 (Receita De Atividades Esportivas, único componente, mismo importe): se cargaba dos veces; el ingreso es 12.351.668,08
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L193 (7.548.640,50) es el subtotal de L194 (mismo importe, único componente): se cargaba dos veces
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L200 ((1.923.969,31)) es el subtotal de L201 (mismo importe, único componente): se cargaba dos veces; se carga L201 como gasto (depreciación)
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L198 (4.555.340,59) es parte del subtotal L197 (4.943.560,99); el subtotal se carga entero en una fila, sin el Resultado Financeiro (L199): ver el ajuste de L197
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 4.749.468,16. Onboarding to-do 165 (Claude, 2026-10-09): el Resultado Financeiro (L199, 194.092,83) está incluido en Despesas Operacionais (L197, 4.943.560,99): 4.803.027,58 - 4.943.560,99 - 1.923.969,31 = -2.064.502,72 = resultado impreso (L202-L204), sin restar el financiero aparte. Se separa: 4.943.560,99 - 194.092,83 = 4.749.468,16 de gastos operativos + 194.092,83 de costo financiero. Ojo: los hijos impresos (4.555.340,59 + 194.092,83 = 4.749.433,42) no suman el subtotal: faltan 194.127,57 sin renglón impreso
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Organización de partidos
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2020: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2020 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/dre-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Remo/dre-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receita De Atividades Esportivas | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Despesas Operacionais (sin Resultado Financeiro) | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-12-31. Onboarding to-do 165 (Claude, 2026-10-09): periodo.mjs no lee el encabezado partido en celdas; el DRE va del 01/01/2019 al 31/12/2019
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L13 (subtotal 17.903.353,17) repite L14 (Receita De Atividades Esportivas, único componente) y L15 (Receita Líquida) repite otra vez: el ingreso es uno solo, 17.903.353,17; se carga L14
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): ídem: L15 Receita Líquida 17.903.353,17 es el mismo ingreso de L14 (sin deducciones)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 20.686.217,40. Onboarding to-do 165 (Claude, 2026-10-09): el Resultado Financeiro (L18, 225.425,57) está incluido en Despesas Operacionais (L17, 20.911.642,97): 17.903.353,17 - 20.911.642,97 = -3.008.289,80 = resultado impreso (L19-L21). Se separa: 20.911.642,97 - 225.425,57 = 20.686.217,40 de gastos operativos + 225.425,57 de costo financiero
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício firmada por el contador (una página); el balance del año está en otro PDF (descartado para la carga)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Inversiones (amortizaciones y depreciación), Organización de partidos, Administración y gastos generales
```

_al lado del campo `incluidoEn`:_

```text
ajuste manual `incluye`: el documento junta estas categorías con otra línea
```

```text
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2019: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2019 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### remo-br-demonstracoes-contabeis-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-demonstracoes-financeiras-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-relatorio-auditor-independente-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/relatorio-auditor-independente-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-dre-2019

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/dre-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-relatorio-auditoria-2020

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/relatorio-auditoria-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-dre-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/dre-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### remo-br-dre-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/dre-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
