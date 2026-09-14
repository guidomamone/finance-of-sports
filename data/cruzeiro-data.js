// ============================================================================
// data/cruzeiro-data.js — Cruzeiro Esporte Clube SAF (Belo Horizonte, MG, Brasil).
// 1 ejercicio cargado: 2025 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12/2025 — ver
// clubs.js, fiscalYearStart:'01-01', isCalendarYearClub() en js/finanzas-calc.js).
//
// Fuente: "Informativo Financeiro 2025" (Demonstrações Financeiras), exercícios findos em
// 31/12/2025 e 2024, bajado del bucket S3 propio del club
// (cruzeiro-website-project-documents.s3.us-east-1.amazonaws.com). PDF con texto nativo,
// transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2025.md. A diferencia de
// Botafogo, este documento NO separa Controladora/Consolidado — una sola columna de valores.
//
// ESCALA: valores originales "em milhares de reais" (miles de reales), acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Grêmio/Botafogo).
//
// ESTRUCTURA REAL DEL DOCUMENTO: la DRE tiene 2 bloques de revenue/expense:
// 1) "RECEITA OPERACIONAL LIQUIDA" (599.175, detalle en Nota 26) − "Custo das atividades esportivas"
//    (-680.223, Nota 27) − "Despesas gerais e administrativas" (-10.224, Nota 28) + "Outras
//    receitas/despesas" (20.867, Nota 29, con líneas de venta de jugadores adentro) = "PREJUÍZO ANTES
//    DO RESULTADO FINANCEIRO" (-70.405).
// 2) Resultado financeiro líquido (Nota 30, -44.495) → "PREJUÍZO (LUCRO) DO EXERCÍCIO" (-114.900).
// Ningún subtotal intermedio se cargó como línea propia (serían duplicados).
//
// Categorización:
// - Nota 26 (revenue): 'Bilheteria' -> matchday_competition; 'Programa sócio torcedor' ->
//   member_dues; 'Patrocínio'/'Publicidade'/'Royalties e licenciamento' -> sponsorship_commercial;
//   'Direitos de transmissão fixos e premiações por performance' -> broadcasting (el documento
//   combina TV + bonos de rendimiento en UNA sola línea por competencia, sin desglosar cada
//   componente — se mantiene entera bajo broadcasting, es lo que MÁS pesa conceptualmente en esta
//   línea según el propio nombre); 'Outros' -> other_income; 'Impostos e contribuições/Vendas
//   canceladas' (deducción) -> other_income.
// - Sub-nota (iii) 'Mecanismo de solidariedade e outros' SE PROMOVIÓ a 3 líneas de primer nivel
//   (mismo criterio que Racing, club-data-mapping SKILL.md sección 1: cada sub-ítem tiene categoría
//   real distinta) — 'Mecanismo de solidariedade' (recebido) -> youth_football; 'Cessão temporária'
//   -> player_sales; 'Outros' (de esa sub-nota) -> other_income.
// - Nota 27 (Custo das atividades esportivas): 'Salários, direito de imagem, encargos e benefícios'
//   -> wages_squad; 'Amortizações do intangível' -> player_amortisation; 'Baixa do ativo intangível'
//   -> player_impairment (deterioro, distinto de la amortización regular); 'Custos diretos e
//   indiretos com jogos'/'Custos com viagens e hospedagens'/'Custos com Fretamentos e
//   Passagens'/'Custos com alimentação'/'Direito de Arena'/'Manutenção campos de futebol'/'Serviço de
//   segurança e vigilância' -> match_organisation_expense (todos costos operativos de competir);
//   'Serviços de assessoria e consultoria' -> admin_general_expense; 'Depreciação' -> depreciation;
//   'Manutenção geral' -> admin_general_expense (mantenimiento de instalaciones más amplio que solo
//   canchas); 'Taxas de legalização de jogadores'/'Outros custos' -> other_expenses.
// - Nota 28 (Despesas G&A): 'Salários, encargos e benefícios'/'Serviços contratados de
//   terceiros'/'Despesas Comerciais'/'Outros' -> admin_general_expense; 'Amortizações' ->
//   other_amortisation (intangibles administrativos, distinto de la amortización de pases de la
//   Nota 27).
// - Nota 29 (Outras receitas/despesas, debajo del resultado operativo principal): 'Receita de
//   transferência de atletas' -> player_sales; 'Baixa do custo de atletas pela venda de direitos
//   intangíveis' -> player_amortisation (costo contable asociado a la venta, mismo criterio que
//   Botafogo Nota 24.3); 'Outras receitas' -> other_income; 'Outras despesas' -> other_expenses.
//
// Verificación (Node, antes de cargar): revenueLines suma EXACTO 627.899 M BRL; expenseLines suma
// EXACTO -698.305 M BRL (con un redondeo interno de ~R$1.000 sobre una base de cientos de millones,
// el propio documento también arrastra ese mismo redondeo entre sus notas — ver Nota 27, suma propia
// de sus 15 líneas da 680.224 contra el 680.223 impreso, diferencia de R$1.000 irrelevante);
// revenue+expenses = -70.406 M BRL ≈ "PREJUÍZO ANTES DO RESULTADO FINANCEIRO" impreso (-70.405,
// misma diferencia de redondeo); + netInterest (-44.495, Nota 30) = -114.901 ≈ "PREJUÍZO DO
// EXERCÍCIO" impreso (-114.900) — dentro de la tolerancia de verifyTieOuts() (<0.01 M = R$10.000).
// officialPAT se cargó con el número EXACTO impreso (-114.900), no la reconstrucción propia.
//
// grossDebt = "Títulos emitidos" circulante (1.801) + não circulante (10.844) = 12.645 M BRL — es la
// única línea de pasivo que representa deuda financiera clásica (el resto del pasivo de Cruzeiro son
// obrigações operativas/con partes relacionadas: luvas a pagar, contas a pagar por transferencias,
// "Auxílio financeiro Cruzeiro Associação", etc., que NO son deuda financiera en el sentido
// tradicional). cash = "Caixa e equivalentes de caixa" (0.702 M BRL) — NO se sumaron "Aplicações
// financeiras e recursos vinculados" (2.700), mismo criterio estricto de "solo caja y bancos" que el
// resto del sitio.
//
// FX: BRL/USD PTAX de cierre 31/12/2025 = R$5,5024 (venda) — investigado externamente (el BCB no
// calculó una PTAX nueva el 31/12, aplicó la regla especial de usar el boletín del 30/12/2025, mismo
// valor). El documento no declara un tipo de cambio propio.
//
// Gestión: no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
// preside la SAF Cruzeiro — gestionId queda con una entrada mínima "sin confirmar", mismo criterio
// que Botafogo.
// ============================================================================

