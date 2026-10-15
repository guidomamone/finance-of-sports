# goias-br — evidencia de carga

Lo que había como comentario en `data/br/goias-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/goias-br-data.js — Goiás Esporte Clube (Brasil).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Brasil/Goias/demonstracoes-contabeis-2025.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "goias-br" — slug de "Goias" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Goiás Esporte Clube" — claude-api con cita verificada: pág. 11: "O Goiás Esporte Clube é uma associação civil de prática desportiva, sem fins lucrativos, de natureza não emp
  displayName        ok        "Goias" — nombre de la carpeta del club en Clubes/
  country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
  reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12)
  sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
  cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12))
  reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
  perimetro          ok        "individual" — claude-api con cita verificada: pág. 3: "Examinamos as demonstrações contábeis do Goiás Esporte Clube (“Clube”), que compreendem o balanço patrimonial
  currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
  fxRef              ok        "BRL@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2025-12-31 = 5.5024 (PTAX de cierre (venda) del Banco Central do Brasil, boletín del 30/
  sourceId           ok        "goias-br-demonstracoes-contabeis-2025" — clubId + nombre del archivo en slug
  liga               ok        "br-serieB" — roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Goiás"

FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2025: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2025-12-31","sourceId":"goias-br-demonstracoes-contabeis-2025"}
============================================================================
```

_de data/clubs.js:_

```text
Goias: alta por tools/alta-club.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2025.pdf. brandColor de Guido
(2026-10-02: verde #006633; footylogos no tiene a Goiás).
```

_de data/club-leagues/br.js:_

