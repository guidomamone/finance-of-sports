# gremio — evidencia de carga

Lo que había como comentario en `data/br/gremio-br-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/br/gremio-br-data.js — Grêmio Foot-Ball Porto Alegrense (Porto Alegre, RS, Brasil).
NO es SAF (sigue como associação/clube social tradicional, sin desmembrar el fútbol profissional
en una Sociedade Anônima do Futebol) — ver Admin/sourcing/Brasil/Gremio.md. 1 ejercicio cargado: 2024
(ejercicio social = ANO CALENDÁRIO completo, 1°/1/2024 a 31/12/2024, a diferencia de los clubes
argentinos ya cargados en el sitio, que cierran a mitad de año — ver clubs.js,
fiscalYearStart:'01-01', y el comentario de `isCalendarYearClub()` en js/finanzas-calc.js, que
generaliza `ejercicioLabel()`/el dropdown "Año"/los gráficos de Inicio para mostrar "2024" en vez
del rango de temporada "2023/2024" que se usaría para un club argentino).

Fuente: "Demonstrações contábeis dos exercícios findos em 31 de dezembro de 2024 e de 2023",
auditadas por Baker Tilly Brasil RS Auditores Independentes (opinião sem ressalvas, ver relatório
pág. 1-5 del PDF), firmado marzo de 2025. PDF con texto nativo (no escaneado), transcripción
completa en Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.md (vía pdftotext -layout).
Solo se cargó el ejercicio 2024 (columna "año corriente" del propio documento) — la columna
comparativa "2023 (Reapresentado)" del mismo PDF NO se cargó como un ejercicio propio (ver
club-data-mapping SKILL.md sección 6.5: la columna comparativa de un balance posterior puede estar
reexpresada/reclasificada distinto de como se hubiera presentado en su propio ejercicio — acá
además "Reapresentado" señala explícitamente una reclasificación real: la negociação de atletas se
movió en 2024 de "Custo Operacional" a "Outras receitas/despesas operacionais" por un cambio de
norma contable (NBC ITG 2003 R2), así que 2023 tal como aparece en ESTE documento no es comparable
1:1 con un eventual balance 2023 propio).

ESCALA: el documento expresa todos sus valores "em milhares de reais" (miles de reales). Acá se
guardan en MILLONES de BRL nativos (mismo criterio de escala que usan los clubes argentinos en
ARS millones) — cada valor impreso (con "." como separador de miles a la brasileña, ej. "403.081"
= cuatrocientos tres mil ochenta y uno) se dividió por 1.000 para pasar de miles a millones. La
fuerte coincidencia de que un número grande como "403.081" leído tal cual como decimal YA da el
valor correcto en millones es eso, una coincidencia de esta magnitud de cifras — los montos chicos
SIN separador de miles en el documento (ej. "11", "157", "934") NO se cargaron literales, se
dividieron por 1.000 igual (0.011 / 0.157 / 0.934), mismo criterio aplicado sin excepción a cada
línea.

Categorización (Nota 22 "Receita Operacional Líquida" + Nota 25 "Outras Receitas/Despesas
Operacionais", que en conjunto arman TODO el revenue; Notas 23 "Custos das Operações" + 24
"Despesas Gerais e Administrativas" + los ítems negativos de Nota 25, que arman TODO expense):
- 'Receitas Patrimoniais' -> member_dues: el documento no desglosa qué compone esta línea (2da
  más grande de Ingresos), pero "patrimonial" en el vocabulario de clubes brasileños se refiere
  típicamente a mensalidades de sócio patrimonial (categoría de socio con derecho a butaca/palco
  fijo) — es la lectura más fiel disponible sin un desglose propio, documentada acá como supuesto,
  no como un dato confirmado línea por línea.
  CONFIRMADO Y CERRADO (decisión de Guido, 2026-10-05; una auditoría no lo reabre): es el ingreso del cuadro social. Evidencia en
  demonstracoes-contabeis-2023-2024.md: la política de reconocimiento (L863) lista "as mensalidades de Associados" y la nota 22 no
  tiene otra línea donde puedan estar; la nota 29 (L1953) registra el trabajo voluntario "nas Receitas Patrimoniais por se tratar de
  doação de trabalho de associados"; contrapartidas: "Ingressos a Sócios" en costos (L1816) y "Mensalidades do Quadro Social
  antecipadas" en el pasivo (L1436). Incluye 2,16 M por año de trabajo voluntario valorizado (no es caja): se deja adentro, como
  lo registra el club.
- 'Receitas de Luvas Contratuais' -> other_income: "luvas" son un bonus/prima contractual (Nota 18:
  deferred revenue de un contrato de 2019, amortizado hasta 2024), no necesariamente comercial ni
  de estadio — se dejó en el catch-all en vez de forzarlo a sponsorship_commercial sin certeza.
- 'Receitas de Royalties' -> other_income: licenciamento/franquias (ver Nota "m", reconocimiento de
  ingresos), no hay categoría de licensing propia en category-map.js.
- 'Vendas Grêmio Mania' (tienda del club) -> sponsorship_commercial (la categoría ya incluye
  "merchandising" en su comentario de category-map.js), neta de devoluciones e impuestos sobre
  ventas (mismos 3 números que imprime la Nota 22-d, con `items` para no perder el desglose).
- 'Venda de Atletas' (Nota 25, ex-Nota 22 hasta el cambio de norma de 2024) -> player_sales.
- 'Mecanismo de Solidariedade' (Nota 25-b: FIFA training compensation por jugadores formados en el
  club que se transfieren después) -> player_sales (to-do 43: unificado con Argentinos/Boca/
  Envigado/Independiente/Once Caldas/Rosario Central/San Lorenzo, mismo concepto económico).
- 'Valor justo (cessão de crédito Arena Porto-Alegrense)' -> other_income: ganancia NO recurrente
  de único ejercicio por la adquisición a descuento de un crédito judicial contra la operadora del
  estadio (Nota 6-e, detalle completo ahí) — no hay categoría "exceptional_items" del lado ingreso
  en category-map.js, other_income es el catch-all correcto para un ítem no operativo.
- 'Negociação de atletas' (Nota 25, NEGATIVO — comisiones/costos de intermediación, distinto de la
  ganancia de 'Venda de Atletas') -> other_expenses, mismo criterio que Racing (ver
  club-data-mapping/referencia/formato-simplificado.md, bloque "CASO CONSULTADO": "Pago de gastos por compraventa de jugadores" se dejó en
  other_expenses, no en player_amortisation, porque esa categoría en Boca es solo
  amortización/deterioro contable, no comisiones).
- 'Ingressos a Sócios' y 'CMV – Grêmio Mania' (dentro de Nota 23, Custo Operacional) ->
  admin_general_expense: costo de servicio a socios y costo de mercadería vendida de la tienda,
  ninguno de los dos es plantel/organización de partidos.
- Resto de Nota 23 (sueldos plantel, amortización de pases, viajes, gastos de federaciones/
  imágenes/premios/material deportivo) -> wages_squad / player_amortisation /
  match_organisation_expense según corresponda, mismo criterio que el resto del sitio.
- Nota 24 completa (Despesas Gerais e Administrativas) -> admin_general_expense, salvo
  Depreciação -> depreciation y el "Outras despesas" final de esa nota -> other_expenses (catch-all
  propio de esa nota, no administrativo específico).

Verificación (Nodo, hecha antes de cargar): revenueLines suma EXACTO 615.021 M BRL; expenseLines
suma EXACTO -510.536 M BRL; revenue+expenses = 104.485 M BRL = "SUPERÁVIT ANTES DO RESULTADO
FINANCEIRO" impreso (pág. 7 del PDF); + netInterest (-60.893, Resultado Financeiro neto, Nota 26)
= 43.592 M BRL = "SUPERÁVIT DO EXERCÍCIO" impreso, exacto. grossDebt = "Instituições financeiras"
circulante (38.801) + não circulante (60.835) = 99.636 M BRL (balanço patrimonial, pág. 6). cash =
"Caixa e equivalentes de caixa" = 11.145 M BRL (misma página).

FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 (venda) — cotización oficial del Banco Central do
Brasil investigada externamente (el documento de Grêmio no declara un tipo de cambio propio, el
club no reporta en USD en ningún anexo). Fuente: dadosabertos.bcb.gov.br / cobertura de prensa del
cierre de 2024 (dólar cerró el año en R$6,179-6,19 según la fuente, "maior alta desde 2020").

Gestión: el balance está firmado por Alberto Jeronimo Guerra Neto como Presidente (marzo de 2025),
pero esta sesión no confirmó fecha de inicio/fin de su mandato con la profundidad que exige
club-data-mapping SKILL.md sección 7 ("solo si estás seguro") — se cargó una gestión mínima que
cubre ÚNICAMENTE el año efectivamente confirmado por la firma del documento (2024), sin inventar
un rango de mandato más amplio.
============================================================================
```

