// ============================================================================
// data/avai-br-data.js — Avaí Futebol Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Avai/demonstracoes-contabeis-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "avai-br" — slug de "Avai" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Avaí Futebol Clube" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Avai" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (71 de 72 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 69 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (71 de 72 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): una sola entidad (associação civil); las menci
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
//   sourceId           ok        "avai-br-demonstracoes-contabeis-2021" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Avaí"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"avai-br-demonstracoes-contabeis-2021"}
// ============================================================================

const avaibrRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Avai/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Arrendamentos', normalizedCategory:'other_income', amountNative:2.567, disclosureLevel:'aggregated' }, // pág. 33, Claude 0.8
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:3.04, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Cota TV e transmissão jogos', normalizedCategory:'broadcasting', amountNative:11.064, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Mensalidades dos Sócios', normalizedCategory:'member_dues', amountNative:9.83, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:6.182, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Participações em competições', normalizedCategory:'competition_bonus', amountNative:0.013, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:3.903, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Receitas de locações', normalizedCategory:'other_income', amountNative:2.371, disclosureLevel:'aggregated' }, // pág. 33, Claude 0.8
    { rawLabel:'Repasses da Loteria Timemania', normalizedCategory:'other_income', amountNative:0.312, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'Venda de Material Esportivo', normalizedCategory:'sponsorship_commercial', amountNative:0.036, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.99
    { rawLabel:'Venda e uso da Marca', normalizedCategory:'sponsorship_commercial', amountNative:0.233, disclosureLevel:'aggregated' }, // pág. 33, Jev 1
    { rawLabel:'(-) Deduções da Receita operacional', normalizedCategory:'other_income', amountNative:-0.331, disclosureLevel:'aggregated' }, // pág. 33, Jev 0.99
    { rawLabel:'OUTRAS RECEITAS OPERACIONAIS', normalizedCategory:'other_income', amountNative:4.631, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Avai/demonstracoes-contabeis-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Receita líquida das atividades', normalizedCategory:'lump_football_operations', amountNative:91.954, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
  ],
};
const avaibrExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Salários', normalizedCategory:'wages_squad', amountNative:-17.479, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.9
    { rawLabel:'Direito de uso de imagem', normalizedCategory:'wages_squad', amountNative:-11.168, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.99
    { rawLabel:'Auxílio moradia', normalizedCategory:'wages_squad', amountNative:-3.173, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Férias', normalizedCategory:'wages_squad', amountNative:-2.758, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.9
    { rawLabel:'Amortização', normalizedCategory:'player_amortisation', amountNative:-1.722, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.8
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-1.68, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Premiação por desempenho', normalizedCategory:'wages_squad', amountNative:-1.51, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.85
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-1.377, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.9
    { rawLabel:'Honorários profissionais', normalizedCategory:'admin_general_expense', amountNative:-1.208, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.92
    { rawLabel:'Comissões de negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.984, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.98
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.981, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.85
    { rawLabel:'Empréstimos de jogadores', normalizedCategory:'wages_squad', amountNative:-0.914, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.849, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.85
    { rawLabel:'Bônus contratuais', normalizedCategory:'wages_squad', amountNative:-0.845, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.98
    { rawLabel:'13 Salário', normalizedCategory:'wages_squad', amountNative:-0.833, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.9
    { rawLabel:'Direitos econômicos profissionais', normalizedCategory:'player_amortisation', amountNative:-0.517, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Borderô de jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.496, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.91
    { rawLabel:'Outros custos profissionais', normalizedCategory:'other_expenses', amountNative:-0.384, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Taxa de registro de atletas', normalizedCategory:'match_organisation_expense', amountNative:-0.364, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.311, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.283, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.85
    { rawLabel:'Luvas', normalizedCategory:'wages_squad', amountNative:-0.268, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.85
    { rawLabel:'Ajuda de custo', normalizedCategory:'wages_squad', amountNative:-0.24, disclosureLevel:'aggregated' }, // pág. 34, Claude 0.8
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.218, disclosureLevel:'aggregated' }, // pág. 34, precedente
    { rawLabel:'Pis sobre folha', normalizedCategory:'admin_general_expense', amountNative:-0.215, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.9
    { rawLabel:'Concentração', normalizedCategory:'match_organisation_expense', amountNative:-0.156, disclosureLevel:'aggregated' }, // pág. 34, Jev 1
    { rawLabel:'Comissões sobre vendas', normalizedCategory:'other_expenses', amountNative:-0.127, disclosureLevel:'aggregated' }, // pág. 34, Jev 1
    { rawLabel:'Gratificações', normalizedCategory:'wages_squad', amountNative:-0.113, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.98
    { rawLabel:'Software e consultorias', normalizedCategory:'admin_general_expense', amountNative:-0.093, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.96
    { rawLabel:'Futebol feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-1.801, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.99
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.06, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.95
    { rawLabel:'Outros Custos', normalizedCategory:'other_expenses', amountNative:-1.902, disclosureLevel:'aggregated' }, // pág. 34, Jev 0.97
    { rawLabel:'13 Salário', normalizedCategory:'wages_squad', amountNative:-0.707, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.9
    { rawLabel:'Ajuda de custo', normalizedCategory:'wages_squad', amountNative:-0.558, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.8
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-1.007, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Aluguéis de campos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.021, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Auxílio moradia', normalizedCategory:'wages_squad', amountNative:-0.501, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Comissão em negociações de atletas', normalizedCategory:'other_expenses', amountNative:-0.112, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.96
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-0.189, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.9
    { rawLabel:'Empréstimos de jogadores', normalizedCategory:'wages_squad', amountNative:-0.047, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Férias', normalizedCategory:'wages_squad', amountNative:-0.692, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.9
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.297, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.9
    { rawLabel:'Honorários profissionais', normalizedCategory:'admin_general_expense', amountNative:-0.333, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.92
    { rawLabel:'Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.407, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Impostos e taxas', normalizedCategory:'admin_general_expense', amountNative:-0.253, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.96
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.372, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Material de consumo', normalizedCategory:'youth_other_sports_expense', amountNative:-0.027, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.024, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Material médico', normalizedCategory:'youth_other_sports_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Outros custos categoria de formação (Base)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.06, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.91
    { rawLabel:'Pis sobre folha', normalizedCategory:'admin_general_expense', amountNative:-0.039, disclosureLevel:'aggregated' }, // pág. 35, Jev 0.9
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-0.1, disclosureLevel:'aggregated' }, // pág. 35, precedente
    { rawLabel:'Salários', normalizedCategory:'wages_squad', amountNative:-3.143, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.9
    { rawLabel:'Serviços de terceiros', normalizedCategory:'youth_other_sports_expense', amountNative:-0.08, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Taxas de registro de atletas', normalizedCategory:'youth_other_sports_expense', amountNative:-0.222, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.8
    { rawLabel:'Transporte', normalizedCategory:'youth_other_sports_expense', amountNative:-0.271, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.274, disclosureLevel:'aggregated' }, // pág. 35, Claude 0.85
    { rawLabel:'Administrativas', normalizedCategory:'admin_general_expense', amountNative:-5.675, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.348, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Comercialização', normalizedCategory:'admin_general_expense', amountNative:-0.14, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.341, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Depreciação/Amortização', normalizedCategory:'depreciation', amountNative:-3.079, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.97
    { rawLabel:'Infraestrutura', normalizedCategory:'admin_general_expense', amountNative:-6.32, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Logística de eventos', normalizedCategory:'match_organisation_expense', amountNative:-1.374, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Marketing', normalizedCategory:'admin_general_expense', amountNative:-0.371, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Negócios', normalizedCategory:'admin_general_expense', amountNative:-1.692, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Plano de Saúde', normalizedCategory:'admin_general_expense', amountNative:-0.328, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.94
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.036, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.94
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Salários e Encargos', normalizedCategory:'wages_squad', amountNative:-22.188, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.8
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-1.663, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Viagens e Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-1.239, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.95
    { rawLabel:'INSS s/ Receitas', normalizedCategory:'admin_general_expense', amountNative:-1.387, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Aluguel e manutenção dos campos', normalizedCategory:'admin_general_expense', amountNative:-0.401, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'youth_other_sports_expense', amountNative:-1.068, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Arbitragem/ Federação e Confederação', normalizedCategory:'match_organisation_expense', amountNative:-0.968, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Amortização Custo Atletas Profissionais', normalizedCategory:'player_amortisation', amountNative:-2.166, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Seguros/ Plano de Saúde', normalizedCategory:'admin_general_expense', amountNative:-1.45, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Direito de Uso de Imagem', normalizedCategory:'wages_squad', amountNative:-7.004, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Material Esportivo - Patrocínio', normalizedCategory:'other_expenses', amountNative:-0.389, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Borderoux de Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.904, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.96
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.334, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'Despesas com jogo', normalizedCategory:'match_organisation_expense', amountNative:-0.448, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-1.088, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Premiação Campeonatos', normalizedCategory:'wages_squad', amountNative:-1.378, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.97
    { rawLabel:'Direito de Arena', normalizedCategory:'match_organisation_expense', amountNative:-2.212, disclosureLevel:'aggregated' }, // pág. 49, Jev 1
    { rawLabel:'Empréstimos de Atletas', normalizedCategory:'wages_squad', amountNative:-0.4, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.8
    { rawLabel:'Intermediação e Negociação de Atletas', normalizedCategory:'other_expenses', amountNative:-3.395, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.98
    { rawLabel:'Materiais e serviços diversos', normalizedCategory:'other_expenses', amountNative:-1.416, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Manutenção, conservação e reformas', normalizedCategory:'admin_general_expense', amountNative:-0.732, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.9
    { rawLabel:'Perda com atletas dispensados', normalizedCategory:'player_impairment', amountNative:-3.882, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.954, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.076, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.306, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.337, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.283, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-3.687, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'PCLD', normalizedCategory:'other_expenses', amountNative:-0.854, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Plano de Saúde', normalizedCategory:'admin_general_expense', amountNative:-1.144, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Provisão para Contingência', normalizedCategory:'admin_general_expense', amountNative:-11.554, disclosureLevel:'aggregated' }, // pág. 50, Jev 0.99
    { rawLabel:'Salários e Encargos', normalizedCategory:'wages_squad', amountNative:-7.431, disclosureLevel:'aggregated' }, // pág. 50, Claude 0.8
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.094, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'youth_other_sports_expense', amountNative:-1.601, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Softwares e Consultoria de TI', normalizedCategory:'admin_general_expense', amountNative:-0.806, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Telefone e Internet', normalizedCategory:'admin_general_expense', amountNative:-0.105, disclosureLevel:'aggregated' }, // pág. 50, Jev 1
    { rawLabel:'Viagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.05, disclosureLevel:'aggregated' }, // pág. 50, precedente
    { rawLabel:'Outras receitas (despesas) operacionais', normalizedCategory:'other_expenses', amountNative:-3.456, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
  ],
};
const avaibrFiscalYearMeta = {
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'avai-br-demonstracoes-contabeis-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-42.788, tax:0,
    extraRows: [
      {label:'RECEITAS FINANCEIRAS', value:1.006},
      {label:'DESPESAS FINANCEIRAS', value:-2.088},
      {label:'ATUALIZAÇÃO DAS OBRIGAÇÕES TRIBUTÁRIAS', value:-41.706},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:43.851, officialTotalExpenses:84.492, officialPAT:-83.429,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'avai-br-demonstracoes-contabeis-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.709, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.118},
      {label:'Despesas financeiras', value:-0.827},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita líquida das atividades', lado:'revenue', importe:91.954, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:91.954, officialTotalExpenses:88.85, officialPAT:2.396,
  },
};
const avaibrPresupuestoOverlayByYear = {};

const avaibrPasesData = [];
const avaibrResultadosData = {};
const avaibrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['avai-br'] = {
  revenueLinesByYear: avaibrRevenueLinesByYear, expenseLinesByYear: avaibrExpenseLinesByYear,
  fiscalYearMeta: avaibrFiscalYearMeta, pasesData: avaibrPasesData,
  resultadosData: avaibrResultadosData, titulosData: avaibrTitulosData,
  presupuestoOverlayByYear: avaibrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'avai-br-demonstracoes-contabeis-2025': {
    id:'avai-br-demonstracoes-contabeis-2025', clubId:'avai-br',
    title:'Avaí Futebol Clube — demonstracoes-contabeis-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'avai-br-demonstracoes-contabeis-2022': {
    id:'avai-br-demonstracoes-contabeis-2022', clubId:'avai-br',
    title:'Avaí Futebol Clube — demonstracoes-contabeis-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['avai-br'] = null;
