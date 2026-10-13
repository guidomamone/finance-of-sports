# botafogo — evidencia de carga

Lo que había como comentario en `data/botafogo-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/botafogo-data.js — Botafogo Sociedade Anônima do Futebol (SAF), Rio de Janeiro, Brasil.
El club tiene DOS entidades reales: la SAF (Botafogo Futebol S.A., el negocio de fútbol
profesional, convertida en 2022) y a associação "Botafogo de Futebol e Regatas" (club social sin
fines de lucro, entidad separada). Se cargó la SAF (ver Admin/sourcing/Brasil/_notas-generales.md y
Botafogo.md: "la SAF sigue siendo la entidad principal a cargar" — es el negocio de fútbol). 3
ejercicios cargados: 2023, 2024, 2025 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a
31/12/<año> — ver clubs.js, fiscalYearStart:'01-01', mismo criterio que Grêmio/isCalendarYearClub()).

Fuente 2024: "Demonstrações Financeiras" da SAF Botafogo, exercícios findos em 31/12/2024 e 2023,
descargado de botafogo.com/download/transparencia/balanco (portal oficial de transparencia del
club). PDF con texto nativo, transcripción completa en
Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md.

Fuente 2023: mismo portal, "Demonstrações Financeiras" exercícios findos em 31/12/2023 e 2022,
transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2023.md. LA
TRANSCRIPCIÓN OCR DE ESTE DOCUMENTO TENÍA VARIOS DÍGITOS TRANSPUESTOS/DE MÁS** que no reconciliaban
contra los subtotales impresos (ej. "Custo de campeonato" transcripto como 392.647 cuando el total
de la nota exige 32.647; "Locação de camarotes" transcripto como 8.520 cuando el total de la nota
exige 8.320; "Receita operacional bruta" del resumen de la pág. 25 transcripta como 588.083 cuando
la Nota 16 detallada —y el total de su propia segregación por naturaleza— dan 388.083). Se
re-renderizaron a 300dpi y se releyeron visualmente con el Read tool las páginas 25, 44, 49, 52, 55,
56, 57 y 58 del PDF (Notas 16, 10, 17, 18, 19, 20, 21) para confirmar cada cifra usada acá contra
la imagen real antes de cargar — ningún valor de este ejercicio sale del .md sin haber sido
re-verificado contra el PDF. Recomendado (fuera de alcance de esta sesión): reemplazar esas páginas
en el .md con una nueva transcripción.

Fuente 2025: mismo portal, "Demonstrações Financeiras" exercícios findos em 31/12/2025 e 2024
(Reapresentado), transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md.
El documento reexpresa ("Reapresentado") el ejercicio 2024 comparativo con un "Prejuízo do
exercício" de R$266.817 mil, DISTINTO de los R$299.983 mil que el propio balance de 2024 (el
documento cargado como `botafogoFiscalYearMeta[2024]`, ya cargado antes de esta sesión) reportó
como su propio resultado del ejercicio. La reexpresión (ver Nota de conciliación en el .md,
diferencia exacta de R$33.167 mil) no se aplicó retroactivamente al ejercicio 2024 ya cargado en
este archivo — esta sesión solo agrega 2023 y 2025 con sus propias cifras tal cual las reporta cada
documento, sin tocar 2024 (fuera de alcance, archivo compartido con otros agentes en paralelo). La
diferencia entre el 2024 "original" (cargado) y el 2024 "reapresentado" (mencionado solo en el
documento de 2025, no cargado) queda como nota para una sesión futura — ver
`Admin/dudas-por-club.md`.

Se usó la columna CONTROLADORA (la SAF standalone) en TODAS las líneas, no la columna Consolidado
(que suma una subsidiaria menor) — mismo criterio en todo el ejercicio, para no mezclar 2
perímetros de consolidación distintos en el mismo set de datos. Escala: valores originales "em
milhares de reais" (miles de reales), acá en MILLONES de BRL nativos (dividir por 1.000, mismo
criterio que Grêmio).

ESTRUCTURA REAL DEL DOCUMENTO (importante para no duplicar plata al leer el código de abajo): la
DRE tiene DOS bloques de revenue/expense separados, no uno solo:
1) "Receita Operacional" (607.322) − "Deduções sobre a receita" (55.051) = "Receita Operacional,
   líquida" (552.271), con el detalle línea por línea en la Nota 20 ("Segregação das receitas por
   natureza"). Este bloque NO incluye venta de jugadores.
2) MÁS ABAJO en la misma DRE, un bloque SEPARADO "Resultado com transações de direitos de
   atletas" (Nota 24): "Receitas transações de direitos de atletas" (96.356, venta definitiva de
   jugadores) y "Gastos na transação de direitos de atletas" (-45.832, que la Nota 24 desglosa en
   3: mecanismo de solidaridad pagado, baja de intangibles, gastos de intermediación).
La línea "Outras receitas e despesas operacionais (142.762)" que aparece ENTRE estos 2 bloques en
la DRE impresa es un SUBTOTAL corrido (Resultado Operacional Antes da Alienação de Ativos +
Receitas transações + Gastos transações = -193.286+96.356-45.832 = -142.762 exacto), NO una línea
de gasto adicional — no se cargó como línea propia para no duplicar todo lo de arriba.

Categorización:
- 'Camisa 7' (Nota 20.5, título real de la nota: "Sócio torcedor (Camisa 7)") -> member_dues: es el
  programa de socios-hinchas del club (superó 80 mil socios activos en 2024 según la nota), NO un
  sponsor de camiseta como sugiere el nombre a primera vista — se confirmó leyendo el texto
  completo de la nota antes de categorizar.
- 'Premiação'/'Participação em competições' -> competition_bonus; 'Bilheteria' -> matchday_competition;
  'Operação em estádio' (concesiones/operación del estadio Nilton Santos) -> matchday_competition,
  mismo criterio que "Estadio" de River.
- 'Venda de mercadorias'/'Licenciamento'/'Patrocínios'/'Publicidade em placas'/'Mídias digitais' ->
  sponsorship_commercial (categoría que ya incluye merchandising).
- 'Cessão temporária' (préstamos de jugadores) -> player_sales; 'Mecanismo de Solidariedade'
  (recibido, Nota 20.6) -> player_sales (to-do 43: unificado con Argentinos/Boca/Envigado/
  Independiente/Once Caldas/Rosario Central/San Lorenzo, mismo concepto económico — derechos de
  formación/mecanismo de solidaridad por venta de jugadores formados en el club).
- 'Cessão definitiva de atletas' (Nota 24.1, venta de jugadores) -> player_sales.
- 'Deduções sobre a receita' (impuestos específicos del fútbol + direito de arena + otras, Nota 20)
  -> other_income (línea negativa, contra-revenue, no atribuible a una sola categoría de arriba).
- Costo de servicios (Nota 21): 'Salários, encargos e benefícios' -> wages_squad; 'Amortização de
  atletas' -> player_amortisation; 'Direito de imagem' (pagos por derechos de imagen, estructura
  habitual de compensación a jugadores en Brasil) -> wages_squad; 'Custo de campeonato'/'Custo de
  logística' -> match_organisation_expense; 'Custo venda de mercadoria'/'Materiais' ->
  admin_general_expense; 'Custo de transação de atletas'/'Outros custos' -> other_expenses.
- Despesas G&A (Nota 22): TODAS admin_general_expense salvo 'Depreciação e amortização' ->
  depreciation y 'Diversos' (catch-all de la propia nota) -> other_expenses — se respeta que el
  documento ya decidió agrupar estas líneas como administrativas (incl. 'Viagens e estadas'/'Gastos
  com atletas' de ESTA nota puntual, distintos de 'Custo de logística' de la Nota 21).
- 'Outras despesas operacionais' (línea suelta de la DRE, 623) -> other_expenses.
- 'Resultado de equivalência patrimonial' (-6.509, resultado de una inversión por equivalencia
  patrimonial, un ítem no operativo/no recurrente) -> exceptional_items.
- 'Outras receitas operacionais' (Nota 23: recuperación de gastos, valores CONMEBOL devueltos, etc.,
  16.056) -> other_income.
- Nota 24 (transacción de jugadores): 'Mecanismo de solidariedade' (pagado) -> other_expenses
  (mismo criterio que Racing/Grêmio: comisiones/pagos de intermediación NO van a
  player_amortisation, que es solo el cargo contable de amortización/deterioro); 'Baixa de atletas'
  (baja del activo intangible del jugador transferido, un cargo contable real de derecognición) ->
  player_amortisation; 'Despesa na cessão de atletas' (comisiones, honorarios legales) ->
  other_expenses.

Verificación (Node, antes de cargar): revenueLines suma EXACTO 664.683 M BRL (coincide, como
chequeo cruzado independiente, con la línea "Receita" de R$664.683 mil del Relatório de Gestão/
EBITDA Ajustado no auditado, pág. 10 del PDF); expenseLines suma EXACTO -807.445 M BRL;
revenue+expenses = -142.762 M BRL = "Outras receitas e despesas operacionais" (el subtotal
corrido); + netInterest (-157.221, Nota 25, Resultado financeiro líquido Controladora) =
-299.983 M BRL = "Prejuízo do exercício" impreso, exacto (2024 fue un año de DÉFICIT real para la
SAF, a pesar del título de Libertadores + Brasileirão de ese año — el propio balance lo explica por
variación cambial y costos financieros de deuda en dólares, Nota 25).

grossDebt = "Empréstimos e financiamentos" circulante, Controladora (48.112 — no hay porción no
corriente de esta línea en este balance). cash = "Caixa e equivalentes de caixa" Controladora
(128.951).

FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 (venda), mismo tipo de cambio investigado
externamente que Grêmio (mismo cierre de ejercicio) — el documento no declara un tipo de cambio
propio.

Gestión: no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
preside la SAF Botafogo (distinto del presidente de la associação) — gestionId queda null, sin
entrada en gestionesByClub, mismo criterio que Racing 2009-2011 (mejor sin gestión asignada que
una inventada). Como gestionesByClub[clubId] tiene que existir igual (lo lee
populateFinanzasSelectors sin chequeo), se declara con una gestión genérica "Sin gestión
confirmada" que cubre los 3 años cargados (2023-2025).
---------------------------------------------------------------------------
EJERCICIO 2023 — estructura y categorización:

La DRE de este ejercicio tiene un formato MÁS SIMPLE que 2024/2025 (un solo bloque de Custo/
Despesas, sin el bloque separado "Resultado com transações de direitos de atletas" que aparece
recién desde 2024): Receita Operacional líquida (16) - Custo das atividades (17) = Resultado Bruto;
- Despesas gerais e administrativas (18) - Outras despesas operacionais (19) + Outras receitas
operacionais (20) = Resultado operacional antes do financeiro; +/- Receitas/Despesas financeiras
(21) = Prejuízo do exercício. La venta de jugadores ("Cessão definitiva de atletas") vive DENTRO
del bloque de "Segregação das receitas" (Nota 16.8), no en un bloque aparte como en 2024/2025 — la
separación en bloque propio recién empieza a partir de 2024 (ver Nota 16.1 de este mismo documento:
"Conforme divulgado no ITG 2003 (R2), que deverá ser implementado a partir do exercício de 2024,
os valores provenientes da venda de ativos intangíveis... não devem mais ser classificados como
receita de venda... A partir de 2024, esses valores deverão ser classificados em conta de outras
receitas e despesas operacionais").

Categorización de "Segregação das receitas por natureza" (Nota 16, mismo criterio que 2024):
Televisionamento/Streaming -> broadcasting; Premiação/Participação em competições ->
competition_bonus; Bilheteria -> matchday_competition; Camisa 7 -> member_dues; Patrocínios/
Publicidade em placas/Mídias digitais/Licenciamento/Venda de mercadorias -> sponsorship_commercial;
Cessão definitiva de atletas/Cessão temporária -> player_sales; Mecanismo de solidariedade
(recebido) -> youth_football; Deduções sobre a receita -> other_income (línea negativa).
2 categorías NUEVAS para este club, ambas de la sección "Estadio" (Versión 189 de club-data-mapping,
no usadas en la carga original de 2024 porque esa sesión fue anterior a esa versión del skill):
"Locação de camarotes" -> season_tickets (mismo criterio que "palcos" de Boca, club-data-mapping
sección 1: pago por temporada completa, no por partido) y "Aluguel de estádio"/"Operação em
estádio - Eventos" -> stadium_other (el rótulo nombra el estadio explícitamente, criterio
conservador de la sección 1 del skill); "Operação de estádio - Futebol" (concesiones del día de
partido) sigue en matchday_competition, igual que 2024.

"Receita com a participação na LFU" (Nota 20.1, dentro de "Outras receitas operacionais"): venta
de un 20% de los derechos comerciales del Campeonato Brasileiro (contrato de 50 años, 2025-2074) a
inversores, ganancia neta de R$165.915 mil reconocida como "lucro na alienação de ativo intangível".
Es un ítem claramente no recurrente/no operativo (venta de un activo intangible, no ingreso de la
operación futbolística), pero el documento NO la muestra aparte del cuerpo principal, así que se
queda en revenueLines en vez de moverse a `assetSales` en fiscalYearMeta (ver club-data-mapping
sección 2 — "aparte" significa una línea separada del cuerpo principal de Recursos/Gastos, no un
mero desglose interno). CORREGIDO en la integración: se categorizó `exceptional_items`, pero esa
categoría es de la taxonomía de GASTOS (`EXPENSE_CATEGORIES`, data/category-map.js), no existe del
lado de Ingresos — `other_income` es el equivalente correcto para un ítem de ingreso no recurrente
sin categoría propia (detectado por `node tools/audit.js`, `categoria-cruzada`, P2). "Recuperação
de gastos"/"Valores pagos pelo BFR"/"Outras receitas operacionais" (el resto de la Nota 20) ->
other_income también.

Custo das atividades (Nota 17) y Despesas gerais e administrativas (Nota 18): mismo criterio línea
por línea que 2024 (Salários/Direito de imagem -> wages_squad; Amortização de atletas/Baixas de
intangíveis -> player_amortisation; Custo de campeonato -> match_organisation_expense; Custo de
transação de atletas/Outros -> other_expenses; Materiais/Custo venda de mercadoria ->
admin_general_expense; el resto de Despesas G&A -> admin_general_expense salvo Depreciação e
amortização -> depreciation y Diversos -> other_expenses).

Outras despesas operacionais (Nota 19: Parcelamentos tributários/previdenciários + Regime
Centralizado de Execuções + Demais gastos dívida BFR + Outros, R$64.117 mil): el propio documento
aclara que ESTA nota completa son "obrigações assumidas pela SAF Botafogo no âmbito do acordo de
acionistas estabelecido na constituição da SAF" — deuda LEGADO del club social (BFR) transferida a
la SAF al constituirse, no costo operativo corriente del fútbol. Se categorizó TODA la nota como
`other_expenses` (catch-all), en vez de forzarla a `admin_general_expense` (que implicaría "costo
administrativo corriente") — es una aproximación conservadora, no una certeza; queda como pregunta
abierta en `Admin/dudas-por-club.md` si conviene una categoría propia para pasivos legado
transferidos al momento de conversión a SAF (puede repetirse en otros clubes brasileños que hicieron
la misma transición asociação->SAF).

Verificación (a mano, contra los PDF re-renderizados — ver nota de cabecera sobre errores de OCR):
revenueLines suma EXACTO 537,286 M BRL (= Receita Operacional líquida 355,238 + Outras receitas
operacionais 182,048). expenseLines suma EXACTO 581,184 M BRL (= Custo das atividades 412,049 +
Despesas G&A 105,018 + Outras despesas operacionais 64,117). revenue(537,286) - expenses(581,184) =
-43,898 = "Resultado operacional antes do resultado financeiro" impreso, exacto. + netInterest
(-57,197, Nota 21, Receitas/Despesas financeiras líquidas) = -101,095 M BRL = "Prejuízo do
exercício" impreso, EXACTO.

grossDebt = "Empréstimos e financiamentos" circulante (358,871 — Não Circulante es $0 este
ejercicio, confirmado en Nota 10). cash = "Caixa e equivalentes de caixa" (16,057).

FX: BRL/USD PTAX de cierre 31/12/2023 = R$4,8413 (venda), YA EXISTÍA en FX_CLOSE
(data/currency-map.js, entrada 'BRL@2023-12-31') de una sesión anterior — el documento no declara
un tipo de cambio propio.
---------------------------------------------------------------------------
EJERCICIO 2025 — estructura y categorización:

Mismo formato de DRE que 2024 (2 bloques: cuerpo principal de Recursos/Gastos, y un bloque aparte
"Resultado com transações de direitos de atletas", Nota 24). Se usó la columna CONTROLADORA en
todas las líneas, mismo criterio que 2023/2024.

El documento reexpresa 2024 ("Reapresentado") con una diferencia de R$33.167 mil contra el 2024
"original" ya cargado en este archivo — ver nota de cabecera, no se tocó el ejercicio 2024 ya
cargado.

Categorización de "Segregação das receitas" (Nota 20, mismo criterio que 2023/2024, con 2 rubros
nuevos): "Camisa 6" (Nota 20.5, programa especial de aportes de hinchas para financiar el Centro de
Treinamento, distinto de "Camisa 7" que es el programa de socio-hincha regular) -> member_dues,
mismo criterio que Camisa 7 (la propia nota los agrupa bajo el mismo título "Sócio torcedor").
"Locações de Camarotes" -> season_tickets; "Locações do estádio Nilton Santos" -> stadium_other
(nombra el estadio explícitamente); "Operação de estádio" (sin desglosar Futebol/Eventos este año,
a diferencia de 2023) -> matchday_competition, mismo criterio que 2024. "Permuta"/"Projetos
incentivados"/"Bonificação de produtos"/"Outras" (Nota 20.6) -> other_income.

Custo de serviços prestados (Nota 21) y Despesas gerais e administrativas (Nota 22): mismo
criterio línea por línea que 2023/2024 (ver arriba). "Baixas de intangíveis" (línea nueva este
ejercicio en el Custo de serviços, no solo en la Nota 24) -> player_amortisation, mismo criterio
que "Amortização de atletas".

Outras receitas operacionais (Nota 23): "Recuperação de gastos"/"Outras receitas operacionais" ->
other_income. "Resultado de equivalência patrimonial" (-6,544) -> exceptional_items, mismo criterio
que 2024.

Resultado com transações de direitos de atletas (Nota 24, bloque separado igual que 2024):
"Cessão definitiva de atletas" -> player_sales; "Mecanismo de solidariedade" (pago) -> other_expenses;
"Baixa de atletas" -> player_amortisation; "Despesa na cessão de atletas" -> other_expenses — mismo
criterio exacto que 2024.

Verificación: revenueLines suma EXACTO 1.359,803 M BRL (= Receita Operacional líquida 574,006 +
Outras receitas operacionais 52,436 + Cessão definitiva de atletas 733,361). expenseLines suma
EXACTO 1.349,351 M BRL (= Custo de serviços 675,254 + Despesas G&A 218,212 + Outras despesas
operacionais 0,498 + Resultado de equivalência patrimonial 6,544 + Mecanismo de solidariedade
18,787 + Baixa de atletas 333,055 + Despesa na cessão de atletas 97,001).
revenue(1.359,803) - expenses(1.349,351) = 10,452 = "Outras receitas e despesas operacionais"
(subtotal corrido impreso), exacto. + netInterest (-301,350, Nota 25, Controladora) = -290,898 M
BRL = "Prejuízo do exercício" impreso, EXACTO. officialTotalExpenses (para el check de
verifyTieOuts, que excluye exceptional_items del mismo modo que 2024) = 1.349,351 - 6,544 =
1.342,807.

grossDebt = "Empréstimos e financiamentos" circulante (88,324) + não circulante (50,648) =
138,972 (a diferencia de 2023/2024, este año SÍ hay porción no corriente). cash = "Caixa e
equivalentes de caixa" (25,557).

FX: BRL/USD PTAX de cierre 31/12/2025 = R$5,5024 (venda), YA EXISTÍA en FX_CLOSE
(data/currency-map.js, entrada 'BRL@2025-12-31') de una sesión anterior — el documento no declara
un tipo de cambio propio.
---------------------------------------------------------------------------
============================================================================
```