_de data/clubs.js:_

```text
Primeros clubes de Brasil (sesión 2026-09-13): ejercicio social = año calendario
(fiscalYearStart:'01-01', no jul-jun/sep-ago como los clubes argentinos de arriba) — ver
isCalendarYearClub() en js/finanzas-calc.js, que generaliza el dropdown "Año"/"Estado de
resultados"/gráficos de Inicio para mostrar "2024" en vez de un rango de temporada "2023/2024"
que sería falso para este club.
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Brasil/Gremio/wf-2024-2025-1774995c.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Brasil/Gremio/wf-2024-2025-1774995c.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Campeonato Brasileiro | pág. 29, Claude 0.88 |
| 2 | Campeonato Gaúcho | pág. 29, Claude 0.88 |
| 3 | Copa do Brasil | pág. 29, Claude 0.88 |
| 4 | Copa Libertadores/Sul Americana | pág. 29, Claude 0.88 |
| 5 | Campeonato Brasileiro Feminino | pág. 29, precedente |
| 6 | Receitas Patrimoniais | pág. 28, precedente |
| 7 | Receitas Publicitárias | pág. 28, precedente |
| 8 | Receitas de Luvas Contratuais | pág. 28, precedente |
| 9 | Receitas de Jogos (c) | pág. 28, precedente |
| 10 | Receitas de Royalties | pág. 28, precedente |
| 11 | Premiações de Competições | pág. 28, Jev 1 |
| 12 | Locações (c) | pág. 28, Claude 0.8 |
| 13 | Arrecadação Quadro Social | pág. 28, Jev 1 |
| 14 | Vendas Grêmio Mania (b) | pág. 28, Jev 0.99 |
| 15 | (-) Devoluções de vendas (b) | pág. 28, precedente |
| 16 | (-) Impostos sobre vendas (b) | pág. 28, Jev 0.97 |
| 17 | Outras Receitas do Desporto | pág. 28, Jev 0.98 |
| 18 | Doações operação Arena | pág. 8, precedente |
| 19 | Valor justo | pág. 8, Jev 1 |
| 20 | Doações | pág. 30, precedente |
| 21 | Venda de Atletas (b) | pág. 30, precedente |
| 22 | Reversão despesas renegociação comissões e outras | pág. 30, Jev 1 |
| 23 | Recuperação despesas Bancárias | pág. 30, Jev 1 |
| 24 | Recuperação despesas correio – Loja | pág. 30, Jev 0.92 |
| 25 | Ressarcimento despesas categoria de Base e Feminino | pág. 30, precedente |
| 26 | Reembolso de despesas diversas | pág. 30, Jev 1 |
| 27 | Mecanismo de Solidariedade (c) | pág. 30, precedente |
| 28 | Festejos e Aniversários | pág. 30, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Custo Baixa Direitos Econômicos | pág. 30, Jev 0.96 |
| 2 | Salários, benefícios encargos sociais | pág. 29, Claude 0.88 |
| 3 | Despesas Federações, Imagens, Prémios, Mat. Esportivo e outras | pág. 29, Jev 0.96 |
| 4 | Amortização de Direitos sobre Atletas Profissionais | pág. 29, precedente |
| 5 | Serviços de terceiro | pág. 29, precedente |
| 6 | Despesas de Viagens | pág. 29, precedente |
| 7 | Negociação de atletas | pág. 29, precedente |
| 8 | CMV – Grêmio Mania | pág. 29, precedente |
| 9 | Ingressos a Sócios | pág. 29, precedente |
| 10 | Salários, benefícios e Encargos Sociais - Demais Administrativas | pág. 29, precedente |
| 11 | Serviços de Terceiros | pág. 29, precedente |
| 12 | Contingências Judiciais | pág. 29, precedente |
| 13 | Aluguéis, Seguros, Materiais de Consumo e de Expediente | pág. 29, precedente |
| 14 | Depreciação/Amortização Ativos Imobilizados e intangíveis | pág. 29, Jev 0.99 |
| 15 | Água, Luz, Telefonia, Manutenção, Transportes e outras | pág. 29, precedente |
| 16 | Publicitárias | pág. 29, Jev 1 |
| 17 | Provisão Créditos Liquidação Duvidosa | pág. 29, Jev 0.95 |
| 18 | Outras despesas | pág. 29, precedente |
| 19 | Tributos e Contribuições Federais | pág. 29, precedente |
| 20 | Impairment direito de superfície | pág. 8, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): br-serieA, verificado contra roster cacheado de "2025 Campeonato Brasileiro Série A" (tools/club-league-reference/br.json), coincidencia exacta "Grêmio".
```

