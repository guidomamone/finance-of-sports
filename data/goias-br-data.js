// ============================================================================
// data/goias-br-data.js — Goiás Esporte Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Goias/demonstracoes-contabeis-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "goias-br" — slug de "Goias" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Goiás Esporte Clube" — claude-api con cita verificada: pág. 11: "O Goiás Esporte Clube é uma associação civil de prática desportiva, sem fins lucrativos, de natureza não emp
//   displayName        ok        "Goias" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — claude-api con cita verificada: pág. 3: "Examinamos as demonstrações contábeis do Goiás Esporte Clube (“Clube”), que compreendem o balanço patrimonial
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2025-12-31 = 5.5024 (PTAX de cierre (venda) del Banco Central do Brasil, boletín del 30/
//   sourceId           ok        "goias-br-demonstracoes-contabeis-2025" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Goiás"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2025-12-31","sourceId":"goias-br-demonstracoes-contabeis-2025"}
// ============================================================================

const goiasbrRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:0.620535, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:29.197496, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:0.798176, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Transação de atletas (a)', normalizedCategory:'player_sales', amountNative:8.428754, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:4.875064, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Associados', normalizedCategory:'member_dues', amountNative:0.8888, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.540095, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.96
    { rawLabel:'Iniciação Esportiva', normalizedCategory:'youth_football', amountNative:1.353467, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:0.361836, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:1.633783, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.140464, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:1.561124, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'(-) INSS Receitas de Bilheterias', normalizedCategory:'other_income', amountNative:-0.031027, disclosureLevel:'aggregated' }, // pág. 36, ? 0.6
    { rawLabel:'(-) Cortez. Ingressos - Campeonato Brasileiro', normalizedCategory:'matchday_competition', amountNative:-0.04021, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-1.485264, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Direito de Arena Competições/Torneios', normalizedCategory:'broadcasting', amountNative:-1.430108, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.199908, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Deduções de mensalidades', normalizedCategory:'member_dues', amountNative:-0.009696, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Custos e Despesas Nacao Esmeraldina', normalizedCategory:'member_dues', amountNative:-0.05953, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.154392, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.081689, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.048247, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Bilheterias (a)', normalizedCategory:'matchday_competition', amountNative:5.555661, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Direitos de transmissão de TV (a)', normalizedCategory:'broadcasting', amountNative:67.433772, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Premiação/participações (a)', normalizedCategory:'competition_bonus', amountNative:7.209466, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:2.997223, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda (a)', normalizedCategory:'sponsorship_commercial', amountNative:13.127705, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Associados', normalizedCategory:'member_dues', amountNative:1.3104, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.864432, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.97
    { rawLabel:'Iniciação Esportiva', normalizedCategory:'youth_football', amountNative:2.45936, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:1.225879, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:2.0918, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.200862, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:2.180431, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-3.939121, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Cortez. Ingressos - Campeonato Brasileiro', normalizedCategory:'matchday_competition', amountNative:-0.37701, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Cortez. Ingressos - Copa Verde', normalizedCategory:'matchday_competition', amountNative:-0.002005, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'(-) Direito de Arena Competições/Torneios', normalizedCategory:'broadcasting', amountNative:-3.658099, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Ressarcimento / Reembolso de Ingressos', normalizedCategory:'matchday_competition', amountNative:-0.025706, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.95
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.616538, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Deduções de mensalidades', normalizedCategory:'member_dues', amountNative:-0.25688, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Custos e Despesas Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:-0.207005, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.197675, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.10459, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.100303, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Outras Receitas e Despesas', normalizedCategory:'other_income', amountNative:8.9181, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2024: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:5.789474, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:6.987666, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:5.7525, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Receitas Atividades Sociais e Lazer', normalizedCategory:'other_income', amountNative:8.759568, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:2.71428, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:3.58769, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:3.81475, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Sou Goiás', normalizedCategory:'member_dues', amountNative:2.66899, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:0.921143, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.223135, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-0.732026, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) Deduções das mensalidades', normalizedCategory:'member_dues', amountNative:-0.614445, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.33105, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) Custos e Despesas Sou Goiás', normalizedCategory:'member_dues', amountNative:-0.509233, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.062874, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.087048, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) Cortez. Ingressos - Camp. Goiano', normalizedCategory:'matchday_competition', amountNative:-0.001815, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.046057, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'(-) Cortez. Ingressos - Copa Verde', normalizedCategory:'matchday_competition', amountNative:-0.002275, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'(-) Gestão de Bilheteria', normalizedCategory:'matchday_competition', amountNative:-0.385301, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.85
    { rawLabel:'(-) Fenapaf', normalizedCategory:'broadcasting', amountNative:-0.471658, disclosureLevel:'aggregated' }, // pág. 26, precedente
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:16.887449, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Receitas Atividades Sociais e Lazer', normalizedCategory:'other_income', amountNative:9.835889, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Patrocínio/bilheteria/Sócio Torcedor/ Outras', normalizedCategory:'sponsorship_commercial', amountNative:19.931127, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:1.084364, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-2.364205, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Outras Receitas (b)', normalizedCategory:'other_income', amountNative:1.439848, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2017-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2017-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:1.946652, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:46.040948, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:2.455, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:1.158676, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Patrocínio/ publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:4.640904, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Mensalidades', normalizedCategory:'member_dues', amountNative:4.175823, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.98
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:3.394195, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.98
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.138722, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.817285, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'(-) Deduções das receitas', normalizedCategory:'other_income', amountNative:-6.116988, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.94
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Brasil/Goias/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2023: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Direitos de transmissão de TV (a)', normalizedCategory:'broadcasting', amountNative:48.120138, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda (a)', normalizedCategory:'sponsorship_commercial', amountNative:13.370573, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Premiação/participações (a)', normalizedCategory:'competition_bonus', amountNative:10.77787, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Receitas Atividades Sociais e Lazer', normalizedCategory:'other_income', amountNative:7.951299, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Bilheterias (a)', normalizedCategory:'matchday_competition', amountNative:7.18975, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:4.565449, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:2.98135, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Sou Goiás', normalizedCategory:'member_dues', amountNative:1.734466, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:1.011995, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.272852, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-3.3035, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) Direito de Arena Compet./Torneios', normalizedCategory:'broadcasting', amountNative:-2.892523, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.650227, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) Custos e Despesas Sou Goiás', normalizedCategory:'member_dues', amountNative:-0.343497, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.277778, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'(-) Cortez. Ingressos - Camp. Brasileiro', normalizedCategory:'matchday_competition', amountNative:-0.25032, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.095634, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) Cortez. Ingressos - Camp. Goiano', normalizedCategory:'matchday_competition', amountNative:-0.06145, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.0506, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'(-) Cortez. Ingressos - Copa Verde', normalizedCategory:'matchday_competition', amountNative:-0.042935, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'(-) Cortez. Ingressos - Sul. Americana', normalizedCategory:'matchday_competition', amountNative:-0.034245, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'(-) Ressarcimento/Reembolso de Ingressos', normalizedCategory:'matchday_competition', amountNative:-0.00028, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.95
  ],
  // 2008: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2008-2007.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2009-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2010-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2011-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2012-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2012-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2013-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2015-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2015-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2014-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2008: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2008-2007.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2008: [
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:4.978553, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:10.436014, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'(-) Dedução da receita', normalizedCategory:'other_income', amountNative:-1.290613, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.06951, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Negociação de atestados liberatórios de atletas', normalizedCategory:'player_sales', amountNative:0.09317, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Mensalidades e matrículas iniciação esportiva', normalizedCategory:'youth_football', amountNative:1.602074, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:0.60017, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Parcerias com patrocinadores e parceiros', normalizedCategory:'sponsorship_commercial', amountNative:0.21, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.95
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:1.855942, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Participação loteria esportiva', normalizedCategory:'other_income', amountNative:0.834901, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Patrocínio e parceria', normalizedCategory:'sponsorship_commercial', amountNative:0.1465, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Treinamento de atletas', normalizedCategory:'other_sports', amountNative:0.241655, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.245727, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.21869, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2009-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2010-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2011-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2012-2011.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2012-2011.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:3.740004, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:36.720144, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:0.94, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:4.72165, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Patrocínio/ publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:0.948071, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Mensalidades', normalizedCategory:'member_dues', amountNative:3.324434, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:1.947704, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.074509, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.708595, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'(-) Deduções da receita', normalizedCategory:'other_income', amountNative:-4.386347, disclosureLevel:'aggregated' }, // pág. 3, precedente
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2015-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2015-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:3.514595, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:35.099523, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:2.29055, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:18.28527, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Patrocínio/ publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:2.594089, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Mensalidades', normalizedCategory:'member_dues', amountNative:4.137697, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:2.644127, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.185948, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:6.683276, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'(-) Deduções da receita', normalizedCategory:'other_income', amountNative:-5.101752, disclosureLevel:'aggregated' }, // pág. 2, precedente
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2016-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2016-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2009-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2010-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2011-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2013-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2009-2008.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2009: [
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:5.81707, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:12.65, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'(-)Dedução da receita', normalizedCategory:'other_income', amountNative:-2.216082, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Negociação de atestado liberatório de atletas', normalizedCategory:'player_sales', amountNative:3.68137, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Mensalidade e matrículas de iniciação esportiva', normalizedCategory:'youth_football', amountNative:1.903416, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Mensalidade de sócio titular', normalizedCategory:'member_dues', amountNative:0.0417, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:3.373, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Parceria com patrocinadores e parceiros', normalizedCategory:'sponsorship_commercial', amountNative:1.4, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:1.574641, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Participação em loteria esportiva', normalizedCategory:'other_income', amountNative:0.963893, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Patrocinio e parceria', normalizedCategory:'sponsorship_commercial', amountNative:0.097, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Treinamento de atletas', normalizedCategory:'other_sports', amountNative:0.00716, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.196604, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.4238, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2010-2009.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:5.236275, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:13.044375, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'(-) Dedução da receita', normalizedCategory:'other_income', amountNative:-2.348606, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'Negociação de atestado liberatório de atletas', normalizedCategory:'player_sales', amountNative:2.810396, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Mensalidade e matrículas de iniciação esportiva', normalizedCategory:'youth_football', amountNative:2.350298, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Mensalidade de sócio titular', normalizedCategory:'member_dues', amountNative:0.555774, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:3.367874, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Parceria com patrocinadores e parceiros', normalizedCategory:'sponsorship_commercial', amountNative:0.96, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:2.913373, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Participação em loteria esportiva', normalizedCategory:'other_income', amountNative:1.016236, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Patrocínio e parceria', normalizedCategory:'sponsorship_commercial', amountNative:0.192, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Treinamento de atletas', normalizedCategory:'other_sports', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.145658, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.119332, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2011: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2011-2010.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2011: [
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:2.565314, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:8.358125, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'(-) Dedução da receita', normalizedCategory:'other_income', amountNative:-1.396991, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'Negociação de atestado liberatório de atletas', normalizedCategory:'player_sales', amountNative:0.103765, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Mensalidade e matrículas de iniciação esportiva', normalizedCategory:'youth_football', amountNative:1.973443, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Mensalidade de sócio titular', normalizedCategory:'member_dues', amountNative:0.563241, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:1.541667, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Parceria com patrocinadores e parceiros', normalizedCategory:'sponsorship_commercial', amountNative:0.08, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:0.45, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Participação em loteria esportiva', normalizedCategory:'other_income', amountNative:1.1938, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Patrocínio e parceria', normalizedCategory:'sponsorship_commercial', amountNative:0.192, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.15698, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:1.315323, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2013-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:8.41719, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:30.648015, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:4.3, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:0.253333, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Patrocínio/ publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:1.839777, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'Mensalidades', normalizedCategory:'member_dues', amountNative:3.535146, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:1.928792, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.03934, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:4.510592, disclosureLevel:'aggregated' }, // pág. 18, Jev 1
    { rawLabel:'(-) Deduções da receita', normalizedCategory:'other_income', amountNative:-4.397459, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.99
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:,
  // Generados/Brasil/Goias/demonstracoes-contabeis-2014-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2014-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:6.160725, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:33.158015, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:1.02, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:6.701974, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Patrocínio/ publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:2.902819, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Mensalidades', normalizedCategory:'member_dues', amountNative:3.492262, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:3.151044, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.105828, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:10.02605, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'(-) Deduções da receita', normalizedCategory:'other_income', amountNative:-4.115943, disclosureLevel:'aggregated' }, // pág. 19, precedente
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2016-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2016-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'RECEITA LÍQUIDA DAS ATIVIDADES', normalizedCategory:'lump_football_operations', amountNative:83.004966, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.94
    { rawLabel:'Outras receitas e despesas', normalizedCategory:'other_income', amountNative:0.018408, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const goiasbrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.193143, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.94
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.015808, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.07314, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.660325, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.19065, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.96
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.523624, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Alimentação e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.697646, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-23.812163, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Amortização de custo de atletas contratados (a)', normalizedCategory:'player_amortisation', amountNative:-1.379051, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Amortização de custo de atletas formados (a)', normalizedCategory:'player_amortisation', amountNative:-2.664482, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Cessão de Direitos Imagem', normalizedCategory:'wages_squad', amountNative:-0.734997, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.85
    { rawLabel:'Despesas administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-16.69661, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Despesas com materiais', normalizedCategory:'admin_general_expense', amountNative:-1.524441, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Despesas com serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.487771, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.143501, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2022: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.657179, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.1109, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.286464, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.827396, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.591855, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.95
    { rawLabel:'Despesa com pessoal (a)', normalizedCategory:'wages_squad', amountNative:-32.758514, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Amortização de custo de atletas contratados', normalizedCategory:'player_amortisation', amountNative:-1.649192, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Amortização de custo de atletas formados', normalizedCategory:'player_amortisation', amountNative:-1.684105, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.95
    { rawLabel:'Baixa Custo de Atletas', normalizedCategory:'player_amortisation', amountNative:-7.033136, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Cessão de Direitos Econômicos', normalizedCategory:'other_expenses', amountNative:-0.750987, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Cessão de Direitos Imagem (a)', normalizedCategory:'wages_squad', amountNative:-5.298443, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.97
    { rawLabel:'Outros custos com atletas', normalizedCategory:'wages_squad', amountNative:-0.431632, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Demais custos e despesas operacionais', normalizedCategory:'other_expenses', amountNative:-5.502994, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'admin_general_expense', amountNative:-8.21312, disclosureLevel:'aggregated' }, // pág. 31, Claude 0.85
    { rawLabel:'Despesas legais e judiciais', normalizedCategory:'admin_general_expense', amountNative:-2.424251, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-3.641203, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-1.035401, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.097297, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-2.720925, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Despesas com serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-5.283848, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-6.764942, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Despesa com pessoal', normalizedCategory:'admin_general_expense', amountNative:-44.603582, disclosureLevel:'aggregated' }, // pág. 26, Claude 0.85
    { rawLabel:'Despesas com viagens', normalizedCategory:'match_organisation_expense', amountNative:-3.161637, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Serviços de terceiros', normalizedCategory:'lump_football_operations_expense', amountNative:-8.114569, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Cessão de Direitos Imagem (a)', normalizedCategory:'wages_squad', amountNative:-12.284241, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.97
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-1.185464, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Cessão Temporária', normalizedCategory:'player_amortisation', amountNative:-0.488366, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Amortização de custo de atletas formados', normalizedCategory:'player_amortisation', amountNative:-0.695254, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'Amortização de custo de atletas contratados', normalizedCategory:'player_amortisation', amountNative:-1.063213, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.127483, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.98
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.601449, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.95
    { rawLabel:'Demais custos e despesas operacionais', normalizedCategory:'other_expenses', amountNative:-0.907274, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Outros custos com atletas', normalizedCategory:'wages_squad', amountNative:-0.012469, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Cessão Definitiva', normalizedCategory:'player_amortisation', amountNative:-0.002525, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Custos e despesas c/ pessoal jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.104915, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.01355, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Luvas (a)', normalizedCategory:'wages_squad', amountNative:-0.423842, disclosureLevel:'aggregated' }, // pág. 26, precedente
    { rawLabel:'Despesa formação atletas base (b)', normalizedCategory:'youth_other_sports_expense', amountNative:-2.174585, disclosureLevel:'aggregated' }, // pág. 26, Jev 1
    { rawLabel:'Outros custos e despesas com jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.683022, disclosureLevel:'aggregated' }, // pág. 26, Jev 0.99
    { rawLabel:'Despesa com pessoal (a)', normalizedCategory:'wages_squad', amountNative:-9.428348, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-1.740842, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.98
    { rawLabel:'Despesas Administrativas (materiais inclusos)', normalizedCategory:'admin_general_expense', amountNative:-5.702875, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Despesas com serviços prestados (b)', normalizedCategory:'admin_general_expense', amountNative:-6.79538, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.608742, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-1.062935, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Despesas legais e judiciais', normalizedCategory:'admin_general_expense', amountNative:-0.043735, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.323384, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Outras Receitas e Despesas', normalizedCategory:'other_expenses', amountNative:-6.903788, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.98
  ],
  2025: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Despesa com pessoal (a)', normalizedCategory:'wages_squad', amountNative:-60.604081, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'Cessão de Direitos Imagem', normalizedCategory:'wages_squad', amountNative:-14.799284, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'Serviços de terceiros (b)', normalizedCategory:'lump_football_operations_expense', amountNative:-12.827914, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Despesa formação atletas base', normalizedCategory:'youth_other_sports_expense', amountNative:-2.257512, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Demais custos e despesas operacionais', normalizedCategory:'other_expenses', amountNative:-1.923779, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-1.888534, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Amortização de custo de atletas contratados', normalizedCategory:'player_amortisation', amountNative:-1.471898, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Cessão Temporária', normalizedCategory:'player_amortisation', amountNative:-1.330526, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Outros custos com jogos e atletas', normalizedCategory:'match_organisation_expense', amountNative:-1.291424, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.688253, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.96
    { rawLabel:'Luvas', normalizedCategory:'wages_squad', amountNative:-0.598999, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Amortização de custo de atletas formados', normalizedCategory:'player_amortisation', amountNative:-0.423305, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Custos e despesas c/ pessoal jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.103989, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.00035, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.94
    { rawLabel:'Despesas Administrativas (a)', normalizedCategory:'admin_general_expense', amountNative:-10.346189, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Despesas com serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-8.729303, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-7.972794, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.8
    { rawLabel:'Despesas legais e judiciais (b)', normalizedCategory:'exceptional_items', amountNative:-3.104744, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.92
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.521457, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.94
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-1.096766, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.195678, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas com Earn In (a)', normalizedCategory:'other_expenses', amountNative:-7.977865, disclosureLevel:'aggregated' }, // pág. 30, precedente
  ],
  2017: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Alugueis de estádios', normalizedCategory:'match_organisation_expense', amountNative:-0.182689, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.054915, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.94
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.010394, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Custos e despesas c/ pessoal - jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.168702, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Outros custos e despesas - jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.547325, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.425795, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.96
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.520839, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Alimentação e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.626228, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-37.704396, disclosureLevel:'aggregated' }, // pág. 23, Claude 0.8
    { rawLabel:'Cessão de direito de imagem', normalizedCategory:'wages_squad', amountNative:-2.324606, disclosureLevel:'aggregated' }, // pág. 23, Jev 0.96
    { rawLabel:'Combustíveis e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.047661, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Manutenção e conservação', normalizedCategory:'admin_general_expense', amountNative:-0.364492, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.98
    { rawLabel:'Propaganda e publicidade', normalizedCategory:'admin_general_expense', amountNative:-0.109146, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Brindes', normalizedCategory:'admin_general_expense', amountNative:-0.044, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.95
    { rawLabel:'Despesas legais e judiciais', normalizedCategory:'admin_general_expense', amountNative:-0.200116, disclosureLevel:'aggregated' }, // pág. 24, Claude 0.8
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-0.71825, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.248144, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.96
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-0.399407, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Livros, revistas e periódicos', normalizedCategory:'admin_general_expense', amountNative:-0.018631, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.021251, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.98
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.009205, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Despesas indedutíveis', normalizedCategory:'other_expenses', amountNative:-0.000213, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Outras despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-1.286006, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.92
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-4.725694, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.94
    { rawLabel:'Provisões cíveis, trabalhistas e tributárias', normalizedCategory:'admin_general_expense', amountNative:-1.871806, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Despesas com materiais', normalizedCategory:'admin_general_expense', amountNative:-0.897196, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
    { rawLabel:'Despesas com serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.614886, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.826018, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Outras despesas e receitas', normalizedCategory:'other_expenses', amountNative:-0.006692, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  2023: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Outras Receitas e Despesas', normalizedCategory:'exceptional_items', amountNative:140.214785, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Despesa com pessoal (a)', normalizedCategory:'wages_squad', amountNative:-43.24911, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'Despesas com viagens (b)', normalizedCategory:'match_organisation_expense', amountNative:-7.52929, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Serviços de terceiros', normalizedCategory:'lump_football_operations_expense', amountNative:-7.501287, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Cessão de Direitos Imagem (a)', normalizedCategory:'wages_squad', amountNative:-6.94578, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.97
    { rawLabel:'Baixa Custo de Atletas', normalizedCategory:'player_amortisation', amountNative:-3.685438, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Materiais Esportivos', normalizedCategory:'other_expenses', amountNative:-2.301108, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Cessão Temporária', normalizedCategory:'player_amortisation', amountNative:-1.369988, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Amortização de custo de atletas formados', normalizedCategory:'player_amortisation', amountNative:-1.322065, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.95
    { rawLabel:'Amortização de custo d atletas contratados', normalizedCategory:'player_amortisation', amountNative:-1.219063, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-1.037313, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.745417, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.95
    { rawLabel:'Demais custos e despesas operacionais', normalizedCategory:'other_expenses', amountNative:-0.568291, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Outros custos com atletas', normalizedCategory:'wages_squad', amountNative:-0.52261, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Cessão Definitiva', normalizedCategory:'player_amortisation', amountNative:-0.188851, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Custos e despesas c/ pessoal jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.114969, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Aluguéis e Estádios', normalizedCategory:'match_organisation_expense', amountNative:-0.070963, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.03785, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'admin_general_expense', amountNative:-7.947338, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.85
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-6.380613, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'Despesas Administrativas (materiais inclusos)', normalizedCategory:'admin_general_expense', amountNative:-3.914253, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Despesas com serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-3.304666, disclosureLevel:'aggregated' }, // pág. 30, Claude 0.85
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.648703, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-1.101099, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Despesas legais e judiciais', normalizedCategory:'admin_general_expense', amountNative:0.117608, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.739705, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
  2008: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com jogos', normalizedCategory:'match_organisation_expense', amountNative:-2.516301, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Pessoal', normalizedCategory:'wages_squad', amountNative:-15.643605, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Acordos e indezações trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-3.312554, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Direito de arena', normalizedCategory:'match_organisation_expense', amountNative:-2.570675, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Acordos judiciais e extrajudiciais', normalizedCategory:'admin_general_expense', amountNative:-3.044704, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Direitos de imagem', normalizedCategory:'wages_squad', amountNative:-5.681739, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Serviços profissionais comissão técnica', normalizedCategory:'wages_squad', amountNative:-0.272933, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'Amortização/baixa de contratos de atletas profissionais', normalizedCategory:'player_amortisation', amountNative:-0.59843, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.261599, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-1.215633, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.303049, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-1.498388, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-1.231903, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2012: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com futebol', normalizedCategory:'lump_football_operations_expense', amountNative:-35.830361, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.147616, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.558845, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.880989, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.450007, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-3.096477, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2015: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Alugueis de estádios', normalizedCategory:'match_organisation_expense', amountNative:-0.351459, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.297754, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.11669, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.118661, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.566093, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.440461, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.155577, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Alimentação e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.384991, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Cessão de direitos de atletas', normalizedCategory:'player_amortisation', amountNative:-0.361, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-20.883639, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Cessão de direito de imagem', normalizedCategory:'wages_squad', amountNative:-2.915742, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.340104, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.664503, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.427361, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.227969, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-0.731145, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.22376, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-0.310211, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Livros, revistas e periódicos', normalizedCategory:'admin_general_expense', amountNative:-0.010659, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.010257, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.005496, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Despesas indedutíveis', normalizedCategory:'other_expenses', amountNative:-0.000004, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Outras despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-1.634638, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.793773, disclosureLevel:'aggregated' }, // pág. 3, precedente
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-3.261794, disclosureLevel:'aggregated' }, // pág. 3, precedente
  ],
  2009: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com jogos', normalizedCategory:'match_organisation_expense', amountNative:-3.009223, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Pessoal', normalizedCategory:'wages_squad', amountNative:-28.247694, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Provisões, Acordos e indenizações trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-2.552778, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.92
    { rawLabel:'Direito de arena', normalizedCategory:'match_organisation_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Acordos judiciais e extrajudiciais', normalizedCategory:'admin_general_expense', amountNative:-2.418494, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-5.789414, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Serviços profissionais comissão técnica', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'Amortização/baixa de contratos de atletas profissionais', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-1.142823, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.215732, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.286807, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-2.3427, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2010: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com jogos', normalizedCategory:'match_organisation_expense', amountNative:-3.981832, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Pessoal', normalizedCategory:'wages_squad', amountNative:-23.218075, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Provisões, acordos e indenizações', normalizedCategory:'admin_general_expense', amountNative:3.355708, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Acordos judiciais e extrajudiciais', normalizedCategory:'admin_general_expense', amountNative:-0.452889, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-4.262228, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Serviços profissionais comissão técnica', normalizedCategory:'wages_squad', amountNative:-1.239625, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.273126, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-1.243092, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.659554, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.240843, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-1.177761, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2011: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.867538, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Pessoal', normalizedCategory:'wages_squad', amountNative:-16.297246, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Provisões/reversões, acordos e indenizações', normalizedCategory:'admin_general_expense', amountNative:-4.791638, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Acordos judiciais e extrajudiciais', normalizedCategory:'admin_general_expense', amountNative:-0.156261, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-3.0503, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Serviços profissionais comissão técnica', normalizedCategory:'wages_squad', amountNative:-0.663231, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.200295, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.419706, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.064712, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.435815, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-0.683319, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2013: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'(-) Despesas com futebol profissional e amador', normalizedCategory:'lump_football_operations_expense', amountNative:-44.649623, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'(-) Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.204453, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'(-) Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.697356, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.91
    { rawLabel:'(-) Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.262262, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'(-) Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.837323, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'(-) Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-4.867446, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
  2014: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Alugueis de estádios', normalizedCategory:'match_organisation_expense', amountNative:-0.298538, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.322062, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.095376, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.141368, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.474926, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.648642, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.482229, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Alimentação e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.359502, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Cessão de direitos de atletas', normalizedCategory:'player_amortisation', amountNative:-0.748, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-21.628163, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'(-) Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.439175, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'(-) Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.5826, disclosureLevel:'aggregated' }, // pág. 6, Claude 0.8
    { rawLabel:'(-) Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-1.920709, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'(-) Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.744977, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-0.524457, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.171916, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Lanches e refeições', normalizedCategory:'admin_general_expense', amountNative:-0.262487, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Livros, revistas e periódicos', normalizedCategory:'admin_general_expense', amountNative:-0.011388, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Correios', normalizedCategory:'admin_general_expense', amountNative:-0.014419, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.00349, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-0.002955, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Outras despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.361363, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-6.116818, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-4.061112, disclosureLevel:'aggregated' }, // pág. 20, precedente
  ],
  2016: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Despesas com futebol profissional e amador', normalizedCategory:'lump_football_operations_expense', amountNative:-38.209386, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.454245, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.875578, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.284072, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-1.454818, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-19.707325, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const goiasbrFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.473957, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:46.859523, officialTotalExpenses:52.797352, officialPAT:-7.412038,
  },
  2022: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2022-fgf-go',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.16834, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:1.371401},
      {label:'Despesas financeiras', value:-4.539741},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:106.090159, officialTotalExpenses:89.763784, officialPAT:13.158035,
  },
  2024: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:4.161428, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:7.20401},
      {label:'Despesas financeiras', value:-3.042582},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Serviços de terceiros', lado:'expense', importe:8.114569, motivo:'Guido 2026-10-02, respuestas en bloque de Goiás (propuestas de Claude aprobadas)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:37.975414, officialTotalExpenses:111.257469, officialPAT:-69.120627,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): cero-real = Estadio. Guido 2026-10-02: el documento 2025 no separa bilheteria ni sócio torcedor: van juntos en 'Patrocínio/bilheteria/Sócio Torcedor/ Outras' 19.931.127. El 0 es del desglose, no un dato perdido; reintentar no lo arregla.
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): cero-real = Cuotas sociales. Guido 2026-10-02: el documento 2025 no separa bilheteria ni sócio torcedor: van juntos en 'Patrocínio/bilheteria/Sócio Torcedor/ Outras' 19.931.127. El 0 es del desglose, no un dato perdido; reintentar no lo arregla.
  2025: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.769924, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:3.906292},
      {label:'Despesas financeiras', value:-6.676216},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Serviços de terceiros (b)', lado:'expense', importe:12.827914, motivo:'Guido 2026-10-02, respuestas en bloque de Goiás (propuestas de Claude aprobadas)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:46.814472, officialTotalExpenses:139.0499, officialPAT:-98.110093,
  },
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2017. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2017-2016' es el ejercicio 2017 con 2016 de comparativo, no 2016.
  2017: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2017-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2017-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.974389, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:58.651219, officialTotalExpenses:57.974704, officialPAT:1.650903,
  },
  2023: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.425102, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Serviços de terceiros', lado:'expense', importe:7.501287, motivo:'Guido 2026-10-02, respuestas en bloque de Goiás (propuestas de Claude aprobadas)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:89.972753, officialTotalExpenses:104.328162, officialPAT:124.434274,
  },
  // 2008: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2008. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2008-2007' es el ejercicio 2008 con 2007 de comparativo, no 2007.
  // 2009: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2009. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2009-2008' es el ejercicio 2009 con 2008 de comparativo, no 2008.
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2010. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2010-2009' es el ejercicio 2010 con 2009 de comparativo, no 2009.
  // 2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2011. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2011-2010' es el ejercicio 2011 con 2010 de comparativo, no 2010.
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2012. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2012-2011' es el ejercicio 2012 con 2011 de comparativo, no 2011.
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2013. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2013-2012' es el ejercicio 2013 con 2012 de comparativo, no 2012.
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2015. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2015-2014' es el ejercicio 2015 con 2014 de comparativo, no 2014.
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2014. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2014-2013' es el ejercicio 2014 con 2013 de comparativo, no 2013.
  // 2008: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2008. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2008-2007' es el ejercicio 2008 con 2007 de comparativo, no 2007.
  2008: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2008-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2008-2007',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.83524, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.452506},
      {label:'Despesas financeiras', value:-1.287746},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:20.242293, officialTotalExpenses:39.151513, officialPAT:-19.74446,
  },
  // 2009: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2009. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2009-2008' es el ejercicio 2009 con 2008 de comparativo, no 2008.
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2010. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2010-2009' es el ejercicio 2010 con 2009 de comparativo, no 2009.
  // 2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2011. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2011-2010' es el ejercicio 2011 con 2010 de comparativo, no 2010.
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2012. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2012-2011' es el ejercicio 2012 con 2011 de comparativo, no 2011.
  2012: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2012-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2012-2011',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.360016, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.022641},
      {label:'Despesas financeiras', value:-5.382657},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Despesas com futebol', lado:'expense', importe:35.830361, motivo:'Guido 2026-10-02, categorías de Goiás 2008-2015 en bloque (propuesta de Claude)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:48.738763, officialTotalExpenses:41.964296, officialPAT:1.414451,
  },
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2015. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2015-2014' es el ejercicio 2015 con 2014 de comparativo, no 2014.
  2015: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2015-2014',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.572564, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:70.333324, officialTotalExpenses:39.233744, officialPAT:25.527016,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2016. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2016-2015' es el ejercicio 2016 con 2015 de comparativo, no 2015.
  // 2009: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2009. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2009-2008' es el ejercicio 2009 con 2008 de comparativo, no 2008.
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2010. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2010-2009' es el ejercicio 2010 con 2009 de comparativo, no 2009.
  // 2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2011. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2011-2010' es el ejercicio 2011 con 2010 de comparativo, no 2010.
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2013. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2013-2012' es el ejercicio 2013 con 2012 de comparativo, no 2012.
  // 2009: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2009. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2009-2008' es el ejercicio 2009 con 2008 de comparativo, no 2008.
  2009: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2009-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2009-2008',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.236603, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.181964},
      {label:'Despesas financeiras', value:-2.418567},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:29.913572, officialTotalExpenses:47.005665, officialPAT:-19.328697,
  },
  // 2010: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2010. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2010-2009' es el ejercicio 2010 con 2009 de comparativo, no 2009.
  2010: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2010-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2010-2009',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.660002, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.010513},
      {label:'Despesas financeiras', value:-6.670515},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:30.362985, officialTotalExpenses:34.393317, officialPAT:-10.690334,
  },
  // 2011: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2011. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2011-2010' es el ejercicio 2011 con 2010 de comparativo, no 2010.
  2011: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2011-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2011-2010',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.79464, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.004537},
      {label:'Despesas financeiras', value:-5.799177},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:17.096667, officialTotalExpenses:29.630061, officialPAT:-18.328034,
  },
  // 2013: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2013. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2013-2012' es el ejercicio 2013 con 2012 de comparativo, no 2012.
  2013: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2013-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2013-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.049692, tax:0,
    extraRows: [
      {label:'(+) Receitas financeiras', value:0.07421},
      {label:'(-) Despesas financeiras', value:-4.123902},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'(-) Despesas com futebol profissional e amador', lado:'expense', importe:44.649623, motivo:'Guido 2026-10-02, categorías de Goiás 2008-2015 en bloque (propuesta de Claude)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:51.074726, officialTotalExpenses:54.518463, officialPAT:-7.493428,
  },
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2014. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2014-2013' es el ejercicio 2014 con 2013 de comparativo, no 2013.
  // 2014: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2014. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2014-2013' es el ejercicio 2014 con 2013 de comparativo, no 2013.
  2014: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2014-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2014-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.077784, tax:0,
    extraRows: [
      {label:'(+) Receitas financeiras', value:0.08474},
      {label:'(-) Despesas financeiras', value:-6.162524},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:62.602773, officialTotalExpenses:41.416673, officialPAT:15.108316,
  },
  // 2016: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): anio = 2016. Guido 2026-10-02: el nombre del archivo de Goiás está mal para el script; '2016-2015' es el ejercicio 2016 con 2015 de comparativo, no 2015.
  2016: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2016-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2016-2015',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.260861, tax:0,
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'RECEITA LÍQUIDA DAS ATIVIDADES', lado:'revenue', importe:83.004966, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas com futebol profissional e amador', lado:'expense', importe:38.209386, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:83.023374, officialTotalExpenses:63.985423, officialPAT:15.77709,
  },
};
const goiasbrPresupuestoOverlayByYear = {};

const goiasbrPasesData = [];
const goiasbrResultadosData = {};
const goiasbrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['goias-br'] = {
  revenueLinesByYear: goiasbrRevenueLinesByYear, expenseLinesByYear: goiasbrExpenseLinesByYear,
  fiscalYearMeta: goiasbrFiscalYearMeta, pasesData: goiasbrPasesData,
  resultadosData: goiasbrResultadosData, titulosData: goiasbrTitulosData,
  presupuestoOverlayByYear: goiasbrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'goias-br-demonstracoes-contabeis-2021': {
    id:'goias-br-demonstracoes-contabeis-2021', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2022-fgf-go': {
    id:'goias-br-demonstracoes-contabeis-2022-fgf-go', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2022-fgf-go (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2023': {
    id:'goias-br-demonstracoes-contabeis-2023', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2024': {
    id:'goias-br-demonstracoes-contabeis-2024', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2025': {
    id:'goias-br-demonstracoes-contabeis-2025', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2017-2016': {
    id:'goias-br-demonstracoes-contabeis-2017-2016', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2017-2016 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2017-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2008-2007': {
    id:'goias-br-demonstracoes-contabeis-2008-2007', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2008-2007 (ejercicio 2008)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2008-2007.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2009-2008': {
    id:'goias-br-demonstracoes-contabeis-2009-2008', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2009-2008 (ejercicio 2009)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2009-2008.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2010-2009': {
    id:'goias-br-demonstracoes-contabeis-2010-2009', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2010-2009 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2010-2009.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2011-2010': {
    id:'goias-br-demonstracoes-contabeis-2011-2010', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2011-2010 (ejercicio 2011)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2011-2010.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2012-2011': {
    id:'goias-br-demonstracoes-contabeis-2012-2011', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2012-2011 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2012-2011.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2013-2012': {
    id:'goias-br-demonstracoes-contabeis-2013-2012', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2013-2012 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2013-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2015-2014': {
    id:'goias-br-demonstracoes-contabeis-2015-2014', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2015-2014 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2015-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2014-2013': {
    id:'goias-br-demonstracoes-contabeis-2014-2013', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2014-2013 (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2014-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2016-2015': {
    id:'goias-br-demonstracoes-contabeis-2016-2015', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2016-2015 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2016-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['goias-br'] = null;