_de data/club-leagues/br.js:_

```text
2023 y 2025 (2da tanda, misma sesión, "20 más"): 5° y 6° respectivamente, Série A completa
los 2 años, sin descenso (confirmado vía Wikipedia).
```

_de data/club-leagues/br.js:_

```text
campeón 2024
```

## 2025

### Ingresos

```text
Ejercicio 2025. Fuente: demonstracoes-financeiras-2025.md, Nota 20 ("Segregação das receitas por
natureza", pág. 67-68 del PDF) + Nota 23 ("Outras receitas operacionais") + Nota 24 ("Resultado
com transações de direitos de atletas") — columna Controladora.
```

### Gastos

```text
Ejercicio 2025. Fuente: demonstracoes-financeiras-2025.md, Nota 21 ("Custo de serviços
prestados"), Nota 22 ("Despesas gerais e administrativas"), Nota 23 ("Outras receitas
operacionais" — la línea de equivalência patrimonial vive en el cuerpo de la DRE, no en la Nota
23) y Nota 24 ("Resultado com transações de direitos de atletas") — columna Controladora.
```

### Meta

```text
grossDebt = "Empréstimos e financiamentos" circulante (88.324) + não circulante (50.648) — a
diferencia de 2023/2024, este ejercicio SÍ tiene porción no corriente. cash = "Caixa e
equivalentes de caixa" (25.557). Ambos, columna Controladora.
netInterest = "Receitas (despesas) financeiras, líquidas" (Nota 25), columna Controladora.
officialTotalRevenue = suma verificada de revenueLines (1.359,803 M BRL = Receita Operacional
líquida 574,006 + Outras receitas operacionais 52,436 + Cessão definitiva de atletas 733,361).
officialTotalExpenses = suma de expenseLines EXCLUYENDO 'Resultado de equivalência patrimonial'
(-6,544, exceptional_items), mismo criterio que 2024: 1.349,351 - 6,544 = 1.342,807.
officialPAT = "Prejuízo do exercício" impreso (-290,898, incluye el ítem excepcional).
```

