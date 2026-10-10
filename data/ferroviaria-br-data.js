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
  // 2012: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Renda de jogos', normalizedCategory:'matchday_competition', amountNative:0.528637, disclosureLevel:'aggregated' }, // pág. 6, Claude 0.88
    { rawLabel:'Venda de atletas', normalizedCategory:'player_sales', amountNative:0.217007, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Cotas de TV Campeonato Paulista Série A-2', normalizedCategory:'broadcasting', amountNative:0.106, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Doação de Materiais esportivos', normalizedCategory:'other_income', amountNative:0.067626, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Vendas líquidas de produtos', normalizedCategory:'sponsorship_commercial', amountNative:0.050868, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.96
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:1.061, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Recuperação de despesas', normalizedCategory:'other_income', amountNative:0.229608, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Contratos de parcerias', normalizedCategory:'sponsorship_commercial', amountNative:0.909721, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'Com doação', normalizedCategory:'other_income', amountNative:1, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.105254, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Aviso prévio descontado', normalizedCategory:'other_income', amountNative:0.0004, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.9
    { rawLabel:'deduções das receitas', normalizedCategory:'other_income', amountNative:-0.014119, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2013-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2013-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'Rendas de Jogos', normalizedCategory:'matchday_competition', amountNative:0.134989, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Cotas de TV Camp Paulista Séria A-2', normalizedCategory:'broadcasting', amountNative:0.14, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.03742, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Mercadorias c/Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.038116, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:2.262274, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Contratos de Parcerias', normalizedCategory:'sponsorship_commercial', amountNative:0.188, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.032752, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:1.1, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Patrocínios e Doações', normalizedCategory:'sponsorship_commercial', amountNative:0.04, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Multa Contratual', normalizedCategory:'other_income', amountNative:0.0001, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2014-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2014-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'Rendas de Jogos', normalizedCategory:'matchday_competition', amountNative:0.15099, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Cotas de TV Camp Paulista Séria A-2', normalizedCategory:'broadcasting', amountNative:0.135, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Venda de Atletas', normalizedCategory:'player_sales', amountNative:0.45, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.021055, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Mercadorias c/Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.054708, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Patrocinios', normalizedCategory:'sponsorship_commercial', amountNative:2.83474, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Contratos de Parcerias', normalizedCategory:'sponsorship_commercial', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.491249, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:1.314316, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.009106, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'AVlso Prévio Descontado', normalizedCategory:'other_income', amountNative:0.0081, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.91
    { rawLabel:'Multa Contratual', normalizedCategory:'other_income', amountNative:0.000836, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
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
  2012: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.360339, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Depreciações e amortizações', normalizedCategory:'depreciation', amountNative:-0.385642, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.136093, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.051021, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.92
    { rawLabel:'Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.014422, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Com atividade esportiva - Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-1.834031, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Com pessoal - Atletas Profissionais', normalizedCategory:'wages_squad', amountNative:-1.406851, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Com mercadorias', normalizedCategory:'admin_general_expense', amountNative:-0.032323, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'CUSTOS-Formação de Atletas', normalizedCategory:'youth_other_sports_expense', amountNative:-0.096035, disclosureLevel:'aggregated' }, // pág. 6, precedente
  ],
  2013: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Pis', normalizedCategory:'admin_general_expense', amountNative:-0.000631, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Cofins', normalizedCategory:'admin_general_expense', amountNative:-0.002905, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Icms', normalizedCategory:'admin_general_expense', amountNative:-0.006861, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.065166, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.008348, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Taxas Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.109139, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Segurança e Vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-0.028902, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'Inss s/Renda de Jogos', normalizedCategory:'admin_general_expense', amountNative:-0.000799, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Cotas e Patrocinios', normalizedCategory:'admin_general_expense', amountNative:-0.04105, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Ingressos', normalizedCategory:'match_organisation_expense', amountNative:-0.01129, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Combustiveis e Lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.026195, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Inss s/Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.004999, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Exame Anti-Doping', normalizedCategory:'match_organisation_expense', amountNative:-0.024639, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços Prest p/Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.459735, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-1.116724, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Vistoria em Estadio', normalizedCategory:'match_organisation_expense', amountNative:-0.000045, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Locação de Estadio', normalizedCategory:'match_organisation_expense', amountNative:-0.013686, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.894654, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.159631, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.009425, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.08418, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.006946, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.053869, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.087507, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Fgts Rescisório', normalizedCategory:'wages_squad', amountNative:-0.004555, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Premios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.06405, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Academia', normalizedCategory:'admin_general_expense', amountNative:-0.004652, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Agua Mineral', normalizedCategory:'match_organisation_expense', amountNative:-0.002619, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.228695, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.080656, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.010007, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.030698, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-0.111946, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.011598, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.028415, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'Custo Formação Atleta', normalizedCategory:'youth_other_sports_expense', amountNative:-0.314356, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Estoque Inicial', normalizedCategory:'other_expenses', amountNative:-0.874626, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Compras Mercadorias a Prazo', normalizedCategory:'admin_general_expense', amountNative:-0.012494, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'(-) Estoque Final', normalizedCategory:'other_expenses', amountNative:0.858242, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'(-) Recuperação Cofins', normalizedCategory:'admin_general_expense', amountNative:0.001328, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'(-) Recuperação Pis', normalizedCategory:'admin_general_expense', amountNative:0.000288, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.91
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.083438, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.022276, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.007494, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.006419, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.01136, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.002479, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.0016, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.018285, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.003535, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.001255, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.005311, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.001468, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Fgts Rescisorio', normalizedCategory:'wages_squad', amountNative:-0.003903, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.000534, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.18458, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.027474, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas Diversas', normalizedCategory:'other_expenses', amountNative:-0.00013, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.031671, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.005757, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Manutenção, Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.028779, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.9
    { rawLabel:'Combustiveis', normalizedCategory:'admin_general_expense', amountNative:-0.023026, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Propaganda e Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.0127, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Provedor de Internet', normalizedCategory:'admin_general_expense', amountNative:-0.000771, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.002001, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas com Ativo Fixo', normalizedCategory:'admin_general_expense', amountNative:-0.00698, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Contingencias Tributarias', normalizedCategory:'admin_general_expense', amountNative:-0.095881, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.9
    { rawLabel:'Condominio', normalizedCategory:'admin_general_expense', amountNative:-0.00549, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-0.04268, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Materias de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.000502, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Medicamentos e Mat.Medicos e Cirurgicos', normalizedCategory:'admin_general_expense', amountNative:-0.002314, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.000388, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.020746, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.071669, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.002, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.00687, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.001737, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Manutenção e Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.01232, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-0.004235, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.000291, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.00287, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.001826, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.005302, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.01474, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Seguro de Vida', normalizedCategory:'admin_general_expense', amountNative:-0.007995, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Impressos e Materiais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.002477, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.00174, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.004742, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Material de Cozinha e Copa', normalizedCategory:'admin_general_expense', amountNative:-0.000154, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.00333, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impressos e Matriais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.000628, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Honorarios Contabeis,Adv e de Auditorias', normalizedCategory:'admin_general_expense', amountNative:-0.069348, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Baixa de Imobilizado', normalizedCategory:'other_expenses', amountNative:-0.00565, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.95
  ],
  2014: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Pis', normalizedCategory:'admin_general_expense', amountNative:-0.007425, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Cofins', normalizedCategory:'admin_general_expense', amountNative:-0.0342, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Pis', normalizedCategory:'admin_general_expense', amountNative:-0.000903, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Cofins', normalizedCategory:'admin_general_expense', amountNative:-0.004158, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Icms', normalizedCategory:'admin_general_expense', amountNative:-0.009847, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.066673, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.022718, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Taxas Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.080286, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Segurança e Vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-0.047088, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'Inss s/Renda de Jogos', normalizedCategory:'admin_general_expense', amountNative:-0.000318, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Patrocinios', normalizedCategory:'admin_general_expense', amountNative:-0.0484, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Ingressos', normalizedCategory:'match_organisation_expense', amountNative:-0.009412, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Manutenção, Conservação Estadio', normalizedCategory:'admin_general_expense', amountNative:-0.025421, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Combustíveis e Lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.020423, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Inss s/Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.005359, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Exame Anti-Doping', normalizedCategory:'match_organisation_expense', amountNative:-0.026775, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços Prest p/Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.692835, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-1.085904, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Locação de Estadio', normalizedCategory:'match_organisation_expense', amountNative:-0.039388, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Cotas de TV', normalizedCategory:'admin_general_expense', amountNative:-0.00675, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss/Seguro Torcedor FPF', normalizedCategory:'match_organisation_expense', amountNative:-0.008255, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-1.02087, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.111479, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.004019, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.09096, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.010368, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.053465, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.092603, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Fgts Rescisório', normalizedCategory:'wages_squad', amountNative:-0.003446, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Premios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.104625, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Academia', normalizedCategory:'admin_general_expense', amountNative:-0.016219, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Agua Mineral', normalizedCategory:'match_organisation_expense', amountNative:-0.010569, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.248847, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.108073, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.008247, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.179078, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-0.109038, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.011433, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.085612, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'Contingencias Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.143289, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Compras Mercadorias a Prazo', normalizedCategory:'admin_general_expense', amountNative:-0.038096, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'(-) Recuperação Cofins', normalizedCategory:'admin_general_expense', amountNative:0.002896, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'(-) Recuperação Pis', normalizedCategory:'admin_general_expense', amountNative:0.000619, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.91
    { rawLabel:'Custo das Mercadorias Vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.00579, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'(-) Recuperação de Icms', normalizedCategory:'admin_general_expense', amountNative:0.006857, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.91
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.101669, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.014014, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.009415, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.004376, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.009927, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Fgts Rescisorio', normalizedCategory:'wages_squad', amountNative:-0.006719, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.001038, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.001241, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.013303, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.001912, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.001386, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.005668, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.001245, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas com Ativo Fixo', normalizedCategory:'admin_general_expense', amountNative:-0.003662, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Assessoria Contábil/Tributaria/Advocatic', normalizedCategory:'admin_general_expense', amountNative:-0.079033, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Contingencias Cíveis', normalizedCategory:'admin_general_expense', amountNative:-0.185211, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Contingencias Tributarias', normalizedCategory:'admin_general_expense', amountNative:-0.371405, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.9
    { rawLabel:'Despesas pelo uso da Marca', normalizedCategory:'admin_general_expense', amountNative:-0.051701, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas Indedutíveis', normalizedCategory:'other_expenses', amountNative:-0.0168, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.001544, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Medicamentos e Mat Medicos e Cirurgicos', normalizedCategory:'admin_general_expense', amountNative:-0.000338, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Servipos prestados p/Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.002819, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.03, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.033747, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas Legais e Judiciais', normalizedCategory:'admin_general_expense', amountNative:-0.060074, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.000448, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.001591, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Manutenção, Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.025367, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.9
    { rawLabel:'Publicações', normalizedCategory:'admin_general_expense', amountNative:-0.00024, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.046114, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Propaganda e Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.032493, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Provedor de Internet', normalizedCategory:'admin_general_expense', amountNative:-0.006102, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Material de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.000057, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Condominio', normalizedCategory:'admin_general_expense', amountNative:-0.004508, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-0.000387, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Materias de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.001977, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Medicamentos e Mat.Medicos e Cirurgicos', normalizedCategory:'admin_general_expense', amountNative:-0.073933, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.001469, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.025461, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.313082, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.00018, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.003483, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.012373, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.001945, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Manutenção e Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.065424, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.000654, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Matrial de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.000956, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Utensilios, Guarn.Cama, Mesa e Banho', normalizedCategory:'admin_general_expense', amountNative:-0.006503, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-0.005376, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.00312, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.000062, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.001031, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.001924, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.018536, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Seguro de Vida', normalizedCategory:'admin_general_expense', amountNative:-0.006557, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Impressos e Materiais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.004155, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.002604, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.000501, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.019278, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.002552, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impressos e Matriais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.000277, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Custo Formação Atleta Profissional', normalizedCategory:'youth_other_sports_expense', amountNative:-0.144461, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas Bancarias', normalizedCategory:'admin_general_expense', amountNative:-0.011381, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Encargos Financeiros', normalizedCategory:'admin_general_expense', amountNative:-0.10511, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Comissão s/Cartão', normalizedCategory:'admin_general_expense', amountNative:-0.002137, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
  ],
};
const ferroviariabrFiscalYearMeta = {
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
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
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2012, 2013, 2014, 2023, 2025): Estadio, Televisión, Organización de partidos
    incluidoEn:{ matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
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
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.834.030,87. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 1.406.851,05. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 32.323,39. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 96.034,75. Claude 2026-10-09: los CUSTOS están impresos entre paréntesis (restan de la receita) y las despesas en positivo; la lectura 5 invertía su signo. Cuenta (L173-200): receitas 4.262.001,99 (suma de L174-186 con deduções -14.118,59) - custos 3.369.240,06 - despesas sin financeiras 947.516,67 (1.101.162,64 - 153.645,97) - financeiras 153.645,97 = -208.400,71 (L200 y L202).
  2012: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2025): Organización de partidos
    incluidoEn:{ match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2012-12-31',
    sourceId:'ferroviaria-br-balanco-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.153646, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Com atividade esportiva - Profissional', lado:'expense', importe:1.834031, motivo:'Claude 2026-10-09: bolsón del costo del fútbol sin desglose'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.262002, officialTotalExpenses:4.316757, officialPAT:-0.208401,
  },
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2013-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2013-12-31
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2013 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -1.222.442,07. Onboarding to-do 165 (Claude, 2026-10-09): el balancete imprime '= Prejuízo 1.222.442,07 D' (D = déficit) y el sistema lo leía como +1.222.442. Cuenta: ingresos 3.973.653 - gastos 5.017.987 - financiero/otros 178.107 = -1.222.442 (resultado es pérdida)
  2013: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2013-12-31',
    sourceId:'ferroviaria-br-balanco-2013-b',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.178107, tax:0,
    extraRows: [
      {label:'Descontos Obtidos', value:0.000009},
      {label:'Juros Passivos', value:-0.000016},
      {label:'Despesas Bancarias', value:-0.009723},
      {label:'Encargos Financeiros', value:-0.152227},
      {label:'Juros s/Leasing Bradesco', value:-0.013043},
      {label:'Encargos Financeiros', value:-0.000073},
      {label:'Comissão s/Cartão', value:-0.003034},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.973653, officialTotalExpenses:5.017987, officialPAT:-1.222442,
  },
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 412,27. Claude 2026-10-09: 'Descontos Obtidos 412,27 C' bajo '(+) Receitas Financeiras' (L197-199, pág. 3-4 del visor) no salió como renglón (solo su 'Total:' de L199); se reemplaza el total por su único renglón. Cuenta: receitas 5.620.101,05 - gastos 6.650.350 - financiero (24.328,43 D - 412,27 C) = -1.055.949,71 = '= Prejuízo 1.055.949,71 D' (L213).
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2014 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): resultado-final = -1.055.949,71. Onboarding to-do 165 (Claude, 2026-10-09): el balancete imprime '= Prejuízo 1.055.949,71 D' (D = déficit) y el sistema lo leía como +1.055.949. Cuenta: ingresos 5.620.101 - gastos 6.650.350 - financiero neto 25.701 = -1.055.950 (= prejuízo, es pérdida)
  2014: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2014-12-31',
    sourceId:'ferroviaria-br-balanco-2014-b',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.025701, tax:0,
    extraRows: [
      {label:'Juros Passivos', value:-0.000612},
      {label:'Juros Passivos', value:-0.001172},
      {label:'Juros s/Leasing Bradesco', value:-0.017391},
      {label:'Juros e Multas Lei 12996/14', value:-0.006935},
      {label:'Encargos Financeiros', value:-0.000003},
      {label:'Descontos Obtidos', value:0.000412},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.620101, officialTotalExpenses:6.65035, officialPAT:-1.05595,
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
  'ferroviaria-br-balanco-2012': {
    id:'ferroviaria-br-balanco-2012', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2012 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-balanco-2013-b': {
    id:'ferroviaria-br-balanco-2013-b', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2013-b (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2013-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-balanco-2014-b': {
    id:'ferroviaria-br-balanco-2014-b', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2014-b (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2014-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['ferroviaria-br'] = null;