```text
Goias (alta-club.mjs, 2026-10-02): verificado contra roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Goiás".
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 29, precedente |
| 2 | Receitas Atividades Sociais e Lazer | pág. 29, precedente |
| 3 | Patrocínio/bilheteria/Sócio Torcedor/ Outras | pág. 29, precedente |
| 4 | Transação de atletas | pág. 29, precedente |
| 5 | (-) Demais deduções da receita | pág. 29, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesa com pessoal (a) | pág. 29, precedente |
| 2 | Cessão de Direitos Imagem | pág. 29, precedente |
| 3 | Serviços de terceiros (b) | pág. 29, precedente |
| 4 | Despesa formação atletas base | pág. 29, precedente |
| 5 | Demais custos e despesas operacionais | pág. 29, precedente |
| 6 | Materiais Esportivos | pág. 29, precedente |
| 7 | Amortização de custo de atletas contratados | pág. 29, precedente |
| 8 | Cessão Temporária | pág. 29, precedente |
| 9 | Outros custos com jogos e atletas | pág. 29, precedente |
| 10 | Taxas confederações e federações | pág. 29, precedente |
| 11 | Luvas | pág. 29, precedente |
| 12 | Amortização de custo de atletas formados | pág. 29, precedente |
| 13 | Custos e despesas c/ pessoal jogos | pág. 29, precedente |
| 14 | Arbitragens | pág. 29, precedente |
| 15 | Despesas Administrativas (a) | pág. 30, precedente |
| 16 | Despesas com serviços prestados | pág. 30, precedente |
| 17 | Despesa com pessoal | pág. 30, precedente |
| 18 | Despesas legais e judiciais (b) | pág. 30, precedente |
| 19 | Depreciação e amortização | pág. 30, precedente |
| 20 | Água, telefone, energia e internet | pág. 30, precedente |
| 21 | Despesas tributárias | pág. 7, precedente |
| 22 | Despesas com Earn In (a) | pág. 30, ajuste manual (auditoría 2026-10-04, hallazgo 10: nota 22, como 2024) |
| 23 | Outras Receitas (b) | pág. 30, ajuste manual (auditoría 2026-10-04, hallazgo 10: nota 22; se muda de ingreso a ítem excepcional, mismo efecto en el resultado) |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): cero-real = Estadio. Guido 2026-10-02: el documento 2025 no separa bilheteria ni sócio torcedor: van juntos en 'Patrocínio/bilheteria/Sócio Torcedor/ Outras' 19.931.127. El 0 es del desglose, no un dato perdido; reintentar no lo arregla.
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): cero-real = Cuotas sociales. Guido 2026-10-02: el documento 2025 no separa bilheteria ni sócio torcedor: van juntos en 'Patrocínio/bilheteria/Sócio Torcedor/ Outras' 19.931.127. El 0 es del desglose, no un dato perdido; reintentar no lo arregla.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV | pág. 25, Jev 1 |
| 2 | Patrocínio/publicidade/propaganda | pág. 25, Jev 1 |
| 3 | Premiação/participações | pág. 25, Jev 0.99 |
| 4 | Receitas Atividades Sociais e Lazer | pág. 25, precedente |
| 5 | Bilheterias | pág. 26, Jev 1 |
| 6 | Transação de atletas | pág. 26, Jev 1 |
| 7 | Outras receitas | pág. 26, Jev 0.98 |
| 8 | Sou Goiás | pág. 26, precedente |
| 9 | Jogos lotéricos | pág. 26, Jev 0.99 |
| 10 | Receitas patrimoniais | pág. 26, precedente |
| 11 | (-) INSS Competições/Torneios | pág. 26, precedente |
| 12 | (-) Deduções das mensalidades | pág. 26, Jev 0.95 |
| 13 | (-) INSS Patrocínio/Publicidade/Propaganda | pág. 26, precedente |
| 14 | (-) Custos e Despesas Sou Goiás | pág. 26, precedente |
| 15 | (-) Demais deduções da receita | pág. 26, Jev 0.99 |
| 16 | (-) IRRF Jogos Lotéricos | pág. 26, precedente |
| 17 | (-) Cortez. Ingressos - Camp. Goiano | pág. 26, Jev 0.99 |
| 18 | (-) INSS Jogos Lotéricos | pág. 26, precedente |
| 19 | (-) Cortez. Ingressos - Copa Verde | pág. 26, Jev 0.99 |
| 20 | (-) Gestão de Bilheteria | pág. 26, Claude 0.85 |
| 21 | (-) Fenapaf | pág. 26, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesa com pessoal | pág. 26, precedente |
| 2 | Despesas com viagens | pág. 26, Jev 1 |
| 3 | Serviços de terceiros | pág. 26, precedente |
| 4 | Cessão de Direitos Imagem (a) | pág. 26, Jev 0.97 |
| 5 | Materiais Esportivos | pág. 26, precedente |
| 6 | Cessão Temporária | pág. 26, precedente |
| 7 | Amortização de custo de atletas formados | pág. 26, Jev 0.95 |
| 8 | Amortização de custo de atletas contratados | pág. 26, Jev 1 |
| 9 | Arbitragens | pág. 26, Jev 0.98 |
| 10 | Taxas confederações e federações | pág. 26, Jev 0.95 |
| 11 | Demais custos e despesas operacionais | pág. 26, precedente |
| 12 | Outros custos com atletas | pág. 26, precedente |
| 13 | Cessão Definitiva | pág. 26, precedente |
| 14 | Custos e despesas c/ pessoal jogos | pág. 26, precedente |
| 15 | Exames antidoping | pág. 26, precedente |
| 16 | Luvas (a) | pág. 26, precedente |
| 17 | Despesa formação atletas base (b) | pág. 26, Jev 1 |
| 18 | Outros custos e despesas com jogos | pág. 26, Jev 0.99 |
| 19 | Despesa com pessoal (a) | pág. 27, precedente |
| 20 | Provisões para contingências | pág. 27, Jev 0.98 |
| 21 | Despesas Administrativas (materiais inclusos) | pág. 27, Jev 1 |
| 22 | Despesas com serviços prestados (b) | pág. 27, precedente |
| 23 | Depreciação e amortização | pág. 27, Jev 1 |
| 24 | Água, telefone, energia e internet | pág. 27, Jev 1 |
| 25 | Despesas legais e judiciais | pág. 27, Jev 0.99 |
| 26 | Despesas tributárias | pág. 7, Jev 1 |
| 27 | Outras Receitas e Despesas | pág. 7, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Direitos de transmissão de TV (a) | pág. 29, Jev 1 |
| 2 | Patrocínio/publicidade/propaganda (a) | pág. 29, Jev 1 |
| 3 | Premiação/participações (a) | pág. 29, Jev 0.99 |
| 4 | Receitas Atividades Sociais e Lazer | pág. 29, precedente |
| 5 | Bilheterias (a) | pág. 29, Jev 1 |
| 6 | Transação de atletas | pág. 29, Jev 1 |
| 7 | Outras receitas | pág. 29, Jev 0.98 |
| 8 | Sou Goiás | pág. 29, precedente |
| 9 | Jogos lotéricos | pág. 29, Jev 0.99 |
| 10 | Receitas patrimoniais | pág. 29, precedente |
| 11 | (-) INSS Competições/Torneios | pág. 29, precedente |
| 12 | (-) Direito de Arena Compet./Torneios | pág. 29, precedente |
| 13 | (-) INSS Patrocínio/Publicidade/Propaganda | pág. 29, precedente |
| 14 | (-) Custos e Despesas Sou Goiás | pág. 29, precedente |
| 15 | (-) Demais deduções da receita | pág. 29, Jev 0.99 |
| 16 | (-) Cortez. Ingressos - Camp. Brasileiro | pág. 29, Jev 0.98 |
| 17 | (-) IRRF Jogos Lotéricos | pág. 29, precedente |
| 18 | (-) Cortez. Ingressos - Camp. Goiano | pág. 29, Jev 0.99 |
| 19 | (-) INSS Jogos Lotéricos | pág. 29, precedente |
| 20 | (-) Cortez. Ingressos - Copa Verde | pág. 29, Jev 0.99 |
| 21 | (-) Cortez. Ingressos - Sul. Americana | pág. 29, Jev 0.97 |
| 22 | (-) Ressarcimento/Reembolso de Ingressos | pág. 29, Jev 0.95 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Outras Receitas e Despesas | pág. 7, precedente |
| 2 | Despesa com pessoal (a) | pág. 30, Jev 0.98 |
| 3 | Despesas com viagens (b) | pág. 30, Jev 1 |
| 4 | Serviços de terceiros | pág. 30, precedente |
| 5 | Cessão de Direitos Imagem (a) | pág. 30, Jev 0.97 |
| 6 | Baixa Custo de Atletas | pág. 30, Jev 0.99 |
| 7 | Materiais Esportivos | pág. 30, precedente |
| 8 | Cessão Temporária | pág. 30, precedente |
| 9 | Amortização de custo de atletas formados | pág. 30, Jev 0.95 |
| 10 | Amortização de custo d atletas contratados | pág. 30, Jev 1 |
| 11 | Arbitragens | pág. 30, Jev 0.98 |
| 12 | Taxas confederações e federações | pág. 30, Jev 0.95 |
| 13 | Demais custos e despesas operacionais | pág. 30, precedente |
| 14 | Outros custos com atletas | pág. 30, precedente |
| 15 | Cessão Definitiva | pág. 30, precedente |
| 16 | Custos e despesas c/ pessoal jogos | pág. 30, precedente |
| 17 | Aluguéis e Estádios | pág. 30, precedente |
| 18 | Exames antidoping | pág. 30, precedente |
| 19 | Despesa com pessoal | pág. 30, Claude 0.85 |
| 20 | Provisões para contingências | pág. 30, Jev 0.98 |
| 21 | Despesas Administrativas (materiais inclusos) | pág. 30, Jev 1 |
| 22 | Despesas com serviços prestados | pág. 30, Claude 0.85 |
| 23 | Depreciação e amortização | pág. 30, Jev 1 |
| 24 | Água, telefone, energia e internet | pág. 30, Jev 1 |
| 25 | Despesas legais e judiciais | pág. 30, Jev 0.99 |
| 26 | Despesas tributárias | pág. 7, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2023 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias (a) | pág. 30, Jev 1 |
| 2 | Direitos de transmissão de TV (a) | pág. 30, Jev 1 |
| 3 | Premiação/participações (a) | pág. 30, Jev 0.99 |
| 4 | Transação de atletas | pág. 30, Jev 1 |
| 5 | Patrocínio/publicidade/propaganda (a) | pág. 30, Jev 1 |
| 6 | Associados | pág. 30, Jev 1 |
| 7 | Esportes Olímpicos | pág. 30, Jev 0.97 |
| 8 | Iniciação Esportiva | pág. 30, precedente |
| 9 | Nação Esmeraldina | pág. 30, precedente |
| 10 | Jogos lotéricos | pág. 30, Jev 0.99 |
| 11 | Receitas patrimoniais | pág. 30, precedente |
| 12 | Outras receitas | pág. 30, Jev 0.98 |
| 13 | (-) INSS Competições/Torneios | pág. 30, precedente |
| 14 | (-) Cortez. Ingressos - Campeonato Brasileiro | pág. 30, precedente |
| 15 | (-) Cortez. Ingressos - Copa Verde | pág. 30, Jev 0.99 |
| 16 | (-) Direito de Arena Competições/Torneios | pág. 30, precedente |
| 17 | (-) Ressarcimento / Reembolso de Ingressos | pág. 30, Jev 0.95 |
| 18 | (-) INSS Patrocínio/Publicidade/Propaganda | pág. 30, precedente |
| 19 | (-) Deduções de mensalidades | pág. 30, precedente |
| 20 | (-) Custos e Despesas Nação Esmeraldina | pág. 30, precedente |
| 21 | (-) IRRF Jogos Lotéricos | pág. 30, precedente |
| 22 | (-) INSS Jogos Lotéricos | pág. 30, precedente |
| 23 | (-) Demais deduções da receita | pág. 30, Jev 0.99 |
| 24 | Outras Receitas e Despesas | pág. 7, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arbitragens | pág. 31, Jev 0.98 |
| 2 | Exames antidoping | pág. 31, precedente |
| 3 | Custos e despesas c/ pessoal - Jogos | pág. 31, precedente |
| 4 | Outros custos e despesas - Jogos | pág. 31, precedente |
| 5 | Taxas confederações e federações | pág. 31, Jev 0.95 |
| 6 | Despesa com pessoal (a) | pág. 31, Jev 0.98 |
| 7 | Amortização de custo de atletas contratados | pág. 31, Jev 1 |
| 8 | Amortização de custo de atletas formados | pág. 31, Jev 0.95 |
| 9 | Baixa Custo de Atletas | pág. 31, Jev 0.99 |
| 10 | Cessão de Direitos Econômicos | pág. 31, precedente |
| 11 | Cessão de Direitos Imagem (a) | pág. 31, Jev 0.97 |
| 12 | Outros custos com atletas | pág. 31, precedente |
| 13 | Demais custos e despesas operacionais | pág. 31, precedente |
| 14 | Despesa com pessoal | pág. 31, Claude 0.85 |
| 15 | Despesas legais e judiciais | pág. 31, Jev 0.99 |
| 16 | Despesas administrativas | pág. 31, Jev 1 |
| 17 | Água, telefone, energia e internet | pág. 31, Jev 1 |
| 18 | Depreciação e amortização | pág. 31, Jev 1 |
| 19 | Provisões para contingências | pág. 31, Jev 0.98 |
| 20 | Despesas com serviços de terceiros | pág. 7, Jev 1 |
| 21 | Despesas tributárias | pág. 7, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2022: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 36, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 36, Jev 1 |
| 3 | Premiação/participações | pág. 36, Jev 1 |
| 4 | Transação de atletas (a) | pág. 36, Jev 1 |
| 5 | Patrocínio/publicidade/propaganda | pág. 36, Jev 1 |
| 6 | Associados | pág. 36, Jev 1 |
| 7 | Esportes Olímpicos | pág. 36, Jev 0.96 |
| 8 | Iniciação Esportiva | pág. 36, precedente |
| 9 | Nação Esmeraldina | pág. 36, precedente |
| 10 | Jogos lotéricos | pág. 36, Jev 0.98 |
| 11 | Receitas patrimoniais | pág. 36, precedente |
| 12 | Outras receitas | pág. 36, Jev 1 |
| 13 | (-) INSS Receitas de Bilheterias | pág. 36, ? 0.6 |
| 14 | (-) Cortez. Ingressos - Campeonato Brasileiro | pág. 36, precedente |
| 15 | (-) INSS Competições/Torneios | pág. 36, precedente |
| 16 | (-) Direito de Arena Competições/Torneios | pág. 36, precedente |
| 17 | (-) INSS Patrocínio/Publicidade/Propaganda | pág. 36, precedente |
| 18 | (-) Deduções de mensalidades | pág. 36, precedente |
| 19 | (-) Custos e Despesas Nacao Esmeraldina | pág. 36, precedente |
| 20 | (-) IRRF Jogos Lotéricos | pág. 36, precedente |
| 21 | (-) INSS Jogos Lotéricos | pág. 36, precedente |
| 22 | (-) Demais deduções da receita | pág. 36, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arbitragens | pág. 37, Jev 0.94 |
| 2 | Exames antidoping | pág. 37, precedente |
| 3 | Custos e despesas c/ pessoal - Jogos | pág. 37, precedente |
| 4 | Outros custos e despesas - Jogos | pág. 37, precedente |
| 5 | Taxas confederações e federações | pág. 37, Jev 0.96 |
| 6 | Transportes | pág. 37, precedente |
| 7 | Alimentação e estadias | pág. 37, precedente |
| 8 | Despesa com pessoal | pág. 37, Claude 0.8 |
| 9 | Amortização de custo de atletas contratados (a) | pág. 37, Jev 1 |
| 10 | Amortização de custo de atletas formados (a) | pág. 37, Jev 1 |
| 11 | Cessão de Direitos Imagem | pág. 37, Claude 0.85 |
| 12 | Despesas administrativas e gerais | pág. 9, Jev 1 |
| 13 | Despesas com materiais | pág. 9, Jev 0.99 |
| 14 | Despesas com serviços de terceiros | pág. 9, Jev 1 |
| 15 | Despesas tributárias | pág. 9, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2021: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2017-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2017-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 23, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 23, Jev 1 |
| 3 | Premiação/participações | pág. 23, Jev 1 |
| 4 | Transação de atletas | pág. 23, Jev 1 |
| 5 | Patrocínio/ publicidade/propaganda | pág. 23, Jev 1 |
| 6 | Mensalidades | pág. 23, Jev 0.98 |
| 7 | Jogos lotéricos | pág. 23, Jev 0.98 |
| 8 | Receitas patrimoniais | pág. 23, precedente |
| 9 | Outras receitas | pág. 23, Jev 1 |
| 10 | (-) Deduções das receitas | pág. 23, Jev 0.94 |

### Gastos

```text
tools/cargar.mjs (2026-10-02)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Alugueis de estádios | pág. 23, precedente |
| 2 | Arbitragens | pág. 23, Jev 0.94 |
| 3 | Exames antidoping | pág. 23, precedente |
| 4 | Custos e despesas c/ pessoal - jogos | pág. 23, precedente |
| 5 | Outros custos e despesas - jogos | pág. 23, precedente |
| 6 | Taxas confederações e federações | pág. 23, Jev 0.96 |
| 7 | Transportes | pág. 23, precedente |
| 8 | Alimentação e estadias | pág. 23, precedente |
| 9 | Despesa com pessoal | pág. 23, Claude 0.8 |
| 10 | Cessão de direito de imagem | pág. 23, Jev 0.96 |
| 11 | Combustíveis e lubrificantes | pág. 24, Jev 1 |
| 12 | Manutenção e conservação | pág. 24, Jev 0.98 |
| 13 | Propaganda e publicidade | pág. 24, Jev 1 |
| 14 | Brindes | pág. 24, Jev 0.95 |
| 15 | Despesas legais e judiciais | pág. 24, Claude 0.8 |
| 16 | Água, telefone, energia e internet | pág. 24, Jev 1 |
| 17 | Seguros | pág. 24, Jev 0.96 |
| 18 | Lanches e refeições | pág. 24, precedente |
| 19 | Livros, revistas e periódicos | pág. 24, Jev 1 |
| 20 | Correios | pág. 24, Jev 0.98 |
| 21 | Transportes | pág. 24, precedente |
| 22 | Despesas indedutíveis | pág. 24, precedente |
| 23 | Outras despesas administrativas | pág. 24, Jev 0.92 |
| 24 | Depreciação e amortização | pág. 24, Jev 0.94 |
| 25 | Provisões cíveis, trabalhistas e tributárias | pág. 24, precedente |
| 26 | Despesas com materiais | pág. 7, Jev 0.99 |
| 27 | Despesas com serviços de terceiros | pág. 7, Jev 1 |
| 28 | Despesas tributárias | pág. 7, Jev 1 |
| 29 | Outras despesas e receitas | pág. 7, Jev 0.99 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2017. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2017-2016' es el ejercicio 2017 con 2016 de comparativo, no 2016.
tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2017: tools/cargar.mjs 2026-10-02, verificado contra roster cacheado de "2017 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2016-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2016-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 2 | Direitos de transmissão de TV | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 3 | Premiação/participações | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 4 | Transação de atletas | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 5 | Patrocínio/ publicidade/propaganda | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 6 | Mensalidades | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 7 | Jogos lotéricos | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 8 | Receitas patrimoniais | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 9 | Outras receitas | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 10 | (-) Deduções das receitas | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 11 | Outras receitas e despesas | pág. 1, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Alugueis de estádios | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 2 | Arbitragens | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 3 | Exames antidoping | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 4 | Custos e despesas c/ pessoal - Jogos | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 5 | Outros custos e despesas - Jogos | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 6 | Taxas confederações e federações | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 7 | Transportes | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 8 | Alimentação e estadias | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 9 | Cessão de direitos de atletas | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 10 | Despesa com pessoal | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 11 | Cessão de direito de imagem | pág. 3, ajuste manual (nota 17/18, auditoría 2026-10-04) |
| 12 | Despesas administrativas | pág. 1, precedente |
| 13 | Materiais | pág. 1, precedente |
| 14 | Serviços de terceiros | pág. 1, precedente |
| 15 | Despesas tributárias | pág. 1, precedente |
| 16 | Despesas gerais | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2016. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2016-2015' es el ejercicio 2016 con 2015 de comparativo, no 2015.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
ajuste manual (2026-10-05, auditoría 2026-10-04 hallazgo 1): ingresos y gastos de fútbol abiertos con las notas 17 y 18 (.md L892-941), que suman exacto lo impreso.
```

### Liga

```text
2016: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2016: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2016 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2015-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2015-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 2, precedente |
| 2 | Direitos de transmissão de TV | pág. 2, precedente |
| 3 | Premiação/participações | pág. 2, precedente |
| 4 | Transação de atletas | pág. 2, precedente |
| 5 | Patrocínio/ publicidade/propaganda | pág. 2, precedente |
| 6 | Mensalidades | pág. 2, precedente |
| 7 | Jogos lotéricos | pág. 2, precedente |
| 8 | Receitas patrimoniais | pág. 2, precedente |
| 9 | Outras receitas | pág. 2, precedente |
| 10 | (-) Deduções da receita | pág. 2, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Alugueis de estádios | pág. 3, precedente |
| 2 | Arbitragens | pág. 3, precedente |
| 3 | Exames antidoping | pág. 3, precedente |
| 4 | Custos e despesas c/ pessoal - Jogos | pág. 3, precedente |
| 5 | Outros custos e despesas - Jogos | pág. 3, precedente |
| 6 | Taxas confederações e federações | pág. 3, precedente |
| 7 | Transportes | pág. 3, precedente |
| 8 | Alimentação e estadias | pág. 3, precedente |
| 9 | Cessão de direitos de atletas | pág. 3, precedente |
| 10 | Despesa com pessoal | pág. 3, precedente |
| 11 | Cessão de direito de imagem | pág. 3, precedente |
| 12 | Despesas administrativas | pág. 1, precedente |
| 13 | Materiais | pág. 1, precedente |
| 14 | Serviços de terceiros | pág. 1, precedente |
| 15 | Despesas tributárias | pág. 1, precedente |
| 16 | Água, telefone, energia e internet | pág. 3, precedente |
| 17 | Seguros | pág. 3, precedente |
| 18 | Lanches e refeições | pág. 3, precedente |
| 19 | Livros, revistas e periódicos | pág. 3, precedente |
| 20 | Correios | pág. 3, precedente |
| 21 | Transportes | pág. 3, precedente |
| 22 | Despesas indedutíveis | pág. 3, precedente |
| 23 | Outras despesas administrativas | pág. 3, precedente |
| 24 | Depreciação e amortização | pág. 3, precedente |
| 25 | Provisões para contingências | pág. 3, precedente |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2015. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2015-2014' es el ejercicio 2015 con 2014 de comparativo, no 2014.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2015: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2015 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2014

