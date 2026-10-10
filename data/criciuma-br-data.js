// ============================================================================
// data/criciuma-br-data.js — Criciúma Esporte Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "criciuma-br" — slug de "Criciuma" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Criciúma Esporte Clube" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Criciuma" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcrip
//   sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2012 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre nul
//   cierre             ok        "2012-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2012-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2012-12-31 = 2.0435 (PTAX de cierre (venda) del Banco Central do Brasil al 2012-12-31)
//   sourceId           ok        "criciuma-br-demonstrativo-financeiro-2012" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2012 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Criciúma"
//
// FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2012: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2012-12-31","sourceId":"criciuma-br-demonstrativo-financeiro-2012"}
// ============================================================================

const criciumabrRevenueLinesByYear = {
  // 2012: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstrativo-financeiro-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Futebol', normalizedCategory:'lump_football_operations', amountNative:13.684738, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.92
    { rawLabel:'Sócios', normalizedCategory:'member_dues', amountNative:5.624029, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Extraordinárias', normalizedCategory:'other_income', amountNative:0.303164, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.655157, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.186412, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.95
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.088605, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstracoes-financeiras-2013.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstracoes-financeiras-2013.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'Futebol', normalizedCategory:'lump_football_operations', amountNative:31.284433, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.92
    { rawLabel:'Sócios', normalizedCategory:'member_dues', amountNative:10.343313, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'MESP - Projeto Formação Atletas – nota 5', normalizedCategory:'other_income', amountNative:1.422656, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Extraordinárias', normalizedCategory:'other_income', amountNative:0.705478, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.795949, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.292131, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.95
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.155927, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/balanco-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:10.799073, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:3.003071, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:1.264179, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:1.417122, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:7.58, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.73129, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:1.344944, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/balanco-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:2.390861, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:1.804347, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.501123, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.449258, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:7.895414, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.090646, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.69758, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstrativo-financeiro-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:7.707719, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:1.721452, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:1.885235, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.342203, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:0.227584, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.15963, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'Reversão contingências – Termo de Rescisão Parcial GA', normalizedCategory:'other_income', amountNative:2.390899, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.98
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.851256, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/relatorio-de-balanco-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2024: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/relatorio-de-balanco-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  // 2025: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/relatorio-auditoria-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/relatorio-auditoria-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:19.562719, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:17.899329, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:5.707084, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.978593, disclosureLevel:'aggregated' }, // pág. 24, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:6.3372, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.966982, disclosureLevel:'aggregated' }, // pág. 24, Jev 0.99
    { rawLabel:'Receita com licenciamento – royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.796536, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Receita Timemania - CEF', normalizedCategory:'other_income', amountNative:1.014457, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:3.017633, disclosureLevel:'aggregated' }, // pág. 24, Jev 1
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstracoes-financeiras-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstracoes-financeiras-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'RECEITA OPERACIONAL BRUTA', normalizedCategory:'lump_football_operations', amountNative:27.268558, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Outras receitas Operacionais', normalizedCategory:'other_income', amountNative:0.032222, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2014.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstrativo-financeiro-2014.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'Receitas com transmissões televisivas', normalizedCategory:'broadcasting', amountNative:30.086366, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Receitas com mensalidade dos sócios', normalizedCategory:'member_dues', amountNative:10.809859, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Receita de mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:1.048507, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.9
    { rawLabel:'Repasses de direitos federativos', normalizedCategory:'player_sales', amountNative:0.505145, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.441636, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Receitas com royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.119377, disclosureLevel:'aggregated' }, // pág. 27, ? 0.65
    { rawLabel:'Receitas de publicidade', normalizedCategory:'sponsorship_commercial', amountNative:0.268621, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Receita com transmissão televisíveis', normalizedCategory:'broadcasting', amountNative:8.776922, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com mensalidade de sócios', normalizedCategory:'member_dues', amountNative:6.727476, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.95
    { rawLabel:'Receita de mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:2.441524, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.9
    { rawLabel:'Repasse de direitos federativos', normalizedCategory:'player_sales', amountNative:0.25, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.128315, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receitas de royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.068507, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Receitas Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.344811, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.96
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Receita com transmissão televisíveis', normalizedCategory:'broadcasting', amountNative:7.070872, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Receita com mensalidade de sócios', normalizedCategory:'member_dues', amountNative:4.047471, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.95
    { rawLabel:'Receita com Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:2.089015, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Receita de mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:0.459719, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.9
    { rawLabel:'Repasse de direitos federativos', normalizedCategory:'player_sales', amountNative:1.664904, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.30484, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Receitas de royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.028741, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receitas Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.285287, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.96
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:1.434918, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-2018.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Receita com transmissão televisíveis', normalizedCategory:'broadcasting', amountNative:7.825593, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Receita com mensalidades de sócios', normalizedCategory:'member_dues', amountNative:3.601009, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:2.407857, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.536091, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:12.8675, disclosureLevel:'aggregated' }, // pág. 29, precedente
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.518477, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receita Loteria Esportiva/Timemania', normalizedCategory:'other_income', amountNative:0.250696, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.2845, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receitas de royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.018349, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receitas de publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.208933, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.393393, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/balanco-auditado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/balanco-auditado-2016.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'Receita com transmissão televisíveis', normalizedCategory:'broadcasting', amountNative:5.374282, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receita com mensalidade de sócios', normalizedCategory:'member_dues', amountNative:5.002656, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receita com Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:2.293138, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receita de mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:1.73834, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Repasse de direitos federativos', normalizedCategory:'player_sales', amountNative:10.13655, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.233375, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receitas de royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.029385, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Receitas Publicidades', normalizedCategory:'sponsorship_commercial', amountNative:0.263119, disclosureLevel:'aggregated' }, // pág. 28, precedente
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.893194, disclosureLevel:'aggregated' }, // pág. 28, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/relatorio-de-balanco-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:14.011212, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:15.373894, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:4.1016, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.51435, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:0.461839, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:0.920438, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Receita com licenciamento – royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.1579, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita Timemania - CEF', normalizedCategory:'other_income', amountNative:0.754578, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:2.196626, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Criciuma/relatorio-de-balanco-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/relatorio-de-balanco-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Receita com transmissão', normalizedCategory:'broadcasting', amountNative:60.386671, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com sócios', normalizedCategory:'member_dues', amountNative:20.169677, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.9
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:10.039129, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita de subvenções', normalizedCategory:'other_income', amountNative:0.529636, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Receita com negociação de atletas', normalizedCategory:'player_sales', amountNative:1.947359, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita com jogos', normalizedCategory:'matchday_competition', amountNative:2.967683, disclosureLevel:'aggregated' }, // pág. 25, Jev 0.99
    { rawLabel:'Receita com licenciamento – royalties', normalizedCategory:'sponsorship_commercial', amountNative:1.204296, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Receita Timemania - CEF', normalizedCategory:'other_income', amountNative:0.695093, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:3.033903, disclosureLevel:'aggregated' }, // pág. 25, Jev 1
  ],
};
const criciumabrExpenseLinesByYear = {
  2012: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-15.56887, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-1.4443, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.318809, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento marketing e comercial', normalizedCategory:'admin_general_expense', amountNative:-0.714485, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento financeiro', normalizedCategory:'admin_general_expense', amountNative:-0.159496, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento de patrimônio', normalizedCategory:'admin_general_expense', amountNative:-2.558049, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento jurídico', normalizedCategory:'admin_general_expense', amountNative:-0.106247, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento loja Tigre Maníacos', normalizedCategory:'admin_general_expense', amountNative:-0.180738, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.223862, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
  2013: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-28.077497, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-2.028453, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.856767, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento marketing e comercial', normalizedCategory:'admin_general_expense', amountNative:-0.971574, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento financeiro', normalizedCategory:'admin_general_expense', amountNative:-0.14397, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento de patrimônio', normalizedCategory:'admin_general_expense', amountNative:-3.331551, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento jurídico', normalizedCategory:'admin_general_expense', amountNative:-1.271965, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento loja Tigre Maníacos', normalizedCategory:'admin_general_expense', amountNative:-0.25209, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.420794, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
  2019: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-16.888461, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-1.999967, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.519791, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-3.465363, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.825209, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
  ],
  2020: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-7.582374, disclosureLevel:'aggregated' }, // pág. 4, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-0.962244, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.059948, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-2.959021, disclosureLevel:'aggregated' }, // pág. 4, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.05808, disclosureLevel:'aggregated' }, // pág. 4, Jev 1
  ],
  2021: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-11.524382, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-1.628007, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Departamento Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-0.306311, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.246346, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-2.960509, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.357685, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
  ],
  2025: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-64.178298, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-4.487895, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-0.920625, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-3.036331, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-6.960257, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-1.338729, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2022: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-15.977814, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-1.902868, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-0.263722, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.385459, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-3.584477, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.708285, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2014: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Departamento profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-32.953552, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-2.519771, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.884796, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento marketing e comercial', normalizedCategory:'admin_general_expense', amountNative:-0.687495, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento financeiro', normalizedCategory:'admin_general_expense', amountNative:-0.199486, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento de patrimônio', normalizedCategory:'admin_general_expense', amountNative:-4.094848, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento jurídico', normalizedCategory:'admin_general_expense', amountNative:-0.716254, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento loja Tigre Maníacos', normalizedCategory:'admin_general_expense', amountNative:-0.249772, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.063622, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
  2015: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-18.289053, disclosureLevel:'aggregated' }, // pág. 5, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-1.813209, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.45036, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Departamento de Marketing e Comercial', normalizedCategory:'admin_general_expense', amountNative:-1.188369, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Departamento Financeiro', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'Departamento de Patrimonio', normalizedCategory:'admin_general_expense', amountNative:-3.704815, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'Departamento Jurídico', normalizedCategory:'admin_general_expense', amountNative:-1.340799, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Departamento Loja - Tigre Maníacos', normalizedCategory:'other_expenses', amountNative:-0.151713, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.91
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.264213, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
  ],
  2017: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Departamento Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-14.332058, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Amador', normalizedCategory:'youth_other_sports_expense', amountNative:-2.429934, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.683967, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Marketing e Comercial', normalizedCategory:'admin_general_expense', amountNative:-0.527402, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Patrimonio', normalizedCategory:'admin_general_expense', amountNative:-3.985009, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Departamento Juridico', normalizedCategory:'admin_general_expense', amountNative:-2.673868, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Loja - Tigre Maniacos', normalizedCategory:'other_expenses', amountNative:-0.160993, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.91
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.381374, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2018: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-12.83884, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-2.586197, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-1.068598, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-3.970588, disclosureLevel:'aggregated' }, // pág. 10, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.466372, disclosureLevel:'aggregated' }, // pág. 10, precedente
  ],
  2016: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Departamento Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-15.124972, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Amador', normalizedCategory:'youth_other_sports_expense', amountNative:-2.60462, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.860398, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento de Marketing e Comercial', normalizedCategory:'admin_general_expense', amountNative:-0.510526, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento de Patrimonio', normalizedCategory:'admin_general_expense', amountNative:-3.953431, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Jurídico', normalizedCategory:'admin_general_expense', amountNative:-1.099762, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Loja - Tigre Maniacos', normalizedCategory:'other_expenses', amountNative:-0.093578, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.268364, disclosureLevel:'aggregated' }, // pág. 9, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Receita Direitos Condomínio LFU', normalizedCategory:'exceptional_items', amountNative:62.25, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-31.244024, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-3.123933, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-0.457627, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-3.010359, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-4.220841, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.746126, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Receita Direitos Condomínio LFU', normalizedCategory:'exceptional_items', amountNative:-31.125, disclosureLevel:'aggregated' }, // pág. 25, precedente
    { rawLabel:'Departamento Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-77.261712, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'Departamento Futebol de Base', normalizedCategory:'youth_other_sports_expense', amountNative:-3.250239, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Futebol Feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-0.717369, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento Administrativo', normalizedCategory:'admin_general_expense', amountNative:-4.054096, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Departamento de Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-8.859302, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.98
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-3.441472, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
};
const criciumabrFiscalYearMeta = {
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2012-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2012-12-31
  2012: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Televisión, Venta de Jugadores
    incluidoEn:{ broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2012-12-31',
    sourceId:'criciuma-br-demonstrativo-financeiro-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.356051, tax:0,
    extraRows: [
      {label:'Receitas financeiras – nota 15', value:0.074328},
      {label:'Despesas financeiras – nota 15', value:-1.430379},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Futebol', lado:'revenue', importe:13.684738, motivo:'el documento no desglosa este renglón'},
      {renglon:'Departamento profissional', lado:'expense', importe:15.56887, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:20.542105, officialTotalExpenses:21.274856, officialPAT:-2.088802,
  },
  2013: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Televisión, Venta de Jugadores
    incluidoEn:{ broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2013-12-31',
    sourceId:'criciuma-br-demonstracoes-financeiras-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.356872, tax:0,
    extraRows: [
      {label:'Receitas financeiras – nota 16', value:0.048876},
      {label:'Despesas financeiras – nota 16', value:-1.405748},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Futebol', lado:'revenue', importe:31.284433, motivo:'el documento no desglosa este renglón'},
      {renglon:'Departamento profissional', lado:'expense', importe:28.077497, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:44.999887, officialTotalExpenses:37.354661, officialPAT:6.288354,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2019-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2019-12-31
  2019: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'criciuma-br-balanco-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.393215, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.421762},
      {label:'Receitas Financeiras', value:0.028547},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:16.888461, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:26.139679, officialTotalExpenses:24.698791, officialPAT:0.047673,
  },
  // 2020: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2020-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2020-12-31
  2020: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2020-12-31',
    sourceId:'criciuma-br-balanco-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.496593, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-0.513598},
      {label:'Receitas Financeiras', value:0.017005},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:7.582374, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:13.829229, officialTotalExpenses:12.621667, officialPAT:0.710969,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2021-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2021-12-31
  2021: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'criciuma-br-demonstrativo-financeiro-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.270722, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-0.292431},
      {label:'Receitas Financeiras', value:0.021709},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:11.524382, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15.285978, officialTotalExpenses:18.02324, officialPAT:-3.007985,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2023-12-31
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2024-12-31
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2025-12-31
  2025: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'criciuma-br-relatorio-auditoria-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.66147, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.878701},
      {label:'Receitas Financeiras', value:1.217231},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:64.178298, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:56.280533, officialTotalExpenses:80.922135, officialPAT:-25.303073,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2022-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae la fecha de la firma (2023-04-28); el ejercicio del documento cierra el 2022-12-31
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 0. Onboarding to-do 165 (Claude, 2026-10-09): el subtotal 23.790.402 (L241) es NETO de 'Outras receitas Operacionais' 32.222 (L248); se cargan los departamentos (L242-L247, 23.822.624) y la otra receita como ingreso: 27.268.558 + 32.222 - 23.822.624 - 1.207.001 = 2.271.155 (L253)
  2022: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025): Cuotas Sociales, Comercial / Sponsors, Televisión, Venta de Jugadores
    incluidoEn:{ member_dues:{ en:'lump_football_operations', posible:true, por:'precedente' }, sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, player_sales:{ en:'lump_football_operations', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'criciuma-br-demonstracoes-financeiras-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.207001, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.251577},
      {label:'Receitas Financeiras', value:0.044576},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'RECEITA OPERACIONAL BRUTA', lado:'revenue', importe:27.268558, motivo:'el documento no desglosa este renglón'},
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:15.977814, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:27.30078, officialTotalExpenses:23.822625, officialPAT:2.271155,
  },
  2014: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2014-12-31',
    sourceId:'criciuma-br-demonstrativo-financeiro-2014',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.905793, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.106268},
      {label:'Despesas financeiras', value:-1.012061},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento profissional', lado:'expense', importe:32.953552, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:43.279511, officialTotalExpenses:42.369596, officialPAT:0.004122,
  },
  2015: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'criciuma-br-balanco-2015',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.949059, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.247699},
      {label:'Receitas Financeiras', value:0.29864},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:18.289053, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:18.737555, officialTotalExpenses:28.202531, officialPAT:-10.414036,
  },
  2017: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2017-12-31',
    sourceId:'criciuma-br-balanco-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.4869, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.50713},
      {label:'Receitas Financeiras', value:0.02023},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Profissional', lado:'expense', importe:14.332058, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:17.385767, officialTotalExpenses:25.174605, officialPAT:-9.275738,
  },
  2018: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2018-12-31',
    sourceId:'criciuma-br-balanco-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.568893, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.584498},
      {label:'Receitas Financeiras', value:0.015605},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:12.83884, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:28.912398, officialTotalExpenses:20.930595, officialPAT:6.412915,
  },
  2016: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2016-12-31',
    sourceId:'criciuma-br-balanco-auditado-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.412444, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.541219},
      {label:'Receitas Financeiras', value:0.128775},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Profissional', lado:'expense', importe:15.124972, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:25.964039, officialTotalExpenses:24.515651, officialPAT:0.035944,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2023-12-31
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'criciuma-br-relatorio-de-balanco-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.753074, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-1.906375},
      {label:'Receitas Financeiras', value:0.153301},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:31.244024, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:39.492437, officialTotalExpenses:42.80291, officialPAT:57.186452,
  },
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2024-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2024-12-31
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'criciuma-br-relatorio-de-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.259387, tax:0,
    extraRows: [
      {label:'Despesas Financeiras', value:-2.161965},
      {label:'Receitas Financeiras', value:0.902578},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Departamento Futebol Profissional', lado:'expense', importe:77.261712, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:100.973447, officialTotalExpenses:97.58419, officialPAT:-28.995129,
  },
};
const criciumabrPresupuestoOverlayByYear = {};

