# ferroviaria-br — evidencia de carga

Lo que había como comentario en `data/br/ferroviaria-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/ferroviaria-br-data.js — Ferroviária Futebol S.A. (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Ferroviaria/balanco-2010.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "ferroviaria-br" — slug de "Ferroviaria" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Ferroviária Futebol S.A." — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Fe
  displayName        ok        "Ferroviaria" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2010 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2010-12-31" — año del ejercicio + mes de cierre (contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — ajuste manual (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): una sola sociedad (CNPJ 06.020.811/0001-30, Fe
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2010-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2010-12-31 = 1.6662 (PTAX de cierre (venda) del Banco Central do Brasil al 2010-12-31)
  sourceId           ok        "ferroviaria-br-balanco-2010" — clubId + nombre del archivo en slug
  liga               pendiente null — no aparece en los rosters cacheados de 2010 (br-serieA): puede haber jugado otra división

FISCAL YEAR META PROPUESTO para 2010 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2010: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2010-12-31","sourceId":"ferroviaria-br-balanco-2010"}
============================================================================
```

_de data/clubs.js:_

```text
Ferroviaria: alta por tools/alta-club.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2010.pdf. brandColor #58141E
(procedencia en Admin/sourcing/Brasil/Ferroviaria.md, club-or-year-onboarding/club-nuevo.md).
```

_de data/club-leagues/br.js:_

