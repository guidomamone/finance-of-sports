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
  // 2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:36.984915, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:17.103865, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.12, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:5.902023, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:3.421619, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Fomento do futebol', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:1.01, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:2.587711, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:0.345669, disclosureLevel:'aggregated' }, // pág. 7, ? 0.6
    { rawLabel:'Convênios', normalizedCategory:'other_income', amountNative:0.972619, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.09438, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Impostos incidentes sobre a receita', normalizedCategory:'other_income', amountNative:-1.978549, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'Convênio P.M.N.H nº 21/10', normalizedCategory:'other_income', amountNative:0.07, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Doações, Receitas de Patrocínio, Locação de Espaço, e Ev', normalizedCategory:'other_income', amountNative:0.06035, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:11.951683, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Negociação de atletas', normalizedCategory:'player_sales', amountNative:12.741552, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:2.038276, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.0085, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:0.764723, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:0.596, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Convênios', normalizedCategory:'other_income', amountNative:0.897625, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.004875, disclosureLevel:'aggregated' }, // pág. 10, precedente
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2014-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2014-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'RENDAS DE JOGOS, PATROCÍNIOS, LOCAÇÕES E OUTRAS RECEITAS OPERACIONAIS', normalizedCategory:'lump_football_operations', amountNative:8.019563, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.05615, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'RECURSOS PUBLICOS', normalizedCategory:'other_income', amountNative:0.070526, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.9
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'PATROCINIO NO UNIFORME', normalizedCategory:'sponsorship_commercial', amountNative:0.19, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'PATROCÍNIO NO ESTÁDIO', normalizedCategory:'sponsorship_commercial', amountNative:0.004, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'LOCAÇÃO DE CADEIRA S/ASSENTOS', normalizedCategory:'season_tickets', amountNative:0.02, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'VENDAS DE INGRESSOS', normalizedCategory:'matchday_competition', amountNative:0.605, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'RECEITAS DO BAR', normalizedCategory:'matchday_competition', amountNative:0.01, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'RECEITA C/ NEGOCIAÇÃO DE ATLETA', normalizedCategory:'player_sales', amountNative:0.207, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'REPASSE DA FEDERAÇÃO', normalizedCategory:'broadcasting', amountNative:2.204, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.002, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'117 3.1.01.01.0009 - DOAÇOES RECEBIDAS', normalizedCategory:'other_income', amountNative:0.003576, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS', normalizedCategory:'season_tickets', amountNative:0.006076, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'33 3.1.01.01.0002 - PATROCINIO EM PLACAS', normalizedCategory:'sponsorship_commercial', amountNative:0.004, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO', normalizedCategory:'sponsorship_commercial', amountNative:0.004385, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'32 3.1.01.01.0001 - PATROCINIO NO UNIFORME', normalizedCategory:'sponsorship_commercial', amountNative:0.0475, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'37 3.1.01.01.0006 - RECEITAS DO BAR', normalizedCategory:'matchday_competition', amountNative:0.002766, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.9
    { rawLabel:'39 3.1.01.01.0008 - REPASSE DA FEDERAÇÃO', normalizedCategory:'broadcasting', amountNative:0.3002, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.9
    { rawLabel:'36 3.1.01.01.0005 - VENDAS DE INGRESSOS', normalizedCategory:'matchday_competition', amountNative:0.377871, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'225 3.1.04.01.0001 - RECUPERACAO DE DESPESA', normalizedCategory:'other_income', amountNative:0.0002, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2014-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2014-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'144 3.1.01.01.0011 - CESSÃO DIREITO EXPLOR.EVENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.05, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'180 3.1.01.01.0013 - CESSÃO ECONOMICO DO JOGADOR', normalizedCategory:'player_sales', amountNative:0.545, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'159 3.1.01.01.0012 - CESSÃO EXPLORAÇÃO PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:0.04, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'117 3.1.01.01.0009 - DOAÇÕES RECEBIDAS', normalizedCategory:'other_income', amountNative:0.00242, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS', normalizedCategory:'season_tickets', amountNative:0.05827, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'33 3.1.01.01.0002 - PATROCINIO EM PLACAS', normalizedCategory:'sponsorship_commercial', amountNative:0.026899, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO', normalizedCategory:'sponsorship_commercial', amountNative:0.087011, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'32 3.1.01.01.0001 - PATROCINIO NO UNIFORME', normalizedCategory:'sponsorship_commercial', amountNative:0.021139, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'37 3.1.01.01.0006 - RECEITAS DO BAR', normalizedCategory:'matchday_competition', amountNative:0.008188, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.9
    { rawLabel:'36 3.1.01.01.0005 - VENDAS DE INGRESSOS', normalizedCategory:'matchday_competition', amountNative:0.235844, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'179 3.1.01.02.0003 - DEV. DE CONVÊNIO NÃO UTILIZAD', normalizedCategory:'other_income', amountNative:-0.014755, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/balanco-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/balanco-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'32 3.1.01.01.0001 - PATROCINIO NO UNIFORME', normalizedCategory:'sponsorship_commercial', amountNative:0.233, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'33 3.1.01.01.0002 - PATROCINIO EM PLACAS', normalizedCategory:'sponsorship_commercial', amountNative:0.148479, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'34 3.1.01.01.0003 - PATROCINIO NO ESTÁDIO', normalizedCategory:'sponsorship_commercial', amountNative:0.893637, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.98
    { rawLabel:'35 3.1.01.01.0004 - LOCAÇÃO DE CADEIRA S/ASSENTOS', normalizedCategory:'season_tickets', amountNative:0.0641, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'36 3.1.01.01.0005 - VENDAS DE INGRESSOS', normalizedCategory:'matchday_competition', amountNative:0.118557, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'37 3.1.01.01.0006 - RECEITAS DO BAR', normalizedCategory:'matchday_competition', amountNative:0.001604, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.9
    { rawLabel:'38 3.1.01.01.0007 - RECEITA C/ NEGOCIAÇ DE ATLETA', normalizedCategory:'player_sales', amountNative:0.065422, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'39 3.1.01.01.0008 - REPASSE DA FEDERAÇÃO', normalizedCategory:'broadcasting', amountNative:0.032154, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.9
    { rawLabel:'117 3.1.01.01.0009 - DOAÇOES RECEBIDAS', normalizedCategory:'other_income', amountNative:0.004419, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'119 3.1.01.02.0002 - CONV.PROJETO NOVOS HORIZONTES', normalizedCategory:'other_income', amountNative:0.166, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.85
    { rawLabel:'179 3.1.01.02.0003 - DEV. DE CONVÊNIO NÃO UTILIZAD', normalizedCategory:'other_income', amountNative:-0.014755, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
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
  2025: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-18.017444, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.94
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-23.30482, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-3.4913, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Assessoria esportiva', normalizedCategory:'admin_general_expense', amountNative:-8.279581, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Premiações', normalizedCategory:'other_expenses', amountNative:-5.865759, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-4.670353, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Aluguel de imóveis', normalizedCategory:'admin_general_expense', amountNative:-3.953369, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.9
    { rawLabel:'Manutenção e conservação', normalizedCategory:'admin_general_expense', amountNative:-1.732136, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-1.560188, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Energia elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.192539, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Taxa da FPF e CBF', normalizedCategory:'match_organisation_expense', amountNative:-0.232674, disclosureLevel:'aggregated' }, // pág. 25, ? 0.6
    { rawLabel:'Lavanderia', normalizedCategory:'admin_general_expense', amountNative:-0.327762, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Amortização dos atletas formados', normalizedCategory:'player_amortisation', amountNative:-0.334027, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Serviços e exames médicos', normalizedCategory:'admin_general_expense', amountNative:-0.400558, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.85
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.240909, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Segurança patrimonial', normalizedCategory:'admin_general_expense', amountNative:-0.205072, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Água e esgoto', normalizedCategory:'admin_general_expense', amountNative:-0.075275, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Acordos trabalhistas e cíveis', normalizedCategory:'admin_general_expense', amountNative:-0.162989, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Medicamentos', normalizedCategory:'admin_general_expense', amountNative:-0.10307, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Materiais de escritório e de limpeza', normalizedCategory:'admin_general_expense', amountNative:-0.014285, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Telefone e internet', normalizedCategory:'admin_general_expense', amountNative:-0.067665, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Gás', normalizedCategory:'admin_general_expense', amountNative:-0.013017, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-0.56566, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-1.974967, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.94
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.437908, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-3.905545, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.524045, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Gastos com atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-7.318188, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-0.097091, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-0.42879, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.95
  ],
  2010: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.040536, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Gerais e Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.056758, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Projeto Escola de Futebol -Conv. Nº 21/10', normalizedCategory:'youth_other_sports_expense', amountNative:-0.066653, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
  ],
  2022: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Com pessoal', normalizedCategory:'wages_squad', amountNative:-21.71003, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Aluguel de imóveis', normalizedCategory:'admin_general_expense', amountNative:-1.470969, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Serviços e exames médicos', normalizedCategory:'admin_general_expense', amountNative:-0.464222, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Taxa da FPF e CBF', normalizedCategory:'match_organisation_expense', amountNative:-0.219177, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.736584, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Multa indenizatória', normalizedCategory:'other_expenses', amountNative:-0.582358, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.9
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.075291, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-1.043357, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Assessoria esportiva', normalizedCategory:'admin_general_expense', amountNative:-5.540142, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Assessoria de imprensa', normalizedCategory:'admin_general_expense', amountNative:-0.0778, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Lavanderia', normalizedCategory:'admin_general_expense', amountNative:-0.153501, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Estadias', normalizedCategory:'admin_general_expense', amountNative:-0.255755, disclosureLevel:'aggregated' }, // pág. 30, ? 0.6
    { rawLabel:'Combustíveis e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.159702, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Energia elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.060312, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Água e esgoto', normalizedCategory:'admin_general_expense', amountNative:-0.059144, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Assessoria jurídica', normalizedCategory:'admin_general_expense', amountNative:-0.199767, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.129289, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Assessoria administrativa', normalizedCategory:'admin_general_expense', amountNative:-0.041259, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Serviços médicos', normalizedCategory:'admin_general_expense', amountNative:-0.039559, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Medicamentos', normalizedCategory:'admin_general_expense', amountNative:-0.066936, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Matriais de escritório e de limpeza', normalizedCategory:'admin_general_expense', amountNative:-0.038877, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Software', normalizedCategory:'admin_general_expense', amountNative:-0.093435, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Serviços contábeis e auditoria', normalizedCategory:'admin_general_expense', amountNative:-0.083652, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Segurança patrimonial', normalizedCategory:'admin_general_expense', amountNative:-0.047528, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Telefone e internet', normalizedCategory:'admin_general_expense', amountNative:-0.069927, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Outras', normalizedCategory:'other_expenses', amountNative:-0.074989, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Com jogos', normalizedCategory:'match_organisation_expense', amountNative:-2.516472, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-1.935664, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-2.369901, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Aluguéis', normalizedCategory:'other_expenses', amountNative:-0.653795, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Material esportivo', normalizedCategory:'other_expenses', amountNative:-0.231931, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-0.017334, disclosureLevel:'aggregated' }, // pág. 10, precedente
  ],
  2017: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'(-) Ordenados, Salários, Encargos Sociais e Trabalhistas e Outros', normalizedCategory:'wages_squad', amountNative:-6.604131, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-3.128041, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Despesas Gerais e de Manutenção', normalizedCategory:'admin_general_expense', amountNative:-2.5637, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Provisões no Exercício', normalizedCategory:'admin_general_expense', amountNative:-0.414148, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'(-) DESPESAS OPERACIONAIS PAGAS COM RECURSOS PÚBLICOS', normalizedCategory:'other_expenses', amountNative:-0.070526, disclosureLevel:'aggregated' }, // pág. 5, precedente
  ],
  2016: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'(-) Ordenados, Salários, Encargos Sociais e Trabalhistas', normalizedCategory:'wages_squad', amountNative:-6.206, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-1.794, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas e Manutenção', normalizedCategory:'admin_general_expense', amountNative:-1.945, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
  ],
  2015: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'41 4.1.01.01.0002 - AJUDA DE CUSTO', normalizedCategory:'wages_squad', amountNative:-0.03938, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'55 4.1.01.01.0016 - ALUGUEL MORADIA COM TECNICA', normalizedCategory:'wages_squad', amountNative:-0.134271, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'184 4.1.01.01.0031 - ANUIDADE CBF E FEDER.PAULISTA', normalizedCategory:'match_organisation_expense', amountNative:-0.0242, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'207 4.1.01.01.0038 - AUXILIO EDUCACIONAL', normalizedCategory:'education_expense', amountNative:-0.00135, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'205 4.1.01.01.0036 - BONIFICACAO/GRATIFICACAO', normalizedCategory:'wages_squad', amountNative:-0.007214, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'58 4.1.01.01.0019 - CAFE DA MANHA', normalizedCategory:'admin_general_expense', amountNative:-0.060356, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'214 4.1.01.01.0039 - CONTRIBUICAO CONFEDERATIVA', normalizedCategory:'wages_squad', amountNative:-0.000815, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'51 4.1.01.01.0012 - CURSOS E TREINAMENTOS', normalizedCategory:'wages_squad', amountNative:-0.003241, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'44 4.1.01.01.0005 - DIREITOS DE IMAGEM', normalizedCategory:'wages_squad', amountNative:-0.940674, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'206 4.1.01.01.0037 - DSR VARIAVEL', normalizedCategory:'wages_squad', amountNative:-0.002243, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'47 4.1.01.01.0008 - FERIAS E 13° SALARIO', normalizedCategory:'wages_squad', amountNative:-0.097798, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'46 4.1.01.01.0007 - FGTS', normalizedCategory:'wages_squad', amountNative:-0.074062, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'204 4.1.01.01.0035 - HORAS EXTRAS', normalizedCategory:'wages_squad', amountNative:-0.010893, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'87 4.1.01.01.0030 - I.R.R.FONTE S/ FOLHA', normalizedCategory:'wages_squad', amountNative:-0.000338, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'45 4.1.01.01.0006 - INSS', normalizedCategory:'wages_squad', amountNative:-0.039575, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'57 4.1.01.01.0018 - LANCHES', normalizedCategory:'wages_squad', amountNative:-0.040058, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS', normalizedCategory:'other_expenses', amountNative:-0.080253, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.85
    { rawLabel:'60 4.1.01.01.0021 - MEDICAMENTOS', normalizedCategory:'admin_general_expense', amountNative:-0.028134, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'195 4.1.01.01.0034 - PENSAO ALIMENTICIA', normalizedCategory:'wages_squad', amountNative:-0.00057, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'186 4.1.01.01.0032 - PIS FOLHA PAGAMENTO', normalizedCategory:'admin_general_expense', amountNative:-0.013363, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'42 4.1.01.01.0003 - PREMIAÇOES', normalizedCategory:'wages_squad', amountNative:-0.11234, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'56 4.1.01.01.0017 - REFEIÇÕES', normalizedCategory:'wages_squad', amountNative:-0.45301, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES', normalizedCategory:'wages_squad', amountNative:-0.07267, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'40 4.1.01.01.0001 - SALARIOS', normalizedCategory:'wages_squad', amountNative:-0.945142, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'52 4.1.01.01.0013 - SEGURO PESSOAL', normalizedCategory:'wages_squad', amountNative:-0.004458, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA', normalizedCategory:'wages_squad', amountNative:-0.06315, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS', normalizedCategory:'admin_general_expense', amountNative:-0.09552, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES', normalizedCategory:'wages_squad', amountNative:-0.007747, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS', normalizedCategory:'other_expenses', amountNative:-0.00785, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS', normalizedCategory:'match_organisation_expense', amountNative:-0.114554, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'73 5.1.01.01.0008 - ASSESSORIA DE MARKETING', normalizedCategory:'admin_general_expense', amountNative:-0.010326, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA', normalizedCategory:'admin_general_expense', amountNative:-0.898135, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'75 5.1.01.01.0010 - ASSESSORIA JURÍDICA', normalizedCategory:'admin_general_expense', amountNative:-0.064113, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES', normalizedCategory:'admin_general_expense', amountNative:-0.000602, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'123 5.1.01.01.0026 - COMBUSTIVEIS E LUBRIFICANTES', normalizedCategory:'admin_general_expense', amountNative:-0.068688, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'95 5.1.01.01.0018 - CORREIOS', normalizedCategory:'admin_general_expense', amountNative:-0.001716, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'93 5.1.01.01.0017 - DESPESAS CARTORARIAS', normalizedCategory:'admin_general_expense', amountNative:-0.000367, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'181 5.1.01.01.0027 - ESTADIAS', normalizedCategory:'match_organisation_expense', amountNative:-0.019286, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'109 5.1.01.01.0025 - FRETES, CARRETOS E TRANSPORTES', normalizedCategory:'admin_general_expense', amountNative:-0.000249, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.94
    { rawLabel:'72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE', normalizedCategory:'admin_general_expense', amountNative:-0.017372, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'192 5.1.01.01.0029 - IMPOSTOS E TAXAS', normalizedCategory:'admin_general_expense', amountNative:-0.000705, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'198 5.1.01.01.0032 - IR RETIDO NA FONTE', normalizedCategory:'admin_general_expense', amountNative:-0.00591, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.93
    { rawLabel:'77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE', normalizedCategory:'admin_general_expense', amountNative:-0.00248, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO', normalizedCategory:'admin_general_expense', amountNative:-0.007049, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA', normalizedCategory:'admin_general_expense', amountNative:-0.015808, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'68 5.1.01.01.0004 - MATERIAIS DIVERSOS', normalizedCategory:'admin_general_expense', amountNative:-0.074445, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.113613, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'69 5.1.01.01.0006 - MOVEIS E UTENS. PEQ VALOR', normalizedCategory:'admin_general_expense', amountNative:-0.015545, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'94 5.1.01.01.0016 - MULTAS', normalizedCategory:'other_expenses', amountNative:-0.006681, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'194 5.1.01.01.0030 - PIS/COFINS/CSLL RETIDO', normalizedCategory:'admin_general_expense', amountNative:-0.010774, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'191 5.1.01.01.0028 - PRODUTOS FARMACEUTICOS', normalizedCategory:'admin_general_expense', amountNative:-0.003807, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL', normalizedCategory:'admin_general_expense', amountNative:-0.034582, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'96 5.1.01.01.0019 - TELEFONE', normalizedCategory:'admin_general_expense', amountNative:-0.03776, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'196 5.1.01.01.0031 - VIDEO OBSERVER', normalizedCategory:'admin_general_expense', amountNative:-0.008224, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA', normalizedCategory:'admin_general_expense', amountNative:-0.0005, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'102 5.1.02.02.0014 - DESPESAS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.068116, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'103 5.1.02.02.0015 - DESPESAS DIVERSAS', normalizedCategory:'other_expenses', amountNative:-0.011761, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'98 5.1.02.02.0010 - ENERGIA ELETRICA', normalizedCategory:'admin_general_expense', amountNative:-0.111284, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.94
    { rawLabel:'190 5.1.02.02.0021 - INTERNET / TV A CABO', normalizedCategory:'admin_general_expense', amountNative:-0.021866, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'83 5.1.02.02.0004 - LAVANDERIA', normalizedCategory:'admin_general_expense', amountNative:-0.0984, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'187 5.1.02.02.0018 - MANUTENCAO DE VEICULOS', normalizedCategory:'admin_general_expense', amountNative:-0.007875, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'188 5.1.02.02.0019 - MANUTENCAO DO GRAMADO', normalizedCategory:'admin_general_expense', amountNative:-0.561236, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'78 5.1.02.02.0002 - MANUTENÇAO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.168941, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'84 5.1.02.02.0005 - PINTURA DE PLACAS', normalizedCategory:'admin_general_expense', amountNative:-0.028167, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.069379, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'197 5.1.02.02.0022 - SERV.ALMOXARIFADO E ROUPARIA', normalizedCategory:'admin_general_expense', amountNative:-0.0061, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.94
    { rawLabel:'189 5.1.02.02.0020 - SERVICO DE DEDETIZACAO', normalizedCategory:'admin_general_expense', amountNative:-0.00336, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'90 5.1.02.02.0007 - TAXA DE ARBITRAGEM', normalizedCategory:'match_organisation_expense', amountNative:-0.029848, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO', normalizedCategory:'match_organisation_expense', amountNative:-0.008943, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES', normalizedCategory:'match_organisation_expense', amountNative:-0.04195, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'92 5.1.02.02.0009 - VIAGENS E ESTADIAS', normalizedCategory:'match_organisation_expense', amountNative:-0.162244, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'99 5.1.02.02.0011 - ÁGUA E ESGOTO', normalizedCategory:'admin_general_expense', amountNative:-0.022285, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
  ],
  2014: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'49 4.1.01.01.0010 - ACORDOS TRABALHISTAS', normalizedCategory:'admin_general_expense', amountNative:-0.002619, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'41 4.1.01.01.0002 - AJUDA DE CUSTO', normalizedCategory:'wages_squad', amountNative:-0.080721, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'55 4.1.01.01.0016 - ALUGUEL MORADIA COM TECNICA', normalizedCategory:'wages_squad', amountNative:-0.082806, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'184 4.1.01.01.0031 - ANUIDADE CBF E FEDER.PAULISTA', normalizedCategory:'match_organisation_expense', amountNative:-0.00475, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'50 4.1.01.01.0011 - ASSISTENCIA MÉDICA E SOCIAL', normalizedCategory:'wages_squad', amountNative:-0.020069, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'58 4.1.01.01.0019 - CAFE DA MANHA', normalizedCategory:'admin_general_expense', amountNative:-0.001848, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'51 4.1.01.01.0012 - CURSOS E TREINAMENTOS', normalizedCategory:'wages_squad', amountNative:-0.002151, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'44 4.1.01.01.0005 - DIREITOS DE IMAGEM', normalizedCategory:'wages_squad', amountNative:-0.617287, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'47 4.1.01.01.0008 - FERIAS E 13º SALARIO', normalizedCategory:'wages_squad', amountNative:-0.058211, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'46 4.1.01.01.0007 - FGTS', normalizedCategory:'wages_squad', amountNative:-0.049814, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'87 4.1.01.01.0030 - I.R.R.FONTE', normalizedCategory:'wages_squad', amountNative:-0.000858, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'45 4.1.01.01.0006 - INSS', normalizedCategory:'wages_squad', amountNative:-0.126914, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'57 4.1.01.01.0018 - LANCHES', normalizedCategory:'wages_squad', amountNative:-0.09546, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS', normalizedCategory:'other_expenses', amountNative:-0.042844, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.85
    { rawLabel:'60 4.1.01.01.0021 - MEDICAMENTOS', normalizedCategory:'admin_general_expense', amountNative:-0.035373, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'54 4.1.01.01.0015 - OUTROS BENEFICIOS', normalizedCategory:'wages_squad', amountNative:-0.00995, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'186 4.1.01.01.0032 - PIS FOLHA PAGAMENTO', normalizedCategory:'admin_general_expense', amountNative:-0.002039, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'56 4.1.01.01.0017 - REFEIÇÕES', normalizedCategory:'wages_squad', amountNative:-0.423278, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES', normalizedCategory:'wages_squad', amountNative:-0.104315, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'40 4.1.01.01.0001 - SALARIOS', normalizedCategory:'wages_squad', amountNative:-0.645762, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'52 4.1.01.01.0013 - SEGURO PESSOAL', normalizedCategory:'wages_squad', amountNative:-0.009348, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA', normalizedCategory:'wages_squad', amountNative:-0.05057, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS', normalizedCategory:'admin_general_expense', amountNative:-0.127366, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES', normalizedCategory:'wages_squad', amountNative:-0.009095, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS', normalizedCategory:'other_expenses', amountNative:-0.00737, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS', normalizedCategory:'match_organisation_expense', amountNative:-0.027835, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'59 4.1.01.01.0020 - UNIFORME', normalizedCategory:'other_expenses', amountNative:-0.000375, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'74 5.1.01.01.0009 - ASSESSORIA ADMINISTRATIVA', normalizedCategory:'admin_general_expense', amountNative:-0.10498, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'73 5.1.01.01.0008 - ASSESSORIA DE MARKETING', normalizedCategory:'admin_general_expense', amountNative:-0.036007, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA', normalizedCategory:'admin_general_expense', amountNative:-0.331791, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'75 5.1.01.01.0010 - ASSESSORIA JURÍDICA', normalizedCategory:'admin_general_expense', amountNative:-0.06067, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES', normalizedCategory:'admin_general_expense', amountNative:-0.000252, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'123 5.1.01.01.0026 - COMBUSTIVEIS E LUBRIFICANTES', normalizedCategory:'admin_general_expense', amountNative:-0.029024, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'95 5.1.01.01.0018 - CORREIOS', normalizedCategory:'admin_general_expense', amountNative:-0.001677, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'93 5.1.01.01.0017 - DESPESAS CARTORARIAS', normalizedCategory:'admin_general_expense', amountNative:-0.001786, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'181 5.1.01.01.0027 - ESTADIAS', normalizedCategory:'match_organisation_expense', amountNative:-0.000245, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'109 5.1.01.01.0025 - FRETES, CARRETOS E TRANSPORTES', normalizedCategory:'admin_general_expense', amountNative:-0.000042, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.94
    { rawLabel:'72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE', normalizedCategory:'admin_general_expense', amountNative:-0.020531, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'108 5.1.01.01.0024 - I.S.S.Q.N', normalizedCategory:'admin_general_expense', amountNative:-0.000086, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.94
    { rawLabel:'77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE', normalizedCategory:'admin_general_expense', amountNative:-0.002091, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO', normalizedCategory:'admin_general_expense', amountNative:-0.005856, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA', normalizedCategory:'admin_general_expense', amountNative:-0.007268, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'68 5.1.01.01.0004 - MATERIAIS DIVERSOS', normalizedCategory:'admin_general_expense', amountNative:-0.109087, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.032945, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.98
    { rawLabel:'69 5.1.01.01.0006 - MOVEIS E UTENS. PEQ VALOR', normalizedCategory:'admin_general_expense', amountNative:-0.000585, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'94 5.1.01.01.0016 - MULTAS', normalizedCategory:'other_expenses', amountNative:-0.002125, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL', normalizedCategory:'admin_general_expense', amountNative:-0.029535, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.97
    { rawLabel:'82 5.1.01.01.0014 - SERVIÇOS LIMPEZA E MANUTENÇÃO', normalizedCategory:'admin_general_expense', amountNative:-0.001459, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.93
    { rawLabel:'96 5.1.01.01.0019 - TELEFONE', normalizedCategory:'admin_general_expense', amountNative:-0.032524, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA', normalizedCategory:'admin_general_expense', amountNative:-0.01085, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'100 5.1.02.02.0012 - ASSOCIAÇÕES RECREATIVAS', normalizedCategory:'admin_general_expense', amountNative:0.0001, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'102 5.1.02.02.0014 - DESPESAS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.070111, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'98 5.1.02.02.0010 - ENERGIA ELETRICA', normalizedCategory:'admin_general_expense', amountNative:-0.063949, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.94
    { rawLabel:'124 5.1.02.02.0017 - FRETES E CARRETOS', normalizedCategory:'admin_general_expense', amountNative:0.00235, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'83 5.1.02.02.0004 - LAVANDERIA', normalizedCategory:'admin_general_expense', amountNative:-0.10165, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'78 5.1.02.02.0002 - MANUTENÇAO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.100109, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'66 5.1.02.02.0001 - MATERIAIS P/ ALOJAMENTO', normalizedCategory:'admin_general_expense', amountNative:-0.000634, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'84 5.1.02.02.0005 - PINTURA DE PLACAS', normalizedCategory:'admin_general_expense', amountNative:-0.023073, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.022082, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'90 5.1.02.02.0007 - TAXA DE ARBITRAGEM', normalizedCategory:'match_organisation_expense', amountNative:-0.01543, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO', normalizedCategory:'match_organisation_expense', amountNative:-0.002497, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES', normalizedCategory:'match_organisation_expense', amountNative:-0.1163, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'92 5.1.02.02.0009 - VIAGENS E ESTADIAS', normalizedCategory:'match_organisation_expense', amountNative:-0.142911, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'99 5.1.02.02.0011 - AGUA E ESGOTO', normalizedCategory:'admin_general_expense', amountNative:-0.017679, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
  ],
  2013: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'40 4.1.01.01.0001 - SALARIOS', normalizedCategory:'wages_squad', amountNative:-0.597927, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.91
    { rawLabel:'41 4.1.01.01.0002 - AJUDA DE CUSTO', normalizedCategory:'wages_squad', amountNative:-0.052233, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'44 4.1.01.01.0005 - DIREITOS DE IMAGEM', normalizedCategory:'wages_squad', amountNative:-0.062398, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.9
    { rawLabel:'45 4.1.01.01.0006 - INSS', normalizedCategory:'wages_squad', amountNative:-0.080097, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.92
    { rawLabel:'46 4.1.01.01.0007 - FGTS', normalizedCategory:'wages_squad', amountNative:-0.04926, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.92
    { rawLabel:'48 4.1.01.01.0009 - RESCISOES E HOMOLOGAÇOES', normalizedCategory:'wages_squad', amountNative:-0.097234, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'49 4.1.01.01.0010 - ACORDOS TRABALHISTAS', normalizedCategory:'admin_general_expense', amountNative:-0.003728, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.92
    { rawLabel:'51 4.1.01.01.0012 - CURSOS E TREINAMENTOS', normalizedCategory:'wages_squad', amountNative:-0.0002, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'55 4.1.01.01.0016 - ALUGUEL/MORADIA COM TECNICA', normalizedCategory:'wages_squad', amountNative:-0.023581, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'56 4.1.01.01.0017 - REFEIÇÕES', normalizedCategory:'wages_squad', amountNative:-0.121315, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'57 4.1.01.01.0018 - LANCHES', normalizedCategory:'wages_squad', amountNative:-0.04729, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'60 4.1.01.01.0021 - MEDICAMENTOS', normalizedCategory:'admin_general_expense', amountNative:-0.017808, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.9
    { rawLabel:'61 4.1.01.01.0022 - SUPLEMENTOS ALIMENTARES', normalizedCategory:'wages_squad', amountNative:-0.022961, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'62 4.1.01.01.0023 - MATERIAIS ESPORTIVOS', normalizedCategory:'other_expenses', amountNative:-0.040454, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.85
    { rawLabel:'70 4.1.01.01.0024 - SERVIÇOS E EXAMES MÉDICOS', normalizedCategory:'admin_general_expense', amountNative:-0.059333, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'71 4.1.01.01.0025 - SERVIÇOS DE FISIOTERAPIA', normalizedCategory:'wages_squad', amountNative:-0.042727, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'81 4.1.01.01.0026 - SEGURANÇA E MEDICINA TRABALHO', normalizedCategory:'wages_squad', amountNative:-0.00045, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'88 4.1.01.01.0027 - TAXA FED PAULISTA,FAAP,CBF/INS', normalizedCategory:'match_organisation_expense', amountNative:-0.035531, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.85
    { rawLabel:'89 4.1.01.01.0028 - TAXA DE LIBERAÇÃO DE ATLETAS', normalizedCategory:'other_expenses', amountNative:-0.00838, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'63 5.1.01.01.0001 - MATERIAS DE MANUTENÇÃO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.005089, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.98
    { rawLabel:'64 5.1.01.01.0002 - MATERIAIS DE HIGIENE E LIMPEZA', normalizedCategory:'admin_general_expense', amountNative:-0.009442, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'65 5.1.01.01.0003 - MATERIAIS DE ESCRITORIO', normalizedCategory:'admin_general_expense', amountNative:-0.002362, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'68 5.1.01.01.0004 - MATERIAIS DIVERSOS', normalizedCategory:'admin_general_expense', amountNative:-0.000973, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'72 5.1.01.01.0007 - HONORARIOS CONTABILIDADE', normalizedCategory:'admin_general_expense', amountNative:-0.001639, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'73 5.1.01.01.0008 - ASSESSORIA DE MARKETING', normalizedCategory:'admin_general_expense', amountNative:-0.060317, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'74 5.1.01.01.0009 - ASSESSORIA ADMINISTRATIVA', normalizedCategory:'admin_general_expense', amountNative:-0.038055, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'76 5.1.01.01.0011 - ASSESSORIA ESPORTIVA', normalizedCategory:'admin_general_expense', amountNative:-0.129449, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'77 5.1.01.01.0012 - MANUTENÇÃO E HOSPEDAGEM SITE', normalizedCategory:'admin_general_expense', amountNative:-0.00228, disclosureLevel:'aggregated' }, // pág. 4, Claude 0.8
    { rawLabel:'80 5.1.01.01.0013 - SEGURANÇA PATRIMONIAL', normalizedCategory:'admin_general_expense', amountNative:-0.0288, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.97
    { rawLabel:'82 5.1.01.01.0014 - SERVIÇOS LIMPEZA E MANUTENÇÃO', normalizedCategory:'admin_general_expense', amountNative:-0.001425, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.93
    { rawLabel:'86 5.1.01.01.0015 - ASSESSORIA DE IMPRENSA', normalizedCategory:'admin_general_expense', amountNative:-0.001, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'94 5.1.01.01.0016 - MULTAS', normalizedCategory:'other_expenses', amountNative:-0.000253, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'93 5.1.01.01.0017 - DESPESAS CARTORARIAS', normalizedCategory:'admin_general_expense', amountNative:-0.00116, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'95 5.1.01.01.0018 - CORREIOS', normalizedCategory:'admin_general_expense', amountNative:-0.001641, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'96 5.1.01.01.0019 - TELEFONE', normalizedCategory:'admin_general_expense', amountNative:-0.018733, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'97 5.1.01.01.0020 - ASSINATURAS E ANUIDADES', normalizedCategory:'admin_general_expense', amountNative:-0.000491, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.97
    { rawLabel:'108 5.1.01.01.0024 - I.S.S.Q.N', normalizedCategory:'admin_general_expense', amountNative:-0.000091, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.94
    { rawLabel:'66 5.1.02.02.0001 - MATERIAIS P/ ALOJAMENTO', normalizedCategory:'admin_general_expense', amountNative:-0.007303, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'78 5.1.02.02.0002 - MANUTENÇÃO GERAL', normalizedCategory:'admin_general_expense', amountNative:-0.056459, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'79 5.1.02.02.0003 - SEGURANÇA E POLICIAMENTO JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.010843, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'83 5.1.02.02.0004 - LAVANDERIA', normalizedCategory:'admin_general_expense', amountNative:-0.031204, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.96
    { rawLabel:'84 5.1.02.02.0005 - PINTURA DE PLACAS', normalizedCategory:'admin_general_expense', amountNative:-0.013077, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'85 5.1.02.02.0006 - TRANSPORTE DE JOGADORES', normalizedCategory:'match_organisation_expense', amountNative:-0.1202, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.97
    { rawLabel:'90 5.1.02.02.0007 - TAXA DE ARBITRAGEM', normalizedCategory:'match_organisation_expense', amountNative:-0.013749, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'91 5.1.02.02.0008 - TAXA DE VISTORIA DO ESTADIO', normalizedCategory:'match_organisation_expense', amountNative:-0.012393, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'92 5.1.02.02.0009 - VIAGENS E ESTADIAS', normalizedCategory:'match_organisation_expense', amountNative:-0.107707, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'98 5.1.02.02.0010 - ENERGIA ELETRICA', normalizedCategory:'admin_general_expense', amountNative:-0.018983, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.94
    { rawLabel:'99 5.1.02.02.0011 - ÁGUA E ESGOTO', normalizedCategory:'admin_general_expense', amountNative:-0.008778, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'101 5.1.02.02.0013 - ALUGUEL DE ACADEMIA', normalizedCategory:'admin_general_expense', amountNative:-0.00475, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'102 5.1.02.02.0014 - DESPESAS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-0.080362, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'103 5.1.02.02.0015 - DESPESAS DIVERSAS', normalizedCategory:'other_expenses', amountNative:-0.116044, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'170 5.2.03.01.0002 - LAVANDERIA', normalizedCategory:'admin_general_expense', amountNative:-0.0051, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.96
    { rawLabel:'171 5.2.03.01.0003 - ESCRITORIO CONTABILIDADE', normalizedCategory:'admin_general_expense', amountNative:-0.008867, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'172 5.2.03.01.0004 - ENERGIA ELETRICA', normalizedCategory:'admin_general_expense', amountNative:-0.01723, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.93
    { rawLabel:'173 5.2.03.01.0005 - TELEFONE', normalizedCategory:'admin_general_expense', amountNative:-0.01016, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'174 5.2.03.01.0006 - ÁGUA E ESGOTO', normalizedCategory:'admin_general_expense', amountNative:-0.010085, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'175 5.2.03.01.0007 - VIAGENS E ESTADIAS-ATLETAS', normalizedCategory:'match_organisation_expense', amountNative:-0.0533, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.92
    { rawLabel:'176 5.2.03.01.0008 - VIAGENS E ESTADIAS-ADMINISTRAT', normalizedCategory:'admin_general_expense', amountNative:-0.001895, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'177 5.2.03.01.0009 - REFEIÇÕES', normalizedCategory:'youth_other_sports_expense', amountNative:-0.022593, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'178 5.2.03.01.0010 - LANCHES', normalizedCategory:'youth_other_sports_expense', amountNative:-0.022016, disclosureLevel:'aggregated' }, // pág. 4, precedente
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 7
    // ajuste manual `deuda` (Admin/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos e financiamentos 87 + 12 + partes relacionadas 51.785 (miles), .md L174/L187/L189
    grossDebt:51.884, cash:0.952,
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 6
    // tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Partes relacionadas" pág. 6
    grossDebt:111.803207, cash:2.133179,
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 8
    // ajuste manual `deuda` (Admin/ajustes-manuales.jsonl, 2026-10-05, to-do 143): préstamos + partes relacionadas, criterio del club; Empréstimos 27 + Débitos com partes relacionadas 32.296 (miles), .md L193/L204. caja-deuda.mjs (2026-10-03) había leído el 24 de 2018 (32,32)
    grossDebt:32.323, cash:0.695,
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 8
    // ajuste manual `deuda` (Admin/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos 79 + partes relacionadas 39.971 + 9 (miles), .md L198/L204/L211
    grossDebt:40.059, cash:0.085,
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: documento siguiente): "Caixa e equivalentes de caixa (nota 6)" pág. 6
    // tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 1 (compuerta: documento siguiente): "Empréstimos bancários" pág. 6 + "Partes relacionadas" pág. 6
    grossDebt:93.958045, cash:0.348738,
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
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 1 (compuerta: documento siguiente): "Caixa e equivalentes de caixa" pág. 8
    // ajuste manual `deuda` (Admin/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos 24 + Débitos com partes relacionadas 27.467 (miles), .md L181/L191
    grossDebt:27.491, cash:0.149,
    officialTotalRevenue:7.161, officialTotalExpenses:15.357, officialPAT:-8.485,
  },
  2025: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.321427, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.314598},
      {label:'Despesas financeiras', value:-3.636025},
    ],
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: año anterior): "Caixa e equivalentes de caixa" pág. 6
    // tools/caja-deuda.mjs (2026-10-03): grossDebt escalón 0 (compuerta: año anterior): "Partes relacionadas" pág. 6
    grossDebt:145.192927, cash:1.482725,
    officialTotalRevenue:67.564252, officialTotalExpenses:89.496986, officialPAT:-25.254161,
  },
  2010: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2010-12-31',
    sourceId:'novorizontino-br-balanco-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.001691, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:0.13035, officialTotalExpenses:0.163946, officialPAT:-0.035287,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): cierre = 2022-12-31. Guido 2026-10-02: el detector de período tomó la fecha de la firma (28/04/2023, L17); el ejercicio cierra el 31/12/2022 (29 menciones)
  2022: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.433943, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.007515},
      {label:'Despesas financeiras', value:-2.441458},
    ],
    // tools/caja-deuda.mjs (2026-10-03): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-03): Guido 2026-10-02: la caja de 2022 como la reclasificó el documento 2023 (sin las aplicaciones financieras de proyectos incentivados, 574.806), coherente con 2023-2025; el 2022 imprimía 721.730
    // ajuste manual `deuda` (Admin/ajustes-manuales.jsonl, 2026-10-05): préstamos + partes relacionadas, criterio del club; Empréstimos bancários 28.250 + Partes relacionadas 70.283.684, .md L250/L258
    grossDebt:70.311934, cash:0.146924,
    officialTotalRevenue:30.003234, officialTotalExpenses:41.218659, officialPAT:-13.649368,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 2.204. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.794. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.945. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.422. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 56,16. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 56,16. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 21,76. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 34,40. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 857,96. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): reportType = official_balance_sheet. Guido 2026-10-02: balancete con la Demonstração do Resultado completa; la lectura 5 cierra exacto con el PREJUÍZO impreso
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): resultado-final = -3.108.722,71. Guido 2026-10-02: el PREJUIZO viene impreso sin signo; es pérdida
  2017: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2017-12-31',
    sourceId:'novorizontino-br-dre-e-fluxo-de-caixa-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.140202, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'RENDAS DE JOGOS, PATROCÍNIOS, LOCAÇÕES E OUTRAS RECEITAS OPERACIONAIS', lado:'revenue', importe:8.019563, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:0.115299,
    officialTotalRevenue:8.146239, officialTotalExpenses:12.780546, officialPAT:-4.774509,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 2.204. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.794. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.945. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 1.422. Guido 2026-10-02: la versión detallada en reais del mismo PDF confirma el .md (Gemini leyó otro dígito)
  2016: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2016-12-31',
    sourceId:'novorizontino-br-balanco-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.075, tax:0,
    grossDebt:null, cash:0.007261,
    officialTotalRevenue:3.242, officialTotalExpenses:9.945, officialPAT:-6.779,
  },
  2015: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'novorizontino-br-balanco-2015',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.028996, tax:0,
    extraRows: [
      {label:'116 3.1.03.01.0002 - DESCONTOS FINANCEIROS', value:0.002244},
      {label:'115 3.1.03.01.0001 - RENDAS DE APLIC FINANCEIRAS', value:0.00001},
      {label:'114 5.1.04.01.0005 - DESCONTOS CONCEDIDOS', value:-0.000469},
      {label:'110 5.1.04.01.0001 - DESPESAS E TARIFAS BANCARIAS', value:-0.013029},
      {label:'112 5.1.04.01.0003 - IOF', value:-0.003651},
      {label:'113 5.1.04.01.0004 - IRRF S/ RENDAS DE APLIC FINANC', value:-0.000002},
      {label:'111 5.1.04.01.0002 - JUROS E MULTAS', value:-0.014099},
    ],
    grossDebt:10.240466, cash:0.068932,
    officialTotalRevenue:0.746574, officialTotalExpenses:6.315721, officialPAT:-5.598142,
  },
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 56,16. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 56,16. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 21,76. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 34,40. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): confirmado = 857,96. Guido 2026-10-02: Gemini no los leyó; la lectura 5 cierra al centavo con el PREJUIZO impreso (L145: 3.108.722,71)
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): reportType = official_balance_sheet. Guido 2026-10-02: balancete con la Demonstração do Resultado completa; la lectura 5 cierra exacto con el PREJUÍZO impreso
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): resultado-final = -3.108.722,71. Guido 2026-10-02: el PREJUIZO viene impreso sin signo; es pérdida
  2014: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2014-12-31',
    sourceId:'novorizontino-br-balanco-2014-b',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.034319, tax:0,
    extraRows: [
      {label:'183 3.1.03.01.0004 - RECEBIMENTO DE JUROS', value:0.000022},
      {label:'115 3.1.03.01.0001 - RENDAS DE APLIC FINANCEIRAS', value:0.000034},
      {label:'110 5.1.04.01.0001 - DESPESAS E TARIFAS BANCARIAS', value:-0.034355},
      {label:'111 5.1.04.01.0002 - JUROS E MULTAS', value:-0.00002},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.060016, officialTotalExpenses:4.13442, officialPAT:-3.108723,
  },
  2013: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2013-12-31',
    sourceId:'novorizontino-br-balanco-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.021642, tax:0,
    extraRows: [
      {label:'115 3.1.03.01.0001 - RENDAS DE APLIC FINANCEIRAS', value:0.000215},
      {label:'110 5.1.04.01.0001 - DESPESAS E TARIFAS BANCARIAS', value:-0.021857},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.712617, officialTotalExpenses:2.419205, officialPAT:-0.728231,
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
  'novorizontino-br-demonstracoes-financeiras-2025': {
    id:'novorizontino-br-demonstracoes-financeiras-2025', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-balanco-2010': {
    id:'novorizontino-br-balanco-2010', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — balanco-2010 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-demonstracoes-financeiras-2022': {
    id:'novorizontino-br-demonstracoes-financeiras-2022', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-dre-e-fluxo-de-caixa-2017': {
    id:'novorizontino-br-dre-e-fluxo-de-caixa-2017', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — dre-e-fluxo-de-caixa-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/dre-e-fluxo-de-caixa-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-balanco-2016': {
    id:'novorizontino-br-balanco-2016', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — balanco-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-balanco-2014-b': {
    id:'novorizontino-br-balanco-2014-b', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — balanco-2014-b (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2014-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-balanco-2013': {
    id:'novorizontino-br-balanco-2013', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — balanco-2013 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'novorizontino-br-balanco-2015': {
    id:'novorizontino-br-balanco-2015', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — balanco-2015 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/balanco-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['novorizontino-br'] = null;