const criciumabrPasesData = [];
const criciumabrResultadosData = {};
const criciumabrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['criciuma-br'] = {
  revenueLinesByYear: criciumabrRevenueLinesByYear, expenseLinesByYear: criciumabrExpenseLinesByYear,
  fiscalYearMeta: criciumabrFiscalYearMeta, pasesData: criciumabrPasesData,
  resultadosData: criciumabrResultadosData, titulosData: criciumabrTitulosData,
  presupuestoOverlayByYear: criciumabrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'criciuma-br-demonstrativo-financeiro-2012': {
    id:'criciuma-br-demonstrativo-financeiro-2012', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstrativo-financeiro-2012 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-demonstracoes-financeiras-2013': {
    id:'criciuma-br-demonstracoes-financeiras-2013', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstracoes-financeiras-2013 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstracoes-financeiras-2013.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-2019': {
    id:'criciuma-br-balanco-2019', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/balanco-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-2020': {
    id:'criciuma-br-balanco-2020', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/balanco-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-demonstrativo-financeiro-2021': {
    id:'criciuma-br-demonstrativo-financeiro-2021', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstrativo-financeiro-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-relatorio-de-balanco-2023': {
    id:'criciuma-br-relatorio-de-balanco-2023', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — relatorio-de-balanco-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-de-balanco-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-relatorio-de-balanco-2024': {
    id:'criciuma-br-relatorio-de-balanco-2024', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — relatorio-de-balanco-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-de-balanco-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-relatorio-auditoria-2025': {
    id:'criciuma-br-relatorio-auditoria-2025', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — relatorio-auditoria-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/relatorio-auditoria-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-demonstracoes-financeiras-2022': {
    id:'criciuma-br-demonstracoes-financeiras-2022', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstracoes-financeiras-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstracoes-financeiras-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-demonstrativo-financeiro-2014': {
    id:'criciuma-br-demonstrativo-financeiro-2014', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstrativo-financeiro-2014 (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2014.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-2015': {
    id:'criciuma-br-balanco-2015', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-2015 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-2017': {
    id:'criciuma-br-balanco-2017', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-2018': {
    id:'criciuma-br-balanco-2018', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'criciuma-br-balanco-auditado-2016': {
    id:'criciuma-br-balanco-auditado-2016', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — balanco-auditado-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Criciuma/balanco-auditado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['criciuma-br'] = null;