### Ingresos

```text
2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2014-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 19, precedente |
| 2 | Direitos de transmissão de TV | pág. 19, precedente |
| 3 | Premiação/participações | pág. 19, precedente |
| 4 | Transação de atletas | pág. 19, precedente |
| 5 | Patrocínio/ publicidade/propaganda | pág. 19, precedente |
| 6 | Mensalidades | pág. 19, precedente |
| 7 | Jogos lotéricos | pág. 19, precedente |
| 8 | Receitas patrimoniais | pág. 19, precedente |
| 9 | Outras receitas | pág. 19, precedente |
| 10 | (-) Deduções da receita | pág. 19, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Alugueis de estádios | pág. 19, precedente |
| 2 | Arbitragens | pág. 19, precedente |
| 3 | Exames antidoping | pág. 19, precedente |
| 4 | Custos e despesas c/ pessoal - Jogos | pág. 19, precedente |
| 5 | Outros custos e despesas - Jogos | pág. 19, precedente |
| 6 | Taxas confederações e federações | pág. 19, precedente |
| 7 | Transportes | pág. 19, precedente |
| 8 | Alimentação e estadias | pág. 19, precedente |
| 9 | Cessão de direitos de atletas | pág. 19, precedente |
| 10 | Despesa com pessoal | pág. 19, precedente |
| 11 | (-) Despesas administrativas | pág. 6, Jev 1 |
| 12 | (-) Materiais | pág. 6, Claude 0.8 |
| 13 | (-) Serviços de terceiros | pág. 6, precedente |
| 14 | (-) Despesas tributárias | pág. 6, Jev 1 |
| 15 | Água, telefone, energia e internet | pág. 20, precedente |
| 16 | Seguros | pág. 20, precedente |
| 17 | Lanches e refeições | pág. 20, precedente |
| 18 | Livros, revistas e periódicos | pág. 20, precedente |
| 19 | Correios | pág. 20, precedente |
| 20 | Transportes | pág. 20, precedente |
| 21 | Despesas gerais | pág. 20, Jev 1 |
| 22 | Outras despesas administrativas | pág. 20, precedente |
| 23 | Depreciação e amortização | pág. 20, precedente |
| 24 | Provisões para contingências | pág. 20, precedente |

### Meta

```text
2014: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2014. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2014-2013' es el ejercicio 2014 con 2013 de comparativo, no 2013.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2014: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2014: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2014 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2013