## 2024

### Meta

```text
grossDebt = "Instituições financeiras" circulante (38.801) + não circulante (60.835), balanço
patrimonial pág. 6. cash = "Caixa e equivalentes de caixa" (misma página).
netInterest = Resultado Financeiro neto (Nota 26): Receitas financeiras 10.598 - Despesas
financeiras 71.491.
officialTotalRevenue/officialTotalExpenses = suma de revenueLines/expenseLines de arriba
(615.021 / 510.536 M BRL) — el documento no imprime un único "Total Revenue"/"Total Expenses"
en una sola línea (la DRE está armada en bloques: Receita Operacional Líquida, Custo
Operacional, Despesas G&A, Outras receitas/despesas operacionais, Resultado financeiro), así
que estos 2 campos son la suma verificada de todas las líneas cargadas, no un número copiado
directo de una sola fila. officialPAT = "SUPERÁVIT DO EXERCÍCIO" impreso, pág. 7.
```

## Gestiones

_antes de Alberto Jerônimo Guerra Neto (data/gestiones/br.js):_

```text
Electo en noviembre de 2022; la fuente dice "desde enero de 2023", dia 01/01/2023 aproximado. Roman asume el 01/01/2026.
```

## Fuentes

### gremio-br-demonstracoes-2023-2024

