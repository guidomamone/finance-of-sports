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
  // 2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2015-b.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2015-b.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Rendas de Jogos', normalizedCategory:'matchday_competition', amountNative:0.45135, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Cotas de TV Camp Paulista Séria A-2', normalizedCategory:'broadcasting', amountNative:0.175, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Rec c/Repasse Direitos Federat/Empréstim', normalizedCategory:'player_sales', amountNative:0.1, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.049323, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Premios, Outras Receitas', normalizedCategory:'competition_bonus', amountNative:0.152102, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Mercadorias c/Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.121321, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Patrocinios', normalizedCategory:'sponsorship_commercial', amountNative:3.26, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Contratos de Parcerias', normalizedCategory:'sponsorship_commercial', amountNative:0.01, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.0008, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:0.38, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Pis', normalizedCategory:'other_income', amountNative:-0.002002, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Cofins', normalizedCategory:'other_income', amountNative:-0.00922, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Icms', normalizedCategory:'other_income', amountNative:-0.021838, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.00023, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/balanco-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/balanco-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'Rendas de Jogos', normalizedCategory:'matchday_competition', amountNative:0.94459, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Cotas de TV – Paulista Série A-2', normalizedCategory:'broadcasting', amountNative:2.885, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.571909, disclosureLevel:'aggregated' }, // pág. 22, Claude 0.9
    { rawLabel:'Venda de Atletas', normalizedCategory:'player_sales', amountNative:1.943355, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:1.759526, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Outras', normalizedCategory:'other_income', amountNative:0.813643, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'(-) Deduções da Receita Bruta', normalizedCategory:'other_income', amountNative:-0.010553, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.95
    { rawLabel:'Vendas Mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.038727, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.265, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/dre-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/dre-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Rendas de Jogos', normalizedCategory:'matchday_competition', amountNative:0.399641, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Cotas de TV', normalizedCategory:'broadcasting', amountNative:3.44, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Repasse Cessão Temporária dos Atletas', normalizedCategory:'player_sales', amountNative:0.13, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Venda dos Direitos Econômicos Atletas', normalizedCategory:'player_sales', amountNative:0.24, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:0.223977, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Premios, Outras Receitas', normalizedCategory:'competition_bonus', amountNative:0.40865, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Mercadorias c/Vendas', normalizedCategory:'sponsorship_commercial', amountNative:0.003632, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Patrocinios', normalizedCategory:'sponsorship_commercial', amountNative:3.889326, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.434146, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'(-) Pis', normalizedCategory:'other_income', amountNative:-0.00006, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'(-) Cofins', normalizedCategory:'other_income', amountNative:-0.000276, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'(-) Icms', normalizedCategory:'other_income', amountNative:-0.000654, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Venda dos Vínculos Desportivos Atletas', normalizedCategory:'player_sales', amountNative:0.905, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Aviso Prévio Descontado', normalizedCategory:'other_income', amountNative:0.0065, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.9
    { rawLabel:'Multa Contratual', normalizedCategory:'other_income', amountNative:0.041768, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'Bonificações', normalizedCategory:'competition_bonus', amountNative:0.615865, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.97
    { rawLabel:'Indenizações Recebidas', normalizedCategory:'other_income', amountNative:1.158485, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Reversão de Provisão de Férias', normalizedCategory:'other_income', amountNative:0.035032, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.92
    { rawLabel:'Reversão de Provisão INSS Férias', normalizedCategory:'other_income', amountNative:0.001536, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Reversão de Provisão FGTS Férias', normalizedCategory:'other_income', amountNative:0.002405, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Reversão de Provisão PIS Férias', normalizedCategory:'other_income', amountNative:0.000347, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Ajuste de Correção - FPF', normalizedCategory:'other_income', amountNative:0.006041, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'Multa Tribunal de Justiça Desportiva', normalizedCategory:'other_income', amountNative:0.027, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Despesas Processuais FIFA', normalizedCategory:'other_income', amountNative:0.019215, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.97
    { rawLabel:'Outras Receitas', normalizedCategory:'other_income', amountNative:0.017697, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.013223, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Ferroviaria/demonstracoes-financeiras-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:6.238291, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.572203, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.561709, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Cessão temporária dos atletas', normalizedCategory:'player_sales', amountNative:4.13475, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Cessão definitiva dos atletas', normalizedCategory:'player_sales', amountNative:2.929682, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Direitos econômicos', normalizedCategory:'player_sales', amountNative:1, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.8
    { rawLabel:'Sócio torcedor', normalizedCategory:'member_dues', amountNative:0.11996, disclosureLevel:'aggregated' }, // pág. 8, Claude 0.9
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:1.264524, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.649988, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
    { rawLabel:'Impostos incidentes sobre a receita', normalizedCategory:'other_income', amountNative:-0.516713, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
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
  2015: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.061195, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.045397, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Taxas Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.069507, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Segurança e Vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-0.031814, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'Inss s/Patrocinios', normalizedCategory:'admin_general_expense', amountNative:-0.106147, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Ingressos', normalizedCategory:'match_organisation_expense', amountNative:-0.027657, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Manutenção, Conservação Estadio', normalizedCategory:'admin_general_expense', amountNative:-0.07445, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Combustiveis e Lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.065791, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Inss s/Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.002514, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Locação de Veiculos', normalizedCategory:'admin_general_expense', amountNative:-0.00688, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Exame Anti-Doping', normalizedCategory:'match_organisation_expense', amountNative:-0.011525, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços Prest p/Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.44319, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-0.878735, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Locação de Estadio', normalizedCategory:'match_organisation_expense', amountNative:-0.058381, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Cotas de TV', normalizedCategory:'admin_general_expense', amountNative:-0.00725, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.846901, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.072431, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.02803, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.12435, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.007057, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.050074, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.07832, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Fgts Rescisório', normalizedCategory:'wages_squad', amountNative:-0.004721, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Premios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.694485, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Academia', normalizedCategory:'admin_general_expense', amountNative:-0.007522, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Agua Mineral', normalizedCategory:'match_organisation_expense', amountNative:-0.007022, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.197578, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.08206, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.011478, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Suplementação Alimentar', normalizedCategory:'match_organisation_expense', amountNative:-0.000468, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.188075, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Despesas de Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-0.138282, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.010353, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.00785, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'(-) Recuperação Cofins', normalizedCategory:'admin_general_expense', amountNative:0.006211, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'(-) Recuperação Pis', normalizedCategory:'admin_general_expense', amountNative:0.001348, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.91
    { rawLabel:'Custo das Mercadorias Vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.092183, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'(-) Recuperação de Icms', normalizedCategory:'admin_general_expense', amountNative:0.014711, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.91
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.139305, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.017995, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.023554, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.001, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.008154, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.025989, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.001797, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Salarios e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.019508, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.004569, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.002863, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.007075, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.002155, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas pelo uso da Marca', normalizedCategory:'admin_general_expense', amountNative:-0.046999, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Combustiveis', normalizedCategory:'admin_general_expense', amountNative:-0.003366, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Custas e Autenticações', normalizedCategory:'admin_general_expense', amountNative:-0.000176, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.043239, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.036857, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Despesas Legais e Judiciais', normalizedCategory:'admin_general_expense', amountNative:-0.000946, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.009519, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Manutenção, Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.020688, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.9
    { rawLabel:'Publicações', normalizedCategory:'admin_general_expense', amountNative:-0.002098, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.006859, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Propaganda e Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.044152, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Provedor de Internet', normalizedCategory:'admin_general_expense', amountNative:-0.006859, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.000014, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Material de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.000297, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Locação de Veiculos', normalizedCategory:'admin_general_expense', amountNative:-0.0003, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'Condominio', normalizedCategory:'admin_general_expense', amountNative:-0.005961, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-0.006962, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Materias de Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.000563, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Medicamentos e Mat Medicos e Cirurgicos', normalizedCategory:'admin_general_expense', amountNative:-0.004417, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.000315, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.019959, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.268487, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.000333, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.012041, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.011667, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Manutenção e Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.061455, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.00012, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Utensilios, Guarn.Cama, Mesa e Banho', normalizedCategory:'admin_general_expense', amountNative:-0.002583, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-0.004739, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.000032, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.000338, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.000053, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Multas', normalizedCategory:'other_expenses', amountNative:-0.000312, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.000494, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.002816, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.016917, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Seguro de Vida', normalizedCategory:'admin_general_expense', amountNative:-0.009081, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Impressos e Materiais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.004229, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.002569, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.00018, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.005123, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.002355, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impressos e Matriais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.000195, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Honorarios Contabeis,Adv e de Auditorias', normalizedCategory:'admin_general_expense', amountNative:-0.13415, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Custo Formação Atleta Profissional', normalizedCategory:'youth_other_sports_expense', amountNative:-0.001852, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas Bancarias', normalizedCategory:'admin_general_expense', amountNative:-0.010362, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Comissão s/Cartão', normalizedCategory:'admin_general_expense', amountNative:-0.004643, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.97
  ],
  2016: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-1.640894, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-1.341011, disclosureLevel:'aggregated' }, // pág. 23, Claude 0.8
    { rawLabel:'Custo Mercadorias Vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.019257, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Serviços Prestados por Terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.215516, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.399803, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.112088, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.99
    { rawLabel:'Despesas com Hospedagem', normalizedCategory:'match_organisation_expense', amountNative:-0.269421, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Taxas Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.377547, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.97
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.113268, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'13 Salário', normalizedCategory:'wages_squad', amountNative:-0.111123, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Despesas com Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.197051, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.071987, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Prêmios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.216492, disclosureLevel:'aggregated' }, // pág. 23, Claude 0.85
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.070132, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.96
    { rawLabel:'INSS sobre Cotas de Patrocínio', normalizedCategory:'admin_general_expense', amountNative:-0.271376, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.32033, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Segurança e Vigilância', normalizedCategory:'match_organisation_expense', amountNative:-0.007011, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.95
    { rawLabel:'Combustíveis e Lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.065573, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Ingressos', normalizedCategory:'match_organisation_expense', amountNative:-0.045281, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Taxa Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.15524, disclosureLevel:'aggregated' }, // pág. 23, Claude 0.85
    { rawLabel:'Provisão Contingências Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.306172, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.95
    { rawLabel:'Outros Gastos', normalizedCategory:'other_expenses', amountNative:-0.614166, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.076518, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.04141, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.027217, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.00807, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Manutenção, Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.14558, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.85
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.033683, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Propaganda e Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.091515, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Provedor Internet', normalizedCategory:'admin_general_expense', amountNative:-0.015295, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.008139, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.008384, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.016665, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.015668, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Seguro de Vida', normalizedCategory:'admin_general_expense', amountNative:-0.008602, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Impressos, Materiais Escritório', normalizedCategory:'admin_general_expense', amountNative:-0.018499, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.003918, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Assessoria Cont./Tributária/Advocatícia', normalizedCategory:'admin_general_expense', amountNative:-0.278368, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Despesas Indedutíveis', normalizedCategory:'other_expenses', amountNative:-0.004231, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Material Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.001948, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Despesas Legais e Judiciais', normalizedCategory:'admin_general_expense', amountNative:-0.000466, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Despesas com Cartão Credito', normalizedCategory:'admin_general_expense', amountNative:-0.025881, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Serviços Prestados por terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.022263, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Despesas Uso da Marca', normalizedCategory:'admin_general_expense', amountNative:-0.064407, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Arbitragens e Inss', normalizedCategory:'match_organisation_expense', amountNative:-0.003329, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.02611, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.95
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.000837, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Condomínio', normalizedCategory:'admin_general_expense', amountNative:-0.005226, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.367964, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.077757, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Fgts', normalizedCategory:'wages_squad', amountNative:-0.033392, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'13 Salário', normalizedCategory:'wages_squad', amountNative:-0.037244, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Inss', normalizedCategory:'wages_squad', amountNative:-0.02095, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.017567, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Pís s/ Folha', normalizedCategory:'admin_general_expense', amountNative:-0.004129, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Aviso Previo Indenizado', normalizedCategory:'wages_squad', amountNative:-0.003352, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.004299, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-0.023621, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Medicamentos, Mat. Médicos Cirúrgicos.', normalizedCategory:'admin_general_expense', amountNative:-0.018491, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Material Limpeza e Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.003295, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Material Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.007299, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Uniformes', normalizedCategory:'other_expenses', amountNative:-0.0045, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.358135, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.013167, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Manutenção Conservação Bens', normalizedCategory:'admin_general_expense', amountNative:-0.107573, disclosureLevel:'aggregated' }, // pág. 25, Claude 0.8
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.018631, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Gás', normalizedCategory:'admin_general_expense', amountNative:-0.009405, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Material de Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.007642, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Material Limpeza Higiene', normalizedCategory:'admin_general_expense', amountNative:-0.004125, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.98
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.031288, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Utensílios, Guarn., Cama, Mesa, Banho', normalizedCategory:'admin_general_expense', amountNative:-0.064879, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Impostos / Taxas/Contribuições', normalizedCategory:'admin_general_expense', amountNative:-0.003224, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
  ],
  2018: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Taxa de Policiamento', normalizedCategory:'match_organisation_expense', amountNative:-0.060652, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Taxas Federações e Confederações', normalizedCategory:'match_organisation_expense', amountNative:-0.241398, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Inss s/Patrocinios', normalizedCategory:'admin_general_expense', amountNative:-0.083575, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Manutenção, Conservação Estadio', normalizedCategory:'admin_general_expense', amountNative:-0.065067, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Agenciamento de Atletas', normalizedCategory:'other_expenses', amountNative:-0.0645, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.017157, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Locação de Veiculos', normalizedCategory:'admin_general_expense', amountNative:-0.000588, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Água Mineral', normalizedCategory:'match_organisation_expense', amountNative:-0.014025, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Exame Anti-Doping', normalizedCategory:'match_organisation_expense', amountNative:-0.004539, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços Prest p/Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.708341, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-1.395875, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Inss s/Cotas de TV', normalizedCategory:'admin_general_expense', amountNative:-0.241895, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Alimentação', normalizedCategory:'match_organisation_expense', amountNative:-0.350006, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Gastos c/ Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.008102, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Gastos c/ Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.194006, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Premiações', normalizedCategory:'wages_squad', amountNative:-0.207858, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-0.538761, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Direito de Arena', normalizedCategory:'match_organisation_expense', amountNative:-0.1634, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Inss s/Premiações', normalizedCategory:'wages_squad', amountNative:-0.018533, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Inss s/Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.0162, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.93
    { rawLabel:'Isotônico', normalizedCategory:'match_organisation_expense', amountNative:-0.009774, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-1.259152, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.118747, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.068071, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'13º Salário', normalizedCategory:'wages_squad', amountNative:-0.029482, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.006627, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.063046, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.109152, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'FGTS Rescisório', normalizedCategory:'wages_squad', amountNative:-0.014491, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'13º Salário Indenizado', normalizedCategory:'wages_squad', amountNative:-0.000425, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.85
    { rawLabel:'Agua Mineral', normalizedCategory:'match_organisation_expense', amountNative:-0.010272, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.204725, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.014033, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.02396, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'Provisão 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.086625, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão INSS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.003898, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão FGTS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.007398, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Exames Médicos', normalizedCategory:'admin_general_expense', amountNative:-0.000304, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Provisão PIS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000867, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.370745, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.006311, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.020131, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'13º Salário', normalizedCategory:'wages_squad', amountNative:-0.001917, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.000425, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.017062, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.029992, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'FGTS Rescisório', normalizedCategory:'wages_squad', amountNative:-0.002602, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.003639, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.001417, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.003804, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.00025, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'Provisão 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.031411, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão Férias', normalizedCategory:'wages_squad', amountNative:-0.025546, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão INSS Férias', normalizedCategory:'wages_squad', amountNative:-0.001165, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão FGTS Férias', normalizedCategory:'wages_squad', amountNative:-0.002044, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Provisão INSS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.001413, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão FGTS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.002513, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Provisão PIS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000314, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Provisão PIS Férias', normalizedCategory:'wages_squad', amountNative:-0.000255, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.146793, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.004194, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.006366, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'13º Salário', normalizedCategory:'wages_squad', amountNative:-0.004423, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.006999, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.012443, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.001554, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.07145, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'Provisão 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.007299, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão Férias', normalizedCategory:'wages_squad', amountNative:-0.007691, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão INSS Férias', normalizedCategory:'wages_squad', amountNative:-0.000306, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão FGTS Férias', normalizedCategory:'wages_squad', amountNative:-0.000615, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.99
    { rawLabel:'Provisão INSS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.001876, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Provisão FGTS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000702, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Exames Médicos', normalizedCategory:'admin_general_expense', amountNative:-0.000044, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Provisão PIS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000088, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Provisão PIS Férias', normalizedCategory:'wages_squad', amountNative:-0.000077, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.185903, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.007486, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.95
    { rawLabel:'13º Salário', normalizedCategory:'wages_squad', amountNative:-0.003181, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.001929, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.008499, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.96
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.015074, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'FGTS Rescisório', normalizedCategory:'wages_squad', amountNative:-0.001566, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'13º Salário Indenizado', normalizedCategory:'wages_squad', amountNative:-0.000146, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.85
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.001904, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Provisão 13º Salario', normalizedCategory:'wages_squad', amountNative:-0.010351, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão Férias', normalizedCategory:'wages_squad', amountNative:-0.008866, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão INSS Férias', normalizedCategory:'wages_squad', amountNative:-0.000399, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão FGTS Férias', normalizedCategory:'wages_squad', amountNative:-0.000709, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Provisão INSS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000466, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão FGTS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000828, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Provisão PIS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000103, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Provisão PIS Férias', normalizedCategory:'wages_squad', amountNative:-0.000088, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas Pelo Uso da Marca', normalizedCategory:'admin_general_expense', amountNative:-0.165553, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.000596, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-0.000932, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Água', normalizedCategory:'admin_general_expense', amountNative:-0.001808, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.007217, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Assinatura TV a Cabo', normalizedCategory:'admin_general_expense', amountNative:-0.002566, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Uniformes', normalizedCategory:'other_expenses', amountNative:-0.00077, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Salários e Ordenados', normalizedCategory:'wages_squad', amountNative:-0.557241, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Férias Normais', normalizedCategory:'wages_squad', amountNative:-0.033047, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Férias Indenizadas', normalizedCategory:'wages_squad', amountNative:-0.047338, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.95
    { rawLabel:'13º Salario', normalizedCategory:'wages_squad', amountNative:-0.0069, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Aviso Prévio Indenizado', normalizedCategory:'wages_squad', amountNative:-0.017717, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'INSS', normalizedCategory:'wages_squad', amountNative:-0.026913, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.96
    { rawLabel:'FGTS', normalizedCategory:'wages_squad', amountNative:-0.046779, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'FGTS Rescisório', normalizedCategory:'wages_squad', amountNative:-0.025034, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'13º Salário Indenizado', normalizedCategory:'wages_squad', amountNative:-0.001343, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.85
    { rawLabel:'Vale Transporte', normalizedCategory:'wages_squad', amountNative:-0.019345, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Pis s/Folha', normalizedCategory:'admin_general_expense', amountNative:-0.006018, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Provisão 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.042107, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão Férias', normalizedCategory:'wages_squad', amountNative:-0.013393, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Indenizações Trabalhistas', normalizedCategory:'wages_squad', amountNative:-0.008499, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Provisão INSS Férias', normalizedCategory:'wages_squad', amountNative:-0.000603, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão FGTS Férias', normalizedCategory:'wages_squad', amountNative:-0.001072, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Provisão INSS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.001895, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.8
    { rawLabel:'Provisão FGTS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.003008, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Exames Médicos', normalizedCategory:'admin_general_expense', amountNative:-0.000132, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Provisão PIS 13º Salário', normalizedCategory:'wages_squad', amountNative:-0.000421, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Provisão PIS Férias', normalizedCategory:'wages_squad', amountNative:-0.000134, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-0.0007, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.95
    { rawLabel:'Licença de Uso de Software', normalizedCategory:'admin_general_expense', amountNative:-0.057644, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.014825, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.008552, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas de Viagens', normalizedCategory:'match_organisation_expense', amountNative:-0.079698, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.019793, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Manutenção, Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.063091, disclosureLevel:'aggregated' }, // pág. 3, Claude 0.9
    { rawLabel:'Publicações', normalizedCategory:'admin_general_expense', amountNative:-0.00412, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Combustíveis', normalizedCategory:'admin_general_expense', amountNative:-0.104817, disclosureLevel:'aggregated' }, // pág. 3, Jev 0.99
    { rawLabel:'Propaganda e Publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.075076, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-0.002408, disclosureLevel:'aggregated' }, // pág. 3, Jev 1
    { rawLabel:'Custas e Emolumentos', normalizedCategory:'admin_general_expense', amountNative:-0.008781, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/Refeições', normalizedCategory:'match_organisation_expense', amountNative:-0.001817, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Material de Limpeza, Higiene, Copa, Cozinha', normalizedCategory:'admin_general_expense', amountNative:-0.053078, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Locação de Veículos', normalizedCategory:'admin_general_expense', amountNative:-0.0026, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.96
    { rawLabel:'Registro de Domínio', normalizedCategory:'admin_general_expense', amountNative:-0.000076, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Licenciamento de Veículos', normalizedCategory:'admin_general_expense', amountNative:-0.001885, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'Locação de Equipamentos', normalizedCategory:'admin_general_expense', amountNative:-0.000105, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ Certificação Digital', normalizedCategory:'admin_general_expense', amountNative:-0.00024, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Locação de Equipamentos Eletrônicos', normalizedCategory:'admin_general_expense', amountNative:-0.001169, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ Estacionamentos', normalizedCategory:'admin_general_expense', amountNative:-0.000162, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Serviços Prestados p/ Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.00036, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.97
    { rawLabel:'Amortizações', normalizedCategory:'other_amortisation', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ TV a Cabo', normalizedCategory:'admin_general_expense', amountNative:-0.002953, disclosureLevel:'aggregated' }, // pág. 4, Claude 0.8
    { rawLabel:'Locação de Móveis e Utensílios', normalizedCategory:'admin_general_expense', amountNative:-0.00108, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Fotocópias, Autenticações e Rec. Firmas', normalizedCategory:'admin_general_expense', amountNative:-0.0021, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'Utensílios Copa/Cozinha', normalizedCategory:'admin_general_expense', amountNative:-0.001405, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Despesas c/ Eventos', normalizedCategory:'other_expenses', amountNative:-0.003674, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ Fretes e Carretos', normalizedCategory:'admin_general_expense', amountNative:-0.000085, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.91
    { rawLabel:'Despesas c/ Seguro de Vida', normalizedCategory:'admin_general_expense', amountNative:-0.014013, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ CIEE', normalizedCategory:'admin_general_expense', amountNative:-0.00067, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ Estagiários', normalizedCategory:'admin_general_expense', amountNative:-0.0005, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas Processuais - FIFA', normalizedCategory:'other_expenses', amountNative:-0.019168, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Despesas c/ Uniformes', normalizedCategory:'other_expenses', amountNative:-0.00214, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Serviços de Cobrança', normalizedCategory:'admin_general_expense', amountNative:-0.000028, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-0.007639, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Uniformes', normalizedCategory:'other_expenses', amountNative:-0.672592, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Medicamentos e Mat.Medicos e Cirurgicos', normalizedCategory:'admin_general_expense', amountNative:-0.104349, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.05101, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Aluguel', normalizedCategory:'admin_general_expense', amountNative:-0.551405, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Bens de Valores Irrelevantes', normalizedCategory:'admin_general_expense', amountNative:-0.071935, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Energia Eletrica', normalizedCategory:'admin_general_expense', amountNative:-0.020744, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Impostos e Taxas', normalizedCategory:'admin_general_expense', amountNative:-0.014809, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Manutenção e Conservação de Bens', normalizedCategory:'admin_general_expense', amountNative:-0.00078, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Utensílios, Guarn, Cama, Mesa e Banho', normalizedCategory:'admin_general_expense', amountNative:-0.00038, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Gas', normalizedCategory:'admin_general_expense', amountNative:-0.017568, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Manutenção e Conservação do Prédio', normalizedCategory:'admin_general_expense', amountNative:-0.005531, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-0.003525, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Assinatura TV a Cabo', normalizedCategory:'admin_general_expense', amountNative:-0.005046, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Condomínio', normalizedCategory:'admin_general_expense', amountNative:-0.047432, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.000269, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'IPTU', normalizedCategory:'admin_general_expense', amountNative:-0.011922, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Agua', normalizedCategory:'admin_general_expense', amountNative:-0.000056, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Telefone', normalizedCategory:'admin_general_expense', amountNative:-0.010701, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Assistência Médica', normalizedCategory:'wages_squad', amountNative:-0.001534, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Impressos e Materiais de Escritorio', normalizedCategory:'admin_general_expense', amountNative:-0.00765, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.003613, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.99
    { rawLabel:'Homenagens', normalizedCategory:'other_expenses', amountNative:-0.00112, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Multas de Trânsito', normalizedCategory:'other_expenses', amountNative:-0.001127, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Multas por Infração a Legislação', normalizedCategory:'other_expenses', amountNative:-0.026354, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.96
    { rawLabel:'Despesas Diversas', normalizedCategory:'other_expenses', amountNative:-0.128947, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Despesas c/ Brindes', normalizedCategory:'other_expenses', amountNative:-0.000799, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Contingências Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.040934, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Honorários Contábeis,Adv e de Auditorias', normalizedCategory:'admin_general_expense', amountNative:-0.230547, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Apoio Administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.16765, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Manutenção de Software', normalizedCategory:'admin_general_expense', amountNative:-0.023495, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.92
    { rawLabel:'Consultoria', normalizedCategory:'admin_general_expense', amountNative:-0.0882, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.97
    { rawLabel:'Multas TJD - Tribunal Justiça Desportiva', normalizedCategory:'other_expenses', amountNative:-0.00335, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'ISS e Taxa Poder Polícia', normalizedCategory:'admin_general_expense', amountNative:-0.000107, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.95
    { rawLabel:'Multas, Juros e Correção Monetária', normalizedCategory:'other_expenses', amountNative:-0.011917, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.91
    { rawLabel:'Multas, Juros - Parcelamento ISS Retido', normalizedCategory:'other_expenses', amountNative:-0.000035, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Contribuição Negocial', normalizedCategory:'wages_squad', amountNative:-0.011125, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Imposto de Renda s/Remessa ao Exterior', normalizedCategory:'admin_general_expense', amountNative:-0.003383, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'Impostos e Taxas Diversas', normalizedCategory:'admin_general_expense', amountNative:-0.000684, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
  ],
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) Custos operacionais', normalizedCategory:'lump_football_operations_expense', amountNative:-17.372222, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-2.089938, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Com pessoal', normalizedCategory:'admin_general_expense', amountNative:-1.089018, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Atletas não profissionais', normalizedCategory:'youth_other_sports_expense', amountNative:-1.037524, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Com materiais', normalizedCategory:'admin_general_expense', amountNative:-0.01116, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.97
    { rawLabel:'Alojamento e moradia', normalizedCategory:'admin_general_expense', amountNative:-0.049579, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Tributária', normalizedCategory:'admin_general_expense', amountNative:-0.335045, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Outras despesas', normalizedCategory:'other_expenses', amountNative:-0.948939, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
  ],
};
const ferroviariabrFiscalYearMeta = {
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária S.A.F.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A.F. desde 2022)
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
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
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2012, 2013, 2014, 2015, 2016, 2018, 2021, 2023, 2025): Televisión, Organización de partidos
    incluidoEn:{ broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
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
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2025): Organización de partidos
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
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2015 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
  2015: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'ferroviaria-br-balanco-2015-b',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.176254, tax:0,
    extraRows: [
      {label:'Juros Passivos', value:-0.000322},
      {label:'Juros Passivos', value:-0.002357},
      {label:'Juros s/Leasing Bradesco', value:-0.017391},
      {label:'Juros e Multas Lei 12996/14', value:-0.050585},
      {label:'Encargos Financeiros', value:-0.107},
      {label:'Rendimentos Aplicações Financeiras', value:0.000036},
      {label:'Descontos Obtidos', value:0.001365},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.667066, officialTotalExpenses:5.589038, officialPAT:-1.098226,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = (10.553). Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 38.727. Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 265.000. Claude 2026-10-09: las deducciones (PIS 639 + COFINS 2.943 + ICMS 6.971 = 10.553, nota L966-969) restan de la receita bruta: la nota las imprime en positivo y la extracción las sumaba como ingresos. Cuenta: bruta 9.221.750 (L113 = nota L948-958) - deduções 10.553 (L114) = RECEITA LÍQUIDA 9.211.197 (L115); - custos/despesas 10.134.897 (L116-123) - financiero 266.455 (L124) = -1.190.155 (L129). Se re-cargan dos renglones positivos para que el signo de la deducción se lea como resta.
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Claude 2026-10-09: se saca el subtotal RECEITA LÍQUIDA 9.211.197 (L115) para que no se sume junto a sus componentes (bruta 9.221.750 - deduções 10.553 = 9.211.197).
  2016: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2016-12-31',
    sourceId:'ferroviaria-br-balanco-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.266455, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:9.211197, officialTotalExpenses:10.134897, officialPAT:-1.190155,
  },
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  // 2018: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): reportType = official_balance_sheet. Onboarding to-do 165 (Claude, 2026-10-09): es la Demonstração do Resultado do Exercício del sistema contable del club, período 01/01 a 31/12/2018 (cuentas con saldo C/D, termina en el prejuízo/lucro del período); el balance del año no se carga de este PDF
  2018: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2018-12-31',
    sourceId:'ferroviaria-br-dre-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.451022, tax:-0.061593,
    extraRows: [
      {label:'Juros Passivos', value:-0.015195},
      {label:'Despesas Bancarias', value:-0.024227},
      {label:'Encargos Financeiros', value:-0.311399},
      {label:'Juros s/Leasing Bradesco', value:-0.004579},
      {label:'Juros e Multas Lei 12996/14', value:-0.006118},
      {label:'IOF', value:-0.00016},
      {label:'Indenizações - Contratos de Aluguéis', value:-0.027},
      {label:'Perdas Eventuais', value:-0.006963},
      {label:'Juros e Multas Parcel. PIS s/Folha Pagto', value:-0.002001},
      {label:'Juros e Multas Parcel. IRRF s/Salários', value:-0.001927},
      {label:'Anuidade Cartão de Crédito', value:-0.000286},
      {label:'Despesas c/ Cartão de Crédito', value:-0.000202},
      {label:'Juros e Multas Parcelamento INSS', value:-0.040446},
      {label:'Juros e Multas Parcelamento FGTS', value:-0.004779},
      {label:'Juros e Multas Parcelamento PERT', value:-0.003513},
      {label:'Juros e Multas Parcelamento IRRF', value:-0.003935},
      {label:'Juros e Multas Parcel. ICMS 20319835-0', value:-0.000519},
      {label:'Banco Bradesco S/A', value:0.000536},
      {label:'Descontos Obtidos', value:0.001691},
      {label:'Rendas Eventuais', value:0},
      {label:'Contribuição Social', value:-0.022657},
      {label:'IRPJ', value:-0.038936},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:12.018497, officialTotalExpenses:11.409354, officialPAT:0.09653,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): name = Ferroviária Futebol S.A.. Revisión del alta (Claude, 2026-10-09): dato de Guido, mismo club que la Associação Ferroviária de Esportes; el nombre sigue la serie (S.A. hasta 2021)
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2013, 2014, 2015, 2016, 2018, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'ferroviaria-br-demonstracoes-financeiras-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.127878, tax:0,
    extraRows: [
      {label:'Receita financeira', value:0.439136},
      {label:'Despesas financeiras', value:-0.567014},
      {label:'Imposto de renda e contribuição social', value:null},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'(-) Custos operacionais', lado:'expense', importe:17.372222, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:17.954394, officialTotalExpenses:22.933425, officialPAT:-5.106909,
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
  'ferroviaria-br-balanco-2015-b': {
    id:'ferroviaria-br-balanco-2015-b', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2015-b (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2015-b.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-balanco-2016': {
    id:'ferroviaria-br-balanco-2016', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — balanco-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/balanco-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-dre-2018': {
    id:'ferroviaria-br-dre-2018', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — dre-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/dre-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'ferroviaria-br-demonstracoes-financeiras-2021': {
    id:'ferroviaria-br-demonstracoes-financeiras-2021', clubId:'ferroviaria-br',
    title:'Ferroviária Futebol S.A. — demonstracoes-financeiras-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Ferroviaria/demonstracoes-financeiras-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['ferroviaria-br'] = null;