### Ingresos

```text
2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2013-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 18, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 18, Jev 1 |
| 3 | Premiação/participações | pág. 18, Jev 1 |
| 4 | Transação de atletas | pág. 18, Jev 1 |
| 5 | Patrocínio/ publicidade/propaganda | pág. 18, Jev 1 |
| 6 | Mensalidades | pág. 18, Jev 0.98 |
| 7 | Jogos lotéricos | pág. 18, Jev 0.98 |
| 8 | Receitas patrimoniais | pág. 18, precedente |
| 9 | Outras receitas | pág. 18, Jev 1 |
| 10 | (-) Deduções da receita | pág. 18, Jev 0.99 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 2 | Despesas com pessoal - futebol profissional | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 3 | Despesas com pessoal - social e administrativo | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 4 | Despesas administrativas | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 5 | Materiais | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 6 | Serviços de terceiros | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 7 | Despesas tributárias | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 8 | Despesas gerais | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 9 | Provisões para contingências | pág. 18, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |

### Meta

```text
2013: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2013. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2013-2012' es el ejercicio 2013 con 2012 de comparativo, no 2012.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2013: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2013: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2013 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2012

### Ingresos

```text
2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2012-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2012-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bilheterias | pág. 3, precedente |
| 2 | Direitos de transmissão de TV | pág. 3, precedente |
| 3 | Premiação/participações | pág. 3, precedente |
| 4 | Transação de atletas | pág. 3, precedente |
| 5 | Patrocínio/ publicidade/propaganda | pág. 3, precedente |
| 6 | Mensalidades | pág. 3, precedente |
| 7 | Jogos lotéricos | pág. 3, precedente |
| 8 | Receitas patrimoniais | pág. 3, precedente |
| 9 | Outras receitas | pág. 3, precedente |
| 10 | (-) Deduções da receita | pág. 3, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 2 | Despesas com pessoal - futebol profissional | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 3 | Despesas com pessoal - social e administrativo | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 4 | Despesas administrativas | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 5 | Materiais | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 6 | Serviços de terceiros | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 7 | Despesas tributárias | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 8 | Despesas gerais | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |
| 9 | Provisões para contingências | pág. 3, ajuste manual (auditoría 2026-10-04, hallazgo 5: nota de costos y gastos, columna TOTAL; pessoal partido por segmento) |

### Meta

```text
2012: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2012. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2012-2011' es el ejercicio 2012 con 2011 de comparativo, no 2011.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
```

### Liga

```text
2012: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2012 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2011

