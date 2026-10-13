# pontepreta-br — evidencia de carga

Lo que había como comentario en `data/pontepreta-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/pontepreta-br-data.js — Associação Atlética Ponte Preta (Campinas, São Paulo, Brasil).
Sociedade civil sem fins lucrativos, NO es SAF. 3 ejercicios cargados: 2022, 2023 y 2024
(ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, confirmado en la carátula de los 3
documentos: "Balanços Patrimoniais em 31/12/<ano> e 31/12/<ano-1>"; clubs.js
fiscalYearStart:'01-01').

FUENTES (3 documentos, serie continua, todos del repositorio institucional de la Federação
Paulista de Futebol — ver fuentes/Brasil/Ponte Preta.md):
- `balanco-2021-2022.pdf` -> ejercicio 2022 (año corriente de ESE documento).
- `balanco-2022-2023.pdf` -> ejercicio 2023.
- `balanco-2023-2024.pdf` -> ejercicio 2024.
Auditados los 3 por Audcorp Auditoria e Assessoria S/S (CRC 25P023426/0-0), contadora Adriana
Vieira (CRC 1SP 221376/0-2). Opinião COM RESSALVA en los 3 (principalmente: avaliação de
atletas profissionais/da base sin metodología de mercado verificable con efecto en patrimônio
líquido, y parcelamentos de impuestos PROFUT/PERT/PERSE en atraso sin ajuste de multas/juros
reconocido). Transcripción completa en Clubes/Brasil/Ponte Preta/balanco-<años>.md.

ESCALA: los 3 documentos están "Valores Expressos em reais" (reales completos, NO en miles —
distinto de Guarani/Operário Ferroviário/Botafogo) — acá en MILLONES de BRL nativos (dividir
por 1.000.000, criterio de CLAUDE.md para documentos en reales completos).

¡OJO CON EL EJERCICIO CORRIENTE! (club-data-mapping SKILL.md sección 6.5): se usó SIEMPRE la
columna/documento "año corriente" propio de cada ejercicio (2022 -> balanco-2021-2022, 2023 ->
balanco-2022-2023, 2024 -> balanco-2023-2024), nunca la comparativa de un documento posterior.
Esto no fue solo precaución teórica: la fila "Receita Operacionais" del balanco-2023-2024 para
su columna comparativa "2023" (R$32.153.776) DIFIERE de la que imprime balanco-2022-2023 como
su propio año corriente 2023 (R$32.375.229) — la diferencia (R$221.453) es EXACTAMENTE el
"Resultado Financeiro Líquido" de 2023: el documento posterior neteó el resultado financiero
dentro de Ingresos en su columna comparativa, mientras el documento propio de 2023 lo muestra
separado. Se usó siempre el documento propio del año.

ESTRUCTURA DEL DOCUMENTO: la Demonstração do Superávit/(Déficit) se organiza por DEPARTAMENTO,
no por naturaleza de gasto pura: "Profissional", "Administrativo - Estadio", "Administrativo -
Jd Paineiras" (complejo/sede secundaria), "Administrativo - Jd Eulina" (ídem, solo gasto,
aparece desde 2021), "Amador" (fútbol amateur/base) y "Social / Outras" (solo ingreso). El
departamento "Profissional" SÍ se desglosa más fino en la Nota 18 ("Resultado do Departamento
Profissional") — ingresos por rubro real (TV, premios, sponsors, venta de jugadores) y gastos
en 4 líneas (Salários/Serviços de Terceiros/Despesas com Jogos/Demais Gastos), esta última con
su propio sub-desglose en la Nota 18.(a). Se usó ESE nivel de detalle para categorizar
Profissional; los demás departamentos (Estadio/Jd Paineiras/Jd Eulina/Amador/Social) se
cargaron como una línea por departamento, sin desglose adicional disponible en la fuente.

OCR: el documento es un recorte de publicación legal en 2 columnas (Demonstração do
Superávit/Déficit a la izquierda, Demonstração dos Fluxos de Caixa a la derecha, notas
explicativas también en 2 columnas más abajo) — la extracción de texto lineal mezcla ambas
columnas línea por línea. Varios "Totais" impresos al pie de una nota NO reconciliaban con la
suma de sus propios sub-ítems (ej. balanco-2023-2024, Nota 18.(a) 2024: sub-ítems suman
exacto R$15.215.627, pero el "Total Geral" impreso dice R$15.275.627 — un dígito transpuesto).
En cada uno de estos casos se usó la SUMA de los sub-ítems (que además reconcilia exacto contra
el nivel superior, el total de "Demais Gastos"/Profissional/Departamento), no el total impreso
aislado — mismo criterio que club-data-mapping/referencia/leer-pdf.md (fila acumulada / total que no
reconcilia: buscar la explicación en el propio documento antes de forzar el número impreso).

CATEGORIZACIÓN (Profissional, con detalle de Nota 18/18.(a)/19.(b) por año, ver cada año abajo
para qué líneas exactas aplican — no todos los rubros existen en los 3 años):
- 'Quotas Globo-Camp Brasileiro' / 'Quotas F.P.F' / 'Receita transmissão' / 'Quotas Copa do
  Brasil-CBF' / 'Quotas de Transmissão' (línea combinada Globo+FPF, usada en 2024) ->
  broadcasting. 'Premiação Campeonato Paulista' -> competition_bonus. 'Venda Atletas' /
  'Solidariedade / Compensação Formação' (mecanismo de solidaridad FIFA sobre ex-jugadores
  formados en el club, Nota explicativa 1) -> player_sales. 'Publicidade/Propaganda' ->
  sponsorship_commercial. 'Outras Receitas' -> other_income.
- 'Salários e Encargos/Outros' -> wages_squad. 'Serviços de Terceiros' -> admin_general_expense
  (Nota 19.(a)/18.(b): médicos, abogados, mantenimiento de cancha, captación de recursos,
  fisioterapia, prensa — mezcla de servicios generales, no específicamente plantel).
  'Despesas com Jogos' -> match_organisation_expense.
  Demais Gastos, sub-desglosado (Nota 18.(a)): 'Cessão de Imagem / Luvas' -> wages_squad
  (derecho de imagen del plantel, mismo criterio que Operário Ferroviário/Guarani);
  'Intermediação / Comissão' -> other_expenses (comisiones de intermediación de pases — Racing
  dejó este mismo tipo de gasto FUERA de player_amortisation por decisión explícita de Guido,
  club-data-mapping/referencia/formato-simplificado.md CASO CONSULTADO: Boca tampoco separa comisiones dentro de su
  bucket "Compra de jugadores", así que meterlo ahí sería MENOS fiel, no más homologado);
  'Viagens / Moradia / Concentração e Atletas / Refeições / Medicamentos' -> match_organisation_
  expense; 'Taxas CBF / FPF' -> match_organisation_expense; 'Outras Despesas' ->
  other_expenses (catch-all de la propia nota, compuesto mayormente por provisión de
  contingencias nueva del ejercicio, Nota 18.(a)(d)); 'Fenapaf/INSS' -> admin_general_expense
  (cargas descontadas en la fuente de las cuotas de TV, mismo espíritu que "impuestos" de
  club-data-mapping/referencia/casos-por-pais-y-formato.md, aunque técnicamente es una contribución social, no un impuesto
  puro); 'Amortização / Depreciação' -> depreciation; 'Acordo Trabalhista e outros' ->
  wages_squad (acuerdos/distratos laborales con ex-jugadores y personal, Nota 16).
- Departamentos NO Profissional: 'Administrativo - Estadio' (ingreso) -> stadium_other (el
  rótulo nombra el estadio explícito, club-data-mapping sección 1); (gasto) ->
  match_organisation_expense (mantenimiento/operación del estadio, mismo criterio que el Sector
  Estadio de Banfield). 'Administrativo - Jd Paineiras' (complejo/sede secundaria, ingreso) ->
  other_sports; (gasto) -> youth_other_sports_expense. 'Administrativo - Jd Eulina' (solo
  gasto, otra sede/actividad) -> youth_other_sports_expense. 'Amador' (fútbol amateur/base,
  ingreso) -> youth_football; (gasto) -> youth_other_sports_expense. 'Social / Outras'
  (ingreso, sin desglose disponible entre cuotas sociales y otros conceptos mezclados en el
  mismo rótulo) -> other_income (criterio conservador: el propio rótulo dice "Outras" además de
  "Social", no se fuerza a member_dues sin poder separar).
- 'Resultado Financeiro Líquido' -> netInterest siempre (nunca revenueLine/expenseLine,
  club-data-mapping sección 2), aunque el propio documento lo netee de formas distintas según
  el año (ver notas de reconciliación de cada año abajo: en 2022/2023 el documento lo suma
  dentro del total de "Despesas Operacionais" impreso; en 2024 lo suma dentro de "Receita
  Operacionais" impreso, porque en 2024 el resultado financiero fue positivo). No hay
  desglose de "receita financeira" vs. "despesa financeira" por separado en estos documentos
  (solo el neto), a diferencia de Guarani/Operário Ferroviário.
- No hay línea de impuesto a las ganancias en ningún año (sociedade civil sem fins lucrativos).
  tax:0 los 3 años.

2024 — AJUSTE EXTRAORDINARIO FUERA DE LOS DEPARTAMENTOS ("Depreciação/Contingencia/Pept/CNRD"):
después de sumar los 5 departamentos (Ingresos R$79.650.568, Gastos R$50.521.953) el propio
Estado de Resultado resta UNA línea más, fuera de la estructura departamental, antes de llegar
al Superávit final: "Depreciação/Contingencia/Pept/CNRD (2.168.194)" impreso — pero esa cifra
NO reconcilia (79.650.568+0,040 netInterest −50.521.953−2.168.194 = 26.999.... ≠ 7.000.643
impreso). Probando con R$22.168.194 (mismo número con un dígito de más al frente, error de OCR
plausible sobre un recorte de diario) SÍ reconcilia exacto: 79.690.790 (Receita, ya con
netInterest +0,040 sumado) − 50.521.953 − 22.168.194 = 7.000.643, EXACTO. Se cargó
−22.168.194 (R$22,168194 M), no el valor impreso. Coincide en magnitud y en el mismo ejercicio
con la aparición de un pasivo NUEVO en el Balanço 2024 ("Acordos trabalhistas-Pept e CNRD",
não circulante, R$20.893.355, R$0 en 2023) — PEPT/CNRD son mecanismos de acuerdo/arbitraje
laboral (CNRD: Câmara Nacional de Resolução de Disputas), consistente con que el club reconoció
en 2024 una obligación/gasto grande por acuerdos laborales que no existía en 2023. Se
categorizó como `exceptional_items` (no operativo, no recurrente, ligado a un pasivo legal
nuevo del ejercicio) — es EXACTAMENTE el tipo de línea que el brief de esta sesión pidió
evaluar con cuidado, aunque terminó apareciendo en Ponte Preta y no en Guarani (que no tuvo
ninguna línea de contingencia/reestructuración dentro de su propio DRE en los 2 años cargados).

VERIFICACIÓN (Node, revenue + expenses + netInterest = officialPAT, antes de cargar):
- 2022: revenueLines EXACTO 44,847100 M = Receita Operacionais impreso (por departamento,
  incl. Nota 18). expenseLines (departamentos, SIN el Resultado Financeiro Líquido) EXACTO
  49,027180 M — el "Despesas Operacionais" impreso (49.377.891) es ESE monto MÁS el valor
  absoluto de netInterest (0,350711), confirmando que el documento sumó el resultado
  financiero dentro de Despesas ese año. 44,847100 − 49,027180 − 0,350711 = −4,530791 M =
  Superávit/Déficit do Exercício impreso, EXACTO.
- 2023: revenueLines 32,375231 M vs. 32,375229 M impreso (diff redondeo de R$2). expenseLines
  EXACTO 47,322484 M (departamentos). Mismo patrón que 2022: "Despesas Operacionais" impreso
  (47.543.937) = 47,322484 + 0,221453 (netInterest abs). 32,375229 − 47,322484 − 0,221453 =
  −15,168708 M, EXACTO.
- 2024: revenueLines EXACTO 79,650568 M (departamentos, incl. Nota 18 Profissional
  re-derivada). expenseLines (departamentos + ajuste extraordinario Pept/CNRD) = 50,521953 +
  22,168194 = 72,690147 M. Acá el documento sumó netInterest (+0,040222) DENTRO de "Receita
  Operacionais" impreso (79.690.790 = 79.650.568 + 40.222), patrón inverso a 2022/2023 porque
  el resultado financiero de 2024 fue positivo. 79,650568 − 72,690147 + 0,040222 = 7,000643 M
  = Superávit do Exercício impreso, EXACTO.

grossDebt: no hay una línea única "Deudas" — se sumaron las partidas de naturaleza financiera:
'Títulos a Pagar' (Nota 10: deudas con ex-dirigentes/gestores del fútbol profesional — Sérgio
Carnielli, Carnielli Invest. e Part. Ltda. — que el propio documento describe como "mútuos e
cessões de crédito", préstamos entre partes, no pasivo operativo ordinario), 'Parcelamentos de
impostos e contribuições' (planes de pago financiados de deuda impositiva atrasada — PROFUT/
PERT/PERSE — estructuralmente deuda, no un pasivo impositivo corriente) y 'Acordos
trabalhistas'/'Acordos trabalhistas-Pept e CNRD' (acuerdos laborales con plan de pago, 2024).
EXCLUIDO: Fornecedores (pasivo operativo ordinario), Contas a pagar, Salário e Indenizações a
Pagar, Contribuições a Recolher (impositivo corriente), Provisão para Contingências
(previsión legal, no deuda). cash = Caixa e Bancos (Nota 3 de cada año).

FX: ninguno de los 3 documentos declara tipo de cambio propio. PTAX de cierre BCB: 2022-12-31
(5,2177, agregada a FX_CLOSE en la integración de esta misma versión), 2023-12-31 (4,8413) y
2024-12-31 (6,1923) YA estaban en FX_CLOSE.

Gestión: ninguno de los 3 documentos identifica presidente ni consejo directivo — solo firma
la contadora Adriana Vieira (CRC 1SP 221376/0-2) y el auditor (Audcorp). gestionId
'sinconfirmar' los 3 años.
============================================================================
```

