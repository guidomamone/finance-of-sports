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
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Avai/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Mensalidades dos Sócios', normalizedCategory:'member_dues', amountNative:8.273, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:1.38, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Direitos econômicos/Mecanismo de solidariedade (i)', normalizedCategory:'player_sales', amountNative:7.397, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Empréstimo de jogadores', normalizedCategory:'player_sales', amountNative:0.265, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Arrendamentos, Patrocínios e Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:10.731, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'TV e transmissão jogos', normalizedCategory:'broadcasting', amountNative:9.867, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Repasses da Loteria Timemania', normalizedCategory:'other_income', amountNative:0.78, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Venda de Material Esportivo', normalizedCategory:'sponsorship_commercial', amountNative:1.334, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Venda e uso Marca', normalizedCategory:'sponsorship_commercial', amountNative:0.583, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:0.15, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Outras receitas operacionais (ii)', normalizedCategory:'other_income', amountNative:92.51, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Receitas não operacionais', normalizedCategory:'other_income', amountNative:0.072, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Avai/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Avai/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Mensalidades dos Sócios', normalizedCategory:'member_dues', amountNative:7.392, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:2.303, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Arrendamentos, Patrocínios e Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:10.392, disclosureLevel:'aggregated' }, // pág. 36, Claude 0.8
    { rawLabel:'TV e transmissão jogos', normalizedCategory:'broadcasting', amountNative:8.242, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Repasses da Loteria Timemania', normalizedCategory:'other_income', amountNative:0.679, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Venda de Material Esportivo', normalizedCategory:'sponsorship_commercial', amountNative:0.255, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Venda e uso da Marca', normalizedCategory:'sponsorship_commercial', amountNative:0.613, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Receitas de locações', normalizedCategory:'other_income', amountNative:0.752, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Participações em competições', normalizedCategory:'competition_bonus', amountNative:0.072, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) deduções das receitas', normalizedCategory:'other_income', amountNative:-1.04, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
    { rawLabel:'Receita LFU', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'aggregated' }, // pág. 9, ? 0.6
    { rawLabel:'Receceita negociação Atletas Profissionais', normalizedCategory:'player_sales', amountNative:8.474, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Deságio Recuperação Judicial', normalizedCategory:'other_income', amountNative:19.688, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
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
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Salários e Encargos', normalizedCategory:'wages_squad', amountNative:-23.838, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.392, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Viagens e Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-2.469, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.95
    { rawLabel:'INSS s/ Receitas', normalizedCategory:'admin_general_expense', amountNative:-0.854, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Aluguel e manutenção dos campos', normalizedCategory:'admin_general_expense', amountNative:-0.813, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Consultoria Esportiva', normalizedCategory:'admin_general_expense', amountNative:-0.945, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Honorários Profissionais', normalizedCategory:'admin_general_expense', amountNative:-1.102, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Arbitragem/Federação', normalizedCategory:'match_organisation_expense', amountNative:-0.934, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Amortização Custo Atletas Profissionais', normalizedCategory:'player_amortisation', amountNative:-1.286, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Seguros/Plano de Saúde', normalizedCategory:'admin_general_expense', amountNative:-1.481, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Direito de Uso de Imagem', normalizedCategory:'wages_squad', amountNative:-6.574, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Material Esportivo/Material Médico', normalizedCategory:'other_expenses', amountNative:-0.954, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Borderoux de Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.569, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.96
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.26, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Softwares e Consultorias', normalizedCategory:'admin_general_expense', amountNative:-1.228, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-1.281, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Premiações', normalizedCategory:'wages_squad', amountNative:-0.696, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.9
    { rawLabel:'Direito de Arena', normalizedCategory:'match_organisation_expense', amountNative:-0.454, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Empréstimos de Atletas', normalizedCategory:'wages_squad', amountNative:-1.923, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Intermediação e Negociação de Atletas', normalizedCategory:'other_expenses', amountNative:-1.614, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'Materiais e serviços diversos', normalizedCategory:'other_expenses', amountNative:-2.579, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Manutenção, conservação e reformas', normalizedCategory:'admin_general_expense', amountNative:-1.614, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.9
    { rawLabel:'Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-1.349, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Custo com atletas dispensados', normalizedCategory:'wages_squad', amountNative:-6.033, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'(-) Transferência para o Intangível', normalizedCategory:'other_expenses', amountNative:5.605, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Alimentação/Plano de saúde/Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.701, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.382, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Assessoria e comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.234, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'CMV/ICMS', normalizedCategory:'admin_general_expense', amountNative:-1.208, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Demais despesas', normalizedCategory:'other_expenses', amountNative:-0.486, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.263, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.431, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Eventos', normalizedCategory:'admin_general_expense', amountNative:-0.329, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Impostos e taxas', normalizedCategory:'admin_general_expense', amountNative:-0.24, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Manutenção de Equipamentos', normalizedCategory:'admin_general_expense', amountNative:-0.381, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.92
    { rawLabel:'Manutenção e conservação do Estádio', normalizedCategory:'admin_general_expense', amountNative:-1.592, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Material de consumo', normalizedCategory:'admin_general_expense', amountNative:-0.986, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.93
    { rawLabel:'Propaganda e publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.258, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-0.086, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Repasse Bares', normalizedCategory:'other_expenses', amountNative:-1.848, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Softwares e consultorias', normalizedCategory:'admin_general_expense', amountNative:-0.929, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Telefone e Internet', normalizedCategory:'admin_general_expense', amountNative:-0.092, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Salários e Encargos', normalizedCategory:'wages_squad', amountNative:-4.739, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.8
    { rawLabel:'Atualização Dívida PGFN (i)', normalizedCategory:'exceptional_items', amountNative:-41.126, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Serviços de terceiros + Honorários profissionais', normalizedCategory:'admin_general_expense', amountNative:-2.045, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Salários e Encargos Sociais', normalizedCategory:'wages_squad', amountNative:-36.882, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.9
    { rawLabel:'Direito de Uso de Imagem', normalizedCategory:'wages_squad', amountNative:-10.485, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Empréstimo de Jogadores', normalizedCategory:'wages_squad', amountNative:-0.879, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Premiações por Desempenho', normalizedCategory:'wages_squad', amountNative:-0.905, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Registro de Atletas', normalizedCategory:'match_organisation_expense', amountNative:-0.712, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Amortização', normalizedCategory:'player_amortisation', amountNative:-0.595, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Honorários Profissionais PJ', normalizedCategory:'admin_general_expense', amountNative:-1.465, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Alimentação/Plano de saúde e seguro', normalizedCategory:'match_organisation_expense', amountNative:-1.412, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Serviço de Terceiros', normalizedCategory:'youth_other_sports_expense', amountNative:-0.607, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Comissões em negociação de atletas', normalizedCategory:'other_expenses', amountNative:-2.027, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Aluguel campo', normalizedCategory:'match_organisation_expense', amountNative:-0.117, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.91
    { rawLabel:'Luvas', normalizedCategory:'wages_squad', amountNative:-0.377, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Viagens/hospedagens/Transportes', normalizedCategory:'match_organisation_expense', amountNative:-1.652, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Atletas dispensados', normalizedCategory:'wages_squad', amountNative:-0.459, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Material esportivo e outros', normalizedCategory:'other_expenses', amountNative:-0.886, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Softwares e consultoria', normalizedCategory:'admin_general_expense', amountNative:-0.098, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Outros custos futebol Profissional', normalizedCategory:'other_expenses', amountNative:-0.68, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.85
    { rawLabel:'Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-1.213, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Espostes Olimpicos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.078, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Ajuda de custo', normalizedCategory:'wages_squad', amountNative:-0.56, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.123, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Alugueis de Campos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Arbitragem de Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.031, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.99
    { rawLabel:'Competições Esportivas', normalizedCategory:'youth_other_sports_expense', amountNative:-0.016, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Plano e saúde', normalizedCategory:'admin_general_expense', amountNative:-0.641, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Honorários Profissionais PJ', normalizedCategory:'admin_general_expense', amountNative:-0.442, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Material de uso e Consumo', normalizedCategory:'youth_other_sports_expense', amountNative:-0.085, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Material Esportivo', normalizedCategory:'other_expenses', amountNative:-0.233, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Material Médico', normalizedCategory:'youth_other_sports_expense', amountNative:-0.072, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Registro de Atletas', normalizedCategory:'match_organisation_expense', amountNative:-0.257, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Salários e Encargos Sociais', normalizedCategory:'wages_squad', amountNative:-4.731, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.9
    { rawLabel:'Serviço de Terceiros', normalizedCategory:'youth_other_sports_expense', amountNative:-1.612, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Viagens e Hospedagens', normalizedCategory:'youth_other_sports_expense', amountNative:-0.536, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Alimentação/Plano de saúde/Seguros', normalizedCategory:'admin_general_expense', amountNative:-2.275, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.675, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Assessoria de comunicação', normalizedCategory:'admin_general_expense', amountNative:-0.388, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-3.048, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.419, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Eventos', normalizedCategory:'admin_general_expense', amountNative:-0.937, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Taxas/Bordero', normalizedCategory:'match_organisation_expense', amountNative:-1.331, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Manutenção de Equipamentos', normalizedCategory:'admin_general_expense', amountNative:-0.434, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.92
    { rawLabel:'Manutenção e conservação do Estádio', normalizedCategory:'admin_general_expense', amountNative:-0.373, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Material de consumo', normalizedCategory:'admin_general_expense', amountNative:-0.757, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.93
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.222, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Propaganda e publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.287, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Repasse Bares', normalizedCategory:'other_expenses', amountNative:-0.274, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Softwares e consultorias', normalizedCategory:'admin_general_expense', amountNative:-1.096, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Telefone e Internet', normalizedCategory:'admin_general_expense', amountNative:-0.096, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Salários e Encargos', normalizedCategory:'admin_general_expense', amountNative:-3.045, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.9
    { rawLabel:'Marketing/licenciamento', normalizedCategory:'admin_general_expense', amountNative:-0.859, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.98
    { rawLabel:'Honorários Profissionais PJ', normalizedCategory:'admin_general_expense', amountNative:-3.068, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.335, disclosureLevel:'aggregated' }, // pág. 38, Claude 0.85
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
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2023, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Estadio, Televisión
    incluidoEn:{ member_dues:{ en:'lump_football_operations', posible:true, por:'precedente' }, sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' } },
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
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'avai-br-demonstracoes-contabeis-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.244, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.439},
      {label:'Despesas financeiras', value:-0.683},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:133.342, officialTotalExpenses:72.867, officialPAT:19.101,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'avai-br-demonstracoes-contabeis-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-34.705, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.254},
      {label:'Despesas financeiras', value:-34.959},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:57.822, officialTotalExpenses:91.848, officialPAT:-68.731,
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
  'avai-br-demonstracoes-contabeis-2023': {
    id:'avai-br-demonstracoes-contabeis-2023', clubId:'avai-br',
    title:'Avaí Futebol Clube — demonstracoes-contabeis-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'avai-br-demonstracoes-contabeis-2024': {
    id:'avai-br-demonstracoes-contabeis-2024', clubId:'avai-br',
    title:'Avaí Futebol Clube — demonstracoes-contabeis-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Avai/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['avai-br'] = null;