## 2024

### Meta

```text
grossDebt = "Empréstimos e financiamentos" circulante, Controladora (Nota 14) — no hay
porção não circulante de esta línea en este balance. cash = "Caixa e equivalentes de caixa"
Controladora (Nota 4).
netInterest = "Resultado financeiro líquido" (Nota 25), columna Controladora.
officialTotalRevenue = suma verificada de revenueLines (664.683 M BRL) — el documento no
imprime un único total en una sola fila (la DRE está en 2 bloques separados, ver comentario de
cabecera), pero 664.683 SÍ coincide, como chequeo cruzado independiente, con la línea "Receita"
del Relatório de Gestão no auditado (pág. 10 del PDF). officialTotalExpenses = 800.936 M BRL =
suma de expenseLines EXCLUYENDO 'Resultado de equivalência patrimonial' (-6.509,
exceptional_items) — mismo criterio que instituto-data.js: verifyTieOuts() compara "Expenses"
contra gasto ordinario + no-efectivo solamente, exceptional_items no participa de ese check
(sí de PAT, vía operatingProfit). officialPAT = "Prejuízo do exercício" impreso (negativo
real, sí incluye el ítem excepcional).
```

## 2023

### Ingresos

```text
Ejercicio 2023. Fuente: demonstracoes-financeiras-2023.md, Nota 16 ("Segregação das receitas por
natureza", pág. 49 del PDF, re-verificada contra la imagen — ver comentario de cabecera sobre
errores de OCR) + Nota 20 ("Outras receitas operacionais", pág. 57).
```

