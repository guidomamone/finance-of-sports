// ============================================================================
// data/vilanova-br-data.js — Vila Nova Futebol Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Vila Nova/notas-explicativas-2014.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "vilanova-br" — slug de "Vila Nova" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Vila Nova Futebol Clube" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Vila Nova" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral
//   sport              ok        "futbol" — el .md nombra el fútbol 6 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2014 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período par
//   cierre             ok        "2014-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md n
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2014-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2014-12-31 = 2.6562 (PTAX de cierre (venda) del Banco Central do Brasil al 2014-12-31)
//   sourceId           ok        "vilanova-br-notas-explicativas-2014" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2014 (br-serieA, br-paulistaA3): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2014 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2014: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2014-12-31","sourceId":"vilanova-br-notas-explicativas-2014"}
// ============================================================================

const vilanovabrRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Participação em competições, exposição e performance', normalizedCategory:'competition_bonus', amountNative:6.548, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:0.995, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Patrocínios e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:7.964, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Licenciamento e *royanties', normalizedCategory:'sponsorship_commercial', amountNative:1.394, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:5.605, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Sócio Tigrão', normalizedCategory:'member_dues', amountNative:1.404, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Associações quadro social', normalizedCategory:'member_dues', amountNative:0.866, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Repasse loterias', normalizedCategory:'other_income', amountNative:0.795, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Bares e lanchonetes', normalizedCategory:'stadium_other', amountNative:0.376, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.95
    { rawLabel:'Incentivos governamentais', normalizedCategory:'other_income', amountNative:0.277, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'(-) Impostos e deduções da receita', normalizedCategory:'other_income', amountNative:-0.717, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Venda de atletas e participações em direitos econômicos', normalizedCategory:'player_sales', amountNative:11.749, disclosureLevel:'aggregated' }, // pág. 56, Jev 1
    { rawLabel:'Mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:0.26, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Estorno de provisões (ii)', normalizedCategory:'other_income', amountNative:2.555, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Multas contratuais recebidas (iii)', normalizedCategory:'other_income', amountNative:1.884, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:0.815, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Receita com aluguéis', normalizedCategory:'other_income', amountNative:0.146, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.85
    { rawLabel:'Arrecadação do futebol de base', normalizedCategory:'youth_football', amountNative:0.144, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Brindes recebidos', normalizedCategory:'other_income', amountNative:0.088, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.8
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.057, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.9
    { rawLabel:'Reembolsos recebidos', normalizedCategory:'other_income', amountNative:0.052, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Taxa de avaliação base', normalizedCategory:'youth_football', amountNative:0.035, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.92
    { rawLabel:'Auxílio custos operacionais', normalizedCategory:'other_income', amountNative:0.033, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Estacionamentos', normalizedCategory:'other_income', amountNative:0.015, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.8
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/balanco-patrimonial-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Receitas Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:2.338518, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Escolinha de Futebol', normalizedCategory:'youth_football', amountNative:0.081603, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Receitas Doações/Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.193571, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Receitas Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.130904, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Direitos Federativos Atletas', normalizedCategory:'player_sales', amountNative:0.467925, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Alugueis', normalizedCategory:'other_income', amountNative:0.096017, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.93
    { rawLabel:'Receitas Contribuições Conselheiros', normalizedCategory:'member_dues', amountNative:0.500735, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Receitas Time mania', normalizedCategory:'other_income', amountNative:0.18172, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:1.899206, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/balanco-patrimonial-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'Receitas Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:2.220891, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Escolinha de Futebol', normalizedCategory:'youth_football', amountNative:0.119131, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Receitas Doações/Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.50307, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Receitas CBF', normalizedCategory:'broadcasting', amountNative:5.266022, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.753607, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Sócio Tigrão', normalizedCategory:'member_dues', amountNative:0.368941, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Direitos Federativos Atletas', normalizedCategory:'player_sales', amountNative:0.6, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Alugueis', normalizedCategory:'other_income', amountNative:0.269565, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.93
    { rawLabel:'Receitas Contribuições Conselheiros', normalizedCategory:'member_dues', amountNative:0.389937, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Receitas Time mania', normalizedCategory:'other_income', amountNative:0.260774, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:1.142537, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/balanco-patrimonial-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Receitas Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:3.342234, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Escolinha de Futebol', normalizedCategory:'youth_football', amountNative:0.110915, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Receitas Doações/Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:2.280957, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Receitas CBF', normalizedCategory:'broadcasting', amountNative:5.539438, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.839, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Sócio Tigrão', normalizedCategory:'member_dues', amountNative:0.739465, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Direitos Federativos Atletas', normalizedCategory:'player_sales', amountNative:0.105638, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Alugueis', normalizedCategory:'other_income', amountNative:0.086921, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.93
    { rawLabel:'Receitas Federação Goiana', normalizedCategory:'broadcasting', amountNative:0.405, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Contribuições Conselheiros', normalizedCategory:'member_dues', amountNative:0.39385, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Receitas Time mania', normalizedCategory:'other_income', amountNative:0.346337, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:22.764537, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'RECEITA COM DIREITOS DE TRANSMISSÃO E PREMIAÇÕES', normalizedCategory:'broadcasting', amountNative:16.622995, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'RECEITA PATROCÍNIO E MARKETING', normalizedCategory:'sponsorship_commercial', amountNative:4.50246, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'RECEITAS DIVERSAS', normalizedCategory:'other_income', amountNative:2.989799, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'(-) DEDUÇÕES DA RECEITA BRUTA', normalizedCategory:'other_income', amountNative:-1.511113, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.95
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'RECEITA PATROCINIO E MARKETING', normalizedCategory:'sponsorship_commercial', amountNative:5.431481, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'RECEITAS DIVERSAS', normalizedCategory:'other_income', amountNative:12.457555, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'(-) DEDUÇÕES DA RECEITA BRUTA', normalizedCategory:'other_income', amountNative:-1.051383, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.95
    { rawLabel:'Venda/Empréstimos de atletas', normalizedCategory:'player_sales', amountNative:1.199337, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Programa socio-torcedor', normalizedCategory:'member_dues', amountNative:1.079868, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Cota televisiva', normalizedCategory:'broadcasting', amountNative:9.320801, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Incentivo Governo Federal', normalizedCategory:'other_income', amountNative:1.514364, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:2.654, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:3.251231, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Uso de imagem / royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.932899, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'sponsorship_commercial', amountNative:0.008877, disclosureLevel:'aggregated' }, // pág. 19, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'RECEITAS DIVERSAS', normalizedCategory:'other_income', amountNative:5.165898, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'(-) DEDUÇÕES DA RECEITA BRUTA', normalizedCategory:'other_income', amountNative:-0.279902, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.95
    { rawLabel:'Venda de atletas', normalizedCategory:'player_sales', amountNative:2.718339, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Programa sócio torcedor', normalizedCategory:'member_dues', amountNative:0.786306, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Cota televisiva', normalizedCategory:'broadcasting', amountNative:10.448425, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:3.77718, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Patrocinadores', normalizedCategory:'sponsorship_commercial', amountNative:5.017601, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Marca própria - Loja Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.859339, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Venda de participações', normalizedCategory:'player_sales', amountNative:0.825366, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Mecanismo Solidariedade', normalizedCategory:'player_sales', amountNative:0.026993, disclosureLevel:'aggregated' }, // pág. 20, precedente
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'RECEITA COM DIREITOS DE TRANSMISSÃO, PARTICIPAÇÃO E PREMIAÇÃO', normalizedCategory:'broadcasting', amountNative:49.144011, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.97
    { rawLabel:'RECEITAS DIVERSAS', normalizedCategory:'other_income', amountNative:5.069997, disclosureLevel:'aggregated' }, // pág. 21, precedente
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/notas-explicativas-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/notas-explicativas-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'Receitas Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:1.965462, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Doações/Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.630388, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.288755, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Direitos Federativos Atletas', normalizedCategory:'player_sales', amountNative:0.665997, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Aluguéis', normalizedCategory:'other_income', amountNative:0.069207, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Extraordinárias', normalizedCategory:'other_income', amountNative:0.057821, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Contribuições Conselheiros', normalizedCategory:'member_dues', amountNative:0.303172, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:0.038241, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas CBF', normalizedCategory:'broadcasting', amountNative:1.89, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Escolinha de Futebol', normalizedCategory:'youth_football', amountNative:0.12687, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Sócio Tigrão', normalizedCategory:'member_dues', amountNative:0.001461, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receitas Timemania', normalizedCategory:'other_income', amountNative:0.078862, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const vilanovabrExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Adesão ao condomínio LFU', normalizedCategory:'exceptional_items', amountNative:12.85, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'(-) Comissões', normalizedCategory:'other_expenses', amountNative:-3.121, disclosureLevel:'aggregated' }, // pág. 56, Claude 0.8
    { rawLabel:'(-) Gastos para viabilizar a venda', normalizedCategory:'other_expenses', amountNative:-0.52, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.97
    { rawLabel:'Perdas na venda de ativos', normalizedCategory:'other_expenses', amountNative:-0.356, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Amortização de direitos sobre atletas (i)', normalizedCategory:'player_amortisation', amountNative:-12.077, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Premiações (ii)', normalizedCategory:'wages_squad', amountNative:-6.676, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-6.076, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Gastos com jogos e competições', normalizedCategory:'match_organisation_expense', amountNative:-5.898, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Despesas com transações de atletas', normalizedCategory:'other_expenses', amountNative:-2.686, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-0.89, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Perdas esperadas com processos trabalhistas', normalizedCategory:'other_expenses', amountNative:-0.681, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.93
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-0.535, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-1.708, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Férias e encargos', normalizedCategory:'admin_general_expense', amountNative:-0.942, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'13º salário e encargos', normalizedCategory:'admin_general_expense', amountNative:-0.578, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-0.016, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.713, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.97
    { rawLabel:'Uso e consumo', normalizedCategory:'admin_general_expense', amountNative:-2.717, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.813, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Esportes olímpicos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.774, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'admin_general_expense', amountNative:-0.767, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Manutenções de ativos', normalizedCategory:'admin_general_expense', amountNative:-0.743, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.97
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-0.73, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Honorários jurídicos', normalizedCategory:'admin_general_expense', amountNative:-0.686, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Taxas associativas', normalizedCategory:'admin_general_expense', amountNative:-0.556, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Multas contratuais', normalizedCategory:'other_expenses', amountNative:-0.435, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Reembolsos', normalizedCategory:'admin_general_expense', amountNative:-0.325, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-0.093, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Despesas com transporte', normalizedCategory:'match_organisation_expense', amountNative:-0.082, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.93
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.077, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.96
    { rawLabel:'Impostos estaduais', normalizedCategory:'admin_general_expense', amountNative:-0.069, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.063, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.9
    { rawLabel:'Honorários contábeis', normalizedCategory:'admin_general_expense', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Impostos municipais', normalizedCategory:'admin_general_expense', amountNative:-0.013, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Outros', normalizedCategory:'admin_general_expense', amountNative:-0.014, disclosureLevel:'aggregated' }, // pág. 55, precedente
  ],
  2015: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-4.361587, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Depto Esportes', normalizedCategory:'lump_football_operations_expense', amountNative:-3.649581, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.046495, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.541265, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
  ],
  2016: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-9.801794, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Depto Esportes', normalizedCategory:'lump_football_operations_expense', amountNative:-4.783521, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.185638, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.535155, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Despesas Diversas', normalizedCategory:'other_expenses', amountNative:-0.013946, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Ajustes de Exercícios Anteriores', normalizedCategory:'exceptional_items', amountNative:-0.34373, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
  ],
  2017: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-7.215652, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Depto Esportes', normalizedCategory:'lump_football_operations_expense', amountNative:-31.235464, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.146867, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.867857, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Despesas Diversas', normalizedCategory:'other_expenses', amountNative:-0.008291, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) CUSTOS GERAIS', normalizedCategory:'admin_general_expense', amountNative:-0.09868, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'(-) DESPESAS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-6.451134, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'(-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES', normalizedCategory:'admin_general_expense', amountNative:-0.372019, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'(-) PROVISÕES E CONTIGÊNCIAS', normalizedCategory:'admin_general_expense', amountNative:-12.27047, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'(-) DESPESAS COM VENDAS EM GERAL', normalizedCategory:'admin_general_expense', amountNative:-6.188497, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'(-) OUTRAS DESPESAS', normalizedCategory:'other_expenses', amountNative:-4.991006, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) DESPESAS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-6.312614, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES', normalizedCategory:'admin_general_expense', amountNative:-0.665202, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'(-) PROVISÕES E CONTIGÊNCIAS', normalizedCategory:'admin_general_expense', amountNative:-5.447099, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) DESPESAS COM VENDAS EM GERAL', normalizedCategory:'admin_general_expense', amountNative:-8.82054, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) OUTRAS DESPESAS', normalizedCategory:'other_expenses', amountNative:-9.542741, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) CUSTOS GERAIS', normalizedCategory:'admin_general_expense', amountNative:-0.003564, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'(-) DESPESAS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-8.719408, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES', normalizedCategory:'admin_general_expense', amountNative:-1.201971, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'(-) PROVISÕES E CONTIGÊNCIAS', normalizedCategory:'admin_general_expense', amountNative:-4.450807, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) DESPESAS COM VENDAS EM GERAL', normalizedCategory:'admin_general_expense', amountNative:-9.735194, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'(-) OUTRAS DESPESAS', normalizedCategory:'other_expenses', amountNative:-9.510671, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) DEDUÇÕES DA RECEITA BRUTA', normalizedCategory:'other_expenses', amountNative:-0.491419, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'(-) DESPESAS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-21.884377, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'(-) DESPESAS COM IMPOSTOS, TAXAS E CONTRIBUIÇÕES', normalizedCategory:'admin_general_expense', amountNative:-1.465905, disclosureLevel:'aggregated' }, // pág. 21, Jev 1
    { rawLabel:'(-) PROVISÕES E CONTIGÊNCIAS', normalizedCategory:'admin_general_expense', amountNative:-5.067055, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'(-) DESPESAS COM ATIVIDADE EM GERAL', normalizedCategory:'admin_general_expense', amountNative:-7.237539, disclosureLevel:'aggregated' }, // pág. 21, precedente
    { rawLabel:'(-) OUTRAS DESPESAS', normalizedCategory:'other_expenses', amountNative:-9.776197, disclosureLevel:'aggregated' }, // pág. 21, Jev 0.98
  ],
  2014: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-2.899833, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.157814, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.160415, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Ajustes de Exercícios Anteriores', normalizedCategory:'exceptional_items', amountNative:-0.002719, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Depto Esportes', normalizedCategory:'lump_football_operations_expense', amountNative:-3.268187, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const vilanovabrFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2025-12-31
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fx:5.5, fxSource:'document_close',
    sourceId:'vilanova-br-demonstrativo-financeiro-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.541, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-4.804},
      {label:'Receitas financeiras', value:1.263},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:43.34, officialTotalExpenses:55.491, officialPAT:-2.842,
  },
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2015-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2015
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 38.324,22. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): los 13 renglones de receita suman 6.928.521,06 = TOTAL DAS RECEITAS (L70), con las Receitas Financeiras 38.324,22 adentro; la extracción las sumaba con el mismo signo que el costo financiero
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -5.029,11. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 6.890.197 - 8.598.927 + 38.324 - 5.029 = -1.675.435 (L79, -1.675.435,38)
  2015: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Televisión, Salarios y primas (plantel y cuerpo técnico)
    incluidoEn:{ broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'vilanova-br-balanco-patrimonial-2015',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.033295, tax:0,
    extraRows: [
      {label:'Receitas Financeiras', value:0.038324},
      {label:'Despesas Financeiras', value:-0.005029},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas Atividades Esportivas', lado:'revenue', importe:2.338518, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas Depto Esportes', lado:'expense', importe:3.649581, motivo:'Claude 2026-10-09: Despesas Depto Esportes es el costo del departamento de fútbol sin desglose en el estado (renglón único): lump_football_operations_expense'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:6.890197, officialTotalExpenses:8.598927, officialPAT:-1.675435,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2016-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2016
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 343.729,73. Onboarding to-do 165 (Claude, 2026-10-09): el renglón L75 no llegó a las filas extraídas; está dentro del TOTAL DAS DESPESAS impreso: 9.801.794,10 + 4.783.520,98 + 185.637,84 + 535.154,62 + 343.729,73 + 13.946,18 = 15.663.783,45; + financiera 33.202,07 = 15.696.985,52 (L77)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 30.508,57. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): 12.894.474,04 + 30.508,57 = 12.924.982,61 = TOTAL DAS RECEITAS (L67)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -33.202,07. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 12.894.474,04 - 15.663.783,45 + 30.508,57 - 33.202,07 = -2.772.002,91 = déficit impreso (L78)
  2016: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2016-12-31',
    sourceId:'vilanova-br-balanco-patrimonial-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.002693, tax:0,
    extraRows: [
      {label:'Receitas Financeiras', value:0.030509},
      {label:'Despesas Financeiras', value:-0.033202},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas Atividades Esportivas', lado:'revenue', importe:2.220891, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas Depto Esportes', lado:'expense', importe:4.783521, motivo:'Claude 2026-10-09: Despesas Depto Esportes es el costo del departamento de fútbol sin desglose en el estado (renglón único): lump_football_operations_expense'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:12.894474, officialTotalExpenses:15.320054, officialPAT:-2.772003,
  },
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2017-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2017
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): L105 (39.541.429,69) es el total de los renglones de despesas (L98-L104, con la financiera 67.298,36): se contaba dos veces; 7.215.652,32 + 31.235.464,33 + 146.866,71 + 867.856,64 + 0 + 8.291,33 = 39.474.131,33; + 67.298,36 = 39.541.429,69
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.019,64. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): los 13 renglones de receitas suman 37.956.311,55 = TOTAL DAS RECEITAS (L97) con las financeiras adentro
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -67.298,36. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 37.954.291,91 - 39.474.131,33 + 2.019,64 - 67.298,36 = -1.585.118,14 = déficit impreso (L106)
  2017: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2017-12-31',
    sourceId:'vilanova-br-balanco-patrimonial-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.065278, tax:0,
    extraRows: [
      {label:'Receitas Financeiras', value:0.00202},
      {label:'Despesas Financeiras', value:-0.067298},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas Atividades Esportivas', lado:'revenue', importe:3.342234, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas Depto Esportes', lado:'expense', importe:31.235464, motivo:'Claude 2026-10-09: Despesas Depto Esportes es el costo del departamento de fútbol sin desglose en el estado (renglón único): lump_football_operations_expense'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:37.954292, officialTotalExpenses:39.474131, officialPAT:-1.585118,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2021
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'vilanova-br-demonstrativo-financeiro-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:5.972119, tax:0,
    extraRows: [
      {label:'(-) DESPESA FINANCEIRA', value:-0.657771},
      {label:'RECEITAS FINANCEIRAS', value:6.62989},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:22.60414, officialTotalExpenses:30.371805, officialPAT:-1.795546,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.199.337,47. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.079.868,47. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 9.320.800,90. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.514.364,23. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.654.000,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.251.231,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 932.899,31. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 8.877,40. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (19.961.378,78, L141) se abre con la nota 30.1 (L811-829), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'vilanova-br-demonstrativo-financeiro-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.896299, tax:0,
    extraRows: [
      {label:'(-) DESPESA FINANCEIRA', value:-4.429115},
      {label:'RECEITAS FINANCEIRA', value:0.532816},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:36.799031, officialTotalExpenses:30.788196, officialPAT:2.114536,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 2.718.339,04. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 786.306,37. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 10.448.424,84. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.777.180,00. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 5.017.600,75. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 859.339,42. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 825.365,61. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 26.993,18. Onboarding to-do 165 (Claude, 2026-10-09): 'RECEITA COM PRESTAÇÃO DE SERVIÇOS' (24.459.549,21, L108) se abre con la nota 30.1 (L752-768), cuyas filas suman exacto; el reintento por categorías en 0 no la abrió
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'vilanova-br-demonstrativo-financeiro-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.184577, tax:0,
    extraRows: [
      {label:'(-) DESPESAS FINANCEIRAS', value:-4.019144},
      {label:'RECEITAS FINANCEIRAS', value:3.834567},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:29.345546, officialTotalExpenses:33.621615, officialPAT:-4.460647,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae la fecha de la firma (2025-04-30); el ejercicio del documento cierra el 2024-12-31
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fx:6.18, fxSource:'document_close',
    sourceId:'vilanova-br-demonstrativo-financeiro-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-13.661356, tax:0,
    extraRows: [
      {label:'(-) DESPESAS FINANCEIRAS', value:-14.367129},
      {label:'RECEITAS FINANCEIRAS', value:0.705773},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:54.214008, officialTotalExpenses:45.922491, officialPAT:-5.369839,
  },
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2014-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2014
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.890.000,00. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L81) lee 1.880.000,00; el PDF imprime 1.890.000,00. Con 1.890.000,00 los 12 renglones suman 6.116.235,71 = TOTAL DAS RECEITAS impreso (con 1.880.000,00 suman 6.106.235,71) y la columna 2014 del balance 2015 también dice 6.116.235,71
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 3.268.187,41. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L93) lee 3.268.157,41; el PDF imprime 3.268.187,41. Con 3.268.187,41 los 6 renglones suman 6.493.155,07 = TOTAL DAS DESPESAS impreso (con 3.268.157,41 suman 6.493.125,07, 30 menos)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 126.870,00. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L79) rotula 'Receitas de Eventos'; el PDF dice 'Receitas Escolinha de Futebol' (126.870,00)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 1.461,44. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L83) rotula 'Receitas Sócio Torcedor'; el PDF dice 'Receitas Sócio Tigrão' (1.461,44)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 78.862,10. Onboarding to-do 165 (Claude, 2026-10-09): la transcripción (.md L88) rotula 'Receitas Sindicatos'; el PDF dice 'Receitas Timemania' (78.862,10)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 2.338.741,92. Onboarding to-do 165 (Claude, 2026-10-09): columna 2013 (no se carga); el PDF dice 2.338.741,82
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 1.880.000,00. Onboarding to-do 165 (Claude, 2026-10-09): el PDF dice 1.890.000,00; la fila que se carga va corregida por el ajuste fila
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 288.754,80. Onboarding to-do 165 (Claude, 2026-10-09): Receitas Publicidade 2014, confirmado en la imagen de la pág. 1
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 365.952,66. Onboarding to-do 165 (Claude, 2026-10-09): columna 2013 (no se carga); el PDF dice 365.952,68
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): confirmado = 3.268.157,41. Onboarding to-do 165 (Claude, 2026-10-09): el PDF dice 3.268.187,41; la fila que se carga va corregida por el ajuste fila
  2014: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2021, 2022, 2023, 2024, 2025): Salarios y primas (plantel y cuerpo técnico)
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2014-12-31',
    sourceId:'vilanova-br-notas-explicativas-2014',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.004187, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas Atividades Esportivas', lado:'revenue', importe:1.965462, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas Depto Esportes', lado:'expense', importe:3.268187, motivo:'Claude 2026-10-09: Despesas Depto Esportes es el costo del departamento de fútbol sin desglose en el estado (renglón único): lump_football_operations_expense'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:6.116236, officialTotalExpenses:6.488968, officialPAT:-0.376919,
  },
};
const vilanovabrPresupuestoOverlayByYear = {};