const cruzeiroRevenueLinesByYear = {
  2025: [
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:69.430, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio torcedor', normalizedCategory:'member_dues', amountNative:51.008, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:280.010, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:26.403, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão fixos e premiações por performance', normalizedCategory:'broadcasting', amountNative:176.486, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:1.855, disclosureLevel:'detailed' },
    { rawLabel:'Cessão temporária (empréstimo de atletas)', normalizedCategory:'player_sales', amountNative:1.449, disclosureLevel:'detailed' },
    { rawLabel:'Outros (mecanismo de solidariedade e outros)', normalizedCategory:'other_income', amountNative:3.596, disclosureLevel:'detailed' },
    { rawLabel:'Royalties e licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:25.470, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:13.137, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições / Vendas canceladas', normalizedCategory:'other_income', amountNative:-49.669, disclosureLevel:'detailed' },
    { rawLabel:'Receita de transferência de atletas', normalizedCategory:'player_sales', amountNative:28.364, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (Nota 29)', normalizedCategory:'other_income', amountNative:0.360, disclosureLevel:'detailed' },
  ],
};

const cruzeiroExpenseLinesByYear = {
  2025: [
    { rawLabel:'Salários, direito de imagem, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-362.276, disclosureLevel:'detailed' },
    { rawLabel:'Custos diretos e indiretos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-28.384, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações do intangível (atletas)', normalizedCategory:'player_amortisation', amountNative:-186.647, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de assessoria e consultoria', normalizedCategory:'admin_general_expense', amountNative:-2.593, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do ativo intangível (Nota 27)', normalizedCategory:'player_impairment', amountNative:-5.704, disclosureLevel:'detailed' },
    { rawLabel:'Custos com viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-11.290, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Fretamentos e Passagens', normalizedCategory:'match_organisation_expense', amountNative:-18.288, disclosureLevel:'detailed' },
    { rawLabel:'Custos com alimentação', normalizedCategory:'match_organisation_expense', amountNative:-8.053, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-5.459, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Arena (custo)', normalizedCategory:'match_organisation_expense', amountNative:-8.904, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção campos de futebol', normalizedCategory:'match_organisation_expense', amountNative:-1.666, disclosureLevel:'detailed' },
    { rawLabel:'Serviço de segurança e vigilância', normalizedCategory:'match_organisation_expense', amountNative:-9.249, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção geral', normalizedCategory:'admin_general_expense', amountNative:-26.552, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de legalização de jogadores', normalizedCategory:'other_expenses', amountNative:-0.798, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (atividades esportivas)', normalizedCategory:'other_expenses', amountNative:-4.361, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-4.601, disclosureLevel:'detailed' },
    { rawLabel:'Serviços contratados de terceiros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.587, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (G&A)', normalizedCategory:'other_amortisation', amountNative:-1.608, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Comerciais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.367, disclosureLevel:'detailed' },
    { rawLabel:'Outros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-3.061, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do custo de atletas pela venda de direitos intangíveis', normalizedCategory:'player_amortisation', amountNative:-7.324, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (Nota 29)', normalizedCategory:'other_expenses', amountNative:-0.533, disclosureLevel:'detailed' },
  ],
};

const cruzeiroFiscalYearMeta = {
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'cruzeiro-informativo-financeiro-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Títulos emitidos" circulante (1.801) + não circulante (10.844) — única línea de
    // deuda financiera clásica del balance (el resto son obrigações operativas/con partes
    // relacionadas). cash = "Caixa e equivalentes de caixa" (Nota 3), sin sumar aplicações
    // financeiras.
    grossDebt:12.645, cash:0.702,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultado financeiro líquido" (Nota 30): Receitas financeiras 8.068 - Despesas
    // financeiras 52.563.
    netInterest:-44.495, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
    // (627.899 / 698.305 M BRL) — el documento no imprime un total único de cada lado en una sola
    // fila (la DRE está en 2 bloques, ver comentario de cabecera). officialPAT = "PREJUÍZO DO
    // EXERCÍCIO" impreso, el número EXACTO del documento (no la reconstrucción propia, que arrastra
    // ~R$1.000 de redondeo del propio documento, ver comentario de cabecera).
    officialTotalRevenue:627.899, officialTotalExpenses:698.305, officialPAT:-114.900,
  },
};

const cruzeiroPresupuestoOverlayByYear = {};

const cruzeiroPasesData = [];
const cruzeiroResultadosData = {};
const cruzeiroTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.cruzeiro = {
  revenueLinesByYear: cruzeiroRevenueLinesByYear, expenseLinesByYear: cruzeiroExpenseLinesByYear,
  fiscalYearMeta: cruzeiroFiscalYearMeta, pasesData: cruzeiroPasesData,
  resultadosData: cruzeiroResultadosData, titulosData: cruzeiroTitulosData,
  presupuestoOverlayByYear: cruzeiroPresupuestoOverlayByYear,
};


Object.assign(sources, {
  'cruzeiro-informativo-financeiro-2025': {
      id:'cruzeiro-informativo-financeiro-2025', clubId:'cruzeiro',
      title:'Informativo Financeiro (Demonstrações Financeiras) da SAF Cruzeiro, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (52 páginas, texto nativo), bajado del bucket S3 propio del club (cruzeiro-website-project-documents.s3.us-east-1.amazonaws.com). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2025.md. 2025 fue un ejercicio de DÉFICIT real (Prejuízo de R$114,900 mil), aunque menor que el déficit de 2024 (R$169,908 mil) del mismo documento comparativo. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024), investigado externamente. El club tiene también informativo-financeiro-2022.pdf/2023.pdf/2024.pdf descargados pero no cargados esta sesión (se priorizó "widen clubs" por sobre más años del mismo club).',
    },
});

gestionesByClub.cruzeiro = {
    sinconfirmar: { nombre:'SAF Cruzeiro (gestión no confirmada en detalle)', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.cruzeiro = null;