### Gastos

```text
Ejercicio 2023. Fuente: demonstracoes-financeiras-2023.md, Nota 17 ("Custo da atividade", pág. 55
del PDF, re-verificada contra la imagen), Nota 18 ("Despesas gerais e administrativas", pág. 55)
y Nota 19 ("Outras despesas operacionais", pág. 56).
```

### Meta

```text
grossDebt = "Empréstimos e financiamentos" circulante (Nota 10) — Não Circulante es $0 este
ejercicio (confirmado en la propia Nota 10). cash = "Caixa e equivalentes de caixa" (Nota 3).
netInterest = "Receitas (despesas) financeiras, líquidas" (Nota 21).
officialTotalRevenue = suma verificada de revenueLines (537.286 M BRL = Receita Operacional
líquida 355.238 + Outras receitas operacionais 182.048). officialTotalExpenses = suma completa
de expenseLines (581.184 M BRL) — este ejercicio no tiene ninguna línea exceptional_items, así
que no hace falta excluir nada (a diferencia de 2024/2025). officialPAT = "Prejuízo do
exercício" impreso (-101.095, negativo real, incluye el ítem excepcional de la venta LFU).
```

## Fuentes

### botafogo-demonstracoes-2023

_note (data/):_

```text
PDF oficial (texto nativo), descargado del portal de transparencia oficial del club. Se cargó la columna CONTROLADORA. Transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2023.md, cuya transcripción OCR tenía varios dígitos transpuestos/de más que no reconciliaban contra los subtotales impresos — los valores cargados fueron re-verificados contra las imágenes del PDF (páginas 25, 44, 49, 52, 55-58) antes de usarse, ver comentario de cabecera de botafogo-data.js. 2023 fue un ejercicio de DÉFICIT real (Prejuízo de R$101,095 mil), que incluye una ganancia no recurrente de R$165,915 mil por la venta de 20% de los derechos comerciales del Brasileirão a la Liga Forte União. Convertido a USD con el PTAX BCB de cierre 31/12/2023 (R$4,8413).
```