### Ingresos

```text
2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2011-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arrecadação de jogos | pág. 1, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 1, precedente |
| 3 | (-) Dedução da receita | pág. 1, Jev 0.92 |
| 4 | Negociação de atestado liberatório de atletas | pág. 1, Jev 1 |
| 5 | Mensalidade e matrículas de iniciação esportiva | pág. 1, Jev 0.99 |
| 6 | Mensalidade de sócio titular | pág. 1, Jev 1 |
| 7 | Publicidade e patrocínio | pág. 1, Jev 1 |
| 8 | Parceria com patrocinadores e parceiros | pág. 1, Jev 1 |
| 9 | Premiação | pág. 1, Jev 1 |
| 10 | Participação em loteria esportiva | pág. 1, Jev 0.99 |
| 11 | Patrocínio e parceria | pág. 1, Jev 1 |
| 12 | Royalties | pág. 1, Jev 0.97 |
| 13 | Outros | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 1, Jev 1 |
| 2 | Pessoal | pág. 1, precedente |
| 3 | Provisões/reversões, acordos e indenizações | pág. 1, precedente |
| 4 | Acordos judiciais e extrajudiciais | pág. 1, precedente |
| 5 | Direito de imagem | pág. 1, Jev 0.99 |
| 6 | Serviços profissionais comissão técnica | pág. 1, Jev 0.9 |
| 7 | Despesas administrativas | pág. 1, precedente |
| 8 | Materiais | pág. 1, precedente |
| 9 | Serviços de terceiros | pág. 1, precedente |
| 10 | Despesas tributárias | pág. 1, precedente |
| 11 | Despesas gerais | pág. 1, Jev 1 |

### Meta

```text
2011: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2011. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2011-2010' es el ejercicio 2011 con 2010 de comparativo, no 2010.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2011: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2011: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2011 Campeonato Brasileiro Série B" (tools/club-league-reference/br.js
```

## 2010

### Ingresos

```text
2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2010-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arrecadação de jogos | pág. 1, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 1, precedente |
| 3 | (-) Dedução da receita | pág. 1, Jev 0.92 |
| 4 | Negociação de atestado liberatório de atletas | pág. 1, Jev 1 |
| 5 | Mensalidade e matrículas de iniciação esportiva | pág. 1, Jev 0.99 |
| 6 | Mensalidade de sócio titular | pág. 1, Jev 1 |
| 7 | Publicidade e patrocínio | pág. 1, Jev 1 |
| 8 | Parceria com patrocinadores e parceiros | pág. 1, Jev 1 |
| 9 | Premiação | pág. 1, Jev 1 |
| 10 | Participação em loteria esportiva | pág. 1, Jev 0.99 |
| 11 | Patrocínio e parceria | pág. 1, Jev 1 |
| 12 | Treinamento de atletas | pág. 1, precedente |
| 13 | Royalties | pág. 1, Jev 0.97 |
| 14 | Outros | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 1, Jev 1 |
| 2 | Pessoal | pág. 1, precedente |
| 3 | Provisões, acordos e indenizações | pág. 1, precedente |
| 4 | Acordos judiciais e extrajudiciais | pág. 1, precedente |
| 5 | Direito de imagem | pág. 1, Jev 0.99 |
| 6 | Serviços profissionais comissão técnica | pág. 1, Jev 0.9 |
| 7 | Despesas administrativas | pág. 1, precedente |
| 8 | Materiais | pág. 1, precedente |
| 9 | Serviços de terceiros | pág. 1, precedente |
| 10 | Despesas tributárias | pág. 1, precedente |
| 11 | Despesas gerais | pág. 1, Jev 1 |

### Meta

