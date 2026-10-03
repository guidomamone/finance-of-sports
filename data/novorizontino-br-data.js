// ============================================================================
// data/novorizontino-br-data.js — Novorizontino (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "novorizontino-br" — slug de "Novorizontino" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               pendiente "Novorizontino" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
//   displayName        ok        "Novorizontino" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2024-12-31 = 6.1923 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2024)
//   sourceId           ok        "novorizontino-br-demonstracoes-financeiras-2024" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Novorizontino"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2024-12-31","sourceId":"novorizontino-br-demonstracoes-financeiras-2024"}
// ============================================================================

const novorizontinobrRevenueLinesByYear = {
  // 2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Repasse da federação', normalizedCategory:'broadcasting', amountNative:7.614, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Negociação e empréstimo de atletas (nota nº6)', normalizedCategory:'player_sales', amountNative:0.645, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.29, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Vendas de ingressos e bar', normalizedCategory:'matchday_competition', amountNative:0.033, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0.432, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.92
    { rawLabel:'Receita do bar', normalizedCategory:'matchday_competition', amountNative:0.006, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Outras receitas operacionais', normalizedCategory:'other_income', amountNative:0.035, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:9.921046, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:14.242707, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:6.240284, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:3.619248, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:3.550867, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Fomento do futebol', normalizedCategory:'other_income', amountNative:1.671711, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:0.85, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.85
    { rawLabel:'Convênios', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.06192, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
    { rawLabel:'Impostos incidentes sobre a receita', normalizedCategory:'other_income', amountNative:-1.303783, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.98
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Repasse da federação', normalizedCategory:'broadcasting', amountNative:4.918, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Negociação e empréstimo de atletas', normalizedCategory:'player_sales', amountNative:3.392, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.728, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Vendas de ingressos e bar', normalizedCategory:'matchday_competition', amountNative:0.899, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0.639, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.92
    { rawLabel:'Recuperação de despesas', normalizedCategory:'other_income', amountNative:0.077, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Reversão de provisão de contingências', normalizedCategory:'other_income', amountNative:1.577, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Repasse da federação', normalizedCategory:'broadcasting', amountNative:6.374, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Negociação e empréstimo de atletas (nota nº6)', normalizedCategory:'player_sales', amountNative:3.128, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.314, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Vendas de ingressos e bar', normalizedCategory:'matchday_competition', amountNative:0.349, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0.095, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.92
    { rawLabel:'Outras receitas operacionais', normalizedCategory:'other_income', amountNative:0.002, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:11.804077, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:6.539894, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.297468, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.385083, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:0.356997, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:0.19, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Convênios', normalizedCategory:'other_income', amountNative:0.189906, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.309436, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Repasse da federação', normalizedCategory:'broadcasting', amountNative:3.928, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Negociação e empréstimo de atletas', normalizedCategory:'player_sales', amountNative:1.729, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.161, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Vendas de ingressos e bar', normalizedCategory:'matchday_competition', amountNative:1.093, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.8
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0.25, disclosureLevel:'aggregated' }, // pág. 24, precedente
  ],
};
const novorizontinobrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Salários, ordenados e outros custos com pessoal', normalizedCategory:'wages_squad', amountNative:-14.546, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Gastos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.188, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.594, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.245, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'Serviços prestados (i)', normalizedCategory:'admin_general_expense', amountNative:-2.242, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Despesas administrativas (ii)', normalizedCategory:'admin_general_expense', amountNative:-1.122, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Manutenções (ii)', normalizedCategory:'admin_general_expense', amountNative:-1.015, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.8
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.574, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Salários, ordenados e outros custos - Projeto Sub 15 e 17', normalizedCategory:'youth_other_sports_expense', amountNative:-0.432, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'Ganhos/perdas com atletas', normalizedCategory:'player_impairment', amountNative:-0.409, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Combustível e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.134, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.94
    { rawLabel:'Depreciação / Amortização', normalizedCategory:'depreciation', amountNative:-0.16, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.205, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
  ],
  2024: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-12.632351, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gastos com atletas e comissão técnica', normalizedCategory:'wages_squad', amountNative:-19.919406, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-6.44255, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-4.376999, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Manutenção e conservação', normalizedCategory:'admin_general_expense', amountNative:-0.636562, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.97
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-2.428272, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.347567, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Premiações', normalizedCategory:'other_expenses', amountNative:-0.063553, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Acordos trabalhistas e cíveis', normalizedCategory:'admin_general_expense', amountNative:-0.91925, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Outras', normalizedCategory:'other_expenses', amountNative:-0.407531, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-3.834306, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.825896, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'Administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-3.625275, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.725749, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.95
    { rawLabel:'Gastos com atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-1.061937, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.85
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-0.069131, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.91
  ],
  2019: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Salários, ordenados e outros custos com pessoal', normalizedCategory:'wages_squad', amountNative:-9.387, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Gastos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.325, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.545, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.257, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'Serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-1.419, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Provisão para contingências', normalizedCategory:'admin_general_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 29, ? 0.6
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.867, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.776, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.95
    { rawLabel:'Salários, ordenados e outras despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.591, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.075, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Combustível e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.099, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.94
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.074, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.349, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
  ],
  2020: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Salários, ordenados e outros custos com pessoal', normalizedCategory:'wages_squad', amountNative:-11.607, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'Gastos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.256, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.568, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.261, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-1.536, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Provisão para Perdas (nota nº5)', normalizedCategory:'exceptional_items', amountNative:-1.5, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.901, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.607, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.17, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Combustível e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.1, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.94
    { rawLabel:'Depreciação / Amortização', normalizedCategory:'depreciation', amountNative:-0.096, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.3, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
  ],
  2023: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-10.169016, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Gastos com atletas e comissão técnica', normalizedCategory:'wages_squad', amountNative:-20.357108, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-1.28046, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Assessoria esportiva', normalizedCategory:'admin_general_expense', amountNative:-3.377493, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Assessoria de imprensa', normalizedCategory:'admin_general_expense', amountNative:-0.037318, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Lavanderia', normalizedCategory:'admin_general_expense', amountNative:-0.2553, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Energia elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.333616, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Água e esgoto', normalizedCategory:'admin_general_expense', amountNative:-0.078538, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Assessoria jurídica', normalizedCategory:'admin_general_expense', amountNative:-0.330075, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.14898, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Assessoria administrativa', normalizedCategory:'admin_general_expense', amountNative:-0.099234, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Serviços médicos', normalizedCategory:'admin_general_expense', amountNative:-0.007225, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Medicamentos', normalizedCategory:'admin_general_expense', amountNative:-0.026158, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Materiais de escritório e de limpeza', normalizedCategory:'admin_general_expense', amountNative:-0.024053, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Software', normalizedCategory:'admin_general_expense', amountNative:-0.120445, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Serviços contábeis e auditoria', normalizedCategory:'admin_general_expense', amountNative:-0.103814, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Segurança patrimonial', normalizedCategory:'admin_general_expense', amountNative:-0.052956, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Telefone e internet', normalizedCategory:'admin_general_expense', amountNative:-0.089846, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Despesas diversas', normalizedCategory:'other_expenses', amountNative:-0.583514, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.9
    { rawLabel:'Acordos trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.15, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'Acordos cíveis', normalizedCategory:'admin_general_expense', amountNative:-2.32, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.8
    { rawLabel:'Outras', normalizedCategory:'other_expenses', amountNative:-0.128982, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-4.156403, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-1.808509, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.95
    { rawLabel:'Atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-3.598404, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.93
    { rawLabel:'Aluguéis', normalizedCategory:'other_expenses', amountNative:-0.691616, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.197044, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.95
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-0.015053, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
  2018: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Salários, ordenados e outros custos com pessoal', normalizedCategory:'wages_squad', amountNative:-8.377, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.8
    { rawLabel:'Gastos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.459, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.525, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.304, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.98
    { rawLabel:'Serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-1.523, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Provisão para contingências', normalizedCategory:'admin_general_expense', amountNative:-1.227, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.777, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.516, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Salários, ordenados e outras despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.205, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.85
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.13, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Combustível e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.101, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.94
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.152, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
  ],
};
const novorizontinobrFiscalYearMeta = {
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = matchday_competition. Guido 2026-10-02: como 'Vendas de ingressos e bar' (matchday_competition); R$ 6 mil, inmaterial
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = player_impairment. Guido 2026-10-02: pérdida con atletas dentro de despesas gerais = baja de pases, no amortización del año
  2021: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.888, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-0.888},
      {label:'Receitas financeiras', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:9.055, officialTotalExpenses:22.866, officialPAT:-14.699,
  },
  2024: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.229677, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.271777},
      {label:'Despesas financeiras', value:-1.501454},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:38.854, officialTotalExpenses:60.316335, officialPAT:-22.692012,
  },
  2019: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.226, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-0.294},
      {label:'Receitas financeiras', value:0.068},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:12.23, officialTotalExpenses:15.787, officialPAT:-3.783,
  },
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): categoria = exceptional_items. Guido 2026-10-02: provisión única por una cobranza a Corinthians por venta de un atleta, en discusión judicial; no recurrente
  2020: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2020-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.484, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-0.484},
      {label:'Receitas financeiras', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:10.262, officialTotalExpenses:17.402, officialPAT:-9.124,
  },
  2023: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.248348, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.035962},
      {label:'Despesas financeiras', value:-1.28431},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:22.072861, officialTotalExpenses:50.54116, officialPAT:-29.716647,
  },
  2018: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2018-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.289, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-0.349},
      {label:'Receitas financeiras', value:0.06},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:7.161, officialTotalExpenses:15.357, officialPAT:-8.485,
  },
};
const novorizontinobrPresupuestoOverlayByYear = {};

const novorizontinobrPasesData = [];
const novorizontinobrResultadosData = {};
const novorizontinobrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['novorizontino-br'] = {
  revenueLinesByYear: novorizontinobrRevenueLinesByYear, expenseLinesByYear: novorizontinobrExpenseLinesByYear,
  fiscalYearMeta: novorizontinobrFiscalYearMeta, pasesData: novorizontinobrPasesData,
  resultadosData: novorizontinobrResultadosData, titulosData: novorizontinobrTitulosData,
  presupuestoOverlayByYear: novorizontinobrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'novorizontino-br-demonstracoes-financeiras-2019': {
    id:'novorizontino-br-demonstracoes-financeiras-2019', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2020': {
    id:'novorizontino-br-demonstracoes-financeiras-2020', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2021': {
    id:'novorizontino-br-demonstracoes-financeiras-2021', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2024': {
    id:'novorizontino-br-demonstracoes-financeiras-2024', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2023': {
    id:'novorizontino-br-demonstracoes-financeiras-2023', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2018': {
    id:'novorizontino-br-demonstracoes-financeiras-2018', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['novorizontino-br'] = null;