### botafogo-demonstracoes-2024

_note (data/):_

```text
PDF oficial (texto nativo), descargado del portal de transparencia oficial del club. Se cargó la columna CONTROLADORA (la SAF standalone), no la Consolidado (incluye una subsidiaria menor). Transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md. 2024 fue un ejercicio de DÉFICIT real (Prejuízo de R$299,983 mil), pese al título de Copa Libertadores y Campeonato Brasileiro de ese año — el propio balance lo atribuye a variación cambial y costos financieros de deuda en moneda extranjera (Nota 25). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), investigado externamente. El balance de 2025 (demonstracoes-financeiras-2025.pdf) reexpresa este mismo ejercicio con un Prejuízo distinto (R$266,817 mil, diferencia de R$33,167 mil) — ver comentario de cabecera de botafogo-data.js, no se tocó esta entrada. Existe también un balance de la associação (demonstracoes-financeiras-associacao-2023.pdf, entidad social separada, complementaria, no cargada).
```

### botafogo-demonstracoes-2025

_note (data/):_

```text
PDF oficial (texto nativo), descargado del portal de transparencia oficial del club. Se cargó la columna CONTROLADORA. Transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2025.md. 2025 fue un ejercicio de DÉFICIT real (Prejuízo de R$290,898 mil), con una porción no corriente de deuda financiera por primera vez desde que se carga este club (R$50,648 mil). El documento reexpresa 2024 con un Prejuízo de R$266,817 mil, distinto de los R$299,983 mil ya cargados como `botafogoFiscalYearMeta[2024]` (fuera de alcance de esta sesión, ver comentario de cabecera de botafogo-data.js). Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.botafogo

```text
No se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién preside
la SAF Botafogo (distinto del presidente de la associação social) — entrada mínima para que el
selector "Por gestión" no rompa, cubre los 3 años cargados.
```