```text
2010: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2010. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2010-2009' es el ejercicio 2010 con 2009 de comparativo, no 2009.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2010: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2010: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2010 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2009

### Ingresos

```text
2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2009-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arrecadação de jogos | pág. 1, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 1, precedente |
| 3 | (-)Dedução da receita | pág. 1, Jev 0.92 |
| 4 | Outras receitas | pág. 1, precedente |
| 5 | Negociação de atestado liberatório de atletas | pág. 1, Jev 1 |
| 6 | Mensalidade e matrículas de iniciação esportiva | pág. 1, Jev 0.99 |
| 7 | Mensalidade de sócio titular | pág. 1, Jev 1 |
| 8 | Publicidade e patrocínio | pág. 1, Jev 1 |
| 9 | Parceria com patrocinadores e parceiros | pág. 1, Jev 1 |
| 10 | Premiação | pág. 1, Jev 1 |
| 11 | Participação em loteria esportiva | pág. 1, Jev 0.99 |
| 12 | Patrocinio e parceria | pág. 1, Jev 1 |
| 13 | Treinamento de atletas | pág. 1, precedente |
| 14 | Royalties | pág. 1, Jev 0.97 |
| 15 | Outros | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 1, Jev 1 |
| 2 | Pessoal | pág. 1, precedente |
| 3 | Provisões, Acordos e indenizações trabalhistas | pág. 1, Jev 0.92 |
| 4 | Direito de arena | pág. 1, Jev 0.99 |
| 5 | Acordos judiciais e extrajudiciais | pág. 1, precedente |
| 6 | Direito de imagem | pág. 1, Jev 0.99 |
| 7 | Serviços profissionais comissão técnica | pág. 1, Jev 0.9 |
| 8 | Amortização/baixa de contratos de atletas profissionais | pág. 1, Jev 1 |
| 9 | Despesas administrativas | pág. 1, precedente |
| 10 | Materiais | pág. 1, precedente |
| 11 | Serviços de terceiros | pág. 1, precedente |
| 12 | Despesas tributárias | pág. 1, precedente |
| 13 | Despesas gerais | pág. 1, Jev 1 |

### Meta

```text
2009: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2009. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2009-2008' es el ejercicio 2009 con 2008 de comparativo, no 2008.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2009: tools/cargar.mjs 2026-10-03, SIN VERIFICAR
```

```text
2009: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2009 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## 2008

### Ingresos

```text
2008: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Goias/demonstracoes-contabeis-2008-2007.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Arrecadação de jogos | pág. 1, Jev 1 |
| 2 | Direitos de transmissão de TV | pág. 1, precedente |
| 3 | (-) Dedução da receita | pág. 1, Jev 0.92 |
| 4 | Outras receitas | pág. 1, precedente |
| 5 | Negociação de atestados liberatórios de atletas | pág. 1, Jev 1 |
| 6 | Mensalidades e matrículas iniciação esportiva | pág. 1, Jev 0.96 |
| 7 | Publicidade e patrocínio | pág. 1, Jev 1 |
| 8 | Parcerias com patrocinadores e parceiros | pág. 1, Jev 0.95 |
| 9 | Premiação | pág. 1, Jev 1 |
| 10 | Participação loteria esportiva | pág. 1, Jev 0.99 |
| 11 | Patrocínio e parceria | pág. 1, Jev 1 |
| 12 | Treinamento de atletas | pág. 1, precedente |
| 13 | Royalties | pág. 1, Jev 0.97 |
| 14 | Outros | pág. 1, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-03)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Despesas com jogos | pág. 1, Jev 1 |
| 2 | Pessoal | pág. 1, precedente |
| 3 | Acordos e indezações trabalhistas | pág. 1, precedente |
| 4 | Direito de arena | pág. 1, Jev 0.99 |
| 5 | Acordos judiciais e extrajudiciais | pág. 1, precedente |
| 6 | Direitos de imagem | pág. 1, Jev 0.98 |
| 7 | Serviços profissionais comissão técnica | pág. 1, Jev 0.9 |
| 8 | Amortização/baixa de contratos de atletas profissionais | pág. 1, Jev 1 |
| 9 | Despesas administrativas | pág. 1, precedente |
| 10 | Materiais | pág. 1, precedente |
| 11 | Serviços de terceiros | pág. 1, precedente |
| 12 | Despesas tributárias | pág. 1, precedente |
| 13 | Despesas gerais | pág. 1, Jev 1 |

### Meta