_note (data/):_

```text
PDF oficial (42 páginas, texto nativo), auditado por Baker Tilly Brasil RS Auditores Independentes (opinião sem ressalvas), firmado marzo de 2025, descargado directo de gremio.net/documentos/. Transcripción completa en Clubes/Brasil/Gremio/demonstracoes-contabeis-2023-2024.md. Solo se cargó el ejercicio 2024 (la columna 2023 del mismo documento está "Reapresentada" tras un cambio de norma contable, no comparable 1:1 con un balance 2023 propio). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), investigado externamente — el documento no declara tipo de cambio propio.
```

### gremio-br-wf-2024-2025-1774995c

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Brasil/Gremio/wf-2024-2025-1774995c.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### Presupuesto al lado del balance (gremioPresupuestoOverlayByYear), en general

```text
Sin overlay de presupuesto (Grêmio no publicó un presupuesto para el mismo ejercicio en esta
sesión) — mismo patrón vacío que riverPresupuestoOverlayByYear.
```

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-ar-data.js, Versión 95).
```

### gestionesByClub.gremio

```text
Firmante del balance (marzo de 2025) como Presidente — no se confirmó con profundidad el
rango completo de su mandato en esta sesión, ver comentario de cabecera. Cubre únicamente el
año cargado.
```

### memberCountByClub.gremio

```text
no se encontró una cifra confiable en esta sesión
```
