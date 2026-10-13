# athleticoparanaense-br — evidencia de carga

Lo que había como comentario en `data/athleticoparanaense-br-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/athleticoparanaense-br-data.js — Club Athletico Paranaense (Curitiba, Paraná, Brasil). Sigue
siendo ASSOCIAÇÃO (NO se convirtió a SAF), pero publica "Demonstrações Financeiras" auditadas
(BDO RCS Auditores Independentes) todos los años, buena cobertura histórica. clubId CON GUIÓN
desde el arranque: 'athleticoparanaense-br' (mismo criterio que banfield-ar), bracket notation en
clubs/gestionesByClub/memberCountByClub/CLUB_GENERIC_DATA. 2 ejercicios cargados: 2024 y 2025
(ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, clubs.js fiscalYearStart:'01-01', mismo
criterio que Botafogo/Operário Ferroviário/Grêmio).

FUENTES: demonstracoes-financeiras-2024.md (bajado de un mirror en static.poder360.com.br — la URL
directa a static.athletico.com.br con acentos dio 404) y demonstracoes-financeiras-2025.md (bajado
del sitio oficial athletico.com.br). Los 2 PDF con texto nativo. Transcripción completa en
Clubes/Brasil/Athletico Paranaense/demonstracoes-financeiras-<año>.md. Firmados por el presidente
Mario Celso Petraglia (mismo presidente los 2 años).

COLUMNA USADA: CONTROLADORA (el club standalone) en TODAS las líneas, NO Consolidado (que suma la
CAP S/A, la sociedad titular del estadio Arena da Baixada — el propio informe del auditor hace una
"Ênfase" explícita sobre esa controlada: recibe aportes de la controladora como única fuente de
caja) — mismo criterio que Botafogo/Operário Ferroviário: un solo perímetro de consolidación, sin
mezclar.

ESCALA: documentos "Em milhares de Reais" (miles de reales), formato numérico brasileño ("." =
separador de miles). Transcribir el dígito tal cual con "." como punto decimal de JS YA da
millones de BRL nativos directo (ej. el documento imprime "261.283" = 261.283 miles de reales =
R$261,283 millones; en este archivo amountNative:261.283) — no hace falta dividir por 1.000 de
nuevo, esa división YA está hecha por el propio formato numérico del documento. Mismo resultado
final que "dividir por 1.000" de Botafogo/Operário, pero sin el paso intermedio.

ESTRUCTURA REAL DEL DOCUMENTO (clave para no duplicar plata leyendo el código de abajo): la DRE es
una cascada de 7 bloques, cada uno con su propio subtotal impreso:
  Receita operacional líquida (Nota 18)
  − Custo das atividades sociais e esportivas (Nota 19, incluye TODO el costo del plantel: sueldos,
    derecho de imagen, viajes, gastos administrativos del plantel, amortización de pases)
  = Resultado Bruto
  − Despesa com pessoal (Nota 20, personal NO deportivo) − Depreciação/amortizações (Nota 20) −
    Despesas das atividades em geral (Nota 20)
  + Outras despesas/receitas (Nota 21: venta de jugadores NETA de sus costos de transacción — ver
    desglose abajo, ítem separado de la Nota 19)
  − Resultado de equivalência patrimonial (línea suelta de la DRE, resultado de la participación en
    la CAP S/A por el método de la participación — no operativo/no recurrente)
  = Resultado operacional
  + Resultado não operacional (Nota 22: donaciones, juicios ganados/perdidos, partidas atípicas)
  + Resultado financeiro (Nota 23)
  = Superávit/Déficit líquido do exercício

CATEGORIZACIÓN (idéntica entre 2024 y 2025, mismos rubros los 2 años):
- Nota 18 (Receita operacional líquida): 'Televisionamento' -> broadcasting; 'Premiações e
  participações' (de TV/torneo, NO de venta de entradas) -> competition_bonus; 'Bilheteria' ->
  matchday_competition; 'Camarote' (palcos, venta por temporada) -> season_tickets, mismo criterio
  que "palcos" de Boca; 'Associados (sócio furacão)' -> member_dues (programa de socios, no
  sponsor); 'Loterias' -> other_income; 'Receitas Arena'/'Lanchonetes'/'Choperia' -> stadium_other
  (concesiones DENTRO del estadio — la fila nombra el estadio/complejo explícitamente, cumple el
  criterio conservador de club-data-mapping sección 1); 'Publicidade'/'OTT - Rede furacão'/'Loja
  oficial'/'E-commerce'/'Patrocínios' -> sponsorship_commercial (comercial/merchandising/medios
  propios); 'Escolas de futebol' -> youth_football; 'Outras receitas operacionais' -> other_income;
  '(-) Impostos e deduções da receita' -> other_income (línea negativa, contra-revenue, mismo
  criterio que 'Deduções sobre a receita' de Botafogo).
- Nota 19 (Custos): 'Custo Mercadoria Vendida <canal>' (Escola/Loja/E-Commerce/Lanchonetes/
  Choperia/Camarotes) -> admin_general_expense (costo de mercadería, mismo criterio que 'Custo
  venda de mercadoria' de Botafogo); 'Custo das Operações de Jogos' -> match_organisation_expense;
  'Custo das Operações de Eventos'/'Custo de Transmissão' (solo 2025) -> admin_general_expense
  (costo de eventos no futbolísticos/producción, no organización de partido); 'Salários, encargos e
  benefícios'/'Direito de Imagem' (del plantel) -> wages_squad; 'Gastos com viagens' ->
  match_organisation_expense; 'Gastos Administrativos' (del plantel) -> admin_general_expense;
  'Amortizações de atletas' -> player_amortisation.
- Nota 20 (Despesas operacionais, personal/depreciación/generales NO deportivos): 'Salários'/
  'Premiações'/'Rescisões'/'Encargos sobre folha'/'Benefícios sociais sobre folha'/'Outros gastos
  com pessoal' -> admin_general_expense (personal administrativo, distinto del plantel de la Nota
  19); 'Depreciação' -> depreciation; 'Amortização' (intangibles generales, no jugadores) ->
  other_amortisation; 'Despesas administrativas'/'Despesas gerais'/'Despesas tributárias'
  (impuestos, club-data-mapping/referencia/casos-por-pais-y-formato.md)/'Tecnologia da informação' -> admin_general_expense.
- Nota 21 (Outras despesas/receitas — venta de jugadores): 'Receita com venda de atletas'/'Receita
  com transações com atletas' (préstamos) -> player_sales (ingreso). 'Despesas com transações de
  atletas' se desglosa en la Nota 21.2 en 6 conceptos (Repasse de Direitos Econômicos, Comissões,
  Despesas Diversas, Intermediação, Empréstimos Atletas, Mecanismo de Solidariedade) -> TODOS
  other_expenses (comisiones/intermediación de la operación, no el cargo contable de amortización
  en sí — mismo criterio que Racing/Botafogo: `player_amortisation` es SOLO el cargo contable).
  'Baixa de direitos federativos' (derecognición del intangible del jugador transferido, cargo
  contable real) -> player_amortisation, mismo criterio que 'Baixa de atletas' de Botafogo.
  'Outras despesas com atletas' -> other_expenses.
- Nota 22 (Resultado não operacional) + 'Resultado de equivalência patrimonial' (línea suelta de la
  DRE): TODAS sus líneas -> exceptional_items. Es la sección de la propia DRE explícitamente
  separada de "Resultado operacional" (no operativo/no recurrente por definición del propio
  documento) — mismo criterio que 'Resultado de equivalência patrimonial' de Botafogo. Incluye
  'Doações/bonificações'/'Receitas judiciais'/'Outras receitas não operacionais' (ingreso) y
  'Despesas judiciais'/'Despesas indedutíveis'/'Outras despesas não operacionais' (gasto).
- Nota 23 (Resultado financeiro): NO se carga como línea — va íntegro a netInterest en
  fiscalYearMeta (club-data-mapping sección 2), aunque el documento use un neto que ya mezcla
  intereses y variação cambial (mismo tratamiento).

VERIFICACIÓN (Node, antes de cargar; ver también el reporte de la sesión):
- 2024: revenueLines suma EXACTO 548,101 M BRL. expenseLines suma EXACTO -536,256 M BRL.
  revenue + expenses + netInterest(11,586) = 23,431 M BRL vs. Superávit líquido impreso (23,439) —
  diferencia de 0,008 M BRL (~R$8.000 sobre R$23,4 millones, ~0,03%), redondeo acumulado de ~40
  líneas del propio documento, no error de carga (mismo tipo de diferencia que Racing 2026/27 y
  Operário Ferroviario 2024/25, ambos documentados como redondeo aceptable).
- 2025: revenueLines suma EXACTO 448,979 M BRL. expenseLines suma EXACTO -524,148 M BRL.
  revenue + expenses + netInterest(17,039) = -58,130 M BRL vs. Déficit líquido impreso (-58,134) —
  diferencia de 0,004 M BRL, mismo tipo de redondeo aceptable. 2025 fue el primer año de DÉFICIT
  real desde que hay balances cargados de este club (el propio "Resultado de equivalência
  patrimonial" y la caída de "Receita com venda de atletas" de 272,268 a 180,687 M explican la
  mayor parte de la caída).
- officialTotalExpenses de este archivo = |expenses + nonCash| del motor genérico (wages +
  otherExpenses + amortizaciones/depreciación), EXCLUYENDO exceptional_items (que el motor suma
  aparte, en operatingProfit) — mismo criterio que Botafogo. officialTotalRevenue = suma COMPLETA
  de revenueLines (el motor genérico suma revenue sin excluir ninguna categoría, a diferencia de
  expenses). officialPAT = Superávit/Déficit líquido impreso (incluye todo).

grossDebt = 'Empréstimos e financiamentos' Controladora, circulante + não circulante (Nota 13) —
línea angosta de deuda financiera real, separada de Fornecedores/Contas a pagar/Obrigações
sociais e fiscais/Parcelamentos fiscais en el propio Balanço, mismo criterio que Boca/Vélez
(club-data-mapping/referencia/formato-simplificado.md, "grossDebt"). Es chica porque la deuda real del club vive mayormente en la CAP S/A
(Consolidado), no en la Controladora. cash = 'Disponibilidades' Controladora (Nota 5).

FX: ningún documento declara tipo de cambio propio (Nota "Conversão de operações em moeda
estrangeira" solo dice que se usa "a taxa de câmbio da data de fechamento do balanço", sin
declarar el número) — se usó PTAX de cierre del BCB vía fxRef, ya cargado en FX_CLOSE:
BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).

Gestión: Mario Celso Petraglia firma como Presidente los 2 ejercicios (2024 y 2025), pero no se
encontró en ninguno de los 2 documentos una fecha de elección/mandato que confirme con la
profundidad que exige club-data-mapping SKILL.md sección 7 — gestionId 'sinconfirmar' los 2 años,
mismo criterio que Botafogo/Operário Ferroviário.

Socios: no se encontró una cifra de "sócio furacão" en ninguno de los 2 documentos (solo el monto
en R$ de esa línea de ingreso) — memberCountByClub null.
============================================================================
```

