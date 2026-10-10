// ============================================================================
// data/ferroviaria-br-data.js — Ferroviária Futebol S.A. (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Ferroviaria/balanco-2010.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "ferroviaria-br" — slug de "Ferroviaria" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Ferroviária Futebol S.A." — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Fe
//   displayName        ok        "Ferroviaria" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2010 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2010-12-31" — año del ejercicio + mes de cierre (contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): una sola sociedad (CNPJ 06.020.811/0001-30, Fe
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2010-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2010-12-31 = 1.6662 (PTAX de cierre (venda) del Banco Central do Brasil al 2010-12-31)
//   sourceId           ok        "ferroviaria-br-balanco-2010" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2010 (br-serieA): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2010 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2010: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2010-12-31","sourceId":"ferroviaria-br-balanco-2010"}
// ============================================================================

const ferroviariabrRevenueLinesByYear = {
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:5.532582, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:11.163, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.415418, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:0.745853, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Cessão temporária dos atletas', normalizedCategory:'player_sales', amountNative:2.544036, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Cessão definitiva dos atletas', normalizedCategory:'player_sales', amountNative:0.552391, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_sales', amountNative:16.249599, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.8
    { rawLabel:'Sócio torcedor', normalizedCategory:'member_dues', amountNative:0.006822, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.9
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:0.769, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.15577, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'Impostos incidentes sobre a receita', normalizedCategory:'other_income', amountNative:-1.572101, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:10.868006, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:19.398966, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Direito de gestão comercial da arena', normalizedCategory:'stadium_other', amountNative:3.75, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:2.062659, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Auxílio financeiro', normalizedCategory:'other_income', amountNative:4.205103, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.97
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:0.143336, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Cessão temporária dos atletas', normalizedCategory:'player_sales', amountNative:4.37511, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:4.3, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Sócio torcedor', normalizedCategory:'member_dues', amountNative:0.201856, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.9
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:1.497, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.85
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.815142, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
    { rawLabel:'Impostos incidentes sobre a receita', normalizedCategory:'other_income', amountNative:-3.481046, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'Receitas de atividades desportivas profissionais', normalizedCategory:'lump_football_operations', amountNative:0.576146, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Receitas de publicidade e patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:1.0221, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'( - ) Impostos', normalizedCategory:'other_income', amountNative:-0.016726, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
  ],
};
const ferroviariabrExpenseLinesByYear = {
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) Custos operacionais', normalizedCategory:'lump_football_operations_expense', amountNative:-27.035536, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-5.09485, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Com pessoal', normalizedCategory:'admin_general_expense', amountNative:-1.864064, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-3.995818, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Com materiais', normalizedCategory:'admin_general_expense', amountNative:-0.804482, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.97
    { rawLabel:'Alojamento e moradia', normalizedCategory:'admin_general_expense', amountNative:-1.188523, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:0.732267, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-0.850559, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-21.144215, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Direito de uso de imagem', normalizedCategory:'wages_squad', amountNative:-15.081833, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Premiações', normalizedCategory:'wages_squad', amountNative:-2.565067, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-2.265897, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.97
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-2.028162, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Com refeições', normalizedCategory:'match_organisation_expense', amountNative:-0.543584, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.152973, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'Taxas de federação e confederação', normalizedCategory:'match_organisation_expense', amountNative:-0.191408, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Agenciamento de atletas', normalizedCategory:'other_expenses', amountNative:-1.345568, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Manutenção e conservação', normalizedCategory:'admin_general_expense', amountNative:-0.140431, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'Moradia', normalizedCategory:'match_organisation_expense', amountNative:-0.254096, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'Mercadorias vendidas', normalizedCategory:'admin_general_expense', amountNative:0.05299, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Com atletas (empréstimos, luvas etc.)', normalizedCategory:'wages_squad', amountNative:-1.00573, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Comissão', normalizedCategory:'other_expenses', amountNative:-0.302405, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.28083, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Amortização de atletas formados', normalizedCategory:'player_amortisation', amountNative:-0.139314, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Outros custos', normalizedCategory:'other_expenses', amountNative:-0.289399, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-3.645881, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Com pessoal', normalizedCategory:'admin_general_expense', amountNative:-1.824151, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Gastos com atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-4.535951, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'Com materiais', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.97
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.799397, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-1.314638, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-1.065365, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
  ],
  2010: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas com pessoal profissional', normalizedCategory:'wages_squad', amountNative:-0.16191, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.91
    { rawLabel:'Despesas administrativa profissional', normalizedCategory:'admin_general_expense', amountNative:-0.237178, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.003097, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.019683, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.92
    { rawLabel:'Serviços do departamento de esportes profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-1.196469, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Serviços do departamento de esportes para outras categorias', normalizedCategory:'youth_other_sports_expense', amountNative:-0.024495, disclosureLevel:'aggregated' }, // pág. 5, Claude 0.8
  ],
};
const ferroviariabrFiscalYearMeta = {
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'ferroviaria-br-demonstracoes-financeiras-2023-fpf',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.787328, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.321606},
      {label:'Despesas financeiras', value:-1.108934},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'(-) Custos operacionais', lado:'expense', importe:27.035536, motivo:'Claude 2026-10-09: \'(-) Custos operacionais\' es el costo de la actividad futbolística de la SAF sin desglose en el estado; la categoría \'sin desglosar\' es la que corresponde (la nota lo abre, pero sin reintento pago)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:37.56237, officialTotalExpenses:40.101565, officialPAT:-3.326523,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'ferroviaria-br-demonstracoes-financeiras-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.522247, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.107707},
      {label:'Despesas financeiras', value:-0.629954},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:48.136132, officialTotalExpenses:62.863305, officialPAT:-15.24942,
  },
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.196.469,33. Claude 2026-10-09: el costo está impreso entre paréntesis (resta de la receita) y el resto de los gastos en positivo; la lectura 5 invertía su signo. Cuenta: Receitas líquidas 1.581.519,76 (L162) - Custos 1.220.963,91 (L166) - Despesas Operacionais 402.186,01 (L172) - Serviços de terceiros 19.682,75 (L174) - Despesas financeiras 12.921,96 (L173) = -74.234,87 (L177).
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 24.494,58. Claude 2026-10-09: el costo está impreso entre paréntesis (resta de la receita) y el resto de los gastos en positivo; la lectura 5 invertía su signo. Cuenta: Receitas líquidas 1.581.519,76 (L162) - Custos 1.220.963,91 (L166) - Despesas Operacionais 402.186,01 (L172) - Serviços de terceiros 19.682,75 (L174) - Despesas financeiras 12.921,96 (L173) = -74.234,87 (L177).
  2010: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2025): Cuotas Sociales, Estadio, Televisión, Premios por competencias, Venta de Jugadores
    incluidoEn:{ member_dues:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, competition_bonus:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2010-12-31',
    sourceId:'ferroviaria-br-balanco-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.012922, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas de atividades desportivas profissionais', lado:'revenue', importe:0.576146, motivo:'el documento no desglosa este renglón'},
      {renglon:'Serviços do departamento de esportes profissional', lado:'expense', importe:1.196469, motivo:'Claude 2026-10-09: Custo dos Serviços Prestados del departamento profesional: bolsón del costo del fútbol sin desglose (L164)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.58152, officialTotalExpenses:1.642833, officialPAT:-0.074235,
  },
};
const ferroviariabrPresupuestoOverlayByYear = {};

const ferroviariabrPasesData = [];
const ferroviariabrResultadosData = {};
const ferroviariabrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['ferroviaria-br'] = {
  revenueLinesByYear: ferroviariabrRevenueLinesByYear, expenseLinesByYear: ferroviariabrExpenseLinesByYear,
  fiscalYearMeta: ferroviariabrFiscalYearMeta, pasesData: ferroviariabrPasesData,
  resultadosData: ferroviariabrResultadosData, titulosData: ferroviariabrTitulosData,
  presupuestoOverlayByYear: ferroviariabrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'ferroviaria-br-demonstracoes-financeiras-2023-fpf': {
    id:'ferroviaria-br-demonstracoes-financeiras-2023-fpf', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — demonstracoes-financeiras-2023-fpf (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2023-fpf.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-demonstracoes-financeiras-2025': {
    id:'ferroviaria-br-demonstracoes-financeiras-2025', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — demonstracoes-financeiras-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-balanco-2010': {
    id:'ferroviaria-br-balanco-2010', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2010 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['ferroviaria-br'] = null;