## 2024

### Meta

```text
grossDebt = Títulos a Pagar (6,844891 circ. + 109,980322 não circ.) + Parcelamentos de
impostos (3,805022 circ. + 30,623021 não circ.) + Acordos trabalhistas (3,600258 circ.) +
Acordos trabalhistas-Pept e CNRD (20,893355 não circ., nuevo en 2024 — ver comentario de
cabecera sobre el ajuste extraordinario del mismo nombre).
netInterest = "Resultado Financeiro Líquido" impreso, POSITIVO este año (a diferencia de
2022/2023) — el documento lo sumó dentro de "Receita Operacionais" impreso en vez de
Despesas (ver comentario de cabecera).
officialTotalRevenue = 79,650568 M, EXACTO igual a mis líneas (5 departamentos, Profissional
re-derivado de la Nota 18 — ver comentario de cabecera sobre el error de OCR de la
comparativa "2024" de este mismo documento, no usado).
officialTotalExpenses = 50,521953 M (solo los 5 departamentos) — EXCLUYE el ajuste
extraordinario "Depreciação/Contingência/Pept/CNRD" (-22,168194, exceptional_items), mismo
criterio que Botafogo/Atlético Mineiro/Chapecoense: verifyTieOuts()/tools/audit.js comparan
"Expenses" contra gasto ordinario + no-efectivo solamente, exceptional_items no participa de
ese check (sí de officialPAT, vía operatingProfit).
officialPAT = "Superávit do Exercício" impreso (7,000643). Verificado: 79,650568 −
72,690147 (departamentos + extraordinario) + 0,040222 = 7,000643, EXACTO.
```