## 2025

### Meta

```text
grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (0,130) + não circulante
(0), Nota 13. cash = 'Disponibilidades' Controladora, Nota 5.
2025 fue DÉFICIT real (-58,134 M BRL) — primer año de pérdida desde que hay balances de este
club cargados. officialTotalRevenue = 448,979 M BRL (suma completa). officialTotalExpenses =
467,574 M BRL (excl. exceptional_items, mismo criterio que 2024). officialPAT = 'Déficit
líquido' impreso (-58,134).
```

## 2024

### Gastos

_antes de la fila 1 (`Custo Mercadoria Vendida Escola Oficial`):_

```text
Nota 19 — Custos (Atividades comerciais: custo de mercadoria; Custos Com Atletas)
```

_antes de la fila 14 (`Salários (Despesas com pessoal)`):_

```text
Nota 20 — Despesas operacionais (personal/depreciación/generales NO deportivos)
```

_antes de la fila 26 (`Repasse de Direitos Econômicos`):_

```text
Nota 21.2 — Despesas com transações de atletas (comisiones/intermediación, NO amortización)
```

_antes de la fila 34 (`Despesas judiciais`):_

```text
Resultado não operacional (Nota 22) + Resultado de equivalência patrimonial — no operativo/no
recurrente por la propia estructura de la DRE, ver comentario de cabecera.
```

