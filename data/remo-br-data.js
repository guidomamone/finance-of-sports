// ============================================================================
// data/remo-br-data.js — Clube do Remo (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Remo/demonstracoes-contabeis-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "remo-br" — slug de "Remo" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Clube do Remo" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Remo" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] clube de remo: #0F141F Black, #FEFEFE White | [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
//   sourceId           ok        "remo-br-demonstracoes-contabeis-2021" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Remo"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"remo-br-demonstracoes-contabeis-2021"}
// ============================================================================

const remobrRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Receita de Aluguéis', normalizedCategory:'other_income', amountNative:0.757191, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Receita de Estacionamento', normalizedCategory:'other_income', amountNative:0.054236, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Receita de Bilheteria', normalizedCategory:'matchday_competition', amountNative:9.533278, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita Royalties / Lojas', normalizedCategory:'sponsorship_commercial', amountNative:3.209878, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita Patrimoniais/Sociais', normalizedCategory:'other_sports', amountNative:0.83101, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita da Atividade Social', normalizedCategory:'other_income', amountNative:7.212591, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.96
    { rawLabel:'Receita Programa Timemania', normalizedCategory:'other_income', amountNative:0.604689, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita Programa Socio Torcedor', normalizedCategory:'member_dues', amountNative:0.882386, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita de Patrocínio / Marketing', normalizedCategory:'sponsorship_commercial', amountNative:4.35011, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita de Direito de Transmissão', normalizedCategory:'broadcasting', amountNative:0.046421, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receitas Royalties / Licenciados', normalizedCategory:'other_income', amountNative:1.627466, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.95
    { rawLabel:'Receita com Vendas Materiais', normalizedCategory:'sponsorship_commercial', amountNative:0.13301, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.224168, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Receita com redução juros/multa - Perse', normalizedCategory:'other_income', amountNative:13.490829, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Receitas de futebol', normalizedCategory:'lump_football_operations', amountNative:40.616014, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.94
    { rawLabel:'Aluguéis', normalizedCategory:'other_income', amountNative:1.197447, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Estacionamento', normalizedCategory:'stadium_other', amountNative:0.888197, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Royalties de lojas', normalizedCategory:'sponsorship_commercial', amountNative:3.71521, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Patrimoniais', normalizedCategory:'other_sports', amountNative:1.789439, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Atividade sociais e esportivas', normalizedCategory:'member_dues', amountNative:0.821643, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Programa timemania', normalizedCategory:'other_income', amountNative:0.870607, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Marketing, patrocínio e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:23.627425, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Royalties licenciados', normalizedCategory:'sponsorship_commercial', amountNative:0.583704, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Sócio torcedor', normalizedCategory:'member_dues', amountNative:6.492978, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Venda de materiais', normalizedCategory:'sponsorship_commercial', amountNative:2.310668, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Outras receitas (despesas)', normalizedCategory:'other_income', amountNative:1.566092, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/relatorio-auditor-independente-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/relatorio-auditor-independente-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Receita de Alugueis', normalizedCategory:'other_income', amountNative:0.798804, disclosureLevel:'aggregated' }, // pág. 11, Claude 0.85
    { rawLabel:'Receita de Estacionamento', normalizedCategory:'other_income', amountNative:0.156767, disclosureLevel:'aggregated' }, // pág. 11, Claude 0.85
    { rawLabel:'Receita de Bilheteria', normalizedCategory:'matchday_competition', amountNative:5.72151, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Receita Royalties / Lojas', normalizedCategory:'sponsorship_commercial', amountNative:1.620263, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Receita Patrimoniais/Sociais', normalizedCategory:'other_sports', amountNative:1.413955, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Receita da Atividade Social', normalizedCategory:'other_income', amountNative:0.991544, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.96
    { rawLabel:'Receita Programa Timemania', normalizedCategory:'other_income', amountNative:0.535692, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Receita Programa Socio Torcedor', normalizedCategory:'member_dues', amountNative:1.552399, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Receita de Patrocínio / Marketing', normalizedCategory:'sponsorship_commercial', amountNative:5.604274, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Receitas Royalties / Licenciados', normalizedCategory:'other_income', amountNative:0.177819, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.95
    { rawLabel:'Receita com Vendas Materiais', normalizedCategory:'sponsorship_commercial', amountNative:0.11865, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:1.630706, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.99
    { rawLabel:'Receitas Repasse de Direitos Federativos', normalizedCategory:'player_sales', amountNative:0.687391, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Receita de Premiações', normalizedCategory:'competition_bonus', amountNative:0.322245, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Diferencia en el documento: total Receita Bruta Operacional vs sus renglones', normalizedCategory:'other_income', amountNative:0.1988, disclosureLevel:'aggregated' }, // pág. 11, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/dre-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/dre-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Receita De Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:17.903353, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/relatorio-auditoria-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/relatorio-auditoria-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Receita De Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:12.351668, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/dre-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/dre-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Receita Operacional Bruta', normalizedCategory:'lump_football_operations', amountNative:33.831604, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const remobrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.385967, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.134117, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.91
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.880265, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.036547, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Serviço de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.427815, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.95
    { rawLabel:'Materiais esportivos e premiações', normalizedCategory:'other_expenses', amountNative:-0.101857, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Despesas com Amortização dos Débitos Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Despesas com tributos', normalizedCategory:'admin_general_expense', amountNative:-0.173537, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com depreciação e amortização', normalizedCategory:'depreciation', amountNative:-0.075833, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.98
    { rawLabel:'Outras Despesas', normalizedCategory:'other_expenses', amountNative:-0.660346, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Despesas com Pessoal', normalizedCategory:'wages_squad', amountNative:-6.537288, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-4.643626, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-3.014827, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Despesas Programa Socio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.321113, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com Passagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.468095, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) Custos das atividades esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-41.884585, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-56.115841, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.306245, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.436843, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.030512, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.069278, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.91
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-1.229071, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.99
    { rawLabel:'Despesas com eventos esportivos', normalizedCategory:'match_organisation_expense', amountNative:-0.00695, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Custo com Contratação', normalizedCategory:'player_amortisation', amountNative:-0.122, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Serviço de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.700725, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.95
    { rawLabel:'Materiais esportivos e premiações', normalizedCategory:'other_expenses', amountNative:-0.103753, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Amortização dos Débitos Trabalhistas', normalizedCategory:'other_amortisation', amountNative:-0.053896, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.91
    { rawLabel:'Despesas com tributos', normalizedCategory:'admin_general_expense', amountNative:-0.018628, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Despesas com depreciação e amortização', normalizedCategory:'depreciation', amountNative:-8.19683, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.98
    { rawLabel:'Amortizações - Direitos Econômicos', normalizedCategory:'player_amortisation', amountNative:-1.9643, disclosureLevel:'aggregated' }, // pág. 11, Jev 1
    { rawLabel:'Despesa com Contingências', normalizedCategory:'admin_general_expense', amountNative:-1.631109, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Outras Despesas', normalizedCategory:'other_expenses', amountNative:-0.886025, disclosureLevel:'aggregated' }, // pág. 11, Jev 0.99
    { rawLabel:'Despesas com Pessoal', normalizedCategory:'wages_squad', amountNative:-6.440639, disclosureLevel:'aggregated' }, // pág. 11, precedente
    { rawLabel:'Despesa com direito de imagem', normalizedCategory:'wages_squad', amountNative:-1.578607, disclosureLevel:'aggregated' }, // pág. 12, Claude 0.9
    { rawLabel:'Despesas com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-2.624685, disclosureLevel:'aggregated' }, // pág. 12, Jev 0.99
    { rawLabel:'Despesas Programa Sócio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.54908, disclosureLevel:'aggregated' }, // pág. 12, Jev 1
    { rawLabel:'Despesas com Passagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.460396, disclosureLevel:'aggregated' }, // pág. 12, Jev 0.99
  ],
  2019: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) Despesas Operacionais (sin Resultado Financeiro)', normalizedCategory:'lump_football_operations_expense', amountNative:-20.686217, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
  2020: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custos das Atividades Esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-7.54864, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Despesas c/ drepreciação/amortização', normalizedCategory:'depreciation', amountNative:-1.923969, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'(-) Despesas Operacionais (sin Resultado Financeiro)', normalizedCategory:'admin_general_expense', amountNative:-4.749468, disclosureLevel:'aggregated' }, // pág. 8, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-18.418551, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Operacionais', normalizedCategory:'lump_football_operations_expense', amountNative:-16.404081, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const remobrFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'remo-br-demonstracoes-contabeis-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.250527, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:42.957263, officialTotalExpenses:19.887233, officialPAT:22.819501,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.197.447. Onboarding to-do 165 (Claude, 2026-10-09): corrige el ajuste anterior de la misma fila, que no sacaba 'Receitas recorrentes' (42.297.318, L242) y la sumaba dos veces con sus 10 componentes de la nota 16 (L797-L806, suman 42.297.318)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 888.197. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.715.210. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.789.439. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 821.643. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 870.607. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 23.627.425. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 583.704. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 6.492.978. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.310.668. Claude 2026-10-09: la DRE (L242) imprime 'Receitas recorrentes' 42.297.318 en un solo renglón y la nota 16 (L795-807) lo abre en 10 conceptos: 1.197.447 + 888.197 + 3.715.210 + 1.789.439 + 821.643 + 870.607 + 23.627.425 + 583.704 + 6.492.978 + 2.310.668 = 42.297.318 exacto. Se saca el subtotal y se cargan sus componentes.
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Organización de partidos
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'remo-br-demonstracoes-financeiras-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.133597, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:1.719635},
      {label:'Despesas financeiras', value:-2.853232},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas de futebol', lado:'revenue', importe:40.616014, motivo:'el documento no desglosa este renglón'},
      {renglon:'(-) Custos das atividades esportivas', lado:'expense', importe:41.884585, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:84.479424, officialTotalExpenses:98.306671, officialPAT:-14.960844,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L281 (21.545.016) es el total de los renglones de ingreso impresos debajo (L282-L298); la nota 13 (L982-L985) lo reparte en otras categorías (Operacionais/Ordinárias) y se contaba dos veces junto a los 17 renglones. Se cargan los renglones del estado
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L299 Receita Líquida 21.545.016 repite el total de L281 (sin deducciones): se contaba otra vez
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 198.800. Onboarding to-do 165 (Claude, 2026-10-09): el total impreso L281/L299 es 21.545.016 pero los renglones L282-L298 suman 21.346.216 (17 renglones, incluidas las Receitas Financeiras 14.197); falta 198.800 que el documento no abre. Sin esa diferencia el resultado no cierra: 21.545.016 - 29.103.327 - 406.410 = -7.964.721 (L337-L338). La versión anterior descartada sí sumaba (patrocinio 5.311.429 y demais 906.122, total 20.328.785); en la final sube el total en 1.216.231 y los renglones en 1.017.429
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 14.197. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): lo cuenta el total de L281; con el signo bien el resultado cierra
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = -406.410. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): -7.558.310 - 406.410 = -7.964.720 (impreso -7.964.721, L338)
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'remo-br-relatorio-auditor-independente-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.392213, tax:0,
    extraRows: [
      {label:'Receitas Financeiras', value:0.014197},
      {label:'Despesas financeiras', value:-0.40641},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:21.530819, officialTotalExpenses:29.103327, officialPAT:-7.964721,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-12-31. Onboarding to-do 165 (Claude, 2026-10-09): periodo.mjs no lee el encabezado partido en celdas; el DRE va del 01/01/2019 al 31/12/2019
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L13 (subtotal 17.903.353,17) repite L14 (Receita De Atividades Esportivas, único componente) y L15 (Receita Líquida) repite otra vez: el ingreso es uno solo, 17.903.353,17; se carga L14
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): ídem: L15 Receita Líquida 17.903.353,17 es el mismo ingreso de L14 (sin deducciones)
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 20.686.217,40. Onboarding to-do 165 (Claude, 2026-10-09): el Resultado Financeiro (L18, 225.425,57) está incluido en Despesas Operacionais (L17, 20.911.642,97): 17.903.353,17 - 20.911.642,97 = -3.008.289,80 = resultado impreso (L19-L21). Se separa: 20.911.642,97 - 225.425,57 = 20.686.217,40 de gastos operativos + 225.425,57 de costo financiero
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício firmada por el contador (una página); el balance del año está en otro PDF (descartado para la carga)
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2019) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  2019: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'remo-br-dre-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.225426, tax:0,
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Inversiones (amortizaciones y depreciación), Organización de partidos, Administración y gastos generales
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true},"youth_other_sports_expense":{"en":"lump_football_operations_expense","posible":true},"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true}, sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, other_sports:{ en:'lump_football_operations', posible:true, por:'precedente' }, youth_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, womens_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, admin_general_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita De Atividades Esportivas', lado:'revenue', importe:17.903353, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
      {renglon:'(-) Despesas Operacionais (sin Resultado Financeiro)', lado:'expense', importe:20.686217, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:17.903353, officialTotalExpenses:20.686217, officialPAT:-3.00829,
  },
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L191 (12.351.668,08) es el subtotal de L192 (Receita De Atividades Esportivas, único componente, mismo importe): se cargaba dos veces; el ingreso es 12.351.668,08
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L193 (7.548.640,50) es el subtotal de L194 (mismo importe, único componente): se cargaba dos veces
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L200 ((1.923.969,31)) es el subtotal de L201 (mismo importe, único componente): se cargaba dos veces; se carga L201 como gasto (depreciación)
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L198 (4.555.340,59) es parte del subtotal L197 (4.943.560,99); el subtotal se carga entero en una fila, sin el Resultado Financeiro (L199): ver el ajuste de L197
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 4.749.468,16. Onboarding to-do 165 (Claude, 2026-10-09): el Resultado Financeiro (L199, 194.092,83) está incluido en Despesas Operacionais (L197, 4.943.560,99): 4.803.027,58 - 4.943.560,99 - 1.923.969,31 = -2.064.502,72 = resultado impreso (L202-L204), sin restar el financiero aparte. Se separa: 4.943.560,99 - 194.092,83 = 4.749.468,16 de gastos operativos + 194.092,83 de costo financiero. Ojo: los hijos impresos (4.555.340,59 + 194.092,83 = 4.749.433,42) no suman el subtotal: faltan 194.127,57 sin renglón impreso
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (relatorio-auditoria-2020) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  2020: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2020-12-31',
    sourceId:'remo-br-relatorio-auditoria-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.194093, tax:0,
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Organización de partidos
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true},"youth_other_sports_expense":{"en":"lump_football_operations_expense","posible":true},"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true}, sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, other_sports:{ en:'lump_football_operations', posible:true, por:'precedente' }, youth_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, womens_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita De Atividades Esportivas', lado:'revenue', importe:12.351668, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
      {renglon:'Custos das Atividades Esportivas', lado:'expense', importe:7.54864, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:12.351668, officialTotalExpenses:14.222078, officialPAT:-2.064503,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L12 Receita Operacional Líquida 33.831.604 repite L10 (Bruta, sin deducciones) y L14 Resultado Operacional Bruto: el ingreso es uno solo, 33.831.604, y se contaba dos veces
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício firmada por el contador (una página); el balance del año está en otro PDF (descartado para la carga)
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = wages_squad. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = youth_other_sports_expense. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = broadcasting. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = matchday_competition. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): incluye = member_dues. Onboarding to-do 165 (Claude, 2026-10-09): la DRE de Remo (dre-2023) trae los ingresos y los gastos en uno o dos renglones, sin desglose por naturaleza
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'remo-br-dre-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.449709, tax:0,
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022): Comercial / Sponsors, Otras secciones deportivas, Inversiones (amortizaciones y depreciación), Organización de partidos
    incluidoEn:{"wages_squad":{"en":"lump_football_operations_expense","posible":true},"youth_other_sports_expense":{"en":"lump_football_operations_expense","posible":true},"broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true},"member_dues":{"en":"lump_football_operations","posible":true}, sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, other_sports:{ en:'lump_football_operations', posible:true, por:'precedente' }, youth_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, womens_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } }, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita Operacional Bruta', lado:'revenue', importe:33.831604, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
      {renglon:'Despesas Operacionais', lado:'expense', importe:16.404081, motivo:'Claude 2026-10-09: renglón de primer nivel de una DRE sin desglose'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:33.831604, officialTotalExpenses:34.822632, officialPAT:-1.440736,
  },
};
const remobrPresupuestoOverlayByYear = {};

const remobrPasesData = [];
const remobrResultadosData = {};
const remobrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['remo-br'] = {
  revenueLinesByYear: remobrRevenueLinesByYear, expenseLinesByYear: remobrExpenseLinesByYear,
  fiscalYearMeta: remobrFiscalYearMeta, pasesData: remobrPasesData,
  resultadosData: remobrResultadosData, titulosData: remobrTitulosData,
  presupuestoOverlayByYear: remobrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'remo-br-demonstracoes-contabeis-2021': {
    id:'remo-br-demonstracoes-contabeis-2021', clubId:'remo-br',
    title:'Clube do Remo — demonstracoes-contabeis-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'remo-br-demonstracoes-financeiras-2025': {
    id:'remo-br-demonstracoes-financeiras-2025', clubId:'remo-br',
    title:'Clube do Remo — demonstracoes-financeiras-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'remo-br-relatorio-auditor-independente-2022': {
    id:'remo-br-relatorio-auditor-independente-2022', clubId:'remo-br',
    title:'Clube do Remo — relatorio-auditor-independente-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/relatorio-auditor-independente-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'remo-br-dre-2019': {
    id:'remo-br-dre-2019', clubId:'remo-br',
    title:'Clube do Remo — dre-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/dre-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'remo-br-relatorio-auditoria-2020': {
    id:'remo-br-relatorio-auditoria-2020', clubId:'remo-br',
    title:'Clube do Remo — relatorio-auditoria-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/relatorio-auditoria-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'remo-br-dre-2023': {
    id:'remo-br-dre-2023', clubId:'remo-br',
    title:'Clube do Remo — dre-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/dre-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['remo-br'] = null;