```text
2008: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2008. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2008-2007' es el ejercicio 2008 con 2007 de comparativo, no 2007.
tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2008: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2008 Campeonato Brasileiro Série A" (tools/club-league-reference/br.js
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Sérgio Rassi (2014-01-01 a 2017-08-25): Aclamado presidente en 2014 (Diário de Goiás/Sagres: 2014-2017), reelecto en 2015; renunció el 25/08/2017 (viernes). Desde = 01/01/2014 por convención (solo año); no se encontró el mes.
Paulo Rogério Pinheiro (2021-01-01 a 2023-12-18): Aclamado el 30/12/2020 para el trienio 2021-2023 y asumió el 1/1/2021 en lugar de Marcelo Almeida (O Popular/Futebol Interior). Hasta 2023-12-18: aclamación de Guidão el 15/12/2023 con posse prevista el 18; el sitio del club con la nota está hoy en 404.
SIN CONFIRMAR, no cargada: Pedro Goulart (2007-01-01 a 2009-01-01), https://cleubercarlos.blogspot.com/2014/11/a-historia-secreta-do-goias-esporte.html: Blog de Cleuber Carlos (2014): 2008 fue el 'segundo año de la administración de Pedro Goulart'; Syd asumió en enero de 2009. Desde 2007-01-01 es inferido (segundo año = 2008). El mismo blog dice también 'biênio 2008/2009' para Syd (contradictorio). Fuente de baja calidad.
SIN CONFIRMAR, no cargada: Syd de Oliveira Reis (2009-01-01 a 2010-12-31), https://diariodonordeste.verdesmares.com.br/jogada/syd-de-oliveira-e-eleito-o-novo-presidente-do-goias-1.932105: Diario do Nordeste (2008): elegido para el bienio 2009/2010; el blog dice que asumió en enero de 2009. En agosto de 2010 el Conselho pidió su renuncia y un blog dice que lo suspendió 30 días; ninguna fuente dice cuándo ni cómo terminó. Hasta 2010-12-31 es el fin del bienio, NO una fecha confirmada de salida.
SIN CONFIRMAR, no cargada: Marcelo Gonçalves Almeida (2017-08-26 a 2021-01-01), https://www.goiasec.com.br/acervo/marcelo-almeida-e-o-novo-presidente-executivo-do-goias/: Era vice y asumió la presidencia ejecutiva tras la renuncia de Rassi: la nota del club (hoy 404) habla de 'sábado 26' sin año; el sábado 26 que sigue a la renuncia del 25/08/2017 es 26/08/2017 (inferencia mía). Ocupó el cargo hasta 2021 (PRP lo reemplaza el 1/1/2021).
SIN CONFIRMAR, no cargada: Aroldo Guidão Filho (2023-12-18 a 2026-10-06), https://opopular.com.br/esporte/goias-aprova-mudanca-de-estatuto-e-aroldo-guid-o-assume-presidencia-ate-o-fim-do-ano-1.3445117: Aclamado presidente del Conselho de Administração el 15/12/2023 (posse prevista 18/12/2023); en agosto de 2026 un cambio de estatuto restableció la presidencia ejecutiva y quedó en ella hasta que renunció el martes 06/10/2026. La infobox de Wikipedia lo muestra como presidente. Cargo: figura relevante tras la reforma, no la presidencia ejecutiva de 2021-23.
SIN CONFIRMAR, no cargada: Munir Calixto Júnior (2026-10-06 a hoy), https://maisgoias.com.br/esportes/apos-renuncia-guidao-goias-descarta-eleicoes-imediatas-define-novo-presidente: Vice jurídico, asume interino hasta la elección de diciembre de 2026.
Duda: SIN COBERTURA: cierres 2011, 2012 y 2013. No se encontró quién presidía el Goiás tras Syd (2010) ni antes de Rassi (2014); el presupuesto de búsquedas web se agotó. Candidatos que cita la Tribuna do Planalto como indicados por Hailé Pinheiro (sin fechas): Rubens Brandão, Raimundo Queiroz, Pedro Goulart, Vagner Vilela, João Bosco Luz, João Gualberto, Cid de Oliveira.
Duda: 2010: ¿quién presidió tras el pedido de renuncia/suspensión de Syd (agosto 2010)? No encontrado.
Duda: Cierre 2017: Rassi renunció el 25/08/2017 y Almeida asumió; el balance 2017 pudo firmarse por Almeida (campo firmo no necesario si firmó el presidente al cierre).
Duda: Cierre 2023: Paulo Rogério presidió casi todo el año; Guidão asume el 18/12/2023. Si el balance lo aprobó Guidão (2024) es lo que figura; revisar firmo=[2023] si corresponde.
Duda: Hailé Pinheiro fue presidente del Conselho Deliberativo (figura de poder) durante todo el período; no se cargó porque no es el presidente ejecutivo.
Duda: Gestión de Guidão: el cargo cambió de Presidente del Conselho de Administración (2023-2026) a presidente ejecutivo (agosto 2026); las fechas de posse 2023-12-18 no están confirmadas por una fuente leída (O Popular da 403 al leerla).
```

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Sérgio Rassi (2014-01-01 a 2017-08-25): (Tanda anterior) Aclamado presidente en 2014, reelecto en 2015; renunció el 25-08-2017. Desde 2014-01-01 por convención (solo año). Firma el cierre 2014.
Paulo Rogério Pinheiro (2021-01-01 a 2023-12-18): (Tanda anterior) Aclamado el 30-12-2020 para el trienio 2021-2023, asumió el 01-01-2021. Hasta 2023-12-18: aclamación de Guidão el 15-12-2023 con posse prevista el 18.
SIN CONFIRMAR, no cargada: Pedro Ferreira Goulart (2007-01-01 a 2009-01-01), https://cleubercarlos.blogspot.com/2014/11/a-historia-secreta-do-goias-esporte.html: Firma como "Presidente Executivo" las demostraciones del cierre 2008 (Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md): respaldo directo del cierre 2008. Las fechas vienen del blog de Cleuber Carlos (2014): 2008 fue el "segundo año" de su administración (desde 2007-01-01 inferido) y Syd asumió en enero de 2009. Fuente de baja calidad. El mismo blog habla de "bienio 2008/2009" para Syd (contradictorio).
SIN CONFIRMAR, no cargada: Syd de Oliveira Reis (2009-01-01 a 2010-09-01), https://diariodonordeste.verdesmares.com.br/jogada/syd-de-oliveira-e-eleito-o-novo-presidente-do-goias-1.932105: Firma como "Presidente Executivo" el cierre 2009 (demonstracoes-contabeis-2010-2009 y 2009-2008: el archivo 2009-2008 lleva su firma). Diário do Nordeste (2008): elegido para el bienio 2009/2010. Salida: Esmeraldino confirma que renunció en 2010 (sin día ni mes); en agosto de 2010 Hailé le pidió renunciar y Syd se negó, volvió por una liminar y luego renunció (O Popular; entrevista a Band News). hasta = 2010-09-01 es un tope aproximado; la fecha real no figura.
SIN CONFIRMAR, no cargada: Hailé Pinheiro (2010-09-01 a 2012-05-01), https://esmeraldino.com/syd-de-oliveira-relembra-quando-renunciou-da-presidencia-do-goias/: El balance del cierre 2010 (firmado 29-04-2011) y el del cierre 2011 (firmado 26-04-2012) los firma "HAILÉ SELASSIÉ DE GOIÁS PINHEIRO, Presidente do Conselho Deliberativo, no exercício da presidência executiva". Ninguna fuente fecha el inicio (tras la renuncia de Syd, 2010) ni el fin. hasta = 2012-05-01 es un tope derivado: en la firma del 26-04-2012 aún firmaba él.
SIN CONFIRMAR, no cargada: João Bosco Luz de Morais (2012-05-01 a 2014-01-01), https://pt.wikipedia.org/wiki/Hail%C3%A9_Pinheiro: Firma como "Presidente Executivo" los cierres 2012 y 2013 (archivos 2012-2011 y 2013-2012; el del 2013 con auditoría fechada 25-04-2014). Wikipedia pt (Hailé Pinheiro): "diez años después de 2003, bajo el mando de João Bosco Luz" el estadio se reformó para la Copa de las Confederaciones (2013). Ninguna fuente fecha su asunción ni su salida. desde = 2012-05-01 es un tope derivado de la firma de Hailé del 26-04-2012; hasta = 2014-01-01 por la convención de Rassi (aclamado en 2014). No publicar sin confirmar.
SIN CONFIRMAR, no cargada: Marcelo Gonçalves Almeida (2017-08-26 a 2021-01-01), https://www.goiasec.com.br/acervo/marcelo-almeida-e-o-novo-presidente-executivo-do-goias/: (Tanda anterior) Vice, asumió la presidencia ejecutiva tras la renuncia de Rassi; la nota del club (hoy 404) habla de "sábado 26" sin año: inferido 26-08-2017. Ocupó hasta 2021.
SIN CONFIRMAR, no cargada: Aroldo Guidão Filho (2023-12-18 a 2026-10-06), https://opopular.com.br/esporte/goias-aprova-mudanca-de-estatuto-e-aroldo-guid-o-assume-presidencia-ate-o-fim-do-ano-1.3445117: (Tanda anterior) Presidente del Conselho de Administração desde 2023-12-18 (posse prevista; fuente O Popular da 403); desde ago-2026 la reforma de estatuto restableció la presidencia ejecutiva; renunció el 06-10-2026.
SIN CONFIRMAR, no cargada: Munir Calixto Júnior (2026-10-06 a hoy), https://maisgoias.com.br/esportes/apos-renuncia-guidao-goias-descarta-eleicoes-imediatas-define-novo-presidente: (Tanda anterior) Vice jurídico, asume interino hasta la elección de diciembre de 2026.
Duda: Cierres 2010-2013 (pedido): lo que hay sale de las firmas de los balances, no de fuentes externas. 2010 y 2011: Hailé Pinheiro firma como presidente del Conselho Deliberativo "en el ejercicio de la presidencia ejecutiva" (no es un presidente ejecutivo electo); 2012 y 2013: João Bosco Luz de Morais. No se encontró la fecha de ninguna asunción ni salida entre agosto de 2010 y 2014; el cierre 2012 podría ser todavía de Hailé (la firma de abril de 2013 no prueba quién conducía al 31-12-2012).
Duda: Goulart (2008) y Syd (2009): confirmados como presidentes ejecutivos por las firmas de sus balances (cierres 2008 y 2009) y por Diário do Nordeste (Syd, bienio 2009/2010); sus fechas de inicio y fin siguen sin fuente que las fije.
Duda: Cierre 2017: Rassi renunció el 25-08-2017; el balance 2017 puede haberlo firmado Almeida (el pipeline decide si usa firmo).
Duda: Cierre 2023: Paulo Rogério presidió casi todo el año; Guidão asume el 18-12-2023; revisar firmo=[2023].
Duda: Hailé Pinheiro, presidente del Conselho Deliberativo durante todo el período, murió el 07-09-2022.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-14-2/resultado-5.json, tools/gestiones-tanda.mjs, 2026-10-15):_