### Meta

```text
grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (0,356) + não circulante
(0,162), Nota 13. cash = 'Disponibilidades' Controladora, Nota 5.
netInterest = 'Resultado financeiro' (Nota 23), Controladora, ya neto de intereses + variação
cambial (el documento no los separa en 2 campos, se carga el neto tal cual lo reporta).
officialTotalRevenue = suma COMPLETA de revenueLines (548,101 M BRL) — el motor genérico
(computeYearGeneric) suma `revenue` sin excluir ninguna categoría. officialTotalExpenses =
451,166 M BRL = |expenses + nonCash| del motor (wages + otherExpenses + amortizaciones/
depreciación), EXCLUYENDO exceptional_items (el motor lo suma aparte, en operatingProfit) —
mismo criterio que Botafogo. officialPAT = 'Superávit líquido' impreso (23,439), incluye todo.
```

## Otros

### gestionesByClub['athleticoparanaense-br']

```text
Mario Celso Petraglia firma como Presidente los 2 ejercicios cargados (2024 y 2025), pero
ningún documento confirma fecha de elección/mandato con la profundidad que exige
club-data-mapping SKILL.md sección 7 — entrada mínima para que el selector "Por gestión" no
rompa, mismo criterio que Botafogo/Operário Ferroviário.
```

### memberCountByClub['athleticoparanaense-br']

```text
no se encontró una cifra de "sócio furacão" en ninguno de los 2 documentos
```