const vilanovabrPasesData = [];
const vilanovabrResultadosData = {};
const vilanovabrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vilanova-br'] = {
  revenueLinesByYear: vilanovabrRevenueLinesByYear, expenseLinesByYear: vilanovabrExpenseLinesByYear,
  fiscalYearMeta: vilanovabrFiscalYearMeta, pasesData: vilanovabrPasesData,
  resultadosData: vilanovabrResultadosData, titulosData: vilanovabrTitulosData,
  presupuestoOverlayByYear: vilanovabrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'vilanova-br-demonstrativo-financeiro-2025': {
    id:'vilanova-br-demonstrativo-financeiro-2025', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-balanco-patrimonial-2015': {
    id:'vilanova-br-balanco-patrimonial-2015', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — balanco-patrimonial-2015 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-balanco-patrimonial-2016': {
    id:'vilanova-br-balanco-patrimonial-2016', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — balanco-patrimonial-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-balanco-patrimonial-2017': {
    id:'vilanova-br-balanco-patrimonial-2017', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — balanco-patrimonial-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-demonstrativo-financeiro-2021': {
    id:'vilanova-br-demonstrativo-financeiro-2021', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-demonstrativo-financeiro-2022': {
    id:'vilanova-br-demonstrativo-financeiro-2022', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-demonstrativo-financeiro-2023': {
    id:'vilanova-br-demonstrativo-financeiro-2023', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-demonstrativo-financeiro-2024': {
    id:'vilanova-br-demonstrativo-financeiro-2024', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-notas-explicativas-2014': {
    id:'vilanova-br-notas-explicativas-2014', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — notas-explicativas-2014 (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/notas-explicativas-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['vilanova-br'] = null;