## 2023

### Meta

```text
grossDebt = Títulos a Pagar (8,341810 circ. + 109,980322 não circ.) + Parcelamentos de
impostos (2,508991 circ. + 30,623021 não circ.) + Acordos trabalhistas (3,911658 circ.).
officialTotalRevenue = 32,375229 M (mis líneas suman 32,375231, diff redondeo de R$2).
officialTotalExpenses = 47,322484 M, EXACTO igual a mis líneas (5 departamentos). Mismo
patrón que 2022: "Despesas Operacionais" impreso (47.543.937) = esto + |netInterest|.
officialPAT = déficit impreso (−15,168708).
```

## 2022

### Meta

```text
grossDebt = Títulos a Pagar (7,781862 circ. + 111,223351 não circ.) + Parcelamentos de
impostos (2,195455 circ. + 30,936557 não circ.) + Acordos trabalhistas (3,911658 circ.) —
ver comentario de cabecera. cash = Caixa e Bancos (Nota 3).
netInterest = "Resultado Financeiro Líquido" impreso (neto, sin desglose de receita/despesa
financeira disponible en el documento).
officialTotalRevenue = 44,847100 M, EXACTO igual a "Receita Operacionais" impreso.
officialTotalExpenses = 49,027180 M = suma de los 5 departamentos (EXCLUYE el Resultado
Financeiro Líquido, que el documento sumó dentro del "Despesas Operacionais" impreso de
49.377.891 — ver comentario de cabecera para la reconciliación completa).
officialPAT = "Superávit/Déficit do Exercício" impreso (−4,530791).
```

## Otros

### gestionesByClub['pontepreta-br']

```text
gestionesByClub: entrada genérica "sin confirmar" — ninguno de los 3 documentos identifica
presidente ni consejo directivo del club, solo firma la contadora Adriana Vieira (CRC 1SP
221376/0-2) y el auditor.
```

### memberCountByClub['pontepreta-br']

```text
no se encontró una cifra de socios en ninguno de los 3 documentos
```
