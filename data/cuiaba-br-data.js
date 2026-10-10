// ============================================================================
// data/cuiaba-br-data.js — Cuiabá Esporte Clube - Sociedade Anônima do Futebol (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Cuiaba/balanco-financeiro-2022.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "cuiaba-br" — slug de "Cuiaba" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Cuiabá Esporte Clube - Sociedade Anônima do Futebol" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Cuiaba" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 25 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2022-12-31 = 5.2177 (PTAX de cierre (venda) del Banco Central do Brasil, 30/12/2022 (últ
//   sourceId           ok        "cuiaba-br-balanco-financeiro-2022" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieA" — roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.json), coincidencia exacta "Cuiabá"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2022-12-31","sourceId":"cuiaba-br-balanco-financeiro-2022"}
// ============================================================================

const cuiababrRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/balanco-financeiro-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'PATROCÍNIOS', normalizedCategory:'sponsorship_commercial', amountNative:17.147045, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'PLACAS DE PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:5.5001, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DIREITOS ECONÔMICOS DE ATLETAS', normalizedCategory:'player_sales', amountNative:1.276842, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.9
    { rawLabel:'SOCIO TORCEDOR', normalizedCategory:'member_dues', amountNative:3.017469, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.88
    { rawLabel:'COTAS/TV', normalizedCategory:'broadcasting', amountNative:87.560832, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'BILHETERIA', normalizedCategory:'matchday_competition', amountNative:16.116301, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTRAS RECEITAS C/ FUTEBOL', normalizedCategory:'other_income', amountNative:0.03446, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.92
    { rawLabel:'LICENCIAMENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.287757, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'ESCOLINHA', normalizedCategory:'youth_football', amountNative:0.874757, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'LOTERIAS', normalizedCategory:'other_income', amountNative:0.981819, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTRAS RECEITAS', normalizedCategory:'other_income', amountNative:0.545413, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/balanco-financeiro-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'PATROCÍNIOS', normalizedCategory:'sponsorship_commercial', amountNative:20.363084, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'PLACAS DE PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:10.5, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DIREITOS ECONÔMICOS DE ATLETAS', normalizedCategory:'player_sales', amountNative:114.423113, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.9
    { rawLabel:'SÓCIO TORCEDOR', normalizedCategory:'member_dues', amountNative:1.626578, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.88
    { rawLabel:'COTAS/TV', normalizedCategory:'broadcasting', amountNative:56.035752, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'BILHETERIA/JOGOS', normalizedCategory:'matchday_competition', amountNative:13.075506, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'OUTRAS RECEITAS C/ FUTEBOL', normalizedCategory:'other_income', amountNative:2.860312, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.92
    { rawLabel:'LICENCIAMENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.294877, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'ESCOLINHA', normalizedCategory:'youth_football', amountNative:1.395352, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'LOTERIAS', normalizedCategory:'other_income', amountNative:0.757616, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'OUTRAS RECEITAS', normalizedCategory:'other_income', amountNative:2.83456, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/balanco-financeiro-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'PATROCÍNIOS', normalizedCategory:'sponsorship_commercial', amountNative:12, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'PLACAS DE PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:2.600926, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'SÓCIO TORCEDOR', normalizedCategory:'member_dues', amountNative:0.303897, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.88
    { rawLabel:'COTAS/TV', normalizedCategory:'broadcasting', amountNative:12.769767, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'BILHETERIA/JOGOS', normalizedCategory:'matchday_competition', amountNative:1.472385, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'OUTRAS RECEITAS C/ FUTEBOL', normalizedCategory:'other_income', amountNative:0.310765, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.92
    { rawLabel:'LICENCIAMENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.22614, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'ESCOLINHA', normalizedCategory:'youth_football', amountNative:1.230119, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'LOTERIAS', normalizedCategory:'other_income', amountNative:0.919328, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'OUTRAS RECEITAS', normalizedCategory:'other_income', amountNative:3.73993, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'VENDAS DE MERCADORIAS', normalizedCategory:'sponsorship_commercial', amountNative:1.051917, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'OUTRAS RECEITAS/(DESPESAS)', normalizedCategory:'player_sales', amountNative:20.805324, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Outras Receitas', normalizedCategory:'other_income', amountNative:42.021965, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Receita com Bilheteria', normalizedCategory:'matchday_competition', amountNative:16.609467, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Receita com Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:6.336, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Receitas Cotas de TV', normalizedCategory:'broadcasting', amountNative:74.83541, disclosureLevel:'aggregated' }, // pág. 22, Jev 1
    { rawLabel:'Cessão de Direitos Liga Forte União do Futebol Brasileiro (LFF) – a)', normalizedCategory:'other_income', amountNative:28.73, disclosureLevel:'aggregated' }, // pág. 22, Claude 0.8
    { rawLabel:'(-) Deduções Receitas – b)', normalizedCategory:'other_income', amountNative:-10.599429, disclosureLevel:'aggregated' }, // pág. 22, Jev 0.99
  ],
};
const cuiababrExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-9.604853, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'CUSTOS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-68.268443, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'CUSTOS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-8.318707, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTROS CUSTOS COM FUTEBOL', normalizedCategory:'wages_squad', amountNative:-6.863131, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'DESPESAS COM PESSOAL', normalizedCategory:'admin_general_expense', amountNative:-2.238022, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'DESPESAS ADMINISTRATIVAS', normalizedCategory:'admin_general_expense', amountNative:-12.36934, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DESPESAS COM VENDAS', normalizedCategory:'admin_general_expense', amountNative:-0.015268, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-0.153237, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) DIREITOS ECONÔMICOS/ CUSTO INTANGÍVEL', normalizedCategory:'player_amortisation', amountNative:-11.845753, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-7.268369, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'CUSTOS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-92.403479, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.8
    { rawLabel:'CUSTOS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-15.683748, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'CUSTOS COM AMORTIZAÇÃO DE CONTRATOS', normalizedCategory:'player_amortisation', amountNative:-10.29473, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.95
    { rawLabel:'OUTROS CUSTOS COM FUTEBOL', normalizedCategory:'wages_squad', amountNative:-10.975688, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS COM PESSOAL', normalizedCategory:'admin_general_expense', amountNative:-3.355965, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS ADMINISTRATIVAS', normalizedCategory:'admin_general_expense', amountNative:-4.577698, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS DEPRECIAÇÃO', normalizedCategory:'depreciation', amountNative:-0.80115, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS GERAIS CATEGORIA DE BASE', normalizedCategory:'youth_other_sports_expense', amountNative:-3.182101, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'DESPESAS GERAIS ESCOLINHA', normalizedCategory:'youth_other_sports_expense', amountNative:-0.819815, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.85
    { rawLabel:'DESPESAS GERAIS FUTEBOL FEMININO', normalizedCategory:'youth_other_sports_expense', amountNative:-0.222635, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.96
    { rawLabel:'DESPESAS COM VENDAS', normalizedCategory:'admin_general_expense', amountNative:-0.096191, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-0.624905, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'CUSTOS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-31.917744, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.8
    { rawLabel:'CUSTOS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-3.388905, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'CUSTOS COM AMORTIZAÇÃO DE CONTRATOS', normalizedCategory:'player_amortisation', amountNative:-19.456556, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.95
    { rawLabel:'OUTROS CUSTOS COM FUTEBOL', normalizedCategory:'wages_squad', amountNative:-21.975926, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'DESPESAS COM PESSOAL', normalizedCategory:'admin_general_expense', amountNative:-5.561472, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'DESPESAS ADMINISTRATIVAS', normalizedCategory:'admin_general_expense', amountNative:-4.228214, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'DESPESAS DEPRECIAÇÃO', normalizedCategory:'depreciation', amountNative:-1.213151, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'DESPESAS GERAIS CATEGORIA DE BASE', normalizedCategory:'youth_other_sports_expense', amountNative:-1.978408, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
    { rawLabel:'DESPESAS GERAIS ESCOLINHA', normalizedCategory:'youth_other_sports_expense', amountNative:-0.480996, disclosureLevel:'aggregated' }, // pág. 7, Claude 0.85
    { rawLabel:'DESPESAS GERAIS FUTEBOL FEMININO', normalizedCategory:'youth_other_sports_expense', amountNative:-0.000021, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.96
    { rawLabel:'DESPESAS COM VENDAS', normalizedCategory:'admin_general_expense', amountNative:-0.231575, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-4.984986, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS (deduções da receita)', normalizedCategory:'admin_general_expense', amountNative:-2.144216, disclosureLevel:'aggregated' }, // pág. 7, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custo com Futebol Profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-98.846512, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Vendas', normalizedCategory:'admin_general_expense', amountNative:-0.107449, disclosureLevel:'aggregated' }, // pág. 8, precedente
    { rawLabel:'Despesas Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-9.945787, disclosureLevel:'aggregated' }, // pág. 23, precedente
    { rawLabel:'Despesas Gerais', normalizedCategory:'admin_general_expense', amountNative:-10.945183, disclosureLevel:'aggregated' }, // pág. 23, Jev 1
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.126468, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
  ],
};
const cuiababrFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'cuiaba-br-balanco-financeiro-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.278683, tax:0,
    extraRows: [
      {label:'DESPESAS/(RECEITAS) FINANCEIRAS', value:0.278683},
      {label:'(-) PROVISÃO PARA IMPOSTO DE RENDA', value:null},
      {label:'(-) PROVISÃO PARA CONTRIBUIÇÃO SOCIAL', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:133.342795, officialTotalExpenses:107.831001, officialPAT:25.790477,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'cuiaba-br-balanco-financeiro-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:2.738057, tax:0,
    extraRows: [
      {label:'DESPESAS/(RECEITAS) FINANCEIRAS', value:2.738057},
      {label:'(-) PROVISÃO PARA IMPOSTO DE RENDA', value:null},
      {label:'(-) PROVISÃO PARA CONTRIBUIÇÃO SOCIAL', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:224.16675, officialTotalExpenses:162.152227, officialPAT:64.752582,
  },
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 2.144.216. Claude 2026-10-09: la extracción puso la deducción de la receita (L200-L201) del lado ingreso; el estado la resta de la receita bruta y en 2022 y 2024 se carga como gasto. Cuenta (L186-L226): ingresos 36.625.174 (suma de L188-L193 29.457.738 + L195-L199 7.167.435) + OUTRAS RECEITAS/(DESPESAS) 20.805.324 (L221) - custos 76.739.132 (L204) - despesas 18.678.825 (L209) - deduções 2.144.216 (L200) - financeiras 2.017.000 (L220) = -42.148.673 contra -42.148.674 impreso (L222, L226).
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): fila = 20.805.324. Claude 2026-10-09: renglón no operativo impreso en positivo que SUMA al resultado: (60.936.997) + 18.788.324 (L219 = (2.017.000) financeiras + 20.805.324 outras) = (42.148.673) y el resultado impreso es (42.148.674) (L222). La nota 15 (L1118-L1123) lo cuenta junto con la receita (total 2024 205.052.629 = receita líquida original). Misma cuenta que en el ajuste de DESPESAS TRIBUTÁRIAS (deduções).
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'cuiaba-br-balanco-financeiro-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.017, tax:0,
    extraRows: [
      {label:'RECEITAS/(DESPESAS) FINANCEIRAS', value:-2.017},
      {label:'(-) PROVISÃO PARA IMPOSTO DE RENDA', value:null},
      {label:'(-) PROVISÃO PARA CONTRIBUIÇÃO SOCIAL', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:57.430498, officialTotalExpenses:97.56217, officialPAT:-42.148674,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): resultado-final = 37.356.016. Claude 2026-10-09: el estado de resultados (L261-L275) termina en 'Lucro Líquido antes dos impostos' 37.356.016 y no imprime renglón de impuesto a la renta ni resultado neto aparte; el resultado del ejercicio es el mismo 37.356.016 en la DMPL (L302 'Lucro do Exercício') y en el flujo de caja (L321 'Resultado do Exercício'). Cuenta: 157.933.413 - 98.846.512 - 107.449 - 20.890.970 - 126.468 - 753.664 + 56.178 + 91.488 = 37.356.016; impuesto 0 (los tributos del SAF, TEF 5%, están en Despesas Tributárias, nota 30 b).
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    // tools/dentro-de-otro.mjs (2026-10-10): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2024, 2025): Salarios y primas (plantel y cuerpo técnico), Organización de partidos
    incluidoEn:{ wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, match_organisation_expense:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'cuiaba-br-demonstracoes-financeiras-2023-auditadas',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.697486, tax:0.091488,
    extraRows: [
      {label:'Despesas financeiras', value:-0.753664},
      {label:'Receitas financeiras', value:0.056178},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:0.091488},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Custo com Futebol Profissional', lado:'expense', importe:98.846512, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:157.933413, officialTotalExpenses:119.971399, officialPAT:37.356016,
  },
};
const cuiababrPresupuestoOverlayByYear = {};

const cuiababrPasesData = [];
const cuiababrResultadosData = {};
const cuiababrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['cuiaba-br'] = {
  revenueLinesByYear: cuiababrRevenueLinesByYear, expenseLinesByYear: cuiababrExpenseLinesByYear,
  fiscalYearMeta: cuiababrFiscalYearMeta, pasesData: cuiababrPasesData,
  resultadosData: cuiababrResultadosData, titulosData: cuiababrTitulosData,
  presupuestoOverlayByYear: cuiababrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'cuiaba-br-balanco-financeiro-2022': {
    id:'cuiaba-br-balanco-financeiro-2022', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — balanco-financeiro-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cuiaba-br-balanco-financeiro-2024': {
    id:'cuiaba-br-balanco-financeiro-2024', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — balanco-financeiro-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cuiaba-br-balanco-financeiro-2025': {
    id:'cuiaba-br-balanco-financeiro-2025', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — balanco-financeiro-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cuiaba-br-demonstracoes-financeiras-2023-auditadas': {
    id:'cuiaba-br-demonstracoes-financeiras-2023-auditadas', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — demonstracoes-financeiras-2023-auditadas (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/demonstracoes-financeiras-2023-auditadas.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['cuiaba-br'] = null;