```text
Pedro Ferreira Goulart (2007-01-01 a 2009-01-01): Presidente hasta fin de 2008: la nota de prensa del 2008-12-18 lo nombra como el antecesor de Syd, elegido para el bienio 2009/2010 (asume 2009). El desde 2007-01-01 NO sale de esa fuente: viene de un blog de opinión (cleubercarlos.blogspot.com, 2014) que dice que encabezó la chapa a fines de 2006 y que 2007 fue su primer año; se usó día/mes 01 (solo año). hasta 2009-01-01 = año de la fuente, día 01. El balance 2008 lo firma 'Pedro Ferreira Goulart, Presidente Executivo' (Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md:407-408).
Syd de Oliveira Reis (2009-01-01 a 2010-12-31): Elegido el 2008-12-18 (355 de 547 votos) para el bienio 2009/2010; asume en 2009 (solo año en la fuente: se usó 2009-01-01). El balance 2009 lo firma 'Syd de Oliveira Reis, Presidente Executivo' (demonstracoes-contabeis-2009-2008.md:378-380). hasta 2010-12-31 es el fin del bienio, NO una salida confirmada: en agosto de 2010 el Conselho le pidió que renunciara y él se negó (O Popular, 2010-08-19) y el balance 2010 ya lo firma Hailé Pinheiro 'no exercício da presidência executiva' (demonstracoes-contabeis-2010-2009.md:1156-1159). Solo se usa para cubrir 2009-12-31.
Aroldo Guidão Filho (2023-12-18 a 2026-10-06): Aclamado presidente del Conselho de Administração el 2023-12-15 con posse el lunes 2023-12-18 (misma fuente, que además presenta al CEO Luciano Paciello). En 2026-08-14 una reforma de estatuto vuelve a la presidencia ejecutiva y él la asume sin cambiar de persona; renunció el 2026-10-06 (O Popular / A Redação; esa fecha no está en la URL de la fuente, que cubre el desde). El balance 2024 lo firma como 'Diretor Institucional Estatutário' (demonstracoes-contabeis-2024.md:1173-1175; mismo firmante en balanco-publicado-2024-2023.md:729). AVISO sobre 2023: el balance al 2023-12-31 lo firma Paulo Rogério de Carvalho Pinheiro como 'Presidente Executivo' con firma digital del 2024-04-30 (demonstracoes-contabeis-2023.md:1232-1233), cuando Guidão ya había asumido el Conselho el 2023-12-18; la gestión cambió entre el cierre y la aprobación, y la firma de Paulo Rogério no queda explicada. En 2025 el .md es un OCR ilegible en la firma.
Duda: 2010-12-31, 2011-12-31 y 2012-12-31 sin cubrir: los balances los firman Hailé Pinheiro 'no exercício da presidência executiva' (2010 y 2011, abril de 2011 y 2012) y João Bosco Luz de Morais como Presidente Executivo (2012 y 2013, abril de 2013 y 2014), pero no se encontró ninguna fuente web con fechas de asunción/salida de Hailé (¿interino desde agosto-septiembre de 2010 tras el conflicto con Syd?) ni de João Bosco Luz (varias búsquedas sin resultado). Falta la fecha de salida real de Syd.
Duda: 2013-12-31 sin cubrir: el balance 2013 lo firma João Bosco Luz (2014-04-25) pero la prensa dice que Sérgio Rassi (balance 2014: Presidente Executivo) lo sustituyó 'en 2014', sin día. No se sabe si Bosco Luz estaba en el cargo al 2013-12-31.
Duda: 2017-12-31 sin cubrir: Marcelo Gonçalves de Almeida firma el balance 2017 (demonstracoes-contabeis-2017-2016.md:1167-1169, 'Goiânia, 31 de dezembro de 2017') y Esmeraldino/Sagres dicen que reemplazó a Sérgio Rassi, que renunció en agosto de 2017, pero ninguna fuente da el día en que asumió. Candidato: Marcelo Almeida, desde ~2017-08 hasta 2020-12 (Paulo Rogério fue aclamado para el trienio 2021-2023; elección el 2020-12-30 según Sagres Online). No se cargó como gestión porque no hay fecha de asunción.
Duda: Aroldo Guidão: tras su renuncia del 2026-10-06 asume Munir Calixto Júnior (vicepresidente jurídico) hasta la elección de diciembre de 2026; no se cargó (fuentes que no abrí: maisgoias 403).
Duda: Verificar con Guido si en 2023 se quiere mostrar a Guidão (presidente del Conselho, desde 2023-12-18) aun cuando el balance 2023 lo firmó Paulo Rogério Pinheiro como Presidente Executivo.
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### goias-br-demonstracoes-contabeis-2021

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2022-fgf-go

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2025

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2017-2016

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2017-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2008-2007

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2009-2008

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2010-2009

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2011-2010

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2012-2011

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2012-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2013-2012

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2015-2014

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2015-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2014-2013

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### goias-br-demonstracoes-contabeis-2016-2015

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2016-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