```text
Ferroviaria (alta-club.mjs, 2026-10-10): SIN VERIFICAR (no aparece en los rosters cacheados de 2010 (br-serieA): puede haber jugado otra división).
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 7, Jev 1 |
| 2 | Patrocínio | pág. 7, Jev 1 |
| 3 | Direito de gestão comercial da arena | pág. 7, precedente |
| 4 | Timemania | pág. 7, Jev 1 |
| 5 | Auxílio financeiro | pág. 7, Jev 0.97 |
| 6 | Arrecadação de jogos | pág. 7, Jev 1 |
| 7 | Cessão temporária dos atletas | pág. 7, Jev 1 |
| 8 | Negociação de atletas | pág. 7, Jev 1 |
| 9 | Sócio torcedor | pág. 7, Claude 0.9 |
| 10 | Premiações | pág. 7, Claude 0.85 |
| 11 | Outras receitas | pág. 7, Jev 0.99 |
| 12 | Impostos incidentes sobre a receita | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 25, Claude 0.8 |
| 2 | Direito de uso de imagem | pág. 25, Jev 0.98 |
| 3 | Premiações | pág. 25, precedente |
| 4 | Viagens e hospedagens | pág. 25, Jev 0.97 |
| 5 | Com jogos | pág. 25, Jev 0.99 |
| 6 | Com refeições | pág. 25, precedente |
| 7 | Serviços de terceiros | pág. 25, Jev 0.92 |
| 8 | Taxas de federação e confederação | pág. 25, precedente |
| 9 | Agenciamento de atletas | pág. 25, precedente |
| 10 | Manutenção e conservação | pág. 25, Jev 0.96 |
| 11 | Moradia | pág. 25, Jev 0.92 |
| 12 | Mercadorias vendidas | pág. 25, precedente |
| 13 | Com atletas (empréstimos, luvas etc.) | pág. 25, precedente |
| 14 | Comissão | pág. 25, Jev 0.92 |
| 15 | Material esportivo | pág. 25, precedente |
| 16 | Amortização de atletas formados | pág. 25, Jev 0.99 |
| 17 | Outros custos | pág. 25, Jev 1 |
| 18 | Administrativas e gerais | pág. 8, Jev 1 |
| 19 | Com pessoal | pág. 8, precedente |
| 20 | Gastos com atletas não profissionais | pág. 8, Jev 0.98 |
| 21 | Com materiais | pág. 8, Jev 0.97 |
| 22 | Aluguéis | pág. 8, precedente |
| 23 | Tributária | pág. 8, Jev 0.98 |
| 24 | Outras despesas | pág. 8, Jev 0.98 |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 7, Jev 1 |
| 2 | Patrocínio | pág. 7, Jev 1 |
| 3 | Publicidade | pág. 7, Jev 1 |
| 4 | Arrecadação de jogos | pág. 7, Jev 1 |
| 5 | Cessão temporária dos atletas | pág. 7, Jev 1 |
| 6 | Venda dos direitos econômicos | pág. 7, Jev 1 |
| 7 | Sócio torcedor | pág. 7, Claude 0.9 |
| 8 | Premiações | pág. 7, Claude 0.85 |
| 9 | Outras receitas | pág. 7, Jev 0.99 |
| 10 | Impostos incidentes sobre a receita | pág. 7, Jev 0.99 |
| 11 | Outras receitas | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Com pessoal | pág. 26, Claude 0.8 |
| 2 | Direito de uso de imagem | pág. 26, Jev 0.98 |
| 3 | Premiações | pág. 26, precedente |
| 4 | Viagens e hospedagens | pág. 26, Jev 0.97 |
| 5 | Refeitório | pág. 26, precedente |
| 6 | Com jogos | pág. 26, Jev 0.99 |
| 7 | Serviços de terceiros | pág. 26, Jev 0.92 |
| 8 | Taxas de federação e confederação | pág. 26, precedente |
| 9 | Agenciamento de atletas | pág. 26, precedente |
| 10 | Manutenção e conservação | pág. 26, Jev 0.96 |
| 11 | Moradia | pág. 26, Jev 0.92 |
| 12 | Mercadorias vendidas | pág. 26, precedente |
| 13 | Com atletas (empréstimos, luvas etc.) | pág. 26, precedente |
| 14 | Material esportivo | pág. 26, precedente |
| 15 | Amortização de atletas formados | pág. 26, Jev 0.99 |
| 16 | Baixa de atletas formados | pág. 26, Jev 0.99 |
| 17 | Outros custos | pág. 26, Jev 1 |
| 18 | Administrativas e gerais | pág. 8, Jev 1 |
| 19 | Com pessoal | pág. 8, precedente |
| 20 | Atletas não profissionais | pág. 8, Jev 0.99 |
| 21 | Aluguéis | pág. 8, precedente |
| 22 | Tributária | pág. 8, Jev 0.98 |
| 23 | Outras despesas | pág. 8, Jev 0.98 |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série C" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 8, Jev 1 |
| 2 | Patrocínio | pág. 8, Jev 1 |
| 3 | Publicidade | pág. 8, Jev 1 |
| 4 | Arrecadação de jogos | pág. 8, Jev 1 |
| 5 | Cessão temporária dos atletas | pág. 8, Jev 1 |
| 6 | Cessão definitiva dos atletas | pág. 8, Jev 1 |
| 7 | Direitos econômicos | pág. 8, Claude 0.8 |
| 8 | Sócio torcedor | pág. 8, Claude 0.9 |
| 9 | Premiações | pág. 8, Jev 1 |
| 10 | Outras receitas | pág. 8, Jev 0.99 |
| 11 | Impostos incidentes sobre a receita | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Custos operacionais | pág. 8, precedente |
| 2 | Administrativas e gerais | pág. 9, Jev 1 |
| 3 | Com pessoal | pág. 9, precedente |
| 4 | Atletas não profissionais | pág. 9, Jev 0.99 |
| 5 | Com materiais | pág. 9, Jev 0.97 |
| 6 | Alojamento e moradia | pág. 9, precedente |
| 7 | Tributária | pág. 9, Jev 0.98 |
| 8 | Outras despesas | pág. 9, Jev 0.98 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/dre-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/dre-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de competições - futebol feminino: Campeonato Paulista | pág. 1, precedente |
| 2 | Rendas de competições - futebol feminino: Copa Libertadores | pág. 1, precedente |
| 3 | Transmissões esportivas - futebol masculino: Campeonato Paulista | pág. 1, precedente |
| 4 | Transmissões esportivas - futebol masculino: Copa do Brasil | pág. 1, precedente |
| 5 | Transações de atletas: venda dos direitos federativos e econômicos | pág. 1, precedente |
| 6 | Transações de atletas: repasse de cessão temporária | pág. 1, precedente |
| 7 | Transações de atletas - exterior: venda dos direitos federativos e econômicos | pág. 1, precedente |
| 8 | Transações de atletas - exterior: repasse de cessão temporária | pág. 1, precedente |
| 9 | Receita com formação | pág. 1, precedente |
| 10 | Premiações - futebol masculino: Campeonato Paulista | pág. 1, precedente |
| 11 | Premiações - futebol feminino: Campeonato Brasileiro | pág. 1, precedente |
| 12 | Premiações - futebol feminino: Campeonato Paulista | pág. 1, precedente |
| 13 | Outras premiações - futebol masculino: Programa de excelência FPF | pág. 1, precedente |
| 14 | Publicidade - futebol masculino: Campeonato Paulista | pág. 1, precedente |
| 15 | Patrocínios | pág. 1, precedente |
| 16 | Permuta | pág. 1, precedente |
| 17 | Mensalidade sócio torcedor | pág. 1, precedente |
| 18 | Venda de mercadorias | pág. 1, precedente |
| 19 | Lucro na alienação do ativo imobilizado | pág. 1, precedente |
| 20 | DEDUÇÕES DA RECEITA BRUTA | pág. 1, precedente |
| 21 | OUTRAS RECEITAS OPERACIONAIS | pág. 9, precedente |
| 22 | RECEITAS NÃO OPERACIONAIS | pág. 9, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | CUSTOS | pág. 1, precedente |
| 2 | DESPESAS OPERACIONAIS | pág. 6, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): filas-a-mano. Onboarding to-do 165 (Claude en sesión, 2026-10-09, pedido de Guido): extraer.mjs cortó por el tope de salida (balancete de ~580 cuentas, to-do 197); .filas.json armado a mano con la receita bruta abierta y los renglones de primer nivel
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): DRE del sistema contable de la SAF, 01/01 a 31/12/2022 (mismo formato que 2013-b a 2018)
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): cero-real = Estadio. Onboarding to-do 165 (Claude, 2026-10-09): el balancete de 2022 no tiene renta de partidos del fútbol masculino (las 'Rendas de competições' son del femenino, L20-L22)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 8, Jev 1 |
| 2 | Patrocínio | pág. 8, Jev 1 |
| 3 | Publicidade | pág. 8, Jev 1 |
| 4 | Cessão temporária dos atletas | pág. 8, Jev 1 |
| 5 | Cessão definitiva dos atletas | pág. 8, Jev 1 |
| 6 | Direitos econômicos | pág. 8, Claude 0.8 |
| 7 | Sócio torcedor | pág. 8, Claude 0.9 |
| 8 | Premiações | pág. 8, Jev 1 |
| 9 | Outras receitas | pág. 8, Jev 0.99 |
| 10 | Impostos incidentes sobre a receita | pág. 8, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Custos operacionais | pág. 8, precedente |
| 2 | Administrativas e gerais | pág. 9, Jev 1 |
| 3 | Com pessoal | pág. 9, precedente |
| 4 | Atletas não profissionais | pág. 9, Jev 0.99 |
| 5 | Com materiais | pág. 9, Jev 0.97 |
| 6 | Alojamento e moradia | pág. 9, precedente |
| 7 | Tributária | pág. 9, Jev 0.98 |
| 8 | Outras despesas | pág. 9, Jev 0.98 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/dre-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/dre-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de Jogos | pág. 1, Jev 1 |
| 2 | Cotas de TV | pág. 1, Jev 1 |
| 3 | Repasse Cessão Temporária dos Atletas | pág. 1, Jev 0.99 |
| 4 | Venda dos Direitos Econômicos Atletas | pág. 1, Jev 1 |
| 5 | Sócio Torcedor | pág. 1, precedente |
| 6 | Premios, Outras Receitas | pág. 1, precedente |
| 7 | Mercadorias c/Vendas | pág. 1, Jev 1 |
| 8 | Patrocinios | pág. 1, Jev 1 |
| 9 | Publicidades | pág. 1, Jev 1 |
| 10 | (-) Pis | pág. 1, Jev 0.94 |
| 11 | (-) Cofins | pág. 1, Jev 0.94 |
| 12 | (-) Icms | pág. 1, Jev 0.96 |
| 13 | Venda dos Vínculos Desportivos Atletas | pág. 5, Jev 1 |
| 14 | Aviso Prévio Descontado | pág. 5, Jev 0.9 |
| 15 | Multa Contratual | pág. 5, Jev 0.99 |
| 16 | Bonificações | pág. 5, Jev 0.97 |
| 17 | Indenizações Recebidas | pág. 5, Jev 1 |
| 18 | Reversão de Provisão de Férias | pág. 5, Jev 0.92 |
| 19 | Reversão de Provisão INSS Férias | pág. 5, Jev 1 |
| 20 | Reversão de Provisão FGTS Férias | pág. 5, Jev 1 |
| 21 | Reversão de Provisão PIS Férias | pág. 5, Jev 1 |
| 22 | Ajuste de Correção - FPF | pág. 6, Jev 0.99 |
| 23 | Multa Tribunal de Justiça Desportiva | pág. 6, Jev 1 |
| 24 | Despesas Processuais FIFA | pág. 6, Jev 0.97 |
| 25 | Outras Receitas | pág. 6, Jev 0.99 |
| 26 | Royalties | pág. 6, Jev 0.98 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Taxa de Policiamento | pág. 1, Jev 0.98 |
| 2 | Taxas Federações e Confederações | pág. 1, Jev 0.97 |
| 3 | Inss s/Patrocinios | pág. 1, precedente |
| 4 | Manutenção, Conservação Estadio | pág. 1, Jev 1 |
| 5 | Agenciamento de Atletas | pág. 1, precedente |
| 6 | Inss s/Arbitragens | pág. 1, precedente |
| 7 | Locação de Veiculos | pág. 1, Jev 0.96 |
| 8 | Água Mineral | pág. 1, precedente |
| 9 | Exame Anti-Doping | pág. 1, precedente |
| 10 | Serviços Prest p/Terceiros | pág. 1, Jev 0.97 |
| 11 | Direito de Imagem | pág. 1, Jev 0.99 |
| 12 | Inss s/Cotas de TV | pág. 1, precedente |
| 13 | Alimentação | pág. 1, precedente |
| 14 | Gastos c/ Viagens | pág. 1, Jev 1 |
| 15 | Gastos c/ Hospedagens | pág. 1, Jev 1 |
| 16 | Premiações | pág. 1, precedente |
| 17 | Jogos e Competições | pág. 1, Jev 1 |
| 18 | Direito de Arena | pág. 1, Jev 0.99 |
| 19 | Inss s/Premiações | pág. 1, precedente |
| 20 | Inss s/Publicidade | pág. 1, Jev 0.93 |
| 21 | Isotônico | pág. 1, precedente |
| 22 | Salários e Ordenados | pág. 1, Claude 0.8 |
| 23 | Férias Normais | pág. 1, Jev 0.99 |
| 24 | Férias Indenizadas | pág. 1, Jev 0.95 |
| 25 | 13º Salário | pág. 1, Jev 1 |
| 26 | Aviso Prévio Indenizado | pág. 1, precedente |
| 27 | INSS | pág. 1, Jev 0.96 |
| 28 | FGTS | pág. 1, Jev 1 |
| 29 | FGTS Rescisório | pág. 1, precedente |
| 30 | 13º Salário Indenizado | pág. 1, Claude 0.85 |
| 31 | Agua Mineral | pág. 1, precedente |
| 32 | Indenizações Trabalhistas | pág. 1, precedente |
| 33 | Pis s/Folha | pág. 1, Jev 0.99 |
| 34 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 35 | Provisão 13º Salário | pág. 2, Claude 0.8 |
| 36 | Provisão INSS 13º Salário | pág. 2, Claude 0.8 |
| 37 | Provisão FGTS 13º Salário | pág. 2, Jev 1 |
| 38 | Exames Médicos | pág. 2, precedente |
| 39 | Provisão PIS 13º Salário | pág. 2, precedente |
| 40 | Salários e Ordenados | pág. 2, Claude 0.8 |
| 41 | Férias Normais | pág. 2, Jev 0.99 |
| 42 | Férias Indenizadas | pág. 2, Jev 0.95 |
| 43 | 13º Salário | pág. 2, Jev 1 |
| 44 | Aviso Prévio Indenizado | pág. 2, precedente |
| 45 | INSS | pág. 2, Jev 0.96 |
| 46 | FGTS | pág. 2, Jev 1 |
| 47 | FGTS Rescisório | pág. 2, precedente |
| 48 | Vale Transporte | pág. 2, precedente |
| 49 | Indenizações Trabalhistas | pág. 2, precedente |
| 50 | Pis s/Folha | pág. 2, Jev 0.99 |
| 51 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 52 | Provisão 13º Salário | pág. 2, Claude 0.8 |
| 53 | Provisão Férias | pág. 2, Claude 0.8 |
| 54 | Provisão INSS Férias | pág. 2, Claude 0.8 |
| 55 | Provisão FGTS Férias | pág. 2, Jev 0.99 |
| 56 | Provisão INSS 13º Salário | pág. 2, Claude 0.8 |
| 57 | Provisão FGTS 13º Salário | pág. 2, Jev 1 |
| 58 | Provisão PIS 13º Salário | pág. 2, precedente |
| 59 | Provisão PIS Férias | pág. 2, precedente |
| 60 | Salários e Ordenados | pág. 2, Claude 0.8 |
| 61 | Férias Normais | pág. 2, Jev 0.99 |
| 62 | Férias Indenizadas | pág. 2, Jev 0.95 |
| 63 | 13º Salário | pág. 2, Jev 1 |
| 64 | INSS | pág. 2, Jev 0.96 |
| 65 | FGTS | pág. 2, Jev 1 |
| 66 | Pis s/Folha | pág. 2, Jev 0.99 |
| 67 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 68 | Provisão 13º Salário | pág. 2, Claude 0.8 |
| 69 | Provisão Férias | pág. 2, Claude 0.8 |
| 70 | Provisão INSS Férias | pág. 2, Claude 0.8 |
| 71 | Provisão FGTS Férias | pág. 2, Jev 0.99 |
| 72 | Provisão INSS 13º Salário | pág. 2, Claude 0.8 |
| 73 | Provisão FGTS 13º Salário | pág. 2, Jev 1 |
| 74 | Exames Médicos | pág. 2, precedente |
| 75 | Provisão PIS 13º Salário | pág. 2, precedente |
| 76 | Provisão PIS Férias | pág. 2, precedente |
| 77 | Salários e Ordenados | pág. 2, Claude 0.8 |
| 78 | Férias Indenizadas | pág. 2, Jev 0.95 |
| 79 | 13º Salário | pág. 2, Jev 1 |
| 80 | Aviso Prévio Indenizado | pág. 2, precedente |
| 81 | INSS | pág. 2, Jev 0.96 |
| 82 | FGTS | pág. 2, Jev 1 |
| 83 | FGTS Rescisório | pág. 2, precedente |
| 84 | 13º Salário Indenizado | pág. 2, Claude 0.85 |
| 85 | Pis s/Folha | pág. 3, Jev 0.99 |
| 86 | Provisão 13º Salario | pág. 3, Claude 0.8 |
| 87 | Provisão Férias | pág. 3, Claude 0.8 |
| 88 | Provisão INSS Férias | pág. 3, Claude 0.8 |
| 89 | Provisão FGTS Férias | pág. 3, Jev 0.99 |
| 90 | Provisão INSS 13º Salário | pág. 3, Claude 0.8 |
| 91 | Provisão FGTS 13º Salário | pág. 3, Jev 1 |
| 92 | Provisão PIS 13º Salário | pág. 3, precedente |
| 93 | Provisão PIS Férias | pág. 3, precedente |
| 94 | Despesas Pelo Uso da Marca | pág. 3, precedente |
| 95 | Telefone | pág. 3, Jev 1 |
| 96 | Internet | pág. 3, Jev 1 |
| 97 | Água | pág. 3, Jev 1 |
| 98 | Energia Elétrica | pág. 3, Jev 1 |
| 99 | Assinatura TV a Cabo | pág. 3, Jev 1 |
| 100 | Uniformes | pág. 3, precedente |
| 101 | Salários e Ordenados | pág. 3, Claude 0.8 |
| 102 | Férias Normais | pág. 3, Jev 0.99 |
| 103 | Férias Indenizadas | pág. 3, Jev 0.95 |
| 104 | 13º Salario | pág. 3, Jev 1 |
| 105 | Aviso Prévio Indenizado | pág. 3, precedente |
| 106 | INSS | pág. 3, Jev 0.96 |
| 107 | FGTS | pág. 3, Jev 1 |
| 108 | FGTS Rescisório | pág. 3, precedente |
| 109 | 13º Salário Indenizado | pág. 3, Claude 0.85 |
| 110 | Vale Transporte | pág. 3, precedente |
| 111 | Pis s/Folha | pág. 3, Jev 0.99 |
| 112 | Provisão 13º Salário | pág. 3, Claude 0.8 |
| 113 | Provisão Férias | pág. 3, Claude 0.8 |
| 114 | Indenizações Trabalhistas | pág. 3, precedente |
| 115 | Provisão INSS Férias | pág. 3, Claude 0.8 |
| 116 | Provisão FGTS Férias | pág. 3, Jev 0.99 |
| 117 | Provisão INSS 13º Salário | pág. 3, Claude 0.8 |
| 118 | Provisão FGTS 13º Salário | pág. 3, Jev 1 |
| 119 | Exames Médicos | pág. 3, precedente |
| 120 | Provisão PIS 13º Salário | pág. 3, precedente |
| 121 | Provisão PIS Férias | pág. 3, precedente |
| 122 | Ajuda de Custo | pág. 3, Jev 0.95 |
| 123 | Licença de Uso de Software | pág. 3, precedente |
| 124 | Depreciações | pág. 3, Jev 1 |
| 125 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 126 | Despesas de Viagens | pág. 3, Jev 1 |
| 127 | Impostos e Taxas | pág. 3, Jev 1 |
| 128 | Manutenção, Conservação de Bens | pág. 3, Claude 0.9 |
| 129 | Publicações | pág. 3, Jev 0.99 |
| 130 | Combustíveis | pág. 3, Jev 0.99 |
| 131 | Propaganda e Publicidade | pág. 3, Jev 1 |
| 132 | Internet | pág. 3, Jev 1 |
| 133 | Custas e Emolumentos | pág. 4, precedente |
| 134 | Despesas c/Refeições | pág. 4, precedente |
| 135 | Material de Limpeza, Higiene, Copa, Cozinha | pág. 4, Jev 1 |
| 136 | Locação de Veículos | pág. 4, Jev 0.96 |
| 137 | Registro de Domínio | pág. 4, precedente |
| 138 | Licenciamento de Veículos | pág. 4, Jev 0.98 |
| 139 | Locação de Equipamentos | pág. 4, precedente |
| 140 | Despesas c/ Certificação Digital | pág. 4, precedente |
| 141 | Locação de Equipamentos Eletrônicos | pág. 4, precedente |
| 142 | Despesas c/ Estacionamentos | pág. 4, precedente |
| 143 | Serviços Prestados p/ Terceiros | pág. 4, Jev 0.97 |
| 144 | Amortizações | pág. 4, precedente |
| 145 | Despesas c/ TV a Cabo | pág. 4, Claude 0.8 |
| 146 | Locação de Móveis e Utensílios | pág. 4, Jev 0.99 |
| 147 | Fotocópias, Autenticações e Rec. Firmas | pág. 4, Jev 0.98 |
| 148 | Utensílios Copa/Cozinha | pág. 4, Jev 1 |
| 149 | Despesas c/ Eventos | pág. 4, precedente |
| 150 | Despesas c/ Fretes e Carretos | pág. 4, Jev 0.91 |
| 151 | Despesas c/ Seguro de Vida | pág. 4, precedente |
| 152 | Despesas c/ CIEE | pág. 4, precedente |
| 153 | Despesas c/ Estagiários | pág. 4, precedente |
| 154 | Despesas Processuais - FIFA | pág. 4, precedente |
| 155 | Despesas c/ Uniformes | pág. 4, precedente |
| 156 | Serviços de Cobrança | pág. 4, precedente |
| 157 | Materiais Esportivos | pág. 4, precedente |
| 158 | Uniformes | pág. 4, precedente |
| 159 | Medicamentos e Mat.Medicos e Cirurgicos | pág. 4, precedente |
| 160 | Agua | pág. 4, Jev 1 |
| 161 | Aluguel | pág. 4, precedente |
| 162 | Bens de Valores Irrelevantes | pág. 4, precedente |
| 163 | Energia Eletrica | pág. 4, Jev 1 |
| 164 | Impostos e Taxas | pág. 4, Jev 1 |
| 165 | Manutenção e Conservação de Bens | pág. 4, Jev 1 |
| 166 | Utensílios, Guarn, Cama, Mesa e Banho | pág. 4, Jev 0.99 |
| 167 | Gas | pág. 4, Jev 0.99 |
| 168 | Manutenção e Conservação do Prédio | pág. 4, Jev 0.99 |
| 169 | Internet | pág. 4, Jev 1 |
| 170 | Assinatura TV a Cabo | pág. 4, Jev 1 |
| 171 | Condomínio | pág. 4, precedente |
| 172 | Telefone | pág. 4, Jev 1 |
| 173 | IPTU | pág. 4, Jev 0.99 |
| 174 | Agua | pág. 4, Jev 1 |
| 175 | Telefone | pág. 4, Jev 1 |
| 176 | Assistência Médica | pág. 4, precedente |
| 177 | Impressos e Materiais de Escritorio | pág. 4, Jev 1 |
| 178 | Correios | pág. 4, Jev 0.99 |
| 179 | Homenagens | pág. 4, Jev 1 |
| 180 | Multas de Trânsito | pág. 4, precedente |
| 181 | Multas por Infração a Legislação | pág. 4, Jev 0.96 |
| 182 | Despesas Diversas | pág. 4, Jev 1 |
| 183 | Despesas c/ Brindes | pág. 5, precedente |
| 184 | Contingências Trabalhistas | pág. 5, precedente |
| 185 | Honorários Contábeis,Adv e de Auditorias | pág. 5, Jev 1 |
| 186 | Apoio Administrativo | pág. 5, Jev 1 |
| 187 | Manutenção de Software | pág. 5, Jev 0.92 |
| 188 | Consultoria | pág. 5, Jev 0.97 |
| 189 | Multas TJD - Tribunal Justiça Desportiva | pág. 5, Jev 1 |
| 190 | ISS e Taxa Poder Polícia | pág. 5, Jev 0.95 |
| 191 | Multas, Juros e Correção Monetária | pág. 5, Jev 0.91 |
| 192 | Multas, Juros - Parcelamento ISS Retido | pág. 5, precedente |
| 193 | Contribuição Negocial | pág. 5, precedente |
| 194 | Imposto de Renda s/Remessa ao Exterior | pág. 5, Jev 0.96 |
| 195 | Impostos e Taxas Diversas | pág. 5, Jev 1 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2018 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2018: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2018 Campeonato Brasileiro Série D" (tools/club-league-reference/br.js
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/dre-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/dre-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas Brutas | pág. 1, precedente |
| 2 | (-) Deduções | pág. 1, precedente |
| 3 | (+) Outras Receitas | pág. 1, precedente |
| 4 | (+) Outras Receitas Operacionais | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | (-) Custos | pág. 1, precedente |
| 2 | (-) Despesas Administrativas | pág. 1, precedente |
| 3 | (-) Despesas Gerais | pág. 1, precedente |
| 4 | (-) Despesas Tributárias | pág. 1, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2017-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2017-12-31
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 371.653,59. Claude 2026-10-09: la transcripción dice 371.663,59 y la segunda lectura 371.653,59; solo con 371.653,59 cierra el Prejuízo Operacional impreso: 787.377,89 (L25) - 2.233.261,00 - 437.909,72 - 55.180,00 - 13.242,56 + 7.798,51 + 371.653,59 = -1.572.763,29 (L32).
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2017 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de 2017 solo imprime los totales por grupo (Receitas Brutas, Custos...); el desglose no está en el documento
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de 2017 solo imprime los totales por grupo (Receitas Brutas, Custos...); el desglose no está en el documento
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de 2017 solo imprime los totales por grupo (Receitas Brutas, Custos...); el desglose no está en el documento
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de 2017 solo imprime los totales por grupo (Receitas Brutas, Custos...); el desglose no está en el documento
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -1.726.110,02. Onboarding to-do 165 (Claude, 2026-10-09): DRE de balancete: imprime el prejuízo en positivo con 'D' (L38); la cuenta 8.975.272 - 10.103.921 - 430.111 - 167.350 = -1.726.110 es pérdida
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 371.663,59. Onboarding to-do 165 (Claude, 2026-10-09): el PDF dice 371.653,59 (pág. 1); la fila que se carga ya va corregida por el ajuste fila de la misma línea, así que este número del .md no entra en la carga
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2012, 2013, 2014, 2015, 2016, 2018, 2021, 2022, 2023, 2024, 2025): Comercial / Sponsors, Organización de partidos
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
2017: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2017 Campeonato Paulista" (tools/club-league-reference/br.json), coinc
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de Jogos | pág. 22, Jev 1 |
| 2 | Cotas de TV – Paulista Série A-2 | pág. 22, Jev 1 |
| 3 | Sócio Torcedor | pág. 22, Claude 0.9 |
| 4 | Venda de Atletas | pág. 22, Jev 1 |
| 5 | Patrocínios | pág. 22, Jev 1 |
| 6 | Outras | pág. 22, Jev 1 |
| 7 | (-) Deduções da Receita Bruta | pág. 4, Jev 0.95 |
| 8 | Vendas Mercadorias | pág. 22, Jev 1 |
| 9 | Publicidades | pág. 22, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direito de Imagem | pág. 23, Jev 0.99 |
| 2 | Salários e Ordenados | pág. 23, Claude 0.8 |
| 3 | Custo Mercadorias Vendidas | pág. 23, precedente |
| 4 | Serviços Prestados por Terceiros | pág. 23, Jev 0.99 |
| 5 | Alimentação | pág. 23, precedente |
| 6 | Férias Normais | pág. 23, Jev 0.99 |
| 7 | Despesas com Hospedagem | pág. 23, precedente |
| 8 | Taxas Federações e Confederações | pág. 23, Jev 0.97 |
| 9 | Fgts | pág. 23, Jev 1 |
| 10 | 13 Salário | pág. 23, Jev 1 |
| 11 | Despesas com Viagens | pág. 23, Jev 1 |
| 12 | Arbitragens | pág. 23, Jev 1 |
| 13 | Prêmios e Gratificações | pág. 23, Claude 0.85 |
| 14 | INSS | pág. 23, Jev 0.96 |
| 15 | INSS sobre Cotas de Patrocínio | pág. 23, precedente |
| 16 | Indenizações Trabalhistas | pág. 23, precedente |
| 17 | Segurança e Vigilância | pág. 23, Jev 0.95 |
| 18 | Combustíveis e Lubrificantes | pág. 23, Jev 1 |
| 19 | Ingressos | pág. 23, precedente |
| 20 | Taxa Policiamento | pág. 23, Claude 0.85 |
| 21 | Provisão Contingências Trabalhistas | pág. 23, Jev 0.95 |
| 22 | Outros Gastos | pág. 23, Jev 1 |
| 23 | Aluguel | pág. 24, precedente |
| 24 | Depreciações | pág. 24, Jev 1 |
| 25 | Despesas de Viagens | pág. 24, Jev 1 |
| 26 | Impostos e Taxas | pág. 24, Jev 1 |
| 27 | Manutenção, Conservação de Bens | pág. 24, Claude 0.85 |
| 28 | Combustíveis | pág. 24, Jev 0.99 |
| 29 | Propaganda e Publicidade | pág. 24, Jev 1 |
| 30 | Provedor Internet | pág. 24, Jev 1 |
| 31 | Custas e Emolumentos | pág. 24, precedente |
| 32 | Água | pág. 24, Jev 1 |
| 33 | Energia Elétrica | pág. 24, Jev 1 |
| 34 | Telefone | pág. 24, Jev 1 |
| 35 | Seguro de Vida | pág. 24, precedente |
| 36 | Impressos, Materiais Escritório | pág. 24, Jev 1 |
| 37 | Correios | pág. 24, Jev 0.99 |
| 38 | Assessoria Cont./Tributária/Advocatícia | pág. 24, Jev 1 |
| 39 | Despesas Indedutíveis | pág. 24, precedente |
| 40 | Material Limpeza e Higiene | pág. 24, Jev 1 |
| 41 | Despesas Legais e Judiciais | pág. 24, Jev 0.99 |
| 42 | Despesas com Cartão Credito | pág. 24, Jev 1 |
| 43 | Serviços Prestados por terceiros | pág. 24, Jev 0.99 |
| 44 | Despesas Uso da Marca | pág. 24, precedente |
| 45 | Arbitragens e Inss | pág. 24, precedente |
| 46 | Ajuda de Custo | pág. 24, Jev 0.95 |
| 47 | Alimentação | pág. 24, precedente |
| 48 | Condomínio | pág. 24, precedente |
| 49 | Salários e Ordenados | pág. 25, Claude 0.8 |
| 50 | Férias Normais | pág. 25, Jev 0.99 |
| 51 | Fgts | pág. 25, Jev 1 |
| 52 | 13 Salário | pág. 25, Jev 1 |
| 53 | Inss | pág. 25, Jev 0.96 |
| 54 | Vale Transporte | pág. 25, precedente |
| 55 | Pís s/ Folha | pág. 25, Jev 0.99 |
| 56 | Aviso Previo Indenizado | pág. 25, precedente |
| 57 | Férias Indenizadas | pág. 25, Jev 0.95 |
| 58 | Materiais Esportivos | pág. 25, precedente |
| 59 | Medicamentos, Mat. Médicos Cirúrgicos. | pág. 25, precedente |
| 60 | Material Limpeza e Higiene | pág. 25, Jev 1 |
| 61 | Material Consumo | pág. 25, precedente |
| 62 | Uniformes | pág. 25, precedente |
| 63 | Aluguel | pág. 25, precedente |
| 64 | Água | pág. 25, Jev 1 |
| 65 | Manutenção Conservação Bens | pág. 25, Claude 0.8 |
| 66 | Energia Elétrica | pág. 25, Jev 1 |
| 67 | Gás | pág. 25, Jev 0.99 |
| 68 | Material de Consumo | pág. 25, precedente |
| 69 | Material Limpeza Higiene | pág. 25, Jev 0.98 |
| 70 | Impostos e Taxas | pág. 25, Jev 1 |
| 71 | Utensílios, Guarn., Cama, Mesa, Banho | pág. 25, precedente |
| 72 | Impostos / Taxas/Contribuições | pág. 4, Jev 1 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = (10.553). Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 38.727. Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 265.000. Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Claude 2026-10-09: se saca el subtotal RECEITA LÍQUIDA 9.211.197 (L115) para que no se sume junto a sus componentes (bruta 9.221.750 - deduções 10.553 = 9.211.197).
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2016 Campeonato Paulista" (tools/club-league-reference/br.json), coinc
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2015-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2015-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de Jogos | pág. 1, Jev 1 |
| 2 | Cotas de TV Camp Paulista Séria A-2 | pág. 1, Jev 0.99 |
| 3 | Rec c/Repasse Direitos Federat/Empréstim | pág. 1, Jev 0.98 |
| 4 | Sócio Torcedor | pág. 1, precedente |
| 5 | Premios, Outras Receitas | pág. 1, precedente |
| 6 | Mercadorias c/Vendas | pág. 1, Jev 1 |
| 7 | Patrocinios | pág. 1, Jev 1 |
| 8 | Contratos de Parcerias | pág. 1, Jev 0.99 |
| 9 | Publicidades | pág. 1, Jev 1 |
| 10 | Doações | pág. 1, Jev 1 |
| 11 | Pis | pág. 1, Jev 0.97 |
| 12 | Cofins | pág. 1, Jev 0.98 |
| 13 | Icms | pág. 1, Jev 0.97 |
| 14 | Recuperação de Despesas | pág. 3, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arbitragens | pág. 1, Jev 1 |
| 2 | Taxa de Policiamento | pág. 1, Jev 0.98 |
| 3 | Taxas Federações e Confederações | pág. 1, Jev 0.97 |
| 4 | Segurança e Vigilancia | pág. 1, Jev 0.95 |
| 5 | Inss s/Patrocinios | pág. 1, precedente |
| 6 | Ingressos | pág. 1, Claude 0.8 |
| 7 | Manutenção, Conservação Estadio | pág. 1, Jev 1 |
| 8 | Combustiveis e Lubrificantes | pág. 1, Jev 1 |
| 9 | Inss s/Arbitragens | pág. 1, precedente |
| 10 | Locação de Veiculos | pág. 1, Jev 0.96 |
| 11 | Exame Anti-Doping | pág. 1, precedente |
| 12 | Serviços Prest p/Terceiros | pág. 1, Jev 0.97 |
| 13 | Direito de Imagem | pág. 1, Jev 0.99 |
| 14 | Locação de Estadio | pág. 1, precedente |
| 15 | Inss s/Cotas de TV | pág. 1, precedente |
| 16 | Salarios e Ordenados | pág. 1, Claude 0.8 |
| 17 | Férias Normais | pág. 1, Jev 0.99 |
| 18 | Férias Indenizadas | pág. 1, Jev 0.95 |
| 19 | 13º Salario | pág. 1, Jev 1 |
| 20 | Aviso Prévio Indenizado | pág. 1, precedente |
| 21 | Inss | pág. 1, Jev 0.96 |
| 22 | Fgts | pág. 1, Jev 1 |
| 23 | Fgts Rescisório | pág. 1, precedente |
| 24 | Premios e Gratificações | pág. 1, Claude 0.8 |
| 25 | Academia | pág. 1, precedente |
| 26 | Agua Mineral | pág. 1, precedente |
| 27 | Alimentação | pág. 1, precedente |
| 28 | Despesas de Viagens | pág. 1, Jev 1 |
| 29 | Vale Transporte | pág. 2, precedente |
| 30 | Suplementação Alimentar | pág. 2, precedente |
| 31 | Indenizações Trabalhistas | pág. 2, precedente |
| 32 | Despesas de Hospedagem | pág. 2, precedente |
| 33 | Pis s/Folha | pág. 2, Jev 0.99 |
| 34 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 35 | (-) Recuperação Cofins | pág. 2, Claude 0.85 |
| 36 | (-) Recuperação Pis | pág. 2, Jev 0.91 |
| 37 | Custo das Mercadorias Vendidas | pág. 2, precedente |
| 38 | (-) Recuperação de Icms | pág. 2, Jev 0.91 |
| 39 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 40 | Férias Normais | pág. 2, Jev 0.99 |
| 41 | 13º Salario | pág. 2, Jev 1 |
| 42 | Aviso Prévio Indenizado | pág. 2, precedente |
| 43 | Inss | pág. 2, Jev 0.96 |
| 44 | Fgts | pág. 2, Jev 1 |
| 45 | Pis s/Folha | pág. 2, Jev 0.99 |
| 46 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 47 | Férias Normais | pág. 2, Jev 0.99 |
| 48 | 13º Salario | pág. 2, Jev 1 |
| 49 | Inss | pág. 2, Jev 0.96 |
| 50 | Fgts | pág. 2, Jev 1 |
| 51 | Despesas pelo uso da Marca | pág. 2, precedente |
| 52 | Combustiveis | pág. 2, Jev 0.99 |
| 53 | Custas e Autenticações | pág. 2, Jev 1 |
| 54 | Aluguel | pág. 2, precedente |
| 55 | Depreciações | pág. 2, Jev 1 |
| 56 | Despesas Legais e Judiciais | pág. 2, Jev 0.99 |
| 57 | Impostos e Taxas | pág. 2, Jev 1 |
| 58 | Manutenção, Conservação de Bens | pág. 2, Claude 0.9 |
| 59 | Publicações | pág. 2, Jev 0.99 |
| 60 | Combustíveis | pág. 2, Jev 0.99 |
| 61 | Propaganda e Publicidade | pág. 2, Jev 1 |
| 62 | Provedor de Internet | pág. 2, Jev 1 |
| 63 | Custas e Emolumentos | pág. 2, precedente |
| 64 | Material de Limpeza e Higiene | pág. 2, Jev 1 |
| 65 | Locação de Veiculos | pág. 2, Jev 0.96 |
| 66 | Condominio | pág. 2, precedente |
| 67 | Materiais Esportivos | pág. 2, precedente |
| 68 | Materias de Limpeza e Higiene | pág. 2, Jev 1 |
| 69 | Medicamentos e Mat Medicos e Cirurgicos | pág. 2, precedente |
| 70 | Material de Consumo | pág. 2, precedente |
| 71 | Agua | pág. 2, Jev 1 |
| 72 | Aluguel | pág. 2, precedente |
| 73 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 74 | Energia Eletrica | pág. 3, Jev 1 |
| 75 | Impostos e Taxas | pág. 3, Jev 1 |
| 76 | Manutenção e Conservação de Bens | pág. 3, Jev 1 |
| 77 | Material de Consumo | pág. 3, precedente |
| 78 | Utensilios, Guarn.Cama, Mesa e Banho | pág. 3, precedente |
| 79 | Gas | pág. 3, Jev 0.99 |
| 80 | Agua | pág. 3, Jev 1 |
| 81 | Energia Elétrica | pág. 3, Jev 1 |
| 82 | Multas | pág. 3, Jev 0.97 |
| 83 | Multas | pág. 3, Jev 0.97 |
| 84 | Agua | pág. 3, Jev 1 |
| 85 | Energia Eletrica | pág. 3, Jev 1 |
| 86 | Telefone | pág. 3, Jev 1 |
| 87 | Seguro de Vida | pág. 3, precedente |
| 88 | Impressos e Materiais de Escritorio | pág. 3, Jev 1 |
| 89 | Correios | pág. 3, Jev 0.99 |
| 90 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 91 | Custas e Emolumentos | pág. 3, precedente |
| 92 | Telefone | pág. 3, Jev 1 |
| 93 | Impressos e Matriais de Escritorio | pág. 3, Jev 1 |
| 94 | Honorarios Contabeis,Adv e de Auditorias | pág. 3, Jev 1 |
| 95 | Custo Formação Atleta Profissional | pág. 3, precedente |
| 96 | Despesas Bancarias | pág. 3, precedente |
| 97 | Comissão s/Cartão | pág. 3, Jev 0.97 |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2015 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "Campeonato Paulista de Futebol de 2015 - Série A2" (tools/club-league-
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2014-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2014-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de Jogos | pág. 1, Jev 1 |
| 2 | Cotas de TV Camp Paulista Séria A-2 | pág. 1, Jev 0.99 |
| 3 | Venda de Atletas | pág. 1, Jev 1 |
| 4 | Sócio Torcedor | pág. 1, precedente |
| 5 | Mercadorias c/Vendas | pág. 1, Jev 1 |
| 6 | Patrocinios | pág. 1, Jev 1 |
| 7 | Contratos de Parcerias | pág. 1, Jev 0.99 |
| 8 | Publicidades | pág. 1, Jev 1 |
| 9 | Doações | pág. 1, Jev 1 |
| 10 | Recuperação de Despesas | pág. 4, Jev 1 |
| 11 | AVlso Prévio Descontado | pág. 4, Jev 0.91 |
| 12 | Multa Contratual | pág. 4, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Pis | pág. 1, Jev 0.99 |
| 2 | Cofins | pág. 1, Jev 0.97 |
| 3 | Pis | pág. 1, Jev 0.99 |
| 4 | Cofins | pág. 1, Jev 0.97 |
| 5 | Icms | pág. 1, Jev 0.96 |
| 6 | Arbitragens | pág. 1, Jev 1 |
| 7 | Taxa de Policiamento | pág. 1, Jev 0.98 |
| 8 | Taxas Federações e Confederações | pág. 1, Jev 0.97 |
| 9 | Segurança e Vigilancia | pág. 1, Jev 0.95 |
| 10 | Inss s/Renda de Jogos | pág. 1, precedente |
| 11 | Inss s/Patrocinios | pág. 1, precedente |
| 12 | Ingressos | pág. 1, Claude 0.8 |
| 13 | Manutenção, Conservação Estadio | pág. 1, Jev 1 |
| 14 | Combustíveis e Lubrificantes | pág. 1, Jev 1 |
| 15 | Inss s/Arbitragens | pág. 1, precedente |
| 16 | Exame Anti-Doping | pág. 1, precedente |
| 17 | Serviços Prest p/Terceiros | pág. 1, Jev 0.97 |
| 18 | Direito de Imagem | pág. 1, Jev 0.99 |
| 19 | Locação de Estadio | pág. 1, precedente |
| 20 | Inss s/Cotas de TV | pág. 1, precedente |
| 21 | Inss/Seguro Torcedor FPF | pág. 1, precedente |
| 22 | Salarios e Ordenados | pág. 1, Claude 0.8 |
| 23 | Férias Normais | pág. 1, Jev 0.99 |
| 24 | Férias Indenizadas | pág. 1, Jev 0.95 |
| 25 | 13º Salario | pág. 1, Jev 1 |
| 26 | Aviso Prévio Indenizado | pág. 1, precedente |
| 27 | Inss | pág. 1, Jev 0.96 |
| 28 | Fgts | pág. 1, Jev 1 |
| 29 | Fgts Rescisório | pág. 1, precedente |
| 30 | Premios e Gratificações | pág. 1, Claude 0.8 |
| 31 | Academia | pág. 1, precedente |
| 32 | Agua Mineral | pág. 1, precedente |
| 33 | Alimentação | pág. 2, precedente |
| 34 | Despesas de Viagens | pág. 2, Jev 1 |
| 35 | Vale Transporte | pág. 2, precedente |
| 36 | Indenizações Trabalhistas | pág. 2, precedente |
| 37 | Despesas de Hospedagem | pág. 2, precedente |
| 38 | Pis s/Folha | pág. 2, Jev 0.99 |
| 39 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 40 | Contingencias Trabalhistas | pág. 2, precedente |
| 41 | Compras Mercadorias a Prazo | pág. 2, precedente |
| 42 | (-) Recuperação Cofins | pág. 2, Claude 0.85 |
| 43 | (-) Recuperação Pis | pág. 2, Jev 0.91 |
| 44 | Custo das Mercadorias Vendidas | pág. 2, precedente |
| 45 | (-) Recuperação de Icms | pág. 2, Jev 0.91 |
| 46 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 47 | Férias Normais | pág. 2, Jev 0.99 |
| 48 | 13º Salario | pág. 2, Jev 1 |
| 49 | Inss | pág. 2, Jev 0.96 |
| 50 | Fgts | pág. 2, Jev 1 |
| 51 | Fgts Rescisorio | pág. 2, precedente |
| 52 | Vale Transporte | pág. 2, precedente |
| 53 | Pis s/Folha | pág. 2, Jev 0.99 |
| 54 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 55 | Férias Normais | pág. 2, Jev 0.99 |
| 56 | 13º Salario | pág. 2, Jev 1 |
| 57 | Inss | pág. 2, Jev 0.96 |
| 58 | Fgts | pág. 2, Jev 1 |
| 59 | Despesas com Ativo Fixo | pág. 2, precedente |
| 60 | Assessoria Contábil/Tributaria/Advocatic | pág. 2, Jev 1 |
| 61 | Contingencias Cíveis | pág. 2, precedente |
| 62 | Contingencias Tributarias | pág. 2, Jev 0.9 |
| 63 | Despesas pelo uso da Marca | pág. 2, precedente |
| 64 | Despesas Indedutíveis | pág. 2, precedente |
| 65 | Despesas de Viagens | pág. 2, Jev 1 |
| 66 | Medicamentos e Mat Medicos e Cirurgicos | pág. 2, precedente |
| 67 | Servipos prestados p/Terceiros | pág. 2, Claude 0.8 |
| 68 | Aluguel | pág. 2, precedente |
| 69 | Depreciações | pág. 2, Jev 1 |
| 70 | Despesas Legais e Judiciais | pág. 2, Jev 0.99 |
| 71 | Despesas de Viagens | pág. 2, Jev 1 |
| 72 | Impostos e Taxas | pág. 2, Jev 1 |
| 73 | Manutenção, Conservação de Bens | pág. 2, Claude 0.9 |
| 74 | Publicações | pág. 2, Jev 0.99 |
| 75 | Combustíveis | pág. 2, Jev 0.99 |
| 76 | Propaganda e Publicidade | pág. 2, Jev 1 |
| 77 | Provedor de Internet | pág. 3, Jev 1 |
| 78 | Material de Limpeza e Higiene | pág. 3, Jev 1 |
| 79 | Condominio | pág. 3, precedente |
| 80 | Materiais Esportivos | pág. 3, precedente |
| 81 | Materias de Limpeza e Higiene | pág. 3, Jev 1 |
| 82 | Medicamentos e Mat.Medicos e Cirurgicos | pág. 3, precedente |
| 83 | Material de Consumo | pág. 3, precedente |
| 84 | Agua | pág. 3, Jev 1 |
| 85 | Aluguel | pág. 3, precedente |
| 86 | Alimentação | pág. 3, precedente |
| 87 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 88 | Energia Eletrica | pág. 3, Jev 1 |
| 89 | Impostos e Taxas | pág. 3, Jev 1 |
| 90 | Manutenção e Conservação de Bens | pág. 3, Jev 1 |
| 91 | Material de Consumo | pág. 3, precedente |
| 92 | Matrial de Limpeza e Higiene | pág. 3, Jev 1 |
| 93 | Utensilios, Guarn.Cama, Mesa e Banho | pág. 3, precedente |
| 94 | Gas | pág. 3, Jev 0.99 |
| 95 | Multas | pág. 3, Jev 0.97 |
| 96 | Multas | pág. 3, Jev 0.97 |
| 97 | Agua | pág. 3, Jev 1 |
| 98 | Energia Eletrica | pág. 3, Jev 1 |
| 99 | Telefone | pág. 3, Jev 1 |
| 100 | Seguro de Vida | pág. 3, precedente |
| 101 | Impressos e Materiais de Escritorio | pág. 3, Jev 1 |
| 102 | Correios | pág. 3, Jev 0.99 |
| 103 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 104 | Custas e Emolumentos | pág. 3, precedente |
| 105 | Telefone | pág. 3, Jev 1 |
| 106 | Impressos e Matriais de Escritorio | pág. 3, Jev 1 |
| 107 | Custo Formação Atleta Profissional | pág. 3, precedente |
| 108 | Despesas Bancarias | pág. 3, precedente |
| 109 | Encargos Financeiros | pág. 3, Jev 0.97 |
| 110 | Comissão s/Cartão | pág. 3, Jev 0.97 |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 412,27. Claude 2026-10-09: 'Descontos Obtidos 412,27 C' bajo '(+) Receitas Financeiras' (L197-199, pág. 3-4 del visor) no salió como renglón (solo su 'Total:' de L199); se reemplaza el total por su único renglón. Cuenta: receitas 5.620.101,05 - gastos 6.650.350 - financiero (24.328,43 D - 412,27 C) = -1.055.949,71 = '= Prejuízo 1.055.949,71 D' (L213).
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2014 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -1.055.949,71. Onboarding to-do 165 (Claude, 2026-10-09): el balancete imprime '= Prejuízo 1.055.949,71 D' (D = déficit) y el sistema lo leía como +1.055.949. Cuenta: ingresos 5.620.101 - gastos 6.650.350 - financiero neto 25.701 = -1.055.950 (= prejuízo, es pérdida)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-10, SIN VERIFICAR
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2013-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2013-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Rendas de Jogos | pág. 1, Jev 1 |
| 2 | Cotas de TV Camp Paulista Séria A-2 | pág. 1, Jev 0.99 |
| 3 | Sócio Torcedor | pág. 1, precedente |
| 4 | Mercadorias c/Vendas | pág. 1, Jev 1 |
| 5 | Patrocínios | pág. 1, Jev 1 |
| 6 | Contratos de Parcerias | pág. 1, Jev 0.99 |
| 7 | Publicidades | pág. 1, Jev 1 |
| 8 | Doações | pág. 1, Jev 1 |
| 9 | Patrocínios e Doações | pág. 1, precedente |
| 10 | Multa Contratual | pág. 1, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Pis | pág. 1, Jev 0.99 |
| 2 | Cofins | pág. 1, Jev 0.97 |
| 3 | Icms | pág. 1, Jev 0.96 |
| 4 | Arbitragens | pág. 1, Jev 1 |
| 5 | Taxa de Policiamento | pág. 1, Jev 0.98 |
| 6 | Taxas Federações e Confederações | pág. 1, Jev 0.97 |
| 7 | Segurança e Vigilancia | pág. 1, Jev 0.95 |
| 8 | Inss s/Renda de Jogos | pág. 1, precedente |
| 9 | Inss s/Cotas e Patrocinios | pág. 1, precedente |
| 10 | Ingressos | pág. 1, Claude 0.8 |
| 11 | Combustiveis e Lubrificantes | pág. 1, Jev 1 |
| 12 | Inss s/Arbitragens | pág. 1, precedente |
| 13 | Exame Anti-Doping | pág. 1, precedente |
| 14 | Serviços Prest p/Terceiros | pág. 1, Jev 0.97 |
| 15 | Direito de Imagem | pág. 1, Jev 0.99 |
| 16 | Vistoria em Estadio | pág. 1, Claude 0.8 |
| 17 | Locação de Estadio | pág. 1, precedente |
| 18 | Salarios e Ordenados | pág. 1, Claude 0.8 |
| 19 | Férias Normais | pág. 1, Jev 0.99 |
| 20 | Férias Indenizadas | pág. 1, Jev 0.95 |
| 21 | 13º Salario | pág. 1, Jev 1 |
| 22 | Aviso Prévio Indenizado | pág. 1, precedente |
| 23 | Inss | pág. 1, Jev 0.96 |
| 24 | Fgts | pág. 1, Jev 1 |
| 25 | Fgts Rescisório | pág. 1, precedente |
| 26 | Premios e Gratificações | pág. 1, Claude 0.8 |
| 27 | Academia | pág. 1, precedente |
| 28 | Agua Mineral | pág. 2, precedente |
| 29 | Alimentação | pág. 2, precedente |
| 30 | Despesas de Viagens | pág. 2, Jev 1 |
| 31 | Vale Transporte | pág. 2, precedente |
| 32 | Indenizações Trabalhistas | pág. 2, precedente |
| 33 | Despesas de Hospedagem | pág. 2, precedente |
| 34 | Pis s/Folha | pág. 2, Jev 0.99 |
| 35 | Ajuda de Custo | pág. 2, Jev 0.95 |
| 36 | Custo Formação Atleta | pág. 2, precedente |
| 37 | Estoque Inicial | pág. 2, Jev 1 |
| 38 | Compras Mercadorias a Prazo | pág. 2, precedente |
| 39 | (-) Estoque Final | pág. 2, Jev 1 |
| 40 | (-) Recuperação Cofins | pág. 2, Claude 0.85 |
| 41 | (-) Recuperação Pis | pág. 2, Jev 0.91 |
| 42 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 43 | Férias Normais | pág. 2, Jev 0.99 |
| 44 | 13º Salario | pág. 2, Jev 1 |
| 45 | Inss | pág. 2, Jev 0.96 |
| 46 | Fgts | pág. 2, Jev 1 |
| 47 | Vale Transporte | pág. 2, precedente |
| 48 | Pis s/Folha | pág. 2, Jev 0.99 |
| 49 | Salarios e Ordenados | pág. 2, Claude 0.8 |
| 50 | Férias Normais | pág. 2, Jev 0.99 |
| 51 | 13º Salario | pág. 2, Jev 1 |
| 52 | Inss | pág. 2, Jev 0.96 |
| 53 | Fgts | pág. 2, Jev 1 |
| 54 | Fgts Rescisorio | pág. 2, precedente |
| 55 | Vale Transporte | pág. 2, precedente |
| 56 | Aluguel | pág. 2, precedente |
| 57 | Depreciações | pág. 2, Jev 1 |
| 58 | Despesas Diversas | pág. 2, Jev 1 |
| 59 | Despesas de Viagens | pág. 2, Jev 1 |
| 60 | Impostos e Taxas | pág. 2, Jev 1 |
| 61 | Manutenção, Conservação de Bens | pág. 2, Claude 0.9 |
| 62 | Combustiveis | pág. 2, Jev 0.99 |
| 63 | Propaganda e Publicidade | pág. 2, Jev 1 |
| 64 | Provedor de Internet | pág. 2, Jev 1 |
| 65 | Custas e Emolumentos | pág. 2, precedente |
| 66 | Despesas com Ativo Fixo | pág. 2, precedente |
| 67 | Contingencias Tributarias | pág. 2, Jev 0.9 |
| 68 | Condominio | pág. 2, precedente |
| 69 | Materiais Esportivos | pág. 2, precedente |
| 70 | Materias de Limpeza e Higiene | pág. 2, Jev 1 |
| 71 | Medicamentos e Mat.Medicos e Cirurgicos | pág. 3, precedente |
| 72 | Material de Consumo | pág. 3, precedente |
| 73 | Agua | pág. 3, Jev 1 |
| 74 | Aluguel | pág. 3, precedente |
| 75 | Bens de Valores Irrelevantes | pág. 3, precedente |
| 76 | Energia Eletrica | pág. 3, Jev 1 |
| 77 | Impostos e Taxas | pág. 3, Jev 1 |
| 78 | Manutenção e Conservação de Bens | pág. 3, Jev 1 |
| 79 | Gas | pág. 3, Jev 0.99 |
| 80 | Agua | pág. 3, Jev 1 |
| 81 | Multas | pág. 3, Jev 0.97 |
| 82 | Agua | pág. 3, Jev 1 |
| 83 | Energia Eletrica | pág. 3, Jev 1 |
| 84 | Telefone | pág. 3, Jev 1 |
| 85 | Seguro de Vida | pág. 3, precedente |
| 86 | Impressos e Materiais de Escritorio | pág. 3, Jev 1 |
| 87 | Correios | pág. 3, Jev 0.99 |
| 88 | Custas e Emolumentos | pág. 3, precedente |
| 89 | Material de Cozinha e Copa | pág. 3, Jev 0.97 |
| 90 | Telefone | pág. 3, Jev 1 |
| 91 | Impressos e Matriais de Escritorio | pág. 3, Jev 1 |
| 92 | Honorarios Contabeis,Adv e de Auditorias | pág. 3, Jev 1 |
| 93 | Baixa de Imobilizado | pág. 3, Jev 0.95 |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2013-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2013-12-31
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2013 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -1.222.442,07. Onboarding to-do 165 (Claude, 2026-10-09): el balancete imprime '= Prejuízo 1.222.442,07 D' (D = déficit) y el sistema lo leía como +1.222.442. Cuenta: ingresos 3.973.653 - gastos 5.017.987 - financiero/otros 178.107 = -1.222.442 (resultado es pérdida)
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-10, SIN VERIFICAR
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Renda de jogos | pág. 6, Claude 0.88 |
| 2 | Venda de atletas | pág. 6, Jev 1 |
| 3 | Cotas de TV Campeonato Paulista Série A-2 | pág. 6, Jev 1 |
| 4 | Doação de Materiais esportivos | pág. 6, precedente |
| 5 | Vendas líquidas de produtos | pág. 6, Jev 0.96 |
| 6 | Patrocínios | pág. 6, Jev 1 |
| 7 | Recuperação de despesas | pág. 6, Jev 1 |
| 8 | Contratos de parcerias | pág. 6, Jev 0.99 |
| 9 | Com doação | pág. 6, Jev 1 |
| 10 | Publicidades | pág. 6, Jev 1 |
| 11 | Aviso prévio descontado | pág. 6, Jev 0.9 |
| 12 | deduções das receitas | pág. 6, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gerais e administrativas | pág. 6, Jev 1 |
| 2 | Depreciações e amortizações | pág. 6, Jev 1 |
| 3 | Pessoal | pág. 6, precedente |
| 4 | Serviços de terceiros | pág. 6, Jev 0.92 |
| 5 | Tributárias | pág. 6, Jev 1 |
| 6 | Com atividade esportiva - Profissional | pág. 6, precedente |
| 7 | Com pessoal - Atletas Profissionais | pág. 6, Jev 1 |
| 8 | Com mercadorias | pág. 6, precedente |
| 9 | CUSTOS-Formação de Atletas | pág. 6, precedente |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.834.030,87. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.406.851,05. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 32.323,39. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 96.034,75. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2024, 2025): Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2012: tools/cargar.mjs 2026-10-10, SIN VERIFICAR
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Ferroviaria/balanco-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Receitas de atividades desportivas profissionais | pág. 5, Jev 1 |
| 2 | Receitas de publicidade e patrocínios | pág. 5, Jev 1 |
| 3 | ( - ) Impostos | pág. 5, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-10)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com pessoal profissional | pág. 5, Jev 0.91 |
| 2 | Despesas administrativa profissional | pág. 5, Jev 0.96 |
| 3 | Despesas Tributárias | pág. 5, Jev 1 |
| 4 | Serviços de terceiros | pág. 5, Jev 0.92 |
| 5 | Serviços do departamento de esportes profissional | pág. 5, precedente |
| 6 | Serviços do departamento de esportes para outras categorias | pág. 5, Claude 0.8 |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.196.469,33. Claude 2026-10-09: el costo está impreso entre paréntesis (resta de la receita) y el resto de los gastos en positivo; la lectura 5 invertía su signo. Cuenta: Receitas líquidas 1.581.519,76 (L162) - Custos 1.220.963,91 (L166) - Despesas Operacionais 402.186,01 (L172) - Serviços de terceiros 19.682,75 (L174) - Despesas financeiras 12.921,96 (L173) = -74.234,87 (L177).
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 24.494,58. Claude 2026-10-09: el costo está impreso entre paréntesis (resta de la receita) y el resto de los gastos en positivo; la lectura 5 invertía su signo. Cuenta: Receitas líquidas 1.581.519,76 (L162) - Custos 1.220.963,91 (L166) - Despesas Operacionais 402.186,01 (L172) - Serviços de terceiros 19.682,75 (L174) - Despesas financeiras 12.921,96 (L173) = -74.234,87 (L177).
tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2012, 2013, 2014, 2015, 2016, 2018, 2021, 2022, 2023, 2024, 2025): Televisión, Organización de partidos
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### ferroviaria-br-demonstracoes-financeiras-2023-fpf

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-demonstracoes-financeiras-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2010

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2012

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2013-b

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2013-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2014-b

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2014-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2015-b

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2015-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-balanco-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-dre-2018

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/dre-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-demonstracoes-financeiras-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-demonstracoes-financeiras-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-dre-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/dre-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### ferroviaria-br-dre-2017

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/dre-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
