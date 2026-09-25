// ============================================================================
// data/athleticoparanaense-br-data.js — Club Athletico Paranaense (Curitiba, Paraná, Brasil). Sigue
// siendo ASSOCIAÇÃO (NO se convirtió a SAF), pero publica "Demonstrações Financeiras" auditadas
// (BDO RCS Auditores Independentes) todos los años, buena cobertura histórica. clubId CON GUIÓN
// desde el arranque: 'athleticoparanaense-br' (mismo criterio que banfield-ar), bracket notation en
// clubs/gestionesByClub/memberCountByClub/CLUB_GENERIC_DATA. 2 ejercicios cargados: 2024 y 2025
// (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12, clubs.js fiscalYearStart:'01-01', mismo
// criterio que Botafogo/Operário Ferroviário/Grêmio).
//
// FUENTES: demonstracoes-financeiras-2024.md (bajado de un mirror en static.poder360.com.br — la URL
// directa a static.athletico.com.br con acentos dio 404) y demonstracoes-financeiras-2025.md (bajado
// del sitio oficial athletico.com.br). Los 2 PDF con texto nativo. Transcripción completa en
// Clubes/Brasil/Athletico Paranaense/demonstracoes-financeiras-<año>.md. Firmados por el presidente
// Mario Celso Petraglia (mismo presidente los 2 años).
//
// COLUMNA USADA: CONTROLADORA (el club standalone) en TODAS las líneas, NO Consolidado (que suma la
// CAP S/A, la sociedad titular del estadio Arena da Baixada — el propio informe del auditor hace una
// "Ênfase" explícita sobre esa controlada: recibe aportes de la controladora como única fuente de
// caja) — mismo criterio que Botafogo/Operário Ferroviário: un solo perímetro de consolidación, sin
// mezclar.
//
// ESCALA: documentos "Em milhares de Reais" (miles de reales), formato numérico brasileño ("." =
// separador de miles). Transcribir el dígito tal cual con "." como punto decimal de JS YA da
// millones de BRL nativos directo (ej. el documento imprime "261.283" = 261.283 miles de reales =
// R$261,283 millones; en este archivo amountNative:261.283) — no hace falta dividir por 1.000 de
// nuevo, esa división YA está hecha por el propio formato numérico del documento. Mismo resultado
// final que "dividir por 1.000" de Botafogo/Operário, pero sin el paso intermedio.
//
// ESTRUCTURA REAL DEL DOCUMENTO (clave para no duplicar plata leyendo el código de abajo): la DRE es
// una cascada de 7 bloques, cada uno con su propio subtotal impreso:
//   Receita operacional líquida (Nota 18)
//   − Custo das atividades sociais e esportivas (Nota 19, incluye TODO el costo del plantel: sueldos,
//     derecho de imagen, viajes, gastos administrativos del plantel, amortización de pases)
//   = Resultado Bruto
//   − Despesa com pessoal (Nota 20, personal NO deportivo) − Depreciação/amortizações (Nota 20) −
//     Despesas das atividades em geral (Nota 20)
//   + Outras despesas/receitas (Nota 21: venta de jugadores NETA de sus costos de transacción — ver
//     desglose abajo, ítem separado de la Nota 19)
//   − Resultado de equivalência patrimonial (línea suelta de la DRE, resultado de la participación en
//     la CAP S/A por el método de la participación — no operativo/no recurrente)
//   = Resultado operacional
//   + Resultado não operacional (Nota 22: donaciones, juicios ganados/perdidos, partidas atípicas)
//   + Resultado financeiro (Nota 23)
//   = Superávit/Déficit líquido do exercício
//
// CATEGORIZACIÓN (idéntica entre 2024 y 2025, mismos rubros los 2 años):
// - Nota 18 (Receita operacional líquida): 'Televisionamento' -> broadcasting; 'Premiações e
//   participações' (de TV/torneo, NO de venta de entradas) -> competition_bonus; 'Bilheteria' ->
//   matchday_competition; 'Camarote' (palcos, venta por temporada) -> season_tickets, mismo criterio
//   que "palcos" de Boca; 'Associados (sócio furacão)' -> member_dues (programa de socios, no
//   sponsor); 'Loterias' -> other_income; 'Receitas Arena'/'Lanchonetes'/'Choperia' -> stadium_other
//   (concesiones DENTRO del estadio — la fila nombra el estadio/complejo explícitamente, cumple el
//   criterio conservador de club-data-mapping sección 1); 'Publicidade'/'OTT - Rede furacão'/'Loja
//   oficial'/'E-commerce'/'Patrocínios' -> sponsorship_commercial (comercial/merchandising/medios
//   propios); 'Escolas de futebol' -> youth_football; 'Outras receitas operacionais' -> other_income;
//   '(-) Impostos e deduções da receita' -> other_income (línea negativa, contra-revenue, mismo
//   criterio que 'Deduções sobre a receita' de Botafogo).
// - Nota 19 (Custos): 'Custo Mercadoria Vendida <canal>' (Escola/Loja/E-Commerce/Lanchonetes/
//   Choperia/Camarotes) -> admin_general_expense (costo de mercadería, mismo criterio que 'Custo
//   venda de mercadoria' de Botafogo); 'Custo das Operações de Jogos' -> match_organisation_expense;
//   'Custo das Operações de Eventos'/'Custo de Transmissão' (solo 2025) -> admin_general_expense
//   (costo de eventos no futbolísticos/producción, no organización de partido); 'Salários, encargos e
//   benefícios'/'Direito de Imagem' (del plantel) -> wages_squad; 'Gastos com viagens' ->
//   match_organisation_expense; 'Gastos Administrativos' (del plantel) -> admin_general_expense;
//   'Amortizações de atletas' -> player_amortisation.
// - Nota 20 (Despesas operacionais, personal/depreciación/generales NO deportivos): 'Salários'/
//   'Premiações'/'Rescisões'/'Encargos sobre folha'/'Benefícios sociais sobre folha'/'Outros gastos
//   com pessoal' -> admin_general_expense (personal administrativo, distinto del plantel de la Nota
//   19); 'Depreciação' -> depreciation; 'Amortização' (intangibles generales, no jugadores) ->
//   other_amortisation; 'Despesas administrativas'/'Despesas gerais'/'Despesas tributárias'
//   (impuestos, sección 17 del skill)/'Tecnologia da informação' -> admin_general_expense.
// - Nota 21 (Outras despesas/receitas — venta de jugadores): 'Receita com venda de atletas'/'Receita
//   com transações com atletas' (préstamos) -> player_sales (ingreso). 'Despesas com transações de
//   atletas' se desglosa en la Nota 21.2 en 6 conceptos (Repasse de Direitos Econômicos, Comissões,
//   Despesas Diversas, Intermediação, Empréstimos Atletas, Mecanismo de Solidariedade) -> TODOS
//   other_expenses (comisiones/intermediación de la operación, no el cargo contable de amortización
//   en sí — mismo criterio que Racing/Botafogo: `player_amortisation` es SOLO el cargo contable).
//   'Baixa de direitos federativos' (derecognición del intangible del jugador transferido, cargo
//   contable real) -> player_amortisation, mismo criterio que 'Baixa de atletas' de Botafogo.
//   'Outras despesas com atletas' -> other_expenses.
// - Nota 22 (Resultado não operacional) + 'Resultado de equivalência patrimonial' (línea suelta de la
//   DRE): TODAS sus líneas -> exceptional_items. Es la sección de la propia DRE explícitamente
//   separada de "Resultado operacional" (no operativo/no recurrente por definición del propio
//   documento) — mismo criterio que 'Resultado de equivalência patrimonial' de Botafogo. Incluye
//   'Doações/bonificações'/'Receitas judiciais'/'Outras receitas não operacionais' (ingreso) y
//   'Despesas judiciais'/'Despesas indedutíveis'/'Outras despesas não operacionais' (gasto).
// - Nota 23 (Resultado financeiro): NO se carga como línea — va íntegro a netInterest en
//   fiscalYearMeta (club-data-mapping sección 2), aunque el documento use un neto que ya mezcla
//   intereses y variação cambial (mismo tratamiento).
//
// VERIFICACIÓN (Node, antes de cargar; ver también el reporte de la sesión):
// - 2024: revenueLines suma EXACTO 548,101 M BRL. expenseLines suma EXACTO -536,256 M BRL.
//   revenue + expenses + netInterest(11,586) = 23,431 M BRL vs. Superávit líquido impreso (23,439) —
//   diferencia de 0,008 M BRL (~R$8.000 sobre R$23,4 millones, ~0,03%), redondeo acumulado de ~40
//   líneas del propio documento, no error de carga (mismo tipo de diferencia que Racing 2026/27 y
//   Operário Ferroviario 2024/25, ambos documentados como redondeo aceptable).
// - 2025: revenueLines suma EXACTO 448,979 M BRL. expenseLines suma EXACTO -524,148 M BRL.
//   revenue + expenses + netInterest(17,039) = -58,130 M BRL vs. Déficit líquido impreso (-58,134) —
//   diferencia de 0,004 M BRL, mismo tipo de redondeo aceptable. 2025 fue el primer año de DÉFICIT
//   real desde que hay balances cargados de este club (el propio "Resultado de equivalência
//   patrimonial" y la caída de "Receita com venda de atletas" de 272,268 a 180,687 M explican la
//   mayor parte de la caída).
// - officialTotalExpenses de este archivo = |expenses + nonCash| del motor genérico (wages +
//   otherExpenses + amortizaciones/depreciación), EXCLUYENDO exceptional_items (que el motor suma
//   aparte, en operatingProfit) — mismo criterio que Botafogo. officialTotalRevenue = suma COMPLETA
//   de revenueLines (el motor genérico suma revenue sin excluir ninguna categoría, a diferencia de
//   expenses). officialPAT = Superávit/Déficit líquido impreso (incluye todo).
//
// grossDebt = 'Empréstimos e financiamentos' Controladora, circulante + não circulante (Nota 13) —
// línea angosta de deuda financiera real, separada de Fornecedores/Contas a pagar/Obrigações
// sociais e fiscais/Parcelamentos fiscais en el propio Balanço, mismo criterio que Boca/Vélez
// (sección 14 del skill). Es chica porque la deuda real del club vive mayormente en la CAP S/A
// (Consolidado), no en la Controladora. cash = 'Disponibilidades' Controladora (Nota 5).
//
// FX: ningún documento declara tipo de cambio propio (Nota "Conversão de operações em moeda
// estrangeira" solo dice que se usa "a taxa de câmbio da data de fechamento do balanço", sin
// declarar el número) — se usó PTAX de cierre del BCB vía fxRef, ya cargado en FX_CLOSE:
// BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: Mario Celso Petraglia firma como Presidente los 2 ejercicios (2024 y 2025), pero no se
// encontró en ninguno de los 2 documentos una fecha de elección/mandato que confirme con la
// profundidad que exige club-data-mapping SKILL.md sección 7 — gestionId 'sinconfirmar' los 2 años,
// mismo criterio que Botafogo/Operário Ferroviário.
//
// Socios: no se encontró una cifra de "sócio furacão" en ninguno de los 2 documentos (solo el monto
// en R$ de esa línea de ingreso) — memberCountByClub null.
// ============================================================================

const athleticoparanaenseBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Televisionamento', normalizedCategory:'broadcasting', amountNative:30.365, disclosureLevel:'detailed' },
    { rawLabel:'Premiações e participações', normalizedCategory:'competition_bonus', amountNative:27.193, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:21.354, disclosureLevel:'detailed' },
    { rawLabel:'Camarote', normalizedCategory:'season_tickets', amountNative:4.775, disclosureLevel:'detailed' },
    { rawLabel:'Associados (sócio furacão)', normalizedCategory:'member_dues', amountNative:59.330, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Arena', normalizedCategory:'stadium_other', amountNative:22.875, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:15.118, disclosureLevel:'detailed' },
    { rawLabel:'OTT - Rede furacão', normalizedCategory:'sponsorship_commercial', amountNative:23.571, disclosureLevel:'detailed' },
    { rawLabel:'Loja oficial', normalizedCategory:'sponsorship_commercial', amountNative:18.974, disclosureLevel:'detailed' },
    { rawLabel:'E-commerce', normalizedCategory:'sponsorship_commercial', amountNative:3.366, disclosureLevel:'detailed' },
    { rawLabel:'Lanchonetes', normalizedCategory:'stadium_other', amountNative:24.374, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:20.426, disclosureLevel:'detailed' },
    { rawLabel:'Escolas de futebol', normalizedCategory:'youth_football', amountNative:2.353, disclosureLevel:'detailed' },
    { rawLabel:'Choperia', normalizedCategory:'stadium_other', amountNative:1.114, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais', normalizedCategory:'other_income', amountNative:12.973, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e deduções da receita', normalizedCategory:'other_income', amountNative:-26.881, disclosureLevel:'detailed' },
    { rawLabel:'Receita com venda de atletas', normalizedCategory:'player_sales', amountNative:272.268, disclosureLevel:'detailed' },
    { rawLabel:'Receita com transações com atletas (empréstimos)', normalizedCategory:'player_sales', amountNative:12.324, disclosureLevel:'detailed' },
    { rawLabel:'Doações/bonificações', normalizedCategory:'exceptional_items', amountNative:0.350, disclosureLevel:'detailed' },
    { rawLabel:'Receitas judiciais', normalizedCategory:'exceptional_items', amountNative:0.357, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas não operacionais', normalizedCategory:'exceptional_items', amountNative:1.522, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Televisionamento', normalizedCategory:'broadcasting', amountNative:9.810, disclosureLevel:'detailed' },
    { rawLabel:'Premiações e participações', normalizedCategory:'competition_bonus', amountNative:13.866, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:13.356, disclosureLevel:'detailed' },
    { rawLabel:'Camarote', normalizedCategory:'season_tickets', amountNative:5.543, disclosureLevel:'detailed' },
    { rawLabel:'Associados (sócio furacão)', normalizedCategory:'member_dues', amountNative:48.435, disclosureLevel:'detailed' },
    { rawLabel:'Loterias', normalizedCategory:'other_income', amountNative:2.354, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Arena', normalizedCategory:'stadium_other', amountNative:23.333, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:29.265, disclosureLevel:'detailed' },
    { rawLabel:'OTT - Rede furacão', normalizedCategory:'sponsorship_commercial', amountNative:1.090, disclosureLevel:'detailed' },
    { rawLabel:'Loja oficial', normalizedCategory:'sponsorship_commercial', amountNative:18.659, disclosureLevel:'detailed' },
    { rawLabel:'E-commerce', normalizedCategory:'sponsorship_commercial', amountNative:3.077, disclosureLevel:'detailed' },
    { rawLabel:'Lanchonetes', normalizedCategory:'stadium_other', amountNative:26.047, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:22.727, disclosureLevel:'detailed' },
    { rawLabel:'Escolas de futebol', normalizedCategory:'youth_football', amountNative:1.250, disclosureLevel:'detailed' },
    { rawLabel:'Choperia', normalizedCategory:'stadium_other', amountNative:7.569, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais', normalizedCategory:'other_income', amountNative:6.103, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e deduções da receita', normalizedCategory:'other_income', amountNative:-19.222, disclosureLevel:'detailed' },
    { rawLabel:'Receita com venda de atletas', normalizedCategory:'player_sales', amountNative:180.687, disclosureLevel:'detailed' },
    { rawLabel:'Receita com transações com atletas (empréstimos)', normalizedCategory:'player_sales', amountNative:22.614, disclosureLevel:'detailed' },
    { rawLabel:'Doações/bonificações', normalizedCategory:'exceptional_items', amountNative:0.103, disclosureLevel:'detailed' },
    { rawLabel:'Receitas judiciais', normalizedCategory:'exceptional_items', amountNative:32.267, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas não operacionais', normalizedCategory:'exceptional_items', amountNative:0.046, disclosureLevel:'detailed' },
  ],
};

const athleticoparanaenseBrExpenseLinesByYear = {
  2024: [
    // Nota 19 — Custos (Atividades comerciais: custo de mercadoria; Custos Com Atletas)
    { rawLabel:'Custo Mercadoria Vendida Escola Oficial', normalizedCategory:'admin_general_expense', amountNative:-1.388, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Loja', normalizedCategory:'admin_general_expense', amountNative:-8.749, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida E-Commerce', normalizedCategory:'admin_general_expense', amountNative:-1.448, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Lanchonetes', normalizedCategory:'admin_general_expense', amountNative:-8.806, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Choperia', normalizedCategory:'admin_general_expense', amountNative:-0.420, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Camarotes', normalizedCategory:'admin_general_expense', amountNative:-0.778, disclosureLevel:'detailed' },
    { rawLabel:'Custo das Operações de Jogos', normalizedCategory:'match_organisation_expense', amountNative:-16.896, disclosureLevel:'detailed' },
    { rawLabel:'Custo das Operações de Eventos', normalizedCategory:'admin_general_expense', amountNative:-3.085, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (Custos Com Atletas)', normalizedCategory:'wages_squad', amountNative:-107.629, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem (Custos Com Atletas)', normalizedCategory:'wages_squad', amountNative:-28.537, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com viagens (Custos Com Atletas)', normalizedCategory:'match_organisation_expense', amountNative:-18.838, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos (Custos Com Atletas)', normalizedCategory:'admin_general_expense', amountNative:-10.048, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações de atletas (Custos Com Atletas)', normalizedCategory:'player_amortisation', amountNative:-44.127, disclosureLevel:'detailed' },
    // Nota 20 — Despesas operacionais (personal/depreciación/generales NO deportivos)
    { rawLabel:'Salários (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-26.998, disclosureLevel:'detailed' },
    { rawLabel:'Premiações (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.894, disclosureLevel:'detailed' },
    { rawLabel:'Rescisões (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.003, disclosureLevel:'detailed' },
    { rawLabel:'Encargos sobre folha (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-3.655, disclosureLevel:'detailed' },
    { rawLabel:'Benefícios sociais sobre folha (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-5.166, disclosureLevel:'detailed' },
    { rawLabel:'Outros gastos com pessoal (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.226, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-4.773, disclosureLevel:'detailed' },
    { rawLabel:'Amortização (intangíveis gerais)', normalizedCategory:'other_amortisation', amountNative:-1.567, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-33.336, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-10.583, disclosureLevel:'detailed' },
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-9.329, disclosureLevel:'detailed' },
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-7.543, disclosureLevel:'detailed' },
    // Nota 21.2 — Despesas com transações de atletas (comisiones/intermediación, NO amortización)
    { rawLabel:'Repasse de Direitos Econômicos', normalizedCategory:'other_expenses', amountNative:-32.347, disclosureLevel:'detailed' },
    { rawLabel:'Comissões Sobre Transações Atletas', normalizedCategory:'other_expenses', amountNative:-14.737, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Diversas Referente a Direitos Atletas', normalizedCategory:'other_expenses', amountNative:-14.286, disclosureLevel:'detailed' },
    { rawLabel:'Intermediação Sobre Contrato de Atletas', normalizedCategory:'other_expenses', amountNative:-8.995, disclosureLevel:'detailed' },
    { rawLabel:'Empréstimos Atletas (despesa)', normalizedCategory:'other_expenses', amountNative:-3.766, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade (pago)', normalizedCategory:'other_expenses', amountNative:-2.186, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos federativos', normalizedCategory:'player_amortisation', amountNative:-19.326, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas com atletas', normalizedCategory:'other_expenses', amountNative:-0.701, disclosureLevel:'detailed' },
    // Resultado não operacional (Nota 22) + Resultado de equivalência patrimonial — no operativo/no
    // recurrente por la propia estructura de la DRE, ver comentario de cabecera.
    { rawLabel:'Despesas judiciais', normalizedCategory:'exceptional_items', amountNative:-3.117, disclosureLevel:'detailed' },
    { rawLabel:'Despesas indedutíveis', normalizedCategory:'exceptional_items', amountNative:-0.447, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas não operacionais', normalizedCategory:'exceptional_items', amountNative:-16.249, disclosureLevel:'detailed' },
    { rawLabel:'Resultado de equivalência patrimonial (CAP S/A)', normalizedCategory:'exceptional_items', amountNative:-65.277, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Custo Mercadoria Vendida Escola Oficial', normalizedCategory:'admin_general_expense', amountNative:-0.649, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Loja', normalizedCategory:'admin_general_expense', amountNative:-9.187, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida E-Commerce', normalizedCategory:'admin_general_expense', amountNative:-1.443, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Lanchonetes', normalizedCategory:'admin_general_expense', amountNative:-8.283, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Choperia', normalizedCategory:'admin_general_expense', amountNative:-2.890, disclosureLevel:'detailed' },
    { rawLabel:'Custo Mercadoria Vendida Camarotes', normalizedCategory:'admin_general_expense', amountNative:-0.736, disclosureLevel:'detailed' },
    { rawLabel:'Custo das Operações de Jogos', normalizedCategory:'match_organisation_expense', amountNative:-16.331, disclosureLevel:'detailed' },
    { rawLabel:'Custo das Operações de Eventos', normalizedCategory:'admin_general_expense', amountNative:-10.116, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (Custos Com Atletas)', normalizedCategory:'wages_squad', amountNative:-104.972, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem (Custos Com Atletas)', normalizedCategory:'wages_squad', amountNative:-37.922, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com viagens (Custos Com Atletas)', normalizedCategory:'match_organisation_expense', amountNative:-11.582, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos (Custos Com Atletas)', normalizedCategory:'admin_general_expense', amountNative:-9.295, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações de atletas (Custos Com Atletas)', normalizedCategory:'player_amortisation', amountNative:-45.796, disclosureLevel:'detailed' },
    { rawLabel:'Custo de Transmissão', normalizedCategory:'admin_general_expense', amountNative:-0.404, disclosureLevel:'detailed' },
    { rawLabel:'Salários (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-26.691, disclosureLevel:'detailed' },
    { rawLabel:'Premiações (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.960, disclosureLevel:'detailed' },
    { rawLabel:'Rescisões (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.008, disclosureLevel:'detailed' },
    { rawLabel:'Encargos sobre folha (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-4.085, disclosureLevel:'detailed' },
    { rawLabel:'Benefícios sociais sobre folha (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-6.661, disclosureLevel:'detailed' },
    { rawLabel:'Outros gastos com pessoal (Despesas com pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.244, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-6.760, disclosureLevel:'detailed' },
    { rawLabel:'Amortização (intangíveis gerais)', normalizedCategory:'other_amortisation', amountNative:-3.326, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-36.751, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-9.185, disclosureLevel:'detailed' },
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-3.781, disclosureLevel:'detailed' },
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-7.392, disclosureLevel:'detailed' },
    { rawLabel:'Repasse de Direitos Econômicos', normalizedCategory:'other_expenses', amountNative:-53.006, disclosureLevel:'detailed' },
    { rawLabel:'Comissões Sobre Transações Atletas', normalizedCategory:'other_expenses', amountNative:-8.103, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Diversas Referente a Direitos Atletas', normalizedCategory:'other_expenses', amountNative:-2.181, disclosureLevel:'detailed' },
    { rawLabel:'Intermediação Sobre Contrato de Atletas', normalizedCategory:'other_expenses', amountNative:-1.872, disclosureLevel:'detailed' },
    { rawLabel:'Empréstimos Atletas (despesa)', normalizedCategory:'other_expenses', amountNative:-4.417, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade (pago)', normalizedCategory:'other_expenses', amountNative:-1.755, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos federativos', normalizedCategory:'player_amortisation', amountNative:-29.863, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas com atletas', normalizedCategory:'other_expenses', amountNative:-0.927, disclosureLevel:'detailed' },
    { rawLabel:'Despesas judiciais', normalizedCategory:'exceptional_items', amountNative:-0.468, disclosureLevel:'detailed' },
    { rawLabel:'Despesas indedutíveis', normalizedCategory:'exceptional_items', amountNative:-0.197, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas não operacionais', normalizedCategory:'exceptional_items', amountNative:-0.424, disclosureLevel:'detailed' },
    { rawLabel:'Resultado de equivalência patrimonial (CAP S/A)', normalizedCategory:'exceptional_items', amountNative:-55.485, disclosureLevel:'detailed' },
  ],
};

const athleticoparanaenseBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'athleticoparanaense-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (0,356) + não circulante
    // (0,162), Nota 13. cash = 'Disponibilidades' Controladora, Nota 5.
    grossDebt:0.518, cash:128.443,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Resultado financeiro' (Nota 23), Controladora, ya neto de intereses + variação
    // cambial (el documento no los separa en 2 campos, se carga el neto tal cual lo reporta).
    netInterest:11.586, tax:0,
    // officialTotalRevenue = suma COMPLETA de revenueLines (548,101 M BRL) — el motor genérico
    // (computeYearGeneric) suma `revenue` sin excluir ninguna categoría. officialTotalExpenses =
    // 451,166 M BRL = |expenses + nonCash| del motor (wages + otherExpenses + amortizaciones/
    // depreciación), EXCLUYENDO exceptional_items (el motor lo suma aparte, en operatingProfit) —
    // mismo criterio que Botafogo. officialPAT = 'Superávit líquido' impreso (23,439), incluye todo.
    officialTotalRevenue:548.101, officialTotalExpenses:451.166, officialPAT:23.439,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'athleticoparanaense-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = 'Empréstimos e financiamentos' Controladora, circulante (0,130) + não circulante
    // (0), Nota 13. cash = 'Disponibilidades' Controladora, Nota 5.
    grossDebt:0.130, cash:48.268,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:17.039, tax:0,
    // 2025 fue DÉFICIT real (-58,134 M BRL) — primer año de pérdida desde que hay balances de este
    // club cargados. officialTotalRevenue = 448,979 M BRL (suma completa). officialTotalExpenses =
    // 467,574 M BRL (excl. exceptional_items, mismo criterio que 2024). officialPAT = 'Déficit
    // líquido' impreso (-58,134).
    officialTotalRevenue:448.979, officialTotalExpenses:467.574, officialPAT:-58.134,
  },
};

const athleticoparanaenseBrPresupuestoOverlayByYear = {};

const athleticoparanaenseBrPasesData = [];
const athleticoparanaenseBrResultadosData = {};
const athleticoparanaenseBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['athleticoparanaense-br'] = {
  revenueLinesByYear: athleticoparanaenseBrRevenueLinesByYear, expenseLinesByYear: athleticoparanaenseBrExpenseLinesByYear,
  fiscalYearMeta: athleticoparanaenseBrFiscalYearMeta, pasesData: athleticoparanaenseBrPasesData,
  resultadosData: athleticoparanaenseBrResultadosData, titulosData: athleticoparanaenseBrTitulosData,
  presupuestoOverlayByYear: athleticoparanaenseBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'athleticoparanaense-br-demonstracoes-2024': {
    id:'athleticoparanaense-br-demonstracoes-2024', clubId:'athleticoparanaense-br',
    title:'Demonstrações Financeiras 2024, Club Athletico Paranaense (Controladora e Consolidado, Exercícios Findos em 31 de Dezembro de 2024 e 2023)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://static.poder360.com.br/2025/04/demonstracoes-financeiras-2024-athletico-paranaense.pdf',
    note:'PDF oficial (texto nativo), bajado de un mirror en static.poder360.com.br (portal de noticias) porque la URL directa con acentos en static.athletico.com.br dio 404. Auditado por BDO RCS Auditores Independentes, sin salvedades (con un párrafo de "Ênfase" sobre la controlada CAP S/A, titular del Estádio Arena da Baixada, que depende de aportes de la controladora como única fuente de caja). Se cargó la columna CONTROLADORA, no la Consolidado (que suma la CAP S/A). Transcripción completa en "Clubes/Brasil/Athletico Paranaense/demonstracoes-financeiras-2024.md". Firmado por el presidente Mario Celso Petraglia. Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923).',
  },
  'athleticoparanaense-br-demonstracoes-2025': {
    id:'athleticoparanaense-br-demonstracoes-2025', clubId:'athleticoparanaense-br',
    title:'Demonstrações Financeiras 2025, Club Athletico Paranaense (Controladora e Consolidado, Exercícios Findos em 31 de Dezembro de 2025 e 2024)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://static.athletico.com.br/wp-content/uploads/demonstracoes-financeiras-2025.pdf',
    note:'PDF oficial (texto nativo), descargado del sitio oficial athletico.com.br. Auditado por BDO RCS Auditores Independentes. Se cargó la columna CONTROLADORA, no la Consolidado. Transcripción completa en "Clubes/Brasil/Athletico Paranaense/demonstracoes-financeiras-2025.md". Firmado por el presidente Mario Celso Petraglia. 2025 fue el primer ejercicio de DÉFICIT real (R$58,134 millones) desde que hay balances de este club cargados al sitio, explicado principalmente por la caída de "Receita com venda de atletas" (de R$272,268 M en 2024 a R$180,687 M) y un resultado negativo por equivalencia patrimonial de la CAP S/A. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024). Pendiente: ejercicios 2020-2023 confirmados como existentes en static.athletico.com.br pero con problemas de encoding de acentos en la URL — ver fuentes/Brasil/Athletico Paranaense.md.',
  },
});

gestionesByClub['athleticoparanaense-br'] = {
  // Mario Celso Petraglia firma como Presidente los 2 ejercicios cargados (2024 y 2025), pero
  // ningún documento confirma fecha de elección/mandato con la profundidad que exige
  // club-data-mapping SKILL.md sección 7 — entrada mínima para que el selector "Por gestión" no
  // rompa, mismo criterio que Botafogo/Operário Ferroviário.
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (firma 2024-2025: Mario Celso Petraglia, Presidente)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['athleticoparanaense-br'] = null; // no se encontró una cifra de "sócio furacão" en ninguno de los 2 documentos
